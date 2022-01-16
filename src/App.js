import './App.css';
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import BookVaccineDrive from "./pages/BookVaccineDrive";
import Dashboard from "./pages/Dashboard";
import GenerateVaccineReport from "./pages/GenerateVaccineReport";
import ManageStudent from "./pages/manage_student/ManageStudent";
import BulkUpload from './pages/manage_student/BulkUpload';
import AddStudent from './pages/manage_student/AddStudent';
import ManageVaccineStatus from "./pages/ManageVaccineStatus";

function App() {
    return ( 
        <BrowserRouter>
        <Routes>
            <Route path = "/" element = { < HomeLayout / > }>
                <Route index element = { < Dashboard / > }/> 
                <Route path = "GenerateVaccineReport" element = { < GenerateVaccineReport / > }/> 
                <Route path = "BookVaccineDrive" element = { < BookVaccineDrive / > } /> 
                <Route path = "ManageVaccineStatus" element = { < ManageVaccineStatus / > } /> 
                <Route path = "ManageStudent" element = { < ManageStudent / > }/> 
                <Route path = "BulkUpload" element = { < BulkUpload / > }/> 
                <Route path = "AddStudent" element = { < AddStudent / > }/>
            </Route>
        </Routes> 
        </BrowserRouter>
    );
}

export default App;
