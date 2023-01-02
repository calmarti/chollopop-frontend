import "./FilterArea.css";
import { getAdvertTags } from "../service";
import useQuery from "../../hooks/useQuery";

export default function FilterArea({ filters, handleChange }) {
  const { data: tags, error } = useQuery(getAdvertTags);

  return (
    <div>
      <form className="custom-form">

        <div className="custom-search-bar-group"

        >
          <label
            className="custom-search-label"
           htmlFor="name"
          >
            Buscar
          </label>       
          <input
            className="custom-search-bar"
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={filters.name}
            autoFocus
          />
        </div>

      <div className="filter-area">
        <div className="">
          <label htmlFor="price">
            Precio
            <input type="range" id="price" name="price" min="0" max="1000000" />
          </label>
        </div>

        <div className="">
          <div className="">
            <div className="">
              <label className="" htmlFor="sale">
                Venta
                <input
                  className=""
                  name="sale"
                  type="radio"
                  value="true"
                  checked={filters.sale === true}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="">
              <label className="" htmlFor="sale">
                Compra
                <input
                  className=""
                  name="sale"
                  type="radio"
                  value="false"
                  checked={filters.sale === false}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="">
              <label className="" htmlFor="sale">
                Todos
                <input
                  className=""
                  name="sale"
                  type="radio"
                  value="all"
                  checked={filters.sale === "all"}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="tags">
          <label htmlFor="tags" className="filter-label">
            Categoría
            <select
              id="tags"
              className=""
              name="tags"
              value={filters.tags}
              onChange={handleChange}
              multiple={true}
            >
              <option value={[""]}>all</option>
              {tags && tags.map((tag, index) => (
                <option key={index} value={tag}>
                  {" "}
                  {tag}{" "}
                </option>
              ))}
            </select>
          </label>
          </div>


        </div>
      </form>
    </div>
  );
}
