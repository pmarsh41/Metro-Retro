;(function(m){

    "use strict";

    Parse.MetroRouter = Parse.Router.extend({
        initialize: function(){




        }





    })

    function Person(name){
        this.name = name;
    }

    Person.prototype = {
        setName: function(name){
            this.name = name;
        }
    }

    m.Person = Person;

})(typeof module === "object" ? module.exports : window);