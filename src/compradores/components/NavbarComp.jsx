import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth";
import { Buscador } from "../../ui";

export const NavbarComp = () => {

  const {logout} = useContext(AuthContext);

  const nagivate = useNavigate();

  const onClickOfertas = () => {
    nagivate("/historial_ofertas");
  }

  return (
    <div className="navigation">
      <div className="navigation__icon">
        <Link to={"/comprador"} className="navigation__icon__text">
          <p className="paragraph"> SUPLAIER LOGO </p>
        </Link>
      </div>
      <div className="navigation__search">
        <Buscador/>
      </div>
      <div className="navigation__leftButtons">
        <div className="navigation__leftButtons__box">
          <div 
            className="navigation__leftButtons__box__ind" 
            onClick={() => {console.log("notificaciones..")}}
          >
            <span className="material-symbols-rounded icon--bg">
              notifications
            </span>
            <p className="paragraph--sm">Alertas</p>
          </div>
          <div 
            className="navigation__leftButtons__box__ind"
            onClick={onClickOfertas}
          >
            <span className="material-symbols-rounded icon--bg">
              import_contacts
            </span>
            <p className="paragraph--sm">Ofertas</p>
          </div>
          <div 
            className="navigation__leftButtons__box__ind"
            onClick={() => logout()}
          >
            <span className="material-symbols-rounded icon--bg">
              person
            </span>
            <p className="paragraph--sm">Cuenta</p>
          </div>
        </div>
      </div>
    </div>
  )
}
