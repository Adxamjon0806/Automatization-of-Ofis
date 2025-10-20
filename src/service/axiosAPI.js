import axios from "axios";

const baseRequest = axios.create({
  baseURL: "http://localhost:5000",
});

export const postTheDatas = async function (data) {
  try {
    const response = await baseRequest({
      method: "post",
      url: "/new-agreement",
      data: data,
      responseType: "blob",
    });

    // Создаём ссылку на blob
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "output.docx"); // имя файла
    document.body.appendChild(link);
    link.click(); // автоматический клик
    link.remove();
  } catch (e) {
    console.error(e);
  }
};
