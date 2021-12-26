using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.Filters
{
    public class ParseBadRequest : IActionFilter
    {
        void IActionFilter.OnActionExecuted(ActionExecutedContext context)
        {
            var result = context.Result as IStatusCodeActionResult;
            if (result == null) return;

            var statusCode = result.StatusCode;
            if (statusCode == 400)
            {
                var response = new List<string>();
                var badRequestObjResult = context.Result as BadRequestObjectResult;

                if (badRequestObjResult.Value is string)
                {
                    response.Add(badRequestObjResult.Value.ToString());
                }
                else
                {
                    foreach (var key in context.ModelState.Keys)
                    {
                        foreach (var err in context.ModelState[key].Errors)
                        {
                            response.Add($"{key}: {err.ErrorMessage}");
                        }
                    }
                }
                context.Result = new BadRequestObjectResult(response);
            }
        }

        void IActionFilter.OnActionExecuting(ActionExecutingContext context) { }
    }
}
