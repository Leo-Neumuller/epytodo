# Epytodo
API project made by :

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

/login POST : connect a user

/user GET : view all user informations

/user/todos GET : view all user tasks

/user/:id or :email GET : view user information

/user/:id PUT : update user information

/user/:id DELETE : delete user

/todo GET : view all the todos

/todo/:id GET : view the todo

/todo POST : create a todo

/todo/:id PUT : update a todo

/todo/:id DELETE : delete a todo
