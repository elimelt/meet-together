import React, { useRef, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './Header.js';
import { Footer } from './Footer.js';
import { FormInput } from './FormInput.js';
import { About } from './About.js';
import { Sort } from './FieldsPage.js';
import { Groups } from './Groups.js';

function App() {
  const [formData, setFormData] = useState([])
  const [responseData, setResponseData] = useState([])
  const [weights, setWeights] = useState([])
  const formId = useRef(' ')

  console.log("formId in app: " + formId.current)

  return (
    <div id="app" className='ml-25 mr-25 flex flex-col h-screen'>
      <BrowserRouter>
        <Header setResponseData={setResponseData} setFormData={setFormData}/>
        <Routes>
          <Route path="/" element={<FormInput formId={formId} setFormData={setFormData} setResponseData={setResponseData} />} />
          <Route path="/about" element={<About />} />
          <Route path='/fields' element={<Sort formData={formData} setWeights={setWeights} setFormData={setFormData} />} />
          <Route path='/groups' element={<Groups formId={formId} weights={weights} responseData={responseData} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;