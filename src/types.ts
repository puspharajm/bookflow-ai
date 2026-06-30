export type NavItem = {
  id: string;
  label: string;
  icon: string;
};

export type Appointment = {
  id: string;
  customerName: string;
  service: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed' | 'no-show';
  staff: string;
};

export type CRMLead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'new' | 'interested' | 'booked' | 'converted' | 'lost';
  value: number;
  lastContact: string;
};
