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

    static async registerPerson(person) {
        let params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(person)
        };

        try {
            const response = await fetch(`${baseUrl}Person`, params);
            return await response.json();
        } catch (error) {
            throw error;
        }
    }

    static async loginPerson(person) {
        let params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(person)
        };

        try {
            const response = await fetch(`${baseUrl}Person/authenticate`, params);
            return await response.json();
        } catch (error) {
            throw error;
        }
    }

    static async getElections()  {
        if(this.validateLoginState() === false) return Promise.reject('Not authenticated');
        let params = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch(`${baseUrl}Election`, params);
            return await response.json();
        } catch (error) {
            throw error;
        }
    }


    // Voting logic functions
    // Sends the users vote 
    static async sendVote(vote) {
        let params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vote)
        };

        try {
            const response = await fetch(`${baseUrl}Votes`, params);
            return await response.json();
        } catch (error) {
            throw error;
        }
    }

    // Gets a single election by ID
    static async getElection(electionId)  {
        if(this.validateLoginState() === false) return Promise.reject('Not authenticated');
        let params = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch(`${baseUrl}Election/${electionId}`, params);
            return await response.json();
        } catch (error) {
            throw error;
        }
    }
}

