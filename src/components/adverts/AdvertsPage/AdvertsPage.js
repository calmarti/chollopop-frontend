import { useState } from "react";
import Layout from "../../layout/Layout";
import AdvertsList from "../AdvertsPage/AdvertsList";
import { Link, Redirect } from "react-router-dom";
import FilterArea from "./FilterArea";
import { Error, Empty } from "../../shared";
import { getAdverts } from "../service";
import filterAdverts from "../../../utils/filters";
import useQuery from "../../hooks/useQuery";
import "./FilterArea.css";
import "./AdvertsPage.css";
import Types from "prop-types";
import useForm from "../../hooks/useForm";

//TODO: crear un useForm y usarlo en FilterArea (y luego en login) para controlar el formulario de filtros
//TODO: corregir filters.js
//TODO: refactorizar  (¿usando useQuery?) llamada al api de getTags

export default function AdvertsPage({ ...props }) {
  const { data: adverts, isLoading, error } = useQuery(getAdverts);
  const {
    formValue: filters,
    setFormValue,
    handleChange,
  } = useForm({
    name: "",
    price: "",
    sale: "all",
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
          <Layout {...props}>
            <FilterArea
              filters={filters}
              setFormValue={setFormValue}
              handleChange={handleChange}
              /* setError={setError}  */ {...props}
            />
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
