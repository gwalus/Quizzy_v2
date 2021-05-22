using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class CustomCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomQuestions_CustomCategories_CustomCategoryId",
                table: "CustomQuestions");

            migrationBuilder.RenameColumn(
                name: "CustomCategoryId",
                table: "CustomQuestions",
                newName: "CategoryIdId");

            migrationBuilder.RenameIndex(
                name: "IX_CustomQuestions_CustomCategoryId",
                table: "CustomQuestions",
                newName: "IX_CustomQuestions_CategoryIdId");

            migrationBuilder.AddColumn<string>(
                name: "CategoryName",
                table: "CustomQuestions",
                type: "text",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_CustomQuestions_CustomCategories_CategoryIdId",
                table: "CustomQuestions",
                column: "CategoryIdId",
                principalTable: "CustomCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomQuestions_CustomCategories_CategoryIdId",
                table: "CustomQuestions");

            migrationBuilder.DropColumn(
                name: "CategoryName",
                table: "CustomQuestions");

            migrationBuilder.RenameColumn(
                name: "CategoryIdId",
                table: "CustomQuestions",
                newName: "CustomCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_CustomQuestions_CategoryIdId",
                table: "CustomQuestions",
                newName: "IX_CustomQuestions_CustomCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomQuestions_CustomCategories_CustomCategoryId",
                table: "CustomQuestions",
                column: "CustomCategoryId",
                principalTable: "CustomCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
