import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import TodoTable from "./TodoTable"


const TodoPage = () => {
  return (
    <>

    <div className="flex flex-col py-20 items-center h-screen w-full px-10">

        <h1 className="text-center text-4xl font-bold">Todo</h1>

        <div className="flex justify-center items-center w-1/2 gap-2 mt-3">
            <Input placeholder="Add Todo" />
            <Button variant={"default"}>Add Todo</Button>
        </div>
        <TodoTable />

        


    </div>
    
    </>
  )
}
export default TodoPage