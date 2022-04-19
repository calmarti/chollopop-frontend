import { useState, useEffect } from "react";

export default function useQuery(query) {
  const [state, setState] = useState({
    data: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    if (query) {
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
    } else {
      Promise.resolve()
        .then(() =>
          setState((prevState) => ({
            ...prevState,
            isLoading: false,
          }))
        )
        .catch((error) =>
          setState((prevState) => ({
            ...prevState,
            isLoading: false,
            error: error,
          }))
        );
    }
  }, [query]);

  return state;
}
