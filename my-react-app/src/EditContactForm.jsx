import React, { useState, useEffect } from "react";

const EditContactForm = ({ contact, onSave }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [job, setJob] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (contact) {
      setName(contact.name || "");
      setEmail(contact.email || "");
      setPhone(contact.phone || "");
      setJob(contact.job || "");
    }
  }, [contact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error messages
    setSuccessMessage(""); // Clear previous success messages

    if (name.length < 8) {
      setErrorMessage("نام و نام خانوادگی باید بیشتر از ۷ کاراکتر باشد");
      return;
    }
    if (phone.length !== 11) {
      setErrorMessage("شماره همراه باید دقیقاً ۱۱ رقم باشد");
      return;
    }
    if (!email.includes("@")) {
      setErrorMessage("آدرس ایمیل معتبر نیست");
      return;
    }

    onSave({ ...contact, name, email, phone, job });
    setSuccessMessage("تغییرات اعمال گردید");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="نام و نام خانوادگی"
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ایمیل"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="شماره همراه"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          placeholder="شغل"
        />
      </div>
      <button type="submit">اعمال تغییرات</button>

      {errorMessage && (
        <div className="message-box error">
          <p className="message-text">{errorMessage}</p>
        </div>
      )}
      {successMessage && (
        <div className="message-box success">
          <p className="message-text">{successMessage}</p>
        </div>
      )}
    </form>
  );
};

export default EditContactForm;
