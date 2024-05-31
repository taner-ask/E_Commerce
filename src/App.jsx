import { useEffect, useState } from 'react'
import './App.css'
import PageContainer from './container/PageContainer'
import Header from './components/Header'
import RouterConfig from './config/RouterConfig'
import Loading from './components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { Drawer } from '@mui/material'
import { calculateBasket, deleteFromBasket, setDrawer } from './redux/slices/basketSlice'

function App() {

  const {products, drawer, totalAmount} = useSelector((store) => store.basket);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(calculateBasket());
  },[])

  return (
    <div>

    <PageContainer>
      <Header />
      <RouterConfig/>
      <Loading/>

      <Drawer anchor='right' open={drawer} onClose={() => dispatch(setDrawer())}>
      <div>
        <p className='drawer-totalAmount'>Toplam Tutar: {totalAmount} ₺</p>
        </div>
        {
          products && products.map((product)=> {
            return(
              
              <div key={product.id} className='drawer-div'>
                <img className='drawer-image' src={product.image}/>
                <p className='drawer-title'>{product.title} ({product.count})</p>
                <p className='drawer-price'>{product.price} ₺</p>
                <button onClick={()=>{
                  dispatch(deleteFromBasket({id: product.id}));
                }} className='drawer-button'>Sil</button>
              </div>
            )
          })
          
        }

      </Drawer>

    </PageContainer>

    </div>
  )
}

export default App
