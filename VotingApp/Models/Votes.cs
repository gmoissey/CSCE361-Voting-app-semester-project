using System;

public class Votes
{
	[ForeignKey("ID")]
	public virtual Election ElectionId { get; set; }

	[ForeighKey("ID")]
	public virtual Person Voter { get; set; }
	
    public int Vote { get; set; }
}
