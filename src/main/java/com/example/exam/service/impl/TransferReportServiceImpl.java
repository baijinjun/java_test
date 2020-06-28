package com.example.exam.service.impl;

import com.example.exam.dao.TransferReportMapper;
import com.example.exam.service.ITransferReportService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

@Service
public class TransferReportServiceImpl implements ITransferReportService {
    @Resource
    private TransferReportMapper transferReportMapper;

    @Transactional
    @Override
    public Map getTransferTurnList(String examRound, int order, String major, String school) {
        HashMap<Object, Object> map = new HashMap<>();
        Object result = null;
        if(order == 0){ // 0按专业，1按学校
            if(major == null){
                map.put("error", 2);
                return map;
            }
            else{
                result = transferReportMapper.getTransferTurnByMajor(examRound, major);
            }
        }
        else if(order == 1){
            if(school == null){
                map.put("error", 2);
                return map;
            }
            else{
                result = transferReportMapper.getTransferTurnBySchool(examRound, school);
            }
        }
        if(result == null){
            map.put("error", 1);
        }
        else {
            map.put("error", 0);
            map.put("result", result);
        }
        return map;
    }



    @Transactional
    @Override
    public Map getTurnSelectList(int type) {
        HashMap<Object, Object> map = new HashMap<>();
        switch (type){
            case 0: // exam
                map.put("result", transferReportMapper.getTurnExamRoundList());
                break;
            case 1: // major
                map.put("result", transferReportMapper.getTurnMajorList());
                break;
            case 2: // school
                map.put("result", transferReportMapper.getTurnSchoolList());
                break;
            default:
                map.put("error", 1);
                return map;
        }
        map.put("error", 0);
        return map;
    }


}
