import React, { useEffect } from "react";

const Products = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>Products</div>;
};

export default Products;
