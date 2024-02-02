const express = require("express");
var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('database.db');
const app = express();
const port = process.env.port||8080;

app.use(express.json())


app.get("/",(req,res)=>{
    res.status(200)
    res.send("Alhamdulillah Connected")
})
app.get("/coordinates", function (req, res) {    
    db.serialize(()=>{
           
            db.all('SELECT * FROM Points', [req.params.id], function(err,rows){     
            if(err){
              res.status(400).send("Error encountered while displaying");
              return console.error(err.message);
            }
            console.log(rows)
            let x=0
            let y=0
            let n=0
            rows.forEach(row=>{
                x+=row.x
                y+=row.y
                n+=1
            })
            console.log(n)
            if(n===0)
                res.status(400).send(` No Data yet! `);
            else
                res.status(200).send(` x: ${x/n},    y: ${y/n}`);
          });
        });
    
            
      });
  
app.post("/coordinates",(req,res)=>{
    db.run('INSERT INTO Points VALUES(?,?)', [req.body.x, req.body.y], function(err) {
        if (err) {
          res.status(201).send({message:"duplicate value"})
          return
        }
        console.log("New employee has been added");
        res.status(200).send({message:"New point has been added into the database"});
      });
  });


app.listen(port, function () {
  console.log(`Listening on port ${port}!`);
});