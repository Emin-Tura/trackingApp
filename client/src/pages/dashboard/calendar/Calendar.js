import React, { useEffect, useState } from "react";
import { createEvent, getEvents } from "../../../actions/event";
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
} from "@devexpress/dx-react-scheduler-material-ui";
// import { appointments } from "./appointments";

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

  // const [data, setData] = useState(events);
  // const [currentDate, setCurrentDate] = useState(Date.now());
  // const [addedAppointment, setAddedAppointment] = useState({});
  // const [appointmentChanges, setAppointmentChanges] = useState({});
  // const [editingAppointment, setEditingAppointment] = useState(undefined);
  const [currentViewName, setCurrentViewName] = useState();

  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
      createEvent(added, dispatch);
    }
    if (changed) {
      const { ...rest } = changed;
      console.log(rest);
      // data.map((appointment) => console.log(appointment.id));
    }
    if (deleted !== undefined) {
    }
  };

  return (
    <Paper>
      <Scheduler data={events} height={600} locale={"tr-TR"}>
        <ViewState
          defaultCurrentDate={Date.now()}
          currentViewName={currentViewName}
          onCurrentViewNameChange={setCurrentViewName}
        />
        <EditingState
          onCommitChanges={commitChanges}
          // addedAppointment={addedAppointment}
          // onAddedAppointmentChange={setAddedAppointment}
          // appointmentChanges={appointmentChanges}
          // onAppointmentChangesChange={setAppointmentChanges}
          // editingAppointment={editingAppointment}
          // onEditingAppointmentChange={setEditingAppointment}
        />
        <WeekView startDayHour={8} endDayHour={18} displayName="Hafta" />
        <MonthView displayName="Ay" />
        <DayView displayName="Gün" />
        <AllDayPanel messages={{ allDay: "Tüm Gün" }} />
        <Toolbar />
        <ViewSwitcher />
        <DateNavigator />
        <EditRecurrenceMenu />
        <ConfirmationDialog />
        <Appointments />
        <AppointmentTooltip showCloseButton />
        <ConfirmationDialog
          messages={{
            cancelButton: "İptal",
            discardButton: "Sil",
            confirmCancelMessage: "Kaydedilmemiş değişiklikler silinsin mi?",
            confirmDeleteMessage: "Olay silinsin mi?",
            deleteButton: "Sil",
          }}
        />
        <AppointmentForm
          messages={{
            detailsLabel: "Detay",
            allDayLabel: "Tüm Gün",
            titleLabel: "Başlık",
            commitCommand: "Kaydet",
            moreInformationLabel: "Daha Fazla Bilgi",
            repeatLabel: "Tekrar",
            notesLabel: "Notlar",
            never: "Asla",
            daily: "Günlük",
            weekly: "Haftalık",
            monthly: "Aylık",
            yearly: "Yıllık",
            repeatEveryLabel: "Her Birini Tekrarla",
            daysLabel: "Günler",
            endRepeatLabel: "Tekrarlamayı Sonlandır",
            onLabel: "Açık",
            afterLabel: "Sonra",
            occurrencesLabel: "Olaylar",
            weeksOnLabel: "Haftalar",
            monthsLabel: "Aylar",
            ofEveryMonthLabel: "Her ayın",
            theLabel: "Bu",
            firstLabel: "İlk",
            secondLabel: "İkinci",
            thirdLabel: "Üçüncü",
            fourthLabel: "Dördüncü",
            lastLabel: "Son",
            yearsLabel: "Yıllar",
            everyLabel: "Her",
          }}
        />
      </Scheduler>
    </Paper>
  );
};

export default Calendar;
