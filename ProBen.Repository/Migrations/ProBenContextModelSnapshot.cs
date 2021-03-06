﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ProBen.Repository;

namespace ProBen.Repository.Migrations
{
    [DbContext(typeof(ProBenContext))]
    partial class ProBenContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity("ProBen.Domain.Beneficio", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DataCriacao");

                    b.Property<string>("ImagemUrl");

                    b.Property<string>("Nome");

                    b.HasKey("Id");

                    b.ToTable("Beneficios");
                });

            modelBuilder.Entity("ProBen.Domain.Categoria", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("BeneficioId");

                    b.Property<DateTime>("DataCriacao");

                    b.Property<string>("Nome");

                    b.HasKey("Id");

                    b.HasIndex("BeneficioId");

                    b.ToTable("Categorias");
                });

            modelBuilder.Entity("ProBen.Domain.Orgao", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DataCriacao");

                    b.Property<string>("Nome");

                    b.Property<int>("ServidorId");

                    b.HasKey("Id");

                    b.HasIndex("ServidorId");

                    b.ToTable("Orgaos");
                });

            modelBuilder.Entity("ProBen.Domain.Servidor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("BeneficioId");

                    b.Property<string>("Cpf");

                    b.Property<DateTime>("DataCriacao");

                    b.Property<string>("Email");

                    b.Property<int>("Matricula");

                    b.Property<string>("Nome");

                    b.Property<string>("Telefone");

                    b.HasKey("Id");

                    b.HasIndex("BeneficioId");

                    b.ToTable("Servidores");
                });

            modelBuilder.Entity("ProBen.Domain.Setor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("BeneficioId");

                    b.Property<DateTime>("DataCriacao");

                    b.Property<string>("Nome");

                    b.HasKey("Id");

                    b.HasIndex("BeneficioId");

                    b.ToTable("Orgaos");
                });

            modelBuilder.Entity("ProBen.Domain.Categoria", b =>
                {
                    b.HasOne("ProBen.Domain.Beneficio", "Beneficio")
                        .WithMany("Categorias")
                        .HasForeignKey("BeneficioId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ProBen.Domain.Orgao", b =>
                {
                    b.HasOne("ProBen.Domain.Servidor", "Servidor")
                        .WithMany("Orgaos")
                        .HasForeignKey("ServidorId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ProBen.Domain.Servidor", b =>
                {
                    b.HasOne("ProBen.Domain.Beneficio", "Beneficio")
                        .WithMany("Servidores")
                        .HasForeignKey("BeneficioId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ProBen.Domain.Setor", b =>
                {
                    b.HasOne("ProBen.Domain.Beneficio", "Beneficio")
                        .WithMany("Orgaos")
                        .HasForeignKey("BeneficioId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
