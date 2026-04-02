export interface Candidate {
  id: string;
  name: string;
  location: string;
  phone: string;
  jobTitle: string;
  jobLocation: string;
  status: string;
  statusTimestamp: string;
  rating: number;
  lastEmail: string;
  lastEmailTimestamp: string;
}

export const candidates: Candidate[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    location: 'San Francisco, CA',
    phone: '(415) 555-0123',
    jobTitle: 'Senior Software Engineer',
    jobLocation: 'Remote - US',
    status: 'Interview Scheduled',
    statusTimestamp: 'Feb 15, 2026',
    rating: 4,
    lastEmail: 'Interview Confirmation',
    lastEmailTimestamp: 'Feb 14, 2026',
  },
  {
    id: '2',
    name: 'Maria Garcia',
    location: 'Austin, TX',
    phone: '(512) 555-0456',
    jobTitle: 'Product Designer',
    jobLocation: 'Austin, TX',
    status: 'Application Review',
    statusTimestamp: 'Feb 13, 2026',
    rating: 5,
    lastEmail: 'Application Received',
    lastEmailTimestamp: 'Feb 12, 2026',
  },
  {
    id: '3',
    name: 'David Chen',
    location: 'Seattle, WA',
    phone: '(206) 555-0789',
    jobTitle: 'DevOps Engineer',
    jobLocation: 'Seattle, WA',
    status: 'Phone Screen',
    statusTimestamp: 'Feb 12, 2026',
    rating: 3,
    lastEmail: 'Phone Screen Invite',
    lastEmailTimestamp: 'Feb 11, 2026',
  },
  {
    id: '4',
    name: 'Sarah Williams',
    location: 'Denver, CO',
    phone: '(303) 555-0234',
    jobTitle: 'Marketing Manager',
    jobLocation: 'Remote - US',
    status: 'Final Interview',
    statusTimestamp: 'Feb 14, 2026',
    rating: 5,
    lastEmail: 'Final Round Details',
    lastEmailTimestamp: 'Feb 13, 2026',
  },
  {
    id: '5',
    name: 'James Brown',
    location: 'Chicago, IL',
    phone: '(312) 555-0567',
    jobTitle: 'Sales Representative',
    jobLocation: 'Chicago, IL',
    status: 'Offer Extended',
    statusTimestamp: 'Feb 15, 2026',
    rating: 4,
    lastEmail: 'Offer Letter',
    lastEmailTimestamp: 'Feb 15, 2026',
  },
  {
    id: '6',
    name: 'Emily Davis',
    location: 'Boston, MA',
    phone: '(617) 555-0890',
    jobTitle: 'HR Coordinator',
    jobLocation: 'Boston, MA',
    status: 'Application Review',
    statusTimestamp: 'Feb 10, 2026',
    rating: 3,
    lastEmail: 'Application Received',
    lastEmailTimestamp: 'Feb 9, 2026',
  },
];
