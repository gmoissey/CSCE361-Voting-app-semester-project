using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VotingApp.Models;
public class Election
{
    [Key]
	public int ID { get; set; }
    [ForeignKey("Person")] 
    public string? Candidate1Username { get; set; }
    public virtual Person? Candidate1 {get; set; }
    [ForeignKey("Person")] 
    public string? Candidate2Username { get; set; }

    public virtual Person? Candidate2 {get; set; }
    public string? Title { get; set; }
}
