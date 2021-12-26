import { Grid, Paper, FormLabel } from "@mui/material";
import AppPagination from "../../app/components/AppPagination";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setPageNumber, setProductParams } from "./catalogSlice";
import useProducts from "../../app/hooks/useProducts";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";

const orderByOptions = [
  {value: "name", label: "Alphabetical"},
  {value: "priceDesc", label: "Price - High to low"},
  {value: "price", label: "Price - Low to High"}
];

const Catalog = () => {
    const { products, brands, types, filtersLoaded, productsLoaded, metaData } = useProducts();
    const { productParams } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    if ((!productsLoaded || !filtersLoaded) || !metaData) return <LoadingComponent message="Loading Products..." />

    return (
      <Grid container columnSpacing={4}>
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
        <Grid item xs={9} sx={{my: 2}}>
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}
          />
        </Grid>
      </Grid>
    )
};

export default Catalog;