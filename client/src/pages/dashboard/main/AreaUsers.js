import moment from "moment";
import React, { useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useValue } from "../../../context/ContextProvider";

const months = 5;
const today = new Date();
const tempData = [];

for (let i = 0; i < months; i++) {
  const date = new Date(
    today.getFullYear(),
    today.getMonth() - (months - (i + 1))
  );
  tempData.push({
    date,
    name: moment(date).format("MMM YYYY"),
    users: 0,
  });
}

export default function AreaUsers() {
  const {
    state: { users },
  } = useValue();
  const [data, setData] = React.useState([]);

  useEffect(() => {
    for (let i = 0; i < months; i++) {
      tempData[i].users = 0;
    }
    users.forEach((user) => {
      for (let i = 0; i < months; i++) {
        if (moment(tempData[i].date).isSame(user?.createdAt, "month")) {
          return tempData[i].users++;
        }
      }
    });
    setData([...tempData]);
  }, [users]);

  useEffect(() => {
    for (let i = 0; i < months; i++) {
      tempData[i].users = 0;
    }
    users.forEach((user) => {
      for (let i = 0; i < months; i++) {
        if (moment(tempData[i].date).isSame(user?.createdAt, "month")) {
          return tempData[i].users++;
        }
      }
    });
    setData([...tempData]);
  }, [users]);

  return (
    <div style={{ width: "100%", height: 300, minWidth: 250 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="users"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
