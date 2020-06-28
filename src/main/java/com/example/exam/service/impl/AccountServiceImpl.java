package com.example.exam.service.impl;

import com.example.exam.dao.AccountMapper;
import com.example.exam.entity.Account;
import com.example.exam.entity.JsonResult;
import com.example.exam.service.IAccountService;
import com.example.exam.utils.CookieUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

/**
 * Service 层 实现业务逻辑
 */
@Service
public class AccountServiceImpl implements IAccountService {
    @Resource
    private AccountMapper accountMapper;

    @Transactional
    @Override
    public boolean checkEmail(String email) {
        return accountMapper.getEmail(email) == null;
    }

    @Transactional
    @Override
    public Map add(String email, String password, String name, int usertype, String studentId) {
        if( accountMapper.getEmail(email) == null ){
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            String encodedPassword = encoder.encode(password);
            int result = accountMapper.add(email, password, name, usertype, studentId);
            if( result < 1 ){
                return null;
            }
            else return accountMapper.getInfo(email);
        }
        return null;
    }

    @Transactional
    @Override
    public Map checkLogin(String email, String password) {
        Map map = accountMapper.getInfo(email);
        if( map == null ){
            map = new HashMap<String, String>();
            map.put("code", "1");
        }
        else{
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            if (!encoder.matches(password, map.get("password").toString())) { // 判断是否匹配
                map.put("code", "2");
            } else map.put("code", 0);
        }
        return map;
    }
}
