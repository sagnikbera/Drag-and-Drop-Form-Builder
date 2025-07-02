document.addEventListener("DOMContentLoaded", () => {
  const formData = JSON.parse(localStorage.getItem("formData"));
  const serveyForm = document.getElementById("serveyForm");

  formData.forEach((field) => {
    const formGroup = document.createElement("div");
    formGroup.className = "form-group";

    const label = document.createElement("label");
    label.textContent = field.label;
    label.className = field.type;
    formGroup.appendChild(label);

    if (field.type === "Text Input") {
      const input = document.createElement("input");
      input.type = "text";
      input.className = "textInputBox";
      formGroup.appendChild(input);
    } else if (field.type === "Textarea") {
      const input = document.createElement("textarea");
      input.className = "textAreaBox";
      formGroup.appendChild(input);
    } else if (field.type === "Select") {
      const select = document.createElement("select");
      select.className = "selectBox";
      field.options.forEach((optionValue) => {
        const option = document.createElement("option");
        option.textContent = optionValue;
        option.value = optionValue;
        select.appendChild(option);
      });
      formGroup.appendChild(select);
    } else if (field.type === "Radio") {
      field.options.forEach((optionValue) => {
        const radioWrapper = document.createElement("div");
        radioWrapper.className = "row";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = field.label;
        radio.value = optionValue;

        const radioLabel = document.createElement("label");
        radioLabel.textContent = optionValue;
        radioWrapper.appendChild(radio);
        radioWrapper.appendChild(radioLabel);

        formGroup.appendChild(radioWrapper);
      });
    } else if (field.type === "Checkbox") {
      field.options.forEach((optionValue) => {
        const checkboxWrapper = document.createElement("div");
        checkboxWrapper.className = "row";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = field.label;
        checkbox.value = optionValue;

        const checkboxLabel = document.createElement("label");
        checkboxLabel.textContent = optionValue;
        checkboxWrapper.appendChild(checkbox);
        checkboxWrapper.appendChild(checkboxLabel);

        formGroup.appendChild(checkboxWrapper);
      });
    }

    serveyForm.appendChild(formGroup);
  });
});
