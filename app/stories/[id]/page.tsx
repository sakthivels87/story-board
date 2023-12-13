import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Box, Button, Card, Flex, Grid, Heading } from "@radix-ui/themes";
import Link from "next/link";
import StoryStatusBadge from "@/app/components/StoryStatusBadge";
import Markdown from "react-markdown";
import axios from "axios";
import DeleteStoryButton from "./DeleteStoryButton";

interface Props {
  params: { id: string };
}
const StoryDetailPage = async ({ params }: Props) => {
  const story = await prisma?.story.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!story) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }}>
      <Box width="max-content">
        <Heading>{story.title}</Heading>
        <StoryStatusBadge status={story.status} />
        <Card my="5">
          <Markdown>{story.description}</Markdown>
        </Card>
      </Box>
      <Box>
        <Flex direction="column" gap="5">
          <Button>
            <Link href={"/stories/" + story.id + "/edit"}>Edit the issue</Link>
          </Button>
          <DeleteStoryButton id={story.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default StoryDetailPage;
