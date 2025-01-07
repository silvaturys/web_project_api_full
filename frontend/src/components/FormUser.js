import React from "react";
import {Link} from 'react-router-dom'
function FormUser({
  title,
  buttonText,
  linkSpan,
  linkText,
  onChange,
  onSubmit,
}) {
  return (
    <form className="user-form" onSubmit={onSubmit}>
      <h3 className="user-form__title">{title}</h3>
      <div className="user-form__container">
        <input
          className="user-form__input"
          type="email"
          placeholder="E-mail"
          name="email"
          onChange={onChange}
          required
        />
        <input
          className="user-form__input"
          type="password"
          placeholder="Senha"
          name="password"
          onChange={onChange}
          required
        />
      </div>
      <button className="user-form__button-submit" type="submit">
        {buttonText}
      </button>
      <Link to={linkSpan} className="user-form__link-span">
        {linkText}
      </Link>
    </form>
  );
}
export default FormUser;