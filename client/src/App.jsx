import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth/Auth";
import Dog from "./components/Dog/Dog";
import Nav from "./components/Nav/Nav";
import ForgotPwd from "./components/Auth/ForgotPwd";
import ResetPwd from "./components/Auth/ResetPwd";
import Form from "./components/Form/Form";
import AdminDash from "./components/Admin-Dash/Admin-Dash";
import AddDog from "./components/Dog/AddDog";
import Footer from "./components/Nav/Footer";
import EditForm from "./components/Dog/EditForm";
import DisplayOne from "./components/Dog/DisplayOne";
import AdoptedDogs from "./components/Dog/AdoptedDogs";
import Chart from "./components/Admin-Dash/Chart";
import PaymentStatusPage from "./components/Dog/PaymentStatusPage";
import SuccessPage from "./components/Dog/SuccessPage";
import CanceledPage from "./components/Dog/CanceledPage";
import { CssBaseline } from "@mui/material";


const MainLayout = ({children}) => {
  return (
    <>
    <Nav />
    {children}
    <Footer />
    </>
  )
}

function App() {
  return (
    <Router>
      <CssBaseline />
      <Routes>
      <Route path="/" element={<MainLayout><Dog /></MainLayout>} />
        <Route path="/auth" element={<MainLayout><Auth /></MainLayout>} />
        <Route path="/forgot-password" element={<MainLayout><ForgotPwd /></MainLayout>} />
        <Route path="/add-dog" element={<MainLayout><AddDog /></MainLayout>} />
        <Route path="/reset-password/:token" element={<MainLayout><ResetPwd /></MainLayout>} />
        <Route path="/edit-form/:dogId" element={<MainLayout><EditForm /></MainLayout>} />
        <Route path="/display-one" element={<MainLayout><DisplayOne /></MainLayout>} />
        <Route path="/adopted-dogs" element={<MainLayout><AdoptedDogs /></MainLayout>} />
        <Route path="/chart" element={<MainLayout><Chart /></MainLayout>} />
        <Route path="/payment-status" element={<PaymentStatusPage />} />
        <Route path="/admin-dash" element={<MainLayout><AdminDash /></MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
