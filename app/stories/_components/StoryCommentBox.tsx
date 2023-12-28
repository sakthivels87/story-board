import { Avatar, Callout, Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import dynamic from "next/dynamic";
import Markdown from "react-markdown";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"));

interface Props {
  name: string | null;
  imageUrl: string | null;
  comment: string;
}
const StoryCommentBox = ({ name, imageUrl, comment }: Props) => {
  return (
    <Card>
      <Flex gap="3">
        <Avatar fallback="A" src={imageUrl!} my="-2" radius="full" />
        <Text weight="medium" align="center">
          {name}
        </Text>
      </Flex>
      <Callout.Root mt="4" color="gray">
        <Callout.Text>
          <Markdown>{comment}</Markdown>
        </Callout.Text>
      </Callout.Root>
    </Card>
  );
};

export default StoryCommentBox;
