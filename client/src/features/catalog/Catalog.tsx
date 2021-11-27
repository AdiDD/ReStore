import { Grid, Paper, FormLabel, Box, Typography, Pagination } from "@mui/material";
import { useEffect } from "react";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFiltersAsync, fetchProductsAsync, productSelectors, setProductParams } from "./catalogSlice";

import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";

const orderByOptions = [
  {value: "name", label: "Alphabetical"},
  {value: "priceDesc", label: "Price - High to low"},
  {value: "price", label: "Price - Low to High"}
];

const Catalog = () => {
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, filtersLoaded, brands, types, productParams } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    // i used two useEffect twice to avoid double loading of products because filters were loading faster than products and the page would rerender and then the component would
    // fetch the products again.

    useEffect(() => {
      if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch])

    useEffect(() => {
      if (!filtersLoaded) dispatch(fetchFiltersAsync());
    }, [filtersLoaded, dispatch])

    if (!productsLoaded || !filtersLoaded) return <LoadingComponent message="Loading Products..." />

    return (
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <Paper sx={{ mb: 2 }}>
            <ProductSearch />
          </Paper>
          
          <Paper sx={{ mb: 2, p: 2 }}>
            <RadioButtonGroup
              options={orderByOptions}
              selectedValue={productParams.orderBy}
              onChange={(event) => dispatch(setProductParams({ orderBy: event.target.value }))}
            />
          </Paper>

          <Paper sx={{ mb: 2, p: 2 }}>
            <FormLabel component="legend">Brands</FormLabel>
            <CheckboxButtons
              items={brands}
              checked={productParams.brands}
              onChange={(items: string[]) => dispatch(setProductParams({ brands: items }))}
            />
          </Paper>

          <Paper sx={{ mb: 2, p: 2 }}>
            <FormLabel component="legend">Types</FormLabel>
            <CheckboxButtons
              items={types}
              checked={productParams.types}
              onChange={(items: string[]) => dispatch(setProductParams({ types: items }))}
            />
          </Paper>
        </Grid>


        <Grid item xs={9}>
          <ProductList products={products} />
        </Grid>


        <Grid item xs={3} />
        <Grid item xs={9}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography>
              Displaying 1-6 of 20 items
            </Typography>
            <Pagination
              color="secondary"
              size="large"
              count={10}
              page={2}
            />
          </Box>
        </Grid>
      </Grid>
    )
};

export default Catalog;