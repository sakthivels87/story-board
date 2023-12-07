import prisma from "@/prisma/client";
import { Box, Button, Container, Table } from "@radix-ui/themes";
import Link from "next/link";
import StoryStatusBadge from "../components/StoryStatusBadge";

const NewStoryPage = async () => {
  const stories = await prisma.story.findMany();

  return (
    <Box className="max-w-3xl">
      <Button>
        <Link href="/stories/new">New Story</Link>
      </Button>
      <Table.Root className="mt-5">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Story</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created At
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {stories.map((story) => {
            return (
              <Table.Row key={story.id}>
                <Table.RowHeaderCell>
                  {story.title}
                  <div className="block md:hidden">
                    <StoryStatusBadge status={story.status} />
                  </div>
                </Table.RowHeaderCell>
                <Table.Cell className="hidden md:table-cell">
                  <StoryStatusBadge status={story.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {story.description}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default NewStoryPage;
