import { FormRegistrarComprador } from "../components";

export const SignupComprador = () => {
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
          <a className="breadcrumb-link paragraph paragraph--white paragraph--mid">
            Registro
          </a>
          <span className="material-symbols-rounded icon-white icon--sm">
            arrow_forward_ios
          </span>
          <a
            href="/signup"
            className="breadcrumb-link paragraph paragraph--white paragraph--mid"
          >
            Selecciona tu rol
          </a>
          <span className="material-symbols-rounded icon-white icon--sm">
            arrow_forward_ios
          </span>
          <p className="breadcrumb-link__active paragraph paragraph--white paragraph--mid">
            Comprador
          </p>
        </div>
        <div className="signupPage__centralbox__contentBox">
          <div className="signupPage__centralbox__contentBox__comp__izq">
            <FormRegistrarComprador />
          </div>
          <div className="signupPage__centralbox__contentBox__comp__der">
            <p className="paragraph paragraph--white paragraph--mid">
              Registrando como comprador
            </p>
            <span className="material-symbols-rounded icon-white icon--super-big">
              storefront
            </span>
            <p
              className="paragraph paragraph--white paragraph--mid--2"
              align="center"
            >
              <span className="material-symbols-rounded">tips_and_updates</span>
              Siendo pyme, podrás acceder a mayores descuentos en productos de
              compras al por mayor utilizando el método de ofertas colaborativas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
