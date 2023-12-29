import { Avatar, Callout, Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import Markdown from "react-markdown";
import UserProfile from "./UserProfile";
import { Comments } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
interface Props {
  storyId: string;
  newComment: string;
}
const fetchComments = (stroyId: string) =>
  axios
    .get<Comments[]>(`/api/stories/${stroyId}/comments`)
    .then((res) => res.data);

const StoryCommentBox = async ({ storyId, newComment }: Props) => {
  const comments = await fetchComments(storyId);
  return (
    <>
      {comments?.map((c) => (
        <Card key={c.id}>
          <UserProfile userId={c.userId} />
          <Callout.Root mt="4" color="gray">
            <Callout.Text>
              <Markdown>{c.comment}</Markdown>
            </Callout.Text>
          </Callout.Root>
        </Card>
      ))}
    </>
  );
};

export default StoryCommentBox;

export const useComments = (id: string) =>
  useQuery<Comments[]>({
    queryKey: ["comments"],
    queryFn: () =>
      axios.get("/api/stories/" + id + "/comments").then((res) => res.data),
    retry: 3,
  });
