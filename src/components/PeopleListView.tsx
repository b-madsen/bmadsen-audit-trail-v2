import { useState, useMemo, useRef, useEffect } from 'react';
import {
  IconV2,
  BodyText,
  Section,
  IconButton,
  Link,
  Avatar,
  SelectField,
  Checkbox,
  AccordionV2,
} from '@bamboohr/fabric';
import { Pagination } from './Pagination';
import type { Employee } from '../data/employees';
import './PeopleListView.css';

interface PeopleListViewProps {
  employees: Employee[];
}

const EMPLOYMENT_TYPE_OPTIONS = ['Contractor', 'Full-Time', 'Intern', 'Part-Time', 'Terminated'];

export function PeopleListView({ employees }: PeopleListViewProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showingFilter, setShowingFilter] = useState('active');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 50;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const statusOptions = [
    { value: 'all', label: 'All Employees' },
    { value: 'Full-Time', label: 'Full-Time' },
    { value: 'Part-Time', label: 'Part-Time' },
    { value: 'Contractor', label: 'Contractor' },
  ];

  const showingOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'all', label: 'All' },
  ];

  const departments = useMemo(
    () => [...new Set(employees.map((e) => e.department))].sort(),
    [employees]
  );

  const locations = useMemo(
    () => [...new Set(employees.map((e) => e.location).filter(Boolean))].sort(),
    [employees]
  );

  const filteredEmployees = useMemo(() => {
    let result = employees;

    if (showingFilter === 'active') {
      result = result.filter((emp) => emp.employmentStatus !== 'Inactive');
    } else if (showingFilter === 'inactive') {
      result = result.filter((emp) => emp.employmentStatus === 'Inactive');
    }

    if (selectedEmploymentTypes.size > 0) {
      result = result.filter((emp) => selectedEmploymentTypes.has(emp.employmentType));
    } else if (filterStatus !== 'all') {
      result = result.filter((emp) => emp.employmentType === filterStatus);
    }

    if (selectedDepartments.size > 0) {
      result = result.filter((emp) => selectedDepartments.has(emp.department));
    }

    if (selectedLocations.size > 0) {
      result = result.filter((emp) => selectedLocations.has(emp.location));
    }

    return result;
  }, [employees, filterStatus, showingFilter, selectedEmploymentTypes, selectedDepartments, selectedLocations]);

  const totalItems = filteredEmployees.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="people-list-view">
      {/* Filter Bar */}
      <div className="people-list-filter-bar">
        <div className="people-list-filter-left">
          <IconButton
            icon="sliders-solid"
            aria-label="Filter"
            variant={isFilterOpen || hasActiveFilters ? 'contained' : 'outlined'}
            color={isFilterOpen || hasActiveFilters ? 'primary' : 'secondary'}
            size="medium"
            onClick={() => setIsFilterOpen((prev) => !prev)}
          />

          <div className="people-list-select-filter">
            <SelectField
              size="medium"
              variant="single"
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </SelectField>
          </div>

          <div className="people-list-count">
            <IconV2 name="users-solid" size={16} color="neutral-medium" />
            <BodyText size="small" color="neutral-weak">{totalItems}</BodyText>
          </div>
        </div>

        <div className="people-list-filter-right">
          <div className="people-list-select-showing">
            <SelectField
              label="Showing"
              labelPlacement="inline"
              size="medium"
              variant="single"
              value={showingFilter}
              onChange={(e) => { setShowingFilter(e.target.value); setCurrentPage(1); }}
            >
              {showingOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </SelectField>
          </div>

          <div className="people-list-menu-wrapper" ref={menuRef}>
            <IconButton
              icon="ellipsis-solid"
              aria-label="More options"
              variant="outlined"
              color="secondary"
              size="medium"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
            {isMenuOpen && (
              <div className="people-list-menu">
                <button className="people-list-menu-item" onClick={() => setIsMenuOpen(false)}>
                  <BodyText size="medium">Download Forms</BodyText>
                </button>
                <button className="people-list-menu-item" onClick={() => setIsMenuOpen(false)}>
                  <BodyText size="medium">Customize View</BodyText>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <Section>
        <div className="people-list-table-container">
          <table className="people-list-table">
            <thead>
              <tr>
                <th>Employee Photo</th>
                <th>Employee #</th>
                <th>Last Name, First Name</th>
                <th>Job Title</th>
                <th>Location</th>
                <th>Employment Status</th>
                <th>Hire Date</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td><Avatar src={employee.avatar} alt={employee.name} size={64} /></td>
                  <td><BodyText size="medium">{employee.employeeNumber}</BodyText></td>
                  <td>
                    <Link href={`/employees/${employee.id}`}>
                      {employee.lastName}, {employee.firstName}
                    </Link>
                  </td>
                  <td><BodyText size="medium" color="neutral-medium">{employee.jobTitle}</BodyText></td>
                  <td><BodyText size="medium" color="neutral-medium">{employee.location}</BodyText></td>
                  <td><BodyText size="medium" color="neutral-medium">{employee.employmentStatus}</BodyText></td>
                  <td><BodyText size="medium" color="neutral-medium">{employee.hireDate}</BodyText></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

              <AccordionV2
                title="Locations"
                subtitle={`${locations.length}`}
                variant="border-bottom"
              >
                <div className="people-list-sidebar-checks">
                  {locations.map((loc) => (
                    <Checkbox
                      key={loc}
                      label={loc}
                      value={loc}
                      checked={selectedLocations.has(loc)}
                      onChange={({ value }) => {
                        setSelectedLocations((prev) => toggleSet(prev, String(value)));
                        setCurrentPage(1);
                      }}
                    />
                  ))}
                </div>
              </AccordionV2>

              <AccordionV2 title="Pay Range" variant="border-bottom">
                <div className="people-list-sidebar-checks">
                  <BodyText size="small" color="neutral-weak">Coming soon</BodyText>
                </div>
              </AccordionV2>

              <AccordionV2 title="Pay Type" variant="border-bottom">
                <div className="people-list-sidebar-checks">
                  <BodyText size="small" color="neutral-weak">Coming soon</BodyText>
                </div>
              </AccordionV2>

              <AccordionV2 title="Tenure" variant="border-bottom">
                <div className="people-list-sidebar-checks">
                  <BodyText size="small" color="neutral-weak">Coming soon</BodyText>
                </div>
              </AccordionV2>

              <AccordionV2 title="Age" variant="border-bottom">
                <div className="people-list-sidebar-checks">
                  <BodyText size="small" color="neutral-weak">Coming soon</BodyText>
                </div>
              </AccordionV2>

              <AccordionV2 title="Gender" variant="border-bottom">
                <div className="people-list-sidebar-checks">
                  <BodyText size="small" color="neutral-weak">Coming soon</BodyText>
                </div>
              </AccordionV2>

              <AccordionV2 title="Ethnicity" variant="border-bottom">
                <div className="people-list-sidebar-checks">
                  <BodyText size="small" color="neutral-weak">Coming soon</BodyText>
                </div>
              </AccordionV2>

              <AccordionV2 title="More" variant="border-bottom">
                <div className="people-list-sidebar-checks">
                  <BodyText size="small" color="neutral-weak">Coming soon</BodyText>
                </div>
              </AccordionV2>
            </div>
          </div>
        )}

        {/* Table area */}
        <div className="people-list-main">
          <Section>
            <div className="people-list-table-container">
              <table className="people-list-table">
                <thead>
                  <tr>
                    <th>Employee Photo</th>
                    <th>Employee #</th>
                    <th>Last Name, First Name</th>
                    <th>Job Title</th>
                    <th>Location</th>
                    <th>Employment Status</th>
                    <th>Hire Date</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEmployees.map((employee) => (
                    <tr key={employee.id}>
                      <td><Avatar src={employee.avatar} alt={employee.name} size={64} /></td>
                      <td><BodyText size="medium">{employee.employeeNumber}</BodyText></td>
                      <td>
                        <Link href={`/employees/${employee.id}`}>
                          {employee.lastName}, {employee.firstName}
                        </Link>
                      </td>
                      <td><BodyText size="medium" color="neutral-medium">{employee.jobTitle}</BodyText></td>
                      <td><BodyText size="medium" color="neutral-medium">{employee.location}</BodyText></td>
                      <td><BodyText size="medium" color="neutral-medium">{employee.employmentStatus}</BodyText></td>
                      <td><BodyText size="medium" color="neutral-medium">{employee.hireDate}</BodyText></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="people-list-pagination">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </Section>
        </div>
      </div>
    </div>
  );
}

export default PeopleListView;
