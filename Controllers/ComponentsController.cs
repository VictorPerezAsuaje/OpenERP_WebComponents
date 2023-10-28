using Microsoft.AspNetCore.Mvc;

namespace HtmxComponents.Controllers;

public class TableItem
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public string Category { get; set; }
    public double Price { get; set; }
}

public class ComponentsController : Controller
{
    #region Content
    public IActionResult Badge() => View("Content/Badge");
    public IActionResult Card() => View("Content/Card");
    public IActionResult Title() => View("Content/Title");
    
    #endregion Content

    #region Layout


    #endregion Layout

    #region Interactive
    public IActionResult Button() => View("Interactive/Button");

    #endregion Interactive

    #region Tables

    [HttpGet("Components/GetAllTableData")]
    public IActionResult GetAllTableData()
    {
        List<TableItem> table = new List<TableItem>();

        for (int i = 1; i <= 1; i++)
        {
            Seed.TableItems.ForEach(x =>
            {
                table.Add(new TableItem
                {
                    Id = table.Count,
                    Name = x.Name,
                    Description = x.Description,
                    Category = x.Category,
                    Price = x.Price
                });
            });
        };

        return Ok(table);
    }

    public IActionResult Table() => View("Tables/Table");

    #endregion Tables
}

public class Seed
{
    public static List<TableItem> TableItems = new()
        {
            new TableItem
            {
                Id = 1,
                Name = "Solid Wood Coffee Table",
                Description = "Elegant and sturdy coffee table made from solid oak wood.",
                Category = "Furniture",
                Price = 299.99
            },
            new TableItem
            {
                Id = 2,
                Name = "Smart LED TV",
                Category = "Electronics",
                Price = 699.99
            },
            new TableItem
            {
                Id = 3,
                Name = "Stainless Steel Kitchen Knife Set",
                Description = "High-quality knife set with ergonomic handles and sharp blades.",
                Category = "Kitchen & Dining",
                Price = 49.99
            },
            new TableItem
            {
                Id = 4,
                Name = "Wireless Bluetooth Headphones",
                Description = "Over-ear wireless headphones with noise-canceling technology.",
                Category = "Electronics",
                Price = 129.99
            },
            new TableItem
            {
                Id = 5,
                Name = "Men's Leather Wallet",
                Description = "Genuine leather wallet with multiple card slots and a coin pocket.",
                Category = "Fashion",
                Price = 29.99
            },
            new TableItem
            {
                Id = 6,
                Name = "Outdoor Camping Tent",
                Description = "Spacious 4-person tent with waterproof rainfly and easy setup.",
                Category = "Sports & Outdoors",
                Price = 149.99
            },
            new TableItem
            {
                Id = 7,
                Name = "Digital Camera",
                Description = "20MP digital camera with 4K video recording and Wi-Fi connectivity.",
                Category = "Electronics",
                Price = 349.99
            },
            new TableItem
            {
                Id = 8,
                Name = "Bamboo Cutting Board Set",
                Description = "Set of 3 bamboo cutting boards in various sizes for kitchen use.",
                Category = "Kitchen & Dining",
                Price = 19.99
            },
            new TableItem
            {
                Id = 9,
                Name = "Fitness Tracker Watch",
                Description = "Waterproof fitness tracker with heart rate monitor and GPS functionality.",
                Category = "Sports & Outdoors",
                Price = 79.99
            },
            new TableItem
            {
                Id = 10,
                Name = "Robot Vacuum Cleaner",
                Description = "Smart robotic vacuum with app control and automatic charging.",
                Category = "Home & Kitchen",
                Price = 249.99
            },
            new TableItem
            {
                Id = 11,
                Name = "Wireless Charging Pad",
                Description = "Qi-compatible wireless charging pad for smartphones and accessories.",
                Category = "Electronics",
                Price = 19.99
            },
            new TableItem
            {
                Id = 12,
                Name = "Stylish Desk Lamp",
                Description = "Modern desk lamp with adjustable brightness and USB charging port.",
                Category = "Home & Kitchen",
                Price = 39.99
            },
            new TableItem
            {
                Id = 13,
                Name = "Children's Educational Toy Set",
                Description = "Set of educational toys for kids to enhance learning and creativity.",
                Category = "Toys & Games",
                Price = 29.99
            },
            new TableItem
            {
                Id = 14,
                Name = "Men's Sports Watch",
                Description = "Water-resistant sports watch with chronograph and durable design.",
                Category = "Sports & Outdoors",
                Price = 59.99
            },
            new TableItem
            {
                Id = 15,
                Name = "Smart Home Security Camera",
                Description = "Wireless security camera with motion detection and two-way audio.",
                Category = "Home & Kitchen",
                Price = 79.99
            },
            new TableItem
            {
                Id = 16,
                Name = "Gourmet Coffee Sampler",
                Description = "Assortment of gourmet coffee beans from around the world.",
                Category = "Grocery & Gourmet Food",
                Price = 24.99
            },
            new TableItem
            {
                Id = 17,
                Name = "Home Office Desk",
                Description = "Spacious and durable desk for a comfortable work-from-home setup.",
                Category = "Furniture",
                Price = 199.99
            },
            new TableItem
            {
                Id = 18,
                Name = "Smartphone Car Mount",
                Description = "Universal car mount for smartphones with adjustable viewing angles.",
                Category = "Automotive",
                Price = 14.99
            },
            new TableItem
            {
                Id = 19,
                Name = "Yoga Mat with Carrying Strap",
                Description = "Non-slip yoga mat for home and gym workouts with a convenient strap.",
                Category = "Sports & Outdoors",
                Price = 29.99
            },
            new TableItem
            {
                Id = 20,
                Name = "Wireless Gaming Mouse",
                Description = "High-precision wireless gaming mouse with customizable RGB lighting.",
                Category = "Computers & Accessories",
                Price = 39.99
            },
            new TableItem
            {
                Id = 21,
                Name = "Memory Foam Pillow Set",
                Description = "Set of two memory foam pillows for a restful night's sleep.",
                Category = "Home & Kitchen",
                Price = 49.99
            },
            new TableItem
            {
                Id = 22,
                Name = "Baby Diaper Bag Backpack",
                Description = "Spacious and stylish backpack for parents on the go with babies.",
                Category = "Baby Products",
                Price = 34.99
            },
            new TableItem
            {
                Id = 23,
                Name = "Stainless Steel Water Bottle",
                Description = "Durable stainless steel water bottle with vacuum insulation.",
                Category = "Sports & Outdoors",
                Price = 19.99
            },
            new TableItem
            {
                Id = 24,
                Name = "Wireless Earbuds",
                Description = "True wireless earbuds with Bluetooth 5.0 and noise-cancelling technology.",
                Category = "Electronics",
                Price = 79.99
            },
            new TableItem
            {
                Id = 25,
                Name = "Classic Hardcover Notebook",
                Description = "Elegant hardcover notebook with lined pages and a ribbon marker.",
                Category = "Office Products",
                Price = 9.99
            },
            new TableItem
            {
                Id = 26,
                Name = "Digital Kitchen Scale",
                Description = "Accurate digital kitchen scale for precise cooking and baking.",
                Category = "Kitchen & Dining",
                Price = 19.99
            },
            new TableItem
            {
                Id = 27,
                Name = "Wireless Security System",
                Description = "Comprehensive wireless security system with cameras and sensors.",
                Category = "Home & Kitchen",
                Price = 299.99
            },
            new TableItem
            {
                Id = 28,
                Name = "Travel Luggage Set",
                Description = "Durable 3-piece luggage set for hassle-free travel.",
                Category = "Luggage & Travel Gear",
                Price = 149.99
            },
            new TableItem
            {
                Id = 29,
                Name = "Indoor Plant Collection",
                Description = "Assortment of easy-to-care-for indoor plants to liven up your space.",
                Category = "Patio, Lawn & Garden",
                Price = 39.99
            },
            new TableItem
            {
                Id = 30,
                Name = "Professional Hair Dryer",
                Description = "Ionic hair dryer with multiple heat and speed settings for salon-quality results.",
                Category = "Beauty & Personal Care",
                Price = 49.99
            },
            new TableItem
            {
                Id = 31,
                Name = "Portable Bluetooth Speaker",
                Description = "Compact and waterproof Bluetooth speaker for on-the-go music.",
                Category = "Electronics",
                Price = 29.99
            },
            new TableItem
            {
                Id = 32,
                Name = "Wireless Charging Stand",
                Description = "Wireless charging stand for smartphones and smartwatches with fast charging capability.",
                Category = "Electronics",
                Price = 34.99
            },
            new TableItem
            {
                Id = 33,
                Name = "Stainless Steel Mixing Bowls",
                Description = "Set of 5 stainless steel mixing bowls with non-slip bases and measurement markings.",
                Category = "Kitchen & Dining",
                Price = 24.99
            },
            new TableItem
            {
                Id = 34,
                Name = "Men's Classic Sunglasses",
                Description = "Timeless and stylish sunglasses with UV protection.",
                Category = "Fashion",
                Price = 19.99
            },
            new TableItem
            {
                Id = 35,
                Name = "Robotic Lawn Mower",
                Description = "Smart robotic lawn mower for effortless lawn maintenance.",
                Category = "Patio, Lawn & Garden",
                Price = 349.99
            },
            new TableItem
            {
                Id = 36,
                Name = "Smart Home Thermostat",
                Description = "Programmable smart thermostat for efficient climate control.",
                Category = "Home & Kitchen",
                Price = 89.99
            },
            new TableItem
            {
                Id = 37,
                Name = "Wireless Gaming Keyboard",
                Description = "Mechanical gaming keyboard with customizable RGB lighting and macro support.",
                Category = "Computers & Accessories",
                Price = 59.99
            },
            new TableItem
            {
                Id = 38,
                Name = "Bamboo Fiber Bed Sheets",
                Description = "Luxurious and eco-friendly bed sheets made from bamboo fiber.",
                Category = "Home & Kitchen",
                Price = 39.99
            },
            new TableItem
            {
                Id = 39,
                Name = "Hiking Backpack with Hydration Pack",
                Description = "Durable hiking backpack with built-in hydration system for outdoor adventures.",
                Category = "Sports & Outdoors",
                Price = 74.99
            },
            new TableItem
            {
                Id = 40,
                Name = "Professional Espresso Machine",
                Description = "High-end espresso machine for barista-quality coffee at home.",
                Category = "Kitchen & Dining",
                Price = 399.99
            },
            new TableItem
            {
                Id = 41,
                Name = "Wireless Security Doorbell",
                Description = "Smart wireless doorbell with camera and two-way audio for home security.",
                Category = "Home & Kitchen",
                Price = 129.99
            },
            new TableItem
            {
                Id = 42,
                Name = "Kids' Educational Puzzle Set",
                Description = "Educational puzzle set for children's cognitive development and creativity.",
                Category = "Toys & Games",
                Price = 14.99
            },
            new TableItem
            {
                Id = 43,
                Name = "Portable External Hard Drive",
                Description = "High-capacity external hard drive for data storage and backup.",
                Category = "Computers & Accessories",
                Price = 79.99
            },
            new TableItem
            {
                Id = 44,
                Name = "Men's Leather Messenger Bag",
                Description = "Stylish and spacious leather messenger bag for work and travel.",
                Category = "Fashion",
                Price = 59.99
            },
            new TableItem
            {
                Id = 45,
                Name = "Multi-Function Food Processor",
                Description = "Versatile food processor with multiple attachments for food preparation.",
                Category = "Kitchen & Dining",
                Price = 79.99
            },
            new TableItem
            {
                Id = 46,
                Name = "Wireless Noise-Canceling Headphones",
                Description = "Premium wireless headphones with active noise-cancellation technology.",
                Category = "Electronics",
                Price = 199.99
            },
            new TableItem
            {
                Id = 47,
                Name = "Robot Pet Vacuum",
                Description = "Smart robotic vacuum designed for pet hair removal and cleaning.",
                Category = "Home & Kitchen",
                Price = 269.99
            },
            new TableItem
            {
                Id = 48,
                Name = "Camping Cookware Set",
                Description = "Compact camping cookware set for outdoor cooking and backpacking.",
                Category = "Sports & Outdoors",
                Price = 29.99
            },
            new TableItem
            {
                Id = 49,
                Name = "Digital Drawing Tablet",
                Description = "Graphics tablet for digital art and design with pressure sensitivity.",
                Category = "Computers & Accessories",
                Price = 149.99
            },
            new TableItem
            {
                Id = 50,
                Name = "Stainless Steel Insulated Tumbler",
                Description = "Insulated tumbler for hot and cold beverages with spill-resistant lid.",
                Category = "Kitchen & Dining",
                Price = 16.99
            },
            new TableItem
            {
                Id = 51,
                Name = "Men's Running Shoes",
                Description = "High-performance running shoes with cushioning and support.",
                Category = "Sports & Outdoors",
                Price = 79.99
            },
            new TableItem
            {
                Id = 52,
                Name = "Digital Photo Frame",
                Description = "Digital photo frame with high-resolution display and remote control.",
                Category = "Electronics",
                Price = 59.99
            },
            new TableItem
            {
                Id = 53,
                Name = "Personal Blender with Travel Lid",
                Description = "Single-serve blender for smoothies and shakes with a convenient travel lid.",
                Category = "Kitchen & Dining",
                Price = 29.99
            },
            new TableItem
            {
                Id = 54,
                Name = "Wooden Chess Set",
                Description = "Classic wooden chess set with handcrafted pieces and folding board.",
                Category = "Toys & Games",
                Price = 34.99
            },
            new TableItem
            {
                Id = 55,
                Name = "Smart Home Thermostat",
                Description = "Programmable smart thermostat for efficient climate control.",
                Category = "Home & Kitchen",
                Price = 89.99
            },
            new TableItem
            {
                Id = 56,
                Name = "Wireless Gaming Keyboard",
                Description = "Mechanical gaming keyboard with customizable RGB lighting and macro support.",
                Category = "Computers & Accessories",
                Price = 59.99
            },
            new TableItem
            {
                Id = 57,
                Name = "Bamboo Fiber Bed Sheets",
                Description = "Luxurious and eco-friendly bed sheets made from bamboo fiber.",
                Category = "Home & Kitchen",
                Price = 39.99
            },
            new TableItem
            {
                Id = 58,
                Name = "Hiking Backpack with Hydration Pack",
                Description = "Durable hiking backpack with built-in hydration system for outdoor adventures.",
                Category = "Sports & Outdoors",
                Price = 74.99
            },
            new TableItem
            {
                Id = 59,
                Name = "Professional Espresso Machine",
                Description = "High-end espresso machine for barista-quality coffee at home.",
                Category = "Kitchen & Dining",
                Price = 399.99
            },
            new TableItem
            {
                Id = 60,
                Name = "Wireless Security Doorbell",
                Description = "Smart wireless doorbell with camera and two-way audio for home security.",
                Category = "Home & Kitchen",
                Price = 129.99
            },
            new TableItem
            {
                Id = 61,
                Name = "Kids' Educational Puzzle Set",
                Description = "Educational puzzle set for children's cognitive development and creativity.",
                Category = "Toys & Games",
                Price = 14.99
            },
            new TableItem
            {
                Id = 62,
                Name = "Portable External Hard Drive",
                Description = "High-capacity external hard drive for data storage and backup.",
                Category = "Computers & Accessories",
                Price = 79.99
            },
            new TableItem
            {
                Id = 63,
                Name = "Men's Leather Messenger Bag",
                Description = "Stylish and spacious leather messenger bag for work and travel.",
                Category = "Fashion",
                Price = 59.99
            },
            new TableItem
            {
                Id = 64,
                Name = "Multi-Function Food Processor",
                Description = "Versatile food processor with multiple attachments for food preparation.",
                Category = "Kitchen & Dining",
                Price = 79.99
            },
            new TableItem
            {
                Id = 65,
                Name = "Wireless Noise-Canceling Headphones",
                Description = "Premium wireless headphones with active noise-cancellation technology.",
                Category = "Electronics",
                Price = 199.99
            },
            new TableItem
            {
                Id = 66,
                Name = "Robot Pet Vacuum",
                Description = "Smart robotic vacuum designed for pet hair removal and cleaning.",
                Category = "Home & Kitchen",
                Price = 269.99
            },
            new TableItem
            {
                Id = 67,
                Name = "Camping Cookware Set",
                Description = "Compact camping cookware set for outdoor cooking and backpacking.",
                Category = "Sports & Outdoors",
                Price = 29.99
            },
            new TableItem
            {
                Id = 68,
                Name = "Digital Drawing Tablet",
                Description = "Graphics tablet for digital art and design with pressure sensitivity.",
                Category = "Computers & Accessories",
                Price = 149.99
            },
            new TableItem
            {
                Id = 69,
                Name = "Stainless Steel Insulated Tumbler",
                Description = "Insulated tumbler for hot and cold beverages with spill-resistant lid.",
                Category = "Kitchen & Dining",
                Price = 16.99
            },
            new TableItem
            {
                Id = 70,
                Name = "Men's Running Shoes",
                Description = "High-performance running shoes with cushioning and support.",
                Category = "Sports & Outdoors",
                Price = 79.99
            },
            new TableItem
            {
                Id = 71,
                Name = "Digital Photo Frame",
                Description = "Digital photo frame with high-resolution display and remote control.",
                Category = "Electronics",
                Price = 59.99
            },
            new TableItem
            {
                Id = 72,
                Name = "Personal Blender with Travel Lid",
                Description = "Single-serve blender for smoothies and shakes with a convenient travel lid.",
                Category = "Kitchen & Dining",
                Price = 29.99
            },
            new TableItem
            {
                Id = 73,
                Name = "Wooden Chess Set",
                Description = "Classic wooden chess set with handcrafted pieces and folding board.",
                Category = "Toys & Games",
                Price = 34.99
            },
            new TableItem
            {
                Id = 74,
                Name = "Air Purifier with HEPA Filter",
                Description = "Air purifier with HEPA filter for clean and fresh indoor air quality.",
                Category = "Home & Kitchen",
                Price = 79.99
            },
            new TableItem
            {
                Id = 75,
                Name = "Wireless Charging Station",
                Description = "Wireless charging station for multiple devices with fast charging support.",
                Category = "Electronics",
                Price = 49.99
            },
            new TableItem
            {
                Id = 76,
                Name = "Outdoor Patio Furniture Set",
                Description = "Durable outdoor patio furniture set for relaxation and entertainment.",
                Category = "Patio, Lawn & Garden",
                Price = 499.99
            },
            new TableItem
            {
                Id = 77,
                Name = "Portable Jump Starter",
                Description = "Portable jump starter and power bank for cars and devices.",
                Category = "Automotive",
                Price = 79.99
            },
            new TableItem
            {
                Id = 78,
                Name = "Wireless Gaming Mouse",
                Description = "High-precision wireless gaming mouse with customizable RGB lighting.",
                Category = "Computers & Accessories",
                Price = 39.99
            },
            new TableItem
            {
                Id = 79,
                Name = "Ceramic Non-Stick Cookware Set",
                Description = "Non-stick ceramic cookware set for healthy cooking and easy cleanup.",
                Category = "Kitchen & Dining",
                Price = 89.99
            },
            new TableItem
            {
                Id = 80,
                Name = "Fitness Exercise Bike",
                Description = "Indoor fitness exercise bike with adjustable resistance and LCD display.",
                Category = "Sports & Outdoors",
                Price = 249.99
            },
            new TableItem
            {
                Id = 81,
                Name = "Smart LED Light Bulbs",
                Description = "Smart LED light bulbs with color-changing and voice control features.",
                Category = "Home & Kitchen",
                Price = 24.99
            },
            new TableItem
            {
                Id = 82,
                Name = "Kids' Outdoor Playhouse",
                Description = "Outdoor playhouse for children with slide and swing set.",
                Category = "Toys & Games",
                Price = 299.99
            },
            new TableItem
            {
                Id = 83,
                Name = "Professional Hair Straightener",
                Description = "Professional-grade hair straightener with ceramic plates and temperature control.",
                Category = "Beauty & Personal Care",
                Price = 49.99
            },
            new TableItem
            {
                Id = 84,
                Name = "Gourmet Chocolate Gift Box",
                Description = "Luxury chocolate gift box with a variety of artisanal chocolates.",
                Category = "Grocery & Gourmet Food",
                Price = 34.99
            },
            new TableItem
            {
                Id = 85,
                Name = "Wireless Earbuds with Charging Case",
                Description = "True wireless earbuds with a compact charging case and long battery life.",
                Category = "Electronics",
                Price = 59.99
            },
            new TableItem
            {
                Id = 86,
                Name = "Adjustable Dumbbell Set",
                Description = "Adjustable dumbbell set for versatile strength training at home.",
                Category = "Sports & Outdoors",
                Price = 129.99
            },
            new TableItem
            {
                Id = 87,
                Name = "Smart Home Camera System",
                Description = "Smart home camera system with multiple cameras for comprehensive security.",
                Category = "Home & Kitchen",
                Price = 349.99
            },
            new TableItem
            {
                Id = 88,
                Name = "Wireless Keyboard and Mouse Combo",
                Description = "Wireless keyboard and mouse combo for comfortable and clutter-free computing.",
                Category = "Computers & Accessories",
                Price = 29.99
            },
            new TableItem
            {
                Id = 89,
                Name = "Stylish Wall Clock",
                Description = "Modern and stylish wall clock with silent quartz movement.",
                Category = "Home & Kitchen",
                Price = 19.99
            },
            new TableItem
            {
                Id = 90,
                Name = "Baby Stroller Travel System",
                Description = "Travel system with a baby stroller and car seat for convenience and safety.",
                Category = "Baby Products",
                Price = 199.99
            },
            new TableItem
            {
                Id = 91,
                Name = "Stainless Steel Insulated Water Bottle",
                Description = "Insulated water bottle with a leak-proof lid for on-the-go hydration.",
                Category = "Sports & Outdoors",
                Price = 17.99
            },
            new TableItem
            {
                Id = 92,
                Name = "Smartphone Tripod Stand",
                Description = "Adjustable tripod stand for smartphones with remote control for photography and video recording.",
                Category = "Electronics",
                Price = 19.99
            },
            new TableItem
            {
                Id = 93,
                Name = "Faux Fur Throw Blanket",
                Description = "Soft and luxurious faux fur throw blanket for cozy nights.",
                Category = "Home & Kitchen",
                Price = 29.99
            },
            new TableItem
            {
                Id = 94,
                Name = "Educational STEM Building Set",
                Description = "STEM building set for kids to learn and play with science and engineering concepts.",
                Category = "Toys & Games",
                Price = 24.99
            },
            new TableItem
            {
                Id = 95,
                Name = "Smart Home Voice Assistant",
                Description = "Voice-activated smart home assistant for controlling devices and answering questions.",
                Category = "Electronics",
                Price = 39.99
            },
            new TableItem
            {
                Id = 96,
                Name = "Laptop Backpack with USB Charging Port",
                Description = "Laptop backpack with built-in USB charging port and anti-theft features.",
                Category = "Computers & Accessories",
                Price = 34.99
            },
            new TableItem
            {
                Id = 97,
                Name = "Electric Pressure Cooker",
                Description = "Electric pressure cooker with multiple cooking functions and safety features.",
                Category = "Kitchen & Dining",
                Price = 69.99
            },
            new TableItem
            {
                Id = 98,
                Name = "Wireless Outdoor Security Camera",
                Description = "Wireless outdoor security camera with weatherproof design and night vision.",
                Category = "Home & Kitchen",
                Price = 79.99
            },
            new TableItem
            {
                Id = 99,
                Name = "Leather Office Chair",
                Description = "Ergonomic leather office chair with adjustable features for comfort and support.",
                Category = "Furniture",
                Price = 129.99
            },
            new TableItem
            {
                Id = 100,
                Name = "Premium Wine Opener Set",
                Description = "Premium wine opener set with corkscrew, foil cutter, and wine stopper.",
                Category = "Kitchen & Dining",
                Price = 19.99
            }
        };
}