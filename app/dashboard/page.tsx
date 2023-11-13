"use client";

// react components
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

// global states
import { useGlobalLoading } from "@/globalStates/useGlobalLoading";

//components
import { useAuth } from "@/context/AuthContext";
import BarChartBox from "@/components/barChartBox/BarChartBox";
import BigChartBox from "@/components/bigChartBox/BigChartBox";
import ChartBox from "@/components/chartBox/ChartBox";
import PieChartBox from "@/components/PieChartBox";
import TopBox from "@/components/TopBox";

// assets
import {
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from "@/data";

type Props = {};

const Dashboard = (props: Props) => {
  const { setLoading } = useGlobalLoading();
  const { user } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);
  
  return (
    <>
      <div className="h-full w-full flex items-center justify-center gap-8">
        <div className="h-full w-3/12 flex flex-col items-center justify-center gap-8">
          <div className="formShadow h-3/4 w-full overflow-y-scroll">
            <TopBox />
          </div>
          <div className="formShadow h-1/4 w-full flex flex-col items-center justify-center overflow-hidden">
            <BarChartBox {...barChartBoxVisit} />
          </div>
        </div>
        <div className="h-full w-6/12 flex flex-col items-center justify-center gap-4">
          <div className="h-5/6 w-full grid grid-cols-2 grid-rows-2 gap-4">
            <div className="formShadow h-full w-full flex items-center justify-center">
              <ChartBox {...chartBoxUser} />
            </div>
            <div className="formShadow h-full w-full flex items-center justify-center">
              <ChartBox {...chartBoxProduct} />
            </div>
            <div className="formShadow h-full w-full flex items-center justify-center">
              <ChartBox {...chartBoxConversion} />
            </div>
            <div className="formShadow h-full w-full flex items-center justify-center">
              <ChartBox {...chartBoxRevenue} />
            </div>
          </div>
          <div className="formShadow h-full w-full flex items-center justify-center">
            <BigChartBox />
          </div>
        </div>
        <div className="h-full w-3/12 flex flex-col items-center justify-center gap-8">
          <div className="formShadow h-3/4 w-full flex flex-col items-center justify-center">
            <PieChartBox />
          </div>
          <div className="formShadow h-1/4 w-full flex flex-col items-center justify-center overflow-hidden">
            <BarChartBox {...barChartBoxRevenue} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
