import { v4 as uuidv4 } from 'uuid';

export default class Transaction {
    constructor(category, amount, date = null, id = null, type) {
        this.id = id ? id : uuidv4()
        this.type = type ? type : (amount < 0 ? 'outcome' : 'income')
        this.category = category
        this.amount = amount
        this.date = date || new Date()
    }
}