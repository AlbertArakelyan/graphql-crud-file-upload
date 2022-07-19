import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import store from 'store';

// HOC
import { withAuth } from '../../HOC';

// Constants
import { navLinks } from '../../utils/constants';

import { PREFIX } from '../../config';

const Header = () => {
  const navigate = useNavigate();

  const navLinksContent = (
    navLinks.map((navLink) => {
      return (
        <Link key={navLink.label} className="nav-link" to={navLink.href}>
          {navLink.label}
        </Link>
      );
    })
  );

  const handleLogOut = () => {
    store.remove(`${PREFIX}access_token`);
    navigate('/auth');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Link className="navbar-brand" to="/">POST-User</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {navLinksContent}
            <Button onClick={handleLogOut} variant="primary">Log out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default withAuth(Header);