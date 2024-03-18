import React, { useEffect, useState, useRef } from "react";
import "./NewCollections.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Item from "../Item/Item";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { fetchProductThunkAction } from "../../slices/productsSlice";
import { productListSelector } from "../../redux-toolkit/selector";
import { useSelector, useDispatch } from "react-redux";
import { loadingSelector } from "../../redux-toolkit/selector";
// import Spinner from "../Spinner/Spinner";

const CustomArrow = ({ onClick, direction }) => {
  return (
    <div
      className={`custom-arrow ${direction === "left" ? "left" : "right"}`}
      onClick={onClick}
    >
      {direction === "left" ? <FaArrowLeft /> : <FaArrowRight />}
    </div>
  );
};

const NewCollections = () => {
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   // dispatch(fetchProductThunkAction())
  // }, [dispatch])
  const selectProduct = useSelector(productListSelector)
  const all_product = selectProduct?.data
  const totalProducts = all_product?.length;
  const slidesPerPage = 8;
  const totalSlides = Math.ceil(totalProducts / slidesPerPage);
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const sliderRef = useRef(null);

  const loading = useSelector(loadingSelector)

  useEffect(() => {
    const sliderElement = sliderRef.current.innerSlider.list;
    if (sliderElement) {
      const slideChangeHandler = (index) => {
        setActiveDotIndex(index);
      };
      sliderElement.addEventListener("afterChange", slideChangeHandler);

      return () => {
        sliderElement.removeEventListener("afterChange", slideChangeHandler);
      };
    }
  }, []);

  const customPaging = (i) => {
    return (
      <div
        className={`custom-dot ${activeDotIndex === i ? "active" : ""}`}
        onClick={() => setActiveDotIndex(i)}
      ></div>
    );
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    customPaging: customPaging,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };
  if (totalSlides > 1) {
    settings.dots = true;
  }

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <Slider ref={sliderRef} {...settings}>
        {Array.from({ length: totalSlides }).map((_, index) => (
          <div key={index} className="slide">
            <div className="collections">
              {all_product
                .slice(index * slidesPerPage, (index + 1) * slidesPerPage)
                .map((item, i) => (
                  <Item
                    key={i}
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    new_price={item.new_price}
                    old_price={item.old_price}
                  />
                ))}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default NewCollections;
