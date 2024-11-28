const baseURL = "https://we6.talentsprint.com/wordle/game/";
export const registerURL = baseURL + "register";
export const createGameURL = baseURL + "create";
export const guessURL = baseURL + "guess";

const postHeaders = new Headers({ "Content-Type": "application/json" });

export const postRequest = async (url: string, body: object) => {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
    credentials: "include",
  });
};
