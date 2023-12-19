import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Box, Button, Card, Flex, Grid, Heading } from "@radix-ui/themes";
import Link from "next/link";
import StoryStatusBadge from "@/app/components/StoryStatusBadge";
import Markdown from "react-markdown";
import DeleteStoryButton from "./DeleteStoryButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";

interface Props {
  params: { id: string };
}
const StoryDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const story = await prisma?.story.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!story) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <Heading>{story.title}</Heading>
        <StoryStatusBadge status={story.status} />
        <Card my="5">
          <Markdown>{story.description}</Markdown>
        </Card>
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
