import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import "../style/AdminHeader.css"; // CSS tùy chỉnh

const AdminHeader = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="admin-header-modern">
      <Container>
        <Navbar.Brand href="#">Admin Dashboard</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link href="/profile">
            <FaUserCircle className="header-icon" /> Profile
          </Nav.Link>
          <Nav.Link href="/logout">Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AdminHeader;
