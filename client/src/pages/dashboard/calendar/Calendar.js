import React, { useCallback, useEffect, useState } from "react";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../../../actions/event";
import { useValue } from "../../../context/ContextProvider";
import Paper from "@mui/material/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  WeekView,
  EditRecurrenceMenu,
  AllDayPanel,
  ConfirmationDialog,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  MonthView,
  DayView,
  DragDropProvider,
} from "@devexpress/dx-react-scheduler-material-ui";
import messages from "../../../components/language";
import { v4 as uuidv4 } from "uuid";
import SendCalendarMail from "./SendCalendarMail";

const Calendar = ({ setSelectedLink, link }) => {
  const {
    state: { events, currentUser },
    dispatch,
  } = useValue();

  const [id, setId] = useState(uuidv4());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentViewName, setCurrentViewName] = useState();
  const [locale] = useState("tr-TR");

  const commitChanges = useCallback(
    ({ added, changed, deleted }) => {
      if (added) {
        dispatch({ type: "OPEN_LOGIN" });
        setId(uuidv4());
        createEvent({ added, id }, dispatch);
      }
      if (changed) {
        setId(uuidv4());
        events.map(
          (appointment) =>
            changed[appointment.id] &&
            updateEvent(changed[appointment.id], appointment.id, dispatch)
        );
      }
      if (deleted !== undefined) {
        setId(uuidv4());
        deleteEvent(deleted, dispatch);
      }
    },
    [dispatch, events, id]
  );

  useEffect(() => {
    setSelectedLink(link);
    getEvents(dispatch);
  }, [dispatch, link, setSelectedLink, id]);

  return (
    <>
      <Paper>
        <Scheduler data={events} height={600} locale={locale}>
          <ViewState
            defaultCurrentDate={currentDate}
            onCurrentDateChange={setCurrentDate}
            currentViewName={currentViewName}
            onCurrentViewNameChange={setCurrentViewName}
          />

          <EditingState onCommitChanges={commitChanges} />

          <WeekView
            startDayHour={8}
            endDayHour={18}
            displayName={locale === "tr-TR" && "Hafta"}
            cellDuration={60}
          />
          <MonthView displayName={locale === "tr-TR" && "Ay"} />
          <DayView
            displayName={locale === "tr-TR" && "Gün"}
            startDayHour={6}
            endDayHour={24}
          />
          <AllDayPanel messages={{ allDay: "Tüm Gün" }} />
          <Toolbar />
          <ViewSwitcher />
          <DateNavigator />
          <EditRecurrenceMenu messages={locale === "tr-TR" && messages.tr} />
          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip
            showDeleteButton={
              currentUser.authority === "Tam Yetki" ? true : false
            }
            showOpenButton={
              currentUser.authority !== "Yetki Yok" ? true : false
            }
            showCloseButton
          />
          <ConfirmationDialog messages={locale === "tr-TR" && messages.tr} />

          <AppointmentForm
            messages={locale === "tr-TR" && messages.tr}
            readOnly={currentUser.authority !== "Yetki Yok" ? false : true}
          />
          {currentUser.authority !== "Yetki Yok" && <DragDropProvider />}
          <SendCalendarMail />
        </Scheduler>
      </Paper>
    </>
  );
};

export default Calendar;
