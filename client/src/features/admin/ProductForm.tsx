import { useEffect, useState } from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { LoadingButton } from '@mui/lab';
import { Product } from "../../app/models/product";
import useProducts from "../../app/hooks/useProducts";
import AppSelectList from "../../app/components/AppSelectList";
import AppDropzone from "../../app/components/AppDropzone";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { setProduct } from "../catalog/catalogSlice";

interface Props {
    product?: Product;
    cancelEdit: () => void;
}

const ProductForm = ({ product, cancelEdit }: Props) => {
    const emptyForm = {
        name: "",
        brand: "",
        type: "",
        price: 0,
        quantityInStock: 0,
        description: "",
        pictureUrl: "",
        file: null
    }
    const [formValues, setFormValues] = useState<any>(emptyForm);
    const [imgError, setImgError] = useState("");
    const { brands, types } = useProducts();
    const dispatch = useAppDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (product && formValues.pictureUrl === "") setFormValues((prevState: any) => {
            return {
                ...prevState,
                name: product.name,
                brand: product.brand,
                type: product.type,
                price: product.price,
                quantityInStock: product.quantityInStock,
                description: product.description,
                pictureUrl: product.pictureUrl
            }
        });

        console.log("ran useEffect");

        return () => {
            if (formValues.file !== null) URL.revokeObjectURL(formValues.file.preview);
        }
    }, [product, formValues.pictureUrl, formValues.file]);

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormValues({...formValues, [name]: value});
    };

    const handlePictureChange = (file: any) => {
        setFormValues((prevState: any) => {
            return {...prevState, file};
        });
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (formValues.pictureUrl === "" && formValues.file === null) {
            setImgError("Please upload a picture of the product");
            return;
        }

        setIsSubmitting(true);
        console.log(formValues);

        try {
            let response: Product;
            if (product) {
                const data = {...formValues, id: product.id}
                response = await agent.Admin.updateProduct(data);
            } else {
                response = await agent.Admin.createProduct(formValues);
            }
            dispatch(setProduct(response));
            cancelEdit();
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Box component={Paper} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>Product details</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="name"
                            name="name"
                            label="Product name"
                            fullWidth
                            variant="standard"
                            value={formValues.name}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppSelectList
                            label="Brand"
                            name="brand"
                            required={true}
                            items={brands}
                            handleChange={handleInputChange}
                            initialVal={formValues.brand}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppSelectList
                            label="Type"
                            name="type"
                            required={true}
                            items={types}
                            handleChange={handleInputChange}
                            initialVal={formValues.type}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="price"
                            name="price"
                            label="Price"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={formValues.price}
                            inputProps={{ min: 100 }}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="quantityInStock"
                            name="quantityInStock"
                            label="Quantity in stock"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={formValues.quantityInStock}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="description"
                            name="description"
                            label="Description"
                            multiline={true}
                            rows={4}
                            fullWidth
                            variant="standard"
                            value={formValues.description}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <AppDropzone handlePictureChange={handlePictureChange} />
                            {formValues.file?.preview ? (<img src={formValues.file?.preview} alt="preview" style={{ maxHeight: 200 }} />) : (
                                <img src={product?.pictureUrl} alt={product?.name} style={{ maxHeight: 200 }} />
                            )}
                        </Box>
                        <p style={{color: "red"}}>{imgError}</p>
                    </Grid>
                </Grid>
                <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
                    <Button variant="contained" color="inherit" onClick={cancelEdit}>Cancel</Button>
                    <LoadingButton loading={isSubmitting} type="submit" variant="contained" color="success">Submit</LoadingButton>
                </Box>
            </form>
        </Box>
    )
};

export default ProductForm;