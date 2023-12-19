import prisma from "@/prisma/client";
import { Box, Table } from "@radix-ui/themes";
import StoryStatusBadge from "../../components/StoryStatusBadge";
import StoryAction from "./StoryAction";
import Link from "../_components/Link";
import { Status } from "@prisma/client";

interface Props {
  searchParams: { status: Status };
}
const NewStoryPage = async ({ searchParams }: Props) => {
  const stories = await prisma.story.findMany({
    where: { status: searchParams.status },
  });
  return (
    <Box className="max-w-5xl">
      <StoryAction />
      <Table.Root className="mt-5" variant="surface">
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
                  <Link href={`/stories/${story.id}`}>{story.title}</Link>
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
export const dynamic = "force-dynamic";
export default NewStoryPage;
