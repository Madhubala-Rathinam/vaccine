import PaginatedTable from '../components/PaginatedTable';
import { useMemo } from "react";
import { Container } from "reactstrap";
import reportData from "../api/reportData.json";
const GenerateVaccineReport = () => {

    const columnsVaccine = useMemo(
        () => [
            {
              Header: "Student Id",
              accessor: "StudentId"            
            },
            {
              Header: "Name",
              accessor: "Name"            
            },
            {
              Header: "Class",
              accessor: "Class"            
            },
            {
              Header: "Gender",
              accessor: "Gender"            
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
                accessor: "Vaccinated_Status"            
            },
          ],
        []
      )

    return (
        <Container style={{ marginTop: 100 }}>
            <PaginatedTable columns={columnsVaccine} data={reportData}/>
        </Container>
    );
};

export default GenerateVaccineReport;