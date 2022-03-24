import { ModuleConfig } from "../types/ModuleConfig";

export const moduleConfig: ModuleConfig = {
  debugItems: [
    {
      stream: "deadman.handle.status",
      type: "bool",
      name: "Deadman Handle status",
      state: "Enable" || "Disable",
    },
    {
      stream: "autonomy",
      type: "bool",
      name: "Autonomy",
      state: "Enable" || "Disable",
    },
    {
      stream: "blade.status",
      type: "bool",
      name: "Blade",
      state: "Engaged" || "Not Engaged",
    },
    {
      stream: "left.rpm",
      type: "numeric",
      name: "Left RPM",
      state: 0,
    },
    {
      stream: "right.rpm",
      type: "numeric",
      name: "Right RPM",
      state: 0,
    },
    {
      stream: "voltage",
      type: "numeric",
      name: "Voltage",
      state: 0,
    },
  ],
};
