import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Reservations from './pages/Reservations';

function App() {
  return (
    <div>
      <header className="text-red-500 font-bold">Workspace Share</header>
      <main>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="reservations" element={<Reservations />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
