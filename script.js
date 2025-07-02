const formBuilder = document.getElementById('form-builder');
let submitButton = null;

const draggable = document.querySelectorAll('.draggable');

draggable.forEach(dg => {
    dg.addEventListener('dragstart' , dragStart);
})

formBuilder.addEventListener('dragover' ,dragOver);
formBuilder.addEventListener('drop' ,drop);


function dragStart(e) {
    e.dataTransfer.setData('type' , e.target.getAttribute('data-type'));
} 

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const type = e.dataTransfer.getData('type');
    

    let newElement;

    switch (type) {
        case 'big-heading':
            newElement = createDiv("Big");
            break;
        case 'small-heading':
            newElement = createDiv("Small");
            break;
        case 'paragraph':
            newElement = createDiv("Paragraph");
            break;

        case 'text':
            newElement = createTextInput();
            break;
        case 'textarea':
            newElement = createTextArea();
            break;

        case 'select':
            newElement = createSelect("Select");
            break;
        case 'radio':
            newElement = createSelect("Radio");
            break;
        case 'checkbox':
            newElement = createSelect("CheckBox");
            break;
    
        default:
            break;
    }

    if(newElement) {
        formBuilder.appendChild(newElement);
        makeElementDraggable(newElement);
        toggleSubmitButton();
    }
}

function createDiv(props) {
    const div = document.createElement('div');
    div.setAttribute('draggable', true);
    div.classList.add(`${props}Div` , "form-element");  // "bigHeadDiv" or "smallHeadDiv"
    // console.log(`${props}Div`);
    
    const lbInput = document.createElement('input');
    lbInput.type = 'text';
    lbInput.classList.add(`${props}Input`);
    lbInput.placeholder = `--Change the ${props} Heading --`;

    div.appendChild(lbInput);

    const deleteButton = createDeleteButton();
    div.appendChild(deleteButton);

    return div;
}


function createTextInput(){
     const div = document.createElement('div');
    div.setAttribute('draggable', true);
    div.classList.add("form-element" ,"textInputDiv");

    const lbInput = document.createElement('input');
    lbInput.type = 'text';
    lbInput.classList.add("label-edit");
    lbInput.placeholder = '--Change the Text --';

    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.classList.add("label-edit");
    inputElement.placeholder = '--Sample Text --';
    inputElement.disabled = true;

    div.appendChild(lbInput);
    div.appendChild(inputElement);

    const deleteButton = createDeleteButton();
    div.appendChild(deleteButton);

    return div;
}


function createTextArea(){
    const div = document.createElement('div');
    div.setAttribute('draggable', true);
    div.classList.add("form-element" ,"textAreaDiv");

    const lbInput = document.createElement('input');
    lbInput.type = 'text';
    lbInput.classList.add("label-edit");
    lbInput.placeholder = '--Text Area --';

    const inputElement = document.createElement('textarea');
    inputElement.type = 'text';
    inputElement.classList.add("label-edit");
    inputElement.placeholder = '--Sample Text --';
    inputElement.disabled = true;

    div.appendChild(lbInput);
    div.appendChild(inputElement);

    const deleteButton = createDeleteButton();
    div.appendChild(deleteButton);

    return div;
}


function createSelect(x){

    const div = document.createElement('div');
    div.setAttribute('draggable', true);
    div.classList.add("form-element" ,`${x}Div`);

    const lbInput = document.createElement('input');
    lbInput.type = 'text';
    lbInput.classList.add("label-edit");
    lbInput.placeholder = `-${x} Label-`;

    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('option-container');

    const option1 = createOption('Option 1');
    const option2 = createOption('Option 2');

    
    optionsContainer.appendChild(option1);
    optionsContainer.appendChild(option2);

    const addOptionButton = document.createElement('button');
    addOptionButton.type = 'button';
    addOptionButton.textContent = 'Add Option';
    addOptionButton.classList.add("add-button");

    addOptionButton.onclick = ()=> {
        const newOption = createOption(`Option ${optionsContainer.children.length + 1}`)
        optionsContainer.appendChild(newOption);
    }

    const deleteButton = createDeleteButton();

    div.appendChild(lbInput);
    div.appendChild(optionsContainer);
    div.appendChild(addOptionButton);
    div.appendChild(deleteButton);

    return div;
}

function createOption(defaultText){
    const optionDiv = document.createElement('div');
    optionDiv.classList.add("option-edit");

    const optionInput = document.createElement('input');
    optionInput.type = 'text';
    optionInput.placeholder = defaultText;


     const deleteButton = document.createElement('button');
    deleteButton.type='button';
    deleteButton.textContent='Remove';
    deleteButton.classList.add('delete-button');

    deleteButton.onclick = () => {
        optionDiv.remove();
    }

    optionDiv.appendChild(optionInput);
    optionDiv.appendChild(deleteButton);

    return optionDiv;
}




