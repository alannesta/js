/*
    在Javascript中所有的参数传递都是按值传递的。也就是说把函数外部的值复制给函数内部的参数，就和把值从一个变量复制到另一个变量一样。基本类型值的传递如同基本类型变量的复制一样，而引用类型值的传递，就如同引用类型变量的复制一样。

　　          —— 《Javascript 高级程序设计》 第三版
*/
var num = 10,
    name = "Addy Osmani",
    obj1 = {
      value: "first value"
    },
    obj2 = {
     value: "second value"
    },

    obj3 = obj2;

    // obj2 = {
    //     value: 'new value'
    // }
    // console.log(obj3);      // {value: second value}; obj2 now points to a totally different object, the link between the two reference are cut off

 
function change(number, name, obj1, obj2) {
    number = number * 10;
    name = "Paul Irish";
    //obj1.value = "alan"   //this will change the value of obj1, because they point to the same address

    obj1 = obj2;        //the value of the "reference" is changed, won't change the obj1 outside the function scope.(just a copy of obj1(the value of obj1) is passed into the function )
    obj2.value = "new value";
}
 
// change(num, name, obj1, obj2);
 
// console.log(num); // 10
// console.log(name);// "Addy Osmani"
// console.log(obj1.value);//"first value"
// console.log(obj2.value);//"new value"
// console.log(obj3.value);//"new value"