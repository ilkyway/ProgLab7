import express from 'express';
import cors from 'cors'
import DBManager from "./DBManager.js";

export default class Server {
    constructor(port) {
        this.app = express();
        this.app.use(cors())
        this.app.use(express.json());
        this.port = port;
        this.db = new DBManager();
        this.#setupRoutes();
    }

    #setupRoutes() {
        this.app.get('/api/getTransactions', (req, res) => {
            res.json(this.db.getTransactions());
        });

        this.app.get('/api/getSubInfo', (req, res) => {
            res.json({
                "categoryes": this.db.getCategoryes(),
                "types":this.db.getTypes()
            });
        });

        this.app.post('/api/addTransaction', (req, res) => {
            const { category, amount, date } = req.body;

            const id = this.db.createTransaction(category, amount, date)

            res.json({"id":id})
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }
}