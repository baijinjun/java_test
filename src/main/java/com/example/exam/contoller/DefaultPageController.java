package com.example.exam.contoller;

import com.example.exam.utils.Const;
import com.example.exam.utils.CookieUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class DefaultPageController {
    @RequestMapping("/404")
    public String notFoundPage(){
        return "pages/404";
    }

    @RequestMapping("/500")
    public String serverErrorPage(){
        return "pages/500";
    }

    @RequestMapping("/index")
    public void redirectIndex(HttpServletResponse response){
        try {
            response.sendRedirect("/");
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

    // 登录注册相关页面
    @RequestMapping("/login")
    public ModelAndView toLoginPage(){
        ModelAndView modelAndView = new ModelAndView("/login");
        modelAndView.addObject("pageNameHtml", Const.SITE_NAME_HTML);
        modelAndView.addObject("pageName", Const.SITE_NAME);
        return modelAndView;
    }

    @RequestMapping("/register")
    public ModelAndView registerPage(){
        ModelAndView modelAndView = new ModelAndView("/register");
        modelAndView.addObject("pageNameHtml", Const.SITE_NAME_HTML);
        modelAndView.addObject("pageName", Const.SITE_NAME);
        return modelAndView;
    }

    @RequestMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response){
        CookieUtils.removeCookie(request,response,"name");
        CookieUtils.removeCookie(request,response,"uid");
        try{
            response.sendRedirect("/login");
        }
        catch (IOException e){
            e.printStackTrace();
        }
    }
}
