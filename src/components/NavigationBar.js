import { Link } from "react-router-dom";
import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem} from 'reactstrap';

export default class Navigationbar extends React.Component {
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    render() {
      return ( <>
      <Navbar color="dark" dark expand="md" className="fixed-top">
          <NavbarBrand href="/">Vaccine Tracker System</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
              <NavLink to = "/" tag={Link} > Home </NavLink>
              </NavItem>
              <NavItem>
              <NavLink to = "/GenerateVaccineReport" tag={Link}> Generate Vaccine Report</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to = "/BookVaccineDrive" tag={Link}> Book Vaccine Drive </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to = "/manageVaccineStatus" tag={Link}> Manage Vaccine Status </NavLink>
              </NavItem>
			                <UncontrolledDropdown nav inNavbar >
                <DropdownToggle nav caret>
                  Manage Student
                </DropdownToggle>
                <DropdownMenu dark end>
                  <DropdownItem>
                    <NavLink to = "/AddStudent" tag={Link}> Add </NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink to = "/BulkUpload" tag={Link}> Bulk Add </NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink to = "/ManageStudent" tag={Link}> View/ Delete </NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </>
          );
        }
      }