/* eslint-disable react/prop-types */

import FoodCard from "../FoodCard/FoodCard";


const OrderTab = ({item}) => {
    return (
        <div className="grid lg:grid-cols-3 gap-5 md:grid-cols-2 grid-cols-1 mb-14">
        {
            item?.map(item=> <FoodCard key={item._id} item={item} />)
        }
    </div>
    );
};

export default OrderTab;