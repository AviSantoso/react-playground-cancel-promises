import React, { useEffect } from "react";
import Promise from "bluebird";

import "./styles.css";

interface IUser {
  name: string;
  email: string;
  age: string;
}

const getUser = () =>
  new Promise<IUser>((resolve) => {
    setTimeout(
      () => resolve({ name: "Avi", email: "avi.santoso@gmail.com", age: "22" }),
      2000
    );
  });

const User = () => {
  const [name, setName] = React.useState("Loading...");
  const [email, setEmail] = React.useState("Loading...");
  const [age, setAge] = React.useState("Loading...");
  useEffect(() => {
    const effect = async () => {
      const user = await getUser();
      setName(user.name);
      setEmail(user.email);
      setAge(user.age);
    };
    const promise = effect();
    return () => {
      promise.cancel();
    };
  }, []);

  return (
    <div>
      <h1>User:</h1>
      <h2>Name: {name}</h2>
      <h2>Email: {email}</h2>
      <h2>Age: {age}</h2>
    </div>
  );
};

const UserButton = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow((p) => !p);
  const buttonText = show ? "Hide" : "Show";
  return (
    <div>
      <button onClick={handleClick}>{buttonText}</button>
      {show ? <User /> : null}
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <UserButton />
    </div>
  );
}
