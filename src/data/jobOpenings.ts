export interface JobOpening {
  id: string;
  title: string;
  location: string;
  hiringLead: string;
  createdOn: string;
  status: 'Open' | 'Draft' | 'Closed';
  candidatesCount: number;
  newCandidatesCount: number;
}

export const jobOpenings: JobOpening[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    location: 'Remote - US',
    hiringLead: 'Sarah Mitchell',
    createdOn: 'Jan 15, 2026',
    status: 'Open',
    candidatesCount: 45,
    newCandidatesCount: 8,
  },
  {
    id: '2',
    title: 'Product Designer',
    location: 'Austin, TX',
    hiringLead: 'Michael Chen',
    createdOn: 'Jan 20, 2026',
    status: 'Open',
    candidatesCount: 32,
    newCandidatesCount: 5,
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    location: 'Seattle, WA',
    hiringLead: 'David Kim',
    createdOn: 'Feb 1, 2026',
    status: 'Open',
    candidatesCount: 18,
    newCandidatesCount: 3,
  },
  {
    id: '4',
    title: 'Marketing Manager',
    location: 'Remote - US',
    hiringLead: 'Jessica Cordova',
    createdOn: 'Feb 5, 2026',
    status: 'Draft',
    candidatesCount: 0,
    newCandidatesCount: 0,
  },
  {
    id: '5',
    title: 'Sales Representative',
    location: 'Chicago, IL',
    hiringLead: 'James Wilson',
    createdOn: 'Jan 25, 2026',
    status: 'Open',
    candidatesCount: 67,
    newCandidatesCount: 12,
  },
  {
    id: '6',
    title: 'HR Coordinator',
    location: 'Boston, MA',
    hiringLead: 'Sarah Mitchell',
    createdOn: 'Feb 10, 2026',
    status: 'Draft',
    candidatesCount: 0,
    newCandidatesCount: 0,
  },
  {
    id: '7',
    title: 'Customer Success Manager',
    location: 'Miami, FL',
    hiringLead: 'Robert Garcia',
    createdOn: 'Jan 30, 2026',
    status: 'Open',
    candidatesCount: 28,
    newCandidatesCount: 4,
  },
];
