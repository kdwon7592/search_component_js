import FetchData from "../api/fetchData.js";

export default function Suggestion(state, makeSelectedLanguage) {
    /**
     * 검색 후 제안 결과
     */
    const suggestion = document.querySelector(".Suggestion");
    suggestion.style.display = "none";

    // 결과 클릭 시 이벤트 처리
    suggestion.addEventListener("click", (event) => {
        const currentData = event.target.innerText;
        const selectedText = state.selectedText;

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

    /**
     * 제안 결과 화면에 그리는 함수.
     * @param {키보드 입력값} upDown 
     * @returns 
     */
    this.makeSuggestion = (upDown) => {
        const fetchResult = state.fetchResult;
        const searchText = state.searchText.trim();
        let currentFocus = state.currentFocus;

        if (searchText.length > 0 && fetchResult.length > 0) {
            suggestion.style.display = 'block';
        } else {
            suggestion.style.display = 'none';
            return;
        }

        if (upDown === 'up') {
            currentFocus = currentFocus > 0 ? currentFocus - 1 : 4;
        }

        if (upDown === 'down') {
            currentFocus = currentFocus < 4 ? currentFocus + 1 : 0;
        }

        let html = '';

        fetchResult.forEach((val, idx) => {
            const dataIdx = val.toLowerCase().indexOf(searchText);
            const dataStr = val.substr(dataIdx, searchText.length);
            let firstDataStr = '';
            let secondDataStr = '';
            if (dataIdx > -1) {
                if (dataIdx > 0) {
                    firstDataStr = val.substring(0, dataIdx);
                }

                if (dataIdx + searchText.length < val.length) {
                    secondDataStr = val.substring(dataIdx + searchText.length, val.length);
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

        state.currentFocus = currentFocus;
    }

    this.makeSuggestion('');
}