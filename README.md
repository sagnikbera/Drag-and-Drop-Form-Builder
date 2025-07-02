📝 Drag-and-Drop Form Builder

A minimalistic, interactive drag-and-drop form builder web app that allows users to design custom forms with various elements such as headings, inputs, paragraphs, textareas, radio buttons, checkboxes, and selects. Users can preview and submit the form, with final data stored in localStorage and displayed on a separate page.

🚀 Features

🔧 Drag & Drop BuilderCreate form layouts interactively by dragging components into the builder area.

🏷️ Customizable LabelsRename headings, inputs, and option labels directly from the interface.

🗃️ Form Elements Supported

Big Heading

Small Heading

Paragraph

Text Input

Textarea

Select Dropdown

Radio Buttons

Checkboxes

🗑️ Element Deletion Remove individual elements or reset the entire form.

✅ Submission Confirmation Modal Prompt users with a confirmation popup before final submission.

📅 Persistent Storage Form structure is stored in localStorage and rendered on a separate page.

📁 Project Structure

├── index.html              # Main page for building the form
├── data.html               # Page to view the rendered form
├── style.css               # Styles for the builder and form view
├── script.js               # Main logic for form builder
├── script1.js              # Script to render form on data.html
├── README.md               # Project documentation

🧪 How It Works

Build the FormDrag elements from the toolbox into the form builder.

CustomizeRename headings, inputs, and option labels to suit your needs.

SubmitClick the submit button → a modal popup will appear → confirm to save.

View the FormAfter submission, you're redirected to data.html where your form is displayed using data from localStorage.

🛆 Tech Stack

HTML5

CSS3

JavaScript (Vanilla)

🖼️ Screenshots

Form Builder

Rendered Form

(Insert screenshot)

(Insert screenshot)

💦 To-Do / Improvements



📄 License

This project is licensed under the MIT License.
