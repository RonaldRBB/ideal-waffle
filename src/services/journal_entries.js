export default class Pog {
    constructor() {
        this.url = process.env.REACT_APP_JOURNAL_API_URL;
    }
    async getData() {
        try {
            const response = await fetch(`${this.url}/journal_entries`);
            const jsonData = await response.json();
            console.log(jsonData);
            return jsonData;
        } catch (error) {
            console.error('Error fetching JSON data:', error);
            throw error;
        }
    }
}