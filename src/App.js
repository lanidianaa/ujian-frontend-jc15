import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import {
  Landing,
  LoginPage,
  CartPage,
  HistoryPage,
} from "./pages";
import { NavigationBar } from "./components";
import {
  keepLogin,
  fetchCart
} from "./redux/action";

class App extends Component {
  state = {};
  componentDidMount() {
    const id = localStorage.getItem('id');
    if(id){
      this.props.keepLogin(id);
      this.props.fetchCart(id);
    }
  }
  render() {
    return (
      <div>
        <NavigationBar />
        <Route path="/" exact component={Landing} />
        <Route path="/login" component={LoginPage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/transaction" component={HistoryPage} />
      </div>
    );
  }
}

export default 
connect(null, {
  keepLogin,
  fetchCart,
})
(App);