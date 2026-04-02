import { useState, useEffect, type ChangeEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  IconV2,
  IconTile,
  Headline,
  Button,
  TextButton,
  IconButton,
  Link,
  BodyText,
  Section,
  Tabs,
  Tab,
  StandardModal,
  SlidedownPortal,
  SLIDEDOWN_TYPES,
  Dropdown,
} from '@bamboohr/fabric';
import './PowerEditSessions.css';

type TabId = 'draft' | 'completed';

interface EditSession {
  id: number;
  name: string;
  description: string;
  createdBy: string;
  lastEdited: string;
  employeeIds?: number[];
}

const DATASET_OPTIONS: { label: string; icon: string }[] = [
  { label: 'Employees',         icon: 'user-group-regular' },
  { label: 'Company',           icon: 'building-regular' },
  { label: 'Benefit Elections', icon: 'heart-regular' },
  { label: 'Applicants',        icon: 'id-badge-regular' },
  { label: 'Payroll',           icon: 'circle-dollar-regular' },
];

const DRAFTS: EditSession[] = [
  {
    id: 1,
    name: 'Q2 Engineering Reorganization',
    description: 'Updating job titles and departments for 23 engineers following the Q2 restructure.',
    createdBy: 'Kathryn Murphy',
    lastEdited: '04/12/2021',
    employeeIds: [100, 5, 7, 12, 15, 20, 14, 6],
  },
  {
    id: 2,
    name: 'New Hire Onboarding — March Cohort',
    description: 'Setting hire dates, employment status, and locations for 8 new employees starting March 15.',
    createdBy: 'Jerome Bell',
    lastEdited: '07/30/2021',
    employeeIds: [101, 102, 500, 501, 502, 8, 103, 13],
  },
  {
    id: 3,
    name: 'Remote Work Transitions',
    description: "Changing location to 'Remote' for 14 employees who transitioned to permanent remote work.",
    createdBy: 'Courtney Henry',
    lastEdited: '02/06/2021',
    employeeIds: [104, 105, 16, 22, 100, 5, 12, 14, 6, 7],
  },
  {
    id: 4,
    name: 'Contractor Conversions',
    description: 'Updating employment type and benefits eligibility for 6 contractors converting to full-time roles.',
    createdBy: 'Albert Flores',
    lastEdited: '12/06/2021',
    employeeIds: [15, 20, 8, 103, 501, 502],
  },
];

const COMPLETED: EditSession[] = [
  {
    id: 101,
    name: 'Annual Salary Adjustments',
    description: 'Applied cost-of-living increases of 3% across all full-time employees in the US.',
    createdBy: 'Kathryn Murphy',
    lastEdited: '01/15/2021',
  },
  {
    id: 102,
    name: 'Department Rebranding',
    description: "Renamed 'Human Resources' to 'People Operations' across all employee records.",
    createdBy: 'Jerome Bell',
    lastEdited: '11/08/2020',
  },
  {
    id: 103,
    name: 'Year-End Title Promotions',
    description: 'Promoted 12 employees to senior-level titles following the annual performance review cycle.',
    createdBy: 'Courtney Henry',
    lastEdited: '12/31/2020',
  },
  {
    id: 104,
    name: 'Benefits Open Enrollment Updates',
    description: 'Updated health plan selections and dependent information for 47 employees during open enrollment.',
    createdBy: 'Albert Flores',
    lastEdited: '10/20/2020',
  },
  {
    id: 105,
    name: 'Office Relocation — Austin',
    description: 'Updated work location for 19 employees transferring to the new Austin office.',
    createdBy: 'Kathryn Murphy',
    lastEdited: '09/14/2020',
  },
  {
    id: 106,
    name: 'Manager Reassignments',
    description: 'Reassigned reporting structure for 31 employees following a leadership change in Operations.',
    createdBy: 'Jerome Bell',
    lastEdited: '08/03/2020',
  },
  {
    id: 107,
    name: 'Part-Time Hour Reductions',
    description: 'Reduced scheduled hours for 11 part-time employees in Retail due to seasonal slowdown.',
    createdBy: 'Courtney Henry',
    lastEdited: '07/22/2020',
  },
  {
    id: 108,
    name: 'Compliance Training Completion',
    description: 'Marked compliance training as complete and updated certification dates for 58 employees.',
    createdBy: 'Albert Flores',
    lastEdited: '06/30/2020',
  },
  {
    id: 109,
    name: 'Emergency Contact Audit',
    description: 'Verified and updated emergency contact information for all employees as part of the annual audit.',
    createdBy: 'Kathryn Murphy',
    lastEdited: '05/11/2020',
  },
  {
    id: 110,
    name: 'New Benefits Tier Rollout',
    description: 'Assigned employees to new benefits tiers based on tenure and employment status.',
    createdBy: 'Jerome Bell',
    lastEdited: '04/01/2020',
  },
  {
    id: 111,
    name: 'COVID Remote Work Transition',
    description: 'Updated all office-based employees to remote work status and adjusted location fields.',
    createdBy: 'Courtney Henry',
    lastEdited: '03/16/2020',
  },
  {
    id: 112,
    name: 'Q1 Onboarding Batch',
    description: 'Set hire dates, job titles, and departments for 15 employees from the Q1 onboarding cohort.',
    createdBy: 'Albert Flores',
    lastEdited: '02/28/2020',
  },
];

