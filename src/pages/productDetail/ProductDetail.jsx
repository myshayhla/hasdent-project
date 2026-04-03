import React, { useEffect, useState } from "react";
import "./Style.scss";
import HeroSection from "../../components/HeroSection/HeroSection";
import ReadMore from "../../components/readMore/ReadMore";
import Img from "../../assets/images/HomeHero.webp";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import parse from "html-react-parser";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  getCurrentLanguage,
  addLanguageToPath,
  removeLanguageFromPath,
} from "../../utils/languageUtils";


function ProductDetail() {
  const { id } = useParams();
  // const currentLanguage = "az";
const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  // Get current language from URL BAXXXXXXXXXXXXXXXX BUNA
  const currentLanguage = getCurrentLanguage(pathname);
  const createLanguageAwarePath = (path) => {
    return addLanguageToPath(path, currentLanguage);
  };
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    axios
      .get(`https://manager.hasdent.az/api/products/${id}`)
      .then((res) => {
        setDetail(res.data.data);
      })
      .catch((err) => console.log("Error fetching news detail:", err))
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, [id]);

  return (
    <>
      <HeroSection page={"Məhsullar"} />
      <section id="product-detail">
        {loading ? (
          <>
            <Skeleton
              height={400}
              width={"90%"}
              className="mb-4 mx-auto"
              style={{ borderRadius: "12px" }}
            />
            <Skeleton height={35} width={"60%"} className="mb-3" />
            <Skeleton count={4} height={20} width={"90%"} />
          </>
        ) : (
          <div className="product-detail">
            <div className="img-side" data-aos="fade-up">
              <img
                src={`https://manager.hasdent.az${detail.image}`}
                alt={detail?.title?.az}
              />
            </div>
            <div className="text-side" data-aos="fade-up">
              <div className="head">
                <h3>{detail?.title?.[currentLanguage] || detail?.title?.az}</h3>
                <div className="d-none d-md-block">
                  <Link
                    to={
                      detail?.pdfFile
                        ? `https://manager.hasdent.az${detail.pdfFile}`
                        : "#"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (!detail?.pdfFile) {
                        e.preventDefault();
                        onOpen();
                      }
                    }}
                  >
                    <ReadMore title={"Kataloqu endir"} />
                  </Link>
                </div>
              </div>
              <div className="content">
                <div>
                  {parse(
                    detail?.description?.[currentLanguage] ||
                      detail?.description?.az,
                  )}
                </div>
              </div>
              <div className="d-block d-md-none">
                <ReadMore title={"Katalogu endir"} />
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default ProductDetail;
