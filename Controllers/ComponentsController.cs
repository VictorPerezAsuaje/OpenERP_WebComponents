using Microsoft.AspNetCore.Mvc;

namespace HtmxComponents.Controllers;

public class ComponentsController : Controller
{
    public IActionResult Card() => View("Content/Card");
}