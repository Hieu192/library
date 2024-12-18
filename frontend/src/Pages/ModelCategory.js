import React, { useEffect, useRef } from "react";
const ModelCategory = (prop) => {
  const { category } = prop;
  const data = encodeURIComponent(JSON.stringify({ category: category})); // Dữ liệu truyền vào iframe
  const iframeSrc = `./buildingCate.html?data=${data}`;
  return (
    <div style={{ width: "1000px", height: "1000px" }}>
      <iframe
        src={iframeSrc}
        width="100%"
        height="100%"
        title="Sample Map"
        style={{ border: "none" }}
      />
      <div>Test</div>
    </div>
  );
};

export default ModelCategory;
