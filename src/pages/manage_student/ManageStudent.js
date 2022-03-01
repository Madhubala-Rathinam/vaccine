import { useMemo, useState, useEffect } from "react";
import { Container } from "reactstrap";
import StudentTableComponent from "../../components/StudentTableComponent"
import DeleteStudentButton from "../../components/DeleteStudentButton";


const studentDetails = require("../../api/studentDetails.json")


const ManageStudent = () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8082/students/?format=json")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])



  const columns = useMemo(
    () => [
      {
        Header: "StudentId",
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
        Header: "Contact_Number",
        accessor: "studentContact"
      },
      {
        Header: "Gender",
        accessor: "studentGender"
      },
      {
        Header: "DOB",
        accessor: "studentDOB"
      },
      {
        Header: "",
        accessor: "deleteButton",
        type: "button",
        Cell: ({ cell }) => {
          const { value } = cell;
          return (
            <DeleteStudentButton cell={cell} />
          );
        },
      }
    ],
    []
  )
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  }
  var clone = JSON.parse(JSON.stringify(items));
  return (<>
    <Container style={{ marginTop: 100 }}>
      <StudentTableComponent columns={columns} data={clone} />
    </Container>

  </>

  )
};

export default ManageStudent;