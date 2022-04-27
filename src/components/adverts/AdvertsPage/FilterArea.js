import "./FilterArea.css";
import { getAdvertTags } from "../service";
import useQuery from "../../hooks/useQuery";

export default function FilterArea({ filters, handleChange }) {
  const { data: tags, error } = useQuery(getAdvertTags);

  return (
    <div className="container filter-area">
      <form className="row">
        <div
          className="col"
          style={{ display: "flex", alignItems: "flex-start" }}
        >
          <label
            className="form-label"
            style={{ paddingRight: "1rem" }}
            htmlFor="name"
          >
            Artículo
          </label>
          <input
            className="form-control"
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={filters.name}
            autoFocus
          />
        </div>

        <div className="col">
          <label htmlFor="price">
            Precio
            <input type="range" id="price" name="price" min="0" max="1000000" />
          </label>
        </div>

        <div className="form-check col container">
          <div className="row">
            <div className="col">
              <label className="form-check-label" htmlFor="sale">
                Venta
                <input
                  className="form-check-input"
                  name="sale"
                  type="radio"
                  value="true"
                  checked={filters.sale === true}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="col">
              <label className="form-check-label" htmlFor="sale">
                Compra
                <input
                  className="form-check-input"
                  name="sale"
                  type="radio"
                  value="false"
                  checked={filters.sale === false}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="col">
              <label className="form-check-label" htmlFor="sale">
                Todos
                <input
                  className="form-check-input"
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

        <div className="col tags">
          <label htmlFor="tags" className="filter-label">
            Categoría
            <select
              id="tags"
              className="form-select multiple"
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
