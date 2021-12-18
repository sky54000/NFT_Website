
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
    }

    /*
    * Contact Form Validation Code
    */
    function checkEmpty(selector) {
      if (selector.val()=="" || selector.val()==selector.prop("placeholder")) {
        selector.addClass('formFieldError',500);
        return false;
      } else {
        selector.removeClass('formFieldError',500);
        return true;
      }
    }
    function validateEmail(email) {
      var regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;
      if (!regex.test(email.val())) {
        email.addClass('formFieldError',500);
        return false;
      } else {
        email.removeClass('formFieldError',500);
        return true;
      }
    }

    $('.contact-form').submit(function () {
      var $this = $(this),
          result = true;

      if(!checkEmpty($this.find('#fname'))){
        result=false;
      }
      if(!validateEmail($this.find('#email'))) {
        result=false;
      }
      if(!checkEmpty($this.find('#mssg'))) {
        result=false;
      }

      if(result==false) {
        return false;
      }

      var $btn = $("#send").button('loading');

      var data = $this.serialize();

      $.ajax({
          url: "sender.php",
          type: "POST",
          data: data,
          cache: false,
          success: function (html) {
          	console.log(html);
              if (html==1) {
                  $('#result-message').addClass('alert alert-success').html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Success!</strong> Message Sent. We will contact with you soon.').delay(500).slideDown(500).delay(10000).slideUp('slow');

                  $btn.button('reset');

              } else {
                  $('#result-message').addClass('alert alert-danger').html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Error!</strong> Something went wrong ! Please try again').delay(500).slideDown(500).delay(10000).slideUp('slow');
                  $btn.button('reset');
              }
          },
          error: function (a, b) {
            if (b == 'error') {
              $('#result-message').addClass('alert alert-danger').html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Error!</strong> Something went wrong ! Please try again').delay(500).slideDown(500).delay(10000).slideUp('slow');
            };
            $btn.button('reset');
          }
      });

      return false;
    });

  });

if(window.ethereum) {
  window.ethereum.on('chainChanged', () => {
      window.location.reload();
  })    
  window.ethereum.on('accountsChanged', () => {
      window.location.reload();
  })
}