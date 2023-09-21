import { useContext, useEffect, useState } from "react";
import { apiUrl } from "../../../apiUrl";
import { AuthContext } from "../../../auth";
import { ContActividades, OfertaCard } from "../../../components"
import { ContMenu } from "../../../components/cont_menu/ContMenu"
import { ProdOfertaButtonBox } from "../../components";

export const OfePenPageProv = () => {

  const [ofertasTodos, setOfertasTodos] = useState([]);
  const [ofertasTodos2, setOfertasTodos2] = useState([]);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');

  const {authState} = useContext(AuthContext);
  const {user} = authState;

  const handleSeleccion = (event) => {
    const opcionSeleccionada = event.target.value;
    setOpcionSeleccionada(opcionSeleccionada);

    console.log(`Opción seleccionada: ${opcionSeleccionada}`);
  };
  
  const getOfertasTodos = async() => {
    //ofertas finalizadas
    const resp = await fetch(`${apiUrl}/ofertas?idProveedor=${user.IdUsuario}&idEstadosOferta=${11}`);
    const data = await resp.json();
    const {rows: ofertas} = !!data && data;
    setOfertasTodos(ofertas);
  }

  const getOfertasTodos2 = async() => {
    //ofertas finalizadas
    const resp = await fetch(`${apiUrl}/ofertas?idProveedor=${user.IdUsuario}&idEstadosOferta=${3}`);
    const data = await resp.json();
    const {rows: ofertas} = !!data && data;
    setOfertasTodos2(ofertas);
  }

  const getOfertasPorFechaMayor = async() => {
    const resp = await fetch(`${apiUrl}/ofertas/orderFechaMayor?idProveedor=${user.IdUsuario}&idEstadosOferta=${11}`);
    const data = await resp.json();
    const {rows: ofertasM} = !!data && data;
    setOfertasTodos(ofertasM);
  }

  const getOfertasPorFechaMayor2 = async() => {
    const resp = await fetch(`${apiUrl}/ofertas/orderFechaMayor?idProveedor=${user.IdUsuario}&idEstadosOferta=${3}`);
    const data = await resp.json();
    const {rows: ofertasM} = !!data && data;
    setOfertasTodos2(ofertasM);
  }

  const getOfertasPorFechaMenor = async() => {
    const resp = await fetch(`${apiUrl}/ofertas/orderFechaMenor?idProveedor=${user.IdUsuario}&idEstadosOferta=${11}`);
    const data = await resp.json();
    const {rows: ofertasm} = !!data && data;
    setOfertasTodos(ofertasm);
  }

  const getOfertasPorFechaMenor2 = async() => {
    const resp = await fetch(`${apiUrl}/ofertas/orderFechaMenor?idProveedor=${user.IdUsuario}&idEstadosOferta=${3}`);
    const data = await resp.json();
    const {rows: ofertasm} = !!data && data;
    setOfertasTodos2(ofertasm);
  }

  const seleccionFilter = async(opcionSeleccionada) => {
    switch (opcionSeleccionada) {
      case "opcionFechaM":
        getOfertasPorFechaMayor()
        break;
      case "opcionFecham":
        getOfertasPorFechaMenor()
        break;
      default:
        getOfertasTodos();
        getOfertasTodos2();
      break;
    }
  }

  useEffect(() => {
    seleccionFilter(opcionSeleccionada);
  }, [opcionSeleccionada]);

  useEffect(() => {
    getOfertasTodos();
    getOfertasTodos2();
    // eslint-disable-next-line
  }, [])


  const showEmptyArray = ofertasTodos?.length === 0;

  return (
    <div className="comp-main-container u-margin-top-navbar">
      <div className="comp-main-container__izqCont">
        <ContMenu/>
        <ProdOfertaButtonBox/>
      </div>
      <div className="comp-main-container__divSepIzq"></div>
      <div className="comp-main-container__medCont">
        <div className="comp-main-container__medCont__ofertas">
          <div className="explorarCat__title">
            <span className="material-symbols-rounded icon-grey icon--sm">
              arrow_forward_ios
            </span>
            <p className="paragraph--mid"><b>Ofertas Pendientes</b></p>
            <div></div>
              <span className="material-symbols-rounded icon-grey icon--bg">
              filter_list
            </span>
                   <select value={opcionSeleccionada} onChange={handleSeleccion} className="formSubirProducto__inputBox__selectFilter">
                     <option value="todos">Todas</option>
                     <option value="opcionFechaM">Fecha de cierre - Mayor a menor</option>
                     <option value="opcionFecham">Fecha de cierre - Menor a mayor</option>
                   </select>
          </div>
          <hr className="hrGeneral"/>
          {showEmptyArray
          ? <p className="paragraph">Por el momento no hay ofertas pendientes.</p>
          :
          ofertasTodos?.map(oferta => (
            <OfertaCard 
              key={oferta.IdOferta}
              oferta={oferta}
            />
          ))}
          {
          ofertasTodos2?.map(oferta => (
            <OfertaCard 
              key={oferta.IdOferta}
              oferta={oferta}
            />
          ))
          }
        </div>
      </div>
      <div className="comp-main-container__divSepDer"></div>
      <div className="comp-main-container__derCont">
        <ContActividades esProveedor={true}/>
      </div>
    </div>
  )
}
