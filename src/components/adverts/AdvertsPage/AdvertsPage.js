import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { getAdvertTags } from "../service";
import { Link, Redirect } from "react-router-dom";
import Types from "prop-types";
import FilterArea from "./FilterArea";
import Empty from "../../shared/Empty";
import "./FilterArea.css";
import "./AdvertsPage.css";
import Error from "../../shared/Error";

//TODO: revisar las reglas del bootcamp para lo de las reentregas de no aptos, etc. 
//TODO: Volver a leer el enunciado de principio a fin!!!!!!!!!!!!!!!!

//TODO: Bug más importante: al crear o borrar un anuncio hay que hacer refresh para actualizar la lista; busca un workaround!
//TODO: arreglar el error del login (¿con inline styles?), crear estados de errores en NewAdvertPage y AdvertPage (pero con inline styles!)
//TODO: pasar mensaje diferenciado a Empty según su causa: lista del backend vacía o por filtrado
//TODO: asegurarme de que se renderiza Empty cuando la combinación de filtros no existe

//TODO: probar a ver si coge la .ENV en el client
//TODO: loader y gestor de errores al hacer llamadas al api en donde las haya

//TODO: arreglar error de cannot read properties of undefined (reading 'data') que lanza cuando no hay backend

//TODO: no olvidar los propTypes
//TODO: poner algo más decente en la página 404
//TODO: poner index en carpetas AdvertsPage, AdvertPage y NewAdvertPage
//TODO: Falta implementar los filtros 'name' (regex)


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
  const [tagvalues, setTagValues] = useState([]);

  useEffect(() => {
    const getTags = async() => {
    const result = await getAdvertTags();
    setTagValues(result);
    }
    getTags();
  }, []);

  useEffect(() => {
    setAdverts(list);
    console.log(adverts, adverts.length);
  }, [list, filters]);


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
        tagvalues={tagvalues}
        filters={filters}
        setFilters={setFilters}
      />

      {error && error.response.status == 404 ? <Redirect to="/404" /> : ""}
      {error && error.response.status != 404 ? (
        <Error className="adverts-page-error" error={error} />
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
                  <li
                    className="card-list-item"
                    key={
                      advert.id
                    } /* onClick={() => history.push(`/adverts/${id}`)} */
                  >
                    <Link
                      className="card-list-item-link"
                      to={`/adverts/${advert.id}`}
                    >
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

AdvertsPage.propTypes = {
list: Types.array.isRequired,
requestError: Types.object

};

