import { Avatar, Flex, Text } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import React, { cache } from "react";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import { User } from "@prisma/client";

const fetchUserDetails = cache((userId: string) =>
  axios.get<User>(`/api/users/${userId}`).then((res) => res.data)
);
const UserProfile = async ({ userId }: { userId: string }) => {
  const user = await fetchUserDetails(userId);
  return (
    <Flex gap="3">
      <Avatar fallback="A" src={user?.image!} my="-2" radius="full" />
      <Text weight="medium" align="center">
        {user?.name}
      </Text>
    </Flex>
  );
};

export default UserProfile;
