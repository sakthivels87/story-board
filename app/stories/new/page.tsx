import React from "react";
import StoryForm from "../_components/StoryForm";
import { Metadata } from "next";

const NewStoryPage = () => {
  return <StoryForm />;
};

export default NewStoryPage;

export const metadata: Metadata = {
  title: "Create new story",
  description:
    "This page will help to create new story/task in our story board.",
};
