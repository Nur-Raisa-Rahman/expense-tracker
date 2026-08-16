const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

function saveTransactions() {
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

function addTransactionDOM(transaction) {

    const sign =
        transaction.amount < 0 ? "minus" : "plus";

    const li = document.createElement("li");

    li.classList.add(sign);

    li.innerHTML = `
        ${transaction.text}
        <span>$${transaction.amount}</span>
        <button class="delete-btn"
        onclick="removeTransaction(${transaction.id})">
        X
        </button>
    `;

    list.appendChild(li);
}

function updateValues() {

    const amounts =
        transactions.map(item => item.amount);

    const total =
        amounts.reduce((acc,item)=>acc+item,0);

    const inc =
        amounts
        .filter(item => item > 0)
        .reduce((acc,item)=>acc+item,0);

    const exp =
        amounts
        .filter(item => item < 0)
        .reduce((acc,item)=>acc+item,0);

    balance.innerText = `$${total.toFixed(2)}`;
    income.innerText = `+$${inc.toFixed(2)}`;
    expense.innerText = `-$${Math.abs(exp).toFixed(2)}`;
}

function init() {

    list.innerHTML = "";

    transactions.forEach(addTransactionDOM);

    updateValues();
}

function addTransaction(e) {

    e.preventDefault();

    if(
        text.value.trim() === "" ||
        amount.value.trim() === ""
    ){
        return;
    }

    const transaction = {
        id: Date.now(),
        text: text.value,
        amount: +amount.value
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    saveTransactions();

    text.value = "";
    amount.value = "";
}

function removeTransaction(id) {

    transactions =
        transactions.filter(
            item => item.id !== id
        );

    saveTransactions();

    init();
}

form.addEventListener("submit", addTransaction);

init();