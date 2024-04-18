import { useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { Button } from 'react-bootstrap';
import { fetchAltinnToken } from 'config/auth';

export default function Login() {
   const [loading, setLoading] = useState(false);
   const [copied, setCopied] = useState(false);
   const auth = useAuth();

   async function copyToken() {
      setLoading(true);
      const token = auth.user?.access_token;

      if (token !== null) {
         navigator.clipboard.writeText(token)
            .then(() => {
               const timeout = setTimeout(() => {
                  setCopied(false);
                  clearTimeout(timeout);
               }, 3000);

               setCopied(true);
            });
      } else {
         alert('Noe gikk galt ved utveksling av Altinn-token')
      }

      setLoading(false);
   }

   return (
      <div className="loginButtons">
         {
            !auth.isAuthenticated ?
               <Button onClick={auth.signinRedirect}>Logg inn</Button> :
               <Button onClick={auth.signoutRedirect}>Logg ut</Button>
         }
         {
            auth.isAuthenticated ?
               <div className={`copyToken ${copied ? 'copied' : ''}`}>
                  <Button onClick={copyToken} >Kopier Altinn-token</Button>
                  {
                     loading ?
                        <div className="loader"></div> :
                        null
                  }
               </div> :
               null
         }
      </div>
   );
}