import { useState } from "react";
import { Box } from "@mui/system";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { currencyFormat } from "../../app/util/util";
import { Delete, Edit } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import useProducts from "../../app/hooks/useProducts";
import AppPagination from "../../app/components/AppPagination";
import { useAppDispatch } from "../../app/store/configureStore";
import { removeProduct, setPageNumber } from "../catalog/catalogSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";
import ProductForm from "./ProductForm";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";

const Inventory = () => {
    const { products, productsLoaded, metaData } = useProducts();
    const dispatch = useAppDispatch()

    const [editMode, setEditMode] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [target, setTarget] = useState(0);

    const handleSelectProduct = (product: Product) => {
        setSelectedProduct(product);
        setEditMode(true);
    };

    const handleDeleteProduct = (id: number) => {
        setLoading(true);
        setTarget(id);
        agent.Admin.deleteProduct(id)
            .then(() => dispatch(removeProduct(id)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }
    
    const cancelEdit = () => {
        if (selectedProduct) setSelectedProduct(undefined);
        setEditMode(false);
    };

    if (editMode) return <ProductForm product={selectedProduct} cancelEdit={cancelEdit} />
 
    if (!productsLoaded || !metaData) return <LoadingComponent message="Loading Products..." />

    return (
        <>
            <Box display="flex" justifyContent="space-between">
                <Typography sx={{ p: 2 }} variant="h4">Inventory</Typography>
                <Button sx={{ m: 2 }} size="large" variant="contained" onClick={() => setEditMode(true)}>Create</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">Brand</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map(product => (
                            <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {product.id}
                                </TableCell>
                                <TableCell align="left">
                                    <Box display="flex" alignItems="center">
                                        <img src={product.pictureUrl} alt={product.name} style={{height: 50, marginRight: 20}} />
                                        <span>{product.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{currencyFormat(product.price)}</TableCell>
                                <TableCell align="center">{product.type}</TableCell>
                                <TableCell align="center">{product.brand}</TableCell>
                                <TableCell align="center">{product.quantityInStock}</TableCell>
                                <TableCell align="right">
                                    <Button startIcon={<Edit />} onClick={() => handleSelectProduct(product)} />
                                    <LoadingButton 
                                        loading={loading && target === product.id} 
                                        startIcon={<Delete />} color="error"
                                        onClick={() => handleDeleteProduct(product.id)}
                                    />
                                </TableCell>
                                </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {metaData && 
                <Box sx={{ pt: 2 }}>
                    <AppPagination 
                        metaData={metaData} 
                        onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))} 
                    />
                </Box>
            }
        </>
    )
}

export default Inventory;