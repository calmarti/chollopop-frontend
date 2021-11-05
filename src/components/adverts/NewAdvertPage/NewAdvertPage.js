import { useState, useRef } from "react";
import types, { func } from "prop-types";
import Layout from "../../layout/Layout.js";
import React from "react";
import Button from "../../shared/Button";
import { postNewAdvert } from "../service";
import { Redirect } from "react-router-dom";
import "./NewAdvertPage.css";
import Header from "../../layout/Header.js";
import "../../layout/Header.css";

//TODO: en navbar no debe aparecer botón 'Crear Anuncio' (condicional en Header.js)
//tampoco coge el valor 'compra' (sale:false)

//TODO: TESTING del filtro: de momento deshabilitación del botón funciona con tag: undefined, price='"" y sale: true

export default function NewAdvertPage({ ...props }) {
  const [fields, setFields] = useState({
    name: "",
    price: "",
    sale: true,
    tags: undefined,
    photo: null,
  });

  const [newAdvertId, setNewAdvertId] = useState("");

  const photoRef = useRef(null);
  //photoRef.current.value

  const handleOnChange = (event) => {
    if (
      event.target.type === "text" ||
      event.target.type === "number" ||
      event.target.type === "file"
    ) {
      setFields((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    } else if (event.target.type === "select-multiple") {
      const selected = event.target.selectedOptions;
      console.log(selected);
      const tagsValues = [];

      /* for (let i = 0; i < selected.length; i++)  */
      Array.from(selected).forEach((tag) => {
        tagsValues.push(tag.value);
        setFields((prevState) => ({
          ...prevState,
          [event.target.name]: tagsValues,
        }));
      });
    }
  };

  const handleRadio = (event) => {
    /*     console.log(
      event.target.type,
      event.target.name,
      typeof event.target.value,
      event.target.value
    ); */

    setFields((prevState) =>
      event.target.checked
        ? {
            ...prevState,
            sale:
              event.target.value === "true"
                ? true
                : false /*JSON.parse(event.target.value)*/,
          }
        : { ...prevState }
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData(event.target);
      data.set["photo"] = photoRef.current.value;

      const response = await postNewAdvert(data);
      console.log(response);
      setNewAdvertId(response.id);

      /*setFields({
        name: "",
        price: "",
        sale: true,
        tags: [],
        photo: "",
      }); */
    } catch (error) {
      console.log(error);
    }
  };

  //useEffect(() => {}, []);

  if (newAdvertId) {
    return <Redirect to={`/adverts/${newAdvertId}`} />;
  }

  return (
    <>
    <Header {...props} />
     
      <div className="new-advert-container">
      <h2 className="new-advert-title">Crea tu anuncio</h2>
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <div className="new-advert-form-container">

              <label className="new-advert-form-label" htmlFor="name">
                Artículo &nbsp;
                <input
                  className="new-advert-form-field"
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleOnChange}
                  value={fields.name}
                  autoFocus
                />
              </label>

              <label className="new-advert-form-label" htmlFor="price">
                Precio &nbsp;
                <input
                  className="new-advert-form-field"
                  type="number" //poner de nuevo type=text si esto no sirve para cambiar el tipado de 'price'
                  id="price"
                  name="price"
                  onChange={handleOnChange}
                  value={fields.price}
                />
              </label>

              <label className="new-advert-form-label" htmlFor="sale">
                Venta &nbsp;
                <input
                  className="new-advert-form-field"
                  name="sale"
                  type="radio"
                  value={true}
                  checked={fields.sale === true}
                  onChange={handleRadio}
                />
              </label>

              <label className="new-advert-form-label" htmlFor="sale">
                Compra &nbsp;
                <input
                  className="new-advert-form-field"
                  name="sale"
                  type="radio"
                  value={false}
                  //onChange={(prevState) => setFields({...prevState, sale:false})}
                  checked={fields.sale === false}
                  onChange={handleRadio}
                />
              </label>
              
              <label className="new-advert-form-label">
                <span className="new-advert-form-select-span">Categoría</span>
                
                <select
                  className="new-advert-form-field"
                  name="tags"
                  value={fields.tags}
                  onChange={handleOnChange}
                  multiple={true}
                >
                  <option value="lifestyle">Lifestyle</option>
                  <option value="mobile">Mobile</option>
                  <option value="motor">Motor</option>
                  <option value="work">Work</option>
                </select>
              </label>

              <label className="new-advert-form-label file-field" htmlFor="photo">
                {" "}
                {/*OJO: ESTO ES PASARLE UN FICHERO,  NO UNA URL*/}
                Foto  &nbsp;
                <input
                  className="new-advert-form-field"
                  type="file"
                  id="photo"
                  name="photo"
                  ref={photoRef}

                  /* value={fields.photo} */
                ></input>
              </label>
              <Button
                disabled={!fields.name || !fields.price || !fields.tags}
                type="submit"
              >
                Continuar
              </Button>
            </div>
          </form>
        </div>
    
    </>
  );
}

//TODO: desactivar el botón si falta algún campo requerido
//TODO: eliminar botón 'crear anuncio' en el Header cuando estoy en esta página

//tal vez conviene aquí un type de tipo shape (clase 5, min 0:30)
//si necesito que algo tenga la propiedad length lo debo definir de tipo

/*
         
                try {
                    const data = new FormData(this)
                    const username = data.get('username')  // valor del input[name="username"]
                    const password = data.get('password')  // valor del input[name="password"]
                    const result = await DataService.registerUser(username, password)

                    */
