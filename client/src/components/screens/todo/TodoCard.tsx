import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TodoCardProps {
  title: string;
  description: string;
}

const TodoCard = ({ title, description }: TodoCardProps) => {
  return (
    <Card className="border border-gray-300 shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-gray-600">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">Additional details here...</p>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-gray-400">Last updated recently</p>
      </CardFooter>
    </Card>
  );
};

export default TodoCard;
