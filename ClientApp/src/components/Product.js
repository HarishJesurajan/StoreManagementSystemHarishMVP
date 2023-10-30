import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export class Product extends Component {
    static displayName = Product.name;

    constructor(props) {
        super(props);
        this.state = { products: [], loading: true, modalTitle: "", ProductName: "", ProductPrice: "", ProductId: 0 }
        this.AddNewProductEvent = this.AddNewProductEvent.bind(this);
        this.handleDeleteProduct = this.handleDeleteProduct.bind(this);
        this.handleNewData = this.handleNewData.bind(this);
        this.handleEditData = this.handleEditData.bind(this);
        this.renderProductTable = this.renderProductTable.bind(this);
        this.handleDeleteData = this.handleDeleteData.bind(this);
    }

    componentDidMount() {
        this.populateProductData();
    }

    renderProductTable(products) {
        return (
            <>
                <table className='table table-bordered' aria-labelledby="tabelLabel">
                    <thead>
                        <tr scope="col">
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) =>
                            <tr key={index} scope="row">
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td><button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalForm" onClick={() => this.handleEditData(product.id, product.name, product.price)}>Edit</button>
                                    <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalDeleteForm" onClick={() => this.handleDeleteData(product.id)}>Delete</button>
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
            : this.renderProductTable(this.state.products);

        return (
            <div>
                <h1 id="tabelLabel" >Products</h1>
                {contents}
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalForm" onClick={this.handleNewData}>Add New Product</button>
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
                                    <input type="text" className="form-control" value={this.state.ProductName} onChange={this.changeProductName} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Product Price</span>
                                    <input type="text" className="form-control" value={this.state.ProductPrice} onChange={this.changeProductPrice} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                                {this.state.ProductId === 0 ?
                                    <button className="btn btn-primary float-start" data-bs-dismiss="modal" onClick={() => this.AddNewProductEvent(this.state.ProductId, this.state.ProductName, this.state.ProductPrice)}>Create</button> : null}
                                {this.state.ProductId !== 0 ?
                                    <button className="btn btn-primary float-start" data-bs-dismiss="modal" onClick={() => this.AddNewProductEvent(this.state.ProductId, this.state.ProductName, this.state.ProductPrice)}>Update</button> : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="modalDeleteForm" tabIndex="-1" aria-labelledby="DeleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="DeleteModalLabel">Delete Product</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <p>Are you sure you want to delete this Product?</p>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                                <button className="btn btn-danger float-start" data-bs-dismiss="modal" onClick={() => this.handleDeleteProduct(this.state.ProductId)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
    handleDeleteData(id) {
        this.setState({
            ProductId: id
        })
    }
    handleEditData(id, name, price) {
        this.setState({
            modalTitle: "Edit Product",
            ProductId: id,
            ProductName: name,
            ProductPrice: price
        });
    }
    handleNewData() {
        this.setState({
            modalTitle: "Add New Product",
            ProductId: 0
        });
    }
    changeProductName = (e) => {
        this.setState({ ProductName: e.target.value });
    }
    changeProductPrice = (e) => {
        this.setState({ ProductPrice: e.target.value });
    }
    async handleDeleteProduct(id) {
        this.setState({ product: [], loading: true });
        const dataproduct = await fetch('api/products/' + id, {
            method: 'DELETE',
        }).then((dataproduct) => dataproduct.json());
        console.log(dataproduct)
        this.setState({ products: dataproduct, loading: false });
    }
    async AddNewProductEvent(id, name, price) {
        this.setState({ products: [], loading: true });
        const data1 = await fetch('api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Id: id,
                Name: name,
                Price: price
            })
        }).then((data1) => data1.json());
        this.setState({ products: data1, loading: false });
    }

    async populateProductData() {
        this.setState({ products: [], loading: true });
        const response = await fetch('api/products');
        const data = await response.json();
        this.setState({ products: data, loading: false });

    }
}