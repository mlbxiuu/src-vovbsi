import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";
import "../style/AdminLayout.css"; // CSS tùy chỉnh

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout-modern">
    <Sidebar />
    <div className="main-content-admin">
      <AdminHeader />
      <div className="content-wrapper">{children}</div>
    </div>
  </div>
  );
};

export default AdminLayout;
