using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace API.Data.Migrations
{
    public partial class CustomCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CustomCategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CustomQuestions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Question = table.Column<string>(type: "text", nullable: true),
                    CorrectAnswer = table.Column<string>(type: "text", nullable: true),
                    CategoryName = table.Column<string>(type: "text", nullable: true),
                    CategoryId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomQuestions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CustomQuestions_CustomCategories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "CustomCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CustomIncorrectAnswers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IncorrectAnswer = table.Column<string>(type: "text", nullable: true),
                    CustomQuestionId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomIncorrectAnswers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CustomIncorrectAnswers_CustomQuestions_CustomQuestionId",
                        column: x => x.CustomQuestionId,
                        principalTable: "CustomQuestions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CustomIncorrectAnswers_CustomQuestionId",
                table: "CustomIncorrectAnswers",
                column: "CustomQuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomQuestions_CategoryId",
                table: "CustomQuestions",
                column: "CategoryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomIncorrectAnswers");

            migrationBuilder.DropTable(
                name: "CustomQuestions");

            migrationBuilder.DropTable(
                name: "CustomCategories");
        }
    }
}
