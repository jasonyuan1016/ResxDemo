var pr = {};//各模块的翻译内容收集到一起

$(async function(){
    //读取当前语言
    const lang = localStorage.getItem('language') || 'zh-cn';
    await loadResx(lang,["product","user"]);
    console.log(resx);
    console.log(pr);
    //遍历页面上的翻译标签(gr-id)，分别读取resx的内容
    $("[gr-id]").each(function(){
        const id = $(this).attr("gr-id");
        //判断当前元素类型
        $(this).html(resx[id]);
    });
    
    //遍历页面上的翻译标签(pr-id)，分别读取pr的内容
    $("[pr-id]").each(function(){
        const id = $(this).attr("pr-id");
        $(this).html(pr[id]);
    });

    $("#sltLang").val(lang);
    $("#divLoadResxInJs").text("resx.welcome:" + resx.welcome + "|pr.account:" + pr.account + "|resx_user.account:" + resx_user.account);
    console.log($("#divLongText").html());
   
});

function changeLang() {
    console.log("change");
        const lang = $("#sltLang").val();
        localStorage.setItem('language', lang);
        location.reload();
}

async function loadResx(lang,models) {
    //读取global
    await $.getScript(`./js/resx/global.${lang}.js`, function(data, textStatus, jqxhr) {
        console.log(data);  // Data returned
        console.log(textStatus); // Success
        console.log(jqxhr); // 200
    })
    
    //读取指定模块
    for (let i = 0; i < models.length; i++) {
        const element = models[i];
        await $.getScript(`./js/resx/${lang}/${element}.js`, function(data, textStatus, jqxhr) {
            console.log(data);  // Data returned
            console.log(textStatus); // Success
            console.log(jqxhr); // 200
             // 使用 window 对象动态获取变量值
            var resx_element = window["resx_" + element];
            // 将resx_element的key-value内容追加到pr
            Object.assign(pr,resx_element);
        })
    }
}