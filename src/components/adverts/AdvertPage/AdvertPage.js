import types from "prop-types";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../../layout/Layout";
import { deleteAdvert, getAdvert } from "../service";
import Modal from "../../shared/Modal";
import placeholder from "../../../assets/default_photo.jpg";
import Error from "../../shared/Error";
import "./AdvertPage.css";

export default function AdvertPage({ match, history, ...props }) {
  const [advert, setAdvert] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOn, setIsModalOn] = useState(false);

  useEffect(() => {
    const id = match.params.id;
    getAdvert(id)
      .then((advert) => setAdvert(advert))
      // .then((advert) => console.log(advert.photo || ''))
      .catch((error) => setError(error));
  }, [match.params.id]);

  if (error && error.response.data.statusCode === 404) {
    return <Redirect to="/404" />;
  }

  if (error && error.response.data.statusCode !== 404) {
    <Error error={error} />;
  }

  const modalProps = {
    isModalOn: isModalOn,

    modalMessage: "¿Realmente quieres borrar este anuncio?",

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
          src={advert.photo ? `http://127.0.0.1:3001${advert.photo}` : placeholder}
          alt={advert.name}
        />
        <div className="card-info">
          <h2 className="card-title">{advert.name}</h2>
          <p>{advert.price}€</p>
          <p>{advert.sale ? "Vendo" : "Compro"}</p>
          <p className="card-tags">
            {/* &nbsp;{" "} */}
            {advert.tags ? advert.tags.join("  ") : advert.tags}
          </p>
        </div>

        <button
          className="btn btn-md btn-outline-dark card-delete-button"
          onClick={modalProps.showModal}
        >
          Borrar
        </button>
        <div className="modal" tabIndex="-1"></div>
      </div>
      <Modal handleClick={handleDelete} {...modalProps} />
    </Layout>
  );
}

AdvertPage.propTypes = {
  match: types.object.isRequired,
  history: types.object.isRequired,
};
