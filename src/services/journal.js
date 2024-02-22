import i18n from 'i18next'; // Importa la instancia de i18n
export default class Pog {
    constructor() {
        this.url = process.env.REACT_APP_JOURNAL_API_URL;
        this.endpoint = "/journal_entry";
        this.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
    }
    async index() {
        return await this.fetchAPI('/journal_entriesds');
    }
    async getOne(id) {
        return await this.fetchAPI(`/${this.endpoint}/${id}`);
    }
    async create(user_id, title, content) {
        return await this.fetchAPI(`/${this.endpoint}`, {
            method: 'POST',
            body: JSON.stringify({ user_id, title, content }),
        });
    }
    async update(id, title, content) {
        return await this.fetchAPI(`/${this.endpoint}/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
        });
    }
    async delete(id) {
        return await this.fetchAPI(`/${this.endpoint}/${id}`, {
            method: 'DELETE',
        });
    }
    async fetchAPI(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.url}${endpoint}`, {
                mode: 'cors',
                headers: this.headers,
                ...options,
            });
            if (!response.ok) {
                throw new Error(`${i18n.t('httpError')} ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            throw  new Error(`${i18n.t('apiError')} ${endpoint}: ${error}`);
        }
    }
}
