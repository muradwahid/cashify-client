import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillGoogleCircle } from "react-icons/ai";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";
import useTitle from "../../hooks/useTitle";
const Login = () => {
  const { signIn, popupSignIn } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const location = useLocation();
  useTitle("Login")
  let from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
    const handleSignIn = (e) => {

    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
      const password = form.password.value;
      const condition = form.usercondition.value;
        signIn(email,password)
            .then(result => {
              const user = result.user;
              fetch(
                `https://assignment-12-server-gules.vercel.app/usersrole?email=${email}&role=${condition}`,
                {
                  method: "PUT",
                  headers: {
                    "content-type": "application/json",
                  },
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  navigate(from,{replace:true})
                });
              toast.success("Successfully logged in")
            })
            .catch(err => {
                toast.error("Invalid email or password")
        })
  };
  const handlePopUpSignin = () => {
        popupSignIn(googleProvider)
          .then((result) => {
            const user = result.user;
            const userData = {
              name: user.displayName,
              email:user.email
            }
            fetch("https://assignment-12-server-gules.vercel.app/users", {
              method: "POST",
              headers: {
                "content-type":"application/json"
              },
              body:JSON.stringify(userData)
            })
              .then(res => res.json)
              .then(data => {
              })
            fetch(`https://assignment-12-server-gules.vercel.app/users/${user.email}`, {
              method: "PUT",
              headers: {
                "content-type":"application/json"
              },
            })
            .then(res=>res.json())
              .then(data => {
                navigate(from, { replace: true });
            })
          })
          .catch((err) => console.log(err));
  }
  return (
    <div className="flex items-center min-h-screen p-4 bg-gray-100 justify-center">
      <div className="lg:w-2/5">
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">
            Account Login
          </h3>
          <form onSubmit={handleSignIn} className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-500"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-500"
                >
                  Password
                </label>
                <Link
                  href="#"
                  className="text-sm text-blue-600 hover:underline focus:text-blue-800"
                >
                  Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <select
                name="usercondition"
                className="select select-bordered w-full"
              >
                <option value="admin">Select role</option>
                <option value="seller">seller</option>
                <option value="buyer">buyer</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
              />
              <label
                htmlFor="remember"
                className="text-sm font-semibold text-gray-500"
              >
                Remember me
              </label>
            </div>
            <div>
              <p>
                Don't have an account please{" "}
                <Link to="/register" className="underline text-red-400">
                  Register
                </Link>
              </p>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-700 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                Log in
              </button>
            </div>
            <div className="flex flex-col space-y-5">
              <span className="flex items-center justify-center space-x-2">
                <span className="h-px bg-gray-400 w-14"></span>
                <span className="font-normal text-gray-500">or login with</span>
                <span className="h-px bg-gray-400 w-14"></span>
              </span>
              <div className="flex flex-col space-y-4">
                <Link
                  onClick={handlePopUpSignin}
                  className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-gray-800 rounded-md group hover:bg-gray-800 focus:outline-none"
                >
                  <span className="text-gray-800 group-hover:text-white">
                    <AiFillGoogleCircle className="text-[20px]" />
                  </span>
                  <span className="text-sm font-medium text-gray-800 group-hover:text-white">
                    Google
                  </span>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
