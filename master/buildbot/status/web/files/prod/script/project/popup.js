define(["helpers","text!templates/popups.html","mustache"],function(e,t,n){var r;return r={init:function(){$(".popup-btn-js-2").click(function(e){e.preventDefault(),r.nonAjaxPopup($(this))}),$(".popup-btn-jssdf").each(function(e){$(this).attr("data-in",e).on("click",function(e){e.preventDefault(),r.pendingJobs($(this))})}),$("#getBtn").click(function(e){e.preventDefault(),r.codebasesBranches()}),$(".ajaxbtn").click(function(e){e.preventDefault(),r.externalContentPopup($(this))})},validateForm:function(e){var r=$(".command_forcebuild",e),i=":button, :hidden, :checkbox, :submit";$(".grey-btn",r).click(function(e){var s=$("input",r).not(i),o=s.filter(function(){return this.name.indexOf("revision")>=0}),u=o.filter(function(){return this.value===""});if(u.length>0&&u.length<o.length){o.each(function(){$(this).val()===""?$(this).addClass("not-valid"):$(this).removeClass("not-valid")}),$(".form-message",r).hide();if(!$(".error-input",r).length){var a=n.render(t,{errorinput:"true",text:"Fill out the empty revision fields or clear all before submitting"}),f=$(a);$(r).prepend(f)}e.preventDefault()}})},nonAjaxPopup:function(t){var n=t.next($(".more-info-box-js")).clone();n.appendTo($("body")),e.jCenter(n).fadeIn("fast",function(){e.closePopup(n)}),$(window).resize(function(){e.jCenter(n)})},pendingJobs:function(r){var i=r.attr("data-in"),s=r.attr("data-rt_update"),o=n.render(t,{preloader:"true"}),u=$(o);$("body").append(u).show(),$.ajax({url:"",cache:!1,dataType:"html",data:{rt_update:"pending"},success:function(t){u.remove();var n=document.createElement("html");n.innerHTML=t;var r=$(".more-info-box-js",n),s;r.each(function(e){e==i&&(s=$(this))}),s.appendTo("body"),e.jCenter(s).fadeIn("fast"),$(window).resize(function(){e.jCenter(s)}),e.closePopup(s)}})},codebasesBranches:function(){var r=$("#pathToCodeBases").attr("href"),i=n.render(t,{preloader:"true"}),s=$(i);$("body").append(s).show();var o=n.render(t,{popupOuter:"true",headline:"Select branches"}),u=$(o);$(u).appendTo("body"),$.get(r).done(function(t){var n=$("#content1");$(s).remove();var r=$(t).find("#formWrapper");$(r).appendTo(n),$("#content .blue-btn").val("update"),$("#content1 .filter-table-input label, #content1 .filter-table-input .help-txt").remove(),e.jCenter(u).fadeIn("fast"),$(window).resize(function(){e.jCenter(u)}),require(["selectors"],function(t){t.comboBox("#formWrapper .select-tools-js"),t.init(),$(window).resize(function(){e.jCenter($(".more-info-box-js"))})}),$("#getForm").attr("action",window.location.href),$('#getForm .blue-btn[type="submit"]').click(function(){$(".more-info-box-js").hide()}),e.closePopup(u)})},customTabs:function(){$(".tabs-list li").click(function(e){var t=$(this).index();$(this).parent().find("li").removeClass("selected"),$(this).addClass("selected"),$(".content-blocks > div").each(function(e){$(this).index()!=t?$(this).hide():$(this).show()})})},externalContentPopup:function(i){var s=i.attr("data-popuptitle"),o=i.attr("data-b"),u=i.attr("data-indexb"),a=i.attr("data-rt_update"),f=i.attr("data-contenttype"),l=n.render(t,{preloader:"true"}),c=$(l);$("body").append(c);var h=n.render(t,{popupOuter:"true",headline:s}),p=$(h);p.appendTo($("body")),$.get("",{rt_update:a,datab:o,dataindexb:u}).done(function(t){var n=$("#content1");c.remove(),$(t).appendTo(n),f==="form"&&(e.setFullName($("#usernameDisabled, #usernameHidden",n)),r.validateForm(n)),e.jCenter(p).fadeIn("fast"),$(window).resize(function(){e.jCenter(p)}),e.closePopup(p)})}},r});