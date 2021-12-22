$(document).ready(function() {

    let contract_address = "0xcef7a38241a25690d81Ed5Cb240cd927Bd40fB7F";
    var web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(NFTcontractabi, contract_address);

    $(".enableEthereumButton").click(function() {
        getAccount();
    });

    $(".btn-withdrawallsub").click(function() {
        WithDrawAll();
    });

    $('#add-eth-button').click(function(){
        $('#eth-to-balance').css({
            'visibility': 'visible'
        });
        $('#send-eth-to-balance').css({
            'visibility': 'visible'
        });
        $('#add-eth-button').css({
            'visibility': 'hidden'
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
        $('.showBalance').html(web3.utils.fromWei(balance));
        $('.showAccount').html(account.slice(0, 6)+'...' + account.slice(-4));
        $(".enableEthereumButton").toggle();
        if (window.ethereum.networkVersion != 4) {
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
            $(".mybots").append(`<div class="container_mybots">
                <div class="mybot">
                <h1 class="mybot_title">Order ${sub[b].id}</h1>
                <ul class="list_bot">
                    <li class="elem_bot">Collection: <p class="cont_elem_bot">${sub[b][1].nftCollection}</p></li>
                    <li class="elem_bot">Balance: <p class="cont_elem_bot">${web3.utils.fromWei(sub[b][1].balance)} ETH</p></li>
                    <li class="elem_bot">Max Buy price: <p class="cont_elem_bot">${web3.utils.fromWei(sub[b][1].maxBuyPrice)} ETH</p></li>
                    <li class="elem_bot">N° of NFTs bought: <p class="cont_elem_bot">${sub[b][1].tokenBought}</p></li>
                    <li class="elem_bot">OrderBook for Collection: <p class="cont_elem_bot">${maxBuyPrices}</p></li>
                </ul>
                <div class="buttons_mybot">
                    <button class="btn-withdrawnft" value="${sub[b].id}" onclick="WithDrawSub(this.value)" type="submit" data-loading-text="Withdrawing...">REVOKE AND WITHDRAW ORDER</button>
                </div>
                </div>
                <div class="mybot_image_container">
                    <img class="img_mybot" src="images/ROBOT_2.png" alt="MYBOT">
                </div>
            </div>`);
        }
    }

    async function WithDrawAll() {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        if (window.ethereum.networkVersion != 4) {
            alert("Please switch your network to rinkeby");
        }
        // console.log(NFTcontract)
        const bot = await contract.methods.revokeAllOwnSubscriptions().send({from: account});
        console.log(bot);
        location.reload();
    }

    async function getAccount() {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        const balance = await contract.methods.getMyBalance().call({from: account});
        $('.showBalance').html(web3.utils.fromWei(balance));
        $('.showAccount').html(account.slice(0, 6)+'...' + account.slice(-4));
        $(".enableEthereumButton").toggle();
        if (window.ethereum.networkVersion != 4) {
            alert("Please switch your network to rinkeby");
        }
    }

    async function sendEthToBalance() {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        if (window.ethereum.networkVersion != 4) {
            alert("Please switch your network to rinkeby");
        }
        var amount = document.getElementById("eth-to-balance").value;
        amount = amount.replace(',', '.');
        const bot = await contract.methods.addETHtoBalance().send({from: account, value: web3.utils.toWei(amount, "ether")});
        console.log(bot);
        location.reload();
        $('#eth-to-balance').css({
            'visibility': 'collapse'
        });
        $('#send-eth-to-balance').css({
            'visibility': 'collapse'
        });
        $('#add-eth-button').css({
            'visibility': 'visible'
        });
    }

    getBot();

    async function put_order(collection_address, amount_max, amount_allocated) {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        if (window.ethereum.networkVersion != 4) {
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
    let contract_address = "0xce393C17835d11a066BC863306111e328Dfd50a5";
    var web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(NFTcontractabi, contract_address);
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    if (window.ethereum.networkVersion != 4) {
        alert("Please switch your network to rinkeby");
    }
    const bot = await contract.methods.revokeOwnSubscription(sub_id).send({from: account});
    console.log(bot);
    window.location.reload();
}
