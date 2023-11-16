import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { year: "2017", average: 40 },
  { year: "2018", average: 54 },
  { year: "2019", average: 67 },
  { year: "2020", average: 79 },
  { year: "2021", average: 76 },
  { year: "2022", average: 81 },
  { year: "2023", average: 92 },
];

const BigChartBox = () => {
  return (
    <div className="formShadow h-full w-full flex flex-col items-start justify-start gap-">
      <h1 className="topboxheader">Graduate employment rate</h1>
      <div className="h-4/5 w-full">
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="average"
              stackId="1"
              stroke="#b57b55"
              fill="#b57b55"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BigChartBox;
