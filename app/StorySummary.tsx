import { Status } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const StorySummary = ({ open, inProgress, closed }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: "Open Stories", value: open, status: "OPEN" },
    {
      label: "In Progress Stories",
      value: inProgress,
      status: "IN_PROGRESS",
    },
    { label: "Closed Stories", value: closed, status: "CLOSED" },
  ];
  return (
    <Flex gap="4">
      {containers.map((story) => (
        <Card key={story.label}>
          <Flex direction="column" gap="1">
            <Link href={`/stories/list?status=${story.status}`}>
              {story.label}
            </Link>
            <Text size="6" weight="medium">
              {story.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default StorySummary;
