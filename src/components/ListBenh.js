import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../style/list_benh.css";
import useFetchBenh from "../hooks/useFetchBenh";

const ListBenh = () => {
  const { benh, loading, error } = useFetchBenh();
  const navigate = useNavigate(); // Khởi tạo useNavigate

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi khi tải dữ liệu: {error.message}</p>;

  // Chia danh sách bệnh thành các nhóm 3 phần tử (1 hàng x 3 cột)
  const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const groupedBenh = chunkArray(benh, 3);

  const handleCardClick = (benhId) => {
    // navigate(`/bacsi/${benhId}`); // Chuyển hướng tới trang ListBacSi với ID bệnh
    navigate(`/ds-bsi`);
  };

  return (
    <Carousel interval={null}>
      {groupedBenh.map((group, idx) => (
        <Carousel.Item key={idx}>
          <Row>
            {group.map((item) => (
              <Col key={item._id} md={4} className="mb-3">
                <Card
                  onClick={() => handleCardClick(item._id)} // Gắn sự kiện click
                  className="cursor-pointer"
                >
                  <Card.Img
                    variant="top"
                    src={item.imgUrl || "https://via.placeholder.com/150"}
                    className="img-cus"
                  />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Carousel.Item>
      ))}

      {benh.length === 0 && (
        <Carousel.Item>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Không có dữ liệu bệnh</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Carousel.Item>
      )}
    </Carousel>
  );
};

export default ListBenh;
