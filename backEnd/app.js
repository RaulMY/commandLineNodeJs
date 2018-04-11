var express = require('express');
var cmd=require('node-cmd');
var fs = require('fs');
var Users = './users.json';
var randomID = require("random-id");
var file = require(Users);
var currentUser = file.find(user => user.user_id === process.argv[2]);
  if (process.argv[3] === "add" && process.argv.length===5) {
    var json = process.argv[4].toString().trim();
    var correct = "";
    for (let i in json) {
      if (json[i]==="“" || json[i]==="”"){
        correct+='"';
      } else {
        correct+=json[i];
      }
    }
    var id = randomID();
    
    json = JSON.parse(correct);
    json['transaction_id']=id;
    if (currentUser){
      var index = file.indexOf(currentUser);
      currentUser.transactions.push(json);
      file[index]=currentUser;
    } else {
      var user = { "user_id" : process.argv[2], "transactions":[json]}
      file.push(user);
    }
    fs.writeFile(Users, JSON.stringify(file), function (err) {
      if (err) return console.log(err);
      console.log(json);
    });
  } else if (process.argv[3] === "list") {
    if (currentUser){
      console.log(currentUser.transactions);
    } else {
      console.log([]);
    }
  } else if (process.argv[3] === "sum") {
    if (currentUser){
      var sum = currentUser.transactions.reduce((acc, tran) => {
        return acc + tran.amount;
      }, 0)
      console.log({"user_id":process.argv[2], "sum": sum});
    } else {
      console.log("User not found");
    }
  } else if (process.argv[3] !== "add" && process.argv.length===4) {
    if (currentUser){
      var currentTransaction = currentUser.transactions.find(transaction => process.argv[3]=== transaction.transaction_id)
      if (currentTransaction){
        console.log(currentTransaction);
      } else {
        console.log("Transaction not found")
      }
    } else {
      console.log("User not found")
    }

  }



