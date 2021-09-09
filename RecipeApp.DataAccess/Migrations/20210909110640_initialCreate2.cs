using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RecipeApp.DataAccess.Migrations
{
    public partial class initialCreate2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PhotoUrl",
                table: "Users",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Duration",
                table: "Recipes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "PhotoUrl",
                table: "Recipes",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Process",
                table: "Recipes",
                type: "text",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "Time",
                table: "MadeDishes",
                type: "datetime2",
                rowVersion: true,
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "Date");

            migrationBuilder.AddColumn<string>(
                name: "Portion",
                table: "Ingredients",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhotoUrl",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Duration",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "PhotoUrl",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Process",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Portion",
                table: "Ingredients");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Time",
                table: "MadeDishes",
                type: "Date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldRowVersion: true);
        }
    }
}
