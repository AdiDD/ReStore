import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync, setBasket } from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails() {
    const { basket, status } = useAppSelector(state => state.basket);
    const { status: productStatus } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    const {id} = useParams() as any;
    const product = useAppSelector(state => productSelectors.selectById(state, id));
    const [quantity, setQuantity] = useState(0);
    const item = basket?.items.find(i => i.productId === product?.id)

    useEffect(() => {
        if (item) setQuantity(item.quantity);
        if (!product) dispatch(fetchProductAsync(parseInt(id)));
    }, [id, item, dispatch, product]);

    const handleInputChange = (event: any) => {
        if (event.target.value >= 0)
            setQuantity(parseInt(event.target.value));
    }

    const handleUpdateCart = () => {
        if (!item || quantity > item.quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsync({ productId: product?.id!, quantity: updatedQuantity }))
        } else {
            const updatedQuantity = item.quantity - quantity;
            dispatch(removeBasketItemAsync({ productId: product?.id!, quantity: updatedQuantity }));
        }
    }

    const displayCartMessage = () => {
        if (!item) return "Add to cart"
        else if (item && quantity === 0) return "Remove item from cart"
        else return "Update quantity"
    }

    if (productStatus.includes("pending")) return <LoadingComponent message="Loading product" />

    if (!product) return <h3>Product not found</h3>

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{width: "100%"}} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h3">{product.name}</Typography>
                <Divider sx={{mb: 2}} />
                <Typography variant="h4" color="secondary">${(product.price/100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Desctiption</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            type="number"
                            label="Quantity in cart"
                            fullWidth
                            onChange={handleInputChange}
                            value={quantity}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            disabled={item?.quantity === quantity || (!item && quantity === 0)}
                            loading={status.includes("pending")}
                            onClick={handleUpdateCart}
                            sx={{height: "55px"}}
                            color={item && quantity === 0 ? "error" : "primary"}
                            size="large"
                            variant="contained"
                            fullWidth
                        >
                            {/* {item ? "Update quantity" : "Add to Cart"} */}
                            {displayCartMessage()}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}