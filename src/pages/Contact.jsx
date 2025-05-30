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
    <>
      <div className="mx-auto max-w-2xl text-center mt-5">
        <h2 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Contact sales
        </h2>
        <p className="mt-2 text-lg/8 text-gray-600">
          Aute magna irure deserunt veniam aliqua magna enim voluptate.
        </p>
      </div>
      <form
        action=""
        onSubmit={handleSubmit(handleFormSubmit)}
        className="mx-auto mt-16 max-w-xl sm:mt-13"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="fname" className="text-sm/6 font-semibold">
              First name
            </label>
            <div className="mt-2.5">
              <input
                {...register("fname", {
                  required: "Please enter your first name",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
                id="fname"
                name="fname"
                type="text"
                className="w-full rounded-md px-3.5 py-2 text-base outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
              {errors.fname && (
                <p className="text-red-700">{errors.fname.message}</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="lname" className="text-sm/6 font-semibold">
              Last name
            </label>
            <div className="mt-2.5">
              <input
                {...register("lname", {
                  required: "Please enter your last name",
                  minLength: {
                    value: 3,
                    message: "Last name must be at least 3 characters",
                  },
                })}
                id="lname"
                name="lname"
                type="text"
                className="w-full rounded-md px-3.5 py-2 text-base outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
              {errors.lname && (
                <p className="text-red-700">{errors.lname.message}</p>
              )}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="text-sm/6 font-semibold">
              Email
            </label>
            <div className="mt-2.5">
              <input
                {...register("email", {
                  required: "Please enter your email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Please enter a valid email",
                  },
                })}
                id="email"
                name="email"
                type="email"
                className="w-full rounded-md px-3.5 py-2 text-base outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
              {errors.email && (
                <p className="text-red-700">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="number" className="text-sm/6 font-semibold">
              Phone number
            </label>
            <div className="mt-2.5">
              <input
                {...register("number", {
                  required: "Please enter your phone number",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Please enter a valid phone number",
                  },
                })}
                id="number"
                name="number"
                type="text"
                placeholder="123-456-7890"
                className="w-full rounded-md px-3.5 py-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
              {errors.number && (
                <p className="text-red-700">{errors.number.message}</p>
              )}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="text-sm/6 font-semibold">
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                {...register("message", {
                  required: "Please enter your message",
                  minLength: {
                    value: 5,
                    message: "must be at least 5 characters",
                  },
                })}
                id="message"
                name="message"
                rows={4}
                className="w-full rounded-md px-3.5 py-2 text-base outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
              {errors.message && (
                <p className="text-red-700">{errors.message.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="my-7.5">
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-500">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Contact;
