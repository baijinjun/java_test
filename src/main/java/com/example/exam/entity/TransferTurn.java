package com.example.exam.entity;

import lombok.Data;

@Data
public class TransferTurn {
    int id;
    String examRound, major, school,  admissionNumber, name; // 次，专业，学校，论文标题，准考证号，姓名
}
