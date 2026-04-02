export interface TalentPool {
  id: string;
  icon: string;
  title: string;
  candidatesCount: number;
}

export const talentPools: TalentPool[] = [
  {
    id: '1',
    icon: 'star',
    title: 'Top Performers',
    candidatesCount: 45,
  },
  {
    id: '2',
    icon: 'code',
    title: 'Engineering Talent',
    candidatesCount: 128,
  },
  {
    id: '3',
    icon: 'graduation-cap',
    title: 'Recent Graduates',
    candidatesCount: 67,
  },
  {
    id: '4',
    icon: 'briefcase',
    title: 'Executive Search',
    candidatesCount: 23,
  },
  {
    id: '5',
    icon: 'users',
    title: 'Referrals',
    candidatesCount: 89,
  },
];
