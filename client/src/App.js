import { useState, useEffect } from 'react'
import Header from "./components/header/Header";
import axios from 'axios';
import LoginForm from "./components/LoginForm/LoginForm";
import Dashboard from './components/Dashboard/Dashboard';
import RegisterForm from "./components/RegisterForm/RegisterForm";

function App() {

  const [token, setToken] = useState();
  const [visibleLogin, setVisibleLogin] = useState(true)
  const [visibleRegister, setVisibleRegister] = useState(true)

  const fetch = async () => {
    await axios.post('/api/auth/authed', {
      body: "hello"
    })
      .then(response => {
        const token = response.data.success
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
        <LoginForm />
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

  if (!token) {
    return (
      <div>
        <Header setVisibleLogin={setVisibleLogin} visibleLogin={visibleLogin} setVisibleRegister={setVisibleRegister} visibleRegister={visibleRegister} />
        <VisibleLogin />
        <VisibleRegister />

      </div>
    )
  }

  return (
    <div>
      <Dashboard />
    </div>
  );

}

export default App;
