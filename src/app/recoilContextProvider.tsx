"use client";

import { RecoilRoot, atom } from "recoil";

export const currentProjectState = atom({
  key: "currentProjectState",
  default: "",
});

export default function RecoidContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
