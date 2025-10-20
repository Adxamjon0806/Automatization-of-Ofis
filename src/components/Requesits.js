import React from "react";

const Requesits = ({ requesits, setRequesits }) => {
  function addRequesits() {
    return [
      ...requesits,
      { id: requesits.length + 1, nameOfRequesit: "", requesitsNumber: "" },
    ];
  }

  function setNameOfRequesit(id, nameOfRequesit) {
    const changingRequesits = requesits;

    for (let i = 0; i < changingRequesits.length; i++) {
      const el = changingRequesits[i];
      if (el.id === id) {
        el.nameOfRequesit = nameOfRequesit;
      }
    }
    setRequesits([...changingRequesits]);
  }

  function setNumberOfRequesits(id, requesitsNumber) {
    const changingRequesits = requesits;
    for (let i = 0; i < changingRequesits.length; i++) {
      const el = changingRequesits[i];
      if (el.id === id) {
        el.requesitsNumber = requesitsNumber;
      }
    }
    setRequesits([...changingRequesits]);
  }
  return (
    <>
      <button onClick={() => setRequesits(addRequesits())} className="addBtn">
        +
      </button>
      {requesits.map(({ id, nameOfRequesit, requesitsNumber }) => (
        <div key={id}>
          <div>
            <label>Наименование реквизита:</label>
            <input
              value={nameOfRequesit}
              onChange={(e) => setNameOfRequesit(id, e.target.value)}
            />
          </div>
          <div>
            <label>Номер реквизита:</label>
            <input
              value={requesitsNumber}
              onChange={(e) => setNumberOfRequesits(id, e.target.value)}
            />
          </div>
          <button
            className="cancelRequesit"
            onClick={() => {
              const filteredRequesits = requesits.filter(
                (requesit) => requesit.id !== id
              );
              setRequesits(filteredRequesits);
            }}
          >
            Отмена
          </button>
        </div>
      ))}
    </>
  );
};

export default Requesits;
