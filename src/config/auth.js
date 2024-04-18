import { WebStorageStateStore } from 'oidc-client-ts';
import axios from 'axios';

const AUTH_LOGIN_REDIRECT_URI = process.env.REACT_APP_AUTH_LOGIN_REDIRECT_URI;
const AUTH_LOGOUT_REDIRECT_URI = process.env.REACT_APP_AUTH_LOGOUT_REDIRECT_URI;
const EXCHANGE_ALTINN_TOKEN_URL = process.env.REACT_APP_EXCHANGE_ALTINN_TOKEN_URL;

const oidcConfig = {
   authority: 'https://idporten.no',
   client_id: '3bb05d5e-7e55-4a1f-8e8c-fdc6c4c2df9f',
   redirect_uri: AUTH_LOGIN_REDIRECT_URI,
   post_logout_redirect_uri: AUTH_LOGOUT_REDIRECT_URI,
   response_type: 'code',
   scope: 'openid profile',
   acr_values: "idporten-loa-substantial",
   ui_locales: "nb",
   automaticSilentRenew: true,
   userStore: new WebStorageStateStore({
      store: localStorage
   }),
   revokeAccessTokenOnSignout: true
};

export async function fetchAltinnToken(accessToken) {
   const payload = { idPortenToken: accessToken };

   try {
      const response = await axios.post(EXCHANGE_ALTINN_TOKEN_URL, payload);
      return response.data;
   } catch {
      return null;
   }
}

export default oidcConfig;
