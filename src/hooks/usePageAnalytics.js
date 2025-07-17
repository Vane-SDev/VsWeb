import { useEffect } from "react";
import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-FYSX7E4Y67"; // Tu ID de Medición
ReactGA.initialize(MEASUREMENT_ID);

export const usePageAnalytics = () => {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname + window.location.search,
      title: "Página de Inicio",
    });
  }, []);
};
