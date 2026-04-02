export interface CurrentEmployee {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  preferredName: string;
  pronouns: string;
  title: string;
  avatar: string;
  workPhone: string;
  mobilePhone: string;
  workEmail: string;
  personalEmail: string;
  linkedIn: string;
  localTime: string;
  location: string;
  department: string;
  hireDate: string;
  tenure: string;
  birthDate: string;
  ssn: string;
  gender: string;
  genderIdentity: string;
  maritalStatus: string;
  tshirtSize: string;
  favoriteCereal: string;
  manager: {
    name: string;
    title: string;
    avatar: string;
  };
  directReports: string[];
  moreReportsCount: number;
  passports: {
    number: string;
    issued: string;
    expiry: string;
    country: string;
  }[];
}

export const currentEmployee: CurrentEmployee = {
  id: 1,
  firstName: 'Jessica',
  lastName: 'Cordova',
  middleName: '',
  preferredName: 'Jess',
  pronouns: 'She/Her',
  title: 'Director, Demand Generation in Marketing',
  avatar: 'https://i.pravatar.cc/216?u=jess',
  workPhone: '801-763-1893 x 6109',
  mobilePhone: '801-344-1998',
  workEmail: 'jcordova@bamboohr.com',
  personalEmail: 'cordovathejess@gmail.com',
  linkedIn: 'linkedin.com/jesscordova',
  localTime: '7:49 AM local time',
  location: 'Salt Lake City, UT',
  department: 'Marketing',
  hireDate: 'Aug 28, 2015',
  tenure: '4y -2m -10d',
  birthDate: '01 Nov 1991',
  ssn: '648-55-2415',
  gender: 'Female',
  genderIdentity: 'Female',
  maritalStatus: 'Single',
  tshirtSize: 'Medium',
  favoriteCereal: 'Crispix',
  manager: {
    name: 'Lucy Samuels',
    title: 'VP, Marketing',
    avatar: 'https://i.pravatar.cc/40?u=lucy',
  },
  directReports: [
    'Alan Nguyen',
    'Jeff Hawkins',
    'Melinda Pittman',
    'Tony Fonseca',
  ],
  moreReportsCount: 5,
  passports: [
    { number: '31195855', issued: '5/7/16', expiry: '5/7/26', country: 'United States' },
    { number: '54882-22272', issued: '7/18/17', expiry: '7/18/27', country: 'Italy' },
    { number: '622-555-4', issued: '1/28/17', expiry: '1/28/27', country: 'Germany' },
  ],
};
