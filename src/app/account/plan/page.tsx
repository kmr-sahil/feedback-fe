"use client";
import { ArrowLeft, CreditCard, Gear, Headset } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ManagePlan() {
  const router = useRouter();
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex items-center mb-6">
        <button
          className="p-2 rounded-full hover:bg-gray-100"
          onClick={() => router.back()}
        >
          <ArrowLeft size={32} />
          <span className="sr-only">Back</span>
        </button>

        <h1 className="text-2xl font-bold">Manage Plan</h1>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Active Plan</h2>
            <p className="text-sm text-gray-600">Your current subscription</p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">Pro Plan</h3>
              <p className="text-sm text-gray-600">$29.99/month</p>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
              Active
            </span>
          </div>
          <button className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50">
            Change Plan
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Plan Management</h2>
            <p className="text-sm text-gray-600">Manage your subscription</p>
          </div>
          <div className="space-y-4">
            <button className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 flex items-center">
              <CreditCard size={32} />
              Update Payment Method
            </button>
            <button className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 flex items-center">
              <Gear size={32} />
              Billing Settings
            </button>
            <button className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 flex items-center">
              <Headset size={32} />
              Get Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
