"use client";

// react components
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

// global states
import { globalSideBar } from "../../globalStates/globalSideBar";

//components
import { useAuth } from "@/context/AuthContext";
import BarChartBox from "@/components/barChartBox/BarChartBox";
import BigChartBox from "@/components/bigChartBox/BigChartBox";
// import ChartBox from "@/components/chartBox/ChartBox";
import PieChartBox from "@/components/pieCartBox/PieChartBox";
import TopBox from "@/components/topBox/TopBox";

// assets
import { StudentData } from "@/app/student/studentData";
import {
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from "@/data";

// css
import "./home.scss";

type Props = {};

const Dashboard = (props: Props) => {
  const { isSidebarOpen, isSidebarHidden } = globalSideBar();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);

  return (
    <>
      <div className="h-full w-1/5 flex flex-col items-center justify-center"></div>
      <div className="home">
        <div className="box box1">
          <TopBox />
        </div>
        <div className="box box2">{/* <ChartBox {...chartBoxUser} /> */}</div>
        <div className="box box3">
          {/* <ChartBox {...chartBoxProduct} /> */}
        </div>
        <div className="box box4">
          <PieChartBox />
        </div>
        <div className="box box5">
          {/* <ChartBox {...chartBoxConversion} /> */}
        </div>
        <div className="box box6">
          {/* <ChartBox {...chartBoxRevenue} /> */}
        </div>
        <div className="box box7">
          <BigChartBox />
        </div>
        <div className="box box8">
          <BarChartBox {...barChartBoxVisit} />
        </div>
        <div className="box box9">
          <BarChartBox {...barChartBoxRevenue} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
