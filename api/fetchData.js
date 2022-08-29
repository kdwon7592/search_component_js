const searchInput = document.querySelector(".SearchInput__input");
searchInput.focus();
const suggestion = document.querySelector(".Suggestion");
const selectedLanguage = document.querySelector(".SelectedLanguage");
suggestion.style.display = "none";
let searchResult = [];
let currentFocus = 0;
const selectedText = new Set();

const makeSelectedLanguage = () => {
    let html = '';

    selectedText.forEach(val => {
        html += '<li>' + val + '</li>'
    })

    selectedLanguage.innerHTML = `
        <ul>
            ${html}            
        </ul>
    `;
}

const makeSuggestion = (upDown, data) => {
    if (upDown === 'up') {
        currentFocus = currentFocus > 0 ? currentFocus - 1 : searchResult.length - 1;
    }

    if (upDown === 'down') {
        currentFocus = currentFocus < searchResult.length - 1 ? currentFocus + 1 : 0;
    }

    let html = '';

    searchResult.forEach((val, idx) => {
        const dataIdx = val.toLowerCase().indexOf(data);
        const dataStr = val.substr(dataIdx, data.length);
        let firstDataStr = '';
        let secondDataStr = '';
        if (dataIdx > -1) {
            if (dataIdx > 0) {
                firstDataStr = val.substring(0, dataIdx);
            }

            if (dataIdx + data.length < val.length) {
                secondDataStr = val.substring(dataIdx + data.length, val.length);
            }
        }
        if (idx === currentFocus) {
            html += '<li class="Suggestion__item--selected">' + firstDataStr + '<span class="Suggestion__item--matched">' + dataStr + '</span>' + secondDataStr + '</li>';
        } else {
            html += '<li>' + firstDataStr + '<span class="Suggestion__item--matched">' + dataStr + '</span>' + secondDataStr + '</li>';
        }
    })

    suggestion.innerHTML = `
        <ul>
            ${html}            
        </ul>
    `;
}

const getData = async (data) => {
    const res = await fetch(`https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev/languages?keyword=${data}`);
    searchResult = await res.json();
    console.log(searchResult);

    if (searchResult.length > 0) {
        makeSuggestion('', data);
        suggestion.style.display = "block";
    } else {
        suggestion.style.display = "none";
    }
};

document.querySelector('.searchInput').addEventListener("submit", (event) => {
    event.preventDefault();
    const currentData = suggestion.querySelectorAll('ul li')[currentFocus].innerText;
    alert(currentData);
    if (selectedText.has(currentData)) {
        selectedText.delete(currentData);
        selectedText.add(currentData);
    } else {
        if (Array.from(selectedText).length > 4) {
            selectedText.delete(Array.from(selectedText)[0]);
        }
        selectedText.add(currentData);
    }
    makeSelectedLanguage();
});

searchInput.addEventListener("input", (event) => {
    const data = event.target.value;
    if (data.length > 0) {
        getData(data);
    } else {
        suggestion.style.display = "none";
    }
});
searchInput.addEventListener("mouseover", (event) => {
    const data = event.target.value;
    if (data.length > 0) {
        getData(data);
    } else {
        suggestion.style.display = "none";
    }
});

searchInput.addEventListener("keydown", (event) => {
    if (event.keyCode === 40) {
        makeSuggestion('down');
    }

    if (event.keyCode === 38) {
        makeSuggestion('up');
    }
});


suggestion.addEventListener("click", (event) => {
    const currentData = event.target.innerText;
    alert(currentData);
    if (selectedText.has(currentData)) {
        selectedText.delete(currentData);
        selectedText.add(currentData);
    } else {
        if (Array.from(selectedText).length > 4) {
            selectedText.delete(Array.from(selectedText)[0]);
        }
        selectedText.add(currentData);
    }
    makeSelectedLanguage();
});