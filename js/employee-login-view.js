;
(function(exports) {
    "use strict";
    Parse.EmployeeLoginView = Parse.TemplateView.extend({
        view: 'employee-login',
        el: '.wrapper',

        events: {
            "click .employee-login-btn": 'verifyPassword'
        },


        verifyPassword: function(evt) {
            evt.preventDefault();

            var loginName = $('login-name').val()
            var passwordValue = $('#login-password').val()

            console.log([loginName, passwordValue])

            Parse.User.logIn(loginName, passwordValue)
                .then(function(parseUser) {
                    if (parseUser.get('role') === 'employee') {
                        window.location.hash = '/employee/login';
                    } else {
                        parseUser.logOut();
                        $('.response-msg').text("User is not an admin").fadeIn();
                    }
                })

            .fail(function(error) {
                $('.response-msg').text("Username doesn't exist or password is invalid").fadeIn();
            })
        }
    })

    exports.Parse.EmployeeLoginView = Parse.EmployeeLoginView


})(typeof module === "object" ? module.exports : window);
