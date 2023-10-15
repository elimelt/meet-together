import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './Header.js';
import { Footer } from './Footer.js';
import { FormInput } from './FormInput.js';
import { About } from './About.js';
import { Sort } from './FieldsPage.js';
import { Groups } from './Groups.js';

const list = [];

// [
//   { id: 1, name: 'elijah', active: true},
//   { id: 2, name: 'sriya', active: true},
//   { id: 3, name: 'rasmus', active: true},
//   { id: 4, name: 'simon', active: true},
//   { id: 5, name: 'max', active: true},
//   { id: 6, name: 'bella', active: true},
//   { id: 7, name: 'turner', active: true}
// ];

function App() {
  const [data, setData] = useState([])
  const dataGroups = [{name: 'rasmus@uw.edu'}, {name: 'bulusu@uw.edu'}, {name: 'elimelt@uw.edu'}, {name: 'simku22@uw.edu'}]
  return (
    <div id="app" className='ml-25 mr-25 flex flex-col h-screen'>
      <BrowserRouter>
        <Header setData={setData}/>
        <Routes>
          <Route path="/" element={<FormInput setData={setData} />} />
          <Route path="/about" element={<About />} />
          <Route path='/fields' element={<Sort data={data} setData={setData} />} />
          <Route path='/groups' element={<Groups data={dataGroups} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
