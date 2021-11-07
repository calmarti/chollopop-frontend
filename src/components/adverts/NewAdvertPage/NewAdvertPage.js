import { useState, useEffect, useRef } from "react";
import React from "react";
import Button from "../../shared/Button";
import { postNewAdvert, getAdvertTags } from "../service";
import { Redirect } from "react-router-dom";
import "./NewAdvertPage.css";
import Header from "../../layout/Header.js";
import "../../layout/Header.css";
import Error from "../../shared/Error";


export default function NewAdvertPage({ ...props }) {
  const [fields, setFields] = useState({
    name: "",
    price: "",
    sale: true,
    tags: undefined,
    photo: null,
  });

  const [tagvalues, setTagValues] = useState([]);
  const [newAdvertId, setNewAdvertId] = useState("");
  const [error, setError] = useState(null);
  const photoRef = useRef(null);

  useEffect(() => {
    const getTagsWrapper = async () => {
      try {
        const result = await getAdvertTags();
        setTagValues(result);
      } catch (error) {
        setError(error);
      }
    };
    getTagsWrapper();
  }, []);

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
    setFields((prevState) =>
      event.target.checked
        ? {
            ...prevState,
            sale: event.target.value === "true" ? true : false,
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
    } catch (error) {
      console.log(error);
    }
  };

  if (newAdvertId) {
    return <Redirect to={`/adverts/${newAdvertId}`} />;
  }

  return (
    <>
      <Header {...props} />

      {error ? (
        <Error />
      ) : (
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
                  type="number"
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
                  {tagvalues.map((tagvalue, index) => (
                    <option key={index} value={tagvalue}>
                      {" "}
                      {tagvalue}{" "}
                    </option>
                  ))}

                  {/*                   <option value="lifestyle">Lifestyle</option>
                  <option value="mobile">Mobile</option>
                  <option value="motor">Motor</option>
                  <option value="work">Work</option> */}
                </select>
              </label>

              <label
                className="new-advert-form-label file-field"
                htmlFor="photo"
              >
                {" "}
                Foto &nbsp;
                <input
                  className="new-advert-form-field"
                  type="file"
                  id="photo"
                  name="photo"
                  ref={photoRef}
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
      )}
    </>
  );
}
