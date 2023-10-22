using Microsoft.AspNetCore.Mvc;

namespace HtmxComponents.Controllers;

public class ComponentsController : Controller
{
    #region Content
    public IActionResult Badge() => View("Content/Badge");
    public IActionResult Card() => View("Content/Card");
    
    #endregion Content

    #region Layout
    public IActionResult Skeleton() => View("Content/Skeleton");

    #endregion Layout

    #region Interactive
    public IActionResult Button() => View("Content/Button");


    #endregion Interactive
}