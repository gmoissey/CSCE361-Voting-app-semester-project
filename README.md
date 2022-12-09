# CSCE361-Voting-app-semester-project
 CSCE361 - Voting app semester project. Voting app based on MVC architeture and built with .NET and React

## How to run
- First you will need to setup yuor own local database instance. It will have to be SQL Server or Azure SQL Edge 
  - Once that is done go to `VotingApp/appsettings.json` and change `Server`,  `User ID`, and `Password` in the connection string.
  - To setup database table you will need to run migrations that are already created for you:<br/>
   `cd VotingApp`<br/>
   `dotnet ef database update --context VotingAppDbContext` - this will create three tables: `Person`, `Votes`, and `Election`

- Next you will need to install all JavaScript dependencies:<br/>
   `cd VotingApp/ClientApp` - this is where our React project lives<br/>
   `npm install` - this will install JavaScript dependencies<br/>
   `cd ../`

- Then you are ready to run the application(make sure you're located in `VotingApp` directory):<br/>
   `dotnet run` - this will run VotingApp on `https://localhost:44480`<br/>

- **Toubleshooting:**<br/>
   You may get ssl certificate errors. In this case you will need to run this command:<br/>
   `dotnet dev-certs https --trust`<br/>
