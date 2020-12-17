import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { addToCart } from '../redux/action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CartModal extends Component {
    state = {
        isOpen: false,
        qty: 1,
        checked: false,
    };
    toggle = () => {
        const { userEmail } = this.props;
        if(userEmail !== ""){
            this.setState({
                isOpen: !this.state.isOpen
            });            
        }else{
            Swal.fire({
                title: 'Denied',
                text: "You need to log in first",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Log In'
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = "/login";
                }
              })
        }
    };
    increase = () => {
        this.setState({
            qty: this.state.qty+1,
        });
    };
    decrease = () => {
        this.setState({
            qty: this.state.qty-1,
        });
    };

    fetchProduct = () => {
        const { id, productList } = this.props;
        let res = productList.find((val) => {
            return val.id === id
        });
        return (
            <div>
                <ModalHeader toggle={this.toggle}>
                    {res.name}
                </ModalHeader>
                <ModalBody>
                <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <div>
                        <img src={res.image} alt=".jpg" height="150px"/>
                    </div>
                    <div style={{ alignSelf: "center" }}>
                        <div>
                            Price: Rp{res.price.toLocaleString()}
                        </div>
                        <div className="my-2">
                            Stock: {res.stock}
                        </div>
                        <div style={{ display: "flex", flexDirection: "row"}}>
                            <div>
                                <Button 
                                    onClick={this.decrease} 
                                    color="info"    
                                    disabled={this.state.qty === 1}
                                >
                                -
                                </Button>
                            </div>
                            <div className="my-1 mx-2">{this.state.qty}</div>
                            <div>
                                <Button 
                                    onClick={this.increase} 
                                    color="info"    
                                    disabled={this.state.qty === res.stock}
                                >
                                +
                                </Button>
                            </div>
                        </div>                        
                    </div>
                </div>
                </ModalBody>
            </div>
        )
    };
    addToCart = () => {
        const { addToCart, id, productList, userID, cart } = this.props;
        let res = productList.find((val) =>{
            return (val.id === id);
        });
        let data = {
            name: res.name,
            categoryID: res.categoryID,
            image: res.image,
            price: res.price,
            qty: this.state.qty,
            userID: userID,
        };

        let cek = cart.find((val) => {
            return val.name === res.name;
        });
        if(cek){
            let total = cek.qty + this.state.qty;
            if(total <= res.stock){
                addToCart(data);
                this.toastInfo();
            }else{
                swal("Insufficient Stock!", "Please check your cart!","error");
            }    
        }else{
            addToCart(data);
            this.toastInfo();
        };
    };
    toastInfo = () => {
        toast("Added to Cart!");
        this.setState({
            checked: !this.state.checked,
        });
    }

    successAdd = () => {
        this.setState({
            isOpen: !this.state.isOpen,
            checked: false,
        });
    };
    cartBtnAfter = () => {
		return (
			<div>
				<Button color="secondary" onClick={this.successAdd}>
					Close
				</Button>
			</div>
		);
    };
    
    cartBtnBefore = () => {
        const { productList, id } = this.props;
        let res = productList.find((val) => {
            return val.id === id;
        });
		return (
			<div>
                <Button 
                    color="success" 
                    style={{ margin: "0px 10px" }}    
                    onClick={this.addToCart} 
                    disabled={res.stock === 0}
                >
					Add to Cart
				</Button>
				<Button color="danger" onClick={this.toggle}>
					Cancel
				</Button>
			</div>
		);
    };
    
    dummyBtn = () => {
        return swal("Sorry", "Dummy Button", "error");
    };

    render() { 
        const {buttonLabel} = this.props;
        return (
            <div>
                <Button color="info" onClick={this.toggle} style={{ margin: "0px 21px 0px 0px" }}>
                    {buttonLabel}
                </Button>
                <Button onClick={this.dummyBtn}>
                    Info
                </Button>
                <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
                    {this.fetchProduct()}
                    <ModalFooter>
                        {this.state.checked ? this.cartBtnAfter() : this.cartBtnBefore()}
                        <ToastContainer/>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
const mapStatetoProps = (state) => {
    return{
        productList: state.product.productList,
        userEmail: state.user.email,
        userID: state.user.id,
        cart: state.cart.cart,
    };
};
export default connect(mapStatetoProps, {
    addToCart
})
(CartModal);