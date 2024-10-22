"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { UserNav } from "@/components/user-nav"
import { useAuth } from "@/lib/auth-context"

type Todo = {
  id: number
  title: string
  description: string
  priority: "low" | "medium" | "high"
  status: "pending" | "completed"
}

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState({ title: "", description: "", priority: "medium" })
  const { user } = useAuth()

  const addTodo = () => {
    if (newTodo.title.trim() === "") return
    const todo: Todo = {
      id: Date.now(),
      ...newTodo,
      status: "pending"
    }
    setTodos([...todos, todo])
    setNewTodo({ title: "", description: "", priority: "medium" })
  }

  const toggleTodoStatus = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, status: todo.status === "pending" ? "completed" : "pending" } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My TODO List</h1>
        <UserNav user={user} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Add New Todo</CardTitle>
          <CardDescription>Create a new task for your list</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newTodo.title}
                onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                placeholder="Enter todo title"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newTodo.description}
                onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                placeholder="Enter todo description"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={newTodo.priority}
                onValueChange={(value: "low" | "medium" | "high") => setNewTodo({ ...newTodo, priority: value })}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={addTodo}>Add Todo</Button>
        </CardFooter>
      </Card>

      <div className="mt-8 space-y-4">
        {todos.map(todo => (
          <Card key={todo.id}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Checkbox
                  id={`todo-${todo.id}`}
                  checked={todo.status === "completed"}
                  onCheckedChange={() => toggleTodoStatus(todo.id)}
                />
                <span className={todo.status === "completed" ? "line-through" : ""}>{todo.title}</span>
              </CardTitle>
              <CardDescription>{todo.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Priority: {todo.priority}</p>
              <p>Status: {todo.status}</p>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" onClick={() => deleteTodo(todo.id)}>Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}