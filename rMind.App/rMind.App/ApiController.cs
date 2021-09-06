using Microsoft.AspNetCore.Mvc;

namespace rMind.App;

[Route("[controller]")]
[ApiController]
public class ApiController : ControllerBase
{
    [HttpGet("CreateNode")]
    public ActionResult CreateNode()
    {
        return new JsonResult(Guid.NewGuid());
    }
}
