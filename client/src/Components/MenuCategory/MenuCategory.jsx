/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import MenuItem from "../MenuItem/MenuItem";


const MenuCategory = ({item,title}) => {
    return (
       <div className="mb-16">
         <div className="grid md:grid-cols-2 gap-10 mt-14 ">
                {
                    item?.map(item => <MenuItem key={item._id} item={item}>
                    </MenuItem>)
                }
            </div>
            <div className="text-center mt-4">
            {title && <Link to={`/shop/${title}`}>
            <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
            </Link>}
            </div>
       </div>
    );
};

export default MenuCategory;