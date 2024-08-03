"use client";

import axios from "axios";
import { RecoilRoot, atom, selector } from "recoil";

export const currentProjectState = atom({
  key: "currentProjectId",
  default: {},
});

export const createProjectModalState = atom({
  key: "createProjectModal",
  default: false,
});

export const createProjectState = selector({ // post create project
  key: "createProject",
  get: async () => {
    try {
      const response = await axios.post("http://localhost:8080/v1/project", {});
      const data = response;
      return data; // Adjust according to your API response structure
    } catch (error) {
      console.error("Error fetching project IDs:", error);
      return []; // Return an empty array or handle errors as needed
    }
  },
});

export const projectIdsState = selector({ // get projectIds
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

export const getResponseState = selector({ // get responses
  key: "responses",
  get: async ({ get }) => {
    const projectId = get(currentProjectState);
    try {
      const response = await fetch(
        `http://localhost:8080/v1/responses/${projectId}`
      );
      const data = await response.json();
      return data; // Adjust according to your API response structure
    } catch (error) {
      console.error("Error fetching responses:", error);
      return []; // Return an empty array or handle errors as needed
    }
  },
});

export default function RecoilContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
