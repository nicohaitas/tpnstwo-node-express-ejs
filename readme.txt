github:
    Quick setup — if you’ve done this kind of thing before
        https...
        > https://github.com/nicohaitas/tpnstwo-node-express-ejs.git
        ssh...
        > git@github.com:nicohaitas/tpnstwo-node-express-ejs.git

    …or create a new repository on the command line
        > echo "# tpnstwo-node-express-ejs" >> README.md
        > git init
        > git add README.md
        > git commit -m "first commit"
        > git remote add origin https://github.com/nicohaitas/tpnstwo-node-express-ejs.git
        > git push -u origin master

    …or push an existing repository from the command line
        > git remote add origin https://github.com/nicohaitas/tpnstwo-node-express-ejs.git
        > git push -u origin master

setup environment...
    > download and install node.js from https://nodejs.org/en/
    > npm install -g express
    > npm install -g express-generator
    > express -e tpnstwo

NOTE: The Node NPM Folder on the server is PRIVATE and cannot be used for public purposes, as your file paths will return 404 (not found).
NOTE: when ready to upload this code to the Git Repo replace all manually added public dependancies in the lib folder with Bower

change directory to project directory:
    > cd /d E:\Nico Websites\News Site\Node Express EJS\tpnstwo

install dependencies:
    > cd tpnstwo && npm install

run the app:
    > SET DEBUG=tpnstwo:* & npm start
