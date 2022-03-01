import React from "react"
import { useTable,useFilters } from "react-table"
import { Table } from 'reactstrap';
import eventBus from '../components/eventBus';

const TableComponent = ({ columns, data }) => {
  var {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  },
  useFilters
  )

  return (
    <Table striped hover {...getTableProps()}>
      <thead className="table-dark">
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) =>  {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default class TableContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {columns:this.props.columns, data:this.props.data}

    this.deleteRow = this.deleteRow.bind(this);
    this.addRow = this.addRow.bind(this);
    this.updateRow = this.updateRow.bind(this);

  }
  

  componentDidMount(){
    this._ismounted = true;
    eventBus.on(this.deleteEventName(), (data) =>{
        this.deleteRow( data )
        });
        eventBus.on(this.addEventName(), (data) =>{
          this.addRow( data )
          });

          eventBus.on(this.updateEventName(), (data) =>{
            this.updateRow( data )
            });

    }

    componentDidUpdate(previousProps){
      if(previousProps.data == this.props.data){
        return
      }
      
      this.setState({
        columns:this.state.columns, data:this.props.data
      });
    }

    addEventName(){
      return "defaultAddEvent"
    }



    componentWillUnmount() {
      this._ismounted = false;
      eventBus.remove(this.deleteEventName());
      eventBus.remove(this.addEventName());
      eventBus.remove(this.updateEventName());
    }


    

  deleteEventName(){
    return "defaultDelete";
  }

  deleteRow(rowId){
    var rowData = this.state.data;

    rowData.splice(rowId, 1);

    var clone = JSON.parse(JSON.stringify(rowData));
    if(this._ismounted){
    this.setState({
      columns:this.state.columns, data:clone
    });
    }
  }

  addRow(newRow){
    var newData = this.state.data;

    newData.push(newRow);

    var clone = JSON.parse(JSON.stringify(newData));
    if(this._ismounted){
    this.setState({
      columns:this.state.columns, data:clone
    });
  }
  }

  updateEventName(){
    return "defaultUpdate";
  } 

  primaryKeyAccessor(){
    return 'defaultId';
  }

  updateRow(updatedRow){
    var oldData = this.state.data;
    var newData = [];
    newData.push(updatedRow);

    oldData.forEach(element => {
      if(element[this.primaryKeyAccessor()] != updatedRow[this.primaryKeyAccessor()])
      newData.push(element);
    });

    oldData.splice(0,oldData.length);
    newData.forEach(element => {
      oldData.push(element);
    });

    if(this._ismounted){
      var clone = JSON.parse(JSON.stringify(newData));
      this.setState({
        columns:this.state.columns, data:clone
      });
    }
  }

  render(){
    return (
      <>
      <TableComponent columns={this.state.columns} data={this.state.data}/>
      </>
    )
  }
  
}