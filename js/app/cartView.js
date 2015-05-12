;(function(exports) {

    Parse.Router = Parse.Router.extend({
        cartView_loadShoppingCart: function() {
            window.scrollTo(0,0)
            var self = this
            this.pageLayout_checkNavBar()
            this.pageLayout_clearBreadCrumb();
            this.pageLayout_clearPagination();
            self.cartView.render();
            self.pageLayout_checkFooter();
        },  
     })
    
    Parse.ShoppingCartView = Parse.TemplateView.extend({
        view: 'shopping-cart',
        el: '.wrapper',
        events: {
            "click a.finalize-order-btn": "triggerFinalizeOrderHash",
            "click .tcell-remove-item i": "removeItemFromCart"
        },

        triggerFinalizeOrderHash: function(evt) {
            evt.preventDefault()
            console.log('hey')
            window.location.hash = "/finalize-order"
        },
        removeItemFromCart: function(evt) {
            evt.preventDefault();
            console.log('remove-item-cell-clicked')
            var tr = $(evt.target).closest('tr'),
                removedListingMR_ID = tr.attr('data-MRid')
            tr.remove()

            console.log(removedListingMR_ID)

            sessionStorage.setItem('MR-item-ID', removedListingMR_ID);
            this.trigger('itemRemoved');
        }

    })


    Parse.FinalizeOrderView = Parse.TemplateView.extend({
        view: 'finalize-order',
        el: '.wrapper',
        events: {
            "click .gotoStep2": "loadStep2" ,
            "click .confirm-purchase": "loadStep3" ,
            "click .l1": "loadStep1" ,
            "click .l2": "loadStep2" ,
            "click .l3": "loadStep3"
        },
        
        loadStep1: function(evt) {
            // cart functions
                // var pQuery = new Parse.Query(Parse.FurnitureItem)
                //     //...set query as equal to the MR_id
                // pQuery.equalTo('MR_id', 12509)
                //     //...then make the query
                // pQuery.find().then(function(model) {
                //     // model[0].set('price' , 8900).save()
                // })
            window.scrollTo(0,0)
            $('.stepsLabel').removeClass('inactive')
            $('.l1').addClass('inactive')
            $('.cartStep').removeClass('currentStep')
            $('.Step1').addClass('currentStep')
        },
        loadStep2: function(evt) {
            window.scrollTo(0,0)
            $('.stepsLabel').removeClass('inactive')
            $('.l2').addClass('inactive')
            $('.cartStep').removeClass('currentStep')
            $('.Step2').addClass('currentStep')
        },
        loadStep3: function(evt) {
            window.scrollTo(0,0)
            $('.stepsLabel').removeClass('inactive')
            $('.l3').addClass('inactive')
            $('.cartStep').removeClass('currentStep')
            // debugger
            var shipping;
            if ($('#FirstName').val() && $('#LastName').val() && $('#AddressLine1').val() && $('#City').val() && $('#State').val() && $('#Zip').val() && $('#Phone').val())
                shipping = JSON.stringify({
                    firstName    : $('#FirstName').val() ,
                    lastName     : $('#LastName').val() ,
                    address      : $('#AddressLine1').val() ,
                    city         : $('#City').val() ,
                    state        : $('#State').val() ,
                    zip          : $('#Zip').val() ,
                    phone        : $('#Phone').val()
                });



            var msgNode = $('.message');    // cache this node since we look it up often.
            
            msgNode.addClass('currentStep').css({textAlign:'center'}).html('please specify shipping information')
            
            var mrList = this.collection.map(function(d){return d.get('MR_id')}).join(',');
            if(shipping){
                if (mrList) {
                    msgNode.html('loading')
                    $('.Step3').attr('src' , 'http://blazinweb.com/test/token.asp?mr='+mrList+'&shipping='+encodeURIComponent(shipping))
                               .on('load',function() {

                                    if (!msgNode.hasClass('currentStep')) // don't show paypal if customer returned to step1 or step2
                                        return;

                                    msgNode.removeClass('currentStep');
                                    $('.Step3').addClass('currentStep');
                                });
                }
                else{
                    msgNode.html('cart is empty')

                }
            }

        } ,
        loadPayPal: function(evt) {
            // if($('#checkout').attr('data-status')==='inactive'){
            //     $('#checkout').attr('data-status','active')
            //     braintree.setup(
            //         // Replace this with a client token from your server
            //         "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiI3NDM0OGQwODUyMTYwMmQxYTI0YjgwNmY2M2RmYWMwYTc4OWY2MDA1M2IzNjkzNWM1OGJmMzA2NTExZTZjMmE2fGNyZWF0ZWRfYXQ9MjAxNS0wMy0zMFQwMTo1MTo1Mi4xOTkwMzgxMjMrMDAwMFx1MDAyNm1lcmNoYW50X2lkPWRjcHNweTJicndkanIzcW5cdTAwMjZwdWJsaWNfa2V5PTl3d3J6cWszdnIzdDRuYzgiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvZGNwc3B5MmJyd2RqcjNxbi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL2RjcHNweTJicndkanIzcW4vY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIn0sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsInRocmVlRFNlY3VyZSI6eyJsb29rdXBVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvZGNwc3B5MmJyd2RqcjNxbi90aHJlZV9kX3NlY3VyZS9sb29rdXAifSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQiLCJtZXJjaGFudEFjY291bnRJZCI6InN0Y2gybmZkZndzenl0dzUiLCJjdXJyZW5jeUlzb0NvZGUiOiJVU0QifSwiY29pbmJhc2VFbmFibGVkIjp0cnVlLCJjb2luYmFzZSI6eyJjbGllbnRJZCI6IjExZDI3MjI5YmE1OGI1NmQ3ZTNjMDFhMDUyN2Y0ZDViNDQ2ZDRmNjg0ODE3Y2I2MjNkMjU1YjU3M2FkZGM1OWIiLCJtZXJjaGFudEFjY291bnQiOiJjb2luYmFzZS1kZXZlbG9wbWVudC1tZXJjaGFudEBnZXRicmFpbnRyZWUuY29tIiwic2NvcGVzIjoiYXV0aG9yaXphdGlvbnM6YnJhaW50cmVlIHVzZXIiLCJyZWRpcmVjdFVybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tL2NvaW5iYXNlL29hdXRoL3JlZGlyZWN0LWxhbmRpbmcuaHRtbCJ9LCJtZXJjaGFudElkIjoiZGNwc3B5MmJyd2RqcjNxbiIsInZlbm1vIjoib2ZmbGluZSIsImFwcGxlUGF5Ijp7InN0YXR1cyI6Im1vY2siLCJjb3VudHJ5Q29kZSI6IlVTIiwiY3VycmVuY3lDb2RlIjoiVVNEIiwibWVyY2hhbnRJZGVudGlmaWVyIjoibWVyY2hhbnQuY29tLmJyYWludHJlZXBheW1lbnRzLmRldi1kY29wZWxhbmQiLCJzdXBwb3J0ZWROZXR3b3JrcyI6WyJ2aXNhIiwibWFzdGVyY2FyZCIsImFtZXgiXX19",
            //         'dropin', {
            //             container: 'dropin'
            //         });
            // }
        }

        // triggerThanksHash: function(evt) {
        //     evt.preventDefault()
        //     console.log('hey')
        //     window.location.hash = "/thankyou"
        // }
    })

    exports.Parse.Router = Parse.Router
    exports.Parse.ShoppingCartView = Parse.ShoppingCartView

})(typeof module === "object" ? module.exports : window);

