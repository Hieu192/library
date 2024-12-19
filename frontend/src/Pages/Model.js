import React, { useEffect, useRef } from "react";
const Model = () => {
  return (
    <div style={{ width: "100%", height: "calc(100vh - 60px)"  }}>
      <iframe
        src="./building.html"
        width="100%"
        height="100%"
        title="Sample Map"
        style={{ border: "none", marginTop: "70px" }}
      />
    </div>
  );
};

export default Model;
