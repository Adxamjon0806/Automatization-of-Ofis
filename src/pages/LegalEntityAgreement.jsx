import React, { useState } from "react";
import { legalEntitySchema } from "../service/formSchema";
import { postTheLegalDatas } from "../service/axiosAPI";
import DatePicker from "react-datepicker";
import Requesits from "../components/Requesits";
import Tarrifs from "../components/Tarrifs";
import AbonentTarrifs from "../components/AbonentTarrifs";

const LegalEntityAgreement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [requesits, setRequesits] = useState([]);

  // Данные формы
  const [formData, setFormData] = useState({
    companyName: "",
    directorName: "",
    address: "",
    phone: "",
    account: "",
    bank: "",
    nfo: "",
    okef: "",
    inn: "",
    taxNumber: "",
    date: new Date(),
    tarrifs: [],
    abonentTarrifs: [],
    sendingMethod: "",
    requesits: [],
    manager: "",
    dealingCompany: "",
  });

  // Ошибки
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit() {
    const parsed = legalEntitySchema.safeParse({
      ...formData,
      date: selectedDate,
      requesits: requesits,
    });
    if (!parsed.success) {
      const fieldErrors = {};
      console.log(parsed);
      parsed.error._zod.def.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      postTheLegalDatas(formData, setIsLoading);
      setIsLoading(true);
    }
  }

  return (
    <div className="container">
      <DatePicker
        showIcon
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
      />
      {errors.date && <p className="error">{errors.date}</p>}
      <div>
        <label>Наименование Компании: </label>
        <input
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
        />
        {errors.companyName && <p className="error">{errors.companyName}</p>}
      </div>
      <div>
        <label>Имя Директора: </label>
        <input
          name="directorName"
          value={formData.directorName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Адрес: </label>
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Телефон: </label>
        <input name="phone" value={formData.phone} onChange={handleChange} />
      </div>
      <div>
        <label>Рассчётный Счёт: </label>
        <input
          name="account"
          value={formData.account}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Банк: </label>
        <input name="bank" value={formData.bank} onChange={handleChange} />
      </div>
      <div>
        <label>НФО: </label>
        <input name="nfo" value={formData.nfo} onChange={handleChange} />
      </div>
      <div>
        <label>ОКЭФ: </label>
        <input name="okef" value={formData.okef} onChange={handleChange} />
      </div>
      <div>
        <label>ИНН: </label>
        <input name="inn" value={formData.inn} onChange={handleChange} />
        {errors.inn && <p className="error">{errors.inn}</p>}
      </div>
      <div>
        <label>Регистрациоонный номер налогоплательщика: </label>
        <input
          name="taxNumber"
          value={formData.taxNumber}
          onChange={handleChange}
        />
      </div>
      <Requesits requesits={requesits} setRequesits={setRequesits} />
      <Tarrifs setFormData={setFormData} />
      {errors.tarrifs && <p className="error">{errors.tarrifs}</p>}
      <AbonentTarrifs setFormData={setFormData} />
      <div className="typesOfSendigWrapper">
        <div>
          <input
            type="radio"
            checked={formData.sendingMethod === "soliqUz"}
            onChange={() => {}}
            onClick={(e) => {
              e.stopPropagation();
              // handleRadioChange(setSoliqUz, setDidox, setOwnWay);
              setFormData((prev) => ({ ...prev, sendingMethod: "soliqUz" }));
            }}
          />
          <label>SoliqUz</label>
        </div>
        <div>
          <input
            type="radio"
            checked={formData.sendingMethod === "didox"}
            onChange={() => {}}
            onClick={(e) => {
              e.stopPropagation();
              // handleRadioChange(setDidox, setSoliqUz, setOwnWay);
              setFormData((prev) => ({ ...prev, sendingMethod: "didox" }));
            }}
          />
          <label>Didox</label>
        </div>
        <div>
          <input
            type="radio"
            checked={
              formData.sendingMethod !== "didox" &&
              formData.sendingMethod !== "soliqUz" &&
              formData.sendingMethod
            }
            onChange={() => {
              setFormData((prev) => ({
                ...prev,
                sendingMethod: "Свой способ",
              }));
            }}
            onClick={(e) => {
              e.stopPropagation();
              // handleRadioChange(setOwnWay, setDidox, setSoliqUz);
              setFormData((prev) => ({ ...prev, sendingMethod: "" }));
            }}
          />
          <input
            placeholder="Свой вариант"
            name="sendingMethod"
            value={formData.sendingMethod}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <label>
          Выберите менеджера контракта:
          <select
            name="manager"
            value={formData.manager}
            onChange={handleChange}
          >
            <option value="">-- Выберите --</option>
            <option value={"Маннапов А."}>Маннапов А.</option>
            <option value={"Рахимов М."}>Рахимов М.</option>
            <option value={"Арифджанов О."}>Арифджанов О.</option>
            <option value={"Омонуллаев Х."}>Омонуллаев Х.</option>
            <option value={"Шодиев И."}>Шодиев И.</option>
            <option value={"Нишонов Х."}>Нишонов Х.</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Выберите компанию, через которую вы совершаете договор:
          <select
            name="dealingCompany"
            value={formData.dealingCompany}
            onChange={handleChange}
          >
            <option value="">-- Выберите --</option>
            <option value={"UZGPS"}>UZGPS</option>
            <option value={"BEPRO"}>BEPRO</option>
          </select>
        </label>
      </div>
      {errors.dealingCompany && (
        <p className="error">{errors.dealingCompany}</p>
      )}
      <div className="sendingWrapper">
        <button
          className="sendButton"
          onClick={isLoading ? () => {} : handleSubmit}
        >
          Отправить
        </button>
        <p className="watingText">
          {isLoading ? "Подождите пока ваш файл не загрузиться . . ." : ""}
        </p>
      </div>
    </div>
  );
};

export default LegalEntityAgreement;
