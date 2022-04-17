import { useState, useEffect } from "react";

export default function useQuery(query){
  const [state, setState] = useState({
    data: [],
    isLoading: true,
    error: null,
  });

//   const { data, isLoading, error } = state;

  useEffect(() => {
    query()
      .then((result) =>
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          data: result,
        }))
      )
      .catch((error) =>
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          error: error,
        }))
      );
  }, [query]);

  return state;
};
