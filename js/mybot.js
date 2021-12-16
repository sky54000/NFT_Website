$(document).ready(function() {

    $(".enableEthereumButton").click(function() {
        getAccount();
    });

    async function getBot() {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        $('.showAccount').html(account);
        $(".enableEthereumButton").toggle();
        var web3js = new Web3(window.ethereum);
        var NFTcontractAddress = "0x27dEa2c16E2F8b2a5Fc0eF8622dd77d86764CAD4";
        NFTcontract = new web3js.eth.Contract(NFTcontractabi, NFTcontractAddress, {from: account});
        console.log(NFTcontract)
        const sub = await NFTcontract.methods.getMySubscriptions().call();
        console.log(sub);
        // console.log(sub.length);
        for (let b = 0; b < sub.length; b++) {
            console.log(sub[b]);
            console.log(sub[b][1].nftCollection);
            var date_exp = new Date(sub[b][1].expirationDate);
            $(".mybots").append(`<div class="mybot">
              <ul class="list_bot">
                <li class="elem_bot">Subscription to: ${sub[b][1].nftCollection}</li>
                <li class="elem_bot">Balance: ${web3js.utils.fromWei(sub[b][1].balance)}</li>
                <li class="elem_bot">Max Buy price: ${web3js.utils.fromWei(sub[b][1].maxBuyPrice)}</li>
                <li class="elem_bot">Expiration date: ${date_exp.getTime()}</li>
              </ul>
            </div>`);
        }
    }

    async function getAccount() {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        $('.showAccount').html(account);
        $(".enableEthereumButton").toggle();
        var web3js = new Web3(window.ethereum);
        var NFTcontractAddress = "0x27dEa2c16E2F8b2a5Fc0eF8622dd77d86764CAD4";
        NFTcontract = new web3js.eth.Contract(NFTcontractabi, NFTcontractAddress);
        console.log(NFTcontract)
        const bot = await NFTcontract.methods.bot().call();
        console.log(bot);
        // const create_sub = await NFTcontract.methods.subscribe(0xcC14dd8E6673fEE203366115D3f9240b079a4930, 0.5);
        // console.log(create_sub);
        // const sub = await NFTcontract.methods.getMySubscriptions().call();
        // console.log(sub);
    }
    getBot();
    });


