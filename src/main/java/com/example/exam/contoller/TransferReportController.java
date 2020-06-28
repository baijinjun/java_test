package com.example.exam.contoller;

import com.example.exam.entity.JsonResult;
import com.example.exam.service.ITransferReportService;
import com.example.exam.utils.Const;
import com.example.exam.utils.PageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequestMapping("/transfer-report")
public class TransferReportController {

    @Autowired
    private ITransferReportService transferReportService;

    @RequestMapping("/turn")
    public ModelAndView 考籍转入转出统计Pape(HttpServletRequest request){
        ModelAndView modelAndView = new ModelAndView("/transfer-report-turn");
        // 用户数据
        PageUtils.bindUserData(modelAndView, request);

        // 左侧导航栏,根据用户权限创建导航栏数组
        modelAndView.addObject("links", Const.pages);

        // 页面元素
        PageUtils.bindPageData(modelAndView, "考籍转入转出统计管理", "考籍转入转出统计", "trans-report/turn.js");

        modelAndView.addObject("pageFunction","turn");
        modelAndView.addObject("examRounds",transferReportService.getTurnSelectList(0).get("result"));
        modelAndView.addObject("majors",transferReportService.getTurnSelectList(1).get("result"));
        modelAndView.addObject("schools", transferReportService.getTurnSelectList(2).get("result"));
        return modelAndView;
    }

    @PostMapping("/get-turn-result")
    public JsonResult getTurnResult(String examRound,
                                    @RequestParam(name = "order", defaultValue = "0") int order, // 0按专业，1按学校
                                    @RequestParam(name = "major", required = false) String major,
                                    @RequestParam(name = "school", required = false) String school){

        Map map = transferReportService.getTransferTurnList(examRound, order, major, school);
        int code = (int)map.get("error");
        switch (code){
            case 0:
                return new JsonResult(0, "SUCCESS", map.get("result"));
            case 1:
                return new JsonResult(1, "NOT FOUND");
            case 2: // 参数错误
                return new JsonResult(2, "参数错误");
        }
        return new JsonResult(-1, "ERROR");
    }

    @PostMapping("/get-turn-select")
    public JsonResult getTurnSelect(int type){
        Map map = transferReportService.getTurnSelectList(type);
        int code = (int)map.get("error");
        switch (code){
            case 0:
                return new JsonResult(0, "SUCCESS", map.get("result"));
            case 1:
                return new JsonResult(1, "参数错误");
        }
        return new JsonResult(-1, "ERROR");
    }

    // ===============================================================






}
