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
import ListItem from "./ListItem";

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
          return <ListItem key={task.id} task={task} />;
        })}
      </ul>
    </div>
  );
}

export default Dashboard;
