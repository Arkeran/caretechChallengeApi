var MongoClient = require('mongodb').MongoClient;

// This function returns article(s) corresponding to an id. 
module.exports = function(context, req) {
  // Connection to the MongoDB collection in CosmoDB.
  MongoClient.connect(process.env.CosmosDBConnectionString, (err, client) => {
    let send = response(client, context);
    // If the connection is not successful, we return the error's message with a code 500.
    if (err) send(500, err.message);
    // Access to the database
    let db = client.db('admin');
    // The id sent in the request.
    articleId = parseInt(req.query.id);
    // Get all ( Id is not unique ) article(s) with the corresponding id.
    db.collection('articles')
      .find(
        { id: articleId }
      )
      .toArray((err, result) => {
        if (err) send(500, err.message);
        // Send a 404 if the article is not found
        if (!result.length) send(404, 'Article not found');
        else send(200, JSON.parse(JSON.stringify(result)));
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