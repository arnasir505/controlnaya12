import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <header></header>
      <main>
        <Routes>
          <Route path='/' element='Home' />
        </Routes>
      </main>
    </>
  );
}

export default App;
