import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
// import './App.css';
import "./style/header.css";
import "./style/allstyle.css";

import "bootstrap/dist/css/bootstrap.min.css";
import TrangChu from "./components/TrangChu";
import Register from "./components/Register";
import Login from "./components/Login";
import CapCuu from "./components/CapCuu";
import ChiTietCapCuu from "./components/ChiTietCapCuu";
import GioiThieu from "./components/GioiThieu";
import ChitietGioiThieu from "./components/ChiTietGioiThieu";
import QuyCheHoatDong from "./components/QuyCheHoatDong";
import ChinhSach from "./components/ChinhSach";
import CoChe from "./components/CoChe";
import HuongDanSD from "./components/HuongDanSD";
import ChiTietHD from "./components/ChiTietHD";
import ListBacSi from "./components/ListBacSi";

import Dashboard from "./admin/Dashboard";
import ManageAppointments from "./admin/ManageAppointments";
import ManageDoctors from "./admin/ManageDoctors";
import ManageHospitals from "./admin/ManageHospitals";

// import TrangChu from './components/TrangChu';

function App() {
  
  return (
    <SnackbarProvider maxSnack={3}> {/* Bọc ứng dụng bằng SnackbarProvider */}
      <Routes>
        <Route path="/" element={<TrangChu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sos" element={<CapCuu />} />
        <Route path="/sos/sos-detail" element={<ChiTietCapCuu />} />
        <Route path="/gioithieu" element={<GioiThieu/>}/>
        <Route path="/gioithieu/gioithieu-detail" element={<ChitietGioiThieu/>}/>
        <Route path="/quyche" element={<QuyCheHoatDong/>}/>
        <Route path="/chinhsach" element={<ChinhSach/>}/>
        <Route path="/coche" element={<CoChe/>}/>
        <Route path="/huongdan" element={<HuongDanSD/>}/>
        <Route path="/guideline/guideline-detail" element={<ChiTietHD />} />
        <Route path="/ds-bsi" element={<ListBacSi/>} />

        
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/doctors" element={<ManageDoctors />} />
        <Route path="/admin/hospitals" element={<ManageHospitals />} />
        <Route path="/admin/appointments" element={<ManageAppointments />} />
      </Routes>
    </SnackbarProvider>
  );
}

export default App;
