import React, { useState } from "react";
import "./Table.css"; // Стили для таблицы
import { tarrifData } from "../service/tarrifDatas";

const Tarrifs = ({ setFormData }) => {
  const [tarrifs, setServices] = useState(tarrifData);

  const handleRadioChange = (id) => {
    const updatedServices = tarrifs.map((service) => ({
      ...service,
      selected: service.id === id ? !service.selected : service.selected,
    }));
    setServices(updatedServices);

    const updateFormTarrifs = updatedServices.filter((el) => el.selected);

    setFormData((prev) => ({ ...prev, tarrifs: updateFormTarrifs }));
  };

  const handleInputChange = (id, field, value) => {
    const updatedServices = tarrifs.map((service) =>
      service.id === id ? { ...service, [field]: value } : service
    );

    for (let i = 0; i < updatedServices.length; i++) {
      const element = updatedServices[i];
      element.totalPrice = Number(element.price) * Number(element.count);
    }
    setServices(updatedServices);
    const updateFormTarrifs = updatedServices.filter((el) => el.selected);

    setFormData((prev) => ({ ...prev, tarrifs: updateFormTarrifs }));
  };

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Услуги с разовыми начислениями</th>
            <th width="100">Выбор</th>
          </tr>
        </thead>
        <tbody>
          {tarrifs.map((service) => (
            <React.Fragment key={service.id}>
              {/* Основная строка */}
              <tr
                className={`table-row ${service.selected ? "expanded" : ""}`}
                onClick={() => {
                  handleRadioChange(service.id);
                }}
              >
                <td>
                  <div className="service-name">{service.name}</div>
                </td>
                <td>
                  <input
                    type="checkbox"
                    name={"tarrif" + service.id}
                    checked={service.selected}
                    onChange={() => {
                      handleRadioChange(service.id);
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRadioChange(service.id);
                    }}
                  />
                </td>
              </tr>

              {/* Расширяемая часть */}
              {service.selected && (
                <tr className="expanded-content">
                  <td colSpan="2">
                    <div className="expanded-details">
                      <div className="description-section">
                        <label>Описание:</label>
                        <textarea
                          rows={5}
                          type="text"
                          value={service.description}
                          onChange={(e) =>
                            handleInputChange(
                              service.id,
                              "description",
                              e.target.value
                            )
                          }
                          className="editable-input"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      <div className="price-section">
                        <label>Цена:</label>
                        <input
                          type="number"
                          value={service.price}
                          onChange={(e) =>
                            handleInputChange(
                              service.id,
                              "price",
                              e.target.value
                            )
                          }
                          className="editable-input"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      <div className="count-section">
                        <label>Количество:</label>
                        <input
                          type="number"
                          value={service.count}
                          onChange={(e) =>
                            handleInputChange(
                              service.id,
                              "count",
                              e.target.value
                            )
                          }
                          className="editable-input"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      <div className="totalPrice-section">
                        <label>Общая сумма:</label>
                        <input
                          type="number"
                          value={service.totalPrice}
                          readOnly={true}
                          className="editable-input"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tarrifs;
