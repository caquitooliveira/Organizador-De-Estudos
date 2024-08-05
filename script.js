document.addEventListener('DOMContentLoaded', () => {
    // Carregar dados salvos ao iniciar a página
    loadSavedItems();

    document.getElementById("addButton").onclick = function() {
        const subjectInput = document.getElementById("subjectInput");
        const topicInput = document.getElementById("topicInput");
        const schedule = document.getElementById("schedule");

        if (subjectInput.value && topicInput.value) {
            const item = document.createElement("div");
            item.classList.add("list-item");
            item.innerHTML = `
                <input type="checkbox" onclick="markAsStudied(this)">
                <strong>${subjectInput.value}:</strong> ${topicInput.value}
                <button onclick="removeItem(this)">Remover</button>
            `;

            // Adiciona uma cor de fundo aleatória ao item
            item.style.backgroundColor = getRandomColor();

            // Adiciona o item à lista e salva no Local Storage
            schedule.appendChild(item);
            saveItems();
            subjectInput.value = "";
            topicInput.value = "";
        }
    };

    document.getElementById("clearButton").onclick = function() {
        clearAllItems();
    };
});

function markAsStudied(checkbox) {
    const parent = checkbox.parentElement;
    if (checkbox.checked) {
        parent.classList.add("strikethrough");
    } else {
        parent.classList.remove("strikethrough");
    }
    saveItems();
}

function removeItem(button) {
    const item = button.parentElement;
    item.remove();
    saveItems();
}

function clearAllItems() {
    const schedule = document.getElementById("schedule");
    schedule.innerHTML = '';
    localStorage.removeItem('studyItems');
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function saveItems() {
    const items = [];
    const schedule = document.getElementById("schedule");

    schedule.querySelectorAll('.list-item').forEach(div => {
        const item = {
            text: div.innerHTML,
            color: div.style.backgroundColor,
            checked: div.querySelector('input').checked
        };
        items.push(item);
    });

    localStorage.setItem('studyItems', JSON.stringify(items));
}

function loadSavedItems() {
    const savedItems = JSON.parse(localStorage.getItem('studyItems')) || [];
    const schedule = document.getElementById("schedule");

    savedItems.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("list-item");
        div.innerHTML = item.text;
        div.style.backgroundColor = item.color;

        const checkbox = div.querySelector('input');
        checkbox.checked = item.checked;
        checkbox.onclick = function() {
            markAsStudied(this);
        };

        schedule.appendChild(div);
    });
}
