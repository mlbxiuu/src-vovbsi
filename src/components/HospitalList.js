// import Card from "react-bootstrap/Card";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
// import "../style/list_hospital.css";

// const GridExample = () => {
//   // khoi tao bien
//   const img = [
//     "https://edoctor.io/_upload/image/5ba0a7834141ac001cc1e62c",
//     "https://edoctor.io/_upload/image/6290653ebee58fda65891f82",
//     "https://ivie.vn/_next/image?url=https%3A%2F%2Fisofhcare-backup.s3-ap-southeast-1.amazonaws.com%2Fimages%2Fquoctecity-png_7b74ee9a_58b1_40e5_a146_44d571228586.png&w=1920&q=75",
//     "https://edoctor.io/_upload/image/62eb7c68fda7ad4cbd231190",
//     "https://edoctor.io/_upload/image/5cb58382668c2d0017c509fe",
//     "https://edoctor.io/_upload/image/5af3e168cb8758001e9c12cc",
//     "https://edoctor.io/_upload/image/64d36991c1e5f9979db20382",
//     "https://edoctor.io/_upload/image/5e5f14270df3c100127f0823",
//   ];
//   const title = [
//     "TTYK Medic - Hòa Hảo",
//     "TTYK Quốc Tế Bernard",
//     "Bệnh viện Quốc tế City",
//     "BV Quốc tế Mỹ - AIH",
//     "PKĐK Hoàn Mỹ Sài Gòn",
//     "BVĐK Tâm Trí Sài Gòn",
//     "PKĐK DIAG CENTER",
//     "PKĐK - ĐHYK Phạm Ngọc Thạch",
//   ];

//   return (
//     <>
//       {/* <div className="container">
//         <div className="row">
//           <div className="col col-md-9 col-sm-12 col-xs-12">
//             <div className="title">
//               <div className="row-name">BỆNH VIỆN</div>
//               <br></br>
//             </div>
//             <Row xs={6} md={4} className="g-4">
//               {Array.from({ length: 4 }).map((_, idx) => (
//               {img.map((img, idx) => (
//                 <Col key={idx} className="col-custom">
//                   <Card className="card">
//                     <Card.Img variant="top" src={img} className="img-custom" />
//                     <Card.Body>
//                       <Card.Title>{title[idx]}</Card.Title>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               ))}
//             </Row>
//           </div>
//           <div className="col col-md-3 col-sm-12 col-xs-12">Tin tức</div>
//         </div>
//       </div> */}

//             <Row xs={6} md={4} className="g-4">
//               {/* {Array.from({ length: 4 }).map((_, idx) => ( */}
//               {img.map((img, idx) => (
//                 <Col key={idx} className="col-custom">
//                   <Card className="card">
//                     <Card.Img variant="top" src={img} className="img-custom" />
//                     <Card.Body>
//                       <Card.Title>{title[idx]}</Card.Title>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               ))}
//             </Row>

//     </>
//   );
// };

// export default GridExample;

// HospitalList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../style/list_hospital.css";

const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/hospitals`;
    console.log("Đang gửi yêu cầu đến URL:", apiUrl);
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("Dữ liệu nhận được từ API:", response.data);
        setHospitals(response.data.result || []); // Gán mảng result vào state
        console.log("Giá trị của hospitals sau khi set:", response.data.result);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách bệnh viện:", error);
      });
  }, []);

  // Chia dữ liệu bệnh viện thành các nhóm
  const itemsPerSlide = 8; // 4 cột x 2 hàng = 8 bệnh viện
  const hospitalChunks = [];

  for (let i = 0; i < hospitals.length; i += itemsPerSlide) {
    hospitalChunks.push(hospitals.slice(i, i + itemsPerSlide));
  }

  return (
    <Carousel>
      {hospitalChunks.map((chunk, index) => (
        <Carousel.Item key={index}>
          <Row xs={1} md={4} className="g-4">
            {chunk.map((hospital) => (
              <Col key={hospital._id} className="col-custom">
                <Card className="card-custom">
                  <Card.Img
                    variant="top"
                    src={hospital.imgUrl || "https://via.placeholder.com/150"}
                    className="img-custom"
                  />

                  <Card.Body>
                    <Card.Title>{hospital.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Carousel.Item>
      ))}
      {/* Nếu không có dữ liệu bệnh viện */}
      {hospitals.length === 0 && (
        <Carousel.Item>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Không có dữ liệu bệnh viện</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Carousel.Item>
      )}
    </Carousel>
  );
};

export default HospitalList;
