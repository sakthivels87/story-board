import React, { cache } from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Box, Button, Card, Flex, Grid, Heading } from "@radix-ui/themes";
import Link from "next/link";
import Markdown from "react-markdown";
import DeleteStoryButton from "./DeleteStoryButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import UpdateStoryStatus from "./UpdateStoryStatus";
import StoryStatusBadge from "@/app/components/StoryStatusBadge";
import StoryComments from "../_components/StoryComments";

interface Props {
  params: { id: string };
}

const fetchStory = cache((storyId: number) =>
  prisma.story.findUnique({ where: { id: storyId } })
);
const StoryDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const story = await fetchStory(parseInt(params.id));

  if (!story) notFound();
  const renderComp = session ? (
    <UpdateStoryStatus story={story} />
  ) : (
    <StoryStatusBadge status={story.status} />
  );
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <Flex direction="column" gap="3" align="start">
          <Heading>{story.title}</Heading>
          {renderComp}
        </Flex>
        <Card my="5">
          <Markdown>{story.description}</Markdown>
        </Card>
        {session && <StoryComments storyId={String(story.id)} />}
      </Box>
      {session && (
        <Flex direction="column" gap="4">
          <AssigneeSelect story={story} />
          <Button className="mt-4">
            <Link href={"/stories/" + story.id + "/edit"}>Edit the issue</Link>
          </Button>
          <DeleteStoryButton id={story.id} />
        </Flex>
      )}
    </Grid>
  );
};

export default StoryDetailPage;

export async function generateMetadata({ params }: Props) {
  const story = await fetchStory(parseInt(params.id));
  return {
    title: story?.title,
    description: "Details about this story: " + story?.description,
  };
}
