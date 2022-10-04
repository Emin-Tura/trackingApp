import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    event_id: { type: Number },
    end: { type: Date },
    start: { type: Date },
    title: { type: String, max: 250, required: true },
  },
  { timestamps: true }
);

const Event = mongoose.model("events", eventSchema);
export default Event;
