import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { setSelectProduct } from '../redux/slices/productSlice';
import '../css/ProductDetails.css';
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useState } from 'react';
import { addToBasket, calculateBasket } from '../redux/slices/basketSlice';

function ProductDetails() {
    const {id} = useParams();
    const {products, selectedProduct} = useSelector((store) => store.product);
    const {price, image, title, description} = selectedProduct;
    
    const dispatch = useDispatch();

    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count+1);
    }

    const decrement = () => {
        (count > 0 ? setCount(count-1) : setCount(count));
    }

    const addBasket = ()=>{
        const payload ={
            id,
            price,
            image,
            title,
            description,
            count
        }

        dispatch(addToBasket(payload));
        dispatch(calculateBasket());
    }


    useEffect(() => {
        getProductById();
    }, [])

    const getProductById = () => {
        products && products.map((product) => {
            if (product.id == id) {
                dispatch(setSelectProduct(product));
            }
        })
    }

  return (
    <div className='productDetails-div'>
        <div>
            <img className='productDetails-image' src={image} alt="" />
        </div>
        <div>
            <h1 className='productDetails-title'>{title}</h1>
            <p className='productDetails-descripton'>{description}</p>
            <h1 className='productDetails-price'>{price} ₺</h1>

            <div className='productDetails-count-div'>
                <FaMinus onClick={() => {
                    decrement()
                }} className='productDetails-icons'/> 
                <span className='productDetails-count'> {count} </span> 
                <FaPlus onClick={() => {
                    increment()
                }} className='productDetails-icons'/>
            </div>
            <div>
               <button 
               onClick={addBasket}
               className='productDetails-sepeteEkle'>Sepete Ekle</button>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails