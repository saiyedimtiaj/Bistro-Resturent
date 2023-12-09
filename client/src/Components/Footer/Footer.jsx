import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <>
            <div className="flex flex-col lg:flex-row justify-center">
                <div className="flex-1 flex flex-col items-center text-center text-white px-5 md:px-14 bg-[#1F2937] py-14">
                    <h1 className="text-2xl font-semibold">CONTACT US</h1>
                    <p className="mt-2 text-center text-xs">123 ABS Street, Uni 21, Bangladesh </p>
                    <p className="mt-1 text-center text-xs">+88 123456789</p>
                    <p className="mt-1 text-center text-xs"> Mon - Fri: 08:00 - 22:00</p>
                    <p className="mt-1 text-center text-xs"> Sat - Sun: 10:00 - 23:00</p>
                </div>
                <div className="flex-1 flex flex-col items-center text-white bg-[#111827] py-14 px-5 md:px-14">
                    <h1 className="text-2xl font-semibold">Follow US</h1>
                    <p className="my-4">Join us on social media</p>
                    <div className='gap-5 flex'>
                        <span className='text-xl cursor-pointer'><FaFacebookF/></span>
                        <span className='text-xl cursor-pointer'><FaTwitter/></span>
                        <span className='text-xl cursor-pointer'><FaInstagram/></span>
                    </div>
                </div>
            </div>
            <h1 className='text-center py-3 bg-[#151515] text-sm text-white font-medium'>Copyright © CulinaryCloud. All rights reserved.</h1>
        </>
    );
};

export default Footer;