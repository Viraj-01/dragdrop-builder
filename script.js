const canvas = document.getElementById("canvas");
const propertyForm = document.getElementById("property-form");
const propertiesContent = document.getElementById("properties-content");
let selectedElement = null;

// Drag from sidebar
document.querySelectorAll(".element").forEach(el => {
  el.addEventListener("dragstart", e => {
    e.dataTransfer.setData("type", e.target.dataset.type);
  });
});

// Drop inside canvas
canvas.addEventListener("dragover", e => e.preventDefault());
canvas.addEventListener("drop", e => {
  e.preventDefault();
  const type = e.dataTransfer.getData("type");
  if (!type) return;

  const canvasRect = canvas.getBoundingClientRect();
  const x = e.clientX - canvasRect.left;
  const y = e.clientY - canvasRect.top;

  let newElement;
  switch (type) {
    case "text":
      newElement = document.createElement("div");
      newElement.textContent = "Edit me!";
      newElement.contentEditable = true;
      break;
    case "image":
      newElement = document.createElement("img");
      newElement.src = "elementor-placeholder-image.webp";
      newElement.style.width = "150px";
      newElement.style.height = "150px";
      break;
    case "button":
      newElement = document.createElement("button");
      newElement.textContent = "Click Me";
      break;
  }

  if (newElement) {
    newElement.classList.add("canvas-element");
    newElement.style.left = x + "px";
    newElement.style.top = y + "px";
    newElement.addEventListener("mousedown", onElementDrag);
    newElement.addEventListener("click", () => selectElement(newElement));
    canvas.appendChild(newElement);
    selectElement(newElement);
  }
});

function selectElement(el) {
  selectedElement = el;
  renderEditor(el);
}

function renderEditor(el) {
  propertiesContent.innerHTML = "";

  let controls = "";

  if (el.tagName === "DIV") {
    controls = `
      <label>Text:</label>
      <input type="text" name="text" value="${el.textContent}">
      <label>Font Size:</label>
      <input type="number" name="fontSize" value="${parseInt(window.getComputedStyle(el).fontSize)}">
      <label>Color:</label>
      <input type="color" name="color" value="#000000">
    `;
  } else if (el.tagName === "IMG") {
    controls = `
      <label>Image URL:</label>
      <input type="text" name="src" value="${el.src}">
      <label>Width (px):</label>
      <input type="number" name="width" value="${parseInt(el.style.width)}">
      <label>Height (px):</label>
      <input type="number" name="height" value="${parseInt(el.style.height) || 150}">
    `;
  } else if (el.tagName === "BUTTON") {
    controls = `
      <label>Button Text:</label>
      <input type="text" name="text" value="${el.textContent}">
      <label>Background Color:</label>
      <input type="color" name="bgColor" value="#007BFF">
    `;
  }

  propertiesContent.innerHTML = `
    ${controls}
    <button type="button" id="delete-btn" class="delete-btn">Delete Element</button>
  `;

  document.getElementById("delete-btn").addEventListener("click", () => {
    el.remove();
    selectedElement = null;
    propertiesContent.innerHTML = "<p>Select an element to edit</p>";
  });
}

propertyForm.addEventListener("input", () => {
  if (!selectedElement) return;
  const formData = new FormData(propertyForm);

  if (selectedElement.tagName === "DIV") {
    selectedElement.textContent = formData.get("text");
    selectedElement.style.fontSize = formData.get("fontSize") + "px";
    selectedElement.style.color = formData.get("color");
  } else if (selectedElement.tagName === "IMG") {
    selectedElement.src = formData.get("src");
    selectedElement.style.width = formData.get("width") + "px";
    selectedElement.style.height = formData.get("height") + "px";
  } else if (selectedElement.tagName === "BUTTON") {
    selectedElement.textContent = formData.get("text");
    selectedElement.style.backgroundColor = formData.get("bgColor");
  }
});

// Download canvas as JPG
document.getElementById("download-btn").addEventListener("click", () => {
  const canvasElement = document.getElementById("canvas");

  html2canvas(canvasElement, {
    allowTaint: true,
    useCORS: true,
    backgroundColor: null // Keeps canvas background transparent if needed
  }).then(canvas => {
    const link = document.createElement("a");
    link.download = "my-website.jpg";
    link.href = canvas.toDataURL("image/jpeg", 1.0);
    link.click();
  });
});


// Toggle Grid Lines
document.getElementById("toggle-grid").addEventListener("change", e => {
  canvas.classList.toggle("grid", e.target.checked);
});

// Canvas Background Color
document.getElementById("canvas-bg-color").addEventListener("input", e => {
  canvas.style.backgroundColor = e.target.value;
});

// Handle moving existing elements
let offsetX, offsetY;
function onElementDrag(e) {
  const el = e.target;
  offsetX = e.offsetX;
  offsetY = e.offsetY;

  function moveHandler(ev) {
    const rect = canvas.getBoundingClientRect();
    el.style.left = ev.clientX - rect.left - offsetX + 'px';
    el.style.top = ev.clientY - rect.top - offsetY + 'px';
  }

  function upHandler() {
    document.removeEventListener("mousemove", moveHandler);
    document.removeEventListener("mouseup", upHandler);
  }

  document.addEventListener("mousemove", moveHandler);
  document.addEventListener("mouseup", upHandler);
}
