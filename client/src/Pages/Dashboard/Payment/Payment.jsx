import { loadStripe } from "@stripe/stripe-js";
import SectionHeading from "../../../Components/SectionHeading/SectionHeading";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gewtway_PK)
const Payment = () => {
    return (
        <div className="my-4">
            <SectionHeading heading='Payment' subHeading='order now!'></SectionHeading>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm/>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;