import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Spinner, Button, Modal, Form } from "react-bootstrap";
import AdminLayout from "../admin/AdminLayout";
import { useNavigate } from "react-router-dom";

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Để điều khiển hiển thị form thêm bác sĩ
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    chuyenkhoa: "",
    donvi: "",
    email: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Gọi API để lấy danh sách bác sĩ
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/doctors`
        );
        setDoctors(response.data.result); // Nếu API trả về { result: [...] }
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu bác sĩ:", error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa bác sĩ này?")) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}/doctors/${id}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.status === 200) {
          setDoctors(doctors.filter((doctor) => doctor._id !== id));
        } else {
          console.log("Lỗi khi xóa bác sĩ:", response);
        }
      } catch (error) {
        console.error("Lỗi khi xóa bác sĩ:", error);
        alert("Không thể xóa bác sĩ.");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/doctors/edit/${id}`);
  };

  const handleAddDoctor = async () => {
    console.log("Dữ liệu gửi lên API:", newDoctor); // Log dữ liệu bác sĩ
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/doctors`,
        newDoctor,
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 201) {
        setDoctors([...doctors, response.data.result]);
        setShowModal(false);
        setNewDoctor({ name: "", chuyenkhoa: "", donvi: "", phikham: "" });
      } else {
        console.log("Lỗi khi thêm bác sĩ:", response);
      }
    } catch (error) {
      console.error("Lỗi khi thêm bác sĩ:", error);
      alert("Không thể thêm bác sĩ.");
    }
  };
  

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <AdminLayout>
      <h2>Danh sách bác sĩ</h2>
      <Button variant="primary" onClick={handleModalShow} className="mb-3">
        Thêm Bác Sĩ
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên bác sĩ</th>
            <th>Chuyên khoa</th>
            <th>Đơn vị</th>
            <th>Phí khám</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
            <tr key={doctor._id}>
              <td>{index + 1}</td>
              <td>{doctor.name}</td>
              <td>{doctor.chuyenkhoa}</td>
              <td>{doctor.donvi}</td>
              <td>{doctor.phikham}</td>
              <td>
                <div className="btn-group">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(doctor._id)}
                  >
                    Sửa
                  </button>
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => handleDelete(doctor._id)}
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Modal thêm bác sĩ */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Bác Sĩ Mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDoctorName">
              <Form.Label>Tên bác sĩ</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên bác sĩ"
                name="name"
                value={newDoctor.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDoctorChuyenKhoa">
              <Form.Label>Chuyên khoa</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập chuyên khoa"
                name="chuyenkhoa"
                value={newDoctor.chuyenkhoa}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDoctorDonVi">
              <Form.Label>Đơn vị</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập đơn vị"
                name="donvi"
                value={newDoctor.donvi}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDoctorEmail">
              <Form.Label>Phí khám</Form.Label>
              <Form.Control
                type="phikham"
                placeholder="Nhập phí khám"
                name="phikham"
                value={newDoctor.phikham}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleAddDoctor}>
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>
    </AdminLayout>
  );
};

export default ManageDoctors;
