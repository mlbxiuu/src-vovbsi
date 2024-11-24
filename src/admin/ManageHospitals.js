import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Spinner } from "react-bootstrap";
import AdminLayout from "../admin/AdminLayout";
import { useNavigate } from "react-router-dom";

const ManageHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Gọi API để lấy danh sách bệnh viện
    const fetchHospitals = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/hospitals`
        );
        setHospitals(response.data.result); // Nếu API trả về { result: [...] }
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu bệnh viện:", error);
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa bệnh viện này?")) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}/hospitals/${id}`,
          { headers: { "Content-Type": "application/json" } } // Thêm header nếu cần
        );
        if (response.status === 200) {
          setHospitals(hospitals.filter((hospital) => hospital._id !== id));
        } else {
          console.log("Lỗi khi xóa bệnh viện:", response);
        }
      } catch (error) {
        console.error("Lỗi khi xóa bệnh viện:", error);
        alert("Không thể xóa bệnh viện.");
      }
    }
  };
  const handleEdit = (id) => {
    navigate(`/admin/hospitals/edit/${id}`);
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
      <h2>Danh sách bệnh viện</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên bệnh viện</th>
            
            <th>Ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map((hospital, index) => (
            <tr key={hospital._id}>
              <td>{index + 1}</td>
              <td>{hospital.name}</td>
              
              <td>
                {hospital.imgUrl ? (
                  <img src={hospital.imgUrl} alt={hospital.name} width="100" />
                ) : (
                  "Không có ảnh"
                )}
              </td>
              <td>
                <div className="btn-group">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(hospital._id)}
                  >
                    Sửa
                  </button>
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => handleDelete(hospital._id)}
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminLayout>
  );
};

export default ManageHospitals;
