import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LandingPage from './screens/LandingPage/LandingPage';
import CreateNote from './screens/CreateNote/CreateNote';
import MyNotes from './screens/MyNotes/MyNotes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' exact element={<LoginScreen />} />
          <Route path='/register' exact element={<RegisterScreen />} />
          <Route path='/createNote' exact element={<CreateNote />} />
          <Route path='/mynotes' exact element={<MyNotes />} />

        </Routes>

      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
