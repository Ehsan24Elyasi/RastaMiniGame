const roundTime = 5;
let roundNumber = 1;

const yourName = 'شما (گرگ وال‌استریت😏)';

const bots = [
    {
        name: 'رامسین ریسک‌پرور 🤑',
        type: 'Buyer',
        buyQ: 500,
        buyQRange: 300,
        sellQ: 50,
        sellQRange: 50
    },
    {
        name: 'احمد خطر ☠️',
        type: 'Buyer',
        buyQ: 500,
        buyQRange: 300,
        sellQ: 50,
        sellQRange: 50
    },
    {
        name: 'مهندس جاذری اهرمی 🤡',
        type: 'Normal',
        buyQ: 200,
        buyQRange: 30,
        sellQ: 200,
        sellQRange: 30
    },
    {
        name: 'نهال اطلاعاتی 🤐',
        type: 'Normal',
        buyQ: 200,
        buyQRange: 30,
        sellQ: 200,
        sellQRange: 30
    },
    {
        name: 'اصغر فرصت‌طلب 🐍',
        type: 'Normal',
        buyQ: 200,
        buyQRange: 30,
        sellQ: 200,
        sellQRange: 30
    },
    {
        name: 'یلدا ریاضی‌پور 👻',
        type: 'Normal',
        buyQ: 200,
        buyQRange: 30,
        sellQ: 200,
        sellQRange: 30
    },
    {
        name: 'سپهر سعادتی 🤧',
        type: 'Normal',
        buyQ: 200,
        buyQRange: 30,
        sellQ: 200,
        sellQRange: 30
    },
    {
        name: 'علی سلمانی 💇‍♂️',
        type: 'Normal',
        buyQ: 200,
        buyQRange: 30,
        sellQ: 200,
        sellQRange: 30
    },
    {
        name: 'مریم گلیم‌باف - برای خرید نیومده 🧕',
        type: 'Seller',
        buyQ: 50,
        buyQRange: 20,
        sellQ: 500,
        sellQRange: 300
    },
    {
        name: 'شکیبا شاکی 🤬',
        type: 'Seller',
        buyQ: 50,
        buyQRange: 20,
        sellQ: 500,
        sellQRange: 300
    }
]

function generateQuantity(q, range) {
    return Math.floor((Math.random() - 0.5) * range / 5) * 5 + q
}

function generatePrice(p, range) {
    return Math.floor(((Math.random() - .5) * range + p) / 5) * 5
}

