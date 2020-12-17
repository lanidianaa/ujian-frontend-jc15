import Axios from 'axios';
import React, { Component } from 'react';
import { Button, Table } from 'reactstrap';
import swal from 'sweetalert';
import { api_url } from '../helpers/api_url';
class HistoryPage extends Component {
    state = {
        history: [],
    };

    componentDidMount(){
        this.renderTransaction();
    }
    renderTransaction = () => {
        Axios.get(`${api_url}/transaction`)
        .then((res)=> {
            this.setState({
                history: res.data,
            })
        })
        .catch((err)=>{});
    };
    cancelOrder = (id, items) => {
        items.forEach((val) => {
            Axios.get(`${api_url}/products?name=${val.name}`)
            .then((res) => {
                Axios.patch(`${api_url}/products/${res.data[0].id}`, {
                    stock: res.data[0].stock + val.qty
                })
                .then((ress)=> {

                })
                .catch((err) => console.log(err));                
            })
            .catch((err) => {});
        })
        Axios.delete(`${api_url}/transaction/${id}`)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {});
        
        this.renderTransaction();

    };

    dummyOnly = () => {
        swal("Sorry", "Dummy Button","error");
    }
    renderHistory = () => {
        const { history } = this.state;
        
        return history.map((val, i) => {
            let res = val.items.map((val) => {
            return(
                <div className="d-flex justify-content-between my-1">
                    <div>{val.name}</div>
                    <div><img src={val.image} alt="ada" height="50px" width="70px"/></div>
                    <div>Price: @Rp{val.price.toLocaleString()}</div>
                    <div>Qty: {val.qty}</div>
                </div>
            )
        })
            return(
                <tr style={{ alignSelf: "center" }}>
                    <td>{i + 1}</td>
                    <td>{val.date}</td>
                    <td>{res}</td>
                    <td><b>Rp{val.total.toLocaleString()}</b></td>
                    <td><b>Belum bayar</b></td>
                    <td>
                        <Button onClick={this.dummyOnly}>
                            Bayar
                        </Button>
                    </td>
                    <td>
                        <Button 
                        color="danger" onClick={() => this.cancelOrder(val.id, val.items)}>
                            Cancel Order
                        </Button>
                    </td>
                </tr>
            )
        })
    }
    render() { 
        return (
            <div>
                <Table style={{ textAlign: "center"}}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.renderHistory()}
                    </tbody>
                </Table>
            </div>
        );
    }
}
 
export default (HistoryPage);