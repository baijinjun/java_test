package com.example.exam.service;



import com.example.exam.entity.Account;

import java.util.Map;

public interface IAccountService {
    // 邮箱验证
    public boolean checkEmail(String email);

    // 添加新用户
    public Map add(String email, String password, String name, int usertype, String studentId);

    // 密码验证
    public Map checkLogin(String email, String password);
}
