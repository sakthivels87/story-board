import React from "react";
import { notFound } from "next/navigation";
import { Box, Button, Flex, Grid, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  params: { id: string };
}
const StoryDetailPage = async ({ params }: Props) => {
  const story = await prisma?.story.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!story) notFound();
  return (
    <Grid columns="2">
      <Box>
        <Text>Text Box111</Text>
        <p>Text2222</p>
      </Box>
      <Box>
        <Flex direction="column" gap="5">
          <Button>
            <Link href="/stories">Edit the issue</Link>
          </Button>
          <Button>Delete the issue</Button>
        </Flex>
      </Box>
    </Grid>
  );
};

export default StoryDetailPage;
