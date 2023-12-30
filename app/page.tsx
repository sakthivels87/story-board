import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import StoryChart from "./StoryChart";
import StoryStatus from "./StoryStatus";
import StorySummary from "./StorySummary";
import { Metadata } from "next";

export default async function Home() {
  const open =
    (await prisma?.story.count({
      where: { status: "OPEN" },
    })) || 0;

  const inProgress =
    (await prisma?.story.count({
      where: { status: "IN_PROGRESS" },
    })) || 0;

  const closed =
    (await prisma?.story.count({
      where: { status: "CLOSED" },
    })) || 0;

  return (
    <main>
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Flex gap="2" direction="column">
          <StorySummary open={open} inProgress={inProgress} closed={closed} />
          <StoryChart open={open} inProgress={inProgress} closed={closed} />
        </Flex>
        <StoryStatus />
      </Grid>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Story - Dashboard",
  description:
    "This story dashboard is used to provide quick highlight about this story board.",
};
