import React from "react";
import { useForm } from "react-hook-form";
export default function SignIn(props) {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = values => {
    console.log(values.username);
    props.setData(values.username);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="username"
        ref={register({
          validate: value => value !== "admin" || "Nice try!"
        })}
      />
      {errors.username && errors.username.message}

      <button type="submit">Submit</button>
    </form>
  );
}
