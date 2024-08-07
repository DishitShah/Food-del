import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../contact/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, food_list, removeFromCart, getTotalCaertAmount, url } = useContext(StoreContext);
    const navigate = useNavigate();

    const hasItemsInCart = food_list.some(item => cartItems[item._id] > 0);

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {hasItemsInCart ? (
                    food_list.map((item, index) => {
                        if (cartItems[item._id] > 0) {
                            return (
                                <div key={item._id}>
                                    <div className='cart-items-title cart-items-item'>
                                        <img src={url + "/images/" + item.image} alt="" />
                                        <p>{item.name}</p>
                                        <p>${item.price}</p>
                                        <p>{cartItems[item._id]}</p>
                                        <p>${item.price * cartItems[item._id]}</p>
                                        <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                                    </div>
                                    <hr />
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })
                ) : (
                    <h2>No items in the cart</h2>
                )}
            </div>
            <div className="cart-bottom">
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
                    <button onClick={() => navigate('/order')}>Proceed to checkout</button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>If you have a promo code, Enter it here</p>
                        <div className="cart-promocode-input">
                            <input type="text" placeholder='Enter Promocode' />
                            <button>Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
