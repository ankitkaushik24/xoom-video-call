"use client";

import Image from "next/image";
import React, { FC, MouseEvent, ReactNode } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";

const dateStr = ({ date = "" }) => (
  <p className="text-base font-normal">{date}</p>
);

const ActionBtns = ({
  handleClick = (e: MouseEvent) => {},
  buttonIcon1 = "",
  buttonText = "",
  link = "",
}) => {
  const { toast } = useToast();

  return (
    <div className="flex gap-2">
      <Button onClick={handleClick} className="rounded bg-blue-1 px-6">
        {buttonIcon1 && (
          <Image src={buttonIcon1} alt="feature" width={20} height={20} />
        )}
        &nbsp; {buttonText}
      </Button>
      <Button
        onClick={() => {
          navigator.clipboard.writeText(link);
          toast({
            title: "Link Copied",
          });
        }}
        className="bg-dark-4 px-6"
      >
        <Image src="/icons/copy.svg" alt="feature" width={20} height={20} />
        &nbsp; Copy Link
      </Button>
    </div>
  );
};

const ParticipantAvatars = ({ images = avatarImages, extras = 5 }) => {
  return (
    <div className="relative flex w-full max-sm:hidden">
      {images.map((img, index) => (
        <Image
          key={index}
          src={img}
          alt="attendees"
          width={40}
          height={40}
          className={cn("rounded-full", { absolute: index > 0 })}
          style={{ top: 0, left: index * 28 }}
        />
      ))}
      <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4">
        +{extras}
      </div>
    </div>
  );
};

export const avatarImages = [
  "/images/avatar-1.jpeg",
  "/images/avatar-2.jpeg",
  "/images/avatar-3.png",
  "/images/avatar-4.png",
  "/images/avatar-5.png",
];

type PropType = {
  icon: string;
  title: string;
  subTitle: ReactNode;
  bottomSlot: ReactNode;
};

const MeetingCard = ({
  icon = "",
  title = "",
  subTitle = <></>,
  bottomSlot = <></>,
}) => {
  return (
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]">
      <article className="flex flex-col gap-5">
        <Image src={icon} alt="upcoming" width={28} height={28} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            {subTitle}
          </div>
        </div>
      </article>
      <article className={cn("flex justify-center relative", {})}>
        {bottomSlot}
      </article>
    </section>
  );
};

MeetingCard.ParticipantAvatars = ParticipantAvatars;
MeetingCard.ActionBtns = ActionBtns;
MeetingCard.dateStr = dateStr;

export default MeetingCard;
