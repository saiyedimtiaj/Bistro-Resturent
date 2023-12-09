import SectionHeading from '../SectionHeading/SectionHeading';

const Feature = () => {
    return (
        <div className="bg-fixed container mx-auto bg-black text-white my-20" style={{backgroundImage:"url('../assets/home/featured.jpg')",backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundColor:'blue'}}>
                <div className='bg-black bg-opacity-40 pt-10'>
            <SectionHeading  subHeading="check it out" heading="Featured Item" ></SectionHeading>
            <div className="md:flex justify-center items-center pb-20 pt-12 px-36">
                <div>
                    <img src='../assets/home/featured.jpg' alt="" />
                </div>
                <div className="md:ml-10">
                    <p>Aug 20, 2029</p>
                    <p className="uppercase">Where can i get some?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate expedita hic dolorem, iusto vel suscipit nam excepturi debitis magnam nostrum! Ut eum dignissimos culpa doloremque eligendi consectetur blanditiis laboriosam fugiat ea quia similique quam nisi reprehenderit numquam magnam nemo vitae cupiditate, atque maiores dicta minus pariatur. Perspiciatis nobis vero quas?</p>
                    <button className="btn text-white btn-outline border-0 border-b-4 mt-4">Order Now</button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Feature;