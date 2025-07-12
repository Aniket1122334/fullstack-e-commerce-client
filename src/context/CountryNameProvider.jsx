import { useEffect, useState } from "react";
import CountryName from "./CountryName";
import axios from "axios";

const CountryNameProvider = ({ children }) => {
  const [countryList, setCountryList] = useState(["All"]);

  useEffect(() => {
    getCountry("https://countriesnow.space/api/v0.1/countries/");
  }, []);

  const getCountry = async (url) => {
    await axios.get(url).then((res) => {
      setCountryList(res.data.data);
      //   console.log(res.data.data);
    });
  };
  return (
    <CountryName.Provider value={{ countryList }}>
      {children}
    </CountryName.Provider>
  );
};

export default CountryNameProvider;
