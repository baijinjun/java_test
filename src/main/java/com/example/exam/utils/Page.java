package com.example.exam.utils;

/**
 * 用于存储导航栏菜单的值（模块名，模块链接，功能图标，功能权限，子菜单）
 */
public class Page {
    public String pageName, pageLink, pageIcon;
    public int auth;
    public Page[] subpages;

    public Page(String pageName, String pageLink, String pageIcon, int auth, Page[] subpages) {
        this.pageName = pageName;
        this.pageLink = pageLink;
        this.pageIcon = pageIcon;
        this.auth = auth;
        this.subpages = subpages;
    }
}
