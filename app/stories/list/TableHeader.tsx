"use client";
import { Status, Story } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { FaArrowUp } from "react-icons/fa";
import React from "react";

interface Props {
  searchParams: { status: Status; orderBy: keyof Story };
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

const TableHeader = ({ searchParams }: Props) => {
  return (
    <Table.Row>
      {columns.map((column) => (
        <Table.ColumnHeaderCell key={column.value} className={column.className}>
          <NextLink
            href={{ query: { ...searchParams, orderBy: column.value } }}
          >
            {column.label}{" "}
          </NextLink>
          {column.value === searchParams.orderBy && (
            <FaArrowUp className="inline" />
          )}
        </Table.ColumnHeaderCell>
      ))}
    </Table.Row>
  );
};

export default TableHeader;
