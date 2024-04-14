"use client";

import MeetingCard from "@/components/MeetingCard";
import useCallList from "@/hooks/useCallList";
import { CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useEffect, useReducer } from "react";

type RecordingFetchStateType = {
  isFetching: boolean;
  errered: any;
  recordings: CallRecording[];
};

const Recordings = () => {
  const router = useRouter();
  const { calls, isLoading, error } = useCallList();
  const [{ recordings, isFetching, errered }, dispatchRecordingFetchState] =
    useReducer(
      (
        state: RecordingFetchStateType,
        newState: Partial<RecordingFetchStateType>
      ) => {
        return { ...state, ...newState };
      },
      {
        isFetching: false,
        errered: null,
        recordings: [],
      }
    );

  useEffect(() => {
    if (!calls) return;

    dispatchRecordingFetchState({ isFetching: true });

    const query = calls.map((call) => call.queryRecordings());

    Promise.all(query)
      .then((meetingRecordings) => {
        console.log({ meetingRecordings });
        const recordings = meetingRecordings.flatMap(
          (meeting) => meeting.recordings
        );

        dispatchRecordingFetchState({ recordings });
      })
      .catch((e) => {
        dispatchRecordingFetchState({ errered: e });
      })
      .finally(() => {
        dispatchRecordingFetchState({ isFetching: false });
      });
  }, [calls]);

  if (isLoading || isFetching) {
    return "Loading...";
  }

  if (error || errered) {
    return (error || errered).toString?.();
  }

  if (!recordings?.length) {
    return "No recording found";
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Recordings</h1>
      <ul className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {recordings.map((callRecording) => (
          <li key={callRecording.url}>
            <MeetingCard
              icon="/icons/recordings.svg"
              title={
                callRecording.filename?.substring(0, 20) || "No Description"
              }
              subTitle={
                <MeetingCard.dateStr
                  date={callRecording.start_time?.toLocaleString()}
                />
              }
              bottomSlot={
                <MeetingCard.ActionBtns
                  buttonIcon1="/icons/play.svg"
                  buttonText="Play"
                  link={callRecording.url}
                  handleClick={(e) => router.push(callRecording.url)}
                />
              }
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Recordings;
