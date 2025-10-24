import axios from "axios";

const _ = "http://localhost:5000";

const baseRequest = axios.create({
  baseURL: "https://automatization-server.onrender.com",
});

export const postTheDatas = async function (data, setIsLoading) {
  try {
    const response = await baseRequest({
      method: "post",
      url: "/new-agreement",
      data: data,
      // responseType: "blob",
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
