"use client";
import { Status, Story } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import React, { useState } from "react";

interface Props {
  searchParams: { status: Status; orderBy: keyof Story; sortOrder: string };
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
  const [sortingOrder, setSortingOrder] = useState("asc");
  const handleSortOrder = () => {
    if (sortingOrder == "" || sortingOrder === "desc") {
      setSortingOrder("asc");
    } else {
      setSortingOrder("desc");
    }
  };
  return (
    <Table.Row>
      {columns.map((column) => (
        <Table.ColumnHeaderCell
          key={column.value}
          className={column.className}
          onClick={handleSortOrder}
        >
          <NextLink
            href={{
              query: {
                ...searchParams,
                orderBy: column.value,
                sortOrder: sortingOrder,
              },
            }}
          >
            {column.label}{" "}
          </NextLink>
          {sortingOrder === "asc" && column.value === searchParams.orderBy && (
            <FaArrowUp className="inline" />
          )}
          {sortingOrder === "desc" && column.value === searchParams.orderBy && (
            <FaArrowDown className="inline" />
          )}
        </Table.ColumnHeaderCell>
      ))}
    </Table.Row>
  );
};

export default TableHeader;
