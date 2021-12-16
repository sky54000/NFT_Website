// import detectEthereumProvider from "@metamask/detect-provider";

$(document).ready(function() {
	
    var headerHeight = $("header").outerHeight(); // Target your header navigation here

    $(".enableEthereumButton").click(function() {
      getAccount();
    });
      
    $(".menu_header a").click(function(e) {
      var targetHref = $(this).attr("href");  
      $("html, body").animate({
          scrollTop: $(targetHref).offset().top - headerHeight // Add it to the calculation here
      }, 1000);
      
      e.preventDefault();
    });

    $( ".contract-form" ).submit(function( event ) {
      // console.log( $( this ).serializeArray() );
      var formcomp = $( this ).serializeArray();
      console.log(formcomp[0].value);
      buy_bot(formcomp[0].value, formcomp[1].value, formcomp[2].value)
      event.preventDefault();
    });

    async function buy_bot(contract_address, amount_max, amount_allocated) {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      $('.showAccount').html(account);
      $(".enableEthereumButton").toggle();
      var web3js = new Web3(window.ethereum);
      var NFTcontractAddress = "0x27dEa2c16E2F8b2a5Fc0eF8622dd77d86764CAD4";
      console.log(amount_allocated)
      NFTcontract = new web3js.eth.Contract(NFTcontractabi, NFTcontractAddress, {from: account});
      console.log(NFTcontract);
      console.log(web3js.utils.toWei(amount_max));
      const create_sub = await NFTcontract.methods.subscribe(contract_address, web3js.utils.toWei(amount_max)).send({from: account, value: web3js.utils.toWei(amount_allocated)});
      console.log(create_sub);
      const sub = await NFTcontract.methods.getMySubscriptions().call();
      console.log(sub);
      alert("Subscription succeed : " + create_sub);
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
  });


// const provider = await detectEthereumProvider();

// if (provider) {
//   // From now on, this should always be true:
//   // provider === window.ethereum
//   startApp(provider); // initialize your app
// } else {
//   console.log("Please install MetaMask!");
// }

// if (typeof window.ethereum !== "undefined") {
//   console.log("MetaMask is installed!");
// }
// else
// {
//   console.log("Please install metamask")
// }


// const ethereumButton = document.querySelector('.enableEthereumButton');
// const showAccount = document.querySelector('.showAccount');
// console.log(ethereumButton)
// // ethereumButton.addEventListener('click', () => {
// //   getAccount();
// // });

// var NFTcontract;

// function startApp() {
//   var web3js = new Web3(window.ethereum);
//   // var NFTcontractAddress = "0x1c026439a701Da16A7D9de84582504c04D38cfa2";
//   // NFTcontract = new web3js.eth.Contract(NFTcontractabi, NFTcontractAddress);
//   // console.log(NFTcontract)
//   // const bot = await window.contract.methods.bot().call();
//   // console.log(bot);
//   // var accountInterval = setInterval(function() {
//   //   // Check if account has changed
//   //   if (web3.eth.accounts[0] !== userAccount) {
//   //     var userAccount = web3.eth.accounts[0];
//   //     console.log(userAccount)
//   //   // Call a function to update the UI with the new account
//   //   }
//   // }, 100);
// }

// window.addEventListener("load", function() {

//   // Checking if Web3 has been injected by the browser (Mist/MetaMask)
//   if (typeof window.ethereum !== "undefined") {
//     console.log("MetaMask is installed!");
//     // Use Mist/MetaMask"s provider
//     var web3js = new Web3(window.ethereum);
//       // Now you can start your app & access web3 freely:
//     startApp(web3js)
//   } else {
//     // Handle the case where the user doesn"t have MetaMask installed
//     // Probably show them a message prompting them to install MetaMask
//     console.log("Please install metamask")
//   }

// })