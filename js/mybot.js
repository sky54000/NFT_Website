$(document).ready(function() {

    let contract_address = "0x507c59C8B9769Bd8BD9F9F92F60BAc3de9ef0608";
    var web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(NFTcontractabi, contract_address);

    $(".enableEthereumButton").click(function() {
        getAccount();
    });

    $(".btn-revokewallsub").click(function() {
        RevokeAll();
    });

    $(".btn-withdrawall").click(function() {
        WithDrawAll();
    });

    $(".btn-withdrawamount").click(function() {
        WithDrawAmount();
    });

    $('#add-eth-button').click(function(){
        $('#eth-to-balance').css({
            'display': 'block'
        });
        $('#send-eth-to-balance').css({
            'display': 'block'
        });
        $('#add-eth-button').css({
            'display': 'none'
        });
    });

    $("#send-eth-to-balance").click(function() {
        sendEthToBalance();
    });

    $( ".contract-form" ).submit(function( event ) {
        // console.log( $( this ).serializeArray() );
        var formcomp = $( this ).serializeArray();
        put_order(formcomp[0].value, formcomp[1].value, formcomp[2].value);
        // location.reload();
        event.preventDefault();
    });

    async function getBot() {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        const balance = await contract.methods.getMyBalance().call({from: account});
        const acc_balance = await web3.eth.getBalance(account);
        const account_balance = web3.utils.fromWei(acc_balance);
        console.log(account_balance);
        $('.showBalance').html(Math.round(web3.utils.fromWei(balance)*1000)/1000);
        $('.showAccount').html(account.slice(0, 6)+'...' + account.slice(-4));
        $('.showAccountBalance').html(Math.round(account_balance * 1000)/1000);
        $(".enableEthereumButton").toggle();
        if (window.ethereum.networkVersion != 1) {
            alert("Please switch your network to rinkeby");
        }
        const sub = await contract.methods.getMySubscriptions().call({from: account});
        $(".btn-withdrawallsub").css({
            'visibility': 'visible'
        });
        console.log(sub);
        $(".noactive").toggle();
        // console.log(sub.length);
        for (let b = 0; b < sub.length; b++) {
            console.log(sub[b]);
            console.log(sub[b][1].nftCollection);
            let maxBuyPrices = []
            for (let i = 0; i < sub.length; ++i) {
                if (sub[i][1].nftCollection == sub[b][1].collection) {
                    maxBuyPrice = sub[i][1].maxBuyPrice;
                    if (sub[i][1].balance > sub[i][1].maxBuyPrice)
                        maxBuyPrice = sub[i][1].balance;
                    maxBuyPrices.push(web3.utils.fromWei(maxBuyPrice));
                }
            }
            maxBuyPrices.sort();
            trueRealBalanceForSub = web3.utils.fromWei(sub[b][1].balance);
            if (Number(sub[b][1].balance) > Number(balance)) {
                trueRealBalanceForSub = web3.utils.fromWei(balance).slice(0,5) + " (" + trueRealBalanceForSub + ")";
            }
            $(".mybots").append(`<div class="container_mybots">
                <div class="mybot">
                <h1 class="mybot_title">Order ${sub[b].id}</h1>
                <ul class="list_bot">
                    <li class="elem_bot">Collection: <p class="cont_elem_bot">${sub[b][1].nftCollection}</p></li>
                    <li class="elem_bot">Balance: <p class="cont_elem_bot">${Math.round(trueRealBalanceForSub*1000)/1000} ETH</p></li>
                    <li class="elem_bot">Max Buy price: <p class="cont_elem_bot">${web3.utils.fromWei(sub[b][1].maxBuyPrice)} ETH</p></li>
                    <li class="elem_bot">N° of NFTs bought: <p class="cont_elem_bot">${sub[b][1].tokenBought}</p></li>
                    <li class="elem_bot">OrderBook for Collection: <p class="cont_elem_bot">${maxBuyPrices}</p></li>
                </ul>
                <div class="buttons_mybot">
                    <button class="btn-withdrawnft" value="${sub[b].id}" onclick="WithDrawSub(this.value)" type="submit" data-loading-text="Withdrawing...">REVOKE ORDER</button>
                </div>
                </div>
                <div class="mybot_image_container">
                    <img class="img_mybot" src="images/ROBOT_2.png" alt="MYBOT">
                </div>
            </div>`);
        }
    }

    async function RevokeAll() {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        if (window.ethereum.networkVersion != 1) {
            alert("Please switch your network to rinkeby");
        }
        const bot = await contract.methods.revokeAllOwnSubscriptions().send({from: account});
        console.log(bot);
        location.reload();
    }

    async function WithDrawAll() {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        if (window.ethereum.networkVersion != 1) {
            alert("Please switch your network to rinkeby");
        }
        const availableBalance = await contract.methods.getMyAvailableETH().call({from: account});
        console.log(availableBalance);
        const bot = await contract.methods.withdrawAvailableETH(availableBalance).send({from: account});
        console.log(bot);
        location.reload();
    }

    async function WithDrawAmount() {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        if (window.ethereum.networkVersion != 1) {
            alert("Please switch your network to rinkeby");
        }
        var amount = document.getElementById("amount_withdraw_eth").value;
        amount = amount.replace(',', '.');
        console.log(amount);
        const availableBalance = await contract.methods.getMyAvailableETH().call({from: account});
        console.log(availableBalance);
        const bot = await contract.methods.withdrawAvailableETH(web3.utils.toWei(amount)).send({from: account});
        console.log(bot);
        location.reload();
    }

    async function getAccount() {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        const balance = await contract.methods.getMyBalance().call({from: account});
        $('.showBalance').html(web3.utils.fromWei(Math.round(balance*1000)/1000));
        $('.showAccount').html(account.slice(0, 6)+'...' + account.slice(-4));
        if($(".enableEthereumButton").is(":hidden")) {
            $(".enableEthereumButton").toggle();
        }
        if (window.ethereum.networkVersion != 1) {
            alert("Please switch your network to rinkeby");
        }
    }

    async function sendEthToBalance() {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        if (window.ethereum.networkVersion != 1) {
            alert("Please switch your network to rinkeby");
        }
        var amount = document.getElementById("eth-to-balance").value;
        amount = amount.replace(',', '.');
        const bot = await contract.methods.addETHtoBalance().send({from: account, value: web3.utils.toWei(amount, "ether")});
        console.log(bot);
        location.reload();
        $('#eth-to-balance').css({
            'display': 'none'
        });
        $('#send-eth-to-balance').css({
            'display': 'none'
        });
        $('#add-eth-button').css({
            'display': 'block'
        });
    }

    getBot();

    
    async function put_order(collection_address, amount_max, amount_allocated) {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        if (window.ethereum.networkVersion != 1) {
            alert("Please switch your network to rinkeby");
            cansub = false;
        }
        const order = await contract.methods.subscribe(collection_address, web3.utils.toWei(amount_max), web3.utils.toWei(amount_allocated)).send({from: account, value: 0});
        location.reload();
    }
    
    if(window.ethereum) {
        window.ethereum.on('chainChanged', () => {
            window.location.reload();
        })
    window.ethereum.on('accountsChanged', () => {
        window.location.reload();
    })
}

});

