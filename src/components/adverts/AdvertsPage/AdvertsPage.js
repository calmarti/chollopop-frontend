import { useEffect, useState, useContext, Fragment } from "react";
import Layout from "../../layout/Layout";
import { getAdverts } from "../service";
import AuthContext from "../../auth/context";
import { Link } from "react-router-dom";
import types, { func } from "prop-types";
import FilterArea from "./FilterArea"

//TODO: crear un componente tipo Empty list: <Empty /> con una call to action a crear un nuevo anuncio
//TODO: loader y gestor de errores al hacer llamada al api

function Empty(props) {
  return "Empty";
}

export default function AdvertsPage({ ...props }) {
  const [adverts, setAdverts] = useState([]);

  useEffect(() => {
    getAdverts()
      .then((adverts) => setAdverts(adverts))
      .catch((error) => console.log(error));
  }, []);
  /* style = {{backgroundColor: 'blue'}} */

  return (
    <Fragment>
      <FilterArea />
      <Layout {...props}>
      <div className="">
        {adverts.length ? (
          <ul>
            {adverts.map(({ id, name, price, sale, tags, photo }) => (
              <li key={id} /* onClick={() => history.push(`/adverts/${id}`)} */>
                <Link to={`/adverts/${id}`}>
                  <div className="item-card">
                    <h2>{name}</h2>
                    <p>{price}</p>
                    <p>{sale ? "Venta" : "Compra"}</p>
                    <p>{tags.join(" ")}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <Empty />
        )}
      </div>
    </Layout>
    </Fragment>
  );
}

AdvertsPage.propTypes = {};

//export default AdvertsPage;
