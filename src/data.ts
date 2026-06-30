import { Appointment, CRMLead, NavItem } from "./types";

export const navItems = [
  {
    group: "Main",
    items: [
      { id: "dashboard", label: "Overview", icon: "LayoutDashboard" },
      { id: "appointments", label: "Appointments", icon: "CalendarCheck" },
      { id: "crm", label: "Leads / CRM", icon: "Users" },
      { id: "calendar", label: "Calendar", icon: "Calendar" },
      { id: "workflows", label: "Workflows", icon: "GitMerge" },
      { id: "timeline", label: "Run timeline", icon: "Activity" },
      { id: "booking_links", label: "Booking links", icon: "Link" },
      { id: "reports", label: "Reports", icon: "FileText" },
      { id: "revenue", label: "Revenue", icon: "DollarSign" },
      { id: "reconciliation", label: "Reconciliation", icon: "RefreshCw" },
      { id: "monitoring", label: "Monitoring", icon: "ShieldAlert" },
      { id: "integrations", label: "Integrations", icon: "Plug" },
      { id: "seo", label: "SEO Guide", icon: "Search" },
      { id: "search_console", label: "Search Console", icon: "Search" },
      { id: "sitemap", label: "Sitemap audit", icon: "Map" },
    ]
  },
  {
    group: "SUPER ADMIN",
    items: [
      { id: "panels", label: "Panels", icon: "Layout" },
      { id: "admin", label: "Admin", icon: "Settings" },
    ]
  }
];

export const upcomingAppointments: Appointment[] = [
  { id: "1", customerName: "Eleanor Pena", service: "Premium Consultation", date: "2024-05-15", time: "10:00 AM", status: "confirmed", staff: "Dr. Sarah" },
  { id: "2", customerName: "Guy Hawkins", service: "Follow-up", date: "2024-05-15", time: "11:30 AM", status: "pending", staff: "Mike Ross" },
  { id: "3", customerName: "Brooklyn Simmons", service: "Initial Assessment", date: "2024-05-15", time: "02:00 PM", status: "confirmed", staff: "Dr. Sarah" },
  { id: "4", customerName: "Jane Cooper", service: "Therapy Session", date: "2024-05-16", time: "09:00 AM", status: "completed", staff: "Mike Ross" },
];

export const mockLeadPipeline: Record<string, CRMLead[]> = {
  new: [
    { id: "l1", name: "Darlene Robertson", email: "darlene@example.com", phone: "+1 555-1234", status: "new", value: 150, lastContact: "2h ago" },
    { id: "l2", name: "Jacob Jones", email: "jacob@example.com", phone: "+1 555-5678", status: "new", value: 300, lastContact: "5h ago" },
  ],
  interested: [
    { id: "l3", name: "Cody Fisher", email: "cody@example.com", phone: "+1 555-9012", status: "interested", value: 450, lastContact: "1d ago" },
  ],
  booked: [
    { id: "l4", name: "Bessie Cooper", email: "bessie@example.com", phone: "+1 555-3456", status: "booked", value: 150, lastContact: "2d ago" },
    { id: "l5", name: "Wade Warren", email: "wade@example.com", phone: "+1 555-7890", status: "booked", value: 600, lastContact: "3d ago" },
  ],
  converted: [
    { id: "l6", name: "Ralph Edwards", email: "ralph@example.com", phone: "+1 555-2345", status: "converted", value: 1200, lastContact: "1w ago" },
  ]
};

export const revenueData = [
  { name: 'Jan', revenue: 4000, bookings: 24 },
  { name: 'Feb', revenue: 5200, bookings: 35 },
  { name: 'Mar', revenue: 4800, bookings: 28 },
  { name: 'Apr', revenue: 7000, bookings: 45 },
  { name: 'May', revenue: 8500, bookings: 56 },
  { name: 'Jun', revenue: 11000, bookings: 78 },
];
