package com.example.exam.dao;

import com.example.exam.entity.TransferTurn;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface TransferReportMapper {
    @Select("SELECT * FROM `transfer_turn` WHERE `exam_round` = #{examRound} AND `major` = #{major}")
    public TransferTurn[] getTransferTurnByMajor(String examRound, String major);

    @Select("SELECT * FROM `transfer_turn` WHERE `exam_round` = #{examRound} AND `school` = #{school}")
    public TransferTurn[] getTransferTurnBySchool(String examRound, String school);

    @Select("SELECT DISTINCT `exam_round` FROM `transfer_turn`")
    public List<String>getTurnExamRoundList();

    @Select("SELECT DISTINCT `major` FROM `transfer_turn`")
    public List<String> getTurnMajorList();

    @Select("SELECT DISTINCT `school` FROM `transfer_turn`")
    public List<String>getTurnSchoolList();




}
