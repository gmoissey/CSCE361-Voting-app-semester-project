namespace VotingApp.Models;

public class Votes
{
	public virtual Election ElectionId { get; set; }

	public virtual Person Voter { get; set; }
	
    public int Vote { get; set; }
}
