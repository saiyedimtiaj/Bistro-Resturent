import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import SectionHeading from '../SectionHeading/SectionHeading';

const Category = () => {
    return (
        <div className="container mx-auto px-5 mt-14 text-[#D99904]">
            <SectionHeading subHeading={'---From 11:00am to 10:00pm---'} heading={'ORDER ONLINE'} />
            <div className='mb-16'>
            <Swiper
        slidesPerView={4}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide className='relative'>
            <img src="../assets/home/slide1.jpg" alt="" />
            <h1 className="text-2xl font-semibold absolute drop-shadow-lg left-20 bottom-10 text-white">Salads</h1>
        </SwiperSlide>
        <SwiperSlide className='relative'>
            <img src="../assets/home/slide2.jpg" alt="" />
            <h1 className="text-2xl font-semibold absolute drop-shadow-lg left-20 bottom-10 text-white">Soups</h1>
        </SwiperSlide>
        <SwiperSlide className='relative'>
            <img src="../assets/home/slide3.jpg" alt="" />
            <h1 className="text-2xl font-semibold absolute drop-shadow-lg left-20 bottom-10 text-white">pizzas</h1>
        </SwiperSlide>
        <SwiperSlide className='relative'>
            <img src="../assets/home/slide4.jpg" alt="" />
            <h1 className="text-2xl font-semibold absolute drop-shadow-lg left-20 bottom-10 text-white">desserts</h1>
        </SwiperSlide>
        <SwiperSlide className='relative'>
            <img src="../assets/home/slide5.jpg" alt="" />
            <h1 className="text-2xl font-semibold absolute drop-shadow-lg left-20 bottom-10 text-white">Salads</h1>
        </SwiperSlide>
      </Swiper>
            </div>
        </div>
    );
};

export default Category;