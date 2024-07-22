import { createContext } from "react";
import React, { useEffect } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const[cartItems,setCartItems]=React.useState({})
    const url = "https://food-del-backend1-yzm5.onrender.com"
    
    const[token,setToken]=React.useState("");
    const[food_list,setFoodList]=React.useState([]);

    const addToCart= async(itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});

        }
    }
    
    const removeFromCart=async(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
        }
    }

    const getTotalCaertAmount = () => {
        let totalAmount=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = food_list.find((product)=>product._id===item);
                totalAmount+=cartItems[item]*itemInfo.price;
            }
        }return totalAmount;
    }

    const fetchFoodList=async()=>{
        const response = await axios.get(url+'/api/food/list');
        setFoodList(response.data.data);

    }
    const loadCartData = async(token)=>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData);
    }
    //when we reload the page, the cart items should not be lost and should be stored in local storage and login token should be stored in local storage
    useEffect(()=>{
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem('token')){
                setToken(localStorage.getItem('token'));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[]);

    
    const contextValue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCaertAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider
