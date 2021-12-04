import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { Order } from '../../app/models/order';
import { Button } from '@mui/material';
import { currencyFormat } from '../../app/util/util';

const Orders = () => {
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Orders.list()
            .then(orders => setOrders(orders))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <LoadingComponent message="Loading Orders..." />

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">Order number</TableCell>
                    <TableCell align="center">Total</TableCell>
                    <TableCell align="center">Order date</TableCell>
                    <TableCell align="center">Order status</TableCell>
                    <TableCell align="center"></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {orders?.map((order) => (
                    <TableRow
                    key={order.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell align="center" component="th" scope="row">
                        {order.id}
                    </TableCell>
                    <TableCell align="center">{currencyFormat(order.total)}</TableCell>
                    <TableCell align="center">{order.orderDate.split('T')[0]}</TableCell>
                    <TableCell align="center">{order.orderStatus}</TableCell>
                    <TableCell align="center">
                        <Button>View</Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
    )
}

export default Orders;