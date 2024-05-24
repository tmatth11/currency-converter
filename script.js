let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");

// Create dropdown options from currencies array
const addOptions = (dropdown, options) => {
    options.forEach((optionValue) => {
        const option = document.createElement("option");
        option.value = optionValue;
        option.text = optionValue;
        dropdown.add(option);
    });
};

addOptions(fromDropDown, currencies);
addOptions(toDropDown, currencies);

currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    fromDropDown.add(option);
});

// Repeat same thing for the other dropdown
currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    toDropDown.add(option);
});

// Set default values
fromDropDown.value = "USD";
toDropDown.value = "MXN";

let convertCurrency = () => {
    // Create references
    const amount = document.getElementById("amount").value;
    const fromCurrency = fromDropDown.value;
    const toCurrency = toDropDown.value;

    // If input field is not empty
    if (amount.length != 0) {
        // Fetch data from API
        fetch(api)
            .then((response) => response.json())
            .then((data) => {
                let fromExchangeRate = data.conversion_rates[fromCurrency];
                let toExchangeRate = data.conversion_rates[toCurrency];
                // Calculate the converted amount
                const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
                result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
            });
    }
};

document.getElementById('amount').addEventListener('input', convertCurrency);
document.getElementById('from-currency-select').addEventListener('change', convertCurrency);
document.getElementById('to-currency-select').addEventListener('change', convertCurrency);
window.addEventListener("load", convertCurrency);