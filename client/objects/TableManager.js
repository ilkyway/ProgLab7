class TableManager{
    constructor(){
        this.ui = new UIManager()
        this.net = new Network()

        this.transactions = []
        this.filteredTransactions = []

        this.categoryes = []
        this.types = []

        this.currentTypeFilter = 'none'
        this.currentCategoryFilter = 'none'
    }

    async loadData(){
        try {
            const [transactions, subInfo] = await Promise.all([
                this.net.fetchTransactions(),
                this.net.fetchSubInfo()
            ])

            this.transactions = transactions
            this.categoryes = subInfo.categoryes
            this.types = subInfo.types

            this.ui.initSelects(this.categoryes, this.types)
            this.applyFilters()
        } catch (error) {
            console.error('Error loading data:', error)
        }
    }

    applyFilters(){
        this.filteredTransactions = this.transactions.filter(tr => {
            const typeMatch = this.currentTypeFilter === 'none' || tr.type === this.currentTypeFilter
            const categoryMatch = this.currentCategoryFilter === 'none' || tr.category === this.currentCategoryFilter
            return typeMatch && categoryMatch
        })

        this.buildTable()
        this.updateStats()
    }

    setTypeFilter(typeId){
        this.currentTypeFilter = typeId
        this.applyFilters()
    }

    setCategoryFilter(categoryId){
        this.currentCategoryFilter = categoryId
        this.applyFilters()
    }

    buildTable(){
        var trans = []
        this.filteredTransactions.forEach(tr => {
            trans.push(this.buildTransactionRow(tr))
        })

        this.ui.reBuildTable(trans)
    }

    buildTransactionRow(tr){
        let row = document.createElement("tr")
        let type = document.createElement("td")
        let category = document.createElement("td")
        let amount = document.createElement("td")
        let date = document.createElement("td")

        row.className = tr.type === 'income' ? "table-success" : "table-danger"

        const typeName = this.types.find(t => t.id === tr.type)?.name || tr.type
        const categoryName = this.categoryes.find(c => c.id === tr.category)?.name || tr.category

        type.innerHTML = typeName
        category.innerHTML = categoryName
        amount.innerHTML = tr.amount
        date.innerHTML = new Date(tr.date).toLocaleDateString('uk-UA')

        row.appendChild(type)
        row.appendChild(category)
        row.appendChild(amount)
        row.appendChild(date)

        return row
    }

    updateStats(){
        let income = 0
        let outcome = 0

        this.filteredTransactions.forEach(tr => {
            if (tr.type === 'income') {
                income += tr.amount
            } else {
                outcome += Math.abs(tr.amount)
            }
        })

        this.ui.updateStats(income, outcome)
    }

    async addTransaction(category, amount, date){
        try {
            await this.net.addTransaction({ category, amount, date })
            await this.loadData()
        } catch (error) {
            console.error('Error adding transaction:', error)
        }
    }

}