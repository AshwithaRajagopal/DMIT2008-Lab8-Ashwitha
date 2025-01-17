"use client";
import { useFormState } from "react-dom"
import { useState } from "react"
 
import { toast } from "sonner"
 
import { deleteAction } from "@/actions/deleteTaskAction"
import { cn } from "@/lib/utils/mergeCss";
import { FormControl, Input, Label } from "."
 
const initialState = {
  message: "default",
}
 
function DeleteTaskForm({ children, className, uid, payload }) {
  // formAction is for server and client communication
  const [state, formAction] = useFormState(deleteAction, initialState);
  const { category, task_name } = payload
 
  function handleInput(e) {
    switch (e.currentTarget.value) {
      case "category":
        setCategory(e.currentTarget.value)
        break;
      case "task":
        setTask(e.currentTarget.value)
        break;
      default:
        null;
    }
  }
 
  let stateFontColor = ""
 
  if (state.message === "success") {
    toast(
      <aside className="bg-green-500 text-lime-50 rounded-lg py-6 text-center">
        <p className="mx-4 font-semibold">Your task was deleted successfully</p>
      </aside>
    );
    stateFontColor = "text-green-500"
  } else if (state.message === "failure") {
    toast(
      <aside className="bg-red-500 text-lime-50 rounded-lg py-6 text-center">
        <p className="mx-4 font-semibold">Your task was not deleted successfully</p>
      </aside>
    );
    stateFontColor = "text-red-500"
  }
 
  return (
    <section>
      <header>
        <h2 className="text-xs font-light">
          Form State:{" "}
          <span className={cn("font-bold", stateFontColor)}>
            {state.message}
          </span>
        </h2>
      </header>
      <form
        action={formAction}
        className={cn("space-y-5  bg-white    py-8 px-4", className)}>
        <FormControl>
          <Input type="hidden" name="uid" value={uid} />
        </FormControl>
 
        <FormControl className="flex flex-col">
          <Label htmlFor="category">Category</Label>
          <Input
            onInput={handleInput}
            id="category"
            name="category"
            value={category}
          />
        </FormControl>
 
        <FormControl className="flex flex-col">
          <Label htmlFor="task">Task</Label>
          <Input
            onInput={handleInput}
            id="task"
            name="task"
            value={task_name}
          />
        </FormControl>
        <FormControl className="pt-3">
          <button className="bg-black text-white w-full py-2.5 rounded-lg mt-3 font-semibold">
            Delete Task
          </button>
        </FormControl>
      </form>
    </section>
  )
}
 
export {DeleteTaskForm}