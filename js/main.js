const cells = document.getElementsByTagName("td");
const myModal = document.getElementById("myModal");
const succesModal = document.getElementById("succesModal");
const errorModal = document.getElementById("errorModal");
const gameOver = document.getElementById("gameOver");
const player = document.getElementById("player");

const winCombinations = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12],
];

const status = {
    success: "success",
    error: "error",
    warning: "warning",
};

const showModal = (winner) => {
    myModal.classList.remove("d-none");

    switch (winner) {
        case status.success: {
            succesModal.classList.remove("d-none");
            player.src = "./audio/win.mp3";
            break;
        }
        case status.error: {
            errorModal.classList.remove("d-none");
            player.src = "./audio/over.mp3";
            break;
        }
        case status.warning: {
            gameOver.classList.remove("d-none");
            player.src = "./audio/over.mp3";
            break;
        }
    }

    player.play();
};

const checkWinner = () => {
    let winner;
    let isWinner;

    for (let i = 0; i < 10; i++) {
        let text = cells[winCombinations[i][0]].innerHTML;
        console.log(text);
        let cell = cells[winCombinations[i][0]];
        isWinner = true && text != "";

        for (let j = 1; j < 4; j++) {
            if (cells[winCombinations[i][j]].innerHTML != text) {
                isWinner = false;
                console.log(i, j, cells[winCombinations[i][j]].innerHTML);
                break;
            }
        }

        if (isWinner) {
            winner = cell.children[0].innerHTML;
            break;
        }
    }

    //e'lon qilish
    if (isWinner) {
        showModal((winner == "X" && status.success) || status.error);
    }
    return isWinner;
};

const isGameOver = () => {
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].innerHTML == "") return false;
    }

    showModal(status.warning);

    return true;
};

const getOIndex = () => Math.floor(Math.random() * 1000) % 16;

for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    //   cell.innerHTML = i;
    cell.onclick = (event) => {
        if (event.target.innerHTML == "")
            event.target.innerHTML = `<span class="x">X</span>`;
        else return;

        if (checkWinner()) return;
        if (isGameOver()) return;

        let oIndex = getOIndex();
        while (cells[oIndex].innerHTML != "") oIndex = getOIndex();

        cells[oIndex].innerHTML = `<span class="o">O</span>`;

        if (checkWinner()) return;
        if (isGameOver()) return;
    };
}

const reload = () => {
    window.location.reload();
};
