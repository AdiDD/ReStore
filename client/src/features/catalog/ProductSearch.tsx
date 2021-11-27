import { TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setProductParams } from "./catalogSlice";

const ProductSearch = () => {
    const { productParams } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);

    

    return (
        <TextField
            label="Search products"
            variant="outlined"
            fullWidth
            value={searchTerm || ''}
            onChange={event => setSearchTerm(event.target.value)}
            onKeyPress={(event) => {
                if (event.key === "Enter") dispatch(setProductParams({searchTerm}))
            }}
        />
    )
}

export default ProductSearch;