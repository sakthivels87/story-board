import { User } from "@prisma/client";
import { Avatar, Callout, Card, Flex, Text } from "@radix-ui/themes";
import React from "react";

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
        <Callout.Text>{comment}</Callout.Text>
      </Callout.Root>
    </Card>
  );
};

export default StoryCommentBox;
