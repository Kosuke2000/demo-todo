import Head from "next/head"
import React, { useState } from "react"

import type { NextPage } from "next"

// モデル
type Todo = {
  id: number
  name: string
  isDone: boolean
}

const mockTodo0: Todo = {
  id: 0,
  name: "髪を切りに行く",
  isDone: false,
}
const mockTodo1: Todo = {
  id: 1,
  name: "プレゼントを選ぶ",
  isDone: false,
}
const mockTodo2: Todo = {
  id: 2,
  name: "映画館デートする",
  isDone: false,
}
const mockTodo3: Todo = {
  id: 3,
  name: "水族館デートする",
  isDone: false,
}

const mockTodoList = [mockTodo0, mockTodo1, mockTodo2, mockTodo3]

let nextId = 4

interface TodoProps {
  todo: Todo
  onToggle: (id: number) => void
  onRemove: (id: number) => void
  onEdit: (id: number, name: string) => void
}

const Todo = ({ todo, onToggle, onRemove, onEdit }: TodoProps) => {
  const [isEdit, setIsEditing] = useState(false)
  const [text, setText] = useState(todo.name)

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  // 編集モードにする
  const start = () => setIsEditing(true)
  // 編集舌テキストを新たに登録し、編集モードを終了する
  const finish = () => {
    onEdit(todo.id, text)

    setIsEditing(false)
  }

  const todoName = !isEdit ? (
    <>
      <td className="py-4 px-6">{todo.name}</td>
      <td>
        <button onClick={start}>編集</button>
      </td>
      <td className="py-4 px-6">
        <button onClick={() => onRemove(todo.id)} className="bg-red-100">
          削除
        </button>
      </td>
    </>
  ) : (
    <>
      <td>
        <input value={text} onChange={handleChangeInput} className="border" />
      </td>
      <td>
        <button onClick={finish} className="bg-blue-300">
          編集完了
        </button>
      </td>
    </>
  )

  return (
    <tr>
      <td className="py-4 px-6">
        <input
          onClick={() => onToggle(todo.id)}
          type="checkbox"
          checked={todo.isDone}
        />
      </td>
      {todoName}
    </tr>
  )
}

const Home: NextPage = () => {
  // todoListというステートを作成する
  const [todoList, setTodoList] = useState(mockTodoList)
  const [text, setText] = useState("")

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const create = () => {
    const newTodo: Todo = {
      id: nextId,
      name: text,
      isDone: false,
    }

    setTodoList([...todoList, newTodo])

    setText("")
    nextId++
  }

  const remove = (id: number) => {
    const newState = todoList.filter((todo) => todo.id !== id)
    setTodoList(newState)
  }

  const toggle = (id: number) => {
    const newState = todoList.map((todo) => {
      if (todo.id !== id) return todo

      return { ...todo, isDone: !todo.isDone }
    })
    setTodoList(newState)
  }

  const clean = () => {
    return
  }

  const edit = (id: number, name: string) => {
    return
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center items-center m-0 min-h-screen">
        <h1>Todoアプリ</h1>

        <div>
          <input
            value={text}
            onChange={handleChangeInput}
            className="my-4 border"
          ></input>
          <button onClick={create} className="bg-slate-100">
            Todoを追加
          </button>
        </div>

        <table className="text-sm text-left text-gray-500 table-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th className="py-4 px-6">ステータス</th>
              <th className="py-4 px-6">名前</th>
              <th></th>
              <th className="py-4 px-6">
                <button onClick={clean} className="bg-red-600">
                  一掃
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {todoList.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                onToggle={toggle}
                onRemove={remove}
                onEdit={edit}
              />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  )
}

export default Home
