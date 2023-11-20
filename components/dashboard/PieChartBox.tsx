import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Freshman", value: 17, color: "#0088FE" },
  { name: "Sophomore", value: 26, color: "#00C49F" },
  { name: "Junior", value: 43, color: "#FFBB28" },
  { name: "Senior", value: 32, color: "#FF8042" },
];

const PieChartBox = () => {
  return (
    <div className="formShadow h-full w-full flex flex-col items-start justify-start">
      <h1 className="topboxheader">Internships</h1>
      <div className="h-full w-full">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={data}
              innerRadius={"70%"}
              outerRadius={"90%"}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="w-full flex items-center justify-center">
        {data.map((item) => (
          <div
            className="w-full flex flex-col items-center justify-center gap-2"
            key={item.name}
          >
            <div className="w-full flex items-center justify-start gap-1 ml-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: item.color }}
              ></span>
              <span className="text-sm">{item.name}</span>
            </div>
            <span className="text-sm">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartBox;
