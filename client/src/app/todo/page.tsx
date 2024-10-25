import TodoPage from "@/components/screens/todo/TodoPage";import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todo",
  description: "Todo to MindFuel",
};


const page = () => {
  return <TodoPage />;
};
export default page;
