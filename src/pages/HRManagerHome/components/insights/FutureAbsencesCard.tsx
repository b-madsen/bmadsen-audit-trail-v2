import { Gridlet, BodyText, Avatar, Pill, PillType, Button } from '@bamboohr/fabric';
import type { Absence } from '../../../../data/hrManagerHomeTypes';
import { getAbsenceTypeLabel } from '../../../../data/mockHRManagerData';
import './InsightsCards.css';

interface FutureAbsencesCardProps {
  absences: Absence[];
  title?: string;
  subtitle?: string;
}

export function FutureAbsencesCard({ absences, title = 'Upcoming Absences' }: FutureAbsencesCardProps) {
  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endStr = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    if (startStr === endStr) return startStr;
    return `${startStr} - ${endStr}`;
  };

  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  };

  const getTypePillType = (type: Absence['type']): PillType => {
    const types: Record<Absence['type'], PillType> = {
      vacation: PillType.Info,
      sick: PillType.Warning,
      personal: PillType.Neutral,
      parental: PillType.Success,
    };
    return types[type];
  };

  return (
    <Gridlet header={<Gridlet.Header title={`${title} (${absences.length} planned)`} />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Type</th>
                  <th>Dates</th>
                  <th>Duration</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {absences.map((absence) => (
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
                      <Pill muted type={getTypePillType(absence.type)}>
                        {getAbsenceTypeLabel(absence.type)}
                      </Pill>
                    </td>
                    <td>
                      <BodyText size="small">{formatDateRange(absence.startDate, absence.endDate)}</BodyText>
                    </td>
                    <td>
                      <BodyText size="small">
                        {calculateDays(absence.startDate, absence.endDate)} day{calculateDays(absence.startDate, absence.endDate) > 1 ? 's' : ''}
                      </BodyText>
                    </td>
                    <td>
                      <Button size="small" variant="outlined" color="secondary">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}
