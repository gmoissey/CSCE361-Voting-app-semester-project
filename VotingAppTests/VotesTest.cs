using Microsoft.AspNetCore.Mvc;
using VotingApp.Controllers;
using VotingApp.Models;

namespace VotingAppTests;

public class VotesTest : IClassFixture<TestDatabaseFixture>
{
    public VotesTest(TestDatabaseFixture fixture)
        => Fixture = fixture;

    public TestDatabaseFixture Fixture { get; }

    // xunit test to test the method GetVotes in VotesController.cs
    [Fact]
    public async Task GetVotesShouldNotReturNull()
    {
        // Arrange
        var controller = new VotesController(Fixture.CreateContext());

        // Act
        var result = await controller.GetVotes(1);

        // Assert
        var viewResult = Assert.IsType<ActionResult<Votes>>(result);
        var model = Assert.IsAssignableFrom<Votes>(viewResult.Value);
        Assert.NotNull(model);
    }

    [Fact]
    public async Task PostVotesShouldNotReturNull()
    {
        // Arrange
        var controller = new VotesController(Fixture.CreateContext());

        // Act
        var result = await controller.PostVotes(new Votes { VoteID = 4, ElectionId = 1, VoterUsername = "user2", Vote = 1 });
        result = await controller.GetVotes(1);

        // Assert
        var viewResult = Assert.IsType<ActionResult<Votes>>(result);
        var model = Assert.IsAssignableFrom<Votes>(viewResult.Value);
        Assert.NotNull(model);
    }

    [Fact]
    public async Task FindVotByIdShouldNotReturNull()
    {
        //Arrange
        var controller = new VotesController(Fixture.CreateContext());

        //Act
        var result = await controller.GetVotes(1);

        //Assert
        var viewResult = Assert.IsType<ActionResult<Votes>>(result);
        var model = Assert.IsAssignableFrom<Votes>(viewResult.Value);
        Assert.NotNull(model);
    }

    [Fact]
    public async Task FindVoteByIdShouldReturnNotFound(){
        //Arrange
        var controller = new VotesController(Fixture.CreateContext());

        //Act
        var result = await controller.GetVotes(100);

        //Assert
        Assert.IsType<NotFoundResult>(result.Result);
    }
}
