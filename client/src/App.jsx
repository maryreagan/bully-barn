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


const renderNav = (Component) => {
  return (
    <>
      <Nav />
      <Component />
      <Footer />
    </>
  );
};

const renderFooter = (Component) => {
  return (
    <>
      <Component />
      <Footer />
    </>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={renderNav(Dog)} />
        <Route path="/auth" element={renderFooter(Auth)} />
        <Route path="/forgot-password" element={renderFooter(ForgotPwd)} />
        <Route path="/add-dog" element={renderNav(AddDog)} />
        <Route path="/reset-password/:token" element={renderFooter(ResetPwd)} />
        <Route path="/edit-form/:dogId" element={<EditForm />} />
        <Route path="/display-one" element={renderNav(DisplayOne)} />
        <Route path="/adopted-dogs" element={renderNav(AdoptedDogs)} />
        <Route path ="/chart" element={<Chart />} />
        <Route path="/payment-status" element={<PaymentStatusPage />} />

      </Routes>
    </Router>
  );
}

export default App;
