import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  CardType, CardData, UniversityData, SchoolData, EmployeeData, EventData,
} from '@/types/idcard';

interface Props {
  cardType: CardType;
  data: CardData;
  onChange: (data: CardData) => void;
}

const Field = ({ label, value, field, onChange }: { label: string; value: string; field: string; onChange: (f: string, v: string) => void }) => (
  <div className="space-y-1.5">
    <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
    <Input
      value={value}
      onChange={e => onChange(field, e.target.value)}
      placeholder={label}
      className="h-9 text-sm glass border-border/50"
    />
  </div>
);

const CardForm = ({ cardType, data, onChange }: Props) => {
  const handleChange = (field: string, value: string) => {
    onChange({ ...data, [field]: value } as CardData);
  };

  if (cardType === 'university') {
    const d = data as UniversityData;
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="University Name" value={d.universityName} field="universityName" onChange={handleChange} />
        <Field label="Student Name" value={d.studentName} field="studentName" onChange={handleChange} />
        <Field label="Department" value={d.department} field="department" onChange={handleChange} />
        <Field label="Roll Number" value={d.rollNumber} field="rollNumber" onChange={handleChange} />
        <Field label="Year" value={d.year} field="year" onChange={handleChange} />
        <Field label="Date of Birth" value={d.dob} field="dob" onChange={handleChange} />
        <Field label="Address" value={d.address} field="address" onChange={handleChange} />
        <Field label="Phone" value={d.phone} field="phone" onChange={handleChange} />
      </div>
    );
  }

  if (cardType === 'school') {
    const d = data as SchoolData;
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="School Name" value={d.schoolName} field="schoolName" onChange={handleChange} />
        <Field label="Student Name" value={d.studentName} field="studentName" onChange={handleChange} />
        <Field label="Class" value={d.className} field="className" onChange={handleChange} />
        <Field label="Section" value={d.section} field="section" onChange={handleChange} />
        <Field label="Roll Number" value={d.rollNumber} field="rollNumber" onChange={handleChange} />
        <Field label="Date of Birth" value={d.dob} field="dob" onChange={handleChange} />
        <Field label="Guardian Name" value={d.guardianName} field="guardianName" onChange={handleChange} />
        <Field label="Phone" value={d.phone} field="phone" onChange={handleChange} />
      </div>
    );
  }

  if (cardType === 'employee') {
    const d = data as EmployeeData;
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Company Name" value={d.companyName} field="companyName" onChange={handleChange} />
        <Field label="Employee Name" value={d.employeeName} field="employeeName" onChange={handleChange} />
        <Field label="Designation" value={d.designation} field="designation" onChange={handleChange} />
        <Field label="Department" value={d.department} field="department" onChange={handleChange} />
        <Field label="Employee ID" value={d.employeeId} field="employeeId" onChange={handleChange} />
        <Field label="Date of Birth" value={d.dob} field="dob" onChange={handleChange} />
        <Field label="Phone" value={d.phone} field="phone" onChange={handleChange} />
        <Field label="Blood Group" value={d.bloodGroup} field="bloodGroup" onChange={handleChange} />
      </div>
    );
  }

  const d = data as EventData;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <Field label="Event Name" value={d.eventName} field="eventName" onChange={handleChange} />
      <Field label="Attendee Name" value={d.attendeeName} field="attendeeName" onChange={handleChange} />
      <Field label="Role / Category" value={d.role} field="role" onChange={handleChange} />
      <Field label="Date" value={d.date} field="date" onChange={handleChange} />
      <Field label="Valid Through" value={d.validThrough} field="validThrough" onChange={handleChange} />
    </div>
  );
};

export default CardForm;
