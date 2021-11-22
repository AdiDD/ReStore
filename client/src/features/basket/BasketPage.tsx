import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Add, Delete, Remove } from "@mui/icons-material";
import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";

import agent from "../../app/api/agent";
import BasketSummary from "./BasketSummary";
import { currencyFormat } from "../../app/util/util";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { removeItem, setBasket } from "./basketSlice";


const BasketPage = () => {
    const { basket } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const [status, setStatus] = useState({
        loading: false,
        name: ''
    });

    const handleAddItem = (productId: number, name: string) => {
        setStatus({ loading: true, name });
        agent.Basket.addItem(productId)
            .then(basket => dispatch(setBasket(basket)))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: '' }));
    }

    const handleRemoveItem = (productId: number, name: string, quantity = 1) => {
        setStatus({ loading: true, name });
        agent.Basket.removeItem(productId, quantity)
            .then(() => dispatch(removeItem({ productId, quantity })))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: '' }));
    }

    if (basket?.items.length === 0) return <Typography variant="h3">Your basket is empty</Typography> 

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small">
                    <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {basket?.items.map(item => (
                        <TableRow
                        key={item.productId}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            <Box display="flex" alignItems="center">
                                <img src={item.pictureUrl} alt={item.name} style={{height: 50, marginRight: 20}} />
                                <span>{item.name}</span>
                            </Box>
                        </TableCell>
                        <TableCell align="right">{currencyFormat(item.price)}</TableCell>
                        <TableCell align="center">
                            <LoadingButton
                                loading={status.loading && status.name === "remove" + item.productId}
                                onClick={() => handleRemoveItem(item.productId, "remove" + item.productId)}
                                color="error"
                            >
                                <Remove />
                            </LoadingButton>
                            {item.quantity}
                            <LoadingButton 
                                loading={status.loading && status.name === "add" + item.productId}
                                onClick={() => handleAddItem(item.productId, "add" + item.productId)}
                                color="success"
                            >
                                <Add />
                            </LoadingButton>
                        </TableCell>
                        <TableCell align="right">{currencyFormat(item.price * item.quantity)}</TableCell>
                        <TableCell align="right">
                            <LoadingButton
                                loading={status.loading && status.name === "del" + item.productId}
                                onClick={() => handleRemoveItem(item.productId, "del" + item.productId, item.quantity)}
                                color="error"
                            >
                                <Delete />
                            </LoadingButton>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <BasketSummary />
                    <Button
                        component={Link}
                        to="/checkout"
                        variant="contained"
                        size="large"
                        fullWidth
                    >
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default BasketPage;