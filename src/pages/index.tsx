import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const createUserFormSchema = z.object({
  username: z.string()
    .nonempty("Username is required")
    .regex(/^[A-Za-z]+$/i, "Only letters are allowed"),
  password: z.string()
    .nonempty("Password is required"),
  confirm_password: z.string()
    .nonempty("Confirm password is required")
})
.refine(({ password, confirm_password}) => password === confirm_password, {
  message: "Password doesn't match",
  path: ["confirm_password"]
})

type createUserFormData = z.infer<typeof createUserFormSchema>


const inputStyle = `
  border
  border-zinc-200
  shadow-sm
  rounded
  h-10
  px-2
  text-black
`

const labelStyle = `
  font-bold
`

export default function Home() {

  const [output, setOutput] = useState("");
  const { register, handleSubmit, watch, formState: { errors } } = useForm<createUserFormData>({
    resolver: zodResolver(createUserFormSchema)
  })
  
  const onSubmit = (data:any) => {
    setOutput(JSON.stringify(data, null, 2));
  }

  console.log(errors)

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-center font-bold text-2xl mb-5">Zod+Hook-form = Create User</h1>
      <form className="space-y-4 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label htmlFor="username" className={labelStyle}>Username</label>
          <input
            className={inputStyle}
            {...register("username")}
          />
          {errors.username && <span>{errors.username.message}</span>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className={labelStyle}>Password</label>
          <input
            className={inputStyle}
            {...register("password")}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirm_password" className={labelStyle}>Confirm password</label>
          <input
            className={inputStyle}
            {...register("confirm_password")}
          />
          {errors.confirm_password && <span>{errors.confirm_password.message}</span>}
        </div>
        <input
          type="submit"
          className="bg-lime-600 rounded py-2"
        />
      </form>
      <pre className="text-gray-500 text-sm bg-white rounded p-3 mt-8">{output}</pre>
    </div>
  )
}
