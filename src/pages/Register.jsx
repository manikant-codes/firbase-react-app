import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../services/firebaseServices";

function Register() {
  async function handleSubmit(e) {
    e.preventDefault();

    if (e.target["password"].value !== e.target["confirmPassword"].value) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const email = e.target["email"].value;
      const password = e.target["password"].value;
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

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
