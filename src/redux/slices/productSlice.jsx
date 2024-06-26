import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    products: [],
    selectedProduct: {},
    loading: false,
}

const BASE_URL = "http://localhost:8080/api/products"

export const getAllProducts = createAsyncThunk("getAllProducts", async() => {
   const response = await axios.get(`${BASE_URL}/getallproducts`);
   return response.data;
})

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers:{
        setSelectProduct : (state, action) => {
            state.selectedProduct = action.payload;
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state,action) => {
            state.loading = true;
        })

        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })
    }
})

export const {setSelectProduct } = productSlice.actions

export default productSlice.reducer