"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const statuses: { label: String; value?: Status }[] = [
  {
    label: "All",
  },
  { label: "Open", value: "OPEN" },
  { label: "In_Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];
const StoryStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Select.Root
      defaultValue={searchParams.get("status") || " "}
      onValueChange={(status) => {
        const query = status.trim() ? `?status=${status}` : "";
        router.push("/stories/list" + query);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value || ""} value={status.value || " "}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default StoryStatusFilter;
