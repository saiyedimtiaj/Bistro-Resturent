/* eslint-disable react/prop-types */

const MenuItem = ({item}) => {
    const {name, image, price, recipe} = item;
    return (
        <div className="flex space-x-2">
            <img style={{borderRadius: '0 200px 200px 200px'}} className="w-[100px]" src={image} alt="" />
            <div>
                <h3 className="uppercase text-xl font-semibold">{name}----------</h3>
                <p>{recipe}</p>
            </div>
            <p className="text-yellow-500 text-lg font-bold">${price}</p>
        </div>
    );
};

export default MenuItem;