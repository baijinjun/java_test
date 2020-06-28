package com.example.exam.utils;

public class Const {
    public static final String SITE_NAME = "考籍管理";
    public static final String SITE_NAME_HTML = "<b>考籍管理</b>系统";

    // 用户权限所对应的功能菜单
    public static final Page[] pages = {
            new Page("功能1", "foo", "user-tie", 1, null),
            new Page("功能2", "bar", "th-list",2, null),
            new Page("功能3", "baz", "globe-americas", 1, new Page[]{
                    new Page("子功能1", "qux", "shopping-cart", 1, null)}),
            new Page("功能4", "baz", "globe-americas", 1, new Page[]{
                    new Page("子功能2", "qux", "shopping-cart", 1, new Page[]{
                            new Page("三级功能", "foobar", "shopping-cart", 1, null)
                    })
            }),

            new Page("考籍转入转出管理", "#", "globe-americas", 1, new Page[]{


                    new Page("考籍转入转出报表", "transfer-report/turn", "shopping-cart", 8, null)

            })

    };
}
