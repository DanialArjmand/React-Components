import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home-root">
      <div className="art-container">
        <div className="inputs">
          <label> نام : </label>
          <input type="text" placeholder="نام" />
        </div>

        <div className="inputs">
          <label> نام خانوادگی : </label>
          <input type="text" placeholder="نام خانوادگی" />
        </div>

        <div className="inputs">
          <label> ایمیل : </label>
          <input type="email" placeholder="ایمیل" />
        </div>

        <div className="inputs">
          <label> شماره تلفن : </label>
          <input type="number" placeholder="شماره تلفن" />
        </div>

        <div className="select-op">
          <label> دسته بندی : </label>
          <select name="" id="">
            <option value="" disabled>
              یک دسته را انتخاب کنید
            </option>
            <option value="خانواده">خانواده</option>
            <option value="همکار">همکار</option>
            <option value="دوست">دوست</option>
            <option value="سایر">سایر</option>
          </select>
        </div>

        <div className="gender-group">
          <label> جنسیت : </label>
          <div className="gender-parent">
            <div className="gender-child">
              <label className="gender-label">
                <input
                  className="radio-input"
                  type="radio"
                  name="Gender"
                  value="مرد"
                />
                مرد
              </label>
            </div>

            <div className="gender-child">
              <label className="gender-label">
                <input
                  className="radio-input"
                  type="radio"
                  name="Gender"
                  value="زن"
                />
                زن
              </label>
            </div>
          </div>
        </div>

        <div className="butt-parent">
          <button className="text-butt-state">ذخیره</button>
          <button className="text-butt-state">برگشت</button>
        </div>
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
