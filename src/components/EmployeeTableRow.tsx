import type { Employee } from '../data/employees';
import { Avatar, BodyText, Link } from '@bamboohr/fabric';

interface EmployeeTableRowProps {
  employee: Employee;
}

export function EmployeeTableRow({ employee }: EmployeeTableRowProps) {
  return (
    <tr className="group hover:bg-[var(--fabric-surface-color-neutral-extra-extra-weak)] transition-colors border-b border-[var(--fabric-border-color-neutral-extra-weak)]">
      {/* Employee Photo */}
      <td className="px-6 py-4">
        <Avatar src={employee.avatar} alt={employee.name} size={64} />
      </td>

      {/* Employee # */}
      <td className="px-6 py-4">
        <BodyText size="medium">{employee.employeeNumber}</BodyText>
      </td>

      {/* Last Name First Name */}
      <td className="px-6 py-4">
        <Link href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>
          <BodyText size="medium" color="primary">
            {employee.lastName}, {employee.firstName}
          </BodyText>
        </Link>
      </td>

      {/* Job Title */}
      <td className="px-6 py-4">
        <BodyText size="medium" color="neutral-medium">
          {employee.jobTitle}
        </BodyText>
      </td>

      {/* Location */}
      <td className="px-6 py-4">
        <BodyText size="medium" color="neutral-medium">
          {employee.location}
        </BodyText>
      </td>

      {/* Employment Status */}
      <td className="px-6 py-4">
        <BodyText size="medium" color="neutral-medium">
          {employee.employmentStatus}
        </BodyText>
      </td>

      {/* Hire Date */}
      <td className="px-6 py-4">
        <BodyText size="medium" color="neutral-medium">
          {employee.hireDate}
        </BodyText>
      </td>
    </tr>
  );
}

export default EmployeeTableRow;
