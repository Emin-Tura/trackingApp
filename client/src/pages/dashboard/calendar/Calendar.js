import React, { useEffect } from "react";

const Calendar = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>Calendar</div>;
};

export default Calendar;
