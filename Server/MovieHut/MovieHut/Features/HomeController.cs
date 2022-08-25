namespace MovieHut.Features
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    public class HomeController : ApiController
    {
        [Authorize]
        [HttpGet]
        public ActionResult Get()
        {
            return Ok("It's working!");
        }
    }
}