$(document).ready(function() {

    $(".enableEthereumButton").click(function() {
        getAccount();
    });

    $(".btn-withdrawallsub").click(function() {
        WithDrawAll();
    });

    $(".btn-withdrawallnft").click(function() {
        WithDrawNFTall();
    });

    async function getBot() {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        $('.showAccount').html(account);
        $(".enableEthereumButton").toggle();
        var web3js = new Web3(window.ethereum);
        var NFTcontractAddress = "0x01761a3e953fe5DC8316Efa4C3259D220c19C2d0";
        NFTcontract = new web3js.eth.Contract(NFTcontractabi, NFTcontractAddress, {from: account});
        console.log(NFTcontract)
        if (window.ethereum.networkVersion != 4) {
            alert("Please switch your network to rinkeby");
        }
        const sub = await NFTcontract.methods.getMySubscriptions().call();
        console.log(sub);
        $(".noactive").toggle();
        // console.log(sub.length);
        for (let b = 0; b < sub.length; b++) {
            console.log(sub[b]);
            console.log(sub[b][1].nftCollection);
            var date_exp = new Date(sub[b][1].expirationDate*1000);
            console.log(date_exp);
            var end_date = date_exp.getDate()+
            "/"+(date_exp.getMonth()+1)+
            "/"+date_exp.getFullYear()+
            " "+date_exp.getHours()+
            ":"+date_exp.getMinutes()+
            ":"+date_exp.getSeconds();
            console.log(end_date);
            $(".mybots").append(`<div class="container_mybots">
                <div class="mybot">
                <h1 class="mybot_title">Subscribe ${sub[b].id}</h1>
                <ul class="list_bot">
                    <li class="elem_bot">Collection: <p class="cont_elem_bot">${sub[b][1].nftCollection}</p></li>
                    <li class="elem_bot">Balance: <p class="cont_elem_bot">${web3js.utils.fromWei(sub[b][1].balance)} ETH</p></li>
                    <li class="elem_bot">Max Buy price: <p class="cont_elem_bot">${web3js.utils.fromWei(sub[b][1].maxBuyPrice)} ETH</p></li>
                    <li class="elem_bot">Expiration date: <p class="cont_elem_bot">${end_date}</p></li>
                    <li class="elem_bot">N° of NFTs bought: <p class="cont_elem_bot">${sub[b][1].tokenBought.length}</p></li>
                </ul>
                <input type="text" class="form-control mybot_amount" id="amount-${sub[b].id}" name="amount" placeholder="Amount in ETH">
                <div class="buttons_mybot">
                    <button class="btn-withdrawnft" value="${sub[b].id}" data-contract="${sub[b][1].nftCollection}" onclick="WithDrawNFT(this)" type="submit" data-loading-text="Withdrawing...">WITHDRAW NFT</button>
                    <button class="btn-withdrawnft" value="${sub[b].id}" data-contract="${sub[b][1].nftCollection}" onclick="AddETH(this)" type="submit" data-loading-text="Withdrawing...">ADD ETH TO BALANCE</button>
                    <button class="btn-withdrawnft" value="${sub[b].id}" data-contract="${sub[b][1].nftCollection}" onclick="ExtendSub(this)" type="submit" data-loading-text="Withdrawing...">EXTEND SUBSCRIPTION</button>
                    <button class="btn-withdrawnft" value="${sub[b].id}" onclick="WithDrawSub(this.value)" type="submit" data-loading-text="Withdrawing...">REVOKE AND WITHDRAW SUBSCRIPTION</button>
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
        var web3js = new Web3(window.ethereum);
        var NFTcontractAddress = "0x01761a3e953fe5DC8316Efa4C3259D220c19C2d0";
        if (window.ethereum.networkVersion != 4) {
            alert("Please switch your network to rinkeby");
        }
        NFTcontract = new web3js.eth.Contract(NFTcontractabi, NFTcontractAddress, {from: account});
        // console.log(NFTcontract)
        const bot = await NFTcontract.methods.withdrawAllForUser().send();
        console.log(bot);
        location.reload();
    }

    async function WithDrawNFTall() {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        var web3js = new Web3(window.ethereum);
        var NFTcontractAddress = "0x01761a3e953fe5DC8316Efa4C3259D220c19C2d0";
        if (window.ethereum.networkVersion != 4) {
            alert("Please switch your network to rinkeby");
        }
        NFTcontract = new web3js.eth.Contract(NFTcontractabi, NFTcontractAddress, {from: account});
        // console.log(NFTcontract)
        const bot = await NFTcontract.methods.withdrawAllNFT().send();
        console.log(bot);
        location.reload();
    }

    async function getAccount() {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        $('.showAccount').html(account);
        $(".enableEthereumButton").toggle();
        var web3js = new Web3(window.ethereum);
        var NFTcontractAddress = "0x01761a3e953fe5DC8316Efa4C3259D220c19C2d0";
        if (window.ethereum.networkVersion != 4) {
            alert("Please switch your network to rinkeby");
        }
        NFTcontract = new web3js.eth.Contract(NFTcontractabi, NFTcontractAddress);
        console.log(NFTcontract)
    }
    getBot();

    // $(".btn-withdrawnft").click(function() {
    //     WithDrawNFTall();
    // });

    });


async function WithDrawNFT(button_attr) {
    var contract = button_attr.getAttribute('data-contract');
    var sub_id = button_attr.getAttribute('value');
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    var web3js = new Web3(window.ethereum);
    var NFTcontractAddress = "0x01761a3e953fe5DC8316Efa4C3259D220c19C2d0";
    if (window.ethereum.networkVersion != 4) {
        alert("Please switch your network to rinkeby");
    }
    NFTcontract = new web3js.eth.Contract(NFTcontractabi, NFTcontractAddress, {from: account});
    // console.log(NFTcontract)
    const bot = await NFTcontract.methods.withdrawNFT(sub_id).send();
    console.log(bot);
    window.location.reload();
}

async function WithDrawSub(sub_id) {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    var web3js = new Web3(window.ethereum);
    var NFTcontractAddress = "0x01761a3e953fe5DC8316Efa4C3259D220c19C2d0";
    if (window.ethereum.networkVersion != 4) {
        alert("Please switch your network to rinkeby");
    }
    NFTcontract = new web3js.eth.Contract(NFTcontractabi, NFTcontractAddress, {from: account});
    // console.log(NFTcontract)
    const bot = await NFTcontract.methods.withdrawSubscription(sub_id).send();
    console.log(bot);
    window.location.reload();
}

async function ExtendSub(button_attr) {
    var contract = button_attr.getAttribute('data-contract');
    var sub_id = button_attr.getAttribute('value');
    console.log(contract);
    var inptfield = 'amount-' + sub_id;
    console.log(inptfield);
    var amount = document.getElementById(inptfield).value;
    if (amount == '') {
        alert("please enter an ETH amount, it can be 0");
        amount = 0;
    }
    console.log(amount);
    console.log(sub_id)
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    var web3js = new Web3(window.ethereum);
    var NFTcontractAddress = "0x01761a3e953fe5DC8316Efa4C3259D220c19C2d0";
    if (window.ethereum.networkVersion != 4) {
        alert("Please switch your network to rinkeby");
    }
    NFTcontract = new web3js.eth.Contract(NFTcontractabi, NFTcontractAddress, {from: account});
    const bot = await NFTcontract.methods.extendSubscription(sub_id).send({from: account, value: web3js.utils.toWei(amount)});
    console.log(bot);
    window.location.reload();
}

async function AddETH(button_attr) {
    var contract = button_attr.getAttribute('data-contract');
    var sub_id = button_attr.getAttribute('value');
    console.log(contract);
    var inptfield = 'amount-' + sub_id;
    console.log(inptfield);
    var amount = document.getElementById(inptfield).value;
    console.log(amount);
    console.log(sub_id)
    if (amount == '') {
        alert("please enter an ETH amount greater than 0");
    }
    else {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        var web3js = new Web3(window.ethereum);
        var NFTcontractAddress = "0x01761a3e953fe5DC8316Efa4C3259D220c19C2d0";
        if (window.ethereum.networkVersion != 4) {
            alert("Please switch your network to rinkeby");
        }
        NFTcontract = new web3js.eth.Contract(NFTcontractabi, NFTcontractAddress, {from: account});
        // console.log(NFTcontract)
        const bot = await NFTcontract.methods.addETHToSubscription(sub_id).send({from: account, value: web3js.utils.toWei(amount)});
        console.log(bot);
        window.location.reload();
    }
}


if(window.ethereum) {
    window.ethereum.on('chainChanged', () => {
        window.location.reload();
    })    
    window.ethereum.on('accountsChanged', () => {
        window.location.reload();
    })
}

