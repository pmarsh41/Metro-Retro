window.onload = app;

Array.prototype.sum = function(len){
    len = (len||2)
    var total = 0;
    for (var i = 0 , ii = this.length ; i<ii ; ++i) {
        if(isNaN(this[i]))
            this[i] = 0;
        total += parseInt((Number(this[i]) * 10000)+.01)
    }
    
    return Number((total/10000).toFixed(len));
}
// runs when the DOM is loaded
function app(){
    "use strict";

    // uncomment the following line to cache CSS/JS files loaded by loader in localStorage
    // NOTE: you may need to turn this off while developing
    // loader.textInjection = true;

    // load some scripts (uses promises :D)
    loader.load(
        //css
        {url: "./dist/style.css"},
        //js
        {url: "./bower_components/jquery/dist/jquery.min.js"},
        {url: "./bower_components/lodash/lodash.min.js"},

        // when using just Backbone, use this line
        // {url: "./bower_components/backbone/backbone.js"},
        // when using Parse, comment out the above line and uncomment the line below
        {url: "./bower_components/parse-js-sdk/lib/parse.min.js"},

        // when using React (and the plugin JSnoX), uncomment the following two lines
        // {url: "./bower_components/react/react.min.js"},
        // {url: "./bower_components/jsnox/jsnox.js"},

        // other stuff
        // -------------
        // bootstrap carousel
        {url: "./bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/carousel.js"},
        {url: "./bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/collapse.js"},

        {url: "./bower_components/pace/pace.min.js"},
        {url: "./js/TemplateView.js"}

        //my app
        //
        ,{url: "./js/utility/utilityFunctions.js"}

        ,{url: "./js/app/models.js"}

        ,{url: "./js/app/adminView.js"}
        ,{url: "./js/app/categoriesView.js"}
        ,{url: "./js/app/cartView.js"}
        ,{url: "./js/app/employeeViews.js"}
        ,{url: "./js/app/homeView.js"}
        //Phil's Change
        ,{url: "./js/app/miscViews.js"}
        //alex's change
        ,{url: "./js/app/multiView.js"}
        ,{url: "./js/app/pageLayoutElements.js"}
        ,{url: "./js/app/singleView.js"}
        ,{url: "./js/Client.js"}

        //DATA SCRIPTS
        // ,{url: "./data/INPUT-totalSet.js"}
        // ,{url: "./data/INPUT-jpegData.js"}
        // ,{url: "./data/INPUT-productInfo.js"}
        // ,{url: "./data/EXECUTE-GenerateParseData.js"}
        ,{url: "./js/db/databaseFunctions.js"}

        ,{url: "./data/scripts-organizeCategories/categoryMap2.js"}
        ,{url: "./data/scripts-organizeCategories/allCategories.js"}


    ).then(function(){
        // if turning on JSnoX, uncommment the following line
        // window.d = jsnox(React);
        // if turning on React, uncomment the following line
        // React.initializeTouchEvents(true);
        document.querySelector("html").style.opacity = 1;

        // start app?
        Parse.initialize('8cefZxGY6FiSAhEw5YCwN9mBjgoiUgGcdJnTZgdy','RWjs5EKsDkBlZ1L05crkUetjonIG1DGNiaM664OY');

        // console.log(dataArrayToUpload)
        // dbManagement.uploadInventoryToParse(dataArrayToUpload)
        // dbManagement.editArrayData(4999,8000,dbManagement._queryEditAndSaveKeyWords)
        // dbManagement.editArrayData(8000,14405,dbManagement._queryEditAndSaveInventoryQuantity)
        //
        //----------------
        // Start App
        //---------------
        var beginApp = new PageRouter();



            // Awesomplete - Lea Verou - MIT license
(function(){function m(a,b){for(var c in a){var g=a[c],e=this.input.getAttribute("data-"+c.toLowerCase());this[c]="number"===typeof g?parseInt(e):!1===g?null!==e:g instanceof Function?null:e;this[c]||0===this[c]||(this[c]=c in b?b[c]:g)}}function d(a,b){return"string"===typeof a?(b||document).querySelector(a):a||null}function h(a,b){return k.call((b||document).querySelectorAll(a))}function l(){h("input.awesomplete").forEach(function(a){new Awesomplete(a)})}var f=function(a,b){var c=this;this.input=
d(a);this.input.setAttribute("autocomplete","off");this.input.setAttribute("aria-autocomplete","list");b=b||{};m.call(this,{minChars:2,maxItems:10,autoFirst:!1,filter:f.FILTER_CONTAINS,sort:f.SORT_BYLENGTH,item:function(a,b){return d.create("li",{innerHTML:a.replace(RegExp(d.regExpEscape(b.trim()),"gi"),"<mark>$&</mark>"),"aria-selected":"false"})},replace:function(a){this.input.value=a}},b);this.index=-1;this.container=d.create("div",{className:"awesomplete",around:a});this.ul=d.create("ul",{hidden:"",
inside:this.container});this.status=d.create("span",{className:"visually-hidden",role:"status","aria-live":"assertive","aria-relevant":"additions",inside:this.container});d.bind(this.input,{input:this.evaluate.bind(this),blur:this.close.bind(this),keydown:function(a){var b=a.keyCode;if(c.opened)if(13===b&&c.selected)a.preventDefault(),c.select();else if(27===b)c.close();else if(38===b||40===b)a.preventDefault(),c[38===b?"previous":"next"]()}});d.bind(this.input.form,{submit:this.close.bind(this)});
d.bind(this.ul,{mousedown:function(a){a=a.target;if(a!==this){for(;a&&!/li/i.test(a.nodeName);)a=a.parentNode;a&&c.select(a)}}});this.input.hasAttribute("list")?(this.list="#"+a.getAttribute("list"),a.removeAttribute("list")):this.list=this.input.getAttribute("data-list")||b.list||[];f.all.push(this)};f.prototype={set list(a){Array.isArray(a)?this._list=a:"string"===typeof a&&-1<a.indexOf(",")?this._list=a.split(/\s*,\s*/):(a=d(a))&&a.children&&(this._list=k.apply(a.children).map(function(a){return a.textContent.trim()}));
document.activeElement===this.input&&this.evaluate()},get selected(){return-1<this.index},get opened(){return this.ul&&null==this.ul.getAttribute("hidden")},close:function(){this.ul.setAttribute("hidden","");this.index=-1;d.fire(this.input,"awesomplete-close")},open:function(){this.ul.removeAttribute("hidden");this.autoFirst&&-1===this.index&&this.goto(0);d.fire(this.input,"awesomplete-open")},next:function(){this.goto(this.index<this.ul.children.length-1?this.index+1:-1)},previous:function(){var a=
this.ul.children.length;this.goto(this.selected?this.index-1:a-1)},goto:function(a){var b=this.ul.children;this.selected&&b[this.index].setAttribute("aria-selected","false");this.index=a;-1<a&&0<b.length&&(b[a].setAttribute("aria-selected","true"),this.status.textContent=b[a].textContent);d.fire(this.input,"awesomplete-highlight")},select:function(a){if(a=a||this.ul.children[this.index]){var b;d.fire(this.input,"awesomplete-select",{text:a.textContent,preventDefault:function(){b=!0}});b||(this.replace(a.textContent),
this.close(),d.fire(this.input,"awesomplete-selectcomplete"))}},evaluate:function(){var a=this,b=this.input.value;b.length>=this.minChars&&0<this._list.length?(this.index=-1,this.ul.innerHTML="",this._list.filter(function(c){return a.filter(c,b)}).sort(this.sort).every(function(c,d){a.ul.appendChild(a.item(c,b));return d<a.maxItems-1}),0===this.ul.children.length?this.close():this.open()):this.close()}};f.all=[];f.FILTER_CONTAINS=function(a,b){return RegExp(d.regExpEscape(b.trim()),"i").test(a)};
f.FILTER_STARTSWITH=function(a,b){return RegExp("^"+d.regExpEscape(b.trim()),"i").test(a)};f.SORT_BYLENGTH=function(a,b){return a.length!==b.length?a.length-b.length:a<b?-1:1};var k=Array.prototype.slice;d.create=function(a,b){var c=document.createElement(a),g;for(g in b){var e=b[g];"inside"===g?d(e).appendChild(c):"around"===g?(e=d(e),e.parentNode.insertBefore(c,e),c.appendChild(e)):g in c?c[g]=e:c.setAttribute(g,e)}return c};d.bind=function(a,b){if(a)for(var c in b){var d=b[c];c.split(/\s+/).forEach(function(b){a.addEventListener(b,
d)})}};d.fire=function(a,b,c){var d=document.createEvent("HTMLEvents");d.initEvent(b,!0,!0);for(var e in c)d[e]=c[e];a.dispatchEvent(d)};d.regExpEscape=function(a){return a.replace(/[-\\^$*+?.()|[\]{}]/g,"\\$&")};"undefined"!==typeof Document&&("loading"!==document.readyState?l():document.addEventListener("DOMContentLoaded",l));f.$=d;f.$$=h;"undefined"!==typeof self&&(self.Awesomplete=f);"object"===typeof exports&&(module.exports=f);return f})();



var $a = Awesomplete.$;
var $$ = Awesomplete.$$;

// document.addEventListener("DOMContentLoaded", function() {
    _.delay(function(){
    $('.fa-search').on('click',function(){
    _.delay(function(){
        debugger
    var nav = $a("nav")
    $$("section > h1").forEach(function (h1) {
        if (h1.parentNode.id) {
            $a.create("a", {
                href: "#" + h1.parentNode.id,
                textContent: h1.textContent.replace(/\(.+?\)/g, ""),
                inside: nav
            });
        }
    });
    } , 1000)
        // console.log('d')
    })
    } , 1000)
// });
// alert()
    })

}