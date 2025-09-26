"use client";
import React, { useState } from "react";

const CountrySelector = () => {
  const [selectedCountry, setSelectedCountry] = useState({
    code: "in",
    dialCode: "+91",
    name: "India (भारत)",
  });
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleCountryChange = (countryCode, dialCode, countryName) => {
    setSelectedCountry({
      code: countryCode,
      dialCode,
      name: countryName,
    });
    setDropdownVisible(false); // Close the dropdown after selection
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
            title={`${selectedCountry.name}: ${selectedCountry.dialCode}`}
            onClick={toggleDropdown}
          >
            <div className={`iti-flag ${selectedCountry.code}`}></div>
            <div className="selected-dial-code">{selectedCountry.dialCode}</div>
            <div className="iti-arrow"></div>
          </div>
          <ul className={`country-list ${isDropdownVisible ? "hide" : ""}`}>
            <li
              className="country preferred"
              data-dial-code="1"
              data-country-code="us"
              onClick={() => handleCountryChange("us", "+1", "United States")}
            >
              <div className="flag-box">
                <div className="iti-flag us"></div>
              </div>
              <span className="country-name">United States</span>
              <span className="dial-code">+1</span>
            </li>
            <li
              className="country"
              data-dial-code="228"
              data-country-code="tg"
              onClick={() => handleCountryChange("tg", "+228", "Togo")}
            >
              <div className="flag-box">
                <div className="iti-flag tg"></div>
              </div>
              <span className="country-name">Togo</span>
              <span className="dial-code">+228</span>
            </li>
            <li
              className="country"
              data-dial-code="690"
              data-country-code="tk"
              onClick={() => handleCountryChange("tk", "+690", "Tokelau")}
            >
              <div className="flag-box">
                <div className="iti-flag tk"></div>
              </div>
              <span className="country-name">Tokelau</span>
              <span className="dial-code">+690</span>
            </li>
            <li
              className="country"
              data-dial-code="84"
              data-country-code="vn"
              onClick={() =>
                handleCountryChange("vn", "+84", "Vietnam (Việt Nam)")
              }
            >
              <div className="flag-box">
                <div className="iti-flag vn"></div>
              </div>
              <span className="country-name">Vietnam (Việt Nam)</span>
              <span className="dial-code">+84</span>
            </li>
          </ul>
        </div>
        <input
          size="40"
          minLength="10"
          className="wpcf7-form-control wpcf7-phonetext wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-phonetext form-item-input"
          data-numberonly="true"
          aria-required="true"
          aria-invalid="false"
          placeholder="Enter a 10 digit mobile number"
          type="text"
          name="phone"
          autoComplete="off"
        />
        <input type="hidden" name="full_number" />
      </div>
      <input
        type="hidden"
        name="phone-country-code"
        className="wpcf7-phonetext-country-code"
        value={selectedCountry.dialCode}
      />
    </span>
  );
};

export default CountrySelector;
