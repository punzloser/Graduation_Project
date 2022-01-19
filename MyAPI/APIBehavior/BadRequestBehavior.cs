using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.APIBehavior
{
    public class BadRequestBehavior
    {
        public static void Parse(ApiBehaviorOptions opt)
        {
            opt.InvalidModelStateResponseFactory = context =>
            {
                var response = new List<string>();
                foreach (var key in context.ModelState.Keys)
                {
                    foreach (var err in context.ModelState[key].Errors)
                    {
                        response.Add($"{key}: {err.ErrorMessage}");
                    }
                }
                return new BadRequestObjectResult(response);
            };
        }
    }
}
