"use client";
import { Text, TextField } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";

const StoryDetailsLoading = () => {
  return (
    <>
      <TextField.Input placeholder="Enter some text..." />
      <Skeleton />
    </>
  );
};

export default StoryDetailsLoading;
