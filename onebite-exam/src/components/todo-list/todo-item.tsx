import { Button } from "@/components/ui/button";
import { useDeleteTodo } from "@/store/todos";
import { Link } from "react-router";

export default function TodoItem({
  id,
  content,
}: {
  id: number;
  content: string;
}) {
  const deleteTodo = useDeleteTodo();

  const handleDeleteTodo = () => {
    deleteTodo(id);
  };

  return (
    <div className="flex items-center justify-between border p-2">
      <Link to={`/todolist/${id}`}>{content}</Link>
      <Button variant={"destructive"} onClick={handleDeleteTodo}>
        삭제
      </Button>
    </div>
  );
}
