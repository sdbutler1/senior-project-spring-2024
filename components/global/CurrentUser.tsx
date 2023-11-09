"use client";

// react components
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";

// global states

// components

interface UserData {
  emailPhoto: string;
  firstName: string;
  lastName: string;
  title: string;
}

type Props = {};

const CurrentUser = (props: Props) => {
  const { user } = useAuth();
  const [userData, setUserData] = React.useState<UserData | null>(null);

  if (user) {
    const docRef = doc(db, "authUsers", `${user.uid}`);

    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const docSnapshot = await getDoc(docRef);
          if (docSnapshot.exists()) {
            const data = docSnapshot.data() as UserData;
            setUserData(data);
          } else {
            console.log("Document does not exist");
          }
        } catch (error) {
          console.error("Error fetching document:", error);
        }
      };
      fetchData();
    }, [docRef]);
  }

  return userData;
};

export default CurrentUser;
