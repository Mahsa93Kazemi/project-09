import React, { useState, useEffect, useCallback } from "react";

const AddContactForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [job, setJob] = useState("");

  // States for individual field errors
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [jobError, setJobError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  // استفاده از useEffect برای پاک کردن پیام موفقیت بعد از ۴ ثانیه
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // تابع مدیریت ارسال فرم
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // Reset errors
      setNameError("");
      setEmailError("");
      setPhoneError("");
      setJobError("");

      let hasError = false;

      if (!name) {
        setNameError("پر کردن این فیلد الزامی است");
        hasError = true;
      } else if (name.length < 8) {
        setNameError("نام و نام خانوادگی باید بیشتر از 7 کاراکتر باشد");
        hasError = true;
      }

      if (!email) {
        setEmailError("پر کردن این فیلد الزامی است");
        hasError = true;
      } else if (!email.includes("@")) {
        setEmailError("آدرس ایمیل معتبر نیست");
        hasError = true;
      }

      if (!phone) {
        setPhoneError("پر کردن این فیلد الزامی است");
        hasError = true;
      } else if (phone.length !== 11) {
        setPhoneError("شماره همراه باید دقیقاً 11 رقم باشد");
        hasError = true;
      }

      if (!job) {
        setJobError("پر کردن این فیلد الزامی است");
        hasError = true;
      }

      // اگر خطایی وجود دارد، پیام موفقیت را مخفی کنیم
      if (hasError) {
        setSuccessMessage("");
        return;
      }

      // اضافه کردن مخاطب و نمایش پیام موفقیت
      onAdd({ name, email, phone, job });
      setSuccessMessage("مخاطب جدید به لیست افزوده شد");

      // پاک کردن فیلدهای فرم
      setName("");
      setEmail("");
      setPhone("");
      setJob("");
    },
    [name, email, phone, job, onAdd]
  );

  return (
    <>
      {successMessage && (
        <div className="successContainer">
          <div className="success-box">
            <p className="success-message">{successMessage}</p>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="نام و نام خانوادگی"
          />
          {nameError && <p className="error-message">{nameError}</p>}
        </div>
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ایمیل"
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </div>
        <div className="form-group">
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="شماره همراه"
          />
          {phoneError && <p className="error-message">{phoneError}</p>}
        </div>
        <div className="form-group">
          <input
            type="text"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            placeholder="شغل"
          />
          {jobError && <p className="error-message">{jobError}</p>}
        </div>

        <button className="submit" type="submit">
          افزودن
        </button>
      </form>
    </>
  );
};

export default AddContactForm;
