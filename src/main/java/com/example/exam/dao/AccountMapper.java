package com.example.exam.dao;

import com.example.exam.entity.Account;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Mapper
public interface AccountMapper {
    // 注解写法
    // 注册查重
    @Select("SELECT `email` FROM `account` WHERE `email` = #{email} limit 1")
    public String getEmail(String email);
    
    // XML写法，用于复杂逻辑。在resource/mapper/类名(AccountMapper).xml中配置
    // 添加新用户
    public int add(String email, String password, String name, int usertype, String studentId);
    
    // 密码验证
    @Select("SELECT `password`, `uid`, `name` FROM `account` WHERE `email` = #{email} limit 1")
    public Map getInfo(String email);
}
