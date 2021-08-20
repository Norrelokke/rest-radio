import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import style from "../css/Navbar.module.css";
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

function TheNav() {
  const { loginState } = useContext(UserContext);
  const { logout } = useContext(UserContext);

  return (
    <Navbar className={style.navbar}  collapseOnSelect expand="sm" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Brand>
        <Link  to="/">  <img src="/assets/ReactRadio.svg" alt="logo" />
        </Link>
      </Navbar.Brand>

      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Link to="/">
            <p className="text-center">Home</p>
          </Link>
          <Link to="/AllChannels">
            <p className="text-center">Alla kanaler</p>
          </Link>
          <Link to="/AllCategories">
            <p className="text-center">Kategorier</p>
          </Link>
          <Link to="/programs">
            <p className="text-center">Program</p>
          </Link>
          {loginState ?
          <Link to="/profile">
            <p className="text-center">Min Profil</p>
          </Link>
        : ""}
             {!loginState ?
          <Link to="/login">
            <p className="text-center">Logga in</p>
          </Link>
 : ""}
          {loginState ?
          <Link to="/">
          <p onClick={logout}>Logout</p>
          </Link>
   : ""}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default TheNav;