"use client";
import { Select, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  itemCount: number;
  defaultItems?: number;
}
const SelectPageSize = ({ itemCount, defaultItems = 5 }: Props) => {
  const pageSizes = [5, 10, 15, 20];
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <>
      <Text mt="1">
        Filter By: <b>Page size</b>
      </Text>
      <Select.Root
        defaultValue={searchParams.get("pageSize") || "5"}
        onValueChange={(pageSize) => {
          const query = pageSize ? "?pageSize=" + pageSize : "";
          router.push("/stories/list/" + query);
        }}
      >
        <Select.Trigger placeholder="Select Page size..." />
        <Select.Content>
          {pageSizes.map((size) => (
            <Select.Item value={String(size)} key={size}>
              {size}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default SelectPageSize;
