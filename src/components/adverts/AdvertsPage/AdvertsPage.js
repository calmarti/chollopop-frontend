import { useEffect, useState, useRef, useContext, Fragment } from "react";
import Layout from "../../layout/Layout";
import { getAdverts } from "../service";
import AuthContext from "../../auth/context";
import { Link } from "react-router-dom";
import types, { func } from "prop-types";
import FilterArea from "./FilterArea";

//TODO: Prioridad para el viernes 5: maquetación minimamente funcional sujeta a restricción de tiempo, luego seguir con lo demás


//TODO: loader y gestor de errores al hacer llamada al api
//TODO: Falta implementar los filtros 'name' (regex) y price
//TODO: Falta crear componente Empty (se renderiza cuando (a) no hay anuncios del todo o (b) los filtros no corresponden a ningun artículo)
//el componente Empty debe ten un botón que redirija a 'crear anuncio'
//TODO: Crear componente de Error y reutilizar en NewAdvertsPage, AdvertPage y Login
//TODO: Problemilla: al crear anuncio hay que hacer refresh para actualizar la lista; busca un workaround!

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
        <div className="">
          {adverts.length ? (
            <ul>
              {adverts
                /*                 .filter(
                  (advert) =>
                    advert.sale === filters.sale && advert.tags === filters.tags
                ) */
                .map((advert) => (
                  <li
                    key={
                      advert.id
                    } /* onClick={() => history.push(`/adverts/${id}`)} */
                  >
                    <Link to={`/adverts/${advert.id}`}>
                      <div className="item-card">
                        <h2>{advert.name}</h2>
                        <p>{advert.price}</p>
                        <p>{advert.sale ? "Venta" : "Compra"}</p>
                        <p>{advert.tags.join(" ")}</p>
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
    </>
  );
}

AdvertsPage.propTypes = {};

//export default AdvertsPage;
