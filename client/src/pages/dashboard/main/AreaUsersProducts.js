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

export default function AreaUsersProducts() {
  const {
    state: { users, products, tasks },
  } = useValue();
  const [data, setData] = React.useState([]);

  useEffect(() => {
    for (let i = 0; i < months; i++) {
      tempData[i].products = 0;
    }
    products.forEach((user) => {
      for (let i = 0; i < months; i++) {
        if (moment(tempData[i].date).isSame(user?.createdAt, "month")) {
          return tempData[i].products++;
        }
      }
    });
    setData([...tempData]);
  }, [products]);

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
      tempData[i].tasks = 0;
    }
    tasks.forEach((task) => {
      for (let i = 0; i < months; i++) {
        if (moment(tempData[i].date).isSame(task?.createdAt, "month")) {
          return tempData[i].tasks++;
        }
      }
    });
    setData([...tempData]);
  }, [tasks]);

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
            dataKey="products"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="users"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Area
            type="monotone"
            dataKey="tasks"
            stackId="1"
            stroke="#17f9ff"
            fill="#17f9ff"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
