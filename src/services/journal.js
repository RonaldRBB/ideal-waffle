export default class Pog {
    constructor() {
        this.url = process.env.REACT_APP_JOURNAL_API_URL;
    }
    async getAll() {
        return this.fetchAPI('/journal_entries');
    }
    async getOne(id) {
        return this.fetchAPI(`/journal_entry/${id}`);
    }
    async fetchAPI(endpoint) {
        try {
            const response = await fetch(`${this.url}${endpoint}`);
            const jsonData = await response.json();
            console.log(jsonData);
            return jsonData;
        } catch (error) {
            console.error('Error fetching JSON data:', error);
            throw error;
        }
    }

}
