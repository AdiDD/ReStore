import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';

const steps = ['Shipping address', 'Review your order', 'Payment details'];

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep === 0 && !addressFormIsValid()) return;
    if (activeStep === 2 && !paymentFormIsValid()) return;
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const [addressFormValues, setaddressFormValues] = useState({
    fullName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: ""
  });

  const [paymentFromValues, setPaymentFormValues] = useState({
    nameOnCard: "",
    cardNumber: "",
    expDate: "",
    cvv: ""
  });

  const addressFormIsValid = () => {
    return addressFormValues.fullName.length > 0 && 
      addressFormValues.address1.length > 0 && 
      addressFormValues.address2.length > 0 && 
      addressFormValues.city.length > 0 && 
      addressFormValues.state.length > 0 && 
      addressFormValues.zip.length > 0 && 
      addressFormValues.country.length > 0;
  }

  const paymentFormIsValid = () => {
    return paymentFromValues.nameOnCard.length > 0 && 
    paymentFromValues.cardNumber.length > 0 && 
    paymentFromValues.expDate.length > 0 && 
    paymentFromValues.cvv.length > 0;
  }

  const handleAddressFormInputChange = (event: any) => {
    const { name, value } = event.target;
    setaddressFormValues({...addressFormValues, [name]: value});
  };

  const handlePaymentFormInputChange = (event: any) => {
    const { name, value } = event.target;
    setPaymentFormValues({...paymentFromValues, [name]: value});
  };

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddressForm handleInputChange={handleAddressFormInputChange} />;
      case 1:
        return <Review />;
      case 2:
        return <PaymentForm handleInputChange={handlePaymentFormInputChange} />;      
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
                    Thank you for your order.
                    </Typography>
                    <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order
                    confirmation, and will send you an update when your order has
                    shipped.
                    </Typography>
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
                    <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 3, ml: 1 }}
                    >
                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                    </Button>
                    </Box>
                </>
                )}
            </>
            </Paper>
      </>
  );
}

export default CheckoutPage;