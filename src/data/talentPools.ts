export interface TalentPool {
  id: string;
  icon: string;
  title: string;
  candidatesCount: number;
}

export const talentPools: TalentPool[] = [
  {
    id: '1',
    icon: 'piggy-bank',
    title: 'Finance',
    candidatesCount: 3,
  },
  {
    id: '2',
    icon: 'bullhorn',
    title: 'Marketing',
    candidatesCount: 5,
  },
  {
    id: '3',
    icon: 'code',
    title: 'Software Engineer',
    candidatesCount: 2,
  },
];