document.addEventListener("DOMContentLoaded", function () {
    const buyerTab = document.getElementById("buyer-tab");
    const sellerTab = document.getElementById("seller-tab");
    const reportTab = document.getElementById("report-tab");
    const historyTab = document.getElementById("history-tab");
    const rankingTab = document.getElementById("ranking-tab");

    const buyerPage = document.getElementById("buyer-page");
    const sellerPage = document.getElementById("seller-page");
    const reportPage = document.getElementById("report-page");
    const historyPage = document.getElementById("history-page");
    const rankingPage = document.getElementById("ranking-table");

    buyerTab.addEventListener("click", function () {
        switchTab(buyerTab, buyerPage);
    });

    sellerTab.addEventListener("click", function () {
        switchTab(sellerTab, sellerPage);
    });

    reportTab.addEventListener("click", function () {
        switchTab(reportTab, reportPage);
    });

    historyTab.addEventListener("click", function () {
        switchTab(historyTab, historyPage);
    });

    rankingTab.addEventListener("click", function () {
        switchTab(rankingTab, rankingPage);
    });
    
    function switchTab(activeTab, activePage) {
        document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
        document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
        activeTab.classList.add("active");
        activePage.classList.add("active");
    }

    let roundTimeLeft = 0;
    let requestsThisRound = [];
    let madeSellRequest = false;
    let madeBuyRequest = false;

    let roundBasePrice = 100;
    let scheduledBuys = [];
    let scheduledSells = [];

    function updateRound() {
        roundNumber += 1;
        document.getElementById("round-number-txt").innerHTML = "شماره‌ی راند: " + roundNumber;
        madeSellRequest = false;
        madeBuyRequest = false;
        scheduledSells = [];
        scheduledBuys = [];
        requestsThisRound = [];
    }

    function startNewRound() {
        const resultsTable = document.getElementById('results-table');
        const resultsTxt = document.getElementById('results-txt');
        resultsTable.style.display = 'none';
        resultsTxt.style.display = 'none';
        const reportBody = document.getElementById("report-body");
        reportBody.innerHTML = '';

        function getRandomBuyersOfRound() {
            let numbers = [2, 3, 4, 5, 6, 7];
            return numbers.sort(() => 0.5 - Math.random()).slice(0, 3);
        }

        let range = Math.max(10, Math.pow(2, 6 - roundNumber)); // TODO - think about this!!!
        if ((roundNumber >= 1 && roundNumber <= 2) || (roundNumber >= 5 && roundNumber <= 5)) {
            let randomBuyers = getRandomBuyersOfRound()
            for (let i = 0; i < bots.length; i++) {
                if (bots[i].type === 'Buyer' || (bots[i].type === 'Normal' && randomBuyers.includes(i))) {
                    scheduledBuys.push({
                        price: generatePrice(roundBasePrice, range),
                        quantity: generateQuantity(bots[i].buyQ, bots[i].buyQRange),
                        time: Math.floor(Math.random() * roundTime)
                    });
                } else {
                    scheduledBuys.push(null);
                }
                if (bots[i].type === 'Seller' || (bots[i].type === 'Normal' && !randomBuyers.includes(i))) {
                    scheduledSells.push({
                        price: generatePrice(roundBasePrice, range),
                        quantity: generateQuantity(bots[i].buyQ, bots[i].buyQRange),
                        time: Math.floor(Math.random() * roundTime)
                    });
                } else {
                    scheduledSells.push(null)
                }
            }
        } else if (roundNumber >= 3 && roundNumber <= 4) {
            showPopup('دوستان عزیز! هم‌اکنون جنگ👺. جنگ👺. جنگ👺.');
            for (let i = 0; i < bots.length; i++) {
                if (bots[i].type === 'Buyer') {
                    scheduledBuys.push({
                        price: generatePrice(roundBasePrice, range),
                        quantity: generateQuantity(bots[i].buyQ, bots[i].buyQRange),
                        time: Math.floor(Math.random() * roundTime)
                    });
                    scheduledSells.push(null);
                } else {
                    scheduledBuys.push(null);
                    scheduledSells.push({
                        price: generatePrice(roundBasePrice, range),
                        quantity: generateQuantity(bots[i].buyQ, bots[i].buyQRange),
                        time: Math.floor(Math.random() * roundTime)
                    });
                }
            }
        } /*else if (roundNumber >= 6 && roundNumber <= 7) {
            showPopup('دوستان عزیز! هم‌اکنون صلح و فراوانی🕊. صلح و فراوانی🕊. فدادون بشم🕊.')
            for (let i = 0; i < bots.length; i++) {
                if (bots[i].type === 'Seller') {
                    scheduledBuys.push(null);
                    scheduledSells.push({
                        price: generatePrice(roundBasePrice, range),
                        quantity: generateQuantity(bots[i].buyQ, bots[i].buyQRange),
                        time: Math.floor(Math.random() * roundTime)
                    });
                } else {
                    scheduledBuys.push({
                        price: generatePrice(roundBasePrice, range),
                        quantity: generateQuantity(bots[i].buyQ, bots[i].buyQRange),
                        time: Math.floor(Math.random() * roundTime)
                    });
                    scheduledSells.push(null);
                }
            }
        }*/
        console.log(scheduledSells);
        console.log(scheduledBuys);
    }

    function makeScheduledRequests(submissionTime) {
        for (let i = 0; i < scheduledBuys.length; i++) {
            if (scheduledBuys[i] === null) {
                continue;
            }
            if (scheduledBuys[i].time <= submissionTime && submissionTime < scheduledBuys[i].time + 1) {
                requestsThisRound.push({
                    type: 'buy',
                    user: bots[i].name,
                    time: submissionTime,
                    price: scheduledBuys[i].price,
                    quantity: scheduledBuys[i].quantity
                });
                addReportEntry('خرید', bots[i].name, submissionTime, scheduledBuys[i].quantity, scheduledBuys[i].price);
            }
        }
        for (let i = 0; i < scheduledSells.length; i++) {
            if (scheduledSells[i] === null) {
                continue;
            }
            if (scheduledSells[i].time <= submissionTime && submissionTime < scheduledSells[i].time + 1) {
                requestsThisRound.push({
                    type: 'sell',
                    user: bots[i].name,
                    time: submissionTime,
                    price: scheduledSells[i].price,
                    quantity: scheduledSells[i].quantity
                });
                addReportEntry('فروش', bots[i].name, submissionTime, scheduledSells[i].quantity, scheduledSells[i].price);
            }
        }
    }

    function finishUpRound() {
        const resultsTable = document.getElementById('results-table');
        const resultsBody = document.getElementById('results-body');
        const resultsTxt = document.getElementById('results-txt');
        resultsTable.style.display = 'table';
        resultsTxt.style.display = 'block';
        resultsBody.innerHTML = '';
        const success = new Array(requestsThisRound.length).fill(false);
        const purchases = []
        for (let i = 0; i < requestsThisRound.length; i++) {
            const request = requestsThisRound[i];
            if (request.type === 'sell' && !success[i]) {
                for (let j = 0; j < requestsThisRound.length; j++) {
                    if (i !== j && requestsThisRound[j].type === 'buy' && !success[j] && requestsThisRound[j].price >= request.price) {
                        success[i] = true;
                        const purchasePrice = request.price
                        const purchaseQuantity = Math.min(request.quantity, requestsThisRound[j].quantity);
                        const buyer = requestsThisRound[j].user;
                        const seller = request.user;
                        request.quantity -= purchaseQuantity;
                        requestsThisRound[j].quantity -= purchaseQuantity;
                        purchases.push({
                            quantity: purchaseQuantity,
                            price: purchasePrice
                        })
                        addPurchaseEntity(buyer, request.user, purchaseQuantity, purchasePrice);
                        if (buyer === yourName) {
                            updateAssetQuantity(getAssetQuantity() + purchaseQuantity);
                            updateBudget(purchaseQuantity * purchasePrice, "subtract")
                        }
                        if (seller === yourName) {
                            updateAssetQuantity(getAssetQuantity() - purchaseQuantity);
                            updateBudget(purchaseQuantity * purchasePrice, "add")
                        }
                        if (requestsThisRound[j].quantity <= 0) {
                            success[j] = true;
                        }
                        if (request.quantity <= 0) {
                            break;
                        }
                    }
                }
            }
        }

        let totalQuantity = 0;
        let totalValue = 0;
        for (let i = 0; i < purchases.length; i++) {
            totalQuantity += purchases[i].quantity;
            totalValue += purchases[i].quantity * purchases[i].price;
        }
        roundBasePrice = parseFloat((totalValue / totalQuantity).toFixed(1));
        const basePriceRow = document.getElementById(`base-price${roundNumber}`);
        basePriceRow.innerHTML = roundBasePrice;
    }

    document.getElementById("buy-button").addEventListener("click", function () {
        const price = Number(document.getElementById('buy-price').value);
        const quantity = Number(document.getElementById('buy-quantity').value);
        const totalCost = price * quantity;

        if (madeBuyRequest) {
            showPopup('شما درخواست خرید خود در این راند را استفاده کرده‌اید.');
            return;
        }
        if (!canBuy(totalCost)) {
            showPopup('موجودی شما کافی نیست.');
            return;
        }
        let submissionTime = roundTime - roundTimeLeft;
        if (submissionTime >= roundTime) {
            showPopup('هنوز راند جدید شروع نشده است.');
            return;
        }

        requestsThisRound.push({
            type: 'buy',
            user: yourName,
            time: submissionTime,
            price: price,
            quantity: quantity
        });
        addReportEntry('خرید', yourName, submissionTime, quantity, price);
        addHistoryEntry('خرید', quantity, price)
        showPopup(`سفارش خرید شما ثبت شد. در صورت موفقیت در انجام سفارش، سهام اضافه و مبلغ از حساب شما کسر خواهد شد.`);
        madeBuyRequest = true;
    });

    document.getElementById("sell-button").addEventListener("click", function () {
        const price = Number(document.getElementById('sell-price').value);
        const quantity = parseInt(document.getElementById('sell-quantity').value);
        if (madeSellRequest) {
            showPopup('شما درخواست فروش خود در این راند را ثبت کرده‌اید.');
            return;
        }
        if (!canSell(quantity)) {
            showPopup('موجودی سهام شما کافی نیست.');
            return;
        }
        let submissionTime = roundTime - roundTimeLeft;
        if (submissionTime >= roundTime) {
            showPopup('هنوز راند جدید شروع نشده است.');
            return;
        }
        requestsThisRound.push({
            type: 'sell',
            user: yourName,
            time: submissionTime,
            price: price,
            quantity: quantity
        });
        addReportEntry('فروش', yourName, submissionTime, quantity, price);
        addHistoryEntry('فروش', quantity, price)
        showPopup(`سفارش فروش شما ثبت شد. در صورت موفقیت در انجام سفارش، سهام کسر و مبلغ به حساب شما اضافه خواهد شد.`);
        madeSellRequest = true;
    });

    document.getElementById("start-round-button").addEventListener("click", function () {
        let timeLeft = roundTime;
        const button = this;

        button.disabled = true; // Disable the button during the countdown
        startNewRound();
        const timer = setInterval(function () {
            roundTimeLeft = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                button.innerText = "شروع راند";
                button.disabled = false; // Re-enable the button after the countdown
                finishUpRound();
                updateRound();
                showPopup("راند به پایان رسید!");
            } else {
                button.innerText = `${timeLeft} ثانیه`;
                makeScheduledRequests(roundTime - timeLeft);
            }
            timeLeft -= 1;
        }, 1000);
    });
});

