import { useState } from "react";

export const Index = () => {
  const [userId, setUserId] = useState("");

  return (
    <div>
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
