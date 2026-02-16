import fs from 'fs';
import Transaction from './Transaction.js';

export default class DBManager {

    #DbPatch = "./objects/db/transactions.json"

    #categoryes = [
        {"id": "fastfood", "name": "Фастфуд"},
        {"id": "cloth", "name": "Одяг"},
        {"id": "subs", "name": "Підписки"},
        {"id": "transport", "name": "Громадський транспорт"},
        {"id": "fan", "name": "Розваги"},
        {"id": "cafe", "name": "Кафе & Ресторани"}
    ]

    #types = [
        {"id":"income", "name":"Дохід"},
        {"id":"outcome", "name":"Витрата"}
    ]

    #transactions = []

    constructor() {
        this.loadDB()
    }

    loadDB(){
        const parsed = JSON.parse(fs.readFileSync(this.#DbPatch, 'utf8'));
        parsed.forEach(row => {
            this.#transactions.push(new Transaction(row.id, row.type, row.category, row.amount, row.date))
        });
    }

    #saveDB() {
        const content = this.#transactions.map(tr => ({
            id: tr.id,
            type: tr.type,
            category: tr.category,
            amount: tr.amount,
            date: tr.date
        }));

        fs.writeFile(
            this.#DbPatch,
            JSON.stringify(content, null, 2),
            'utf8',
            err => {
                if (err) {
                    console.error(err);
                } else {
                    //console.log('DB Saved');
                }
            }
        );
    }

    #addTransaction(tr){
        this.#transactions.push(tr)
        this.#saveDB()
    }

    getTransactions(){
        return this.#transactions
    }

    getCategoryes(){
        return this.#categoryes
    }

    getTypes(){
        return this.#types
    }

    createTransaction(category, amount, date){
        const tr = new Transaction(category, amount, new Date(date))
        this.#addTransaction(tr)
        return tr.id
    }z
}