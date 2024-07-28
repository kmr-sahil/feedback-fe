"use client";

import { RecoilRoot, atom } from "recoil";
export const currentProjectState = atom({
    key: 'currentProjectState',
    default: "12258",
});

export default function RecoidContextProvider({ children }: { children: React.ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}