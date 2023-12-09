import { Helmet } from "react-helmet-async";
import Cover from "../../Components/Cover/Cover";
import UseMenu from "../../Hooks/UseMenu";
import MenuCategory from "../../Components/MenuCategory/MenuCategory";
import SectionHeading from '../../Components/SectionHeading/SectionHeading'


const Menu = () => {
    const [menu] = UseMenu();
    const salad = menu.filter(item => item.category === 'salad');
    const dessert = menu.filter(item => item.category === 'dessert');
    const pizza = menu.filter(item => item.category === 'pizza');
    const soup = menu.filter(item => item.category === 'soup');
    const offered = menu.filter(item => item.category === 'offered');
    return (
        <div>
            <Helmet>
                <title>BISTRO BOSS | Menu</title>
            </Helmet>
            <Cover image={'../assets/menu/banner3.jpg'} title={'Our Menu'}></Cover>
            <div className="mx-auto container px-5">
            <SectionHeading subHeading={"Don't miss"} heading={"TODAY'S OFFER"}></SectionHeading>
            <MenuCategory item={offered} />
            <Cover image={'../assets/menu/dessert-bg.jpeg'} title={'DESSERTS'}></Cover>
            <MenuCategory item={dessert} title={'dessert'} />
            <Cover image={'../assets/menu/dessert-bg.jpeg'} title={'PIZZA'}></Cover>
            <MenuCategory item={pizza} title={'pizza'}  />
            <Cover image={'../assets/menu/dessert-bg.jpeg'} title={'salad'}></Cover>
            <MenuCategory item={salad} title={'salad'}  />
            <Cover image={'../assets/menu/dessert-bg.jpeg'} title={'soup'}></Cover>
            <MenuCategory item={soup} title={'soup'}  />
            </div>
        </div>
    );
};

export default Menu;