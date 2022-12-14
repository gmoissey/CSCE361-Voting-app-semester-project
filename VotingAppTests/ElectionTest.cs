using Microsoft.AspNetCore.Mvc;
using VotingApp.Controllers;
using VotingApp.Models;

namespace VotingAppTests;

public class ElectionTest : IClassFixture<TestDatabaseFixture>
{
    public ElectionTest(TestDatabaseFixture fixture)
        => Fixture = fixture;

    public TestDatabaseFixture Fixture { get; }

    // xunit test to test the method GetElection in ElectionController.cs
    [Fact]
    public async Task GetElectionShouldNotReturNull()
    {
        // Arrange
        var controller = new ElectionController(Fixture.CreateContext());

        // Act
        var result = await controller.GetElection(1);

        // Assert
        var viewResult = Assert.IsType<ActionResult<Election>>(result);
        var model = Assert.IsAssignableFrom<Election>(viewResult.Value);
        Assert.NotNull(model);
    }

    [Fact]
    public async Task PostElectionShouldNotReturNull()
    {
        // Arrange
        var controller = new ElectionController(Fixture.CreateContext());

        // Act
        var result = await controller.PostElection(new Election { ID = 3, Candidate1Username = "user3.1", Candidate2Username = "user3.2", Title = "Election3", EndDate = new System.DateTime(2023, 12, 31) });
        result = await controller.GetElection(1);

        // Assert
        var viewResult = Assert.IsType<ActionResult<Election>>(result);
        var model = Assert.IsAssignableFrom<Election>(viewResult.Value);
        Assert.NotNull(model);
    }

    [Fact]
    public async Task PutElectionShouldNotBadRequest()
    {
        //Arrange
        var controller = new ElectionController(Fixture.CreateContext());

        //Act
        var result = await controller.PutElection(1, new Election { ID = 1, Candidate1Username = "user1.1", Candidate2Username = "user1.2", Title = "Election1", EndDate = new System.DateTime(2021, 12, 31) });

        //Assert
        Assert.IsType<NoContentResult>(result);
    }

    [Fact]
    public async Task DeleteElectionShouldNotBadRequest()
    {
        //Arrange
        var controller = new ElectionController(Fixture.CreateContext());
        await controller.PostElection(new Election { ID = 3, Candidate1Username = "user1", Candidate2Username = "user2", Title = "Election3", EndDate = new System.DateTime(2023, 12, 31) });

        //Act
        var result = await controller.DeleteElection(3);

        //Assert
        Assert.IsType<NoContentResult>(result);
    }
}