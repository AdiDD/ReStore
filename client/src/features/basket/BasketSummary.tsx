import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { currencyFormat } from '../../app/util/util';
import { useAppSelector } from '../../app/store/configureStore';

interface Props {
    subtotal?: number
}

const BasketSummary = ({ subtotal }: Props) => {
    const { basket } = useAppSelector(state => state.basket);
    if (subtotal === undefined)
        subtotal = basket?.items.reduce((sum, item) => item.price * item.quantity + sum, 0) ?? 0;
    const deliveryFee = subtotal > 10000 ? 0 : 500;

    return (
        <TableContainer component={Paper} variant={"outlined"}>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={2}>Subtotal</TableCell>
                        <TableCell colSpan={2} align="right">{currencyFormat(subtotal)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Delivery Fee*</TableCell>
                        <TableCell colSpan={2} align="right">{currencyFormat(deliveryFee)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell colSpan={2} align="right">{currencyFormat(subtotal + deliveryFee)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{fontStyle: "italic", textAlign: "center"}}>*Orders over $100 qualify for free delivery</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default BasketSummary;