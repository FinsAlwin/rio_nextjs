"use client";
import { useState, useEffect } from "react";
import "./PhoneInput.css";
import endpoints from "../../config/endpoints";
import { showToastError } from "../../utils/toast";
import { fetchDataPost } from "../../utils/fetchData";

const PhoneInput = ({ onCountryChange }) => {
  const [selectedCountry, setSelectedCountry] = useState({
    country_code: "in",
    dialing_code: "+91",
    country_name: "India (भारत)",
  });
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [countries, setCountries] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const url = endpoints.getCountries;
        const response = await fetchDataPost(url, false);

        if (response && response.status && response.status.toLowerCase() === "success") {
          const { response_data } = response;

          if (response_data && response_data.countries) {
            setCountries(response_data.countries);
          } else {
            console.warn("Countries data not found in response");
            setFetchError("Countries data not found.");
          }
        } else {
          console.warn("Failed to fetch countries or API endpoint not available");
          setFetchError("Failed to fetch countries");
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
        setFetchError(error.message);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (country_code, dialing_code, country_name) => {
    setSelectedCountry({
      country_code,
      dialing_code,
      country_name,
    });

    if (onCountryChange) {
      onCountryChange(country_code, dialing_code);
    }
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <span className="wpcf7-form-control-wrap" data-name="phone">
      <div className="intl-tel-input allow-dropdown separate-dial-code iti-sdc-3">
        <div className="flag-container">
          <div
            className="selected-flag"
            tabIndex="0"
            title={`${selectedCountry.country_code}: ${selectedCountry.dialing_code}`}
            onClick={toggleDropdown}
          >
            <div className={`iti-flag ${selectedCountry.country_code}`}></div>
            <div className="selected-dial-code new-career-dial-code">
              {selectedCountry.dialing_code}
            </div>
            <div className="iti-arrow new-arrow-career"></div>
          </div>
          <ul className={`country-list ${isDropdownVisible ? "" : "hide"}`}>
            {countries.map((country) => (
              <li
                key={country.country_code}
                className="country"
                data-dial-code={country.dialing_code}
                data-country-code={country.country_code}
                onClick={() =>
                  handleCountryChange(
                    country.country_code,
                    country.dialing_code,
                    country.country_name
                  )
                }
              >
                <div className="flag-box">
                  <div className={`iti-flag ${country.country_code}`}></div>
                </div>
                <span className="country-name country-name-properties">
                  {country.country_name}
                </span>
                <span className="dial-code">{country.dialing_code}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <input
        type="hidden"
        name="phone-country-code"
        className="wpcf7-phonetext-country-code"
        value={selectedCountry.dialing_code}
      />
    </span>
  );
};

export default PhoneInput;
