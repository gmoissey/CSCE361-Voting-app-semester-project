using Microsoft.AspNetCore.Mvc;
using VotingApp.Controllers;
using VotingApp.Models;

namespace VotingAppTests;

public class PersonTest :  IClassFixture<TestDatabaseFixture> {
    public PersonTest(TestDatabaseFixture fixture)
        => Fixture = fixture;

    public TestDatabaseFixture Fixture { get; }

    // xunit test to test the method GetPerson in PersonController.cs
    [Fact]
    public async Task GetPersonShouldNotReturNull()
    {
        // Arrange
        var controller = new PersonController(Fixture.CreateContext());

        // Act
        var result = await controller.GetPerson("user1");

        // Assert
        var viewResult = Assert.IsType<ActionResult<Person>>(result);
        var model = Assert.IsAssignableFrom<Person>(viewResult.Value);
        Assert.NotNull(model);
    }

    [Fact]
    public async Task PostPersonShouldNotReturNull()
    {
        // Arrange
        var controller = new PersonController(Fixture.CreateContext());

        // Act
        var result = await controller.PostPerson(new Person { Username = "newuser", PasswordHash = "password3", FirstName = "First3", LastName = "Last3"});
        result = await controller.GetPerson("newuser");

        // Assert
        var viewResult = Assert.IsType<ActionResult<Person>>(result);
        var model = Assert.IsAssignableFrom<Person>(viewResult.Value);
        Assert.NotNull(model);
    }

    [Fact]
    public async Task PutPersonShouldNotBadRequest()
    {
        //Arrange
        var controller = new PersonController(Fixture.CreateContext());

        //Act
        var result = await controller.PutPerson("user1", new Person { Username = "user1", PasswordHash = "password1", FirstName = "First1", LastName = "Last1" });

        //Assert
        Assert.IsType<NoContentResult>(result);
    }

    [Fact]
    public async Task DeletePersonShouldNotBadRequest()
    {
        //Arrange
        var controller = new PersonController(Fixture.CreateContext());

        //Act
        await controller.PostPerson(new Person { Username = "delteuser", PasswordHash = "password3", FirstName = "First3", LastName = "Last3"});
        var result = await controller.DeletePerson("delteuser");

        //Assert
        Assert.IsType<NoContentResult>(result);
    }

    [Fact]
    public async Task DeletePersonShouldReturnNotFound()
    {
        //Arrange
        var controller = new PersonController(Fixture.CreateContext());

        //Act
        var result = await controller.DeletePerson("nouser");

        //Assert
        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async Task PutPersonShouldReturnNotFound()
    {
        //Arrange
        var controller = new PersonController(Fixture.CreateContext());

        //Act
        var result = await controller.PutPerson("nouser", new Person { Username = "nouser", PasswordHash = "password1", FirstName = "First1", LastName = "Last1" });

        //Assert
        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async Task AuthenticateShouldReturnPerson()
    {
        //Arrange
        var controller = new PersonController(Fixture.CreateContext());

        //Act
        var result = await controller.AuthenticatePerson(new Person { Username = "user1", PasswordHash = "password1" });

        //Assert
        var viewResult = Assert.IsType<ActionResult<Person>>(result);
    }

    [Fact]
    public async Task BadAuthencticatePesonShouldReturnConflict()
    {
        //Arrange
        var controller = new PersonController(Fixture.CreateContext());

        //Act
        var result = await controller.AuthenticatePerson(new Person { Username = "user1", PasswordHash = "badpassword" });

        //Assert
        Assert.IsType<ConflictObjectResult>(result.Result);
    }
}