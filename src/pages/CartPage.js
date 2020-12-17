import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Table } from 'reactstrap';
import { fetchCart, deleteCart, addQty, subQty, checkOut } from '../redux/action';
import Swal from 'sweetalert2';

class CartPage extends Component {
    state = {
        visible: true,
    };

    componentDidMount(){
        const { userID, fetchCart } = this.props;
        fetchCart(userID);
    };
    deleteCart = (id, userID) => {
        const { deleteCart } = this.props;
        deleteCart(id, userID);
    };

    addBtn = (name,qty,id) => {
        const { userID } = this.props;
        this.props.addQty(name,qty,id,userID);
    };
    subBtn = (name, qty, id) => {
        const { userID } = this.props;
        this.props.subQty(name, qty, id, userID);
    };

    showButton = () => {
        this.setState({
            visible: !this.state.visible
        });
    };
    cart = () =>{
        const { cart } = this.props;
        return cart.map((val) => {
            return(
                <tr>
                    <td>{val.id}</td>
                    <td>{val.name}</td>
                    <td>
                        <img src={val.image} alt={val.name} height="100px"/>
                    </td>
                    {this.state.visible 
                    ? 
                    (
                        <td>
                            {val.qty}
                        </td>
                    )
                    :
                    (<td>
                        <Button className="mx-2" color="primary" onClick={() => this.subBtn(val.name, val.qty,val.id)}>
                            -
                        </Button>
                        {val.qty}
                        <Button className="mx-2" color="primary" onClick={() => this.addBtn(val.name,val.qty,val.id)}>
                            +
                        </Button>
                    </td>) 
                    }
                    <td>Rp{(val.price * val.qty).toLocaleString()}</td>
                    {!this.state.visible
                    ?
                    (<td>
                        <Button onClick={this.showButton} className="mx-3" color="success">
                            Save
                        </Button>
                        <Button color="danger" onClick={this.showButton}>
                            Cancel
                        </Button>
                    </td>)
                    :
                    (<td>
                        <Button onClick={this.showButton} className="mx-3" color="primary">
                            Edit
                        </Button>
                        <Button color="danger" onClick={()=>this.deleteCart(val.id, val.userID)}>
                            Delete
                        </Button>
                    
                    </td>)
                    }
                </tr>
            )
        })
    };

    grandTotal = () => {
        const { cart } = this.props;
        let total = 0;
        cart.forEach((val) => {
            total += val.qty*val.price
        });
        return total;
    };

    checkOutCart = () => {
        const { cart, userID, checkOut } = this.props;
        let date = new Date();
        let day = date.getDate();
        let month = (date.getMonth())+1;
        let year = date.getFullYear();

        const data = {
            date: `${day}-${month}-${year}`,
            total: this.grandTotal(),
            items: cart,
            userID: userID
        };
        
        checkOut(data);
    }

    checkOutAlert = () => {
        Swal.fire({
            title: 'Are you sure to check out?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I want to check out!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Success!',
                'You can check your transaction page now.',
                'success'
              )
              this.checkOutCart();
            }
          })
    };

    render() { 
        const { cart } = this.props;
        if(cart.length === 0){
            return (
            <div>
                <h1>Your Cart is Empty</h1>
            </div>)
        }
        return (
            <div>
                <Table style={{ textAlign: "center" }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.cart()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Grand Total:</td>
                            <td>Rp{this.grandTotal().toLocaleString()}</td>
                            <td>
                                <Button color="warning" onClick={this.checkOutAlert}>
                                    Checkout
                                </Button>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        cart: state.cart.cart,
        userID: state.user.id,
    };
};
export default connect(mapStatetoProps, {
    fetchCart,
    deleteCart,
    addQty,
    subQty,
    checkOut
})
(CartPage);