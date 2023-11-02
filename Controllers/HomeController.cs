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

    [HttpGet("Theming")]
    public IActionResult Theming() => View("Theming");

    [HttpGet("Icons")]
    public IActionResult Icons() => View("Icons");

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
