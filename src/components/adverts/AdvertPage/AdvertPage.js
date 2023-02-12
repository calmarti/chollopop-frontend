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
    console.log(match.params)
    const id = match.params.id;
    getAdvert(id)
      .then(({result}) => setAdvert(result))
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
    <Layout history={history} bgColor={"var(--shade-color-1)"} {...props}>
      <div className="custom-detail-card-container">
     
        <img
          className="custom-detail-card-image"
          // src={advert.photo ? `http://127.0.0.1:3001${advert.photo}` : placeholder}
          src={`https://loremflickr.com/320/240`}
          alt={advert.name}
        />

        <div className="custom-detail-card-content-and-button">

          <p className="custom-detail-price">{advert.price}€</p>
          <p className="custom-detail-card-title">{advert.name}</p>
          <div className="card-badge">
          <p className="card-tags custom-card-badge">
            {advert.tags ? advert.tags.join("  ") : advert.tags}
            {/* &nbsp;{" "} */}
          </p>
          </div>
         
          <p className="custom-detail-card-sale">{advert.sale ? "Venta" : "Compra"}</p>

          <button
          className="custom-card-delete-button"
          onClick={modalProps.showModal}
          
        >
          Borrar
        </button>
        <div className="modal" tabIndex="-1"></div>
      </div>
      <Modal handleClick={handleDelete} {...modalProps} />
        </div>       
    </Layout>
  );
}

AdvertPage.propTypes = {
  match: types.object.isRequired,
  history: types.object.isRequired,
};
