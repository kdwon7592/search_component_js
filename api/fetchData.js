// 데이터 캐시용
const cache = [];

export default function FetchData() {
    /**
     * 검색 문자를 기반으로 결과를 제안하는 함수
     * @param {검색 문자} data 
     * @returns {검색 결과 제안} // 최대 5개
     */
    this.getData = async (data) => {
        if (cache[data]) {
            return cache[data];
        }

        const res = await fetch(`https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev/languages?keyword=${data}`);

        if (res.ok) {
            const searchResult = await res.json();
            console.log(searchResult);
            cache[data] = searchResult;
            return searchResult;
        }

        return [];
    };
}