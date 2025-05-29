// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import React from 'react';
// import Navigation from './components/Navigation';
// import Footer from './components/Footer';

// import Main from './pages/Main';
// import Playlist from './pages/Playlist';
// import Movie from './pages/Movie';
// import Book from './pages/Book';
// import Quote from './pages/Quote';
// import MyArchive from './pages/MyArchive';
// import { ModalProvider } from './context/ModalContext';

// function App() {
//   return (
//     // <BrowserRouter>
//     //   <div>
//     //     <Navigation />
//     //     <Main />
//     //   </div>
//     // </BrowserRouter>
//     <ModalProvider>
//     <BrowserRouter basename="/WOW">
//     <div className="App">
//       <Navigation />
//       <Routes>
//         <Route path="/" element={<Main />} />
//         <Route path="/playlist" element={<Playlist />} />
//         <Route path="/movie" element={<Movie />} />
//         <Route path="/book" element={<Book />} />
//         <Route path="/quote" element={<Quote />} />
//         <Route path="/myarchive" element={<MyArchive />} />
//       </Routes>
//       <Footer />
//     </div>
//   </BrowserRouter>
//   </ModalProvider>
//   );
// }


// export default App;

import { HashRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

import Main from './pages/Main';
import Playlist from './pages/Playlist';
import Movie from './pages/Movie';
import Book from './pages/Book';
import Quote from './pages/Quote';
import MyArchive from './pages/MyArchive';
import { ModalProvider } from './context/ModalContext';

function App() {
  return (
    <ModalProvider>
      <HashRouter>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/movie" element={<Movie />} />
            <Route path="/book" element={<Book />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/myarchive" element={<MyArchive />} />
          </Routes>
          <Footer />
        </div>
      </HashRouter>
    </ModalProvider>
  );
}

export default App;