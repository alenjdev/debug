import { FC, useState, useEffect } from "react";

import { ModuleData, App, Device } from "@formant/data-sdk";
import { TableComponent } from "../TableComponent/index";
import { ErrorMsg } from "../ErrorMsg/ErrorMsg";

interface ITableProps {
  device: Device | undefined;
}

export const Table: FC<ITableProps> = ({ device }) => {
  const [errorMessage, setErrorMessage] = useState("Waiting for data...");
  const [autonomy, setAutonomy] = useState();
  const [bladeStatus, setBladeStatus] = useState();
  const [deadmanHandleStatus, setDeadmanHandleStatus] = useState();
  const [leftRpm, setLeftRpm] = useState();
  const [rightRpm, setRightRpm] = useState();
  const [voltage, setVoltage] = useState();

  useEffect(() => {
    App.addModuleDataListener(receiveModuleData);
  }, [device]);

  const receiveModuleData = async (newValue: ModuleData) => {
    const streams = newValue.streams;
    if (Object.keys(streams).length === 0) {
      throw new Error("No streams.");
    }
    Object.keys(streams).forEach((stream, idx) => {
      const latestState = getLatestData(streams, stream);
      if (typeof latestState !== "string" && latestState !== undefined) {
        if (
          streams[stream].data[0].name === "autonomy" &&
          (latestState as any).values[0] !== undefined
        )
          setAutonomy((latestState as any).values[0]);
        if (streams[stream].data[0].name === "left.rpm") {
          setLeftRpm(latestState);
        }
        if (streams[stream].data[0].name === "right.rpm")
          setRightRpm(latestState);
        if (
          streams[stream].data[0].name === "blade.status" &&
          (latestState as any).values[0] !== undefined
        )
          setBladeStatus((latestState as any).values[0]);
        if (
          streams[stream].data[0].name === "deadman.handle.status" &&
          (latestState as any).values[0] !== undefined
        )
          setDeadmanHandleStatus((latestState as any).values[0]);
        if (streams[stream].data[0].name === "voltage") setVoltage(latestState);
      }
    });
  };

  return (
    <TableComponent
      topicStats={{
        autonomy,
        bladeStatus,
        deadmanHandleStatus,
        leftRpm,
        rightRpm,
        voltage,
      }}
      tableHeaders={["Item", "Status"]}
    />
  );
};

const getLatestData = (moduleData: any, stream: string): string | undefined => {
  if (moduleData[stream] === undefined) {
    return "No stream.";
  }
  if (moduleData[stream].loading) {
    return undefined;
  }
  if (moduleData[stream].tooMuchData) {
    return "Too much data.";
  }

  if (moduleData[stream].data.length === 0) {
    return "No data.";
  }
  const latestPoint = moduleData[stream].data[0].points.at(-1);
  if (!latestPoint) {
    return "No datapoints.";
  }
  return latestPoint[1];
};
