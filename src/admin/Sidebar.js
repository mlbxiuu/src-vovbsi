import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaUserMd, FaHospital, FaCalendarAlt, FaUser } from "react-icons/fa";
import "../style/Sidebar.css"; // CSS cho sidebar


const Sidebar = () => {
  return (
    <div className="sidebar-modern">
    <h4 className="sidebar-title">Admin Panel</h4>
    <Nav className="flex-column">
      <Nav.Link as={Link} to="/admin/dashboard" className="nav-item">
        <FaTachometerAlt className="nav-icon" /> Dashboard
      </Nav.Link>
      <Nav.Link as={Link} to="/admin/doctors" className="nav-item">
        <FaUserMd className="nav-icon" /> Quản lý bác sĩ
      </Nav.Link>
      <Nav.Link as={Link} to="/admin/hospitals" className="nav-item">
        <FaHospital className="nav-icon" /> Quản lý bệnh viện
      </Nav.Link>
      <Nav.Link as={Link} to="/admin/appointments" className="nav-item">
        <FaCalendarAlt className="nav-icon" /> Quản lý lịch hẹn
      </Nav.Link>
      <Nav.Link as={Link} to="/admin/users" className="nav-item">
        <FaUser className="nav-icon" /> Quản lý nguời dùng
      </Nav.Link>
    </Nav>
  </div>
  );
};

export default Sidebar;