async function WithDrawSub(sub_id) {
    let contract_address = "0x507c59C8B9769Bd8BD9F9F92F60BAc3de9ef0608";
    var web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(NFTcontractabi, contract_address);
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    if (window.ethereum.networkVersion != 1) {
        alert("Please switch your network to rinkeby");
    }
    const bot = await contract.methods.revokeOwnSubscription(sub_id).send({from: account});
    console.log(bot);
    window.location.reload();
}

async function ShowCurrentOrders(collection_address) {
    let contract_address = "0x507c59C8B9769Bd8BD9F9F92F60BAc3de9ef0608";
    var web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(NFTcontractabi, contract_address);
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    if (window.ethereum.networkVersion != 1) {
    alert("Please switch your network to rinkeby");
    cansub = false;
    }
    const active_orders =  await contract.methods.getOrderBookForCollection(collection_address).call()
    console.log(active_orders);
    $("#active_order_row").remove();
    $("#active_order_row").remove();
    $("#active_order_row").remove();
    $("#active_order_row").remove();
    $("#title_table_orders").remove();

    $("#contain_title_table_orders").append(`
        <h1 id="title_table_orders" class="title_table_order">All orders currently active for this collection</h1>
    `)

    $("#tab_active_orders").append(`
    <tr id="active_order_row">
        <td class="elem_bot_tab">Priority</td>
        <td class="elem_bot_tab">Max Buy Price</td>
        <td class="elem_bot_tab">Balance</td>
    </tr>
    `)
    for (let i = 0; i < active_orders.length; ++i) {
        $("#tab_active_orders").append(`
            <tr id="active_order_row">
                <td class="elem_bot_tab"><p class="cont_elem_bot">${i+1}</p></li>
                <td class="elem_bot_tab"><p class="cont_elem_bot">${web3.utils.fromWei(active_orders[i].subscription.maxBuyPrice)} ETH</p></li>
                <td class="elem_bot_tab"><p class="cont_elem_bot">${Math.round(web3.utils.fromWei(active_orders[i].subscription.balance)*1000)/1000} ETH</p></li>
            </tr>
        `)
    }
}