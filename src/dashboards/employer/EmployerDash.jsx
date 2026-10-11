import { useSearchParams } from 'react-router-dom';
import { ClipboardList, UserRound, ShieldCheck } from 'lucide-react';
import DashboardShell from '../../components/dashboard/DashboardShell';
import Bookings from '../../features/dashboard/Bookings';
import ProfileEditor from '../../features/dashboard/ProfileEditor';
import Security from '../../features/dashboard/Security';
import useAuth from '../../hooks/useAuth';
const titles = {
  requests: 'A little less on your to-do list.',
  profile: 'Your profile, your introduction.',
  security: 'Your account, clearly explained.',
};
export default function EmployerDash() {
  const [params] = useSearchParams();
  const auth = useAuth();
  const tab = Object.hasOwn(titles, params.get('tab')) ? params.get('tab') : 'requests';
  const navSections = [
    {
      label: 'Your projects',
      items: [
        {
          key: 'requests',
          label: 'My requests',
          icon: ClipboardList,
          to: '/employerdashboard?tab=requests',
        },
      ],
    },
    {
      label: 'Your account',
      items: [
        {
          key: 'profile',
          label: 'Personal profile',
          icon: UserRound,
          to: '/employerdashboard?tab=profile',
        },
        {
          key: 'security',
          label: 'Security & privacy',
          icon: ShieldCheck,
          to: '/employerdashboard?tab=security',
        },
      ],
    },
  ];
  return (
    <DashboardShell
      navSections={navSections}
      activeKey={tab}
      headerTitle={titles[tab]}
      headerSubtitle={`Welcome, ${auth.user?.fullname.split(' ')[0]}. Keep your next project moving.`}
    >
      {tab === 'requests' ? <Bookings /> : tab === 'profile' ? <ProfileEditor /> : <Security />}
    </DashboardShell>
  );
}
