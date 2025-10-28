import z from "zod";

// Схема валидации с Zod
export const legalEntitySchema = z.object({
  date: z.date("Выберите дату"),
  inn: z.string().regex(/^[0-9]{9}$/, "ИНН должен состоять из 9 цифр"),
  companyName: z.string().min(2, "Введите название компании"),
  dealingCompany: z.enum(
    ["UZGPS", "BEPRO"],
    "Выберите компанию, через которую вы совершаете договор"
  ),
});

export const individualSchema = z.object({
  date: z.date("Выберите дату"),
  personName: z.string().min(1, "ФИО обязательно для заполнения").trim(),
  passportSerries: z
    .string()
    .min(1, "Серия паспорта обязательна")
    .regex(/^[A-Za-zА-Яа-яЁё]{2}$/, "Серия паспорта должна состоять из 2 букв"),
  passportNumber: z
    .string()
    .min(1, "Номер паспорта обязателен")
    .regex(/^\d{7}$/, "Номер паспорта должен содержать 7 цифр"),
  pinfl: z
    .string()
    .min(1, "ПИНФЛ обязателен")
    .regex(/^\d{14}$/, "ПИНФЛ должен состоять из 14 цифр"),
  inn: z
    .string()
    .min(1, "ИНН обязателен")
    .regex(/^\d{9}$/, "ИНН должен состоять из 9 цифр"),
  dealingCompany: z.enum(
    ["UZGPS", "BEPRO"],
    "Выберите компанию, через которую вы совершаете договор"
  ),
});
