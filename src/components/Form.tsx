import { Button } from "components/ui/ui/button";
import { Input } from "components/ui/ui/input";
import { useState } from "react"
import { api } from "~/utils/api";

export function Form() {
  const [text, setText] = useState("");
  const hello = api.todo.hello.useQuery({ title: "John Wayne"});

  function handleSubmit(e: any) {
    e.preventDefault();
    console.log("You submited it!!!");
  }

  function handleChange(e: any) {
    e.preventDefault();
    setText(e.target.value);
  }

  return (
    <div>
    <h2>{
      hello.data ? hello.data.greeting : "No Money"
    }</h2>
      <h1 className="font-bold text-3xl my-auto py-4 text-center">The Ultimate Todo App</h1>
      <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit}>
          <Input placeholder="Title..." className="w-80" />
          <Input placeholder="Detail..." className="w-80" />
          <div className="flex flex-col items-center">
            <Button className="my-4 ">Let's Do It!!</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
