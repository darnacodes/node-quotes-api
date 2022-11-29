const express = require("express");
const app = express();

let quotes = require("./quotes.json");
/*
const middlewareTest=function (request, response, next){
  console.log("HEY middleware")
  next()
}

const middlewareMainEndpoint=function (request, response, next){
  console.log("HEY Mainendpoint")
  next()
}
*/

//middleware makes itunderstand the json format
const middleware= express.json()
app.use(express.json())

//app.use(middlewareTest)

/*app.get('/', function(request, response) {
  response.send('/quotes/17 should return one quote, by id')
});
*/

app.get("/quotes", function(request, response){
  response.json(quotes);
});

app.post('/quotes', function (request, response){
  //get quote from request body
  const quote =request.body
   //validation
if (quote.id === undefined ||
  quote.author === undefined ||
  quote.body === undefined){
  return response.status(400).send({success:false})
}
  // add quote to our quotes
  quotes.push(quote)                                
  //return a successful status code 201
  response.status(201).send({success:true})
})
  
app.put('/quotes/:id', function (request, response){
  //get the id of the quote we want to modify
  const id=request.params.id
  //remove quote at the id
  //add the quote updated

  const quoteUpdated={
    id:parseInt(id),
    author:request.body.author,
    quote:request.body.quote
  }
  const quotesFiltered= quotes.filter(function(quote){
return quote.id !=id
  })

  quotes=quotesFiltered
  quotes.push(quoteUpdated)
  //change content of the quote
  response.send({success:true})
})


app.delete('/quotes/:id', function(request, response){
const id =request.params.id
const quotesFiltered= quotes.filter(function(quote){
  return quote.id !=id
})
quotes=quotesFiltered

response.send("WIP")

})



app.listen(3000, () => console.log("Listening on port 3000"));
