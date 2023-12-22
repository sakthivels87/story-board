import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table, Text } from "@radix-ui/themes";
import React from "react";
import StoryStatusBadge from "./components/StoryStatusBadge";
import Link from "next/link";

const StoryStatus = async () => {
  const stories = await prisma?.story.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assingedStories: true,
    },
  });

  return (
    <Card>
      <Heading>Latest Stories</Heading>
      <Table.Root>
        <Table.Body>
          {stories?.map((story) => (
            <Table.Row key={story.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" gap="4" align="start">
                    <Link href={`/stories/${story.id}`}>{story.title}</Link>
                    <StoryStatusBadge status={story.status} />
                  </Flex>
                  {story.assingedStories && (
                    <Avatar
                      fallback="?"
                      src={story.assingedStories.image!}
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default StoryStatus;
