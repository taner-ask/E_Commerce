import React from 'react'
import '../css/Product.css'
import {useNavigate} from 'react-router-dom'

function Product({product}) {
   const {id, price, image, title, description} = product;
   
   const navigate = useNavigate();

  return (
    <div className='card'>
        <img className='image' src={image} alt="" />
        <div>
        <p className='title-card'>{title}</p>
        <h4 className='price-card'>{price} ₺</h4>
        </div>

        <div className='flex-row'>
            <button onClick={()=>{navigate("/product-details/" + id)}} className='button-card'>
                Detayına Git
            </button>
        </div>

    </div>
  )
}

export default Product
