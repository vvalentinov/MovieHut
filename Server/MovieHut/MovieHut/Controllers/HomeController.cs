namespace MovieHut.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        public ActionResult Get()
        {
            return Ok("It's working!");
        }
    }
}