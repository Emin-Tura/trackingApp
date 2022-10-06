import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    id: { type: String },
    allDay: { type: Boolean },
    rRule: { type: String },
    endDate: { type: Date },
    startDate: { type: Date },
    title: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

const Event = mongoose.model("events", eventSchema);
export default Event;
