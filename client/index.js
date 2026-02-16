document.addEventListener('DOMContentLoaded', () => {
    const tableManager = new TableManager()

    tableManager.loadData()

    document.getElementById('sort-type').addEventListener('change', (e) => {
        tableManager.setTypeFilter(e.target.value)
    })

    document.getElementById('sort-category').addEventListener('change', (e) => {
        tableManager.setCategoryFilter(e.target.value)
    })

    document.getElementById('form-submit').addEventListener('click', async (e) => {
        e.preventDefault()

        const categorySelect = document.getElementById('form-category')
        const amountInput = document.getElementById('form-amount')
        const dateInput = document.getElementById('form-date')

        if (categorySelect.value === 'none') {
            alert('Виберіть категорію!')
            return
        }

        if (isNaN(parseFloat(amountInput.value)) || parseFloat(amountInput.value) === 0) {
            alert('Введіть коректну суму!')
            return
        }

        if (dateInput.value === "") {
            alert('Виберіть дату!')
            return
        }

        try {
            await tableManager.addTransaction(categorySelect.value , parseFloat(amountInput.value), dateInput.value)
            amountInput.value = '0'
            categorySelect.value = 'none'
            dateInput.value = ''
        } catch (error) {
            alert('Помилка при додаванні транзакції!')
        }
    })
})
