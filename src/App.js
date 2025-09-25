import { useState } from "react";
import DatePicker from "react-datepicker";
import Tarrifs from "./components/Tarrifs";
import Requesits from "./components/Requesits";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [requesits, setRequesits] = useState([]);
  const [soliqUz, setSoliqUz] = useState(false);
  const [didox, setDidox] = useState(false);
  const [ownWay, setOwnWay] = useState(false);
  console.log(selectedDate);

  function handleRadioChange(
    firstSetterFunc,
    secondSetterFunc,
    thirdSetterFunc
  ) {
    firstSetterFunc(true);
    secondSetterFunc(false);
    thirdSetterFunc(false);
  }

  return (
    <div className="container">
      <DatePicker
        showIcon
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
      />
      <div>
        <label>Наименование Компании: </label>
        <input />
      </div>
      <div>
        <label>Имя Директора: </label>
        <input />
      </div>
      <div>
        <label>Адрес: </label>
        <input />
      </div>
      <div>
        <label>Телефон: </label>
        <input />
      </div>
      <div>
        <label>Рассчётный Счёт: </label>
        <input />
      </div>
      <div>
        <label>Банк: </label>
        <input />
      </div>
      <div>
        <label>НФО: </label>
        <input />
      </div>
      <div>
        <label>ОКЭФ: </label>
        <input />
      </div>
      <div>
        <label>ИНН: </label>
        <input />
      </div>
      <div>
        <label>Регистрациоонный номер налогоплательщика: </label>
        <input />
      </div>
      <Requesits requesits={requesits} setRequesits={setRequesits} />
      <Tarrifs />
      <div className="typesOfSendigWrapper">
        <div>
          <input
            type="radio"
            checked={soliqUz}
            onClick={(e) => {
              e.stopPropagation();
              handleRadioChange(setSoliqUz, setDidox, setOwnWay);
            }}
          />
          <label>SoliqUz</label>
        </div>
        <div>
          <input
            type="radio"
            checked={didox}
            onClick={(e) => {
              e.stopPropagation();
              handleRadioChange(setDidox, setSoliqUz, setOwnWay);
            }}
          />
          <label>Didox</label>
        </div>
        <div>
          <input
            type="radio"
            checked={ownWay}
            onClick={(e) => {
              e.stopPropagation();
              handleRadioChange(setOwnWay, setDidox, setSoliqUz);
            }}
          />
          <input placeholder="Свой вариант" />
        </div>
      </div>
      <button className="sendButton">Отправить</button>
    </div>
  );
}

export default App;
