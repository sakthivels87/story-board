"use client";
import { Story, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@/app/components/Skeleton";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const AssigneeSelect = ({ story }: { story: Story }) => {
  const { data: users, error, isLoading } = useUsers();
  const router = useRouter();
  const assingUser = async (userId: String) => {
    userId = userId === "unassigned" ? "" : userId;
    const status = userId ? "IN_PROGRESS" : "OPEN";
    const resp = await axios
      .patch("/api/stories/" + story.id, {
        assignedToUserId: userId || null,
        status,
      })
      .catch((e) => {
        toast.error("Changes could not be saved.");
      });
    if (resp?.status === 200) {
      router.push("/stories/list");
      router.refresh();
    }
  };

  if (error) return null;
  if (isLoading) return <Skeleton />;
  return (
    <>
      <Select.Root
        defaultValue={story.assignedToUserId || "unassigned"}
        onValueChange={assingUser}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Select User</Select.Label>
            <Select.Item value="unassigned">UnAssigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster position="top-center" />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

export default AssigneeSelect;
