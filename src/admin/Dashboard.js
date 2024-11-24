import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaUserMd, FaHospital, FaCalendarAlt } from "react-icons/fa";

import AdminLayout from "./AdminLayout";

const Dashboard = () => {
  return (
    <AdminLayout>
      <h1>Dashboard</h1>
      <Row className="g-4 mt-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <FaUserMd className="dashboard-icon" />
              <h3>20</h3>
              <p>Bác sĩ</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <FaHospital className="dashboard-icon" />
              <h3>10</h3>
              <p>Bệnh viện</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <FaCalendarAlt className="dashboard-icon" />
              <h3>50</h3>
              <p>Lịch hẹn</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default Dashboard;
