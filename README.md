## Utilisation

#To read a single post item send a GET request with an id to :

https://caretechchallengeapi.azurewebsites.net/api/article/{id}

#To get all article(s) send a GET request to : 

https://caretechchallengeapi.azurewebsites.net/api/articles

#To create a new article send a POST request with the JSON structure :

{ 
    "id": id,
    "title": title,
    "content": content
}

To :

https://caretechchallengeapi.azurewebsites.net/api/article

#To update an existing article send a PUT request with the id of the article to :

https://caretechchallengeapi.azurewebsites.net/api/article/{id}

#To delete an existing article, send a DELETE request with the id of the article to :

https://caretechchallengeapi.azurewebsites.net/api/article/{id}
