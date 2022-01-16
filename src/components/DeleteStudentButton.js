import React from 'react';
import { Button } from "reactstrap";
import eventBus from '../components/eventBus';
export default class DeleteStudentButton extends React.Component {
    constructor(props) {
      super(props);

      this.onClickListener = this.onClickListener.bind(this);
    }

    render(){
        return (<div style={{ textAlign: 'center', fontSize: 18 }}>
                <Button outline onClick={this.onClickListener} >Delete</Button>
                </div>);
    }

    onClickListener() {
        eventBus.dispatch('deleteStudent',this.props.cell.row.id);
      }
}