function addReportEntry(type, user, time, quantity, price) {
    const reportBody = document.getElementById("report-body");
    const row = document.createElement("tr");
    const total = parseFloat((quantity * price).toFixed(2));
    if (type === 'خرید') {
        row.innerHTML = `<td>${user}</td><td>${time}</td><td>${quantity}</td><td>${price}</td><td style="color: blue;">${total}</td><td></td><td></td><td></td><td></td><td></td>`;
    } else {
        row.innerHTML = `<td></td><td></td><td></td><td></td><td></td><td>${user}</td><td>${time}</td><td>${quantity}</td><td>${price}</td><td style="color: red;">${total}</td>`;
    }
    reportBody.appendChild(row);
}

function addPurchaseEntity(buyer, seller, quantity, price) {
    const resultsBody = document.getElementById("results-body");
    const row = document.createElement("tr");
    const total = parseFloat((quantity * price).toFixed(2));
    row.innerHTML = `<td>${buyer}</td><td>${quantity}</td><td>${price}</td><td>${total}</td><td>${seller}</td>`;
    resultsBody.appendChild(row);
}

function addHistoryEntry(type, quantity, price) {
    const historyBody = document.getElementById("history-body");
    const row = document.createElement("tr");
    if (type === 'خرید') {
        row.innerHTML = `<td>${roundNumber}</td><td>${type}</td><td>${quantity}</td><td>${price}</td><td>${quantity * price}</td>`
    } else {
        row.innerHTML = `<td>${roundNumber}</td><td>${type}</td><td>${quantity}</td><td>${price}</td><td>${quantity * price}</td>`
    }
    historyBody.appendChild(row);
}

