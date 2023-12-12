import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <div>WorspaceShare Logo</div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/reservations">Reservations</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
