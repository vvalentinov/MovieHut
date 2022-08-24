namespace MovieHut.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    public class HomeController : ApiController
    {
        public ActionResult Get()
        {
            return Ok("It's working!");
        }
    }
}