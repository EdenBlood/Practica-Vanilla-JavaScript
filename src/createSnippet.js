import { getSnippetsLocalStorage, showNotification } from "./utils";

const formulario = document.querySelector("#form");
const nameInput = document.querySelector(".name");
const snippetInput = document.querySelector(".snippet");
const alertContainer = document.querySelector(".notification-container");
const snippets = getSnippetsLocalStorage();
const params = new URLSearchParams(window.location.search);
const btnSubmit = document.querySelector("#button-save");
const id = params.get("id");

let content = {
  id: id ? id : "",
  name: "",
  snippet: "",
};

document.addEventListener("DOMContentLoaded", () => {
  // editar un snippet
  if (content.id !== "") {
    const snippetEdit = snippets.find((snippet) => snippet.id === id);

    if (!snippetEdit) {
      showNotification("El snippet no existe", 3000, "error", alertContainer);
      window.location.href = "/";
    }

    // Establecemos el contenido del snippet
    content = snippetEdit;
    nameInput.value = content.name;
    snippetInput.value = content.snippet;
    btnSubmit.value = "Guardar Cambios";
  }

  events();
});

function events() {
  nameInput.addEventListener("input", (e) => {
    onChange(e);
  });

  snippetInput.addEventListener("input", (e) => {
    onChange(e);
  });
  snippetInput.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      e.preventDefault();

      const start = this.selectionStart;
      const end = this.selectionEnd;

      this.value =
        this.value.substring(0, start) + "  " + this.value.substring(end);

      this.selectionStart = this.selectionEnd = start + 2;
    }
  });

  // Guardar snippet
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    // Check imputs
    if (content.name.trim() === "" || content.snippet.trim() === "") {
      showNotification(
        "Todos los campos son obligatorios",
        3000,
        "error",
        alertContainer
      );
      return;
    }

    saveContent();
    resetContent();
  });
}

function onChange(e) {
  content = { ...content, [e.target.name]: e.target.value };
}

function saveContent() {
  if (!content.id.trim()) {
    // Crear nuevo snippet
    content.id = String(Math.floor(Math.random() * 999999));
    snippets.push(content);
    setItemLocalStorage(snippets);
  } else {
    // Editar Snippet
    const newSnippets = snippets.filter((snippet) => snippet.id !== content.id);
    newSnippets.push(content);
    setItemLocalStorage(newSnippets);
  }

  showNotification(
    "Snippet guardado correctamente",
    3000,
    "success",
    alertContainer
  );
  window.location.href = `/create-snippet?id=${content.id}`;
}

function resetContent() {
  content = {
    id: "",
    name: "",
    snippet: "",
  };
  formulario.reset();
}

function setItemLocalStorage(content) {
  window.localStorage.setItem("Zniply-snippets", JSON.stringify(content));
}
