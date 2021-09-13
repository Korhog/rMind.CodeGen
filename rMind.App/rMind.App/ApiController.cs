using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using rMind.Core;
using rMind.Core.Api;

namespace rMind.App;

[Route("[controller]")]
[ApiController]
public class ApiController : ControllerBase
{
    private readonly IEngine _engine;
    
    /// <summary>
    /// Default constructor.
    /// </summary>
    /// <param name="engine">rMind Node Engine singleton</param>
    public ApiController(IEngine engine) => _engine = engine;


    [HttpPost("CreateNode")]
    public ActionResult CreateNode(CreateNodeRequest request) => new JsonResult(_engine.CreateNode(request.DescriptorId));

    [HttpPost("CreateWire")]
    public ActionResult<bool> CreateWire(CreateWireRequest request)
    {
        return true;
    }
}
