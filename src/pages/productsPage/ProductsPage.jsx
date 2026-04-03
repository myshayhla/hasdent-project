import React from 'react';
import HeroSection from '../../components/HeroSection/HeroSection.jsx';
import ProductsSec from '../../components/productsSec/ProductsSec.jsx';

export default function ProductsPage() {
  return (
      <>
         <HeroSection page={" Məhsullar"}/>
          <ProductsSec/>
      
    </>
  );
}

// import React, { useEffect, useState } from "react";
// import HeroSection from "../../components/HeroSection/HeroSection.jsx";
// import ProductsSec from "../../components/productsSec/ProductsSec.jsx";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// export default function ProductsPage() {
//   const { categoryID, subcategoryId } = useParams();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const url = subcategoryId
//           ? `https://manager.hasdent.az/api/products?subcategory=${subcategoryId}`
//           : "https://manager.hasdent.az/api/products";

//         const res = await axios.get(url);
//         setProducts(res.data.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [subcategoryId]);

//   return (
//     <>
//       <HeroSection page={"Məhsullar"} />

//       {loading ? <p>Yüklənir...</p> : <ProductsSec products={products} />}
//     </>
//   );
// }

