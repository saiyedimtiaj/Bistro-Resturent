import { useEffect, useState } from "react";
import SectionHeading from "../SectionHeading/SectionHeading";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";

const Testimonial = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);
  return (
    <section className="my-20 container mx-auto px-5">
    <SectionHeading
        subHeading="What Our Client Say"
        heading={'Testimonials'}
    ></SectionHeading>

    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

        {
            reviews.map(review => <SwiperSlide
                key={review._id}
            >
                <div className="flex flex-col items-center mx-24 my-16">
                    <Rating
                        style={{ maxWidth: 180 }}
                        value={review.rating}
                        readOnly
                    />
                    <p className="py-8">{review.details}</p>
                    <h3 className="text-2xl text-orange-400">{review.name}</h3>
                </div>
            </SwiperSlide>)
        }
    </Swiper>
</section>
  );
};

export default Testimonial;
