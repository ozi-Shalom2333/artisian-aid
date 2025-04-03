import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='App'>
      <Header />
      {/* <main style={{ height: 'calc(100vh - 200px)', backgroundColor: '#f0f0f0' }}> */}
        <Outlet />
      <Footer />
    </div>
  )
}

export default App
