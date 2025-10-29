import axios from "axios";

// const _ = "http://localhost:5000";

const baseRequest = axios.create({
  baseURL: "https://automatization-server.onrender.com",
});

export const postTheLegalDatas = async function (data, setIsLoading) {
  try {
    const response = await baseRequest({
      method: "post",
      url: "/new-legal-entity-agreement",
      data: data,
    });

    const { docx, pdf, filesName } = response.data;

    const docxBlob = new Blob(
      [Uint8Array.from(atob(docx), (c) => c.charCodeAt(0))],
      {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      }
    );
    const pdfBlob = new Blob(
      [Uint8Array.from(atob(pdf), (c) => c.charCodeAt(0))],
      { type: "application/pdf" }
    );

    // создаем и скачиваем docx
    const docxUrl = URL.createObjectURL(docxBlob);
    const docxLink = document.createElement("a");
    docxLink.href = docxUrl;
    docxLink.download = filesName;
    docxLink.click();

    // создаем и скачиваем pdf
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const pdfLink = document.createElement("a");
    pdfLink.href = pdfUrl;
    pdfLink.download = filesName.replace(".docx", ".pdf");
    pdfLink.click();

    URL.revokeObjectURL(docxUrl);
    URL.revokeObjectURL(pdfUrl);

    if (response.status === 200) {
      setIsLoading(false);
    }
  } catch (e) {
    console.error(e);
  }
};

export const postTheIndividualDatas = async function (data, setIsLoading) {
  try {
    const response = await baseRequest({
      method: "post",
      url: "/new-individual-agreement",
      data: data,
    });

    const { docx, pdf, filesName } = response.data;

    const docxBlob = new Blob(
      [Uint8Array.from(atob(docx), (c) => c.charCodeAt(0))],
      {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      }
    );
    const pdfBlob = new Blob(
      [Uint8Array.from(atob(pdf), (c) => c.charCodeAt(0))],
      { type: "application/pdf" }
    );

    // создаем и скачиваем docx
    const docxUrl = URL.createObjectURL(docxBlob);
    const docxLink = document.createElement("a");
    docxLink.href = docxUrl;
    docxLink.download = filesName;
    docxLink.click();

    // создаем и скачиваем pdf
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const pdfLink = document.createElement("a");
    pdfLink.href = pdfUrl;
    pdfLink.download = filesName.replace(".docx", ".pdf");
    pdfLink.click();

    URL.revokeObjectURL(docxUrl);
    URL.revokeObjectURL(pdfUrl);

    if (response.status === 200) {
      setIsLoading(false);
    }
  } catch (e) {
    console.error(e);
  }
};

export const getCount = async function () {
  try {
    const response = await baseRequest({ method: "get", url: "/get-count" });
    console.log(response.data);

    return response.data.count;
  } catch (e) {
    console.error("Ошибка при получении счёта", e);
  }
};

export const changeCountRequest = async function (count, countBody, setCount) {
  try {
    const response = await baseRequest({
      method: "post",
      url: "/change-count",
      data: { count, countBody },
    });
    setCount(response.data.newCount.count);
    return response.data.newCount;
  } catch (e) {
    console.error("Ошибка при изменении счёта", e);
  }
};
