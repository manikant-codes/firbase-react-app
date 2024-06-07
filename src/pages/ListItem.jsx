import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Button, Checkbox } from "flowbite-react";
import React, { useState } from "react";
import { db } from "../services/firebaseServices";

function ListItem({ task }) {
  const [completed, setCompleted] = useState(task.data.completed);

  async function handleComplete(e) {
    setCompleted(e.target.checked);
    try {
      console.log("task", task);
      const docRef = doc(db, "tasks", task.id);
      await updateDoc(docRef, { ...task.data, completed: e.target.checked });
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  async function handleDelete() {
    try {
      const docRef = doc(db, "tasks", task.id);
      await deleteDoc(docRef);
      alert("Document deleted!");
    } catch (error) {
      alert("Something went wrong!");
    }
  }

  return (
    <li className="flex gap-4 items-center bg-slate-200 p-4 rounded">
      <Checkbox checked={completed} onChange={handleComplete} />
      <p className="flex-[1]">{task.data.task}</p>
      <Button size="xs" color="failure" onClick={handleDelete}>
        Delete
      </Button>
    </li>
  );
}

export default ListItem;
