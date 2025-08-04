export const validateForm = (form) => {
  const errors = {};

  if (form.Name.trim().length < 2) {
    errors.Name = "نام باید حداقل ۲ حرف باشد!";
  }

  if (form.LastName.trim().length < 2) {
    errors.LastName = "نام خانوادگی باید حداقل ۲ حرف باشد!";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.Email) {
    errors.Email = "وارد کردن ایمیل الزامی است.";
  } else if (!emailRegex.test(form.Email)) {
    errors.Email = "ایمیل وارد شده معتبر نیست.";
  }

  const phoneRegex = /^0\d{9,10}$/;
  if (!form.Phone) {
    errors.Phone = "وارد کردن شماره تلفن الزامی است.";
  } else if (!phoneRegex.test(form.Phone)) {
    errors.Phone = "شماره تلفن باید با 0 شروع شود و ۱۱ رقمی باشد.";
  }

  if (!form.Category) {
    errors.Category = "انتخاب دسته بندی الزامی است.";
  }

  if (!form.Gender) {
    errors.Gender = "انتخاب جنسیت الزامی است.";
  }

  return errors;
};
