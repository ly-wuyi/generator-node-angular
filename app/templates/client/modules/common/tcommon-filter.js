/**
 * Created by MXH on 2015/9/28.
 */
angular.module("tcommon")
    .filter("genderFilter",function(){
        return function(input){
            var map = {
                male : "男士",
                female : "女士"
            };
            return map[input] ? map[input] : "";
        };
    })
    .filter("certificateFilter",function(){
        return function(input){
            var map = {
                shengfengzheng : "身份证"
            };
            return map[input] ? map[input] : "";
        };
    })
    .filter("StatusFilter",function(){
        return function(input){
            var map = {
                QUIT : "退网",
                INTENTION : "意向",
                RECTIFICATION : "停业整顿",
                NORMAL: "正常营业"
            };
            return map[input] ? map[input] : "";
        };

    })
    .filter("conditionFilter",function(){
        return function(input){
            var map = {

                //车况查询
                vquy0001:"左前门状态",
                vquy0002:"右前门状态",
                vquy0003:"左后门状态",
                vquy0004:"右后门状态",
                vquy0005:"前舱盖状态",
                vquy0006:"后舱盖状态",
                vquy0007:"油量",
                vquy0008:"左前轮胎压",
                vquy0009:"右前轮胎压",
                vquy0010:"左后轮胎压",
                vquy0011:"右后轮胎压",
                vquy0012:"驻车灯",
                vquy0013:"左前轮温度",
                vquy0014:"右前轮温度",
                vquy0015:"左后轮温度",
                vquy0016:"右后轮温度",
                vquy0017:"电池电压",
                vquy0018:"里程(总里程)",
                vquy0019:"油压状态",
                vquy0021:"天窗状态",
                vquy0022:"大灯",
                vquy0023:"冷却液(液位)",
                vquy0024:"制动液低警告",
                vquy0025:"水温",
                vquy0026:"续航里程",
                vquy0027:"左前轮",
                vquy0028:"右前轮",
                vquy0029:"左后轮",
                vquy0030:"右后轮",
                //车辆控制
                vctl0001:"远程设防",
                vctl0002:"远程解防",
                vctl0003:"远程寻车",
                vctl0004:"远程送风",
                vctl0005:"远程自动升降窗",
                vctl0006:"远程天窗",
                vctl0007:"远程鸣笛",
                vctl0008:"远程闪灯(近光灯)",
                //车辆自助诊断
                vdig0001:"ABM",
                vdig0002:"BSM",
                vdig0003:"TCU",
                vdig0004:"icm",
                vdig0005:"TPMS",
                vdig0006:"Radar",
                vdig0007:"APM",
                vdig0008:"EMS",
                vdig0009:"BCM",
                vdig0010:"AVM"
            };
            return map[input] ? map[input] : "";
        };

    })
    .filter("dateFilter",function(){
        return function(date){
            return  date.slice(0,4)+'-'+date.slice(4,6)+'-'+date.slice(6,8)+' '+date.slice(8,10)+':'+date.slice(8,10)+':'+date.slice(10,12);
        };

    })
;
