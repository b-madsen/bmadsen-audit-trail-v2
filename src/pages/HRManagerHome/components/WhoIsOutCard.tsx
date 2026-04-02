import { useState } from 'react';
import { Gridlet, BodyText, Avatar, Pill, PillType, TextButton, InlineMessage, Button } from '@bamboohr/fabric';
import type { Absence } from '../../../data/hrManagerHomeTypes';
import { getAbsenceTypeLabel } from '../../../data/mockHRManagerData';
import './insights/InsightsCards.css';

interface WhoIsOutCardProps {
  todayAbsences: Absence[];
  weekAbsences: Absence[];
}

export function WhoIsOutCard({ todayAbsences, weekAbsences }: WhoIsOutCardProps) {
  const [showCoverageAlert, setShowCoverageAlert] = useState(true);

  // Combine today and week absences, removing duplicates
  const allAbsences = [...todayAbsences];
  weekAbsences.forEach(absence => {
    if (!allAbsences.find(a => a.id === absence.id)) {
      allAbsences.push(absence);
    }
  });

  const getPillType = (type: Absence['type']): PillType => {
    const types: Record<Absence['type'], PillType> = {
      vacation: PillType.Info,
      sick: PillType.Warning,
      personal: PillType.Neutral,
      parental: PillType.Success,
    };
    return types[type];
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endStr = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    if (startStr === endStr) return startStr;
    return `${startStr} - ${endStr}`;
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return days;
  };

  const isToday = (startDate: string, endDate: string) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    today.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    return today >= start && today <= end;
  };

  return (
    <Gridlet
      header={
        <Gridlet.Header
          title={`Who's Out (${allAbsences.length} this week)`}
          right={<TextButton size="small">View Calendar</TextButton>}
        />
      }
    >
      <Gridlet.Body>
        <div className="insights-card-content">
          {/* AI Coverage Alert */}
          {showCoverageAlert && (
            <InlineMessage
              status="ai"
              title="Coverage Gap Detected"
              description="Next Friday, 4 engineers will be out simultaneously. Consider rescheduling the sprint demo."
              action={
                <Button size="small" color="ai" variant="outlined" onClick={() => setShowCoverageAlert(false)}>
                  Notify Team Lead
                </Button>
              }
            />
          )}

          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Type</th>
                  <th>Dates</th>
                  <th>Duration</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {allAbsences.map((absence) => {
                  const duration = calculateDuration(absence.startDate, absence.endDate);
                  const outToday = isToday(absence.startDate, absence.endDate);

                  return (
                    <tr key={absence.id}>
                      <td>
                        <div className="employee-cell">
                          <Avatar
                            src={absence.employee.photoUrl}
                            alt={`${absence.employee.firstName} ${absence.employee.lastName}`}
                            size={32}
                          />
                          <div className="employee-info">
                            <BodyText size="small" weight="medium">
                              {absence.employee.firstName} {absence.employee.lastName}
                            </BodyText>
                            <BodyText size="extra-small" color="neutral-weak">
                              {absence.employee.department}
                            </BodyText>
                          </div>
                        </div>
                      </td>
                      <td>
                        <Pill muted type={getPillType(absence.type)}>
                          {getAbsenceTypeLabel(absence.type)}
                        </Pill>
                      </td>
                      <td>
                        <BodyText size="small">{formatDateRange(absence.startDate, absence.endDate)}</BodyText>
                      </td>
                      <td>
                        <BodyText size="small">
                          {duration} day{duration !== 1 ? 's' : ''}
                        </BodyText>
                      </td>
                      <td>
                        <Pill muted type={outToday ? PillType.Error : PillType.Neutral}>
                          {outToday ? 'Out Today' : 'Upcoming'}
                        </Pill>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}
