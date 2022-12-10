using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Security.Cryptography;
using System.Text.Json.Serialization;

namespace VotingApp.Models;

public class Person
{
    [Key]
    [Required]
    public string? Username { get; set; }
    
    private string? _passwordHash;

    [Required]
    // [JsonIgnore]
    public string PasswordHash
    {
        get
        {
            return _passwordHash;
        }

        set
        {  
             _passwordHash = this.ComputeSha256Hash(value);                
        }
    }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Party { get; set; }

    public int Age { get; set; }

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
