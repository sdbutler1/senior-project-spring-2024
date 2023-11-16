// components
import { StudentData } from "@/app/student/studentData";

// icons
import HowToRegIcon from "@mui/icons-material/HowToReg";

const TopBox = () => {
  return (
    <div className="formShadow h-4/6 w-full flex flex-col items-start justify-start">
      <h1 className="w-full topboxheader">Students</h1>
      <div className="w-full flex flex-col items-start justify-center gap-4">
        {StudentData.map((student) => (
          <div
            className="h-full w-full flex items-start justify-between"
            key={student.id}
          >
            <div>
              <div>
                <div className="topboxNames ">
                  <span>{student.firstName}</span>
                  <span>{student.lastName}</span>
                </div>
                <span className="text-[0.85rem] font-semibold">{student.email}</span>
              </div>
            </div>
            <span className="h-12 flex items-center justify-center gap-1 font-semibold">
              <HowToRegIcon className="mb-1"/>
              {student.id}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBox;
