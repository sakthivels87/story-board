"use client";

import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { CreateStorySchema } from "../../ValidationSchema";

type StoryType = z.infer<typeof CreateStorySchema>;
const NewStoryPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<StoryType>({ resolver: zodResolver(CreateStorySchema) });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const validation = CreateStorySchema.safeParse(data);
      if (!validation.success) {
        console.log("Error in Form Submission...", validation.error.errors);
      }
      const res = await axios.post("/api/stories", data);
      console.log("Response...", res);
      router.push("/stories");
    } catch (e) {
      setError("Unhandled exception Error");
    }
  });
  return (
    <form onSubmit={onSubmit}>
      <div className="p-5 max-w-xl space-y-4">
        {error && (
          <Callout.Root>
            <Callout.Text color="red">{error}</Callout.Text>
          </Callout.Root>
        )}
        <TextField.Root>
          <TextField.Input placeholder="Title..." {...register("title")} />
        </TextField.Root>
        {errors.title && (
          <Text as="p" color="red">
            {errors.title.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description..." {...field} />
          )}
        />
        {errors.description && (
          <Text as="p" color="red">
            {errors.description.message}
          </Text>
        )}
        <Button>Submit New Story</Button>
      </div>
    </form>
  );
};

export default NewStoryPage;
