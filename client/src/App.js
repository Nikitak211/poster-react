import { useState, useEffect } from 'react'
import axios from 'axios';

import Header from "./components/header/Header";
import LoginForm from "./components/LoginForm/LoginForm";
import HomePage from './components/HomePage/HomePage';
import RegisterForm from "./components/RegisterForm/RegisterForm";

function App() {

  const [token, setToken] = useState();
  const [status, setStatus] = useState();

  const [visibleLogin, setVisibleLogin] = useState(true)
  const [visibleRegister, setVisibleRegister] = useState(true)

  const fetch = async () => {
    await axios.post('/api/auth/authed', {
      body: true
    })
      .then(response => {
        const token = response.data.success;
        const status = response.data.status;
        setStatus(status)
        setToken(token);
      })
  }

  useEffect(() => {
    fetch()
  })

  const VisibleLogin = () => {
    if (visibleLogin) {
      return (
        <div>
        </div>
      )
    } else {
      return (
        <LoginForm/>
      )
    }
  }

  const VisibleRegister = () => {
    if (visibleRegister) {
      return (
        <div>
        </div>
      )
    } else {
      return (
        <RegisterForm />
      )
    }
  }

  if (status) {
    return (
      <div>
        <Header setVisibleLogin={setVisibleLogin} visibleLogin={visibleLogin} setVisibleRegister={setVisibleRegister} visibleRegister={visibleRegister} />
        <VisibleLogin />
        <VisibleRegister />

      </div>
    )
  }
  if (token) {
    return (
      <div>
        <HomePage />
      </div>
    )
  }

  return (
    <div>
      
    </div>
  );

}

export default App;
