import { Header } from './Header.js';
import { Footer } from './Footer.js';
import Sort from './FieldsPage.js';

function App() {
  return (
    <div id="app" className='ml-25 mr-25 flex flex-col h-screen'>
      <Header />
      <Sort/>
      <Footer />
    </div>
  );
}

export default App;
