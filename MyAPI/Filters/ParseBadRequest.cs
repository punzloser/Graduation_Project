using Microsoft.AspNetCore.Identity;
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
                else if (badRequestObjResult.Value is IEnumerable<IdentityError> errors)
                {
                    foreach (var err in errors)
                    {
                        if(err.Code.Contains("Short"))
                        {
                            response.Add("Mật khẩu có ít nhất 6 kí tự");
                        }
                        else if (err.Code.Contains("Alphanumeric"))
                        {
                            response.Add("Mật khẩu phải chứa ít nhất 1 kí tự đặc biệt");
                        }
                        else if (err.Code.Contains("Lower"))
                        {
                            response.Add("Mật khẩu có ít nhất chữ cái viết thường từ a -> z");
                        }
                        else if (err.Code.Contains("Upper"))
                        {
                            response.Add("Mật khẩu có ít nhất chữ cái viết hoa từ A -> Z");
                        }
                        else if (err.Code.Contains("Digit"))
                        {
                            response.Add("Mật khẩu có ít nhất 1 chữ số từ 0 -> 9");
                        }
                        else if (err.Code.Contains("Duplicate"))
                        {
                            response.Add("Tài khoản có email này đã tồn tại !");
                        }
                        else
                        {
                            response.Add(err.Description);
                        }


                    }
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
