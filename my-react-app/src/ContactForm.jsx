import React, { useState, useEffect } from "react";

const ContactForm = ({ contact, onSubmit, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [job, setJob] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [jobError, setJobError] = useState("");

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setEmail(contact.email);
      setPhone(contact.phone);
      setJob(contact.job);
    }
  }, [contact]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setNameError("");
    setEmailError("");
    setPhoneError("");
    setJobError("");

    let hasError = false;

    if (!name) {
      setNameError("پر کردن فیلد الزامی است");
      hasError = true;
    } else if (name.length < 8) {
      setNameError("نام و نام خانوادگی باید بیشتر از 7 کاراکتر باشد");
      hasError = true;
    }

    if (!email) {
      setEmailError("پر کردن فیلد الزامی است");
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("آدرس ایمیل معتبر نیست");
      hasError = true;
    }

    if (!phone) {
      setPhoneError("پر کردن فیلد الزامی است");
      hasError = true;
    } else if (!/^\d{11}$/.test(phone)) {
      setPhoneError("شماره همراه باید دقیقاً 11 رقم باشد");
      hasError = true;
    }

    if (!job) {
      setJobError("پر کردن فیلد الزامی است");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    onSubmit({
      id: contact ? contact.id : Date.now(),
      name,
      email,
      phone,
      job,
    });
    setName("");
    setEmail("");
    setPhone("");
    setJob("");
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
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
      <button type="submit">اعمال تغییرات</button>
      <button type="button" onClick={onClose}>
        بستن
      </button>
    </form>
  );
};

export default ContactForm;
