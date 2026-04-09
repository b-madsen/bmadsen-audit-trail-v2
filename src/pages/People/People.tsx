import { useState, useMemo, useEffect, Fragment, type ChangeEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  IconV2,
  Button,
  Divider,
  Link,
  Section,
  Tabs,
  Tab,
  TextField,
  SelectField,
  SlidedownPortal,
  SLIDEDOWN_TYPES,
  PageHeaderV2,
  Headline,
} from '@bamboohr/fabric';
import { EmployeeCard } from '../../components/EmployeeCard';
import { PeopleListView } from '../../components/PeopleListView';
import { OrgChartView } from '../../components/OrgChart/OrgChartView';
import { employees } from '../../data/employees';
import './People.css';

type GroupBy = 'name' | 'department' | 'location' | 'division';
type ViewMode = 'list' | 'directory' | 'orgChart';

interface PeopleProps {
  defaultTab?: ViewMode;
}

export function People({ defaultTab = 'list' }: PeopleProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>(defaultTab);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    if (location.state?.toast === 'published') {
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 5000);
      window.history.replaceState({}, '');
    }
  }, []);
  const [searchQuery, setSearchQuery] = useState('');
  const [groupBy, setGroupBy] = useState<GroupBy>('name');
  const [filterDepartment, setFilterDepartment] = useState('all');

  // Sync viewMode with defaultTab when navigating via GlobalNav
  useEffect(() => {
    setViewMode(defaultTab);
  }, [defaultTab]);

  // Get unique departments for filter
  const departments = useMemo(() => {
    const unique = Array.from(new Set(employees.map((e) => e.department)));
    return [{ value: 'all', label: 'All Employees' }].concat(
      unique.map((dept) => ({ value: dept, label: dept }))
    );
  }, []);

  // Filter employees by search and department
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment;
      return matchesSearch && matchesDepartment;
    });
  }, [searchQuery, filterDepartment]);

  // Build employee ID → name map for resolving manager names
  const employeeNameMap = useMemo(() => {
    const map: Record<number, string> = {};
    employees.forEach((e) => { map[e.id] = e.name; });
    return map;
  }, []);

  // Group employees
  const groupedEmployees = useMemo(() => {
    if (groupBy === 'name') {
      const groups: Record<string, typeof filteredEmployees> = {};
      filteredEmployees.forEach((employee) => {
        const key = employee.name.charAt(0).toUpperCase();
        if (!groups[key]) groups[key] = [];
        groups[key].push(employee);
      });
      Object.keys(groups).forEach((key) => {
        groups[key].sort((a, b) => a.name.localeCompare(b.name));
      });
      return groups;
    }

    const groups: Record<string, typeof filteredEmployees> = {};
    filteredEmployees.forEach((employee) => {
      const key = employee[groupBy];
      if (!groups[key]) groups[key] = [];
      groups[key].push(employee);
    });
    Object.keys(groups).forEach((key) => {
      groups[key].sort((a, b) => a.name.localeCompare(b.name));
    });
    return groups;
  }, [filteredEmployees, groupBy]);

  return (
    <div className="people-page">
      <SlidedownPortal
        show={toastVisible}
        message="Changes published successfully."
        type={SLIDEDOWN_TYPES.success}
        onDismiss={() => setToastVisible(false)}
      />
      {/* Page Header */}
      <PageHeaderV2
        title="People"
        primaryContent={
          <Link href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>
            <span className="people-header-link">
              <IconV2 name="square-arrow-up-right-regular" size={16} />
              Quick Access to the Directory
            </span>
          </Link>
        }
      />

      {/* Actions Bar with Tabs */}
      <div className="people-actions-bar">
        <div className="people-new-button">
          <Button
            variant="outlined"
            color="primary"
            size="medium"
            className="people-primary-btn"
            startIcon={<IconV2 name="circle-plus-regular" size={16} />}
            onClick={() => navigate('/people/new')}
          >
            New Employee
          </Button>
        </div>

        {/* View Tabs */}
        <div className="people-tabs">
          <Tabs
            value={viewMode}
            onChange={(value: unknown, _event: ChangeEvent<Element>) => {
              const newMode = value as ViewMode;
              setViewMode(newMode);
              if (newMode === 'directory') navigate('/people/directory');
              else if (newMode === 'orgChart') navigate('/people/org-chart');
              else navigate('/people');
            }}
            mode="line"
          >
            <Tab label="List" value="list" icon={<IconV2 name="table-list-regular" size={16} />} />
            <Tab label="Directory" value="directory" icon={<IconV2 name="address-book-regular" size={16} />} />
            <Tab label="Org Chart" value="orgChart" icon={<IconV2 name="sitemap-regular" size={16} />} />
          </Tabs>
        </div>
      </div>
      <Divider className="people-tab-divider" />

      {/* List View */}
      {viewMode === 'list' && (
        <PeopleListView employees={employees} />
      )}

      {/* Directory View */}
      {viewMode === 'directory' && (
        <>
          <div className="people-directory-filters">
            {/* Search */}
            <div className="people-directory-search">
              <TextField
                label=""
                placeholder="Search Directory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="medium"
              />
            </div>

            {/* Group By */}
            <div className="people-directory-filter-group">
              <SelectField
                label="Group by"
                labelPlacement="inline"
                size="small"
                variant="single"
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value as GroupBy)}
              >
                <option value="name">Name</option>
                <option value="department">Department</option>
                <option value="location">Location</option>
                <option value="division">Division</option>
              </SelectField>
            </div>

            {/* Filter By */}
            <div className="people-directory-filter-group">
              <SelectField
                label="Filter by"
                labelPlacement="inline"
                size="small"
                variant="single"
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
              >
                {departments.map((dept) => (
                  <option key={dept.value} value={dept.value}>{dept.label}</option>
                ))}
              </SelectField>
            </div>
          </div>

          {/* Employee Directory */}
          <Section>
            {Object.entries(groupedEmployees)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([letter, groupEmployees]) => (
                <Fragment key={letter}>
                  <div className="people-directory-letter-row">
                    <Headline size="small" color="primary">{letter}</Headline>
                  </div>
                  <div className="people-directory-group-rows">
                    {groupEmployees.map((employee) => (
                      <EmployeeCard
                        key={employee.id}
                        employee={employee}
                        reportsToName={employee.reportsTo != null ? employeeNameMap[employee.reportsTo] : undefined}
                      />
                    ))}
                  </div>
                </Fragment>
              ))}

            {filteredEmployees.length === 0 && (
              <div className="people-empty">
                <Headline size="small" color="neutral-weak">No employees found</Headline>
              </div>
            )}
          </Section>
        </>
      )}

      {/* Org Chart View */}
      {viewMode === 'orgChart' && (
        <div className="people-org-chart">
          <OrgChartView employees={employees} />
        </div>
      )}
    </div>
  );
}

export default People;
