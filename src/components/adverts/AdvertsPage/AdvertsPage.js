import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import AdvertsList from "../AdvertsPage/AdvertsList";
import { Link, Redirect } from "react-router-dom";
import Types from "prop-types";
import FilterArea from "./FilterArea";
import { Error, Empty } from "../../shared";
import "./FilterArea.css";
import "./AdvertsPage.css";
import { getAdverts } from "../service";
import {
  filterName,
  filterSale,
  filterTags,
  filterAdverts,
} from "../../../utils/filters";
import useQuery from "../../hooks/useQuery";

export default function AdvertsPage({ ...props }) {

const { data: adverts, isLoading, error } = useQuery(getAdverts);

  const [filters, setFilters] = useState({
    name: "",
    price: "",
    sale: "",
    tags: [""],
  });

  if (error && error.statusCode === 404) {
    //No evalua esto a 'true' cuando la url no existe sino que renderiza directamente al componente Error
    return <Redirect to="/404" />;
  }

  const filteredAdverts = filterAdverts(adverts, filters);
  console.log(adverts, filteredAdverts);

  let emptyMessage = "";
  if (!adverts.length) {
    emptyMessage = "No hay nada para vender o comprar";
  } else {
    if (!filteredAdverts.length) {
      emptyMessage = "Los filtros usados no corresponden a ningún anuncio";
    }
  }

  return (
    <>
      {error && error.statusCode !== 404 ? (
        <Error className="adverts-page-error" error={error} />
      ) : (
        <>
          <FilterArea
            filters={filters}
            setFilters={setFilters}
            /* setError={setError}  */ {...props}
          />

          <Layout /* filteredAdverts ={filteredAdverts} */ {...props}>
            {filteredAdverts.length ? (
              <AdvertsList filteredAdverts={filteredAdverts} />
            ) : (
              <Empty message={emptyMessage} {...props} />
            )}
          </Layout>
        </>
      )}
    </>
  );
}

AdvertsPage.propTypes = {};
