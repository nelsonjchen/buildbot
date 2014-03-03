define(["jquery","helpers","popup","text!templates/builders.html","mustache"],function(e,t,n,r,i){var s,o=e("#tablesorterRt").dataTable(),u=e("#stepList > li"),a=e(".current-step-js"),f=null,l=null;return s={createWebSocket:function(n){return f==null&&("WebSocket"in window?f=new WebSocket(n):"MozWebSocket"in window?f=new MozWebSocket(n):(log("Browser does not support WebSocket!"),window.location="http://autobahn.ws/unsupportedbrowser"),f&&(f.onopen=function(){e("#bowlG").remove(),s.broadcastMessage(t.getJsonUrl())},f.onclose=function(e){f=null,console.log("We lost our connection, retrying in 5 seconds..."),setTimeout(function(){s.createWebSocket(n)},5e3)},f.onmessage=function(e){s.updateRealTimeData(e.data)})),f},initRealtime:function(t){l=t;var n=s.getInstantJSON();n!==undefined&&(console.log("Loaded from instant JSON"),s.updateRealTimeData(n));var r=e("body").attr("data-realTimeServer");s.createWebSocket(r),console.log(r)},broadcastMessage:function(e){f&&f.send(e)},updateRealTimeData:function(e){typeof e=="string"&&(e=JSON.parse(e)),l(e),console.log("Reloading data...")},getInstantJSON:function(){var t=e("#instant-json");return t.length?(t.remove(),instantJSON):undefined},rtBuildDetail:function(n,r){try{e.each(n,function(n,r){var i=r.times[0],s=r.times[1],o=r.text;t.startCounter(e("#elapsedTimeJs"),i),s&&(window.location.hash||(window.location=window.location+"#finished",window.location.reload()),f.close());var l=0;e.each(r.steps,function(n,r){var i=r.isStarted,s=r.isFinished===!0,o=i&&!s,f=r.times[0],c=r.times[1],h=t.getResult(r.results[0]),p=r.hidden===!0;if(p!=1){l=++l;if(o){var d=r.logs.length>0,v=r.urls.length>0;if(d){var m="";u.children(".logs-txt").eq(l-1).text("Logs"),e.each(r.logs,function(e,t){var n=t[0],r=t[1];m+='<li class="s-logs-js"><a href='+r+">"+n+"</a></li>"}),u.children(".log-list-js").eq(l-1).html(m)}if(v){var g="";e.each(r.urls,function(e,n){g+='<li class="urls-mod log-list-'+t.getResult(n.results)+'"><a href="'+n.url+'">'+e+"</a></li>"}),u.children(".log-list-js").eq(l-1).append(g)}u.children(".update-time-js").eq(l-1).html("Running"),u.children(".s-text-js").eq(l-1).html(r.text.join(" ")),u.children(".s-result-js").eq(l-1).removeClass().addClass("running result s-result-js"),u.eq(l-1).removeClass().addClass("status-running"),a.text(r.name)}else s&&(u.children(".update-time-js").eq(l-1).html(t.getTime(f,c)),u.children(".s-result-js").eq(l-1).removeClass().addClass(h+" result s-result-js"),u.eq(l-1).removeClass().addClass("finished status-"+h))}})})}catch(i){}},buildersPage:function(e){o.fnClearTable();try{o.fnAddData(e.builders)}catch(t){}},rtBuildSlaves:function(t){o.fnClearTable();try{e.each(t,function(e,t){var n=[t];o.fnAddData(n)})}catch(n){}},rtBuildqueue:function(e){o.fnClearTable();try{o.fnAddData(e)}catch(t){}}},s});