function calculateTotal(type, dividablePrice = null) {
    let price, quantity, total;
    if (type === 'buy') {
        price = Number(document.getElementById('buy-price').value);
        quantity = Number(document.getElementById('buy-quantity').value);
        total = document.getElementById('buy-total');
    } else {
        price = Number(document.getElementById('sell-price').value);
        quantity = Number(document.getElementById('sell-quantity').value);
        total = document.getElementById('sell-total');
    }
    if (dividablePrice !== null) {
        price = dividablePrice;
    }
    total.value = price * quantity;
}

function updateBudget(amount, operation) {
    const budgetInput = document.getElementById('budget');
    const remainingBudgetInput = document.getElementById('remaining-budget');
    let remainingBudget = Number(remainingBudgetInput.value);

    if (operation === 'subtract') {
        remainingBudget -= amount;
    } else if (operation === 'add') {
        remainingBudget += amount;
    }

    if (remainingBudget < 0) {
        remainingBudget = 0; // جلوگیری از مقدار منفی
    }

    remainingBudgetInput.value = remainingBudget;
}

function canBuy(amount) {
    const remainingBudgetInput = document.getElementById('remaining-budget');
    let remainingBudget = Number(remainingBudgetInput.value);
    return remainingBudget >= amount;
}

function canSell(amount) {
    const assetQuantityInput = document.getElementById('asset-quantity');
    let assetQuantity = Number(assetQuantityInput.value);
    return assetQuantity >= amount;
}

