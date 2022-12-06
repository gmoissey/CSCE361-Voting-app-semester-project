namespace VotingApp.Models;
public class Election
{
	public int ID { get; set; }

    public virtual Person Candidate1 { get; set; }

    public virtual Person Candidate2 { get; set; }

    public string Title { get; set; }
}
