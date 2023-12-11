"use client";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const StoryAction = () => {
  return (
    <Button>
      <Link href="/stories/new">New Story</Link>
    </Button>
  );
};

export default StoryAction;
