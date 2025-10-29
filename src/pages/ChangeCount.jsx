import React, { useEffect, useState } from "react";
import { changeCountRequest, getCount } from "../service/axiosAPI";

const ChangeCount = () => {
  const [count, setCount] = useState("");
  const [newCount, setNewCount] = useState("");
  const [countBody, setCountBody] = useState({});

  useEffect(() => {
    (async () => {
      const count = await getCount();
      setCountBody(count);
      setCount(count.count);
    })();
  }, []);

  return (
    <div className="container">
      <p>Текущий счёт договоров: {count}</p>
      <input
        type="number"
        value={newCount}
        onChange={(e) => setNewCount(e.target.value)}
      />
      <button onClick={() => changeCountRequest(newCount, countBody, setCount)}>
        Изменить счёт
      </button>
    </div>
  );
};

export default ChangeCount;
