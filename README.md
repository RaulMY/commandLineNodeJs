#commandLine Node.js app

This is a Node.js app, so the command line inputs are slightly different, and 
the transaction json must be between " ", so the app reads it as one argument.

In order to add a transaction, the following input must be used:

node app.js <user_id> add <transaction_json>

To show a transaction:

node app.js <user_id> <transaction_id>

To list all of a user's transactions:

node app.js <user_id> list

And to get the sum of all of a user's transactions:

node app.js <user_id> sum

If we were to use a Database, I'd use a NoSQL database.

If the funcionality of this app would remain the same, then I'd use only one collection:

Collections :
 User {
     "user_id": String,
     "transactions": Array of Objects
 }

But if more functionality was needed in the future, such as processing the transactions on their own, regardless of their user, then I'd actually have two collections, one for users, and one for transactions.

Collections :
 User {
     "user_id": String,
     "transactions: Array of Strings (Transaction IDs)
 }

 Transaction {
     "amount" : Number,
     "description" : String,
     "date" : String,
     "user_id": String,
     "transaction_id" : String
 }

This way I could work with both users, and transactions independently of the other one.

