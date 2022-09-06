import './App.css';
import {
    Routes,
    Route
} from "react-router-dom";

import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { NotFound } from './components/NotFound/NotFound';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import { AuthProvider } from './contexts/AuthContext';
import { Logout } from './components/Logout/Logout';
import UserGuard from './components/common/UserGuard';
import { CreateMovie } from './components/CreateMovie/CreateMovie';
import { MovieProvider } from './contexts/MovieContext';
import { MyMovies } from './components/MyMovies/MyMovies';
import { Movies } from './components/Movies/Movies';
import { Genres } from './components/Genres/Genres';
import { MovieDetails } from './components/MovieDetails/MovieDetails';
import { Actors } from './components/Actors/Actros';
import { ActorProvider } from './contexts/ActorsContext';

function App() {
    return (
        <>
            <AuthProvider>
                <Header />
                <MovieProvider>
                    <ActorProvider>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/logout' element={<Logout />} />
                            <Route path='/movies/all' element={<Movies />} />
                            <Route path='/movies/all/:genre' element={<Movies />} />
                            <Route path='/movies/details/:movieId' element={<MovieDetails />} />
                            <Route path='/movies/create' element={<CreateMovie />} />
                            <Route path='/movies/mine' element={<MyMovies />} />
                            <Route path='/genres/all' element={<Genres />} />
                            <Route path='/actors/all' element={<Actors />} />
                            <Route element={<UserGuard />}>
                                <Route path='/login' element={<Login />} />
                                <Route path='/register' element={<Register />} />
                            </Route>
                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    </ActorProvider>
                </MovieProvider>
                <Footer />
            </AuthProvider>
        </>
    );
}

export default App;
