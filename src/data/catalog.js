export const categories = [
  {
    name: 'Carpentry Services',
    label: 'Carpentry',
    icon: 'Hammer',
    description: 'Furniture, fittings & thoughtful repairs',
    image: '/media/carpentry.webp',
  },
  {
    name: 'Home Cleaning Services',
    label: 'Home cleaning',
    icon: 'Sparkles',
    description: 'A fresh start for your space',
    image: '/media/laundry.webp',
  },
  {
    name: 'Electrical Services',
    label: 'Electrical',
    icon: 'Zap',
    description: 'Installations, wiring & maintenance',
  },
  {
    name: 'Painting Services',
    label: 'Painting',
    icon: 'Paintbrush',
    description: 'New colour, carefully finished',
  },
  {
    name: 'Plumbing Services',
    label: 'Plumbing',
    icon: 'Wrench',
    description: 'Leaks, fittings & everyday fixes',
  },
  {
    name: 'Gardening Services',
    label: 'Gardening',
    icon: 'Sprout',
    description: 'Greener spaces, inside and out',
  },
  {
    name: 'Laundry Services',
    label: 'Laundry',
    icon: 'Shirt',
    description: 'Wash, press & wardrobe care',
    image: '/media/laundry.webp',
  },
];

export const locations = [
  'Ikeja',
  'Lekki',
  'Surulere',
  'Yaba',
  'Ikoyi',
  'Agege',
  'Alimosho',
  'Lagos Island',
  'Lagos Mainland',
  'Ikorodu',
];
export const dashboardFor = (role) =>
  ({ Admin: '/admindashboard', Artisan: '/artisandashboard', Employer: '/employerdashboard' })[
    role
  ] || '/login';
export const DEMO_PASSWORD = 'Demo123!';
export const demoAccounts = [
  {
    role: 'Employer',
    label: 'Hire an artisan',
    email: 'chidinma@artisanaid.ng',
    name: 'Chidinma Okafor',
  },
  {
    role: 'Artisan',
    label: 'Manage your craft',
    email: 'ade@artisanaid.ng',
    name: 'Adewale Adeyemi',
  },
  {
    role: 'Admin',
    label: 'Review the community',
    email: 'admin@artisanaid.ng',
    name: 'Demo Administrator',
  },
];
