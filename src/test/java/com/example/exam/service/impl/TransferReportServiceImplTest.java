package com.example.exam.service.impl;

import com.example.exam.service.ITransferReportService;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Map;

@SpringBootTest
class TransferReportServiceImplTest {

    @Autowired
    private ITransferReportService transferReportService;
    private static final Logger logger = LoggerFactory.getLogger(TransferReportServiceImplTest.class);

    @Test
    void getTransferTurnList() {
        String examRound, major, school;
        int order;
        logger.debug("NORMAL TEST:");
        examRound = "201";
        major = "m3";
        logger.debug("By major, examRound: " + examRound + " major: "+major);
        Map map = transferReportService.getTransferTurnList(examRound, 0, major, null);
        Object o = map.get("result");
    }



    @Test
    void getTurnSelectList() {
        logger.debug("NORMAL TEST:");
        for( int i = 0; i < 3; i++ )
            logger.debug( transferReportService.getTurnSelectList(i).toString() );

        logger.debug("ERROR TEST:");
        logger.debug( transferReportService.getTurnSelectList(10).toString() );
    }


}