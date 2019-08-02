using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class init_db : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Boxes",
                columns: table => new
                {
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Boxes", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "Operators",
                columns: table => new
                {
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Operators", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "BoxLocations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    StartDay = table.Column<DateTime>(nullable: false),
                    EndDay = table.Column<DateTime>(nullable: true),
                    Latitude = table.Column<string>(nullable: true),
                    Longitude = table.Column<string>(nullable: true),
                    SiteName = table.Column<string>(nullable: true),
                    Habitat1 = table.Column<string>(nullable: true),
                    Habitat2 = table.Column<string>(nullable: true),
                    BoxId = table.Column<string>(nullable: true),
                    OperatorId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BoxLocations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BoxLocations_Boxes_BoxId",
                        column: x => x.BoxId,
                        principalTable: "Boxes",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BoxLocations_Operators_OperatorId",
                        column: x => x.OperatorId,
                        principalTable: "Operators",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Records",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    StartHour = table.Column<DateTime>(nullable: false),
                    EndHour = table.Column<DateTime>(nullable: false),
                    RecordUrl = table.Column<string>(nullable: true),
                    ProjectId = table.Column<string>(nullable: true),
                    BoxLocationId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Records", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Records_BoxLocations_BoxLocationId",
                        column: x => x.BoxLocationId,
                        principalTable: "BoxLocations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Records_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AcousticDatas",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    SpeciesId = table.Column<string>(nullable: true),
                    PositiveMinute = table.Column<int>(nullable: false),
                    ContactNumbers = table.Column<int>(nullable: false),
                    Validation = table.Column<string>(nullable: true),
                    RecordId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AcousticDatas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AcousticDatas_Records_RecordId",
                        column: x => x.RecordId,
                        principalTable: "Records",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AcousticDatas_RecordId",
                table: "AcousticDatas",
                column: "RecordId");

            migrationBuilder.CreateIndex(
                name: "IX_BoxLocations_BoxId",
                table: "BoxLocations",
                column: "BoxId");

            migrationBuilder.CreateIndex(
                name: "IX_BoxLocations_OperatorId",
                table: "BoxLocations",
                column: "OperatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Records_BoxLocationId",
                table: "Records",
                column: "BoxLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_Records_ProjectId",
                table: "Records",
                column: "ProjectId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AcousticDatas");

            migrationBuilder.DropTable(
                name: "Records");

            migrationBuilder.DropTable(
                name: "BoxLocations");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropTable(
                name: "Boxes");

            migrationBuilder.DropTable(
                name: "Operators");
        }
    }
}
