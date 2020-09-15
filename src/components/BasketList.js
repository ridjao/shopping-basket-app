import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { setItems } from '../actions'

const mapStateToProps = state => {
    return { 
        customerId: state.customerId,
        items: state.items
    };
};

function mapDispatchToProps(dispatch) {
    return {
        setItems: items => dispatch(setItems(items))
    };
}

function formatMoney(x) {
    return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class ConnectedBasketList extends React.Component {
    constructor() {
        super();
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleRemove(event) {
        axios.post(`http://localhost:8080/api/v1/baskets/${this.props.customerId}/items`, {
            removeItemIds: [Number(event.target.id)]
        }).then(res => {
            console.log(res);
            const items = res.data.items === null ? [] : res.data.items
            this.props.setItems(items);
        })
    }

    render() {
        const total = this.props.items.reduce((subtotal, item) => subtotal + item.count * item.unitPrice, 0);
        return (
            <div>
                <h3>Basket Items</h3>
                <table>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Count</th>
                            <th>Unit Price</th>
                        </tr>
                        {
                            this.props.items.map(item =>
                                (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.count}</td>
                                        <td>{formatMoney(item.unitPrice)}</td>
                                        <td><button className="btn btn-primary" id={item.id} onClick={this.handleRemove} tabIndex="-1">Remove</button></td>
                                    </tr>
                                )
                            )
                        }
                        <tr>
                            <td></td>
                            <td></td>
                            <td>Total</td>
                            <td>{formatMoney(total)}</td>                            
                        </tr>
                    </tbody>
			    </table>
            </div>
        )
    }
}

const BasketList = connect(mapStateToProps, mapDispatchToProps)(ConnectedBasketList);

export default BasketList;
