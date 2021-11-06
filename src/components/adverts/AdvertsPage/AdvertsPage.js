import { useEffect, useState, useRef, useContext, Fragment } from "react";
import Layout from "../../layout/Layout";
import { getAdverts } from "../service";
import AuthContext from "../../auth/context";
import { Link, Redirect } from "react-router-dom";
import types, { func } from "prop-types";
import FilterArea from "./FilterArea";
import Empty from "../../shared/Empty";
import './FilterArea.css'
import './AdvertsPage.css';
import Error from "../../shared/Error";


//TODO: Bajar el mensaje de confirmación tanto del Header como del AdvertPage (borrar anuncio)
//TODO: loader y gestor de errores al hacer llamada al api
//TODO: Falta implementar los filtros 'name' (regex) y price
//TODO: asegurarme de que se renderiza Empty cuando la combinación de filtros no existe
//TODO: estilos del error en LoginPage NO se activan
//TODO: Problemilla: al crear anuncio hay que hacer refresh para actualizar la lista; busca un workaround!
//TODO: arreglar error de cannot read properties of undefined (reading 'data') que lanza cuando no hay backend
//TODO: no olvidar los propTypes
//TODO: poner algo más decente en la página 404
//TODO: poner index en carpetas AdvertsPage, AdvertPage y NewAdvertPage
//TODO: pasar mensaje diferenciado a Empty según su causa: lista del backend vacía o por filtrado

export default function AdvertsPage({ list, requestError, ...props }) {

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
  },[list, filters]);

  useEffect(() => {
    setError(requestError);
  });

  useEffect(() => {

     if (filters.name) {
          console.log("name", filters.name);
            setAdverts((adverts) =>
            adverts.filter((advert) => advert.name === filters.name)
          );
        }


    if (filters.sale !== "") {
      //setAdverts(list);
      setAdverts((adverts) =>
        adverts.filter((advert) => advert.sale === filters.sale)
      );
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

      {error && error.response.status==404 ? <Redirect to="/404"/> :""}
      {error && error.response.status!=404 ? <Error className="adverts-page-error" error={error}/> : ""}
       
      
     

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
            <Empty {...props} />
          )}
        
      </Layout>
    </>
  );
}

AdvertsPage.propTypes = {};

//export default AdvertsPage;
