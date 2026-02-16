class Network {
    #baseUrl = 'http://127.0.0.1:9339/api';

    fetchTransactions() {
        return this.#get(`/getTransactions`);
    }

    fetchSubInfo() {
        return this.#get(`/getSubInfo`);
    }

    addTransaction(tr) {
        return this.#post('/addTransaction', tr);
    }

    #get(endpoint) {
        return fetch(this.#baseUrl + endpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`GET ${endpoint} failed: ${response.status}`);
                }
                return response.json();
            });
    }

    #post(endpoint, data) {
        return fetch(this.#baseUrl + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`POST ${endpoint} failed: ${response.status}`);
            }
            return response.json();
        });
    }
}
