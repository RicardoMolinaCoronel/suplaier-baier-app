import { useForm } from "../../hooks";
//import country from "country-list-js";
import { useEffect, useState } from "react";
import { provincias } from "../../data";
import { AccionExitosaAuth } from "./AccionExitosaAuth";
import { apiUrl } from "../../apiUrl";
import { TerminosPage } from "../pages";
//import { ValidacionCedulaRucService } from "../helpers/validacionesRuc";

export const FormRegistrarComprador = () => {
  // const listaPaises = country.names();
  // const listaCiudadesEcuador = listaCiudades;
  // const [esEcuador, setEsEcuador] = useState(false);
  const [showAccionExitosa, setShowAccionExitosa] = useState(false);
  const [listaCiudadesUser, setListaCiudadesUser] = useState([]);
  const [tipoIdSelected, setTipoIdSelected] = useState("");
  const [imgExists, setImgExists] = useState(false);
  const [imagen, setImagen] = useState("no-img.jpeg");
  const [showTerminos, setShowTerminos] = useState(false);

  //validaciones
  const [esUsuarioValido, setEsUsuarioValido] = useState(false);
  const [esNumeroValido, setEsNumeroValido] = useState(false);
  const [esNombreValido, setEsNombreValido] = useState(false);
  const [esIdentificacionValido, setEsIdentificacionValido] = useState(false);
  const [esContrasenaValido, setEsContrasenaValido] = useState(false);
  const [esEmailValido, setEsEmailValido] = useState(false);
  const [esCiudadValido, setEsCiudadValido] = useState(false);
  const [esConfValido, setEsConfValido] = useState(false);
  const [mostrarMensjeUsuario, setMostrarMensajeUsuario] = useState(false);

  const regexUsername = /^[a-zA-Z0-9_]{3,30}$/;
  const {
    formState,
    Nombre,
    Identificacion,
    Usuario,
    Contrasena,
    ContrasenaConf,
    Email,
    urlImg,
    Numero,
    TipoId,
    Provincia,
    Ciudad,
    direccion,
    onInputChange,
    setNameValueEmpty,
  } = useForm({
    IdRol: 1,
    Nombre: "",
    Identificacion: "",
    Usuario: "",
    Contrasena: "",
    Email: "",
    Numero: "",
    Pais: "Ecuador",
    Provincia: "",
    Ciudad: "",
    Direccion: "",
    TipoId: "Cédula",
    ContrasenaConf: "",
    urlImg: imagen,
  });

  const uploadUser = async () => {
    const newBody = {
      ...formState,
      // eslint-disable-next-line
      ["urlImg"]: imagen,
    };

    const body = newBody;
    const resp = await fetch(`${apiUrl}/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await resp.json();

    console.log(data);
  };

  useEffect(() => {
    checkValidUsernameTR();
    setEsUsuarioValido(true);
  }, [Usuario]);

  useEffect(() => {
    setEsNumeroValido(true);
  }, [Numero]);

  useEffect(() => {
    setEsNombreValido(true);
  }, [Nombre]);

  useEffect(() => {
    setEsEmailValido(true);
  }, [Email]);

  useEffect(() => {
    setEsIdentificacionValido(true);
  }, [Identificacion]);

  useEffect(() => {
    setEsContrasenaValido(true);
  }, [Contrasena]);

  useEffect(() => {
    setEsCiudadValido(true);
  }, [Ciudad]);

  useEffect(() => {
    setEsConfValido(true);
  }, [ContrasenaConf]);

  function allInvalid(input) {
    input.classList.remove("is-valid");
    input.classList.remove("is-invalid");
  }

  function makeInvalid(input) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
  }
  function makeValid(input) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
  }
  function hideMessage(message) {
    message.classList.add("none");
  }

  const changeUsernameInputStyle = (isValid) => {
    let input = document.getElementById("compradorUsuario");
    if (input.value.length > 2) {
      if (isValid) {
        makeValid(input);
        setMostrarMensajeUsuario(true);
        setEsUsuarioValido(true);
      } else {
        makeInvalid(input);
        setMostrarMensajeUsuario(false);
        setEsUsuarioValido(false);
      }
    } else {
      setMostrarMensajeUsuario(false);
      allInvalid(input);
      hideMessage(document.getElementById("mensaje-valid"));
      setEsUsuarioValido(false);
    }
  };

  const checkValidUsernameTR = async () => {
    if (!regexUsername.test(Usuario)) changeUsernameInputStyle(false);
    const resp = await fetch(`${apiUrl}/validarusuario?username=${Usuario}`);
    const data = await resp.json();
    const { rows: result } = !!data && data;
    if (result.length === 0) return changeUsernameInputStyle(true);
    else changeUsernameInputStyle(false);
  };

  //metodos validaciones
  const checkValidUsername = async () => {
    if (!regexUsername.test(Usuario)) {
      setEsUsuarioValido(false);
      return;
    }
    const resp = await fetch(`${apiUrl}/validarusuario?username=${Usuario}`);
    const data = await resp.json();
    const { rows: result } = !!data && data;
    setEsUsuarioValido(result.length === 0);
    return;
  };

  const validarTodosCampos = () => {
    //se setean todos los campos validadores
    return new Promise((resolve, reject) => {
      checkValidUsername();

      const regexEmail = /^\w+([-]?\w+)*@\w+([-]?\w+)*(.\w{2,3})+$/;
      const regexNumero =
        /^[+]?[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4,6}$/im;
      const regexCedula = /^[0-9]{9}[-]?[0-9][-]?([0-9]{3})?$/;
      const regexContrasena = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
      const regexNombre =
        /^[a-zA-ZàáąčćęèéįìíòóùúýźñçÀÁĄĆĘÈÉÌÍÒÓÙÚŲÝŹÑÇ']+[ -][a-zA-ZàáąčćęèéįìíòóùúýźñçÀÁĄĆĘÈÉÌÍÒÓÙÚŲÝŹÑÇ ,.'-]+$/;
      const regexCiudad =
        /^[a-zA-ZàáąčćęèéįìíòóùúýźñçÀÁĄĆĘÈÉÌÍÒÓÙÚŲÝŹÑÇ']+([ -][a-zA-ZàáąčćęèéįìíòóùúýźñçÀÁĄĆĘÈÉÌÍÒÓÙÚŲÝŹÑÇ ,.'-]+)?$/;

      if (
        esUsuarioValido &&
        regexCiudad.test(Ciudad) &&
        regexCedula.test(Identificacion) &&
        regexNombre.test(Nombre) &&
        regexEmail.test(Email) &&
        regexNumero.test(Numero) &&
        regexContrasena.test(Contrasena) &&
        Contrasena === ContrasenaConf
      ) {
        resolve(true);
      } else {
        setEsCiudadValido(regexCiudad.test(Ciudad));
        setEsIdentificacionValido(regexCedula.test(Identificacion));
        setEsNombreValido(regexNombre.test(Nombre));
        setEsEmailValido(regexEmail.test(Email));
        setEsNumeroValido(regexNumero.test(Numero));
        setEsContrasenaValido(
          regexContrasena.test(Contrasena) && Contrasena !== ContrasenaConf
        );
        setEsConfValido(Contrasena === ContrasenaConf);
        reject(false);
      }
    });
  };

  const getImg = async (urlImg) => {
    const reader = new FileReader();
    reader.readAsDataURL(urlImg);
    reader.onloadend = () => {
      const base64data = reader.result;
      setImagen(base64data);
    };
  };

  const onRegistrarComprador = (e) => {
    e.preventDefault();
    validarTodosCampos()
      .then((res) => {
        setShowTerminos(true);
      })
      //.then(res => uploadUser().then(setShowAccionExitosa(true)))
      .catch((res) => {
        console.warn("Usuario no válido");
      });
  };

  const printStates = () => {
    let childrenArray = [];
    for (const key in provincias) {
      const nombre_provincia = provincias[key].provincia;
      const nom =
        nombre_provincia.charAt(0) +
        nombre_provincia.substring(1).toLowerCase();
      childrenArray.push(
        <option value={nom} key={nom}>
          {" "}
          {nom}
        </option>
      );
    }

    return childrenArray;
  };

  useEffect(() => {
    let lista = [];
    for (const key in provincias) {
      if (provincias[key].provincia === Provincia.toUpperCase()) {
        let resList = provincias[key].cantones;
        for (const key in resList) {
          const ciudadNombre = resList[key].canton;
          lista.push(
            ciudadNombre.charAt(0) + ciudadNombre.substring(1).toLowerCase()
          );
        }
      }
    }
    setListaCiudadesUser(lista);
  }, [Provincia]);

  useEffect(() => {
    setTipoIdSelected(TipoId);
  }, [TipoId]);

  useEffect(() => {
    //aqui se debe validar el url
    if (urlImg !== "no-img.jpeg") {
      setImgExists(true);
      getImg(urlImg);
    } else {
      setImgExists(false);
    }
  }, [urlImg]);

  const onDeleteImg = () => {
    setImgExists(false);
    const inp = document.getElementById("formSubirLogo");
    inp.value = "";
    setNameValueEmpty("urlImg");
  };

  return (
    <div>
      <form onSubmit={onRegistrarComprador}>
        <div className="compraProducto__box">
          <p className="paragraph">Ingresar los siguientes datos:</p>
          <hr className="hrGeneral" />
          <div className="u-margin-top-small"></div>
          <div className="formRegistrarComp__twoInputsBox">
            <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
              <div className="formRegistrarComp__twoInputsBox__izq__labelInput">
                <label
                  htmlFor="compradorUsuario"
                  align="right"
                  className="paragraph--sm formRegistrarComp__label"
                >
                  Usuario
                </label>
                <div className="formRegistrarComp__boxError">
                  <input
                    id="compradorUsuario"
                    autoComplete="off"
                    type="text"
                    placeholder="jrodriguez"
                    className="formRegistrarComp__input paragraph"
                    name="Usuario"
                    value={Usuario}
                    onChange={onInputChange}
                    required
                  />
                  {!esUsuarioValido && (
                    <div
                      id="mensaje-invalid"
                      className="mensajeUsuarioValido--container invalid"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="red"
                        className="bi bi-file-excel-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5.884 4.68 8 7.219l2.116-2.54a.5.5 0 1 1 .768.641L8.651 8l2.233 2.68a.5.5 0 0 1-.768.64L8 8.781l-2.116 2.54a.5.5 0 0 1-.768-.641L7.349 8 5.116 5.32a.5.5 0 1 1 .768-.64z" />
                      </svg>
                      <p className="paragraph--bold paragraph--danger u-padding-left-small">
                        Usuario no válido
                      </p>
                    </div>
                  )}
                  {mostrarMensjeUsuario && (
                    <div
                      id="mensaje-valid"
                      className="mensajeUsuarioValido--container valid"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="green"
                        className="bi bi-bookmark-check-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
                        />
                      </svg>
                      <p className="paragraph--bold paragraph--succesfull u-padding-left-small">
                        Usuario válido
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
              <div className="formRegistrarComp__twoInputsBox__izq__labelInput">
                <label
                  htmlFor="compradorName"
                  align="right"
                  className="paragraph--sm formRegistrarComp__label"
                >
                  Nombre
                </label>
                <div className="formRegistrarComp__boxError">
                  <input
                    id="compradorName"
                    type="text"
                    placeholder="Juan Rodríguez"
                    className="formRegistrarComp__input paragraph"
                    name="Nombre"
                    value={Nombre}
                    onChange={onInputChange}
                    required
                  />
                  {!esNombreValido && (
                    <p className="paragraph--red u-padding-left-small">
                      Nombre y apellido no válidos
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="formRegistrarComp__twoInputsBox">
            <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
              <div className="formRegistrarComp__twoInputsBox__izq__labelInput">
                <label
                  htmlFor="compradorContrasena"
                  align="right"
                  className="paragraph--sm formRegistrarComp__label"
                >
                  Contraseña
                </label>
                <div className="formRegistrarComp__boxError">
                  <input
                    id="compradorContrasena"
                    type="password"
                    placeholder="contrasena123!"
                    className="formRegistrarComp__input paragraph"
                    name="Contrasena"
                    value={Contrasena}
                    onChange={onInputChange}
                    required
                  />
                  {!esContrasenaValido && (
                    <p className="paragraph--red u-padding-left-small">
                      Su contraseña debe contener al menos 1 dígito, 1 letra
                      mayúscula y minúscula y ser mayor a 8 caracteres.
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
              <div className="formRegistrarComp__twoInputsBox__izq__labelInput">
                <label
                  htmlFor="compradorContrasenaConf"
                  align="right"
                  className="paragraph--sm formRegistrarComp__label"
                >
                  Confirmar
                </label>
                <div className="formRegistrarComp__boxError">
                  <input
                    id="compradorContrasenaConf"
                    type="password"
                    placeholder="contrasena123!"
                    className="formRegistrarComp__input paragraph"
                    name="ContrasenaConf"
                    value={ContrasenaConf}
                    onChange={onInputChange}
                    required
                  />
                  {!esConfValido && (
                    <p className="paragraph--red u-padding-left-small">
                      Contraseñas no coinciden
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="formRegistrarComp__twoInputsBox">
            <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
              <div className="formRegistrarComp__twoInputsBox__izq__labelInput">
                <label
                  htmlFor="identificacionUser"
                  align="right"
                  className="paragraph--sm formRegistrarComp__label"
                >
                  Tipo ID
                </label>
                <div className="formRegistrarComp__boxError">
                  <select
                    id="identificacionUser"
                    name="TipoId"
                    className="formRegistrarComp__input paragraph"
                    onChange={onInputChange}
                  >
                    <option defaultValue={"none"}>Cédula</option>
                    <option>RUC</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
              <div className="formRegistrarComp__twoInputsBox__izq__labelInput">
                <label
                  htmlFor="compradorIdentificacion"
                  align="right"
                  className="paragraph--sm formRegistrarComp__label"
                >
                  {tipoIdSelected}
                </label>
                <div className="formRegistrarComp__boxError">
                  <input
                    id="compradorIdentificacion"
                    type="text"
                    placeholder={
                      tipoIdSelected === "Cédula"
                        ? "0987650947"
                        : "0987650947-001"
                    }
                    className="formRegistrarComp__input paragraph"
                    name="Identificacion"
                    pattern="^[0-9]{9}[-]?[0-9][-]?([0-9]{3})?$"
                    value={Identificacion}
                    onChange={onInputChange}
                    required
                  />
                  {!esIdentificacionValido && (
                    <p className="paragraph--red u-padding-left-small">
                      {tipoIdSelected} no válida
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="formRegistrarComp__twoInputsBox">
            <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
              <div className="formRegistrarComp__twoInputsBox__izq__labelInput">
                <label
                  htmlFor="compradorEmail"
                  align="right"
                  className="paragraph--sm formRegistrarComp__label"
                >
                  E-mail
                </label>
                <div className="formRegistrarComp__boxError">
                  <input
                    id="compradorEmail"
                    type="text"
                    placeholder="example@gmail.com"
                    className="formRegistrarComp__input paragraph"
                    name="Email"
                    value={Email}
                    onChange={onInputChange}
                    required
                  />
                  {!esEmailValido && (
                    <p className="paragraph--red u-padding-left-small">
                      Email no válido
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
              <div className="formRegistrarComp__twoInputsBox__izq__labelInput">
                <label
                  htmlFor="compradorCelular"
                  align="right"
                  className="paragraph--sm formRegistrarComp__label"
                >
                  Celular
                </label>
                <div className="formRegistrarComp__boxError">
                  <input
                    id="compradorCelular"
                    type="text"
                    placeholder="0998950947"
                    className="formRegistrarComp__input paragraph"
                    name="Numero"
                    value={Numero}
                    onChange={onInputChange}
                    required
                  />
                  {!esNumeroValido && (
                    <p className="paragraph--red u-padding-left-small">
                      Número no válido
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="formRegistrarComp__twoInputsBox">
            <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
              <div className="formRegistrarComp__twoInputsBox__izq__labelInput">
                <label
                  htmlFor="compradorPais"
                  align="right"
                  className="paragraph--sm formRegistrarComp__label"
                >
                  Provincia
                </label>
                <div className="formRegistrarComp__boxError">
                  <select
                    name="Provincia"
                    className="formRegistrarComp__input paragraph"
                    onChange={onInputChange}
                  >
                    <option defaultValue={"none"}>Seleccionar Provincia</option>
                    {printStates()}
                  </select>
                  {Provincia === "Seleccionar Provincia" && (
                    <p className="paragraph--red u-padding-left-small">
                      Seleccione una provincia
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
              <div className="formRegistrarComp__twoInputsBox__izq__labelInput">
                <label
                  htmlFor="compradorCiudad"
                  align="right"
                  className="paragraph--sm formRegistrarComp__label"
                >
                  Ciudad
                </label>
                <div className="formRegistrarComp__boxError">
                  <select
                    id="compradorCiudad"
                    name="Ciudad"
                    className="formRegistrarComp__input paragraph"
                    onChange={onInputChange}
                  >
                    <option defaultValue={"none"}>Seleccionar Ciudad</option>
                    {listaCiudadesUser?.map((ciudad) => (
                      <option value={ciudad} key={ciudad}>
                        {ciudad}
                      </option>
                    ))}
                  </select>
                  {(!esCiudadValido || Ciudad === "Seleccionar Ciudad") && (
                    <p className="paragraph--red u-padding-left-small">
                      Seleccione una ciudad
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="formRegistrarComp__twoInputsBox__one u-margin-top-small">
            <div className="formRegistrarComp__twoInputsBox__one__labelInput">
              <label
                htmlFor="compradorDireccion"
                align="right"
                className="paragraph--sm formRegistrarComp__labelv2"
              >
                Dirección
              </label>
              <textarea
                id="compradorDireccion"
                type="text"
                placeholder="Sauces 8 Calle 13"
                className="formRegistrarComp__textArea paragraph"
                name="Direccion"
                value={direccion}
                onChange={onInputChange}
                required
              />
            </div>
          </div>
          <div className="formRegistrarComp__twoInputsBox">
            <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
              <div className="formRegistrarComp__twoInputsBox__izq__labelInput">
                <label
                  align="right"
                  htmlFor="formSubirLogo"
                  className="paragraph--sm formRegistrarComp__label"
                >
                  Logo
                </label>
                <div className="formRegistrarComp__boxError">
                  <input
                    id="formSubirLogo"
                    type="file"
                    placeholder="Subir imagen o foto de su cuenta"
                    className="formSubirProducto__inputBox__input paragraph paragraph--grey--2"
                    name="urlImg"
                    accept="image/*"
                    onChange={onInputChange}
                  />
                </div>
              </div>
            </div>
            {imgExists && (
              <div className="formRegistrarComp__twoInputsBox__izq u-margin-top-small">
                <label
                  align="right"
                  htmlFor="formSubirProdImagen"
                  className="paragraph--sm paragraph--bold formSubirProducto__label"
                ></label>
                <div className="formRegistrarComp__twoInputsBox__izq__logoBox">
                  <span
                    className="material-symbols-rounded icon-white deleteIconImg"
                    onClick={onDeleteImg}
                  >
                    cancel
                  </span>
                  <img
                    src={imagen}
                    alt={urlImg}
                    className="formRegistrarComp__twoInputsBox__izq__logoBox__logo"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="metodoPago__btnBox">
          <button type="submit" className="btn btn--blue">
            Continuar
          </button>
        </div>
        <div>
          {showAccionExitosa && (
            <AccionExitosaAuth
              texto={"¡Se ha registrado exitosamente!"}
              setShowAccionExitosa={setShowAccionExitosa}
            />
          )}
        </div>
      </form>
      {showTerminos && (
        <TerminosPage
          uploadUser={uploadUser}
          setShowAccionExitosa={setShowAccionExitosa}
          setShowTerminos={setShowTerminos}
        />
      )}
    </div>
  );
};
