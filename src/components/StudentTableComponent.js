import TableContainer from "./TableContainer";


export default class StudentTableComponent extends TableContainer {
    constructor(props) {
      super(props);
    }

    deleteEventName(){
        return "deleteStudent";
      }

    addEventName(){
      return "addStudent";
    } 

}