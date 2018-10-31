var MongoClient = require('mongodb').MongoClient;

// This function creates a new article if all data needed are in the request
module.exports = function(context, req) {
  // Connection to the MongoDB collection in CosmoDB.
  MongoClient.connect(process.env.CosmosDBConnectionString, (err, client) => {
    let send = response(client, context);
    // If the connection is not successful, we return the error's message with a code 500.
    if (err) send(500, err.message);
    // Access to the database
    let db = client.db('admin');
    // Data sent are saved in a variable.
    let article = ({ id, title, content } = req.body);
    // Check if the required fields are not empty
    if ( !article.id || !article.title || !article.content ) {
      send(500, 'Invalid field values, Please enter a value for id, title and content.');
    } else
    {
      // Insertion of the new article in the collection articles.
      db.collection('articles').insertOne(
        {
          id: article.id,
          title: article.title,
          content: article.content
        },
        (err, articles) => {
          if (err) send(500, err.message);
          // If the request succeded we send a code 200.
          send(200, article);
        }
      );
    }

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