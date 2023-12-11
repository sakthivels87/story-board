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
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type StoryType = z.infer<typeof CreateStorySchema>;

const NewStoryPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<StoryType>({ resolver: zodResolver(CreateStorySchema) });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      const validation = CreateStorySchema.safeParse(data);
      if (!validation.success) {
        console.log("Error in Form Submission...", validation.error.errors);
      }
      const res = await axios.post("/api/stories", data);
      router.push("/stories");
    } catch (e) {
      setError("Unhandled exception Error");
      setSubmitting(false);
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
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description..." {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button>Submit New Story {isSubmitting && <Spinner />}</Button>
      </div>
    </form>
  );
};

export default NewStoryPage;
