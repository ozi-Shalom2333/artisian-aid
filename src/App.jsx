import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "../ScrollToTop";


const App = () => {

  return (
    <>
      <ScrollToTop/>
      <ToastContainer />
      <div className="App">
        <Header />
         <main>
          <Outlet />
         </main>
        <Footer />
      </div>
    </>
  );
};

export default App;