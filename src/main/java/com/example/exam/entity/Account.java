package com.example.exam.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

// 通过注解自动生成getter、setter和toString方法

@Setter
@ToString
public class Account {
    int uid, usertype;
    String email, name, studentId;

    public int getUid() {
        return uid;
    }

    public int getUsertype() {
        return usertype;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public String getStudentId() {
        return studentId;
    }
}
