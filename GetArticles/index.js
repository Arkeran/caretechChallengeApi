var MongoClient = require('mongodb').MongoClient;

// This function returns all articles. 
module.exports = function(context, req) {
  // Connection to the MongoDB collection in CosmoDB.
  MongoClient.connect(process.env.CosmosDBConnectionString, (err, client) => {
    let send = response(client, context);
    // If the connection is not successful, we return the error's message with a code 500.
    if (err) send(500, err.message);
    // Access to the database
    let db = client.db('admin');
    // Get all articles
    db.collection('articles')
      .find({})
      .toArray((err, result) => {
        if (err) send(500, err.message);

        send(200, JSON.parse(JSON.stringify(result)));
      });
  });
};
// This function sends the response of the request.
function response(client, context) {
  return function(status, body) {
    context.res = {
      status: status,
      body: body
    };

    client.close();
    context.done();
  };
}