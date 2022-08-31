import FetchData from "../api/fetchData.js";
import Suggestion from "./suggestion.js";

export default function SearchInput(state, getData, makeSuggestion) {
    const searchInput = document.querySelector(".SearchInput__input");
    searchInput.focus();

    const debounce = (callback, limit = 250) => {
        let timeout
        return function (...args) {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                callback.apply(this, args)
            }, limit)
        }
    }

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
        debounce(onChangeHandler(state.searchText));
    });

    searchInput.addEventListener("input", debounceEvent);

    // searchInput.addEventListener("mouseover", (event) => {
    //     const data = event.target.value;
    //     state.searchText = data;
    //     onChangeHandler(data);
    // });

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