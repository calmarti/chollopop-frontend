import types from "prop-types";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../../layout/Layout";
import { deleteAdvert, getAdvert } from "../service";
import Button from "../../shared/Button";
import Modal from "../../shared/Modal";
import placeholder from "../../../assets/default_photo.jpg";
import "./AdvertPage.css";
//TODO: IMPORTANTE: Corregir error 401 (inexistente?) al ir al home tras login > new en ciertos casos (el problema está en la redireccion desde App)
//TODO: Falta la cancelación de la petición (getAdvert) en el useEffect (ver clase 5 a partir de min 2:37)

export default function AdvertPage({ match, history, ...props }) {
  const [advert, setAdvert] = useState([]); // null en vez de [] para que renderice la 1º vez pero debería ser null!
  const [error, setError] = useState(null);
  const [isModalOn, setIsModalOn] = useState(false);

  useEffect(async() => {
    try {
      const id = match.params.id;
      const advert = await getAdvert(id);
      setAdvert(advert);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  }, [match.params.id]);

  if (error && error.response.data.statusCode === 404) {
    return <Redirect to="/404" />;
  }

  const modalProps = {
    isModalOn: isModalOn,

    modalMessage: "¿Realmente quieres borrar el anuncio?",

    showModal: () => {
      setIsModalOn(true);
    },

    hideModal: () => {
      setIsModalOn(false);
    },
  };

  const handleDelete = () => {
    deleteAdvert(match.params.id)
      .then(() => modalProps.hideModal())
      .then(() => history.push("/adverts"))
      .catch((error) => setError(error));
  };

  return (
    <Layout history={history} {...props}>
      <div className="card-container">
        <img
          className="card-image"
          src={
            advert.photo ? `http://localhost:3001${advert.photo}` : placeholder
          }
          alt={advert.name}
        />
        <div className="card-info">
          <h2 className="card-title">{advert.name}</h2>
          <p>{advert.price}€</p>
          <p>{advert.sale ? "Vendo" : "Compro"}</p>
          <p className="card-tags">
            Categorías:&nbsp;{" "}
            {advert.tags ? advert.tags.join(", ") : advert.tags}
          </p>
        </div>
        <Button className="card-delete-button" onClick={modalProps.showModal}>
          Borrar
        </Button>
      </div>
      <span>{match.params.id}</span>
      <Modal handleClick={handleDelete} {...modalProps} />
    </Layout>
  );
}

AdvertPage.propTypes = {
  match: types.object.isRequired,
  history: types.object.isRequired,
};
