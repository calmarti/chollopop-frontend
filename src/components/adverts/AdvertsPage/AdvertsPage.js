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

export default function AdvertsPage({ list, requestError, ...props }) {
  const [adverts, setAdverts] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    price: "",
    sale: "",
    tags: [""],
  });
  const [tagvalues, setTagValues] = useState([]);

  useEffect(() => {
    const getTagsWrapper = async () => {
      const result = await getAdvertTags();
      setTagValues(result);
    };
    getTagsWrapper();
  }, []);

  useEffect(() => {
    setAdverts(list);
  }, [list, filters]);

  useEffect(() => {
    setError(requestError);
  }, []);

  useEffect(() => {
    if (filters.name) {
      setAdverts((adverts) =>
        adverts.filter((advert) => advert.name === filters.name)
      );
    }

    if (filters.sale !== "") {
      setAdverts((adverts) =>
        adverts.filter((advert) => advert.sale === filters.sale)
      );
    }

    if (JSON.stringify(filters.tags) !== '[""]') {
      setAdverts((adverts) =>
        adverts.filter(
          (advert) =>
            JSON.stringify(advert.tags) === JSON.stringify(filters.tags)
        )
      );
    }
  }, [filters]);

  let emptyMessage = "Los filtros usados no corresponden a ningún anuncio";
  if (!list.length) {
    emptyMessage = "No hay nada para vender o comprar";
  }

  return (
    <>
      <FilterArea
        tagvalues={tagvalues}
        filters={filters}
        setFilters={setFilters}
      />

      {error && error.status === 404 ? <Redirect to="/404" /> : ""}

      {error && error.status !== 404 ? (
        <Error className="adverts-page-error" error={error} />
      ) : (
        ""
      )}

      <Layout {...props}>
        {adverts.length ? (
          <div>
            <ul className="card-list">
              {adverts.map((advert) => (
                <li className="card-list-item" key={advert.id}>
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
          <Empty message={emptyMessage} {...props} />
        )}
      </Layout>
    </>
  );
}

AdvertsPage.propTypes = {
  list: Types.array.isRequired,
  requestError: Types.object,
};
