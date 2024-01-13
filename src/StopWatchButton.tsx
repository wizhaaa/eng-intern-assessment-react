import React from "react";

type StopWatchBUttonProps = {
  children: string;
  onClick: () => void;
  variant?: string;
};

export default function StopWatchButton({
  children,
  onClick,
  variant,
}: Readonly<StopWatchBUttonProps>) {
  return (
    <button className={variant} onClick={onClick}>
      {children}
    </button>
  );
}
