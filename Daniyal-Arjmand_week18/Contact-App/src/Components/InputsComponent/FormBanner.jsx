import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faCheckCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

const FormBanner = ({ isSubmitSuccessful, errors, isValid }) => {
  const getBannerProps = () => {
    if (isSubmitSuccessful) {
      return {
        icon: faCheckCircle,
        text: "اطلاعات شما با موفقیت ذخیره شد!",
        className: "success",
      };
    }
    if (Object.keys(errors).length > 0) {
      return {
        icon: faExclamationCircle,
        text: "یکی از فیلدها نادرست است. لطفاً موارد را اصلاح کنید.",
        className: "error",
      };
    }
    if (isValid) {
      return {
        icon: faInfoCircle,
        text: "همه موارد صحیح است، اطلاعات خود را ذخیره کنید.",
        className: "default",
      };
    }
    return {
      icon: faInfoCircle,
      text: "لطفاً اطلاعات خود را وارد کنید.",
      className: "default",
    };
  };

  const banner = getBannerProps();

  return (
    <div className={`banner banner-${banner.className}`}>
      <FontAwesomeIcon icon={banner.icon} />
      <p>{banner.text}</p>
    </div>
  );
};

export default FormBanner;
