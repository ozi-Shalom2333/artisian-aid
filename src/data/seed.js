import { categories } from './catalog.js';

const artisan = (
  id,
  fullname,
  businessName,
  categoryIndex,
  location,
  bio,
  status = 'Approved',
) => ({
  _id: `artisan-${id}`,
  fullname,
  businessName,
  role: 'Artisan',
  email: id === 1 ? 'ade@artisanaid.ng' : `artisan${id}@example.com`,
  phoneNumber: id === 8 ? '08022345678' : `0801234567${id}`,
  category: categories[categoryIndex].name,
  location: { lga: location },
  bio,
  verificationStatus: status,
  restricted: false,
  availability: true,
  socialMediaLink: '',
  coverPhoto: {
    illustrative: true,
    image_url:
      categoryIndex === 0
        ? '/media/carpentry.webp'
        : categoryIndex === 1 || categoryIndex === 6
          ? '/media/laundry.webp'
          : '/media/workshop.webp',
  },
  portfolio:
    categoryIndex === 0
      ? [
          {
            _id: `work-${id}`,
            image_url: '/media/carpentry.webp',
            title: 'Workshop details',
            illustrative: true,
          },
        ]
      : [],
  verificationId: {
    _id: `verification-${id}`,
    guarantorName: 'Sample Guarantor',
    guarantorPhoneNumber: '08000000000',
    documentName: 'sample-certificate.svg',
    workCertificate: { image_url: '/sample-certificate.svg' },
  },
  verificationReason: '',
  subscription: null,
});

export function createSeed() {
  const users = [
    artisan(
      1,
      'Adewale Adeyemi',
      'Adeyemi Woodworks',
      0,
      'Ikeja',
      'Custom furniture, wardrobes and kitchen fittings. I enjoy turning practical ideas into pieces that feel at home in your space.',
    ),
    artisan(
      2,
      'Ngozi Eze',
      'CleanSpace Home Services',
      1,
      'Lekki',
      'Careful home and office cleaning, with a plan that fits your space. Tell me what needs attention and we can work out the details.',
    ),
    artisan(
      3,
      'Chukwuemeka Obi',
      'Obi Electrical Solutions',
      2,
      'Yaba',
      'Residential installations, repairs and maintenance. I start by understanding the fault and explaining the work needed.',
    ),
    artisan(
      4,
      'Fatima Bello',
      'Bello Painting Co.',
      3,
      'Surulere',
      'Interior and exterior painting with an eye for a neat finish. I can help you plan colours, preparation and materials.',
    ),
    artisan(
      5,
      'Tunde Bakare',
      'Bakare Plumbing',
      4,
      'Ikoyi',
      'Plumbing repairs, fittings and maintenance for homes and small offices. Clear communication from the first visit.',
    ),
    artisan(
      6,
      'Adaeze Nwogu',
      'GreenThumb Gardens',
      5,
      'Lekki',
      'Garden maintenance and small landscaping projects. Thoughtful care for lawns, plants and outdoor spaces.',
    ),
    artisan(
      7,
      'Ibrahim Sule',
      'Sule Laundry Care',
      6,
      'Ikeja',
      'Laundry and ironing for your everyday wardrobe. Pickup and turnaround are agreed before the job starts.',
      'Pending',
    ),
    artisan(
      8,
      'Kehinde Alade',
      'Alade Home Repairs',
      0,
      'Agege',
      'Door repairs, shelving and general carpentry around the home.',
      'Declined',
    ),
    {
      _id: 'employer-1',
      fullname: 'Chidinma Okafor',
      email: 'chidinma@artisanaid.ng',
      phoneNumber: '08012345678',
      role: 'Employer',
      location: { lga: 'Lekki' },
      bio: 'Making a little more room for life at home.',
    },
    {
      _id: 'employer-2',
      fullname: 'Yusuf Lawal',
      email: 'yusuf@example.com',
      phoneNumber: '08055554444',
      role: 'Employer',
      location: { lga: 'Ikeja' },
    },
    {
      _id: 'admin-1',
      fullname: 'Demo Administrator',
      email: 'admin@artisanaid.ng',
      phoneNumber: '08000000000',
      role: 'Admin',
    },
  ];
  users[7].verificationReason = 'The sample document was unclear. Please submit a readable copy.';
  const day = (offset) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date.toISOString().slice(0, 10);
  };
  return {
    version: 2,
    users,
    bookings: [
      {
        _id: 'booking-1',
        employerId: 'employer-1',
        artisanId: 'artisan-1',
        serviceTitle: 'A wardrobe that fits',
        serviceDescription:
          'Build a simple wardrobe for the main bedroom. I would like to discuss measurements and a material estimate.',
        location: 'Sample address, Lekki, Lagos',
        phoneNumber: '08012345678',
        date: day(4),
        status: 'Pending',
        createdAt: new Date().toISOString(),
      },
      {
        _id: 'booking-2',
        employerId: 'employer-2',
        artisanId: 'artisan-1',
        serviceTitle: 'Kitchen cabinet fittings',
        serviceDescription: 'Fit new cabinet doors and repair two loose hinges.',
        location: 'Sample address, Ikeja, Lagos',
        phoneNumber: '08055554444',
        date: day(6),
        status: 'Pending',
        createdAt: new Date().toISOString(),
      },
      {
        _id: 'booking-3',
        employerId: 'employer-1',
        artisanId: 'artisan-1',
        serviceTitle: 'Bookshelf installation',
        serviceDescription: 'Install a wall-mounted bookshelf in the study.',
        location: 'Sample address, Lekki, Lagos',
        phoneNumber: '08012345678',
        date: day(2),
        status: 'Confirmed',
        createdAt: new Date().toISOString(),
      },
    ],
    reports: [
      {
        _id: 'report-1',
        artisanId: 'artisan-4',
        employerId: 'employer-1',
        reason: 'The sample appointment was missed and the customer would like an update.',
        status: 'Open',
        createdAt: new Date().toISOString(),
      },
    ],
    messages: [],
    plans: [
      {
        _id: 'plan-basic',
        planName: 'Basic',
        amount: 2000,
        duration: 'month',
        description: 'A starting point for your business.',
        features: ['Public artisan profile', 'Work gallery', 'Booking requests'],
      },
      {
        _id: 'plan-premium',
        planName: 'Premium',
        amount: 5000,
        duration: 'month',
        description: 'Explore a subscription upgrade.',
        features: [
          'Everything in Basic',
          'A preview of enhanced visibility',
          'A sample premium badge',
        ],
      },
    ],
  };
}
