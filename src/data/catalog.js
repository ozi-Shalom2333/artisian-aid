export const categories = [];
export const locations = [];
export const dashboardFor = (role) =>
  ({ Admin: '/admindashboard', Artisan: '/artisandashboard', Employer: '/employerdashboard' })[
    role
  ] || '/login';
