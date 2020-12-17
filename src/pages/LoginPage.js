import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button, Input } from 'reactstrap';
import swal from 'sweetalert';
import { api_url } from '../helpers/api_url';
import { loginAction, fetchCart } from '../redux/action';

class LoginPage extends Component {
    state = {
        loginInfo: {
            email: '',
            password: '',
        }
    };

    onChangeInput = (e) => {
        this.setState({
            loginInfo: {
                ...this.state.loginInfo,
                [e.target.id]: e.target.value,
            },
        });
    };

    clickLogin = () => {
        var regex = /^(?=.*\d)(?=.*[a-z]).{6,}$/;
        // eslint-disable-next-line no-useless-escape
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const { email, password } = this.state.loginInfo;

        if(email.match(re) && password.match(regex)){
            Axios.get(`${api_url}/users?email=${email}&password=${password}`)
            .then((res) => {
                if(res.data.length === 1){
                    this.props.loginAction(res.data[0]);
                    swal("Success!","Logged In","success");
                    localStorage.setItem("id", res.data[0].id);
                    this.props.fetchCart(res.data[0].id);
                }else if(res.data.length === 0){
                    Axios.post(`${api_url}/users`, {
                        email, password
                    })
                    .then((res) => {
                        this.props.loginAction(res.data);
                        localStorage.setItem("id", res.data.id);
                        this.props.fetchCart(res.data.id);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
        }else if(email.match(re) && !password.match(regex)){
            swal(
                "Invalid password!",
                "Should at least 6 characters, containing 1 number and 1 alphabet",
                "warning"
            )
        }else{
            swal(
                "Invalid E-mail!",
                "check your spelling and all simbols needed for an email",
                "warning"
            )
        }
    };

    render() {
        if(this.props.emailUser !== ''){
            return <Redirect to="/"/>
        }
        return (
            <div>
                <div className="container my-3" 
                style={{ 
                    display: "flex", 
                    flexDirection: "row"
                }}>
                    <div className="row">
                        <div className="column" style={{ 
                            width: "50%",
                            borderRight: "solid grey",
                            padding: '0px 70px 0px 45px'
                        }}>
                            <h3 style={{ margin: "20px 0px 30px 0px" }}>Join us today!</h3>
                            
                            <img src="https://1.bp.blogspot.com/-3_xT4tLk_NQ/Xv96nl14S9I/AAAAAAAACXE/VMFVUtqB2mo0RbPGdCrjCef02gqDIHgcwCK4BGAsYHg/w640-h480/013%2B-%2BToko%2BBuah%2BJakarta.jpg"
                                alt="rumahbuah.jpg" 
                                width="100%" height="270px"
                            />
                            <br/>
                            <p style={{ fontSize: "85%", textAlign: "justify"}}>
                                Bergabunglah dengan menjadi member kami dan dapatkan berbagai keuntungan melalui promo khusus yang berbeda setiap harinya. Anda juga dapat mengumpulkan poin di setiap pembelanjaan dan tukarkan dengan hadiah menarik yang tersedia!
                            </p>
                            <Link to="/login" style={{ textDecoration:"none" }}>
                                <p>
                                    Sign Up Here
                                </p>
                            </Link>
                        </div>
                        <div className="column" style={{
                            marginLeft:"120px",
                            display:"flex",
                            flexFlow:"column",
                            justifyContent:"center",
                            alignItems: "center",
                            alignContent:"center"
                        }}>
                            <div className="my-3" style={{ display: "flex", flexDirection:"column", alignItems:"center"}}>
                                <div>
                                    <h2>Welcome to eleCommerce!</h2>
                                </div>
                                <div>
                                    <h5>Fill all the box below to Log In</h5>
                                </div>
                            </div>
                            <div className="my-2" style={{ width: "75%" }}>
                                <Input 
                                    placeholder="E-mail"
                                    id="email"
                                    style= {{ width: "100%" }}
                                    onChange={this.onChangeInput}
                                />
                            </div>
                            <div className="my-2" style={{ width: "75%" }}>
                                <Input 
                                    placeholder="Password"
                                    id="password"
                                    type="password"
                                    onChange={this.onChangeInput}
                                />
                            </div>
                            <div style={{ width: "75%" }}>
                                <Button  
                                    style={{ backgroundColor:"black", width:"100%" }}
                                    onClick={this.clickLogin}>
                                    Login
                                </Button>
                            </div>
                            <div className="my-3">
                                <Input type="checkbox" checked/>Keep Logged In
                            </div>

                            <div>
                                Forgot password? 
                                Click here!
                            </div>

                            <div className="column" style={{ width:"75%" }}>
                                <br/><br/>
                                <p style={{ fontSize: "70%" }}>
                                    You can use account and password listed below to Log In as a member.
                                </p>
                                <div>
                                    <Button style={{ backgroundColor:"whitesmoke", width:"100%", color: "black" }}>
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw1dbqIl1XKQRPD1x_E3KKpIUs0p705PYPmA&usqp=CAU" alt="fb.jpg" height="25px" style={{ margin: "0px 10px", float: "left" }}/>
                                        Facebook
                                    </Button>
                                </div>
                                <div className="my-2">
                                    <Button style={{ backgroundColor:"whitesmoke", width:"100%", color: "black" }}>
                                        <img src="https://www.fintechfutures.com/files/2016/03/google.png" alt="google.jpg" height="25px" style={{ margin: "0px 10px", float: "left" }}/>
                                        Google
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        id: state.user.id,
        emailUser: state.user.email,
    }
};

export default connect(mapStatetoProps, {
    loginAction,
    fetchCart
})
(LoginPage);