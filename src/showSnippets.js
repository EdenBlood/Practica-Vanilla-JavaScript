import { getSnippetsLocalStorage, showNotification } from "./utils";

// IFEE porque van a haber variables que existen en otros sitios
(() => {
  let snippets = [];
  const snippetsContainer = document.querySelector("#snippets__container");
  const alertContainer = document.querySelector(".notification-container");

  document.addEventListener("DOMContentLoaded", () => {
    renderSnippets();
  });

  function renderSnippets() {
    snippets = getSnippetsLocalStorage();
    cleanSnippets();

    if (snippets.length === 0) {
      addHaveNotSnippets();
      return;
    }

    snippets.forEach((snippet) => {
      const snippetDiv = document.createElement("DIV");
      snippetDiv.classList.add("snippets__container-card");
      snippetDiv.id = snippet.id;

      const snippetTitle = document.createElement("H2");
      snippetTitle.textContent = snippet.name;
      snippetTitle.classList.add("snippet__title");

      const snippetContent = document.createElement("P");
      snippetContent.textContent = snippet.snippet;
      snippetContent.classList.add("snippet__content");

      const actionsDiv = document.createElement("DIV");
      actionsDiv.classList.add("snippets__container-actions");

      const btnEdit = document.createElement("A");
      btnEdit.href = `/create-snippet.html?id=${snippet.id}`;
      btnEdit.textContent = "Editar";
      btnEdit.classList.add("btn", "btn-edit");

      const btnDelete = document.createElement("BUTTON");
      btnDelete.textContent = "Eliminar";
      btnDelete.classList.add("btn", "btn-delete");
      btnDelete.addEventListener("click", () => deleteSnippet(snippet.id));

      actionsDiv.appendChild(btnEdit);
      actionsDiv.appendChild(btnDelete);

      snippetDiv.appendChild(snippetTitle);
      snippetDiv.appendChild(snippetContent);
      snippetDiv.appendChild(actionsDiv);

      snippetsContainer.appendChild(snippetDiv);
    });
  }

  function addHaveNotSnippets() {
    const noHaveSnippet = document.createElement("P");
    noHaveSnippet.textContent = "No tienes snippets aún, Create uno";
    noHaveSnippet.classList.add("not-snippet");

    snippetsContainer.appendChild(noHaveSnippet);
  }

  function deleteSnippet(id) {
    const newSnippet = snippets.filter((snippet) => snippet.id !== id);

    setLocalStorage(newSnippet);

    renderSnippets();
    showNotification(
      "Snippet eliminado correctamente",
      3000,
      "success",
      alertContainer
    );
  }

  function cleanSnippets() {
    while (snippetsContainer.firstChild) {
      snippetsContainer.firstChild.remove();
    }
  }

  function setLocalStorage(content) {
    window.localStorage.setItem("Zniply-snippets", JSON.stringify(content));
  }
})();
