"use client ";
import { Select } from "@radix-ui/themes";
import React from "react";

const AssigneeSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Select User</Select.Label>
          <Select.Item value="user1">User111</Select.Item>
          <Select.Item value="user2">User222</Select.Item>
          <Select.Item value="user3">User333</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
