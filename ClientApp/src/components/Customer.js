import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export class Customer extends Component {
    static displayName = Customer.name;

    constructor(props) {
        super(props);
        this.state = { customers: [], loading: true, modalTitle:"", CustomerName:"", CustomerAddress:"", CustomerId:0 }
        this.AddNewCustomerEvent = this.AddNewCustomerEvent.bind(this);
        this.handleDeleteCustomer = this.handleDeleteCustomer.bind(this);
        this.handleNewData = this.handleNewData.bind(this);
        this.handleEditData = this.handleEditData.bind(this);
        this.renderCustomerTable = this.renderCustomerTable.bind(this);
        this.handleDeleteData = this.handleDeleteData.bind(this);
    }

    componentDidMount() {
        this.populateCustomerData();
    }

renderCustomerTable(customers) {
        return (
            <>
            <table className='table table-bordered' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Address</th>
                            <th scope="col"> Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer, index) =>
                        <tr key={index} scope="row">
                            <td >{index+1}</td>
                            <td>{customer.name}</td>
                            <td>{customer.address}</td>
                            <td><button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalForm" onClick={()=>this.handleEditData(customer.id, customer.name, customer.address)}>Edit</button>
                                <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalDeleteForm" onClick={() => this.handleDeleteData(customer.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
               
            </>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCustomerTable(this.state.customers);

        return (
            <div>
                <h1 id="tabelLabel" >Customers</h1>
                {contents}
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalForm" onClick={this.handleNewData}>Add New Customer</button>
                <div className="modal fade" id="modalForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">{this.state.modalTitle}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Customer Name</span>
                                    <input required type="text" className="form-control" value={this.state.CustomerName} onChange={this.changeCustomerName}/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Customer Address</span>
                                    <input required type="text" className="form-control" value={this.state.CustomerAddress} onChange={this.changeCustomerAddress} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                                {this.state.CustomerId === 0 ?
                                    <button className="btn btn-primary float-start" data-bs-dismiss="modal" onClick={()=>this.AddNewCustomerEvent(this.state.CustomerId, this.state.CustomerName, this.state.CustomerAddress) }>Create</button> : null}
                                {this.state.CustomerId !== 0 ?
                                    <button className="btn btn-primary float-start" data-bs-dismiss="modal" onClick={() => this.AddNewCustomerEvent(this.state.CustomerId, this.state.CustomerName, this.state.CustomerAddress)}>Update</button> : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="modalDeleteForm" tabIndex="-1" aria-labelledby="DeleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="DeleteModalLabel">Delete Customer</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <p>Are you sure you want to delete this Customer?</p>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                                <button className="btn btn-danger float-start" data-bs-dismiss="modal" onClick={() => this.handleDeleteCustomer(this.state.CustomerId)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
    handleDeleteData(id) {
        this.setState({
            CustomerId: id
        })
    }
   handleEditData(id, name, address) {
        this.setState({
            modalTitle: "Edit Customer",
            CustomerId: id,
            CustomerName: name,
            CustomerAddress: address
        });
        }
    handleNewData() {
        this.setState({
            modalTitle: "Add New Customer",
            CustomerId: 0
        });
    }
    changeCustomerName = (e) => {
        this.setState({ CustomerName: e.target.value });
    }
    changeCustomerAddress = (e) => {
        this.setState({ CustomerAddress: e.target.value });
    }
    async handleDeleteCustomer(id) {
        this.setState({ customer: [], loading: true });
        const datacustomer = await fetch('api/customers/' + id, {
            method: 'DELETE',
        }).then((datacustomer) => datacustomer.json());
        console.log(datacustomer)
        this.setState({ customers: datacustomer, loading: false });
    }
    async AddNewCustomerEvent(id, name, address) {
        this.setState({ customers: [], loading: true });
        const data1 = await fetch('api/customers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Id: id,
                Name: name,
                Address: address
            })
        }).then((data1) => data1.json());
        this.setState({ customers: data1, loading: false });
    }

    async populateCustomerData() {
        this.setState({ customers: [], loading: true });
        const response = await fetch('api/customers');
        const data = await response.json();
        this.setState({ customers: data, loading: false });
        
    }
}