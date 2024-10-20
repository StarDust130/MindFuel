import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

const BackButton = () => {
  return (
    <div >
      <Link href="/">
        <Button
          variant={"ghost"}
          className="absolute top-2 left-0 md:top-5 md:left-5"
        >
          <ChevronLeft />
        </Button>
      </Link>
    </div>
  );
}
export default BackButton