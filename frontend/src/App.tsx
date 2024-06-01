import { Route, Routes } from 'react-router-dom';
import Appbar from './components/Appbar/Appbar';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <>
      <header>
        <Appbar />
      </header>
      <main>
        <Routes>
          <Route path='/' element='Home' />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
