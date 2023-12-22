import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import StoryFormSkeleton from "./loading";

const StoryForm = dynamic(() => import("@/app/stories/_components/StoryForm"), {
  ssr: false,
  loading: () => <StoryFormSkeleton />,
});
interface Props {
  params: { id: string };
}
const EditPage = async ({ params }: Props) => {
  const story = await prisma?.story.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!story) notFound();

  return <StoryForm story={story} />;
};

export default EditPage;
