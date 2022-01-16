import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { useMemo } from "react";
import { Container, Button } from "reactstrap";
import TableContainer from "../components/TableContainer"
import eventBus from '../components/eventBus';
const vaccineDrive = require("../api/vaccineDrive.json")

const BookVaccineDrive = () => {
  

  class BookSlots extends React.Component {
    constructor(props) {
      super(props);

      this.onChangeListener = this.onChangeListener.bind(this);

    }

    onChangeListener(event) {
      var bookedSlot = event.target.value
      const regex = new RegExp('^[0-9]+$');
      
      var regextest = regex.test(bookedSlot);

      var bookedCount = bookedSlot <= this.props.cell.row.original.Max_Slots

      var buttonState=''

      if(regextest && bookedCount){
        buttonState = 'modified';
      }
      else{
        buttonState = 'validationFailed';
      }
      eventBus.dispatch("updateStatus_"+this.props.cell.row.id,buttonState);
      
    }
    componentDidMount() {
      if(Date.parse(this.props.cell.row.original.Date) < Date.now()){
        this.setState({
          status: 'disabled'
        });
      }

    }
    
    render() {
      var inputField=false;
      if(this.state && this.state.status === 'disabled') {
        inputField=true;
      }
return (
      <div style={{ textAlign: 'center', fontSize: 18 }}>
      <input type="text" defaultValue={this.props.value} onChange={this.onChangeListener} disabled={inputField} id={this.props.textBoxId}></input>
    </div>
);
    }
  }

  class Submit extends React.Component {
    constructor(props) {
      super(props);

      this.updateStatus = this.updateStatus.bind(this);
      this.onClickListener = this.onClickListener.bind(this);

      this.state = {status: 'notBooked'};
    }

    updateStatus(state){

      if(this.state.status === 'disabled' || !this._ismounted ) {
        return;
      }
      this.setState({
        status: state
      });
    }

    onClickListener() {
      if(this.state.status === 'disabled'){
        return;
      }
      
      this.setState({
        status: 'booked'
      });

        let cellData = this.props.cell.row.original;

        var addPayload = {
          "Event_Id": cellData.Event_Id,
          "Event_Name": cellData.Event_Name,
          "Vaccine_Name": cellData.Vaccine_Name,
          "Date": cellData.Date,
          "Place": cellData.Place,
          "Booked_Slots": document.getElementById('Booked_Slots'+this.props.cell.row.id).value
        };

        eventBus.dispatch("updateDrive",addPayload);

    }

    componentDidMount() {
      this._ismounted = true;
      if(this.props.cell.row.original.Booked_Slots) {
        this.setState({
          status: 'booked'
        });
      }
      
      if(Date.parse(this.props.cell.row.original.Date) < Date.now()){
        this.setState({
          status: 'disabled'
        });
      }

      eventBus.on("updateStatus_"+this.props.cell.row.id, (data) =>{
      this.updateStatus( data )
      });

    }
    componentWillUnmount() {
      this._ismounted = false;
      eventBus.remove("updateStatus_"+this.props.cell.row.id);
    }
    render() {
      var text='';
      var disable=false;
      switch(this.state.status){
        case 'notBooked':
          text='Book';
          break;
        case 'validationFailed':
          text='Validation Failed';
          disable=true;
          break;
        case 'disabled':
          text='Disabled';
          disable=true;
          break;
        case 'booked':
          text='Booked';
          break;
        case 'modified':
          text='Update';
          break;
        default:
          text='Book';
      }
return (
  <div style={{ textAlign: 'center', fontSize: 18 }}>
  <Button color="secondary" outline onClick={this.onClickListener} disabled={disable} className='w-100'>{text}</Button>
</div>
);
    }
  }


  
    const columns = useMemo(
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
            Header: "Max Slots",
            accessor: "Max_Slots",
            type: "text"
          },
          {
            Header: "Booked Slots",
            type: "text",
            Cell: ({ cell }) => {
                let value = cell.row.original.Booked_Slots;
      
                return (
                  <BookSlots value={value} cell={cell} textBoxId={"Booked_Slots"+cell.row.id}/>
                );
              },
          },
          {
            Header: "",  
            accessor: "sumbitButton",
            type: "button",
            Cell: ( cell ) => {
                return (
                  <Submit cell={cell}/>
                );
              },
          }
        ],
        []
      )

    return (

        <Container style={{ marginTop: 100 }}>
          <TableContainer columns={columns} data={vaccineDrive} />
        </Container>
      )
};




export default BookVaccineDrive;