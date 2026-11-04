
import { useState } from "react";
import AddressAutocomplete from "./AddressAutocomplete";

const AddressAutocompleteTest = () => {
  const [address, setAddress] = useState(null);

  return (
    <div style={{ maxWidth: "600px", margin: "60px auto", padding: "20px" }}>
      <h2>Prueba de búsqueda de direcciones</h2>

      <AddressAutocomplete
        value={address}
        onChange={setAddress}
      />

      {address && (
        <pre style={{ marginTop: "24px", padding: "16px", background: "#f3f3f3" }}>
          {JSON.stringify(address, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default AddressAutocompleteTest;
