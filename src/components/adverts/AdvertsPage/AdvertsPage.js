import { Redirect } from "react-router-dom";
import Layout from "../../layout/Layout";
import AdvertsList from "../AdvertsPage/AdvertsList";
import FilterArea from "./FilterArea";
import { Error, Empty } from "../../shared";
import { getAdverts } from "../service";
import filterAdverts from "../../../utils/filters";
import useQuery from "../../hooks/useQuery";
import useForm from "../../hooks/useForm";
import "./FilterArea.css";
import "./AdvertsPage.css";

export default function AdvertsPage({ ...props }) {
  const { data: adverts, isLoading, error } = useQuery(getAdverts);
  const { formValue: filters, handleChange } = useForm({
    name: "",
    price: { min: 0, max: 1000000 },
    sale: "all",
    tags: [""],
  });

  const advertsCount = adverts.length;
  const filteredAdverts = filterAdverts(adverts, filters);

  if (error && error.statusCode === 404) {
    return <Redirect to="/404" />;
  }

  if(isLoading){
    return  <div className="loading">Loading...</div>
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
