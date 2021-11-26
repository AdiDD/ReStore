import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFiltersAsync, fetchProductsAsync, productSelectors } from "./catalogSlice";

import ProductList from "./ProductList";

const Catalog = () => {
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, filtersLoaded, status } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    // i used two useEffect twice to avoid double loading of products because filters were loading faster than products and the page would rerender and then the component would
    // fetch the products again.

    useEffect(() => {
      if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch])

    useEffect(() => {
      if (!filtersLoaded) dispatch(fetchFiltersAsync());
    }, [filtersLoaded, dispatch])

    if (status.includes("pending")) return <LoadingComponent message="Loading Products..." />

    return <>
        <ProductList products={products} />
    </>
};

export default Catalog;