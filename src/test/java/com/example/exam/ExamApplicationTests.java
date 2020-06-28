package com.example.exam;

import com.example.exam.dao.AccountMapper;
import com.example.exam.service.impl.AccountServiceImpl;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

@SpringBootTest
class ExamApplicationTests {

    @Test
    void contextLoads() {
    }

    private static final Logger logger = LoggerFactory.getLogger(ExamApplicationTests.class);

}
