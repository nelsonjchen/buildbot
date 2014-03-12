define(["datatables-plugin","helpers","popup","text!templates/buildqueue.mustache","text!templates/buildslaves.mustache","text!templates/builders.mustache","mustache","moment"],function(e,t,n,r,i,s,o,u){var a;return a={init:function(e){e.each(function(e){var n=[],a={bPaginate:!1,bLengthChange:!1,bFilter:!1,bSort:!0,bInfo:!1,bAutoWidth:!1,sDom:'<"table-wrapper"t>',bRetrieve:!0,asSorting:!0,bServerSide:!1,bSearchable:!0,aaSorting:[],iDisplayLength:50,bStateSave:!0};$(this).hasClass("input-js")&&(a.bFilter=!0,a.oLanguage={sSearch:""},a.sDom='<"top"flip><"table-wrapper"t><"bottom"pi>'),$("> thead th",this).each(function(e){$(this).hasClass("no-tablesorter-js")?n.push({bSortable:!1}):n.push(null)}),$(this).hasClass("buildqueue-table")?(a.aaSorting=[[2,"asc"]],a.aoColumns=[{mData:"builderFriendlyName"},{mData:"sources"},{mData:"reason"},{mData:"slaves"},{mData:"brid",bSortable:!1}],a.aoColumnDefs=[{sClass:"txt-align-left",aTargets:[0]},{aTargets:[1],sClass:"txt-align-left",mRender:function(e,t,n){var i=n.sources.length,s=o.render(r,{showsources:!0,sources:n.sources,codebase:n.codebase,sourcesLength:i});return s},fnCreatedCell:function(e,t,n,r,i){$(e).find("a.popup-btn-json-js").data({showCodebases:n})}},{aTargets:[2],sClass:"txt-align-left",mRender:function(e,n,i){var s=u.unix(i.submittedAt).format("MMMM Do YYYY, H:mm:ss"),a=t.getTime(i.submittedAt,null),f=o.render(r,{reason:i.reason,requested:s,submittedAt:i.submittedAt});return f},fnCreatedCell:function(e,n,r,i,s){t.startCounter($(e).find(".waiting-time"),r.submittedAt)}},{aTargets:[3],sClass:"txt-align-right",mRender:function(e,t,n){var i=n.slaves.length,s=o.render(r,{showslaves:!0,slaves:e,slavelength:i});return s},fnCreatedCell:function(e,t,n,r,i){$(e).find("a.popup-btn-json-js").data({showcompatibleSlaves:n})}},{aTargets:[4],sClass:"select-input",mRender:function(e,t,n){var i=o.render(r,{input:"true",brid:n.brid});return i}}]):$(this).hasClass("builders-table")?(a.aoColumns=[{mData:null},{mData:null},{mData:null},{mData:null},{mData:null,bSortable:!1}],a.aoColumnDefs=[{aTargets:[0],sClass:"txt-align-left",mRender:function(e,n,r){var i=t.codebasesFromURL({}),u=[];for(var a in i)u.push(encodeURIComponent(a)+"="+encodeURIComponent(i[a]));var f=u.join("&"),l=o.render(s,{name:r.name,friendly_name:r.friendly_name,builderParam:f});return l}},{aTargets:[1],sClass:"txt-align-left",mRender:function(e,t,n){var r=n.pendingBuilds===undefined&&n.currentBuilds===undefined,i=o.render(s,{showNoJobs:r,pendingBuilds:n.pendingBuilds,currentBuilds:n.currentBuilds,builderName:n.name,projects:n.project});return i},fnCreatedCell:function(e,n,r,i,s){r.currentBuilds!=undefined&&t.delegateToProgressBar($(e).find(".percent-outer-js"))}},{aTargets:[2],sClass:"txt-align-left last-build-js",mRender:function(e,t,n){var r=o.render(s,{showLatestBuild:!0,latestBuild:n.latestBuild});return r},fnCreatedCell:function(e,n,r,i,s){if(r.latestBuild!=undefined){t.startCounterTimeago($(e).find(".last-run"),r.latestBuild.times[1]);var o=t.getTime(r.latestBuild.times[0],r.latestBuild.times[1]).trim();$(e).find(".small-txt").html("("+o+")"),$(e).find(".hidden-date-js").html(r.latestBuild.times[1])}}},{aTargets:[3],mRender:function(e,t,n){var r=n.latestBuild,i=o.render(s,{showStatus:!0,latestBuild:n.latestBuild});return i},fnCreatedCell:function(e,t,n,r,i){var s=n.latestBuild===undefined?"":n.latestBuild;$(e).removeClass().addClass(s.results_text)}},{aTargets:[4],mRender:function(e,t,n){var r=location.protocol+"//"+location.host,i=o.render(s,{customBuild:!0,builderUrlShow:r,project:n.project,builderName:n.name});return i}}]):$(this).hasClass("buildslaves-table")?(a.aoColumns=[{mData:null},{mData:null},{mData:null},{mData:null},{mData:null}],a.aoColumnDefs=[{aTargets:[0],sClass:"txt-align-left",mRender:function(e,t,n){var r=o.render(i,{showFriendlyName:!0,friendly_name:n.friendly_name,host_name:n.name});return r}},{aTargets:[1],sClass:"txt-align-left",mRender:function(e,t,n){var r=o.render(i,{buildersPopup:!0});return r},fnCreatedCell:function(e,t,n,r,i){$(e).find("a.popup-btn-json-js").data({showBuilders:n})}},{aTargets:[2],sClass:"txt-align-left",mRender:function(e,t,n){var r=n.name!=undefined?n.name:"Not Available";return r}},{aTargets:[3],mRender:function(e,t,n){var r,s=0;if(n.connected===undefined)r="Offline";else if(n.connected===!0&&n.runningBuilds===undefined)r="Idle";else if(n.connected===!0&&n.runningBuilds.length>0){r=n.runningBuilds.length+" build(s) ";var u=!0}n.runningBuilds!=undefined&&($.each(n.runningBuilds,function(e,t){t.eta!=undefined&&t.eta<0&&s++}),s=s>0?s:!1);var a=o.render(i,{showStatusTxt:r,showSpinIcon:u,showOvertime:s});return a},fnCreatedCell:function(e,t,n,r,i){n.connected===undefined?$(e).addClass("offline"):n.connected===!0&&n.runningBuilds===undefined?$(e).addClass("idle"):n.connected===!0&&n.runningBuilds.length>0&&$(e).addClass("building").find("a.popup-btn-json-js").data({showRunningBuilds:n})}},{aTargets:[4],mRender:function(e,t,n){var r=n.lastMessage!=undefined?!0:null,s=r?" ("+u.unix(n.lastMessage).format("MMM Do YYYY, H:mm:ss")+")":"",a=o.render(i,{showTimeago:r,showLastMessageDate:s});return a},fnCreatedCell:function(e,n,r,i,s){t.startCounterTimeago($(e).find(".last-message-timemago"),r.lastMessage)}}]):a.aoColumns=n,$(this).hasClass("tools-js")&&(a.bPaginate=!0,a.bLengthChange=!0,a.bInfo=!0,a.bFilter=!0,a.oLanguage={sSearch:"",sLengthMenu:'Entries per page<select><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option><option value="-1">All</option></select>'},a.sDom='<"top"flip><"table-wrapper"t><"bottom"pi>');var f=$(this).dataTable(a);$("#builders_page").length&&window.location.search!=""&&t.codeBaseBranchOverview(),$(this).hasClass("branches-selectors-js")&&$(".dataTables_wrapper .top").append('<div class="filter-table-input"><input value="Show builders" class="blue-btn var-2" type="submit" /><h4 class="help-txt">Select branch for each codebase before showing builders</h4></div>'),$(this).parents(".dataTables_wrapper").find(".dataTables_filter input").attr("placeholder","Filter results").focus()})}},a});