// 1. Meta
// 2. Stories
// 3. Type meta and stories

import Avatar, { Size } from "@/components/ui/atom/avatar";
import { type Meta, type StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

// Test onclick
import { expect, fn } from "storybook/test";
import { Button } from "../button";

const sizeOptions: Size[] = ["sm", "md", "lg", "xl"];

const meta = {
  title: "Design System/Atom/Avatar",
  component: Avatar,

  // Default args (if any)
  args: {
    src: "https://github.com/shadcn.png",
    alt: "Avatar Image",
    isOnline: false,
    size: "md",
    onClick: fn(),
  },
  argTypes: {
    size: {
      control: { type: "radio" },
      options: sizeOptions,
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;

// Story gedeg ni custom ner. Tuhain componentiig Actor gej uzvel Story oosoo shaltgaalaad helber duree uurclunu. Jijig, tom zereg story d togloj bn c ghimu tged oilgo hha
type Story = StoryObj<typeof Avatar>;

export const Default = {} satisfies Story;

export const Small = {
  args: {
    size: "sm",
  },
} satisfies Story;

export const Large = {
  args: {
    size: "lg",
  },
} satisfies Story;

export const XLarge = {
  args: {
    size: "xl",
  },
} satisfies Story;

export const OnlineIndicator = {
  args: {
    isOnline: true,
  },
} satisfies Story;

export const PlaceHolderImage = {
  args: {
    src: "Invalid Image",
  },
} satisfies Story;

// Story book deere render hiih arga
export const DynamicPresenceIndicator = {
  //
  // Arilgaj bolno default bgag
  argTypes: {
    isOnline: { control: false },
  },

  render: (args) => {
    const [isOnline, setIsOnline] = useState<boolean>(false);

    return (
      <div className="flex flex-col items-start gap-4">
        <Avatar {...args} src="Invalid" isOnline={isOnline} />

        <p>Is Online: {JSON.stringify(isOnline)}</p>
        <Button onClick={() => setIsOnline((prev) => !prev)}>{isOnline ? "Disconnect" : "Connect"}</Button>
      </div>
    );
  },

  play: async ({ canvas, userEvent }) => {
    const button = await canvas.findByRole("button", { name: /connect/gi });
    expect(button).toBeInTheDocument();

    await userEvent.click(button);

    const indicator = await canvas.findByTestId("presence-indicator")

    expect(indicator).toBeInTheDocument();
  },
} satisfies Story;
