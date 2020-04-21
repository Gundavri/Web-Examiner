Here is a link for tutorial that shows how to install MongoDB on windows - https://www.youtube.com/watch?v=FwMwO8pXfq0
Here is a link for tutorial that shows how to install MongoDB on Ubuntu - https://www.youtube.com/watch?v=WH5GgHaEy7E

After installing make sure the server is running.

By default MongoDB server will run on localhost:27017. If you change the port, make sure to change it in the code too; currently we are connecting the DB in app.js and in fillDB/app.js.

Folder models in web-examiner contains info about how User, Exam, Question or Answer will look in the DB. To add one of the above in the DB you simply have to write:
let newObj = await new Model({
    // required params
}).send();
After executing this new object is added in the DB and variable newObj contains this object.

For example, lines 30-37 in app.js(currently commented out) adds new user in the DB and sends this new user to the front.

fillDB/app.js is an application that helps you to add new exam in the DB. Before I explain how it works, let me explain what our DB look like; Every exam object contains the following fields: _id(this field is automatically generated and is unique), exam_num(this makes it easier for front developer to sort exams on screen), and questions(this is an array that is filled with question _id-s). Every question object has following fields: _id, question(String), and answers(an array that is filled with answer _id-s). Evert answer object has the following fields: _id, answer(String), and point(can be any number)(answer object is simple now and we will change it based on how Zviad wants). After we know how our DB is organized, lets explain what fillDB/app.js does; After running this application, it asks you to enter exam_num, please only enter number! The app does not check what you enter, so it is up to you to give it right info. After exam_num, it asks for questions(can be anything) until you provide empty string. After you have provided empty string, the app asks for answers for the first question you provided. An answer must look like this: "this is an answer. 1". The number after the last space is point for this answer, it can be any type of number! After you are done providing answers for the first question you provide empty string and then answers for the second question and so on and so on. After you provide answers for the last question, the app ends. Last three lines of the code(currently commented out) logs every exam, answer and question on console.

Now, lets talk about controllers. I will start with auth controller. controllers/auth.controllers.js export 2 functions; one of them checks if there is user with a given email/username if so, it compares crypted password to the crypted passwor the user in the DB has; if they match, it generates new token that is valid for that many seconds that is written in exp field. Second function is for registration; it checks if given username and email are unique, then hashes the given password and adds new user in the DB. Exam controller simply send all the exams avaliable in the DB to the front. Question controller requires question ids that the front wants to be sent. It finds all the questions with their answers and them to the front as an array of objects.(this controller has not been tested yet because the DB was empty before). Now that I am writing this I understand that it won't correctly and I will change it.

To test each controller use Postman and links given in routes.
