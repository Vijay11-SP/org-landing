import React, { useEffect, useRef, useState } from 'react';
import Keycloak from 'keycloak-js';
import { Button } from '@mui/material';
import "../App.css"

function SuccesPage() {


    const isRun = useRef(false);
    const kcObj = useRef({});
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
        if (kcObj.current) { // Ensure Keycloak is initialized before calling logout
            kcObj.current.logout({ redirectUri: 'http://localhost:3000/auth' });
        }
    }


    function login() { kcObj.current.login() }

    function showAccessToken() {

        setinfo(kcObj.current.token)
    }


    function showParsedAccesstoken() { setinfo(JSON.stringify(kcObj.current.tokenParsed)) }

    function checkTokenExpired() {
        try {
            setinfo(kcObj.current.isTokenExpired(5).toString())
        }
        catch (err) {
            setinfo(err);
        }
    }


    function updateToken() {
        kcObj.current.updateToken(10)
            .then((refreshed) => { setinfo('Token Refreshed: ' + refreshed.toString()) })
            .catch((err) => { setinfo(err) })
    }

    const [info, setinfo] = useState("")

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
        }).then(() => {
            console.log(kc);
            kcObj.current = kc;
        }).catch((err) => {
            console.log(err);
            // window.location.assign("https://keycloak-qa.solytics.us");
        });


        // kc.onReady = () => { console.log('Error') };

        // kc.onAuthError = () => { console.log('Error');}

    }, [])


    return (
        <div className='container'>
            <div>
                Login Was a success.
            </div>
            <Button
                variant="contained"
                color="primary"
                style={{
                    marginTop: "16px",
                    background: '#D37676'
                }}
                onClick={logout}
            >
                Log Out
            </Button>
            <Button
                variant="contained"
                color="primary"
                style={{
                    marginTop: "16px",
                    background: '#B0C5A4'
                }}

                onClick={login}
            >
                Log In
            </Button>
            <Button
                variant="contained"
                color="primary"
                style={{
                    marginTop: "16px",
                    background: '#7469B6'
                }}

                onClick={showAccessToken}
            >
                Show Access Token
            </Button>
            <Button
                variant="contained"
                color="primary"
                style={{
                    marginTop: "16px",
                    background: '#F6995C'
                }}

                onClick={showParsedAccesstoken}
            >
                Show Parsed Access token
            </Button>
            <Button
                variant="contained"
                color="primary"
                style={{
                    marginTop: "16px",
                    background: '#51829B'
                }}

                onClick={checkTokenExpired}
            >
                Check Token expired
            </Button>

            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "16px" }}

                onClick={updateToken}
            >
                Update Token (if about to expire)
            </Button>
            <p className='showinfo' style={{ wordBreak: 'break-all' }}>

                {info}
            </p>
        </div>

    )
}

export default SuccesPage






