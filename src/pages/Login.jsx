import { signInWithEmailAndPassword } from "firebase/auth";
import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../services/firebaseServices";

function Login() {
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = {
        email: e.target["email"].value,
        password: e.target["password"].value,
      };

      const result = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      console.log("result", result);
    } catch (error) {
      console.log("Error: ", error);
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
