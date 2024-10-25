import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TodoCardProps {
  todos: {
    title: string;
    description: string;
  };
}

const TodoCard = ({ todos }: TodoCardProps) => {
  return (
    <div>
      {todos.map((todo) => (
        <Card>
          <CardHeader>
            <CardTitle>{todo.title}</CardTitle>
            <CardDescription>{todo.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
export default TodoCard;
