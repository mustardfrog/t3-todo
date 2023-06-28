import { api } from "~/utils/api"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/ui/card"
import Link from "next/link";
import { Button } from "components/ui/ui/button";

export function ListTodo() {
  const todoList = api.todo.getTodo.useQuery();
  const deleteTodo = api.todo.deleteTodo.useMutation({ onSuccess: () => { console.log("Successfully deleted") }});

  async function toDelete(id: string) {
    deleteTodo.mutate({ id });
  }

  async function toUpdate(id: string) {
    
  }

  const lists = todoList.data?.map(x => {
    return <li key={x.id}>
      <div className="px-4 my-4 ">
        <Card className="hover:bg-sky-100" >
          <CardTitle>
            {x.title}
          </CardTitle>
          <CardDescription> Created at {x.createdAt.toDateString()} </CardDescription>
          <CardContent> {x.detail} </CardContent>
          <div className="flex justify-end my-2">
            <Link href={x.id}>
              <Button className="bg-rose-50 text-black hover:bg-rose-100" >Detail</Button>
            </Link>
            <Button variant="default" >Update</Button>
            <Button variant="destructive" onClick={toDelete.bind(null, x.id)} >Delete</Button>
          </div>
        </Card>
      </div>
    </li>
  });

  return (
    <div>
      <ul>
        {lists}
      </ul>

    </div>
  )
}
