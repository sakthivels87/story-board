"use client";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import StoryStatusFilter from "./StoryStatusFilter";

const StoryAction = () => {
  return (
    <Flex justify="between" mt="5">
      <StoryStatusFilter />
      <Button size="3">
        <Link href="/stories/new">New Story</Link>
      </Button>
    </Flex>
  );
};

export default StoryAction;
