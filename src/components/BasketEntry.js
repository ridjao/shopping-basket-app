import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { setItems } from '../actions'

const mapStateToProps = state => {
    return { 
        customerId: state.customerId
    };
};

function mapDispatchToProps(dispatch) {
    return {
        setItems: items => dispatch(setItems(items))
    };
}

class ConnectedBasketEntry extends React.Component {
    constructor() {
        super();
        this.state = {
            productName: "",
            count: 1,
            unitPrice: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.typeInput = React.createRef();
        this.addButton = React.createRef();
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    } 

    handleAdd(event) {
        event.preventDefault();
        axios.post(`http://localhost:8080/api/v1/baskets/${this.props.customerId}/items`, {
            addItems: [{
                productName: this.state.productName,
                count: this.state.count,
                unitPrice: this.state.unitPrice
            }]
        }).then(res => {
            console.log(res);
            const items = res.data.items === null ? [] : res.data.items
            this.props.setItems(items);
        })
        this.setState({
            productName: "",
            count: 1,
            unitPrice: ""
        });
        this.typeInput.current.focus();
    }

    handleKeyPress(event) {
        if (event.key === "Enter") {
            this.addButton.current.click();
        }
    }

    render() {
        return (
            <div>
                <p>In the absence of product a catalog, this simulates clicking on a product to add to the customer basket.</p>
                <h3>Add Item</h3>
                <form className="form-horizontal">
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="productName">Product Name</label>
                        <div className="col-sm-3">
                            <input ref={this.typeInput} className="form-control" id="productName" type="text" value={this.state.productName} onChange={this.handleChange} tabIndex="2" placeholder="Enter product..." />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="count">Count</label>
                        <div className="col-sm-2">
                            <input className="form-control" id="count" type="number" value={this.state.count} onChange={this.handleChange} tabIndex="3" placeholder="Enter count..." />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="unitPrice">Unit Price</label>
                        <div className="col-sm-2">
                            <input className="form-control" id="unitPrice" type="number" value={this.state.unitPrice} onChange={this.handleChange} tabIndex="4" placeholder="Enter price..." />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-2">
                            <button ref={this.addButton} className="btn btn-primary" onClick={this.handleAdd} tabIndex="5" disabled = {this.state.productName === "" || this.state.count === "" || this.state.unitPrice === ""} >Add</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const BasketEntry = connect(mapStateToProps, mapDispatchToProps)(ConnectedBasketEntry);

export default BasketEntry;
