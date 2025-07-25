import React from "react";
import "./Home.css";
import Inputs from "./Inputs";

function Home() {
  return (
    <div className="home-root">
      <div className="art-container">
        <Inputs />
      </div>

      <div>
        <div className="text-container">
          <button className="text-butt">افزودن+</button>
          <button className="text-butt">لیست مخاطبین</button>
          <button className="text-butt"> حالت تاریک</button>
          <div className="text-content">
            <h1>
              برنامه مخاطبین برای ثبت شماره و ایمیل های
              <span> تحت وب</span>
            </h1>
            <p>
              شما میتوانید با دکمه افزودن لیستی از مخاطبین را ثبت کنید و در هر
              فیلد اسم ، شماره تلفن ، ایمیل ، دسته بندی و جنسیت رو داشته باشید
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
