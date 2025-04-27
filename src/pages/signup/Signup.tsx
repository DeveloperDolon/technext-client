import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import InputField from "../../components/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { signup_validation, SignupValidationType } from "./signup.validation";
import { useSignupMutation } from "../../store/api/auth.api";
import toast from "react-hot-toast";

const Signup = () => {
  const [showpass, setShowPass] = useState(false);

  const [signup] = useSignupMutation();
  const navigate = useNavigate();
  const methods = useForm({
    resolver: zodResolver(signup_validation),
  });
  
  const onSubmit = async (data: SignupValidationType) => {
    try {
      const toastId = toast.loading('Registering...');

      const result: any = await signup(data);

      if(result?.success) {
        toast.success("User registration complete!", {id: toastId});
        navigate('/login');
      }
      else {
        toast.error("Something went wrong!", {id: toastId});
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg-indigo-50 dark:bg-black dark:text-white min-h-screen">
        <div className="xl:px-20 md:px-10 sm:px-6 px-4 md:py-12 py-9 2xl:mx-auto 2xl:container md:flex items-center justify-center">
          <div className=" md:hidden sm:mb-8 mb-6"></div>
          <div className="bg-white dark:bg-black shadow-lg rounded xl:w-1/3 lg:w-5/12 md:w-1/2 w-full lg:px-10 sm:px-6 sm:py-10 px-2 py-6">
            <p
              tabIndex={0}
              className="focus:outline-none text-2xl font-extrabold text-nowrap leading-6 text-gray-800 dark:text-white"
            >
              Signup with your information
            </p>
            <p
              tabIndex={0}
              className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500 dark:text-white"
            >
              Have an account?{" "}
              <NavLink to="/login">
                <button
                  className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline 
                text-sm font-medium leading-none text-gray-800 cursor-pointer dark:text-white"
                >
                  {" "}
                  Login here
                </button>
              </NavLink>
            </p>

            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-3 mt-8"
              >
                <InputField
                  name="user.name"
                  label="Username"
                  placeholder="Input username"
                  type="text"
                  options={{required: true}}
                />

                <InputField
                  name="user.email"
                  type="email"
                  label="Email"
                  placeholder="Input your email"
                  options={{ required: true }}
                />

                <InputField
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Input your password"
                  options={{ required: true }}
                  setShowPass={setShowPass}
                  showPass={showpass}
                />

                <div className="mt-8">
                  <button
                    role="button"
                    className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none 
                text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
                  >
                    Create my account
                  </button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
