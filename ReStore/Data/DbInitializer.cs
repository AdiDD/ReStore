using ReStore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReStore.Data
{
    public static class DbInitializer
    {
        public static void Initialize(StoreContext context)
        {
            if (context.Products.Any()) return;

            var products = new List<Product> 
            { 
                new Product
                {
                    Name = "Redis Red Boots",
                    Description = "This is a random description of a product. This is a random description of a product. This is a random description of a product. This is a random description of a product.This is a random description of a product.",
                    Price = 2500,
                    PictureUrl = "/images/products/boots.jpg",
                    Brand = "Redis",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Redis Red Boots",
                    Description = "This is a random description of a product. This is a random description of a product. This is a random description of a product. This is a random description of a product.This is a random description of a product.",
                    Price = 2500,
                    PictureUrl = "/images/products/boots.jpg",
                    Brand = "Redis",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Angular Yellow Boots",
                    Description = "This is a random description of a product. This is a random description of a product. This is a random description of a product. This is a random description of a product.This is a random description of a product.",
                    Price = 2500,
                    PictureUrl = "/images/products/boots.jpg",
                    Brand = "Angular",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Angular Yellow Boots",
                    Description = "This is a random description of a product. This is a random description of a product. This is a random description of a product. This is a random description of a product.This is a random description of a product.",
                    Price = 2500,
                    PictureUrl = "/images/products/boots.jpg",
                    Brand = "Angular",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "NetCore Red Boots",
                    Description = "This is a random description of a product. This is a random description of a product. This is a random description of a product. This is a random description of a product.This is a random description of a product.",
                    Price = 2500,
                    PictureUrl = "/images/products/boots.jpg",
                    Brand = "NetCore",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "NetCore Red Boots",
                    Description = "This is a random description of a product. This is a random description of a product. This is a random description of a product. This is a random description of a product.This is a random description of a product.",
                    Price = 2500,
                    PictureUrl = "/images/products/boots.jpg",
                    Brand = "NetCore",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "React Yellow Boots",
                    Description = "This is a random description of a product. This is a random description of a product. This is a random description of a product. This is a random description of a product.This is a random description of a product.",
                    Price = 2500,
                    PictureUrl = "/images/products/boots.jpg",
                    Brand = "React",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "React Yellow Boots",
                    Description = "This is a random description of a product. This is a random description of a product. This is a random description of a product. This is a random description of a product.This is a random description of a product.",
                    Price = 2500,
                    PictureUrl = "/images/products/boots.jpg",
                    Brand = "React",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Vs Code Red Boots",
                    Description = "This is a random description of a product. This is a random description of a product. This is a random description of a product. This is a random description of a product.This is a random description of a product.",
                    Price = 2500,
                    PictureUrl = "/images/products/boots.jpg",
                    Brand = "Vs Code",
                    Type = "Boots",
                    QuantityInStock = 100
                },
            };

            foreach (var product in products)
            {
                context.Products.Add(product);
            }

            context.SaveChanges();
        }
    }
}
