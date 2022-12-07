﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using VotingApp.Data;

#nullable disable

namespace VotingApp.Migrations
{
    [DbContext(typeof(VotingAppDbContext))]
    [Migration("20221207023642_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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

                    b.Property<int?>("Candidate1ID")
                        .HasColumnType("int");

                    b.Property<int?>("Candidate2ID")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.HasIndex("Candidate1ID");

                    b.HasIndex("Candidate2ID");

                    b.ToTable("Election");
                });

            modelBuilder.Entity("VotingApp.Models.Person", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int>("Age")
                        .HasColumnType("int");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Party")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

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

                    b.Property<int?>("VoterID")
                        .HasColumnType("int");

                    b.HasKey("VoteID");

                    b.HasIndex("ElectionId");

                    b.HasIndex("VoterID");

                    b.ToTable("Votes");
                });

            modelBuilder.Entity("VotingApp.Models.Election", b =>
                {
                    b.HasOne("VotingApp.Models.Person", "Candidate1")
                        .WithMany()
                        .HasForeignKey("Candidate1ID");

                    b.HasOne("VotingApp.Models.Person", "Candidate2")
                        .WithMany()
                        .HasForeignKey("Candidate2ID");

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
                        .HasForeignKey("VoterID");

                    b.Navigation("Election");

                    b.Navigation("Voter");
                });
#pragma warning restore 612, 618
        }
    }
}
