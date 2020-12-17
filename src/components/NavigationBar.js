import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Badge,
  Button
} from 'reactstrap';
import swal from 'sweetalert';
import { logoutAction } from '../redux/action';
import userPic from '../picture/images.png';
import "./navbar.css";

class NavigationBar extends Component {
    state = {
        isOpen: false,
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };

    logOut = () => {
        localStorage.removeItem("id");
        this.props.logoutAction();
        swal("Success!", "Logged Out", "success");
    };

    renderNama = () => {
        const { userEmail } = this.props;
        let name = userEmail.substring(0, userEmail.lastIndexOf("@"));
        return (
            <div className="row">
                <div style={{ margin: "7px 20px 0px 5px"}}>
                    {name}
                </div>
                <div>
                    <Button onClick={this.logOut}>
                        Log Out
                    </Button>
                </div>
            </div>
        );
    }
    renderNavBarLoggedIn = () => {
		const { userID } = this.props;
		if (userID !== 0) {
                return (
                    <DropdownMenu right>
                        <DropdownItem>USER</DropdownItem>
                        <DropdownItem divider />
                            <DropdownItem onClick={this.dummyBtn}>Manage Products</DropdownItem>
                        <Link to="/cart">
                            <DropdownItem>Cart</DropdownItem>
                        </Link>
                        <Link to="/transaction">
                            <DropdownItem>Transaction History</DropdownItem>
                        </Link>
                        <Link to="/">
                            <DropdownItem onClick={this.logOut}>Logout</DropdownItem>
                        </Link>
                    </DropdownMenu>
                );
		}else {
			return (
				<DropdownMenu right>
					<Link to="/login">
						<DropdownItem>Login</DropdownItem>
					</Link>
				</DropdownMenu>
			);
		}
    };
    dummyBtn = () => {
        return swal("Sorry!", "It's just a dummy","error");
    }
    render() { 
        return (
            <div>
                <Navbar style={{ backgroundColor: "#0C090A" }} expand="md">
                    <NavbarBrand>
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <img src="https://thumbs.dreamstime.com/b/e-basket-depicting-e-commerce-online-shopping-icon-isolated-black-background-e-basket-depicting-e-commerce-162170236.jpg" alt="brand.jpg" height="50px" className="mx-1"/>
                            <span style={{ 
                                color: "whitesmoke"
                            }}>
                                eleCommerce
                            </span>
                        </Link>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <Link to="/">
                            <NavItem className="mx-4" style={{ color: "whitesmoke", lineHeight: '37px', fontWeight: "400px"}}>
                                    Home
                            </NavItem>
                        </Link>
                        <Link to="/">
                            <NavItem onClick={this.dummyBtn} className="mx-4" style={{ color: "whitesmoke", lineHeight: '37px', fontWeight: "400px"}}>
                                    Event
                            </NavItem>
                        </Link>
                        <Link to="/">
                            <NavItem onClick={this.dummyBtn} className="mx-4" style={{ color: "whitesmoke", lineHeight: '37px', fontWeight: "400px"}}>
                                    Promo
                            </NavItem>
                        </Link>
                        <Link to="/">
                            <NavItem onClick={this.dummyBtn} className="mx-4" style={{ color: "whitesmoke", lineHeight: '37px', fontWeight: "400px"}}>
                                    Contact Us
                            </NavItem>
                        </Link>
                    </Nav>
                    {
                        this.props.userID !== 0
                        ?
                        (
                        <Link to="/cart" style={{ textDecoration: "none", color:"white" }}>
                            <img src="https://thumbs.dreamstime.com/b/shopping-icon-shopping-cart-icon-dark-background-simple-vector-icon-shopping-icon-shopping-cart-icon-dark-background-116659167.jpg" 
                                alt="cart" 
                                height="30px"
                                style={{ marginRight: "1px" }}
                            />
                            {this.props.cart.length >= 1
                            ?
                            (<Badge style={{ marginRight: "10px" }}>
                                {this.props.cart.length}
                            </Badge>)
                            :
                            ""
                            }
                        </Link>
                        )
                        :
                        ""
                    }
                    <NavbarText style={{ color: "whitesmoke", margin: "0px 10px 0px 7px"}}>
                        {this.props.userID !== 0
                        ? 
                        this.renderNama()
                        :
                        ""
                        }
                    </NavbarText>
                    <UncontrolledDropdown className="mx-10">
                        <DropdownToggle nav caret style={{ color: 'whitesmoke', fontWeight: "400px" }}>
                            <img src={userPic} alt="user.jpg" height="30px"/>
                        </DropdownToggle>
                            {this.renderNavBarLoggedIn()}
                    </UncontrolledDropdown>
                    </Collapse>
                </Navbar>
                </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        userID: state.user.id,
        userEmail: state.user.email,
        cart: state.cart.cart,
    }
}

export default connect(mapStatetoProps, {
   logoutAction 
})
(NavigationBar);