"use client";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import StoryStatusFilter from "./StoryStatusFilter";
import SelectPageSize from "./SelectPageSize";

interface Props {
  storyCount: number;
}
const StoryAction = ({ storyCount }: Props) => {
  return (
    <Flex justify="between" mt="5">
      <Flex gap="4">
        <StoryStatusFilter />
        <SelectPageSize itemCount={storyCount} defaultItems={10} />
      </Flex>
      <Button size="3">
        <Link href="/stories/new">New Story</Link>
      </Button>
    </Flex>
  );
};

export default StoryAction;
