using VotingApp.Models;
using VotingApp.Data;
using Microsoft.EntityFrameworkCore;

namespace VotingAppTests
{
    public class TestDatabaseFixture
    {
        // Change this to match your local SQL Server instance
        private const string ConnectionString = @"Server=CWOOD-PC\\SQLEXPRESS;Database=CSCE361;Integrated Security=true;TrustServerCertificate=true;";

        private static readonly object _lock = new();
        private static bool _databaseInitialized;

        public TestDatabaseFixture()
        {
            lock (_lock)
            {
                if (!_databaseInitialized)
                {
                    using (var context = CreateContext())
                    {
                        context.Database.EnsureDeleted();
                        context.Database.EnsureCreated();

                        context.AddRange(
                            new Person { Username = "user1", PasswordHash = "password1", FirstName = "First1", LastName = "Last1", Party = "Party1" },
                            new Person { Username = "user2", PasswordHash = "password2", FirstName = "First2", LastName = "Last2", Party = "Party2" },
                            new Person { Username = "user3", PasswordHash = "password3", FirstName = "First3", LastName = "Last3", Party = "Party3"},
                            new Person { Username = "user4", PasswordHash = "password4", FirstName = "First4", LastName = "Last4", Party = "Party4" },
                            new Person { Username = "user5", PasswordHash = "password5", FirstName = "First5", LastName = "Last5", Party = "Party5" }
                        );

                        context.AddRange(
                            new Election { ID = 1, Candidate1Username = "user1", Candidate2Username = "user2", Title = "Election1", EndDate = new System.DateTime(2021, 12, 31) },
                            new Election { ID = 2, Candidate1Username = "user3", Candidate2Username = "user4", Title = "Election2", EndDate = new System.DateTime(2022, 12, 31) }
                        );                        

                        context.AddRange(
                            new Votes {VoteID = 1, ElectionId = 1, VoterUsername = "user1", Vote = 1},
                            new Votes {VoteID = 2, ElectionId = 1, VoterUsername = "user2", Vote = 2},
                            new Votes {VoteID = 3, ElectionId = 2, VoterUsername = "user3", Vote = 1}
                        );

                        context.SaveChanges();
                    }

                    _databaseInitialized = true;
                }
            }
        }

        public VotingAppDbContext CreateContext()
            => new VotingAppDbContext(
                new DbContextOptionsBuilder<VotingAppDbContext>()
                    .UseInMemoryDatabase(databaseName: "TestDatabase")
                    .Options);
    }
}