import React, { Component } from 'react';

export class Sale extends Component {
    static displayName = Sale.name;

    constructor(props) {
        super(props);
        this.state = { sales: [], customers: [], products: [], stores: [], loading: true, modalTitle: "", ProductId: 0, CustomerId: 0, StoreId:0, SaleId: 0, selectedDate:""};
        this.AddNewSaleEvent = this.AddNewSaleEvent.bind(this);
        this.handleDeleteSale = this.handleDeleteSale.bind(this);
        this.renderSaleTable = this.renderSaleTable.bind(this);
        this.handleDeleteData = this.handleDeleteData.bind(this);
        this.handleNewData = this.handleNewData.bind(this);
        this.handleEditData = this.handleEditData.bind(this);
    }

    componentDidMount() {
        this.populateSaleData();
    }

renderSaleTable(sales, customers, products, stores) {
        return  (
            <table className='table table-bordered' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Store Name</th>
                        <th scope="col">Date Sold</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale, index) =>
                        <tr key={index} scope="row">
                            <td>{index+1}</td>
                            <td>{products.find(s => s.id === sale.productId).name}</td>
                            <td>{customers.find(s=> s.id === sale.customerId).name}</td>
                            <td>{stores.find(s => s.id === sale.storeId).name}</td>
                            <td>{sale.dateSold}</td>
                            <td><button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalForm" onClick={() => this.handleEditData(sale.id, sale.productId, sale.customerId, sale.storeId, sale.dateSold)}>Edit</button>
                                <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalDeleteForm" onClick={() => this.handleDeleteData(sale.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderSaleTable(this.state.sales, this.state.customers, this.state.products, this.state.stores, this.handleDeleteSale);

        return (
            <div>
                <h1 id="tabelLabel" >Sale</h1>
                {contents}
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalForm" onClick={this.handleNewData}>Add New Sale</button>
                <div className="modal fade" id="modalForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">{this.state.modalTitle}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Product Name</span>
                                    <select onChange={this.changeProductId} required>
                                        <option disabled selected={(this.state.ProductId === 0) ? true : false}>---- Select ----</option>
                                        {this.state.products.map(product =>
                                            <option key={product.id} value={product.id} selected={(this.state.ProductId === product.id)? true : false }>{product.name}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Customer Name</span>
                                      <select onChange={this.changeCustomerId} required >
                                        <option disabled selected={(this.state.CustomerId === 0) ? true : false}>---- Select ----</option>
                                        {this.state.customers.map(customer =>
                                            <option key={customer.id} value={customer.id} selected={(this.state.CustomeerId === customer.id) ? true : false}>{customer.name}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Store Name</span>
                                    <select onChange={this.changeStoreId} required>
                                        <option disabled selected={(this.state.StoreId === 0) ? true : false}>---- Select ----</option>
                                        {this.state.stores.map(store =>
                                            <option key={store.id} value={store.id} selected={(this.state.StoreId === store.id) ? true : false}>{store.name}</option>
                                        )}
                                    </select>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Date Sold</span>
                                    <input type="date" name="DateSold" value={this.state.selectedDate}  required placeholder="Date" onChange={this.changeDateSold}/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                                {this.state.SaleId === 0 ?
                                    <button className="btn btn-primary float-start" data-bs-dismiss="modal" onClick={() => this.AddNewSaleEvent(this.state.SaleId, this.state.ProductId, this.state.CustomerId, this.state.StoreId, this.state.selectedDate)}>Create</button> : null}
                                {this.state.SaleId !== 0 ?
                                    <button className="btn btn-primary float-start" data-bs-dismiss="modal" onClick={() => this.AddNewSaleEvent(this.state.SaleId, this.state.ProductId, this.state.CustomerId, this.state.StoreId, this.state.selectedDate)}>Update</button> : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="modalDeleteForm" tabIndex="-1" aria-labelledby="DeleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="DeleteModalLabel">Delete Sale</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <p>Are you sure you want to delete this Sale?</p>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                                <button className="btn btn-danger float-start" data-bs-dismiss="modal" onClick={() => this.handleDeleteSale(this.state.SaleId)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
        );
    }
    changeStoreId = (e) => {
        this.setState({ StoreId: (e.target.value) });
    }
    changeProductId = (e) => {
        this.setState({ ProductId: e.target.value });
    }
    changeCustomerId = (e) => {
        this.setState({ CustomerId: e.target.value });
    }
    changeDateSold = (e) => {
        this.setState({ selectedDate: e.target.value });
    }
    handleDeleteData(id) {
        this.setState({
            SaleId: id
        })
    }
    handleEditData(id, productid, customerid, storeid, datesold) {
        this.setState({
            modalTitle: "Edit Customer",
            SaleId: id,
            ProductId: productid,
            CustomerId: customerid,
            StoreId: storeid,
            selectedDate: datesold
        });
        console.log(datesold)
    }
    handleNewData() {
        this.setState({
            modalTitle: "Add New Customer",
            SaleId: 0,
            ProductId: 0,
            CustomerId: 0,
            StoreId:0,
            selectedDate: ""
        });
    }
    async handleDeleteSale(id) {
        this.setState({ sales: [], loading: true });
        const dataSales2 = await fetch('api/sales/'+id, {
            method: 'DELETE',
        }).then((dataSales2) => dataSales2.json());
        console.log(dataSales2)
        this.setState({ sales: dataSales2, loading: false });
    }

    async AddNewSaleEvent(saleid,productid, customerid, storeid, selectedDate) {
        this.setState({ sales: [], loading: true });
        const dataSales1 = await fetch('api/sales', {
            method: 'Post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Id: saleid,
                ProductId: productid,
                CustomerId: customerid,
                StoreId: storeid,
                dateSold: selectedDate
            })
        }).then((dataSales1) => dataSales1.json());
        this.setState({ sales: dataSales1, loading: false });
    }

    async populateSaleData() {
        this.setState({ sales: [], loading: true });
        const responseSales = await fetch('api/sales');
        const dataSales = await responseSales.json();
        const responseCustomers = await fetch('api/customers');
        const dataCustomers = await responseCustomers.json();
        const responseProducts = await fetch('api/products');
        const dataProducts = await responseProducts.json();
        const responseStores = await fetch('api/stores');
        const dataStores = await responseStores.json();
        this.setState({ customers: dataCustomers, sales: dataSales, products: dataProducts, stores: dataStores, loading: false });
    }
}