import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
export default function PublicLayout() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
