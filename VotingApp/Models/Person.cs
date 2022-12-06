namespace VotingApp.Models;

public class Person
{
    public int ID { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Party { get; set; }
    
    public int Age { get; set; }
    
    public bool Voted { get; set; }
}
