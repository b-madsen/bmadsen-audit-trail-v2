import type { Employee } from '../data/employees';
import { Avatar, IconV2, BodyText } from '@bamboohr/fabric';
import './EmployeeCard.css';

interface EmployeeCardProps {
  employee: Employee;
  reportsToName?: string;
}

export function EmployeeCard({ employee, reportsToName }: EmployeeCardProps) {
  return (
    <div className="employee-card">
      {/* Avatar */}
      <div className="employee-card-avatar">
        <Avatar src={employee.avatar} alt={employee.name} size={128} />
      </div>

      {/* Content */}
      <div className="employee-card-content">
        {/* Left Column - Info */}
        <div className="employee-card-info">
          <span className="employee-card-name">{employee.name}</span>
          <BodyText size="small" color="neutral-medium">
            {employee.department}
          </BodyText>
          <BodyText size="small" color="neutral-weak">
            Location · {employee.location}
          </BodyText>
          <BodyText size="small" color="neutral-weak">
            {employee.division}
          </BodyText>
          <div className="employee-card-icon-link">
            <IconV2 name="users-regular" size={16} color="neutral-medium" />
          </div>
        </div>

        {/* Middle Column - Contact */}
        <div className="employee-card-contact">
          <div className="employee-card-contact-item">
            <IconV2 name="envelope-regular" size={16} color="neutral-medium" />
            <BodyText size="small" color="neutral-medium">
              {employee.email}
            </BodyText>
          </div>
          <div className="employee-card-contact-item">
            <IconV2 name="phone-regular" size={16} color="neutral-medium" />
            <BodyText size="small" color="neutral-medium">
              {employee.phone}
            </BodyText>
          </div>
        </div>

        {/* Right Column - Reporting */}
        <div className="employee-card-reporting">
          <div className="employee-card-contact-item">
            <IconV2 name="circle-user-regular" size={16} color="neutral-medium" />
            <BodyText size="small" color="neutral-weak">
              Reports to {reportsToName ?? '—'}
            </BodyText>
          </div>
          <div className="employee-card-contact-item">
            <IconV2 name="sitemap-regular" size={16} color="neutral-medium" />
            <BodyText size="small" color="neutral-weak">
              {employee.directReports} direct {employee.directReports === 1 ? 'report' : 'reports'}
            </BodyText>
          </div>
        </div>
      </div>
    </div>
  );
}
