import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../services/firebaseServices";

function Register() {
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (e.target["password"].value !== e.target["confirmPassword"].value) {
        alert("Passwords do not match!");
        return;
      }

      const data = {
        email: e.target["email"].value,
        password: e.target["password"].value,
      };

      const result = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      console.log("result", result.user);
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
      <div>
        <div className="mb-2 block">
          <Label htmlFor="confirmPassword" value="Your password" />
        </div>
        <TextInput
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          required
        />
      </div>
      <Button type="submit">Submit</Button>
      <p className="text-center">or</p>
      <Link className="text-center" to="/login">
        Login
      </Link>
    </form>
  );
}

export default Register;
