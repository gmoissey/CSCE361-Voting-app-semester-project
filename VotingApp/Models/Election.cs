using System;

public class Election
{
	[Key]
	public int ID { get; set; }

	[ForeignKey("ID")]
    public virtual Person Candidate1 { get; set; }

	[ForeignKey("ID")]
    public virtual Person Candidate2 { get; set; }

	[StringLength(100)]
    public string Title { get; set; }
}
