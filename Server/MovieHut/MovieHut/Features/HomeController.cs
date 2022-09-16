namespace MovieHut.Features
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using MovieHut.Features.Base;

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