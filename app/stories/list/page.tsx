import prisma from "@/prisma/client";
import { Box, Table } from "@radix-ui/themes";
import StoryStatusBadge from "../../components/StoryStatusBadge";
import StoryAction from "./StoryAction";
import Link from "../_components/Link";
import { Status, Story } from "@prisma/client";
import TableHeader from "./TableHeader";
import Pagination from "@/app/components/Pagination";
import { Metadata } from "next";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Story;
    page: string;
    sortOrder: string;
  };
}

const columns: {
  label: string;
  value: keyof Story;
  className?: string;
  direction?: string;
}[] = [
  { label: "Story", value: "title", direction: "" },
  {
    label: "Status",
    value: "status",
    className: "hidden md:table-cell",
    direction: "",
  },
  {
    label: "Created At",
    value: "createdAt",
    className: "hidden md:table-cell",
    direction: "",
  },
];

const NewStoryPage = async ({ searchParams }: Props) => {
  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.sortOrder }
    : undefined;
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const stories = await prisma.story.findMany({
    where: { status: searchParams.status },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const storyCount = await prisma.story.count({
    where: { status: searchParams.status },
  });
  if (stories.length === 0) return null;
  return (
    <Box className="max-w-5xl">
      <StoryAction />
      <Table.Root className="mt-5" variant="surface">
        <Table.Header>
          <TableHeader searchParams={searchParams} />
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
                  {story.createdAt.toLocaleString()}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
      <Pagination
        pageSize={pageSize}
        itemCount={storyCount}
        currentPage={page}
      />
    </Box>
  );
};
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Story List - Details",
  description: "This dashboard is created to track the list of stories.",
};
export default NewStoryPage;
