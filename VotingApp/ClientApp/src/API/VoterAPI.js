const baseUrl = 'https://localhost:7248/api/';

export default class VoterAPI {

    // Use this function to validate user's login state
    // before every authenticated API call
    static validateLoginState() {
        if(sessionStorage.getItem('authenticated') === 'true' && sessionStorage.getItem('username') !== '') {
            return true;
        }

        return false;
    }

    static registerPerson(person) {
        let params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(person)
        };

        return fetch(`${baseUrl}Person`, params)
            .then(response => response.json())
            .catch(error => {
                throw error;
            });
    }

    static loginPerson(person) {
        let params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(person)
        };

        return fetch(`${baseUrl}Person/authenticate`, params)
            .then(response => response.json())
            .catch(error => {
                throw error;
            });
    }

    static getElections()  {
        if(this.validateLoginState() === false) return Promise.reject('Not authenticated');
        let params = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch(`${baseUrl}Election`, params)
            .then(response => response.json())
            .catch(error => {
                throw error;
            });
    }
}

