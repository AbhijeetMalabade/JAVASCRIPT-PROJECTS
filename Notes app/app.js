const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

function showNotes() {
  const storedNotes = localStorage.getItem("notes");
  if (storedNotes) {
    notesContainer.innerHTML = storedNotes;
    notes = document.querySelectorAll(".input-box"); // Update the notes NodeList
    bindDeleteEvents(); // Bind delete events to existing notes
  }
}
showNotes();

function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

function bindDeleteEvents() {
  notes.forEach((note) => {
    const img = note.querySelector("img");
    if (img) {
      img.addEventListener("click", () => {
        note.remove();
        updateStorage();
      });
    }
    note.onkeyup = function () {
      updateStorage();
    };
  });
}

createBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  let img = document.createElement("img");
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");
  img.src = "images/delete.png";
  img.className = "delete-btn"; // Add a class for styling
  inputBox.appendChild(img); // Append the image to the inputBox
  notesContainer.appendChild(inputBox);
  updateStorage(); // Update storage after adding a new note
  bindDeleteEvents(); // Bind delete events to the new note
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
});
