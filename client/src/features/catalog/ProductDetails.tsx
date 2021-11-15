import { Typography } from "@mui/material";
import { useParams } from "react-router";

export default function ProductDetails() {
    const {id} = useParams();

    return (
        <Typography variant="h2">
            Product details page
        </Typography>
    )
}