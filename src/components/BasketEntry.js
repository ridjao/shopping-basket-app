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
            unitPrice: 0.00
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    } 

    handleAdd(event) {
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
    }

    render() {
        return (
            <div>
                <p>In the absence of product a catalog, this simulates clicking on a product to add to the customer basket...</p>
                <h3>Add Item</h3>
                <label htmlFor="productName">Product Name</label>
                <input id="productName" type="text" value={this.state.productName} onChange={this.handleChange} tabIndex="1" placeholder="Enter product..." />
                <br/>
                <label htmlFor="count">Count</label>
                <input id="count" type="number" value={this.state.count} onChange={this.handleChange} tabIndex="2" placeholder="Enter count..." />
                <br/>
                <label htmlFor="unitPrice">Unit Price</label>
                <input id="unitPrice" type="number" value={this.state.unitPrice} onChange={this.handleChange} tabIndex="3" placeholder="Enter price..." />
                <br/>
                <button onClick={this.handleAdd} tabIndex="4" disabled = {this.state.productName === "" || this.state.count === "" || this.state.unitPrice === ""} >Add</button>
            </div>
        )
    }
}

const BasketEntry = connect(mapStateToProps, mapDispatchToProps)(ConnectedBasketEntry);

export default BasketEntry;
