import Axios from "axios";
import { api_url } from "../../helpers/api_url";

export const fetchProduct = () => {
    return(dispatch) => {
        Axios.get(`${api_url}/products`)
            .then((res) => {
                dispatch({
                    type: "FETCH_PRODUCT",
                    payload: res.data,
                });
            })
            .catch((err) => console.log(err));
    }
};