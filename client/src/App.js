import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './Header.js';
import { Footer } from './Footer.js';
import { FormInput } from './FormInput.js';
import { About } from './About.js';
import { Sort } from './FieldsPage.js';


function App() {
  return (
    <>
      <div id="app" className='ml-25 mr-25 flex flex-col h-screen'>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<FormInput/>} />
            <Route path="/about" element={<About/>} />
            <Route path='/fields' element={<Sort />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
