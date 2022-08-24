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

function App() {
    return (
        <>
            <AuthProvider>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
                <Footer />
            </AuthProvider>
        </>
    );
}

export default App;
