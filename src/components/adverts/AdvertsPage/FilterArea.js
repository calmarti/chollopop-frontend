import React, { useState, useEffect } from "react";
import Button from "../../shared/Button";
import Slider, { Range } from "rc-slider";
import { getAdvertTags } from "../service";
import "rc-slider/assets/index.css";
import "./FilterArea.css";



export default function FilterArea({ filters, setFilters, tagvalues }) {



  //el input adverts debe inicializarse a 'TODOS' tras cada filtrado


  const handleOnChange = (event) => {
    if (event.target.type === "text" || event.target.type === "number") {
      setFilters((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    } else if (event.target.type === "select-multiple") {
      const selected = event.target.selectedOptions;
      const tagsValues = [];

      Array.from(selected).forEach((tag) => {
        tagsValues.push(tag.value);
        setFilters((prevState) => ({
          ...prevState,
          tags: tagsValues,
        }));
      });
    }
  };

  const handleRadio = (event) => {
    console.log(event.target.type, event.target.name, event.target.value);
    setFilters((prevState) =>
      event.target.checked
        ? { ...prevState, sale: event.target.value === "true" ? true : false }
        : { ...prevState }
    );
  };

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
              onChange={handleOnChange}
              value={filters.name}
              autoFocus
            />
          </label>

          <label htmlFor="price">Precio
          <input type="range" id="price" name="price" min="0" max="1000000" />
          </label>

{/*           <Range
            name="price"
            defaultValue={[0, 10000]}
            max={10000}
            allowCross={false}
            handle={(props) => (
              <span key={props.value}> {props.value} &emsp; </span>
            )}
          /> */}

          {/* <label className="form-filter" htmlFor="price">
            Precio mínimo
            <input
              type="number" //poner de nuevo type=text si esto no sirve para cambiar el tipado de 'price'
              //id="price"
              name="price"
              onChange={handleOnChange}
              value={filters.price}
            />
          </label>

          <label className="form-filter" htmlFor="price">
            Precio máximo
            <input
              type="number" //poner de nuevo type=text si esto no sirve para cambiar el tipado de 'price'
              //id="price" 
              name="price"
              onChange={handleOnChange}
              value={filters.price}
            />
          </label> */}

          <label className="filter-label" htmlFor="sale">
            Venta
            <input
              name="sale"
              type="radio"
              value={true}
              checked={filters.sale === true}
              onChange={handleRadio}
            />
          </label>

          <label className="filter-label" htmlFor="sale">
            Compra
            <input
              name="sale"
              type="radio"
              value={false}
              //onChange={(prevState) => setfilters({...prevState, sale:false})}
              checked={filters.sale === false}
              onChange={handleRadio}
            />
          </label>

          <label className="filter-label" htmlFor="sale">
            Todos
            <input
              name="sale"
              type="radio" /* name="sale"  */
              value=""
              //onChange={(prevState) => setfilters({...prevState, sale:false})}
              checked={filters.sale === ""}
              onChange={(event) =>
                setFilters((prevState) =>
                  event.target.checked
                    ? { ...prevState, sale: event.target.value }
                    : { ...prevState }
                )
              }
            />
          </label>

          <label htmlFor="tags" className="filter-label">
            Categoría
            <select
              id="tags"
              className="form-filter-tags"
              name="tags"
              value={filters.tags}
              onChange={handleOnChange}
              multiple={true}
            >
              <option value={[""]}>all</option>
              {tagvalues.map((tagvalue) => <option value={tagvalue}> {tagvalue} </option>)}


             {/*  <option value="lifestyle">Lifestyle</option>
              <option value="mobile">Mobile</option>
              <option value="motor">Motor</option>
              <option value="work">Work</option> */}
            </select>
          </label>
        </div>
      </form>
    </div>
  );
}
