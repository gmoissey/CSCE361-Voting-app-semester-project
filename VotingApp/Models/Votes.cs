using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VotingApp.Models;

public class Votes
{
	[Key]
	public int VoteID { get; set; }
	[ForeignKey("Election")]
	public int? ElectionId { get; set; }
	public virtual Election? Election { get; set; }
	[ForeignKey("Person")]
	public string? VoterUsername { get; set; }
	public virtual Person? Voter { get; set; }
	
    public int Vote { get; set; }
}
