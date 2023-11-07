// global states
// import { globalUserPhoto } from "@/globalStates/globalUserPhoto";

// assets
import defaultPhoto from "@/public/assets/default.png";
import prof_jefferson from "@/public/assets/prof_jefferson.png";
import prof_bookert from "@/public/assets/prof_bookert.png";
import prof_brown from "@/public/assets/prof_brown.png";
import admin_OnealAndrade from "@/public/assets/admin_OnealAndrade.png";
import student_brown from "@/public/assets/student_brown.png";
import student_carby from "@/public/assets/student_carby.png";

const UserList = () => {
  // const { photo } = globalUserPhoto();
  const userList = [
    {
      id: 1,
      photo: prof_brown,
      email: "james.brown@shawu.edu",
      title: "Dr.",
      firstName: "James",
      lastName: "Brown",
    },
    {
      id: 2,
      photo: prof_jefferson,
      email: "roddrick.jefferson@shawu.edu",
      title: "Prof.",
      firstName: "Roddrick",
      lastName: "Jefferson",
    },
    {
      id: 3,
      photo: prof_bookert,
      email: "nyteisha.bookert@shawu.edu",
      title: "Dr.",
      firstName: "Nyteisha",
      lastName: "Bookert",
    },
    {
      id: 4,
      photo: admin_OnealAndrade,
      email: "patsy.onealandrade@shawu.edu",
      title: "Mrs.",
      firstName: "Patsy",
      lastName: "Oneal-Andrade",
    },
    {
      id: 5,
      photo: student_brown,
      email: "mbrown636_1@bears.shawu.edu",
      title: "Dr.",
      firstName: "Marc",
      lastName: "Brown",
    },
    {
      id: 6,
      photo: student_carby,
      email: "mcarby991@bears.shawu.edu",
      title: "Dr.",
      firstName: "Matthew",
      lastName: "Carby",
    },
  ];

  return userList;
};

export default UserList;
