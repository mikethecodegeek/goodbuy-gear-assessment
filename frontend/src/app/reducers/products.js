import { allProducts, topProduct } from "./allProducts";

const GET_PRODUCTS = "getProducts";
const EDIT_PRODUCT = "editProduct";

const showProducts = (products) => ({
  type: GET_PRODUCTS,
  payload: products,
});

const edProduct = (product) => ({
  type: EDIT_PRODUCT,
  payload: product,
});

export const getPopularProducts = () => async (dispatch) => {
  const products = await fetch('/api/products/popular');
  const productsJSON = await products.json();
  console.log(productsJSON);
  // dispatch(showProducts(allProducts));
  dispatch(showProducts(productsJSON));
};

export const editProduct = (product) => async (dispatch) => {
 
  const editProduct = await fetch(`/api/products/${product._id}/edit`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product)
  });

  const editedProduct = await editProduct.json();

  // dispatch(allProduct(allProducts));
  dispatch(edProduct(editedProduct));
};

export const getTopProduct = () => async (dispatch) => {
  const topProduct = await fetch('/api/products/top');
  const topProductJSON = await topProduct.json();
  dispatch(showProducts(topProductJSON));
  // dispatch(showProducts(topProduct));
};

const initialState = [];

function productsReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_PRODUCTS:
      newState = [...action.payload];
      return newState;
    case EDIT_PRODUCT:
      console.log('ficker bitch')
      console.log(action.payload);
      newState = [...state].map((product) => {
        if (product._id === action.payload._id) {
          return action.payload;
        }
        return product;
      });
      return newState;
    default:
      return state;
  }
}

export default productsReducer;
