import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from "./redux/store";
import { AuthContextProvider } from './Context/AuthContext';
ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();