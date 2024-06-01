import { Route, Routes } from 'react-router-dom';
import Appbar from './components/Appbar/Appbar';

function App() {
  return (
    <>
      <header>
        <Appbar />
      </header>
      <main>
        <Routes>
          <Route path='/' element='Home' />
        </Routes>
      </main>
    </>
  );
}

export default App;
