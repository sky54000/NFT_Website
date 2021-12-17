
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
      alert("Subscription succeed : THANKS");
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
    }
  });