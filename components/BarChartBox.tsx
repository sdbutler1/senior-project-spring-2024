import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";

type Props = {
  title: string;
  color: string;
  dataKey: string;
  chartData: object[];
};

const BarChartBox = (props: Props) => {
  return (
    <div className="formShadow h-2/6 w-full flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">{props.title}</h1>
      <div className="h-full w-full flex items-center justify-center">
        <ResponsiveContainer width="99%" height={120}>
          <BarChart data={props.chartData}>
            <Tooltip
              contentStyle={{
                display: "flex",
                background: "#fff",
                color: "#fff",
                borderRadius: "5px",
                fontSize: "1rem",
                fontWeight: "bold",
                border: "none",
              }}
              cursor={{ fill: "none" }}
            />
            <Bar dataKey={props.dataKey} fill={props.color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartBox;
