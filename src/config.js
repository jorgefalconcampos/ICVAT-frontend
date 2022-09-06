let baseUrl = "";

if (process.env.CURRENT_ENV === "prod") {
  baseUrl = "https://icvat-iqy65.ondigitalocean.app/api";
} else {
  baseUrl = "http://localhost:8000/api";
}

export const apiHost = baseUrl;