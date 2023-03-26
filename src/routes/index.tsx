import { useState } from "react";
import { useMatch } from "../hooks/use-match";

export const Index = () => {
  const [userId, setUserId] = useState("");
  const { match, matchOnce, isLoading, error } = useMatch("poyo");
  console.log({ match, matchOnce, isLoading, error });

  return (
    <div>
      <div>{JSON.stringify(matchOnce)}</div>
      <input
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        type="text"
      />
      <a href={`/console/${userId}`} target="_blank">
        コンソールへ移動
      </a>
    </div>
  );
};
