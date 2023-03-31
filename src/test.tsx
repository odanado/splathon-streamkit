import { useUser } from "./hooks/use-user";

export const Test = () => {
  const { user, signIn } = useUser();
  const handleClick = async () => {
    await signIn();
  };
  return (
    <div>
      <div>hello: {user?.email}</div>
      <button onClick={handleClick}>click</button>
    </div>
  );
};
