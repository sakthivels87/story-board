"use client";
import { Status, Story } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

const UpdateStoryStatus = ({ story }: { story: Story }) => {
  const router = useRouter();
  const statuses: { label: string; value: Status }[] = [
    {
      label: "Open",
      value: "OPEN",
    },
    {
      label: "In Progress",
      value: "IN_PROGRESS",
    },
    {
      label: "Closed",
      value: "CLOSED",
    },
  ];
  const updateStatus = async (status: string) => {
    const resp = await axios
      .patch("/api/stories/" + story.id, {
        status,
      })
      .catch((e) => {
        toast.error(
          "Error occurred. Unable to update the status. " + e.message
        );
      });
    if (resp?.status === 200) {
      router.push("/stories/list");
      router.refresh();
    }
  };
  return (
    <>
      <Select.Root defaultValue={story.status} onValueChange={updateStatus}>
        <Select.Trigger placeholder="update status" radius="large" />
        <Select.Content>
          {statuses.map((status) => (
            <Select.Item key={status.label} value={status.value}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <Toaster position="top-center" />
    </>
  );
};

export default UpdateStoryStatus;
