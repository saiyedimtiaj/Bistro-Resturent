import { useState } from "react";
import Cover from "../../Components/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import UseMenu from "../../Hooks/UseMenu";
import OrderTab from "../../Components/OrderTab/OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Shop = () => {
  const categoryes = ['salad','dessert','pizza','soup','drinks']
  const {category} = useParams();
  const initialindex = categoryes.indexOf(category) 
  const [tabIndex,setTabIndex] = useState(initialindex);

  
    const [menu] = UseMenu();
    const salad = menu.filter(item => item.category === 'salad');
    const dessert = menu.filter(item => item.category === 'dessert');
    const pizza = menu.filter(item => item.category === 'pizza');
    const soup = menu.filter(item => item.category === 'soup');
    const drinks = menu.filter(item => item.category === 'drinks');
  return (
    <div>
      <Helmet>
        <title>BISTRO BOSS | Shop</title>
      </Helmet>
      <Cover image={"../assets/shop/banner2.jpg"} title={"OUR SHOP"}></Cover>
     <div className="mx-auto container px-5">
     <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>SALAD</Tab>
          <Tab>PIZZA</Tab>
          <Tab>SOUPE</Tab>
          <Tab>DESSERTS</Tab>
          <Tab>DRINKS</Tab>
        </TabList>
        <TabPanel>
            <OrderTab item={salad}></OrderTab>
        </TabPanel>
        <TabPanel>
            <OrderTab item={dessert}></OrderTab>
        </TabPanel>
        <TabPanel>
            <OrderTab item={pizza}></OrderTab>
        </TabPanel>
        <TabPanel>
            <OrderTab item={soup}></OrderTab>
        </TabPanel>
        <TabPanel>
            <OrderTab item={drinks}></OrderTab>
        </TabPanel>
      </Tabs>
     </div>
    </div>
  );
};

export default Shop;
