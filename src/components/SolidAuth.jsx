import React from "react";
import { getDefaultSession } from "@inrupt/solid-client-authn-browser"
import { useState, useEffect } from 'react';

export default function SolidAuth() {
  let session = getDefaultSession()

  const [isLoggedIn, setIsLoggedIn] = useState(session.info.isLoggedIn)

  useEffect(() => {
    session.onLogin(() => setIsLoggedIn(true))
    session.onLogout(() => setIsLoggedIn(false))
  }, [session])

  // Handle Login call
  function handleLogin(e) {
    e.preventDefault();

    // get Identity Provider value from text field
    let idp = e.target[0].value

    // Make login call
    session.login({
      oidcIssuer: idp,
      redirectUrl: window.location.href,
      clientName: "Solid Photo App"
    })
  }

  function handleLogout(e) {
    e.preventDefault();
    session.logout()
  }

  if (!isLoggedIn) {
    // If session is not logged in, show the login screen
    return (
      <div >
        <form onSubmit={handleLogin} style={{
          "display": "flex",
          "margin": "10%",
          "height": "100%",
          "flexDirection": "column"
        }}>
          <input type="text" placeholder="identity provider" style={{
              marginBottom: "1em"
          }}/>
          <input type="submit" value="Login"/>
        </form>
      </div>
    )
  } else {
    // If session is logged in, you should not be here
    return (
      <div>
        <p style={{display: "inline-block", marginRight: "1em"}}>
          Logged in as: { session.info.webId }
        </p>
        <button onClick={ handleLogout }>Logout</button>
      </div>

    )
  }
}
