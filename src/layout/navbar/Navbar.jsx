import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavLogo from "../../assets/images/NavLogo.webp";
import { IoSearchOutline } from "react-icons/io5";
import { HiBars3 } from "react-icons/hi2";
import { LiaTimesSolid } from "react-icons/lia";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import {
  getCurrentLanguage,
  addLanguageToPath,
  removeLanguageFromPath,
} from "../../utils/languageUtils";
import { useTranslation } from "react-i18next";
import axios from "axios";
import "./Style.scss";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Az");
  // const [lang, setLang] = useState("az");
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const navigate = useNavigate();
  const languageDropdownRef = useRef(null);
  const { pathname } = useLocation();
  const currentLanguage = getCurrentLanguage(pathname);

  const options = [
    {
      value: "az",
      label: "Az",
    },
    {
      value: "en",
      label: "En",
    },
    {
      value: "ru",
      label: "Ru",
    },
  ];
  const createLanguageAwarePath = (path) => {
    return addLanguageToPath(path, currentLanguage);
  };
  const toggleLanguageDropdown = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };
  const handleLanguageSelect = (lang) => {
    setIsLanguageOpen(false);

    // Get current path without language prefix
    const pathWithoutLang = removeLanguageFromPath(pathname);

    // Create new path with selected language
    const newPath = addLanguageToPath(pathWithoutLang, lang);

    // Change i18n language
    if (i18n && i18n.changeLanguage) {
      i18n.changeLanguage(lang);
    }

    // Navigate to the new path
    navigate(newPath);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target)
      ) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setIsMobileProductsOpen(false);
      setOpenCategoryId(null);
    }
  };

  const toggleMobileProducts = () => {
    setIsMobileProductsOpen(!isMobileProductsOpen);
    setOpenCategoryId(null);
  };

  const toggleCategory = (categoryId) => {
    setOpenCategoryId(openCategoryId === categoryId ? null : categoryId);
  };
  useEffect(() => {
    setSelectedLanguage(
      currentLanguage === "az"
        ? "Az"
        : currentLanguage === "en"
        ? "En"
        : currentLanguage === "ru"
        ? "Ru"
        : "Az"
    );
  }, [currentLanguage]);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(
          "https://manager.hasdent.az/api/allcategories"
        );
        setCategories(res?.data?.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    getCategories();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <nav className="custom-navbar navbar-expand-lg px-2  px-md-3 px-lg-1  d-flex align-items-center justify-content-between">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center overflow-hidden"
        >
          <img src={NavLogo} alt="Logo" className="nav-logo" />
        </Link>
        {/* navbar links side */}
        <div className="mx-auto d-none d-lg-flex gap-2 align-items-center">
          <Link to={createLanguageAwarePath("/")} className="nav-link">
            {t("header.home")}
          </Link>
          <Link to={createLanguageAwarePath("/about")} className="nav-link">
            {t("header.aboutUs")}
          </Link>

          <Link to={createLanguageAwarePath("/services")} className="nav-link">
            {t("header.services")}
          </Link>
          {/* <div className="border position-relative  g-0 m-0 p-0 gap-0"> */}
          <div className="productDiv d-flex align-items-center">
            <Link
              to={createLanguageAwarePath("/products")}
              className="nav-link d-flex  align-items-center gap-2"
            >
              <span>{t("header.products")}</span>
              <IoIosArrowDown />
            </Link>
          </div>
          <div className="products-types  mt-3 position-absolute p-0 m-0">
            <div className="products-types-container mt-3 px-5">
              <ul className=" p-0 d-flex gap-2 row">
                {categories
                  ?.slice()
                  .reverse()
                  .map((category) => (
                    <li key={category.id} className=" d-flex flex-column col">
                      <Link
                        // to={createLanguageAwarePath(
                        //   `/products/${category.id}`
                        // )}
                      >
                        <h5>
                          {category.name?.[currentLanguage] ||
                            category.name?.az}
                        </h5>
                      </Link>
                      <div className="subcategories d-flex flex-column gap-2">
                        {category.subcategories?.map((sub) => (
                          <Link
                            key={sub.id}
                            to={createLanguageAwarePath(
                              `/products/${category.id}/${sub.id}`
                            )}
                            // to={`/${currentLanguage}/subcategory/${sub.id}`}
                            className="subcategory-link p-0 m-0"
                          >
                            {sub.name?.[currentLanguage] || sub.name?.az}
                          </Link>
                        ))}
                      </div>
                      {/* <Link
                        to={createLanguageAwarePath(`products/${category?.id}`)}
                      >
                        <div className="d-flex flex-column gap-2">
                          {category.subcategories?.map((sub) => (
                            <p className=" p-0 m-0" key={sub.id}>
                              {sub.name?.[currentLanguage] || sub.name?.az}
                            </p>
                          ))}
                        </div>
                      </Link> */}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          {/* </div> */}
          <Link to={createLanguageAwarePath("/news")} className="nav-link">
            {t("header.news")}
          </Link>
          <Link to={createLanguageAwarePath("/partners")} className="nav-link">
            {t("header.partners")}
          </Link>
          <Link
            to={createLanguageAwarePath("/contact-us")}
            className="nav-link"
          >
            {t("header.contact")}
          </Link>
        </div>
        {/* search */}
        <div className="d-flex justify-content-end align-items-center gap-0">
          {/* <div className="d-none d-lg-block">
            <IoSearchOutline size={20} className="text-dark" />
          </div> */}
          {/* language dropdrown  */}
          <div className="language-dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={toggleLanguageDropdown}
            >
              {selectedLanguage}
            </button>
            <ul
              className={`dropdown-menu ${isLanguageOpen ? "show" : ""}`}
              aria-labelledby="dropdownMenuButton"
            >
              {options.map((opt) => (
                <li key={opt.value}>
                  <button
                    className="dropdown-item"
                    onClick={() => handleLanguageSelect(opt.value)}
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="d-block d-lg-none  " onClick={toggleSidebar}>
            <HiBars3 size={20} className="text-dark" />
          </div>
        </div>
      </nav>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header d-flex justify-content-between align-items-center px-3 py-3 border-bottom">
          <div className="d-flex align-items-center justify-content-between w-100">
            <Link to="/" className="navbar-brand">
              <img src={NavLogo} alt="Logo" className="nav-logo" />
            </Link>
            <LiaTimesSolid size={20} onClick={toggleSidebar} />
          </div>
        </div>
        <div className="sidebar-body d-flex flex-column align-items-center  py-4 gap-3">
          {/* <div className=" border rounded-3 px-2   ">
            <IoSearchOutline size={18} className="text-dark" />
            <input type="text" name="" id="" />
          </div> */}

          <div className="w-100 align-items-start  ">
            <Link to={createLanguageAwarePath("/")} className="nav-link">
              {t("header.home")}
            </Link>
            <Link to={createLanguageAwarePath("/about")} className="nav-link">
              {t("header.aboutUs")}
            </Link>

            <Link
              to={createLanguageAwarePath("/services")}
              className="nav-link"
            >
              {t("header.services")}
            </Link>

            {/* Mobile Products Dropdown */}
            <div className="mobile-products-section">
              <div
                className="nav-link mobile-products-trigger d-flex justify-content-between align-items-center"
                onClick={toggleMobileProducts}
              >
                <span>{t("header.products")}</span>
                <IoIosArrowDown
                  className={`arrow-icon ${
                    isMobileProductsOpen ? "rotated" : ""
                  }`}
                />
              </div>

              {isMobileProductsOpen && (
                <div className="mobile-products-dropdown">
                  {categories
                    ?.slice()
                    .reverse()
                    .map((category) => (
                      <div key={category.id} className="mobile-category">
                        <div
                          className="mobile-category-header"
                          onClick={() => toggleCategory(category.id)}
                        >
                          <span className="category-name">
                            {category.name?.[currentLanguage] ||
                              category.name?.az}
                          </span>
                          <IoIosArrowDown
                            className={`arrow-icon ${
                              openCategoryId === category.id ? "rotated" : ""
                            }`}
                          />
                        </div>

                        {openCategoryId === category.id && (
                          <div className="mobile-subcategories">
                            {category.subcategories?.map((sub) => (
                              <Link
                                key={sub.id}
                                to={createLanguageAwarePath(
                                  `/products/${category.id}/${sub.id}`
                                )}
                                className="mobile-subcategory-link"
                                onClick={toggleSidebar}
                              >
                                {sub.name?.[currentLanguage] || sub.name?.az}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>

            <Link to={createLanguageAwarePath("/news")} className="nav-link">
              {t("header.news")}
            </Link>
            <Link
              to={createLanguageAwarePath("/partners")}
              className="nav-link"
            >
              {t("header.partners")}
            </Link>
            <Link
              to={createLanguageAwarePath("/contact-us")}
              className="nav-link"
            >
              {t("header.contact")}
            </Link>
          </div>
        </div>
      </div>
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
}
