using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Duende.IdentityServer.EntityFramework.Options;
using VotingApp.Models;

namespace VotingApp.Data;

public class VotingAppDbContext : DbContext
{
    public VotingAppDbContext(DbContextOptions<VotingAppDbContext> options): base(options) {    }

    public DbSet<Person> Person {get; set;}
    public DbSet<Election> Election {get; set;}
    public DbSet<Votes> Votes {get; set;}
}
 