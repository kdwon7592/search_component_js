import SearchInput from "./components/searchInput.js";
import FetchData from "./api/fetchData.js";
import Suggestion from "./components/suggestion.js";
import SelectedLanguage from "./components/selectedLanguage.js";

export default function App() {
    /**
     * 기본 state 설정
     * searchText : 검색 문자
     * fetchResult : 검색 결과
     * currentFocus : 현재 커서 위치
     * selectedText : 결과값 (최대 5개)
     */
    this.state = {
        searchText: '',
        fetchResult: [],
        currentFocus: 0,
        selectedText: new Set(),
    }

    this.makeSuggestion = (upDown) => {
        suggestion.makeSuggestion(upDown);
    }

    this.makeSelectedLanguage = () => {
        selectedLanguage.makeSelectedLanguage();
    }

    const fetchData = new FetchData();
    const searchInput = new SearchInput(this.state, fetchData.getData, this.makeSuggestion);
    const suggestion = new Suggestion(this.state, this.makeSelectedLanguage);
    const selectedLanguage = new SelectedLanguage(this.state);
}