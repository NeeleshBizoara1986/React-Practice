import React, { Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ThemeProvider } from './context/ThemeContext'
import ThemeButton from './components/ThemeButton'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import "./index.css";
import "./styles/theme.css";
// import DataComponentPage from './components/dataComponent/dataComponent'
import HomePage from './components/home/Home'
import Debounce from './components/debounce/Debounce'
import Throttle from './components/throttle/Throttle'
// import AboutPage from './components/about/About'
const AboutPage = React.lazy(() => import('./components/about/About'));

const DataComponentPage = React.lazy(() =>
  import('./components/dataComponent/dataComponent').then(module => ({
    default: module.DataComponentPage
  }))
);


function App() {
  const isAdmin = false; // Replace with actual logic
  return (
    <>
      <h1 class="text-3xl font-bold underline">
        Hello world!
      </h1>
      <ThemeProvider>
        <ThemeButton />
        <BrowserRouter>

          <nav>
            <Link to="/" >Home</Link>
            <Link to="/data">RBAC Data</Link>
            <Link to="/about">About</Link>
            <Link to='/Debounce'>Debounce</Link>
            <Link to='/Throttle'>Throttle</Link>
          </nav>

          <Suspense fallback={<div>Loading Home...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/data" element={isAdmin ? <AboutPage /> : <DataComponentPage />} />
              {/* <Route path="/data" element={<DataComponentPage />} /> */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/Debounce" element={<Debounce />} />
              <Route path="/Throttle" element={<Throttle />} />
            </Routes>
          </Suspense>

        </BrowserRouter>

      </ThemeProvider>
    </>
  )
}

export default App
