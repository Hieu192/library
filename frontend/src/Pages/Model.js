import React, { useEffect, useRef } from "react";
const Model = () => {
  const data = encodeURIComponent(JSON.stringify({ category: "Trinh thám "})); // Dữ liệu truyền vào iframe
  const iframeSrc = `./building.html?data=${data}`;
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src={iframeSrc}
        width="100%"
        height="100%"
        title="Sample Map"
        style={{ border: "none" }}
      />
    </div>
  );
};

export default Model;
