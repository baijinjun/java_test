package com.example.exam.contoller;

import com.example.exam.entity.JsonResult;
import com.example.exam.service.IAccountService;
import com.example.exam.utils.CookieUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * Controller层 用于与用户视图的交互
 */
@RestController
@RequestMapping("/account")
public class AccountController {
    @Autowired
    private IAccountService accountService;

    @ResponseBody  // 以此使返回的数据能够被ajax处理
    @PostMapping("/checkEmail")
    // 简单的参数接收方法。若缺失字段会报错。字段名完全一致时可以省略@RequestParam注解
    public JsonResult checkEmail(@RequestParam(name = "email")String email){
        if(accountService.checkEmail(email)){
            return new JsonResult(0, "可用");
        }
        else return new JsonResult(1, "冲突");
    }

    @ResponseBody
    @PostMapping("/create")
    // 可以设置默认值情况
    public JsonResult create(HttpServletResponse response, String email, String password, String name,
                             @RequestParam(name = "usertype", defaultValue = "0") int usertype,
                             @RequestParam(name = "studentId", required = false) String studentId){
        Map map = accountService.add(email, password, name, usertype, studentId);
        if(map != null){
            CookieUtils.setCookie(response, "uid", map.get("uid").toString(), -1);
            CookieUtils.setCookie(response, "name", map.get("name").toString(), -1);
            return new JsonResult(0, "success");
        }
        else{
            return new JsonResult(1, "错误");
        }
    }

    @ResponseBody
    @PostMapping("/login")
    public JsonResult login(HttpServletResponse response, String email, String password){
        Map map = accountService.checkLogin(email, password);
        if( "0".equals(map.get("code").toString()) ) {
            CookieUtils.setCookie(response, "uid", map.get("uid").toString(), -1);
            CookieUtils.setCookie(response, "name", map.get("name").toString(), -1);
            return new JsonResult(0, "登录成功");
        }
        else{
            return new JsonResult(1, "用户名或密码错误");
        }
    }
}
