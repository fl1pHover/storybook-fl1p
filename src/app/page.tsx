'use client';

import Avatar from "@/components/ui/atom/avatar";
import Image from "next/image";
import {useState} from "react";

export default function Home() {
const [isOnline, setIsOnline] = useState<boolean>(false);

  return (
    <div>
      <Avatar src='https://github.com/shadcn.png' size={'xl'} isOnline={isOnline} />
      {JSON.stringify(isOnline)}
      <button onClick={() => setIsOnline((prev) => !prev)}>{isOnline ? "Disconnect" : "Connect"}</button>
    </div>
  );
}
