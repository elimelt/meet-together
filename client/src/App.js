import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './Header.js';
import { Footer } from './Footer.js';
import { FormInput } from './FormInput.js';
import { About } from './About.js';

function App() {
  return (
    <>
      <div id="app" className='ml-25 mr-25 flex flex-col h-screen'>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FormInput/>} />
            <Route path="/about" element={<About/>} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </>
  );
}

export default App;
