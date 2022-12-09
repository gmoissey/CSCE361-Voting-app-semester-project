using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VotingApp.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Person",
                columns: table => new
                {
                    Username = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Party = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Age = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Person", x => x.Username);
                });

            migrationBuilder.CreateTable(
                name: "Election",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Candidate1Username = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Candidate2Username = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Election", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Election_Person_Candidate1Username",
                        column: x => x.Candidate1Username,
                        principalTable: "Person",
                        principalColumn: "Username");
                    table.ForeignKey(
                        name: "FK_Election_Person_Candidate2Username",
                        column: x => x.Candidate2Username,
                        principalTable: "Person",
                        principalColumn: "Username");
                });

            migrationBuilder.CreateTable(
                name: "Votes",
                columns: table => new
                {
                    VoteID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ElectionId = table.Column<int>(type: "int", nullable: true),
                    VoterUsername = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Vote = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Votes", x => x.VoteID);
                    table.ForeignKey(
                        name: "FK_Votes_Election_ElectionId",
                        column: x => x.ElectionId,
                        principalTable: "Election",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Votes_Person_VoterUsername",
                        column: x => x.VoterUsername,
                        principalTable: "Person",
                        principalColumn: "Username");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Election_Candidate1Username",
                table: "Election",
                column: "Candidate1Username");

            migrationBuilder.CreateIndex(
                name: "IX_Election_Candidate2Username",
                table: "Election",
                column: "Candidate2Username");

            migrationBuilder.CreateIndex(
                name: "IX_Votes_ElectionId",
                table: "Votes",
                column: "ElectionId");

            migrationBuilder.CreateIndex(
                name: "IX_Votes_VoterUsername",
                table: "Votes",
                column: "VoterUsername");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Votes");

            migrationBuilder.DropTable(
                name: "Election");

            migrationBuilder.DropTable(
                name: "Person");
        }
    }
}
