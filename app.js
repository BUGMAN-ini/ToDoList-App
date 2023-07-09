
    const express = require("express");
    const bodyparser = require("body-parser");

    const app = express();

    var items = ["Buy Food", "Cook Food", "Eat Food"];
    var workitems = [];

    app.set('view engine', 'ejs')

    app.use(bodyparser.urlencoded({extended: true}))
    app.use(express.static("public"));

    app.get("/", function(req, res) {
        
        var today = new Date();
        var options = {
            weekday: "long"
          , day: "numeric"
          , month: "long"
        };

        var day = today.toLocaleDateString("en-US", options);


        res.render("list", {listTitle: day, newlists: items});
    });

    app.post("/", function(req, res){
       var item = req.body.newlists

       if(req.body.newlists === "Work"){
        workitems.push(item)
        res.redirect("/work");
       } else {
        items.push(item)
        res.redirect("/");
       }
    });



    app.get("/work", (req, res) => {
        res.render("list", {listTitle: "Work List", newlists: workitems})
    });


    app.listen(3000, function(){
        console.log("Server Is Running On Port 3000")
    });