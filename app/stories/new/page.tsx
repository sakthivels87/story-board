"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreateStorySchema = z.object({
  title: z.string().min(5, { message: "Title is required" }).max(255),
  description: z.string().min(5),
});

type StoryType = z.infer<typeof CreateStorySchema>;

const NewStoryPage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<StoryType>();
  const onSubmit = handleSubmit(async (data) => {
    try {
      const validation = CreateStorySchema.safeParse(data);
      if (!validation.success) {
        console.log("Error in Form Submission...", validation.error.errors);
      }
      const res = await axios.post("/api/stories", data);
      router.push("/stories");
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <form onSubmit={onSubmit}>
      <div className="p-5 max-w-xl space-y-4">
        <TextField.Root>
          <TextField.Input placeholder="Title..." {...register("title")} />
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description..." {...field} />
          )}
        />
        <Button>Submit New Story</Button>
      </div>
    </form>
  );
};

export default NewStoryPage;
