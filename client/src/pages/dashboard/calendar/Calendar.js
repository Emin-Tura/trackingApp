import React, { useEffect } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import { EVENTS } from "./events";
import { createEvent, getEvents } from "../../../actions/event";
import { useValue } from "../../../context/ContextProvider";

const Calendar = ({ setSelectedLink, link }) => {
  const {
    state: { events },
    dispatch,
  } = useValue();

  useEffect(() => {
    setSelectedLink(link);
    getEvents(dispatch);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(events);
  const handleConfirm = async (event, action) => {
    // console.log(event, action);
    const { end, start, title } = event;
    const newEvent = {
      end,
      start,
      title,
      event_id: Math.round(Math.random() * 1000),
    };
    if (action === "edit") {
      /** PUT event to remote DB */
    } else if (action === "create") {
      /**POST event to remote DB */
      createEvent(newEvent, dispatch);
    }
    /**
     * Make sure to return 4 mandatory fields:
     * event_id: string|number
     * title: string
     * start: Date|string
     * end: Date|string
     * ....extra other fields depend on your custom fields/editor properties
     */
    // Simulate http request: return added/edited event
    return new Promise((res, rej) => {
      setTimeout(() => {
        res({
          ...event,
          event_id: event.event_id || Math.random(),
        });
      }, 3000);
    });
  };

  const handleDelete = async (deletedId) => {
    // Simulate http request: return the deleted id
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(deletedId);
      }, 3000);
    });
  };

  return (
    <Scheduler
      week={{
        weekDays: [0, 1, 2, 3, 4, 5],
        weekStartOn: 6,
        startHour: 8,
        endHour: 18,
        step: 60,
      }}
      view="week"
      events={EVENTS}
      selectedDate={new Date()}
      onDelete={handleDelete}
      day={{
        startHour: 8,
        endHour: 18,
        step: 60,
      }}
      onConfirm={handleConfirm}
    />
  );
};

export default Calendar;
