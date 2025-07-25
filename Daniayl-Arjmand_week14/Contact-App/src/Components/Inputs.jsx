import React, { useState } from "react";

function Inputs({ onSave }) {
  const [form, setForm] = useState({
    Name: "",
    LastName: "",
    Email: "",
    Phone: "",
    Category: "",
    Gender: "",
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = () => {
    onSave(form);
    setForm({
      Name: "",
      LastName: "",
      Email: "",
      Phone: "",
      Category: "",
      Gender: "",
    });
  };

  return (
    <div>
      <div className="inputs">
        <label> نام : </label>
        <input
          type="text"
          placeholder="نام"
          name="Name"
          value={form.Name}
          onChange={changeHandler}
        />
      </div>
      <div className="inputs">
        <label> نام خانوادگی : </label>
        <input
          type="text"
          placeholder="نام خانوادگی"
          name="LastName"
          value={form.LastName}
          onChange={changeHandler}
        />
      </div>
      <div className="inputs">
        <label> ایمیل : </label>
        <input
          type="email"
          placeholder="ایمیل"
          name="Email"
          value={form.Email}
          onChange={changeHandler}
        />
      </div>
      <div className="inputs">
        <label> شماره تلفن : </label>
        <input
          type="number"
          placeholder="شماره تلفن"
          name="Phone"
          value={form.Phone}
          onChange={changeHandler}
        />
      </div>
      <div className="select-op">
        <label> دسته بندی : </label>
        <select
          id=""
          name="Category"
          value={form.Category}
          onChange={changeHandler}
        >
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
                checked={form.Gender === "مرد"}
                onChange={changeHandler}
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
                checked={form.Gender === "زن"}
                onChange={changeHandler}
              />
              زن
            </label>
          </div>
        </div>
      </div>
      <div className="butt-parent">
        <button className="text-butt-state" onClick={submitHandler}>ذخیره</button>
        <button className="text-butt-state">برگشت</button>
      </div>
    </div>
  );
}

export default Inputs;
