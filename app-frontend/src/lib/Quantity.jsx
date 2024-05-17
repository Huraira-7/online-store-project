import React from 'react'
import { FaPlus,FaMinus } from "react-icons/fa";
import {  useDispatch, useSelector } from 'react-redux';
import { decrementItem, incrementItem, setItemquantity } from '../store/userSlice';

function Quantity({setTp, setQtys, qtys, tp, idx}) {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.user.cart)

    function handlesetQty(e,index){
        let prod = cart[index]
        if (!isNaN(parseInt(e.target.value)) && parseInt(e.target.value) >= 1) {
          let totalpryce = tp - (prod.price * qtys[index])
          totalpryce += (prod.price * parseInt(e.target.value))
          setTp(totalpryce)
          dispatch(setItemquantity({prod, qty: parseInt(e.target.value)}))
          setQtys([...qtys.slice(0, index), parseInt(e.target.value) , ...qtys.slice(index + 1)]);
        }
      }
    
      function handleMinus(e,index){
        e.preventDefault()
        if (qtys[index]-1>0) {
          let prod = cart[index]
          dispatch(decrementItem(prod))
          setQtys([...qtys.slice(0, index), qtys[index]-1, ...qtys.slice(index + 1)]);
          setTp((oldprice) => oldprice - prod.price)
        }
      }
      function handleAdd(e,index){
        e.preventDefault()
        let prod = cart[index]
        dispatch(incrementItem(prod))
        setQtys([...qtys.slice(0, index), qtys[index]+1, ...qtys.slice(index + 1)]);
        setTp((oldprice) => oldprice + prod.price)
      }
  return (
    <div className={`xl:h-28 mt-4 xl:w-[350px] w-[200px] flex h-20`} >
        <button className={`focus:outline-none px-2  bg-white rounded-l-lg noscalebtn outline-none hover:outline-black outline-2`} onClick={(e)=>handleMinus(e,idx)}><FaMinus className='text-4xl' /></button>
        <input
            type="text"
            // id="cartInput"
            value = {qtys[idx]}
            onChange={(e)=>handlesetQty(e,idx)}
            className={`flex text-center w-7/12 max-[750px]:w-5/12 h-full px-8 text-black text-4xl focus:outline-none`}
        />
        <button className={`focus:outline-none px-2 bg-white rounded-r-lg noscalebtn outline-none hover:outline-black outline-2 `} onClick={(e)=>handleAdd(e,idx)}><FaPlus className='text-4xl' /></button>
    </div>
  )
}

export default Quantity