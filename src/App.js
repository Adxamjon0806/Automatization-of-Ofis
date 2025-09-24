import { useState } from "react";
import DatePicker from "react-datepicker";
import Tarrifs from "./components/Tarrifs";
import Requesits from "./components/Requesits";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [requesits, setRequesits] = useState([]);
  console.log(selectedDate);

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
    </div>
  );
}

export default App;
