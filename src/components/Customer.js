import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { selectBasket, setItems } from '../actions'

function mapDispatchToProps(dispatch) {
    return {
        selectBasket: customerId => dispatch(selectBasket(customerId)),
        setItems: items => dispatch(setItems(items))
    };
}

class ConnectedCustomer extends React.Component {
    constructor() {
        super();
        this.state = {
            customerId: 1
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleGet = this.handleGet.bind(this);
    }

    handleChange(event) {
        console.log({ [event.target.id]: event.target.value });
        this.setState({ [event.target.id]: event.target.value });
    } 

    handleCreate() {
        axios.put(`http://localhost:8080/api/v1/baskets/${this.state.customerId}`).then(res => {
            console.log(res);
            const items = res.data.items === null ? [] : res.data.items
            this.props.setItems(items);
        })
        this.props.selectBasket(this.state.customerId);
    }

    handleGet() {
        axios.get(`http://localhost:8080/api/v1/baskets/${this.state.customerId}/items`).then(res => {
            console.log(res);
            const items = res.data.items === null ? [] : res.data.items
            this.props.setItems(items);
        })
        this.props.selectBasket(this.state.customerId);
    }

    render() {
        return (
            <div>
                <p>This simulates customer creation and login.</p>
                <p>Clicking the Create button creates the customer basket. Clicking the Get button gets an existing customer basket</p>
                <label htmlFor="customerId">Customer ID</label>
                <input id="customerId" type="number" value={this.state.customerId} onChange={this.handleChange} tabIndex="1" autoFocus placeholder="Enter ID..." />
                <button onClick={this.handleCreate} tabIndex="2" disabled = {this.state.customerId === ""}>Create Basket</button>
                <button onClick={this.handleGet} tabIndex="3" disabled = {this.state.customerId === ""}>Get Basket</button>
            </div>
        )
    }
}

const Customer = connect(null, mapDispatchToProps)(ConnectedCustomer);

export default Customer;
