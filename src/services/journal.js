export default class Pog {
    constructor() {
        this.url = process.env.REACT_APP_JOURNAL_API_URL;
    }
    async index() {
        return this.fetchAPI('/journal_entries');
    }
    async getOne(id) {
        return this.fetchAPI(`/journal_entry/${id}`);
    }
    async fetchAPI(endpoint) {
        try {
            const response = await fetch(`${this.url}${endpoint}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const jsonData = await response.json();
            return jsonData;
        } catch (error) {
            console.error('Error fetching JSON data:', error);
            throw error;
        }
    }
    async create(user_id, title, content) {
        const response = await fetch(`${this.url}/journal_entry`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                "user_id": user_id,
                "title": title,
                "content": content
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        return jsonData;
    }
}

