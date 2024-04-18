import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from "react-oidc-context";
import oidcConfig from 'config/auth';
import App from './App';
import './index.scss';

ReactDOM.render(
   <React.StrictMode>
      <AuthProvider {...oidcConfig} onSigninCallback={handleSigninCallback}>
         <App />
      </AuthProvider>
   </React.StrictMode>,
   document.getElementById('root')
);

window.onbeforeunload = () => {
   window.scrollTo(0, 0);
};

function handleSigninCallback() {
   window.history.replaceState(
      {},
      document.title,
      window.location.pathname
   );
}