function getAssetQuantity() {
    const assetQuantityInput = document.getElementById('asset-quantity');
    return Number(assetQuantityInput.value);
}

function updateAssetQuantity(value) {
    const assetQuantityInput = document.getElementById('asset-quantity');
    assetQuantityInput.value = value;
}

function showPopup(customMessage) {
    const modal = document.getElementById("round-end-modal");
    const closeModal = document.getElementById("close-modal");
    const messageElement = document.getElementById("modal-message");

    messageElement.innerText = customMessage; // Set the custom message
    modal.style.display = "block"; // Show the modal

    closeModal.onclick = function () {
        modal.style.display = "none"; // Close the modal when the close button is clicked
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none"; // Close the modal if the user clicks outside of it
        }
    }
}

document.getElementById("buy-quantity").addEventListener("input", function (event) {
    // Get the input value
    let value = event.target.value;

    // Remove any non-digit characters (allowing negative sign if needed)
    event.target.value = value.replace(/[^0-9-]/g, '');

    // Optionally, ensure the value is an integer
    if (isNaN(parseInt(value))) {
        event.target.value = ''; // Clear the input if not an integer
    }
});

document.getElementById("sell-quantity").addEventListener("input", function (event) {
    // Get the input value
    let value = event.target.value;

    // Remove any non-digit characters (allowing negative sign if needed)
    event.target.value = value.replace(/[^0-9-]/g, '');

    // Optionally, ensure the value is an integer
    if (isNaN(parseInt(value))) {
        event.target.value = ''; // Clear the input if not an integer
    }
});

document.getElementById("sell-price").addEventListener("change", function () {
    let value = parseFloat(this.value);
    if (!isNaN(value)) {
        this.value = Math.round(value / 5) * 5;
    }
    calculateTotal('sell');

});

document.getElementById("buy-price").addEventListener("change", function () {
    let value = parseFloat(this.value);
    if (!isNaN(value)) {
        this.value = Math.round(value / 5) * 5;
    }
    calculateTotal('buy');

});