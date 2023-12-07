import { Button } from "@radix-ui/themes";
import Link from "next/link";
const NewStoryPage = () => {
  return (
    <div>
      <Button>
        <Link href="/stories/new">New Story</Link>
      </Button>
    </div>
  );
};

export default NewStoryPage;
