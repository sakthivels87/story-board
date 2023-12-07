"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewStoryPage = () => {
  return (
    <form>
      <div className="p-5 max-w-xl space-y-4">
        <TextField.Root>
          <TextField.Input placeholder="Title..." />
        </TextField.Root>
        <TextArea placeholder="Description..." />
        <Button>Submit New Story</Button>
      </div>
    </form>
  );
};

export default NewStoryPage;
