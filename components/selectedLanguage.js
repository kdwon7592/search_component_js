export default function selectedLanguage(state) {
    const selectedLanguage = document.querySelector(".SelectedLanguage");
    const suggestion = document.querySelector(".Suggestion");
    const selectedText = state.selectedText;

    document.querySelector('.searchInput').addEventListener("submit", (event) => {
        event.preventDefault();
        const currentData = suggestion.querySelectorAll('ul li')[state.currentFocus].innerText;
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
        this.makeSelectedLanguage();
    });

    this.makeSelectedLanguage = () => {
        let html = '';

        selectedText.forEach(val => {
            html += '<li>' + val + '</li>'
        })

        selectedLanguage.innerHTML = `
        <ul>
            ${html}            
        </ul>
    `;
    };
}