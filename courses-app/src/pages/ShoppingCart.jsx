import { Divider, Grid, Typography, Box, Stack, IconButton, TextField, Button } from "@mui/material"
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { red } from '@mui/material/colors';

import { useCart } from "../contexts/CartContext"
import { usePricing } from "../contexts/PrincingContext";
import CourseCard from "../components/courseList/CourseCard";
import { Link } from "react-router-dom";
import OrderSummary from "../components/shoppingCart/OrderSummary";

const ShoppingCart = () => {
  const { addedToCart, removeFromCart} = useCart();
  const {
    promoCode,
    promoCodeInput,
    promoError,
    setPromoCodeInput,
    applyPromoCode,
    subtotalPrice,
    subtotalDiscount,
    totalPrice,
    calculateTotalPrice,
    setPromoError
  } = usePricing();
  

  return (
    <Box>
      {/* Behavior of the page whenever there are courses in the shopping cart or not */}
      {addedToCart.length > 0 ? (
      <Grid container justifyContent={"space-between"}>
      
       {/* Shopping Cart */}
      <Grid size={{xs:12, lg:8}}  sx={{padding:{xs: 2, lg: 3}, display:"flex", flexDirection:"column"}}>
          <Typography variant="h2" sx={{mb:{xs: 2, lg: 4}}}> Shopping Cart </Typography>
          <Typography variant="body1" fontWeight="bold">{addedToCart.length > 1 ? `${addedToCart.length} Courses in Cart` : `${addedToCart.length} Course in Cart`}</Typography>
          <Divider sx={{border: "1px solid black", my: 0.5}}/>
          {addedToCart.map((course) => (
            //Displaying ourses in Shopping Cart
              <Box key={course.id} mb={2}>
                  <Stack direction="row" flex={1} alignItems="center" gap={1}>
                    <Box sx={{flexGrow: 1}}>
                      <CourseCard  course={course} />
                    </Box>
                    <Box padding={3}>
                      <IconButton onClick={() => removeFromCart(course.id)}>
                        <DeleteRoundedIcon sx={{ color: red[500]}} />
                      </IconButton>
                    </Box>
                  </Stack>
                      <Divider  sx={{border: "1px solid black", my: 0.5}} />
                  </Box>
              ))}
      </Grid>

      {/* ORDER SUMMARY */}
      <Grid size={{xs:12, lg:4}} sx={{display: "flex", flexDirection:"column", justifyContent:"center"}}>
        <Box sx={{ padding: { xs: 2, lg: 3 }}}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: { xs: 1, lg: 3 }, mt: { xs: 1, lg: 10 } }}>
                  Order Summary
          </Typography>
          <OrderSummary
            subtotalPrice={subtotalPrice}
            subtotalDiscount={subtotalDiscount}
            promoCode={promoCode}
            promoCodeInput={promoCodeInput}
            promoError={promoError}
            onPromoCodeChange={(e) => {
              setPromoCodeInput(e.target.value);
              if (promoError) setPromoError(false);
            }}
            onApplyPromoCode={applyPromoCode}
            totalPrice={totalPrice}
            calculateTotalPrice={calculateTotalPrice}
          />
        </Box>
        
        {/* CHECKOUT BUTTON */}
        <Box sx={{
          display: "flex",
          justifyContent: "center"
        }}>
          <Button component={Link} to="/checkout" variant="outlined" size="large">
                Proceed to Checkout
          </Button>
        </Box>
      </Grid>
    </Grid>
    ):(
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="70vh"
        textAlign="center"
        sx={{ padding: 3 }}
      >
        <Typography variant="h2" sx={{ mb: 2 }}>Shopping Cart</Typography>
        <Typography variant="body1" fontWeight="bold" sx={{ mb: 4 }}>
          No Courses in Cart
        </Typography>

        <Button
          component={Link}
          to="/courses"
          variant="contained"
          size="large"
        >
          Keep Shopping
        </Button>
      </Box>
    )}
    
    </Box>
  )
}

export default ShoppingCart