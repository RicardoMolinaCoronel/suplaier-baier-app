import { Link } from "react-router-dom";

export const SignupPage = () => {
  return (
    <div className="signupPage">
      <div className="signupPage__centralbox">
        <div className="signupPage__centralbox__titleBox">
          <div className="signupPage__centralbox__titleBox__logoBox">
            <img
              src="suplaier_horizontal celeste.png"
              alt="logo_suplaier"
              className="signupPage__centralbox__titleBox__logoBox__logoImg"
            />
          </div>
          <a
            href="/"
            className="breadcrumb-link paragraph paragraph--white paragraph--mid"
          >
            Registro
          </a>
          <span className="material-symbols-rounded icon-white icon--sm">
            arrow_forward_ios
          </span>
          <p className="breadcrumb-link__active paragraph paragraph--white paragraph--mid">
            Selecciona tu rol
          </p>
        </div>
        <div className="signupPage__centralbox__contentBox">
          <div className="signupPage__centralbox__contentBox__izq">
            <img
              src="comprador_registro.jpeg"
              alt="logo_suplaier"
              className="signupPage__centralbox__contentBox__izq__img"
            />
            <Link to={`/signup_comprador`}>
              <button className="btn btn--blue">Comprador</button>
            </Link>
          </div>
          <div className="signupPage__centralbox__contentBox__der">
            <img
              src="proveedor_v2.jpeg"
              alt="logo_suplaier"
              className="signupPage__centralbox__contentBox__der__img"
            />
            <Link to={`/signup_proveedor`}>
              <button className="btn btn--green">Proveedor</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
