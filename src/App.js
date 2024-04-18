import { useState } from 'react';
import { Provider } from 'react-redux';
import store from 'store';
import Logo from 'assets/gfx/logo-dibk.svg';
import Login from 'components/partials/Login';
import './App.scss';
import { useAuth } from "react-oidc-context";

const App = () => {
   const [username, setUsername] = useState('');

   const auth = useAuth();

   return (
      <Provider store={store}>
         <div className="App">
            <div className="container">
               <header>
                  <h1>
                     <img src={Logo} alt="DiBK" />
                     <div>
                        <span>ID-porten klient produksjon</span>
                        <span>Fellestjenester PLAN&BYGG</span>
                     </div>
                  </h1>

                  <Login />

                  <div className="token-info">
                     Here goes accessToken
                     </div>
               </header>
            </div>
         </div>
      </Provider>
   );
}

export default App;
