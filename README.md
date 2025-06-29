# dragdrop-builder
🧱 How I Built a Drag-and-Drop Website Builder
1. HTML Layout (Structure)
I structured the app into three main panels:

Sidebar (left): Contains draggable UI components like Text, Image, and Button.

Canvas (center): The drop zone where users build their webpage layout.

Properties Panel (right): Allows editing of selected elements (e.g., font size, image URL).

A Top Bar provides tools like background color picker, grid toggle, and download option.

2. CSS Styling (Design & Responsiveness)
Used plain CSS for a clean, modern layout:

Added flexbox for a responsive 3-panel layout.

Applied box shadows, rounded corners, hover effects, and a neutral color palette for modern UI.

Created a grid mode background to help visually align elements.

3. JavaScript Functionality (Behavior)
💡 Key features:
Drag and Drop:

Drag items from sidebar → Drop on canvas.

Dynamically create elements (text, images, buttons) and position them absolutely.

Element Editing:

Click an element → Populate the Properties panel → Edit in real-time using form inputs.

Options differ depending on element type (e.g., text content vs. image URL).

Element Movement:

Elements can be repositioned using drag with the mouse.

Delete Button:

Remove unwanted elements from the canvas.

🖼️ Screenshot-to-Image Download:
I integrated html2canvas to convert the #canvas area into a JPG image.

When the "Download" button is clicked, the visual canvas is captured as an image and downloaded, showing exactly how the design appears.

🔧 Tools & Libraries Used:
HTML/CSS/JS — Vanilla, no frameworks

Google Fonts — For clean typography

html2canvas — For converting DOM to image

✅ Features Built:
Drag-and-drop UI builder

Live element editing

Reposition elements with mouse

Toggle grid view

Download design as image

Fully responsive layout

