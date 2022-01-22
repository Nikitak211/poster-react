import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import axios from 'axios';

import Header from "./components/header/Header";
import LoginForm from "./components/LoginForm/LoginForm";
import HomePage from './components/HomePage/HomePage';
import RegisterForm from "./components/RegisterForm/RegisterForm";
import ProfileSettings from './components/HomePage/components/ProfileSettings/ProfileSettings';

function App() {
  const [token, setToken] = useState();
  const [status, setStatus] = useState();

  const [visibleLogin, setVisibleLogin] = useState(false)
  const [visibleRegister, setVisibleRegister] = useState(false)

  const fetch = async () => {
    await axios.get('/api/auth/profile')
      .then(response => {
        
        const token = response.data.success;
        const status = response.data.outdated;
        console.log(status)
        setStatus(status)
        setToken(token);
      })
  }

  useEffect(() => {
    fetch()
  })

  if (status) {
    return (
      <div>
        <Header visibleLogin={visibleLogin} visibleRegister={visibleRegister} setVisibleRegister={setVisibleRegister} setVisibleLogin={setVisibleLogin} />
        {visibleRegister && <RegisterForm />}
        {visibleLogin && <LoginForm />}
      </div>
    )
  }
  if (token) {
    return (
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfileSettings />} />
          </Routes>
    )
  }

  return (
    <div></div>
  );
}

export default App;
