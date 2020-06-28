package com.example.exam.entity;

import lombok.Data;

@Data
public class JsonResult {
    int code;
    String message;
    Object data;

    public JsonResult(int code, String message) {
        this.code = code;
        this.message = message;
        this.data = null;
    }

    public JsonResult(int code, String message, Object data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
