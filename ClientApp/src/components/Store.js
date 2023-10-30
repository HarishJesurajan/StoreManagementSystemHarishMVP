import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export class Store extends Component {
    static displayName = Store.name;

    constructor(props) {
        super(props);
        this.state = { stores: [], loading: true, modalTitle: "", StoreName: "", StoreAddress: "", StoreId: 0 }
        this.AddNewStoreEvent = this.AddNewStoreEvent.bind(this);
        this.handleDeleteStore = this.handleDeleteStore.bind(this);
        this.handleNewData = this.handleNewData.bind(this);
        this.handleEditData = this.handleEditData.bind(this);
        this.renderStoreTable = this.renderStoreTable.bind(this);
        this.handleDeleteData = this.handleDeleteData.bind(this);
    }

    componentDidMount() {
        this.populateStoreData();
    }

    renderStoreTable(stores) {
        return (
            <>
                <table className='table table-bordered' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stores.map((store, index) =>
                            <tr key={index} scope="row">
                                <td>{index + 1}</td>
                                <td>{store.name}</td>
                                <td>{store.address}</td>
                                <td><button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalForm" onClick={() => this.handleEditData(store.id, store.name,store.address)}>Edit</button>
                                    <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalDeleteForm" onClick={() => this.handleDeleteData(store.id)}>Delete</button>
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
            : this.renderStoreTable(this.state.stores);

        return (
            <div>
                <h1 id="tabelLabel" >Stores</h1>
                {contents}
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalForm" onClick={this.handleNewData}>Add New Store</button>
                <div className="modal fade" id="modalForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">{this.state.modalTitle}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Store Name</span>
                                    <input type="text" className="form-control" value={this.state.StoreName} onChange={this.changeStoreName} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Store Address</span>
                                    <input type="text" className="form-control" value={this.state.StoreAddress} onChange={this.changeStoreAddress} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                                {this.state.StoreId === 0 ?
                                    <button className="btn btn-primary float-start" data-bs-dismiss="modal" onClick={() => this.AddNewStoreEvent(this.state.StoreId, this.state.StoreName, this.state.StoreAddress)}>Create</button> : null}
                                {this.state.StoreId !== 0 ?
                                    <button className="btn btn-primary float-start" data-bs-dismiss="modal" onClick={() => this.AddNewStoreEvent(this.state.StoreId, this.state.StoreName, this.state.StoreAddress)}>Update</button> : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="modalDeleteForm" tabIndex="-1" aria-labelledby="DeleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="DeleteModalLabel">Delete Store</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <p>Are you sure you want to delete this Store?</p>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                                <button className="btn btn-danger float-start" data-bs-dismiss="modal" onClick={() => this.handleDeleteStore(this.state.StoreId)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
    handleDeleteData(id) {
        this.setState({
            StoreId: id
        })
    }
    handleEditData(id, name, address) {
        this.setState({
            modalTitle: "Edit Store",
            StoreId: id,
            StoreName: name,
            StoreAddress: address
        });
    }
    handleNewData() {
        this.setState({
            modalTitle: "Add New Store",
            StoreId: 0
        });
    }
    changeStoreName = (e) => {
        this.setState({ StoreName: e.target.value });
    }
    changeStoreAddress = (e) => {
        this.setState({ StoreAddress: e.target.value });
    }
    async handleDeleteStore(id) {
        this.setState({ store: [], loading: true });
        const datastore = await fetch('api/stores/' + id, {
            method: 'DELETE',
        }).then((datastore) => datastore.json());
        console.log(datastore)
        this.setState({ stores: datastore, loading: false });
    }
    async AddNewStoreEvent(id, name, address) {
        this.setState({ stores: [], loading: true });
        const data1 = await fetch('api/stores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Id: id,
                Name: name,
                Address: address
            })
        }).then((data1) => data1.json());
        this.setState({ stores: data1, loading: false });
    }

    async populateStoreData() {
        this.setState({ stores: [], loading: true });
        const response = await fetch('api/stores');
        const data = await response.json();
        this.setState({ stores: data, loading: false });

    }
}