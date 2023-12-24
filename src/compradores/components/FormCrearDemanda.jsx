import { useContext, useEffect, useState } from "react";
import { apiUrl } from "../../apiUrl";
import { AuthContext } from "../../auth";
import { useForm } from "../../hooks";
import { AccionExitosa } from "./AccionExitosa";
import { ResumenDemanda } from "./ResumenDemanda";

export const FormCrearDemanda = () => {
  const { authState } = useContext(AuthContext);
  const { user } = authState;

  const d = new Date();

  const {
    formState,
    idProducto,
    cantMin,
    cantMax,
    descripcion,
    fechaLimite,
    precioMinimo,
    precioMaximo,
    onInputChange,
  } = useForm({
    idProducto: -1,
    idComprador: user.IdUsuario,
    cantMin: 0,
    cantMax: 0,
    precioMinimo: 0,
    precioMaximo: 0,
    descripcion: "",
    actualProductos: 0,
    fechaLimite: "",
    estado: true,
    idEstadoOferta: 1,
  });

  const [productosComp, setProductosComp] = useState([]);
  const [producto, setProducto] = useState({});
  const [productoExiste, setProductoExiste] = useState(false);
  const [imagen, setImagen] = useState();
  const [showResumenDemanda, setShowResumenDemanda] = useState(false);
  const [showAccionExitosa, setShowAccionExitosa] = useState(false);
  const [showAccionErronea, setShowAccionErronea] = useState(false);

  //validadores
  const [esProductoValido, setEsProductoValido] = useState(false);
  const [esDescDemandaValido, setEsDescDemandaValido] = useState(false);
  const [esUnidadesMinValido, setEsUnidadesMinValido] = useState(false);
  const [esUnidadesMaxValido, setEsUnidadesMaxValido] = useState(false);
  const [esPrecioMaxValido, setEsPrecioMaxValido] = useState(false);
  const [esPrecioMinValido, setEsPrecioMinValido] = useState(false);
  const [esFechaValida, setEsFechaValida] = useState(false);

  const checkFechaLimiteisValid = async () => {
    const resp = await fetch(`${apiUrl}/obtenerahora`);
    const data = await resp.json();
    const { rows: ahora } = !!data && data;

    const fechaLocaly1 = d.toLocaleDateString(ahora[0]).split("/");
    const fechaLocaly2 = `${fechaLocaly1[2]}-${
      fechaLocaly1[0].length === 1 ? "0" + fechaLocaly1[0] : fechaLocaly1[0]
    }-${fechaLocaly1[1]}T`;

    const horaLocaly2 = d.toLocaleTimeString(ahora[0]).split(" ");
    const horaLocalyEsp = horaLocaly2[0].split(":"); //hora min sec

    let horaLocaly3 = "";
    horaLocaly2[1] === "AM"
      ? (horaLocaly3 = parseInt(horaLocalyEsp[0]))
      : (horaLocaly3 = 12 + parseInt(horaLocalyEsp[0]));

    const horaResult = `${
      horaLocaly3.toString().length === 1 ? "0" + horaLocaly3 : horaLocaly3
    }:${horaLocalyEsp[1]}:${
      horaLocalyEsp[2].length === 1 ? "0" + horaLocalyEsp[2] : horaLocalyEsp[2]
    }`;
    const horaResultFinal = `${fechaLocaly2}${horaResult}`;
    const fechaLimiteFinal = `${fechaLimite}:00`;
    setEsFechaValida(horaResultFinal < fechaLimiteFinal);
  };

  const validarTodosCampos = () => {
    return new Promise((resolve, reject) => {
      checkFechaLimiteisValid();

      const productoValido =
        idProducto !== "Seleccionar producto" && idProducto !== -1;
      const regexDescripcion =
        /^([a-zA-Z0-9 _-àáąčćęèéįìíòóùúýźñçÀÁĄĆĘÈÉÌÍÒÓÙÚŲÝŹÑÇ,.]){3,500}$/;
      const regexPrecioMinMax = /^((.\d+)|(\d+(.\d+)?))$/;
      const regexUnidadesMinMax = /^[1-9]([0-9]+)?$/;

      if (
        productoValido &&
        regexDescripcion.test(descripcion) &&
        regexPrecioMinMax.test(precioMaximo) &&
        regexPrecioMinMax.test(precioMinimo) &&
        regexUnidadesMinMax.test(cantMin) &&
        regexUnidadesMinMax.test(cantMax)

        //&& (cantMin <= cantMax)
      ) {
        resolve(true);
      } else {
        setEsProductoValido(productoValido);
        setEsPrecioMaxValido(regexPrecioMinMax.test(precioMaximo));
        setEsPrecioMinValido(regexPrecioMinMax.test(precioMinimo));
        setEsDescDemandaValido(regexDescripcion.test(descripcion));
        setEsUnidadesMinValido(regexUnidadesMinMax.test(cantMin));
        setEsUnidadesMaxValido(regexUnidadesMinMax.test(cantMax));

        reject(false);
      }
    });
  };

  const onContinuarCrearDemanda = async (e) => {
    e.preventDefault();
    await validarTodosCampos()
      .then((res) => setShowResumenDemanda(true))
      .catch((res) => console.warn(res));
  };

  const getProductos = async () => {
    const resp = await fetch(
      `${apiUrl}/productos?idProveedor=${user.IdUsuario}`
    );
    const data = await resp.json();
    const { rows: productos } = !!data && data;
    setProductosComp(productos);
  };

  useEffect(() => {
    setEsFechaValida(true);
  }, [fechaLimite]);

  useEffect(() => {
    setEsProductoValido(true);
  }, [idProducto]);

  useEffect(() => {
    setEsPrecioMaxValido(true);
  }, [precioMaximo]);

  useEffect(() => {
    setEsPrecioMinValido(true);
  }, [precioMinimo]);

  useEffect(() => {
    setEsUnidadesMinValido(true);
  }, [cantMin]);

  useEffect(() => {
    setEsUnidadesMaxValido(true);
  }, [cantMax]);

  useEffect(() => {
    setEsDescDemandaValido(true);
  }, [descripcion]);

  useEffect(() => {
    getProductos();
    // eslint-disable-next-line
  }, []);

  const getProductoSelect = async (id) => {
    if (id !== "Seleccionar producto" && id !== -1) {
      const resp = await fetch(`${apiUrl}/productos?id=${id}`);
      const data = await resp.json();
      const { rows: producto } = !!data && data;
      setProductoExiste(true);
      setProducto(producto[0]);
    } else {
      setProductoExiste(false);
    }
  };

  const getImg = async (urlImg, id) => {
    if (id !== "Seleccionar producto" && id !== -1) {
      setImagen(urlImg);
    }
  };

  useEffect(() => {
    getProductoSelect(idProducto);
  }, [idProducto]);

  useEffect(() => {
    getImg(producto.UrlImg, idProducto);
  }, [producto, idProducto]);

  return (
    <form onSubmit={onContinuarCrearDemanda}>
      <div className="compraProducto__box">
        <div className="formSubirProducto u-margin-top-small">
          <label
            htmlFor="formOfertaNombreProd"
            align="right"
            className="paragraph--smResp formRegistrarComp__label"
          >
            <b>Producto</b>
          </label>
          <div className="formRegistrarComp__boxError">
            <select
              id="formOfertaNombreProd"
              name="idProducto"
              className="formRegistrarComp__input paragraph"
              onChange={onInputChange}
            >
              <option defaultValue={"none"}>Seleccionar producto</option>
              {productosComp?.map((prod) => (
                <option value={prod.IdProducto} key={prod.Name}>
                  {prod.Name}
                </option>
              ))}
            </select>
            {!esProductoValido && (
              <p className="paragraph--red u-padding-left-small">
                Por favor seleccione un producto
              </p>
            )}
          </div>
        </div>
        {productoExiste && (
          <div className="formCrearOferta__productoBox u-margin-top-small">
            <div className="formCrearOferta__productoBox__imgBox">
              <img
                className="formCrearOferta__productoBox__imgBox__img"
                src={imagen}
                alt={producto?.Name}
              />
            </div>
            <div className="oferta-detalle__productoBox__desc">
              <div className="oferta-detalle__productoBox__desc__text">
                <p className="paragraph">
                  <b>{producto?.Name}</b>
                </p>
                <p className="paragraph">{producto?.Descripcion}</p>
              </div>
            </div>
          </div>
        )}
        <div className="formSubirProducto u-margin-top-small">
          <label
            htmlFor="formOfertaNombreProd"
            align="right"
            className="paragraph--smResp paragraph--bold formSubirProducto__label"
          >
            <b>Precio mínimo</b>
          </label>
          <input
            type="number"
            placeholder="Precio mínimo para los productos de la demanda"
            className="formSubirProducto__inputBox__input paragraph paragraph--grey--2"
            name="precioMinimo"
            autoComplete="off"
            value={precioMinimo}
            onChange={onInputChange}
            min={1}
            required
          />
          {!esPrecioMinValido && (
            <p className="paragraph--red u-padding-left-small">
              Precio mínimo no válido
            </p>
          )}
        </div>
        <div className="formSubirProducto u-margin-top-small">
          <label
            htmlFor="formOfertaNombreProd"
            align="right"
            className="paragraph--smResp paragraph--bold formSubirProducto__label"
          >
            <b>Precio máximo</b>
          </label>
          <input
            type="number"
            placeholder="Precio máximo para los productos de la demanda"
            className="formSubirProducto__inputBox__input paragraph paragraph--grey--2"
            name="precioMaximo"
            autoComplete="off"
            value={precioMaximo}
            onChange={onInputChange}
            min={1}
            required
          />
          {!esPrecioMaxValido && (
            <p className="paragraph--red u-padding-left-small">
              Precio máximo no válido
            </p>
          )}
        </div>
        <div className="formSubirProducto u-margin-top-small">
          <label
            htmlFor="formOfertaNombreProd"
            align="right"
            className="paragraph--smResp paragraph--bold formSubirProducto__label"
          >
            <b>Descripción</b>
          </label>
          <textarea
            type="text"
            placeholder="Descripción de la demanda"
            className="formSubirProducto__inputBox__textArea paragraph"
            name="descripcion"
            autoComplete="off"
            value={descripcion}
            onChange={onInputChange}
            required
          />
          {!esDescDemandaValido && (
            <p className="paragraph--red u-padding-left-small">
              Descripción no válida
            </p>
          )}
        </div>
        <div className="formSubirProducto u-margin-top-small">
          <label
            htmlFor="formOfertaNombreProd"
            align="right"
            className="paragraph--smResp paragraph--bold formSubirProducto__label"
          >
            <b>Cantidad mínima</b>
          </label>
          <input
            type="number"
            placeholder="Unidades mínimas para cerrar la demanda"
            className="formSubirProducto__inputBox__input paragraph paragraph--grey--2"
            name="cantMin"
            autoComplete="off"
            value={cantMin}
            onChange={onInputChange}
            min={1}
            required
          />
          {!esUnidadesMinValido && (
            <p className="paragraph--red u-padding-left-small">
              Cantidad de unidades mínima no válida
            </p>
          )}
        </div>
        <div className="formSubirProducto u-margin-top-small">
          <label
            htmlFor="formOfertaNombreProd"
            align="right"
            className="paragraph--smResp paragraph--bold formSubirProducto__label"
          >
            <b>Cantidad máxima</b>
          </label>
          <input
            type="number"
            placeholder="Unidades en total a demandar"
            className="formSubirProducto__inputBox__input paragraph paragraph--grey--2"
            name="cantMax"
            autoComplete="off"
            value={cantMax}
            onChange={onInputChange}
            min={1}
            required
          />
          {!esUnidadesMaxValido && (
            <p className="paragraph--red u-padding-left-small">
              Cantidad de unidades en total no válida
            </p>
          )}
        </div>
        <div className="formSubirProducto u-margin-top-small">
          <label
            htmlFor="formOfertaNombreProd"
            align="right"
            className="paragraph--smResp paragraph--bold formSubirProducto__label"
          >
            <b>Fecha límite</b>
          </label>
          <input
            type="date"
            className="paragraph paragraph--grey--2"
            name="fechaLimite"
            autoComplete="off"
            value={fechaLimite}
            onChange={onInputChange}
            required
          />
          {!esFechaValida && (
            <p className="paragraph--red u-padding-left-small">
              Fecha no válida
            </p>
          )}
        </div>
      </div>

      <div className="metodoPago__btnBox">
        <button type="submit" className="btn btn--blue">
          Continuar
        </button>
        {showResumenDemanda && (
          <ResumenDemanda
            formState={formState}
            setShowResumenDemanda={setShowResumenDemanda}
            setShowAccionExitosa={setShowAccionExitosa}
            setShowAccionErronea={setShowAccionErronea}
          />
        )}
        {showAccionExitosa && (
          <AccionExitosa
            texto={"¡Demanda creada con éxito!"}
            showAccionErronea={showAccionErronea}
            setShowAccionErronea={setShowAccionErronea}
            setShowAccionExitosa={setShowAccionExitosa}
          />
        )}
        {showAccionErronea && (
          <AccionExitosa
            texto={"Hubo un error al intentar crear la demanda"}
            showAccionErronea={showAccionErronea}
            setShowAccionErronea={setShowAccionErronea}
            setShowAccionExitosa={setShowAccionExitosa}
          />
        )}
      </div>
    </form>
  );
};
