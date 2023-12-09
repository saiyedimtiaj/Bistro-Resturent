import { Helmet } from "react-helmet-async";
import Category from "../../Components/Category/Category";
import Feature from "../../Components/Feature/Feature";
import HomeBanner from "../../Components/HomeBanner/HomeBanner";
import PopularMenu from "../../Components/PopularMenu/PopularMenu";
import Testimonial from "../../Components/Testimonial/Testimonial";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>BISTRO BOSS | Home</title>
            </Helmet>
            <HomeBanner/>
            <Category/>
            <PopularMenu/>
            <Feature/>
            <Testimonial/>
        </div>
    );
};

export default Home;