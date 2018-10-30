var MongoClient = require('mongodb').MongoClient;

module.exports = function(context, req) {
  MongoClient.connect(process.env.CosmosDBConnectionString, (err, client) => {
    let send = response(client, context);

    if (err) send(500, err.message);

    let db = client.db('admin');

    let article = ({ id, title, content } = req.body);

    db.collection('articles').insertOne(
      {
        id: article.id,
        title: article.title,
        content: article.content
      },
      (err, articles) => {
        if (err) send(500, err.message);

        send(200, article);
      }
    );
  });
};

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