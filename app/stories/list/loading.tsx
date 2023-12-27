import { Box, Table } from "@radix-ui/themes";
import React from "react";
import StoryAction from "./StoryAction";
import Skeleton from "../../components/Skeleton";

const LoadingStoryPage = () => {
  const stories = [1, 2, 3, 4, 5];
  return (
    <Box className="max-w-5xl">
      <StoryAction storyCount={10} />
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
              <Table.Row key={story}>
                <Table.RowHeaderCell>
                  <Skeleton height="2rem" />
                </Table.RowHeaderCell>
                <Table.Cell className="hidden md:table-cell">
                  <Skeleton height="2rem" />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <Skeleton height="2rem" />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default LoadingStoryPage;
