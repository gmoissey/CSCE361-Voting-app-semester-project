﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using VotingApp.Data;

#nullable disable

namespace VotingApp.Migrations
{
    [DbContext(typeof(VotingAppDbContext))]
    partial class VotingAppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("VotingApp.Models.Election", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Candidate1Username")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Candidate2Username")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.HasIndex("Candidate1Username");

                    b.HasIndex("Candidate2Username");

                    b.ToTable("Election");
                });

            modelBuilder.Entity("VotingApp.Models.Person", b =>
                {
                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("Age")
                        .HasColumnType("int");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Party")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Username");

                    b.ToTable("Person");
                });

            modelBuilder.Entity("VotingApp.Models.Votes", b =>
                {
                    b.Property<int>("VoteID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("VoteID"));

                    b.Property<int?>("ElectionId")
                        .HasColumnType("int");

                    b.Property<int>("Vote")
                        .HasColumnType("int");

                    b.Property<string>("VoterUsername")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("VoteID");

                    b.HasIndex("ElectionId");

                    b.HasIndex("VoterUsername");

                    b.ToTable("Votes");
                });

            modelBuilder.Entity("VotingApp.Models.Election", b =>
                {
                    b.HasOne("VotingApp.Models.Person", "Candidate1")
                        .WithMany()
                        .HasForeignKey("Candidate1Username");

                    b.HasOne("VotingApp.Models.Person", "Candidate2")
                        .WithMany()
                        .HasForeignKey("Candidate2Username");

                    b.Navigation("Candidate1");

                    b.Navigation("Candidate2");
                });

            modelBuilder.Entity("VotingApp.Models.Votes", b =>
                {
                    b.HasOne("VotingApp.Models.Election", "Election")
                        .WithMany()
                        .HasForeignKey("ElectionId");

                    b.HasOne("VotingApp.Models.Person", "Voter")
                        .WithMany()
                        .HasForeignKey("VoterUsername");

                    b.Navigation("Election");

                    b.Navigation("Voter");
                });
#pragma warning restore 612, 618
        }
    }
}
