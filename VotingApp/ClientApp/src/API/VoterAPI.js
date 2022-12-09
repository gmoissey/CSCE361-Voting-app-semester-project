const baseUrl = 'https://localhost:7248/api/';

export default class VoterAPI {

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
}

