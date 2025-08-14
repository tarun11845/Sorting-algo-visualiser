let array = [];
let animationSpeed = 200; // default ms

// Update speed when slider changes
document.addEventListener("DOMContentLoaded", () => {
    const speedSlider = document.getElementById("speed-slider");
    const speedValue = document.getElementById("speed-value");

    speedSlider.addEventListener("input", () => {
        animationSpeed = parseInt(speedSlider.value);
        speedValue.textContent = animationSpeed;
    });
});

function setArrayFromInput() {
    const input = document.getElementById("array-input").value;
    array = input.split(",").map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    renderArray();
}

function renderArray(activeIndices = []) {
    const container = document.getElementById("array-container");
    container.innerHTML = "";

    const barWidth = Math.max(15, Math.floor(600 / array.length));
    const maxVal = Math.max(...array);
    const scaleFactor = 300 / maxVal;

    array.forEach((value, index) => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        if (activeIndices.includes(index)) bar.classList.add("active");
        bar.style.height = `${value * scaleFactor}px`;
        bar.style.width = `${barWidth}px`;

        const label = document.createElement("span");
        label.textContent = value;
        bar.appendChild(label);

        container.appendChild(bar);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Sorting Algorithms
async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            renderArray([j, j + 1]);
            await sleep(animationSpeed);
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
    }
    renderArray();
}

async function selectionSort() {
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            renderArray([minIndex, j]);
            await sleep(animationSpeed);
            if (array[j] < array[minIndex]) minIndex = j;
        }
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
    renderArray();
}

async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            renderArray([j, j + 1]);
            await sleep(animationSpeed);
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = key;
    }
    renderArray();
}

async function quickSortHelper(start, end) {
    if (start >= end) return;
    let index = await partition(start, end);
    await quickSortHelper(start, index - 1);
    await quickSortHelper(index + 1, end);
}

async function partition(start, end) {
    let pivot = array[end];
    let i = start;
    for (let j = start; j < end; j++) {
        renderArray([j, end]);
        await sleep(animationSpeed);
        if (array[j] < pivot) {
            [array[i], array[j]] = [array[j], array[i]];
            i++;
        }
    }
    [array[i], array[end]] = [array[end], array[i]];
    return i;
}

async function quickSort() {
    await quickSortHelper(0, array.length - 1);
    renderArray();
}

async function mergeSortHelper(start, end) {
    if (end - start <= 0) return;
    const mid = Math.floor((start + end) / 2);
    await mergeSortHelper(start, mid);
    await mergeSortHelper(mid + 1, end);
    await merge(start, mid, end);
}

async function merge(start, mid, end) {
    let temp = [];
    let i = start, j = mid + 1;
    while (i <= mid && j <= end) {
        renderArray([i, j]);
        await sleep(animationSpeed);
        if (array[i] < array[j]) temp.push(array[i++]);
        else temp.push(array[j++]);
    }
    while (i <= mid) temp.push(array[i++]);
    while (j <= end) temp.push(array[j++]);
    for (let k = 0; k < temp.length; k++) {
        array[start + k] = temp[k];
    }
}

async function mergeSort() {
    await mergeSortHelper(0, array.length - 1);
    renderArray();
}

// Default example array
array = [5, 3, 8, 1, 7, 2, 4];
renderArray();
