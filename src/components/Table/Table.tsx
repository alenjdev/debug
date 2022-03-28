import { FC, useState, useEffect } from "react";

import { ModuleData, App, Device } from "@formant/data-sdk";
import { TableComponent } from "../TableComponent/index";
import { ErrorMsg } from "../ErrorMsg/ErrorMsg";

interface ITableProps {
  device: Device | undefined;
}

export const Table: FC<ITableProps> = ({ device }) => {
  const [errorMessage, setErrorMessage] = useState("Waiting for data...");
  const [state, setState] = useState({
    autonomy: undefined,
    bladeStatus: undefined,
    deadmanHandleStatus: undefined,
    leftRpm: undefined,
    rightRpm: undefined,
    voltage: undefined,
  });

  useEffect(() => {
    App.addModuleDataListener(receiveModuleData);
  }, [device]);

  const receiveModuleData = async (newValue: ModuleData) => {
    const streams = newValue.streams;
    if (Object.keys(streams).length === 0) {
      throw new Error("No streams.");
    }
    let currentState = state;
    Object.keys(streams).forEach((stream, idx) => {
      const latestState = getLatestData(streams, stream);
      if (typeof latestState !== "string" && latestState !== undefined) {
        if (
          streams[stream].data[0].name === "autonomy" &&
          (latestState as any).values[0] !== undefined
        )
          currentState.autonomy = (latestState as any).values[0];
        if (streams[stream].data[0].name === "left.rpm") {
          currentState.leftRpm = latestState;
        }
        if (streams[stream].data[0].name === "right.rpm")
          currentState.rightRpm = latestState;
        if (
          streams[stream].data[0].name === "blade.status" &&
          (latestState as any).values[0] !== undefined
        )
          currentState.bladeStatus = (latestState as any).values[0];
        if (
          streams[stream].data[0].name === "deadman.handle.status" &&
          (latestState as any).values[0] !== undefined
        )
          currentState.deadmanHandleStatus = (latestState as any).values[0];
        if (streams[stream].data[0].name === "voltage")
          currentState.voltage = latestState;
      }
      if (JSON.stringify(currentState) !== JSON.stringify(state)) {
        setState(currentState);
      }
    });
  };

  return (
    <TableComponent topicStats={state} tableHeaders={["Item", "Status"]} />
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
