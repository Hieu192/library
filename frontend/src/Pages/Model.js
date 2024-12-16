import React, { useEffect, useRef } from "react";
const Model = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src="./building.html"
        width="100%"
        height="100%"
        title="Sample Map"
        style={{ border: "none" }}
      />
    </div>
  );
};

export default Model;
