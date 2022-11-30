import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const handleCreateUser = (e) => {
    e.preventDefault();
    console.log("object");
    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const fullName = `${firstName} ${lastName}`;
    const email = form.email.value;
    const photoURL = form.photoUrl.value;
    const password = form.password.value;
    const confirm = form.confirm.value;
    if (password.length < 6) {
      setError("At least 6 character or more.");
      return;
    } else if (password.length >= 6) {
      setError(null);
    }
    if (password !== confirm) {
      setError("don't match password and confirm password.");
      return;
    }
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        handleUserProfileUpdate(fullName, photoURL);
        form.reset();
        saveUser(fullName, email, photoURL);
      })
      .catch((error) => console.error("error", error));
  };

  const handleUserProfileUpdate = (name, photoUrl) => {
    const profile = {
      displayName: name,
      photoURL: photoUrl,
    };
    updateUserProfile(profile)
      .then(() => {})
      .then((error) => console.log(error));
  };

  const saveUser = (name, email, photoURL) => {
    const user = { name, email, photoURL, role: "buyer",verified:false };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {});
  };

  return (
    <div className="font-sans antialiased bg-grey-lightest">
      <div className="w-full bg-grey-lightest ">
        <div className="container mx-auto py-8 ">
          <div className="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow-xl shadow-slate-400">
            <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter">
              Register for a free account
            </div>
            <form onSubmit={handleCreateUser} className="py-4 px-8">
              <div className="md:flex mb-4">
                <div className="md:w-1/2 mr-1">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    htmlFor="first_name"
                  >
                    First Name
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                    id="first_name"
                    type="text"
                    name="firstName"
                    placeholder="Your first name"
                  />
                </div>
                <div className="md:w-1/2 ml-1">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    htmlFor="last_name"
                  >
                    Last Name
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                    id="last_name"
                    type="text"
                    name="lastName"
                    placeholder="Your last name"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-grey-darker text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Your email address"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-grey-darker text-sm font-bold mb-2"
                  htmlFor="photoUrl"
                >
                  Your Photo-Url
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                  id="photoUrl"
                  type="text"
                  name="photoUrl"
                  placeholder="Your photo-url"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-grey-darker text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Your secure password"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-grey-darker text-sm font-bold mb-2"
                  htmlFor="confirm"
                >
                  Confirm Password
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                  id="confirm"
                  type="password"
                  name="confirm"
                  placeholder="Confirm password"
                />
                <p className="text-grey text-xs mt-1 text-red-700">{error}</p>
              </div>

              <div className="flex items-center justify-between mt-8">
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-auto"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
          <p className="text-center my-4 text-[18px] text-grey-dark text-sm no-underline hover:text-grey-darker">
            You already have an account?
            <Link to="/login" className="text-blue-700 font-bold">
              Log in.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
