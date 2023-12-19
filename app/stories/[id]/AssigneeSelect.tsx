"use client";
import React, { useEffect, useState } from "react";
import { Story, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@/app/components/Skeleton";

const AssigneeSelect = ({ story }: { story: Story }) => {
  const { data: users, error, isLoading } = useUsers();

  if (error) return null;
  if (isLoading) return <Skeleton />;
  return (
    <Select.Root
      defaultValue={story.assignedToUserId || " "}
      onValueChange={(userId) => {
        axios.patch("/api/stories/" + story.id, {
          assignedToUserId: userId || null,
        });
      }}
    >
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Select User</Select.Label>
          <Select.Item value=" ">UnAssigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

export default AssigneeSelect;
