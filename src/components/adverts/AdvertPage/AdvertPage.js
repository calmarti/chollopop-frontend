import types, { func } from "prop-types";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../../layout/Layout";
import { deleteAdvert, getAdvert } from "../service";
import Button from "../../shared/Button";
import Modal from "../../shared/Modal";

//TODO: Falta la cancelación de la petición (getAdvert) en el useEffect (ver clase 5 a partir de min 2:37)


export default function AdvertPage({ match, history, ...props }) {
  const [advert, setAdvert] = useState([]); // null en vez de [] para que renderice la 1º vez pero debería ser null!
  const [error, setError] = useState(null);
  const [isModalOn, setIsModalOn] = useState(false);

  useEffect(async () => {
    const id = match.params.id;
    try {
      const advert = await getAdvert(id);
      setAdvert(advert);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  }, []);

  if (error && error.response.data.statusCode === 404) {
    console.log(error.response.data.statusCode);
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
      <div className="item-card">
        {advert.photo ? (
          <img src={`http://localhost:3001${advert.photo}`} alt={advert.name} />
        ) : (
          <div>"No hay foto"</div>
        )}
        <h2>{advert.name}</h2>
        <p>{advert.price}</p>
        <p>{advert.sale ? "Venta" : "Compra"}</p>
        <p>{advert.tags /* .join(" ") */}</p> {/*arreglar esto*/}
      </div>
      <div>{match.params.id}</div>
      <Button onClick={modalProps.showModal}>Borrar</Button>
      <Modal handleClick={handleDelete} {...modalProps} />
    </Layout>
  );
}

AdvertPage.propTypes = {};
