import { Container,Row, Col, Table } from "reactstrap";
import { useMemo } from "react";
import TableContainer from "../components/TableContainer";
import UpcomingDriveComponent from "../components/UpcomingDriveComponent";

const studentVaccine = require('../api/totalStudentsVaccinated.json')
const vaccineDrive = require("../api/vaccineDrive.json")

var filterDrive = vaccineDrive.filter( e => e.Booked_Slots > 0 && Date.parse(e.Date) > Date.now() );

const Dashboard = () => {

    const columnsVaccine = useMemo(
        () => [
          {
            Header: "Class",
            accessor: "class"
          },
          {
            Header: "Total Students Vaccinated",
            accessor: "total",
          }
        ],
        []
      )

      const columnsDrive = useMemo(
        () => [
            {
                Header: "Event_Id",
                accessor: "Event_Id",
                type: "button"
              },
              {
                Header: "Event Name",
                accessor: "Event_Name",
                type: "text"
              },
              {
                Header: "Vaccine Name",
                accessor: "Vaccine_Name",
                type: "text"
              },
              {
                Header: "Date",
                accessor: "Date",
                type: "text"
              },
              {
                Header: "Place",
                accessor: "Place",
                type: "text"
              },
              {
                Header: "Booked Slots",
                accessor: "Booked_Slots",
                type: "text"
              },
        ],
        []
      )


    
    return ( <Container style={{ marginTop: 100 }}>
      
        <Row><center><h1>Dashboard</h1></center></Row>
        <Row>
          <Col ><center><h3>Student Vaccine Status</h3></center></Col>
          <Col ><center><h3>Upcoming Vaccine Drives</h3></center></Col>
        </Row>
    <Row>
          <Col ><TableContainer columns={columnsVaccine} data={studentVaccine}/></Col>
          <Col ><UpcomingDriveComponent columns={columnsDrive} data={filterDrive}/></Col>
        </Row>
    </Container>);
};

export default Dashboard;