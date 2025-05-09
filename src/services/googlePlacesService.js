export const getPlacePredictions = (input) => {
  return new Promise((resolve, reject) => {
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      return reject(new Error("Google Maps Places API is not loaded."));
    }

    const service = new window.google.maps.places.AutocompleteService();

    service.getPlacePredictions(
      {
        input,
        types: ["address"],
      },
      (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve(predictions);
        } else {
          reject(new Error(`Autocomplete error: ${status}`));
        }
      }
    );
  });
};

export const getPlaceDetails = (placeId) => {
  return new Promise((resolve, reject) => {
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      return reject(new Error("Google Maps Places API is not loaded."));
    }

    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    service.getDetails(
      {
        placeId,
        fields: ["address_components", "geometry"],
      },
      (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const components = place.address_components;
          const get = (type) =>
            components.find((comp) => comp.types.includes(type))?.long_name ||
            "";

          const streetNumber = get("street_number");
          const route = get("route");
          const adminArea2 = get("administrative_area_level_2");
          const locality = get("locality");
          const postalCode = get("postal_code");
          const lat = place.geometry?.location?.lat();
          const lng = place.geometry?.location?.lng();

          const addressObject = {
            address: `${streetNumber} ${route} ${locality}`.trim(),
            city: adminArea2,
            zipcode: postalCode,
            lat,
            lng,
          };

          resolve(addressObject);
        } else {
          reject(new Error(`Place Details error: ${status}`));
        }
      }
    );
  });
};
