import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LandingPage from './screens/LandingPage/LandingPage';
import CreateNote from './screens/CreateNote/CreateNote';
import MyNotes from './screens/MyNotes/MyNotes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import SingleNote from './screens/SingleNote/SingleNote';
import { useState } from 'react';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';

const App = () => {
  const [search, setSearch] = useState('');
  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' exact element={<LoginScreen />} />
          <Route path='/profile' exact element={<ProfileScreen />} />
          <Route path='/register' exact element={<RegisterScreen />} />
          <Route path='/createNote' exact element={<CreateNote />} />
          <Route path='/note/:id' exact element={<SingleNote />} />
          <Route path='/mynotes' exact element={<MyNotes search={search} />} />

        </Routes>

      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
