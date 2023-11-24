import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Header from './components/Header';
import Footer from './components/Footer';
import Book from './pages/Book';
import SingleBook from './pages/Book/[slug]';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/books' element={<Book />} />
          <Route path='/books/:slug' element={<SingleBook />} />
        </Routes>
      </Router>
      <Footer />
    </>
  )
}

export default App
