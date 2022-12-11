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
                            new Election { ID = 1, Candidate1Username = "user1.1", Candidate2Username = "user1.2", Title = "Election1", EndDate = new System.DateTime(2021, 12, 31) },
                            new Election { ID = 1, Candidate1Username = "user2.1", Candidate2Username = "user2.1", Title = "Election2", EndDate = new System.DateTime(2022, 12, 31) });
                        context.SaveChanges();
                    }

                    _databaseInitialized = true;
                }
            }
        }

        public VotingAppDbContext CreateContext()
            => new VotingAppDbContext(
                new DbContextOptionsBuilder<VotingAppDbContext>()
                    .UseSqlServer(ConnectionString)
                    .Options);
    }
}