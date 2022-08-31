import SearchInput from "./components/searchInput.js";
import FetchData from "./api/fetchData.js";
import Suggestion from "./components/suggestion.js";
import SelectedLanguage from "./components/selectedLanguage.js";

export default function App() {
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