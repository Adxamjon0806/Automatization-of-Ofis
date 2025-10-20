import z from "zod";

// Схема валидации с Zod
export const formSchema = z.object({
  date: z.date("Выберите дату"),
  inn: z.string().regex(/^[0-9]{9}$/, "ИНН должен состоять из 9 цифр"),
  companyName: z.string().min(2, "Введите название компании"),
});
