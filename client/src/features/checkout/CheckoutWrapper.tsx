import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./CheckoutPage";

const stripePromise = loadStripe("pk_test_51K34NIBbZoAyq3Izz3wqHWC13EhrnmvsmsUFl1Sn3lGUlmmXCmAlfkZor9vERF4ZNZh3dRPAERTHTbGwnWOi0BB1006s0Yu3Lq");

const CheckoutWrapper = () => {
    return (
       <Elements stripe={stripePromise}>
           <CheckoutPage />
       </Elements> 
    )
}

export default CheckoutWrapper;