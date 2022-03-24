import { RosDebugState } from "../types/RosTopicStats";

export const getContent = (
  _: string,
  topicStats: RosDebugState
): (string | number)[] => {
  if (
    _ === "Deadman Handle status" &&
    topicStats?.deadmanHandleStatus === undefined
  )
    return ["-", "unknown"];
  if (_ === "Deadman Handle status" && topicStats?.deadmanHandleStatus === true)
    return ["Engaged", "critical"];
  if (
    _ === "Deadman Handle status" &&
    topicStats?.deadmanHandleStatus === false
  )
    return ["Disengaged", "good"];
  if (_ === "Autonomy" && topicStats?.autonomy === undefined)
    return ["-", "unknown"];
  if (_ === "Autonomy" && topicStats?.autonomy === true)
    return ["Enable", "good"];
  if (_ === "Autonomy" && topicStats?.autonomy === false)
    return ["Disable", "bad"];
  if (_ === "Blade" && topicStats?.bladeStatus === undefined)
    return ["-", "unknown"];
  if (_ === "Blade" && topicStats?.bladeStatus === true)
    return ["Engaged", "good"];
  if (_ === "Blade" && topicStats?.bladeStatus === false)
    return ["Disengaged", "critical"];
  if (_ === "Left RPM" && topicStats?.leftRpm === undefined)
    return ["-", "unknown"];
  if (_ === "Left RPM" && topicStats?.leftRpm !== undefined)
    return topicStats?.leftRpm === 0
      ? [topicStats?.leftRpm, "bad"]
      : [Math.round(topicStats?.leftRpm), "good"];
  if (_ === "Right RPM" && topicStats?.rightRpm === undefined)
    return ["-", "unknown"];
  if (_ === "Right RPM" && topicStats?.rightRpm !== undefined)
    return topicStats?.rightRpm === 0
      ? [topicStats?.rightRpm, "bad"]
      : [Math.round(topicStats?.rightRpm), "good"];
  if (_ === "Voltage" && topicStats?.voltage === undefined)
    return ["-", "unknown"];
  if (_ === "Voltage" && topicStats?.voltage !== undefined)
    return topicStats?.voltage === 0
      ? [topicStats?.voltage, "bad"]
      : [Math.round(topicStats?.voltage), "good"];
  return ["-", "unknown"];
};
