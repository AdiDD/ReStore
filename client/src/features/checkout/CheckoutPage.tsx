import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import agent from '../../app/api/agent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { clearBasket } from '../basket/basketSlice';
import { LoadingButton } from '@mui/lab';
import { StripeElementType } from '@stripe/stripe-js'
import { CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';

const steps = ['Shipping address', 'Review your order', 'Payment details'];

const CheckoutPage = () => {
  const dispatch = useAppDispatch()
  const [activeStep, setActiveStep] = useState(0);
  const [orderNumber, setOrderNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    fullName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    nameOnCard: ""
  });
  const [saveAddress, setSaveAddress] = useState(false);
  const [disableSaveAddres, setDisableSaveAddress] = useState(false);
  const [cardState, setCardState] = useState<{elementError: {[key in StripeElementType]?: string}}>({elementError: {}});
  const [paymentMessage, setPaymentMessage] = useState("");
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const { basket } = useAppSelector(state => state.basket);
  const stripe = useStripe();
  const elements = useElements();

  const [cardComplete, setCardComplete] = useState<any>({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false
  });

  useEffect(() => {
    agent.Account.fetchAddress()
      .then(response => {
        if (response) {
          setFormValues(formValues => {
            return {...formValues, ...response}
          });
          setDisableSaveAddress(true);
        }
      })
  }, []);

  async function submitOrder() {
    setLoading(true);
    
    if (!stripe || !elements) return; // stripe is not ready;

    try {
      const cardElement = elements.getElement(CardNumberElement);
      const paymentResult = await stripe.confirmCardPayment(basket?.clientSecret!, {
        payment_method: {
          card: cardElement!,
          billing_details: {
            name: formValues.nameOnCard
          }
        }
      });

      if (paymentResult.paymentIntent?.status === "succeeded") {
        const orderNumber = await agent.Orders.create({ saveAddress, shippingAddress: formValues,  });
        setOrderNumber(orderNumber);
        setPaymentSucceeded(true);
        setPaymentMessage("The order was placed successfuly.")
        setActiveStep(activeStep + 1);
        dispatch(clearBasket());
      } else {
        setPaymentMessage(paymentResult.error?.message!);
        setPaymentSucceeded(false);
        setActiveStep(activeStep + 1);
      }
    } catch(error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  } 

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      await submitOrder()
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSaveAddress = () => {
    setSaveAddress(saved => !saved)
  }


  const addressFormIsValid = () => {
    return formValues.fullName.length > 0 && 
      formValues.address1.length > 0 && 
      formValues.address2.length > 0 && 
      formValues.city.length > 0 && 
      formValues.state.length > 0 && 
      formValues.zip.length > 0 && 
      formValues.country.length > 0;
  }

  const paymentFormIsValid = () => {
    return cardComplete.cardNumber && cardComplete.cardExpiry && cardComplete.cardCvc && formValues.nameOnCard.trim().length > 0;
  }

  const handleFormInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues({...formValues, [name]: value});
    setDisableSaveAddress(false);
  };

  const onCardInputChange = (event: any) => {
    setCardState({
      ...cardState,
      elementError: {
        ...cardState.elementError,
        [event.elementType]: event.error?.message
      }
    });

    setCardComplete({
      ...cardComplete,
      [event.elementType]: event.complete
    })
  }

  const submitDisabled = (): boolean => {
    if (activeStep === steps.length - 1) {
      return !paymentFormIsValid();
    } else {
      return !addressFormIsValid();
    }
  }

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddressForm values={formValues} 
                handleInputChange={handleFormInputChange} 
                saveAddress={saveAddress} 
                handleSaveAddress={handleSaveAddress}
                disableSaveAddres={disableSaveAddres} 
              />;
      case 1:
        return <Review />;
      case 2:
        return <PaymentForm cardState={cardState} onCardInputChange={onCardInputChange} handleNameInputChange={handleFormInputChange} />;      
      default:
        throw new Error('Unknown step');
    }
  }

  return (
      <>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
                Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
            <>
                {activeStep === steps.length ? (
                <>
                    <Typography variant="h5" gutterBottom>
                    {paymentMessage}
                    </Typography>
                    {paymentSucceeded ? (
                      <Typography variant="subtitle1">
                        Your order number is #{orderNumber}. We have emailed your order
                        confirmation, and will send you an update when your order has
                        shipped.
                      </Typography>
                    ) : (
                      <Button variant='contained' onClick={handleBack}>Back</Button>
                    )}
                    
                </>
                ) : (
                <>
                    {getStepContent(activeStep)}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {activeStep !== 0 && (
                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                        </Button>
                    )}
                    <LoadingButton
                        disabled={submitDisabled()}
                        loading={loading}
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 3, ml: 1 }}
                    >
                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                    </LoadingButton>
                    </Box>
                </>
                )}
            </>
            </Paper>
      </>
  );
}

export default CheckoutPage;