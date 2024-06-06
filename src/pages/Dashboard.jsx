import { Button, Checkbox, TextInput } from "flowbite-react";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../services/firebaseServices";

function Dashboard() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("created", "desc"));
    onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        return { id: doc.id, data: doc.data() };
      });
      setTasks(data);
    });
  }, []);

  async function handleDelete(id) {
    try {
      const docRef = doc(db, "tasks", id);
      await deleteDoc(docRef);
      alert("Document deleted!");
    } catch (error) {
      alert("Something went wrong!");
    }
  }

  function handleChange(e) {
    setInput(e.target.value);
  }

  async function handleAdd() {
    try {
      await addDoc(collection(db, "tasks"), {
        task: input,
        completed: false,
        created: Timestamp.now(),
      });
    } catch (err) {
      alert(err);
    }
  }

  if (!tasks) return null;

  return (
    <div className="p-[32px]">
      <div className="flex gap-4">
        <TextInput name="task" className="grow-[1]" onChange={handleChange} />
        <Button onClick={handleAdd}>Add Task</Button>
      </div>
      <ul className="mt-4 flex flex-col gap-4">
        {tasks.map((task) => {
          return (
            <li
              key={task.id}
              className="flex gap-4 items-center bg-slate-200 p-4 rounded"
            >
              <Checkbox checked={task.data.completed} />
              <p className="flex-[1]">{task.data.task}</p>
              <Button
                size="xs"
                color="failure"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Dashboard;
