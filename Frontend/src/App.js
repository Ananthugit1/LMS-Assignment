import './App.css';
// import { Nav, Navbar } from 'react-bootstrap';
import AddBranchForm from './components/AddBranchForm';
import LmsComp from '../src/components/LmsComp';
import Routing from './components/Routing';
import NavComp from './components/NavComp';
import NavbarAdmin from './components/NavbarAdmin';
import AdmSideNavRoute from './components/AdminConsole/AdmSideNavRoute';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'chart.js/auto';
import NavbarStudent from './components/NavbarStudent';
import StdSideNavRoute from './components/StudentConsole/StdSideNavRoute';
import Footer from './components/Footer';
import Navbar from './components/Navbar';



function App() {
  return (
    <div className="App">
      
      {/* ADMIN  LOGIN*/}
    {/* <Navbar></Navbar>
    <NavbarAdmin></NavbarAdmin>
    <AdmSideNavRoute></AdmSideNavRoute> */}

    {/* STUDENT LOGIN */}
     <Navbar></Navbar>
     <NavbarStudent></NavbarStudent>
     <StdSideNavRoute></StdSideNavRoute>

    <Footer/>
     
    </div>
  );
}

export default App;
