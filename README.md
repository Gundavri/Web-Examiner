# Web-Examiner
MEAN application with its own CMS for examining online

To start the application, one has to start virtual server on his router, then add his public ip to this C:\Users\npest\Desktop\Web-Examiner\web-examiner-back\public\angular-cms\assets file, then create .env file, copy and fill everything from .env_public, then run command "npm i" and lastly "npm start". After this one must be able to access "Web Examiner" on public ip given in this C:\Users\npest\Desktop\Web-Examiner\web-examiner-back\public\angular-cms\assets file on port described in .env file.

Simply shut down server by clicking "Ctrl+C" and then typing "yes".

When one enters to the site, he is directed to login page. He can sign in using existing account or create new one. After the login phase, he is directed to the page where all exams are listed. He can choose any of the active exams and the exam will begin(if current user has already written the exam score is displayed). One can simply navigate between questions using arrows on the screen, end exam by clicking exit button or submit his work using submit button. If timer gets to 0 before user submits his work, the work is submited automatically. It is obvious that one can extend time but the server will not accept the work that was submited after the given time! After the submition score is displayed on the screen. Also, an email that has more information on users's work is sent to him. 

The application uses that mail, which is provided in .env file, to send emails. Be sure that it is gmail and can be used by less secure apps!

If one wants to access admin panel, he has to go to 'public_ip:port/admin'. This will open a login page. Before signing in, one has to add admin account in the database using C:\Users\npest\Desktop\Web-Examiner\web-examiner-back\fillDB\createAdmin.js. After one is signed in, he can see all scores, exams, questions and answers. An admin can create, delete or change exams. He can also set time for each exam and number of questions. It is also possible to deactivate exam, in this case user will not be able to access this exam.

If you have any questions or suggestions feel free to contact us on email.
Email: nikapestvenidze99@gmail.com