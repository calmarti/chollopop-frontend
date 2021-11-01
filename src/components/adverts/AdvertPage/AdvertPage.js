import types, { func } from "prop-types";
import { useState, useEffect, Fragment } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../../layout/Layout";
import { getAdvert } from "../service";

//TODO: Falta la cancelación de la petición (getAdvert) en el useEffect (ver clase 5 a partir de min 2:37)

export default function AdvertPage({ match, ...props }) {
  const [advert, setAdvert] = useState([]); // null en vez de [] para que renderice la 1º vez pero debería ser null!
  const [error, setError] = useState(null);

  useEffect( async () => {
    const id = match.params.id;
    try {
      const advert = await getAdvert(id);
      setAdvert(advert);
    } 
    catch (error) {
      setError(error);
      console.log(error);
    }
    }, []);


if (error && error.response.data.statusCode === 404) {
    console.log(error.response.data.statusCode)
  return <Redirect to="/404" />;
}

  return (
    <Layout {...props}>
      <div className="item-card">
        <Fragment>
          {" "}
          {/*al final este Fragment es superfluo y si dejas el div debes quitarlo! */}
          <h2>{advert.name}</h2>
          {/*<img src="">FOTO</img>*/}
          <p>{advert.price}</p>
          <p>{advert.sale ? "Venta" : "Compra"}</p>
          <p>{advert.tags /* .join(" ") */}</p> {/*arreglar esto*/}
        </Fragment>
      </div>
      <div>{match.params.id}</div>
    </Layout>
  );
}

AdvertPage.propTypes = {};
