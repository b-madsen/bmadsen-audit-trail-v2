import type { Employee } from '../data/employees';
import { Avatar, IconV2, BodyText, Link } from '@bamboohr/fabric';
import './EmployeeCard.css';

interface EmployeeCardProps {
  employee: Employee;
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  return (
    <div className="employee-card">
      {/* Avatar */}
      <div className="employee-card-avatar">
        <Avatar src={employee.avatar} alt={employee.name} size={96} />
      </div>

      {/* Content */}
      <div className="employee-card-content">
        {/* Left Column */}
        <div className="employee-card-info">
          {/* Name */}
          <Link href={`/employees/${employee.id}`}>
            <span className="employee-card-name">{employee.name}</span>
          </Link>

          {/* Department */}
          <BodyText size="small" color="neutral-medium">
            {employee.department}
          </BodyText>

          {/* Location */}
          <BodyText size="small" color="neutral-weak">
            Location · {employee.location}
          </BodyText>

          {/* Division */}
          <BodyText size="small" color="neutral-weak">
            {employee.division}
          </BodyText>

          {/* Org Chart Icon */}
          <div className="employee-card-icon-link">
            <Link href={`/people/org-chart?employee=${employee.id}`}>
              <IconV2 name="users-solid" size={16} color="neutral-medium" />
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div className="employee-card-contact">
          {/* Email */}
          <div className="employee-card-contact-item">
            <IconV2 name="envelope-solid" size={16} color="neutral-medium" />
            <BodyText size="small" color="neutral-medium">
              {employee.email}
            </BodyText>
          </div>

          {/* Phone */}
          <div className="employee-card-contact-item">
            <IconV2 name="phone-solid" size={16} color="neutral-medium" />
            <BodyText size="small" color="neutral-medium">
              {employee.phone}
            </BodyText>
          </div>

          {/* Reports To */}
          <div className="employee-card-contact-item employee-card-contact-item--spaced">
            <IconV2 name="users-solid" size={16} color="neutral-medium" />
            <BodyText size="small" color="neutral-weak">
              Reports to {employee.reportsTo}
            </BodyText>
          </div>

          {/* Direct Reports */}
          <div className="employee-card-contact-item">
            <IconV2 name="users-solid" size={16} color="neutral-medium" />
            <BodyText size="small" color="neutral-weak">
              {employee.directReports} direct reports
            </BodyText>
          </div>
        </div>
      </div>
    </div>
  );
}
