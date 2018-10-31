var MongoClient = require('mongodb').MongoClient;

// This function update an article corresponding to an id
module.exports = function(context, req) {
  // Connection to the MongoDB collection in CosmoDB.
  MongoClient.connect(process.env.CosmosDBConnectionString, (err, client) => {
    // If the connection is not successful, we return the error's message with a code 500.
    let send = response(client, context);
    // Access to the database
    if (err) send(500, err.message);

    let db = client.db('admin');
    // Data in the request are saved in a variable.
    let article = ({ title, content } = req.body);
    article.id = parseInt(req.query.id);
    // Check if the required fields are not empty
    if ( !article.title || !article.content ) {
      send(400, 'Invalid field values, Please enter the new values for title and content.');
    } else
    {
      // Update the article with the title and content send in the request.
      db.collection('articles')
        .updateOne(
          { id: article.id },
          { $set: { title: article.title, content: article.content } },
          (err, articles) => {
            if (err) send(500, err.message);

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