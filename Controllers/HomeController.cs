using HtmxComponents.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace HtmxComponents.Controllers;

[Route("")]
public class HomeController : Controller
{
    [HttpGet("")]
    public IActionResult Index() => View();

    [HttpGet("Overview")]
    public IActionResult Overview() => View("Overview");

    [HttpGet("Changelog")]
    public IActionResult Changelog() => View("Changelog");

    [HttpGet("NotFound")]
    public IActionResult Error404() => View("NotFound");

    [HttpGet("Error")]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { 
            RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier 
        });
    }
}
