import React, { useEffect, useState } from "react";
import "./Style.scss";
import SectionHead from "../sectionHead/SectionHead";
import ReadMore from "../readMore/ReadMore";
import Slider from "react-slick";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";
import {
  getCurrentLanguage,
  addLanguageToPath,
} from "../../utils/languageUtils";

export default function BestSeller() {
  const [width, setWidth] = useState(window.innerWidth);
  const [products, setProducts] = useState([]);
  const [randomProduct, setRandomProduct] = useState(null);

  const { t } = useTranslation();
  const { pathname } = useLocation();
  const currentLanguage = getCurrentLanguage(pathname);

  const createLanguageAwarePath = (path) =>
    addLanguageToPath(path, currentLanguage);

  /* responsive */
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* məhsulları çək */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          "https://manager.hasdent.az/api/products"
        );

        const list = data?.data || [];

        setProducts(list.slice(0, 5)); 

        if (list.length > 0) {
          setRandomProduct(list[Math.floor(Math.random() * list.length)]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true, 
    speed: 500, 
    autoplay: true,
    autoplaySpeed: 2000, 
    slidesToShow: width <= 576 ? 1 : width <= 768 ? 2 : width <= 992 ? 3 : 4,
    slidesToScroll: 2,
    pauseOnHover: true,
    cssEase: "ease-in-out",
  };

  return (
    <section id="bestseller">
      <div className="bestseller">
        <SectionHead title={t("header.products")} />

        <div className="d-flex justify-content-between align-items-center">
          <h1 className="py-4 fs-2">{t("home.productSec.highsale")}</h1>

          {randomProduct && (
            <Link to={createLanguageAwarePath("/products")}>
              <ReadMore title={t("btn.readMore")} />
            </Link>
          )}
        </div>

        <div className="slider-container">
          <Slider {...settings}>
            {products.map((item) => (
              <div className="p-2" key={item.id}>
                <div className="bestseller-card">
                  <img
                    src={`https://manager.hasdent.az${item.image}`}
                    alt={item.title?.az}
                  />

                  <div className="content-side">
                    <h5>
                      {item.title?.az?.length > 30
                        ? item.title.az.slice(0, 30) + "..."
                        : item.title?.az}
                    </h5>

                    <div>
                      {item.description?.az
                        ? parse(
                            item.description.az.length > 10
                              ? item.description.az.slice(0, 15) + "..."
                              : item.description.az,
                          )
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <Link to="/products" className="d-block d-md-none pt-5">
          <ReadMore title={t("title.lookAll")} />
        </Link>
      </div>
    </section>
  );
}
