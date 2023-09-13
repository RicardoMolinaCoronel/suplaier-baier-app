import { useNavigate } from "react-router-dom";
import {PopupAceptado} from "./PopupAceptado"
import React, { useState } from 'react';
export const CardSolicitudRegistro = ({solicitud}) => {
    const dateObj = new Date(solicitud.FechaSolicitud);
    const navigate = useNavigate();

    const [isPopupOpen, setIsPopupOpen] = useState(false);

  
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleConfirm = () => {
    closePopup();
  };
    
    const onClickSolicitud = () => {
        console.log("Aceptando solicitud")
        console.log(solicitud.IdSolicitud)
        navigate(`/solicitud/${solicitud.IdSolicitud}`);
      }
    
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      };

    const onAceptarSolicitud = async() => {
      openPopup();
      const body = solicitud;
      const postresp = await fetch(`http://localhost:4000/api/v1/usuarios`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      const data = await postresp.json()
      console.log(data);
      const delresp = await fetch(`http://localhost:4000/api/v1/solicitudregistro/${solicitud.IdSolicitud}`, {
        method: 'DELETE',
      });
      
    }
  
    const onRechazarSolicitud = async() => {
      const body = solicitud;
      const delresp = await fetch(`http://localhost:4000/api/v1/solicitudregistro/${solicitud.IdSolicitud}`, {
        method: 'DELETE',
      });
    }
  
    return (
      <div className="cardSolicitudContainer" onClick={onClickSolicitud}>
         <PopupAceptado isOpen={isPopupOpen} onConfirm={handleConfirm} />
        <div className="cardSolicitudContainer--datosUser" >
          <p className="paragraph"><b>{solicitud.Nombre}</b></p>
          <p className="paragraph">{solicitud.Email}</p>
          <p className="paragraph">Fecha solicitud: {dateObj.toLocaleString(undefined, options)} </p>
        </div>
        <div className="cardSolicitudContainer--botonesBox">
          <button
            onClick={onAceptarSolicitud}
            className="cardSolicitudContainer--botonesBox--btnAceptar"
          >
            Aceptar
          </button>
         
          <button
            onClick={onRechazarSolicitud}
            className="cardSolicitudContainer--botonesBox--btnRechazar"
          >
            Rechazar
          </button>
        </div>
      </div>
    )
  }