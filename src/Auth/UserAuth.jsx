import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const UserAuth = ({onLogin}) => {
  const [action, setAction] = useState("Sign Up");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const formSubmit = (data) => {
    if (action === "Sign Up") {
      localStorage.setItem("userData", JSON.stringify(data));
      alert("Account created successfully!");
      reset();
    } else {
      const stored = JSON.parse(localStorage.getItem("userData"));
      // console.log(stored);
      if (
        stored.email === data.email &&
        stored.password === data.password
      ) {
        onLogin();
        navigate("/");
        alert(`Welcome back, ${stored.name || "User"}!`);
      } else {
        alert("Email or Password invalid");
      }
      reset();
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="font-bold text-2xl mb-6">{action} to Your Account</h1>
      <form
        className="bg-white p-7 rounded-md shadow-md w-full max-w-sm"
        onSubmit={handleSubmit(formSubmit)}
      >
        {action === "Sign Up" && (
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium pb-2">
              Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              name="name"
              id="name"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your name"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium pb-2">
            Email
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
            type="email"
            name="email"
            id="email"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your email"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium pb-2">
            Password
          </label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type="password"
            name="password"
            id="password"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your password"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}
        </div>

        <p
          className="mb-4 text-indigo-600 cursor-pointer text-sm"
          onClick={() => setAction(action === "Login" ? "Sign Up" : "Login")}
        >
          {action === "Login"
            ? "New user? Create an account"
            : "Already have an account? Login"}
        </p>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white font-medium py-2 px-4 rounded hover:bg-indigo-600 transition duration-200"
        >
          {action}
        </button>
      </form>
    </div>
  );
};

export default UserAuth;
