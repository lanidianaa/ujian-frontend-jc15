import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProductCard } from '../components';
import { fetchProduct } from '../redux/action';

class Landing extends Component {
    state = {};

    componentDidMount(){
        const { fetchProduct } = this.props;
        fetchProduct();
    }
    renderProduct = () => {
        const { product } = this.props;
        return product.map((val) => {
            return (
                <div className="mx-2 mt-3">
                    <ProductCard 
                        image={val.image} 
                        name={val.name} 
                        price={val.price}
                        id={val.id}
                    />
                </div>
            );
        });
    };
    render() { 
        return (
            <div>
                <div style={{ backgroundColor: "lightgray", height: "100vh", display: "flex", justifyContent: "center" }}>
                    <div className="row mx-3">
                        {this.renderProduct()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return{
        product: state.product.productList
    }
}
export default connect(mapStatetoProps, {
    fetchProduct
})
(Landing);