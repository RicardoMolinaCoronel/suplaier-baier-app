import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { ContActividades, ContExplorar, ContFavoritos, OfertaCard } from "../../components"
import { getOfertaByCategoriaProducto } from "../../helpers/getOfertaById";
import { apiUrl } from "../../apiUrl";
import { useFetch } from "../../hooks";

export const ProdByCatPage = () => {

  const location = useLocation();

  const {q = ""} = queryString.parse(location.search);


  const {data, isLoading} = useFetch(`${apiUrl}/catProductos?id=${q}`);
  const {rows: categoria} = !!data && data;

  const cat = categoria?.find(cat => cat.IdCatProducto === parseInt(q));
  const {Nombre: nombreCategoria = "none"} = cat || {};

  const ofertas = getOfertaByCategoriaProducto(q);

  // const [ofertas, setOfertas] = useState();

  // const getOfertas = async() => {
  //   const resp = await fetch(`${apiUrl}/publicaciones`);
  //   const data = await resp.json();
  //   const {rows: ofertas} = !!data && data;
  //   setOfertasTodos(ofertas);
  // }

  // useEffect(() => {
  //   getOfertas();
  // }, [q])
  
  
  const showError = (q.length > 0) && ofertas.length === 0;

  return (
    <div className="comp-main-container u-margin-top-navbar">
      <div className="comp-main-container__izqCont">
        <ContExplorar/>
        <ContFavoritos/>
      </div>
      <div className="comp-main-container__divSepIzq"></div>
      <div className="comp-main-container__medCont">
        <div className="comp-main-container__medCont__ofertas">
        <div className="explorarCat__title">
          <span className="material-symbols-rounded icon-grey icon--sm">
              arrow_forward_ios
          </span>
          <p className="paragraph--mid"><b>Productos por categoría: {isLoading ? "Cargando..." :nombreCategoria}</b></p>
          </div>
          <hr className="hrGeneral"/>
          <div className="u-margin-top-small"></div>
          {ofertas.map(oferta => (
            <OfertaCard
              key={oferta.idOferta}
              oferta={oferta}
            />
          ))}
          <div 
            className="busqueda__errorBusqueda" 
            style={{display : showError ? '' : 'none'}}
          >
            <p className="paragraph"> No se han encontrado ofertas</p>
          </div>
        </div>
      </div>
      <div className="comp-main-container__divSepDer"></div>
      <div className="comp-main-container__derCont">
        <ContActividades/>
      </div>
    </div>
  )
}
