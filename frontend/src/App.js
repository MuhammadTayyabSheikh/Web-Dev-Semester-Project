import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LandingPage from './screens/LandingPage/LandingPage';
import MyNotes from './screens/MyNotes/MyNotes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        {/* <LandingPage/> */}
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/mynotes' exact element={<MyNotes />} />
        </Routes>

      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
