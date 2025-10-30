import React, { useState } from "react";
import { individualSchema } from "../service/formSchema";
import { postTheIndividualDatas } from "../service/axiosAPI";
import DatePicker from "react-datepicker";
import Requesits from "../components/Requesits";
import Tarrifs from "../components/Tarrifs";
import AbonentTarrifs from "../components/AbonentTarrifs";

const IndividualAgreement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [givenAt, setGivenAt] = useState("");
  const [requesits, setRequesits] = useState([]);

  // Данные формы
  const [formData, setFormData] = useState({
    personName: "",
    phone: "",
    passportSerries: "",
    passportNumber: "",
    givenFrom: "",
    pinfl: "",
    address: "",
    inn: "",
    date: new Date(),
    tarrifs: [],
    abonentTarrifs: [],
    sendingMethod: "",
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
    const parsed = individualSchema.safeParse({
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
      postTheIndividualDatas({ ...formData, givenAt, requesits }, setIsLoading);
      setIsLoading(true);
    }
  }

  return (
    <div className="container">
      <label>Дата договора:</label>
      <DatePicker
        showIcon
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
      />
      {errors.date && <p className="error">{errors.date}</p>}
      <div>
        <label>ФИО: </label>
        <input
          name="personName"
          value={formData.personName}
          onChange={handleChange}
        />
      </div>
      {errors.personName && <p className="error">{errors.personName}</p>}
      <div>
        <label>Телефон: </label>
        <input name="phone" value={formData.phone} onChange={handleChange} />
        {errors.phone && <p className="error">{errors.phone}</p>}
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
        <label>Серия паспорта: </label>
        <input
          name="passportSerries"
          value={formData.passportSerries}
          onChange={handleChange}
        />
      </div>
      {errors.passportSerries && (
        <p className="error">{errors.passportSerries}</p>
      )}
      <div>
        <label>Номер паспорта: </label>
        <input
          type="number"
          name="passportNumber"
          value={formData.passportNumber}
          onChange={handleChange}
        />
      </div>
      {errors.passportNumber && (
        <p className="error">{errors.passportNumber}</p>
      )}
      <div>
        <label>Кем выдан: </label>
        <input
          name="givenFrom"
          value={formData.givenFrom}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Когда выдан: </label>
        <DatePicker
          showIcon
          selected={givenAt}
          onChange={(date) => setGivenAt(date)}
        />
      </div>
      <div>
        <label>ПИНФЛ: </label>
        <input
          type="number"
          name="pinfl"
          value={formData.pinfl}
          onChange={handleChange}
        />
      </div>
      {errors.pinfl && <p className="error">{errors.pinfl}</p>}
      <div>
        <label>ИНН: </label>
        <input name="inn" value={formData.inn} onChange={handleChange} />
        {errors.inn && <p className="error">{errors.inn}</p>}
      </div>
      <Requesits requesits={requesits} setRequesits={setRequesits} />
      <Tarrifs setFormData={setFormData} />
      {errors.tarrifs && <p className="error">{errors.tarrifs}</p>}
      <AbonentTarrifs setFormData={setFormData} />
      <div className="SengingErrorWrapper">
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
        {errors.sendingMethod && (
          <p className="error">{errors.sendingMethod}</p>
        )}
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
            <option value={"Жавлиев А."}>Жавлиев А.</option>
            <option value={"Махмудов Б."}>Махмудов Б.</option>
            <option value={"Бойжигитов Ш."}>Бойжигитов Ш.</option>
          </select>
        </label>
        {errors.manager && <p className="error">{errors.manager}</p>}
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
      {Object.keys(errors).length !== 0 && (
        <p className="error">
          Вы не корректно ввели данные, проверьте пожалуйста форму и попробуйте
          снова
        </p>
      )}
    </div>
  );
};

export default IndividualAgreement;
