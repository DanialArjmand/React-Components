import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home-root">
      <div className="art-container">
        <div className="line">
          <div className="shape large-beige-blob"></div>
          <div className="shape large-teal-blob"></div>
        </div>
        <div className="line">
          <div className="shape orange-diamond"></div>
          <div className="shape beige-circle"></div>
          <div className="shape beige-triangle"></div>
        </div>
        <div className="line">
          <div className="shape dark-capsule-top"></div>
          <div className="shape square-outline"></div>
          <div className="shape teal-capsule-bottom"></div>
        </div>
      </div>

      <div>
        <h1>
          برنامه مخاطبین برای ثبت شماره و ایمیل های فوری <span>در تحت وب</span>
        </h1>
        <p>
          شما میتوانید با دکمه افزودن لیستی از مخاطبین را ثبت کنید و در هر فیلد
          اسم ، شماره تلفن ، ایمیل ، دسته بندی و جنسیت رو داشته باشید
        </p>
      </div>
    </div>
  );
}

export default Home;
