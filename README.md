# Artisian Aid

Artisian Aid is a comprehensive platform designed to bridge the gap between skilled artisans and employers. The platform provides a streamlined experience for artisans to showcase their skills and for employers to find and hire reliable local talent. It also includes a robust administration dashboard for managing user verifications and platform integrity.

## 🚀 Key Features

### For Artisans
- **Profile Management**: Create and maintain a professional profile showcasing skills and experience.
- **Verification System**: Secure process for artisans to verify their identities and skills.
- **Dashboard**: Personal dashboard to track work opportunities and status.

### For Employers
- **Talent Discovery**: Browse and filter artisans by category and skill.
- **Notification System**: Stay updated on hiring processes and artisan availability.
- **Subscription Verification**: Verified access to premium artisan listings.

### For Administrators
- **User Management**: Approve, decline, or report users to maintain platform quality.
- **Verification Queue**: Dedicated workflow for processing pending user verifications.
- **Reporting System**: Handle reported users and maintain a safe community.

## 🛠️ Tech Stack

- **Frontend**: React (v19)
- **Build Tool**: Vite
- **Routing**: React Router Dom (v7)
- **State/Data**: Axios for API requests
- **UI/UX**: 
  - `react-icons` for modern iconography
  - `react-toastify` for interactive notifications
  - `animate.css` for smooth UI transitions
- **Authentication**: JWT-based authentication with `jwt-decode`

## 📁 Project Structure

```text
src/
├── auth/            # Authentication components (Login, SignUp, etc.)
├── components/      # Reusable UI components (Header, Footer, Cards)
├── context/         # React Context for global state management
├── dashboards/      # Role-specific dashboards (Admin, Artisan, Employer)
├── pages/           # Main application pages (Home, About, Contact)
├── routes/          # Routing configuration and Private Routes
├── styles/          # Direct CSS and styling files
└── assets/          # Static assets and images
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ozi-Shalom2333/artisian-aid.git
   ```
2. Navigate to the project directory:
   ```bash
   cd artisian-aid
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### Building for Production Control

To create a production build:
```bash
npm run build
```

## 📜 Available Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Previews the production build locally.

## 🌐 Deployment

This project is configured for deployment on **Vercel**. Configuration details can be found in `vercel.json`.

---
© 2026 Artisian Aid. All rights reserved.
