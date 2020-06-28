package com.example.exam.contoller;

import com.example.exam.utils.Const;
import com.example.exam.utils.PageUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/demo")
public class DemoController {
    @RequestMapping("")
    public ModelAndView demoPage(HttpServletRequest request){
        ModelAndView modelAndView = new ModelAndView("/demo");
        // 用户数据
        PageUtils.bindUserData(modelAndView, request);

        // 左侧导航栏,根据用户权限创建导航栏数组
        modelAndView.addObject("links", Const.pages);

        // 页面元素
        PageUtils.bindPageData(modelAndView, "DEMO页", "卡片TITLE", "index.js");

        return modelAndView;
    }
}
