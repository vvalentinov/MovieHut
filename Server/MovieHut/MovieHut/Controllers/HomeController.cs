namespace MovieHut.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    public class HomeController : ApiController
    {
        [Authorize]
        public ActionResult Get()
        {
            return Ok("It's working!");
        }
    }
}