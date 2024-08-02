"use client";

import { RecoilRoot, atom, selector } from "recoil";

export const currentProjectState = atom({
  key: "currentProjectId",
  default: {},
});

export const projectIdsState = selector({
  key: "projectIds",
  get: async () => {
    try {
      const response = await fetch("http://localhost:8080/v1/project");
      const data = await response.json();
      return data; // Adjust according to your API response structure
    } catch (error) {
      console.error("Error fetching project IDs:", error);
      return []; // Return an empty array or handle errors as needed
    }
  },
});

export const getResponse = selector({
  key: "responses",
  get: async ({get}) => {

    const projectId = get(currentProjectState)

  }
})

export default function RecoidContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
