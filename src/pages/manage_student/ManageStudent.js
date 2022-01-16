import { useMemo } from "react";
import { Container } from "reactstrap";
import StudentTableComponent from "../../components/StudentTableComponent"
import DeleteStudentButton from "../../components/DeleteStudentButton";


const studentDetails = require("../../api/studentDetails.json")


const ManageStudent = () => {

  
    const columns = useMemo(
        () => [
          {
            Header: "StudentId",
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
            Header: "Contact_Number",
            accessor: "Contact_Number"            
          },
          {
            Header: "Gender",
            accessor: "Gender"            
          },
          {
            Header: "DOB",
            accessor: "DOB"            
          },
          {
            Header: "",  
            accessor: "deleteButton",
            type: "button",
            Cell: ({ cell }) => {
                const { value } = cell;
                return (
                    <DeleteStudentButton  cell={cell}/>
                );
              },
          }
        ],
        []
      )
      return (<>
              <Container style={{ marginTop: 100 }}>
          <StudentTableComponent columns={columns} data={studentDetails} />
        </Container>
      
      </>

      )
};

export default ManageStudent;