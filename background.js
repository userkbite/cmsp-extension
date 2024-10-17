let isFetching = false;

async function fetchCorrectAnswer(url, key) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
    "x-api-key": key,
  };

  const body = {
    answer: {
      answer: {
        0: false,
        1: false,
        2: false,
        3: true,
        4: false,
      },
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const responseBody = await response.json();

    // Armazena a mensagem no localStorage
    localStorage.setItem(
      "correctAnswerMessage",
      responseBody.comment || "Sem mensagem."
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    isFetching = false;
  }
}

function logURL(requestDetails) {
  const targetUrlStart = "https://edusp-api.ip.tv/tms/task/";

  const key = requestDetails.requestHeaders[5].value;

  if (
    requestDetails.method === "POST" &&
    requestDetails.url.startsWith(targetUrlStart) &&
    !isFetching
  ) {
    isFetching = true;
    fetchCorrectAnswer(requestDetails.url, key);
  }
}

chrome.webRequest.onBeforeSendHeaders.addListener(
  logURL,
  { urls: ["<all_urls>"] },
  ["requestHeaders"]
);
