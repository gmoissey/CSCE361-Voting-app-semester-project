using System;

public class Person
{
    [Key]
    public int ID { get; set; }

    [StringLength(15)]
    public string FirstName { get; set; }

    [StringLength(15)]
    public string LastName { get; set; }

    [StringLength(15)]
    public string Party { get; set; }
    
    public int Age { get; set; }
    
    public bool Voted { get; set; }
}
