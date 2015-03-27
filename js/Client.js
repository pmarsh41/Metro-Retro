;
(function(exports) {
"use strict";


//Utility Functions
    function numberCommaSeparated(num, spaceOption){
       
        var num = num.toFixed()
        var digitLength = num.length

        var numArray = num.split('')
        var commaSeparated = []

        if (digitLength < 4 ){return numArray.join('')} 

        for(var i = 0; i < num.length ;i++)
             if( (i+1) % 3 === 0 ){
                commaSeparated.unshift(numArray.pop())
                commaSeparated.unshift(',')
             } else {
                commaSeparated.unshift(numArray.pop())
             }
        var newnum = commaSeparated.join('')
        return newnum
        
        }

    

    function resetField(el){
        el.wrap('<form>').parent('form').trigger('reset');
        el.unwrap();
    }



    var dummyData = [
        {
            "MR_id": "MR73341",
            "index": 0,
            "price": 1684,
            "description": "tempor in duis fugiat cupidatat excepteur ut reprehenderit adipisicing veniam magna anim in ad anim",
            "category": "sideChair",
            "item": "Holt sideChair",
            "image": "baughman.jpg"
        }, {
            "MR_id": "MR58456",
            "index": 1,
            "price": 1601,
            "description": "labore culpa non aute commodo laborum voluptate id eiusmod amet culpa consequat officia deserunt culpa",
            "category": "sofa",
            "item": "Harrison sofa",
            "image": "badilkjairdesk.jpg"
        }, {
            "MR_id": "MR82175",
            "index": 2,
            "price": 3741,
            "description": "do est est anim eiusmod deserunt excepteur in nisi ipsum proident aliqua aute fugiat eiusmod",
            "category": "loungeChair",
            "item": "Frost loungeChair",
            "image": "rowlandchairs.jpg"
        }, {
            "MR_id": "MR97348",
            "index": 3,
            "price": 6045,
            "description": "minim et do sint velit esse velit anim duis minim cillum qui et fugiat in",
            "category": "nightstand",
            "item": "Finley nightstand",
            "image": "badilkjairdesk.jpg"
        }, {
            "MR_id": "MR79104",
            "index": 4,
            "price": 6756,
            "description": "qui sit tempor id excepteur fugiat consequat culpa et sunt dolore aliqua minim consequat ipsum",
            "category": "diningTable",
            "item": "Ochoa diningTable",
            "image": "gonzocredenza.jpg"
        }, {
            "MR_id": "MR29432",
            "index": 5,
            "price": 3828,
            "description": "eu velit aute anim voluptate non occaecat consequat proident magna incididunt dolor mollit fugiat laboris",
            "category": "loungeChair",
            "item": "Cleveland loungeChair",
            "image": "gonzochair.jpg"
        }, {
            "MR_id": "MR53644",
            "index": 6,
            "price": 7175,
            "description": "culpa aute enim velit tempor nisi consequat est aliquip exercitation anim excepteur officia commodo proident",
            "category": "officeChair",
            "item": "Orr officeChair",
            "image": "badilkjairdesk.jpg"
        }, {
            "MR_id": "MR82062",
            "index": 7,
            "price": 4877,
            "description": "anim Lorem ad amet Lorem ullamco fugiat dolor consectetur esse eu ipsum officia incididunt eu",
            "category": "sideChair",
            "item": "Ramirez sideChair",
            "image": "knolltable.jpg"
        }, {
            "MR_id": "MR55725",
            "index": 8,
            "price": 4837,
            "description": "esse culpa consectetur et consequat laborum dolor elit voluptate commodo elit irure ut esse aute",
            "category": "sideChair",
            "item": "Vazquez sideChair",
            "image": "eameslounge.jpg"
        }, {
            "MR_id": "MR24288",
            "index": 9,
            "price": 6018,
            "description": "quis labore reprehenderit minim anim quis dolor mollit aliquip velit tempor nisi sint id aliqua",
            "category": "loungeChair",
            "item": "Williams loungeChair",
            "image": "knolltable.jpg"
        }, {
            "MR_id": "MR58244",
            "index": 10,
            "price": 756,
            "description": "excepteur reprehenderit ullamco irure eu eu commodo consectetur ad duis pariatur cillum sunt consequat excepteur",
            "category": "diningTable",
            "item": "Gray diningTable",
            "image": "saarinen.jpg"
        }, {
            "MR_id": "MR23913",
            "index": 11,
            "price": 6739,
            "description": "ex dolor pariatur duis reprehenderit et dolor culpa et duis id nulla esse amet ea",
            "category": "diningTable",
            "item": "Day diningTable",
            "image": "ionchairorangered.jpg"
        }, {
            "MR_id": "MR37934",
            "index": 12,
            "price": 1467,
            "description": "laborum amet enim deserunt adipisicing Lorem pariatur dolore eu dolore aliqua esse quis excepteur adipisicing",
            "category": "dresser",
            "item": "Rodgers dresser",
            "image": "gonzocredenza.jpg"
        }, {
            "MR_id": "MR38132",
            "index": 13,
            "price": 4655,
            "description": "minim consequat laborum dolor proident culpa aute officia sit exercitation cillum est eiusmod laborum fugiat",
            "category": "sideChair",
            "item": "Lowery sideChair",
            "image": "girardchair.jpg"
        }, {
            "MR_id": "MR37587",
            "index": 14,
            "price": 5291,
            "description": "ea excepteur deserunt esse deserunt ullamco tempor non eiusmod duis excepteur tempor consectetur culpa dolore",
            "category": "diningTable",
            "item": "Cole diningTable",
            "image": "girardchair.jpg"
        }, {
            "MR_id": "MR86764",
            "index": 15,
            "price": 5763,
            "description": "nulla consequat ex aliquip cillum incididunt do culpa sint eiusmod culpa dolore nisi non nostrud",
            "category": "loungeChair",
            "item": "Fields loungeChair",
            "image": "ionchairorangered.jpg"
        }, {
            "MR_id": "MR70961",
            "index": 16,
            "price": 6195,
            "description": "ut fugiat est dolor officia et reprehenderit aliquip laborum aliquip voluptate reprehenderit nisi dolore laborum",
            "category": "coffeeTable",
            "item": "Kerr coffeeTable",
            "image": "girardchair.jpg"
        }, {
            "MR_id": "MR27155",
            "index": 17,
            "price": 5011,
            "description": "culpa sunt tempor nulla consectetur culpa anim exercitation excepteur eiusmod amet sit aliqua ea eiusmod",
            "category": "chair",
            "item": "Miranda chair",
            "image": "baughman.jpg"
        }, {
            "MR_id": "MR41714",
            "index": 18,
            "price": 5049,
            "description": "aliquip dolor ullamco irure amet excepteur eu dolor ea exercitation cillum veniam qui adipisicing aute",
            "category": "sideChair",
            "item": "Gay sideChair",
            "image": "eameslounge.jpg"
        }, {
            "MR_id": "MR90485",
            "index": 19,
            "price": 7486,
            "description": "et velit tempor do aute reprehenderit culpa consectetur exercitation aliquip sint voluptate laboris enim est",
            "category": "chair",
            "item": "Poole chair",
            "image": "ionchairorangered.jpg"
        }, {
            "MR_id": "MR58255",
            "index": 20,
            "price": 2781,
            "description": "commodo aliquip commodo adipisicing dolore occaecat non pariatur enim excepteur consequat ex veniam dolore cillum",
            "category": "credenza",
            "item": "Blevins credenza",
            "image": "saarinen.jpg"
        }, {
            "MR_id": "MR23068",
            "index": 21,
            "price": 6499,
            "description": "irure est veniam sit eu occaecat et aliquip aliquip dolor in est qui est aliquip",
            "category": "officeChair",
            "item": "Kramer officeChair",
            "image": "ionchairorangered.jpg"
        }, {
            "MR_id": "MR66191",
            "index": 22,
            "price": 732,
            "description": "aliqua exercitation sunt ea dolor deserunt exercitation velit dolore velit consectetur non duis nisi elit",
            "category": "bedFrame",
            "item": "Barnes bedFrame",
            "image": "rowlandchairs.jpg"
        }, {
            "MR_id": "MR49433",
            "index": 23,
            "price": 6841,
            "description": "qui cupidatat reprehenderit qui sit laborum minim nulla magna et reprehenderit sint ipsum mollit ad",
            "category": "dresser",
            "item": "Walter dresser",
            "image": "ionchairorangered.jpg"
        }, {
            "MR_id": "MR88902",
            "index": 24,
            "price": 2169,
            "description": "est nostrud consectetur ex anim labore proident deserunt nulla consequat incididunt consequat pariatur magna exercitation",
            "category": "chair",
            "item": "Frazier chair",
            "image": "knolltable.jpg"
        }, {
            "MR_id": "MR84572",
            "index": 25,
            "price": 7578,
            "description": "ut elit amet proident et officia consequat aute voluptate qui culpa id voluptate in aute",
            "category": "officeChair",
            "item": "Dunlap officeChair",
            "image": "saarinen.jpg"
        }, {
            "MR_id": "MR48284",
            "index": 26,
            "price": 4268,
            "description": "aute eiusmod aliquip in velit esse cillum minim anim ea est commodo dolore mollit consequat",
            "category": "coffeeTable",
            "item": "Rosario coffeeTable",
            "image": "knolltable.jpg"
        }, {
            "MR_id": "MR90687",
            "index": 27,
            "price": 2547,
            "description": "eiusmod nisi incididunt sit proident sit occaecat minim sunt incididunt officia et aute sit eu",
            "category": "officeChair",
            "item": "Cardenas officeChair",
            "image": "eameslounge.jpg"
        }, {
            "MR_id": "MR15020",
            "index": 28,
            "price": 1354,
            "description": "officia exercitation nisi elit reprehenderit laboris incididunt sint aute aliqua ad elit velit velit non",
            "category": "dresser",
            "item": "Brown dresser",
            "image": "gonzochair.jpg"
        }, {
            "MR_id": "MR96257",
            "index": 29,
            "price": 1201,
            "description": "fugiat dolor tempor exercitation irure adipisicing laborum amet minim consectetur aute nisi anim et reprehenderit",
            "category": "officeChair",
            "item": "Macias officeChair",
            "image": "gonzochair.jpg"
        }, {
            "MR_id": "MR78300",
            "index": 30,
            "price": 7301,
            "description": "ex amet laborum irure consequat magna fugiat sit ea deserunt ex laborum Lorem aliquip laboris",
            "category": "bedFrame",
            "item": "Booker bedFrame",
            "image": "baughman.jpg"
        }, {
            "MR_id": "MR47196",
            "index": 31,
            "price": 7290,
            "description": "laboris labore ea cillum enim eiusmod sunt Lorem sint fugiat irure dolore magna mollit nisi",
            "category": "bedFrame",
            "item": "Zamora bedFrame",
            "image": "baughman.jpg"
        }, {
            "MR_id": "MR29598",
            "index": 32,
            "price": 3827,
            "description": "tempor id Lorem enim enim ex duis aute id voluptate ad laborum ipsum minim pariatur",
            "category": "dresser",
            "item": "Odom dresser",
            "image": "gonzochair.jpg"
        }, {
            "MR_id": "MR48695",
            "index": 33,
            "price": 2286,
            "description": "commodo consequat elit sit pariatur incididunt id elit Lorem et tempor et excepteur anim nisi",
            "category": "credenza",
            "item": "Vang credenza",
            "image": "baughman.jpg"
        }, {
            "MR_id": "MR13695",
            "index": 34,
            "price": 7574,
            "description": "ut veniam tempor elit cupidatat voluptate labore enim velit cupidatat non fugiat in id laborum",
            "category": "dresser",
            "item": "Brady dresser",
            "image": "eameslounge.jpg"
        }, {
            "MR_id": "MR87641",
            "index": 35,
            "price": 7891,
            "description": "laboris irure non adipisicing sunt aliquip ex incididunt sint aute nulla non proident ipsum deserunt",
            "category": "sofa",
            "item": "Mullen sofa",
            "image": "gonzocredenza.jpg"
        }, {
            "MR_id": "MR39847",
            "index": 36,
            "price": 5976,
            "description": "cupidatat id amet fugiat magna nostrud do voluptate cupidatat velit labore aute ipsum laborum aute",
            "category": "coffeeTable",
            "item": "Hutchinson coffeeTable",
            "image": "gonzocredenza.jpg"
        }, {
            "MR_id": "MR90670",
            "index": 37,
            "price": 5374,
            "description": "tempor anim pariatur occaecat eu labore tempor nostrud proident est aliquip cupidatat do do ex",
            "category": "nightstand",
            "item": "Albert nightstand",
            "image": "rowlandchairs.jpg"
        }, {
            "MR_id": "MR96656",
            "index": 38,
            "price": 6315,
            "description": "excepteur mollit quis ad non sint amet et laboris esse ipsum est Lorem et non",
            "category": "sofa",
            "item": "Boyd sofa",
            "image": "girardchair.jpg"
        }, {
            "MR_id": "MR61103",
            "index": 39,
            "price": 6360,
            "description": "ad est deserunt id commodo ipsum incididunt sit in commodo irure deserunt cupidatat minim pariatur",
            "category": "loungeChair",
            "item": "Avery loungeChair",
            "image": "ionchairorangered.jpg"
        }, {
            "MR_id": "MR72644",
            "index": 40,
            "price": 5478,
            "description": "nostrud consequat officia amet consectetur sunt excepteur Lorem sint culpa ut cillum anim non ipsum",
            "category": "sofa",
            "item": "Joyce sofa",
            "image": "rowlandchairs.jpg"
        }, {
            "MR_id": "MR11494",
            "index": 41,
            "price": 3501,
            "description": "officia sunt deserunt laborum proident eu quis reprehenderit incididunt voluptate culpa velit deserunt anim cillum",
            "category": "loungeChair",
            "item": "Blanchard loungeChair",
            "image": "ionchairorangered.jpg"
        }, {
            "MR_id": "MR96965",
            "index": 42,
            "price": 4941,
            "description": "eiusmod culpa reprehenderit reprehenderit sunt laborum incididunt quis consectetur incididunt excepteur do et occaecat dolore",
            "category": "sofa",
            "item": "Nelson sofa",
            "image": "baughman.jpg"
        }, {
            "MR_id": "MR97407",
            "index": 43,
            "price": 6603,
            "description": "exercitation eiusmod exercitation aute do magna sunt pariatur sunt eu voluptate nostrud ullamco aliquip qui",
            "category": "diningTable",
            "item": "Rhodes diningTable",
            "image": "knolltable.jpg"
        }, {
            "MR_id": "MR42333",
            "index": 44,
            "price": 5633,
            "description": "ipsum sunt commodo sit nostrud magna ipsum deserunt qui mollit cillum esse sint nostrud excepteur",
            "category": "loungeChair",
            "item": "Luna loungeChair",
            "image": "girardchair.jpg"
        }, {
            "MR_id": "MR14033",
            "index": 45,
            "price": 7686,
            "description": "esse sit fugiat anim fugiat adipisicing duis duis magna labore excepteur in Lorem laboris minim",
            "category": "sideChair",
            "item": "Pope sideChair",
            "image": "gonzocredenza.jpg"
        }, {
            "MR_id": "MR38274",
            "index": 46,
            "price": 4643,
            "description": "id nostrud mollit nulla ut esse aute enim irure nulla minim esse quis pariatur do",
            "category": "sofa",
            "item": "Delacruz sofa",
            "image": "gonzochair.jpg"
        }, {
            "MR_id": "MR24298",
            "index": 47,
            "price": 839,
            "description": "cupidatat reprehenderit laborum sit proident do ex mollit aliqua ipsum excepteur deserunt quis ea reprehenderit",
            "category": "sideChair",
            "item": "Watkins sideChair",
            "image": "girardchair.jpg"
        }, {
            "MR_id": "MR57686",
            "index": 48,
            "price": 1472,
            "description": "aliqua sint ad enim id aliqua do officia id anim mollit occaecat consequat duis do",
            "category": "chair",
            "item": "Cline chair",
            "image": "rowlandchairs.jpg"
        }, {
            "MR_id": "MR91294",
            "index": 49,
            "price": 7351,
            "description": "voluptate in non laborum incididunt dolore dolore sint elit adipisicing nulla deserunt id duis laborum",
            "category": "officeChair",
            "item": "Bolton officeChair",
            "image": "eameslounge.jpg"
        }, {
            "MR_id": "MR56308",
            "index": 50,
            "price": 5047,
            "description": "occaecat est labore mollit est et minim veniam do velit pariatur mollit laborum amet cupidatat",
            "category": "sofa",
            "item": "Guthrie sofa",
            "image": "badilkjairdesk.jpg"
        }, {
            "MR_id": "MR37662",
            "index": 51,
            "price": 7305,
            "description": "eiusmod eu elit pariatur in laborum sit ea labore consectetur id et aute consequat excepteur",
            "category": "officeChair",
            "item": "Navarro officeChair",
            "image": "baughman.jpg"
        }, {
            "MR_id": "MR45836",
            "index": 52,
            "price": 3214,
            "description": "deserunt enim consequat pariatur Lorem veniam laborum cupidatat quis cupidatat dolor anim voluptate id ad",
            "category": "officeChair",
            "item": "Carver officeChair",
            "image": "saarinen.jpg"
        }, {
            "MR_id": "MR94084",
            "index": 53,
            "price": 7322,
            "description": "voluptate sunt irure occaecat nostrud aliqua adipisicing consectetur sunt et ut nostrud ea sit minim",
            "category": "officeChair",
            "item": "Garrett officeChair",
            "image": "rowlandchairs.jpg"
        }, {
            "MR_id": "MR69490",
            "index": 54,
            "price": 1517,
            "description": "laborum aliqua minim amet eiusmod do dolore minim excepteur est nulla adipisicing nisi elit occaecat",
            "category": "loungeChair",
            "item": "Morse loungeChair",
            "image": "rowlandchairs.jpg"
        }, {
            "MR_id": "MR24108",
            "index": 55,
            "price": 5620,
            "description": "non amet officia cillum eu ea sit officia eu magna labore mollit minim magna pariatur",
            "category": "sideChair",
            "item": "Shaw sideChair",
            "image": "gonzocredenza.jpg"
        }, {
            "MR_id": "MR79538",
            "index": 56,
            "price": 2139,
            "description": "veniam nostrud ullamco nisi sunt reprehenderit tempor nisi exercitation Lorem incididunt excepteur commodo nulla nisi",
            "category": "credenza",
            "item": "Walker credenza",
            "image": "baughman.jpg"
        }, {
            "MR_id": "MR76104",
            "index": 57,
            "price": 5395,
            "description": "officia velit do officia do sunt qui labore fugiat quis commodo id fugiat cupidatat pariatur",
            "category": "dresser",
            "item": "Johnson dresser",
            "image": "saarinen.jpg"
        }, {
            "MR_id": "MR91838",
            "index": 58,
            "price": 7205,
            "description": "officia esse labore incididunt sit do ullamco irure deserunt consequat aute amet pariatur esse nulla",
            "category": "nightstand",
            "item": "Frank nightstand",
            "image": "gonzochair.jpg"
        }, {
            "MR_id": "MR96800",
            "index": 59,
            "price": 2302,
            "description": "est exercitation ullamco magna voluptate ullamco nulla incididunt aliqua consectetur eu quis sunt cillum amet",
            "category": "diningTable",
            "item": "Barnett diningTable",
            "image": "eameslounge.jpg"
        }, {
            "MR_id": "MR24115",
            "index": 60,
            "price": 5117,
            "description": "excepteur ex consequat sunt duis magna amet do tempor occaecat cillum reprehenderit duis commodo id",
            "category": "credenza",
            "item": "Hunter credenza",
            "image": "ionchairorangered.jpg"
        }, {
            "MR_id": "MR47815",
            "index": 61,
            "price": 1004,
            "description": "eiusmod officia nisi officia cupidatat velit nostrud quis esse culpa ullamco non incididunt incididunt laborum",
            "category": "diningTable",
            "item": "Conway diningTable",
            "image": "gonzocredenza.jpg"
        }, {
            "MR_id": "MR19486",
            "index": 62,
            "price": 3788,
            "description": "magna qui in ea commodo non Lorem ea qui ut mollit esse ipsum ea minim",
            "category": "officeChair",
            "item": "Young officeChair",
            "image": "saarinen.jpg"
        }, {
            "MR_id": "MR23673",
            "index": 63,
            "price": 6026,
            "description": "voluptate eu laborum veniam voluptate incididunt eiusmod fugiat dolore deserunt consectetur labore voluptate incididunt cillum",
            "category": "dresser",
            "item": "Rose dresser",
            "image": "badilkjairdesk.jpg"
        }, {
            "MR_id": "MR95884",
            "index": 64,
            "price": 1464,
            "description": "ex est ipsum culpa occaecat nisi esse in consectetur enim ad deserunt consectetur et ex",
            "category": "coffeeTable",
            "item": "Reilly coffeeTable",
            "image": "ionchairorangered.jpg"
        }, {
            "MR_id": "MR36609",
            "index": 65,
            "price": 1028,
            "description": "fugiat sunt fugiat aute est deserunt elit minim ea ullamco do dolor proident culpa culpa",
            "category": "credenza",
            "item": "Pennington credenza",
            "image": "baughman.jpg"
        }, {
            "MR_id": "MR59942",
            "index": 66,
            "price": 6146,
            "description": "labore commodo proident ullamco enim pariatur pariatur nisi cillum qui aute sit labore exercitation cillum",
            "category": "coffeeTable",
            "item": "Bennett coffeeTable",
            "image": "gonzochair.jpg"
        }, {
            "MR_id": "MR63467",
            "index": 67,
            "price": 6962,
            "description": "in fugiat dolor velit nulla ad laborum ex irure irure adipisicing sunt commodo consequat tempor",
            "category": "loungeChair",
            "item": "Nixon loungeChair",
            "image": "girardchair.jpg"
        }, {
            "MR_id": "MR93630",
            "index": 68,
            "price": 7757,
            "description": "duis veniam dolore magna cillum anim eu amet magna qui exercitation aliqua elit in veniam",
            "category": "diningTable",
            "item": "Edwards diningTable",
            "image": "rowlandchairs.jpg"
        }, {
            "MR_id": "MR15970",
            "index": 69,
            "price": 1545,
            "description": "sint enim occaecat veniam magna ex tempor sint ut dolore enim nostrud laboris officia voluptate",
            "category": "coffeeTable",
            "item": "Underwood coffeeTable",
            "image": "girardchair.jpg"
        }, {
            "MR_id": "MR67592",
            "index": 70,
            "price": 3171,
            "description": "amet est ipsum dolore cillum id id pariatur ipsum aute consectetur commodo aliqua dolore in",
            "category": "coffeeTable",
            "item": "Horton coffeeTable",
            "image": "eameslounge.jpg"
        }, {
            "MR_id": "MR33640",
            "index": 71,
            "price": 6967,
            "description": "adipisicing occaecat laborum voluptate adipisicing amet fugiat aute laborum occaecat enim adipisicing sit Lorem eu",
            "category": "nightstand",
            "item": "White nightstand",
            "image": "eameslounge.jpg"
        }, {
            "MR_id": "MR30495",
            "index": 72,
            "price": 6577,
            "description": "officia voluptate enim occaecat sunt ullamco consequat anim officia et occaecat laboris ea ut aute",
            "category": "diningTable",
            "item": "Bullock diningTable",
            "image": "gonzochair.jpg"
        }, {
            "MR_id": "MR65861",
            "index": 73,
            "price": 1527,
            "description": "occaecat minim commodo nisi sint elit do sunt amet id consectetur ut ad non elit",
            "category": "bedFrame",
            "item": "Bowen bedFrame",
            "image": "gonzochair.jpg"
        }, {
            "MR_id": "MR61728",
            "index": 74,
            "price": 5540,
            "description": "nostrud quis exercitation adipisicing aliqua duis culpa ad occaecat fugiat nostrud ex elit nulla eiusmod",
            "category": "nightstand",
            "item": "Pickett nightstand",
            "image": "saarinen.jpg"
        }, {
            "MR_id": "MR58057",
            "index": 75,
            "price": 2278,
            "description": "magna aliqua nisi aute labore veniam tempor occaecat excepteur excepteur minim deserunt officia est sit",
            "category": "diningTable",
            "item": "Byrd diningTable",
            "image": "baughman.jpg"
        }, {
            "MR_id": "MR90692",
            "index": 76,
            "price": 3653,
            "description": "laborum officia aliquip ullamco elit ipsum voluptate sunt velit incididunt sunt nostrud elit exercitation exercitation",
            "category": "sofa",
            "item": "Parks sofa",
            "image": "gonzocredenza.jpg"
        }, {
            "MR_id": "MR25024",
            "index": 77,
            "price": 1607,
            "description": "sunt voluptate exercitation consequat officia aliquip ipsum id velit est duis irure minim ea nostrud",
            "category": "diningTable",
            "item": "Jarvis diningTable",
            "image": "gonzochair.jpg"
        }, {
            "MR_id": "MR24450",
            "index": 78,
            "price": 6207,
            "description": "deserunt fugiat in sit nostrud aliqua ut commodo commodo fugiat enim proident consectetur nisi ea",
            "category": "credenza",
            "item": "Crosby credenza",
            "image": "eameslounge.jpg"
        }, {
            "MR_id": "MR45633",
            "index": 79,
            "price": 2826,
            "description": "qui adipisicing eiusmod minim ipsum qui qui irure sint sint excepteur incididunt ad sint id",
            "category": "loungeChair",
            "item": "Martin loungeChair",
            "image": "saarinen.jpg"
        }, {
            "MR_id": "MR74116",
            "index": 80,
            "price": 6894,
            "description": "anim mollit officia mollit officia nisi non anim laborum aute nisi non officia sunt magna",
            "category": "credenza",
            "item": "Chang credenza",
            "image": "girardchair.jpg"
        }, {
            "MR_id": "MR75113",
            "index": 81,
            "price": 1855,
            "description": "ex adipisicing duis laborum laborum nulla dolore officia veniam commodo amet in do cupidatat excepteur",
            "category": "sofa",
            "item": "Weeks sofa",
            "image": "eameslounge.jpg"
        }, {
            "MR_id": "MR49982",
            "index": 82,
            "price": 3950,
            "description": "voluptate mollit Lorem minim consequat est commodo ea sint qui anim laborum deserunt adipisicing sunt",
            "category": "sofa",
            "item": "Stephenson sofa",
            "image": "knolltable.jpg"
        }, {
            "MR_id": "MR56889",
            "index": 83,
            "price": 3891,
            "description": "consequat aliquip aliquip veniam ut tempor consequat esse nostrud reprehenderit nulla exercitation dolor sint qui",
            "category": "coffeeTable",
            "item": "Wynn coffeeTable",
            "image": "badilkjairdesk.jpg"
        }, {
            "MR_id": "MR60793",
            "index": 84,
            "price": 4554,
            "description": "aliqua cillum incididunt ad anim reprehenderit amet ad culpa officia aute consequat non culpa proident",
            "category": "diningTable",
            "item": "Alexander diningTable",
            "image": "eameslounge.jpg"
        }, {
            "MR_id": "MR37851",
            "index": 85,
            "price": 6996,
            "description": "excepteur elit aute voluptate in dolor tempor minim magna duis ad laboris id id non",
            "category": "coffeeTable",
            "item": "Calderon coffeeTable",
            "image": "eameslounge.jpg"
        }, {
            "MR_id": "MR40617",
            "index": 86,
            "price": 2606,
            "description": "sint duis ex est ullamco reprehenderit minim minim non mollit exercitation reprehenderit deserunt exercitation laboris",
            "category": "loungeChair",
            "item": "Dennis loungeChair",
            "image": "gonzochair.jpg"
        }, {
            "MR_id": "MR33317",
            "index": 87,
            "price": 919,
            "description": "aliquip ipsum aute voluptate in officia ex ipsum elit culpa qui tempor qui aliqua magna",
            "category": "loungeChair",
            "item": "Mcbride loungeChair",
            "image": "baughman.jpg"
        }, {
            "MR_id": "MR77379",
            "index": 88,
            "price": 5557,
            "description": "magna ipsum aute fugiat laborum occaecat adipisicing reprehenderit pariatur nostrud enim aliqua culpa laboris labore",
            "category": "dresser",
            "item": "Trujillo dresser",
            "image": "eameslounge.jpg"
        }, {
            "MR_id": "MR75672",
            "index": 89,
            "price": 3850,
            "description": "quis eu enim proident aute ullamco nulla do elit voluptate deserunt tempor Lorem incididunt sint",
            "category": "credenza",
            "item": "Wise credenza",
            "image": "rowlandchairs.jpg"
        }, {
            "MR_id": "MR58510",
            "index": 90,
            "price": 3696,
            "description": "excepteur excepteur quis adipisicing veniam ut consectetur ut amet duis exercitation mollit ut cupidatat aliqua",
            "category": "bedFrame",
            "item": "Hoover bedFrame",
            "image": "gonzocredenza.jpg"
        }, {
            "MR_id": "MR49240",
            "index": 91,
            "price": 4476,
            "description": "ad enim fugiat mollit incididunt ut quis nostrud nulla non ipsum irure commodo sint sint",
            "category": "credenza",
            "item": "Olson credenza",
            "image": "eameslounge.jpg"
        }, {
            "MR_id": "MR25426",
            "index": 92,
            "price": 2021,
            "description": "elit cupidatat sunt enim aliquip nulla consectetur incididunt consequat occaecat qui sunt ex quis aliquip",
            "category": "bedFrame",
            "item": "Meyer bedFrame",
            "image": "saarinen.jpg"
        }, {
            "MR_id": "MR42201",
            "index": 93,
            "price": 5642,
            "description": "ad sit consectetur irure ea commodo commodo qui aliqua cillum eu tempor exercitation consequat anim",
            "category": "officeChair",
            "item": "Mcdowell officeChair",
            "image": "rowlandchairs.jpg"
        }, {
            "MR_id": "MR27740",
            "index": 94,
            "price": 4892,
            "description": "non ipsum pariatur magna velit reprehenderit aute tempor adipisicing pariatur occaecat veniam ex cillum cupidatat",
            "category": "coffeeTable",
            "item": "Mcneil coffeeTable",
            "image": "badilkjairdesk.jpg"
        }, {
            "MR_id": "MR13807",
            "index": 95,
            "price": 2573,
            "description": "non eiusmod exercitation nostrud officia officia et anim incididunt laboris quis exercitation cillum nulla ea",
            "category": "sideChair",
            "item": "Haynes sideChair",
            "image": "baughman.jpg"
        }, {
            "MR_id": "MR93462",
            "index": 96,
            "price": 6034,
            "description": "aute officia excepteur irure magna ipsum enim ex sint cillum aute nulla nulla do nostrud",
            "category": "officeChair",
            "item": "Sharp officeChair",
            "image": "rowlandchairs.jpg"
        }, {
            "MR_id": "MR29999",
            "index": 97,
            "price": 5269,
            "description": "incididunt culpa id aliquip proident consectetur elit fugiat in nulla anim excepteur ex quis Lorem",
            "category": "loungeChair",
            "item": "Hebert loungeChair",
            "image": "saarinen.jpg"
        }, {
            "MR_id": "MR28857",
            "index": 98,
            "price": 3414,
            "description": "exercitation esse aliquip mollit ut amet voluptate nulla velit et ea occaecat quis excepteur id",
            "category": "sofa",
            "item": "Palmer sofa",
            "image": "rowlandchairs.jpg"
    }]

    Parse.PageRouter = Parse.Router.extend({
        initialize: function(){
            var self = this
            console.log('routing initialized');

             // -------------------------
                // Code for saving dummy data to Parse **
                // ---------------------------
                // dummyData.forEach(function(dataObj){
                //     var commaSeparated = numberCommaSeparated(dataObj.price)
                //     dataObj.priceDollar = "$"+commaSeparated
                //     var parseItemModel = new Parse.FurnitureItem(dataObj) 
                    
                //     console.log(parseItemModel)

                //     parseItemModel.save()
                // })
                
                
             //Collections 
              this.shoppingCart = new Parse.FurnitureGroup();


              //Set Up the Views
              this.navView = new Parse.NavView()
              this.homeView = new Parse.HomeView();
              this.footerView = new Parse.FooterView();
              this.productsListView = new Parse.ProductPageView(); //will take this.collection 
              this.singleListingView = new Parse.SingleListingView({cart: this.shoppingCart});
              this.aboutView = new Parse.AboutView()
              this.consignView = new Parse.ConsignView()
              this.cartView = new Parse.ShoppingCartView();
              this.finalizeOrderView = new Parse.FinalizeOrderView({collection:this.shoppingCart})
              this.thankCustomerView = new Parse.ThanksView();
              this.newItemView = new Parse.NewItemFormView
              

              //-------------------
              //Application Event Listeners/Handlers
              //-------------------
              this.singleListingView.on('addToCart', this.addToCartHandler.bind(this))

              this.singleListingView.on('itemRemoved',this.removeFromCartHandler.bind(this))
              this.cartView.on('itemRemoved',this.removeFromCartHandler.bind(this))



              Parse.history.start();
            },

            //Events - Handlers

            //Handling the view-logic and 
            //collection-logic for adding items to the shopping cart
        addToCartHandler: function(){
                var self = this
                //Get the MR-ID on Session Storage
                var MRidOnSS = sessionStorage.getItem('MR-item-ID');
                console.log(MRidOnSS)
                sessionStorage.clear()
                
                //Filter the model from the browsedItems array
                console.log(this.shoppingCart)


                if(!this.productsListView.collection){
                    console.log('not defined');
                    var pQuery = new Parse.Query(Parse.FurnitureItem);
                    pQuery.equalTo('MR_id',MRidOnSS)
                    pQuery.find().then(function(result){
                        self.shoppingCart.add(result);
                        self.cartView.collection = self.shoppingCart;
                        self.singleListingView.cart = self.shoppingCart;
                    })
                } else {
                    var theCollection = this.productsListView.collection;
                    var theListing = theCollection.filter(function(model){
                        return model.get('MR_id') === MRidOnSS
                    })  
                    console.log(theListing)
                    var listingOnCartTest = (this.shoppingCart.get(theListing[0].id))
                    
                    if(!listingOnCartTest){ 
                        console.log('the listing now added')
                        this.shoppingCart.add(theListing);
                        this.cartView.collection = this.shoppingCart;
                        this.singleListingView.cart = this.shoppingCart;
                    } 
                }



            },

        removeFromCartHandler:function(){
                console.log('item removed heard by router')
                var MRidOnSS = sessionStorage.getItem('MR-item-ID');
                console.log(this.shoppingCart)
                var modelRemoved = this.shoppingCart.models.filter(function(model) {
                        console.log(model)
                        return model.get('MR_id') === MRidOnSS;
                    })

                this.shoppingCart.remove(modelRemoved);
                this.cartView.collection = this.shoppingCart
                console.log(this.shoppingCart)
            },

            //Routes
            

        routes: {
            'admin/enter-new-item': 'loadNewItemForm',
            'finalize-order': 'loadFinalizeOrder',
            'consignment-form': 'loadConsignment',
            'thankyou': 'loadThankCustomer',
            'shopping-cart': 'loadShoppingCart',
            'products/*/category/:type': 'loadCategoryListings',
            'products/*/listing/:mrId': 'loadSingleListing',
            'products/*/style/:style': 'loadStyleListings',
            'products': 'loadProductsPg',
            'about-us': 'loadAboutPg',
            '*path': 'home'
        },

        home: function() {
            this.navView.render();
            this.homeView.render();
            this.footerView.render()
            console.log(this.homeView)
        },

        checkNav: function() {
            var navEl = document.querySelector('nav');

            if (navEl.innerHTML.indexOf('div') === -1) {
                this.navView.render()
            }
            
        },

        checkFooter: function() {
            var footerEl = document.querySelector('footer');
            if (footerEl.innerHTML.indexOf('div') === -1) {
                this.footerView.render()
            }
        },

        clearFooter: function(){
            document.querySelector('footer').innerHTML = ""
        },

        /**
         * [loadProductsPg description]
         * ---------------------------------
         * 1) makes a Parse-query for 30 items,
         * 2) query-result returns a collection
         * 3) set productsListView.collection as query-result
         * 3) render productsListView w/ collection
         */
        loadProductsPg: function() {
            var self = this
            console.log('product-page loaded')
            this.checkNav()

            //new ParseQuery with FurnitureItem-model
            var pQuery = new Parse.Query(Parse.FurnitureItem);
            pQuery.limit(30)
            //1) Make Query, 
            //2) Set the productsListView collection with returned results
            //3) Render the collection on the productsListView
            pQuery.find().then(function(parseReturn) {
                self.productsListView.collection = parseReturn
                self.productsListView.render();
                self.checkFooter();
                
                var myFurniture = {
                    category: 'bed',
                    style: 'midcentury',
                    price: 3000
                }


                var whatPrice = myFurniture.price







            })
        },

        /**
         * [loadCategoryListings description]
         *     @param  {categoryType} string 
         * ----------------------------------
         * 1) Pass categoryType as a parameter
         * 2) Make parse query and make equalTo based on categoryType
         * 3) Query returns matched results as collection
         * 4) Render the collection
         */
        loadCategoryListings: function(categoryType) {
            var self = this
            console.log('category Page loaded');
            this.checkNav()

            var pQuery = new Parse.Query(Parse.FurnitureItem);
            pQuery.equalTo("category", categoryType);
            
            


            pQuery.find().then(function(matched) {
                self.productsListView.collection = matched
                self.productsListView.render(); //pass a collection;
                self.checkFooter();
            })

        },



        loadSingleListing: function(mrId) {
            var self = this
            console.log('single-listing routed');
            this.checkNav()

            //test to see if the collection exists
            if (!this.productsListView.collection) {
                //if collection doesn't exist...
                console.log('no collection in productsListView')
                    //make a new parse query object
                var pQuery = new Parse.Query(Parse.FurnitureItem)
                    //...set query as equal to the MR_id
                pQuery.equalTo('MR_id', mrId)
                    //...then make the query 
                pQuery.find().then(function(returnModel) {
                    //put the returned-model on the singleListingView
                    // & render the view w/ the models
                    self.singleListingView.model = returnModel[0];
                     self.singleListingView.render()
                     self.singleListingView.trigger('rendered')
                     console.log("'rendered' triggered")
                    //put the model on browsedItems array
                    
                    //render footer
                    self.checkFooter();

                })
            } else {
                console.log('collection found in productsListView')
                var listingsGroup = this.productsListView.collection
                var clickedModel = listingsGroup.filter(function(model) {
                    return model.get('MR_id') === mrId
                })
                    //Handle the data
                    //Render on Page
                    this.singleListingView.model = clickedModel[0]
                    this.singleListingView.render();
                    this.singleListingView.trigger('rendered')
                    console.log("'rendered' triggered")
                    console.log(this.shoppingCart)
                    this.checkFooter();
            }
        },

        loadShoppingCart: function() {
            var self = this
            this.checkNav()
           
            self.cartView.collection
            self.cartView.render();
            self.checkFooter(); 

        },

        loadFinalizeOrder: function(){
            console.log('finalizeOrder')
            this.checkNav();
            this.clearFooter()
            this.finalizeOrderView.render();

        },

        loadOrderConfirmation: function() {
            this.checkNav();
            this.orderConfView.render();
            this.checkFooter();

          },

        loadThankCustomer: function() {
            this.checkNav();
            this.thankCustomerView.render();
            document.querySelector('footer').innerHTML = ""

        },

        loadConsignment: function() {
            console.log('consignment-form loaded')
            this.checkNav();
            this.checkFooter();
            this.consignView.render();
        },

        loadNewItemForm: function(){
            this.newItemView.collection = ["chair", "diningTable", "sofa", "bedFrame", "coffeeTable", "credenza", "loungeChair", "nightstand", "officeChair", "sideChair", "dresser"]
            this.checkNav();
            this.clearFooter();
            this.newItemView.render()
        },

        loadAboutPg: function(){
            this.checkNav();
            this.clearFooter();
            this.aboutView.render();
        }
    })


    Parse.HomeView = Parse.TemplateView.extend({
        view: 'landing-page',
        el: '.wrapper',
        events: {
            "click a.products-link": "triggerProductPageHash",
            "click a.cat-link": "triggerCatPageHash",
            "click .consignment-form-btn": "triggerConsignmentFormHash"

        },



        triggerProductPageHash: function(evt) {
            evt.preventDefault();
            console.log('event hurrrd')
            window.location.hash = "/products"
        },

        triggerCatPageHash: function(evt) {
            evt.preventDefault();
            console.log(window.location.hash);
            console.log(evt.target)
            var categoryName = $(evt.target).closest('a').attr('data-category');
            window.location.hash = "/products/category/" + categoryName;
        },


         triggerConsignmentFormHash: function(evt) {
            evt.preventDefault();
            console.log('consignment event hurrd')
            window.location.hash = "/consignment-form"
        }
    })

    Parse.NavView = Parse.TemplateView.extend({
        view: 'navigation',
        el: 'nav',

        events: {
            "click a.products-link": "triggerProductPageHash",
            "click a.cart-link": "triggerShoppingCartHash",
            "click a.about-link": "triggerAboutHash",
            "click a.search-link": "handleSearchLink"
        },

        triggerProductPageHash: function(evt) {
            evt.preventDefault();
            window.location.hash = "/products"
        },
        triggerShoppingCartHash: function(evt) {
            evt.preventDefault();
            window.location.hash = "/shopping-cart"
        },
        triggerAboutHash: function(evt){
            evt.preventDefault();
            window.location.hash = "/about-us"
        },

        handleSearchLink: function(){
            document.querySelector
        }
    })

    Parse.FooterView = Parse.TemplateView.extend({
        view: 'footer',
        el: 'footer'
    })

    Parse.ConsignView = Parse.TemplateView.extend({
        view: 'consignment-form',
        el: '.wrapper'

    })

    Parse.AboutView = Parse.TemplateView.extend({
        view: 'about-us',
        el: '.wrapper'
    })

    Parse.ProductPageView = Parse.TemplateView.extend({
        view: 'product-page',
        el: '.wrapper',
        events: {
            'click .more-info': 'triggerSingleListingHash'
        },

        triggerSingleListingHash: function(evt) {
            evt.preventDefault();

            console.log(evt)

            var productMRid = $(evt.target).closest('.img-listing-container').attr('data-MR-ID')
            window.location.hash = "/products/listing/" + productMRid;
        }
    })

    Parse.SingleListingView = Parse.TemplateView.extend({
        view: 'single-listing',
        el: '.wrapper',
        events: {
            'click .cart-link': "triggerShoppingCartHash",
            'click .keep-shopping': "triggerHomeHash",
            'click .add-item-btn' : "addItemHandler",
            'click .remove-item-btn': 'removeItemHandler',
        },

        triggerShoppingCartHash: function(evt) {
            evt.preventDefault();
            window.location.hash = "/shopping-cart"
        },

        triggerHomeHash: function(evt) {
            evt.preventDefault();
            window.location.hash = "/"
        },

        addItemHandler: function(evt){
            //show disabled button
            evt.preventDefault();
            console.log(this.cart)
            var thisListingMR_id = (this.model.get('mr_ID'))

            //DataManagement : on session storage
            sessionStorage.setItem('MR-item-ID', this.model.get('MR_id')); 
            
            this.trigger('addToCart');


            //UserInterface : disable button
            document.querySelector('.add-item-btn').setAttribute('disabled',true);
            $('.remove-item-btn').fadeIn();
            $('.add-item-btn').addClass('btn-warning').removeClass('btn-success')
            $('.cart-status-notification').removeClass('bg-warning').addClass('bg-success').fadeIn(1000).text("This Item Is Now In Your Cart")

        },

        removeItemHandler: function(evt){
            evt.preventDefault();
            sessionStorage.setItem('MR-item-ID', this.model.get('MR_id')); 

            document.querySelector('.add-item-btn');
            $('.add-item-btn').removeAttr('disabled').removeAttr('disabled').removeClass('btn-warning').addClass('btn-success')
            $('.cart-status-notification').text("This Item Is No Longer In Your Cart").addClass('bg-warning').fadeOut(2000)
            $('.remove-item-btn').fadeOut('');
            this.trigger('itemRemoved')


        },

        initialize: function(){
            var self = this
            this.on('rendered', this.respondToRendered.bind(this))
        },

        respondToRendered: function(evt){
            var self = this
            var cartTest = this.cart && this.cart.length + "item in singleListingView.cart" || 'no cart on singleListingView'
            console.log("'rendered' heard by singleListingView")
            console.log(cartTest)
            if(this.cart){
                var filteredModel = this.cart.models.filter(function(cartModel){
                    return cartModel.get('MR_id') === self.model.get('MR_id')
                })
                console.log("is the filtered model: "+this.model.get('item') + "' in the cart?")
                console.log(filteredModel)
                if(filteredModel.length > 0){
                   document.querySelector('.add-item-btn').setAttribute('disabled',true);
                     $('.remove-item-btn').show();
                     $('.add-item-btn').removeClass('btn-success').addClass('btn-warning')
                     $('.cart-status-notification').text("This Item Is Already In Your Cart").addClass('bg-success') 
                }
            }


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
        removeItemFromCart: function(evt){
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
            "click a.confirm-purchase": "triggerThanksHash"
        },
        triggerThanksHash: function(evt) {
            evt.preventDefault()
            console.log('hey')
            window.location.hash = "/thankyou"
        }
    })

    Parse.ThanksView = Parse.TemplateView.extend({
        view: 'thank-customer',
        el: '.wrapper'
    })

    Parse.NewItemFormView = Parse.TemplateView.extend({
        view: 'enter-new-item',
        el: '.wrapper',
        events:{
            'click .generate-MR': 'queryDBForNewMR_id',
            'submit .new-item-form': 'submitItemToDB',
        },

        queryDBForNewMR_id: function(evt){
            evt.preventDefault()
            var self = this

            if(!this.queryMade){
                console.log('input clicked..')
                var queryAllMRs = new Parse.Query(Parse.FurnitureItem);
                queryAllMRs.descending("MR_id");
                queryAllMRs.limit(5)
                queryAllMRs.find().then(function(results){
                        console.log(results)
                        var rawIDNum = results[0].get('MR_id').substr(2);
                        var newItemMR_id = "MR"+(parseInt(rawIDNum)+1);
                        document.querySelector('.MR-ID-display').innerHTML = newItemMR_id
                    })
            }
        },

        submitItemToDB: function(evt){
            evt.preventDefault()

            //if form is valid, then create a new FurnitureItem Model
            if(this._validateFormUI()){
                var $newMrId = $('.MR-ID-display')
                    ,$newItemName = $('.new-item-name')
                    ,$newItemPrice = ($('.new-item-price'))
                    ,$newItemCategory = $('.new-item-category')
                    ,$newItemDesc = $('.new-item-desc')
                    ,$newImgFile = $('.selected-img-file')

                var newItemModel = new Parse.FurnitureItem({
                    MR_id: $newMrId.text(),
                    item: $newItemName.val(),
                    description: $newItemDesc.val(),
                    category: $newItemCategory.val(),
                    price: parseInt($newItemPrice.val())
                })

                //Create a Parse.File and put the file from the DOM onto it
                var uploadedFile = $newImgFile[0].files[0]
                    name = $newMrId.text()
                var parseImgFile = new Parse.File(name,uploadedFile)

                parseImgFile.save().then(function(){
                    
                    newItemModel.set("imageDB", parseImgFile)

                    newItemModel.save().then(function(){
                        console.log('item successfully saved?')
                        $newMrId.text("")
                        $newItemName.val("")
                        $newItemDesc.val("")
                        $newItemCategory.val("")
                        $newItemPrice.val("")
                        resetField($newImgFile)

                        $('.form-group').each(function(){
                            $(this).removeClass('has-success has-error');
                        })    
                    })
                })
            }
        },

        _validateFormUI: function(){
            var testFields = []

            var $newMrId = $('.MR-ID-display')
            var $newItemName = $('.new-item-name');
            var $newItemPrice = $('.new-item-price');
            var $newItemCategory = $('.new-item-category');
            var $newItemDesc = $('.new-item-desc');
            var $newImgFile = $('.selected-img-file');

            //check to see if MR-ID field has a value
            if(!$newMrId.text()){
                $newMrId.closest('.form-group').addClass('has-error')
                testFields.push(false)
            } else {
                $newMrId.closest('.form-group').addClass('has-success').removeClass('has-error')
                testFields.push(true)
                }

            //check to see if New Item field has a name
            if(!$newItemName.val()){
                $newItemName.closest('.form-group').addClass('has-error')
                testFields.push(false)
            } else{
                  $newItemName.closest('.form-group').addClass('has-success').removeClass('has-error')
                testFields.push(true)

            }


            //Check to see if new item price 
            if(!$newItemPrice.val() || $newItemPrice.val().match(/[a-z]/i)) {
                console.log('price is not a number')
                $newItemPrice.closest('.form-group').addClass('has-error')
                testFields.push(false)
                } else {
                    console.log('price is a number')
                    testFields.push(true)
                    $newItemPrice.closest('.form-group').addClass('has-success').removeClass('has-error')
                }


            //Check to see if new item category has value
            if(!$newItemCategory.val()) {
                $newItemCategory.closest('.form-group').addClass('has-error')
                 testFields.push(false)

            } else{  
                $newItemCategory.closest('.form-group').addClass('has-success').removeClass('has-error')
                testFields.push(true)

                }

            //check to see if new item cagegory has value
            if (!$newItemDesc.val()) {
                $newItemDesc.closest('.form-group').addClass('has-error')
                testFields.push(false)
            }  else {
                $newItemDesc.closest('.form-group').addClass('has-success').removeClass('has-error')
                testFields.push(true)

                }

            if ($newImgFile[0].files.length < 1){
                console.log('there is no image file')
                $newImgFile.closest('.form-group').addClass('has-error');
                testFields.push(false);   
            } else {
                console.log($newImgFile)
                console.log('it says there is an image file')
                 $newImgFile.closest('.form-group').addClass('has-success').removeClass('has-error')
                testFields.push(true)
            }
    

            var validFormTest;
            testFields.indexOf(false) === -1 ? validFormTest = true : validFormTest = false

            return validFormTest
        }    
    })

    //*****************
    // Models
    //****************
    //

    Parse.FurnitureItem = Parse.Object.extend({
        className: "DummyItem",

        defaults: {
            MR_id: "",
            item: "",
            price: 0,
            description: "",
            img: "",
            category: "" // Sofa, Dining-Table, Bedframe, Rug
                // color: "",
                // timePeriod: // 
                // styleTags:, // Scandi, Art-Deco, Industrial, Contemporary
                // designer_creator: ""
                // status: "",
                // manufactureDate: 0,
                // condition:"",
                // height: 0,
                // width: 0,
                // depth: 0,
                // dateOfEntry: 0,
                // newArrival: false,
                // inventoryStatus: {
                //     listed: true
                //     available: true,
                //     shipped: false,
                //     successfulDelivery: false
                //     },
                // sold: false,
                // clearance: false
        },

        initialize: function() {
            var self = this

            //sanity check for price: if no price entered, then listed=false

            this.on('change', function() {
                self.save()
            })
        },

        validate: function() {
            //validate item name
            //validate item category
            //validate MR-ID
            //validate: listing-status

        }
    })

    Parse.FurnitureGroup = Parse.Collection.extend({
        model: Parse.FurnitureItem,

    })



    exports.PageRouter = Parse.PageRouter;

})(typeof module === "object" ? module.exports : window);
