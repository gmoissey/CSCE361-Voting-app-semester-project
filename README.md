# CSCE361-Voting-app-semester-project
 CSCE361 - Voting app semester project. Voting app based on MVC architeture and built with .NET and React

## How to run
- First you will need to install all JavaScript dependencies:<br/>
   `cd VotingApp/ClientApp` - this is where our React project lives<br/>
   `npm install` - this will install JavaScript dependencies<br/>
   `cd ../`

- Then you are ready to run the application(make sure you're located in `VotingApp` directory):<br/>
   `dotnet run` - this will run VotingApp on `https://localhost:44480`<br/>

- **Toubleshooting:**<br/>
   You may get ssl certificate errors. In this case you will need to run this command:<br/>
   `dotnet dev-certs https --trust`<br/>
