import React from "react";
import StoryForm from "../../_components/StoryForm";
import { notFound } from "next/navigation";

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
