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

  const [loggedIn, setLoggedIn] = useState(session.info.isLoggedIn);
const [checkingLogin, setCheckingLogin] = useState(true);


  useEffect(() => {

    session.onLogin(() => setLoggedIn(true));
    session.onLogout(() => setLoggedIn(false));

    console.log(session);


    handleIncomingRedirect({ restorePreviousSession: true })
      .then((info) => {
        // https://docs.inrupt.com/developer-tools/api/javascript/solid-client-authn-browser/functions.html#handleincomingredirect
        let status = info?.isLoggedIn || false;
        if (status !== loggedIn) setLoggedIn(status);
        if (info) setCheckingLogin(false);

        if (loggedIn) init();
      })
      .catch(console.error);

    const init = async () =>
      await initialize({
        webid: session.info.webId,
        fetch: session.fetch,
      });
  });

  return (
    <div className="bg-purple-50 w-screen h-screen">
      <div className="container h-screen mx-auto bg-yellow-100">
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
        <p className='p-2 text-sm italic'>Made by Wout Slabbinck, Jonas Steinbach, Bryan-Elliott Tam and Ruben Dedecker for the Inrupt Solid Hackathon 2023.</p>
      </div>
    </div>
  );
}

export default App;
