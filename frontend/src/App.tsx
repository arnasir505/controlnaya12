import { Route, Routes } from 'react-router-dom';
import Appbar from './components/Appbar/Appbar';
import NotFound from './components/NotFound/NotFound';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import Home from './containers/Home/Home';
import UserGallery from './containers/UserGallery/UserGallery';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { useAppSelector } from './app/hooks';
import { selectUser } from './store/users/usersSlice';
import NewPhoto from './containers/NewPhoto/NewPhoto';

function App() {
  const user = useAppSelector(selectUser);
  const roles = ['user', 'admin'];
  return (
    <>
      <header>
        <Appbar />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/gallery' element={<UserGallery />} />
          <Route
            path='/photos/new'
            element={
              <ProtectedRoute isAllowed={user && roles.includes(user.role)}>
                <NewPhoto />
              </ProtectedRoute>
            }
          />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
