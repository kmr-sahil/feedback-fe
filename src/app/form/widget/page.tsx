"use client";

import React, { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import WidgetComponent from "./widgetCmp";

export default function WidgetSetupGuide() {
  const [copied, setCopied] = useState(false);
  const [widgetCode, setWidgetCode] = useState("Loading widget code...");

  useEffect(() => {
    const fetchWidgetCode = async () => {
      try {
        // Fetch the content of code.text from the public folder
        const response = await fetch("/widget.text");
        if (!response.ok) {
          throw new Error("Failed to fetch widget code");
        }
        const text = await response.text();
        setWidgetCode(text);
      } catch (error) {
        console.error("Error fetching widget code:", error);
        setWidgetCode("Error loading widget code.");
      }
    };

    fetchWidgetCode();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(widgetCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout>
      <WidgetComponent projectId={"1"} />
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">
          How to Implement the Feedback Widget
        </h1>

        <Card className="mb-8 max-w-[40rem] ">
          <CardHeader>
            <CardTitle>Step 1: Create the Widget Component</CardTitle>
            <CardDescription>
              Copy the following code and create a new file named
              'FeedbackWidget.tsx' in your components directory.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative ">
              <pre className=" bg-gray-100 p-4 rounded-md h-[20rem] overflow-y-auto">
                <code className="text-sm">{widgetCode}</code>
              </pre>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-2 right-2"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Step 2: Implement the Widget in Your Page</CardTitle>
            <CardDescription>
              Add the FeedbackWidget component to any page where you want to
              collect feedback.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              <code className="text-sm">{`import FeedbackWidget from '@/components/FeedbackWidget'

export default function YourPage() {
  return (
    <div>
      {/* Your other page content */}
      <FeedbackWidget projectId="your-project-id" />
    </div>
  )
}`}</code>
            </pre>
            <p className="mt-4 text-sm text-gray-600">
              Replace "your-project-id" with the actual project ID you want to
              use for collecting feedback.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
