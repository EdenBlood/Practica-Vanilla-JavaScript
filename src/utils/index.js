export function getSnippetsLocalStorage() {
  return JSON.parse(window.localStorage.getItem("Zniply-snippets")) || [];
}

export function showNotification(message, duration = 3000, type, container) {
  const notification = document.createElement("DIV");
  notification.classList.add("notification");
  notification.textContent = message;

  if (type === "error") {
    notification.classList.add("error");
  } else {
    notification.classList.add("success");
  }

  container.appendChild(notification);

  setTimeout(() => notification.remove(), duration);
}
