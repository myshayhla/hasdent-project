import React from "react";
import "./Style.scss";
import AboutLayout from "../../assets/images/AboutLayout.webp";
import Vector from "../../assets/images/Vector2.webp";
import SectionHead from "../sectionHead/SectionHead";
import ReadMore from "../readMore/ReadMore";

import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  getCurrentLanguage,
  addLanguageToPath,
  removeLanguageFromPath,
} from "../../utils/languageUtils";

export default function AboutSection({ buttonType = "about", subcategoryId = null }) {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  // Get current language from URL BAXXXXXXXXXXXXXXXX BUNA
  const currentLanguage = getCurrentLanguage(pathname);
  const createLanguageAwarePath = (path) => {
    return addLanguageToPath(path, currentLanguage);
  };

  const buttonLink =
    buttonType === "about"
      ? createLanguageAwarePath("/about")
      : createLanguageAwarePath(`/products/3/19`);

  const buttonText =
    buttonType === "about" ? t("title.readMore") : t("btn.readMore"); 
  
  return (
    <section id="about-sec">
      <div
        className="about-sec container-fluid  p-0 row m-0 g-0"
        data-aos-anchor-placement="top-center"
      >
        <div
          className="layout-side col-12 col-lg-6 p-0 g-0 d-flx`ex"
          data-aos="fade-right"
          // data-aos-anchor-placement="top-center"
        >
          <img src={AboutLayout} alt="" className="layout1" />
        </div>
        <div
          className="title-side col-12 col-lg-6 d-flex flex-column justify-content-center gap-3  "
          data-aos="fade-left"
          // data-aos-anchor-placement="top-center"
        >
          <SectionHead title={t("header.aboutUs")} />
          <h1 className="about-title">{t("home.aboutSection.title")}</h1>
          <p>{t("home.aboutSection.subtitle")}</p>
          <div>
            <Link to={createLanguageAwarePath("/products")}>
              <ReadMore title={buttonText} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
