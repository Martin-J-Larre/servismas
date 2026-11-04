const PHOTON_API_URL = "https://photon.komoot.io/api/";

export const searchAddresses = async (query) => {
  const searchTerm = query.trim();

  if (searchTerm.length < 3) {
    return [];
  }

  const params = new URLSearchParams({
    q: `${searchTerm}, Argentina`,
    limit: "8",
    countrycode: "AR",
  });

  const response = await fetch(`${PHOTON_API_URL}?${params}`);

  if (!response.ok) {
    const errorDetails = await response.text();

    console.error("Error de Photon:", errorDetails);

    throw new Error("No se pudieron obtener las direcciones.");
  }

  const data = await response.json();

  return data.features
    .map((feature) => {
      const properties = feature.properties;
      const [longitude, latitude] = feature.geometry.coordinates;

      const locality =
        properties.city ||
        properties.town ||
        properties.village ||
        properties.municipality ||
        properties.county ||
        "";

      return {
        street: properties.street || "",
        houseNumber: properties.housenumber || "",
        locality,
        province: properties.state || "",
        country: "Argentina",
        latitude,
        longitude,
      };
    })
    .filter(
      (address) =>
        address.locality && address.province && address.country === "Argentina",
    );
};
