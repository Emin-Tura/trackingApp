import React, { useEffect } from "react";

const WorkFlow = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link);
  }, [link, setSelectedLink]);

  return <div>WorkFlow</div>;
};

export default WorkFlow;
