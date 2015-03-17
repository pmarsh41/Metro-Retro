;(function(exports){
    "use strict";

    Parse.MetroRouter = Parse.Router.extend({
        initialize: function(){
            this.home = new Parse.HomeView()
            this.category = new Parse.CategoryView()
            Parse.history.start()
        },
        routes: {
            "categories": "category",
            "categories/:name": "category",
            "*default": "home"
        },
        home: function(){
            this.home.render();
        },
        category: function(name){
            debugger;
            this.category.render()
        }
    })

    Parse.HomeView = Parse.TemplateView.extend({
        view: "landing-page",
        el: ".wrapper"
    })

    Parse.CategoryView = Parse.TemplateView.extend({
        view: "category-page",
        el: ".wrapper"
    })

    Parse.Category = Parse.Object.extend({
        className: "category",
        defaults: {
            name: "no name"
        }
    })

    Parse.CategoryCollection = Parse.Collection.extend({
        model: Parse.Category
    })

    Parse.Product =  Parse.Object.extend({
        className: "product",
        defaults: {
            categories: [],
            name: "no name"
        }
    })

    Parse.ProductCollection = Parse.Collection.extend({
        model: Parse.Product
    })

    // test creation
    // var midCentury = new Parse.Category({ name: "mid-century"})
    // midCentury.save().then(function(){
    //     var sweetChair = new Parse.Product({ name: "cool ass chair", categories: [midCentury] })
    //     sweetChair.save();
    // })



})(typeof module === "object" ? module.exports : window)