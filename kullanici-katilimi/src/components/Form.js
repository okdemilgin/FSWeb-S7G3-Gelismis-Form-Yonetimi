import React, { useEffect, useState } from "react";
import * as Yup from "yup";

const emptyForm = {
  name: "",
  email: "",
  pass: "",
};

const formSema = Yup.object().shape({
    name: Yup.string().required("İsim alanı zorunludur.").min(3, "min 3 karakter girmelisiniz."),
    email: Yup.string().required("Email alanı zorunludur.").email("Hatalı bir mail adresi girdiniz."),
    pass: Yup.string().required("Şifre alanı zorunludur.").min(6,"min 6 karakter girmelisiniz."),
    term: Yup.boolean().oneOf([true],"Kabul etmeniz gerekiyor!"), 
  });
function Form(props) {

  const [formData, setFormData] = useState(emptyForm);
  const [isEditing, setisEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setisFormValid] = useState(false);

  function validateForm(fieldData, fieldName) {
    Yup.reach(formSema, fieldName)
    .validate(fieldData)
    .then(() => {
        setErrors({...errors,[fieldName]: ""});
    }).catch((err) => {
        setErrors({...errors,[fieldName]: err.errors[0]});
    });
}

useEffect(() => {
    formSema.isValid(formData)
    .then(function(valid) {
        setisFormValid(valid);
    });
}, [errors]);

  useEffect(() => {
    props.editMode ? setFormData(props.editMode) : setFormData(emptyForm);
    props.editMode ? setisEditing(true) : setisEditing(false);
  }, [props.editMode]);

  function submitHandler(e) {
    e.preventDefault();
    props.addMember(formData);
    setisEditing(false);
    setFormData(emptyForm);
  }

  function changeHandler(e) {
    const {name, value, checked, type} = e.target;
    const readInputValue = type === "checkbox" ? checked : value;
    const newFormData = {
        ...formData,
        [name]: readInputValue,
    };
    setFormData(newFormData);
    validateForm(readInputValue, name);
  }

  return (
    <div>
      {isEditing ? <h2>Üye Düzenle</h2> : <h2>Yeni Üye Ekle</h2>}
      <form onSubmit={submitHandler}>
        <label htmlFor="name">İsim </label>
        <input
          onChange={(e) => changeHandler(e)}
          type="text"
          name="name"
          value={formData.name}
        />
        {errors.name ? <p>{errors.name}</p> : null}
        <label htmlFor="email">Eposta</label>
        <input
          onChange={(e) => changeHandler(e)}
          type="email"
          name="email"
          value={formData.email}
        />
        {errors.email ? <p>{errors.email}</p> : null}

        <label htmlFor="pass">Şifre</label>
        <input
          onChange={(e) => changeHandler(e)}
          type="password"
          name="pass"
          value={formData.pass}
        />
        {errors.pass ? <p>{errors.pass}</p> : null}

        <label htmlFor="term">Kvkk Metni</label>
        <input onChange={(e) => changeHandler(e)} type="checkbox" name="term" />
        {errors.term ? <p>{errors.term}</p> : null}

        <button type="submit" disabled={!isFormValid}>
          {isEditing ? "Üye Düzenle" : "Yeni Üye Ekle"}
        </button>
        <button type="button" onClick={() => setFormData(emptyForm)}>
          Sıfırla
        </button>
      </form>
    </div>
  );
}
export default Form;