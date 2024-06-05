import { signInWithEmailAndPassword } from "firebase/auth";
import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../services/firebaseServices";

function Login() {
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const email = e.target["email"].value;
      const password = e.target["password"].value;
      const result = await signInWithEmailAndPassword(auth, email, password);

      if (result.user) {
        localStorage.setItem("user", JSON.stringify(result?.user));
      } else {
        localStorage.removeItem("user");
        throw new Error();
      }
    } catch (error) {
      console.log("User registration failed!");
    }
  }

  return (
    <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your email" />
        </div>
        <TextInput
          id="email"
          type="email"
          name="email"
          placeholder="name@flowbite.com"
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Your password" />
        </div>
        <TextInput id="password" type="password" name="password" required />
      </div>
      <Button type="submit">Submit</Button>
      <p className="text-center">or</p>
      <Link className="text-center" to="/register">
        Register
      </Link>
    </form>
  );
}

export default Login;
