import { getCallToken } from "@/actions/callClient.actions";
// import { useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

import React, { FC, ReactNode } from "react";
import StreamClientProvider from "./StreamClientProvider";

const SteamProvider: FC<{
  children: ReactNode;
}> = async ({ children }) => {
  const user = await currentUser();
  const token = await getCallToken();

  // if (!API_KEY) throw new Error("Stream API key is missing");
  if (!user) return;

  // const callRoom = client!.call("default", callId);

  // callRoom.camera.enable();
  // callRoom.microphone.enable();

  return (
    <StreamClientProvider
      user={{
        id: user.id,
        name: user.fullName || user.id,
        image: user.imageUrl,
      }}
      token={token}
    >
      {children}
    </StreamClientProvider>
  );

  // return (
  //   <StreamVideo client={client}>
  //     {children}
  //     {/* <StreamCall call={callRoom}>{children}</StreamCall> */}
  //   </StreamVideo>
  // );
};

export default SteamProvider;
