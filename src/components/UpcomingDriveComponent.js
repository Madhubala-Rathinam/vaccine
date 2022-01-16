import TableContainer from "./TableContainer";


export default class UpcomingDriveComponent extends TableContainer {
    constructor(props) {
      super(props);
    }

    deleteEventName(){
        return "removeDrive";
      }

    updateEventName(){
      return "updateDrive";
    } 

    primaryKeyAccessor(){
      return 'Event_Id';
    }

    render(){
      if(!this.state.data.length){
        return(<><center><h3>No Upcoming Vaccine Drive!</h3></center></>);
      }
      return TableContainer.prototype.render.call(this);
    }

}