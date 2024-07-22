import React from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../contact/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

// Category mapping for normalization
const categoryMapping = {
    'pure veg': 'Pure Veg',
    'noodels': 'Noodles',
};

// Function to get standardized category
const getStandardCategory = (category) => {
    const normalizedCategory = category.toLowerCase();
    return categoryMapping[normalizedCategory] || category;
};

const FoodDisplay = ({ category }) => {
    const { food_list } = React.useContext(StoreContext);
    console.log('Selected Category:', category);
    console.log('Food List:', food_list);

    const standardCategory = getStandardCategory(category);

    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className='food-display-list'>
                {food_list.map((item, index) => {
                    const itemCategory = getStandardCategory(item.category);
                    if (standardCategory === 'All' || standardCategory === itemCategory) {
                        return (
                            <FoodItem
                                key={index}
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                            />
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};
export default FoodDisplay;
