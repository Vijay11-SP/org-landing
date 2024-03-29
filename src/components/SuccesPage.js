import React, { useEffect, useRef } from 'react';
import Keycloak from 'keycloak-js';
import { Button } from '@mui/material';


function SuccesPage() {


    const isRun = useRef(false);

    const realm = localStorage.getItem("org") || "";
    const clientId = localStorage.getItem("app") || "";

    // const realm = localStorage.getItem("org") ? localStorage.getItem("org") : "";
    // const clientId = localStorage.getItem("app") ? localStorage.getItem("app") : "";


    let initOptions = {
        url: 'https://keycloak-qa.solytics.us',
        realm,
        clientId,
        onLoad: 'login-required', // check-sso | login-required
        KeycloakResponseType: 'code',

        // silentCheckSsoRedirectUri: (window.location.origin + "/silent-check-sso.html")
    }


    let kc = new Keycloak(initOptions);


    function logout() {
        if (kc) { // Ensure Keycloak is initialized before calling logout
          kc.logout({ redirectUri: 'http://localhost:3000/auth' });
        }
      }
    

    useEffect(() => {

        if (isRun.current) return;

        isRun.current = true;


        kc.init({
            onLoad: initOptions.onLoad,
            KeycloakResponseType: 'code',
            // silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html", checkLoginIframe: false,
            // silentCheckSsoRedirectUri: window.location.assign('https://keycloak-qa.solytics.us'),
            checkLoginIframe: false,
            // pkceMethod: 'S256'
        }).catch((err) => {
            console.log(err);
            // window.location.assign("https://keycloak-qa.solytics.us");
        });


        // kc.onReady = () => { console.log('Error') };

        // kc.onAuthError = () => { console.log('Error');}




    }, [])


    return (
        <div>
            <div>
                Login Was a success.
            </div>
            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "16px" }}

                onClick={logout}
            >
                Log Out
            </Button>
        </div>
    )
}

export default SuccesPage






