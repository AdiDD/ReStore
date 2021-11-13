import { useState, useEffect } from "react";
import { Product } from "../models/product";
import { Typography } from "@mui/material";

import Catalog from "../../features/catalog/Catalog";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
    .then(response => response.json())
    .then(data => setProducts(data));
  }, [])


  return (
      <div>
        <Typography variant="h1">Re-Store</Typography> 
        <Catalog products={products} />
      </div>
  );
}

export default App;
