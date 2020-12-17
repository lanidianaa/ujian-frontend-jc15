import Axios from "axios";
import swal from "sweetalert";
import { api_url } from "../../helpers/api_url";

export const fetchCart = (id) => {
    return (dispatch) => {
        Axios.get(`${api_url}/cart?userID=${id}`)
        .then((res)=>{
            dispatch({
                type: "FETCH_CART",
                payload: res.data,
            });
        })
        .catch((err) => console.log(err));
    }
};

export const addToCart = (data) => {
    return(dispatch) => {
        Axios.get(`${api_url}/cart?name=${data.name}&userID=${data.userID}`)
        .then((res) => {
            if(res.data.length === 0){
                Axios.post(`${api_url}/cart`, data)
                .then((res) => {
                    dispatch(fetchCart(data.userID));
                })
                .catch((err) => {});
            }else{
                Axios.patch(`${api_url}/cart/${res.data[0].id}`, {
                    qty:( res.data[0].qty + data.qty)
                })
                .then((result) => {
                    console.log(result);
                    dispatch(fetchCart(data.userID));
                })
                .catch((err) => console.log(err));
            }
        })
        .catch((err) => console.log(err));
    }
};

export const deleteCart = (id,userID) => {
    return (dispatch) => {
        Axios.delete(`${api_url}/cart/${id}`)
        .then((res) => {
            dispatch(fetchCart(userID))
        })
        .catch((err) => {});
    };
};

export const addQty = (name,qty,id,userID) => {
    return(dispatch) => {
        Axios.get(`${api_url}/products?name=${name}`)
        .then((res)=> {
            if(qty < res.data[0].stock){
                Axios.patch(`${api_url}/cart/${id}`, {
                    qty: qty+1,
                })
                .then((ress) => {
                    dispatch(fetchCart(userID));
                })
                .catch((err) => {});
            }else{
                swal("Maximum quantity reached!","Insufficient stock", "error");
            }
        })
        .catch((err)=>{})
    }
};

export const subQty = (name, qty, id, userID) => {
    return(dispatch) => {
        Axios.get(`${api_url}/products?name=${name}`)
        .then((res)=> {
            if(qty !== 1){
                Axios.patch(`${api_url}/cart/${id}`, {
                    qty: qty-1,
                })
                .then((res) => {
                    dispatch(fetchCart(userID));
                })
                .catch((err) => {});
            }else{
                swal("Minimum Quantity is 1","","error");
            }
        })
        .catch((err)=>{});
    }
};

export const checkOut = (data, idProd) => {
    return(dispatch) => {
        Axios.post(`${api_url}/transaction`, data)
        .then((res) => {
            data.items.forEach((val) => {
                Axios.get(`${api_url}/products?name=${val.name}`)
                .then((res)=> {
                    Axios.patch(`${api_url}/products/${res.data[0].id}`, {
                        stock: res.data[0].stock - val.qty,
                    })
                    .then((res) => console.log(res))
                    .catch((err) => console.log(err));
                })
            })
            data.items.forEach((val) => {
                Axios.delete(`${api_url}/cart/${val.id}`)
                .then((res) => {
                    dispatch({
                        type: "CHECKOUT",
                    });
                    dispatch(fetchCart(data.userID));
                })
                .catch((err) => {});
            })
        })
        .catch((err) => {});
    }
}