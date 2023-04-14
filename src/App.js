import './App.css';
import Header from './Header';
import Gallery from './Gallery';

function App() {
  return (
    <div className='bg-blue-100 w-screen h-screen'>
    <div className='container h-screen mx-auto px-4 bg-red-100'>
      <Header/>
      <Gallery/>
</div>
</div>
  );
}

export default App;
