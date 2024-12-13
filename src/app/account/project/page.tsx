"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryOptions, countryOptions } from "@/lib/options";
import FileUpload from "@/components/FileUpload";

interface Project {
  projectId: string;
  name: string;
  website: string;
  description: string | null;
  logoUrl: string;
  country: string;
  category: string;
}

export default function ProjectSettings() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editedProjects, setEditedProjects] = useState<{
    [key: string]: Project;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/user`,
        {
          withCredentials: true,
        }
      );
      setProjects(response.data.projects);
      const initialEditedProjects = response.data.projects.reduce(
        (acc: { [key: string]: Project }, project: Project) => {
          acc[project.projectId] = { ...project };
          return acc;
        },
        {}
      );
      setEditedProjects(initialEditedProjects);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch projects");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    projectId: string,
    name: string,
    value: string
  ) => {
    setEditedProjects((prev) => ({
      ...prev,
      [projectId]: {
        ...prev[projectId],
        [name]: value,
      },
    }));
  };

  const handleUpdate = async (projectId: string) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/project`,
        editedProjects[projectId],
        {
          withCredentials: true,
        }
      );
      toast.success("Project updated successfully!");
      fetchProjects();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update project");
    }
  };

  const isProjectChanged = (projectId: string) => {
    const originalProject = projects.find((p) => p.projectId === projectId);
    const editedProject = editedProjects[projectId];
    return (
      originalProject &&
      (originalProject.name !== editedProject.name ||
        originalProject.description !== editedProject.description ||
        originalProject.category !== editedProject.category ||
        originalProject.country !== editedProject.country ||
        originalProject.logoUrl !== editedProject.logoUrl)
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Project Settings</h1>
      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <Card key={project.projectId} className="w-full">
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row md:items-start md:space-x-4">
              <div className="mb-4 md:mb-0">
                <img
                  src={
                    editedProjects[project.projectId]?.logoUrl ||
                    "/placeholder.svg"
                  }
                  alt={editedProjects[project.projectId]?.name}
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <FileUpload
                  setDetails={(update :any) => {
                    setEditedProjects((prev) => ({
                      ...prev,
                      [project.projectId]: {
                        ...prev[project.projectId],
                        logoUrl: update.logoUrl, // Update only the logoUrl
                      },
                    }));
                  }}
                />
              </div>
              <div className="flex-grow space-y-4">
                <Input
                  name="name"
                  value={editedProjects[project.projectId]?.name}
                  onChange={(e) =>
                    handleInputChange(project.projectId, "name", e.target.value)
                  }
                  placeholder="Project Name"
                />
                <textarea
                  name="description"
                  value={editedProjects[project.projectId]?.description || ""}
                  onChange={(e) =>
                    handleInputChange(
                      project.projectId,
                      "description",
                      e.target.value
                    )
                  }
                  placeholder="Description"
                />
                <Select
                  value={editedProjects[project.projectId]?.category}
                  onValueChange={(value) =>
                    handleInputChange(project.projectId, "category", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={editedProjects[project.projectId]?.country}
                  onValueChange={(value) =>
                    handleInputChange(project.projectId, "country", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  name="website"
                  value={editedProjects[project.projectId]?.website}
                  disabled
                  placeholder="Website"
                />
                <Button
                  onClick={() => handleUpdate(project.projectId)}
                  disabled={!isProjectChanged(project.projectId)}
                >
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
