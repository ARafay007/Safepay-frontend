import { Link } from 'react-router-dom';
import {Container, Nav, Navbar} from 'react-bootstrap';

export const NavigationBar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link to='/'>
            <img src='/safepay-logo-01_black.svg' alt='logo' width={100} height={100} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}