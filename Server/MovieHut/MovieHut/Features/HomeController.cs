namespace MovieHut.Features
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    public class HomeController : ApiController
    {
        [HttpGet]
        [Authorize]
        public ActionResult Get()
        {
            return Ok("It's working!");
        }
    }
}