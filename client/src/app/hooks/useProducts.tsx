import { useEffect } from "react";
import { fetchFiltersAsync, fetchProductsAsync, productSelectors } from "../../features/catalog/catalogSlice";
import { useAppDispatch, useAppSelector } from "../store/configureStore";

const useProducts = () => {
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, filtersLoaded, brands, types, metaData } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    // i used two useEffect twice to avoid double loading of products because filters were loading faster than products and the page would rerender and then the component would
    // fetch the products again.

    useEffect(() => {
      if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch])

    useEffect(() => {
      if (!filtersLoaded) dispatch(fetchFiltersAsync());
    }, [filtersLoaded, dispatch])

    return {
        products,
        productsLoaded,
        filtersLoaded,
        brands,
        types,
        metaData
    }
}

export default useProducts;