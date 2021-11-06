import { useEffect, useState, useRef, useContext, Fragment } from "react";
import Layout from "../../layout/Layout";
import { getAdverts } from "../service";
import AuthContext from "../../auth/context";
import { Link } from "react-router-dom";
import types, { func } from "prop-types";
import FilterArea from "./FilterArea";
import './FilterArea.css'
import './AdvertsPage.css';

//TODO: Prioridad: acabar maquetación: login y AdvertPage
//TODO: loader y gestor de errores al hacer llamada al api
//TODO: Falta implementar los filtros 'name' (regex) y price
//TODO: Falta crear componente Empty (se renderiza cuando (a) no hay anuncios del todo o (b) los filtros no corresponden a ningun artículo)
//el componente Empty debe ten un botón que redirija a 'crear anuncio'
//TODO: Crear componente de Error y reutilizar en NewAdvertsPage, AdvertPage y Login
//TODO: Problemilla: al crear anuncio hay que hacer refresh para actualizar la lista; busca un workaround!
//TODO: arreglar error de cannot read properties of undefined (reading 'data') que lanza cuando no hay backend
//TODO: no olvidar los propTypes

export default function AdvertsPage({ list, requestError, ...props }) {
  function Empty(props) {
    return "Empty";
    //TODO: call to action para crear el primer anuncio
  }

  const [adverts, setAdverts] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    price: "",
    //price: "",
    sale: "",
    tags: [""],
  });

  useEffect(() => {
    setAdverts(list);
    console.log(adverts, adverts.length);
  }, [list]);

  useEffect(() => {
    setError(requestError);
  });

  useEffect(() => {

    /* if (filters.name) {
          console.log("name");
          setAdverts((adverts) =>
            adverts.filter((advert) => advert.name === filters.name)
          );
        }*/

    if (filters.sale !== "") {
      setAdverts(list);
      setAdverts((adverts) =>
        adverts.filter((advert) => advert.sale === filters.sale)
      );
    } else {
      setAdverts(list);
    }

    if (JSON.stringify(filters.tags) !== '[""]') {
      //console.log("tags", filters.tags);
      setAdverts((adverts) =>
        adverts.filter(
          (advert) =>
            JSON.stringify(advert.tags) === JSON.stringify(filters.tags)
        )
      );
    }
  }, [filters]);

  return (
    <>
      <FilterArea
        /*  adverts={adverts}
        setAdverts={setAdverts} */
        filters={filters}
        setFilters={setFilters}
      />
      {error ? (
        <div className="error">
          {" "}
          Error {error.statusCode}: {error.message}{" "}
        </div>
      ) : (
        ""
      )}

      <Layout {...props}>
        
          {adverts.length ? (
            <div>
            <ul className="card-list">
              {adverts
                /*                 .filter(
                  (advert) =>
                    advert.sale === filters.sale && advert.tags === filters.tags
                ) */
                .map((advert) => (
                  <li className="card-list-item"
                    key={
                      advert.id
                    } /* onClick={() => history.push(`/adverts/${id}`)} */
                  >
                    <Link className="card-list-item-link" to={`/adverts/${advert.id}`}>
                      <div className="card">
                        <h2>{advert.name}</h2>
                        <p>{advert.price}€</p>
                        <p>{advert.sale ? "Vendo" : "Compro"}</p>
                        <p>{advert.tags.join(", ")}</p>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
            </div>
          ) : (
            <Empty />
          )}
        
      </Layout>
    </>
  );
}

AdvertsPage.propTypes = {};

//export default AdvertsPage;
