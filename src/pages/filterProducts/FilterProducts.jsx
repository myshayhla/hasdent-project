import React, { useEffect, useState } from 'react';
import "./Stye.scss";
import HeroSection from '../../components/HeroSection/HeroSection';
import ProductsSec from '../../components/productsSec/ProductsSec';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import parse from "html-react-parser";

function FilterProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { subcategoryId } = useParams();
    

     useEffect(() => {
     const fetchProducts = async () => {
      setLoading(true);
    
      try {
        const { data } = await axios.get(
          `https://manager.hasdent.az/api/products?subcategoryID=${subcategoryId}&page=1&limit=100`,
        );
        console.log(data); // ← bunı əlavə et
        setProducts(data?.data || data?.products || data || []);
      } catch (err) {
        setError(err.message || "Xəta baş verdi");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [subcategoryId]);
  if (loading) return <p>Yüklənir...</p>;
  if (error) return <p>{error}</p>;
  
  if (products.length === 0) return <p>Bu subcategory-də məhsul yoxdur.</p>;

  return (
    <>
      <HeroSection page={" Məhsullar"} />
      <section id="products-sec">
        <div className="products row g-0">
          {products.slice().reverse().map((item) => (
            <Link to={`/products/${item.id}`}>
              <div key={item.id} className="product-card">
                <div className="card-container">
                  <div className="img-side">
                    <img
                      src={`https://manager.hasdent.az${item.image}`}
                      alt={item.title?.az}
                    />
                  </div>
                  <div className="text-side">
                    <h5 className="title ">
                      {item.title?.az.length > 30
                        ? item.title?.az.slice(0, 30) + "..."
                        : item.title.az}
                    </h5>
                    <p className="detail">
                      {item.description?.az
                        ? parse(
                            item.description.az.length > 0
                              ? item.description.az.slice(0, 20) + "..."
                              : item.description.az,
                          )
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="products-sec"></div>
      </section>
    </>
  );
}

export default FilterProducts;
