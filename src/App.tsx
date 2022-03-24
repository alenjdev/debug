import "./App.css";
import { Table } from "./components/Table/Table";
import { Authentication, Fleet, Device } from "@formant/data-sdk";
import { useState, useEffect } from "react";

function App() {
  const [device, setDevice] = useState<Device | undefined>();
  useEffect(() => {
    getCurrentDevice();
  }, []);
  const getCurrentDevice = async () => {
    if (await Authentication.waitTilAuthenticated()) {
      const currentDevice = await Fleet.getCurrentDevice();
      setDevice(currentDevice);
    }
  };
  return (
    <div className="App">
      <Table device={device} />
    </div>
  );
}

export default App;
