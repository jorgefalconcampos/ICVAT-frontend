let baseUrl = "";

process.env.CURRENT_ENV === "production" 
    ? baseUrl = "xxxx" 
    : baseUrl = "http://localhost:8000/api"

export const apiHost = baseUrl;