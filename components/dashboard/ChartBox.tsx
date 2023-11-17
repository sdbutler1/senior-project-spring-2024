// react components
import Link from "next/link";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

type Props = {
  color: string;
  // icon: string;
  title: string;
  dataKey: string;
  number: number | string;
  percentage: number;
  chartData: object[];
};

const ChartBox = (props: Props) => {
  return (
    <div className="formShadow h-full w-full flex items-center justify-center gap-4">
      <div className="h-full w-5/12 flex flex-col items-start justify-center gap-2">
        <div className="text-lg font-semibold">
          <span>{props.title}</span>
        </div>
        <h1>{props.number}</h1>
        <Link href={""} style={{ color: props.color }}>
          View all
        </Link>
      </div>
      <div className="h-full w-full flex flex-col items-center justify-center">
        <div className="h-full w-full flex items-center justify-center">
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={props.chartData}>
              <Tooltip
                contentStyle={{
                  background: "transparent",
                  border: "none",
                  position: "relative",
                  right: "40px",
                }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 70 }}
              />
              <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke={props.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="h-auto w-full flex flex-col items-start justify-center">
          <span
            style={{ color: props.percentage < 0 ? "tomato" : "limegreen" }}
          >
            {props.percentage}%
          </span>
          <span>this academic year </span>
        </div>
      </div>
    </div>
  );
};

export default ChartBox;
