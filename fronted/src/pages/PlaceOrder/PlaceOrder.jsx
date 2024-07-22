import React, { useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../contact/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
    const{getTotalCaertAmount,token,food_list,cartItems} = React.useContext(StoreContext);
    const url="https://food-del-fronted.onrender.com";
    const [data, setData] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });

    const [paymentMethod, setPaymentMethod] = React.useState("online"); // Default to online

    const onchangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const placeOrder = async (e) => {
        e.preventDefault();
        let orderItems = [];
        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        });

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCaertAmount() + (getTotalCaertAmount() > 0 ? 2 : 0),
            paymentMethod // Include payment method in the order data
        };

        if (paymentMethod === "online") {
            try {
                let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
                if (response.data.success) {
                    const { session_url } = response.data;
                    window.location.replace(session_url);
                } else {
                    alert("Error: " + response.data.message);
                }
            } catch (error) {
                console.error("Error placing order:", error);
                alert("Error: " + error.message);
            }
        } else {
            // Handle Cash on Delivery
            try {
                let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
                if (response.data.success) {
                    // Navigate to /myorders directly
                    window.location.href = "/myorders";
                } else {
                    alert("Error: " + response.data.message);
                }
            } catch (error) {
                console.error("Error placing order:", error);
                alert("Error: " + error.message);
            }
        }
    };

    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate('/cart');
        } else if (getTotalCaertAmount() === 0) {
            navigate('/cart');
        }
    }, [token]);

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <div className="multi-fields">
                    <input required name='firstName' onChange={onchangeHandler} value={data.firstName} type="text" placeholder='First Name' />
                    <input required name='lastName' onChange={onchangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
                </div>
                <input required name='email' onChange={onchangeHandler} value={data.email} type="email" placeholder='Email address' />
                <input required name='street' onChange={onchangeHandler} value={data.street} type="text" placeholder='Street' />
                <div className="multi-fields">
                    <input required name='city' onChange={onchangeHandler} value={data.city} type="text" placeholder='City' />
                    <input required name='state' onChange={onchangeHandler} value={data.state} type="text" placeholder='State' />
                </div>
                <div className="multi-fields">
                    <input required name='zipcode' onChange={onchangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
                    <input required name='country' onChange={onchangeHandler} value={data.country} type="text" placeholder='Country' />
                </div>
                <input required name='phone' onChange={onchangeHandler} value={data.phone} type="text" placeholder='Phone' />
            </div>
            <div className="place-order-right">
                <div className="payment-method">
                    <label>
                        <input
                            type="radio"
                            value="online"
                            checked={paymentMethod === "online"}
                            onChange={handlePaymentMethodChange}
                        />
                        Online Payment
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="cash"
                            checked={paymentMethod === "cash"}
                            onChange={handlePaymentMethodChange}
                        />
                        Cash on Delivery
                    </label>
                </div>
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCaertAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>${getTotalCaertAmount() > 0 ? 2 : 0}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${getTotalCaertAmount() + (getTotalCaertAmount() > 0 ? 2 : 0)}</b>
                        </div>
                    </div>
                    <button type='submit'>Proceed to checkout</button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
