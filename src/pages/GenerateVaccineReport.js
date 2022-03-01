import PaginatedTable from '../components/PaginatedTable';
import { useMemo, useState, useEffect } from "react";
import { Container } from "reactstrap";
import reportData from "../api/reportData.json";
const GenerateVaccineReport = () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8082/students/?format=json")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          reportData.forEach(element => {
            result.push(element)
          });
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
              Header: "Student Id",
              accessor: "studentId"            
            },
            {
              Header: "Name",
              accessor: "studentName"            
            },
            {
              Header: "Class",
              accessor: "studentClass"            
            },
            {
              Header: "Gender",
              accessor: "studentGender"            
            },
            {
                Header: "Vaccine Name",
                accessor: "Vaccine_Name"            
            },
            {
              Header: "Vaccinated Date",
              accessor: "VaccinatedDate"            
            },
            {
                Header: "Vaccination Event ID",
                accessor: "VaccinationEventID"            
            },
            {
                Header: "Vaccinated Status",
                accessor: "Vaccinated_Status",
                Cell: ({ cell }) => {        
                  return (
                    cell.row.original.Vaccinated_Status?cell.row.original.Vaccinated_Status:'Not Vaccinated'
                  );
                },          
            },
          ],
        []
      )

    return (
        <Container style={{ marginTop: 100 }}>
            <PaginatedTable columns={columnsVaccine} data={items}/>
        </Container>
    );
};

export default GenerateVaccineReport;