import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Routes from './routes';
import GlobalStyles from './styles/global';

function App() {
  return (
    <>
    <ToastContainer autoClose={3000} hideProgressBar />
    <Routes />
    <GlobalStyles />
    </>
  );
}

export default App;
