import { useSearchParams } from 'react-router-dom';
import {
  ClipboardList,
  UserRound,
  ShieldCheck,
  BadgeCheck,
  ImagePlus,
  CreditCard,
} from 'lucide-react';
import DashboardShell from '../../components/dashboard/DashboardShell';
import Bookings from '../../features/dashboard/Bookings';
import ProfileEditor from '../../features/dashboard/ProfileEditor';
import Security from '../../features/dashboard/Security';
import Verification from '../../features/dashboard/Verification';
import WorkGallery from '../../features/dashboard/WorkGallery';
import Plans from '../../features/dashboard/Plans';
import useAuth from '../../hooks/useAuth';
const titles = {
  requests: 'Good work is waiting.',
  profile: 'Let your craft be seen.',
  verification: 'Build a little more confidence.',
  gallery: 'The details make the difference.',
  plans: 'Room for your business to grow.',
  security: 'Your account, clearly explained.',
};
const components = {
  requests: Bookings,
  profile: ProfileEditor,
  verification: Verification,
  gallery: WorkGallery,
  plans: Plans,
  security: Security,
};
export default function ArtisanDashboard() {
  const [params] = useSearchParams();
  const auth = useAuth();
  const tab = Object.hasOwn(titles, params.get('tab')) ? params.get('tab') : 'requests';
  const Component = components[tab];
  const navSections = [
    {
      label: 'Your business',
      items: [
        {
          key: 'requests',
          label: 'Job requests',
          icon: ClipboardList,
          to: '/artisandashboard?tab=requests',
        },
        {
          key: 'gallery',
          label: 'Work gallery',
          icon: ImagePlus,
          to: '/artisandashboard?tab=gallery',
        },
        {
          key: 'plans',
          label: 'Plan preview',
          icon: CreditCard,
          to: '/artisandashboard?tab=plans',
        },
      ],
    },
    {
      label: 'Your profile',
      items: [
        {
          key: 'profile',
          label: 'Personal profile',
          icon: UserRound,
          to: '/artisandashboard?tab=profile',
        },
        {
          key: 'verification',
          label: 'Profile verification',
          icon: BadgeCheck,
          to: '/artisandashboard?tab=verification',
        },
        {
          key: 'security',
          label: 'Security & privacy',
          icon: ShieldCheck,
          to: '/artisandashboard?tab=security',
        },
      ],
    },
  ];
  return (
    <DashboardShell
      navSections={navSections}
      activeKey={tab}
      headerTitle={titles[tab]}
      headerSubtitle={`Welcome, ${auth.user?.fullname.split(' ')[0]}. Make space for your next project.`}
    >
      <Component />
    </DashboardShell>
  );
}
