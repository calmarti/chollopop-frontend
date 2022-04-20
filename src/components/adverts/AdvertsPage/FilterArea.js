import React, { useState, useEffect } from "react";
import "./FilterArea.css";
import Types from "prop-types";
import { getAdvertTags } from "../service";
import Button from "../../shared/Button";
import useQuery from "../../hooks/useQuery";

//TODO: refactorizar formulario de filtros y handlers de eventos

export default function FilterArea({ filters, handleChange }) {
  const { data: tags, isLoading, error } = useQuery(getAdvertTags);

  return (
    <div className="filter-container">
      <h2 className="filter-title">Busca tu artículo</h2>

      <form>
        <div className="form-container">
          <label className="filter-label" htmlFor="name">
            Artículo
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={filters.name}
              autoFocus
            />
          </label>

          <label htmlFor="price">
            Precio
            <input type="range" id="price" name="price" min="0" max="1000000" />
          </label>

          <label className="filter-label" htmlFor="sale">
            Venta
            <input
              name="sale"
              type="radio"
              value="true"
              checked={filters.sale === true}
              onChange={handleChange}
            />
          </label>

          <label className="filter-label" htmlFor="sale">
            Compra
            <input
              name="sale"
              type="radio"
              value="false"
              checked={filters.sale === false}
              onChange={handleChange}
            />
          </label>

          <label className="filter-label" htmlFor="sale">
            Todos
            <input
              name="sale"
              type="radio"
              value="all"
              checked={filters.sale === "all"}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="tags" className="filter-label">
            Categoría
            <select
              id="tags"
              className="form-filter-tags"
              name="tags"
              value={filters.tags}
              onChange={handleChange}
              multiple={true}
            >
              <option value={[""]}>all</option>
              {tags.map((tag, index) => (
                <option key={index} value={tag}>
                  {" "}
                  {tag}{" "}
                </option>
              ))}
            </select>
          </label>
        </div>
      </form>
    </div>
  );
}

FilterArea.propTypes = {
  // filters: Types.object.isRequired,
  // setFilters: Types.func.isRequired,
  //tagvalues: Types.array.isRequired,
};
