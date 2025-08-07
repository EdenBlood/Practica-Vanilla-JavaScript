const formulario = document.querySelector("#form");
const nameInput = document.querySelector(".name");
const snippetInput = document.querySelector(".snippet");
const alertDiv = document.querySelector(".alert");

const snippets = getSnippets();

let content = {
  id: "",
  name: "",
  snippet: "",
};

document.addEventListener("DOMContentLoaded", () => {
  events();
});

function events() {
  nameInput.addEventListener("input", (e) => {
    onChange(e);
  });

  snippetInput.addEventListener("input", (e) => {
    onChange(e);
  });

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    // Check imputs
    if (content.name.trim() === "" || content.snippet.trim() === "") {
      alertDiv.classList.remove("hidden");
      setTimeout(() => alertDiv.classList.add("hidden"), 3000);
      return;
    }

    saveContentInLocalStorage();
    resetContent();
  });
}

function onChange(e) {
  content = { ...content, [e.target.name]: e.target.value };
}

function saveContentInLocalStorage() {
  if (!content.id.trim()) {
    content.id = String(Math.floor(Math.random() * 999999));
  }

  snippets.push(content);

  window.localStorage.setItem("Zniply-snippets", JSON.stringify(snippets));
}

function resetContent() {
  content = {
    id: "",
    name: "",
    snippet: "",
  };
  formulario.reset();
}

function getSnippets() {
  return JSON.parse(window.localStorage.getItem("Zniply-snippets")) || [];
}
