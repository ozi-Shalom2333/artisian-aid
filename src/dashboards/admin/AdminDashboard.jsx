import { Outlet, useLocation } from 'react-router-dom';
import { UserCheck, BadgeCheck, UserX, Flag } from 'lucide-react';
import DashboardShell from '../../components/dashboard/DashboardShell';
export default function AdminDashboard() {
  const { pathname } = useLocation();
  const activeKey =
    pathname.split('/').pop() === 'admindashboard'
      ? 'pending-verification'
      : pathname.split('/').pop();
  const navSections = [
    {
      label: 'Community review',
      items: [
        {
          key: 'pending-verification',
          label: 'Pending verification',
          icon: UserCheck,
          to: '/admindashboard/pending-verification',
        },
        {
          key: 'approved-users',
          label: 'Approved profiles',
          icon: BadgeCheck,
          to: '/admindashboard/approved-users',
        },
        {
          key: 'declined-users',
          label: 'Declined profiles',
          icon: UserX,
          to: '/admindashboard/declined-users',
        },
        {
          key: 'reported-users',
          label: 'Reported profiles',
          icon: Flag,
          to: '/admindashboard/reported-users',
        },
      ],
    },
  ];
  return (
    <DashboardShell
      navSections={navSections}
      activeKey={activeKey}
      headerTitle="Care for the community."
      headerSubtitle="Review profiles, explain decisions and keep the next step clear."
    >
      <Outlet />
    </DashboardShell>
  );
}
