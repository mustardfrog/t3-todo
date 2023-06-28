import { Button } from "components/ui/ui/button";
import { Input } from "components/ui/ui/input";
import { FormEvent, useState } from "react"
import { api } from "~/utils/api";

export function Form() {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  
  const createTodo = api.todo.createTodo.useMutation({ onSuccess: t => console.log(t)});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    createTodo.mutate({ title: title, detail: detail});
    setTitle("");
    setDetail("");
    console.log("You submited it!!!");
  }

  function handleChange(e: any) {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    }
    else if (name === "detail") {
      setDetail(value);
    }
  }

  return (
    <div>
      <h1 className="font-bold text-3xl my-auto py-4 text-center">The Ultimate Todo App</h1>
      <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit}>
          <Input placeholder="Title..." className="w-80" onChange={handleChange}  name="title" value={title}/>
          <Input placeholder="Detail..." className="w-80" onChange={handleChange} name="detail" value={detail}/>
          <div className="flex flex-col items-center">
            <Button className="my-4 ">Let's Do It!!</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
