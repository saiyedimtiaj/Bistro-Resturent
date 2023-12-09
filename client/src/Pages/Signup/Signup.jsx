import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import SocileRegister from "../../Components/SocileRegister/SocileRegister";

const Signup = () => {
  const axios = useAxios();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axios.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("add to database");
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User created successfully.",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <div className="container mx-auto px-5 my-7 flex items-center justify-center lg:flex-row-reverse flex-col gap-8">
      <div className="">
        <img
          className="lg:h-[400px]"
          src="../assets/others/authentication2.png"
          alt=""
        />
      </div>
      <div className="flex-1 max-w-md bg-[#f0eded] px-7 py-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Sign Up Now..</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row md:gap-4">
            <div className="flex-1 w-full">
              <label className="font-bold " htmlFor="name">
                Your Name
              </label>{" "}
              <br />
              <input
                type="text"
                {...register("name", { required: true })}
                className="py-2 px-3 mb-3 mt-1 w-full rounded-sm"
                placeholder="Enter Your Name..."
              />
              {errors.name && <span>This field is required</span>}
            </div>
            <div className="flex-1 w-full">
              <label className="font-bold " htmlFor="name">
                Image URL
              </label>{" "}
              <br />
              <input
                type="url"
                {...register("photoURL", { required: true })}
                className="py-2 px-3 mb-3 mt-1 w-full rounded-sm"
                placeholder="Your Image here..."
              />
              {errors.photoURL && <span>This field is required</span>}
            </div>
          </div>
          <label className="font-bold " htmlFor="email">
            Your Email
          </label>{" "}
          <br />
          <input
            type="email"
            name="email"
            {...register("email", { required: true })}
            className="py-2 px-3 mb-3 mt-1 w-full rounded-sm"
            placeholder="Enter email here..."
          />
          {errors.email && <span>This field is required</span>}
          <label className="font-bold " htmlFor="email">
            Password
          </label>{" "}
          <br />
          <input
            type="password"
            name="password"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 16,
              pattern: /(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])/,
            })}
            className="py-2 px-3 mt-1 w-full rounded-sm"
            placeholder="Enter Password here..."
          />
          {errors.password?.type === "required" && (
            <span>password is required</span>
          )}
          {errors.password?.type === "minLength" && (
            <span>password must be 6 chercter</span>
          )}
          {errors.password?.type === "pattern" && (
            <span>
              password must have one uppercase one lowercase, onse Number , one
              Special cheracter{" "}
            </span>
          )}
          <input
            required
            type="submit"
            value="Sign In"
            className="w-full py-2 rounded bg-green-600 font-medium mt-5 text-white cursor-pointer text-lg"
          />
        </form>
        <p className="my-2 text-center font-medium">or</p>
       <SocileRegister/>
        <p className="font-bold mt-1">
          Already have an Account?
          <Link to="/login" className="text-red-600">
            sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
