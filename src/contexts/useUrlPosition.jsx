import { useSearchParams } from "react-router-dom";

function useUrlPosition() {
  // REturns an array wich has basically the current state
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat"); //important to match with what we have in the url
  const lng = searchParams.get("lng");

  return [lat, lng];
}

export { useUrlPosition };
