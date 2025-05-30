import React from "react";
import { useForm } from "react-hook-form";

const Contact = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = () => {
    console.log(watch());
    reset();
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Contact Sales
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          Aute magna irure deserunt veniam aliqua magna enim voluptate.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="mx-auto mt-12 max-w-xl"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="fname"
              className="block text-sm font-medium text-gray-700"
            >
              First name
            </label>
            <input
              {...register("fname", {
                required: "Please enter your first name",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
              id="fname"
              type="text"
              className="mt-2 w-full rounded-md px-3.5 py-2 text-base outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            />
            {errors.fname && (
              <p className="text-red-600 text-sm mt-1">
                {errors.fname.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="lname"
              className="block text-sm font-medium text-gray-700"
            >
              Last name
            </label>
            <input
              {...register("lname", {
                required: "Please enter your last name",
                minLength: {
                  value: 3,
                  message: "Last name must be at least 3 characters",
                },
              })}
              id="lname"
              type="text"
              className="mt-2 w-full rounded-md px-3.5 py-2 text-base outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            />
            {errors.lname && (
              <p className="text-red-600 text-sm mt-1">
                {errors.lname.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              {...register("email", {
                required: "Please enter your email",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email",
                },
              })}
              id="email"
              type="email"
              className="mt-2 w-full rounded-md px-3.5 py-2 text-base outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="number"
              className="block text-sm font-medium text-gray-700"
            >
              Phone number
            </label>
            <input
              {...register("number", {
                required: "Please enter your phone number",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Please enter a valid 10-digit number",
                },
              })}
              id="number"
              type="text"
              placeholder="1234567890"
              className="mt-2 w-full rounded-md px-3.5 py-2 text-base outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            />
            {errors.number && (
              <p className="text-red-600 text-sm mt-1">
                {errors.number.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              {...register("message", {
                required: "Please enter your message",
                minLength: {
                  value: 5,
                  message: "Message must be at least 5 characters",
                },
              })}
              id="message"
              rows={4}
              className="mt-2 w-full rounded-md px-3.5 py-2 text-base outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            />
            {errors.message && (
              <p className="text-red-600 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
