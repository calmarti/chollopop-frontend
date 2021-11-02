import React, { useState, useEffect } from "react";
import "./FilterArea.css";
import Button from "../../shared/Button";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";

//OJO: Es un filtro en el front, hay que traerse todos los anuncios en la llamada al backend
//y filtrar con un array.filter()
//TODO: implementar el campo 'sale' con 3 valores (no parece ser boolean como el del NewAdvertsPage)

export default function FilterArea({adverts, filterAdverts}) {
  const [filters, setFilters] = useState({
    name: "",
    price: "",
    price: "",
    sale: "",
    tags: [],
  });

  const handleOnChange = (event) => {
    if (event.target.type === "text" || event.target.type === "number") {
      setFilters((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    } else if (event.target.type === "select-multiple") {
      const selected = event.target.selectedOptions;
      const tagsValues = [];

      for (let i = 0; i < selected.length; i++) {
        tagsValues.push(selected[i].value);
        setFilters((prevState) => ({
          ...prevState,
          [event.target.name]: tagsValues,
        }));
      }
    }
  };

  const handleRadio = (event) => {
    console.log(event.target.type, event.target.name, event.target.value);
    setFilters((prevState) =>
      event.target.checked
        ? { ...prevState, sale: event.target.value==="true" ? true : false}
        : { ...prevState }
    );
  };







  return (
    <div className="container">
      <h2>Filtrar por:</h2>

      <form>
        <div className="name-filter">
          <label className="form-filter" htmlFor="name">
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

{/*          <label htmlFor="price">
          <input type="range" id="price" name="price" min="0" max="1000000" />
          </label> */}


              
          <Range name="price" defaultValue={[0,10000]} max={10000} allowCross={false} handle={(props) =>  <span key={props.value}> {props.value} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span> }  /> 
          


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

          <label className="form-filter" htmlFor="sale">
            Venta
            <input
              name="sale"
              type="radio"
              value={true}
              checked={filters.sale === true}
              onChange={handleRadio}
            />
          </label>

          <label className="form-filter" htmlFor="sale">
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

          <label className="form-filter" htmlFor="sale">
            Todos
            <input
              name="sale"
              type="radio" /* name="sale"  */
              value=""
              //onChange={(prevState) => setfilters({...prevState, sale:false})}
              checked={filters.sale === ""}
              onChange={ event => setFilters(prevState => event.target.checked ? {...prevState, sale: event.target.value } : {...prevState}) }
  
            />
          </label>

          <label className="form-filter">
            Categoría
            <select
              className="form-filter-tags"
              name="tags"
              value={filters.tags}
              onChange={handleOnChange}
              multiple={true}
            >
              <option value="lifestyle">Lifestyle</option>
              <option value="mobile">Mobile</option>
              <option value="motor">Motor</option>
              <option value="work">Work</option>
            </select>
          </label>
        </div>

        <Button onClick={filterAdverts}>Filtrar</Button>
      </form>
    </div>
  );
}
