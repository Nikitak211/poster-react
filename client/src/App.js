import Header from "./Header";
import {useState} from 'react'
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function App() {
  const [visibleLogin, setVisibleLogin] = useState(true)
  const [visibleRegister, setVisibleRegister] = useState(true)
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
            <RegisterForm/>
          )
      }   
    }

  return (
    <div>
    <Header setVisibleLogin={setVisibleLogin} visibleLogin={visibleLogin} setVisibleRegister={setVisibleRegister} visibleRegister={visibleRegister}/>
    <VisibleLogin/>
    <VisibleRegister/>
    </div>
  );
}

export default App;
