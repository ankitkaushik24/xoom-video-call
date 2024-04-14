"use client";

import React from "react";
import { Button } from "./ui/button";
import {
  DeviceSettings,
  IconButton,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { DisabledVideoPreview } from "./DisabledVideoPreview";
import AllowBrowserPermissions from "./AllowBrowserPermissions";
import SpeechIndicator from "./SpeechIndicator";
import Alert from "./Alert";

const MeetingSetup = ({
  setIsSetupCompleted = (isCompleted: boolean) => {},
}) => {
  const call = useCall();
  const { useMicrophoneState, useCameraState } = useCallStateHooks();
  const { isMute: isMicMute, microphone } = useMicrophoneState();
  const { isMute: isCameraMute, camera } = useCameraState();

  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  if (callTimeNotArrived)
    return (
      <Alert
        title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
      />
    );

  if (callHasEnded)
    return (
      <Alert
        title="The call has been ended by the host"
        iconUrl="/icons/call-ended.svg"
      />
    );

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-center text-2xl font-bold">Setup</h1>
      <VideoPreview
        DisabledVideoPreview={DisabledVideoPreview}
        NoCameraPreview={AllowBrowserPermissions}
      />
      <div className="flex h-16 items-center justify-center gap-4">
        <SpeechIndicator />
        <IconButton
          icon={isMicMute ? "mic-off" : "mic"}
          onClick={() => microphone.toggle()}
        />
        <IconButton
          icon={isCameraMute ? "camera-off" : "camera"}
          onClick={() => camera.toggle()}
        />
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          setIsSetupCompleted(true);
        }}
      >
        Join meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
