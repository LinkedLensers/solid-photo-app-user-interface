import "./App.css";
import Header from "./components/Header";
import Gallery from "./components/Gallery";
import Comunica from "./components/Comunica";
import {initialize} from "./solid-backend/index";
// TODO: login

function App() {
  return (
    <div className="bg-blue-100 w-screen h-screen">
      <div className="container h-screen mx-auto px-4 bg-red-100">
        <Header />
        <Gallery />
          <button onClick={async event => {
              await initialize({webid: "https://woslabbi.pod.knows.idlab.ugent.be/profile/card#me", fetch: fetch})
          }}>testInit</button>
        {/* <Comunica /> */}
      </div>
    </div>
  );
}

export default App;
