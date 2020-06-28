package com.example.exam.utils;

import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

public class PageUtils {
    public static void bindPageData(ModelAndView modelAndView, String pageTitle, String tableTitle, String pagejs) {
        // 页面标题
        Map<String, String> map;
        map = new HashMap<>();
        map.put("siteName", Const.SITE_NAME);
        map.put("siteNameHtml", Const.SITE_NAME_HTML);
        modelAndView.addObject("site", map);

        map = new HashMap<>();
        map.put("pageTitle", pageTitle);
        map.put("tableTitle", tableTitle);
        modelAndView.addObject("page", map);

        // 页面脚本地址
        modelAndView.addObject("pagejs", pagejs);
    }

    public static void bindUserData(ModelAndView modelAndView, HttpServletRequest request){

        Map<String, String> map = new HashMap<>();
        map.put("name", CookieUtils.getCookieValue(request, "name"));

        modelAndView.addObject("user", map);
    }
}
