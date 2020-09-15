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

    handleCreate(event) {
        event.preventDefault();
        axios.put(`http://localhost:8080/api/v1/baskets/${this.state.customerId}`).then(res => {
            console.log(res);
            const items = res.data.items === null ? [] : res.data.items
            this.props.setItems(items);
        })
        this.props.selectBasket(this.state.customerId);
    }

    handleGet(event) {
        event.preventDefault();
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
                <p>Click the Create button to create the customer basket. Enter ID and press Tab to get the contents of an existing customer basket.</p>
                <h3>Customer</h3>
                <form className="form-horizontal">
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="customerId">Customer ID</label>
                        <div className="col-sm-2">
                            <input className="form-control" id="customerId" type="number" value={this.state.customerId} onChange={this.handleChange} onBlur={this.handleGet} tabIndex="1" autoFocus placeholder="Enter ID..." />
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-primary" onClick={this.handleCreate} tabIndex="-1" disabled = {this.state.customerId === ""}>Create Basket</button>
                        </div>                                               
                    </div>
                </form>
            </div>
        )
    }
}

const Customer = connect(null, mapDispatchToProps)(ConnectedCustomer);

export default Customer;
