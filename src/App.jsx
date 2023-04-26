import "./App.css";
import Header from "./components/Header";
import Gallery from "./components/Gallery";
import Comunica from "./components/Comunica";
import { initialize } from "./solid-backend/index";
import {
  handleIncomingRedirect,
  getDefaultSession,
} from "@inrupt/solid-client-authn-browser";
import { useEffect, useState } from "react";
import SolidAuth from "./components/SolidAuth";

function App() {
  const session = getDefaultSession();

  // De loggedIn variabele houdt de login status bij,
  // en update de pagina wanneer de status verandert.
  const [loggedIn, setLoggedIn] = useState(session.info.isLoggedIn);

  // De checkingLogin variabele houdt bij of onze initiële
  // check voor login informatie is afgerond.
  const [checkingLogin, setCheckingLogin] = useState(true);

  // Deze functie voert uit bij het updaten van de component
  useEffect(() => {
    // Forceer hernieuwen van de pagina bij het veranderen van de login status
    session.onLogin(() => setLoggedIn(true));
    session.onLogout(() => setLoggedIn(false));

    console.log(session);

    // Deze functie gaat na of we teruggestuurd zijn
    // naar de huidige pagina door de Solid login pagina.
    handleIncomingRedirect({ restorePreviousSession: true })
      .then((info) => {
        // Update de status van de component voor
        // de login status en de login check status
        // op basis van het resultaat van de functie.
        // Voor meer informatie kan je de documentatie bekijken op
        // https://docs.inrupt.com/developer-tools/api/javascript/solid-client-authn-browser/functions.html#handleincomingredirect
        let status = info?.isLoggedIn || false;
        if (status !== loggedIn) setLoggedIn(status);
        if (info) setCheckingLogin(false);
        if (loggedIn) init();
      })
      .catch(console.error);

    const init = async () => {
      await initialize({
        webid: session.info.webId,
        fetch: session.fetch,
      });
    };
  });

  return (
    <div className="bg-blue-100 w-screen h-screen">
      <div className="container h-screen mx-auto px-4 bg-red-100">
        <Header />
        <div>
          {checkingLogin ? (
            <p>Loading Session information ...</p>
          ) : (
            <div>
              <SolidAuth />
              {loggedIn && (
                <div>
                  <Gallery />

                  {/* <Comunica /> */}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
