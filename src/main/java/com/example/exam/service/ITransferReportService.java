package com.example.exam.service;

import java.util.Map;

public interface ITransferReportService {
    Map getTransferTurnList(String examRound, int order, String major, String school);


    Map getTurnSelectList(int type);

}
