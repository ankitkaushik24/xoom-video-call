"use client";

import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import {
  CallingState,
  StreamTheme,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import { FC, useState } from "react";

type MeetingProps = {
  params: { meetingId: string };
};

const Meeting: FC<MeetingProps> = (props) => {
  // const { useCallCallingState } = useCallStateHooks();
  // let callStatus = useCallCallingState();
  const [isSetupCompleted, setIsSetupCompleted] = useState(false);
  // console.log("callStatus", callStatus);

  return (
    <StreamTheme className="dark">
      {isSetupCompleted ? (
        <MeetingRoom />
      ) : (
        <MeetingSetup setIsSetupCompleted={setIsSetupCompleted} />
      )}
    </StreamTheme>
  );
};

export default Meeting;