export function PowerEditSessions() {
  const navigate = useNavigate();
  const location = useLocation();
  const incomingToast = location.state?.toast as string | undefined;
  const incomingTab = location.state?.activeTab as TabId | undefined;
  const incomingName = location.state?.sessionName as string | undefined;
  const [activeTab, setActiveTab] = useState<TabId>(incomingTab ?? 'draft');
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [drafts, setDrafts] = useState<EditSession[]>(DRAFTS);
  const [pendingDelete, setPendingDelete] = useState<EditSession | null>(null);
  const [pendingRevert, setPendingRevert] = useState<EditSession | null>(null);
  const [slidedownContent, setSlidedownContent] = useState<{ message: string; type: SLIDEDOWN_TYPES } | null>(() => {
    if (incomingToast === 'published') return { message: `"${incomingName}" has been published successfully.`, type: SLIDEDOWN_TYPES.success };
    if (incomingToast === 'draft') return { message: `"${incomingName}" has been saved as a draft.`, type: SLIDEDOWN_TYPES.success };
    return null;
  });
  const [slidedownVisible, setSlidedownVisible] = useState(!!incomingToast);

  function dismissSlidedown() {
    setSlidedownVisible(false);
    setTimeout(() => setSlidedownContent(null), 500);
  }

  useEffect(() => {
    if (!slidedownVisible) return;
    const t = setTimeout(() => dismissSlidedown(), 5000);
    return () => clearTimeout(t);
  }, [slidedownVisible]);

  function confirmDelete() {
    if (!pendingDelete) return;
    setDrafts((prev) => prev.filter((d) => d.id !== pendingDelete.id));
    setPendingDelete(null);
  }

  const rows = activeTab === 'draft' ? drafts : COMPLETED;

  return (
    <>
      {slidedownContent && (
        <SlidedownPortal
          show={slidedownVisible}
          onDismiss={dismissSlidedown}
          message={slidedownContent.message}
          type={slidedownContent.type}
        />
      )}
    <div className="power-edit-sessions">

      {/* Back */}
      <div style={{ marginBottom: 12 }}>
        <TextButton size="small" color="secondary" onClick={() => navigate('/people')}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <IconV2 name="chevron-left-regular" size={14} />
            Back
          </span>
        </TextButton>
      </div>

      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h1 style={{ fontFamily: 'Fields, system-ui, sans-serif', fontSize: 40, fontWeight: 700, lineHeight: '48px', color: 'var(--color-primary-strong)', margin: 0 }}>
          Power Edit
        </h1>
        <Dropdown
          type="button"
          ButtonProps={{
            variant: 'outlined',
            color: 'secondary',
            size: 'medium',
            startIcon: <IconV2 name="circle-plus-regular" size={14} />,
          }}
          items={DATASET_OPTIONS.map(({ label }) => ({ text: label, value: label }))}
          renderOptionContent={(item) => {
            const opt = DATASET_OPTIONS.find((o) => o.label === item.text);
            return (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <IconV2 name={(opt?.icon ?? 'user-group-regular') as never} size={16} />
                {item.text}
              </span>
            );
          }}
          onSelect={(value) => navigate('/people/power-edit/edit', { state: { datasetType: value } })}
        >
          New Edit
        </Dropdown>
      </div>

      {/* Tabs */}
      <div style={{ marginBottom: 24 }}>
        <Tabs
          value={activeTab}
          onChange={(value: unknown, _event: ChangeEvent<Element>) => setActiveTab(value as TabId)}
          mode="line"
        >
          <Tab label={`Draft (${drafts.length})`} value="draft" icon={<IconV2 name="pen-regular" size={16} />} />
          <Tab label={`Completed (${COMPLETED.length})`} value="completed" icon={<IconV2 name="circle-check-regular" size={16} />} />
        </Tabs>
      </div>

      {/* Sessions table */}
      <Section>
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table className="power-edit-sessions__table">
            <thead>
              <tr>
                <th><BodyText size="small" weight="semibold">Name</BodyText></th>
                <th><BodyText size="small" weight="semibold">Description</BodyText></th>
                <th><BodyText size="small" weight="semibold">Created By</BodyText></th>
                <th><BodyText size="small" weight="semibold">Last Edited</BodyText></th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map((session) => (
                <tr
                  key={session.id}
                  className="power-edit-sessions__row"
                  onMouseEnter={() => setHoveredId(session.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <td className="power-edit-sessions__name-cell">
                    <Link
                      href="#"
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        navigate('/people/power-edit/edit', {
                          state: activeTab === 'draft'
                            ? { selectedIds: session.employeeIds ?? [], sessionName: session.name }
                            : { selectedIds: session.employeeIds ?? [], sessionName: session.name, readonly: true },
                        });
                      }}
                    >
                      {session.name}
                    </Link>
                  </td>
                  <td className="power-edit-sessions__description-cell">
                    <BodyText size="small" color="neutral-medium">{session.description}</BodyText>
                  </td>
                  <td>
                    <BodyText size="small" color="neutral-medium">{session.createdBy}</BodyText>
                  </td>
                  <td>
                    <BodyText size="small" color="neutral-medium">{session.lastEdited}</BodyText>
                  </td>
                  <td>
                    <div className="power-edit-sessions__row-actions" style={{ opacity: hoveredId === session.id ? 1 : 0 }}>
                      {activeTab === 'draft' ? (
                        <>
                          <Button
                            variant="outlined"
                            color="secondary"
                            size="small"
                            startIcon={<IconV2 name="pen-regular" size={13} />}
                            onClick={() => navigate('/people/power-edit/edit', {
                              state: { selectedIds: session.employeeIds, sessionName: session.name },
                            })}
                          >
                            Continue Edits
                          </Button>
                          <IconButton
                            icon="trash-can-regular"
                            aria-label="Delete draft"
                            variant="outlined"
                            color="secondary"
                            size="small"
                            onClick={() => setPendingDelete(session)}
                          />
                        </>
                      ) : (
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          startIcon={<IconV2 name="rotate-left-regular" size={13} />}
                          onClick={() => setPendingRevert(session)}
                        >
                          Revert Changes
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Delete confirmation modal */}
      <StandardModal isOpen={!!pendingDelete} onRequestClose={() => setPendingDelete(null)}>
        <StandardModal.HeroHeadline
          icon="trash-can-solid"
          iconColor="error-strong"
          text={`Delete "${pendingDelete?.name}"?`}
        />
        <StandardModal.Body
          renderFooter={
            <StandardModal.Footer
              actions={[
                <TextButton key="cancel" onClick={() => setPendingDelete(null)}>Cancel</TextButton>,
                <Button key="delete" variant="contained" color="primary" onClick={confirmDelete}>Delete</Button>,
              ]}
            />
          }
        >
          <StandardModal.UpperContent>
            <BodyText size="medium" color="neutral-medium">
              This draft and all of its unsaved changes will be permanently removed. This action cannot be undone.
            </BodyText>
          </StandardModal.UpperContent>
        </StandardModal.Body>
      </StandardModal>

      {/* Revert confirmation modal */}
      <StandardModal isOpen={!!pendingRevert} onRequestClose={() => setPendingRevert(null)}>
        <StandardModal.Body
          renderHeader={<StandardModal.Header title="Just checking..." />}
          renderFooter={
            <StandardModal.Footer
              actions={[
                <TextButton key="cancel" onClick={() => setPendingRevert(null)}>Cancel</TextButton>,
                <Button
                  key="revert"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    navigate('/people/power-edit/edit', {
                      state: {
                        selectedIds: pendingRevert?.employeeIds,
                        sessionName: pendingRevert?.name,
                        revert: true,
                      },
                    });
                    setPendingRevert(null);
                  }}
                >
                  Revert Changes
                </Button>,
              ]}
            />
          }
        >
          <StandardModal.UpperContent>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12, padding: '24px 0 16px', width: '100%' }}>
              <IconTile
                icon={<IconV2 name="rotate-left-regular" color="warning-strong" size={24} />}
                size={56}
                variant="muted"
              />
              <Headline size="small" component="h4" color="neutral-strong">Revert "{pendingRevert?.name}"?</Headline>
              <BodyText size="medium" color="neutral-weak">
                This will unpublish all changes and restore affected employees to their previous values. The edit will move back to your drafts.
              </BodyText>
            </div>
          </StandardModal.UpperContent>
        </StandardModal.Body>
      </StandardModal>
    </div>
    </>
  );
}

export default PowerEditSessions;
