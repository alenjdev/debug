export interface RosTopicStats {
  name: string;
  state: string | number;
}

export interface RosDebug {
  debug_stats: RosTopicStats[];
}

export interface RosDebugState {
  autonomy: boolean | undefined;
  bladeStatus: boolean | undefined;
  deadmanHandleStatus: boolean | undefined;
  leftRpm: number | undefined;
  rightRpm: number | undefined;
  voltage: number | undefined;
}
