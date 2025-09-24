import React, { useState } from "react";
import "./Table.css"; // Стили для таблицы

const Tarrifs = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [services, setServices] = useState([
    {
      id: 1,
      name: "STANDART-1",
      description: "Описание STANDART-1",
      price: "100000",
      selected: false,
    },
    {
      id: 2,
      name: "STANDART-2",
      description: "Описание STANDART-2",
      price: "250000",
      selected: false,
    },
    {
      id: 3,
      name: "STANDART-3",
      description: "Описание STANDART-3",
      price: "400000",
      selected: false,
    },
    {
      id: 4,
      name: "STANDART-4",
      description: "Описание STANDART-4 установило",
      price: "650000",
      selected: false,
    },
  ]);

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleRadioChange = (id) => {
    const updatedServices = services.map((service) => ({
      ...service,
      selected: service.id === id && !service.selected,
    }));
    console.log(updatedServices);

    setServices(updatedServices);
  };

  const handleInputChange = (id, field, value) => {
    const updatedServices = services.map((service) =>
      service.id === id ? { ...service, [field]: value } : service
    );
    setServices(updatedServices);
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
          {services.map((service) => (
            <React.Fragment key={service.id}>
              {/* Основная строка */}
              <tr
                className={`table-row ${
                  expandedRow === service.id ? "expanded" : ""
                }`}
                onClick={() => toggleRow(service.id)}
              >
                <td>
                  <div className="service-name">{service.name}</div>
                </td>
                <td>
                  <input
                    type="radio"
                    name="service"
                    checked={service.selected}
                    onChange={() => handleRadioChange(service.id)}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRadioChange(service.id);
                    }}
                  />
                </td>
              </tr>

              {/* Расширяемая часть */}
              {expandedRow === service.id && (
                <tr className="expanded-content">
                  <td colSpan="2">
                    <div className="expanded-details">
                      <div className="description-section">
                        <label>Описание:</label>
                        <input
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
                          type="text"
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
