export interface ModuleConfig {
  debugItems: MonitoringSection[];
}

export interface MonitoringSection {
  stream: streamNames;
  type: string;
  name: string;
  state: string | number;
}

export type streamNames =
  | "deadman.handle.status"
  | "autonomy"
  | "blade.status"
  | "left.rpm"
  | "right.rpm"
  | "voltage";
