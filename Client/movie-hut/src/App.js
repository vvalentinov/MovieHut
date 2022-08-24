import './App.css';
import {
    Routes,
    Route
} from "react-router-dom";

import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { NotFound } from './components/NotFound/NotFound';

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                {/* <Route path='/login' element={} />
                <Route path='/register' element={} /> */}
                <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
