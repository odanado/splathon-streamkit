import { useState } from "react";

const data = {
  test: "init",
} as { test: string };

export const Test = () => {
  console.log("render Test", data);
  const [state, setState] = useState(data.test);
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    data.test = e.target.value;
    setState(e.target.value);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Done");
  };
  return (
    <div>
      <div>hello</div>
      <input type="text" value={state} onChange={handleChange} />
    </div>
  );
};
