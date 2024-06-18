import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import "./App.css";
import logo from "./assets/logo_blink_whitebackground.gif";
import LoadingScreen from "./Components/LoadingScreen";
import Profile from "./tabs/Profile";
import Referral from "./tabs/Referral";
import Social from "./tabs/Social";

const MainScreen: React.FC = () => (
  <div className='custom-bg text-white min-h-screen flex flex-col items-center justify-center flex-grow'>
    <div className='Container flex flex-col items-center border-2 border-white p-4'>
      <img src={logo} alt='Logo' className='mb-4 max-w-full h-auto' />
      <a
        href='https://t.me/chatpayapp_bot/chatpayapp'
        target='_blank'
        rel='noopener noreferrer'
        className='text-blue-500 underline text-4xl font-bold mb-4'
      >
        NEW VERSION
      </a>
      <p className='mb-4 text-center'>
        You landed on an outdated version, we have a new UI and are testing our
        alpha version.
        <br />
        You can also join our{" "}
        <a
          href='https://discord.com/invite/sNCfQcXk'
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-500 underline'
        >
          Discord
        </a>
        ,{" "}
        <a
          href='https://t.me/ChatPayApp'
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-500 underline'
        >
          Telegram Channel
        </a>
        ,{" "}
        <a
          href='https://t.me/ChatPayCommunity'
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-500 underline'
        >
          Telegram Chat Group
        </a>
        , and follow us on{" "}
        <a
          href='https://x.com/chatpay_app'
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-500 underline'
        >
          X
        </a>
        .
      </p>
    </div>
  </div>
);

const AppContent: React.FC = () => {
  const location = useLocation();
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading process for 4 seconds
    setTimeout(() => {
      setAppLoading(false);
    }, 4000);
  }, []);

  if (appLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className='App'>
      <TransitionGroup>
        <CSSTransition key={location.key} classNames='slide' timeout={300}>
          <div>
            <Routes location={location}>
              <Route path='/' element={<MainScreen />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/referral' element={<Referral />} />
              <Route path='/social' element={<Social />} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
