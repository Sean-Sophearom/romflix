import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Cross } from "../components/icons";
import { useToken } from "../lib/tokenContext";
import { useRouter } from "next/router";
import Button from "../components/Button";

const LoginSchema = Yup.object({
  username: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Please provide your username"),
  password: Yup.string()
    .min(8, "Password must be longer than 8 characters!")
    .max(50, "Password is too Long!")
    .required("Please provide your password"),
});

const handleLogin = async ({ username, password, handleSuccess }) => {
  fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.type === "err") alert(d.message);
      else {
        handleSuccess({ token: data.token, username: data.username });
      }
    })
    .catch((e) => console.log(e));
};

const Login = () => {
  const [alert, setAlert] = useState(false);
  const { setToken } = useToken();
  const router = useRouter();

  const handleSuccess = (token) => {
    setToken(token);
    router.push(
      {
        pathname: "/cart",
        query: { loginSuccess: "login-success" },
      },
      "cart"
    );
  };

  useEffect(() => {
    setAlert(true);
    const timeout = setTimeout(() => setAlert(false), 5000);
    return () => clearTimeout(timeout);
  }, []);

  const Alert = (
    <div
      className={
        "bg-transparent text-center py-4 lg:px-4 fixed whitespace-nowrap right-4 top-4 transition-all rounded " +
        (alert ? "translate-x-0 pointer-events-auto" : "translate-x-[150%] pointer-events-none")
      }
    >
      <div
        className="p-2 bg-red-600 items-center text-red-100 leading-none lg:rounded-full flex lg:inline-flex rounded"
        role="alert"
      >
        <span className="flex rounded-full bg-red-500 uppercase px-[10px] py-1 text-xs font-bold mr-3"> ! </span>
        <span className="font-semibold mr-2 text-left flex-auto">You must be logged in to purchase movies</span>
        <div className="cursor-pointer" onClick={() => setAlert(false)}>
          <Cross />
        </div>
      </div>
    </div>
  );

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={(values) => handleLogin({ ...values, handleSuccess })}
    >
      {({ errors, touched }) => (
        <div className="min-h-screen grid place-items-center box">
          {Alert}
          <div className="flex flex-col ">
            <h1 className="flex text-2xl sm:text-3xl md:text-4xl gap-2 px-5 justify-center">
              Login To <span className="font-semibold">ROMFLIX</span>
            </h1>
            <h2 className="text-gray-400 text-center md:text-lg mt-2 mb-1">Enter your details below</h2>
            <Form>
              <div className="flex flex-col mt-4">
                <label htmlFor="name" className="mb-2 text-lg">
                  Username
                </label>
                <Field name="username" className="input" />
                {errors.username && touched.username ? (
                  <div className="text-red-400 text-sm err">{errors.username}</div>
                ) : null}
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="name" className="mb-2 text-lg">
                  Password
                </label>
                <Field name="password" type="password" className="input" />
                {errors.password && touched.password ? (
                  <div className="text-red-400 text-sm err">{errors.password}</div>
                ) : null}
              </div>

              <div className="grid place-items-center">
                <Button type="submit" className="btn w-auto mt-4 rounded-sm px-5">
                  Login
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

Login.noLayout = true;

// <div className="h-screen grid place-items-center box">
//     <div className="flex flex-col">
//       <h1 className="flex text-2xl sm:text-3xl md:text-4xl gap-2 px-5 justify-center">Login To {<Logo fontSize="text-2xl sm:text-3xl md:text-4xl" />}</h1>
//       <h2 className="text-gray-400 text-center md:text-lg mt-2 mb-1">Enter your details below</h2>
//       <form>
//         <div className="flex flex-col mt-4">
//           <label htmlFor="name" className="mb-2 text-lg">
//             Name
//           </label>
//           <Input
//             value={input.name}
//             onChange={handleChange}
//             id="name"
//             name="name"
//             type="text"
//             className={inputClass}
//             placeholder="Enter your username"
//             error={error.name}
//           />
//         </div>

//         <div className="flex flex-col mt-4">
//           <label htmlFor="password" className="mb-2 text-lg">
//             Password
//           </label>
//           <Input
//             value={input.password}
//             onChange={handleChange}
//             id="password"
//             name="password"
//             type={showPw ? "text" : "password"}
//             className={inputClass}
//             placeholder="Enter your password"
//             icon={showPw ? AiOutlineEyeInvisible : AiOutlineEye}
//             iconOnClick={togglePasswordVisibility}
//             error={error.password}
//           />
//         </div>

//         <div className="flex items-center gap-2 mt-4">
//           <Checkbox checked={rmbMe} onClick={toggleRmbMe} />
//           <label onClick={toggleRmbMe}>Remember me</label>
//         </div>

//         <div className="mb-4 mt-6 flex justify-center">
//           <Button type="submit" onClick={handleLogin} loading={loading} className="bg-purple-500">
//             Log In
//           </Button>
//         </div>

//         <div className="flex justify-center">
//           <p className="text-gray-500">
//             No account yet?{" "}
//             <Link to="/register" className="text-purple-500 hover:text-purple-600 transition-all  underline">
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </form>
//     </div>
// </div>

export default Login;
