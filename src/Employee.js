import React, { Component, useState } from "react";
//import { browserHistory } from 'react-router';
import axios from 'axios';
import { Row, Col, Container, Form, Button, Modal } from 'react-bootstrap';
import DataService from "./Service";

class Employee extends Component {
  state = {
    name: '',
    isLoad: true,
    show: false,
    setShow: false,
    message: '',
    showMessgae : false,
    isEditOperation: false,
    isDeleteOperation: false,
    carsList: []
  }

  fetchcars() {
    DataService.getAll()
      .then(response => {
        this.setState({
          carsList: response.data,
          isLoad: false
        })
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  componentDidMount() {
    this.fetchcars();
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
  }

  handleClose  = event => {
    this.setState({ setShow:false, show:false, isEditOperation: false, isDeleteOperation: false });
  };

  handleShow  = event => {
    this.setState({ setShow:true, show:true, id: '', name: ''});
  };

  handleEdit(modelDetails) {
    this.setState({
        setShow: true,
        show: true,
        id: modelDetails.id,
        isEditOperation: true,
        name: modelDetails.name
    });
  }

  handleDelete(modelDetails){
    this.setState({
      id: modelDetails.id,
      name: modelDetails.name,
      isDeleteOperation: true,
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.isEditOperation && !this.state.isDeleteOperation) {
      var data = {
        name: this.state.name
      };
      //Add operation.
      DataService.create(data)
        .then(response => {
            console.log(response);
            console.log(response.data);
            this.setState({ message: 'Added succesfully' });
            this.componentDidMount();
            this.setState({ setShow:false, show:false, showMessgae:true });
        })
        .catch(e => {
          console.log(e);
        });
    }
    else {
      // Edit Operation.
      const Editdata = {
        id: this.state.id,
        name: this.state.name
      }      
        DataService.update(Editdata)
          .then(response => {
              if (response.status === 200) {
                  this.componentDidMount();
                  this.setState({
                      message: "Model has been Edited.",
                      setShow:false, 
                      show:false, 
                      showMessgae:true,
                      isEditOperation:false
                  });
              }
          })
          .catch(e => {
            console.log("AXIOS ERROR: ");
          });
    }
    // Delete Operation.
    if(this.state.isDeleteOperation){
      const data = {
        id: this.state.id
      }
      DataService.remove(data)
        .then(response => {
            if (response.status === 200) {
              this.componentDidMount();
              this.setState({
                message: "Model has been deleted.",
                showMessgae:true,
                isDeleteOperation:false
              });
            }
        })
        .catch(e => {
          console.log("AXIOS ERROR: ");
        });
    }
    
  }

  render() {
    const { isLoad, carsList, message } = this.state;
    let statusMessage = message;
    let carListNew = null;

      carListNew = (
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                    <tr>
                        <th># ID</th>
                        <th>Car Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                  <React.Fragment>
                  {!isLoad ? (
                      carsList.map((car, index) => {
                      return (
                          <tr key={ index }>
                              <td>{ car.id }</td>
                              <td>{ car.name }</td>
                              <td>
                                <button class="btn btn-success btn-sm" onClick={() => this.handleEdit(car)}>Edit</button>
                                &nbsp;
                                <button class="btn btn-danger btn-sm" onClick={() => this.handleDelete(car)}>Delete</button>
                              </td>
                          </tr>
                      );
                      })
                  ) : (
                      <tr><td colSpan="3">Loading...</td></tr>
                  )}
                  </React.Fragment>
              </tbody>
            </table>
        </div>
        );

    return (
      <div>
        <div className="registration-page">
            <h3>Car Inventory</h3>
            <Row>        
              <Col>
                <Button variant="primary" onClick={this.handleShow}>
                  Add New Car
                </Button>
                
                <Modal show={this.state.isDeleteOperation} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Do you want to Delete "{this.state.name}"?</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                      <Button variant="primary" type="submit">Confirm</Button>
                    </Form>
                  </Modal.Body>
                </Modal>

                <Modal show={this.state.show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add New Car:</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Enter Car's Name:</Form.Label>
                        <Form.Control type="text" value={this.state.name} placeholder="Enter Car's Name" name="name" onChange={this.handleChange} />
                      </Form.Group>
                      <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                  </Modal.Body>
                </Modal>                
              </Col>
              <Col>&nbsp;</Col>
          </Row>
        </div>
          <div className="display-list">
            <p show={this.state.showMessgae}>{statusMessage}</p>
            { carListNew }            
          </div>
      </div>
    );
  }
}

export default Employee;