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

    throw new Error("No se pudieron obtener las ubicaciones.");
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
        null;

      return {
        street: properties.street || null,
        houseNumber: properties.housenumber || null,
        locality,
        province: properties.state || null,
        country: "Argentina",
        latitude,
        longitude,
      };
    })
    .filter(
      (location) =>
        location.locality &&
        location.province &&
        Number.isFinite(location.latitude) &&
        Number.isFinite(location.longitude),
    );
};
