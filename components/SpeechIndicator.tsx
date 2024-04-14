"use client";

import {
  useCallStateHooks,
  createSoundDetector,
} from "@stream-io/video-react-sdk";
import { useState, useEffect } from "react";

const SpeechIndicator = () => {
  const { useMicrophoneState } = useCallStateHooks();
  const { isEnabled, mediaStream } = useMicrophoneState();
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (!isEnabled || !mediaStream) return;

    const disposeSoundDetector = createSoundDetector(
      mediaStream,
      ({ audioLevel }) => setPercentage(audioLevel),
      { detectionFrequencyInMs: 80, destroyStreamOnStop: false }
    );

    return () => {
      disposeSoundDetector().catch(console.error);
    };
  }, [isEnabled, mediaStream]);

  return (
    <div className="w-8 h-8 bg-zinc-800 rounded-full flex justify-center items-center">
      <div
        className="rounded-full bg-zinc-100 to-transparent w-full h-full"
        style={{ transform: `scale(${percentage / 100})` }}
      />
    </div>
  );
};

export default SpeechIndicator;
