class UIManager{
    constructor(rootDOM){
        this.root = rootDOM
        this.#init()
    }

    reBuildTable(childs){
        if(this.tbody){this.tbody.remove()}
        this.tbody = document.createElement("tbody")
        this.tbody.id = "table-body"

        childs.forEach((child)=>{
            this.tbody.appendChild(child)
        })

        this.table.appendChild(this.tbody)
    }

    initSelects(categories, types){
        this.sortType.innerHTML = '<option value="none" selected>Усе</option>'
        this.sortCategory.innerHTML = '<option value="none" selected>Усе</option>'
        this.formCategory.innerHTML = '<option value="none" selected>Усе</option>'

        types.forEach(type => {
            const option = document.createElement('option')
            option.value = type.id
            option.textContent = type.name
            this.sortType.appendChild(option)
        })

        categories.forEach(category => {
            const option = document.createElement('option')
            option.value = category.id
            option.textContent = category.name
            this.sortCategory.appendChild(option)
        })

        categories.forEach(category => {
            const option = document.createElement('option')
            option.value = category.id
            option.textContent = category.name
            this.formCategory.appendChild(option)
        })
    }

    updateStats(income, outcome){
        this.statIncome.textContent = income.toFixed(2)
        this.statOutcome.textContent = outcome.toFixed(2)
    }

    #init(){
        this.table = this.#selector("#table")
        this.tbody = this.#selector("#table-body")
        this.sortType = this.#selector("#sort-type")
        this.sortCategory = this.#selector("#sort-category")
        this.statIncome = this.#selector("#stat-income")
        this.statOutcome = this.#selector("#stat-outcome")
        this.formCategory = this.#selector("#form-category")
        this.formAmount = this.#selector("#form-amount")
        this.formSubmit = this.#selector("#form-submit")
    }

    #selector(name){
        return document.querySelector(name)
    }
}