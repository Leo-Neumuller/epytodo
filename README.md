# Epytodo
### API project made by :

Marine Poteau

Léo Neumuller (me)

Yannis Alouache

## How to run :

### Make sure you have all the dependencies installed :

```npm install express```

```npm install dotenv```

```npm install mysql2```

```npm install jsonwebtoken```

```npm install bcryptjs```

### Install and run mariadb-server (and set the root password) :

```sudo apt-get install mariadb-server```

```sudo /etc/init.d/mysql start```

### Add the tables to the database :

```cat create_table_todo.sql | sudo mysql -u root -p```

```cat create_table_user.sql | sudo mysql -u root -p```

### Set the default mysql password of root to root :

```sudo mysql -u root -p```

```ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';```

### Run the node server :

```node src```

### All the routes :

/register POST : register a new user

```
{

" email ": " value " ,

" name ": " value " ,

" firstname ": " value " ,

" password ": " value "

}
```

/login POST : connect a user

```
{

" email " : " username " ,

" password " : " password "

}
```

/user GET : view all user informations

/user/todos GET : view all user tasks

/user/:id or :email GET : view user information

/user/:id PUT : update user information

```
{

" email " : " updated_email@test . eu " ,

" password " : " updated_passord " ,

" firstname " : " updated_test " ,

" name " : " updated_test "

}
```


/user/:id DELETE : delete user

/todo GET : view all the todos

/todo/:id GET : view the todo

/todo POST : create a todo

```
{

" title " : " title " ,

" description " : " desc " ,

" due_time " : "2021 -03 -06 19:24:00" ,

" user_id " : "3" ,

" status " : " todo "

}
```

/todo/:id PUT : update a todo

```
{

" title " : " Updated title " ,

" description " : " Updated desc " ,

" due_time " : "2021 -03 -07 19:24:00" ,

" user_id " : "1" ,

" status " : " doing "

}
```

/todo/:id DELETE : delete a todo
