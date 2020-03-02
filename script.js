let grid = document.querySelector("#grid");
let testMode = false; 
createGrid();

//создание сетки 10 на 10
function createGrid() {
    grid.innerHTML = "";
    for (let i = 0; i < 10; i++) {
        row = grid.insertRow(i);
        for (let j = 0; j < 10; j++) {
            cell = row.insertCell(j);
            cell.onclick = function () {
                clickCell(this); 
            };
            let mine = document.createAttribute("data-mine");
            mine.value = "false";
            cell.setAttributeNode(mine);
        }
    }
    addMines();
}

//добавление мин в случайные ячейки
function addMines() {
    for (let i = 0; i < 20; i++) {
        let row = Math.floor(Math.random() * 10);
        let col = Math.floor(Math.random() * 10);
        let cell = grid.rows[row].cells[col];
        cell.setAttribute("data-mine", "true");
        if (testMode) cell.innerHTML = "X";
    }
}

//выявление всех мин
function revealMines() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let cell = grid.rows[i].cells[j];
            if (cell.getAttribute("data-mine") == "true") cell.className = "mine";
        }
    }
}

// проверка на победу
function checkLevelCompletion() {
    let levelComplete = true;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if ((grid.rows[i].cells[j].getAttribute("data-mine") == "false") && (grid.rows[i].cells[j].innerHTML == "")) levelComplete = false;
        }
    }
    if (levelComplete) {
        alert("Вы выйграли!");
        revealMines();
    }
}

//проверка открыта ли ячейка
function clickCell(cell) {
    if (cell.getAttribute("data-mine") == "true") {
        revealMines();
        alert("Вы проиграли!");
    } else {
        cell.className = "clicked";
        //Подсчет мин рядом с ячейкой
        let mineCount = 0;
        let cellRow = cell.parentNode.rowIndex;
        let cellCol = cell.cellIndex;
        for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
            for (let j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
                if (grid.rows[i].cells[j].getAttribute("data-mine") == "true") mineCount++;
            }
        }
        cell.innerHTML = mineCount;
        if (mineCount == 0) {
            //открывание соседних пустых ячеек
            for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
                for (let j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
                    if (grid.rows[i].cells[j].innerHTML == "") clickCell(grid.rows[i].cells[j]);
                }
            }
        }
        checkLevelCompletion();
    }
}