// delete button 
function createDeleteButton() {
    const deleteButton = document.createElement('button');
    deleteButton.type='button';
    deleteButton.textContent='Delete';
    deleteButton.classList.add('delete-button');

    deleteButton.onclick = () => {
        deleteButton.parentElement.remove();
        // console.log(formBuilder.children);
        
        toggleSubmitButton();
    }

    return deleteButton;
}

const modalOverlay = document.querySelector('.modal-overlay');
  const confirmSubmitBtn = document.querySelector('.cancel-delete');
  const cancelSubmitBtn = document.querySelector('.confirm-delete');

function toggleSubmitButton() {
    if(formBuilder.children.length-2 > 0) {
        if( ! submitButton ){
            submitButton = document.createElement('button')
            submitButton.textContent = 'Submit';
            submitButton.type = 'button';
            submitButton.classList.add("submit-button")

            submitButton.onclick = () => {
                modalOverlay.classList.remove('d-none');
            };
        }

        formBuilder.appendChild(submitButton);
    }else{
        if (submitButton) {
            submitButton.remove();
            submitButton = null;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {

  // Now safe to set .onclick
  confirmSubmitBtn.onclick = () => {
      modalOverlay.classList.add('d-none');
      handleSubmit();
  };

  cancelSubmitBtn.onclick = () => {
      modalOverlay.classList.add('d-none');
  };
});


function handleSubmit() {
    const formData = [];

    Array.from(formBuilder.children).forEach((child) => {
        let label = '';
        let elementType = '';

        // Big Heading
        if (child.classList.contains('BigDiv') && child.querySelector('.BigInput')) {
            label = child.querySelector('.BigInput').value;
            elementType = 'Big Heading';
        }

        // Small Heading
        else if (child.classList.contains('SmallDiv') && child.querySelector('.SmallInput')) {
            label = child.querySelector('.SmallInput').value;
            elementType = 'Small Heading';
        }

        // Paragraph
        else if (child.classList.contains('ParagraphDiv') && child.querySelector('.ParagraphInput')) {
            label = child.querySelector('.ParagraphInput').value;
            elementType = 'Paragraph';
        }

        // Text Input
        else if (child.classList.contains('textInputDiv')) {
            const labelInput = child.querySelectorAll('input')[0];
            label = labelInput?.value || '';
            elementType = 'Text Input';
        }

        // Textarea
        else if (child.classList.contains('textAreaDiv')) {
            const labelInput = child.querySelectorAll('input')[0];
            label = labelInput?.value || '';
            elementType = 'Textarea';
        }

        // Select / Radio / Checkbox
        else if (
            child.classList.contains('SelectDiv') ||
            child.classList.contains('RadioDiv') ||
            child.classList.contains('CheckBoxDiv')
        ) {
            const labelInput = child.querySelector('input');
            label = labelInput?.value || '';

            if (child.classList.contains('SelectDiv')) elementType = 'Select';
            else if (child.classList.contains('RadioDiv')) elementType = 'Radio';
            else if (child.classList.contains('CheckBoxDiv')) elementType = 'Checkbox';

            const options = Array.from(child.querySelectorAll('.option-edit input'))
                                 .map((opt) => opt.value);

            formData.push({
                label: label,
                type: elementType,
                options: options
            });
            return; // already pushed, skip remaining
        }

        // Add to formData if label/type exist
        if (label && elementType) {
            formData.push({
                label: label,
                type: elementType
            });
        }
    });

    // console.log(formData);

    localStorage.setItem('formData' , JSON.stringify(formData));
    window.location.href = 'data.html';

}



function makeElementDraggable(ele) {
    ele.setAttribute('draggable', true);

    ele.addEventListener('dragstart', function (e) {
        e.dataTransfer.setData('dragEleId', e.target.id);
        e.target.classList.add('dragging');
    });

    ele.addEventListener('dragend', function (e) {
        e.target.classList.remove('dragging');
    });
    toggleSubmitButton();
}

// MOVE THIS OUTSIDE TO AVOID MULTIPLE BINDINGS
formBuilder.addEventListener('dragover', function (e) {
    e.preventDefault();

    const afterElement = getDragAfterElement(formBuilder, e.clientY);
    const draggable = document.querySelector('.dragging');

    if (!draggable) return;

    if (afterElement == null) {
        formBuilder.appendChild(draggable);
    } else {
        formBuilder.insertBefore(draggable, afterElement);
    }
     toggleSubmitButton();
});


function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.form-element:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect(); // 🔧 fixed typo
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
         toggleSubmitButton();
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
