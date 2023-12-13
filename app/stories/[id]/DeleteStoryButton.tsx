"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";

interface Props {
  id: number;
}
const DeleteStoryButton = ({ id }: Props) => {
  const router = useRouter();
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">Delete story</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure want to delete this story?
        </AlertDialog.Description>
        <Flex mt="4" gap="3">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              color="red"
              onClick={async () => {
                console.log("story id: ", id);
                await axios.delete("/api/stories/" + id);
                router.push("/stories");
                router.refresh();
              }}
            >
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteStoryButton;
