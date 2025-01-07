import favIcon from "../images/favicon.svg"
import { Link } from "react-router-dom";

function Header({signText,email,linkRoute,onClick}) {
  return (
    <>
      <header>
        <div className="header">
        <img src={favIcon} alt="Logo de Around" className="header-logo" />
        <p className="header__subheader">{email}</p>
        <Link to={linkRoute} onClick={onClick} className="header__subheader">{signText}</Link>
        </div>
      </header>
    </>
  );
}
export default Header;