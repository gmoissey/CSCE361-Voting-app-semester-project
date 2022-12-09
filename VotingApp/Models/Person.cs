using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Security.Cryptography;

namespace VotingApp.Models;

public class Person
{
    [Key]
    public int ID { get; set; }

    [Required]
    public string? Username { get; set; }

    private string _passwordHash;

    [Required]
    public string PasswordHash
    {
        get
        {
            return this._passwordHash;
        }

        set
        {  
             _passwordHash = this.ComputeSha256Hash(value);                
        }
    }

    [Required]
    public string? FirstName { get; set; }

    [Required]
    public string? LastName { get; set; }

    public string? Party { get; set; }

    [Required]
    public int Age { get; set; }

    public Boolean comparePassword(string recievedPassword)
    {
        string recievedPasswordHash = this.ComputeSha256Hash(recievedPassword);

        return String.Equals(this.PasswordHash, recievedPasswordHash);
    }

    private string ComputeSha256Hash(string rawData)
    {
        using (SHA256 sha256Hash = SHA256.Create())
        {
            byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(rawData));

            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < bytes.Length; i++)
            {
                builder.Append(bytes[i].ToString("x2"));
            }
            return builder.ToString();
        }
    }
}
