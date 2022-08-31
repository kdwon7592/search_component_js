import FetchData from "../api/fetchData.js";
import Suggestion from "./suggestion.js";

export default function SearchInput(state, getData, makeSuggestion) {
    /**
     * 검색 input
     */
    const searchInput = document.querySelector(".SearchInput__input");
    searchInput.focus();

    /**
     * debounce 처리를 위한 함수
     * @param {콜백함수} callback
     * @param {대기시간} limit
     * @returns 
     */
    const debounce = (callback, limit = 250) => {
        let timeout
        return function (...args) {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                callback.apply(this, args)
            }, limit)
        }
    }

    /**
     * 
     * @param {검색 문자} data 
     */
    const onChangeHandler = async (data) => {
        if (data.length > 0) {
            state.fetchResult = await getData(data);
            await makeSuggestion();
        } else {
            makeSuggestion();
        }
    }

    const debounceEvent = debounce((event) => {
        const data = event.target.value.trim();
        state.searchText = data;
        onChangeHandler(state.searchText);
    });

    // 검색 문자열 모니터링
    searchInput.addEventListener("input", debounceEvent);

    // 키보드 입력 이벤트
    searchInput.addEventListener("keydown", (event) => {
        if (event.keyCode === 40) {
            event.preventDefault();
            makeSuggestion('down');
        }

        if (event.keyCode === 38) {
            event.preventDefault();
            makeSuggestion('up');
        }
    });
}