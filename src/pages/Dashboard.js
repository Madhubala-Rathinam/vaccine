import { Container,Row, Col, Table } from "reactstrap";
import { useMemo, useEffect, useState } from "react";
import TableContainer from "../components/TableContainer";
import UpcomingDriveComponent from "../components/UpcomingDriveComponent";

const studentVaccine = require('../api/totalStudentsVaccinated.json')
const vaccineDrive = require("../api/vaccineDrive.json")

// var filterDrive = vaccineDrive.filter( e => e.Booked_Slots > 0 && Date.parse(e.Date) > Date.now() );

const Dashboard = () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8082/vaccineDrive/?format=json")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          result = result.filter( e => e.bookedSlots > 0 && Date.parse(e.eventDate) > Date.now() );
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

    const columnsVaccine = useMemo(
        () => [
          {
            Header: "Class",
            accessor: "class"
          },
          {
            Header: "Total Students Booked",
            accessor: "totalBooked",
          },
          {
            Header: "Total Students Vaccinated",
            accessor: "vaccinated",
          }
        ],
        []
      )

      const columnsDrive = useMemo(
        () => [
            {
                Header: "Event_Id",
                accessor: "eventId",
                type: "button"
              },
              {
                Header: "Event Name",
                accessor: "eventName",
                type: "text"
              },
              {
                Header: "Vaccine Name",
                accessor: "vaccineName",
                type: "text"
              },
              {
                Header: "Date",
                accessor: "eventDate",
                type: "text"
              },
              {
                Header: "Place",
                accessor: "eventPlace",
                type: "text"
              },
              {
                Header: "Booked Slots",
                accessor: "bookedSlots",
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
          <Col ><UpcomingDriveComponent columns={columnsDrive} data={items}/></Col>
        </Row>
    </Container>);
};

export default Dashboard;