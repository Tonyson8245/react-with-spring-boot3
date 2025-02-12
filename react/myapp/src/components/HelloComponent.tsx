import React from "react";

type HelloProps = {
  name: string;
  age: number;
};

function HelloComponent({ name, age }: HelloProps) {
  return (
    <>
      Hello {name}, you are {age} years old!
    </>
  );
}

export default HelloComponent;
