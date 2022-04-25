import { FC, useState, useEffect } from "react";
import { ModuleData, App, Device } from "@formant/data-sdk";
import { TableComponent } from "../TableComponent/index";

interface ITableProps {
  device: Device | undefined;
}

export const Table: FC<ITableProps> = ({ device }) => {
  const [autonomy, setAutonomy] = useState<boolean | undefined>();
  const [bladeStatus, setBladeStatus] = useState();
  const [deadmanHandleStatus, setDeadmanHandleStatus] = useState();
  const [leftRpm, setLeftRpm] = useState();
  const [rightRpm, setRightRpm] = useState();
  const [voltage, setVoltage] = useState();
  const [clearDataInSeconds] = useState(10);

  useEffect(() => {
    App.addModuleDataListener(receiveModuleData);
  }, [device]);

  const shouldClearData = (
    lastUpdate: number,
    scruttingTime: number,
    seconds: number
  ) => {
    return lastUpdate + seconds * 1000 < scruttingTime;
  };

  const receiveModuleData = async (newValue: ModuleData) => {
    const streams = newValue.streams;
    if (Object.keys(streams).length === 0) {
      throw new Error("No streams.");
    }
    Object.keys(streams).forEach((stream) => {
      const latestState = getLatestData(streams, stream);
      if (typeof latestState[1] !== "string" && latestState[1] !== undefined) {
        if (
          streams[stream].data[0].name === "autonomy" &&
          (latestState[1] as any).values[0] !== undefined
        ) {
          if (
            shouldClearData(latestState[0], newValue.time, clearDataInSeconds)
          ) {
            setAutonomy(undefined);
            return;
          }
          setAutonomy((latestState[1] as any).values[0]);
        }
        if (streams[stream].data[0].name === "left.rpm") {
          if (
            shouldClearData(latestState[0], newValue.time, clearDataInSeconds)
          ) {
            setLeftRpm(undefined);
            return;
          }
          setLeftRpm(latestState[1]);
        }
        if (streams[stream].data[0].name === "right.rpm") {
          if (
            shouldClearData(latestState[0], newValue.time, clearDataInSeconds)
          ) {
            setRightRpm(undefined);
            return;
          }
          setRightRpm(latestState[1]);
        }
        if (
          streams[stream].data[0].name === "blade.status" &&
          (latestState[1] as any).values[0] !== undefined
        ) {
          if (
            shouldClearData(latestState[0], newValue.time, clearDataInSeconds)
          ) {
            setBladeStatus(undefined);
            return;
          }
          setBladeStatus((latestState[1] as any).values[0]);
        }
        if (
          streams[stream].data[0].name === "deadman.handle.status" &&
          (latestState[1] as any).values[0] !== undefined
        ) {
          if (
            shouldClearData(latestState[0], newValue.time, clearDataInSeconds)
          ) {
            setDeadmanHandleStatus(undefined);
            return;
          }
          setDeadmanHandleStatus((latestState[1] as any).values[0]);
        }
        if (streams[stream].data[0].name === "voltage") {
          if (
            shouldClearData(latestState[0], newValue.time, clearDataInSeconds)
          ) {
            setVoltage(undefined);
            return;
          }
          setVoltage(latestState[1]);
        }
      }
    });
  };

  return (
    <TableComponent
      tableHeaders={["Item", "Status"]}
      topicStats={{
        autonomy,
        bladeStatus,
        deadmanHandleStatus,
        leftRpm,
        rightRpm,
        voltage,
      }}
    />
  );
};

const getLatestData = (moduleData: any, stream: string): any | undefined => {
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
  return latestPoint;
};
