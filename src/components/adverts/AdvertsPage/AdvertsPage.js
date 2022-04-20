import { Redirect } from "react-router-dom";
import Layout from "../../layout/Layout";
import AdvertsList from "../AdvertsPage/AdvertsList";
import FilterArea from "./FilterArea";
import { Error, Empty } from "../../shared";
import { getAdverts } from "../service";
import filterAdverts from "../../../utils/filters";
import useQuery from "../../hooks/useQuery";
import "./FilterArea.css";
import "./AdvertsPage.css";
import Types from "prop-types";
import useForm from "../../hooks/useForm";

export default function AdvertsPage({ ...props }) {
  const { data: adverts, isLoading, error } = useQuery(getAdverts);
  const { formValue: filters, handleChange } = useForm({
    name: "",
    price: "",
    sale: "all",
    tags: [""],
  });

  const advertsCount = adverts.length;
  const filteredAdverts = filterAdverts(adverts, filters);
  console.log(adverts, filteredAdverts);

  if (error && error.statusCode === 404) {
    return <Redirect to="/404" />;
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
              handleChange={handleChange}
              {...props}
            />
            {filteredAdverts.length ? (
              <AdvertsList filteredAdverts={filteredAdverts} />
            ) : (
              <Empty advertsCount={advertsCount} {...props} />
            )}
          </Layout>
        </>
      )}
    </>
  );
}

AdvertsPage.propTypes = {};
