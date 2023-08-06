import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  // useState,
} from "react";

const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();

const inititalState = {
  //previosly we had this variables in the useState:
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};
function reducer(state, action) {
  //put here all the business logic and state transitions.
  //Reducers need to be pure functions.
  // these types of name conventions are similiar what redux does:
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknow action type");
  }
}

// acceptin the children prop we can then use this providder component as the top level component in the app component.
function CitiesProvider({ children }) {
  // const [state, dispatch] = useReducer(reducer, inititalState);
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    inititalState
  );

  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        // setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        // setCities(data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        // alert("there was an error loading data ...");
        dispatch({
          type: "rejected",
          payload: "there was an error loading cities ...",
        });
      }
      //  finally {
      //   setIsLoading(false);
      // }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      dispatch({ type: "loading" });
      try {
        // setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        // setCurrentCity(data);
        dispatch({ type: "city/loaded", payload: data });
      } catch {
        // alert("there was an error loading data ...");
        dispatch({
          type: "rejected",
          payload: "there was an error loading the city ...",
        });
      }
    },
    [currentCity.id]
  );

  // const getCity = useCallback(
  //   async function getCity(id) {
  //     if (Number(id) === currentCity.id) return; //no need to call the API again.

  //     dispatch({ type: "loading" });

  //     try {
  //       const res = await fetch(`${BASE_URL}/cities/${id}`);
  //       const data = await res.json();
  //       dispatch({ type: "city/loaded", payload: data });
  //     } catch {
  //       dispatch({
  //         type: "rejected",
  //         payload: "There was an error loading the city...",
  //       });
  //     }
  //   },
  //   [currentCity.id]
  // );

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      // setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      // we need to keep the application state in sync with the state from the UI (Keep the UI state in sync with remote state) --> it can be done by react query but wwe do now this workaround:
      // setCities((cities) => [...cities, data]); // we take the current cities and return a new array with the current cities plus the data (the new city).
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "there was an error creating the city ...",
      });
    }
    // finally {
    //   setIsLoading(false);
    // }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      // setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      // setCities((cities) => cities.filter((city) => city.id !== id));
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "there was an error loading the city ...",
      });
    }
    // finally {
    //   setIsLoading(false);
    // }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  //we need to tell React wich context we actually want to read from, because can be multiple contexts.
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities context was used outside the CitiesProvider");
  //it means we are trying to access the content value in a place where we shouldn't
  return context;
}

export { CitiesProvider, useCities };
