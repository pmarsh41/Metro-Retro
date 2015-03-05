(function(){TS.registerModule("client",{login_sig:new signals.Signal(),flexpane_display_switched_sig:new signals.Signal(),core_url:null,archives_url:null,onStart:function(){TS.client.files_url=TS.utility.normalizeUrlForComparison(document.location.href.split("/messages")[0]+"/files");
TS.client.archives_url=TS.utility.normalizeUrlForComparison(document.location.href.split("/messages")[0]+"/archives");
TS.client.core_url=TS.utility.normalizeUrlForComparison(document.location.href.split("/messages")[0]+"/messages");
if(TS.boot_data.special_flex_panes){for(var o in TS.boot_data.special_flex_panes){var p=TS.boot_data.special_flex_panes[o];
TS.model.flex_names.push(p.flex_name)
}}TS.model.ui_state=TS.storage.fetchUIState();
TS.model.initial_ui_state_str=(TS.model.ui_state)?JSON.stringify(TS.model.ui_state):"none";
if(!("member_list_visible" in TS.model.ui_state)){TS.model.ui_state.member_list_visible=false
}TS.model.flex_name_in_url=TS.utility.getFlexNameFromUrl(location.href).toLowerCase();
TS.model.flex_extra_in_url=TS.utility.getFlexExtraFromUrl(location.href);
if(TS.model.flex_names.indexOf(TS.model.flex_name_in_url)==-1){TS.model.flex_name_in_url="";
TS.model.flex_extra_in_url=""
}if(TS.model.flex_name_in_url){TS.model.ui_state.flex_name=TS.model.flex_name_in_url;
TS.model.ui_state.flex_extra=TS.model.flex_extra_in_url||""
}if(TS.model.ui_state.flex_name=="list"){TS.model.ui_state.flex_name="files"
}if(TS.model.ui_state.flex_name==="details"&&!TS.boot_data.feature_flexpane_rework){TS.model.ui_state.flex_name="files"
}TS.model.ui_state.flex_visible=!!TS.model.ui_state.flex_name;
TS.storage.storeUIState(TS.model.ui_state)
},gogogo:function(){TS.logLoad("TS.client.gogogo");
$(window).bind("popstate",e)
},updateTeamIcon:function(){if(TS.model.team.icon){if(TS.model.team.icon.image_68&&TS.model.team.icon.image_default!==true){if(window.winssb){TSSSB.call("setImage",TS.model.team.icon)
}else{TSSSB.call("setImage",TS.model.team.icon.image_68)
}}else{TSSSB.call("setImage",false)
}}},markLastReadsWithAPI:function(){var r;
var p;
var s;
var t;
var q;
if(TS.model&&TS.model.channels){var o=TS.model.channels;
for(r=0;
r<o.length;
r++){s=o[r];
if(s.needs_api_marking){TS.model.last_reads_set_by_client[s.id+"_"+s.last_read]=true;
s.needs_api_marking=false;
q=(s._marked_reason=="muted")?true:false;
TS.api.call("channels.mark",{channel:s.id,ts:s.last_read,reason:s._marked_reason},TS.channels.onMarked,q)
}}}if(TS.model&&TS.model.ims){for(r=0;
r<TS.model.ims.length;
r++){p=TS.model.ims[r];
if(p.needs_api_marking){TS.model.last_reads_set_by_client[p.id+"_"+p.last_read]=true;
p.needs_api_marking=false;
TS.api.call("im.mark",{channel:p.id,ts:p.last_read,reason:p._marked_reason},TS.ims.onMarked)
}}}if(TS.model&&TS.model.groups){for(r=0;
r<TS.model.groups.length;
r++){t=TS.model.groups[r];
if(t.needs_api_marking){TS.model.last_reads_set_by_client[t.id+"_"+t.last_read]=true;
t.needs_api_marking=false;
q=(t._marked_reason=="muted")?true:false;
TS.api.call("groups.mark",{channel:t.id,ts:t.last_read,reason:t._marked_reason},TS.groups.onMarked,q)
}}}},activeChannelDisplayGoneAway:function(){TS.model.active_history.pop();
var q;
var o;
var r;
var s;
var p;
while(TS.model.active_history.length&&!p){q=TS.model.active_history.pop();
o=TS.ims.getImById(q);
r=(o)?null:TS.channels.getChannelById(q);
s=(o||r)?null:TS.groups.getGroupById(q);
if(o&&o.is_open){p=true;
TS.log(4,"switching to im "+o.id);
TS.ims.displayIm(o.id);
TS.client.channelDisplaySwitched(null,o.id,null)
}else{if(s&&s.is_open&&!s.is_archived){p=true;
TS.log(4,"switching to group "+s.id);
TS.groups.displayGroup(s.id)
}else{if(r){p=true;
TS.log(4,"switching to channel "+r.id);
TS.channels.displayChannel(r.id,null,false,true)
}}}}},flexDisplaySwitched:function(r,u,q,p){u=l(u);
if(!p&&TS.model.c_name_in_url){var s=TS.utility.refashionUrl(window.location.href,TS.model.c_name_in_url,r,u);
c(s,q)
}var t=TS.model.ui_state.flex_name;
var o=TS.model.ui_state.flex_extra;
TS.model.flex_name_in_url=r;
TS.model.flex_extra_in_url=u;
TS.model.ui_state.flex_name=r;
TS.model.ui_state.flex_extra=u;
TS.storage.storeUIState(TS.model.ui_state);
TS.client.flexpane_display_switched_sig.dispatch(t,o)
},channelDisplaySwitched:function(x,r,A,s,p){if((x&&(r||A))||(r&&(x||A))){TS.error("more than one? channel_id:"+x+" im_id:"+r+" group_id:"+A);
return false
}if(!x&&!r&&!A){TS.error("none? channel_id:"+x+" im_id:"+r+" group_id:"+A);
return false
}var w;
var y;
var z;
var q;
if(x){w=TS.channels.getChannelById(x);
q=w.name
}if(r){y=TS.ims.getImById(r);
q="@"+y.name
}if(A){z=TS.groups.getGroupById(A);
q=z.name
}var o=w||z||y;
if(!p){var C=l(TS.model.flex_extra_in_url);
var u=TS.utility.refashionUrl(window.location.href,q,TS.model.flex_name_in_url,C);
c(u,!TS.model.c_name_in_url||s)
}TS.model.c_name_in_url=q;
if(x&&x==TS.model.active_channel_id){TS.warn("not switching, it is the active channel already");
return false
}if(r&&r==TS.model.active_im_id){TS.warn("not switching, it is the active im already");
return false
}if(A&&A==TS.model.active_group_id){TS.warn("not switching, it is the active group already");
return false
}TS.utility.msgs.checkForMsgsToTruncate();
TS.model.last_active_cid=TS.model.active_channel_id||TS.model.active_im_id||TS.model.active_group_id;
TS.model.active_channel_id=x;
TS.model.active_im_id=r;
TS.model.active_group_id=A;
TS.model.active_cid=TS.model.active_channel_id||TS.model.active_im_id||TS.model.active_group_id;
TS.view.updateTitleWithContext();
o.last_made_active=TS.utility.date.getTimeStamp();
var B=x||r||A;
TS.log(4,B+" is now active");
var v=TS.model.active_history;
var t=v.indexOf(B);
if(t!=-1){v.splice(t,1)
}v.push(B);
TS.log(4,v);
TS.storage.storeActiveHistory(v);
return true
},setInitialChannel:function(){a()
},startCheckingForCleanup:function(){f()
},complianceExportStartChanged:function(){i()
},onFirstLoginMS:function(o){TS.logLoad("TS.client logged in first time");
TS.makeEmoticonList();
if(!TS.model.welcome_model_ob.id){TS.model.welcome_model_ob=TS.channels.getGeneralChannel()||TS.model.welcome_model_ob
}a();
setInterval(TS.client.markLastReadsWithAPI,5000);
f();
TS.ms.connected_sig.add(m);
TS.channels.renamed_sig.add(h);
TS.groups.renamed_sig.add(d);
TS.members.changed_name_sig.add(g);
TS.members.changed_account_type_sig.add(j);
TS.prefs.dropbox_enabled_changed_sig.add(b);
TS.prefs.compliance_export_start_changed_sig.add(i);
TS.prefs.team_disallow_public_file_urls_changed_sig.add(k);
if(TS.model.team.prefs.compliance_export_start){i()
}if(window.macgap&&!TS.model.prefs.no_macssb1_banner){TS.prefs.setPrefByAPI({name:"no_macssb1_banner",value:true})
}TS.logLoad("onFirstLoginMS hiding loading screen");
TS.reportLoad();
TSSSB.call("didFinishLoading");
if(TS.qs_args.halt_at_loading_screen==1){return
}$("#loading_welcome").transition({opacity:0},150,function(){$("#col_channels_bg").css("z-index",0);
$("#loading-zone").transition({opacity:0},250,function(){$("body").removeClass("loading");
$("#loading-zone").css({opacity:1,left:0,background:"white"});
TS.view.resizeManually("onFirstLoginMS");
clearInterval(window.loading_ellipsis_timer)
})
})
},onEveryLoginMS:function(s){var r=TS.channels.getChannelById(TS.model.active_channel_id);
var p=TS.ims.getImById(TS.model.active_im_id);
var t=TS.groups.getGroupById(TS.model.active_group_id);
var q;
if(r&&!r.history_is_being_fetched){TS.shared.checkInitialMsgHistory(r,TS.channels)
}else{if(p&&!p.history_is_being_fetched){TS.shared.checkInitialMsgHistory(p,TS.ims)
}else{if(t&&!t.history_is_being_fetched){TS.shared.checkInitialMsgHistory(t,TS.groups)
}}}if(!TS.model.ms_logged_in_once){if(window.load_start_ms){TS.warn((new Date()-window.load_start_ms)+"ms from first html to login_sig.dispatch()")
}TS.client.login_sig.dispatch()
}for(q=0;
q<TS.model.ims.length;
q++){p=TS.model.ims[q];
if(p.id==TS.model.active_im_id){continue
}if(!p.is_open&&!p.unread_count){continue
}TS.shared.checkInitialMsgHistory(p,TS.ims)
}var o=TS.model.channels;
for(q=0;
q<o.length;
q++){r=o[q];
if(r.id==TS.model.active_channel_id){continue
}if(!r.is_member){continue
}TS.shared.checkInitialMsgHistory(r,TS.channels)
}for(q=0;
q<TS.model.groups.length;
q++){t=TS.model.groups[q];
if(t.id==TS.model.active_group_id){continue
}if(t.is_archived){continue
}if(!t.is_open&&!t.unread_count){continue
}TS.shared.checkInitialMsgHistory(t,TS.groups)
}}});
var d=function(o){if(o.id!=TS.model.active_group_id){return
}TS.client.channelDisplaySwitched(null,null,o.id,true)
};
var h=function(o){if(o.id!=TS.model.active_channel_id){return
}TS.client.channelDisplaySwitched(o.id,null,null,true)
};
var j=function(p){if(!p||p.id!=TS.model.user.id){return
}var o;
if(p.is_ultra_restricted){o=" You are now a restricted user. "
}else{if(p.is_restricted){o=" You are now a guest user. "
}else{o=" You are now a full member of the team. "
}}TS.generic_dialog.start({title:"Reload required",body:"<p>Your account permissions have changed!"+o+"You must now reload for the changes to take effect.</p>",show_cancel_button:false,esc_for_ok:true,on_go:function(){TS.reload()
}})
};
var g=function(p){if(!TS.model.active_im_id){return
}var o=TS.ims.getImByMemberId(p.id);
if(!o||o.id!=TS.model.active_im_id){return
}TS.client.channelDisplaySwitched(null,o.id,null,true)
};
var m=function(){TS.ims.checkForOldImsToClose()
};
var b=function(){var p;
var r;
if(window.Dropbox){return
}if(!TS.model.prefs.dropbox_enabled){return
}if(!boot_data.dropbox_js_url){return
}var s="dropboxjs";
var q=document.getElementById(s);
var o="data-app-key";
if(q){return
}r=document.getElementsByTagName("head");
if(r&&r[0]){r=r[0]
}else{r=document.body
}p=document.createElement("script");
p.setAttribute("async",true);
if(boot_data.dropbox_app_key){p.setAttribute(o,boot_data.dropbox_app_key)
}p.id=s;
p.src=boot_data.dropbox_js_url;
if(r){r.appendChild(p)
}else{if(TS.logError){TS.logError({message:"_dropboxEnabledChanged: Could not append dropbox script node"})
}}};
var i=function(){var p;
var s;
var r=$(".show_when_ce_enabled");
var q=$(".show_when_ce_disabled");
var o=$(".js_compliance_export_start");
if(TS.model.team.prefs.compliance_export_start){o.html(TS.utility.date.toDate(TS.model.team.prefs.compliance_export_start));
r.removeClass("hidden");
q.addClass("hidden")
}else{r.addClass("hidden");
q.removeClass("hidden")
}p=TS.shared.getActiveModelOb();
if(!p){return
}s=TS.members.getMemberById(p.user);
if(!s){return
}if(p.is_im){$("#im_meta").html(TS.templates.dm_badge({member:s,im:p,compliance_exports_enabled_for_team:!!TS.model.team.prefs.compliance_export_start}))
}};
var k=function(){if(TS.model.team.prefs.disallow_public_file_urls){$(".file_public_link").remove();
$("#file_public_link_revoker").remove()
}};
var f=function(){setInterval(function(){if(TS.model.ms_connected){TS.ims.checkForOldImsToClose()
}TS.utility.msgs.checkForMsgsToTruncate()
},1000*60*15)
};
var e=function(u){var s=history.location||document.location;
TS.setQsArgs(s);
var r=TS.utility.getFlexNameFromUrl(s.href);
var y=TS.utility.getFlexExtraFromUrl(s.href);
var q=TS.utility.getChannelNameFromUrl(s.href);
var w=q.split(":");
q=w[0];
var p=(w.length>1)?w[1]:"";
TS.info("_onPopState\nc_name from new url:"+q+"\nc_extra from new url:"+p+"\nflex_name from new url:"+r+"\nflex_extra from new url:"+y);
TS.client.ui.setFlexStateFromHistory(r,y);
if(!TS.model.channels){return
}var z;
var v;
var t;
var x;
var o=false;
if(q){t=TS.channels.getChannelByName(q);
if(t&&(t.is_member||TS.model.prefs.temp_archive_viewer)){z=t.id
}else{if(q.indexOf("@")!=-1){v=TS.ims.getImByUsername(q);
if(v){z=v.id
}}}if(!z){x=TS.groups.getGroupByName(q);
if(x&&x.is_open){z=x.id
}}}if(z){o=true;
TS.info("c_name from new url is good:"+q+" "+z)
}else{if(TS.model.channels.length){t=TS.channels.getFirstChannelYouAreIn();
if(t){z=t.id;
TS.info("got getFirstChannelYouAreIn:"+z)
}}if(!z&&TS.model.ims.length){v=TS.ims.getFirstOpenIm();
if(v){z=v.id;
TS.info("got getFirstOpenIm:"+z)
}}}if(v){TS.ims.startImByMemberId(v.user,true)
}else{if(t){TS.channels.displayChannel(t.id,null,true,!o)
}else{if(x){TS.groups.displayGroup(x.id,null,true,!o)
}else{TS.error("WTF DONT KNOW WHAT TO DO")
}}}};
var a=function(){var w=TS.storage.fetchActiveHistory();
var A;
var u;
var x;
var z;
var y;
var t;
var s=function(C){if(TS.model.welcome_model_ob.id){return
}if(!C){return
}TS.model.welcome_model_ob=C
};
for(u=0;
u<w.length;
u++){A=w[u];
if(TS.model.active_history.indexOf(A)>-1){continue
}y=TS.ims.getImById(A);
x=(y)?null:TS.channels.getChannelById(A);
z=(y||x)?null:TS.groups.getGroupById(A);
if(x&&!x.is_archived&&(!TS.model.user.is_restricted||(x.is_member||TS.model.prefs.temp_archive_viewer))){TS.model.active_history.push(A)
}else{if(y&&y.is_open){TS.model.active_history.push(A)
}else{if(z&&z.is_open&&!z.is_archived){TS.model.active_history.push(A)
}}}}var r=true;
var q=TS.model.c_name_in_url=TS.utility.getChannelNameFromUrl(location.href);
if(q){x=TS.channels.getChannelByName(q);
if(x&&(!x.is_archived||TS.model.prefs.temp_archive_viewer)){if(x.is_member||TS.model.prefs.temp_archive_viewer){if(x.is_member&&!x.is_archived){s(x)
}TS.client.channelDisplaySwitched(x.id,null,null,r);
return
}if(!TS.model.user.is_restricted){TS.channels.join(x.name)
}}y=TS.ims.getImByUsername(q);
if(y){s(y);
if(y.is_open){TS.client.channelDisplaySwitched(null,y.id,null,r)
}else{TS.ims.startImByMemberId(y.user,r)
}return
}z=TS.groups.getGroupByName(q);
if(z&&(!z.is_archived||TS.model.prefs.temp_archive_viewer)){if(!z.is_archived){s(z)
}TS.groups.displayGroup(z.id,null,false,r);
return
}t=TS.members.getMemberByName(q);
if(t&&t.id!=TS.model.user.id){s(y);
TS.ims.startImByMemberId(t.id,r);
return
}if(q.indexOf("@")!==0){}}if(TS.model.active_history.length){A=TS.model.active_history[TS.model.active_history.length-1];
y=TS.ims.getImById(A);
x=(y)?null:TS.channels.getChannelById(A);
z=(y||x)?null:TS.groups.getGroupById(A);
if(y){s(y);
TS.client.channelDisplaySwitched(null,y.id,null,r);
return
}else{if(x){s(x);
TS.client.channelDisplaySwitched(x.id,null,null,r);
return
}else{if(z){s(z);
TS.client.channelDisplaySwitched(null,null,z.id,r);
return
}else{TS.error("wtf not in channel from local history")
}}}}if(TS.model.user.is_restricted){var v=TS.model.channels;
v.sort(function(D,C){return(D._name_lc>C._name_lc)?1:((C._name_lc>D._name_lc)?-1:0)
});
for(u=0;
u<v.length;
u++){x=v[u];
if(x.is_archived){continue
}if(!x.is_member){continue
}s(x);
TS.client.channelDisplaySwitched(x.id,null,null,r);
return
}var p=TS.model.groups;
p.sort(function(D,C){return(D._name_lc>C._name_lc)?1:((C._name_lc>D._name_lc)?-1:0)
});
for(u=0;
u<p.length;
u++){z=p[u];
if(p.is_archived){continue
}s(z);
TS.groups.displayGroup(z.id,null,false,r);
return
}var B=TS.ims.getImByMemberId("USLACKBOT");
if(B){s(B);
TS.client.channelDisplaySwitched(null,B.id,null,r);
return
}}else{var o=TS.channels.getGeneralChannel();
if(o){s(o);
TS.client.channelDisplaySwitched(o.id,null,null,r);
return
}}alert("ERROR could not find starting channel")
};
var l=function(o){if(o&&o.indexOf("#")!=-1){o=o.replace(/\#/g,"%23")
}return o
};
var c=function(p,o){if(!history.pushState){TS.warn("This browser does not support pushState.");
return
}if(o){if(window.location.href.replace(/\%20/g," ")==p.replace(/\%20/g," ")){}else{window.history.replaceState(null,null,p)
}}else{if(window.location.href.replace(/\%20/g," ")==p.replace(/\%20/g," ")){}else{window.history.pushState(null,null,p)
}}}
})();
(function(){TS.registerModule("view",{file_list_heading:"All File Types",file_list_lazyload:null,members_list_lazyload:null,member_stars_list_lazyload:null,last_attachment_max_width:null,onStart:function(){TS.client.login_sig.add(TS.view.loggedIn,TS.view);
TS.ms.connected_sig.add(TS.view.socketConnected,TS.view);
TS.ms.trouble_sig.add(TS.view.socketTroubled,TS.view);
TS.ms.disconnected_sig.add(TS.view.socketDisconnected,TS.view);
TS.ms.pong_sig.add(TS.view.ponged,TS.view);
TS.ms.reconnecting_sig.add(TS.view.socketReconnecting,TS.view);
TS.channels.renamed_sig.add(TS.view.channelRenamed,TS.view);
TS.channels.switched_sig.add(TS.view.channelSwitched,TS.view);
TS.channels.created_sig.add(TS.view.channelCreated,TS.view);
TS.channels.deleted_sig.add(TS.view.channelDeleted,TS.view);
TS.channels.joined_sig.add(TS.view.channelJoined,TS.view);
TS.channels.member_joined_sig.add(TS.view.channelMemberJoined,TS.view);
TS.channels.left_sig.add(TS.view.channelLeft,TS.view);
TS.channels.member_left_sig.add(TS.view.channelMemberLeft,TS.view);
TS.channels.history_fetched_sig.add(TS.view.channelHistoryFetched,TS.view);
TS.channels.history_being_fetched_sig.add(TS.view.channelHistoryBeingFetched,TS.view);
TS.channels.message_received_sig.add(TS.view.channelMessageReceived,TS.view);
TS.channels.message_removed_sig.add(TS.view.channelMessageRemoved,TS.view);
TS.channels.message_changed_sig.add(TS.view.channelMessageChanged,TS.view);
TS.channels.marked_sig.add(TS.view.channelMarked,TS.view);
TS.channels.unread_changed_sig.add(TS.view.channelUnreadCountChanged,TS.view);
TS.channels.unread_highlight_changed_sig.add(TS.view.channelUnreadHighlightCountChanged,TS.view);
TS.channels.topic_changed_sig.add(TS.view.channelTopicChanged,TS.view);
TS.channels.purpose_changed_sig.add(TS.view.channelPurposeChanged,TS.view);
TS.channels.archived_sig.add(TS.view.channelArchived,TS.view);
TS.channels.unarchived_sig.add(TS.view.channelUnArchived,TS.view);
TS.channels.msg_not_sent_sig.add(TS.view.channelMsgNotsent,TS.view);
TS.groups.renamed_sig.add(TS.view.groupRenamed,TS.view);
TS.groups.switched_sig.add(TS.view.groupSwitched,TS.view);
TS.groups.deleted_sig.add(TS.view.groupDeleted,TS.view);
TS.groups.joined_sig.add(TS.view.groupJoined,TS.view);
TS.groups.member_joined_sig.add(TS.view.groupMemberJoined,TS.view);
TS.groups.left_sig.add(TS.view.groupLeft,TS.view);
TS.groups.member_left_sig.add(TS.view.groupMemberLeft,TS.view);
TS.groups.history_fetched_sig.add(TS.view.groupHistoryFetched,TS.view);
TS.groups.history_being_fetched_sig.add(TS.view.groupHistoryBeingFetched,TS.view);
TS.groups.message_received_sig.add(TS.view.groupMessageReceived,TS.view);
TS.groups.message_removed_sig.add(TS.view.groupMessageRemoved,TS.view);
TS.groups.message_changed_sig.add(TS.view.groupMessageChanged,TS.view);
TS.groups.marked_sig.add(TS.view.groupMarked,TS.view);
TS.groups.unread_changed_sig.add(TS.view.groupUnreadCountChanged,TS.view);
TS.groups.unread_highlight_changed_sig.add(TS.view.groupUnreadHighlightCountChanged,TS.view);
TS.groups.topic_changed_sig.add(TS.view.groupTopicChanged,TS.view);
TS.groups.purpose_changed_sig.add(TS.view.groupPurposeChanged,TS.view);
TS.groups.opened_sig.add(TS.view.groupOpened,TS.view);
TS.groups.closed_sig.add(TS.view.groupClosed,TS.view);
TS.groups.archived_sig.add(TS.view.groupArchived,TS.view);
TS.groups.unarchived_sig.add(TS.view.groupUnArchived,TS.view);
TS.groups.msg_not_sent_sig.add(TS.view.groupMsgNotSent,TS.view);
TS.ims.opened_sig.add(TS.view.imOpened,TS.view);
TS.ims.closed_sig.add(TS.view.imClosed,TS.view);
TS.ims.switched_sig.add(TS.view.imSwitched,TS.view);
TS.ims.history_fetched_sig.add(TS.view.imHistoryFetched,TS.view);
TS.ims.history_being_fetched_sig.add(TS.view.imHistoryBeingFetched,TS.view);
TS.ims.message_received_sig.add(TS.view.imMessageReceived,TS.view);
TS.ims.message_removed_sig.add(TS.view.imMessageRemoved,TS.view);
TS.ims.message_changed_sig.add(TS.view.imMessageChanged,TS.view);
TS.ims.marked_sig.add(TS.view.imMarked,TS.view);
TS.ims.unread_changed_sig.add(TS.view.imUnreadCountChanged,TS.view);
TS.ims.unread_highlight_changed_sig.add(TS.view.imUnreadHighlightCountChanged,TS.view);
TS.ims.msg_not_sent_sig.add(TS.view.imMsgNotsent,TS.view);
TS.members.presence_changed_sig.add(TS.view.memberPresenceChanged,TS.view);
TS.members.status_changed_sig.add(TS.view.memberStatusChanged,TS.view);
TS.members.joined_team_sig.add(TS.view.memberJoinedTeam,TS.view);
TS.members.members_for_user_changed_sig.add(TS.view.memberChangeVisibilityToUser,TS.view);
TS.members.changed_name_sig.add(TS.view.memberChangedName,TS.view);
TS.members.changed_self_sig.add(TS.view.somethingChangedOnUser,TS.view);
TS.members.changed_deleted_sig.add(TS.view.memberChangedDeleted,TS.view);
TS.members.changed_profile_sig.add(TS.view.memberChangedProfile,TS.view);
TS.members.changed_tz_sig.add(TS.view.memberChangedTZ,TS.view);
TS.members.changed_account_type_sig.add(TS.view.memberAccountTypeChanged,TS.view);
TS.bots.added_sig.add(TS.view.botChanged,TS.view);
TS.bots.changed_name_sig.add(TS.view.botChanged,TS.view);
TS.bots.changed_icons_sig.add(TS.view.botChanged,TS.view);
TS.ui.window_unloaded_sig.add(TS.view.windowUnloaded,TS.view);
TS.client.flexpane_display_switched_sig.add(TS.view.flexpaneDisplaySwitched,TS.view);
TS.client.ui.file_dropped_sig.add(TS.view.filesDropped);
TS.client.ui.file_pasted_sig.add(TS.view.filePasted);
TS.files.team_files_fetched_sig.add(TS.view.teamFilesFetched,TS.view);
TS.files.team_file_added_sig.add(TS.view.teamFileAdded,TS.view);
TS.files.team_file_deleted_sig.add(TS.view.teamFileDeleted,TS.view);
TS.files.team_file_changed_sig.add(TS.view.teamFileChanged,TS.view);
TS.files.file_uploaded_sig.add(TS.view.fileUploaded,TS.view);
TS.files.file_uploading_sig.add(TS.view.fileUploading,TS.view);
TS.files.file_progress_sig.add(TS.view.fileProgress,TS.view);
TS.files.file_canceled_sig.add(TS.view.fileCanceled,TS.view);
TS.files.file_queue_emptied_sig.add(TS.view.fileQueueEmptied,TS.view);
TS.prefs.webapp_spellcheck_changed_sig.add(TS.view.toggleSpellcheck,TS.view);
TS.prefs.highlight_words_changed_sig.add(TS.client.msg_pane.rebuildMsgs,TS.view);
TS.prefs.emoji_mode_changed_sig.add(TS.view.farReachingDisplayPrefChanged,TS.view);
TS.prefs.team_require_at_for_mention_changed_sig.add(TS.view.farReachingDisplayPrefChanged,TS.view);
TS.prefs.expand_inline_imgs_changed_sig.add(TS.client.msg_pane.rebuildMsgs,TS.view);
TS.prefs.expand_internal_inline_imgs_changed_sig.add(TS.client.msg_pane.rebuildMsgs,TS.view);
TS.prefs.expand_non_media_attachments_changed_sig.add(TS.client.msg_pane.rebuildMsgs,TS.view);
TS.prefs.obey_inline_img_limit_changed_sig.add(TS.client.msg_pane.rebuildMsgs,TS.view);
TS.prefs.show_member_presence_changed_sig.add(TS.view.setPresenceClasses,TS.view);
TS.prefs.messages_theme_changed_sig.add(TS.setThemeClasses,TS);
TS.prefs.dtop_notif_changed_sig.add(TS.view.dTopNotificationChanged,TS.view);
TS.prefs.muted_channels_changed_sig.add(TS.view.mutedChannelsChanged,TS.view);
TS.prefs.sidebar_behavior_changed_sig.add(TS.view.sidebarBehaviorPrefChanged,TS.view);
TS.prefs.team_hide_referers_changed_sig.add(TS.client.msg_pane.rebuildMsgs,TS.view);
TS.prefs.team_perms_pref_changed_sig.add(TS.view.teamPermsPrefChanged,TS.view);
TS.prefs.display_real_names_override_changed_sig.add(TS.view.farReachingDisplayPrefChanged,TS.view);
TS.prefs.team_display_real_names_changed_sig.add(TS.view.farReachingDisplayPrefChanged,TS.view);
TS.prefs.time24_changed_sig.add(TS.view.time24PrefChanged,TS.view);
TS.prefs.sidebar_theme_changed_sig.add(TS.view.sidebarThemePrefChanged,TS.view);
TS.stars.member_stars_fetched_sig.add(TS.view.memberStarsFetched,TS.view);
TS.mentions.mentions_fetched_sig.add(TS.view.mentionsFetched,TS.view);
TS.mentions.mention_changed_sig.add(TS.view.mentionChanged,TS.view);
TS.mentions.mention_removed_sig.add(TS.view.mentionRemoved,TS.view);
TS.typing.started_sig.add(TS.view.memberTypingStarted,TS.view);
TS.typing.ended_sig.add(TS.view.memberTypingEnded,TS.view);
TS.view.resizeManually("TS.view.onStart");
$(window).resize(TS.view.onResize);
if(TS.qs_args.new_scroll!="0"){var a=TS.qs_args.debug_scroll=="1";
TS.client.ui.$msgs_scroller_div.monkeyScroll({debug:a,always_show:true,bar_colors:{0:"#bac1ca",0.9:"#cad1db",1:"#d9d9de"}});
$(".flex_content_scroller").monkeyScroll({debug:a});
$("#channels_scroller").monkeyScroll({debug:a});
$("#members_scroller").monkeyScroll({debug:a})
}TS.view.changeConnectionStatus("trouble");
TS.client.ui.$msgs_div.bind("click.view",TS.view.onMsgsDivClick);
$(".help").bind("click.view",TS.view.onHelpClick);
$("#activity_feed_items").bind("click.view",TS.view.onActivityFeedClick);
$("#member_stars_list").bind("click.view",TS.view.onStarsListClick);
$("#member_mentions").bind("click.view",TS.view.onMembersMentionsClick);
$("#file_list").bind("click.view",TS.view.onFileListClick);
$("#file_preview_scroller").bind("click.view",TS.view.onFilePreviewClick);
$("#member_preview_scroller").bind("click.view",TS.view.onMemberPreviewClick);
$("#team_list_members").bind("click.view",TS.view.onMemberListClick);
$("#channel_members").bind("click.view",TS.view.onChannelMemberListClick);
$("#search_results_container").bind("click.view",TS.view.onSearchResultsClick);
$("#im_meta").on("click",function(c){TS.view.doLinkThings(c)
});
$("a.clear_unread_messages").tooltip({placement:"bottom",delay:{show:500,hide:150}});
TS.view.cached_wh=0;
TS.view.resizeManually("TS.view.onStart 2");
var b=false;
$(window).bind("scroll",function(c){if(b){return
}b=true;
$(window).unbind("mouseup.scroll").bind("mouseup.scroll",function(d){b=false;
$(window).unbind("mouseup.scroll");
$("body").scrollTop(0)
})
});
if(TS.model.is_mac){$("#drag_drop_mac_key").text("Command")
}},was_at_bottom_at_first_resize_event:false,resize_tim:0,onResize:function(){if(!TS.view.triggering_resize){TS.view.cached_wh=0
}TS.model.ui.cached_msgs_scroller_rect=null;
TS.model.ui.cached_search_scroller_rect=null;
TS.model.ui.cached_channels_scroller_rect=null;
if(TS.view.resize_tim){clearTimeout(TS.view.resize_tim);
TS.view.resize_tim=0
}else{TS.view.was_at_bottom_at_first_resize_event=TS.client.ui.areMsgsScrolledToBottom(50)
}TS.view.resize_tim=setTimeout(function(){clearTimeout(TS.view.resize_tim);
TS.view.resize_tim=0;
TS.view.resize(true)
},250);
if(TS.view.triggering_resize){return
}TS.view.resize(false,true)
},team_menu_h:$("#team_menu").height(),cached_wh:0,last_input_height:0,last_input_container_height:0,msgs_scroller_y:-1,footer_outer_h:-1,default_col_flex_top:-1,triggering_resize:false,resizeManually:function(a,b){a=a||"unspecified";
TS.log(389,"======================================resizeManually ("+a+") starting");
var c=TS.utility.date.getTimeStamp();
TS.view.resize(false,false,!!b);
TS.log(389,"======================================resizeManually ("+a+") took "+(TS.utility.date.getTimeStamp()-c)+"ms")
},setFlexMenuSize:function(){$("#menu_items_scroller").css("max-height",TS.view.cached_wh-200);
TS.client.ui.updateClosestMonkeyScroller($("#menu_items_scroller"))
},resize:function(j,h,g){var i=0;
var c=TS.utility.date.getTimeStamp();
TS.log(389,c+" #1 cached_wh:"+TS.view.cached_wh+" TS.view.resize from_timer:"+j+" no_trigger:"+h+" "+(TS.utility.date.getTimeStamp()-c)+"ms");
c=TS.utility.date.getTimeStamp();
var a=TS.client.ui.areMsgsScrolledToBottom(50);
TS.log(389,c+" #2 "+(TS.utility.date.getTimeStamp()-c)+"ms");
c=TS.utility.date.getTimeStamp();
var e=TS.view.cached_wh===0;
var b=TS.view.cached_wh=TS.view.cached_wh||$(window).height()-i;
$("#footer, #user_menu").css("bottom",i);
$("#col_channels_bg").css("height",b-i);
if(TS.view.msgs_scroller_y==-1){TS.view.msgs_scroller_y=TS.client.ui.$msgs_scroller_div.offset().top
}if(TS.view.footer_outer_h==-1){TS.view.footer_outer_h=$("#footer").outerHeight()
}if(TS.view.default_col_flex_top==-1){TS.view.default_col_flex_top=parseInt($("#col_flex").css("top"))
}var d=(TS.client.ui.$banner.hasClass("hidden"))?0:parseInt(TS.client.ui.$banner.css("height"));
if(d){$("#col_flex").css("top",TS.view.default_col_flex_top+d)
}else{$("#col_flex").css("top",TS.view.default_col_flex_top)
}if(TS.model.menu_is_showing){TS.view.setFlexMenuSize()
}$("#col_channels_bg").css("top",d);
if(e||!!TS.view.last_input_height){if(!TS.view.last_input_height){TS.view.measureInput()
}$("#message-form").css("height",TS.view.last_input_height);
var f=b-TS.view.msgs_scroller_y-TS.view.last_input_container_height-(22+d);
TS.client.ui.$msgs_scroller_div.css("height",f);
if(TS.model.archive_view_is_showing){var m=f;
if(TS.client.archives.not_member){m=b-(TS.view.msgs_scroller_y+d+$("#footer_archives").outerHeight())
}TS.client.archives.$scroller.css("height",m)
}var l=b-TS.view.msgs_scroller_y;
$("#flex_contents > .tab-pane").css("height",l);
$("#channels_scroller").css("height",b-TS.view.team_menu_h-(TS.view.footer_outer_h+d));
$("#archives_return").css("top",f-25)
}TS.log(389,c+" #10 "+(TS.utility.date.getTimeStamp()-c)+"ms");
c=TS.utility.date.getTimeStamp();
if(true||e||TS.view.never_set){$(".flex_content_scroller").each(function(p){var q=$(this);
if(q.is(":hidden")){return
}TS.view.never_set=false;
var o=q.offset().top;
var r=b-o;
q.css("height",r)
})
}TS.log(389,c+" #11 wh_changed:"+e+" "+(TS.utility.date.getTimeStamp()-c)+"ms");
c=TS.utility.date.getTimeStamp();
TS.client.msg_pane.padOutMsgsScroller();
TS.client.archives.padOutMsgsScroller();
if(!g&&(a||TS.view.was_at_bottom_at_first_resize_event)){TS.client.ui.instaScrollMsgsToBottom()
}if(j){TS.view.was_at_bottom_at_first_resize_event=false
}else{if(!h){TS.view.triggering_resize=true;
$(window).trigger("resize");
TS.view.triggering_resize=false
}}TS.client.ui.checkUnseenChannelsImsGroupsWithUnreads();
if(TS.view.msgs_unscrollable){TS.view.makeMsgsDivUnscrollable()
}TS.ui.msg_tab_complete.positionUI();
if($("#lightbox_dialog").is(":visible")){TS.ui.lightbox_dialog.position()
}var k=$("#msgs_div").width();
TS.view.makeAttachmentWidthRule(k);
if(k>400){$("#notification_bar").addClass("wide")
}else{$("#notification_bar").removeClass("wide")
}if(k>600){$("#notification_bar").addClass("really_wide")
}else{$("#notification_bar").removeClass("really_wide")
}TS.log(389,c+" #15 "+(TS.utility.date.getTimeStamp()-c)+"ms")
},never_set:true,measureInput:function(){if(!TS.model.prefs){return
}TS.view.last_input_height=TS.client.ui.$msg_input[0].offsetHeight;
TS.client.ui.$messages_input_container.css("height",TS.view.last_input_height);
if(TS.model.prefs.msg_preview){TS.client.ui.$msg_preview.css("padding-bottom",TS.view.last_input_height)
}if((TS.model.prefs.msg_preview_displaces||TS.model.prefs.msg_preview_persistent)&&TS.model.msg_preview_showing){TS.view.last_input_container_height=Math.max(TS.client.ui.$messages_input_container.outerHeight(),TS.client.ui.$msg_preview.outerHeight()-22)
}else{TS.view.last_input_container_height=TS.client.ui.$messages_input_container.outerHeight()
}},makeAttachmentWidthRule:function(f){var b,d,a,e,c;
e=-60;
if(TS.model.prefs&&TS.model.prefs.theme=="dense"){e=-70
}b=(f+e);
c="			#msgs_div div.dynamic_content_max_width {				max-width:"+b+"px;			}		";
if(TS.view.last_attachment_max_width!==b){TS.view.last_attachment_max_width=b;
d="dynamic_content_max_width_rule";
a=$("#"+d);
if(a.length){a.html(c)
}else{$('<style type="text/css" id="'+d+'">'+c+"</style>").appendTo("head")
}}},filesSelected:function(a){TS.client.ui.validateFiles(a,false,function(c,b){TS.ui.upload_dialog.startWithCommentFromChatInput(c)
})
},filePasted:function(b,a){if(a){TS.files.justUploadTheseFileNow([b])
}else{TS.ui.upload_dialog.startWithCommentFromChatInput([b])
}},filesDropped:function(b,a){if(a){TS.files.justUploadTheseFileNow(b)
}else{TS.ui.upload_dialog.startWithCommentFromChatInput(b)
}},fileUploading:function(c,b,a){var d="";
if(a){d+='<a id="cancel_upload_in_progress" class="float_right right_margin">cancel</a>'
}d+='<span id="progress_label">';
if(b){d+="Re-uploading"
}else{d+="Uploading"
}d+=" <strong class='filename'>"+TS.utility.htmlEntities(c)+"</strong> ...</span> <span id='progress_percent'></span> <span id='progress_queue'></span>";
$("#file_progress").queue(function(e){$(this).removeClass("hidden candy_red_bg ocean_teal_bg loaded").find("#progress_text").html(d).find("#cancel_upload_in_progress").click(TS.files.cancelCurrentUpload);
e()
}).fadeIn(200)
},fileProgress:function(a){$("#file_progress").queue(function(b){$("#file_progress").find("#progress_bar.no_transition").removeClass("no_transition");
if(a<99){$("#file_progress").find("#progress_bar").css({width:a+"%"}).end().find("#progress_percent").text(a+"%")
}else{$("#file_progress").addClass("loaded").find("#progress_bar").css({width:"100%"}).end().find("#progress_percent").remove().end().find("#cancel_upload_in_progress").remove().end().find("#progress_label").text("Processing uploaded file ...")
}if(TS.files.uploadQ.length){$("#file_progress").find("#progress_queue").html(" <span>(1 of "+(TS.files.uploadQ.length+1)+")</span>")
}b()
})
},fileUploaded:function(a,b){$("#file_progress").queue(function(d){if(a){$("#file_progress").addClass("ocean_teal_bg").removeClass("loaded").find("#progress_bar").addClass("no_transition").css({width:"0%"}).end().find("#progress_label").html("Processing uploaded file ... complete!").end().find("#progress_percent").text("");
if(TS.model.ui_state.flex_visible){var c=TS.files.getFileById(b);
if(c&&(c.mode=="snippet"||c.mode=="post")){TS.client.ui.previewFile(c.id,"file_list")
}}}else{}d()
}).delay(1000)
},fileCanceled:function(a){$("#file_progress").queue(function(b){$("#file_progress").addClass("candy_red_bg").removeClass("loaded").find("#progress_bar").css({width:"0%"}).end().find("#progress_label").html("Canceling <strong class='filename'>"+TS.utility.htmlEntities(a)+"</strong> ...").end().find("#cancel_upload_in_progress").remove().end().find("#progress_percent").text("");
b()
}).delay(1000)
},fileQueueEmptied:function(){$("#file_progress").fadeOut(200)
},updateTypingText:function(){var a=TS.typing.getTypersInChannel(TS.shared.getActiveModelOb().id);
if(!a||!a.length||TS.model.archive_view_is_showing){$("#typing_text").empty();
$("#notification_bar").removeClass("showing_typing");
return
}if(!TS.model.prefs.show_typing){return
}$("#notification_bar").addClass("showing_typing");
if(a.length==1){$("#typing_text").html('<span class="typing_name">'+TS.utility.htmlEntities(TS.members.getMemberDisplayName(a[0]))+"</span> is typing")
}else{if(a.length==2){$("#typing_text").html('<span class="typing_name">'+TS.utility.htmlEntities(TS.members.getMemberDisplayName(a[0]))+'</span> and <span class="typing_name">'+TS.utility.htmlEntities(TS.members.getMemberDisplayName(a[1]))+"</span> are typing")
}else{$("#typing_text").html("several people are typing")
}}},teamFilesFetched:function(a){TS.view.throttledRebuildFileList()
},teamFileAdded:function(a){if(!a.is_deleted&&TS.view.shouldFileAppearInlist(a)){TS.view.throttledRebuildFileList()
}},teamFileChanged:function(b){if(!b.is_deleted&&TS.view.shouldFileAppearInlist(b)){TS.view.throttledRebuildFileList()
}var a=TS.shared.getActiveModelOb();
if(a){TS.utility.msgs.updateFileMsgs(a,b)
}},teamFileDeleted:function(a){if(TS.view.shouldFileAppearInlist(a)){TS.view.throttledRebuildFileList()
}},throttledRebuildFileList:function(){TS.utility.throttle.method(TS.view.rebuildFileList,"file_list_rebuild",1000)
},fileFilterSet:function(){if(TS.model.ui.active_tab_id!="files"||!TS.model.ui_state.flex_visible||TS.model.previewed_file_id){TS.client.ui.showFileList()
}TS.view.rebuildFileList();
$("#file_list_scroller").scrollTop(0);
var a=$("#file_list").data("list");
if(a=="user"){TS.files.fetchMemberFiles(TS.model.user.id,TS.model.file_list_types);
return
}else{if(a.indexOf("U")===0){TS.files.fetchMemberFiles($("#file_list").data("filter-user"),TS.model.file_list_types);
return
}}TS.files.fetchTeamFiles(TS.model.file_list_types)
},fileClearFilter:function(){TS.model.active_file_list_filter="all";
TS.view.file_list_heading="All File Types";
TS.model.file_list_types=["all"];
TS.view.fileFilterSet();
TS.view.fileSetButtonState("all");
$("#file_list_clear_filter").addClass("hidden")
},fileSetButtonState:function(a){$(".secondary_file_button").addClass("hidden");
if(a=="snippets"){$("#secondary_snippet_button").removeClass("hidden")
}else{if(a=="posts"){$("#secondary_post_button").removeClass("hidden")
}else{$("#file_list_button").removeClass("hidden")
}}},shouldFileAppearInlist:function(b){var a=TS.model.file_list_types;
if(!a){return true
}if(!a.length){return true
}if(a.indexOf("all")>-1){return true
}if(a.indexOf("snippets")>-1&&b.mode=="snippet"){return true
}if(a.indexOf("posts")>-1&&b.mode=="post"){return true
}if(a.indexOf("spaces")>-1&&b.mode=="space"){return true
}if(a.indexOf("emails")>-1&&b.mode=="email"){return true
}if(a.indexOf("zips")>-1&&b.filetype=="zip"){return true
}if(a.indexOf("pdfs")>-1&&b.filetype=="pdf"){return true
}if(a.indexOf("images")>-1&&b.mimetype&&b.mimetype.indexOf("image/")===0){return true
}if(a.indexOf("gdocs")>-1&&b.mimetype&&b.mimetype.indexOf("application/vnd.google-apps")===0){return true
}return false
},last_files_html:"",rebuildFileList:function(){TS.log(5,"rebuildFileList");
var c=$("#file_list");
var m=$("#file_list_block");
var e=c.data("list");
var b=TS.model.files;
var h;
var l="/files";
if(e=="user"){b=TS.model.user.files;
l+="/"+TS.model.user.name
}else{if(e.indexOf("U")===0){h=TS.members.getMemberById(e);
if(h){b=h.files;
l+="/"+h.name
}else{TS.error(e+" is not valid?")
}}}var j="";
var d;
for(var g=0;
g<b.length;
g++){d=b[g];
if(!d.is_deleted&&TS.view.shouldFileAppearInlist(d)){j+=TS.templates.builders.fileHTML(d)
}}$("#file_list_heading").find(".heading_label").text(TS.view.file_list_heading);
$("#file_list_toggle").removeClass("hidden");
$("#file_search_cancel").addClass("hidden");
j=j.replace(/\ue000/g,"").replace(/\ue001/g,"");
var k=TS.model.file_list_types;
var f=!k||!k.length||k.indexOf("all")!=-1;
m.find(".subsection").addClass("hidden");
if(f){m.find('.subsection[data-filter="all"]').removeClass("hidden")
}else{if(TS.model.active_file_list_member_filter=="all"){l+="/all"
}l+="/"+TS.model.active_file_list_filter;
m.find('.subsection[data-filter="'+k[0]+'"]').removeClass("hidden")
}if(!j){var a=".";
if(e=="user"){a=" from you."
}else{if(h){a=" from <strong>"+TS.members.getMemberDisplayName(h,true)+"</strong>."
}}if(f){j='<p class="no_results">No files'+a+"</p>"
}else{j='<p class="no_results">No '+TS.model.file_list_type_map[k[0]]+a+"</p>"
}}if(j!=TS.view.last_files_html){if(TS.view.file_list_lazyload&&TS.view.file_list_lazyload.detachEvents){TS.view.file_list_lazyload.detachEvents()
}c.html(j);
TS.utility.makeSureAllLinksHaveTargets(c);
TS.view.file_list_lazyload=c.find("img.lazy").lazyload({container:$("#file_list_scroller")});
$("#file_list_scroller").trigger("resize-immediate")
}TS.view.last_files_html=j;
if(TS.model.files.length===0){$("#file_listing_bottom_button").addClass("hidden")
}else{$("#file_listing_bottom_button").removeClass("hidden").attr("href",l)
}TS.client.ui.updateClosestMonkeyScroller(c)
},shareFileInCurrentChannelOrIM:function(a){TS.ui.share_dialog.start(a)
},deleteFile:function(d){var b;
var c;
var a;
var e=(TS.files&&TS.files.getFileById?TS.files.getFileById(d):null);
if(e&&e.filetype&&e.filetype==="space"){b="Delete Space";
c="Are you sure you want to delete this Space permanently?";
a="Yes, delete this Space"
}else{b="Delete file";
c="Are you sure you want to delete this file permanently?";
a="Yes, delete this file"
}TS.generic_dialog.start({title:b,body:c,show_cancel_button:true,show_go_button:true,go_button_class:"btn_danger",go_button_text:a,cancel_button_text:"Cancel",on_go:function(){TS.files.deleteFile(d)
}})
},saveFileToDropbox:function(a){TS.generic_dialog.start({title:"Save to Dropbox",body:"Do you want to save this file to your Dropbox Slack folder?",show_cancel_button:true,show_go_button:true,go_button_text:"Yes",cancel_button_text:"No",on_go:function(){TS.files.saveFileToDropbox(a)
}})
},getSelectorForTypingIndicator:function(b,c){var a;
if(b.is_im){a=".channels_list_holder ul li."+TS.templates.makeMemberDomId(c)
}else{if(b.id==TS.shared.getActiveModelOb().id){a="#"+TS.templates.makeChannelListDomId(b)+" ."+TS.templates.makeMemberDomId(c)
}}return a
},memberTypingStarted:function(b,c){if(!TS.model.prefs.show_typing){return
}if(b.id==TS.shared.getActiveModelOb().id){TS.view.updateTypingText()
}if(c.is_self){return
}var a=TS.view.getSelectorForTypingIndicator(b,c);
if(a){$(a).addClass("typing")
}},memberTypingEnded:function(b,c){if(b.id==TS.shared.getActiveModelOb().id){TS.view.updateTypingText()
}var a=TS.view.getSelectorForTypingIndicator(b,c);
if(a){$(a).removeClass("typing")
}},memberPresenceChanged:function(d){if(!d){return
}var a;
if(d.is_self){TS.view.updateUserPresence();
if(TS.model.ms_connected){TS.view.maybeChangeConnectionDisplay()
}var c=$("#menu").find("#member_presence").find(".menu_item_label");
if(d.presence=="away"){c.text("[Away] Set yourself to active")
}else{c.text("Set yourself away")
}}else{a="."+TS.templates.makeMemberDomId(d);
if(d.presence=="away"){$(a).addClass("away")
}else{$(a).removeClass("away")
}}a="."+TS.templates.makeMemberPresenceDomClass(d.id);
$(a).removeClass("away active").addClass(d.presence).attr("title",d.presence);
var b=TS.shared.getActiveModelOb();
if((TS.model.active_channel_id||TS.model.active_group_id)&&b.members.indexOf(d.id)>-1){TS.client.msg_pane.rebuildChannelMembersList()
}},getUserPresenceStr:function(){var a=TS.model.user;
if(a.manual_presence=="away"){return a.presence+" (manual)"
}else{return a.presence
}},updateUserPresence:function(){$(".user_presence_label").text(TS.view.getUserPresenceStr())
},memberJoinedTeam:function(a){TS.view.rebuildTeamList()
},member_changed_visibility_to_user_tim:0,memberChangeVisibilityToUser:function(){clearTimeout(TS.view.member_changed_visibility_to_user_tim);
TS.view.member_changed_visibility_to_user_tim=setTimeout(function(){TS.client.channel_pane.rebuildImList();
TS.client.channel_pane.rebuildStarredList();
TS.view.rebuildTeamList()
},1000)
},somethingChangedOnUser:function(a){TS.view.showProperTeamPaneFiller()
},memberChangedName:function(a){if(a.id==TS.model.user.id){$("#current_user_name").html(a.name);
TS.prefs.setHighlightWords(TS.model.prefs.highlight_words)
}TS.view.updateTitleWithContext();
TS.client.ui.rebuildAll();
TS.view.rebuildTeamList();
if(a.id!=TS.model.previewed_member_id){return
}TS.client.ui.previewMember(a.id)
},memberChangedDeleted:function(a){TS.client.channel_pane.rebuildImList();
TS.client.channel_pane.rebuildStarredList();
TS.client.msg_pane.rebuildChannelMembersList();
TS.view.rebuildTeamList()
},memberChangedProfile:function(b){var a=[];
TS.client.ui.rebuildAll();
TS.view.rebuildTeamList();
if(b.id==TS.model.user.id){if(b.is_restricted){if(TS.model.is_retina){a.push("url("+cdn_url+"/c764/img/avatar_overlays_@2x.png)")
}else{a.push("url("+cdn_url+"/1c60/img/avatar_overlays.png)")
}}a.push("url("+b.profile.image_72+")");
$("#current_user_avatar .member_image").attr("style","background-image: "+a.join(","));
a.pop();
a.push("url("+b.profile.image_48+")");
$('a[data-member-id="'+TS.model.user.id+'"] .member_image, a[data-member-id="'+TS.model.user.id+'"].member_image').attr("style","background-image: "+a.join(","))
}if(b.id!=TS.model.previewed_member_id){return
}TS.client.ui.previewMember(b.id)
},member_account_changed_tim:0,memberAccountTypeChanged:function(a){if(a&&a.id==TS.model.user.id){return
}clearTimeout(TS.view.member_account_changed_tim);
TS.view.member_account_changed_tim=setTimeout(function(){TS.view.rebuildTeamList();
if(a.id!=TS.model.previewed_member_id){return
}TS.client.ui.previewMember(a.id)
},1000)
},memberChangedTZ:function(a){TS.client.ui.rebuildAll();
TS.view.rebuildTeamList();
if(a.id!=TS.model.previewed_member_id){return
}TS.client.ui.previewMember(a.id)
},memberStatusChanged:function(b){if(!b){return
}if(b.is_self){$(".user_status_label").text(b.status||"")
}var a="."+TS.templates.makeMemberStatusDomClass(b.id);
$(a).html(b.status?b.status:"-")
},botChanged:function(a){TS.client.msg_pane.rebuildMsgs()
},imUnreadHighlightCountChanged:function(b,c){if(!b){return
}var a="."+TS.templates.makeUnreadHighlightDomId(b);
$(a).html(b.unread_highlight_cnt);
TS.client.ui.checkUnseenChannelsImsGroupsWithUnreads()
},imMsgNotsent:function(a,c,b){if(a.id!=TS.model.active_im_id){return
}TS.view.showUnSentControlsForMsg(c,a,b)
},imUnreadCountChanged:function(c,d){if(!c){return
}var e=TS.members.getMemberById(c.user);
var b="."+TS.templates.makeMemberDomId(e);
var a="."+TS.templates.makeUnreadHighlightDomId(e);
if(c.unread_cnt===0){$(b).removeClass("unread mention");
$(a).html(c.unread_cnt).addClass("hidden")
}else{if(c.unread_cnt<10){$(b).addClass("unread mention");
$(a).html(c.unread_cnt).removeClass("hidden")
}else{$(b).addClass("unread mention");
$(a).html("9+").removeClass("hidden")
}}TS.client.ui.checkUnseenChannelsImsGroupsWithUnreads()
},imMarked:function(a){TS.client.channel_pane.rebuildImList();
TS.client.channel_pane.rebuildStarredList();
if(a.id!=TS.model.active_im_id){return
}TS.client.msg_pane.assignLastReadMsgDiv(a);
TS.view.reClassUnreads(a.last_read)
},imMessageReceived:function(a,b){if(!a.is_open){TS.client.channel_pane.rebuildImList();
TS.client.channel_pane.rebuildStarredList()
}if(a.id!=TS.model.active_im_id){return
}if(!b){TS.error("no msg?");
return
}if(a.msgs.length==1){TS.client.msg_pane.rebuildMsgs()
}else{TS.view.addMsg(b,a.unread_cnt)
}},imMessageRemoved:function(a,b){if(a.id!=TS.model.active_im_id){return
}if(!b){TS.error("no msg?");
return
}TS.view.removeMessageDiv(b)
},imMessageChanged:function(a,b){if(a.id!=TS.model.active_im_id){return
}setTimeout(function(){TS.view.rebuildMsg(b)
},0)
},imHistoryFetched:function(a){if(a.id!=TS.model.active_im_id){return
}TS.client.ui.afterHistoryFetch(a)
},imHistoryBeingFetched:function(a){if(a.id!=TS.model.active_im_id){return
}TS.client.msg_pane.updateEndMarker();
a=TS.ims.getImById(TS.model.active_im_id);
if(!a||!a.msgs.length){return
}if(TS.model.ms_connected){if(a.history_changed){TS.model.ui.last_top_msg=null
}else{var b=TS.utility.msgs.getDisplayedMsgs(a.msgs);
TS.model.ui.last_top_msg=b[b.length-1]
}}else{TS.model.ui.last_top_msg=null
}TS.client.msg_pane.updateEndMarker();
$("html").unbind("mousemove.monkeyScroll")
},switchedHelper:function(){var a=TS.shared.getActiveModelOb();
if(TS.model.last_active_cid){TS.utility.msgs.removeAllEphemeralMsgsByType("temp_slash_cmd_feedback",TS.model.last_active_cid);
if(TS.shared.getModelObById(TS.model.last_active_cid)){TS.shared.getModelObById(TS.model.last_active_cid)._show_in_list_even_though_no_unreads=false
}}if(a.scroll_top!==0){a.is_limited=false;
a.oldest_msg_ts=null;
TS.storage.storeOldestTs(a.id,null)
}if(TS.model.prefs.temp_archive_viewer){if(a.is_channel&&(!a.is_member||a.is_archived)){TS.client.archives.start()
}else{if(a.is_group&&a.is_archived){TS.client.archives.start()
}else{TS.client.archives.cancel(true)
}}}TS.shared.getModelObById(TS.model.active_cid)._show_in_list_even_though_no_unreads=false;
TS.client.msg_pane.clearBlueBarTimer();
TS.view.cacheMsgsHtml();
TS.client.ui.rebuildAll();
if(!TS.model.is_ms_tablet){TS.view.focusMessageInput()
}TS.view.checkIfInputShouldBeDisabledAndPopulate();
TS.view.showInterstitialAfterChannelOrImShown()
},imSwitched:function(){TS.view.switchedHelper();
TS.client.ui.hideMemberList();
TS.view.unAdjustForWelcomeSlideShow();
TS.view.updateTitleWithContext();
TS.view.updateTypingText()
},imOpened:function(a){TS.client.msg_pane.rebuildChannelMembersList();
TS.client.channel_pane.rebuildImList();
TS.client.channel_pane.rebuildStarredList()
},imClosed:function(a){TS.client.msg_pane.rebuildChannelMembersList();
TS.client.channel_pane.rebuildImList();
TS.client.channel_pane.rebuildStarredList()
},groupArchived:function(a){TS.client.channel_pane.rebuildGroupList();
TS.client.channel_pane.rebuildStarredList();
if(a.id!=TS.model.active_group_id){return
}if(TS.model.prefs.temp_archive_viewer){TS.client.archives.start()
}},groupUnArchived:function(a){TS.client.channel_pane.rebuildGroupList();
TS.client.channel_pane.rebuildStarredList();
if(a.id!=TS.model.active_group_id){return
}TS.client.msg_pane.rebuildMsgs()
},groupMsgNotSent:function(b,c,a){if(b.id!=TS.model.active_group_id){return
}TS.view.showUnSentControlsForMsg(c,b,a)
},groupTopicChanged:function(c,a,b){if(!c){return
}if(c.id!=TS.model.active_group_id){return
}TS.client.msg_pane.displayTitle();
TS.client.msg_pane.updateEndMarker()
},groupPurposeChanged:function(c,a,b){if(!c){return
}if(c.id!=TS.model.active_group_id){return
}TS.client.msg_pane.updateEndMarker()
},groupUnreadCountChanged:function(b,c){if(!b){return
}var a="."+TS.templates.makeGroupDomId(b);
if(b.unread_cnt===0){$(a).removeClass("unread mention")
}else{$(a).addClass("unread");
if(b.unread_highlight_cnt>0){$(a).addClass("mention")
}}if(b._show_in_list_even_though_no_unreads){$(a).addClass("show_in_list_even_though_no_unreads")
}else{$(a).removeClass("show_in_list_even_though_no_unreads")
}a="."+TS.templates.makeUnreadJustDomId(b);
if(b.unread_cnt===0){$(a).html(b.unread_cnt).addClass("hidden")
}else{if(b.unread_cnt<10){$(a).html(b.unread_cnt).removeClass("hidden")
}else{$(a).html("9+").removeClass("hidden")
}}TS.client.ui.checkUnseenChannelsImsGroupsWithUnreads()
},groupUnreadHighlightCountChanged:function(b,c){if(!b){return
}var a="."+TS.templates.makeUnreadHighlightDomId(b);
if(b.unread_highlight_cnt===0){$(a).html(b.unread_highlight_cnt).addClass("hidden")
}else{if(b.unread_highlight_cnt<10){$(a).html(b.unread_highlight_cnt).removeClass("hidden")
}else{$(a).html("9+").removeClass("hidden")
}}},groupMarked:function(a){if(a.id!=TS.model.active_group_id){return
}TS.client.msg_pane.assignLastReadMsgDiv(a);
TS.view.reClassUnreads(a.last_read)
},groupMessageReceived:function(b,c){if(b.id!=TS.model.active_group_id){return
}if(!c){TS.error("no msg?");
return
}var a=b.msgs.length>1&&TS.utility.msgs.msgMightBeRolledUp(c)&&TS.utility.msgs.msgMightBeRolledUp(b.msgs[1]);
if(a||b.msgs.length==1){TS.client.msg_pane.rebuildMsgs()
}else{TS.view.addMsg(c,b.unread_cnt)
}},groupMessageRemoved:function(a,b){if(a.id!=TS.model.active_group_id){return
}if(!b){TS.error("no msg?");
return
}TS.view.removeMessageDiv(b)
},groupMessageChanged:function(a,b){if(a.id!=TS.model.active_group_id){return
}setTimeout(function(){TS.view.rebuildMsg(b)
},0)
},groupHistoryFetched:function(a){if(a.id!=TS.model.active_group_id){return
}TS.client.ui.afterHistoryFetch(a)
},groupHistoryBeingFetched:function(b){if(b.id!=TS.model.active_group_id){return
}TS.client.msg_pane.updateEndMarker();
b=TS.groups.getGroupById(TS.model.active_group_id);
if(!b||!b.msgs.length){return
}if(TS.model.ms_connected){if(b.history_changed){TS.model.ui.last_top_msg=null
}else{var a=TS.utility.msgs.getDisplayedMsgs(b.msgs);
TS.model.ui.last_top_msg=a[a.length-1]
}}else{TS.model.ui.last_top_msg=null
}$("html").unbind("mousemove.monkeyScroll")
},groupSwitched:function(){TS.view.switchedHelper();
if(TS.model.ui_state.member_list_visible){TS.client.ui.showMemberList()
}TS.view.unAdjustForWelcomeSlideShow();
TS.view.updateTitleWithContext();
TS.view.updateTypingText()
},groupRenamed:function(){TS.client.ui.rebuildAll()
},groupJoined:function(a){TS.client.channel_pane.rebuildGroupList();
TS.client.channel_pane.rebuildStarredList()
},groupDeleted:function(a){TS.client.channel_pane.rebuildGroupList();
TS.client.channel_pane.rebuildStarredList()
},created_group_overlay_tim:0,groupMemberJoined:function(a,b){if(a.id!=TS.model.active_group_id){return
}TS.client.msg_pane.rebuildChannelMembersList();
if(a.needs_created_message){clearTimeout(TS.view.created_group_overlay_tim);
TS.view.created_group_overlay_tim=setTimeout(function(){if(a.id==TS.model.active_group_id){TS.view.overlay.startWithCreatedGroup(a)
}},1000)
}},groupLeft:function(a){TS.client.channel_pane.rebuildGroupList();
TS.client.channel_pane.rebuildStarredList()
},groupMemberLeft:function(b,a){if(b.id!=TS.model.active_group_id){return
}TS.client.msg_pane.rebuildChannelMembersList()
},groupOpened:function(a){TS.client.msg_pane.rebuildChannelMembersList();
TS.client.channel_pane.rebuildGroupList();
TS.client.channel_pane.rebuildStarredList()
},groupClosed:function(a){TS.client.msg_pane.rebuildChannelMembersList();
TS.client.channel_pane.rebuildGroupList();
TS.client.channel_pane.rebuildStarredList()
},channelArchived:function(a){TS.client.channel_pane.rebuildChannelList();
TS.client.channel_pane.rebuildStarredList();
TS.client.msg_pane.rebuildChannelMembersList();
if(a.id!=TS.model.active_channel_id){return
}if(TS.model.prefs.temp_archive_viewer){TS.client.archives.start()
}},channelUnArchived:function(a){TS.client.channel_pane.rebuildChannelList();
TS.client.channel_pane.rebuildStarredList();
if(a.id!=TS.model.active_channel_id){return
}TS.client.msg_pane.rebuildChannelMembersList();
TS.client.msg_pane.rebuildMsgs()
},channelMsgNotsent:function(b,c,a){if(b.id!=TS.model.active_channel_id){return
}TS.view.showUnSentControlsForMsg(c,b,a)
},channelTopicChanged:function(c,a,b){if(!c){return
}if(c.id!=TS.model.active_channel_id){return
}TS.client.msg_pane.displayTitle();
TS.client.msg_pane.updateEndMarker()
},channelPurposeChanged:function(c,a,b){if(!c){return
}if(c.id!=TS.model.active_channel_id){return
}TS.client.msg_pane.updateEndMarker()
},channelUnreadCountChanged:function(b,c){if(!b){return
}var a="."+TS.templates.makeChannelDomId(b);
if(b.unread_cnt===0){$(a).removeClass("unread mention")
}else{$(a).addClass("unread");
if(b.unread_highlight_cnt>0){$(a).addClass("mention")
}}if(b._show_in_list_even_though_no_unreads){$(a).addClass("show_in_list_even_though_no_unreads")
}else{$(a).removeClass("show_in_list_even_though_no_unreads")
}a="."+TS.templates.makeUnreadJustDomId(b);
if(b.unread_cnt===0){$(a).html(b.unread_cnt).addClass("hidden")
}else{if(b.unread_cnt<10){$(a).html(b.unread_cnt).removeClass("hidden")
}else{$(a).html("9+").removeClass("hidden")
}}TS.client.ui.checkUnseenChannelsImsGroupsWithUnreads()
},channelUnreadHighlightCountChanged:function(b,c){if(!b){return
}var a="."+TS.templates.makeUnreadHighlightDomId(b);
if(b.unread_highlight_cnt===0){$(a).html(b.unread_highlight_cnt).addClass("hidden")
}else{if(b.unread_highlight_cnt<10){$(a).html(b.unread_highlight_cnt).removeClass("hidden")
}else{$(a).html("9+").removeClass("hidden")
}}},channelMarked:function(a){if(a.id!=TS.model.active_channel_id){return
}TS.client.msg_pane.assignLastReadMsgDiv(a);
TS.view.reClassUnreads(a.last_read)
},channelMessageReceived:function(b,c){if(b.id!=TS.model.active_channel_id){return
}if(!c){TS.error("no msg?");
return
}var a=b.msgs.length>1&&TS.utility.msgs.msgMightBeRolledUp(c)&&TS.utility.msgs.msgMightBeRolledUp(b.msgs[1]);
if(a||b.msgs.length==1){TS.client.msg_pane.rebuildMsgs()
}else{TS.view.addMsg(c,b.unread_cnt)
}},channelMessageRemoved:function(a,b){if(a.id!=TS.model.active_channel_id){return
}if(!b){TS.error("no msg?");
return
}TS.view.removeMessageDiv(b)
},removeMsgsAfterTruncation:function(c){var d;
for(var b=0;
b<c.length;
b++){d=c[b];
TS.client.msg_pane.getDivForMsg(d.ts).remove();
$("#"+TS.templates.makeDayDividerDomId(d.ts)).remove()
}var a=TS.utility.msgs.getDisplayedMsgs(TS.shared.getActiveModelOb().msgs);
if(a){TS.view.rebuildMsg(a[a.length-1])
}TS.view.resizeManually("TS.view.removeMsgsAfterTruncation")
},removeMessageDiv:function(f){var e=TS.client.msg_pane.getDivForMsg(f.ts);
if(!e.length){return
}if(TS.utility.msgs.isTempMsg(f)){e.remove();
return
}var c=TS.client.msg_pane.last_rendered_msg&&TS.client.msg_pane.last_rendered_msg.ts==e.data("ts");
var b;
var d=e.nextAll(".message:not(.hidden)").first();
if(c){b=e.prevAll(".message:not(.hidden)").first();
$("#"+TS.templates.makeDayDividerDomId(f.ts)).remove()
}var a=function(){e.remove();
if(TS.client.ui.$msgs_unread_divider){var i=TS.client.ui.$msgs_unread_divider.nextAll(".message:not(.hidden)");
if(!i.length){TS.info("calling TS.client.ui.markMostRecentReadMsgInActive(true) after message removal because there are no displayed messages after the red line now");
TS.client.ui.markMostRecentReadMsgInActive(TS.model.marked_reasons.deleted,true)
}}if(c&&b&&b.length){var h=TS.utility.msgs.getMsg(b.data("ts"),TS.shared.getActiveModelOb().msgs);
if(h){TS.client.msg_pane.last_rendered_msg=TS.client.msg_pane.last_in_stream_msg=h;
TS.info("set a new TS.client.msg_pane.last_rendered_msg && TS.client.msg_pane.last_in_stream_msg because the deleted msg was the last one")
}}if(d&&d.length){var g=TS.utility.msgs.getMsg(d.data("ts"),TS.shared.getActiveModelOb().msgs);
if(g){TS.view.rebuildMsg(g)
}}TS.view.resizeManually("TS.view.removeMessageDiv")
};
e.find(".timestamp").tooltip("destroy");
e.addClass("delete_mode").slideUp(200,a)
},channelMessageChanged:function(a,b){if(a.id!=TS.model.active_channel_id){return
}setTimeout(function(){TS.view.rebuildMsg(b)
},0)
},channelHistoryFetched:function(a){if(a.id!=TS.model.active_channel_id){return
}TS.client.ui.afterHistoryFetch(a)
},channelHistoryBeingFetched:function(b){if(b.id!=TS.model.active_channel_id){return
}TS.client.msg_pane.updateEndMarker();
b=TS.channels.getChannelById(TS.model.active_channel_id);
if(!b||!b.msgs.length){return
}if(TS.model.ms_connected){if(b.history_changed){TS.model.ui.last_top_msg=null
}else{var a=TS.utility.msgs.getDisplayedMsgs(b.msgs);
TS.model.ui.last_top_msg=a[a.length-1]
}}else{TS.model.ui.last_top_msg=null
}$("html").unbind("mousemove.monkeyScroll")
},updateTitleWithContext:function(){var b,a,c,e,d;
a=TS.shared.getActiveModelOb();
if(!a){return
}c=a.name||"";
if(!c){return
}b=" | ";
d=document.title;
e=d.indexOf(b);
if(e!==-1){d=c+b+d.substr(e+b.length)
}else{d=c+b+d
}document.title=d
},slow_switch_threshold:5000,slow_switch_caught:null,start_time:new Date(),checkIfInputShouldBeDisabledAndPopulate:function(){if(TS.shared.getActiveModelOb()&&TS.shared.getActiveModelOb().is_general&&!TS.members.canUserPostInGeneral()){TS.client.ui.$msg_input.val("").trigger("autosize").trigger("autosize-resize");
TS.client.ui.$msg_input.attr("disabled",true);
$("#footer").addClass("disabled");
$("#message-input-message span").html("Your team owners have limited who can post to #<b>"+TS.channels.getGeneralChannel().name+"</b>")
}else{TS.client.ui.$msg_input.attr("disabled",false);
$("#footer").removeClass("disabled");
TS.client.ui.populateChatInputWithLast()
}},channelSwitched:function(){var c=new Date();
TS.view.switchedHelper();
if(TS.model.ui_state.member_list_visible){TS.client.ui.showMemberList()
}if(TS.model.prefs.seen_welcome_2){TS.view.unAdjustForWelcomeSlideShow()
}else{if(TS.shared.getActiveModelOb().id==TS.model.welcome_model_ob.id){TS.view.adjustForWelcomeSlideShow()
}else{TS.view.unAdjustForWelcomeSlideShow()
}}TS.view.updateTitleWithContext();
TS.view.updateTypingText();
var a=new Date();
var b=(a-c);
if(!TS.view.slow_switch_caught&&b>TS.view.slow_switch_threshold){TS.logError({message:"TS.view.channelSwitched > "+TS.view.slow_switch_threshold+" ms"}," took "+b+" ms. App open for "+((a-TS.view.start_time)/1000/60).toFixed(2)+" min. localStorage = "+(TS.model&&TS.model.prefs&&TS.model.prefs.ls_disabled?0:1));
TS.view.slow_switch_caught=true
}},channelRenamed:function(){TS.client.ui.rebuildAll();
TS.view.updateTitleWithContext()
},channelJoined:function(a){TS.client.channel_pane.rebuildChannelList();
TS.client.channel_pane.rebuildStarredList()
},channelCreated:function(a){TS.client.channel_pane.rebuildChannelList();
TS.client.channel_pane.rebuildStarredList()
},channelDeleted:function(a){TS.client.channel_pane.rebuildChannelList();
TS.client.channel_pane.rebuildStarredList()
},channelMemberJoined:function(a,b){if(a.id!=TS.model.active_channel_id){return
}TS.client.msg_pane.rebuildChannelMembersList();
if(a.needs_created_message){TS.view.overlay.startWithCreatedChannel(a)
}},channelLeft:function(a){TS.client.channel_pane.rebuildChannelList();
TS.client.channel_pane.rebuildStarredList()
},channelMemberLeft:function(b,a){if(b.id!=TS.model.active_channel_id){return
}TS.client.msg_pane.rebuildChannelMembersList()
},showUnSentControlsForMsg:function(c,a,b){if(b&&b.error&&b.error.code=="4"){TS.utility.msgs.handleFailedMsgSend(c.ts,a,false);
TS.client.ui.addOrFlashEphemeralBotMsg({text:"A team owner has restricted posting to the #*"+a.name+"* channel.",ephemeral_type:"general_posting_restricted"});
TS.client.ui.$msg_input.val(c.text);
TS.view.focusMessageInput();
return
}setTimeout(function(){TS.model.display_unsent_msgs[c.ts]=true;
TS.view.rebuildMsg(c)
},5000)
},scroll_down_when_msg_from_user_is_added:false,addMsg:function(h,c){var a=false;
var b=TS.shared.getActiveModelOb();
if(h.user==TS.model.user.id&&TS.view.scroll_down_when_msg_from_user_is_added){TS.view.scroll_down_when_msg_from_user_is_added=false;
a=true
}else{if(TS.client.ui.areMsgsScrolledToBottom()){a=true
}}var f=TS.client.msg_pane.last_rendered_msg;
var d=TS.templates.builders.buildMsgHTML({msg:h,model_ob:b,prev_msg:f,container_id:"msgs_div",enable_slack_action_links:true});
TS.client.ui.$msgs_div.append(d);
var e=TS.client.msg_pane.getDivForMsg(h.ts);
if(TS.model.prefs.animate_new_msgs){e.css("opacity","0");
e.transition({opacity:1},200)
}e.find(".timestamp").tooltip({delay:{show:450,hide:150},container:"body"});
TS.utility.makeSureAllLinksHaveTargets(e);
if(!h.rsp_id){TS.client.msg_pane.last_in_stream_msg=h;
if(!h.no_display){TS.client.msg_pane.last_rendered_msg=h
}}TS.client.msg_pane.assignLastReadMsgDiv(b);
TS.client.msg_pane.padOutMsgsScroller();
if(a){TS.client.ui.instaScrollMsgsToBottom(false)
}var g=TS.client.ui.isUserAttentionOnChat()&&(c<2);
if(h.user==TS.model.user.id||g){TS.client.msg_pane.checkUnreads()
}else{TS.client.ui.checkInlineImgsAndIframes("main")
}TS.client.msg_pane.insertUnreadDivider();
if(TS.client.ui.$msgs_scroller_div.data("monkeyScroll")){TS.client.ui.$msgs_scroller_div.data("monkeyScroll").updateFunc()
}},reClassUnreads:function(b){var a=TS.client.ui.areMsgsScrolledToBottom();
TS.client.ui.$msgs_div.children("div.message").each(function(c){var d=$(this).data("ts");
if(d>b){$(this).addClass("unread")
}else{$(this).removeClass("unread")
}});
if(TS.shared.getActiveModelOb().unread_cnt){TS.client.msg_pane.insertUnreadDivider()
}if(a){TS.client.ui.instaScrollMsgsToBottom(false)
}},rebuildMsg:function(g){if(!g){return
}var d=TS.client.msg_pane.getDivForMsg(g.ts);
if(!d.length){return
}var f=!g.subtype||g.is_ephemeral;
var a=TS.shared.getActiveModelOb();
var c=TS.client.ui.areMsgsScrolledToBottom();
var e=TS.utility.msgs.getPrevDisplayedMsg(g.ts,a.msgs);
var b=TS.templates.builders.buildMsgHTML({msg:g,model_ob:a,prev_msg:e,container_id:"msgs_div",enable_slack_action_links:true});
d=d.replaceWith(b);
if(f){d.addClass("edit_mode")
}TS.utility.makeSureAllLinksHaveTargets(d);
if(c){TS.client.ui.instaScrollMsgsToBottom(true)
}TS.client.ui.checkInlineImgsAndIframes("main");
d.find(".edited").tooltip({container:"body"});
d.find(".timestamp").tooltip({delay:{show:450,hide:150},container:"body"});
if(f){setTimeout(function(){d.removeClass("edit_mode")
},500)
}},showInterstitialAfterChannelOrImShown:function(){var a=TS.channels.getChannelById(TS.model.active_channel_id);
var b=TS.groups.getGroupById(TS.model.active_group_id);
var c=false;
if(a&&a.needs_created_message){if(TS.model.prefs.no_created_overlays){a.needs_created_message=false
}else{c=true;
TS.view.overlay.startWithCreatedChannel(a)
}}else{if(a&&a.needs_invited_message){if(TS.model.prefs.no_joined_overlays){a.needs_invited_message=false
}else{c=true;
TS.view.overlay.startWithInvitedChannel(a)
}}else{if(a&&a.needs_joined_message){if(TS.model.prefs.no_joined_overlays){a.needs_joined_message=false
}else{c=true;
TS.view.overlay.startWithJoinedChannel(a)
}}else{if(b&&b.needs_invited_message){if(TS.model.prefs.no_joined_overlays){b.needs_invited_message=false
}else{c=true;
TS.view.overlay.startWithInvitedGroup(b)
}}else{if(b&&b.needs_created_message){if(TS.model.prefs.no_created_overlays){b.needs_created_message=false
}else{c=true;
TS.view.overlay.startWithCreatedGroup(b)
}}}}}}if(!c){TS.view.overlay.fadeInAndOut()
}},memberStarsFetched:function(a){if(!a||!a.is_self){return
}TS.view.rebuildStars()
},rebuildStars:function(){var b=TS.model.user;
if(TS.view.member_stars_list_lazyload&&TS.view.member_stars_list_lazyload.detachEvents){TS.view.member_stars_list_lazyload.detachEvents();
TS.view.member_stars_list_lazyload=null
}if(b.stars&&b.stars.length){$("#member_stars_list").find(".timestamp").tooltip("destroy");
var a="";
$.each(b.stars,function(c,d){a+=TS.templates.builders.buildStarredItemHTML(d)
});
$("#member_stars_list").html(a);
TS.view.member_stars_list_lazyload=$("#member_stars_list").find("img.lazy").lazyload({container:$("#stars_scroller")});
TS.utility.makeSureAllLinksHaveTargets($("#member_stars_list"));
$("#member_stars_explanation").addClass("hidden");
$("#member_stars_list").find(".timestamp").tooltip({delay:{show:450,hide:150},container:"body"})
}else{$("#member_stars_list").html("");
$("#member_stars_explanation").removeClass("hidden")
}TS.view.resize()
},mentionChanged:function(a){TS.warn("mentionChanged:"+a.message.ts);
var c=$("#member_mentions").find("#"+TS.templates.makeMsgDomId(a.message.ts));
if(!c.length){return TS.view.rebuildMentions()
}var b=TS.templates.builders.buildMentionHTML(a,null,true);
if(!b){return TS.view.rebuildMentions()
}c.replaceWith(b)
},mentionRemoved:function(b){TS.warn("mentionRemoved:"+b);
var c=$("#member_mentions").find("#"+TS.templates.makeMsgDomId(b));
if(!c.length){return
}var a=function(){TS.view.rebuildMentions()
};
c.addClass("delete_mode").slideUp(200,a)
},mentionsFetched:function(){TS.view.rebuildMentions(true)
},rebuildMentions:function(a){var e=TS.model.user;
var c=$("#member_mentions_more_btn");
if(c.data("ladda")===undefined){c.data("ladda",Ladda.create(document.querySelector("#member_mentions_more_btn")));
c.bind("click.fetchMoreMentions",function(f){TS.mentions.fetchMoreMentions();
$(this).data("ladda").start()
})
}else{if(a){c.data("ladda").stop()
}}if(e.mentions&&e.mentions.length){var b="";
var d=null;
$("#member_mentions").find(".timestamp").tooltip("destroy");
$.each(e.mentions,function(g,f){var j=TS.templates.builders.buildMentionHTML(f,d);
if(!j){return
}b+=j;
d=f
});
$("#member_mentions").html(b);
TS.utility.makeSureAllLinksHaveTargets($("#member_mentions"));
$("#member_mentions_explanation").addClass("hidden");
if(TS.mentions.has_more){$("#member_mentions_more").css("visibility","visible")
}else{$("#member_mentions_more").css("visibility","hidden")
}$("#member_mentions").find(".timestamp").tooltip({delay:{show:450,hide:150},container:"body"})
}else{$("#member_mentions").html("");
$("#member_mentions_explanation").removeClass("hidden");
$("#member_mentions_more").css("visibility","hidden")
}TS.view.resize()
},setPresenceClasses:function(){$("#col_channels").addClass("show_presence");
$("#col_members").addClass("show_presence");
return
},loggedIn:function(){TS.client.ui.prefCollapsibleChanged();
TS.templates.makeSidebarBehaviorRule();
TS.newxp.initSlideShow();
TS.view.setPresenceClasses();
TS.setThemeClasses(true);
TS.client.ui.rebuildAll();
TS.view.focusMessageInput();
if(TS.model.active_im_id){TS.client.ui.hideMemberList()
}else{if(TS.model.ui_state.member_list_visible){TS.client.ui.showMemberList()
}}TS.files.fetchTeamFiles();
TS.files.fetchMemberFiles(TS.model.user.id);
TS.view.buildTeamList();
TS.client.ui.populateChatInputWithLast();
TS.client.ui.rebuildMemberListToggle();
TS.view.updateUserPresence();
TS.view.showProperTeamPaneFiller();
TS.members.view.bindTeamFilter("#team_filter","#team_list_scroller");
$("#channels_scroller").css("visibility","visible");
TS.view.showInterstitialAfterChannelOrImShown();
TS.view.toggleSpellcheck();
if((TS.model.team.prefs.display_real_names&&TS.model.prefs.display_real_names_override!=-1)||TS.model.prefs.display_real_names_override==1){$("#col_channels").addClass("real_names")
}else{$("#col_channels").removeClass("real_names")
}if(!TS.model.is_iOS){if(TS.ui.growls.no_notifications&&readCookie("no_growl_prompt")!="1"){$("#growl_prompt_div").removeClass("hidden");
$("#growl_prompt_a").bind("click",function(){TS.view.overlay.startWithGrowlPromptDisplay()
})
}else{if(TS.ui.growls.shouldShowPermissionButton()&&TS.ui.growls.getPermissionLevel()!="denied"&&readCookie("no_growl_prompt")!="1"){$("#growl_prompt_div").removeClass("hidden");
$("#growl_prompt_a").bind("click",function(){TS.view.overlay.startWithGrowlPromptDisplay()
})
}}}$("body").addClass("no_attachment_max_width");
if(TS.model.is_FF){TS.client.ui.$msgs_scroller_div.removeAttr("tabindex")
}if(TS.model.team.domain=="tinyspeck"){}if(TS.model.prefs.temp_archive_viewer){if(TS.shared.getActiveModelOb().is_channel&&!TS.shared.getActiveModelOb().is_member){TS.client.archives.start()
}}},showProperTeamPaneFiller:function(){var d=TS.members.getActiveMembersWithSelfAndSlackbot().length;
var b=4;
if(TS.model.user.is_admin){$("#team_block").removeClass("hidden");
if(d>b){$("#team_block_admin_invite_few").addClass("hidden");
$("#team_block_admin_invite_many").removeClass("hidden")
}else{$("#team_block_admin_invite_few").removeClass("hidden");
$("#team_block_admin_invite_many").addClass("hidden")
}}if(d>b){$("#team_block_description").addClass("hidden")
}else{$("#team_block").removeClass("hidden");
$("#team_block_description").removeClass("hidden")
}if(TS.model.team.email_domain){var a=TS.model.team.email_domain.split(",");
if(a.length==1){$("#team_block_email_domains").html("<b>@"+TS.utility.htmlEntities(TS.model.team.email_domain)+"</b>")
}else{var e=TS.utility.htmlEntities(a.pop());
var c=a.join("</b>, <b>@")+"</b> or <b>@"+TS.utility.htmlEntities(e)+"</b>";
$("#team_block_email_domains").html("<b>@"+c)
}$("#team_block").removeClass("hidden");
$("#team_block_email_on").removeClass("hidden");
$("#team_block_admin_email_off").addClass("hidden")
}else{$("#team_block_email_on").addClass("hidden");
if(TS.model.user.is_owner){$("#team_block").removeClass("hidden");
$("#team_block_admin_email_off").removeClass("hidden")
}}if(!TS.model.user.profile||!TS.model.user.profile.phone||!TS.model.user.profile.real_name){$("#team_block").removeClass("hidden");
$("#team_block_fill_prompt").removeClass("hidden")
}else{$("#team_block_fill_prompt").addClass("hidden")
}},ever_connected:false,socketConnected:function(){if(TS.view.ever_connected){TS.utility.msgs.removeAllEphemeralMsgsByType("disconnected_feedback");
TS.client.ui.rebuildAllButMsgs();
TS.client.ui.rebuildMemberListToggle();
TS.mentions.maybeUpdateMentions()
}else{TS.logLoad("TS.view.socketConnected first time")
}TS.view.ever_connected=true;
TS.client.ui.$msg_input.removeClass("offline");
$("#connection_div").html("").addClass("hidden");
TS.view.changeConnectionStatus("online");
TS.view.updateUserPresence();
TS.view.toggleSpellcheck();
TS.view.checkIfInputShouldBeDisabledAndPopulate();
TS.ui.a11y.annouceCurrentChannelOrImOrGroup()
},socketReconnecting:function(b){if(TS.model.window_unloading){$("#connection_div").html("").addClass("hidden")
}else{var a="reconnecting";
if(b){a+=" in "+b+" second"+(b==1?"":"s...");
if(b>2){a+=' <a onclick="TS.ms.manualReconnectNow()">retry now</a>'
}}else{a+="..."
}$("#connection_div").html(a).removeClass("hidden")
}},ponged:function(){var a=$("#connection_icon");
if(a.css("opacity")==1){a.css("opacity",0.98)
}else{a.css("opacity",1)
}},socketDisconnected:function(){TS.view.changeConnectionStatus("offline");
if(TS.model.ms_asleep){$("#connection_status").html("asleep")
}TS.client.ui.$msg_input.addClass("offline")
},socketTroubled:function(){TS.view.changeConnectionStatus("trouble");
$("#connection_status").html("connecting...");
TS.client.ui.$msg_input.addClass("offline")
},current_connection_status:null,current_unread_status:null,changeConnectionStatus:function(a){TS.view.current_connection_status=a;
TS.view.maybeChangeFavIco();
TS.view.maybeChangeConnectionDisplay()
},changeUnreadStatus:function(a){TS.view.current_unread_status=a;
TS.view.maybeChangeFavIco();
TS.client.ui.checkUnseenChannelsImsGroupsWithUnreads()
},maybeChangeFavIco:function(){var d=TS.view.current_connection_status;
var e=TS.view.current_unread_status;
var c;
if(d=="online"){c="app_icon_32px_green"
}else{if(d=="trouble"){c="app_icon_32px_yellow"
}else{c="app_icon_32px_red"
}}if(e=="unreads"){c+="_unreads"
}else{if(e=="mentions"){c+="_mentions"
}}var a=TS.model.data_urls[c];
var b=$("#favicon");
if(b.attr("href")!=a){b.replaceWith('<link id="favicon" rel="shortcut icon" href="'+a+'" sizes="16x16 32x32 48x48" type="image/png" />')
}},maybeChangeConnectionDisplay:function(){var a;
var b=$("#connection_icon");
var c=$("#connection_status");
if(TS.view.current_connection_status=="online"){TSSSB.call("setConnectionStatus","online");
if(TS.model.user.presence=="away"){a=TS.model.data_urls.connection_icon_online_away;
c.text("away")
}else{a=TS.model.data_urls.connection_icon_online;
c.text("online")
}}else{if(TS.view.current_connection_status=="trouble"){TSSSB.call("setConnectionStatus","connecting");
a=TS.model.data_urls.connection_icon_trouble;
c.text("connecting...")
}else{TSSSB.call("setConnectionStatus","offline");
a=TS.model.data_urls.connection_icon_offline;
c.text("offline")
}}if(b.attr("src")!=a){b.attr("src",a).removeClass("hidden")
}},windowUnloaded:function(){if(!TS.model.mac_ssb_version||TS.model.mac_ssb_version>=0.32){$("BODY").addClass("loading");
$("#connection_div").html("").addClass("hidden")
}},buildMemberPresenceStatusHTML:function(b){var a="";
a+='<span class="'+TS.templates.makeMemberStatusDomClass(b.id)+'">';
if(b.status){a+=' - "'+b.status+'"'
}a+="</span>";
return a
},rebuildTeamList:function(){if(!TS.model.ui_state.flex_visible||TS.model.ui_state.flex_name!=="team"){return
}var a,c,e,f,d,b;
a="team_list_members";
c="team_list_members_wrapper";
e="team_list_scroller";
b=$("#"+c);
TS.view.cleanTeamList();
b.html('<div id="'+a+'">'+TS.templates.builders.buildTeamListHTML(TS.members.getMembersForUser())+"</div>");
f=$("#"+a);
f.bind("click.view",TS.view.onMemberListClick);
if(TS.boot_data.feature_new_team_directory){f.on("click.toggle_list_item",".team_list_item",TS.members.view.onTeamDirectoryItemClick)
}if(TS.boot_data.feature_new_team_directory){f.on("click.member_preview_menu",".member_preview_menu_target",TS.menu.startWithMemberPreview)
}d=f.find(".lazy");
TS.view.members_list_lazyload=d.lazyload({container:$("#"+e)});
TS.client.flex_pane.startLocalTimeInterval();
TS.utility.makeSureAllLinksHaveTargets(f);
TS.view.triggerInitialTeamListLazyLoad();
d=null;
f=null
},cleanTeamList:function(){if(TS.view.members_list_lazyload&&TS.view.members_list_lazyload.detachEvents){TS.view.members_list_lazyload.detachEvents()
}var a=$("#team_list_members");
a.unbind("click.view",TS.view.onMemberListClick);
if(TS.boot_data.feature_new_team_directory){a.off("click.toggle_list_item")
}if(TS.boot_data.feature_new_team_directory){a.off("click.member_preview_menu")
}a.remove()
},triggerInitialTeamListLazyLoad:function(){TS.client.ui.updateClosestMonkeyScroller($("#team_list_members"));
$("#team_list_scroller").trigger("resize-immediate")
},buildTeamList:function(){TS.view.rebuildTeamList()
},maybeFollowLink:function(d){if(!d.metaKey&&!d.ctrlKey){return false
}var c=$(d.target);
var b=c.closest("a[href]");
if(b.length){return true
}return false
},doLinkThings:function(u,d){if(TS.view.maybeFollowLink(u)){return
}if(TS.client.ui.checkForEditing(u)){u.preventDefault();
return
}var x=$(u.target);
var p;
if(x.hasClass("member_preview_link")||x.hasClass("member_preview_image")){TS.info("click on .member_preview_link || .member_preview_image");
u.preventDefault();
p=x.data("member-id");
if(p){var c=x.closest("#member_preview_scroller");
if(c.length&&p==TS.model.previewed_member_id){TS.menu.startWithMember(u,p)
}else{var t=x.closest("#msgs_div");
if(TS.ui.share_dialog.showing){TS.ui.share_dialog.div.modal("hide")
}if(t.length){TS.menu.startWithMember(u,p)
}else{TS.client.ui.previewMember(p,d||"team_list")
}}}else{TS.warn("hmmm, no data-member-id?")
}return
}if(x.hasClass("member")){TS.info("click on .member");
u.preventDefault();
p=x.data("member-id");
if(p){TS.menu.startWithMember(u,p)
}else{TS.warn("hmmm, no data-member-id?")
}return
}if(x.hasClass("bot_sender")){TS.info("click on .bot_sender");
u.preventDefault();
var r=x.data("bot-identifier");
if(r){if(TS.model.user_hiddens.indexOf(r)==-1){TS.utility.msgs.hideMessagesFrom(r)
}else{TS.utility.msgs.unHideMessagesFrom(r)
}}else{TS.warn("hmmm, no data-bot-identifier?")
}return
}if(x.hasClass("internal_im_link")){TS.info("click on .internal_im_link");
u.preventDefault();
TS.ims.startImByMemberName(x.data("member-name"));
return
}if(x.hasClass("group_link")){TS.info("click on .group_link");
TS.view.onGroupReferenceClick(u,x.data("group-id"));
return
}if(x.hasClass("edit_file_comment")){TS.info("click on .edit_file_comment");
u.preventDefault();
TS.comments.ui.startEdit(x.data("file-id"),x.data("comment-id"));
return
}if(x.hasClass("delete_file_comment")){TS.info("click on .delete_file_comment");
u.preventDefault();
TS.comments.ui.startDelete(x.data("file-id"),x.data("comment-id"));
return
}var j=x.closest(".lightbox_link");
if(j.length==1){TS.info("click on .lightbox_link");
u.preventDefault();
if(j.hasClass("lightbox_channel_link")){TS.ui.lightbox_dialog.start(true,j.data("file-id"))
}else{TS.ui.lightbox_dialog.start(false,j.data("file-id"))
}return
}var g=x.closest(".lightbox_external_link");
if(g.length==1){TS.info("click on .lightbox_external_link");
u.preventDefault();
TS.ui.lightbox_dialog.start(true,g.data("src"),true,g.data("link-url"),g.data("width"),g.data("height"));
return
}if(x.hasClass("internal_file_list_filter")){TS.info("click on .internal_file_list_filter");
u.preventDefault();
TS.client.ui.showFileList();
TS.client.ui.toggleFileList(x.data("file-list-filter"));
return
}if(x.hasClass("channel_link")){TS.info("click on .channel_link");
TS.view.onChannelReferenceClick(u,x.data("channel-id"));
return
}var i=x.closest(".internal_channel_link");
if(i.length==1){TS.info("click on child of .internal_channel_link");
TS.view.onChannelReferenceClick(u,i.data("channel-id"));
return
}var k=x.closest(".internal_member_link");
if(k.length==1){TS.info("click on child of .internal_member_link");
u.preventDefault();
TS.view.onMemberReferenceClick(u,k.data("member-name"));
return
}var h=x.closest(".file_preview_link");
if(h.length==1){TS.info("click on child of .file_preview_link");
u.preventDefault();
if(TS.ui.share_dialog.showing){TS.ui.share_dialog.div.modal("hide")
}var q=h.hasClass("file_comment_link");
var a=(q)?"?comments=1":"";
if(TS.client.windows.openFileWindow(h.data("file-id"),a)){return
}TS.client.ui.previewFile(h.data("file-id"),d||"file_list",false,q);
return
}var v=x.closest(".msg_actions");
if(v.length==1){TS.info("click on child of .msg_actions");
var f=v.data("msg-ts");
if(x.hasClass("msg_cog")){u.preventDefault();
if(TS.model.archive_view_is_showing){TS.menu.startWithMessageActions(u,f,TS.client.archives.current_model_ob._archive_msgs)
}else{TS.menu.startWithMessageActions(u,f,TS.shared.getActiveModelOb().msgs)
}}return
}var m=x.closest(".comment_actions");
if(m.length==1){TS.info("click on child of .comment_actions");
if(x.hasClass("comment_cog")){u.preventDefault();
TS.menu.startWithCommentActions(u,m.data("file-id"),m.data("comment-id"))
}return
}if(x.hasClass("file_actions")){TS.info("click on .file_actions");
u.preventDefault();
TS.menu.startWithFileActions(u,x.data("file-id"));
return
}var o=x.closest(".file_actions");
if(o.length==1){TS.info("click on child of .file_actions");
u.preventDefault();
TS.menu.startWithFileActions(u,o.data("file-id"));
return
}var b=x.closest(".msg_jump, .star_jump");
if(b.length==1){TS.info("click on child of .msg_jump, .star_jump");
u.preventDefault();
var s=x.closest(".message").data("ts")+"";
var w=b.data("cid");
TS.client.ui.tryToJump(w,s);
return
}TS.stars.checkForStarClick(u);
TS.inline_imgs.checkForInlineImgClick(u);
if(TS.boot_data.feature_email_ingestion||TS.boot_data.feature_email_integration){TS.inline_emails.checkForInlineEmailClick(u)
}TS.inline_videos.checkForInlineVideoClick(u);
TS.inline_audios.checkForInlineAudioClick(u);
TS.inline_others.checkForInlineOtherClick(u);
TS.inline_attachments.checkForInlineAttachmentClick(u);
var l=x.closest(".file_list_item");
if(l.length==1){TS.info("click on .file_list_item");
if(!TS.menu.file_list_menu_up&&!x.is(".star")&&!x.closest("a").length&&!x.closest(".preview").length&&!x.closest(".snippet_preview").length){if(TS.ui.share_dialog.showing){TS.ui.share_dialog.div.modal("hide")
}TS.client.ui.previewFile(l.data("file-id"),d||"file_list",false);
u.preventDefault();
return
}}if(x.is("a")&&x.hasClass("file_share")){TS.info("click on .file_share");
u.preventDefault();
TS.view.shareFileInCurrentChannelOrIM(x.data("file-id"));
return
}if(x.is("a")&&x.attr("href")){if(TS.client.archives.maybeHandleArchiveLink(x)){u.preventDefault();
return
}if(!x.attr("target")&&x.attr("href").toLowerCase().indexOf("skype:")!==0){u.preventDefault();
TS.utility.openInNewTab(x.attr("href"),TS.templates.builders.newWindowName());
return
}}},onSearchResultsClick:function(a){TS.view.doLinkThings(a,"search_results")
},onActivityFeedClick:function(a){TS.view.doLinkThings(a,"activity_feed")
},onStarsListClick:function(a){TS.view.doLinkThings(a,"starred_items")
},onMembersMentionsClick:function(a){TS.view.doLinkThings(a)
},onFileListClick:function(a){TS.view.doLinkThings(a,"file_list")
},onFilePreviewClick:function(a){TS.view.doLinkThings(a,"file_preview")
},onMemberPreviewClick:function(a){TS.view.doLinkThings(a,"member_preview")
},onMemberListClick:function(a){TS.view.doLinkThings(a)
},onChannelOverlayClick:function(a){TS.view.doLinkThings(a)
},onChannelMemberListClick:function(c){if(TS.view.maybeFollowLink(c)){return
}c.preventDefault();
if(TS.client.ui.checkForEditing(c)){return
}var b=$(c.target);
var a=b.closest("li").data("member-id");
if(!a){return
}TS.menu.startWithMember(c,a,true)
},onMsgsDivClick:function(g){if(TS.view.maybeFollowLink(g)){return
}if(TS.client.ui.checkForEditing(g)){g.preventDefault();
return
}var c=$(g.target);
var b=c.closest(".message").data("ts");
if(b){b=b.toString()
}var a=TS.shared.getActiveModelOb();
if(b){if(c.hasClass("resend_temp_msg")||c.hasClass("remove_temp_msg")){var d=c.hasClass("resend_temp_msg");
TS.utility.msgs.handleFailedMsgSend(b,a,d);
return
}if(g.altKey){g.preventDefault();
a=TS.shared.getActiveModelOb();
var f=TS.utility.msgs.getPrevDisplayedMsg(b,a.msgs);
if(f){b=f.ts
}if(TS.model.active_channel_id){TS.channels.markReadMsg(TS.model.active_channel_id,b,TS.model.marked_reasons.back)
}else{if(TS.model.active_im_id){TS.ims.markReadMsg(TS.model.active_im_id,b,TS.model.marked_reasons.back)
}else{if(TS.model.active_group_id){TS.groups.markReadMsg(TS.model.active_group_id,b,TS.model.marked_reasons.back)
}else{return
}}}TS.model.client.reads.length=0;
TS.client.markLastReadsWithAPI();
TS.client.msg_pane.clearUnreadDivider();
TS.client.msg_pane.insertUnreadDivider();
TS.client.msg_pane.dont_check_unreads_til_switch=true;
return
}if(TS.utility.cmdKey(g)&&g.shiftKey){g.preventDefault();
var h=TS.utility.msgs.getMsg(b,a.msgs);
TS.dir(0,h);
if(a.is_im){TS.ui.growls.growlImMessage(a,h,false,true)
}else{TS.ui.growls.growlchannelOrGroupMessage(a,h,false,true)
}}}TS.view.doLinkThings(g)
},markAllUnread:function(){TS.model.last_reads_set_by_client={};
function c(d){var e=TS.utility.msgs.getDisplayedMsgs(d.msgs);
if(!e.length){return
}var f=e[e.length-1];
if(!f){return
}if(d.is_channel){TS.channels.markReadMsg(d.id,f.ts)
}else{if(d.is_im){TS.ims.markReadMsg(d.id,f.ts)
}else{if(d.is_group){TS.groups.markReadMsg(d.id,f.ts)
}else{TS.warn("markIt "+d.name+"????");
return
}}}TS.info("markIt "+d.name+" "+f.ts)
}var b;
var a;
for(b in TS.model.channels){a=TS.model.channels[b];
if(a.is_archived){continue
}if(!a.is_member){continue
}c(a)
}for(b in TS.model.ims){a=TS.model.ims[b];
if(!a.is_open){continue
}c(a)
}for(b in TS.model.groups){a=TS.model.groups[b];
if(a.is_archived){continue
}if(!a.is_open){continue
}c(a)
}TS.model.client.reads.length=0;
TS.client.markLastReadsWithAPI();
TS.client.msg_pane.clearUnreadDivider();
TS.client.msg_pane.insertUnreadDivider();
TS.client.msg_pane.dont_check_unreads_til_switch=true
},onHelpClick:function(a){TS.view.doLinkThings(a)
},onGroupReferenceClick:function(b,c){var a=TS.groups.getGroupById(c);
if(!a){return
}if(a.is_archived&&!a.was_archived_this_session){}else{b.preventDefault();
TS.groups.displayGroup(a.id)
}},onChannelReferenceClick:function(b,c){var a=TS.channels.getChannelById(c);
if(!a){return
}if(a.is_archived&&!a.was_archived_this_session){if(TS.model.prefs.temp_archive_viewer){b.preventDefault();
TS.channels.displayChannel(a.id)
}else{}}else{b.preventDefault();
TS.channels.displayChannel(a.id)
}},onMemberReferenceClick:function(c,b){var a=TS.members.getMemberByName(b);
if(!a){return
}TS.menu.startWithMember(c,a.id)
},cacheMsgsHtml:function(){return
},adjustForWelcomeSlideShow:function(){if(TS.model.cancelled_welcome_2_this_session){return
}TS.model.showing_welcome_2=true;
$(".messages_banner").css("visibility","hidden");
TS.view.makeMsgsDivUnscrollable()
},msgs_unscrollable:false,makeMsgsDivUnscrollable:function(){TS.view.msgs_unscrollable=true;
TS.client.ui.$msgs_scroller_div.css("overflow-y","hidden").css("height","100%");
$("#monkey_scroll_wrapper_for_msgs_scroller_div").find(".monkey_scroll_bar").css("visibility","hidden");
TS.client.ui.$msgs_scroller_div.scrollTop(0);
TS.client.ui.$msgs_div.css("visibility","hidden");
$("#footer").css("visibility","hidden")
},unAdjustForWelcomeSlideShow:function(a){if(!TS.model.showing_welcome_2){TS.client.ui.$msgs_scroller_div.data("monkeyScroll").updateFunc();
return
}TS.model.showing_welcome_2=false;
$(".messages_banner").css("visibility","");
if(TS.model.seen_welcome_2_this_session&&TS.shared.getActiveModelOb().id==TS.model.welcome_model_ob.id){$("#messages_unread_status").css("visibility","hidden")
}else{$("#messages_unread_status").css("visibility","")
}if(TS.view.makeMsgsDivScrollable()){TS.view.resizeManually("ran TS.view.makeMsgsDivScrollable()",true);
if(a){TS.client.ui.$msgs_scroller_div.scrollTop(0)
}}else{TS.view.resizeManually("NOT ran TS.view.makeMsgsDivScrollable()",true)
}},makeMsgsDivScrollable:function(){if(!TS.view.msgs_unscrollable){return false
}TS.view.msgs_unscrollable=false;
TS.client.ui.$msgs_scroller_div.css("overflow-y","auto").css("height","");
$("#monkey_scroll_wrapper_for_msgs_scroller_div").find(".monkey_scroll_bar").css("visibility","");
TS.client.ui.$msgs_scroller_div.data("monkeyScroll").updateFunc();
TS.client.ui.$msgs_div.css("visibility","visible");
$("#footer").css("visibility","visible");
return true
},submit:function(a){if(!TS.model.ms_connected&&TS.client.ui.$msg_input.val()!="/wake"){return false
}TS.client.ui.onSubmit(TS.client.ui.$msg_input.val(),a);
return true
},focusMessageInput:function(){var a=TS.ims.getImById(TS.model.active_im_id);
if(a&&TS.members.getMemberById(a.user).deleted){TS.client.ui.$msg_input.attr("placeholder","account deactivated");
TS.client.ui.$msg_input.prop("disabled",true);
return
}TS.client.ui.$msg_input.removeAttr("placeholder");
TS.client.ui.$msg_input.prop("disabled",false);
if(TS.model.is_iOS){return
}TS.client.ui.$msg_input.focus();
TS.client.ui.$msg_input.setCursorPosition(TS.client.ui.$msg_input.val().length)
},clearMessageInput:function(){TS.client.ui.populateChatInput("")
},toggleSpellcheck:function(){$("textarea").attr("autocorrect","off");
$("textarea").attr("autocomplete","off");
if(TS.model.prefs.webapp_spellcheck){$("textarea").attr("spellcheck",true)
}else{$("textarea").attr("spellcheck",false)
}},sidebarThemePrefChanged:function(b){b=(b!==false);
if(TS.model.prefs.sidebar_theme){if(TS.prefs.last_theme_selected_in_UI&&TS.model.prefs.sidebar_theme!==TS.prefs.last_theme_selected_in_UI){return
}else{if(TS.prefs.last_theme_selected_in_UI&&b){TS.prefs.last_theme_selected_in_UI=null;
TS.model.prefs.sidebar_theme_custom_values=TS.sidebar_themes.default_themes[TS.model.prefs.sidebar_theme]
}}if(TS.model.prefs.sidebar_theme=="arctic_theme"){TS.model.prefs.sidebar_theme="hoth_theme"
}var a=$("#client-ui");
var f="sidebar_theme_";
var e=a[0];
var d=e.className.split(" ").filter(function(g){return g.lastIndexOf(f,0)!==0
});
e.className=d.join(" ");
a.addClass(f+TS.model.prefs.sidebar_theme)
}if(TS.model.prefs.sidebar_theme=="default"||TS.model.prefs.sidebar_theme=="default_theme"||TS.model.prefs.sidebar_theme=="basic_theme"){$("#sidebar_theme_css").remove()
}else{if(TS.model.prefs.sidebar_theme_custom_values){var c=TS.templates.sidebar_theme_css({theme:JSON.parse(TS.model.prefs.sidebar_theme_custom_values)});
if($("#sidebar_theme_css").length){$("#sidebar_theme_css").replaceWith(c)
}else{$("head").append(c)
}}}TS.view.updateTitleBarColor();
TSSSB.call("refreshTileColors")
},updateTitleBarColor:function(){if(TS.model.is_our_app){TSSSB.call("updateTitleBarColor",TS.utility.rgb2hex($("#team_menu").css("background-color")))
}},time24PrefChanged:function(){TS.client.msg_pane.rebuildMsgs();
TS.search.view.renderResults();
TS.view.rebuildMentions();
TS.view.rebuildStars();
TS.view.throttledRebuildFileList();
TS.client.channel_pane.rebuildImList();
TS.client.channel_pane.rebuildStarredList();
if(TS.model.previewed_file_id){TS.client.ui.rebuildFilePreview(TS.files.getFileById(TS.model.previewed_file_id))
}if(TS.model.team.activity){TS.activity.team_activity_fetched_sig.dispatch(TS.model.team.activity)
}},teamPermsPrefChanged:function(a){if(a=="who_can_at_channel"||a=="who_can_at_everyone"||a=="who_can_post_general"){TS.utility.msgs.reCalcAndCountAllUnreads()
}TS.client.channel_pane.rebuildChannelList();
TS.client.channel_pane.rebuildGroupList();
TS.client.channel_pane.rebuildStarredList();
TS.view.checkIfInputShouldBeDisabledAndPopulate()
},farReachingDisplayPrefChanged:function(){TS.client.msg_pane.rebuildMsgs();
TS.search.view.renderResults();
TS.view.rebuildMentions();
TS.view.rebuildStars();
TS.view.throttledRebuildFileList();
TS.client.channel_pane.rebuildImList();
TS.client.channel_pane.rebuildStarredList();
TS.client.msg_pane.displayTitle();
TS.client.msg_pane.rebuildChannelMembersList();
if((TS.model.team.prefs.display_real_names&&TS.model.prefs.display_real_names_override!=-1)||TS.model.prefs.display_real_names_override==1){$("#col_channels").addClass("real_names")
}else{$("#col_channels").removeClass("real_names")
}if(TS.model.previewed_file_id){TS.client.ui.rebuildFilePreview(TS.files.getFileById(TS.model.previewed_file_id))
}if(TS.model.team.activity){TS.activity.team_activity_fetched_sig.dispatch(TS.model.team.activity)
}},dTopNotificationChanged:function(){TS.utility.msgs.reCalcAndCountAllUnreads();
TS.client.channel_pane.rebuildStarredList();
TS.client.channel_pane.rebuildChannelList();
TS.client.channel_pane.rebuildGroupList()
},sidebarBehaviorPrefChanged:function(){TS.utility.msgs.reCalcAndCountAllUnreads()
},mutedChannelsChanged:function(){TS.utility.msgs.reCalcAndCountAllUnreads();
TS.client.channel_pane.rebuildStarredList();
TS.client.channel_pane.rebuildChannelList();
TS.client.channel_pane.rebuildGroupList();
TS.client.msg_pane.displayTitle()
},displayMsgInModelOb:function(b,c){if(b.is_channel){TS.channels.displayChannel(b.id)
}else{if(b.is_group){TS.groups.displayGroup(b.id)
}else{TS.ims.startImById(b.id)
}}if(b.id!=TS.model.active_cid){return
}var a=TS.utility.msgs.getMsg(c,b.msgs);
if(a&&!TS.model.archive_view_is_showing){TS.client.ui.scrollMsgsSoMsgIsInView(c,false,true)
}else{if(TS.model.prefs.temp_archive_viewer){TS.client.archives.start(c)
}}},flexpaneDisplaySwitched:function(b){var a=TS.model.ui_state.flex_name;
if(!a||(b==="team"&&a!=="team")){TS.view.cleanTeamList();
return
}if(b!=="team"&&a==="team"){TS.view.rebuildTeamList();
return
}}})
})();
(function(){TS.registerModule("client.windows",{onStart:function(){TS.client.login_sig.add(TS.client.windows.onLogin);
TS.files.team_file_deleted_sig.add(e);
TS.ui.window_unloaded_sig.add(d)
},onLogin:function(h,j){var f=TSSSB.call("listWindows");
if(f){var i=JSON.parse(f);
var l;
for(var g in i){l=c[g]=i[g];
l.token=g;
if(!l.file_id&&l.url){l.file_id=TS.utility.getFileIDFromURL(l.url)
}var k=TSSSB.call("getDomForWindowWithToken",l.token);
a(l,k)
}}},openFileWindow:function(h,f){if(!TS.boot_data.feature_spaces_in_windows){return false
}if(!TS.model.mac_ssb_version){return false
}if(!macgap.window){return false
}if(!macgap.window.list){return false
}var g=TS.files.getFileById(h);
if(!g){return false
}if(g.mode!="space"){return false
}var i=TS.client.windows.getWinByProp("file_id",h);
if(i){if(!TSSSB.call("focusWindow",i.token)){TS.generic_dialog.alert("window already open; but you need to get a new build of the app. ask in #triage-mac-ssb ")
}return true
}f=(f?"?"+f.substr(1):"?")+TS.appendQSArgsToUrl();
i={file_id:h,url:g.permalink+f,title:g.title};
return TS.client.windows.openWindow(i)
},openWindow:function(f){f.token=TSSSB.call("openWindow",f);
c[f.token]=f;
console.warn(f.token);
return true
},closeFileWindow:function(f){var g=TS.client.windows.getWinByProp("file_id",f);
if(!g){return
}TSSSB.call("closeWindow",{window_token:g.token})
},getWinByToken:function(f){return c[f]
},getWinByProp:function(g,h){if(!h&&h!==0){return null
}if(!g){return null
}var i;
for(var f in c){i=c[f];
if(i[g]==h){return i
}}return null
},windowWithTokenBecameKey:function(f){},windowWithTokenWillClose:function(f){var g=TS.client.windows.getWinByToken(f);
if(!g){TS.error("windowWithTokenWillClose: no win for token:"+f);
return
}delete c[f]
},windowWithTokenBeganLoading:function(f){},windowWithTokenEstimatedProgressChanged:function(g,f){},windowWithTokenFinishedLoading:function(f,h){var g=TS.client.windows.getWinByToken(f);
if(!g){TS.error("windowWithTokenFinishedLoading: no win for token:"+f);
return
}if(g.document){TS.warn("windowWithTokenFinishedLoading: win already has document? token:"+f)
}a(g,h)
}});
var c={};
var e=function(f){if(!f){return
}var h=TS.client.windows.getWinByProp("file_id",f.id);
if(!h){return
}try{h.document.defaultView.TS.files.team_file_deleted_sig.dispatch(TS.files.getFileById("F02UDDEN9"))
}catch(g){}};
var a=function(g,f){if(!f){alert("nope");
return
}g.document=f;
g.window=f.defaultView;
f.ssb_main=f.ssb_main||{};
f.ssb_main.TS=TS;
g.window.addEventListener("unload",b)
};
var b=function(g){var f=TS.client.windows.getWinByProp("window",g.currentTarget);
if(f){f.window=null;
f.document=null
}};
var d=function(){var g;
for(var f in c){g=c[f];
if(!g.window){continue
}delete g.document.ssb_main.TS;
g.window.removeEventListener("unload",b)
}}
})();
(function(){TS.registerModule("client.ui",{$msgs_scroller_div:$("#msgs_scroller_div"),$msgs_div:$("#msgs_div"),$msg_input:$("#message-input"),$msg_preview_msg:$("#msg_preview_msg"),$msg_preview:$("#msg_preview"),$banner:$("#banner"),$msgs_unread_divider:null,file_dropped_sig:new signals.Signal(),file_pasted_sig:new signals.Signal(),onStart:function(){TS.channels.data_updated_sig.add(f);
TS.ui.window_focus_changed_sig.add(TS.client.ui.windowFocusChanged);
TS.channels.switched_sig.add(TS.client.ui.channelOrImOrGroupDisplaySwitched);
TS.ims.switched_sig.add(TS.client.ui.channelOrImOrGroupDisplaySwitched);
TS.groups.switched_sig.add(TS.client.ui.channelOrImOrGroupDisplaySwitched);
TS.prefs.color_names_in_list_changed_sig.add(TS.client.ui.prefColorNamesInListChanged);
TS.prefs.collapsible_changed_sig.add(TS.client.ui.prefCollapsibleChanged);
TS.prefs.msg_preview_changed_sig.add(TS.client.ui.prefMsgPreviewChanged);
TS.files.team_file_comment_added_sig.add(TS.client.ui.teamFileCommentAdded);
TS.files.team_file_comment_edited_sig.add(TS.client.ui.teamFileCommentEdited);
TS.files.team_file_comment_deleted_sig.add(TS.client.ui.teamFileCommentDeleted);
TS.files.team_file_changed_sig.add(TS.client.ui.teamFileChanged);
TS.files.team_file_deleted_sig.add(TS.client.ui.teamFileDeleted);
TS.activity.individual_activity_fetched_sig.add(TS.client.ui.individualActivityFetched);
if(TS.boot_data.feature_flexpane_rework){TS.client.flexpane_display_switched_sig.add(c)
}TS.client.ui.$msgs_scroller_div.bind("mousedown mouseup",function(j){TS.client.msg_pane.checkUnreads()
});
var i=null;
$("html").bind("mousedown",function(j){TS.model.ui.is_mouse_down=true;
TS.client.ui.maybeTickleMS();
i=$(j.target)
});
$("html").bind("dragend",function(j){TS.model.ui.is_mouse_down=false
});
$("html").bind("mouseup",function(j){TS.model.ui.is_mouse_down=false;
setTimeout(function(){if(i&&i.closest(".monkey_scroll_handle").length){if(TS.model.archive_view_is_showing){TS.client.archives.maybeLoadScrollBackHistory()
}else{if(!TS.model.showing_welcome_2){TS.client.ui.maybeLoadScrollBackHistory()
}}}},10)
});
TS.client.ui.$msgs_scroller_div.scroll(TS.client.ui.onMsgsScroll);
$("#channels_scroller").scroll(TS.client.ui.onChannelsScroll);
TS.client.ui.enhanceComponents();
TS.client.ui.bindMessageInput();
TS.client.ui.bindCommentInput();
TS.client.ui.bindUploadUI();
TS.client.ui.bindFlexUI();
TS.client.ui.bindFileUI();
TS.client.ui.bindChannelGroupImStarredLists();
TS.client.login_sig.add(TS.client.ui.loggedIn,TS.ui);
$(window.document).keydown(TS.client.ui.onWindowKeyDown);
$(window.document).keyup(TS.client.ui.onWindowKeyUp);
$("#user_menu").bind("click",function(j){if($(j.target).attr("id")=="user_menu_tip_card_throbber"){return
}if(TS.tips.maybeDoThrobberProxyClick("user_menu_tip_card_throbber",j)){return false
}TS.menu.startWithUser(j)
});
$("#team_menu").bind("click",function(j){if(TS.tips.maybeDoThrobberProxyClick("team_menu_tip_card_throbber",j)){return false
}TS.menu.startWithTeam(j)
});
$("#file_comment_form #file_comment").bind("textchange",function(j,k){TS.client.ui.storeLastCommentInputForPreviewedFile($(this).val());
$("#file_preview_scroller").data("monkeyScroll").updateFunc()
});
$("#file_comment").css("overflow","hidden").autogrow();
$("#file_comment_form").bind("submit",function(j){TS.client.ui.submitFileComment();
return false
});
$(window).on("click",b);
if(!TS.qs_args.ignore_mm){$(window).on("mousemove",b)
}var h="ontouchstart" in document.documentElement;
if(h){$("html").addClass("touch")
}else{$("html").addClass("no_touch")
}},loggedIn:function(){TS.client.ui.setFlexStateFromHistory(TS.model.ui_state.flex_name,TS.model.ui_state.flex_extra,true);
if(TS.model.ui_state.flex_name){TS.client.flexDisplaySwitched(TS.model.ui_state.flex_name,TS.model.ui_state.flex_extra,true);
TS.client.ui.showFlex()
}$(".emo_menu").removeClass("hidden").bind("click.open_dialog",TS.emoji_menu.startEmo).html(TS.utility.emojiGraphicReplace($(".emo_menu").html()));
if(window.extraCmds){window.extraCmds()
}},rebuildAllButMsgs:function(){TS.client.channel_pane.rebuildChannelList();
TS.client.msg_pane.rebuildChannelMembersList();
TS.client.channel_pane.rebuildImList();
TS.client.channel_pane.rebuildGroupList();
TS.client.channel_pane.rebuildStarredList();
TS.client.msg_pane.displayTitle();
TS.client.channel_pane.makeSureActiveChannelIsInView()
},rebuildAll:function(){TS.client.channel_pane.rebuildChannelList();
TS.client.msg_pane.rebuildChannelMembersList();
TS.client.msg_pane.rebuildMsgs();
TS.client.channel_pane.rebuildImList();
TS.client.channel_pane.rebuildGroupList();
TS.client.channel_pane.rebuildStarredList();
TS.client.msg_pane.displayTitle();
TS.client.channel_pane.makeSureActiveChannelIsInView()
},windowFocusChanged:function(h){if(h){$("body").removeClass("blurred");
TS.client.ui.startUnreadCheckingTimer();
TS.client.ui.maybeTickleMS();
if(TS.view){TS.view.updateTitleBarColor()
}TS.model.ui.is_mouse_down=false
}else{$("body").addClass("blurred");
clearTimeout(TS.client.ui.unread_checking_tim)
}},cal_key_checker:{tim:null,tim_ms:200,prevent_enter:false,space_pressed_last:false,reset:function(){clearTimeout(TS.client.ui.cal_key_checker.tim);
TS.client.ui.cal_key_checker.space_pressed_last=false;
TS.client.ui.cal_key_checker.prevent_enter=false
},check:function(h){if(TS.client.ui.cal_key_checker.space_pressed_last&&h!=32){TS.client.ui.cal_key_checker.reset();
if(h==73){TS.client.ui.cal_key_checker.prevent_enter=true;
TS.client.ui.cal_key_checker.tim=setTimeout(TS.client.ui.cal_key_checker.reset,TS.client.ui.cal_key_checker.tim_ms)
}}else{if(h==32){TS.client.ui.cal_key_checker.reset();
TS.client.ui.cal_key_checker.space_pressed_last=true;
TS.client.ui.cal_key_checker.tim=setTimeout(TS.client.ui.cal_key_checker.reset,TS.client.ui.cal_key_checker.tim_ms)
}else{TS.client.ui.cal_key_checker.reset()
}}}},keyPressIsValidForFocusOnNextOrPreviousMessage:function(k){if(!k){return false
}var j=TS.utility.keymap;
var i=([j.left_square_bracket,j.right_square_bracket,j.minus_sign,j.equals_sign].indexOf(k.which)!==-1);
var h=(k.altKey&&TS.utility.cmdKey(k));
return(i&&h&&TS.client.ui.isUserAttentionOnChat())
},keyPressIsValidForGotoNextOpenChannelOrIM:function(i){var h=TS.utility.keymap;
if(TS.client.ui.isUserAttentionOnChat()&&i&&i.altKey){if(i.shiftKey||!TS.utility.isFocusOnInput()||!TS.client.ui.$msg_input.val().length){if(i.which==h.up||i.which==h.down){return true
}}}return false
},page_scroll_dest:null,onWindowKeyDown:function(q){var j=TS.utility.date.getTimeStamp();
var p=TS.utility.keymap;
TS.client.ui.cal_key_checker.check(q.which);
var t=TS.key_triggers[q.which.toString()];
if(TS.client.ui.isUserAttentionOnChat()&&t&&(!t.isDisabled||!t.isDisabled(q))&&((q.metaKey&&(!q.ctrlKey||!TS.model.is_mac))||(q.ctrlKey&&!q.altKey&&!TS.model.is_mac))&&((!t.no_shift&&(q.shiftKey||t.shift_optional))||(t.no_shift&&!q.shiftKey))){q.preventDefault();
q.stopPropagation();
t.func(q)
}else{if(TS.boot_data.feature_a11y_keyboard_shortcuts&&TS.client.ui.keyPressIsValidForFocusOnNextOrPreviousMessage(q)){switch(q.which){case p.left_square_bracket:TS.ui.a11y.focusOnPreviousMessage();
break;
case p.right_square_bracket:TS.ui.a11y.focusOnNextMessage();
break;
case p.minus_sign:TS.ui.a11y.focusOnOldestUnreadMessage();
break;
case p.equals_sign:TS.ui.a11y.focusOnMessageInput()
}}else{if(TS.client.ui.isUserAttentionOnChat()&&!TS.utility.isFocusOnInput()&&TS.utility.cmdKey(q)&&q.which==p.up){TS.client.ui.maybeEditLast(q)
}else{if((TS.model.win_ssb_version&&!TS.model.is_win)&&q.metaKey&&!q.shiftKey&&TS.client.ui.isUserAttentionOnChat()&&(q.which==219||q.which==221)){if(document.activeElement&&document.activeElement.nodeName.match(/textarea|input/i)){if(document.activeElement.value===""){window.history.go(q.which===219?-1:1)
}}}else{if((TS.model.win_ssb_version&&TS.model.is_win)&&q.altKey&&!q.shiftKey&&TS.client.ui.isUserAttentionOnChat()&&(q.which==37||q.which==39)){if(document.activeElement&&document.activeElement.nodeName.match(/textarea|input/i)){if(document.activeElement.value===""){window.history.go(q.which===37?-1:1)
}}}else{if((!TS.model.mac_ssb_version||TS.model.mac_ssb_version>=0.52)&&q.metaKey&&!q.shiftKey&&!q.altKey&&TS.client.ui.isUserAttentionOnChat()&&(q.which==37||q.which==39)){if(document.activeElement&&document.activeElement.nodeName.match(/textarea|input/i)){if(document.activeElement.value===""){window.history.go(q.which===37?-1:1)
}}if(q.altKey){q.preventDefault();
q.stopPropagation()
}}else{if(TS.model.mac_ssb_version&&TS.model.mac_ssb_version<=0.64&&TS.client.ui.isUserAttentionOnChat()&&q.metaKey&&q.shiftKey&&(q.which==p.left_square_bracket||q.which==p.right_square_bracket)){if(q.which==p.left_square_bracket){TS.client.ui.gotoNextOpenChannelOrIM(q.altKey,true)
}else{if(q.which==p.right_square_bracket){TS.client.ui.gotoNextOpenChannelOrIM(q.altKey,false)
}}q.preventDefault()
}else{if(TS.client.ui.keyPressIsValidForGotoNextOpenChannelOrIM(q)){if(q.which==p.up){TS.client.ui.gotoNextOpenChannelOrIM(q.shiftKey,true)
}else{if(q.which==p.down){TS.client.ui.gotoNextOpenChannelOrIM(q.shiftKey,false)
}}}else{if((TS.client.ui.isUserAttentionOnChat()||TS.ui.shortcuts_dialog.showing)&&(q.which==191)&&!q.altKey&&!q.shiftKey&&TS.utility.cmdKey(q)){if(TS.ui.shortcuts_dialog.showing){TS.ui.shortcuts_dialog.cancel()
}else{TS.ui.shortcuts_dialog.start()
}q.preventDefault()
}else{if(TS.client.ui.isUserAttentionOnChat()&&(q.which==190)&&!q.altKey&&TS.utility.cmdKey(q)){TS.client.ui.toggleFlex();
q.preventDefault()
}else{if(q.which==p.shift||q.which==p.space){if(TS.model.prefs&&TS.model.prefs.pagekeys_handled){if(TS.utility.isFocusOnInput()){if(q.which==p.space&&q.shiftKey&&!TS.client.ui.$msg_input.val()&&document.activeElement==TS.client.ui.$msg_input[0]){TS.client.ui.$msg_input.blur();
q.preventDefault()
}}else{if(TS.model.is_FF){TS.client.ui.$msgs_scroller_div.focus()
}}}}else{if(q.which==p.esc){TS.client.ui.onEscKey(q)
}else{if(TS.utility.isPageKey(q.which)&&TS.model.prefs&&TS.model.prefs.pagekeys_handled&&!q.shiftKey&&!q.ctrlKey&&!q.altKey&&!q.metaKey){var v=TS.utility.getActiveElementProp("id")=="message-input";
var l=!v&&TS.utility.isFocusOnInput();
var u=TS.model.archive_view_is_showing;
var k=(u)?TS.client.archives.$scroller:TS.client.ui.$msgs_scroller_div;
var w=k[0].scrollTop;
var o=k[0].scrollHeight;
var m=k.height();
j=w;
if(TS.client.ui.page_scroll_dest!==null){j=TS.client.ui.page_scroll_dest
}var i=true;
var s=$(document.activeElement);
var r=false;
if(q.which==p.pageup){if(l){i=false
}else{if(r&&v&&s.val()){i=false
}else{TS.client.ui.page_scroll_dest=j-m
}}}else{if(q.which==p.pagedown){if(l){i=false
}else{if(r&&v&&s.val()){i=false
}else{TS.client.ui.page_scroll_dest=j+m
}}}else{if(q.which==p.home){if(l||(v&&s.val())){if(TS.model.is_mac){if(q.shiftKey){}else{s.setCursorPosition(0);
q.preventDefault()
}}i=false
}else{TS.client.ui.page_scroll_dest=0
}}else{if(q.which==p.end){if(l||(v&&s.val())){if(TS.model.is_mac){if(q.shiftKey){}else{s.setCursorPosition(1000000);
q.preventDefault()
}}i=false
}else{TS.client.ui.page_scroll_dest=o
}}}}}if(i){TS.client.ui.slowScrollMsgsToPosition(TS.client.ui.page_scroll_dest,true,function(){TS.client.ui.page_scroll_dest=null
});
q.preventDefault()
}}else{if(!TS.utility.isFocusOnInput()&&TS.client.ui.isUserAttentionOnChat()&&!TS.utility.isArrowKey(q.which)&&!TS.utility.isPageKey(q.which)&&!q.metaKey&&!q.ctrlKey&&!q.altKey){TS.view.focusMessageInput();
if(q.which==p.tab&&!TS.utility.cmdKey(q)){q.preventDefault()
}if(q.which==p.enter){q.preventDefault();
if(TS.model.archive_view_is_showing){TS.client.archives.tryToJoin()
}}}else{if(TS.model.archive_view_is_showing&&q.which==p.enter&&!q.metaKey&&!q.ctrlKey&&!q.altKey){}}}}}}}}}}}}}}}if(TS.model.profiling_keys){TS.model.addProfilingKeyTime("onWindowKeyDown",TS.utility.date.getTimeStamp()-j)
}if(q.which==p.shift||q.shiftKey){TS.model.shift_key_pressed=true
}if(q.which==p.insert){TS.model.insert_key_pressed=true
}if(q.which==p.alt||q.altKey){TS.model.alt_key_pressed=true
}if(q.shiftKey&&q.metaKey&&q.which!=p.V){TS.model.shift_key_pressed=false
}},onWindowKeyUp:function(i){var h=TS.utility.keymap;
if(i.which==h.shift){TS.model.shift_key_pressed=false
}if(i.which==h.insert){TS.model.insert_key_pressed=false
}if(i.which==h.alt){TS.model.alt_key_pressed=false
}},onEscKey:function(p){try{p.stopPropagation()
}catch(m){}try{p.preventDefault()
}catch(m){}if(!TS.client.ui.isUserAttentionOnChat()){return
}if(TS.model.archive_view_is_showing){TS.client.archives.cancel();
return
}if(TS.msg_edit.editing){return
}if(TS.emoji_menu.is_showing){return
}var k=p.shiftKey;
var o=k?TS.model.marked_reasons.esc_all:TS.model.marked_reasons.esc;
TS.client.ui.forceMarkAllRead(o,k);
if(k){var j=TS.model.channels;
var h=TS.model.groups;
var l;
for(l=j.length-1;
l>-1;
l--){j[l]._show_in_list_even_though_no_unreads=false;
TS.channels.markMostRecentReadMsg(j[l],TS.model.marked_reasons.muted);
TS.channels.unread_changed_sig.dispatch(j[l])
}for(l=h.length-1;
l>-1;
l--){h[l]._show_in_list_even_though_no_unreads=false;
TS.groups.markMostRecentReadMsg(h[l],TS.model.marked_reasons.muted);
TS.groups.unread_changed_sig.dispatch(h[l])
}}},checkForEditing:function(h){if(!TS.msg_edit.editing){return false
}if(!h||!h.target||$(h.target).closest("#message_edit_form").length===0){if(TS.msg_edit.cancelEditingINothingHasChanged()){return false
}TS.sounds.play("beep");
TS.msg_edit.promptEdit()
}return true
},maybeTickleMS:function(){if(!TS.model.user){return
}if(TS.model.user.manual_presence=="away"){return
}var i=TS.utility.date.getTimeStamp()-TS.model.last_net_send;
var h=1000*40;
if(i<h&&TS.model.user.presence=="active"){return
}TS.client.ui.tickleMS()
},tickleMS:function(){TS.api.call("users.setActive")
},validateFiles:function(q,i,m){if(!q){return
}i=!!i;
var l=[];
var v=0;
var A=0;
var h=false;
var j=false;
var y={};
var t=[];
function s(C){A=Math.max(0,A+C)
}function B(){l=[];
A=0;
v=0;
h=false;
j=false
}if(!TS.client.ui.resetFiles){TS.client.ui.resetFiles=B
}function r(){if(!h){if(l.length){h=true;
TS.client.ui.file_dropped_sig.dispatch(l,i)
}}}function x(){if(j){return false
}if(v>0&&(l.length>=A||A<=0)){j=true;
if(t.length){o(q,function(){if(m){m(l,r)
}else{r()
}})
}else{if(m){m(l,r)
}else{r()
}}}}function u(C){l.push(C)
}function p(C){C.onload=C.onerror=null;
return null
}function k(E,G){var D,C;
C={isFile:null,isDirectory:null};
if(E.size<16384&&window.FileReader){D=new FileReader();
D.onload=function(H){D=p(H.currentTarget);
C.isFile=true;
G(C)
};
D.onerror=function(H){D=p(H.currentTarget);
C.isDirectory=true;
G(C)
};
try{D.readAsDataURL(E)
}catch(F){D=p(D);
C.isDirectory=true;
G(C)
}}else{G(C)
}}function w(D,E,J){var F,C,G,I,H;
C=false;
H=D.name||E.name;
if(!H){return false
}G=H.lastIndexOf(".");
if(G!==-1){I=H.substr(G)
}if(I){F=y[I]&&y[I].enabled?y[I]:null
}if(E&&(E.isFile||E.isDirectory)){if(E.isDirectory||(E.isFile&&F&&F.applyToFile)){C=true;
return J(C)
}else{C=false;
return J(C)
}}else{k(D,function(K){if(K.isDirectory){C=true
}else{if(F&&F.applyToFile){C=true
}}return J(C)
})
}}function o(E,F){var I,G,H,J,C,D,K;
if(t.length){H=[];
C="";
K="";
for(I=0,G=t.length;
I<G;
I++){H.push("<li><b>"+TS.utility.htmlEntities(t[I].name)+"</b></li>")
}if(t.length>1){C="<ul>"+H.join("\n")+"</ul>"
}J=v-t.length;
D="<p>"+(t.length===1?"Try uploading a .zip version of this file instead.":"Try uploading .zip versions of these files instead.")+"</p>";
if(J){K="<p>(Don't worry, your other "+(J>1?"files are next.":"file is next.")+")</p>"
}TS.generic_dialog.start({title:(t.length>1?(t.length===v?"All files unsupported":"Some files unsupported"):"File unsupported"),body:"<p>Sorry, "+(t.length===1?"<b>"+TS.utility.htmlEntities(t[0].name)+"</b> is a type of file not ":(t.length===v?" none of those file types are":" some of those file types are not"))+" supported by Slack.</p>"+C+D+K,show_cancel_button:false,esc_for_ok:true,on_go:function(){TS.generic_dialog.end();
if(F){F()
}}})
}return t.length
}function z(H){v=H.length;
s(H.length);
var F,G,C,D;
for(var E=0;
E<H.length;
E++){F=H[E];
C=F;
D=F;
if(F.isFile||F.isDirectory){G=F;
D=F
}if(F.getAsEntry){G=F.getAsEntry();
D=G
}else{if(F.webkitGetAsEntry){G=F.webkitGetAsEntry();
D=G
}}if(typeof F.getAsFile==="function"){C=F.getAsFile()
}else{if(File&&F instanceof File){C=F
}}if(!D||!C){s(-1)
}(function(J,I){w(J,I,function(K){if(K){if(I.name){t.push(I)
}else{t.push(J)
}s(-1);
x()
}else{if(J.size===0){s(-1)
}else{u(J)
}x()
}})
}(C,D))
}}z(q);
x()
},bindUploadUI:function(){$(".file_upload_btn").bind("click.file_menu",function(h){TS.menu.startWithNewFileOptions(h,$(this));
return false
});
$("#primary_file_button").bind("click.show_tip",function(h){if(TS.tips.maybeDoThrobberProxyClick("message_input_tip_card_throbber",h)){return false
}return false
});
$("#file-upload").bind("change",function(){if(!$(this).val()){return
}var h=$(this)[0].files;
if(h){if(!h.length){return
}TS.view.filesSelected(h);
$("#file-upload").val("")
}});
$("body").bind("drop",function(i){window.focus();
i.preventDefault();
$("body").removeClass("drop-target");
if(TS.client.ui.checkForEditing(i)){return
}var h;
var k=(i&&i.shiftKey);
if(TS.model.archive_view_is_showing&&TS.client.archives.current_model_ob.is_archived){k=false
}var j=i.originalEvent.dataTransfer;
if(j){h=j.files||j.items
}if(!h){return
}TS.client.ui.validateFiles(h,k)
});
$("#drop-zone").unbind("click.dismiss").bind("click.dismiss",function(){$("body").removeClass("drop-target")
});
$(window).draghover().on({draghoverstart:function(m,l,h){if(window.winssb){TS.info("draghoverstart winssb_file:"+h)
}if($("body").hasClass("file_snippet")){return
}if(TS.msg_edit.editing){return false
}if(TS.model.ui.is_mouse_down){return
}var o=false;
if(l&&l.originalEvent&&l.originalEvent.dataTransfer&&l.originalEvent.dataTransfer.types){var k=l.originalEvent.dataTransfer.types;
for(var j=0;
j<k.length;
j++){if(k[j].toLowerCase()=="files"){o=true;
break
}}}if(!o){o=!!h
}if(!o){return
}$("body").addClass("drop-target");
TS.info("draghoverstart added drop-target")
},draghoverend:function(){$("body").removeClass("drop-target");
TS.info("draghoverend removed drop-target")
}})
},forceMarkAllRead:function(o,l){TS.client.msg_pane.dont_check_unreads_til_switch=false;
TS.client.ui.markMostRecentReadMsgInActive(o,true);
if(l){var j=TS.model.channels;
var k=TS.model.ims;
var h=TS.model.groups;
var m;
for(m=j.length-1;
m>-1;
m--){TS.channels.markMostRecentReadMsg(j[m],o)
}for(m=k.length-1;
m>-1;
m--){TS.ims.markMostRecentReadMsg(k[m],o)
}for(m=h.length-1;
m>-1;
m--){TS.groups.markMostRecentReadMsg(h[m],o)
}}TS.client.markLastReadsWithAPI()
},maybePromptForSetActive:function(){var h=TS.model.user;
if(h.manual_presence!="away"){return
}setTimeout(function(){if(h.manual_presence!="away"){return
}TS.generic_dialog.start({unique:"set_active_prompt",title:'You are marked as "away"',body:"Would you like to switch to appear active?",show_cancel_button:true,show_go_button:true,go_button_text:"Yes, set me to active",go_button_class:"btn_success",cancel_button_text:"No, still away",on_go:function(){if(h.manual_presence=="away"){TS.members.toggleUserPresence()
}}})
},2000)
},bindPlaceholder:function(i){var h=i;
var j=h.data("hint");
h.addClass("placeholder").val(j);
h.unbind("focus.placeholder").bind("focus.placeholder",function(){if(h.val()==j){h.removeClass("placeholder").val("")
}}).unbind("blur.placeholder").bind("blur.placeholder",function(){if($.trim(h.val())===""){h.addClass("placeholder").val(j)
}})
},enhanceComponents:function(){$('input[data-behavior="placeholder"]').each(function(){TS.client.ui.bindPlaceholder($(this))
});
$("#flexpane_tabs li a").on("shown",function(h){TS.view.resizeManually("TS.client.ui.enhanceComponents")
})
},startPostFromChatInput:function(){},startSnippetFromChatInput:function(){TS.ui.snippet_dialog.startCreate(TS.client.ui.$msg_input.val());
TS.view.clearMessageInput()
},bindMessageInput:function(){var j=TS.client.ui.$msg_input;
j.bind("click",function(m){});
j.TS_tabComplete2({complete_cmds:true,complete_channels:true,complete_emoji:true,complete_member_specials:true,no_tab_out:true,onComplete:function(m){TS.utility.populateInput(j,m);
TS.client.ui.storeLastMsgInputForActive(j.val())
},ui_initer:TS.ui.msg_tab_complete.start,suspended:true,sort_by_membership:true,new_cmds:TS.boot_data.feature_cmd_autocomplete});
(function(){var o=0;
var q=0;
var p=0.66;
var m;
j.bind("textchange",function(r,s){q++;
if(j.val()===""){o=0;
q=0
}});
if(TS.channels&&TS.channels.switched_sig){TS.channels.switched_sig.add(function(){o=0;
q=0
})
}j.removeClass("hidden").autosize({boxOffset:19,callback:function(){o++;
TS.client.ui.inputResized.apply(this,arguments);
var r=j.val();
if(r===""){o=0;
q=0
}else{if(!m&&r&&r.length>20&&q>20&&o>5&&o/q>p){TS.logError({message:"TS.ui: Excessive message input resize events"},document.querySelectorAll("#msgs_div .message").length+" messages in current channel. Resize vs. change count: "+o+" / "+q+" ("+(o/q)+")");
m=true
}}}})
}());
var k=$("#special_formatting_text");
j.attr("maxlength","");
var l="";
j.bind("textchange",function(p,t){var s=TS.utility.date.getTimeStamp();
var r=j.val();
TS.client.ui.storeLastMsgInputForActive(r);
i(p);
if(TS.model.profiling_keys){TS.model.addProfilingKeyTime("input textchange",TS.utility.date.getTimeStamp()-s)
}if(r.length>2){if(!k.hasClass("showing")){k.transition({opacity:0.7},600);
k.addClass("showing")
}}else{if(k.hasClass("showing")){k.transition({opacity:0},200);
k.removeClass("showing")
}}if(!TS.model.prefs.msg_preview){return
}var o;
if(r.substr(0,4)=="/me "&&r.length>4){o="<i>"+TS.format.formatWithOptions(TS.format.cleanMsg(r.substr(3)))+"</i>"
}else{if(r.substr(0,7)=="/shrug "){o=TS.format.formatWithOptions(TS.format.cleanMsg(r.substr(6)))+" ¯\\_(ツ)_/¯"
}else{if(r.substr(0,1)=="/"){o=""
}else{o=TS.format.formatWithOptions(TS.format.cleanMsg(r))
}}}o=o||(TS.model.prefs.msg_preview_persistent?"&nbsp;":"");
var m=(o!=l);
l=o;
if(m){TS.client.ui.$msg_preview_msg.html(o)
}if(o&&!TS.model.msg_preview_showing){TS.model.msg_preview_showing=true;
TS.client.ui.$msg_preview.removeClass("hidden");
j.data("$tab_complete_ui_y_positioner",TS.client.ui.$msg_preview)
}else{if(!o&&TS.model.msg_preview_showing){TS.model.msg_preview_showing=false;
TS.client.ui.$msg_preview.addClass("hidden");
j.data("$tab_complete_ui_y_positioner",null)
}else{if(!m){return
}}}var q=TS.view.last_input_container_height;
TS.view.measureInput();
if(q!=TS.view.last_input_container_height){TS.view.resizeManually()
}if(TS.ui.msg_tab_complete.is_showing){TS.ui.msg_tab_complete.positionUI()
}});
$("#snippet_prompt .prompt, #snippet_prompt .warning .snippet_link, #snippet_prompt .warning .post_link").tooltip({container:"body"});
function i(q){var r=j.val();
var p=false;
var o=false;
if($.trim(r)){o=r.length>TS.model.input_maxlength;
var m=r.split("\n").length;
if(o||m>1){p=true
}}if(p){if(o){$("#snippet_prompt .prompt").addClass("hidden");
$("#snippet_prompt .warning").removeClass("hidden")
}else{$("#snippet_prompt .warning").addClass("hidden");
$("#snippet_prompt .prompt").removeClass("hidden")
}$("#snippet_prompt").removeClass("hidden");
$("#notification_bar").addClass("showing_snippet_prompt")
}else{$("#snippet_prompt").addClass("hidden");
$("#notification_bar").removeClass("showing_snippet_prompt")
}}j.bind("keyup",function(r){var s=j.val();
if(s){if(s.indexOf("/")!==0){TS.typing.userStarted(TS.shared.getActiveModelOb());
return
}if(s.indexOf("/msg ")===0){var q=s.replace("/msg ","").split(" ")[0];
var t=TS.members.getMemberByName(q);
if(t){var o=TS.ims.getImByMemberId(t.id);
if(o){TS.typing.userStarted(o);
return
}}else{var p=q.replace("#","");
var m=TS.channels.getChannelByName(p);
if(!m){m=TS.groups.getGroupByName(p)
}if(m){TS.typing.userStarted(m);
return
}}}}TS.typing.userEnded(TS.shared.getActiveModelOb())
});
var h=function(m){if(TS.client.ui.$msg_input.val().length>TS.model.input_maxlength){$("#snippet_prompt").highlight(600,"",null,0);
m.preventDefault()
}else{if(TS.view.submit(m)){if(!TS.ui.at_channel_warning_dialog.showing){TS.client.ui.resetMessageInput()
}TS.chat_history.resetPosition("enter key")
}else{TS.client.ui.addOrFlashEphemeralBotMsg({channel:TS.model.active_cid,icons:{emoji:":x:"},username:"disconnectedBot",text:"Hmmmm... you seem to be offline, so sending messages is not possible right now!",ephemeral_type:"disconnected_feedback"})
}}};
j.bind("keydown",function(r){var t=TS.utility.date.getTimeStamp();
var o=TS.utility.keymap;
if(TS.client.ui.keyPressIsValidForGotoNextOpenChannelOrIM(r)){r.preventDefault();
if(TS.model.profiling_keys){TS.model.addProfilingKeyTime("input keydown",TS.utility.date.getTimeStamp()-t)
}return
}if(r.which==o.enter&&r.metaKey&&r.shiftKey){TS.client.ui.startSnippetFromChatInput()
}else{if(r.which==o.enter&&(!r.shiftKey&&!r.altKey&&!r.ctrlKey)){if(r.which==o.enter&&r.metaKey){TS.client.ui.startSnippetFromChatInput()
}else{if($.trim(j.val())!==""&&!TS.client.ui.cal_key_checker.prevent_enter){if($("#chat_input_tab_ui").length&&!$("#chat_input_tab_ui").hasClass("hidden")&&TS.model.prefs.tab_ui_return_selects){r.preventDefault();
return
}if(TS.model.prefs.enter_is_special_in_tbt&&TS.utility.isCursorWithinTBTs(j)){return
}h(r)
}}r.preventDefault();
if(TS.model.profiling_keys){TS.model.addProfilingKeyTime("input keydown",TS.utility.date.getTimeStamp()-t)
}return
}else{if(r.which==o.shift){}else{if(r.which==o.enter&&(r.ctrlKey||r.altKey)){if(!TS.model.is_mac||TS.model.is_FF){var q=j.getCursorPosition();
var s=j.val();
j.val(s.substr(0,q)+"\n"+s.substr(q)).trigger("autosize").setCursorPosition(q+1)
}}else{if(TS.model.prefs&&TS.model.prefs.enter_is_special_in_tbt&&r.which==o.enter&&r.shiftKey&&TS.utility.isCursorWithinTBTs(j)){h(r)
}}}if($("#chat_input_tab_ui").length&&!$("#chat_input_tab_ui").hasClass("hidden")){}else{if(!j.val()&&(TS.utility.cmdKey(r)||(TS.model.prefs&&!TS.model.prefs.arrow_history))&&r.which==o.up){TS.client.ui.maybeEditLast(r)
}else{if(!r.shiftKey&&(r.which==o.up||r.which==o.down)){var m=j.getCursorRange();
if(!m||m.l===0){if(r.which==o.up&&(j.getCursorPosition()<1)){TS.chat_history.onArrowKey(r,j)
}else{if(r.which==o.down&&(j.getCursorPosition()>=j.val().length)){TS.chat_history.onArrowKey(r,j)
}}}}}}}}if(TS.model.profiling_keys){TS.model.addProfilingKeyTime("input keydown",TS.utility.date.getTimeStamp()-t)
}})
},maybeEditLast:function(i){i.preventDefault();
i.stopPropagation();
var h=TS.shared.getActiveModelOb();
var j;
if(h){j=TS.utility.msgs.getEditableMsgByProp("user",TS.model.user.id,h.msgs);
if(j){TS.msg_edit.startEdit(j.ts,TS.shared.getActiveModelOb());
return true
}}TS.sounds.play("beep");
return false
},resetMessageInput:function(){TS.client.ui.$msg_input.height(16);
TS.view.measureInput();
TS.client.ui.$msg_input.blur()
},bindCommentInput:function(){$("#file_comment").bind("focus",function(){var i=$(this).closest(".flex_content_scroller");
var h=i[0].scrollHeight;
i.scrollTop(h)
});
if(!TS.model.is_mac){$(".file_comment_tip").text("ctrl+enter to submit")
}},bindFlexUI:function(){$("#help_icon").on("click",function(h){if(TS.help_dialog.showing){return
}TS.help_dialog.start(($("#help_icon").hasClass("open")||$("#help_icon").hasClass("unread")?"issues":""))
});
$("#flex_menu").on("click",function(h){TS.menu.startWithFlexMenu(h)
});
$("#flex_toggle").on("click",TS.client.ui.toggleFlex);
if(TS.boot_data.feature_flexpane_rework){$("#col_flex").on("click",".close_flexpane",function(){if(TS.model.ui_state.flex_visible){TS.client.ui.hideFlex()
}});
$("#flex_menu_toggle").on("click",function(h){TS.menu.startWithFlexMenu(h)
});
$("#details_toggle").on("click",function(){g("details")
});
$("#recent_mentions_toggle").on("click",function(){g("mentions")
});
$("#stars_toggle").on("click",function(){g("stars")
})
}},toggleFlex:function(){if(TS.model.ui_state.flex_visible){TS.client.ui.hideFlex()
}else{if(!TS.model.ui.active_tab_id){TS.client.ui.openFlexTab(TS.model.default_flex_name)
}else{var h=(TS.model.ui.active_tab_id=="list");
TS.client.ui.showFlex(h);
TS.client.flexDisplaySwitched(TS.model.ui.active_tab_id||"",TS.model.ui.last_flex_extra||"")
}}},hideFlex:function(i){if(TS.boot_data.feature_flexpane_rework){if(TS.model.ui_state.flex_visible){if(TS.model.ui_state.flex_name==="details"){a=false
}else{if(a){TS.client.ui.openFlexTab("details");
return
}}}}var h=function(){TS.model.ui.last_flex_extra=TS.model.flex_extra_in_url;
if(TS.model.ui_state.flex_visible&&TS.model.prefs.flex_resize_window&&TS.model.is_our_app){TS.client.ui.adjustWindowSizeForFlexPane("hide")
}$("#client-ui").removeClass("flex_pane_showing");
TS.model.ui_state.flex_visible=false;
TS.model.ui_state.flex_name="";
TS.model.ui_state.flex_extra="";
TS.storage.storeUIState(TS.model.ui_state);
TS.view.resizeManually("TS.client.ui.hideFlex");
TS.client.flex_pane.stopLocalTimeInterval();
$("#search_container").append($("#channel_members_toggle")).append($("#channel_members"));
$(".messages_banner").removeClass("flex_pane_showing");
if(!i){TS.client.flexDisplaySwitched("","")
}TS.client.ui.adjustIFramesInSpecialFlexPanes();
if(document.activeElement&&$(document.activeElement).closest("#col_flex").length>0){TS.view.focusMessageInput()
}TS.client.ui.$msg_input.trigger("autosize").trigger("autosize-resize")
};
if(TS.model.ui.active_tab_id=="list"){$("#flex_contents").transition({opacity:0},100,h)
}else{h()
}$("#flex_toggle").attr("title","Show Flexpane")
},last_window_width_diff:392,last_window_width_diff_default:392,adjustWindowSizeForFlexPane:function(l){var k=window.outerWidth;
var h=window.outerHeight;
if(l=="show"){var j=TS.client.ui.last_window_width_diff;
if(k+j>=1441){j+=100
}else{if(k+j>=1367){j+=50
}}window.resizeTo(k+j,h);
var i=window.outerWidth-k;
TS.client.ui.last_window_width_diff=i;
if(window.outerWidth==k){return false
}return true
}else{if(l=="hide"){window.resizeTo(k-TS.client.ui.last_window_width_diff,h);
TS.client.ui.last_window_width_diff=TS.client.ui.last_window_width_diff_default;
return true
}}},showFlex:function(h,i){var j=TS.client.ui.areMsgsScrolledToBottom();
$("#client-ui").addClass("flex_pane_showing");
if(!TS.model.ui_state.flex_visible&&TS.model.prefs.flex_resize_window&&TS.model.is_our_app){TS.client.ui.adjustWindowSizeForFlexPane("show")
}TS.model.ui_state.flex_visible=true;
TS.storage.storeUIState(TS.model.ui_state);
if(!i){TS.view.resizeManually("TS.client.ui.showFlex")
}if(j){TS.client.ui.instaScrollMsgsToBottom(false)
}$("#channel_header").append($("#channel_members_toggle")).append($("#channel_members"));
$(".messages_banner").addClass("flex_pane_showing");
if(h){$("#flex_contents").css("opacity",0).transition({opacity:100},150)
}else{$("#flex_contents").css("opacity",100)
}if(TS.model.ui.active_tab_id=="files"&&TS.model.ui.last_flex_extra!==""){$("#file_preview_scroller").data("monkeyScroll").updateFunc(true)
}else{if(TS.model.ui.active_tab_id=="activity"){$("#activity_feed_scroller").data("monkeyScroll").updateFunc(true)
}}if(TS.model.ui.active_tab_id=="team"&&!TS.model.previewed_member_id){TS.client.flex_pane.startLocalTimeInterval()
}$("#flex_toggle").attr("title","Hide Flexpane");
TS.client.ui.adjustIFramesInSpecialFlexPanes();
TS.client.ui.$msg_input.trigger("autosize").trigger("autosize-resize")
},_displayFlexTab:function(i,h){var j=$("#"+i+"_tab");
if(!j.length){return false
}if(TS.model.ui.active_tab_id=="activity"){$("#activity_feed_scroller").hideWithRememberedScrollTop()
}else{if(TS.model.ui.active_tab_id=="search"){$("#search_results_container").hideWithRememberedScrollTop()
}}if(!TS.model.ui_state.flex_visible){TS.client.ui.showFlex(false,true)
}if(i=="activity"){if(TS.model.team.activity&&TS.model.team.activity.length){}else{TS.activity.fetchTeamActivity()
}}else{if(i=="stars"){if(TS.model.user&&TS.model.user.stars&&!TS.model.user.stars.length){TS.stars.fetchStarredItems(TS.model.user.id)
}}else{if(i=="mentions"){if(TS.model.user&&TS.model.user.mentions&&!TS.model.user.mentions.length){TS.mentions.fetchMentions()
}}else{if(i=="files"){}else{if(i=="team"){TS.client.flex_pane.startLocalTimeInterval()
}else{if(i==="details"){a=true
}}}}}}if(i!="team"){TS.client.flex_pane.stopLocalTimeInterval()
}$("#flex_contents > .tab-pane").removeClass("active");
j.addClass("active");
TS.model.ui.active_tab_id=i;
TS.model.ui.active_tab_ts=TS.utility.date.getTimeStamp();
if(i=="activity"){if(!$("#activity_tab_activity").hasClass("hidden")){TS.activity.activityRead()
}$("#activity_feed_scroller").unhideWithRememberedScrollTop();
if(!h){TS.view.resizeManually("TS.client.ui._displayFlexTab flex_name:"+i)
}$("#activity_feed_scroller").data("monkeyScroll").updateFunc(true)
}else{if(i=="search"){$("#search_results_container").unhideWithRememberedScrollTop();
$("#search_results").data("monkeyScroll").updateFunc()
}else{if(!h){TS.view.resizeManually("TS.client.ui._displayFlexTab flex_name:"+i)
}}}TS.client.ui.adjustIFramesInSpecialFlexPanes();
return true
},adjustIFramesInSpecialFlexPanes:function(){if(!TS.boot_data.special_flex_panes){return
}var j=TS.model.ui.active_tab_id;
var m;
var i;
var o;
var l;
for(var h in TS.boot_data.special_flex_panes){i=TS.boot_data.special_flex_panes[h];
TS.log(82,"special_flex_pane: "+j);
o=$("#"+i.flex_name+"_tab");
if(!o.length){continue
}l=o.find("iframe");
if(!l.length){continue
}m="about:blank";
if(TS.model.ui_state.flex_visible&&i.flex_name==j){m=l.data("src")
}if(l.attr("src")==m){continue
}TS.log(82,"loading src: "+m);
l.attr("src",m)
}},openFlexTab:function(h){if(!TS.client.ui._displayFlexTab(h)){return
}var i;
if(h=="files"){i=TS.model.previewed_file_id
}else{if(h=="team"){i=TS.model.previewed_member_name;
if(TS.model.previewed_member_name){TS.activity.fetchIndividualActivity(TS.members.getMemberByName(TS.model.previewed_member_name),true)
}}else{if(h=="search"){i=TS.search.last_search_query
}}}TS.client.flexDisplaySwitched(h,i)
},setFlexStateFromHistory:function(h,k,i){if(!h){if(TS.model.ui_state.flex_name||i){TS.client.ui.hideFlex(true)
}return
}k=k||"";
var j=TS.model.ui_state.flex_extra||"";
if(!i&&(h==TS.model.ui_state.flex_name&&k==j)){return
}if(h=="list"){h="files"
}if(!TS.client.ui._displayFlexTab(h)){return
}if(h=="files"){TS.client.ui.showFilesFromHistory(k)
}else{if(h=="team"){TS.client.ui.showTeamFromHistory(k)
}else{if(h=="search"){TS.client.ui.showSearchFromHistory(k)
}else{TS.client.flexDisplaySwitched(h,null,false,true)
}}}},showSearchFromHistory:function(h){if(!h){TS.client.ui.openFlexTab("activity");
return
}h=TS.search.truncateQuery(h);
h=h.replace(/%23/g,"#");
$("#search_terms").val(h).data("textchange_lastvalue",h);
$("#header_search_form").submit();
TS.client.flexDisplaySwitched("search",h,false,true)
},preview_file_waiting_on:null,showFilesFromHistory:function(i){if(!i){TS.client.ui._displayFileList();
TS.client.flexDisplaySwitched("files",null,false,true);
return
}var h=TS.files.getFileById(i);
if(h){TS.client.ui._displayFile(h.id);
TS.client.flexDisplaySwitched("files",h.id,false,true);
TS.files.fetchFileInfo(i)
}else{TS.client.ui.preview_file_waiting_on=i;
TS.files.fetchFileInfo(i,function(k,j){if(k!=TS.client.ui.preview_file_waiting_on){return
}TS.client.ui.preview_file_waiting_on=null;
if(j){TS.client.ui._displayFile(j.id);
TS.client.flexDisplaySwitched("files",j.id,false,true)
}else{TS.client.ui._displayFileList();
TS.client.flexDisplaySwitched("files",null,true)
}})
}},showTeamFromHistory:function(h){if(!h){TS.client.ui._displayTeamList();
TS.client.flexDisplaySwitched("team",null,false,true);
return
}var i=TS.members.getMemberByName(h);
if(i){TS.client.ui._displayMember(i.id);
TS.client.flexDisplaySwitched("team",i.name,false,true)
}else{TS.client.ui._displayTeamList();
TS.client.flexDisplaySwitched("team",null,true)
}},$messages_input_container:$("#messages-input-container"),$emo_menu:null,inputResized:function(i,h){var j=TS.utility.date.getTimeStamp();
if(!TS.client.ui.$emo_menu){TS.client.ui.$file_button=$("#primary_file_button");
TS.client.ui.$emo_menu=$(".emo_menu")
}TS.view.measureInput();
TS.client.ui.$file_button.css("height",(TS.view.last_input_height)+"px");
TS.view.resizeManually("TS.client.ui.inputResized original:"+i+" height:"+h);
if(TS.view.last_input_height>=115){TS.client.ui.$msg_input.removeClass("with-emoji-menu");
TS.client.ui.$emo_menu.addClass("hidden")
}else{if(TS.view.last_input_height<96){TS.client.ui.$msg_input.addClass("with-emoji-menu");
TS.client.ui.$emo_menu.removeClass("hidden")
}}if(TS.model.profiling_keys){TS.model.addProfilingKeyTime("inputResized "+i+" "+h,TS.utility.date.getTimeStamp()-j)
}},storeLastMsgInputForActive:function(h){var i=TS.shared.getActiveModelOb();
if(TS.model.input_history_index>-1){if(TS.model.input_history[TS.model.input_history_index]!=h){TS.chat_history.resetPosition("storeLastMsgInputForActive "+h)
}}if(!i){return
}if(i.last_msg_input==h){return
}i.last_msg_input=h;
TS.storage.storeLastMsgInput(i.id,i.last_msg_input)
},populateChatInput:function(h){TS.utility.populateInput(TS.client.ui.$msg_input,h);
TS.client.ui.storeLastMsgInputForActive(h);
TS.client.ui.$msg_input.trigger("autosize-resize")
},populateChatInputWithLast:function(){var h=TS.shared.getActiveModelOb();
if(!h){return
}TS.chat_history.resetPosition("populateChatInputWithLast");
TS.client.ui.$msg_input.TS_tabComplete2("suspend");
TS.client.ui.populateChatInput(h.last_msg_input);
TS.client.ui.$msg_input.TS_tabComplete2("unsuspend");
TS.client.ui.$msg_input.TS_tabComplete2("changeoption","member_prefix_required",h.is_slackbot_im)
},onSubmit:function(l,p){try{var m=$.trim(l);
if(!m){return
}var q=(m=="/unarchive"||m=="/leave"||m=="/part"||m=="/close");
var h=TS.shared.getActiveModelOb();
if(!q&&h&&h.is_archived){TS.generic_dialog.alert("This channel has been archived; you cannot send messages to it.");
TS.client.ui.populateChatInput(m);
return
}TS.chat_history.add(l);
TS.view.clearMessageInput();
if(l.substr(0,1)=="/"&&l.substr(0,2)!="//"){var r=m.split(" ");
var j=r[0];
var i=$.trim(l.replace(j,""));
var o;
if(TS.cmd_handlers[j]&&TS.cmd_handlers[j].type=="client"){setTimeout(function(){TS.cmd_handlers.runCommand(j,i,r,p)
},10)
}else{if(o=TS.utility.msgs.getEditLastShortcutCmd(l)){TS.utility.msgs.removeAllEphemeralMsgsByType("temp_slash_cmd_feedback",TS.model.active_cid);
TS.utility.msgs.tryToEditLastMsgFromShortcut(o)
}else{if(j=="/me"&&TS.model.prefs.convert_emoticons&&TS.model.prefs.emoji_mode!="as_text"){i=TS.format.doEmoticonConversion(i)
}TS.api.call("chat.command",{agent:"webapp",command:j,text:i,channel:TS.model.active_cid},TS.client.ui.onAPICommand)
}}}else{if(TS.model.active_channel_id){TS.channels.sendMsg(TS.model.active_channel_id,l)
}else{if(TS.model.active_im_id){TS.ims.sendMsg(TS.model.active_im_id,l)
}else{if(TS.model.active_group_id){TS.groups.sendMsg(TS.model.active_group_id,l)
}else{return
}}}TS.utility.msgs.removeAllEphemeralMsgsByType("temp_slash_cmd_feedback",TS.model.active_cid)
}if(TS.client.ui.isUnreadDividerInView()){TS.client.ui.forceMarkAllRead(TS.model.marked_reasons.sent)
}if(TS.model.overlay_is_showing){TS.view.overlay.cancelFromSendingMessage()
}if(TS.model.showing_welcome_2){TS.model.cancelled_welcome_2_this_session=true;
TS.view.unAdjustForWelcomeSlideShow();
TS.client.ui.instaScrollMsgsToBottom(true)
}}catch(k){TS.error(k)
}},prefCollapsibleChanged:function(){if(TS.model.prefs.collapsible){TS.client.ui.makeChanColCollapsible()
}else{TS.client.ui.makeChanColNOTCollapsible()
}if(TS.model.ui.is_collapsible){TS.client.ui.setUpCollapsibleUI()
}},prefMsgPreviewChanged:function(){if(!TS.model.prefs.msg_preview&&TS.model.msg_preview_showing){TS.client.ui.$msg_preview.addClass("hidden");
TS.model.msg_preview_showing=false
}else{if(TS.model.prefs.msg_preview&&!TS.model.msg_preview_showing){TS.client.ui.$msg_input.trigger("textchange")
}}if(TS.model.prefs.msg_preview&&!TS.model.prefs.msg_preview_persistent&&TS.model.msg_preview_showing){TS.client.ui.$msg_input.trigger("textchange")
}TS.view.measureInput();
TS.view.resizeManually()
},prefColorNamesInListChanged:function(){if(TS.model.prefs.color_names_in_list){$(".nuc").removeClass("nuc").addClass("user_colored")
}else{$(".user_colored").removeClass("user_colored").addClass("nuc")
}},onAPICommand:function(l,o,i){var m=TS.model.active_cid;
if(!l){if(!TS.client.ui.$msg_input.val()){TS.client.ui.$msg_input.val(i.command+" "+i.text)
}var h;
var k="*"+TS.utility.htmlEntities(i.command)+(i.text?" "+TS.utility.htmlEntities(i.text):"")+"*";
if(o.error&&o.error=="restricted_action"){h=""+k+" failed because you are not allowed to perform that action. Talk to your team owner."
}else{if(o.error&&(o.error!="Unknown command"&&o.error!="unknown_command")){h=""+k+' failed with the error "'+o.error+'".'
}else{if(o.error){h=""+k+' is not a valid command. In Slack, all messages that start with the "/" character are interpreted as commands.\n\nIf you are trying to send a message and not run a command, try preceding the "/" with an empty space.'
}else{h=""+k+" failed with an unknown error."
}}}TS.client.ui.addOrFlashEphemeralBotMsg({text:h,ephemeral_type:"temp_slash_cmd_feedback",channel:m})
}if(o.response){if(o.keep_input){if(!TS.client.ui.$msg_input.val()){TS.client.ui.$msg_input.val(i.command+" "+i.text)
}}var j=m;
if(i.channel&&i.channel!=j){if(TS.channels.getChannelById(i.channel)){j=i.channel
}else{if(TS.ims.getImById(i.channel)){j=i.channel
}else{if(TS.groups.getGroupById(i.channel)){j=i.channel
}}}}if(o.is_temp){TS.client.ui.addOrFlashEphemeralBotMsg({text:o.response,ephemeral_type:"temp_slash_cmd_feedback",channel:j})
}else{TS.utility.msgs.removeAllEphemeralMsgsByType("temp_slash_cmd_feedback",TS.model.active_cid);
TS.client.ui.addEphemeralBotMsg({text:o.response,channel:j})
}}else{if(l){TS.utility.msgs.removeAllEphemeralMsgsByType("temp_slash_cmd_feedback",TS.model.active_cid)
}}},is_limited_div_tim:0,checkScrollBack:function(){var h=$(".is_limited_div:visible");
if(!h.length){return
}TS.model.ui.cached_msgs_scroller_rect=(TS.model.ui.cached_msgs_scroller_rect||TS.client.ui.$msgs_scroller_div.dimensions_rect());
if(TS.client.ui.isElInView(h,5,TS.model.ui.cached_msgs_scroller_rect)){if(h.hasClass("been_seen")){return
}h.addClass("been_seen");
h.css("background-color","#fcc");
TS.client.ui.is_limited_div_tim=setTimeout(function(){h.css("background-color","")
},2000)
}else{clearTimeout(TS.client.ui.is_limited_div_tim);
h.removeClass("been_seen")
}},checkInlineImgsAndIframesEverywhere:function(h){TS.client.ui.checkInlineImgsAndIframes("main",h);
TS.client.ui.checkInlineImgsAndIframes("search",h);
TS.client.ui.checkInlineImgsAndIframes("archives",h)
},checkInlineImgsAndIframes:function(p,i){var o;
var m;
if(p=="main"){o=TS.client.ui.$msgs_div;
m=TS.model.ui.cached_msgs_scroller_rect=(TS.model.ui.cached_msgs_scroller_rect||TS.client.ui.$msgs_scroller_div.dimensions_rect())
}else{if(p=="search"){o=$("#search_results");
m=TS.model.ui.cached_search_scroller_rect=(TS.model.ui.cached_search_scroller_rect||o.dimensions_rect())
}else{if(p=="archives"){o=TS.client.archives.$scroller;
m=TS.model.ui.cached_archives_scroller_rect=(TS.model.ui.cached_archives_scroller_rect||o.dimensions_rect())
}else{TS.info("unknown which in checkInlineImgsAndIframes(which)");
return
}}}if(i){TS.info("checkInlineImgsAndIframes which:"+p)
}var k=o.find(".msg_inline_holder:not(.hidden) .msg_inline_child.hidden");
var j;
var h;
var l;
if(i){$("#active_channel_name").find(".topic").html(k.length)
}k.each(function(q){h=$(this);
l=h.closest(".msg_inline_holder");
if(!l.length){return
}j=l.dimensions_rect();
if(i){TS.dir(0,j)
}if(i){TS.dir(0,m)
}if(TS.utility.doRectsOverlap(m,j)){if(i){TS.info("yes")
}h.removeClass("hidden");
h.attr("src",h.data("real-src"));
h.error(function(){$(this).closest(".msg_inline_holder").hide()
})
}else{if(i){TS.warn("no")
}}h=null;
l=null
});
o.find(".iframe_placeholder").each(function(s){var r=$(this);
var u=r.closest(".msg_inline_holder");
if(!u.length){return
}var t=u.dimensions_rect();
if(TS.utility.doRectsOverlap(m,t)){var q=TS.utility.getIframeHTMLFromPlaceholder(r[0].outerHTML);
r.replaceWith($(q))
}})
},logUnreads:function(){var l=[];
var h=TS.shared.getActiveModelOb();
var j=h.unreads;
if(!h){return
}for(var k=0;
k<j.length;
k++){if(TS.model.client.reads.indexOf(j[k])==-1){l.push(j[k])
}}TS.info(l)
},markMostRecentReadMsgInActive:function(j,i){var h=TS.shared.getActiveModelOb();
if(TS.model.active_channel_id){TS.channels.markMostRecentReadMsg(h,j)
}else{if(TS.model.active_group_id){TS.groups.markMostRecentReadMsg(h,j)
}else{TS.ims.markMostRecentReadMsg(h,j)
}}if(i){TS.client.msg_pane.clearUnreadDivider()
}},isMsgInView:function(h){var i=TS.client.msg_pane.getDivForMsg(h);
if(!i.length){return false
}if(i.hasClass("hidden")){return true
}TS.model.ui.cached_msgs_scroller_rect=(TS.model.ui.cached_msgs_scroller_rect||TS.client.ui.$msgs_scroller_div.dimensions_rect());
return TS.client.ui.isElInView(i,5,TS.model.ui.cached_msgs_scroller_rect)
},isUnreadDividerInView:function(h){h=h||5;
TS.model.ui.cached_msgs_scroller_rect=(TS.model.ui.cached_msgs_scroller_rect||TS.client.ui.$msgs_scroller_div.dimensions_rect());
return TS.client.ui.isElInView(TS.client.ui.$msgs_unread_divider,h,TS.model.ui.cached_msgs_scroller_rect)
},isElInView:function(i,h,k){if(!i||!i.length){return false
}h=h||0;
var j=i.dimensions_rect();
if(j.height>k.height){return TS.utility.doesRectContainRect(j,k,h,true)
}else{if(TS.utility.doesRectContainRect(k,j,h,true)){return true
}}return false
},scrollSoTopUnseenChannelIsInView:function(k){var h=$("#channels_scroller");
var i=h.find("LI.unread");
if(i.length){i.first().scrollintoview({offset:"top",px_offset:50})
}else{var j=$("#starred_div");
if(j.length&&j.length&&!j.hasClass("hidden")){$("#starred_section_header").scrollintoview()
}else{$("#channels_header").scrollintoview()
}}},scrollSoBottomUnseenChannelIsInView:function(j){var h=$("#channels_scroller");
var i=h.find("LI.unread");
if(i.length){i.last().scrollintoview({offset:"bottom",px_offset:-50})
}else{h.children().last().scrollintoview()
}},onChannelsScroll:function(h){TS.model.ui.cached_channels_scroller_rect=null;
TS.client.ui.checkUnseenChannelsImsGroupsWithUnreads();
if(TS.model.ui.is_collapsible){$("#col_channels_collapse_view").css("top",-$("#channels_scroller").scrollTop())
}},checkUnseenChannelsImsGroupsWithUnreads:TS.utility.immediateDebounce(function(){var j=$("#channels_scroller");
TS.model.ui.cached_channels_scroller_rect=(TS.model.ui.cached_channels_scroller_rect||j.dimensions_rect());
var o,l,m,k=false;
j.find("li.unread:visible").each(function(){var p=$(this);
if(!TS.client.ui.isElInView(p,10,TS.model.ui.cached_channels_scroller_rect)){if(p.position().top<TS.model.ui.cached_channels_scroller_rect.top){o=true;
if(p.hasClass("mention")){m=true
}}else{l=true;
if(p.hasClass("mention")){k=true
}}}});
var i=$("#channel_scroll_up");
if(o){i.removeClass("hidden unseen_have_mentions");
if(m){i.addClass("unseen_have_mentions").find("span").html("unread mentions")
}else{i.find("span").html("more unreads")
}}else{i.addClass("hidden").removeClass("unseen_have_mentions")
}var h=$("#channel_scroll_down");
if(l){h.removeClass("hidden unseen_have_mentions");
if(k){h.addClass("unseen_have_mentions").find("span").html("unread mentions")
}else{h.find("span").html("more unreads")
}}else{h.addClass("hidden").removeClass("unseen_have_mentions")
}}),onMsgsScrollThrottled:function(){TS.client.ui.markScrollTop();
if(TS.client.ui.$msgs_unread_divider&&TS.shared.getActiveModelOb().unread_cnt){if(TS.client.ui.isUnreadDividerInView()){TS.client.msg_pane.hideNewMsgsJumpLink();
$("#messages_unread_status").addClass("quiet")
}else{TS.client.msg_pane.showNewMsgsJumpLink();
$("#messages_unread_status").removeClass("quiet");
TS.client.msg_pane.showNewMsgsBar();
TS.client.msg_pane.startNewMsgsTimer()
}}if(TS.model.ui.msgs_are_auto_scrolling){return
}TS.client.msg_pane.checkUnreads()
},onMsgsScroll:function(h){TS.utility.throttle.method(TS.client.ui.onMsgsScrollThrottled,"ts_ui_on_msgs_scroll",250)
},markScrollTop:function(){var h;
if(TS.client.ui.areMsgsScrolledToBottom()){h=-1
}else{h=TS.client.ui.$msgs_scroller_div[0].scrollTop
}var i=false;
if(TS.model.active_channel_id){i=TS.channels.markScrollTop(TS.model.active_channel_id,h)
}else{if(TS.model.active_im_id){i=TS.ims.markScrollTop(TS.model.active_im_id,h)
}else{if(TS.model.active_group_id){i=TS.groups.markScrollTop(TS.model.active_group_id,h)
}}}if(h===0&&TS.shared.getActiveModelOb()&&TS.shared.getActiveModelOb().id==TS.model.welcome_model_ob.id&&TS.model.cancelled_welcome_2_this_session){TS.model.cancelled_welcome_2_this_session=false;
TS.view.adjustForWelcomeSlideShow();
return
}if(i){TS.client.ui.maybeLoadScrollBackHistory()
}},maybeLoadScrollBackHistory:function(){if(TS.client.ui.active_highlight_count||TS.model.ui.is_mouse_down){return
}TS.client.ui.doLoadScrollBackHistory()
},doLoadScrollBackHistory:function(h){if(TS.model.active_channel_id){TS.channels.maybeLoadScrollBackHistory(TS.model.active_channel_id,h)
}else{if(TS.model.active_im_id){TS.ims.maybeLoadScrollBackHistory(TS.model.active_im_id,h)
}else{if(TS.model.active_group_id){TS.groups.maybeLoadScrollBackHistory(TS.model.active_group_id,h)
}}}},areMsgsScrolledToBottom:function(i){i=(!isNaN(i))?i:50;
var h=(TS.model.archive_view_is_showing)?TS.client.archives.$scroller:TS.client.ui.$msgs_scroller_div;
var j=h[0];
return(parseInt(h.css("height"))+j.scrollTop+i>=j.scrollHeight)
},instaScrollMsgsToBottom:function(h){TS.client.ui.instaScrollMsgsToPosition(TS.client.ui.$msgs_scroller_div[0].scrollHeight,h)
},slowScrollMsgsToBottom:function(){var h=TS.model.archive_view_is_showing;
if(h){TS.client.archives.$scroller.animate({scrollTop:TS.client.archives.$scroller[0].scrollHeight},"500")
}else{TS.client.ui.$msgs_scroller_div.animate({scrollTop:TS.client.ui.$msgs_scroller_div[0].scrollHeight},"500")
}},instaScrollMsgsToPosition:function(h,i){TS.model.ui.msgs_are_auto_scrolling=true;
TS.client.ui.$msgs_scroller_div.scrollTop(h);
setTimeout(function(){TS.model.ui.msgs_are_auto_scrolling=false
},100);
if(i){TS.client.msg_pane.checkUnreads()
}},slowScrollMsgsToPosition:function(i,j,k){var h=TS.model.archive_view_is_showing;
j=j&&!h;
var l;
if(h){TS.client.archives.msgs_are_auto_scrolling=true;
l=TS.client.archives.$scroller
}else{TS.model.ui.msgs_are_auto_scrolling=true;
l=TS.client.ui.$msgs_scroller_div
}l.stop().animate({scrollTop:i},"500",function(){setTimeout(function(){if(h){TS.client.archives.msgs_are_auto_scrolling=false
}else{TS.model.ui.msgs_are_auto_scrolling=false
}},100);
if(j){TS.client.msg_pane.checkUnreads()
}if(k){k()
}})
},scrollMsgsSoMsgIsInView:function(l,h,j,o){o=(isNaN(o))?1000:o;
var p;
var i=TS.model.archive_view_is_showing;
if(i){p=TS.client.msg_pane.getDivForArchiveMsg(l)
}else{p=TS.client.msg_pane.getDivForMsg(l)
}if(!p.length){return
}var k;
if(h){k=p.prevAll().slice(0,20);
k.css("opacity",0);
p.next().scrollintoview({duration:0,offset:"top"})
}var m=2500;
if(!i&&j){TS.client.ui.active_highlight_count++
}if(i){TS.client.archives.msgs_are_auto_scrolling=true
}else{TS.model.ui.msgs_are_auto_scrolling=true
}p.scrollintoview({duration:o,offset:"center_vertical",complete:function(){if(j){p.highlight(m,"msg_highlighter");
if(!i){setTimeout(function(){TS.client.ui.active_highlight_count--
},m)
}}setTimeout(function(){if(h&&k){k.transition({opacity:1},300)
}},100);
if(i){TS.client.archives.msgs_are_auto_scrolling=false;
TS.client.archives.onMsgsScroll()
}else{TS.model.ui.msgs_are_auto_scrolling=false;
TS.client.ui.onMsgsScroll()
}}})
},active_highlight_count:0,scrollMsgsSoFirstUnreadMsgIsInView:function(i){var h=false;
if(h){TS.info("scrollMsgsSoFirstUnreadMsgIsInView called");
TS.info("TS.client.ui.$msgs_unread_divider="+TS.client.ui.$msgs_unread_divider)
}if(!TS.client.ui.$msgs_unread_divider){return
}if(h){TS.info("TS.client.ui.$msgs_unread_divider.length="+TS.client.ui.$msgs_unread_divider.length)
}var j=TS.client.ui.$msgs_unread_divider;
TS.model.ui.msgs_are_auto_scrolling=true;
j.scrollintoview({duration:200,offset:"top",px_offset:50,complete:function(){setTimeout(function(){if(h){TS.info("scrollMsgsSoFirstUnreadMsgIsInView animation complete")
}TS.model.ui.msgs_are_auto_scrolling=false;
TS.client.ui.onMsgsScroll();
if(i){i()
}},1)
}})
},afterHistoryFetch:function(h){setTimeout(function(){TS.client.msg_pane.rebuildMsgs();
TS.view.resizeManually("TS.client.ui.afterHistoryFetch");
if(h.scroll_top!==0){return
}if(!TS.model.ui.last_top_msg){return
}TS.client.ui.scrollMsgsSoMsgIsInView(TS.model.ui.last_top_msg.ts,true);
TS.model.ui.last_top_msg=null;
setTimeout(function(){if(h.scroll_top===0){TS.info("TS.client.ui.afterHistoryFetch: we're still scrolled to the top, so we'll try to fetch more messages now");
TS.client.ui.maybeLoadScrollBackHistory()
}},1000)
},TS.model.ui.last_top_msg?0:0)
},rebuildMemberListToggle:function(){if(TS.boot_data.feature_flexpane_rework){e();
return
}if(TS.model.active_channel_id||TS.model.active_group_id){var j=TS.shared.getActiveModelOb();
var o=0;
var q;
for(var l=0;
l<j.members.length;
l++){q=TS.members.getMemberById(j.members[l]);
if(q&&!q.deleted){o++
}}var k=$("#channel_members_toggle");
$("#channel_members_toggle_count").text(o);
k.removeClass("hidden");
var m=$("#channel_members");
var h=k.find("i");
if(!h.length){return
}var p=Math.max(20,k.width()-h.position().left+2);
m.find(".arrow, .arrow_shadow").css("right",p)
}else{$("#channel_members_toggle").addClass("hidden")
}},toggleMemberList:function(){if(TS.model.active_channel_id||TS.model.active_group_id){if(TS.model.ui_state.member_list_visible){TS.client.ui.hideMemberList();
TS.model.ui_state.member_list_visible=false
}else{TS.client.ui.showMemberList();
TS.model.ui_state.member_list_visible=true
}TS.storage.storeUIState(TS.model.ui_state)
}},hideMemberList:function(){$("#channel_members_toggle").find(".fa-caret-left").removeClass("hidden");
$("#channel_members_toggle").find(".fa-caret-down").addClass("hidden");
$("#channel_members").addClass("hidden");
$(".messages_banner").removeClass("member_list_showing")
},showMemberList:function(){if(TS.boot_data.feature_flexpane_rework){return
}$("#channel_members_toggle").find(".fa-caret-left").addClass("hidden");
$("#channel_members_toggle").find(".fa-caret-down").removeClass("hidden");
$("#channel_members").removeClass("hidden");
$(".messages_banner").addClass("member_list_showing");
TS.client.ui.updateClosestMonkeyScroller($("#members_scroller"))
},bindChannelGroupImStarredLists:function(){var h=function(k){if(!TS.model.ms_connected&&!TS.model.change_channels_when_offline){k.preventDefault();
k.stopPropagation();
TS.sounds.play("beep");
return false
}if(TS.view.maybeFollowLink(k)){return
}if(TS.client.ui.checkForEditing(k)){k.preventDefault();
return
}var r=$(k.target);
var j=r.closest(".im_name");
var i=j.data("member-id");
var q=r.closest(".group_name");
var p=q.data("group-id");
var m=r.closest(".channel_name");
var l=m.data("channel-id");
if(i){if(r.hasClass("im_close")){k.stopPropagation();
var o=TS.ims.getImByMemberId(i);
TS.client.ui.maybePromptForClosingIm(o.id)
}else{k.stopPropagation();
TS.ims.startImByMemberId(i)
}}else{if(p){if(r.hasClass("group_close")){k.stopPropagation();
TS.client.ui.maybePromptForClosingGroup(p)
}else{k.stopPropagation();
TS.groups.displayGroup(p)
}}else{if(l){k.preventDefault();
TS.channels.displayChannel(l)
}else{if(r.hasClass("channel-list-more")){TS.ui.list_browser_dialog.start("channels")
}else{if(r.hasClass("channel-list-create")){TS.ui.channel_create_dialog.start()
}}}}}return false
};
$("#im-list").unbind("click").bind("click",h);
$("#group-list").unbind("click").bind("click",h);
$("#starred-list").unbind("click").bind("click",h);
$("#channel-list").unbind("click").bind("click",h)
},maybePromptForClosingGroup:function(i){var h=TS.groups.getGroupById(i);
if(h.unread_cnt){TS.generic_dialog.start({title:"You have unread messages",body:"You have unread messages in the "+TS.model.group_prefix+h.name+" group. Are you sure you want to close it?",show_cancel_button:true,show_go_button:true,go_button_text:"Yes",cancel_button_text:"No",on_go:function(){TS.groups.markMostRecentReadMsg(h,TS.model.marked_reasons.closed);
TS.client.markLastReadsWithAPI();
if(h.is_open){TS.groups.closeGroup(h.id)
}else{TS.groups.closeGroup(h.id)
}}})
}else{TS.groups.closeGroup(h.id)
}},maybePromptForClosingIm:function(i){var h=TS.ims.getImById(i);
if(h.unread_cnt){TS.generic_dialog.start({title:"You have unread messages",body:"You have unread messages from "+h.name+". Are you sure you want to close the DM?",show_cancel_button:true,show_go_button:true,go_button_text:"Yes",cancel_button_text:"No",on_go:function(){TS.ims.markMostRecentReadMsg(h,TS.model.marked_reasons.closed);
TS.client.markLastReadsWithAPI();
TS.ims.closeIm(h.id)
}})
}else{TS.ims.closeIm(h.id)
}},unread_checking_tim:0,channelOrImOrGroupDisplaySwitched:function(){TS.client.msg_pane.dont_check_unreads_til_switch=false;
TS.model.client.reads.length=0;
TS.client.ui.startUnreadCheckingTimer();
TS.client.ui.rebuildMemberListToggle();
if(TS.model.ui.is_collapsible&&!TS.model.ui.is_collapsed&&!TS.model.ui.collapse_moves_whole){TS.client.ui.collapseChanCol()
}},startUnreadCheckingTimer:function(){clearTimeout(TS.client.ui.unread_checking_tim);
var h=(TS.model.prefs&&TS.model.prefs.mark_msgs_read_immediately)?0:1000;
TS.client.ui.unread_checking_tim=setTimeout(TS.client.msg_pane.checkUnreads,h)
},isUserAttentionOnChat:function(){if(!TS.model.ui.is_window_focused){return false
}if(TS.model.dialog_is_showing){return false
}if(TS.model.menu_is_showing){return false
}if(TS.model.tip_card_is_showing){return false
}if(TS.model.overlay_is_showing){return false
}if(TS.boot_data.feature_comment_mentions_autocomplete){if(TS.ui.msg_tab_complete.isShowing()){return false
}}else{if(TS.ui.msg_tab_complete.is_showing){return false
}}return true
},teamFileCommentAdded:function(h,i){if(TS.model.ui.active_tab_id=="files"&&TS.model.previewed_file_id==h.id){TS.client.ui.appendFileComment(h,i)
}},teamFileCommentEdited:function(h,i){if(TS.model.ui.active_tab_id=="files"&&TS.model.previewed_file_id==h.id){TS.client.ui.updateFileComment(h,i)
}},teamFileCommentDeleted:function(h,i){if(TS.model.ui.active_tab_id=="files"&&TS.model.previewed_file_id==h.id){TS.comments.ui.removeFileComment(h,i,function(){$("#file_preview_scroller").data("monkeyScroll").updateFunc()
})
}},teamFileChanged:function(h){if(TS.model.ui.active_tab_id=="files"&&TS.model.previewed_file_id==h.id){TS.client.ui.rebuildFilePreview(h)
}},teamFileDeleted:function(h){if(TS.model.ui.active_tab_id=="files"&&TS.model.previewed_file_id==h.id){TS.client.ui.showFileList()
}},storeLastCommentInputForPreviewedFile:function(h){if(!TS.model.previewed_file_id){return
}TS.storage.storeLastCommentInput(TS.model.previewed_file_id,h)
},previewFile:function(l,h,k,j){var i=TS.files.getFileById(l);
if(TS.model.ui_state.flex_visible&&TS.model.previewed_file_id===l&&!$("#file_preview_scroller").is(":hidden")){$("#file_preview_scroller").highlight(1500,"flex_highlight",false,0)
}if(!i){TS.client.ui.preview_file_waiting_on=l;
TS.files.fetchFileInfo(l,function(o,m){if(o!=TS.client.ui.preview_file_waiting_on){return
}TS.client.ui.preview_file_waiting_on=null;
if(m){TS.client.ui.previewFile(m.id,h,true)
}});
return
}if(!TS.client.ui._displayFile(l,h)){return
}TS.client.flexDisplaySwitched("files",l);
if(j){$("#file_comment").focus()
}if(!k){TS.files.fetchFileInfo(l)
}},_displayFile:function(j,h){var i=TS.files.getFileById(j);
if(!i){return false
}if(!TS.client.ui._displayFlexTab("files")){return false
}$("#back_from_file_preview").unbind();
if(h=="member_preview"){$("#back_from_file_preview").html("<i class='fa fa-chevron-left back_icon'></i> Team Member").bind("click.back",function(){TS.client.ui.previewMember(TS.model.previewed_member_id)
})
}else{if(h=="starred_items"){$("#back_from_file_preview").html("<i class='fa fa-chevron-left back_icon'></i> Starred Items").bind("click.back",function(){TS.client.ui.openFlexTab("stars")
})
}else{if(h=="activity_feed"){$("#back_from_file_preview").html("<i class='fa fa-chevron-left back_icon'></i> Activity").bind("click.back",function(){TS.client.ui.openFlexTab("activity")
})
}else{if(h=="search_results"){$("#back_from_file_preview").html("<i class='fa fa-chevron-left back_icon'></i> Search Results").bind("click.back",function(){TS.client.ui.openFlexTab("search")
})
}else{$("#back_from_file_preview").html("<i class='fa fa-chevron-left back_icon'></i> Files").bind("click.back",function(){TS.client.ui.showFileList()
})
}}}}TS.model.previewed_file_id=j;
$("#file_list_container").hideWithRememberedScrollTop();
$("#file_preview_container").unhideWithRememberedScrollTop();
TS.client.ui.rebuildFilePreview(i);
$("#file_preview_scroller").scrollTop(0);
$("#file_comment_form").css("visibility","");
TS.view.resizeManually("TS.client.ui._displayFileList");
return true
},rebuildFilePreview:function(i){var j=TS.members.getMemberById(i.user);
var h=TS.files.getFileActions(i);
var t={file:i,member:j,user:TS.model.user,show_open_public_link:!TS.model.team.prefs.disallow_public_file_urls,show_revoke_public_link:!TS.model.team.prefs.disallow_public_file_urls&&h.revoke_public_link};
var m="";
switch(i.mode){case"snippet":m=TS.templates.file_snippet_preview_head_section(t);
break;
case"post":m=TS.templates.file_post_preview_head_section(t);
break;
case"space":m=TS.templates.file_space_preview_head_section(t);
break;
case"email":var u=false;
if(Object.keys(h).length>0){u=true
}t.show_file_actions_cog=u;
t.show_preview=false;
var k=TS.templates.file_email(t);
t.email_html=k;
m=TS.templates.file_email_preview_head_section(t);
break;
case"hosted":case"external":t.external_filetype_html=TS.templates.builders.makeExternalFiletypeHTML(i);
default:t.lightbox=false;
if(i.thumb_360_w==360||i.thumb_360_h==360){t.lightbox=true
}m=TS.templates.file_preview_head_section(t);
break
}var l=$("#file_preview_scroller").find("#file_preview_head_section");
l.html(m);
TS.utility.makeSureAllLinksHaveTargets(l);
t={file:i};
var s=$("#file_preview_scroller").find("#file_preview_comments_section");
s.html(TS.templates.comments(t));
TS.utility.makeSureAllLinksHaveTargets(s);
if(i.id!=TS.model.last_previewed_file_id){$("#file_comment_form #file_comment").val(TS.storage.fetchLastCommentInput(i.id)).trigger("keyup")
}if(i.mode=="email"){}TS.model.last_previewed_file_id=i.id;
if(i.content&&i.mode=="snippet"){$("#truncated_message").addClass("hidden");
var q=!!TS.model.code_wrap_long_lines;
var v=TS.templates.makeFileContentsDomId(i);
var r=i.content;
var p=51200/2;
if(i.content.length>p){r=i.content.substr(0,p)+"\r\r..."
}var o=CodeMirror(function(x){var w=document.getElementById(v);
w.parentNode.replaceChild(x,w)
},{value:r,lineNumbers:true,matchBrackets:true,indentUnit:4,indentWithTabs:true,viewportMargin:Infinity,readOnly:true,lineWrapping:q});
$("#file_preview_wrap_cb").bind("change",function(w){TS.model.code_wrap_long_lines=$(this).prop("checked");
o.setOption("lineWrapping",TS.model.code_wrap_long_lines)
});
$("#file_preview_wrap_cb").prop("checked",q);
CodeMirror.switchSlackMode(o,i.filetype);
setTimeout(function(){o.refresh();
$("#file_preview_scroller").data("monkeyScroll").updateFunc()
},0);
if(r!=i.content){$("#truncated_message").removeClass("hidden")
}}$("#file_preview_scroller").data("monkeyScroll").updateFunc();
if($("#file_comment").is(":focus")||TS.utility.getActiveElementProp("id")=="file_comment"){$("#file_comment_submit_btn").scrollintoview({offset:"bottom",px_offset:-50,duration:0})
}},bindFileUI:function(){$("#file_list_heading").bind("click.show_menu",function(h){h.preventDefault();
TS.menu.startWithFileFilter(h)
});
$("#file_list_clear_filter").bind("click.clear_filter",function(h){h.stopPropagation();
TS.view.fileClearFilter()
});
$("#file_list_toggle_all").bind("click.toggleList",function(){TS.client.ui.toggleFileList("all")
});
$("#file_list_toggle_user").bind("click.toggleList",function(i){if(TS.boot_data.feature_flexpane_rework&&i.isDefaultPrevented()){return
}var h=$("#file_list").data("filter-user");
if(h){TS.client.ui.toggleFileList(h)
}else{TS.client.ui.toggleFileList(TS.model.user.id)
}});
$("#file_list_toggle_users").bind("click.show_menu",function(h){h.preventDefault();
TS.menu.startWithFileMemberFilter(h)
})
},fileRevokePublicLink:function(i){var h=TS.files.getFileById(i);
if(!h){return false
}TS.generic_dialog.start({title:"Revoke public file link",body:'<p class="no_bottom_margin">This will disable the Public Link for this file. This will cause any previously shared links to stop working.<br /><br />Are you sure you want to revoke this public link?</p>',go_button_text:"Revoke it",go_button_class:"btn_warning",on_go:function(){TS.files.upsertAndSignal({id:h.id,public_url_shared:false});
TS.api.callImmediately("files.revokePublicURL",{file:h.id})
}})
},showFileList:function(){if(!TS.client.ui._displayFileList()){return
}$("#search_tabs").hide();
TS.client.flexDisplaySwitched("files")
},filterFileList:function(h){if(h=="all"){TS.model.active_file_list_filter=h;
TS.view.fileClearFilter()
}else{if(h=="user"){TS.view.fileClearFilter();
TS.client.ui.toggleFileList(TS.model.user.id)
}else{if(h.indexOf("U")===0){TS.client.ui.toggleFileList(h)
}else{TS.model.active_file_list_filter=h;
TS.view.file_list_heading=TS.model.file_list_type_map[h];
TS.model.file_list_types=[h];
TS.view.fileFilterSet();
$("#file_list_clear_filter").removeClass("hidden")
}}}},toggleFileList:function(m){var h=$("#file_list"),i=$("#file_list_toggle_all"),k=$("#file_list_toggle_user"),j=$("#file_list_toggle_users");
if(h.data("list")==m){return
}h.data("list",m);
if(m=="all"){TS.model.active_file_list_member_filter="all";
k.removeClass("active").find("a").text("Just You");
j.removeClass("active");
i.addClass("active");
h.data("filter-user",TS.model.user.id)
}else{var l=TS.members.getMemberById(m);
if(l){TS.model.active_file_list_member_filter=m;
i.removeClass("active");
k.addClass("active");
j.addClass("active");
if(l.id==TS.model.user.id){k.find("a").text("Just You")
}else{k.find("a").text(TS.members.getMemberDisplayName(l))
}h.data("filter-user",m)
}else{TS.error(m+" is not valid?")
}}TS.view.fileFilterSet()
},_displayFileList:function(){if(!TS.client.ui._displayFlexTab("files",true)){return false
}TS.model.previewed_file_id="";
$("#file_list_container").unhideWithRememberedScrollTop();
$("#file_preview_container").hideWithRememberedScrollTop();
TS.view.resizeManually("TS.client.ui._displayFileList");
return true
},submitFileComment:function(l){var o=TS.format.cleanMsg($("#file_comment_form #file_comment").val());
if(!o){TS.sounds.play("beep");
return
}if(TS.boot_data.feature_at_channel_warning&&!l){var k=TS.files.getFileById(TS.model.previewed_file_id);
var h=$("#file_comment_form #file_comment").val();
var m=false;
var j=k.channels.concat(k.groups);
var i=[];
j.forEach(function(p){if(TS.ui.needToShowAtChannelWarning(p,h)){m=true;
i.push(p)
}});
if(m){TS.ui.at_channel_warning_dialog.startInFlexPane(i,h);
return
}}$("#file_comment_form #file_comment").val("").trigger("keyup");
TS.files.addComment(TS.model.previewed_file_id,o,function(q,r,p){if(q){TS.storage.storeLastCommentInput(p.file,"")
}else{alert("error: comment not added to file");
if(p.file==TS.model.last_previewed_file_id){$("#file_comment_form #file_comment").val(TS.storage.fetchLastCommentInput(p.file)).trigger("keyup")
}}})
},appendFileComment:function(j,m){var i=$("#file_comments_"+j.id);
var l=false;
var h=m.user==TS.model.user.id;
var k=h||TS.model.user.is_admin;
if(h||k){l=true
}i.append(TS.templates.comment({comment:m,file:j,show_comment_actions:l}));
TS.utility.makeSureAllLinksHaveTargets(i);
if(m.user==TS.model.user.id){$("#file_comment_submit_btn").scrollintoview({offset:"bottom",px_offset:-50,duration:0})
}$("#file_preview_scroller").data("monkeyScroll").updateFunc()
},updateFileComment:function(i,m){var j=$("#"+m.id);
var l=false;
var h=m.user==TS.model.user.id;
var k=h||TS.model.user.is_admin;
if(h||k){l=true
}j.replaceWith(TS.templates.comment({comment:m,file:i,show_comment_actions:l}));
TS.utility.makeSureAllLinksHaveTargets(j);
$("#file_preview_scroller").data("monkeyScroll").updateFunc()
},previewMember:function(j,h){if(!TS.client.ui._displayMember(j,h)){return
}var i=TS.members.getMemberById(j);
TS.client.flexDisplaySwitched("team",i.name)
},_displayMember:function(i,p){var j=TS.members.getMemberById(i);
if(!j){return false
}if(!TS.client.ui._displayFlexTab("team")){return false
}TS.model.previewed_member_name=j.name;
TS.model.previewed_member_id=j.id;
TS.info("TS.model.previewed_member_name:"+TS.model.previewed_member_name);
var k;
var r=!j.is_slackbot;
if(j.is_ultra_restricted||TS.model.user.is_ultra_restricted){r=false
}var q=!j.is_slackbot;
if(j.is_ultra_restricted||TS.model.user.is_ultra_restricted){q=false
}else{if(!TS.model.user.is_admin&&j.is_restricted){q=false
}}var o=TS.ims.getImByMemberId(j.id);
if(j.is_self&&!TS.boot_data.feature_new_team_directory){k=TS.templates.team_member_edit({member:j,presence_str:TS.view.getUserPresenceStr()})
}else{k=TS.templates.team_member_preview({member:j,show_group_invite:r&&TS.model.allow_invite_to_group_from_person,show_group_create:r,show_channel_invite:q,im:o,hide_more_menu:!o&&!j.has_files&&!q&&!r&&!(r&&TS.model.allow_invite_to_group_from_person)})
}$("#team_list_container").hideWithRememberedScrollTop();
$("#member_preview_container").unhideWithRememberedScrollTop();
var m=$("#member_preview_scroller");
m.html(k);
TS.utility.makeSureAllLinksHaveTargets(m);
if(TS.model.last_previewed_member_id!=TS.model.previewed_member_id){$("#member_preview_scroller").scrollTop(0)
}if(TS.model.user.is_restricted){$(".team_member_activity_list").addClass("hidden")
}else{$(".team_member_activity_list").removeClass("hidden");
TS.activity.fetchIndividualActivity(j,true)
}TS.model.last_previewed_member_id=j.id;
var l=$("#member_activity_list");
l.html(TS.templates.builders.activityIndividualListHTML(j));
TS.utility.makeSureAllLinksHaveTargets(l);
var h=$("#back_from_member_preview");
h.unbind();
if(p=="file_list"||p=="file_preview"){h.html("<i class='fa fa-chevron-left back_icon'></i> Files").bind("click.back",function(){TS.client.ui.openFlexTab("files")
})
}else{if(p=="activity_feed"){h.html("<i class='fa fa-chevron-left back_icon'></i> Activity").bind("click.back",function(){TS.client.ui.openFlexTab("activity")
})
}else{if(p=="search_results"){h.html("<i class='fa fa-chevron-left back_icon'></i> Search Results").bind("click.back",function(){TS.client.ui.openFlexTab("search")
})
}else{h.html("<i class='fa fa-chevron-left back_icon'></i> Team Directory").bind("click.back",function(){TS.client.ui.showTeamList()
})
}}}TS.client.flex_pane.stopLocalTimeInterval();
TS.view.resizeManually("TS.client.ui._displayMember");
m.find(".member_details .member_image").click(function(s){TS.client.ui._toggleLargeMemberImage(j,this);
return false
});
if(TS.boot_data.feature_new_team_directory){m.find(".member_preview_menu_target").click(function(s){TS.menu.startWithMemberPreview(s,j.id,false,true)
})
}return true
},_toggleLargeMemberImage:function(k,h){var i=$(h).closest(".member_details");
var j="";
if(i.hasClass("expanded_member_image")){$(h).removeClass("thumb_192").addClass("thumb_72");
i.removeClass("expanded_member_image");
if(!TS.utility.is_retina){if(k.is_restricted){j+='url("/img/avatar_overlays.png"), '
}j+='url("'+k.profile.image_72+'")'
}}else{$(h).removeClass("thumb_72").addClass("thumb_192");
i.addClass("expanded_member_image");
if(!TS.utility.is_retina){if(k.is_restricted){j+='url("/img/avatar_overlays.png"), '
}j+='url("'+k.profile.image_192+'")'
}}if(j){$(h).css("background-image",j)
}},individualActivityFetched:function(j){if(j.id!=TS.model.previewed_member_id){return
}var i=$("#member_activity_list");
i.html(TS.templates.builders.activityIndividualListHTML(j));
var h=$("#activity_member_load_more");
if(h.data("ladda")===undefined){h.data("ladda",Ladda.create(document.querySelector("#activity_member_load_more")));
h.bind("click.fetchMoreActivity",function(l){var k=h.data("member-id");
TS.activity.expandIndividual(k);
$(this).data("ladda").start()
})
}else{$("#activity_member_load_more").data("ladda").stop()
}TS.client.ui.updateClosestMonkeyScroller(i);
TS.utility.makeSureAllLinksHaveTargets(i)
},showTeamList:function(){if(!TS.client.ui._displayTeamList()){return
}TS.client.flexDisplaySwitched("team")
},_displayTeamList:function(){if(!TS.client.ui._displayFlexTab("team")){return false
}TS.model.previewed_member_name="";
TS.model.previewed_member_id="";
$("#member_preview_container").hideWithRememberedScrollTop();
$("#team_list_container").unhideWithRememberedScrollTop();
TS.view.resizeManually("TS.client.ui._displayTeamList");
TS.view.triggerInitialTeamListLazyLoad();
return true
},showStatusForm:function(i){if($("#user_status_form").data("last_div_id")){TS.client.ui.removeStatusForm($("#user_status_form").data("last_div_id"))
}var h=TS.templates.user_status_form({user:TS.model.user,div_id:i});
var j=$("#"+i);
j.addClass("hidden");
j.after(h);
$("#user_status_form").data("last_div_id",i);
$("#user_status_input").select()
},submitUserStatus:function(i){var h=$("#user_status_input").val();
TS.members.setUserStatus(h);
TS.client.ui.removeStatusForm(i);
return false
},removeStatusForm:function(h){var i=$("#"+h);
i.removeClass("hidden");
$("#user_status_form").remove()
},gotoNextOpenChannelOrIM:function(m,h){var j=false;
if(TS.model.prefs.sidebar_behavior=="hide_read_channels"){m=true
}else{if(!m&&TS.model.prefs.sidebar_behavior=="hide_read_channels_unless_starred"){j=true
}}var o="LI";
if(m){o="LI.unread, LI.active, LI.show_in_list_even_though_no_unreads"
}else{if(j){o="LI.unread, LI.active, LI.show_in_list_even_though_no_unreads, UL#starred-list LI"
}}var l=$("#channels_scroller").find(o);
if(!l.length){TS.error('no $lis found for "'+o+'"');
return
}var i=l.filter(".active");
if(!i.length){TS.error("active li not found");
return
}if(i.length>1){TS.error("too many active $lis found");
return
}var k;
if(h){k=l.eq(l.index(i)-1);
if(!k.length){k=l.last()
}}else{k=l.eq(l.index(i)+1);
if(!k.length){k=l.first()
}}if(k){if(k.hasClass("channel")){TS.channels.displayChannel(k.find("A").data("channel-id"))
}else{if(k.hasClass("group")){TS.groups.displayGroup(k.find("A").data("group-id"))
}else{if(k.hasClass("member")){TS.ims.startImByMemberId(k.find("A").data("member-id"))
}}}}},updateClosestMonkeyScroller:function(h){if(!h){return
}var j=h.closest(".monkey_scroller");
var i=j.data("monkeyScroll");
if(!i){return
}if(!j.data("monkeyScrollBeingCalled")){j.data("monkeyScrollBeingCalled",true);
TS.utility.setImmediate(function(){i.updateFunc();
j.data("monkeyScrollBeingCalled",false)
})
}},setUpCollapsibleUI:function(){$("html").unbind("mousemove.collapsible");
$("html").unbind("click.collapsible");
$("#col_channels_collapse_view").unbind("click.collapsible");
TS.client.ui.$msgs_scroller_div.unbind("click.collapsible");
$("#col_channels_collapse_view").removeClass("cursor_pointer");
if(TS.model.prefs.collapsible_by_click){$("#col_channels_collapse_view").addClass("cursor_pointer");
TS.client.ui.$msgs_scroller_div.unbind("click.collapsible").bind("click.collapsible",TS.client.ui.onCollapsibleBodyClick)
}else{var i=0;
var h=function(m){if(TS.model.prefs.collapsible_by_click){return
}var j=TS.model.collapse_trigger_w;
if(!TS.model.ui.is_collapsible){return
}if(!TS.client.ui.isUserAttentionOnChat()){return
}if(TS.model.ui.is_collapsed){clearTimeout(i);
i=0;
if(TS.model.ui.was_just_collapsed){return
}var l=m.pageX<j&&m.pageY>50&&m.pageY<$(window).height()-60;
if(l){i=setTimeout(function(){TS.client.ui.expandChanCol()
},100)
}}else{var k=m.pageX>220;
if(TS.model.ui.collapse_moves_whole){k=m.pageX>220+100
}if(k){clearTimeout(i);
i=0;
TS.client.ui.collapseChanCol()
}}};
$("html").unbind("mousemove.collapsible").bind("mousemove.collapsible",h);
$("html").unbind("click.collapsible").bind("click.collapsible",h)
}},makeChanColNOTCollapsible:function(){if(!TS.model.ui.is_collapsible){return
}TS.model.ui.is_collapsible=false;
$("body").removeClass("collapsible");
$("#team_menu, #user_menu, #col_channels_bg, #col_channels, #col_channels_collapse_view").css("opacity",1);
$("#channel_header").css("margin-left","");
if(TS.model.ui.collapse_moves_whole){$("body, #footer").css("margin-left","");
$("#col_flex").css("right","");
$("#footer").css("right","");
$("#user_menu").css("left","")
}TS.view.resizeManually();
TS.model.ui.is_collapsed=false;
$("html").unbind("mousemove.collapsible");
$("html").unbind("click.collapsible");
$("html").unbind("click.collapsed_col");
$("#col_channels_collapse_view").unbind("click.collapsible");
TS.client.ui.$msgs_scroller_div.unbind("click.collapsible")
},makeChanColCollapsible:function(){TS.model.ui.debug_channel_lists=TS.qs_args.debug_channel_lists=="1";
if(TS.model.ui.is_collapsible){return
}TS.model.ui.is_collapsible=true;
$("body").addClass("collapsible");
if($("#col_channels_collapse_view").length===0){$("#col_channels_bg").parent().prepend('				<div id="col_channels_collapse_view" class="channels_list_holder">					<div class="section_holder starred_section"><h2>starred</h2><ul id="starred-list-collapsed"></ul></div>					<div class="section_holder"><h2>channels</h2><ul id="channel-list-collapsed"></ul><div class="clear_both"></div></div>					<div class="section_holder" id="direct_messages_collapsed"><h2>dms</h2><ul id="im-list-collapsed"></ul><div class="clear_both"></div><a id="im_list_collapsed_more" class="list_more hidden">X</a></div>					<div class="section_holder"><h2>groups</h2><ul id="group-list-collapsed"></ul></div>				</div>			');
$("#col_channels_collapse_view").bind("click.collapsed_col",TS.client.ui.onCollapseClick)
}$("#channel_header").css("margin-left",10);
TS.client.channel_pane.rebuildChannelList();
TS.client.channel_pane.rebuildImList();
TS.client.channel_pane.rebuildGroupList();
TS.client.channel_pane.rebuildStarredList();
TS.view.resizeManually();
TS.client.ui.onChannelsScroll();
TS.model.ui.is_collapsed=true
},onCollapsibleBodyClick:function(i){if(!TS.model.ui.is_collapsible){return
}if(!TS.model.prefs.collapsible_by_click){return
}var h=$(i.target);
if(!h.hasClass("day_divider")&&!h.hasClass("message")&&h.attr("id")!="msgs_div"){return
}if(TS.model.ui.is_collapsed){if(i.pageX<10||i.pageX>90){return
}i.preventDefault();
TS.client.ui.expandChanCol()
}else{if(i.pageX<220||i.pageX>300){return
}i.preventDefault();
TS.client.ui.collapseChanCol()
}},onCollapseClick:function(h){h.preventDefault();
if(!TS.model.ui.is_collapsible){return
}if(!TS.model.prefs.collapsible_by_click){return
}if(!TS.model.ui.is_collapsed){return
}TS.client.ui.expandChanCol()
},collapseChanCol:function(){if(!TS.model.ui.is_collapsible){return
}if(TS.model.ui.is_collapsed){return
}TS.model.ui.was_just_collapsed=true;
setTimeout(function(){TS.model.ui.was_just_collapsed=false;
$("html").trigger("mousemove.collapsible")
},500);
TS.model.ui.is_collapsed=true;
if(TS.model.ui.collapse_moves_whole){$("#channel_header").transition({"margin-left":10},TS.model.ui.collapsible_ms);
$("body, #footer").transition({"margin-left":0},TS.model.ui.collapsible_ms,function(){});
$("#col_flex").transition({right:0},TS.model.ui.collapsible_ms);
$("#footer").css("right","");
$("#user_menu").transition({left:-220},TS.model.ui.collapsible_ms);
$("#col_channels_collapse_view").transition({left:-220,opacity:1},TS.model.ui.collapsible_ms,function(){$("#col_channels_collapse_view").css("z-index",149)
})
}else{$("#team_menu, #user_menu, #col_channels_bg, #col_channels, #col_channels_collapse_view").transition({left:-220,opacity:0},TS.model.ui.collapsible_ms)
}},expandChanCol:function(){if(!TS.model.ui.is_collapsible){return
}if(!TS.model.ui.is_collapsed){return
}TS.model.ui.is_collapsed=false;
if(TS.model.ui.collapse_moves_whole){$("#channel_header").transition({"margin-left":0},TS.model.ui.collapsible_ms);
$("body, #footer").transition({"margin-left":220},TS.model.ui.collapsible_ms,function(){});
$("#col_flex").transition({right:-220},TS.model.ui.collapsible_ms);
var h=parseInt($("#footer").css("right"));
$("#footer").transition({right:h-220},0);
$("#user_menu").transition({left:0},TS.model.ui.collapsible_ms);
$("#col_channels_collapse_view").css("z-index",99);
if(TS.model.ui.debug_channel_lists){$("#col_channels_collapse_view").transition({left:1,opacity:1},TS.model.ui.collapsible_ms)
}else{$("#col_channels_collapse_view").transition({left:-230,opacity:1},TS.model.ui.collapsible_ms)
}}else{$("#team_menu, #user_menu, #col_channels_bg, #col_channels, #col_channels_collapse_view").transition({left:0,opacity:1},TS.model.ui.collapsible_ms)
}},tryToJump:function(w,r,v,p,m){var s;
var u;
var q=TS.channels.getChannelById(w);
if(!q){s=TS.ims.getImById(w)
}if(!q&&!s){u=TS.groups.getGroupById(w)
}if(!q&&!s&&!u){TS.error("NO CHANNEL NO IM GROUP");
return false
}if(q&&!q.is_member&&!TS.model.prefs.temp_archive_viewer){TS.warn("Unable to jump to message: you are not a member of this channel.");
if(m){alert("You are not a member of this channel... join first!")
}return false
}var h=q||s||u;
var l=TS.utility.msgs.getMsg(r,h.msgs);
function i(){l=TS.utility.msgs.getMsg(r,h.msgs);
if(l){TS.generic_dialog.cancel();
setTimeout(function(){TS.view.displayMsgInModelOb(q||u||s,r)
},500)
}else{if(h.msgs.length>10000){if((q||u)&&v){TS.generic_dialog.start({title:"We tried!",body:"<p>We loaded "+TS.utility.numberWithCommas(h.msgs.length)+" messages and didn't find that one. It is probably best if you just view the message in the archives.</p>",show_cancel_button:false,show_go_button:true,on_go:j})
}else{TS.generic_dialog.start({title:"We tried!",body:"<p>We loaded "+TS.utility.numberWithCommas(h.msgs.length)+" of messages and didn't find that one. Sorry!</p>",show_cancel_button:false,show_go_button:true,on_go:j})
}}else{setTimeout(t,200)
}}}function k(){if(s){TS.ims.history_fetched_sig.remove(i)
}if(q){TS.channels.history_fetched_sig.remove(i)
}if(u){TS.groups.history_fetched_sig.remove(i)
}}function j(){k();
if(s){TS.ims.startImById(s.id);
return
}if(!l&&(q||u)&&v){TS.utility.openInNewTab(v,p)
}}function t(){if(!TS.generic_dialog.is_showing){if((q||u)&&v){TS.generic_dialog.start({title:"Loading history to find message...",body:"<p>If you'd rather just view the message in the archives in a new window, you can hit the cancel button below!</p>",show_go_button:false,on_cancel:j,show_throbber:true})
}else{TS.generic_dialog.start({title:"Loading history to find message...",body:"<p>You can cancel at any time with the cancel button below</p>",show_go_button:false,on_cancel:j,show_throbber:true})
}}if(q){if(TS.channels.maybeLoadHistory(q.id)){TS.info("trying to find message by loading history...");
TS.channels.history_fetched_sig.remove(i);
TS.channels.history_fetched_sig.addOnce(i)
}else{alert("Unable to jump to message: could not find message!")
}}else{if(u){if(TS.groups.maybeLoadHistory(u.id)){TS.info("trying to find message by loading history...");
TS.groups.history_fetched_sig.remove(i);
TS.groups.history_fetched_sig.addOnce(i)
}else{alert("Unable to jump to message: could not find message!")
}}else{if(TS.ims.maybeLoadHistory(s.id)){TS.info("trying to find message by loading history...");
TS.ims.history_fetched_sig.remove(i);
TS.ims.history_fetched_sig.addOnce(i)
}else{alert("Unable to jump to message: could not find message!")
}}}}if(l||TS.model.prefs.temp_archive_viewer){TS.view.displayMsgInModelOb(q||u||s,r);
return true
}if(!m){return false
}var o=false;
if(o){if(q||u){TS.generic_dialog.start({title:"Show the message here?",body:"<p>That's an old message! I can try and find it in history to show it to you here, or you can view it in another window in the message archives.</p>",show_go_button:true,show_cancel_button:true,go_button_text:"Find it!",cancel_button_text:"Just show me the archives",on_go:t,on_cancel:j})
}else{TS.generic_dialog.start({title:"Show the message here?",body:"<p>That's an old message! I can try and find it in history to show it to you here, if you like.</p>",show_go_button:true,show_cancel_button:true,go_button_text:"Find it!",cancel_button_text:"No Thanks",on_go:t})
}}else{t()
}return true
},sendChannelMsgThroughSlackBot:function(r,k,l,p){var h=TS.channels.getChannelById(r);
if(!h){return
}var q=l.split(",");
if(!q.length){return
}var j=TS.utility.msgs.getMsg(k,h.msgs);
var o="";
for(var m=0;
m<q.length;
m++){if(m!==0){if(m==q.length-1){if(q.length>2){o+=","
}o+=" and "
}else{o+=", "
}}o+="<b>"+TS.members.getMemberDisplayName(TS.members.getMemberById(q[m]),true)+"</b>"
}TS.generic_dialog.start({title:"Send message to users not in #"+h.name+"",body:"<p>Would you like to have slackbot send "+o+" your message?</p>"+TS.templates.builders.buildMsgHTML({msg:j,model_ob:h,standalone:true}),go_button_text:"Yes, send it",on_go:function(){for(var s=0;
s<q.length;
s++){TS.api.call("chat.sendMention",{channel:r,user:q[s],ts:j.ts})
}if(p){if(r.charAt(0)==="C"){TS.channels.removeMsg(r,TS.utility.msgs.getMsg(p,h.msgs))
}else{if(r.charAt(0)==="G"){TS.groups.removeMsg(r,TS.utility.msgs.getMsg(p,h.msgs))
}}}}})
},promptForGroupOrChannelInvite:function(l,k,m){var h=TS.groups.getGroupById(l)||TS.channels.getChannelById(l);
if(!h){return
}var p=k.split(",");
if(!p.length){return
}if(h.is_group){TS.ui.invite.showInviteMembersPreSelected(l,p,m);
return
}var o="";
for(var j=0;
j<p.length;
j++){if(j!==0){if(j==p.length-1){if(p.length>2){o+=","
}o+=" and "
}else{o+=", "
}}o+="<b>"+TS.members.getMemberDisplayName(TS.members.getMemberById(p[j]),true)+"</b>"
}TS.generic_dialog.start({title:"Invite new members to #"+h.name+"",body:"<p>Would you like to invite "+o+" to #"+h.name+"?</p>",go_button_text:"Yes, invite them",on_go:function(){for(var q=0;
q<p.length;
q++){TS.api.call("channels.invite",{channel:l,user:p[q]})
}if(m){TS.channels.removeMsg(l,TS.utility.msgs.getMsg(m,h.msgs))
}}})
},addEphemeralBotMsg:function(h){var i=h.channel||TS.shared.getActiveModelOb().id;
var l=h.text;
if(!l){return
}var k;
if(h.username){k={type:"message",subtype:"bot_message",icons:h.icons||null,is_ephemeral:true,username:h.username,ts:h.ts,text:l}
}else{k={type:"message",user:"USLACKBOT",is_ephemeral:true,ts:h.ts,text:l}
}var j=d(i,k,h.ephemeral_type);
TS.info(j)
},addOrFlashEphemeralBotMsg:function(k){var l=k.channel||TS.shared.getActiveModelOb().id;
var j=k.ephemeral_type;
var m=(j)?TS.utility.msgs.getEphemeralMsgsByCidAndType(l,j):null;
if(m&&m.length){var i=TS.shared.getActiveModelOb();
var h=m[0];
h.text=k.text;
if(i.is_im){TS.ims.message_changed_sig.dispatch(i,h)
}else{if(i.is_channel){TS.channels.message_changed_sig.dispatch(i,h)
}else{if(i.is_group){TS.groups.message_changed_sig.dispatch(i,h)
}}}}else{TS.client.ui.addEphemeralBotMsg(k)
}}});
var d=function(j,k,h){k.ts=k.ts||TS.utility.date.makeTsStamp();
var i=TS.utility.msgs.processImsg(k);
if(j.charAt(0)==="C"){TS.channels.addMsg(j,i)
}else{if(j.charAt(0)==="G"){TS.groups.addMsg(j,i)
}else{TS.ims.addMsg(j,i)
}}TS.utility.msgs.ephemeral_msgs_map[k.ts]={c_id:j,ephemeral_type:h};
return k.ts
};
var b=function(){TS.model.client.last_user_active_timestamp=new Date()
};
var a=false;
var g=function(h){if(TS.model.ui_state.flex_visible&&TS.model.ui_state.flex_name===h){TS.client.ui.hideFlex()
}else{TS.client.ui.openFlexTab(h)
}};
var c=function(){var i=TS.model.ui_state.flex_visible;
var h=TS.model.ui_state.flex_name;
$(".flexpane_toggle_button.active").removeClass("active");
$("#details_toggle").removeClass("backgrounded");
$("#client-ui").removeClass("details_showing");
if(!i){return
}if(h==="details"){$("#details_toggle").addClass("active");
$("#client-ui").addClass("details_showing")
}else{if(h==="mentions"){$("#recent_mentions_toggle").addClass("active")
}else{if(h==="stars"){$("#stars_toggle").addClass("active")
}}}if(a&&h&&h!=="details"){$("#details_toggle").addClass("backgrounded active")
}};
var f=function(h){if(h.id!=TS.model.active_cid){return
}TS.client.msg_pane.displayTitle();
TS.client.msg_pane.rebuildChannelMembersList()
};
var e=function(){var h=TS.shared.getActiveModelOb();
var k=$("#details_toggle");
k.toggleClass("hidden",!!h.is_im);
if(h.is_im){return
}if(h.is_channel){k.attr("title","Show Channel Details")
}else{k.attr("title","Show Group Details")
}var j=0;
var p;
for(var l=0;
l<h.members.length;
l++){p=TS.members.getMemberById(h.members[l]);
if(p&&!p.deleted){j++
}}var m=h.pinned_items?h.pinned_items.length:0;
var o=m===0?"no_pinned_items":"";
k.html(TS.templates.channel_page_toggle({pin_class:o,pin_count:m,member_count:j}))
}
})();
(function(){TS.registerModule("client.channel_pane",{onStart:function(){},rebuildStarredList:function(){var h=TS.channels.getChannelsForUser();
var d=TS.model.groups;
var p=TS.model.ims;
var b=[];
var f;
var j;
var o;
var m;
var e;
for(f=0;
f<h.length;
f++){j=h[f];
if(!j.is_starred){continue
}var q=(TS.model.archive_view_is_showing&&TS.client.archives.current_model_ob.id==j.id);
if(j.is_member||j.was_archived_this_session||q){b.push(j)
}}for(f=0;
f<d.length;
f++){o=d[f];
if(!o.is_starred){continue
}if(!o.is_open&&!o.unread_cnt){continue
}if(o.is_archived&&!o.was_archived_this_session){continue
}b.push(o)
}for(f=0;
f<p.length;
f++){m=p[f];
if(!m.is_starred){continue
}e=TS.members.getMemberById(m.user);
if(e.deleted){continue
}if(e.is_self){continue
}if(!m.is_open&&!m.unread_cnt){continue
}b.push(m)
}if(!b.length){$(".starred_section").addClass("hidden");
return
}b.sort(function a(i,c){var s=(i.is_im)?TS.ims.getDisplayNameOfUserForImLowerCase(i):i._name_lc;
var u=(c.is_im)?TS.ims.getDisplayNameOfUserForImLowerCase(c):c._name_lc;
var r=(!i.is_im&&TS.notifs.isCorGMuted(i.id))?"Z":"";
var t=(!c.is_im&&TS.notifs.isCorGMuted(c.id))?"Z":"";
if(i.is_channel){s=r+"A"+s
}else{if(i.is_im){s=r+"B"+s
}else{s=r+"C"+s
}}if(c.is_channel){u=t+"A"+u
}else{if(c.is_im){u=t+"B"+u
}else{u=t+"C"+u
}}if(s<u){return -1
}if(s>u){return 1
}return 0
});
$(".starred_section").removeClass("hidden");
$("#starred-list").text(b.length);
var g="";
var k;
for(f=0;
f<b.length;
f++){k=b[f];
if(k.is_channel){g+=TS.templates.channel(k)
}else{if(k.is_group){g+=TS.templates.group({group:k,show_symbol:true})
}else{var l={member:TS.members.getMemberById(k.user),im:k,color_names:false,show_close_link:true||!k.is_slackbot_im};
g+=TS.templates.member(l)
}}}$("#starred-list").html(g);
if(TS.model.ui.is_collapsible){$("#starred-list-collapsed").html(g)
}TS.client.ui.updateClosestMonkeyScroller($("#starred-list"))
},dupe_starred:false,rebuildChannelList:function(){var b=TS.channels.getChannelsForUser();
var e;
var a=0;
var g=[];
b.sort(function f(k,j){var i=TS.notifs.isCorGMuted(k.id);
var l=TS.notifs.isCorGMuted(j.id);
if(i!=l){if(i){return 1
}if(l){return -1
}}var m=k._name_lc;
var o=j._name_lc;
if(m<o){return -1
}if(m>o){return 1
}return 0
});
for(var d=0;
d<b.length;
d++){e=b[d];
var h=(TS.model.archive_view_is_showing&&TS.client.archives.current_model_ob.id==e.id);
if(!e.is_member&&!e.is_archived&&!h){a++
}if(e.is_starred&&!TS.view.dupe_starred){continue
}if(e.is_member||e.was_archived_this_session||h){g.push(e)
}}if(TS.model.user.is_restricted&&!g.length){$("#channels").addClass("hidden");
return
}$("#channels").removeClass("hidden");
if(!TS.model.user.is_restricted){$("#channels_header").unbind("click.open_dialog_or_menu").bind("click.open_dialog_or_menu",function(i){if(TS.tips.maybeDoThrobberProxyClick("channels_tip_card_throbber",i)){return false
}TS.ui.list_browser_dialog.start("channels")
})
}var c=TS.templates.channel_list({channels:g,non_member_cnt:a,user:TS.model.user});
$("#channel-list").html(c);
if(TS.model.ui.is_collapsible){$("#channel-list-collapsed").html(c)
}TS.client.ui.updateClosestMonkeyScroller($("#channel-list"));
$("#col_channels_collapse_view").html($("#col_channels_collapse_view").html());
TS.client.ui.checkUnseenChannelsImsGroupsWithUnreads()
},rebuildGroupList:function(){var e="";
var d=TS.model.groups;
if(!TS.members.canUserCreateGroups()&&!TS.groups.getUnarchivedGroups().length){$("#groups").addClass("hidden");
return
}$("#groups").removeClass("hidden");
var j=function a(l,k){var c=TS.notifs.isCorGMuted(l.id);
var m=TS.notifs.isCorGMuted(k.id);
if(c!=m){if(c){return 1
}if(m){return -1
}}var o=l._name_lc;
var p=k._name_lc;
if(o<p){return -1
}if(o>p){return 1
}return 0
};
d.sort(j);
var f=0;
var g=0;
$.each(d,function(c,k){if(!k.is_open&&!k.unread_cnt){return
}if(k.is_archived){g++
}if(k.is_archived&&!k.was_archived_this_session){return
}f++;
if(k.is_starred&&!TS.view.dupe_starred){return
}e+=TS.templates.group({group:k})
});
$("#group-list").html(e);
if(TS.model.ui.is_collapsible){$("#group-list-collapsed").html(e)
}TS.client.ui.updateClosestMonkeyScroller($("#group-list"));
var h=TS.groups.getUnarchivedClosedGroups().length;
var i=function(c){TS.menu.startWithGroups(c)
};
var b=i;
if(h){if(f){$("#group_list_more").text("+"+h+" more...")
}else{$("#group_list_more").text("Open a group...")
}}else{if(g){$("#group_list_more").text("More...")
}else{if(TS.members.canUserCreateGroups()){$("#group_list_more").text("New private group...");
b=function(c){TS.ui.group_create_dialog.start()
}
}else{$("#group_list_more").text("")
}}}$("#groups_header").unbind("click.open_dialog_or_menu").bind("click.open_dialog_or_menu",i);
$("#group_list_more").unbind("click.open_dialog_or_menu").bind("click.open_dialog_or_menu",b);
TS.client.ui.checkUnseenChannelsImsGroupsWithUnreads()
},rebuildImList:function(){var e="";
var b=TS.members.getMembersForUser();
var a;
var d=true;
b.sort(function f(i,c){if(i.is_slackbot){return -1
}if(c.is_slackbot){return 1
}var j=TS.members.getMemberDisplayNameLowerCase(i);
var k=TS.members.getMemberDisplayNameLowerCase(c);
if(j<k){return -1
}if(j>k){return 1
}return 0
});
var h=0;
var g=0;
$.each(b,function(c,k){if(k.deleted){return
}if(k.is_self){return
}a=TS.ims.getImByMemberId(k.id);
if(!a||(!a.is_open&&!a.unread_cnt)){g++;
return
}h++;
if(a.is_starred&&!TS.view.dupe_starred){return
}var j={member:k,im:a,color_names:false,show_close_link:true||!a.is_slackbot_im};
e+=TS.templates.member(j)
});
$("#im-list").html(e);
if(TS.model.ui.is_collapsible){$("#im-list-collapsed").html(e)
}TS.client.ui.updateClosestMonkeyScroller($("#im-list"));
d=g;
if(d){$("#im_list_more, #im_list_collapsed_more").removeClass("hidden");
if(h){$("#im_list_more").text("+"+g+" More...")
}else{$("#im_list_more").text("Send a direct message...")
}}else{$("#im_list_more, #im_list_collapsed_more").addClass("hidden")
}$("#im_list_more").unbind("click.open_dialog").bind("click.open_dialog",function(c){if(!TS.model.ms_connected&&!TS.model.change_channels_when_offline){TS.sounds.play("beep");
return
}TS.menu.startWithMembers(c)
});
$("#direct_messages_header").unbind("click.open_dialog").bind("click.open_dialog",function(c){if(!TS.model.ms_connected&&!TS.model.change_channels_when_offline){TS.sounds.play("beep");
return
}TS.menu.startWithMembers(c)
});
TS.client.ui.checkUnseenChannelsImsGroupsWithUnreads()
},makeSureActiveChannelIsInView:function(){var a=$("#starred-list").find("li.active");
if(!a.length){a=$("#channel-list").find("li.active")
}if(!a.length){a=$("#im-list").find("li.active")
}if(!a.length){a=$("#group-list").find("li.active")
}a.scrollintoview({offset:"top",px_offset:50})
}})
})();
(function(){TS.registerModule("client.flex_pane",{onStart:function(){},startLocalTimeInterval:function(){clearInterval(a);
a=setInterval(c,60000);
c()
},stopLocalTimeInterval:function(){clearInterval(a)
}});
var a;
var c=function(){TS.utility.throttle.method(b,"view_tz_labels",1000)
};
var b=function(){var l,i,h,j,k,e,d,g,f;
f=-28000;
i=new Date();
h=i.getTime();
e=$(".timezone_label");
d=[];
e.each(function(m,o){o=$(o);
j=TS.members.getMemberById(o.data("member-id"));
if(!j){d.push("");
return
}if(typeof j.tz_offset!="undefined"){g=j.tz_offset
}else{g=f
}l=(TS.model.user.tz_offset-g)/60/60;
k=h-(l*60*60*1000);
d.push(TS.utility.date.toTime(k/1000,true));
j=null;
o=null
});
e.each(function(m,o){o=$(o);
o.find(".timezone_value").text(d[m]);
o=null
});
e=null
}
})();
(function(){TS.registerModule("client.msg_pane",{last_render_time:null,last_rendered_msg:null,last_in_stream_msg:null,dont_check_unreads_til_switch:false,date_change_timer:null,onStart:function(){TS.client.msg_pane.initDateChange()
},initDateChange:function(){var h=15;
if(!TS.client.msg_pane.date_change_timer){TS.client.msg_pane.date_change_timer=window.setInterval(function(){TS.utility.throttle.method(TS.client.msg_pane.checkForDateChange,"date_change_check",1000)
},1000*60*h)
}},checkForDateChange:function(){if(TS.model&&TS.model.active_cid&&TS.client.msg_pane.last_render_time&&TS.client.msg_pane.last_render_time.getDay()!==new Date().getDay()){TS.client.msg_pane.rebuildMsgs()
}},rebuildChannelMembersList:function(){var q=TS.channels.getChannelById(TS.model.active_channel_id);
if(!q){q=TS.groups.getGroupById(TS.model.active_group_id)
}if(q){TS.client.ui.rebuildMemberListToggle();
var j=[];
var p=[];
var r=[];
var h=[];
var o=[];
var k;
var l;
if(boot_data.feature_bot_users){for(l=0;
l<q.members.length;
l++){k=TS.members.getMemberById(q.members[l]);
if(k&&!k.deleted){if(k.is_bot||k.is_slackbot){if(k.presence&&k.presence!=="away"){o.push(k)
}else{h.push(k)
}}else{if(k.presence&&k.presence!=="away"){r.push(k)
}else{p.push(k)
}}}}}else{for(l=0;
l<q.members.length;
l++){k=TS.members.getMemberById(q.members[l]);
if(k&&!k.deleted){j.push(k)
}}}o.sort(TS.members.memberSorterByActive);
h.sort(TS.members.memberSorterByActive);
r.sort(TS.members.memberSorterByActive);
p.sort(TS.members.memberSorterByActive);
j=j.concat(r).concat(o).concat(p).concat(h);
var m=TS.templates.channel_members_list({channel:q,members:j,current_user_id:TS.model.user.id,color_names:TS.model.prefs.color_names_in_list});
$("#members_scroller").html(m);
TS.client.ui.updateClosestMonkeyScroller($("#members_scroller"));
if(q.id!=c){$("#members_scroller").scrollTop(0)
}c=q.id
}},rebuildMsgs:function(){TS.log(5,"rebuilding msgs for "+(TS.model.active_cid));
TS.model.ui.msgs_are_auto_scrolling=false;
TS.client.msg_pane.clearUnreadDivider();
var s;
var q=-1;
var j=TS.shared.getActiveModelOb();
var o="";
if(!j){TS.error("rebuildMsgs no channel, no im, no group");
return
}TS.client.msg_pane.last_render_time=new Date();
TS.client.msg_pane.last_rendered_msg=null;
TS.client.msg_pane.last_in_stream_msg=null;
q=j.scroll_top;
s=j.msgs;
var k;
var v;
$.each(f,function(i,w){if(w){if(w.edited&&w.edited.tooltip){w.edited.tooltip("destroy")
}if(w.timestamp&&w.timestamp.tooltip){w.timestamp.tooltip("destroy")
}}});
TS.client.ui.$msgs_div.empty();
f={};
if(j._cached_html){TS.info("using _cached_html");
o=j._cached_html;
j._cached_html=null
}else{if(!s){o="-"
}else{if(!s.length){o=""
}var u=[];
var p=0;
for(var m=s.length-1;
m>-1;
m--){if(!k||!k.no_display){v=k
}k=s[m];
var h=TS.utility.msgs.msgRollUpWorker(m,k,s,u);
if(h=="continue"){k=v;
continue
}else{if(h=="swap"){k=u[0];
u.length=0
}}p++;
o+=TS.templates.builders.buildMsgHTML({msg:k,model_ob:j,prev_msg:v,container_id:"msgs_div",enable_slack_action_links:true});
if(!k.rsp_id){TS.client.msg_pane.last_in_stream_msg=k;
if(!k.no_display){TS.client.msg_pane.last_rendered_msg=k
}}}if(s.length&&p<20){TS.client.ui.doLoadScrollBackHistory(true)
}}}TS.client.ui.$msgs_div.html(o);
var l={show:450,hide:150};
function r(y,i,w){var x;
if(!y||!i||!w){return
}x=window.setTimeout(function(){if(f&&f[y]&&f[y][w]&&f[y][w].tooltip){f[y][w].tooltip("show")
}x=null
},l.show);
i.one("mouseout",function(){if(x){window.clearTimeout(x);
x=null
}})
}function t(){var i,w,x;
w=$(this);
i=w.parents(".message");
x=i.attr("id");
if(x&&!f[x]){f[x]={edited:i.find(".edited").tooltip({container:"body"}),timestamp:i.find(".timestamp").tooltip({delay:l,container:"body"})};
if(w.hasClass("edited")){f[x].edited.tooltip("show")
}else{if(w.hasClass("timestamp")){r(x,w,"timestamp")
}}}w=null;
i=null;
x=null
}TS.client.ui.$msgs_div.undelegate(".message .edited","mouseover");
TS.client.ui.$msgs_div.undelegate(".message .timestamp","mouseover");
TS.client.ui.$msgs_div.delegate(".message .edited","mouseover",t);
TS.client.ui.$msgs_div.delegate(".message .timestamp","mouseover",t);
TS.utility.makeSureAllLinksHaveTargets(TS.client.ui.$msgs_div);
TS.client.msg_pane.assignLastReadMsgDiv(j);
TS.client.msg_pane.insertUnreadDivider();
TS.client.msg_pane.updateEndMarker();
TS.client.msg_pane.padOutMsgsScroller();
if(q==-1||q===undefined||(TS.model.prefs.start_scroll_at_oldest&&j.unread_cnt)){TS.client.ui.instaScrollMsgsToBottom(false);
if(TS.model.prefs.start_scroll_at_oldest){TS.client.ui.scrollMsgsSoFirstUnreadMsgIsInView()
}}else{TS.client.ui.instaScrollMsgsToPosition(q,false)
}TS.client.ui.checkInlineImgsAndIframes("main")
},displayTitle:function(){var l="";
var p=$("#active_channel_name");
var h;
p.tooltip("disable").tooltip("destroy");
if(TS.model.active_im_id){var q=TS.ims.getImById(TS.model.active_im_id);
var k=TS.members.getMemberById(q.user);
if(q){l=TS.templates.builders.buildStar("im",q)+'<span class="name"><span class="prefix">@</span>'+q.name+TS.templates.makeMemberPresenceIcon(k)+"</span>"
}}else{if(TS.model.active_channel_id||TS.model.active_group_id){h=TS.shared.getActiveModelOb();
var m=TS.notifs.isCorGMuted(h.id);
if(h){var i="";
if(m){if(TS.model.is_safari_desktop){i='<i class="fa fa-bell-slash muted_icon" style="margin-top: -6px;"></i> '
}else{i='<i class="fa fa-bell-slash muted_icon"></i> '
}}var j=m?"muted":"";
if(TS.model.active_channel_id){l=TS.templates.builders.buildStar("channel",h);
l+='<span class="name '+j+'"><span class="prefix">'+i+"#</span>"+h.name+"</span><i id='channel_actions' class='fa fa-chevron-down'></i>"
}else{l=TS.templates.builders.buildStar("group",h);
l+='<span class="name '+j+'"><span class="prefix">'+i+TS.model.group_prefix+"</span>"+h.name+"</span><i id='group_actions' class='fa fa-chevron-down'></i>"
}if(h.topic&&h.topic.value){l+='<span class="topic">'+TS.utility.formatTopicOrPurpose(h.topic.value)+"</span>"
}}}}p.html(l);
if(h&&h.topic&&h.topic.value&&h.topic.value.length>50){p.attr("title",TS.utility.emojiReplace(TS.utility.linkify(h.topic.value,TS.templates.builders.newWindowName(),true)));
p.tooltip({placement:"bottom",html:true,delay:{show:1000,hide:1500},container:"body"});
var o=p.find(".topic");
p.hover(function(){setTimeout(function(){var r=$(".tooltip").outerWidth();
var s=parseInt(o.position().left)+(o.outerWidth()/2)-(r/2);
var t=p.position().left+p.outerWidth();
if(s>t){s=t-(r/2)
}$(".tooltip").css({top:parseInt($(".tooltip").css("top"))-15+"px",left:s+"px"})
},1000)
},function(){})
}TS.utility.makeSureAllLinksHaveTargets(p);
if(TS.model.active_channel_id){$("#active_channel_name .name, #channel_actions").bind("click.channel_actions",function(r){if(TS.tips.maybeDoThrobberProxyClick("channel_menu_tip_card_throbber",r)){return false
}TS.menu.startWithChannel(r,h.id)
});
$("#active_channel_name .star_channel").bind("click",function(r){TS.stars.checkForStarClick(r)
})
}else{if(TS.model.active_group_id){$("#active_channel_name .name, #group_actions").bind("click.channel_actions",function(r){TS.menu.startWithGroup(r,h.id)
});
$("#active_channel_name .star_group").bind("click",function(r){TS.stars.checkForStarClick(r)
})
}else{if(TS.model.active_im_id){$("#active_channel_name .name, #channel_actions").bind("click.channel_actions",function(r){if(q){TS.menu.startWithMember(r,q.user,false,false,true)
}});
$("#active_channel_name .star_im").bind("click",function(r){TS.stars.checkForStarClick(r)
})
}}}},clearUnreadDivider:function(){if(!TS.client.ui.$msgs_unread_divider){return
}TS.client.ui.$msgs_unread_divider.remove();
TS.client.ui.$msgs_unread_divider=null;
TS.client.msg_pane.hideNewMsgsBar()
},assignLastReadMsgDiv:function(h){var j;
if(!h){return
}if(!h.msgs.length){return
}j=TS.utility.msgs.getMsg(h.last_read,h.msgs);
if(j&&!j.no_display){g=TS.client.msg_pane.getDivForMsg(h.last_read);
return
}var i=TS.utility.msgs.getOldestValidTs(h.msgs);
if(h.last_read>i){j=TS.utility.msgs.getDisplayedMsgBeforeTS(h.last_read,h.msgs);
if(j){TS.info(j.ts+" from TS.utility.msgs.getDisplayedMsgBeforeTS("+h.last_read+") "+j.ts+" < "+h.last_read+" = "+(j.ts<h.last_read));
g=TS.client.msg_pane.getDivForMsg(j.ts)
}else{g=null;
TS.error("WTF nulling out _$last_read_msg_div because we could not find a message to use #1")
}}else{g=null
}},insertUnreadDivider:function(){if(!TS.client.ui.$msgs_unread_divider){var i=TS.shared.getActiveModelOb();
if(!i){TS.error("insertUnreadDivider no channel, no im, no group");
return
}if(TS.client.msg_pane.last_in_stream_msg&&i.last_read<TS.client.msg_pane.last_in_stream_msg.ts&&i.unread_cnt){var h=TS.templates.messages_unread_divider(i.last_read);
if(g&&g.length){g.after(h)
}else{var l=TS.utility.msgs.getOldestValidTs(i.msgs);
if(i.last_read>l){var j=TS.utility.msgs.getDisplayedMsgAfterTS(i.last_read,i.msgs);
var k;
if(j){k=TS.client.msg_pane.getDivForMsg(j.ts)
}if(k&&k.length){k.before(h)
}else{TS.client.ui.$msgs_div.find(".message").last().before(h)
}}else{TS.client.ui.$msgs_div.find(".message").first().before(h)
}}TS.client.ui.$msgs_unread_divider=$("#msgs_unread_divider");
TS.client.ui.$msgs_unread_divider.data("last_read_ts",i.last_read);
$(".unread_divider").removeClass("no_unreads");
e();
if(TS.client.ui.isUnreadDividerInView()){TS.client.msg_pane.hideNewMsgsJumpLink();
$("#messages_unread_status").addClass("quiet")
}else{TS.client.msg_pane.showNewMsgsJumpLink();
$("#messages_unread_status").removeClass("quiet")
}TS.client.msg_pane.showNewMsgsBar();
TS.client.msg_pane.startNewMsgsTimer()
}}e()
},updateEndMarker:function(){var j=TS.shared.getActiveModelOb();
if(!j){TS.error("updateEndMarker no channel, no im, no group");
return
}var k=$("#end_display_meta");
var o=$("#end_display_status");
var u=$("#end_display_welcome");
var i="";
var t=false;
var h=false;
var p;
if(j.history_is_being_fetched){i="Retrieving history..."
}else{p=TS.utility.msgs.getOlderMsgsStatus(j);
if(TS.qs_args.test_is_limited==1&&!p.more){p.is_limited=true
}if(p.more){if(!TS.model.prefs.seen_welcome_2&&j.id==TS.model.welcome_model_ob.id){h=true
}else{i='<a onclick="TS.client.ui.doLoadScrollBackHistory(true)">And more...</a>'
}}else{if(TS.newxp.shouldShowFirstWelcome()){h=true
}else{t=true
}}}if(h){u.removeClass("hidden");
if(j.id==TS.model.welcome_model_ob.id){$("#end_display_welcome_general_div").removeClass("hidden");
if(!TS.model.prefs.seen_welcome_2){TS.view.adjustForWelcomeSlideShow()
}}else{$("#end_display_welcome_general_div").addClass("hidden")
}if(TS.model.user.is_admin){$(".admin_only").removeClass("hidden");
$("#welcome_start_ways").removeClass("hidden");
$(".start_tip").tooltip();
TS.newxp.updateStartChecks()
}}else{u.addClass("hidden")
}if(t){k.removeClass("hidden");
if(j.is_channel||j.is_group){var m=TS.utility.date.toCalendarDateOrNamedDay(j.created);
var s="";
if($.trim(m.toLowerCase())=="yesterday"||$.trim(m.toLowerCase())=="today"){m=$.trim(m.toLowerCase())
}else{s="on "
}var l=TS.members.getMemberById(j.creator);
if(j.is_channel){$("#channel_meta").removeClass("hidden");
$("#group_meta").addClass("hidden");
$("#im_meta").addClass("hidden");
$("#slackbot_meta").addClass("hidden");
$(".channel_meta_name").html(TS.templates.builders.makeChannelLink(j));
$(".channel_meta_name").find("a").bind("click",function(v){v.preventDefault();
TS.menu.startWithChannel(v,$(v.target).data("channel-id"))
});
if(l&&l.is_self){$("#channel_creator_name").html("you created")
}else{$("#channel_creator_name").html("was created by "+(l?TS.templates.builders.makeMemberPreviewLink(l):"unknown"))
}$("#channel_create_date").html(s+m);
if(j.name=="random"){$("#channel_meta_random_info").removeClass("hidden");
$("#channel_meta_others_info").addClass("hidden")
}else{$("#channel_meta_random_info").addClass("hidden");
$("#channel_meta_others_info").removeClass("hidden");
if(j.purpose.value){$("#channel_meta_purpose_container").removeClass("hidden");
$("#channel_meta_purpose").html(TS.utility.formatTopicOrPurpose(j.purpose.value));
$("#channel_meta_purpose_prompt").addClass("hidden");
$(".end_action_purpose").closest("li").addClass("hidden")
}else{$("#channel_meta_purpose_container").addClass("hidden");
$(".end_action_purpose").closest("li").removeClass("hidden")
}}}else{if(j.is_group){$("#channel_meta").addClass("hidden");
$("#group_meta").removeClass("hidden");
$("#im_meta").addClass("hidden");
$("#slackbot_meta").addClass("hidden");
$(".group_meta_name").html(TS.templates.builders.makeGroupLink(j));
$(".group_meta_name").find("a").addClass("ocean_teal").bind("click",function(v){v.preventDefault();
TS.menu.startWithGroup(v,$(v.target).data("group-id"))
});
if(l&&l.is_self){$("#group_creator_name").html("you created")
}else{$("#group_creator_name").html("was created by "+(l?TS.templates.builders.makeMemberPreviewLink(l):"unknown"))
}$("#group_meta_archived_parent").addClass("hidden");
if(j.parent_group){var r=TS.groups.getGroupById(j.parent_group);
if(r){$("#group_meta_archived_parent").removeClass("hidden");
$("#group_meta_archived_parent_link").attr("href","/archives/"+r.name).text(r.name)
}}$("#group_create_date").html(s+m);
if(j.purpose.value){$("#group_meta_purpose_container").removeClass("hidden");
$("#group_meta_purpose").html(TS.utility.formatTopicOrPurpose(j.purpose.value));
$("#group_meta_purpose_prompt").addClass("hidden");
$(".end_action_purpose").closest("li").addClass("hidden")
}else{$("#group_meta_purpose_container").addClass("hidden");
$(".end_action_purpose").closest("li").removeClass("hidden")
}}}$(".end_action_purpose").off("click").on("click.show_purpose_dialog",function(){TS.ui.purpose_dialog.start(j.name,j)
});
$(".end_action_integration").attr("href","/services/new?channel_id="+j.id);
$(".end_action_invite").off("click").on("click.show_invite_dialog",function(){if(j.is_group){TS.ui.invite.showInviteMembersFromGroupDialog(j.id)
}else{TS.ui.invite.showInviteMembersFromChannelDialog(j.id)
}})
}else{if(j.is_slackbot_im){$("#channel_meta").addClass("hidden");
$("#group_meta").addClass("hidden");
$("#im_meta").addClass("hidden");
$("#slackbot_meta").removeClass("hidden")
}else{$("#channel_meta").addClass("hidden");
$("#group_meta").addClass("hidden");
$("#im_meta").removeClass("hidden");
$("#slackbot_meta").addClass("hidden");
var q=TS.members.getMemberById(j.user);
if(q){$("#im_meta").html(TS.templates.dm_badge({member:q,im:j,compliance_exports_enabled_for_team:!!TS.model.team.prefs.compliance_export_start,compliance_export_start:(TS.model.team.prefs.compliance_export_start||0)}))
}}}}else{k.addClass("hidden")
}if(p&&p.is_limited){$(".is_limited_copy").removeClass("hidden");
$(".not_limited_copy").addClass("hidden")
}else{$(".is_limited_copy").addClass("hidden");
$(".not_limited_copy").removeClass("hidden")
}if(i){o.removeClass("hidden");
o.html(i)
}else{o.addClass("hidden")
}$(".is_limited_div").removeClass("been_seen")
},padOutMsgsScroller:function(){var l=$("#end_div");
var i=$("#end_display_div");
var j=$("#end_display_padder");
l.css("height","");
j.css("height","");
var k=i.outerHeight();
var m=TS.client.ui.$msgs_scroller_div[0].scrollHeight-TS.client.ui.$msgs_div.outerHeight();
m-=17;
if(m>k){if(!TS.newxp.shouldShowFirstWelcome()){j.css("height",m-k)
}l.height(m)
}},clearBlueBarTimer:function(){clearTimeout(b);
b=0
},startNewMsgsTimer:function(){clearTimeout(d);
d=setTimeout(a,1500)
},showNewMsgsBar:function(){$("#messages_unread_status").fadeIn(150)
},showNewMsgsJumpLink:function(){$("#messages_unread_status").find(".new_msgs_jump_link").fadeIn(100)
},hideNewMsgsJumpLink:function(){$("#messages_unread_status").find(".new_msgs_jump_link").fadeOut(100)
},hideNewMsgsBar:function(){TS.client.msg_pane.clearBlueBarTimer();
$("#messages_unread_status").fadeOut(150)
},checkUnreads:function(){TS.client.ui.checkInlineImgsAndIframes("main");
TS.client.ui.checkScrollBack();
if(!TS.client.ui.isUserAttentionOnChat()||TS.model.archive_view_is_showing){return
}var j=TS.shared.getActiveModelOb();
if(!j){return
}if(!TS.model.prefs){return
}if(!j.unread_cnt){if(g&&g.length){TS.client.ui.markMostRecentReadMsgInActive(TS.model.marked_reasons.viewed)
}e();
return
}if(TS.client.msg_pane.dont_check_unreads_til_switch){e();
return
}var p;
var m=true;
var k=j.unreads;
var o=false;
var h=TS.notifs.isCorGMuted(j.id);
if(TS.model.prefs.mark_msgs_read_immediately){m=true
}else{if(h){m=true
}else{if(o){for(var l=0;
l<k.length;
l++){p=k[l];
if(TS.model.client.reads.indexOf(p)>-1){}else{if(TS.client.ui.isMsgInView(p)){TS.model.client.reads.push(p)
}else{var q=TS.utility.msgs.getMsg(p,j.msgs);
if(!q||q.no_display){TS.model.client.reads.push(p)
}else{m=false
}}}}}else{if(j.oldest_unread_ts){m=TS.client.ui.isMsgInView(j.oldest_unread_ts)
}}}}if(m&&((g&&g.length)||!parseInt(j.last_read)||TS.model.prefs.mark_msgs_read_immediately||h)){TS.client.ui.markMostRecentReadMsgInActive(TS.model.marked_reasons.viewed)
}e()
},getDivForMsg:function(h){return TS.client.ui.$msgs_div.find("#"+TS.templates.makeMsgDomId(h))
},getDivForArchiveMsg:function(h){return TS.client.archives.$archives_msgs_div.find("#"+TS.templates.makeMsgDomId(h))
}});
var f={};
var c;
var g;
var d;
var b;
var e=function(){if(!TS.client.ui.$msgs_unread_divider){return
}var i=TS.shared.getActiveModelOb();
if(i.unread_cnt){var k=TS.utility.msgs.getOldestValidTs(i.msgs);
var h=i.unread_cnt;
var p="";
if(i.last_read<k&&h>10){p="+";
h=Math.floor(h/10)*10
}var m;
var j=TS.client.ui.$msgs_unread_divider.data("last_read_ts");
var o=TS.utility.msgs.getDisplayedMsgAfterTS(j,i.msgs);
if(o){m=o.ts
}else{m=j
}var q=h+p+" new message"+(h==1?"":"s")+" since "+TS.utility.date.toTime(m,true);
var l=TS.utility.date.toCalendarDateOrNamedDay(m,false,true);
if($.trim(l)!=="Today"){if($.trim(l)=="Yesterday"){q+=" "+l.toLowerCase()
}else{q+=" on "+l
}}$("#new_msg_info").html(q);
TS.ui.a11y.saveUnreadCountMessage(i,q)
}};
var a=function(){var h=TS.shared.getActiveModelOb();
if(!h.unread_cnt){if(TS.model.prefs.mark_msgs_read_immediately&&!TS.model.prefs.start_scroll_at_oldest&&!b){b=setTimeout(function(){TS.client.msg_pane.hideNewMsgsBar();
$(".unread_divider").addClass("no_unreads")
},4000)
}else{TS.client.msg_pane.hideNewMsgsBar();
$(".unread_divider").addClass("no_unreads")
}}else{TS.client.msg_pane.startNewMsgsTimer()
}}
})();
(function(){TS.registerModule("key_triggers",{onStart:function(){if(TS.boot_data.special_flex_panes){for(var a in TS.boot_data.special_flex_panes){var b=TS.boot_data.special_flex_panes[a];
if(b.keycode){(function(c,d){TS.key_triggers[c.toString()]={func:function(){TS.client.ui.openFlexTab(d)
}}
})(b.keycode,b.flex_name)
}}}},"77":{isDisabled:function(a){return TS.model.is_chrome
},func:function(){TS.client.ui.openFlexTab("mentions")
}},"83":{func:function(){TS.client.ui.openFlexTab("stars")
}},"85":{isDisabled:function(a){return false
},no_shift:true,func:function(){$("#file-upload").trigger("click")
}},"69":{isDisabled:function(a){return !!TS.model.is_FF
},func:function(){TS.client.ui.openFlexTab("team")
}},"65":{func:function(){TS.client.ui.openFlexTab("activity")
}},"70":{isDisabled:function(a){return !(TS.model.is_our_app||(TS.model&&TS.model.prefs&&TS.model.prefs.f_key_search))
},no_shift:true,func:function(){TS.client.ui.openFlexTab("search");
TS.view.resizeManually("TS.key_triggers");
var a="in:"+TS.shared.getActiveModelOb().name+" ";
TS.search.setInputVal(a);
var b=TSSSB.call("readFindString");
if(b){TS.search.appendToInputAndSelect(b)
}}},"75":{isDisabled:function(a){return a.altKey||!TS.client.ui.isUserAttentionOnChat()||!TS.model||(!TS.model.is_our_app&&!TS.model.prefs.k_key_omnibox)
},no_shift:true,func:function(){TS.ui.omnibox.start()
}},"84":{isDisabled:function(a){return a.altKey||!TS.client.ui.isUserAttentionOnChat()||!TS.model||!TS.model.is_our_app
},no_shift:true,func:function(){TS.ui.omnibox.start()
}},"188":{isDisabled:function(a){if(!TS.model){true
}if(!TS.model.prefs){true
}if(!TS.model.is_mac){return true
}if(a.shiftKey){if(TS.model.active_im_id){return true
}else{return false
}}if(TS.model.mac_ssb_version){return true
}if(!TS.model.prefs.comma_key_prefs){return true
}},shift_optional:true,func:function(a){if(a.shiftKey){TS.ui.channel_prefs_dialog.start(TS.model.active_cid)
}else{TS.ui.prefs_dialog.start()
}}}})
})();
(function(){TS.registerModule("sounds",{onStart:function(){var f=TS.boot_data.new_message_sounds;
var h=TS.boot_data.alert_sounds;
var c=TS.boot_data.chat_sounds;
var d=TS.boot_data.abs_root_url;
try{var e;
var b=[];
for(e=0;
e<f.length;
e++){if(f[e].url){if(f[e].url.indexOf("http")!==0){f[e].url=d+f[e].url.replace("/","")
}TS.log(37,"adding sound: "+f[e].value);
if(!window.Audio&&!!window.winssb){a[f[e].value]={url:f[e].url}
}else{a[f[e].value]=soundManager.createSound({url:f[e].url})
}TS.log(37,"_sounds["+f[e].value+"] = "+a[f[e].value]);
b.push(f[e].url)
}}for(e=0;
e<h.length;
e++){if(h[e].url){if(h[e].url.indexOf("http")!==0){h[e].url=d+h[e].url.replace("/","")
}TS.log(37,"adding sound: "+h[e].value);
if(!window.Audio&&!!window.winssb){a[h[e].value]={url:h[e].url}
}else{a[h[e].value]=soundManager.createSound({url:h[e].url})
}TS.log(37,"_sounds["+h[e].value+"] = "+a[h[e].value]);
b.push(h[e].url)
}}for(e=0;
e<c.length;
e++){if(c[e].url){if(c[e].url.indexOf("http")!==0){c[e].url=d+c[e].url.replace("/","")
}TS.log(37,"adding sound: "+c[e].value);
if(!window.Audio&&!!window.winssb){a[c[e].value]={url:c[e].url}
}else{a[c[e].value]=soundManager.createSound({url:c[e].url})
}TS.log(37,"_sounds["+c[e].value+"] = "+a[c[e].value]);
b.push(c[e].url)
}}try{if(TSSSB.call("preloadSounds",b)){TS.log(37,"called TSSSB.call('preloadSounds', '"+b+"')")
}else{TS.log(37,"NOT CALLED TSSSB.call('preloadSounds', '"+b+"')")
}}catch(g){TS.warn("error calling TSSSB.preloadSounds "+g+" "+b)
}}catch(g){TS.warn("error calling soundManager.createSound "+g);
if(TS.logError){TS.logError("soundManager.createSound failed","soundManager.ok(): "+(soundManager?soundManager.ok():" soundManager null/undefined?")+", soundManager.html5Only: "+(soundManager.html5Only?"true":"false"))
}}},play:function(c){if(c=="new_message"){c=TS.model.prefs.new_msg_snd;
if(c=="none"){return
}}if(c=="beep"){c="frog.mp3"
}if(!(c in a)){TS.warn("unknown sound:"+c);
return
}if(TS.model&&TS.model.prefs&&TS.model.prefs.mute_sounds){return
}var b=a[c];
if(b){if(TSSSB.call("playRemoteSound",b.url)){TS.log(37,"called TSSSB.call('playRemoteSound', '"+b.url+"')")
}else{TS.log(37,"calling sound.play()");
b.play()
}}else{TS.warn("sound is null:"+c+" window.Audio:"+window.Audio+" window.winssb:"+window.winssb)
}}});
var a={}
})();
(function(){TS.registerModule("search.view",{advanced_options:false,latest_msg_search_results:null,added_to_history_last_ms:0,search_results_lazy_load:null,last_terms:"",filter_delay_ms:60000,onStart:function(){TS.search.search_filter_set_sig.add(TS.search.view.renderResults,TS.search.view);
TS.search.search_filetype_filter_set_sig.add(TS.search.searchAll,TS.search);
TS.search.search_sort_set_sig.add(c);
TS.prefs.messages_theme_changed_sig.add(TS.search.view.messagesThemeChanged,TS.search.view);
TS.search.message_search_results_fetched_sig.add(g);
TS.search.file_search_results_fetched_sig.add(d);
if(TS.client){$("#flexpane_tabs a").bind("click.setSearchFilter",function(){if($(this).data("tab-id")=="files"||$(this).data("filetype")){TS.search.setFilter("files")
}else{TS.search.setFilter("messages")
}});
$("#search_results_items").bind("click.view",function(h){if($(h.target).closest("A").length===0){return
}if($(h.target).closest(".file_list_item").length==1){TS.search.view.maybeLogSearchInteraction("files")
}});
$("#search_tabs").html(TS.templates.search_tabs);
$("#search_clear").bind("click.switch_to_files",function(){if(TS.search.filter=="files"&&TS.model.ui_state.flex_visible){setTimeout(function(){TS.search.view.switchBackToFiles()
},50)
}});
$("#search_results").scroll(function(){TS.client.ui.checkInlineImgsAndIframes("search");
if(TS.menu.search_filter_is_showing){TS.menu.end()
}});
TS.client.login_sig.add(TS.search.view.loggedIn,TS.search.view)
}if(TS.web){TS.web.login_sig.add(TS.search.view.loggedIn,TS.search.view);
TS.search.all_search_results_fetched_sig.add(TS.search.view.updateHistory,TS.search.view);
TS.search.search_filter_set_sig.add(TS.search.view.updateHistory,TS.search.view);
$(window).bind("popstate",function(h){TS.search.view.onPopState(h.originalEvent)
})
}},loggedIn:function(h,i){if(TS.client){if(TS.model.prefs.search_sort==="timestamp"){$("#search_sort_timestamp").addClass("active")
}else{$("#search_sort_score").addClass("active")
}}if(TS.web){if(TS.boot_data.filter){TS.search.setFilter(TS.boot_data.filter)
}if(TS.boot_data.query){TS.search.query=TS.search.truncateQuery(TS.boot_data.query);
TS.search.searchAll(TS.search.query)
}}},pageMessagesForward:function(){var h=TS.search.results[TS.search.query_string];
if(!h.messages||TS.search.view.current_messages_page+1>h.messages.paging.pages){return
}TS.search.view.current_messages_page++;
TS.search.view.renderResults();
if(TS.search.separateMessagesAndFiles()&&TS.search.view.current_messages_page<=h.messages.paging.page){return
}$("#search_results_team").addClass("hidden");
if(TS.search.view.current_messages_page<h.messages.paging.page){return
}if(TS.search.separateMessagesAndFiles()){TS.search.getNextPageOfMessageResults(TS.search.query_string,TS.search.view.current_messages_page)
}else{TS.search.getNextPageOfSearchResults(TS.search.query_string,TS.search.view.current_messages_page+1)
}},pageMessagesBack:function(){if(TS.search.view.current_messages_page-1<1){return
}TS.search.view.current_messages_page--;
TS.search.view.renderResults()
},pageFilesForward:function(){var h=TS.search.results[TS.search.query_string];
if(!h.files||TS.search.view.current_files_page+1>h.files.paging.pages){return
}TS.search.view.current_files_page++;
TS.search.view.renderResults();
if(TS.search.separateMessagesAndFiles()&&TS.search.view.current_files_page<=h.files.paging.page){return
}$("#search_results_team").addClass("hidden");
if(TS.search.view.current_files_page<h.files.paging.page){return
}if(TS.search.separateMessagesAndFiles()){TS.search.getNextPageOfFileResults(TS.search.query_string,TS.search.view.current_files_page)
}else{TS.search.getNextPageOfSearchResults(TS.search.query_string,TS.search.view.current_files_page+1)
}},pageFilesBack:function(){if(TS.search.view.current_files_page-1<1){return
}TS.search.view.current_files_page--;
TS.search.view.renderResults()
},searchFetched:function(i,h){if(h.page==1){TS.search.view.current_messages_page=1;
TS.search.view.current_files_page=1;
TS.search.view.waiting_on_page=-1;
TS.search.view.renderResults();
TS.search.view.messageSearchResultsFetched(i,h);
TS.search.view.searchMembers()
}else{if(h.page==TS.search.view.waiting_on_page){TS.search.view.renderResults()
}}},waiting_on_page:-1,waiting_on_messages_page:-1,waiting_on_files_page:-1,current_messages_page:1,current_files_page:1,renderResults:function(){TS.search.view.updateOptions();
if(!TS.search.results[TS.search.query_string]){return
}var j=TS.search.results[TS.search.query_string];
var i="";
var l=[];
var m;
var k=true;
if(TS.search.filter=="messages"){m=(TS.search.view.current_messages_page-1)*TS.search.per_page;
if(j.messages&&j.messages.matches){l=j.messages.matches.slice(m,m+TS.search.per_page)
}if(!l.length){if(TS.search.separateMessagesAndFiles()){TS.search.view.waiting_on_messages_page=TS.search.view.current_messages_page
}else{TS.search.view.waiting_on_page=TS.search.view.current_messages_page
}}if(l.length){i=TS.templates.search_message_results({results:j,page:l,current_page:TS.search.view.current_messages_page,paging_html:(j.messages&&k)?TS.templates.messages_search_paging({current_page:TS.search.view.current_messages_page,pages:j.messages.paging.pages}):""})
}else{if(!j.messages||j.messages.total>0){i+='<div class="loading_hash_animation"><img src="'+cdn_url+'/f85a/img/loading_hash_animation_@2x.gif" alt="Loading" /><br />loading page '+TS.search.view.current_messages_page+"...</div>"
}else{i=TS.templates.search_results_none({query_string:TS.search.query_string,filter:"messages",error:j.error})
}}$("#search_results_message_limit").removeClass("hidden");
$("#search_results_file_limit").addClass("hidden")
}else{if(TS.search.filter=="files"){$("#search_tabs").slideDown(500);
m=(TS.search.view.current_files_page-1)*TS.search.per_page;
if(j.files&&j.files.matches){l=j.files.matches.slice(m,m+TS.search.per_page)
}if(!l.length){if(TS.search.separateMessagesAndFiles()){TS.search.view.waiting_on_files_page=TS.search.view.current_files_page
}else{TS.search.view.waiting_on_page=TS.search.view.current_files_page
}}if(l.length){var h=(k)?TS.templates.files_search_paging({current_page:TS.search.view.current_files_page,pages:j.files.paging.pages}):"";
$.each(l,function(o,p){i+=TS.templates.builders.fileHTML(p,true)
});
i+=h
}else{if(!j.files||j.files.total>0){i+='<div class="loading_hash_animation"><img src="'+cdn_url+'/f85a/img/loading_hash_animation_@2x.gif" alt="Loading" /><br />loading page '+TS.search.view.current_files_page+"...</div>"
}else{i+=TS.templates.search_results_none({query_string:TS.search.query_string,filter:"files",error:j.error,filetype:TS.search.filetype,filetype_label:TS.model.file_list_type_map[TS.search.filetype]})
}}$("#search_results_file_limit").removeClass("hidden");
$("#search_results_message_limit").addClass("hidden")
}}$("#search_results_items").find(".search_jump_maybe").tooltip("destroy");
$("#search_results_items").html(i);
if(TS.view){TS.utility.makeSureAllLinksHaveTargets($("#search_results_items"))
}else{TS.utility.makeSureAllExternalLinksAreRefererSafe($("#search_results_items"))
}$("#search_results_items").find(".search_jump_maybe").tooltip({delay:{show:450,hide:150},container:"body",placement:"left"});
if(TS.search.filter=="messages"){$(".search_message_result").bind("click.view",TS.search.view.onMessageSearchResultClick)
}if(TS.client){TS.search.view.showResults();
if(m===0){TS.view.resizeManually("TS.search.view.renderResults")
}$("#search_results").scrollTop(0);
TS.client.ui.checkInlineImgsAndIframes("search")
}if(TS.search.view.search_results_lazy_load&&TS.search.view.search_results_lazy_load.detachEvents){TS.search.view.search_results_lazy_load.detachEvents()
}$("#search_results_container").find("img.lazy").lazyload({container:$("#search_results"),throttle:200});
if(TS.search.filter==="messages"){f(j)
}},showResults:function(){var i=TS.model.ui.active_tab_id;
var h=TS.model.ui.active_tab_ts;
if(!TS.model.ui_state.flex_visible||TS.model.ui_state.flex_name!=="search"){TS.client.ui.openFlexTab("search")
}TS.view.resizeManually("TS.search.view.showResults");
$("#header_search_form").addClass("active");
if(i=="files"&&(TS.model.ui.active_tab_ts-TS.search.view.filter_delay_ms)<h){TS.search.setFilter("files")
}if(TS.search.filter=="messages"){$("#search_tabs").show()
}else{if(TS.search.filter=="files"){$("#search_tabs").slideDown(500);
if(i=="files"){TS.search.setFiletypeFilter(TS.model.active_file_list_filter)
}}}},clearFiletypeFilter:function(){TS.search.setFiletypeFilter("all")
},updateOptions:function(){var o={search_filter:TS.search.filter,sort_filter:TS.search.sort,advanced_options:TS.search.view.advanced_options,search_only_my_channels:TS.model.prefs.search_only_my_channels};
var m="everything";
var i=TS.model.prefs.search_only_my_channels;
var l=TS.model.prefs.search_exclude_bots;
o.menu_is_showing=TS.menu.search_filter_is_showing;
if(TS.search.filter==="messages"){if(i&&l){m="only channels I have joined, no bots or integrations"
}if(i&&!l){m="only messages from channels I have open"
}if(!i&&l){m="only messages from people"
}}else{if(i){m="only files from channels I have open"
}}o.include_text=m;
var k=TS.search.results[TS.search.query_string];
var j=TS.templates.search_options(o);
$("#search_options").html(j);
if(TS.search.results[TS.search.query_string]){var p=k&&k.initial_messages_total?k.initial_messages_total:0;
var h=k&&k.initial_files_total?k.initial_files_total:0;
$("#search_tabs").html(TS.templates.search_tabs({messages_count:TS.utility.numberWithCommas(p),files_count:TS.utility.numberWithCommas(h)}))
}if(TS.search.filter=="files"){$("#search_heading").html(TS.templates.search_files_heading({filetype:TS.search.filetype,filetype_label:TS.model.file_list_type_map[TS.search.filetype]}));
$("#search_file_list_heading").bind("click.show_menu",function(q){q.preventDefault();
TS.menu.startWithFileFilter(q,true)
});
$("#search_file_list_clear_filter").bind("click.clear_filter",function(q){q.stopPropagation();
TS.search.view.clearFiletypeFilter()
})
}else{$("#search_heading").html("Search Results")
}$(".search_filter_menu_target").click(TS.menu.startWithSearchFilter)
},toggleAdvancedOptions:function(){if(TS.search.view.advanced_options){TS.search.view.advanced_options=false;
TS.track("search_options_closed")
}else{TS.search.view.advanced_options=true;
TS.track("search_options_opened")
}$("#advanced_options").slideToggle(100,function(){TS.search.view.updateOptions();
if(TS.client){TS.view.resizeManually("TS.search.view.toggleAdvancedOptions")
}})
},switchBackToFiles:function(){if(TS.search.results[TS.search.query_string]){var h=(TS.utility.date.getTimeStamp()-TS.search.results[TS.search.query_string]._time_of_search)/1000;
if(h<60){TS.client.ui.filterFileList(TS.search.filetype);
if(TS.search.member){TS.client.ui.toggleFileList(TS.search.member.id)
}else{TS.client.ui.toggleFileList("all")
}}else{TS.client.ui.filterFileList("all");
TS.client.ui.toggleFileList("all")
}}$("#search_tabs").slideUp(250,function(){setTimeout(function(){TS.client.ui.showFileList()
},100)
})
},searchMembers:function(){var q=TS.search.query_string,r=$("#search_results_team"),m=new RegExp(TS.utility.regexpEscape(q),"i");
r.removeClass("hidden");
var o=q.toLowerCase();
var j=TS.members.getMembersForUser();
var p=$.grep(j,function(t,s){if(!t.deleted){return(t._name_lc.indexOf(o)!=-1)||(t.profile.real_name_normalized&&m.test(t.profile.real_name_normalized))||(t._real_name_lc&&t._real_name_lc.indexOf(o)!=-1)
}});
if(p.length===0){var l=/from:@?(\S+)/gi;
var h;
var k;
do{h=l.exec(o);
if(h&&h.length>1){for(k=0;
k<j.length;
k++){if(!j[k].deleted&&j[k]._name_lc===h[1]){p.push(j[k]);
break
}}}}while(h)
}if(p.length>0){r.html(TS.templates.search_team_results({matches:p}))
}else{r.empty()
}},updateHistory:function(){var j={filter:TS.search.filter,query:TS.search.query,channel_id:null,member_id:null};
if(TS.search.channel){j.channel_id=TS.search.channel.id
}if(TS.search.group){j.group_id=TS.search.group.id
}if(TS.search.member){j.member_id=TS.search.member.id
}var h="/search/";
h+=TS.search.filter;
h+="?q="+encodeURIComponent(TS.search.query_string);
if(TS.qs_args){for(var i in TS.qs_args){if(TS.qs_args.hasOwnProperty(i)){if(i!="q"){h+="&"+i+"="+TS.qs_args[i]
}}}}if(h==window.location.pathname+window.location.search){window.history.replaceState(j,null,h)
}else{window.history.pushState(j,null,h)
}},onPopState:function(i){var h=i.state;
if(!h){return
}if(h.filter){TS.search.setFilter(h.filter)
}if(h.query){TS.search.query=h.query
}if(h.channel_id){TS.search.channel=TS.channels.getChannelById(h.channel_id)
}else{TS.search.channel=null
}if(h.group_id){TS.search.group=TS.groups.getGroupById(h.group_id)
}else{TS.search.group=null
}if(h.member_id){TS.search.member=TS.members.getMemberById(h.member_id)
}else{TS.search.member=null
}TS.search.searchAll(TS.search.query)
},messageSearchResultsFetched:function(k,j){TS.search.view.latest_msg_search_results=k;
var h=TS.utility.date.getTimeStamp();
var l=h-TS.search.view.added_to_history_last_ms;
var i=(l<5000);
TS.search.view.added_to_history_last_ms=h;
if(TS.client){TS.client.flexDisplaySwitched("search",j.query,i)
}},search_interactions_logged:{},maybeLogSearchInteraction:function(h){var i=TS.search.last_search_query;
if(!i){return
}if(TS.search.view.search_interactions_logged[h+"__"+i]){return
}TS.search.view.search_interactions_logged[h+"__"+i]=true;
TS.search.saveSearch({type:h,terms:i})
},onMessageSearchResultClick:function(m){if(TS.view.maybeFollowLink(m)){return
}m.stopPropagation();
if(window.getSelection&&window.getSelection().toString()){return
}TS.search.view.maybeLogSearchInteraction("messages");
TS.track("search_result_clicked");
var h=$(m.originalEvent.target);
var s=$(this).data("channel");
var o=$(this).data("ts")+"";
var l=TS.search.getMatchByQueryAndChannelAndTs(TS.search.view.latest_msg_search_results.query,s,o);
if(!l){TS.error("wtf, no match for "+o+"?");
return
}var p=h.closest(".internal_member_link");
var j;
if(h.hasClass("search_jump")){if(TS.web){return
}m.preventDefault();
j=false;
TS.client.ui.tryToJump(s,o,"","",j)
}else{if(h.hasClass("search_jump_maybe")&&TS.utility.cmdKey(m)){if(TS.web){return
}m.preventDefault();
j=true;
TS.client.ui.tryToJump(s,o,h.attr("href"),h.attr("target"),j)
}else{if(p.length==1){m.preventDefault();
TS.view.onMemberReferenceClick(m,p.data("member-name"));
return
}else{if(h.hasClass("internal_im_link")){if(TS.web){return
}m.preventDefault();
var q=TS.ims.getImByUsername(h.data("member-name"));
if(!q){return
}TS.ims.startImById(q.id)
}else{if(h.hasClass("channel_link")){if(TS.web){return
}m.preventDefault();
TS.channels.displayChannel(h.data("channel-id"))
}else{if(h.hasClass("group_link")){if(TS.web){return
}m.preventDefault();
TS.groups.displayGroup(h.data("group-id"))
}else{if(h.hasClass("msg_inline_img_collapser")||h.hasClass("msg_inline_img_expander")){TS.inline_imgs.checkForInlineImgClick(m,l);
if(TS.client){TS.client.ui.updateClosestMonkeyScroller($("#search_results"))
}}else{if(h.hasClass("msg_inline_email_collapser")||h.hasClass("msg_inline_email_expander")){TS.inline_emails.checkForInlineEmailClick(m,l);
if(TS.client){TS.client.ui.updateClosestMonkeyScroller($("#search_results"))
}}else{if(h.hasClass("msg_inline_video_collapser")||h.hasClass("msg_inline_video_expander")||h.closest(".msg_inline_video_play_button").length){TS.inline_videos.checkForInlineVideoClick(m,l);
if(TS.client){TS.client.ui.updateClosestMonkeyScroller($("#search_results"))
}}else{if(h.hasClass("msg_inline_audio_collapser")||h.hasClass("msg_inline_audio_expander")||h.closest(".inline_audio_play_link").length){TS.inline_audios.checkForInlineAudioClick(m,l);
if(TS.client){TS.client.ui.updateClosestMonkeyScroller($("#search_results"))
}}else{if(h.hasClass("msg_inline_other_collapser")||h.hasClass("msg_inline_other_expander")){TS.inline_others.checkForInlineOtherClick(m,l);
if(TS.client){TS.client.ui.updateClosestMonkeyScroller($("#search_results"))
}}else{if(h.hasClass("msg_inline_attachment_collapser")||h.hasClass("msg_inline_attachment_expander")||h.closest(".rest_text_expander").length){TS.inline_attachments.checkForInlineAttachmentClick(m,l);
if(TS.client){TS.client.ui.updateClosestMonkeyScroller($("#search_results"))
}}else{if(h.closest(".lightbox_link").length==1){if(TS.web){return
}var r=h.closest(".lightbox_link");
TS.info("click on .lightbox_link");
m.preventDefault();
TS.ui.lightbox_dialog.start(false,r.data("file-id"))
}else{if(h.closest(".lightbox_external_link").length==1){if(TS.web){return
}var i=h.closest(".lightbox_external_link");
TS.info("click on .lightbox_external_link");
m.preventDefault();
TS.ui.lightbox_dialog.start(false,i.data("src"),true,i.data("link-url"),i.data("width"),i.data("height"))
}else{if(h.closest(".message_star_holder").length==1){TS.stars.checkForStarClick(m)
}else{if(h.is(".member_preview_link")||h.is(".member_preview_image")||h.is(".member")){m.preventDefault();
var k=h.closest("[data-member-id]").data("member-id");
if(k){TS.menu.startWithMember(m,k)
}}else{if(h.attr("onclick")||h.attr("href")){}else{if(h.closest(".search_message_result").hasClass("no_extracts")){return
}if(l.extracts_expanded){a(l,h.closest(".search_result_with_extract, .search_result_for_context, .search_result_for_extra_context"))
}else{b(l,h.closest(".search_result_with_extract, .search_result_for_context, .search_result_for_extra_context"))
}return
}}}}}}}}}}}}}}}}}if(TS.client.archives.maybeHandleArchiveLink(h)){m.preventDefault();
return
}},messagesThemeChanged:function(){if(TS.model.ui_state.flex_name==="search"){TS.search.view.renderResults()
}},msgHasExtracts:function(k){if(k.extracts&&k.extracts.length>0){return true
}var j;
if(k.attachments){for(var h=0;
h<k.attachments.length;
h++){j=k.attachments[h];
if(j.extracts&&Object.keys(j.extracts).length>0){return true
}}}return false
},resultHasExtracts:function(h){return TS.search.view.msgHasExtracts(h)||h.previous&&TS.search.view.msgHasExtracts(h.previous)||h.previous_2&&TS.search.view.msgHasExtracts(h.previous_2)||h.next&&TS.search.view.msgHasExtracts(h.next)||h.next_2&&TS.search.view.msgHasExtracts(h.next_2)
},determineMessageResultType:function(i,h){if(TS.search.view.msgHasExtracts(i[h])){return"extract"
}if((h-1)>=0){if(TS.search.view.msgHasExtracts(i[h-1])){return"context"
}}if((h+1)<i.length){if(TS.search.view.msgHasExtracts(i[h+1])){return"context"
}}return"extra"
}});
var g=function(i,h){if(h.page==1){TS.search.view.current_messages_page=1;
TS.search.view.waiting_on_messages_page=-1;
if(TS.search.filter=="messages"){TS.search.view.renderResults();
TS.search.view.messageSearchResultsFetched(i,h);
TS.search.view.searchMembers()
}else{TS.search.view.updateOptions()
}}else{if(h.page==TS.search.view.waiting_on_messages_page){if(TS.search.filter=="messages"){TS.search.view.renderResults()
}}}};
var d=function(i,h){if(h.page==1){TS.search.view.current_files_page=1;
TS.search.view.waiting_on_files_page=-1;
if(TS.search.filter=="files"){TS.search.view.renderResults();
TS.search.view.messageSearchResultsFetched(i,h);
TS.search.view.searchMembers()
}else{TS.search.view.updateOptions()
}}else{if(h.page==TS.search.view.waiting_on_files_page){if(TS.search.filter=="files"){TS.search.view.renderResults()
}}}};
var c=function(){TS.search.searchAll();
if(TS.search.sort==="timestamp"){$("#search_sort_timestamp").addClass("active");
$("#search_sort_score").removeClass("active")
}else{$("#search_sort_timestamp").removeClass("active");
$("#search_sort_score").addClass("active")
}};
var f=function(h){if(!h.messages){return
}var i={};
h.messages.matches.forEach(function(j){i[j.ts]=j;
if(j.previous_2){j.previous_2.channel=j.channel;
i[j.previous_2.ts]=j.previous_2
}if(j.previous){j.previous.channel=j.channel;
i[j.previous.ts]=j.previous
}if(j.next){j.next.channel=j.channel;
i[j.next.ts]=j.next
}if(j.next_2){j.next_2.channel=j.channel;
i[j.next_2.ts]=j.next_2
}});
if(!TS.model.prefs.full_text_extracts){Object.keys(i).forEach(function(l){var m=i[l];
var j;
var k;
if(!TS.search.view.msgHasExtracts(m)){return
}j=$("#search_results_items #"+TS.templates.makeMsgDomId(m.ts));
if(j.length===0){return
}k=TS.templates.search_message_extracts({message:m});
j.find(".message_content").before(k)
})
}};
var b=function(i,j){i.extracts_expanded=true;
var h=$("#search_results_items").find("#"+TS.templates.makeMSRDomId(i));
e(h,j)
};
var a=function(j,k){j.extracts_expanded=false;
var h=$("#search_results_items").find("#"+TS.templates.makeMSRDomId(j));
var i=true;
e(h,k,i)
};
var e=function(i,m,k){var l=m.offset();
if(k){i.removeClass("extracts_expanded")
}else{i.addClass("extracts_expanded")
}if(m.length>0){var h=m.offset().top;
var p=h-l.top;
var o=m.closest(":scrollable(vertical)");
if(o.length>0&&o[0].tagName==="HTML"){o=$("body")
}if(0!==p){var j=o.scrollTop()+p;
o.scrollTop(Math.round(j))
}}if(TS.client){TS.client.ui.updateClosestMonkeyScroller($("#search_results"))
}}
})();
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)
}else{if(typeof exports==="object"){a(require("jquery"))
}else{a(jQuery)
}}})(function(d){var c,b={get:function(e){return a[c].get.apply(this,[e])
},set:function(j,h){var g=parseInt(j),f=parseInt(h),i;
if(typeof j==="undefined"){g=0
}else{if(j<0){g=this.val().length+g
}}if(typeof h==="undefined"){i=this.val().length
}else{if(h>=0){i=g+f
}else{i=this.val().length+f
}}a[c].set.apply(this,[g,i]);
return this
},setcursor:function(e){return this.textrange("set",e,0)
},replace:function(e){a[c].replace.apply(this,[String(e)]);
return this
},insert:function(e){return this.textrange("replace",e)
}},a={xul:{get:function(f){var e={position:this[0].selectionStart,start:this[0].selectionStart,end:this[0].selectionEnd,length:this[0].selectionEnd-this[0].selectionStart,text:this.val().substring(this[0].selectionStart,this[0].selectionEnd)};
return typeof f==="undefined"?e:e[f]
},set:function(f,e){this[0].selectionStart=f;
this[0].selectionEnd=e
},replace:function(g){var h=this[0].selectionStart;
var e=this[0].selectionEnd;
var f=this.val();
this.val(f.substring(0,h)+g+f.substring(e,f.length));
this[0].selectionStart=h;
this[0].selectionEnd=h+g.length
}},msie:{get:function(i){var f=document.selection.createRange();
if(typeof f==="undefined"){return{position:0,start:0,end:this[0].val().length,length:this[0].val().length,text:this.val()}
}var h=this[0].createTextRange();
var e=h.duplicate();
h.moveToBookmark(f.getBookmark());
e.setEndPoint("EndToStart",h);
var g={position:e.text.length,start:e.text.length,end:e.text.length+f.text.length,length:f.text.length,text:f.text};
return typeof i==="undefined"?g:g[i]
},set:function(g,e){var f=this[0].createTextRange();
if(typeof f==="undefined"){return this
}if(typeof g!=="undefined"){f.moveStart("character",g);
f.collapse()
}if(typeof e!=="undefined"){f.moveEnd("character",e-g)
}f.select()
},replace:function(e){document.selection.createRange().text=e
}}};
d.fn.textrange=function(e){if(typeof this[0]==="undefined"){return this
}if(typeof c==="undefined"){c="selectionStart" in this[0]?"xul":document.selection?"msie":"unknown"
}if(c==="unknown"){return this
}if(document.activeElement!==this[0]){this[0].focus()
}if(typeof e==="undefined"||typeof e!=="string"){return b.get.apply(this)
}else{if(typeof b[e]==="function"){return b[e].apply(this,Array.prototype.slice.call(arguments,1))
}else{d.error("Method "+e+" does not exist in jQuery.textrange")
}}}
});
(function(b){function a(){var e=new Date(this.toString()),f=28,c=e.getMonth();
while(e.getMonth()==c){++f;
e.setDate(f)
}return f-1
}b.addDays=function(c){this.setDate(this.getDate()+c)
};
b.addMonths=function(d){var c=this.getDate();
this.setDate(1);
this.setMonth(this.getMonth()+d);
this.setDate(Math.min(c,a.apply(this)))
};
b.addYears=function(d){var c=this.getDate();
this.setDate(1);
this.setFullYear(this.getFullYear()+d);
this.setDate(Math.min(c,a.apply(this)))
};
b.getDayOfYear=function(){var c=new Date(this.getFullYear(),this.getMonth(),this.getDate(),0,0,0);
var e=new Date(this.getFullYear(),0,0,0,0,0);
var d=c-e;
return Math.floor(d/24*60*60*1000)
}
})(Date.prototype);
(function(b){var f=0;
b.pickmeup=b.extend(b.pickmeup||{},{date:new Date,flat:false,first_day:1,prev:"&#9664;",next:"&#9654;",mode:"single",select_year:true,select_month:true,select_day:true,view:"days",calendars:1,format:"d-m-Y",position:"bottom",trigger_event:"click touchstart",class_name:"",separator:" - ",hide_on_select:false,min:null,max:null,render:function(){},change:function(){return true
},before_show:function(){return true
},show:function(){return true
},hide:function(){return true
},fill:function(){return true
},locale:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa","Su"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}});
var d={years:"pmu-view-years",months:"pmu-view-months",days:"pmu-view-days"},t={wrapper:'<div class="pickmeup" />',head:function(x){var v="";
for(var w=0;
w<7;
++w){v+="<div>"+x.day[w]+"</div>"
}return'<div class="pmu-instance"><nav><div class="pmu-prev pmu-button">'+x.prev+'</div><div class="pmu-month pmu-button" /><div class="pmu-next pmu-button">'+x.next+'</div></nav><nav class="pmu-day-of-week">'+v+"</nav></div>"
},body:function(x,y){var v="";
for(var w=0;
w<x.length;
++w){v+='<div class="'+x[w].class_name+' pmu-button">';
if(x[w].class_name.indexOf("pmu-today")!=-1){v+='<span class="pmu-today-border">'+x[w].text+"</span>"
}else{v+=x[w].text
}v+="</div>"
}return'<div class="'+y+'">'+v+"</div>"
}};
function q(){var K=b(this).data("pickmeup-options"),H=this.pickmeup,G=Math.floor(K.calendars/2),w=K.date,y=K.current,z,B,C,J,F=(new Date).setHours(0,0,0,0).valueOf(),v,x,E;
H.find(".pmu-instance > :not(nav)").remove();
for(var A=0;
A<K.calendars;
A++){z=new Date(y);
J=H.find(".pmu-instance").eq(A);
if(H.hasClass("pmu-view-years")){z.addYears((A-G)*12);
B=(z.getFullYear()-6)+" - "+(z.getFullYear()+5)
}else{if(H.hasClass("pmu-view-months")){z.addYears(A-G);
B=z.getFullYear()
}else{if(H.hasClass("pmu-view-days")){z.addMonths(A-G);
B=h(z,"B Y",K.locale)
}}}if(!x){if(K.max){E=new Date(z);
if(K.select_day){E.addMonths(K.calendars-1)
}else{if(K.select_month){E.addYears(K.calendars-1)
}else{E.addYears((K.calendars-1)*12)
}}if(E>K.max){--A;
y.addMonths(-1);
x=undefined;
continue
}}}x=new Date(z);
if(!v){v=new Date(z);
v.setDate(1);
v.addMonths(1);
v.addDays(-1);
if(K.min&&K.min>v){--A;
y.addMonths(1);
v=undefined;
continue
}}J.find(".pmu-month").text(B);
C="";
var D=function(L){return(K.mode=="range"&&L>=new Date(w[0]).getFullYear()&&L<=new Date(w[1]).getFullYear())||(K.mode=="multiple"&&w.reduce(function(M,N){M.push(new Date(N).getFullYear());
return M
},[]).indexOf(L)!==-1)||new Date(w).getFullYear()==L
};
var I=function(M,Q){var N=new Date(w[0]).getFullYear(),P=new Date(w[1]).getFullYear(),O=new Date(w[0]).getMonth(),L=new Date(w[1]).getMonth();
return(K.mode=="range"&&M>N&&M<P)||(K.mode=="range"&&M==N&&M<P&&Q>=O)||(K.mode=="range"&&M>N&&M==P&&Q<=L)||(K.mode=="range"&&M==N&&M==P&&Q>=O&&Q<=L)||(K.mode=="multiple"&&w.reduce(function(R,S){S=new Date(S);
R.push(S.getFullYear()+"-"+S.getMonth());
return R
},[]).indexOf(M+"-"+Q)!==-1)||(new Date(w).getFullYear()==M&&new Date(w).getMonth()==Q)
};
(function(){var M=[],O=z.getFullYear()-6,P=new Date(K.min).getFullYear(),Q=new Date(K.max).getFullYear(),N;
for(var L=0;
L<12;
++L){N={text:O+L,class_name:[]};
if((K.min&&N.text<P)||(K.max&&N.text>Q)){N.class_name.push("pmu-disabled")
}else{if(D(N.text)){N.class_name.push("pmu-selected")
}}N.class_name=N.class_name.join(" ");
M.push(N)
}C+=t.body(M,"pmu-years")
})();
(function(){var L=[],O=z.getFullYear(),Q=new Date(K.min).getFullYear(),M=new Date(K.min).getMonth(),R=new Date(K.max).getFullYear(),S=new Date(K.max).getMonth(),P;
for(var N=0;
N<12;
++N){P={text:K.locale.monthsShort[N],class_name:[]};
if((K.min&&(O<Q||(N<M&&O==Q)))||(K.max&&(O>R||(N>S&&O>=R)))){P.class_name.push("pmu-disabled")
}else{if(I(O,N)){P.class_name.push("pmu-selected")
}}P.class_name=P.class_name.join(" ");
L.push(P)
}C+=t.body(L,"pmu-months")
})();
(function(){var R=[],N=z.getMonth(),L;
(function(){z.setDate(1);
var S=(z.getDay()-K.first_day)%7;
z.addDays(-(S+(S<0?7:0)))
})();
for(var M=0;
M<42;
++M){L={text:z.getDate(),class_name:[]};
if(N!=z.getMonth()){L.class_name.push("pmu-not-in-month")
}if(z.getDay()==0){L.class_name.push("pmu-sunday")
}else{if(z.getDay()==6){L.class_name.push("pmu-saturday")
}}var P=K.render(z)||{},Q=z.valueOf(),O=(K.min&&K.min>z)||(K.max&&K.max<z);
if(P.disabled||O){L.class_name.push("pmu-disabled")
}else{if(P.selected||K.date==Q||b.inArray(Q,K.date)!==-1||(K.mode=="range"&&Q>=K.date[0]&&Q<=K.date[1])){L.class_name.push("pmu-selected")
}}if(Q==F){L.class_name.push("pmu-today")
}if(P.class_name){L.class_name.push(P.class_name)
}L.class_name=L.class_name.join(" ");
R.push(L);
z.addDays(1)
}C+=t.body(R,"pmu-days")
})();
J.append(C)
}v.setDate(1);
x.setDate(1);
x.addMonths(1);
x.addDays(-1);
H.find(".pmu-prev").css("visibility",K.min&&K.min>=v?"hidden":"visible");
H.find(".pmu-next").css("visibility",K.max&&K.max<=x?"hidden":"visible");
K.fill.apply(this)
}function u(z,L,F,K){if(z.constructor==Date){return z
}else{if(!z){return new Date
}}var I=z.split(F);
if(I.length>1){I.forEach(function(M,y,N){N[y]=u(b.trim(M),L,F,K)
});
return I
}var w=K.monthsShort.join(")(")+")("+K.months.join(")("),F=new RegExp("[^0-9a-zA-Z("+w+")]+"),C=z.split(F),A=L.split(F),H,x,J,E,B,v=new Date();
for(var D=0;
D<C.length;
D++){switch(A[D]){case"b":x=K.monthsShort.indexOf(C[D]);
break;
case"B":x=K.months.indexOf(C[D]);
break;
case"d":case"e":H=parseInt(C[D],10);
break;
case"m":x=parseInt(C[D],10)-1;
break;
case"Y":case"y":J=parseInt(C[D],10);
J+=J>100?0:(J<29?2000:1900);
break;
case"H":case"I":case"k":case"l":E=parseInt(C[D],10);
break;
case"P":case"p":if(/pm/i.test(C[D])&&E<12){E+=12
}else{if(/am/i.test(C[D])&&E>=12){E-=12
}}break;
case"M":B=parseInt(C[D],10);
break
}}var G=new Date(J===undefined?v.getFullYear():J,x===undefined?v.getMonth():x,H===undefined?v.getDate():H,E===undefined?v.getHours():E,B===undefined?v.getMinutes():B,0);
if(isNaN(G*1)){G=new Date
}return G
}function h(x,J,I){var z=x.getMonth();
var G=x.getDate();
var H=x.getFullYear();
var K=x.getDay();
var N={};
var L=x.getHours();
var A=(L>=12);
var E=(A)?(L-12):L;
var M=x.getDayOfYear();
if(E==0){E=12
}var C=x.getMinutes();
var F=x.getSeconds();
var B=J.split(""),v;
for(var D=0;
D<B.length;
D++){v=B[D];
switch(v){case"a":v=I.daysShort[K];
break;
case"A":v=I.days[K];
break;
case"b":v=I.monthsShort[z];
break;
case"B":v=I.months[z];
break;
case"C":v=1+Math.floor(H/100);
break;
case"d":v=(G<10)?("0"+G):G;
break;
case"e":v=G;
break;
case"H":v=(L<10)?("0"+L):L;
break;
case"I":v=(E<10)?("0"+E):E;
break;
case"j":v=(M<100)?((M<10)?("00"+M):("0"+M)):M;
break;
case"k":v=L;
break;
case"l":v=E;
break;
case"m":v=(z<9)?("0"+(1+z)):(1+z);
break;
case"M":v=(C<10)?("0"+C):C;
break;
case"p":case"P":v=A?"PM":"AM";
break;
case"s":v=Math.floor(x.getTime()/1000);
break;
case"S":v=(F<10)?("0"+F):F;
break;
case"u":v=K+1;
break;
case"w":v=K;
break;
case"y":v=(""+H).substr(2,2);
break;
case"Y":v=H;
break
}B[D]=v
}return B.join("")
}function a(){var z=b(this),w=z.data("pickmeup-options"),y=w.current,x;
switch(w.mode){case"multiple":x=y.setHours(0,0,0,0).valueOf();
if(b.inArray(x,w.date)!==-1){b.each(w.date,function(A,B){if(B==x){w.date.splice(A,1);
return false
}return true
})
}else{w.date.push(x)
}break;
case"range":if(!w.lastSel){w.date[0]=y.setHours(0,0,0,0).valueOf()
}x=y.setHours(0,0,0,0).valueOf();
if(x<=w.date[0]){w.date[1]=w.date[0];
w.date[0]=x
}else{w.date[1]=x
}w.lastSel=!w.lastSel;
break;
default:w.date=y.valueOf();
break
}var v=c(w);
if(z.is("input")){z.val(w.mode=="single"?v[0]:v[0].join(w.separator))
}w.change.apply(this,v);
if(w.hide_on_select&&(w.mode!="range"||!w.lastSel)){w.binded.hide();
return false
}}function o(B){var y=b(B.target);
if(!y.hasClass("pmu-button")){y=y.closest(".pmu-button")
}if(y.length){if(y.hasClass("pmu-disabled")){return false
}var A=b(this),x=A.data("pickmeup-options"),v=y.parents(".pmu-instance").eq(0),w=v.parent(),z=b(".pmu-instance",w).index(v);
if(y.parent().is("nav")){if(y.hasClass("pmu-month")){x.current.addMonths(z-Math.floor(x.calendars/2));
if(w.hasClass("pmu-view-years")){if(x.mode!="single"){x.current=new Date(x.date[x.date.length-1])
}else{x.current=new Date(x.date)
}if(x.select_day){w.removeClass("pmu-view-years").addClass("pmu-view-days")
}else{if(x.select_month){w.removeClass("pmu-view-years").addClass("pmu-view-months")
}}}else{if(w.hasClass("pmu-view-months")){if(x.select_year){w.removeClass("pmu-view-months").addClass("pmu-view-years")
}else{if(x.select_day){w.removeClass("pmu-view-months").addClass("pmu-view-days")
}}}else{if(w.hasClass("pmu-view-days")){if(x.select_month){w.removeClass("pmu-view-days").addClass("pmu-view-months")
}else{if(x.select_year){w.removeClass("pmu-view-days").addClass("pmu-view-years")
}}}}}}else{if(y.hasClass("pmu-prev")){x.binded.prev(false)
}else{x.binded.next(false)
}}}else{if(!y.hasClass("pmu-disabled")){if(w.hasClass("pmu-view-years")){x.current.setFullYear(parseInt(y.text(),10));
if(x.select_month){w.removeClass("pmu-view-years").addClass("pmu-view-months")
}else{if(x.select_day){w.removeClass("pmu-view-years").addClass("pmu-view-days")
}else{x.binded.update_date()
}}}else{if(w.hasClass("pmu-view-months")){x.current.setMonth(v.find(".pmu-months .pmu-button").index(y));
x.current.setFullYear(parseInt(v.find(".pmu-month").text(),10));
if(x.select_day){w.removeClass("pmu-view-months").addClass("pmu-view-days")
}else{x.binded.update_date()
}x.current.addMonths(Math.floor(x.calendars/2)-z)
}else{var C=parseInt(y.text(),10);
x.current.addMonths(z-Math.floor(x.calendars/2));
if(y.hasClass("pmu-not-in-month")){x.current.addMonths(C>15?-1:1)
}x.current.setDate(C);
x.binded.update_date()
}}}}x.binded.fill()
}return false
}function c(w){var v;
if(w.mode=="single"){v=new Date(w.date);
return[h(v,w.format,w.locale),v]
}else{v=[[],[]];
b.each(w.date,function(y,z){var x=new Date(z);
v[0].push(h(x,w.format,w.locale));
v[1].push(x)
});
return v
}}function s(y){var w=this.pickmeup;
if(y||!w.is(":visible")){var B=b(this),x=B.data("pickmeup-options"),C=B.offset(),v={l:document.documentElement.scrollLeft,t:document.documentElement.scrollTop,w:document.documentElement.clientWidth,h:document.documentElement.clientHeight},A=C.top,z=C.left;
x.binded.fill();
if(B.is("input")){B.pickmeup("set_date",u(B.val(),x.format,x.separator,x.locale)).keydown(function(D){if(D.which==9){B.pickmeup("hide")
}})
}x.before_show();
switch(x.position){case"top":A-=w.outerHeight();
break;
case"left":z-=w.outerWidth();
break;
case"right":z+=this.offsetWidth;
break;
case"bottom":A+=this.offsetHeight;
break
}if(A+w.offsetHeight>v.t+v.h){A=C.top-w.offsetHeight
}if(A<v.t){A=C.top+this.offsetHeight+w.offsetHeight
}if(z+w.offsetWidth>v.l+v.w){z=C.left-w.offsetWidth
}if(z<v.l){z=C.left+this.offsetWidth
}if(x.show()==false){return
}w.css({display:"inline-block",top:A+"px",left:z+"px"});
b(document).on("mousedown"+x.events_namespace,x.binded.hide).on("resize"+x.events_namespace,[true],x.binded.forced_show)
}}function i(){s.call(this,true)
}function g(x){if(!x||!x.target||(x.target!=this&&!(this.pickmeup.get(0).compareDocumentPosition(x.target)&16))){var v=this.pickmeup,w=b(this).data("pickmeup-options");
if(w.hide()!=false){v.hide();
b(document).off("mousedown",w.binded.hide).off("resize",w.binded.forced_show);
w.date[1]=w.date[0];
w.lastSel=false
}}}function e(){var v=b(this).data("pickmeup-options");
b(document).off("mousedown",v.binded.hide).off("resize",v.binded.forced_show);
v.binded.forced_show()
}function k(){var v=b(this).data("pickmeup-options");
if(v.mode!="single"){v.date=[];
v.lastSel=false;
v.binded.fill()
}}function j(x){if(typeof x=="undefined"){x=true
}var v=this.pickmeup;
var w=b(this).data("pickmeup-options");
if(v.hasClass("pmu-view-years")){w.current.addYears(-12)
}else{if(v.hasClass("pmu-view-months")){w.current.addYears(-1)
}else{if(v.hasClass("pmu-view-days")){w.current.addMonths(-1)
}}}if(x){w.binded.fill()
}}function l(x){if(typeof x=="undefined"){x=true
}var v=this.pickmeup;
var w=b(this).data("pickmeup-options");
if(v.hasClass("pmu-view-years")){w.current.addYears(12)
}else{if(v.hasClass("pmu-view-months")){w.current.addYears(1)
}else{if(v.hasClass("pmu-view-days")){w.current.addMonths(1)
}}}if(x){w.binded.fill()
}}function p(y){var x=b(this).data("pickmeup-options"),v=c(x);
if(typeof y==="string"){var w=v[1];
if(w.constructor==Date){return h(w,y,x.locale)
}else{return w.map(function(z){return h(z,y,x.locale)
})
}}else{return v[y?0:1]
}}function m(w){var v=b(this).data("pickmeup-options");
v.date=w;
if(typeof v.date==="string"){v.date=u(v.date,v.format,v.separator,v.locale).setHours(0,0,0,0)
}else{if(v.date.constructor==Date){v.date.setHours(0,0,0,0)
}}if(!v.date){v.date=new Date;
v.date.setHours(0,0,0,0)
}if(v.mode!="single"){if(v.date.constructor!=Array){v.date=[v.date.valueOf()];
if(v.mode=="range"){v.date.push(((new Date(v.date[0])).setHours(0,0,0,0)).valueOf())
}}else{for(var x=0;
x<v.date.length;
x++){v.date[x]=(u(v.date[x],v.format,v.separator,v.locale).setHours(0,0,0,0)).valueOf()
}if(v.mode=="range"){v.date[1]=((new Date(v.date[1])).setHours(0,0,0,0)).valueOf()
}}}else{v.date=v.date.constructor==Array?v.date[0].valueOf():v.date.valueOf()
}v.current=new Date(v.mode!="single"?v.date[0]:v.date);
v.binded.fill()
}function r(){var w=b(this),v=w.data("pickmeup-options");
w.removeData("pickmeup-options");
w.off(v.events_namespace);
b(document).off(v.events_namespace);
b(this.pickmeup).remove()
}b.fn.pickmeup=function(x){if(typeof x==="string"){var w,v=Array.prototype.slice.call(arguments,1);
switch(x){case"hide":case"show":case"clear":case"update":case"prev":case"next":case"destroy":this.each(function(){w=b(this).data("pickmeup-options");
if(w){w.binded[x]()
}});
break;
case"get_date":w=this.data("pickmeup-options");
if(w){return w.binded.get_date(v[0])
}else{return null
}break;
case"set_date":this.each(function(){w=b(this).data("pickmeup-options");
if(w){w.binded[x].apply(this,v)
}})
}return this
}return this.each(function(){var F=b(this);
if(F.data("pickmeup-options")){return
}var C,D,z=b.extend({},b.pickmeup,x||{});
for(C in z){D=F.data("pmu-"+C);
if(typeof D!=="undefined"){z[C]=D
}}if(z.view=="days"&&!z.select_day){z.view="months"
}if(z.view=="months"&&!z.select_month){z.view="years"
}if(z.view=="years"&&!z.select_year){z.view="days"
}if(z.view=="days"&&!z.select_day){z.view="months"
}z.calendars=Math.max(1,parseInt(z.calendars,10)||1);
z.mode=/single|multiple|range/.test(z.mode)?z.mode:"single";
if(typeof z.min==="string"){z.min=u(z.min,z.format,z.separator,z.locale).setHours(0,0,0,0)
}else{if(z.min&&z.min.constructor==Date){z.min.setHours(0,0,0,0)
}}if(typeof z.max==="string"){z.max=u(z.max,z.format,z.separator,z.locale).setHours(0,0,0,0)
}else{if(z.max&&z.max.constructor==Date){z.max.setHours(0,0,0,0)
}}if(!z.select_day){if(z.min){z.min=new Date(z.min);
z.min.setDate(1);
z.min=z.min.valueOf()
}if(z.max){z.max=new Date(z.max);
z.max.setDate(1);
z.max=z.max.valueOf()
}}if(typeof z.date==="string"){z.date=u(z.date,z.format,z.separator,z.locale).setHours(0,0,0,0)
}else{if(z.date.constructor==Date){z.date.setHours(0,0,0,0)
}}if(!z.date){z.date=new Date;
z.date.setHours(0,0,0,0)
}if(z.mode!="single"){if(z.date.constructor!=Array){z.date=[z.date.valueOf()];
if(z.mode=="range"){z.date.push(((new Date(z.date[0])).setHours(0,0,0,0)).valueOf())
}}else{for(C=0;
C<z.date.length;
C++){z.date[C]=(u(z.date[C],z.format,z.separator,z.locale).setHours(0,0,0,0)).valueOf()
}if(z.mode=="range"){z.date[1]=((new Date(z.date[1])).setHours(0,0,0,0)).valueOf()
}}z.current=new Date(z.date[0]);
if(!z.select_day){for(C=0;
C<z.date.length;
++C){z.date[C]=new Date(z.date[C]);
z.date[C].setDate(1);
z.date[C]=z.date[C].valueOf();
if(z.mode!="range"&&z.date.indexOf(z.date[C])!==C){delete z.date.splice(C,1);
--C
}}}}else{z.date=z.date.valueOf();
z.current=new Date(z.date);
if(!z.select_day){z.date=new Date(z.date);
z.date.setDate(1);
z.date=z.date.valueOf()
}}z.current.setDate(1);
z.current.setHours(0,0,0,0);
var B,y=b(t.wrapper);
this.pickmeup=y;
if(z.class_name){y.addClass(z.class_name)
}var A="";
for(C=0;
C<z.calendars;
C++){B=z.first_day;
A+=t.head({prev:z.prev,next:z.next,day:[z.locale.daysMin[(B++)%7],z.locale.daysMin[(B++)%7],z.locale.daysMin[(B++)%7],z.locale.daysMin[(B++)%7],z.locale.daysMin[(B++)%7],z.locale.daysMin[(B++)%7],z.locale.daysMin[(B++)%7]]})
}F.data("pickmeup-options",z);
for(C in z){if(["render","change","before_show","show","hide"].indexOf(C)!=-1){z[C]=z[C].bind(this)
}}z.binded={fill:q.bind(this),update_date:a.bind(this),click:o.bind(this),show:s.bind(this),forced_show:i.bind(this),hide:g.bind(this),update:e.bind(this),clear:k.bind(this),prev:j.bind(this),next:l.bind(this),get_date:p.bind(this),set_date:m.bind(this),destroy:r.bind(this)};
z.events_namespace=".pickmeup-"+(++f);
y.on("click touchstart",z.binded.click).addClass(d[z.view]).append(A).on(b.support.selectstart?"selectstart":"mousedown",function(G){G.preventDefault()
});
z.binded.fill();
if(z.flat){y.appendTo(this).css({position:"relative",display:"inline-block"})
}else{y.appendTo(document.body);
var E=z.trigger_event.split(" ");
for(C=0;
C<E.length;
++C){E[C]+=z.events_namespace
}E=E.join(" ");
F.on(E,z.binded.show)
}})
}
})(jQuery);
(function(g){var e="underlay";
var a=/^[^:]+:([^:+]+)?$/i;
var b=/webkit/i.test(navigator.userAgent);
g.widget("TS.highlighter",{options:{placeholder_class:"ghost_text",global_modifier_highlight_class:"modifier",global_modifier_incomplete_highlight_class:"incomplete",global_keyword_highlightClass:"keyword",modifiers:[]},_ghost_text:"",_ghost_prev_char:"",_$ghost_text:null,_ghost_text_changed_sig:null,_create:function(){if(!this.element.is('input[type="text"]')){throw this.widgetName+": Element is not a text input."
}this._renderUI();
this._on({keydown:this._onInputKey,keyup:this._onInputKey,change:this._onInputChange,scroll:this._onScroll,focus:this._onFocus,blur:this._onBlur,mouseenter:this._onMouseEnter,mouseleave:this._onMouseLeave});
if(f===null){c(this.element.parent())
}this._updateSizing=TS.utility.debounce(this._updateSizing,500);
this._$ghost_text=g("<span>").addClass(this.options.placeholder_class);
this._ghost_text_changed_sig=new signals.Signal();
this._ghost_text_changed_sig.add(this._onNewGhostText,this)
},_destroy:function(){i(this._scroll_raf);
g(window).unbind("resize.highlighter_resize");
if(TS.boot_data.feature_flexpane_rework){TS.client.flexpane_display_switched_sig.remove(this._updateSizing)
}},_renderUI:function(){var m=["outline","border-width","text-indent","font-size","line-height","font-family","letter-spacing","word-spacing","font-weight"];
var o=this.widgetName+"_";
var l=o+"wrapper";
var j="."+l;
var p=g("<div/>").addClass(l);
this._$underlay=g("<div/>").addClass(o+e);
this.element.wrap(p);
this._$wrapper=this.element.closest(j);
this._$wrapper.append(this._$underlay);
this.element.addClass("search_input_highlighted");
m.forEach(g.proxy(function(q){this._$underlay.css(q,this.element.css(q))
},this));
["top","right","bottom","left"].forEach(g.proxy(function(q){this._$underlay.css("margin-"+q,this.element.css("padding-"+q))
},this));
this._$underlay.width(this.element.width());
var k=this.element.position();
this._$underlay.css("top",k.top);
this._$underlay.css("left",k.left);
g(window).bind("resize.highlighter_resize",g.proxy(this._updateSizing,this));
if(TS.boot_data.feature_flexpane_rework){TS.client.flexpane_display_switched_sig.add(this._updateSizing,this)
}},_onInputKey:function(){this.element.trigger("change")
},_onInputChange:function(){d(g.proxy(this._updateUnderlay,this))
},_onScroll:function(){d(g.proxy(function(){this._$underlay.scrollLeft(this.element.scrollLeft())
},this))
},_onFocus:function(){this._has_focus=true;
if(TS.boot_data.feature_flexpane_rework){this._updateSizing()
}if(b){this._syncScrollLeft()
}},_onBlur:function(){this._has_focus=false;
if(TS.boot_data.feature_flexpane_rework){this._updateSizing()
}},_onMouseEnter:function(){this._mouse_over=true;
if(b){this._syncScrollLeft()
}},_onMouseLeave:function(){this._mouse_over=false
},_replaceAll:function(j,l,k){if(l instanceof RegExp){return j.replace(l,k)
}return j.replace(new RegExp(l,"gi"),k)
},highlightStr:function(l,j){var k=l.split(" ");
k.forEach(function(s,q){if(this._mightBeModifier(s)){var r=s.indexOf(":");
var o=s.slice(0,r+1);
var p=s.slice(r+1);
var m;
this.options.modifiers.some(function(y){var v=y.modifier;
var x;
var u;
if(o.toLowerCase()===v){var w=this.options.global_modifier_highlight_class;
var t=this.options.global_modifier_incomplete_highlight_class;
if(y.modifierHighlightClass){w=w+" "+y.modifierHighlightClass
}m="";
if(j){m+='<wbr/><span class="no_wrap">'
}if(p){y.keyword_testers.some(function(A){if(A(p)){var z=this.options.global_keyword_highlightClass;
if(y.keyword_highlight_class){z=z+" "+y.keyword_highlight_class
}u='<span class="'+z+'">'+h(p)+"</span>";
return true
}return false
},this)
}if(u){x='<span class="'+w+'">'+h(o)+"</span>"
}else{x='<span class="'+w+" "+t+'">'+h(o)+"</span>"
}m+=x;
if(u){m+=u
}else{m+=h(p)
}if(j){m+="</span>"
}k[q]=m;
return true
}else{k[q]=h(s);
return false
}},this)
}else{k[q]=h(s)
}},this);
return k.join(" ")
},_updateUnderlay:function(){var l=this.element.val();
var k;
if(this._prevVal===l){return
}k=this.highlightStr(l);
k=this._replaceAll(k,"\n","<br/>");
k=this._replaceAll(k,"  ","  ");
this._$underlay.html(k);
if(this._ghost_text){if(this._prevVal&&l.length>this._prevVal.length&&l.charAt(l.length-1)===this._ghost_text.charAt(0)){this.setGhostText(this._ghost_text.substring(1))
}else{if(this._prevVal&&this._ghost_prev_char&&l.length&&l.length===(this._prevVal.length-1)&&this._ghost_prev_char===this._prevVal.charAt(this._prevVal.length-1)){this.setGhostText(this._ghost_prev_char+this._ghost_text)
}else{this.setGhostText("")
}}}this._$ghost_text.appendTo(this._$underlay);
this._prevVal=l;
if(f){this._$underlay.scrollLeft(10000);
var j=this._$underlay.scrollLeft();
if(j!==0){this._$underlay.scrollLeft(0);
this._$underlay.addClass("hide_highlights")
}else{this._$underlay.removeClass("hide_highlights")
}}},_mightBeModifier:function(j){return a.test(j)
},_syncScrollLeft:function(){var j=g.proxy(function(){var k=this.element.scrollLeft();
if(k!==this._prev_left){this._$underlay.scrollLeft(k);
this._prev_left=this._$underlay.scrollLeft()
}if(this._has_focus||this._mouse_over){this._scroll_raf=d(j)
}},this);
i(this._scroll_raf);
this._prev_left=null;
this._scroll_raf=d(j)
},_updateSizing:function(){["top","right","bottom","left"].forEach(g.proxy(function(j){this._$underlay.css("margin-"+j,this.element.css("padding-"+j))
},this));
this._$underlay.width(this.element.width())
},_onNewGhostText:function(){if(this._ghost_text){this._$ghost_text.text(this._ghost_text)
}else{this._$ghost_text.html("&nbsp;&nbsp;")
}},setGhostText:function(k,j){this._ghost_text=k;
this._ghost_prev_char=j;
this._ghost_text_changed_sig.dispatch(k)
}});
var f=null;
var d=(function(){var m=["ms","moz","webkit","o"];
var l=window.requestAnimationFrame;
var j;
for(j=0;
j<m.length&&!l;
j++){l=window[m[j]+"RequestAnimationFrame"]
}if(!l){var k=0;
return function(r){var o=Date.now();
var q=Math.max(0,16-(o-k));
var p=window.setTimeout(function(){r(o+q)
},q);
k=o+q;
return p
}
}return function(o){return l.call(window,o)
}
})();
var i=(function(){var l=["ms","moz","webkit","o"];
var k=window.cancelAnimationFrame;
var j;
for(j=0;
j<l.length&&!k;
j++){k=window[l[j]+"CancelAnimationFrame"]||window[l[j]+"CancelRequestAnimationFrame"]
}if(!k){return function(m){clearTimeout(m)
}
}return function(m){k.call(window,m)
}
})();
var h=function(j){if(!j){return""
}return String(j).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")
};
var c=function(l){if(/webkit/i.test(navigator.userAgent)){return
}if(/msie/i.test(navigator.userAgent)){return
}var j=/Firefox\/(\d+)\b/.exec(navigator.userAgent);
if(j&&j.length===2){if(parseInt(j[1],10)>=31){return
}}var k=g('<input type="text">');
k.val("MMMMMMMMMMMMMMMMMMMMMMMMMM");
k.css({position:"absolute",top:"0",right:"9999px"});
k.width(50);
k.appendTo(l);
k.focus().setCursorPosition(10000);
setTimeout(function(){k.focus().setCursorPosition(10000);
f=k.scrollLeft()===0;
k.remove()
},500)
}
}(jQuery));
(function(f){var t={history:"history",modifier:"modifier",user:"user",group:"group",channel:"channel",conversation:"conversation",bot:"bot",time_range:"time-range",date:"date",has:"has"};
var u=5;
var g=u;
var c=u;
var D=u;
var v=u;
var y=u;
var d=u;
var w=100;
var s="data-replacement";
var C="data-matching-keyword";
var h=null;
var j="modifiers";
var b="history";
var o="profiles";
var p="li";
var m="ol";
var A="autocomplete_calendar";
var z="calendar_visible";
var l="Y-m-d";
var r="in:";
var B="bot:";
var q=534;
var e=/\{(.+)\}/i;
var a=/^[^:]+:([^:]+)?$/i;
f.widget("TS.autocomplete",{options:{hidden_class:"hidden",selected_class:"selected",append_to:"body",disabled:false,data:null},_$popover:null,_$menu:null,_$menu_items:null,_$calendar:null,_$ac_menu:null,_$scrollable:null,_menu_index:null,_calendar_modifier:"",_render_data:{},_last_query:null,_recalc_height:true,_open_menu_on_focus:true,_hide_timer:null,_mouse_in_menu:false,_input_has_focus:false,_block_menu:false,_caret_position:null,_current_history_query:null,_current_history_items:[],_create:function(){if(!this.element.is('input[type="text"]')){throw this.widgetName+": Element is not a text input."
}h=this.options.selected_class;
this._renderUI();
this._on(this.element,{keydown:this._onTextInputKeydown,keyup:this._onTextInputKeyup,mousedown:this._onTextInputMouseDown,mouseup:this._onTextInputMouseUp,focus:this._onTextInputFocus,blur:this._onTextInputBlur,cut:this._onTextInputKeyup,paste:this._onTextInputKeyup});
this._on(this._$menu,{"click li":this._onMenuClick,"click .delete_history_item_target_area":this._onClickDeleteHistoryItem,"click .footer_tip_action":this._onClickFooterTipAction,mouseenter:this._onMouseEnter,mouseleave:this._onMouseLeave,mousedown:this._onMouseDownMenu});
this.options.data=this.options.data||window.DATA;
f(window).bind("resize.recalc_autocomplete_height",f.proxy(function(){this._recalc_height=true
},this))
},_destroy:function(){f(window).unbind("resize.recalc_autocomplete_height")
},_show:function(){this._$popover.removeClass(this.options.hidden_class);
if(this._recalc_height){this._recalc_height=false;
var G=f(window).height();
var E=this._$menu.offset().top;
var F=G-E-25;
var H=Math.min(F,q);
this._$menu.css("max-height",H)
}f(window).unbind("mousedown.close_autocomplete").bind("mousedown.close_autocomplete",f.proxy(this._onMouseDownOutsideAutocomplete,this));
this._$scrollable.data("monkeyScroll").updateFunc()
},show:function(){this._show()
},_hide:function(){f(p,this._$menu).removeClass(this.options.selected_class);
this._$popover.addClass(this.options.hidden_class);
this._mouse_in_menu=false;
this._resetMenuIndex();
this._clearGhostText();
f(window).unbind("mousedown.close_autocomplete")
},hide:function(){this._hide()
},_requestHide:function(){this._cancelHide();
this._hide_timer=setTimeout(f.proxy(this._hide,this),0)
},_cancelHide:function(){clearTimeout(this._hide_timer)
},_resetMenuIndex:function(){this._menu_index=null
},_renderUI:function(){this._$popover=f("<div/>").addClass("popover_menu").attr("id","search_autocomplete_popover");
this._$popover.append('<span class="arrow"></span><span class="arrow_shadow"></span>');
if(this._$menu){this._$menu.empty()
}this._$ac_menu=f('<div id="autocomplete_menu" class="content"/>').appendTo(this._$popover);
this._$scrollable=f('<div class="autocomplete_menu_scrollable"/>').appendTo(this._$ac_menu);
this._$menu=f("<div/>").appendTo(this._$scrollable);
this._initCalendar();
this._hide();
this._$scrollable.append(this._$menu);
f(this.options.append_to).append(this._$popover);
this._$scrollable.monkeyScroll()
},_syncUI:function(){if(this._render_data.header){this._$popover.addClass("showing_header")
}else{this._$popover.removeClass("showing_header")
}this._$menu.html(TS.templates.search_autocomplete_menu(this._render_data));
this._$menu_items=f(p,this._$menu);
if(this._render_data.show_calendar){this._$calendar.removeClass(this.options.hidden_class);
this._$ac_menu.addClass(z);
this._$calendar.find(".pmu-selected").removeClass("pmu-selected")
}else{this._$calendar.addClass(this.options.hidden_class);
this._$ac_menu.removeClass(z)
}this._resetMenuIndex();
this._updateGhostText();
this._$scrollable.data("disable-scroll",!!this._render_data.show_calendar);
this._$scrollable.data("monkeyScroll").updateFunc()
},_initCalendar:function(){if(this._$calendar){this._$calendar.pickmeup("destroy").remove()
}this._$calendar=f("<div/>").addClass(A).addClass(this.options.hidden_class).prependTo(this._$ac_menu);
this._$calendar.pickmeup({flat:true,first_day:0,format:l,change:f.proxy(this._onCalendarChange,this),max:Date.now()})
},_setCalendarModifier:function(E){this._calendar_modifier=E
},_onTextInputMouseDown:function(E){if(this._input_has_focus){if(this._hideMenuIfTextSelected()){return
}setTimeout(f.proxy(function(){this._saveCaretPosition();
this._showAutocompleteSuggestions()
},this),0)
}},_onTextInputMouseUp:function(){this._saveCaretPosition();
this._hideMenuIfTextSelected()
},_onMenuClick:function(G){var E=f(G.target).closest(p);
var F=E.attr(s);
if(this._isProfileItemElement(E)){this._handleProfileItem(E);
return
}if(this._isRevealHiddenElement(E)){this._revealHiddenItems(E);
return
}if(this._shouldAppendSpaceToItem(E)){F+=" "
}this._open_menu_on_focus=false;
if(this._isHistoryItemElement(E)){this._replaceEntireInput(F)
}else{this._replaceCurrentWord(F)
}this._cancelDelayedSearch();
if(this._isModifierItemElement(E)){if(this._isModifierItemElementWithoutKeyword(E)){this._showKeywordAutocompleteMenu();
return
}else{if(this.options.data.triggerSearch){this.options.data.triggerSearch()
}}}else{if(this.options.data.triggerSearch){this.options.data.triggerSearch()
}if(!this._isHistoryItemElement(E)){this._showAutocompleteSuggestions();
return
}}this._hide()
},_onClickDeleteHistoryItem:function(G){G.stopPropagation();
var E=f(G.target).closest("li");
var F=E.attr(s);
if(this.options.data.deleteHistoryItem){this.options.data.deleteHistoryItem(F)
}this._current_history_items=this._current_history_items.filter(function(H){return H.text!==F
});
this._render_data.history=this._current_history_items;
this._syncUI()
},_onClickFooterTipAction:function(G){var E=f(G.target).closest(".footer_tip_action");
var F=E.data("replacement");
if(!F){return
}this._replaceCurrentWord(F);
this._showAutocompleteSuggestions()
},_onMouseDownOutsideAutocomplete:function(E){if(!f.contains(this.element[0],E.target)&&!f.contains(this._$popover[0],E.target)&&this.element[0]!==E.target&&this._$popover[0]!==E.target){this._hide()
}},_onMouseDownMenu:function(E){E.preventDefault()
},_onMouseEnter:function(){this._mouse_in_menu=true
},_onMouseLeave:function(){this._mouse_in_menu=false
},preventMenuOnNextFocus:function(){this._open_menu_on_focus=false
},_onTextInputFocus:function(){this._block_menu=false;
this._cancelHide();
setTimeout(f.proxy(function(){this._input_has_focus=true;
this._saveCaretPosition();
if(this._open_menu_on_focus){this._showAutocompleteSuggestions(true)
}this._open_menu_on_focus=true
},this),0)
},_onTextInputBlur:function(){this._input_has_focus=false;
if(!this._mouse_in_menu){this._requestHide()
}},_onCalendarChange:function(F){var E=this._calendar_modifier+F+" ";
this._open_menu_on_focus=false;
this._replaceCurrentWord(E);
if(this.options.data.triggerSearch){this.options.data.triggerSearch()
}this._hide()
},_onTextInputKeydown:function(F){if(F.keyCode===x.enter){this._cancelCurrentHistoryQuery();
this._block_menu=true
}else{this._block_menu=false
}var E=this._menuShowing();
if(E&&F.keyCode===x.tab&&this._$menu_items.length===1){this._handleVerticalArrowKey(F);
this._handleEnterKey(F);
return
}if((F.keyCode===x.up||F.keyCode===x.down||F.keyCode===x.tab)&&E){this._handleVerticalArrowKey(F)
}else{if(F.keyCode===x.enter&&E){this._handleEnterKey(F)
}else{if(F.keyCode===x.escape&&E){this._handleEscKey(F)
}else{this._last_query=this.element.val()
}}}},_isSpecialControlKey:function(E){return(E.keyCode===x.up||E.keyCode===x.down||E.keyCode===x.tab||E.keyCode===x.enter||E.keyCode===x.escape||E.keyCode===x.shift)
},_onTextInputKeyup:function(E){this._saveCaretPosition();
if(this._block_menu){return
}if(this._hideMenuIfTextSelected()){return
}if(!this._isSpecialControlKey(E)){this._showAutocompleteSuggestions();
this._last_query=this.element.val()
}},_handleEscKey:function(E){if(this._menuShowing()){E.preventDefault();
this._hide()
}},_handleEnterKey:function(H){var F=f("."+this.options.selected_class,this._$menu);
if(this._menuShowing()){if(F.length>0){H.preventDefault();
if(this._isProfileItemElement(F)){this._handleProfileItem(F);
return
}if(this._isRevealHiddenElement(F)){this._revealHiddenItems(F);
return
}if(this._shouldAppendSpaceToItem(F)){var G=this.element.val();
var E=this._getCaretPosition();
G=G.substring(0,E)+" "+G.substring(E);
this.element.val(G).trigger("change");
this.element.textrange("setcursor",E+1)
}if(this._modifierAutocompleteShowing()||this._isModifierItemElementWithoutKeyword(F)){this._showKeywordAutocompleteMenu();
return
}if(this.options.data.triggerSearch){this.options.data.triggerSearch()
}this._hide()
}else{this._hide()
}}},_handleBackspaceKey:function(G){var E=this._getCurrentModifyingStrDetails();
if(E){var H=this.element.val();
var F=null;
if(E.caret_in_keyword&&this._keywordIsValid(E.keyword.keyword,E.modifier.modifier)){F=E.keyword
}else{if(!E.caret_in_keyword&&this._modifierIsValid(E.modifier.modifier)){F=E.modifier
}}if(F){this.element.val(this._replaceRange(H,F.start,F.start+F.length,"")).trigger("change");
G.preventDefault();
this.element.setCursorPosition(F.start)
}}},_modifierIsValid:function(E){return !!E&&this.options.data.modifiers_by_name[E]
},_keywordIsValid:function(F,E){var H=this.options.data.modifiers_by_name[E];
if(!H){return false
}for(var G=0;
G<H.keyword_testers.length;
G++){if(H.keyword_testers[G](F)){return true
}}return false
},_showAutocompleteSuggestions:function(H){var J=this.element.val();
this._cancelDelayedSearch();
if(!J){this._initCalendar()
}if(J&&this._hasNonWhiteSpace(J)){var K=this._getWordAtCaretPosition();
var I=this._getCurrentWordUpToCaret();
if(I&&this._startsWith(I,"+")){this._showModifierAutocompleteMenu(I)
}else{if(I&&a.test(K)){var F=this._getCurrentModifyingStrDetails();
var E=F.modifier.modifier;
if(!F.caret_is_modifier_adjacent){this._triggerDelayedSearch()
}if(F.caret_in_keyword||F.caret_is_modifier_adjacent){this._showKeywordAutocompleteMenu()
}else{this._showModifierAutocompleteMenu(E)
}}else{var G=this._getResultsForQueryObj({current_word_up_to_caret:I,current_word:K,query:J});
this._render_data=G;
this._render_data.header={contextual_message:'<div class="inline_block magnifying_glass"></div><span class="search_light_grey no_wrap">Search Slack for&nbsp;</span> <strong class="overflow_ellipsis search_query_preview">&ldquo;'+TS.utility.htmlEntities(J)+'&rdquo;</strong> <span class="boxed float_right mini search_light_grey boxed_enter no_wrap">enter <span class="enter_arrow">&crarr;</span></span>'};
this._render_data.show_modifier=true;
this._triggerDelayedSearch()
}}if(this._resultSetIsEmpty(this._render_data)){this._hide()
}else{this._syncUI();
this._show()
}}else{if(H){this._render_data={footer:{tips:true}};
this._syncUI();
this._show()
}else{this._hide()
}}},_showKeywordAutocompleteMenu:function(){var F=this._getCurrentModifyingStrDetails();
if(!F){throw this.widgetName+": Lawdy how did you get here?"
}var E=F.keyword.keyword;
if(this._startsWith(E,"+")){this._showSpecialKeywordsAutocompleteMenu(E,F);
return
}switch(F.modifier.modifier){case"from:":this._showUserAutocompleteMenu(E);
break;
case"to:":this._showConversationAutocompleteMenu(E,"to:");
break;
case"in:":this._showConversationAutocompleteMenu(E,"in:");
break;
case"during:":case"on:":this._showDateAutocompleteMenu(E,F.modifier.modifier);
this._setCalendarModifier(F.modifier.modifier);
break;
case"after:":case"before:":this._showDateAutocompleteMenu(E,F.modifier.modifier);
this._setCalendarModifier(F.modifier.modifier);
break;
case"has:":this._showHasAutocompleteMenu(E);
break;
default:this._render_data={footer:true};
this._syncUI();
break
}},_showSpecialKeywordsAutocompleteMenu:function(J,F){var E=this.options.data.modifiers_by_name[F.modifier.modifier];
var I=J.substring(1);
var H;
var G=E.keywords.filter(function(K){if(K===I){H=K
}return J==="+"||this._startsWith(K,I)
},this);
if(H){this._replaceCurrentWord(F.modifier.modifier+H);
this._showAutocompleteSuggestions();
return
}this._render_data={};
this._render_data.modifiers=G.map(function(K){return f.extend({},E,{matching_keyword:K})
});
return
},_showConversationAutocompleteMenu:function(G,E){if(!G){this._render_data={menu_type:t.conversation,conversation_modifier:E,special:this.options.data.conversationsStarred(),special_section_header:"Starred",channels:this.options.data.channelsOpen(),dms:this.options.data.usersOpen(),groups:this.options.data.groupsOpen()}
}else{var F=false;
this._render_data={menu_type:t.conversation,conversation_modifier:E,dms:this._getUsersForQuery(G,null,F),dms_deleted:this._getUsersForQuery(G,null,F,true),channels:this._getChannelsForQuery(G,null),channels_archived:this._getChannelsForQuery(G,null,true),groups:this._getGroupsForQuery(G,null),groups_archived:this._getGroupsForQuery(G,null,true)};
if(this._render_data.dms.length===0&&this._render_data.dms_deleted.length>0){this._render_data.dms=true
}if(this._render_data.channels.length===0&&this._render_data.channels_archived.length>0){this._render_data.channels=true
}if(this._render_data.groups.length===0&&this._render_data.groups_archived.length>0){this._render_data.groups=true
}}this._syncUI()
},_showDateAutocompleteMenu:function(H,I){var F=H.length>0&&/^\D/.test(H);
var E=this.options.data.modifiers_by_name[I];
var G;
if(F){this._render_data={show_calendar:false};
G=E.keywords.filter(function(J){return this._startsWith(J,H)
},this);
this._render_data.modifiers=G.map(function(J){return f.extend({},E,{matching_keyword:J})
})
}else{this._render_data={menu_type:t.date,show_calendar:true,footer:{contextual_message:'Also try a keyword like <span class="modifier closed">yesterday</span> or <span class="modifier closed">january</span>.'}}
}this._syncUI()
},_showChannelAutocompleteMenu:function(E){this._render_data={menu_type:t.channel,conversation_modifier:r,channels:_getChannelsForQuery(E,c)};
this._syncUI()
},_showGroupAutocompleteMenu:function(E){this._render_data={menu_type:t.group,conversation_modifier:r,groups:_getGroupsForQuery(E,D)};
this._syncUI()
},_showUserAutocompleteMenu:function(F){this._render_data={menu_type:t.user};
if(!F||(F.length===1&&F.charAt(0)==="@")){this._render_data.conversation_modifier="from:";
this._render_data.special=this.options.data.usersStarred().concat(this.options.data.usersOpen());
this._render_data.special_section_header="Starred and recent";
var E=this.options.data.modifiers_by_name["from:"];
this._render_data.modifiers=E.keywords.map(function(G){return f.extend({},E,{matching_keyword:G})
})
}else{this._render_data.users=this._getUsersForQuery(F,null);
this._render_data.users_deleted=this._getUsersForQuery(F,null,false,true);
if(this._render_data.users.length===0&&this._render_data.users_deleted.length>0){this._render_data.users=true
}}this._syncUI()
},_showBotAutocompleteMenu:function(E){this._render_data={menu_type:t.bot,bot_modifier:B,bots:this._getBotsForQuery(E,v)};
this._syncUI()
},_showHasAutocompleteMenu:function(E){this._render_data={menu_type:t.has,has:[]};
this.options.data.modifiers_by_name["has:"].keywords.forEach(f.proxy(function(F){if(E===""||this._startsWith(F,E)){this._render_data.has.push({name:F})
}},this));
this._syncUI()
},_showModifierAutocompleteMenu:function(F){var E=this.options.data.modifiers_by_name;
if(F&&this._startsWith(F,"+")){F=F.substring(1);
if(E[F]){this._replaceCurrentWord(F);
this._showAutocompleteSuggestions();
return
}}if(!F){this._render_data={modifier_groups:true,header:{contextual_message:'<span class="search_light_grey">Select a modifier</span> <a class="float_right" href="https://slack.zendesk.com/hc/en-us/articles/202528808-Advanced-search-tools" target="'+TS.templates.builders.newWindowName()+'" style="margin-left: auto;">Learn more</a>'}}
}else{this._render_data={modifiers:this._getModifiersForQuery(F,true),menu_type:t.modifier}
}this._syncUI()
},_getCurrentModifyingStrDetails:function(){var F=this._getCaretPosition();
var J=this._getWordRangeAtCaretPosition(F);
if(!J||J.length===0){return null
}var E=this._getWordAtCaretPosition();
var G=E.indexOf(":");
var I=this.element.val().indexOf(":",J.start);
var H=E.slice(0,G+1);
return{modifier:{start:J.start,length:G+1,modifier:H},keyword:{start:J.start+G+1,length:E.length-H.length,keyword:E.slice(G+1)},caret_in_keyword:F>I+1,caret_is_modifier_adjacent:F===I+1}
},_handleVerticalArrowKey:function(I){I.preventDefault();
var G=I.keyCode===x.up||(I.keyCode===x.tab&&I.shiftKey);
var K=!G&&(I.keyCode===x.down||I.keyCode===x.tab);
var J=null;
if(!this._$menu_items.length){return
}var E=this._menu_index;
var F=E?f(this._$menu_items.get(E)):null;
this._$menu_items.removeClass(h);
J=this._getNextSelection(G);
J.addClass(h).scrollintoview({offset:"bottom",px_offset:0,duration:0});
var H=J.attr(s);
if(this._isProfileItemElement(J)){return
}if(this._isRevealHiddenElement(J)){return
}if(this._historyAutocompleteShowing()){this.element.val(H).trigger("change")
}else{if(this._isHistoryItemElement(J)){this.element.val(H).trigger("change")
}else{if(this._last_query&&F&&this._isHistoryItemElement(F)){this.element.val(this._last_query);
this.element.val(this._replaceWordAtIndex(this._last_query,this._getCaretPosition()-1,H)).trigger("change")
}else{this._replaceCurrentWord(H)
}}}this._triggerDelayedSearch()
},_getNextSelection:function(F){var G=F;
var J=!F;
var I;
var E=this._menu_index;
var H=this._$menu_items.filter(":not(."+this.options.hidden_class+")");
if(H.length===0){return null
}if(E===null){if(J){I=this._$menu_items.first();
E=0
}else{if(G){I=this._$menu_items.last();
E=this._$menu_items.length-1
}}}else{if(G){if(--E<0){E=this._$menu_items.length-1
}}else{if(J){if(++E>this._$menu_items.length-1){E=0
}}}I=f(this._$menu_items.get(E))
}this._menu_index=E;
if(I.hasClass(this.options.hidden_class)){return this._getNextSelection(F)
}return I
},_handleProfileItem:function(E){var F=E.data("member-id");
TS.search.autocomplete.clearInput();
this.options.data.openProfile(F);
this._hide()
},_revealHiddenItems:function(E){var F=E.nextAll("."+this.options.hidden_class);
E.addClass(this.options.hidden_class);
F.removeClass(this.options.hidden_class);
if(E.hasClass(h)){this._handleVerticalArrowKey(f.Event("keyup",{keyCode:x.down}))
}},_deduplicateModifiers:function(F){var G=[];
var E=[];
F.forEach(function(H){if(E.indexOf(H.modifier)===-1){G.push(H);
E.push(H.modifier)
}});
return G
},_getUsersForQuery:function(K,H,G,M){var F=[];
var J=[];
if(K.charAt(0)==="@"){K=K.substring(1)
}var E=new RegExp("\\b"+i(K),"i");
var L=new RegExp("^@?"+i(K),"i");
if(!H){H=w
}this.options.data.users().some(function(N){if(G&&N.is_self){return false
}if(M&&!N.deleted){return false
}if(!M&&N.deleted){return false
}if(L.test(N.name)){F.push(N);
if(H&&F.length>=H){return true
}}else{if((!H||J.length<H)&&E.test(N._real_name_normalized_lc)){J.push(N)
}}return false
},this);
var I=F.concat(J);
if(H&&I.length>=H){I=I.slice(0,H)
}return I
},_getBotsForQuery:function(G,E){var F=[];
if(!E){E=w
}this.options.data.bots().some(function(H){if(this._startsWith(H.name,G)){F.push(H);
if(E&&F.length>=E){return true
}return false
}},this);
return F
},_getModifiersForQuery:function(G,E){var F=[];
this.options.data.modifiers.forEach(function(H){if(this._startsWith(H.modifier,G)){F.push(f.extend({},H))
}},this);
this.options.data.modifiers.forEach(function(H){if(!E){H.keywords.forEach(function(I){if(this._startsWith(I,G)){F.push(f.extend({},H,{matching_keyword:I}))
}},this);
if(H.dynamic_keywords&&H.dynamic_keywords.length>0){H.dynamic_keywords.forEach(function(I){if(I(G)){F.push(f.extend({},H,{matching_keyword:G}))
}})
}}},this);
F=this._deduplicateModifiers(F);
return F
},_getChannelsForQuery:function(J,E,I){var F=[];
var H=[];
if(J.charAt(0)==="#"){J=J.substring(1)
}var K=new RegExp("^#?"+i(J),"i");
var L=new RegExp("(_|-)"+i(J),"i");
if(!E){E=w
}this.options.data.channels().some(function(M){if(I&&!M.is_archived){return false
}if(!I&&M.is_archived){return false
}if(K.test(M.name)){F.push(M);
if(E&&F.length>=E){return true
}}else{if((!E||F.length<E)&&L.test(M.name)){H.push(M)
}}return false
},this);
var G=F.concat(H);
if(E&&G.length>=E){G=G.slice(0,E)
}return G
},_getGroupsForQuery:function(J,E,I){var F=[];
var H=[];
var K=new RegExp("(_|-)"+i(J),"i");
if(!E){E=w
}this.options.data.groups().some(function(L){if(I&&!L.is_archived){return false
}if(!I&&L.is_archived){return false
}if(this._startsWith(L.name,J)){F.push(L);
if(E&&F.length>=E){return true
}}else{if((!E||F.length<E)&&K.test(L.name)){H.push(L)
}}return false
},this);
var G=F.concat(H);
if(E&&G.length>=E){G=G.slice(0,E)
}return G
},_getHistoryForQuery:function(E){if(E===this._current_history_query){return this._current_history_items
}this._current_history_query=E;
this._current_history_items=[];
this.options.data.history(E,f.proxy(this._historyFetched,this));
return this._current_history_items
},_getResultsForQueryObj:function(I){var G={conversation_modifier:r,bot_modifier:B};
var F=false;
var E=false;
if(!I){return G
}if(I.current_word_up_to_caret){var H=I.current_word_up_to_caret.toLowerCase();
E=H==="#";
F=H==="@";
G.modifiers=this._getModifiersForQuery(H);
G.users=this._getUsersForQuery(H,F?null:g);
G.channels=this._getChannelsForQuery(H,E?null:c);
G.groups=this._getGroupsForQuery(H,D)
}if(!F){G.profiles=this._getUsersForQuery(I.query,d)
}if(!F&&!E){G.history=this._getHistoryForQuery(I.query)
}return G
},_getCurrentWordUpToCaret:function(){var E=this._getCaretPosition();
var I=this.element.val();
var F=I.substring(0,E);
var G=F.split(" ");
var H=G[G.length-1];
if(H){return H
}return null
},_getCaretPosition:function(){return this._caret_position
},_getRealCaretPosition:function(){return this.element.textrange("get","position")
},_saveCaretPosition:function(){this._caret_position=this._getRealCaretPosition()
},_replaceCurrentWord:function(G){if(!G){throw this.widgetName+": A replacement word must be provided."
}var F=this._getWordRangeAtCaretPosition();
var H=this.element.val();
var E=this._replaceRange(H,F.start,F.start+F.length,G);
this.element.val(E).textrange("setcursor",F.start+G.length).trigger("change").scrollLeft(10000);
this._saveCaretPosition()
},_replaceEntireInput:function(E){this.element.val(E).textrange("setcursor",E.length).trigger("change").scrollLeft(10000);
this._saveCaretPosition()
},_replaceWordAtIndex:function(H,G,F){var E=this._getWordRangeAtCaretPosition(G+1);
return this._replaceRange(H.slice(),E.start,E.start+E.length,F)
},_startsWith:function(F,E){if(!F||!E||F.length<E.length){return false
}return F.indexOf(E)===0
},_getWordAtCaretPosition:function(E){if(typeof E==="undefined"){E=this._getCaretPosition()
}var F=this._getWordRangeAtCaretPosition(E);
var G=this.element.val().slice(F.start,F.start+F.length);
return G||null
},_getWordRangeAtCaretPosition:function(E){if(typeof E==="undefined"){E=this._getCaretPosition()
}var I=E-1;
var G=this.element.val().split(" ");
var F={start:0,length:G[0].length||0};
var H=G.some(function(K,J){if(I>=F.start&&I<F.start+F.length){return true
}if(I===F.start-1){F.start=E;
F.length=0;
return true
}if(J+1<G.length){F.start=F.start+K.length+1;
F.length=G[J+1].length
}return false
});
if(H){return F
}F.start=E;
F.length=0;
return F
},_replaceRange:function(J,K,F,I){var G=J.substring(0,K);
var H=J.substring(F);
var E;
if(H===J){E=I
}else{E=G+I+H
}return E
},_menuShowing:function(){return this._$menu.is(":visible")
},_hasNonWhiteSpace:function(E){return E&&/\S/.test(E)
},_historyAutocompleteShowing:function(){return this._render_data.menu_type===t.history
},_modifierAutocompleteShowing:function(){return this._render_data.menu_type===t.modifier
},_resultSetIsEmpty:function(E){if(E.show_calendar){return false
}if(E.modifier_groups){return false
}var F=null;
if(E.modifiers){if(E.modifiers.length>1){return false
}if(E.modifiers.length===1){if(F){return false
}F=[E.modifiers[0].modifier+E.modifiers[0].matching_keyword]
}}if(E.has){if(E.has.length>1){return false
}if(E.has.length===1){if(F){return false
}F=["has:"+E.has[0].name]
}}if(E.users){if(E.users.length>1){return false
}if(E.users.length===1){if(F){return false
}F=["from:"+E.users[0].name,"from:@"+E.users[0].name]
}}if(E.dms){if(E.dms.length>1){return false
}if(E.dms.length===1){if(F){return false
}F=[E.conversation_modifier+E.dms[0].name,E.conversation_modifier+"@"+E.dms[0].name]
}}if(E.channels){if(E.channels.length>1){return false
}if(E.channels.length===1){if(F){return false
}F=[E.conversation_modifier+E.channels[0].name,E.conversation_modifier+"#"+E.channels[0].name]
}}if(E.groups){if(E.groups.length>1){return false
}if(E.groups.length===1){if(F){return false
}F=[E.conversation_modifier+E.groups[0].name]
}}if(E.history){if(E.history.length>1){return false
}if(E.history.length===1){if(F){return false
}F=[E.history[0].text]
}}if(F){var H=this._getWordAtCaretPosition();
var G=F.some(function(I){return I===H
});
return G
}return true
},_isHistoryItemElement:function(E){if(!E){throw this.widgetName+": You must pass an AC result list item element to test."
}return E&&f(E).closest(m).hasClass(b)
},_isModifierItemElement:function(E){if(!E){throw this.widgetName+": You must pass an AC result list item element to test."
}return E&&f(E).closest(m).hasClass(j)
},_isProfileItemElement:function(E){if(!E){throw this.widgetName+": You must pass an AC result list item element to test."
}return E.closest(m).hasClass(o)
},_isRevealHiddenElement:function(E){return E.hasClass("reveal_hidden_items")
},_modifierItemElementHasKeyword:function(E){if(!E){throw this.widgetName+": You must pass an AC result list item element to test."
}return !!f(E).attr(C)
},_isModifierItemElementWithoutKeyword:function(E){return this._isModifierItemElement(E)&&!this._modifierItemElementHasKeyword(E)
},_shouldAppendSpaceToItem:function(E){if(!E){throw this.widgetName+": You must pass an AC result list item element to test."
}if(this._modifierAutocompleteShowing()){return false
}if(this._isModifierItemElement(E)){return this._modifierItemElementHasKeyword(E)
}if(this._isHistoryItemElement(E)){return false
}return true
},_historyFetched:function(F,E){if(this._block_menu){return
}if(F!==this._current_history_query){return
}if(F!==this.element.val()){return
}if(this._menu_index){return
}if(E.length===1&&E[0]===F){return
}var G=this.element.data("TS-highlighter");
this._current_history_items=E.map(function(H){return{text:H,html:G?G.highlightStr(H,true):H}
});
this._render_data.history=this._current_history_items;
if(!this._resultSetIsEmpty(this._render_data)){this._render_data.noResults=false;
this._syncUI();
this._show()
}},_cancelCurrentHistoryQuery:function(){this._current_history_query=null
},_hideMenuIfTextSelected:function(){var E=this.element.textrange();
if(E.start!==E.end){this._hide();
return true
}return false
},_triggerDelayedSearch:function(E){E=E||3000;
this._cancelDelayedSearch();
this.options.data.triggerDelayedSearch(E)
},_cancelDelayedSearch:function(){this.options.data.cancelSearch()
},_updateGhostText:function(){var I=this.element.val();
var N=I.charAt(I.length-1);
var O=this._getCaretPosition();
var M=this.element.data("TS-highlighter");
var F=this._getCurrentWordUpToCaret();
var J=this.options.data.modifiers_by_name[F];
if(!M){return this._clearGhostText()
}if(O!==I.length){return this._clearGhostText()
}if(J){var L=J.keyword_placeholder;
if((J.modifier==="in:"||J.modifier==="to:")&&f(window).width()<1368){L="channel, group or DM"
}M.setGhostText(L,N);
return
}if(this._$menu_items.length===0){return this._clearGhostText()
}var K=this._$menu_items[0];
var H=f(K).data("replacement");
if(!F||!H){return this._clearGhostText()
}if(F===H){return this._clearGhostText()
}if(I==="+"){M.setGhostText(H);
return
}var G=k(H,F);
if(G){M.setGhostText(G,N);
return
}var E=k(H,I);
if(E){M.setGhostText(E,N);
return
}},_clearGhostText:function(){var E=this.element.data("TS-highlighter");
if(!E){return
}E.setGhostText("")
}});
var x={backspace:8,tab:9,enter:13,shift:16,escape:27,up:38,down:40};
var i=function(E){E=E||"";
if(E.length>50){E=E.substring(0,50)
}return E.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")
};
var k=function(I,G){G=i(G);
var E=G.replace(/:/g,":(@|#)?");
var H=new RegExp("^"+E+"(.+)","i");
var F=H.exec(I);
if(F&&F.length>0){return F[F.length-1]
}return false
}
}(jQuery));
(function(){TS.registerModule("search.autocomplete",{last_input_blur_logged:"",onStart:function(){TS.search.search_dispatched_sig.add(TS.search.autocomplete.startSpinner,TS.search.autocomplete);
TS.search.all_search_results_fetched_sig.add(a);
TS.search.message_search_results_fetched_sig.add(f);
TS.search.file_search_results_fetched_sig.add(m);
if(TS.client){TS.search.search_channel_set_sig.add(TS.search.autocomplete.updateInput,TS.search.autocomplete);
TS.search.search_group_set_sig.add(TS.search.autocomplete.updateInput,TS.search.autocomplete);
TS.search.search_member_set_sig.add(TS.search.autocomplete.updateInput,TS.search.autocomplete);
TS.client.flexpane_display_switched_sig.add(v)
}if(TS.web){TS.search.quick_search_results_fetched_sig.add(TS.search.autocomplete.stopSpinner,TS.search.autocomplete)
}TS.search.autosuggest_search_results_fetched_sig.add(r);
I=$("#header_search_form");
J=$("#search_terms");
y();
TS.search.autocomplete.bindForm()
},bindForm:function(){var P=J;
var O=I;
if(TS.client){O.bind("submit",function(Q){TS.track("search_enter_pressed");
d(true);
P.trigger("change");
return false
});
P.bind("focus",function(){if($.trim(P.val())!==""){if(TS.model.ui_state.flex_name!=="search"){J.autocomplete("preventMenuOnNextFocus")
}TS.search.view.showResults()
}$("#active_channel_name").tooltip("hide");
P.setCursorPosition(P.val().length)
});
P.bind("click",function(Q){TS.tips.maybeDoThrobberProxyClick("search_input_tip_card_throbber",Q)
})
}if(TS.web){O.bind("submit",function(Q){TS.track("search_enter_pressed")
})
}P.bind("keyup",function(Q){if(Q.which==TS.utility.keymap.esc){P.blur();
return
}});
$("#search_clear").bind("click.clear_input",function(){TS.search.autocomplete.clearInput()
}).bind("mousedown.clear_input",function(Q){Q.preventDefault()
});
P.bind("focus.set_cursor",function(){P.setCursorPosition(P.val().length)
});
P.bind("keyup change focus blur",function(){if($(this).val()){O.addClass("active")
}else{O.removeClass("active")
}});
P.bind("blur",TS.search.autocomplete.maybeLogSearchInputBlur);
P.bind("focus",function(){$("#client-ui").addClass("search_focused")
}).bind("blur",function(){$("#client-ui").removeClass("search_focused")
})
},maybeLogSearchInputBlur:function(P){var O=TS.search.last_search_query;
if(!O){return
}if(TS.search.autocomplete.last_input_blur_logged==O){return
}TS.search.autocomplete.last_input_blur_logged=O;
TS.search.saveSearch({terms:O})
},clearInput:function(){L();
J.val("").trigger("change");
J.autocomplete("hide");
J.autocomplete("preventMenuOnNextFocus");
J.focus()
},updateInput:function(){if(TS.search.query){J.val(TS.search.query_string).trigger("change")
}},startSpinner:function(){clearTimeout(i);
i=setTimeout(function(){I.find(".icon_search").addClass("hidden");
if(!c){var O={lines:9,length:0,width:4,radius:5,corners:1,rotate:0,direction:1,color:"#434343",speed:1,trail:25,shadow:false,hwaccel:false,className:"spinner",zIndex:2000000000,top:"6px",left:"9px",opacity:0.1};
c=new Spinner(O)
}c.spin(I.get(0))
},200)
},stopSpinner:function(){clearTimeout(i);
I.find(".icon_search").removeClass("hidden");
if(c){c.stop()
}}});
var J;
var I;
var c;
var i;
var z;
var A="";
var d=function(O){L();
var P=$.trim(J.val());
if(!O&&P===TS.search.query){return
}if(A===P){TS.search.view.showResults();
return
}if(P===""){if(TS.search.filter=="files"){TS.search.view.switchBackToFiles()
}}else{if(P.length>=2||O){A=P;
TS.search.searchAll(P)
}}};
var L=function(){clearTimeout(TS.search.autocomplete.key_tim)
};
var y=function(){var P=J;
if(P.length===0){return
}var O=e();
P.highlighter({modifiers:O.modifiers});
P.autocomplete({append_to:"#header_search_form",data:O})
};
var r=function(R,P){var Q=P.query;
var O=R.suggestions;
var S=z;
if(!S){return
}S(Q,O)
};
var a=function(){A=null;
TS.search.autocomplete.stopSpinner()
};
var H=["monday","tuesday","wednesday","thursday","friday","saturday","sunday","yesterday"];
var g=["january","february","march","april","may","june","july","august","september","october","november","december"];
var k=["today","week","month","year"];
var K=H.concat(k,g);
var w=function(O){return s(O)
};
var x=function(O){return s(O,true)
};
var p=[{modifier:"after:",keywords:H.concat(g),dynamic_keywords:[w],keyword_placeholder:"a date"},{modifier:"before:",keywords:K,dynamic_keywords:[x],keyword_placeholder:"a date"},{modifier:"during:",keywords:K,dynamic_keywords:[w],keyword_placeholder:"a month or year"},{modifier:"from:",keywords:["me"],keyword_placeholder:"team member"},{modifier:"to:",keywords:["me"],keyword_placeholder:"a channel, group or direct message"},{modifier:"has:",keywords:["star","link"],keyword_placeholder:"star or link"},{modifier:"in:",keywords:["me"],keyword_placeholder:"a channel, group or direct message"},{modifier:"on:",keywords:K,dynamic_keywords:[w],keyword_placeholder:"a date"}];
var F;
var e=function(){if(!F){F={modifiers:p,modifiers_by_name:{},users:function(){return TS.members.getMembersForUser()
},usersStarred:function(){var Q=[];
var R,O,P;
for(P=0;
P<TS.model.ims.length;
P++){O=TS.model.ims[P];
if(O.is_slackbot_im||!O.is_open){continue
}R=TS.members.getMemberById(O.user);
if(!R||R.deleted||R.is_self){continue
}if(O.is_starred){Q.push(O)
}}Q.sort(C);
return Q.map(function(S){return TS.members.getMemberById(S.user)
})
},usersOpen:function(){var P=[];
var R,O,Q;
for(Q=0;
Q<TS.model.ims.length;
Q++){O=TS.model.ims[Q];
if(O.is_slackbot_im||!O.is_open){continue
}R=TS.members.getMemberById(O.user);
if(!R||R.deleted||R.is_self){continue
}if(!O.is_starred){P.push(O)
}}P.sort(C);
return P.map(function(S){return TS.members.getMemberById(S.user)
})
},channels:function(){return TS.channels.getChannelsForUser()
},channelsOpen:function(){var O=TS.channels.getChannelsForUser();
var R=[];
var P,Q;
for(P=0;
P<O.length;
P++){Q=O[P];
if(Q.is_starred){continue
}if(Q.is_archived){continue
}if(!Q.is_member){continue
}R.push(Q)
}R.sort(t);
return R
},groups:function(){return TS.model.groups
},groupsOpen:function(){var P=TS.model.groups;
var O=[];
var R,Q;
for(Q=0;
Q<P.length;
Q++){R=P[Q];
if(R.is_archived){continue
}if(R.is_starred){continue
}O.push(R)
}O.sort(t);
return O
},conversationsStarred:function(){var P=[];
var Q=F.usersStarred();
var O=[];
TS.channels.getChannelsForUser().forEach(function(R){if(!R.is_archived&&R.is_starred&&R.is_member){P.push(R)
}});
TS.model.groups.forEach(function(R){if(!R.is_archived&&R.is_starred){O.push(R)
}});
P.sort(t);
O.sort(t);
return P.concat(Q,O)
},bots:function(){return b().bots
},history:function(O,P){O=O||"";
z=P;
TS.search.searchSuggest(O)
},deleteHistoryItem:function(O){TS.api.call("search.delete",{terms:O})
},triggerSearch:function(){d(true)
},triggerDelayedSearch:function(O){TS.search.autocomplete.key_tim=setTimeout(function(){d()
},O||3000)
},cancelSearch:function(){L()
},openProfile:function(O){TS.client.ui.previewMember(O)
}};
F.modifiers.forEach(function(O){O.keyword_testers=[];
if(O.keywords.length>0){var P=new RegExp("^("+O.keywords.join("|")+")$","i");
O.keyword_testers=[function(Q){return P.test(Q)
}]
}switch(O.modifier){case"from:":O.keyword_testers.push(h);
O.keyword_testers.push(D);
break;
case"before:":O.keyword_testers.push(function(Q){return s(Q,true)
});
break;
case"after:":case"during:":case"on:":O.keyword_testers.push(s);
break;
case"in:":case"to:":O.keyword_testers.push(h);
O.keyword_testers.push(E);
O.keyword_testers.push(B);
break;
default:break
}F.modifiers_by_name[O.modifier]=O
})
}return F
};
var C=function(P,O){var R=TS.ims.getDisplayNameOfUserForImLowerCase(P);
var Q=TS.ims.getDisplayNameOfUserForImLowerCase(O);
return(R>Q)?1:((Q>R)?-1:0)
};
var t=function(P,O){var Q=P._name_lc;
var R=O._name_lc;
if(Q<R){return -1
}if(Q>R){return 1
}return 0
};
var h=function(O){if(O.charAt(0)==="@"){O=O.substring(1)
}return TS.members.getMemberByName(O)
};
var E=function(O){if(O.charAt(0)==="#"){O=O.substring(1)
}return TS.channels.getChannelByName(O)
};
var B=function(O){return TS.groups.getGroupByName(O)
};
var D=function(P){var O=b().name_map;
P=TS.utility.getLowerCaseValue(P);
return O[P]
};
var G;
var u=0;
var b=function(){if(Date.now()-u>30000){var P={};
var O=[];
TS.model.bots.forEach(function(R){var Q=TS.utility.getLowerCaseValue(R.name);
if(!R.deleted&&!P[Q]&&Q!=="slackbot"){P[Q]=true;
O.push(R)
}});
G={bots:O,name_map:P}
}return G
};
var M=/^(\d\d?)[-\/](\d\d?)[-\/](\d\d\d\d)$/;
var N=/^(\d\d\d\d)[-\/](\d\d?)[-\/](\d\d?)$/;
var q=/^(\d\d)[-\/](\d\d?)[-\/](\d\d?)$/;
var o=/^\d\d\d\d$/;
var j=1900;
var l=2999;
var s=function(U,R){var Q,T,P;
var S;
var O=new Date();
if(o.test(U)){Q=parseInt(U,10);
if(!R&&Q>O.getFullYear()){return false
}if(Q<j){return false
}if(R&&Q>l){return false
}return true
}S=M.exec(U);
if(S){Q=S[3];
T=S[1];
P=S[2]
}S=!Q&&N.exec(U);
if(S){Q=S[1];
T=S[2];
P=S[3]
}S=!Q&&q.exec(U);
if(S){Q=S[1];
T=S[2];
P=S[3]
}if(!Q){return false
}Q=parseInt(Q,10);
T=parseInt(T,10);
P=parseInt(P,10);
if(Q<1||T<1||P<1){return false
}if(Q<100){Q+=2000
}if(!R&&Q>O.getFullYear()){return false
}if(Q<j){return false
}if(R&&Q>l){return false
}if(T>12){return false
}if(!R&&Q===O.getFullYear()&&T>(O.getMonth()+1)){return false
}if(P>31){return false
}if(!R&&Q===O.getFullYear()&&T===(O.getMonth()+1)&&P>O.getDate()){return false
}if(P>30&&(T===4||T===6||T===9||T===11)){return false
}if(T===2&&P>29){return false
}if(T===2&&P===29){if((Q%4)!==0){return false
}else{if((Q%100)!==0){return true
}else{if((Q%400)!==0){return false
}}}}return true
};
var f=function(){if(TS.search.filter=="messages"){TS.search.autocomplete.stopSpinner()
}};
var m=function(){if(TS.search.filter=="files"){TS.search.autocomplete.stopSpinner()
}};
var v=function(){if(!TS.model.ui_state.flex_visible||TS.model.ui_state.flex_name!=="search"){L()
}}
})();
(function(){TS.registerModule("ui.group_create_dialog",{div:null,showing:false,auto_name:false,auto_name_str:null,start_member_id:null,onStart:function(){},onKeydown:function(a){if(a.which==TS.utility.keymap.enter){if(TS.utility.getActiveElementProp("NODENAME")=="BODY"){TS.ui.group_create_dialog.go();
a.preventDefault()
}}else{if(a.which==TS.utility.keymap.esc){if(TS.utility.getActiveElementProp("NODENAME")=="BODY"){TS.ui.group_create_dialog.cancel()
}}}},startWithMember:function(c){if(TS.client.ui.checkForEditing()){return
}var d=TS.members.getMemberById(c);
if(!d){return
}var a=true;
if(d.is_ultra_restricted||TS.model.user.is_ultra_restricted){a=false
}else{if(!TS.model.user.is_admin&&d.is_restricted){a=false
}}if(!a){return
}TS.ui.group_create_dialog.start_member_id=c;
var b=TS.groups.createSuggestedName([d.id]);
TS.ui.group_create_dialog.start(b,[d.id],true)
},start:function(e,b,h){if(TS.client.ui.checkForEditing()){return
}if(!TS.members.canUserCreateGroups()){return
}e=TS.utility.cleanChannelName(e||"");
b=b||[];
TS.ui.group_create_dialog.auto_name=!!h;
if(!TS.ui.group_create_dialog.div){TS.ui.group_create_dialog.build()
}var g=TS.ui.group_create_dialog.div;
var d;
var f;
if(TS.model.user.is_admin){f=d=TS.groups.getActiveMembersForInviting()
}else{d=TS.groups.getActiveMembersForInviting(true);
f=TS.groups.getActiveMembersForInviting()
}var a=TS.channels.makeMembersWithPreselectsForTemplate(f,b);
var c=TS.templates.generic_dialog({title:"Create a private group",body:TS.templates.group_create({title:e,invite_members:a,show_ra_tip:f.length!=d.length,compliance_exports_enabled_for_team:!!TS.model.team.prefs.compliance_export_start})});
g.empty();
g.html(c);
g.find(".dialog_cancel").html("Cancel").removeClass("hidden").click(TS.ui.group_create_dialog.cancel);
g.find(".dialog_go").html("Create Group").click(TS.ui.group_create_dialog.go);
TS.ui.group_create_dialog.bindCreateInvite();
g.modal("show")
},bindCreateInvite:function(){$("#select_create_invite_group_members").chosen({placeholder_text_multiple:" ",multiple_always_open:true,multiple_select_maintains_winnow:false});
var a=0;
$("#select_create_invite_group_members").bind("focus",function(){$("#create_invite_group_members_holder").find(".chzn-drop").show();
a=a+1;
if(a==3){$("#select_create_invite_group_members").bind("blur",function(){$("#create_invite_group_members_holder").find(".chzn-drop").hide()
})
}});
if(TS.ui.group_create_dialog.auto_name){TS.ui.group_create_dialog.auto_name_str=$("#group_create_title").val();
$("#select_create_invite_group_members").bind("change.auto_name",function(){if(TS.ui.group_create_dialog.auto_name_str!=$("#group_create_title").val()){$(this).unbind("change.auto_name");
return
}var b=$(this).val()||[];
$("#group_create_title").val(TS.groups.createSuggestedName(b));
TS.ui.group_create_dialog.auto_name_str=$("#group_create_title").val()
})
}$("#select_create_invite_group_members_chzn").find(".chzn-results").css("max-height",100);
$("#select_create_invite_group_members_holder").css("min-height",145);
$("#select_create_invite_group_members_chzn").find(".chzn-choices").css({"max-height":58,"overflow-y":"scroll"});
$(".modal-body").css("overflow-y","visible");
$("#select_create_invite_group_members_chzn").css("width","392px");
$("#select_create_invite_group_members_chzn").find(".default").css("width","100%")
},showNameTakenAlert:function(){var a=TS.ui.group_create_dialog.div;
a.find(".modal_input_note").addClass("hidden");
a.find(".name_taken_warning").removeClass("hidden");
$("#group_create_title").select()
},showExistingGroupsAlert:function(b){$(".modal-body").css("overflow-y","");
var c=TS.ui.group_create_dialog.div;
var a=TS.templates.existing_groups({existing_groups:b});
c.find(".modal_input_note").addClass("hidden");
c.find(".existing_groups_warning").html(a).removeClass("hidden").data("has-been-shown",true)
},showNoInvitesAlert:function(){var a=TS.ui.group_create_dialog.div;
a.find(".modal_input_note").addClass("hidden");
a.find(".no_invites_warning").removeClass("hidden")
},showNoTitleAlert:function(){var a=TS.ui.group_create_dialog.div;
a.find(".modal_input_note").addClass("hidden");
a.find(".name_missing_warning").removeClass("hidden")
},go:function(){if(!TS.ui.group_create_dialog.showing){TS.error("not showing?");
return
}if(TS.ui.group_create_dialog.validateAndSubmit()){TS.ui.group_create_dialog.div.modal("hide")
}},useExistingGroup:function(a){var b=TS.groups.getGroupById(a);
if(!b){return
}if(b.is_archived){TS.api.call("groups.unarchive",{channel:a})
}TS.groups.displayGroup(a);
TS.ui.group_create_dialog.div.modal("hide")
},validateAndSubmit:function(){var f=TS.ui.group_create_dialog.div;
var d=$("#group_create_title").val();
var b=$.trim($("#group_purpose_input").val());
var e=TS.utility.cleanChannelName(d);
while(d.substr(0,1)=="#"){d=d.substr(1)
}if(!d){TS.ui.group_create_dialog.showNoTitleAlert();
return false
}$("#group_create_title").val(e);
if(e!=d){alert("You entered some disallowed characters in the group name, which we've fixed. Make sure it looks good to you, and try again!");
return false
}if(TS.channels.getChannelByName(d)||TS.groups.getGroupByName(d)||TS.members.getMemberByName(d)){TS.ui.group_create_dialog.showNameTakenAlert();
return false
}var a=$("#select_create_invite_group_members").val()||[];
if(!f.find(".existing_groups_warning").data("has-been-shown")){$("#create_invite_group_members_holder").addClass("hidden");
var c=TS.groups.getGroupsWithTheseActiveMembers(a.concat(TS.model.user.id));
if(c.length){TS.ui.group_create_dialog.showExistingGroupsAlert(c);
return false
}}if(TS.model.created_groups[d]){return false
}TS.groups.create(d,a,function(h,i,g){if(!h){if(i.error=="name_taken"){TS.ui.group_create_dialog.showNameTakenAlert()
}else{if(i.error=="restricted_action"){TS.generic_dialog.alert("<p>You don't have permission to create new groups.</p><p>Talk to your team owner.</p>")
}else{alert("failed! "+i.error)
}}return
}if(b){TS.groups.setPurpose(i.group.id,b)
}f.modal("hide")
});
return false
},reset:function(){TS.ui.group_create_dialog.auto_name=false;
TS.ui.group_create_dialog.auto_name_str=null;
TS.ui.group_create_dialog.start_member_id=null
},cancel:function(){TS.ui.group_create_dialog.reset();
TS.ui.group_create_dialog.div.modal("hide")
},end:function(){TS.ui.group_create_dialog.div.empty();
TS.ui.group_create_dialog.showing=TS.model.dialog_is_showing=false;
TS.ui.group_create_dialog.reset();
$(window.document).unbind("keydown",TS.ui.group_create_dialog.onKeydown)
},build:function(){$("body").append('<div id="group_create_dialog" class="modal hide fade"></div>');
var a=TS.ui.group_create_dialog.div=$("#group_create_dialog");
a.on("hide",function(b){if(b.target!=this){return
}TS.ui.group_create_dialog.end()
});
a.on("show",function(b){if(b.target!=this){return
}TS.ui.group_create_dialog.showing=TS.model.dialog_is_showing=true
});
a.on("shown",function(b){if(b.target!=this){return
}setTimeout(function(){$("#group_create_title").select();
$(window.document).bind("keydown",TS.ui.group_create_dialog.onKeydown)
},100)
})
}})
})();
(function(){TS.registerModule("ui.channel_create_dialog",{div:null,showing:false,is_edit:false,model_ob:null,ladda:null,onStart:function(){},onKeydown:function(a){if(a.which==TS.utility.keymap.enter){TS.ui.channel_create_dialog.go();
a.preventDefault()
}else{if(a.which==TS.utility.keymap.esc){TS.ui.channel_create_dialog.cancel()
}}},start:function(c,a){if(TS.client.ui.checkForEditing()){return
}if(a){if(TS.model.user.is_restricted){return
}TS.ui.channel_create_dialog.is_edit=true;
TS.ui.channel_create_dialog.model_ob=a
}else{if(!TS.members.canUserCreateChannels()){return
}TS.ui.channel_create_dialog.is_edit=false;
TS.ui.channel_create_dialog.model_ob=null
}c=TS.utility.cleanChannelName(c||"").substr(0,TS.model.channel_name_max_length);
if(!TS.ui.channel_create_dialog.div){TS.ui.channel_create_dialog.build()
}var d=TS.ui.channel_create_dialog.div;
var b=TS.templates.channel_create_dialog({title:c,is_edit:TS.ui.channel_create_dialog.is_edit,is_group:TS.ui.channel_create_dialog.model_ob&&TS.ui.channel_create_dialog.model_ob.is_group,hide_private_group_option:!TS.members.canUserCreateGroups()});
d.empty();
d.html(b);
d.find(".dialog_cancel").click(TS.ui.channel_create_dialog.cancel);
d.find(".dialog_go").click(TS.ui.channel_create_dialog.go);
d.modal("show")
},switchToGroup:function(){var a=TS.ui.channel_create_dialog.div.find(".title_input").val();
TS.ui.channel_create_dialog.cancel();
setTimeout(function(){TS.ui.group_create_dialog.start(a)
},350)
},showNameTakenAlert:function(){var a=TS.ui.channel_create_dialog.div;
TS.channels.ui.channelCreateDialogShowNameTakenAlert(a)
},go:function(){if(!TS.ui.channel_create_dialog.showing){TS.error("not showing?");
return
}var e=TS.ui.channel_create_dialog.div;
var c=TS.channels.ui.channelCreateDialogValidateInput(e);
if(!c){return
}var b=e.find(".title_input").val();
var a=$.trim(e.find("#channel_purpose_input").val());
if(TS.ui.channel_create_dialog.ladda){TS.ui.channel_create_dialog.ladda.start()
}if(TS.ui.channel_create_dialog.is_edit){var d=(TS.ui.channel_create_dialog.model_ob.is_channel)?"channels.rename":"groups.rename";
TS.api.callImmediately(d,{name:b,channel:TS.ui.channel_create_dialog.model_ob.id},function(g,h,f){if(TS.ui.channel_create_dialog.ladda){TS.ui.channel_create_dialog.ladda.stop()
}if(!g){if(h.error=="name_taken"){TS.ui.channel_create_dialog.showNameTakenAlert()
}else{alert("failed! "+h.error)
}return
}e.modal("hide")
})
}else{TS.channels.join(b,function(g,h,f){if(TS.ui.channel_create_dialog.ladda){TS.ui.channel_create_dialog.ladda.stop()
}if(!g){if(h.error=="name_taken"){TS.ui.channel_create_dialog.showNameTakenAlert()
}else{if(h.error=="restricted_action"){}else{alert("failed! "+h.error)
}}return
}if(a){TS.channels.setPurpose(h.channel.id,a)
}e.modal("hide")
})
}},cancel:function(){TS.ui.channel_create_dialog.div.modal("hide")
},end:function(){TS.ui.channel_create_dialog.showing=TS.model.dialog_is_showing=false;
$(window.document).unbind("keydown",TS.ui.channel_create_dialog.onKeydown)
},build:function(){$("body").append('<div id="channel_create_dialog" class="modal hide fade"></div>');
var a=TS.ui.channel_create_dialog.div=$("#channel_create_dialog");
a.on("hide",function(b){if(b.target!=this){return
}TS.ui.channel_create_dialog.end()
});
a.on("show",function(b){if(b.target!=this){return
}TS.ui.channel_create_dialog.showing=TS.model.dialog_is_showing=true
});
a.on("shown",function(b){if(b.target!=this){return
}setTimeout(function(){a.find(".title_input").select();
$(window.document).bind("keydown",TS.ui.channel_create_dialog.onKeydown)
},100);
TS.ui.channel_create_dialog.ladda=Ladda.create(a.find(".dialog_go")[0])
})
}})
})();
(function(){TS.registerModule("ui.list_browser_dialog",{which:null,div:null,showing:false,items:[],active_sort:"name",filtered_items:[],active_filter:"",onStart:function(){TS.channels.list_fetched_sig.add(TS.ui.list_browser_dialog.onChannelsListFetched,TS.ui.list_browser_dialog)
},onChannelsListFetched:function(){if(!TS.ui.list_browser_dialog.showing){return
}if(TS.ui.list_browser_dialog.which!="channels"){return
}TS.ui.list_browser_dialog.sortBy(TS.ui.list_browser_dialog.active_sort)
},onKeydown:function(a){if(a.which==TS.utility.keymap.esc){TS.ui.list_browser_dialog.cancel()
}},start:function(e){if(TS.model.user.is_restricted){return
}if(TS.client.ui.checkForEditing()){return
}if(!TS.ui.list_browser_dialog.div){TS.ui.list_browser_dialog.build()
}var f=TS.ui.list_browser_dialog.div;
TS.ui.list_browser_dialog.which=e;
var c;
if(e=="channels"){c=TS.channels.getChannelsForUser();
TS.channels.fetchList()
}else{TS.error("TS.ui.list_browser_dialog start called with bad which: "+e);
return
}$.each(c,function(g,h){if(!h.is_archived){TS.ui.list_browser_dialog.items.push(h)
}});
TS.ui.list_browser_dialog.sortBy(TS.ui.list_browser_dialog.active_sort);
var d=TS.templates.list_browser_dialog({title:"Browse Channels",items:TS.ui.list_browser_dialog.items,active_sort:TS.ui.list_browser_dialog.active_sort});
f.empty();
f.html(d);
TS.ui.list_browser_dialog.bindList();
TS.ui.list_browser_dialog.div.find("#list_sort").bind("change.sortBy",function(){TS.ui.list_browser_dialog.sortBy($(this).val())
});
TS.ui.list_browser_dialog.div.find("#list_search").bind("textchange",function(h){var g=$.trim($(this).val());
if(g===""){TS.ui.list_browser_dialog.clearFilter()
}else{$("#list_search_container").addClass("active");
if(g.indexOf("#")!==-1){g=g.replace("#","","g");
g=$.trim(g)
}TS.ui.list_browser_dialog.filterBy(g)
}});
TS.ui.list_browser_dialog.div.find("#list_search_container .icon_close").bind("click.clearFilter",TS.ui.list_browser_dialog.clearFilter);
TS.ui.list_browser_dialog.div.find(".new_channel_btn").bind("click",function(){TS.ui.list_browser_dialog.cancel();
setTimeout(function(){TS.ui.channel_create_dialog.start()
},500)
});
TS.ui.list_browser_dialog.div.find("#about_channels").bind("click",function(g){g.preventDefault();
TS.ui.list_browser_dialog.cancel();
setTimeout(function(){TS.tip_card.start({tip:TS.tips.getTipById("about_channels_tip_card")})
},500)
});
var a=$("#list_browser");
var b=TS.qs_args.debug_scroll=="1";
a.monkeyScroll({debug:b});
f.find(".dialog_cancel").click(TS.ui.list_browser_dialog.cancel);
TS.kb_nav.start(a,"p");
TS.kb_nav.setAllowHighlightWithoutBlurringInput(true);
a.on("mouseenter","h4",TS.kb_nav.clearHighlightedItem);
f.modal("show")
},cancel:function(){TS.ui.list_browser_dialog.div.modal("hide")
},end:function(){TS.ui.list_browser_dialog.showing=TS.model.dialog_is_showing=false;
$(window.document).unbind("keydown",TS.ui.list_browser_dialog.onKeydown);
TS.ui.list_browser_dialog.items.length=0;
TS.ui.list_browser_dialog.active_filter="";
TS.kb_nav.end()
},build:function(){$("body").append('<div id="list_browser_dialog" class="modal hide fade"></div>');
var a=TS.ui.list_browser_dialog.div=$("#list_browser_dialog");
a.on("hide",function(b){if(b.target!=this){return
}TS.ui.list_browser_dialog.end()
});
a.on("show",function(b){if(b.target!=this){return
}TS.ui.list_browser_dialog.showing=TS.model.dialog_is_showing=true
});
a.on("shown",function(b){if(b.target!=this){return
}setTimeout(function(){a.find("#list_search").select();
$(window.document).bind("keydown",TS.ui.list_browser_dialog.onKeydown);
TS.client.ui.updateClosestMonkeyScroller($("#list_browser"))
},100)
})
},bindList:function(){TS.ui.list_browser_dialog.div.find(".item_open_link").on("click.open",function(c){c.preventDefault();
var a=$(this).data("item-id");
if(a){if(a.charAt(0)==="C"){var b=TS.channels.getChannelById(a);
if(b.is_member||TS.model.prefs.temp_archive_viewer){TS.channels.displayChannel(a)
}else{TS.channels.join(b.name)
}}else{if(a.charAt(0)==="G"){TS.groups.displayGroup(a)
}}}TS.ui.list_browser_dialog.cancel()
})
},sortBy:function(e){TS.ui.list_browser_dialog.active_sort=e;
var b=TS.ui.list_browser_dialog.items;
if(TS.ui.list_browser_dialog.active_filter){b=TS.ui.list_browser_dialog.filtered_items
}switch(e){case"creator":b.sort(function(h,f){var g,i;
g=TS.members.getMemberById(h.creator);
i=TS.members.getMemberById(f.creator);
if(g&&i){return(g._name_lc>i._name_lc)?1:((i._name_lc>g._name_lc)?-1:0)
}else{return 1
}});
break;
case"created":b.sort(function(g,f){return(g.created<f.created)?1:((f.created<g.created)?-1:0)
});
break;
case"members_high":b.sort(function(g,f){return(g.num_members<f.num_members)?1:((f.num_members<g.num_members)?-1:0)
});
break;
case"members_low":b.sort(function(g,f){return(g.num_members>f.num_members)?1:((f.num_members>g.num_members)?-1:0)
});
break;
default:b.sort(function(g,f){return(g._name_lc>f._name_lc)?1:((f._name_lc>g._name_lc)?-1:0)
});
break
}if(e=="name"&&!TS.ui.list_browser_dialog.active_filter){var d=[],c=[];
$.each(b,function(f,g){if(g.is_member){c.push(g)
}else{d.push(g)
}});
$("#list_browser").html(TS.templates.list_browser_items_by_membership({items_to_join:d,items_to_leave:c,active_sort:TS.ui.list_browser_dialog.active_sort}))
}else{$("#list_browser").html(TS.templates.list_browser_items({items:b,active_sort:TS.ui.list_browser_dialog.active_sort}))
}TS.ui.list_browser_dialog.bindList();
TS.kb_nav.clearHighlightedItem();
var a=$("#list_browser");
TS.client.ui.updateClosestMonkeyScroller(a);
a.scrollTop(0)
},filterBy:function(c){var b=new RegExp(c,"i"),a=$("#list_browser");
TS.ui.list_browser_dialog.active_filter=c;
TS.ui.list_browser_dialog.filtered_items=$.grep(TS.ui.list_browser_dialog.items,function(e,d){return e.name.match(b)
});
if(TS.ui.list_browser_dialog.filtered_items.length>0){a.html(TS.templates.list_browser_items({items:TS.ui.list_browser_dialog.filtered_items,active_sort:TS.ui.list_browser_dialog.active_sort}));
TS.ui.list_browser_dialog.bindList()
}else{a.html('<div class="no_matches align_center large_top_margin large_bottom_margin subtle_silver">No matches found for <strong>'+TS.utility.htmlEntities(c)+"</strong>.</div>")
}TS.kb_nav.clearHighlightedItem();
TS.client.ui.updateClosestMonkeyScroller(a);
a.scrollTop(0)
},clearFilter:function(){TS.ui.list_browser_dialog.active_filter="";
TS.ui.list_browser_dialog.div.find("#list_search").val("");
$("#list_search_container").removeClass("active");
$("#list_browser").html(TS.templates.list_browser_items({items:TS.ui.list_browser_dialog.items,active_sort:TS.ui.list_browser_dialog.active_sort}));
TS.ui.list_browser_dialog.sortBy(TS.ui.list_browser_dialog.active_sort);
TS.kb_nav.clearHighlightedItem()
}})
})();
(function(){TS.registerModule("ui.purpose_dialog",{div:null,showing:false,model_ob:null,onStart:function(){},onKeydown:function(a){if(a.which==TS.utility.keymap.enter){TS.ui.purpose_dialog.go();
a.preventDefault()
}else{if(a.which==TS.utility.keymap.esc){TS.ui.purpose_dialog.cancel()
}}},start:function(c,a){if(TS.client.ui.checkForEditing()){return
}TS.ui.purpose_dialog.model_ob=a;
TS.ui.purpose_dialog.is_group=TS.ui.purpose_dialog.model_ob.is_group;
if(!TS.ui.purpose_dialog.div){TS.ui.purpose_dialog.build()
}var d=TS.ui.purpose_dialog.div;
var b=TS.templates.purpose_dialog({model_ob:TS.ui.purpose_dialog.model_ob,is_group:TS.ui.purpose_dialog.is_group});
d.empty();
d.html(b);
d.find(".dialog_cancel").click(TS.ui.purpose_dialog.cancel);
d.find(".dialog_go").click(TS.ui.purpose_dialog.go);
d.modal("show")
},go:function(){if(!TS.ui.purpose_dialog.showing){TS.error("not showing?");
return
}var b=TS.ui.purpose_dialog.div;
var a=$.trim(b.find("#purpose_input").val());
if(TS.ui.purpose_dialog.is_group){TS.groups.setPurpose(TS.ui.purpose_dialog.model_ob.id,a)
}else{TS.channels.setPurpose(TS.ui.purpose_dialog.model_ob.id,a)
}b.modal("hide")
},cancel:function(){TS.ui.purpose_dialog.div.modal("hide")
},end:function(){TS.ui.purpose_dialog.showing=TS.model.dialog_is_showing=false;
$(window.document).unbind("keydown",TS.ui.purpose_dialog.onKeydown)
},build:function(){$("body").append('<div id="purpose_dialog" class="modal hide fade"></div>');
var a=TS.ui.purpose_dialog.div=$("#purpose_dialog");
a.on("hide",function(b){if(b.target!=this){return
}TS.ui.purpose_dialog.end()
});
a.on("show",function(b){if(b.target!=this){return
}TS.ui.purpose_dialog.showing=TS.model.dialog_is_showing=true
});
a.on("shown",function(b){if(b.target!=this){return
}setTimeout(function(){a.find("#purpose_input").select();
$(window.document).bind("keydown",TS.ui.purpose_dialog.onKeydown)
},100)
})
}})
})();
(function(){TS.registerModule("ui.growls",{is_fluid:false,no_notifications:false,permission_changed_sig:new signals.Signal(),onStart:function(){window.__ssbwinGrowlOnClick=TS.ui.growls.ssbwinGrowlOnClick;
TS.channels.unread_changed_sig.add(TS.ui.growls.updateTotalUnreadDisplays,TS.ui.growls);
TS.channels.unread_highlight_changed_sig.add(TS.ui.growls.updateTotalUnreadDisplays,TS.ui.growls);
TS.groups.unread_changed_sig.add(TS.ui.growls.updateTotalUnreadDisplays,TS.ui.growls);
TS.groups.unread_highlight_changed_sig.add(TS.ui.growls.updateTotalUnreadDisplays,TS.ui.growls);
TS.ims.unread_changed_sig.add(TS.ui.growls.updateTotalUnreadDisplays,TS.ui.growls);
TS.ims.unread_highlight_changed_sig.add(TS.ui.growls.updateTotalUnreadDisplays,TS.ui.growls);
TS.client.login_sig.add(TS.ui.growls.updateTotalUnreadDisplays,TS.ui.growls);
TS.prefs.mac_ssb_bullet_changed_sig.add(TS.ui.growls.updateTotalUnreadDisplays,TS.ui.growls);
TS.ui.window_focus_changed_sig.add(TS.ui.growls.windowFocusChanged,TS.ui.growls);
if(window.fluid){TS.ui.growls.is_fluid=true
}else{if(window.macgap){}else{if(window.Notification||window.webkitNotifications){}else{if(window.winssb){}else{TS.ui.growls.no_notifications=true;
return
}}}}TS.channels.message_received_sig.add(TS.ui.growls.channelOrGroupMessageReceived,TS.ui.growls);
TS.groups.message_received_sig.add(TS.ui.growls.channelOrGroupMessageReceived,TS.ui.growls);
TS.ims.message_received_sig.add(TS.ui.growls.imMessageReceived,TS.ui.growls)
},shouldShowPermissionButton:function(){if(TS.ui.growls.no_notifications){return false
}if(TS.ui.growls.checkPermission()){return false
}if(TS.ui.growls.getPermissionLevel()=="denied"){return false
}return true
},checkPermission:function(){if(TS.ui.growls.no_notifications){return false
}if(TS.ui.growls.is_fluid){return true
}if(window.macgap){return true
}if(window.winssb){return true
}return TS.ui.growls.getPermissionLevel()==="granted"
},perm_map:{"0":"granted","1":"default","2":"denied"},getPermissionLevel:function(){if(TS.ui.growls.no_notifications){return"na"
}if(TS.ui.growls.is_fluid){return"na"
}if(window.macgap){return"na"
}if(window.winssb){return"na"
}if(window.webkitNotifications&&window.webkitNotifications.checkPermission){return TS.ui.growls.perm_map[window.webkitNotifications.checkPermission()]
}else{if(window.Notification){return window.Notification.permission
}}},promptForPermission:function(b){if(TS.ui.growls.no_notifications){if(b){b(false,-9999999)
}return
}var a=function(){if(b){b(TS.ui.growls.checkPermission(),TS.ui.growls.getPermissionLevel())
}TS.ui.growls.permission_changed_sig.dispatch(TS.ui.growls.checkPermission(),TS.ui.growls.getPermissionLevel())
};
if(window.webkitNotifications&&window.webkitNotifications.requestPermission&&window.webkitNotifications.checkPermission){window.webkitNotifications.requestPermission(a)
}else{if(window.Notification){window.Notification.requestPermission(a)
}}},ssbwinGrowlOnClick_map:{},ssbwinGrowlOnClick_index:0,ssbwinGrowlOnClick:function(a){if(!a){TS.warn("ERROR: TS.ui.growls.ssbwinGrowlOnClick called with empty argument");
return
}if(!TS.ui.growls.ssbwinGrowlOnClick_map[a]){TS.warn("ERROR: TS.ui.growls.ssbwinGrowlOnClick_map["+a+"] is not defined");
return
}TS.info("typeof TS.ui.growls.ssbwinGrowlOnClick_map["+a+"] = "+(typeof TS.ui.growls.ssbwinGrowlOnClick_map[a]));
TS.info("calling TS.ui.growls.ssbwinGrowlOnClick_map["+a+"]");
TS.ui.growls.ssbwinGrowlOnClick_map[a]()
},show:function(j,k,g,o,l,b,c,m){if(!TS.ui.growls.checkPermission()){return
}if(emoji.replace_mode=="unified"){if(j){j=emoji.replace_colons_with_unified(j)
}if(k){k=emoji.replace_colons_with_unified(k)
}if(g){g=emoji.replace_colons_with_unified(g)
}}l=false;
var i,f;
if(TS.ui.growls.is_fluid){i={title:j,description:g,priority:1,sticky:!!l,icon:TS.boot_data.img.app_icon};
if(window.ssbwin&&o){f="onclick_"+(TS.ui.growls.ssbwinGrowlOnClick_index++);
TS.ui.growls.ssbwinGrowlOnClick_map[f]=o;
i.onclick="__ssbwinGrowlOnClick";
i.onclick_arg=f
}window.fluid.showGrowlNotification(i)
}else{if(window.winssb){i={title:j,content:g,forceShow:b,channel:m||""};
if(o){f="onclick_"+(TS.ui.growls.ssbwinGrowlOnClick_index++);
TS.ui.growls.ssbwinGrowlOnClick_map[f]=o;
i.onclick="__ssbwinGrowlOnClick";
i.onclick_arg=f
}TSSSB.call("notify",i)
}else{if(window.macgap){var h=function(p){window.focus();
if(o){o()
}};
if(window.macgap.growl){window.macgap.growl.notify({title:j,content:g,onclick:h,channel:m||""})
}else{if(window.macgap.notice){TSSSB.call("notify",{title:j,subtitle:k,content:g,onclick:h,forceShow:b,channel:m||""})
}else{}}}else{var e;
if(window.webkitNotifications){e=window.webkitNotifications.createNotification(TS.boot_data.img.app_icon,j,g)
}else{if(window.Notification){e=new Notification(j,{body:g,icon:TS.boot_data.img.app_icon,tag:"tag_"+(c?c.id||c.ts||new Date().getTime():new Date().getTime())})
}}if(!e){return
}try{e.onclick=function(){window.focus();
if(o){o()
}if(this.cancel){this.cancel()
}else{if(this.close){this.close()
}}}
}catch(d){}var a=function(){setTimeout(function(){if(e.cancel){e.cancel()
}else{if(e.close){e.close()
}}},(g&&g.length>80?10000:5000))
};
if(!l){if(e){try{e.onshow=a;
setTimeout(a,1000)
}catch(d){a()
}}}if(e.show){e.show()
}}}}},updateTotalUnreadDisplays:function(){if(window.macgap||window.winssb){TSSSB.call("setBadgeCount",{all_unread_highlights_cnt:TS.model.all_unread_highlights_cnt,all_unread_cnt:TS.model.all_unread_cnt,bullet:(window.macgap)?!!TS.model.prefs.mac_ssb_bullet:false})
}if(window.fluid){if(TS.model.all_unread_highlights_cnt+TS.model.all_unread_cnt){var a=TS.model.all_unread_highlights_cnt;
if(a>9){a="9+"
}if(!a){a=(TS.model.prefs.mac_ssb_bullet)?"•":""
}if(window.fluid){window.fluid.dockBadge=a.toString()
}}else{if(window.fluid){window.fluid.dockBadge=""
}}}if(TS.model.all_unread_highlights_cnt){TS.view.changeUnreadStatus("mentions")
}else{if(TS.model.all_unread_cnt){TS.view.changeUnreadStatus("unreads")
}else{TS.view.changeUnreadStatus("")
}}},getGrowlableTxtFromAttachments:function(a){for(var b=0;
b<a.length;
b++){var c=a[b];
if(c.fallback){return c.fallback
}else{if(c.text){return c.text
}else{if(c.pretext){return c.pretext
}else{if(c.footer){return c.footer
}}}}}return null
},no_growl_subtypes:["channel_leave","channel_join","group_leave","group_join"],channelOrGroupMessageReceived:function(a,b){if(!b){TS.error("no msg?");
return
}if(b.no_display){return
}if(!a){TS.error("no channel/group?");
return
}TS.ui.growls.growlchannelOrGroupMessage(a,b,true)
},growlchannelOrGroupMessage:function(m,e,j,c){if(!e){TS.error("no msg?");
return
}if(e.no_display){return
}if(!m){TS.error("no channel/group?");
return
}var b=TS.notifs.canCorGHaveChannelMentions(m.id);
var d;
var h;
if(b){d=TS.utility.msgs.msgContainsMention(e);
if(d){TS.mentions.maybeUpdateMentions()
}}else{h=TS.utility.msgs.getMsgMentionData(e);
d=h.non_channel_mentions;
if(h.mentions){TS.mentions.maybeUpdateMentions()
}}if(!c&&e.subtype&&TS.ui.growls.no_growl_subtypes.indexOf(e.subtype)!=-1){return
}var o=TS.notifs.isCorGMuted(m.id);
var q=TS.utility.msgs.msgCanCountAsUnread(e);
var p=q&&d;
var i=TS.ui.growls.containsCmd(e.text);
TS.log(66,"qualifies_as_mention:"+p);
TS.log(66,"can_be_unread:"+q);
TS.log(66,"contains_mention:"+d);
TS.log(66,"msg.text:"+e.text);
var k=TS.notifs.getCalculatedCorGNotifySetting(m.id);
TS.log(66,"setting:"+k);
if(!c&&e.subtype=="bot_message"&&k!="everything"&&!i&&!TS.model.you_regex.test(e.text)){return
}if(j&&q&&!TS.model.ui.is_window_focused){if(p&&document.title.indexOf("!")==-1){document.title="! "+document.title
}else{if(!o&&document.title.indexOf("*")==-1){document.title="* "+document.title
}}}if(!c&&k=="nothing"){return
}if(!TS.ui.growls.checkPermission()){return
}var l=(m.id==TS.model.active_channel_id||m.id==TS.model.active_group_id);
var r=false;
if(p){r=true
}if(k=="everything"){r=true
}if(r&&l&&TS.model.ui.is_window_focused&&!i){r=false
}if(r&&!b&&h&&h.mentions&&!h.non_channel_mentions){r=false
}if(r&&(e.user==TS.model.user.id||(e.comment&&e.comment.user==TS.model.user.id))){r=false
}if(r&&e.no_notifications){r=false
}if(r&&o){r=false
}if(!r&&!c){return
}var a=TS.members.getMemberById(e.user);
var f=TS.ui.growls.extractFromNameFromCorGMessage(e);
var w=function(){if(m.is_channel){TS.channels.displayChannel(m.id)
}else{TS.groups.displayGroup(m.id)
}};
var u=TS.ui.growls.extractTxtFromMsg(e,true);
var t=TS.model.prefs.no_text_in_notifications?(f?"a message from "+f:""):(f?f+": ":"");
t+=u;
TS.sounds.play("new_message");
TS.ui.growls.maybeBounceDockIcon();
var s=p&&a&&!TS.model.ui.is_window_focused;
var v;
var g;
if(TS.getOtherAccountsCount()>0&&(TS.ui.growls.canSpeak()||window.winssb)){if(TS.model.supports_growl_subtitle){v=TS.model.team.name;
g="in #"+m.name
}else{v="["+TS.model.team.domain+"] in #"+m.name
}}else{v="New message in #"+m.name
}TS.ui.growls.show(v,g,TS.format.formatNotification(t),w,s,true,e,m.id);
if(TS.model.prefs.speak_growls){TS.ui.growls.speakchannelOrGroupMessage(m,e,u,f)
}},speakchannelOrGroupMessage:function(b,f,a,d){if(!TS.ui.growls.canSpeak()){return
}if(!f){TS.error("no msg?");
return
}a=a||TS.ui.growls.extractTxtFromMsg(f,true);
d=d||TS.ui.growls.extractFromNameFromCorGMessage(f);
var e;
if(TS.getOtherAccountsCount()>0){e="On team "+TS.model.team.name+", a message in "+(b.is_channel?"channel":"group")+' "'+b.name+'" from "'+d+'": '
}else{e="message in "+(b.is_channel?"channel":"group")+' "'+b.name+'" from "'+d+'": '
}var c=e+TS.format.formatNotification(a);
TS.ui.growls.speak(c)
},voices:null,speakQ:[],getVoices:function(a,b,f,e){if(!TS.ui.growls.canSpeak()){return null
}if(TS.ui.growls.voices){return TS.ui.growls.voices
}TS.ui.growls.voices=[];
var c=macgap.app.availableVoices();
for(var d=0;
d<c.length;
d++){TS.ui.growls.voices.push({label:c[d].substr(c[d].lastIndexOf(".")+1),value:c[d]})
}return TS.ui.growls.voices
},canSpeak:function(){if(window.macgap&&macgap.app&&macgap.app.speakStringWithVoiceAndRateAndCallback){return true
}return false
},speak:function(a,b,h,g){if(!TS.ui.growls.canSpeak()){return
}var f=TS.ui.growls.speakQ;
var c={txt:a||"no text??",voice:h,speed:g,asap:b||false};
if(b&&f.length){var e;
for(var d=f.length-1;
d>-1;
d--){e=f[d];
if(e.asap||d===0){f.splice(d+1,0,c);
break
}}}else{f.push(c)
}if(f.length==1){TS.ui.growls._speakNext()
}},_speakNext:function(){if(!TS.ui.growls.speakQ.length){return
}var b=TS.ui.growls.speakQ[0];
if(b.speaking){return
}b.speaking=true;
var a=TS.ui.growls.getVoices();
macgap.app.speakStringWithVoiceAndRateAndCallback(b.txt,b.voice||TS.model.prefs.mac_speak_voice||TS.utility.randomFromArray(a).value,b.speed||TS.model.prefs.mac_speak_speed||TS.utility.randomInt(100,300),function(){setTimeout(function(){TS.ui.growls.speakQ.shift();
TS.ui.growls._speakNext()
},100)
})
},imMessageReceived:function(a,b){if(!b){TS.error("no msg?");
return
}if(b.no_display){return
}TS.ui.growls.growlImMessage(a,b,true)
},growlImMessage:function(h,e,d,c){if(!e){TS.error("no msg?");
return
}if(e.no_display){return
}if(d&&!TS.model.ui.is_window_focused&&document.title.indexOf("!")==-1){document.title="! "+document.title
}if(!c&&!TS.model.prefs.growls_enabled){return
}if(!TS.ui.growls.checkPermission()){return
}var g=false;
if(h.id!=TS.model.active_im_id||!TS.model.ui.is_window_focused){g=true
}if(e.user==TS.model.user.id||(e.comment&&e.comment.user==TS.model.user.id)){g=false
}var k=TS.templates.builders.getBotName(e);
if(e.no_notifications){g=false
}if(!g&&!c){return
}var l=function(){TS.ims.startImByMemberId(h.user)
};
var b=TS.ui.growls.extractTxtFromMsg(e,true);
TS.sounds.play("new_message");
var f=k||TS.ims.getDisplayNameOfUserForIm(h);
TS.ui.growls.maybeBounceDockIcon();
var a=!TS.model.ui.is_window_focused;
var j;
var i;
if(TS.getOtherAccountsCount()>0&&(TS.ui.growls.canSpeak()||window.winssb)){if(TS.model.supports_growl_subtitle){j=TS.model.team.name;
i="a dm from "+f
}else{j="["+TS.model.team.domain+"] from "+f
}}else{j="New message from "+f
}TS.ui.growls.show(j,i,TS.format.formatNotification(b),l,a,true,e,h.id);
if(TS.model.prefs.speak_growls){TS.ui.growls.speakImMessage(h,e,b)
}},speakImMessage:function(b,g,a){if(!TS.ui.growls.canSpeak()){return
}if(!g){TS.error("no msg?");
return
}var f=TS.templates.builders.getBotName(g);
a=a||TS.ui.growls.extractTxtFromMsg(g,true);
var d=f||TS.ims.getDisplayNameOfUserForIm(b);
var e;
if(TS.getOtherAccountsCount()>0){e="On team "+TS.model.team.name+', a direct message from "'+d+'": '
}else{e='DM message from "'+d+'": '
}var c=e+TS.format.formatNotification(a);
TS.ui.growls.speak(c)
},extractFromNameFromCorGMessage:function(a){var b=TS.members.getMemberById(a.user);
return(((b)?TS.members.getMemberDisplayName(b):a.user)||TS.templates.builders.getBotName(a))||""
},extractTxtFromMsg:function(c,b){if(b&&TS.model.prefs.no_text_in_notifications){return""
}var a=c.type+" "+c.subtype+" (message missing text)";
if(c.text){a=c.text
}else{if(c.attachments&&c.attachments.length){a=TS.ui.growls.getGrowlableTxtFromAttachments(c.attachments)||a
}}return a
},containsCmd:function(a){var b=a&&TS.model.everyone_regex.test(a);
var d=a&&TS.model.channel_regex.test(a);
var c=a&&TS.model.group_regex.test(a);
return(b||d||c)
},windowFocusChanged:function(a){if(a){if((document.title.charAt(0)=="!"||document.title.charAt(0)=="*")&&TS.model.active_cid){document.title=document.title.slice(2)
}}if(!a&&TS.model.all_unread_highlights_cnt&&TS.model.prefs&&TS.model.prefs.mac_ssb_bounce=="long"){setTimeout(TS.ui.growls.maybeBounceDockIcon,100)
}},maybeBounceDockIcon:function(){if(!window.macgap){return
}if(!window.macgap.dock){return
}if(!TS.model.prefs.mac_ssb_bounce){return
}if(TS.model.prefs.mac_ssb_bounce=="long"){if(window.macgap.dock.bounceIndefinitely){window.macgap.dock.bounceIndefinitely()
}}else{if(window.macgap.dock.bounceOnce){window.macgap.dock.bounceOnce()
}}}})
})();
(function(){TS.registerModule("chat_history",{onStart:function(){TS.model.input_history=TS.storage.fetchInputHistory()
},add:function(a){if(TS.model.prefs&&!TS.model.prefs.arrow_history&&(!a||a.indexOf("/")!==0)){return
}var c=TS.model.input_history;
var b=c.indexOf(a);
if(b!=-1){c.splice(b,1)
}if(c.length&&c[0]===""){c.splice(0,1)
}c.unshift(a);
TS.storage.storeInputHistory(c);
TS.log(23,a);
TS.dir(23,c)
},resetPosition:function(a){TS.model.input_history_index=-1
},onArrowKey:function(d,b){if(TS.model.prefs&&!TS.model.prefs.arrow_history){return
}if(!TS.model.input_history.length){return
}var a=b.val();
var c="";
if(TS.model.input_history_index<0){TS.chat_history.add(a);
TS.model.input_history_index++
}if(d.which==TS.utility.keymap.up){TS.model.input_history_index++;
if(TS.model.input_history_index>=TS.model.input_history.length){TS.model.input_history_index=TS.model.input_history.length-1;
return
}}else{if(d.which==TS.utility.keymap.down){TS.model.input_history_index--;
if(TS.model.input_history_index<0){TS.model.input_history_index=-1;
return
}}else{return
}}c=TS.model.input_history[TS.model.input_history_index];
d.preventDefault();
TS.utility.populateInput(TS.client.ui.$msg_input,c);
if(d.which==TS.utility.keymap.up){b.setCursorPosition(0)
}else{b.setCursorPosition(b.val().length)
}}})
})();
(function(){TS.registerModule("ui.paste",{catcher_div:null,onStart:function(){if(!window.Clipboard){TS.ui.paste.catcher_div=document.createElement("div");
TS.ui.paste.catcher_div.setAttribute("contenteditable","");
TS.ui.paste.catcher_div.setAttribute("class","offscreen");
document.body.appendChild(TS.ui.paste.catcher_div)
}var a=86;
$(window.document).keydown(function(b){if(!TS.ui.paste.okToGo()){return
}if(TS.utility.cmdKey(b)&&b.which==a){if(TS.ui.paste.catcher_div&&!TS.utility.isFocusOnInput()){TS.ui.paste.catcher_div.focus()
}}});
$(window).bind("paste",TS.ui.paste.handler)
},okToGo:function(){if(!TS.client.ui.$msg_input){return false
}if(!TS.utility.isFocusOnInput()||document.activeElement==TS.client.ui.$msg_input[0]){return true
}return false
},handler:function(g){if(!TS.ui.paste.okToGo()){return
}TS.info("TS.ui.paste.handler");
g=g.originalEvent||g;
var m=TS.model.shift_key_pressed;
var d=!TS.model.is_safari_desktop&&TS.model.alt_key_pressed;
if(!TS.model.is_FF&&g.clipboardData){TS.info("clipboardData!");
TS.info(g.clipboardData.types);
var f;
var a;
var l=false;
var j=g.clipboardData.items;
var h={};
if(j){for(f=0;
f<j.length;
f++){if(j[f]){h[j[f].type]=true
}}for(f=0;
f<j.length;
f++){if(j[f].type.indexOf("image")!==-1){if(TS.model.is_mac&&h["text/plain"]&&h["text/html"]&&h["text/rtf"]){TS.info("Ignoring pasted image data, likely from Office/Word for Mac.")
}else{a=j[f].getAsFile();
g.preventDefault();
TS.client.ui.file_pasted_sig.dispatch(a,m);
l=true
}}}if(!l&&m&&TS.client&&!TS.model.insert_key_pressed&&!d){setTimeout(TS.client.ui.startSnippetFromChatInput,100)
}}else{TS.warn("no clipboardData.items");
if(window.macgap&&window.macgap.clipboard&&window.macgap.clipboard.readImage){var k=window.macgap.clipboard.readImage();
if(k){var b=document.getElementById("converter_canvas");
if(!b){$("body").append('<canvas id="converter_canvas" class="offscreen"></canvas>');
b=document.getElementById("converter_canvas")
}var o=b.getContext("2d");
var c=new Image();
c.src="data:image/tiff;base64,"+k;
c.onload=function(){b.width=c.width;
b.height=c.height;
o.clearRect(0,0,b.width,b.height);
o.drawImage(c,0,0);
var e=TS.utility.base64StrFromDataURI(b.toDataURL("image/png"));
TS.client.ui.file_pasted_sig.dispatch(e,m)
};
l=true;
g.preventDefault()
}}if(!l&&m&&TS.client&&!TS.model.v_key_pressed&&!d){setTimeout(TS.client.ui.startSnippetFromChatInput,100)
}}}else{setTimeout(TS.ui.paste.checkCatcher,0,m)
}},checkCatcher:function(j){var a=TS.ui.paste.catcher_div;
if(!a){return
}var c=a.childNodes[0];
var e=TS.client.ui.$msg_input.val();
var b=("textContent" in a)?a.textContent:a.innerText;
b=$.trim(b);
var g;
var f;
var i=false;
if(c){if(c.tagName==="IMG"){i=true;
TS.client.ui.file_pasted_sig.dispatch(TS.utility.base64StrFromDataURI(c.src),j)
}else{if(e){f=TS.client.ui.$msg_input.getCursorRange();
TS.info(f);
var d=f.l;
var m=f.s;
var k=e.substr(0,m);
var h=e.substr(m+d);
g=k+b+h
}else{g=b
}TS.info(g);
TS.client.ui.populateChatInput(g)
}}a.innerHTML="";
if(f){TS.client.ui.$msg_input.setCursorPosition(f.s+f.l+b.length)
}if(!i&&j&&TS.client){}}})
})();
(function(){TS.registerModule("ui.prefs_dialog",{showing:false,onStart:function(){TS.prefs.sidebar_theme_changed_sig.add(e);
TS.prefs.dtop_notif_changed_sig.add(l);
TS.prefs.read_changed_sig.add(r);
TS.prefs.display_real_names_override_changed_sig.add(q);
TS.prefs.team_display_real_names_changed_sig.add(q);
TS.prefs.mac_speak_changed_sig.add(t)
},switchToDebuggingPrefs:function(){o();
setTimeout(TS.ui.debug_prefs_dialog.start,500)
},onGrowlsPermissionLinkClick:function(){TS.info("button clicked");
$("#growls_permission_div").addClass("hidden");
$("#growls_instructions_div").removeClass("hidden");
TS.ui.growls.promptForPermission(function(v,u){TS.info("callback called allowed:"+v+" permission_level:"+u);
$("#growls_instructions_div").addClass("hidden");
if(u=="granted"&&v){$("#growls_allowed_div").removeClass("hidden").find(".desktop_notifications_title").addClass("kelly_green").text("Desktop Notifications enabled!");
if(!TS.model.prefs.growls_enabled){TS.prefs.setPrefByAPI({name:"growls_enabled",value:true});
TS.model.prefs.growls_enabled=true
}l()
}else{if(u=="default"){$("#growls_permission_div").removeClass("hidden")
}else{if(u=="denied"){$("#growls_disallowed_div").removeClass("hidden")
}else{alert("huh allowed:"+v+" permission_level:"+u)
}}}})
},start:function(w,u){w=w||s;
if(!p){f()
}if(TS.ui.prefs_dialog.showing){o();
return
}var E=TS.model.prefs.highlight_words||"";
E=E.replace(/\,/g,", ").replace(/\ \ /g," ");
var z=[];
var K=[];
var x;
var D=TS.channels.getChannelsForUser();
D.sort(function v(M,L){var N=M._name_lc;
var O=L._name_lc;
if(N<O){return -1
}if(N>O){return 1
}return 0
});
for(var y in D){var H=D[y];
x=false;
if($.inArray(H.id,TS.model.search_exclude_channels)!=-1){x=true
}if(H.is_archived){K.push({search_channel_exclusion:x,channel:H})
}else{z.push({search_channel_exclusion:x,channel:H})
}}var J=(TS.model.mac_ssb_version&&TS.model.mac_ssb_version>=0.32);
var C=!!window.winssb;
var I={member:TS.model.user,highlight_words:E,presence_str:TS.view.getUserPresenceStr(),prefs:TS.model.prefs,team_prefs:TS.model.team.prefs,active_channels:z,archived_channels:K,inline_img_byte_limit:TS.model.inline_img_byte_limit,new_message_sounds:TS.boot_data.new_message_sounds,show_mac_ssb_prefs:J,show_win_ssb_prefs:C,feature_chat_sounds:TS.boot_data.feature_chat_sounds,team_name:TS.model.team.name};
if(TS.ui.growls.canSpeak()){I.speak_voices=TS.ui.growls.getVoices();
I.speak_speeds=[50,100,150,200,250,300,350,400];
I.show_voices=true
}if(TS.model.prefs.sidebar_theme_custom_values&&TS.model.prefs.sidebar_theme_custom_values!="undefined"){I.theme=JSON.parse(TS.model.prefs.sidebar_theme_custom_values);
if(TS.model.prefs.sidebar_theme&&(TS.model.prefs.sidebar_theme=="cotton_theme"||TS.model.prefs.sidebar_theme=="eco_theme")){I.show_customization_ui=true
}else{I.show_customization_ui=b
}}var B=TS.templates.prefs_dialog(I);
p.empty();
p.html(B);
var G=p.find("#read_tips");
G.html(TS.utility.emojiReplace(G.html()));
p.find(".modal-nav a").bind("click",function(){c($(this).data("which"))
});
c(w);
$("#all_channels_loud_p").addClass("hidden");
$(".growls_stuff").addClass("hidden");
if(TS.ui.growls.shouldShowPermissionButton()){$("#growls_permission_div").removeClass("hidden")
}else{if(TS.ui.growls.checkPermission()){$("#growls_allowed_div").removeClass("hidden")
}else{if(TS.ui.growls.no_notifications){$("#growls_impossible_div").removeClass("hidden")
}else{if(TS.ui.growls.getPermissionLevel()=="denied"){$("#growls_disallowed_div").removeClass("hidden")
}}}}if(J){$("#mac_ssb_bounce_cb").prop("checked",!!TS.model.prefs.mac_ssb_bounce);
$("#mac_ssb_bounce_short_cb").prop("checked",TS.model.prefs.mac_ssb_bounce!="long");
var F=function(){if(!!TS.model.prefs.mac_ssb_bounce){$("#mac_ssb_bounce_short_cb").prop("disabled",false)
}else{$("#mac_ssb_bounce_short_cb").prop("disabled",true)
}};
F();
$("#mac_ssb_bounce_cb").bind("change",function(){var L=!!$(this).prop("checked");
var M=!!$("#mac_ssb_bounce_short_cb").prop("checked");
TS.model.prefs.mac_ssb_bounce=L?(M?"short":"long"):"";
TS.prefs.setPrefByAPI({name:"mac_ssb_bounce",value:TS.model.prefs.mac_ssb_bounce});
F()
});
$("#mac_ssb_bounce_short_cb").bind("change",function(){var L=!!$(this).prop("checked");
TS.prefs.setPrefByAPI({name:"mac_ssb_bounce",value:L?"short":"long"})
});
$("#mac_ssb_bullet_cb").prop("checked",TS.model.prefs.mac_ssb_bullet===true);
$("#mac_ssb_bullet_cb").bind("change",function(){var L=!!$(this).prop("checked");
TS.prefs.setPrefByAPI({name:"mac_ssb_bullet",value:L})
})
}if(C){$("#winssb_launch_on_start_cb").prop("checked",!!winssb.app.willLaunchOnStartup);
$("#winssb_launch_on_start_cb").bind("change",function(){var L=!!$(this).prop("checked");
if(window.winssb.app.launchOnStartup){window.winssb.app.launchOnStartup(L)
}});
$("#winssb_run_from_tray_cb").prop("checked",TS.model.prefs.winssb_run_from_tray);
$("#winssb_run_from_tray_cb").bind("change",function(){var L=!!$(this).prop("checked");
TS.prefs.setPrefByAPI({name:"winssb_run_from_tray",value:L})
})
}r();
$('input:radio[name="read_rd"]').bind("change",function(){var L=$(this).val();
TS.prefs.setReadStateTrackingPref(L);
r()
});
e();
p.find('input:radio[name="sidebar_theme_rd"]').bind("change",function(){var L=$(this).val();
var M=TS.sidebar_themes.default_themes[L];
a(L,M)
});
p.find("input.color_hex").bind("textchange",function(){var L=$.trim($(this).val());
if(!L.match(TS.prefs.hex_regex)){clearTimeout(k);
return
}if(L.indexOf("#")!==0){L="#"+L
}$(this).prev(".color_swatch").css("background-color",L).data("hex",L);
clearTimeout(k);
k=setTimeout(function(){var M="custom_theme";
var N={column_bg:p.find('input[name="color_column_bg_hex"]').val(),menu_bg:p.find('input[name="color_menu_bg_hex"]').val(),active_item:p.find('input[name="color_active_item_hex"]').val(),active_item_text:p.find('input[name="color_active_item_text_hex"]').val(),hover_item:p.find('input[name="color_hover_item_hex"]').val(),text_color:p.find('input[name="color_text_color_hex"]').val(),active_presence:p.find('input[name="color_active_presence_hex"]').val(),badge:p.find('input[name="color_badge_hex"]').val()};
$.each(N,function(O,P){if(P[0]!=="#"){N[O]="#"+P
}});
a(M,N)
},250)
});
p.find("#sidebar_theme_custom").bind("textchange",function(M){var L=$(this);
setTimeout(function(){var Q=$.trim(L.val());
var O=Q.replace(/ /g,"").split(",");
var N=true;
$.each(O,function(R,S){if(!S.match(TS.prefs.hex_regex)){N=false
}if(!N){return
}});
if(!N){clearTimeout(k);
return
}var P={column_bg:O[0],menu_bg:O[1],active_item:O[2],active_item_text:O[3],hover_item:O[4],text_color:O[5],active_presence:O[6],badge:O[7]};
$.each(P,function(R,S){if(S[0]!=="#"){P[R]="#"+S
}});
clearTimeout(k);
k=setTimeout(function(){a("custom_theme",P)
},250)
},0)
});
p.find(".color_swatch").bind("click.show_picker",function(N){N.stopPropagation();
var M=$(this);
var L=M.next("input");
p.find(".color_swatch.selected").removeClass("selected").find(".colpick").addClass("hidden");
var O=M.data("hex").replace("#","");
M.colpick({flat:true,layout:"hex",color:O,submit:0,onChange:function(P,T,R,S,Q){M.css("background-color","#"+T).data("hex","#"+T);
L.val("#"+T);
clearTimeout(k);
k=setTimeout(function(){var U="custom_theme";
var V={column_bg:p.find('input[name="color_column_bg_hex"]').val(),menu_bg:p.find('input[name="color_menu_bg_hex"]').val(),active_item:p.find('input[name="color_active_item_hex"]').val(),active_item_text:p.find('input[name="color_active_item_text_hex"]').val(),hover_item:p.find('input[name="color_hover_item_hex"]').val(),text_color:p.find('input[name="color_text_color_hex"]').val(),active_presence:p.find('input[name="color_active_presence_hex"]').val(),badge:p.find('input[name="color_badge_hex"]').val()};
a(U,V)
},500)
}}).colpickSetColor(O);
$("html").bind("click.hide_colpick",function(){p.find(".color_swatch.selected").removeClass("selected").find(".colpick").addClass("hidden")
});
M.addClass("selected").find(".colpick").removeClass("hidden")
});
$("#customize_theme_toggle").bind("click",function(){$("#customize_theme_info").addClass("hidden");
$("#prefs_themes_customize").removeClass("hidden");
b=true
});
l();
$('input:radio[name="notifications_rd"]').bind("change",function(){var L=$(this).val();
if(L=="all"||L=="mentions"){if(L=="all"){TS.prefs.setPrefByAPI({name:"all_channels_loud",value:true});
TS.model.prefs.all_channels_loud=true
}else{TS.prefs.setPrefByAPI({name:"all_channels_loud",value:false});
TS.model.prefs.all_channels_loud=false
}if(!TS.model.prefs.growls_enabled){TS.prefs.setPrefByAPI({name:"growls_enabled",value:true});
TS.model.prefs.growls_enabled=true
}}else{TS.prefs.setPrefByAPI({name:"growls_enabled",value:false});
TS.model.prefs.growls_enabled=false
}l()
});
$("#no_text_in_notifications_cb").bind("change",function(){var L=!$(this).prop("checked");
TS.prefs.setPrefByAPI({name:"no_text_in_notifications",value:L})
});
$("#arrow_history_cb").prop("checked",TS.model.prefs.arrow_history===true);
$("#arrow_history_cb").bind("change",function(){var L=!!$(this).prop("checked");
TS.prefs.setPrefByAPI({name:"arrow_history",value:L})
});
$("#convert_emoticons_cb").prop("checked",TS.model.prefs.convert_emoticons===true);
$("#convert_emoticons_cb").bind("change",function(){var L=!!$(this).prop("checked");
TS.prefs.setPrefByAPI({name:"convert_emoticons",value:L})
});
$("#autoplay_chat_sounds_cb").prop("checked",TS.model.prefs.autoplay_chat_sounds===true);
$("#autoplay_chat_sounds_cb").bind("change",function(){var L=!!$(this).prop("checked");
TS.prefs.setPrefByAPI({name:"autoplay_chat_sounds",value:L})
});
$("#tab_ui_return_selects_cb").prop("checked",TS.model.prefs.tab_ui_return_selects===true);
$("#tab_ui_return_selects_cb").bind("change",function(){var L=!!$(this).prop("checked");
TS.prefs.setPrefByAPI({name:"tab_ui_return_selects",value:L})
});
$("#comma_key_prefs_cb").prop("checked",TS.model.prefs.comma_key_prefs===true);
$("#comma_key_prefs_cb").bind("change",function(){var L=!!$(this).prop("checked");
TS.prefs.setPrefByAPI({name:"comma_key_prefs",value:L})
});
$("#collapsible_cb").prop("checked",TS.model.prefs.collapsible===true);
$("#collapsible_cb").bind("change",function(){var L=!!$(this).prop("checked");
TS.prefs.setPrefByAPI({name:"collapsible",value:L});
$("#collapsible_by_click_cb").prop("disabled",!L)
});
$("#collapsible_by_click_cb").prop("checked",TS.model.prefs.collapsible_by_click===true);
$("#collapsible_by_click_cb").prop("disabled",!TS.model.prefs.collapsible);
$("#collapsible_by_click_cb").bind("change",function(){var L=!!$(this).prop("checked");
TS.prefs.setPrefByAPI({name:"collapsible_by_click",value:L})
});
$("#start_scroll_at_oldest_cb").prop("checked",TS.model.prefs.start_scroll_at_oldest===true);
$("#start_scroll_at_oldest_cb").bind("change",function(){TS.prefs.setPrefByAPI({name:"start_scroll_at_oldest",value:!!$(this).prop("checked")})
});
$("#show_presence_cb").prop("checked",TS.model.prefs.show_member_presence===true);
$("#show_presence_cb").bind("change",function(){TS.prefs.setPrefByAPI({name:"show_member_presence",value:!!$(this).prop("checked")})
});
$("#expand_inline_imgs_cb").prop("checked",TS.model.prefs.expand_inline_imgs===true);
$("#expand_inline_imgs_cb").bind("change",function(){var L=!!$(this).prop("checked");
TS.prefs.setPrefByAPI({name:"expand_inline_imgs",value:L});
TS.model.prefs.expand_inline_imgs=L;
$("#dont_obey_inline_img_limit_cb").prop("disabled",!TS.model.prefs.expand_inline_imgs)
});
$("#dont_obey_inline_img_limit_cb").prop("checked",TS.model.prefs.obey_inline_img_limit===false);
$("#dont_obey_inline_img_limit_cb").bind("change",function(){p.find("#dont_obey_inline_img_limit_p").css("background-color","");
var L=!!$(this).prop("checked");
TS.model.prefs.obey_inline_img_limit=!L;
TS.prefs.setPrefByAPI({name:"obey_inline_img_limit",value:!L})
});
$("#dont_obey_inline_img_limit_cb").prop("disabled",!TS.model.prefs.expand_inline_imgs);
$("#expand_internal_inline_imgs_cb").prop("checked",TS.model.prefs.expand_internal_inline_imgs===true);
$("#expand_internal_inline_imgs_cb").bind("change",function(){TS.prefs.setPrefByAPI({name:"expand_internal_inline_imgs",value:!!$(this).prop("checked")})
});
$("#webapp_spellcheck_cb").prop("checked",TS.model.prefs.webapp_spellcheck===true).removeClass("hidden");
$("#webapp_spellcheck_cb").bind("change",function(){TS.prefs.setPrefByAPI({name:"webapp_spellcheck",value:!!$(this).prop("checked")})
});
if(window.winssb){$("#webapp_spellcheck_cb").addClass("hidden")
}$("#require_at_cb").prop("checked",TS.model.prefs.require_at===true).removeClass("hidden");
$("#require_at_cb").bind("change",function(){TS.prefs.setPrefByAPI({name:"require_at",value:!!$(this).prop("checked")})
});
$("#mute_sounds_cb").prop("checked",TS.model.prefs.mute_sounds===true);
$("#mute_sounds_cb").bind("change",function(){var L=!!$(this).prop("checked");
TS.model.prefs.mute_sounds=L;
TS.prefs.setPrefByAPI({name:"mute_sounds",value:L});
$("#soundpreview").addClass("hidden");
if(TS.model.prefs.mute_sounds){$("#new_msg_snd_select").val("none")
}else{$("#new_msg_snd_select").val(TS.model.prefs.new_msg_snd);
if(TS.model.prefs.new_msg_snd!="none"){$("#soundpreview").removeClass("hidden")
}}});
$("#show_typing_cb").prop("checked",TS.model.prefs.show_typing===true).removeClass("hidden");
$("#show_typing_cb").bind("change",function(){TS.prefs.setPrefByAPI({name:"show_typing",value:!!$(this).prop("checked")})
});
$("#pagekeys_handled_cb").prop("checked",TS.model.prefs.pagekeys_handled===true).removeClass("hidden");
$("#pagekeys_handled_cb").bind("change",function(){TS.prefs.setPrefByAPI({name:"pagekeys_handled",value:!!$(this).prop("checked")})
});
$("#f_key_search_cb").prop("checked",TS.model.prefs.f_key_search===true).removeClass("hidden");
$("#f_key_search_cb").bind("change",function(){TS.prefs.setPrefByAPI({name:"f_key_search",value:!!$(this).prop("checked")})
});
$("#k_key_omnibox_cb").prop("checked",TS.model.prefs.k_key_omnibox===true).removeClass("hidden");
$("#k_key_omnibox_cb").bind("change",function(){TS.prefs.setPrefByAPI({name:"k_key_omnibox",value:!!$(this).prop("checked")})
});
t();
$("#speak_growls_cb").bind("change",function(){var L=!!$(this).prop("checked");
TS.prefs.setPrefByAPI({name:"speak_growls",value:L})
});
$("#mac_speak_voice_select").bind("change",function(){var L=$(this).val();
TS.model.prefs.mac_speak_voice=L;
TS.prefs.setPrefByAPI({name:"mac_speak_voice",value:L});
$("#mac_speak_test").trigger("click")
});
$("#mac_speak_speed_select").bind("change",function(){var L=parseInt($(this).val());
TS.model.prefs.mac_speak_speed=L;
TS.prefs.setPrefByAPI({name:"mac_speak_speed",value:L});
$("#mac_speak_test").trigger("click")
});
$("#mac_speak_test").bind("click",function(){if(!TS.ui.growls.speakQ.length){TS.ui.growls.speak("Time flies like an arrow, fruit flies like a banana.",true,TS.model.prefs.mac_speak_voice,TS.model.prefs.mac_speak_speed)
}});
q();
$("#display_real_names_override_cb").bind("change",function(){var L=!!$(this).prop("checked");
var M;
if(TS.model.team.prefs.display_real_names){M=(L)?0:-1
}else{M=(L)?1:0
}TS.prefs.setPrefByAPI({name:"display_real_names_override",value:M})
});
$("#time24_cb").prop("checked",TS.model.prefs.time24===true);
$("#time24_cb").bind("change",function(){TS.prefs.setPrefByAPI({name:"time24",value:!!$(this).prop("checked")})
});
$("#enter_is_special_in_tbt_tip").tooltip();
$("#enter_is_special_in_tbt_cb").prop("checked",TS.model.prefs.enter_is_special_in_tbt===true);
$("#enter_is_special_in_tbt_cb").bind("change",function(){TS.prefs.setPrefByAPI({name:"enter_is_special_in_tbt",value:!!$(this).prop("checked")})
});
$("#expand_non_media_attachments_cb").prop("checked",TS.model.prefs.expand_non_media_attachments===true);
$("#expand_non_media_attachments_cb").bind("change",function(){TS.prefs.setPrefByAPI({name:"expand_non_media_attachments",value:!!$(this).prop("checked")})
});
$('input:radio[name="emoji_mode_select"]').filter('[value="'+TS.model.prefs.emoji_mode+'"]').prop("checked",true);
$('input:radio[name="emoji_mode_select"]').bind("change",function(){TS.prefs.setPrefByAPI({name:"emoji_mode",value:$(this).val()})
});
$('input:radio[name="messages_theme_select"]').filter('[value="'+TS.model.prefs.messages_theme+'"]').prop("checked",true);
$('input:radio[name="messages_theme_select"]').bind("change",function(){TS.prefs.setPrefByAPI({name:"messages_theme",value:$(this).val()})
});
$("#ls_disabled_cb").prop("checked",TS.model.prefs.ls_disabled===true);
$("#ls_disabled_cb").bind("change",function(){var L=!!$(this).prop("checked");
TS.model.prefs.ls_disabled=L;
TS.prefs.setPrefByAPI({name:"ls_disabled",value:L});
TS.storage.setDisabled(TS.model.prefs.ls_disabled)
});
$("#ss_emojis_cb").prop("checked",TS.model.prefs.ss_emojis!==true);
$("#ss_emojis_cb").bind("change",function(){var L=!$(this).prop("checked");
TS.model.prefs.ss_emojis=L;
TS.prefs.setPrefByAPI({name:"ss_emojis",value:L})
});
$("#full_text_extracts_cb").prop("checked",TS.model.prefs.full_text_extracts===true);
$("#full_text_extracts_cb").bind("change",function(){var L=!!$(this).prop("checked");
TS.model.prefs.full_text_extracts=L;
TS.prefs.setPrefByAPI({name:"full_text_extracts",value:L})
});
$("#fuzzy_matching_cb").prop("checked",TS.model.prefs.fuzzy_matching===true);
$("#fuzzy_matching_cb").bind("change",function(){var L=!!$(this).prop("checked");
TS.model.prefs.fuzzy_matching=L;
TS.prefs.setPrefByAPI({name:"fuzzy_matching",value:L})
});
$("#load_lato_2_cb").prop("checked",TS.model.prefs.load_lato_2===true);
$("#load_lato_2_cb").bind("change",function(){var L=!!$(this).prop("checked");
TS.model.prefs.load_lato_2=L;
TS.prefs.setPrefByAPI({name:"load_lato_2",value:L},function(){TS.reload()
})
});
$("#temp_archive_viewer_cb").prop("checked",TS.model.prefs.temp_archive_viewer===true);
$("#temp_archive_viewer_cb").bind("change",function(){var L=!!$(this).prop("checked");
TS.model.prefs.temp_archive_viewer=L;
TS.prefs.setPrefByAPI({name:"temp_archive_viewer",value:L},function(){TS.reload()
})
});
$("#enable_flexpane_rework_cb").prop("checked",TS.model.prefs.enable_flexpane_rework===true);
$("#enable_flexpane_rework_cb").bind("change",function(){var L=!!$(this).prop("checked");
TS.model.prefs.enable_flexpane_rework=L;
TS.prefs.setPrefByAPI({name:"enable_flexpane_rework",value:L},function(){TS.reload()
})
});
$("#flex_resize_window_cb").prop("checked",TS.model.prefs.flex_resize_window===true);
$("#flex_resize_window_cb").bind("change",function(){var L=!!$(this).prop("checked");
TS.model.prefs.flex_resize_window=L;
TS.prefs.setPrefByAPI({name:"flex_resize_window",value:L})
});
var A=Math.random();
$("#emo_bear").attr("src","/img/emo_bear.gif?"+A);
$("#surprise_me").on("change",function(){$("#surprise").fadeIn(150,function(){setTimeout(function(){$("#surprise").fadeOut(500,function(){A=Math.random();
$("#emo_bear").attr("src","/img/emo_bear.gif?"+A);
$("#surprise_me").prop("checked",false)
})
},2400)
})
});
$("#search_channel_exclusion").chosen({placeholder_text_multiple:"Click here to pick channels to exclude...",optional_prefix:"#"});
$("#search_channel_exclusion_chzn").find(".chzn-results").css("max-height","200px");
$("#search_channel_exclusion_holder").css("min-height",235);
$(".modal-body").css("overflow-y","visible");
$("#search_channel_exclusion_chzn").css("width","100%");
$("#search_channel_exclusion_chzn").find(".default").css("width","100%");
$("#search_channel_exclusion").bind("change",function(){var L=$(this).val();
TS.prefs.setPrefByAPI({name:"search_exclude_channels",value:L?L.join(","):""})
});
$("#soundpreview").bind("click",function(){var L=$("#new_msg_snd_select").val();
TS.sounds.play(L)
});
if(TS.model.prefs.new_msg_snd=="none"||TS.model.prefs.mute_sounds){$("#soundpreview").addClass("hidden")
}else{$("#soundpreview").removeClass("hidden")
}$("#new_msg_snd_select").val((TS.model.prefs.mute_sounds)?"none":TS.model.prefs.new_msg_snd);
$("#new_msg_snd_select").change(function(){var L=$("#new_msg_snd_select").val();
if(L!="none"&&TS.model.prefs.mute_sounds){TS.model.prefs.mute_sounds=false;
TS.prefs.setPrefByAPI({name:"mute_sounds",value:false});
$("#mute_sounds_cb").prop("checked",false)
}if(L!="none"){$("#soundpreview").removeClass("hidden");
TS.sounds.play(L)
}else{$("#soundpreview").addClass("hidden")
}TS.prefs.setPrefByAPI({name:"new_msg_snd",value:L})
});
$("#sidebar_behavior_select").val(TS.model.prefs.sidebar_behavior);
$("#sidebar_behavior_select").change(function(){var L=$("#sidebar_behavior_select").val();
TS.prefs.setPrefByAPI({name:"sidebar_behavior",value:L});
TS.prefs.onPrefChanged({name:"sidebar_behavior",value:L})
});
$("#msg_preview_cb").prop("checked",TS.model.prefs.msg_preview===true);
$("#msg_preview_cb").bind("change",function(){var L=!!$(this).prop("checked");
TS.prefs.setPrefByAPI({name:"msg_preview",value:L});
$("#msg_preview_displaces_cb").prop("disabled",!L);
$("#msg_preview_persistent_cb").prop("disabled",!L);
TS.prefs.onPrefChanged({name:"msg_preview",value:L})
});
$("#msg_preview_displaces_cb").prop("checked",TS.model.prefs.msg_preview_displaces===true);
$("#msg_preview_displaces_cb").prop("disabled",!TS.model.prefs.msg_preview);
$("#msg_preview_displaces_cb").bind("change",function(){var L=!!$(this).prop("checked");
TS.prefs.setPrefByAPI({name:"msg_preview_displaces",value:L});
TS.prefs.onPrefChanged({name:"msg_preview_displaces",value:L});
if(!L){TS.prefs.setPrefByAPI({name:"msg_preview_persistent",value:L});
$("#msg_preview_persistent_cb").prop("checked",L);
TS.prefs.onPrefChanged({name:"msg_preview_persistent",value:L})
}});
$("#msg_preview_persistent_cb").prop("checked",TS.model.prefs.msg_preview_persistent===true);
$("#msg_preview_persistent_cb").prop("disabled",!TS.model.prefs.msg_preview);
$("#msg_preview_persistent_cb").bind("change",function(){var L=!!$(this).prop("checked");
TS.prefs.setPrefByAPI({name:"msg_preview_persistent",value:L});
TS.prefs.onPrefChanged({name:"msg_preview_persistent",value:L});
if(L){TS.prefs.setPrefByAPI({name:"msg_preview_displaces",value:L});
$("#msg_preview_displaces_cb").prop("checked",L);
TS.prefs.onPrefChanged({name:"msg_preview_displaces",value:L})
}});
p.modal("show");
p.find(".dialog_cancel").click(o);
p.find(".dialog_go").click(g);
if(u){p.find(u).css("background-color","#FFF3B8")
}m();
if(w=="themes"){h()
}}});
var p=null;
var s="notifications";
var k=0;
var b=false;
var m=function(){var u=$("#col_channels_bg").width();
var v=$('<div id="sidebar_overlay"></div>').css({position:"absolute",top:"0",bottom:"0",left:"-"+u+"px",width:u+"px"});
$(".modal-backdrop").append(v)
};
var h=function(){var u=$("#col_channels_bg").width();
$(".modal-backdrop").css("left",u+"px")
};
var d=function(){$(".modal-backdrop").css("left","0")
};
var e=function(u){u=(u!==false);
if(TS.prefs.last_theme_selected_in_UI&&TS.model.prefs.sidebar_theme!==TS.prefs.last_theme_selected_in_UI){return
}else{if(TS.prefs.last_theme_selected_in_UI&&u){TS.prefs.last_theme_selected_in_UI=null
}}if(TS.model.prefs.sidebar_theme=="default"){TS.model.prefs.sidebar_theme="default_theme"
}var w=TS.model.prefs.sidebar_theme;
$('input:radio[name="sidebar_theme_rd"]').filter('[value="'+w+'"]').prop("checked",true);
if(TS.model.prefs.sidebar_theme_custom_values&&TS.model.prefs.sidebar_theme_custom_values!="undefined"){var x=JSON.parse(TS.model.prefs.sidebar_theme_custom_values);
var v=$.map(x,function(y){return y
});
if(p){p.find('input[name="color_column_bg_hex"]').val(x.column_bg);
p.find('input[name="color_menu_bg_hex"]').val(x.menu_bg);
p.find('input[name="color_active_item_hex"]').val(x.active_item);
p.find('input[name="color_active_item_text_hex"]').val(x.active_item_text);
p.find('input[name="color_hover_item_hex"]').val(x.hover_item);
p.find('input[name="color_text_color_hex"]').val(x.text_color);
p.find('input[name="color_active_presence_hex"]').val(x.active_presence);
p.find('input[name="color_badge_hex"]').val(x.badge);
p.find('.color_swatch[data-theme-element="column_bg"]').css("background-color",x.column_bg).data("hex",x.column_bg);
p.find('.color_swatch[data-theme-element="menu_bg"]').css("background-color",x.menu_bg).data("hex",x.menu_bg);
p.find('.color_swatch[data-theme-element="active_item"]').css("background-color",x.active_item).data("hex",x.active_item);
p.find('.color_swatch[data-theme-element="active_item_text"]').css("background-color",x.active_item_text).data("hex",x.active_item_text);
p.find('.color_swatch[data-theme-element="hover_item"]').css("background-color",x.hover_item).data("hex",x.hover_item);
p.find('.color_swatch[data-theme-element="text_color"]').css("background-color",x.text_color).data("hex",x.text_color);
p.find('.color_swatch[data-theme-element="active_presence"]').css("background-color",x.active_presence).data("hex",x.active_presence);
p.find('.color_swatch[data-theme-element="badge"]').css("background-color",x.badge).data("hex",x.badge);
$("#sidebar_theme_custom").val(v.join(","))
}}};
var l=function(){var v="all";
if(!TS.model.prefs.growls_enabled){v="never"
}else{if(!TS.model.prefs.all_channels_loud){v="mentions"
}}$("#growls_test").css("visibility","");
$('input:radio[name="notifications_rd"]').filter('[value="'+v+'"]').prop("checked",true);
var u=TS.templates.builders.buildNonDefaultNotificationBlock("margin-left");
if(u){$(".non_default").removeClass("hidden");
$("#non_default_html").html(u);
$("#no_non_default").addClass("hidden")
}else{$(".non_default").addClass("hidden");
$("#no_non_default").removeClass("hidden")
}$("#non_default_tip_link").tooltip("destroy").attr("title",TS.templates.builders.buildNonDefaultNotificationBlock("align_left")).tooltip({html:true});
if(v=="never"){$("#no_text_in_notifications_cb").prop("disabled",true).prop("checked",false)
}else{$("#no_text_in_notifications_cb").prop("disabled",false).prop("checked",TS.model.prefs.no_text_in_notifications!==true)
}};
var r=function(){var u=TS.prefs.getReadStateTrackingPref();
$('input:radio[name="read_rd"]').filter('[value="'+u+'"]').prop("checked",true)
};
var q=function(){var u=$("#display_real_names_override_cb");
var v=TS.model.prefs.display_real_names_override;
u.prop("checked",(TS.model.team.prefs.display_real_names&&v!=-1)||v==1);
if(TS.model.team.prefs.display_real_names){$("#display_real_names_default").removeClass("hidden");
$("#display_usernames_default").addClass("hidden")
}else{$("#display_real_names_default").addClass("hidden");
$("#display_usernames_default").removeClass("hidden")
}};
var t=function(){$("#speak_growls_cb").prop("checked",TS.model.prefs.speak_growls===true);
$("#mac_speak_voice_select").val(TS.model.prefs.mac_speak_voice);
$("#mac_speak_speed_select").val(TS.model.prefs.mac_speak_speed)
};
var i=function(u){if(!TS.ui.prefs_dialog.showing){return
}if(u.which==TS.utility.keymap.enter){if(TS.utility.getActiveElementProp("NODENAME")=="BODY"){g();
u.preventDefault()
}}else{if(u.which==TS.utility.keymap.esc){o()
}}};
var a=function(v,w){var u=false;
TS.prefs.last_theme_selected_in_UI=v;
TS.prefs.setPrefByAPI({name:"sidebar_theme",value:v});
TS.prefs.setPrefByAPI({name:"sidebar_theme_custom_values",value:JSON.stringify(w)});
TS.model.prefs.sidebar_theme=v;
TS.prefs.setSidebarThemeCustomValues(w);
e(u);
TS.view.sidebarThemePrefChanged(u)
};
var c=function(u){var v=p.find('.modal-nav a[data-which="'+u+'"]');
p.find(".modal-nav a").removeClass("active");
p.find(".dialog_tab_pane").removeClass("active");
v.addClass("active");
$("#"+v.data("pane-id")).addClass("active");
s=u;
if(u=="themes"){h()
}else{d()
}};
var f=function(){$("body").append('<div id="new_prefs_dialog" class="modal hide fade"></div>');
p=$("#new_prefs_dialog");
p.on("hide",function(u){if(u.target!=this){return
}j()
});
p.on("show",function(u){if(u.target!=this){return
}TS.ui.prefs_dialog.showing=TS.model.dialog_is_showing=true
});
p.on("shown",function(u){if(u.target!=this){return
}$(window.document).bind("keydown",i)
})
};
var j=function(){$("html").unbind("click.hide_colpick");
TS.ui.prefs_dialog.showing=TS.model.dialog_is_showing=false;
$(window.document).unbind("keydown",i)
};
var g=function(){if(!TS.ui.prefs_dialog.showing){TS.error("not showing?");
return
}TS.prefs.saveHighlightWords(p.find("#highlight_words_input").val());
p.modal("hide")
};
var o=function(){p.modal("hide")
}
})();
(function(){TS.registerModule("ui.debug_prefs_dialog",{div:null,showing:false,onStart:function(){},onKeydown:function(a){if(!TS.ui.debug_prefs_dialog.showing){return
}if(a.which==TS.utility.keymap.enter){TS.ui.debug_prefs_dialog.go();
a.preventDefault()
}else{if(a.which==TS.utility.keymap.esc){TS.ui.debug_prefs_dialog.cancel()
}}},start:function(){if(!TS.ui.debug_prefs_dialog.div){TS.ui.debug_prefs_dialog.build()
}if(TS.ui.prefs_dialog.showing){return
}TS.ui.debug_prefs_dialog.changed=false;
var c=TS.ui.debug_prefs_dialog.div;
var b={member:TS.model.user,prefs:TS.model.prefs};
var a=TS.templates.debug_prefs_dialog(b);
c.empty();
c.html(a);
$("#ls_disabled_cb").prop("checked",TS.model.prefs.ls_disabled===true);
$("#ls_disabled_cb").bind("change",function(){var d=!!$(this).prop("checked");
TS.model.prefs.ls_disabled=d;
TS.prefs.setPrefByAPI({name:"ls_disabled",value:d});
TS.storage.setDisabled(TS.model.prefs.ls_disabled);
c.find(".dialog_go").text("Reload now");
TS.ui.debug_prefs_dialog.changed=true
});
$("#ss_emojis_cb").prop("checked",TS.model.prefs.ss_emojis!==true);
$("#ss_emojis_cb").bind("change",function(){var d=!$(this).prop("checked");
TS.model.prefs.ss_emojis=d;
TS.prefs.setPrefByAPI({name:"ss_emojis",value:d});
c.find(".dialog_go").text("Reload now");
TS.ui.debug_prefs_dialog.changed=true
});
c.modal("show");
c.find(".dialog_cancel").click(TS.ui.debug_prefs_dialog.cancel);
c.find(".dialog_go").click(TS.ui.debug_prefs_dialog.go)
},go:function(){if(!TS.ui.debug_prefs_dialog.showing){TS.error("not showing?");
return
}var a=TS.ui.debug_prefs_dialog.div;
a.modal("hide")
},cancel:function(){TS.ui.debug_prefs_dialog.div.modal("hide")
},end:function(){TS.ui.debug_prefs_dialog.showing=TS.model.dialog_is_showing=false;
$(window.document).unbind("keydown",TS.ui.debug_prefs_dialog.onKeydown);
if(TS.ui.debug_prefs_dialog.changed){TS.reload()
}},build:function(){$("body").append('<div id="debug_prefs_dialog" class="modal hide fade"></div>');
var a=TS.ui.debug_prefs_dialog.div=$("#debug_prefs_dialog");
a.on("hide",function(b){if(b.target!=this){return
}TS.ui.debug_prefs_dialog.end()
});
a.on("show",function(b){if(b.target!=this){return
}TS.ui.debug_prefs_dialog.showing=TS.model.dialog_is_showing=true
});
a.on("shown",function(b){if(b.target!=this){return
}$(window.document).bind("keydown",TS.ui.debug_prefs_dialog.onKeydown)
})
}})
})();
(function(){TS.registerModule("ui.channel_prefs_dialog",{showing:false,onStart:function(){TS.prefs.push_changed_sig.add(j);
TS.prefs.dtop_notif_changed_sig.add(i);
TS.prefs.team_perms_pref_changed_sig.add(h);
if(TS.boot_data.feature_muting){TS.prefs.muted_channels_changed_sig.add(m)
}},start:function(s){if(!d){a()
}if(TS.ui.channel_prefs_dialog.showing){return
}var p=TS.shared.getModelObById(s);
if(!p||p.is_im){alert(s+" ???");
return
}var o="";
var q="";
if(p.is_channel){o="channel";
q="#"+p.name
}else{if(p.is_group){o="group";
q=p.name
}}g=s;
var r=TS.templates.channel_prefs_dialog({c_or_g:o,display_name:q,show_one_suppressed_cb:true,show_two_suppressed_cbs:false,is_muted:TS.notifs.isCorGMuted(s),model_ob:p});
d.html(r);
j();
i();
l();
if(TS.boot_data.feature_muting){m()
}$("#notifications_not_working").addClass("hidden");
$("#notifications_impossible").addClass("hidden");
$("#notifications_not_yet_allowed").addClass("hidden");
$("#notifications_not_enabled").addClass("hidden");
$("#notifications_not_allowed").addClass("hidden");
$("#notifications_working").removeClass("hidden");
if(TS.ui.growls.shouldShowPermissionButton()){$("#notifications_working").addClass("hidden");
$("#notifications_not_working").removeClass("hidden");
$("#notifications_not_yet_allowed").removeClass("hidden")
}else{if(!TS.ui.growls.checkPermission()){$("#notifications_working").addClass("hidden");
$("#notifications_not_working").removeClass("hidden");
if(TS.ui.growls.no_notifications){$("#notifications_impossible").removeClass("hidden")
}else{if(TS.ui.growls.getPermissionLevel()=="denied"){$("#notifications_not_allowed").removeClass("hidden")
}}}}d.modal("show");
d.find(".dialog_cancel").click(e);
d.find(".dialog_go").click(k)
},showMainPrefs:function(o){e();
setTimeout(function(){TS.ui.prefs_dialog.start(o)
},500)
}});
var d=null;
var g=null;
var c=function(o){if(!TS.ui.channel_prefs_dialog.showing){return
}if(o.which==TS.utility.keymap.enter){if(TS.utility.getActiveElementProp("NODENAME")=="BODY"){k();
o.preventDefault()
}}else{if(o.which==TS.utility.keymap.esc){e()
}}};
var h=function(o){if(o!="who_can_at_channel"&&o!="who_can_at_everyone"&&o!="who_can_post_general"){return
}i();
j();
l()
};
var l=function(){if(!g){return
}var o=$("#single_suppressed_cb");
var u=$("#single_suppressed_label");
var p=$("#single_suppressed_disabled_explain");
var w=$("#single_suppressed_div");
var q=$("#single_suppressed_disabled_explain_tip_link");
var s=TS.notifs.hasUserSuppressedCorGChannelMentions(g)||TS.notifs.hasUserSuppressedCorGPushChannelMentions(g);
var t=TS.notifs.getCalculatedCorGPushNotifySetting(g);
var v=TS.notifs.getCalculatedCorGNotifySetting(g);
var r=(t=="mentions"||v=="mentions");
b(s,"both",r,o,u,p,w,q);
if(!r){return
}if(t=="mentions"&&v=="everything"){$("#single_suppressed_mobile_qualifier").removeClass("hidden");
$("#single_suppressed_desktop_qualifier").addClass("hidden")
}else{if(v=="mentions"&&t=="everything"){$("#single_suppressed_desktop_qualifier").removeClass("hidden");
$("#single_suppressed_mobile_qualifier").addClass("hidden")
}else{$("#single_suppressed_desktop_qualifier").addClass("hidden");
$("#single_suppressed_mobile_qualifier").addClass("hidden")
}}if(t=="mentions"){$("#single_suppressed_mobile_disclaimer").removeClass("hidden")
}else{$("#single_suppressed_mobile_disclaimer").addClass("hidden")
}};
var i=function(){if(!g){return
}var r=TS.notifs.getCalculatedCorGNotifySetting(g);
$("#all_everything_default").addClass("hidden");
$("#all_mentions_default").addClass("hidden");
$("#all_nothing_default").addClass("hidden");
if(TS.model.prefs.growls_enabled&&TS.model.prefs.all_channels_loud){$("#all_everything_default").removeClass("hidden")
}else{if(TS.model.prefs.growls_enabled){$("#all_mentions_default").removeClass("hidden")
}else{$("#all_nothing_default").removeClass("hidden")
}}$('input:radio[name="channel_loud_rd"]').filter('[value="'+r+'"]').prop("checked",true);
$('input:radio[name="channel_loud_rd"]').unbind("change").bind("change",function(){var v=$(this).val();
if(v=="everything"){TS.notifs.makeCorGDTopEverything(g)
}else{if(v=="mentions"){TS.notifs.makeCorGDTopMentions(g)
}else{TS.notifs.makeCorGDTopNothing(g)
}}TS.prefs.setMultiPrefsByAPI({loud_channels:TS.model.loud_channels.join(","),never_channels:TS.model.never_channels.join(","),loud_channels_set:TS.model.loud_channels_set.join(",")});
i();
l()
});
var u=$("#suppressed_cb");
var o=$("#suppressed_label");
var t=$("#suppressed_disabled_explain");
var s=$("#suppressed_span");
var p=$("#suppressed_disabled_explain_tip_link");
var q=r=="mentions";
b(TS.notifs.hasUserSuppressedCorGChannelMentions(g),"at_channel_suppressed_channels",q,u,o,t,s,p);
l()
};
var b=function(u,y,t,p,w,q,z,s){if(!g){return
}if(y=="both"){if(t){z.css("visibility","visible")
}else{z.css("visibility","hidden")
}}else{if(t){z.removeClass("hidden")
}else{z.addClass("hidden")
}}var o=TS.channels.getChannelById(g)||TS.groups.getGroupById(g);
var A=TS.model.team.prefs;
var v=false;
if(A.who_can_at_channel=="admin"||A.who_can_at_channel=="owner"){v=true
}else{if(o.is_general&&(A.who_can_at_everyone=="admin"||A.who_can_at_everyone=="owner"||A.who_can_post_general=="admin"||A.who_can_post_general=="owner")){v=true
}}if(v){w.addClass("subtle_silver");
w.css("cursor","default");
q.removeClass("hidden");
$("#single_suppressed_mobile_disclaimer").addClass("hidden");
p.prop("disabled",true);
p.prop("checked",false);
var r=(g.charAt(0)==="C")?"channel":"group";
var x;
if(r=="group"){x="A team owner has restricted the use of <b>@group</b> to admins and/or owners, which renders you powerless to ignore those notifications."
}else{if(o.is_general){x="A team owner has restricted who can post to general and/or restricted the use of <b>@channel</b> and/or <b>@everyone</b> to admins and/or owners, which renders you powerless to ignore those notifications."
}else{x="A team owner has restricted the use of <b>@channel</b> to admins and/or owners, which renders you powerless to ignore those notifications."
}}s.tooltip("destroy").attr("title",x).tooltip({html:true,container:"#channel_prefs_dialog"})
}else{w.removeClass("subtle_silver");
w.css("cursor","");
q.addClass("hidden");
p.prop("disabled",false);
p.prop("checked",u);
p.unbind("change").bind("change",function(){var B=!!$(this).prop("checked");
if(y=="both"||y=="at_channel_suppressed_channels"){if(B){TS.notifs.makeCorGSuppresed(g)
}else{TS.notifs.makeCorGNOTSuppresed(g)
}TS.prefs.setPrefByAPI({name:"at_channel_suppressed_channels",value:TS.model.at_channel_suppressed_channels.join(",")})
}if(y=="both"||y=="push_at_channel_suppressed_channels"){if(B){TS.notifs.makeCorGPushSuppresed(g)
}else{TS.notifs.makeCorGNOTPushSuppresed(g)
}TS.prefs.setPrefByAPI({name:"push_at_channel_suppressed_channels",value:TS.model.push_at_channel_suppressed_channels.join(",")})
}})
}};
var m=function(){if(!g){return
}var o=TS.notifs.isCorGMuted(g);
var r=$("#muting_cb");
var p=$("#non_muting_prefs");
var q=$("#muting_info");
r.prop("checked",o);
r.unbind("change").bind("change",function(){var t=!!$(this).prop("checked");
if(t){TS.notifs.makeCorGMuted(g);
var s=TS.shared.getActiveModelOb();
if(s&&s.is_channel){TS.channels.markMostRecentReadMsg(s,TS.model.marked_reasons.muted)
}else{if(s&&s.is_group){TS.groups.markMostRecentReadMsg(s,TS.model.marked_reasons.muted)
}}}else{TS.notifs.makeCorGNOTMuted(g)
}TS.prefs.setPrefByAPI({name:"muted_channels",value:TS.model.muted_channels.join(",")})
});
if(o){p.slideUp(150);
q.removeClass("hidden")
}else{p.slideDown(150);
q.addClass("hidden")
}};
var j=function(){if(!g){return
}var r=TS.notifs.getCalculatedCorGPushNotifySetting(g);
$("#all_push_everything_default").addClass("hidden");
$("#all_push_mentions_default").addClass("hidden");
$("#all_push_nothing_default").addClass("hidden");
if(TS.model.prefs.push_everything){$("#all_push_everything_default").removeClass("hidden")
}else{if(TS.model.prefs.push_mention_alert){$("#all_push_mentions_default").removeClass("hidden")
}else{$("#all_push_nothing_default").removeClass("hidden")
}}$('input:radio[name="channel_push_loud_rd"]').filter('[value="'+r+'"]').prop("checked",true);
$('input:radio[name="channel_push_loud_rd"]').unbind("change").bind("change",function(){var v=$(this).val();
if(v=="everything"){TS.notifs.makeCorGPushEverything(g)
}else{if(v=="mentions"){TS.notifs.makeCorGPushMentions(g)
}else{TS.notifs.makeCorGPushNothing(g)
}}TS.prefs.setMultiPrefsByAPI({push_loud_channels:TS.model.push_loud_channels.join(","),push_mention_channels:TS.model.push_mention_channels.join(","),push_loud_channels_set:TS.model.push_loud_channels_set.join(",")});
j();
l()
});
var u=$("#push_suppressed_cb");
var o=$("#push_suppressed_label");
var t=$("#push_suppressed_disabled_explain");
var s=$("#push_suppressed_span");
var p=$("#push_suppressed_disabled_explain_tip_link");
var q=r=="mentions";
b(TS.notifs.hasUserSuppressedCorGPushChannelMentions(g),"push_at_channel_suppressed_channels",q,u,o,t,s,p);
l()
};
var k=function(){if(!TS.ui.channel_prefs_dialog.showing){TS.error("not showing?");
return
}d.modal("hide")
};
var e=function(){d.modal("hide")
};
var f=function(){g=null;
TS.ui.channel_prefs_dialog.showing=TS.model.dialog_is_showing=false;
$(window.document).unbind("keydown",c)
};
var a=function(){$("body").append('<div id="channel_prefs_dialog" class="modal hide fade"></div>');
d=$("#channel_prefs_dialog");
d.on("hide",function(o){if(o.target!=this){return
}f()
});
d.on("show",function(o){if(o.target!=this){return
}TS.ui.channel_prefs_dialog.showing=TS.model.dialog_is_showing=true
});
d.on("shown",function(o){if(o.target!=this){return
}setTimeout(function(){$(window.document).bind("keydown",c)
},100)
})
}
})();
/*!
  * exif-js - JavaScript library for reading EXIF image metadata
  * https://github.com/jseidelin/exif-js
  * MIT License | (c) 2008 Jacob Seidelin
  */
(function(){var k=false;
var m=this;
var d=function(v){if(v instanceof d){return v
}if(!(this instanceof d)){return new d(v)
}this.EXIFwrapped=v
};
if(typeof exports!=="undefined"){if(typeof module!=="undefined"&&module.exports){exports=module.exports=d
}exports.EXIF=d
}else{m.EXIF=d
}var r=d.Tags={36864:"ExifVersion",40960:"FlashpixVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37500:"MakerNote",37510:"UserComment",40964:"RelatedSoundFile",36867:"DateTimeOriginal",36868:"DateTimeDigitized",37520:"SubsecTime",37521:"SubsecTimeOriginal",37522:"SubsecTimeDigitized",33434:"ExposureTime",33437:"FNumber",34850:"ExposureProgram",34852:"SpectralSensitivity",34855:"ISOSpeedRatings",34856:"OECF",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureBias",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37396:"SubjectArea",37386:"FocalLength",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41492:"SubjectLocation",41493:"ExposureIndex",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRation",41989:"FocalLengthIn35mmFilm",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",40965:"InteroperabilityIFDPointer",42016:"ImageUniqueID"};
var u=d.TiffTags={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright"};
var j=d.GPSTags={0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential"};
var h=d.StringValues={ExposureProgram:{0:"Not defined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{0:"Unknown",1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},SensingMethod:{1:"Not defined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},SceneType:{1:"Directly photographed"},CustomRendered:{0:"Normal process",1:"Custom process"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},GainControl:{0:"None",1:"Low gain up",2:"High gain up",3:"Low gain down",4:"High gain down"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},SubjectDistanceRange:{0:"Unknown",1:"Macro",2:"Close view",3:"Distant view"},FileSource:{3:"DSC"},Components:{0:"",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"}};
function o(v,x,w){if(v.addEventListener){v.addEventListener(x,w,false)
}else{if(v.attachEvent){v.attachEvent("on"+x,w)
}}}function g(v){return !!(v.exifdata)
}function c(y,B){B=B||y.match(/^data\:([^\;]+)\;base64,/mi)[1]||"";
y=y.replace(/^data\:([^\;]+)\;base64,/gmi,"");
var A=atob(y);
var v=A.length;
var x=new ArrayBuffer(v);
var w=new Uint8Array(x);
for(var z=0;
z<v;
z++){w[z]=A.charCodeAt(z)
}return x
}function s(w,x){var v=new XMLHttpRequest();
v.open("GET",w,true);
v.responseType="blob";
v.onload=function(y){if(this.status==200||this.status===0){x(this.response)
}};
v.send()
}function b(w,A){function y(D){var C=f(D);
var B=e(D);
w.exifdata=C||{};
w.iptcdata=B||{};
if(A){A.call(w)
}}if(w.src){if(/^data\:/i.test(w.src)){var z=c(w.src);
y(z)
}else{if(/^blob\:/i.test(w.src)){var v=new FileReader();
v.onload=function(B){y(B.target.result)
};
s(w.src,function(B){v.readAsArrayBuffer(B)
})
}else{var x=new XMLHttpRequest();
x.onload=function(){if(this.status==200||this.status===0){y(x.response)
}else{throw"Could not load image"
}x=null
};
x.open("GET",w.src,true);
x.responseType="arraybuffer";
x.send(null)
}}}else{if(window.FileReader&&(w instanceof window.Blob||w instanceof window.File)){var v=new FileReader();
v.onload=function(B){if(k){console.log("Got file of length "+B.target.result.byteLength)
}y(B.target.result)
};
v.readAsArrayBuffer(w)
}}}function f(w){var z=new DataView(w);
if(k){console.log("Got file of length "+w.byteLength)
}if((z.getUint8(0)!=255)||(z.getUint8(1)!=216)){if(k){console.log("Not a valid JPEG")
}return false
}var y=2,x=w.byteLength,v;
while(y<x){if(z.getUint8(y)!=255){if(k){console.log("Not a valid marker at offset "+y+", found: "+z.getUint8(y))
}return false
}v=z.getUint8(y+1);
if(k){console.log(v)
}if(v==225){if(k){console.log("Found 0xFFE1 marker")
}return q(z,y+4,z.getUint16(y+2)-2)
}else{y+=2+z.getUint16(y+2)
}}}function e(z){var C=new DataView(z);
if(k){console.log("Got file of length "+z.byteLength)
}if((C.getUint8(0)!=255)||(C.getUint8(1)!=216)){if(k){console.log("Not a valid JPEG")
}return false
}var B=2,A=z.byteLength;
var w=function(E,D){return(E.getUint8(D)===56&&E.getUint8(D+1)===66&&E.getUint8(D+2)===73&&E.getUint8(D+3)===77&&E.getUint8(D+4)===4&&E.getUint8(D+5)===4)
};
while(B<A){if(w(C,B)){var y=C.getUint8(B+7);
if(y%2!==0){y+=1
}if(y===0){y=4
}var v=B+8+y;
var x=C.getUint16(B+6+y);
return t(z,v,x);
break
}B++
}}var a={120:"caption",110:"credit",25:"keywords",55:"dateCreated",80:"byline",85:"bylineTitle",122:"captionWriter",105:"headline",116:"copyright",15:"category"};
function t(z,C,B){var D=new DataView(z);
var A={};
var w,F,v,E,x;
var y=C;
while(y<C+B){if(D.getUint8(y)===28&&D.getUint8(y+1)===2){E=D.getUint8(y+2);
if(E in a){v=D.getInt16(y+3);
x=v+5;
F=a[E];
w=l(D,y+5,v);
if(A.hasOwnProperty(F)){if(A[F] instanceof Array){A[F].push(w)
}else{A[F]=[A[F],w]
}}else{A[F]=w
}}}y++
}return A
}function p(v,B,D,A,x){var y=v.getUint16(D,!x),E={},z,C,w;
for(w=0;
w<y;
w++){z=D+w*12+2;
C=A[v.getUint16(z,!x)];
if(!C&&k){console.log("Unknown tag: "+v.getUint16(z,!x))
}E[C]=i(v,z,B,D,x)
}return E
}function i(A,E,H,I,C){var D=A.getUint16(E+2,!C),G=A.getUint32(E+4,!C),w=A.getUint32(E+8,!C)+H,B,F,z,y,v,x;
switch(D){case 1:case 7:if(G==1){return A.getUint8(E+8,!C)
}else{B=G>4?w:(E+8);
F=[];
for(y=0;
y<G;
y++){F[y]=A.getUint8(B+y)
}return F
}case 2:B=G>4?w:(E+8);
return l(A,B,G-1);
case 3:if(G==1){return A.getUint16(E+8,!C)
}else{B=G>2?w:(E+8);
F=[];
for(y=0;
y<G;
y++){F[y]=A.getUint16(B+2*y,!C)
}return F
}case 4:if(G==1){return A.getUint32(E+8,!C)
}else{F=[];
for(y=0;
y<G;
y++){F[y]=A.getUint32(w+4*y,!C)
}return F
}case 5:if(G==1){v=A.getUint32(w,!C);
x=A.getUint32(w+4,!C);
z=new Number(v/x);
z.numerator=v;
z.denominator=x;
return z
}else{F=[];
for(y=0;
y<G;
y++){v=A.getUint32(w+8*y,!C);
x=A.getUint32(w+4+8*y,!C);
F[y]=new Number(v/x);
F[y].numerator=v;
F[y].denominator=x
}return F
}case 9:if(G==1){return A.getInt32(E+8,!C)
}else{F=[];
for(y=0;
y<G;
y++){F[y]=A.getInt32(w+4*y,!C)
}return F
}case 10:if(G==1){return A.getInt32(w,!C)/A.getInt32(w+4,!C)
}else{F=[];
for(y=0;
y<G;
y++){F[y]=A.getInt32(w+8*y,!C)/A.getInt32(w+4+8*y,!C)
}return F
}}}function l(w,y,x){var v="";
for(n=y;
n<y+x;
n++){v+=String.fromCharCode(w.getUint8(n))
}return v
}function q(z,w){if(l(z,w,4)!="Exif"){if(k){console.log("Not valid EXIF data! "+l(z,w,4))
}return false
}var A,C,D,y,x,B=w+6;
if(z.getUint16(B)==18761){A=false
}else{if(z.getUint16(B)==19789){A=true
}else{if(k){console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)")
}return false
}}if(z.getUint16(B+2,!A)!=42){if(k){console.log("Not valid TIFF data! (no 0x002A)")
}return false
}var v=z.getUint32(B+4,!A);
if(v<8){if(k){console.log("Not valid TIFF data! (First offset less than 8)",z.getUint32(B+4,!A))
}return false
}C=p(z,B,B+v,u,A);
if(C.ExifIFDPointer){y=p(z,B,B+C.ExifIFDPointer,r,A);
for(D in y){switch(D){case"LightSource":case"Flash":case"MeteringMode":case"ExposureProgram":case"SensingMethod":case"SceneCaptureType":case"SceneType":case"CustomRendered":case"WhiteBalance":case"GainControl":case"Contrast":case"Saturation":case"Sharpness":case"SubjectDistanceRange":case"FileSource":y[D]=h[D][y[D]];
break;
case"ExifVersion":case"FlashpixVersion":y[D]=String.fromCharCode(y[D][0],y[D][1],y[D][2],y[D][3]);
break;
case"ComponentsConfiguration":y[D]=h.Components[y[D][0]]+h.Components[y[D][1]]+h.Components[y[D][2]]+h.Components[y[D][3]];
break
}C[D]=y[D]
}}if(C.GPSInfoIFDPointer){x=p(z,B,B+C.GPSInfoIFDPointer,j,A);
for(D in x){switch(D){case"GPSVersionID":x[D]=x[D][0]+"."+x[D][1]+"."+x[D][2]+"."+x[D][3];
break
}C[D]=x[D]
}}return C
}d.getData=function(v,w){if((v instanceof Image||v instanceof HTMLImageElement)&&!v.complete){return false
}if(!g(v)){b(v,w)
}else{if(w){w.call(v)
}}return true
};
d.getTag=function(w,v){if(!g(w)){return
}return w.exifdata[v]
};
d.getAllTags=function(w){if(!g(w)){return{}
}var v,y=w.exifdata,x={};
for(v in y){if(y.hasOwnProperty(v)){x[v]=y[v]
}}return x
};
d.pretty=function(w){if(!g(w)){return""
}var v,y=w.exifdata,x="";
for(v in y){if(y.hasOwnProperty(v)){if(typeof y[v]=="object"){if(y[v] instanceof Number){x+=v+" : "+y[v]+" ["+y[v].numerator+"/"+y[v].denominator+"]\r\n"
}else{x+=v+" : ["+y[v].length+" values]\r\n"
}}else{x+=v+" : "+y[v]+"\r\n"
}}}return x
};
d.readFromBinaryFile=function(v){return f(v)
};
if(typeof define==="function"&&define.amd){define("exif-js",[],function(){return d
})
}}.call(this));
(function(){TS.registerModule("ui.upload_dialog",{div:null,filesQ:[],file:null,showing:false,last_share_cb_checked:null,onStart:function(){},onKeydown:function(g){if(!TS.ui.upload_dialog.showing){return
}if(g.which==TS.utility.keymap.enter){if(TS.utility.getActiveElementProp("NODENAME")!="TEXTAREA"){TS.ui.upload_dialog.go();
g.preventDefault()
}}else{if(g.which==TS.utility.keymap.esc){}}},start:function(l){if(!l||!l.length){TS.info("no files");
return
}var g=0;
var j;
for(var h=0;
h<l.length;
h++){j=l[h];
if(j.size>TS.model.upload_file_size_limit_bytes){continue
}g++;
TS.ui.upload_dialog.filesQ.push(j)
}if(g<l.length){var k="";
if(l.length==1){k="That file is too large and cannot be uploaded. The limit is "+TS.utility.convertFilesize(TS.model.upload_file_size_limit_bytes)+"."
}else{if(!g){k="All of those file are too large and cannot be uploaded. The limit is "+TS.utility.convertFilesize(TS.model.upload_file_size_limit_bytes)+"."
}else{k="We'll upload what we can, but one or more of those files is too large and cannot be uploaded. The limit is "+TS.utility.convertFilesize(TS.model.upload_file_size_limit_bytes)+"."
}}alert(k)
}if(!g){return
}if(!TS.ui.upload_dialog.div){TS.ui.upload_dialog.build()
}if(!TS.ui.upload_dialog.showing){TS.ui.upload_dialog.pullFromQ(true)
}},startWithCommentFromChatInput:function(g){a=TS.client.ui.$msg_input.val();
TS.ui.upload_dialog.start(g);
TS.view.clearMessageInput()
},pullFromQ:function(g){if(TS.ui.upload_dialog.filesQ.length){TS.ui.upload_dialog._startWithFile(TS.ui.upload_dialog.filesQ.shift(),g);
return true
}if(TS.client.ui.resetFiles){TS.client.ui.resetFiles()
}else{if(console&&console.warn){console.warn("TS.client.ui.resetFiles undefined")
}}return false
},_startWithFile:function(j,l){TS.ui.upload_dialog.file=j;
var m=TS.templates.file_upload_dialog({filename:TS.files.makeFileNameFromFile(j),title:c(j),has_name:!!j.name,sharing_html:TS.templates.builders.buildFileSharingControls(j,null,f()),over_storage_limit:TS.model.team.over_storage_limit,more_in_queue:TS.ui.upload_dialog.filesQ.length>0});
var g=TS.ui.upload_dialog.div;
g.html(m);
var i=function(r){$("#upload_image_preview").removeClass("hidden").find("img").attr("src",r)
};
if(typeof j=="string"){i("data:image/png;base64,"+j)
}else{if(window.FileReader){try{if(TS.boot_data.feature_client_exif_orientation_on_uploads&&EXIF){var q=new FileReader();
q.onload=function(s){var r=EXIF.readFromBinaryFile(s.target.result);
if(r.Orientation&&typeof r.Orientation==="number"&&r.Orientation!==1){$("#upload_image_preview").find("img").addClass("orientation_"+r.Orientation)
}};
q.readAsArrayBuffer(j)
}var o=new FileReader();
o.onload=function(r){var s=r.target.result;
if(s.indexOf("data:image/")!==0){return
}i(s)
};
o.readAsDataURL(j)
}catch(k){TS.info(k)
}}}var p=$("#file_comment_textarea");
TS.comments.ui.bindInput(p,TS.ui.upload_dialog.go);
p.autogrow();
var h=TS.ui.upload_dialog.showing;
g.modal("show");
if(TS.ui.upload_dialog.filesQ.length){g.find(".file_count").text(" (and "+TS.ui.upload_dialog.filesQ.length+" more...)")
}if(l){g.find("#share_cb").prop("checked",true)
}else{g.find("#share_cb").prop("checked",TS.ui.upload_dialog.last_share_cb_checked===true)
}g.find(".modal-header > .close").click(b);
g.find(".dialog_cancel_all").click(TS.ui.upload_dialog.cancelAll);
g.find(".dialog_cancel").click(TS.ui.upload_dialog.cancel);
g.find(".dialog_go").click(TS.ui.upload_dialog.go);
TS.ui.bindFileShareDropdowns();
TS.ui.bindFileShareShareToggle();
TS.ui.bindFileShareCommentField();
if(h){d(g)
}},go:function(){if(!TS.ui.upload_dialog.showing){TS.error("not showing?");
return
}if(!TS.ui.upload_dialog.file){TS.error("no file?");
return
}var o=TS.ui.upload_dialog.div;
var i=!!o.find("#share_cb").prop("checked");
TS.ui.upload_dialog.last_share_cb_checked=!!i;
var g=(i)?$("#share_model_ob_id").val():null;
var l=TS.format.cleanMsg($("#file_comment_textarea").val());
if($.trim(l)===""){l=""
}var h=o.find(".filename_input").val();
var m=o.find(".title_input").val();
if(TS.ui.upload_dialog.file.is_dropbox){var k=TS.ui.upload_dialog.file.link;
TS.shared.getShareModelObId(g,function(p){TS.files.upload(null,null,k,h,m,null,p,l)
})
}else{var j=TS.ui.upload_dialog.file;
TS.shared.getShareModelObId(g,function(p){TS.files.upload(null,j,null,h,m,null,p,l)
})
}TS.ui.upload_dialog.maybeGoAway()
},maybeGoAway:function(){a="";
if(!TS.ui.upload_dialog.pullFromQ()){TS.ui.upload_dialog.div.modal("hide");
return true
}return false
},cancel:function(){var h=a;
var g=TS.ui.upload_dialog.maybeGoAway();
if(h){TS.client.ui.populateChatInput(h)
}if(g&&h){setTimeout(TS.view.focusMessageInput,10)
}},cancelAll:function(){TS.ui.upload_dialog.filesQ=[];
TS.ui.upload_dialog.cancel()
},end:function(){TS.ui.upload_dialog.showing=TS.model.dialog_is_showing=false;
TS.ui.upload_dialog.file=null;
a="";
TS.ui.upload_dialog.div.empty();
$(window.document).unbind("keydown",TS.ui.upload_dialog.onKeydown)
},build:function(){$("body").append('<div id="upload_dialog" class="modal hide fade" data-keyboard="false" data-backdrop="static"></div>');
var g=TS.ui.upload_dialog.div=$("#upload_dialog");
g.on("hidden",function(h){if(h.target!=this){return
}TS.ui.upload_dialog.end()
});
g.on("show",function(h){if(h.target!=this){return
}TS.ui.upload_dialog.showing=TS.model.dialog_is_showing=true
});
g.on("shown",function(h){if(h.target!=this){return
}setTimeout(function(){d(g);
$(window.document).bind("keydown",TS.ui.upload_dialog.onKeydown)
},100)
})
}});
var a="";
var e=50;
var d=function(g){if(a&&a.length>e){g.find("#file_comment_textarea").focus().select()
}else{g.find("#upload_file_title").focus().select()
}};
var c=function(g){if(a&&a.length<=e){return a
}return TS.files.makeFileTitleFromFile(g)
};
var f=function(){if(a&&a.length>e){return a
}return""
};
var b=function(g){g.preventDefault();
TS.ui.upload_dialog.cancelAll()
}
})();
(function(){TS.registerModule("ui.snippet_dialog",{editor:null,text_from_input:null,edit_file_id:null,div:null,showing:false,onStart:function(){},startCreate:function(a){if(TS.ui.snippet_dialog.showing){return
}TS.ui.snippet_dialog.showing=true;
TS.ui.snippet_dialog.text_from_input=a||null;
TS.ui.snippet_dialog.edit_file_id=null;
TS.ui.snippet_dialog.start(a,null,TS.model.prefs.last_snippet_type||"text")
},startEdit:function(b){if(TS.ui.snippet_dialog.showing){return
}var a=TS.files.getFileById(b);
if(!a){return
}TS.files.fetchFileInfo(b,function(d,c){TS.ui.snippet_dialog.edit_file_id=b;
TS.ui.snippet_dialog.text_from_input=null;
TS.ui.snippet_dialog.start(c.content,c.title,c.filetype)
})
},start:function(g,f,c){if(!TS.ui.snippet_dialog.div){TS.ui.snippet_dialog.build()
}var e={codemirror_types:TS.boot_data.codemirror_types,wrap_lines:TS.model.prefs.snippet_editor_wrap_long_lines};
if(TS.ui.snippet_dialog.edit_file_id){e.mode="Edit"
}else{e.mode="Create";
e.sharing_html=TS.templates.builders.buildFileSharingControls()
}var b=TS.templates.snippet_dialog(e);
var h=TS.ui.snippet_dialog.div;
h.html(b);
h.modal("show");
h.find(".modal-header > .close").click(TS.ui.snippet_dialog.cancel);
h.find(".dialog_cancel").click(TS.ui.snippet_dialog.cancel);
h.find(".dialog_go").click(TS.ui.snippet_dialog.go);
TS.ui.snippet_dialog.editor=CodeMirror.fromTextArea(document.getElementById("client_file_snippet_textarea"),{lineNumbers:true,matchBrackets:true,indentUnit:4,indentWithTabs:true,enterMode:"keep",tabMode:"shift",viewportMargin:Infinity,autofocus:true,lineWrapping:TS.model.prefs.snippet_editor_wrap_long_lines});
$("#client_file_snippet_select").change(function(i){CodeMirror.switchSlackMode(TS.ui.snippet_dialog.editor,$(this).val());
TS.prefs.setPrefByAPI({name:"last_snippet_type",value:$(this).val()})
}).change();
TS.ui.snippet_dialog.div.find(".CodeMirror-scroll").css({"overflow-y":"scroll","max-height":196,"min-height":196});
$("#client_file_wrap_cb").bind("change",function(j){var i=$(this).is(":checked");
TS.ui.snippet_dialog.editor.setOption("lineWrapping",i);
TS.prefs.setPrefByAPI({name:"snippet_editor_wrap_long_lines",value:i})
});
var d=false;
if(TS.ui.snippet_dialog.edit_file_id){TS.ui.snippet_dialog.editor.setValue(g);
if(f){f=TS.format.unFormatMsg(f)
}$("#client_file_snippet_title_input").val(f||"");
TS.ui.snippet_dialog.div.find(".CodeMirror-scroll").css({"max-height":326,"min-height":326})
}else{TS.ui.snippet_dialog.editor.setValue(g||"");
$("#client_file_snippet_title_input").val("");
TS.ui.bindFileShareDropdowns();
TS.ui.bindFileShareShareToggle();
TS.ui.bindFileShareCommentField();
d=!!g
}var a=$("#file_comment_textarea");
TS.comments.ui.bindInput(a,TS.ui.snippet_dialog.go);
a.autogrow();
$("#client_file_snippet_select").val(c).trigger("change");
setTimeout(function(){if(d){$("#client_file_snippet_title_input").focus()
}else{TS.ui.snippet_dialog.editor.focus()
}TS.ui.snippet_dialog.editor.refresh()
},350);
$(window.document).bind("keydown",TS.ui.snippet_dialog.onKeyDown)
},go:function(){if(!TS.ui.snippet_dialog.showing){TS.error("not showing?");
return
}var f=TS.ui.snippet_dialog.editor.getValue();
if(!$.trim(f)){return
}if(TS.ui.snippet_dialog.edit_file_id){TS.api.call("files.edit",{file:TS.ui.snippet_dialog.edit_file_id,title:$("#client_file_snippet_title_input").val(),content:f,filetype:$("#client_file_snippet_select").val()})
}else{var b=!!$("#share_cb").prop("checked");
var a=(b)?$("#share_model_ob_id").val():null;
var d=TS.format.cleanMsg($("#file_comment_textarea").val());
var e=$("#client_file_snippet_title_input").val();
var c=$("#client_file_snippet_select").val();
if($.trim(d)===""){d=""
}TS.shared.getShareModelObId(a,function(g){TS.files.upload(f,null,null,null,e,c,g,d)
})
}TS.ui.snippet_dialog.div.modal("hide");
TS.ui.snippet_dialog.end()
},cancel:function(a){if(TS.ui.snippet_dialog.text_from_input){TS.client.ui.populateChatInput(TS.ui.snippet_dialog.text_from_input);
TS.ui.snippet_dialog.text_from_input=""
}setTimeout(TS.view.focusMessageInput,10);
TS.ui.snippet_dialog.end();
TS.ui.snippet_dialog.div.modal("hide");
if(a){a.preventDefault()
}},end:function(){$(window.document).unbind("keydown",TS.ui.snippet_dialog.onKeyDown);
TS.ui.snippet_dialog.showing=TS.model.dialog_is_showing=false;
TS.ui.snippet_dialog.div.empty()
},onKeyDown:function(a){if(a.which==TS.utility.keymap.esc){if(TS.ui.snippet_dialog.editor.getValue()==(TS.ui.snippet_dialog.text_from_input||"")){TS.ui.snippet_dialog.cancel()
}a.preventDefault()
}else{if(a.which==TS.utility.keymap.enter){if(!TS.utility.isFocusOnInput()||!document.activeElement||TS.utility.getActiveElementProp("id")=="client_file_snippet_title_input"){TS.ui.snippet_dialog.go();
a.preventDefault()
}}}},build:function(){$("body").append('<div id="snippet_dialog" class="modal hide fade" data-backdrop="static" data-keyboard="false"></div>');
var a=TS.ui.snippet_dialog.div=$("#snippet_dialog");
a.on("hidden",function(b){if(b.target!=this){return
}TS.ui.snippet_dialog.end()
});
a.on("show",function(b){if(b.target!=this){return
}TS.ui.snippet_dialog.showing=TS.model.dialog_is_showing=true
})
}})
})();
(function(){TS.registerModule("ui.lightbox_dialog",{$div:null,showing:false,loaded_images:{},current_image_id:null,gallery:null,is_gallery:false,preload_dist:3,current_index:null,timeout:null,mouseX:null,mouseY:null,last_loaded_src:null,onStart:function(){TS.channels.switched_sig.add(TS.ui.lightbox_dialog.channelOrImOrGroupDisplaySwitched,TS.ui.lightbox_dialog);
TS.ims.switched_sig.add(TS.ui.lightbox_dialog.channelOrImOrGroupDisplaySwitched,TS.ui.lightbox_dialog);
TS.groups.switched_sig.add(TS.ui.lightbox_dialog.channelOrImOrGroupDisplaySwitched,TS.ui.lightbox_dialog);
TS.channels.message_received_sig.add(TS.ui.lightbox_dialog.updateGallery,TS.ui.lightbox_dialog);
TS.ims.message_received_sig.add(TS.ui.lightbox_dialog.updateGallery,TS.ui.lightbox_dialog);
TS.groups.message_received_sig.add(TS.ui.lightbox_dialog.updateGallery,TS.ui.lightbox_dialog);
TS.channels.message_removed_sig.add(TS.ui.lightbox_dialog.updateGallery,TS.ui.lightbox_dialog);
TS.ims.message_removed_sig.add(TS.ui.lightbox_dialog.updateGallery,TS.ui.lightbox_dialog);
TS.groups.message_removed_sig.add(TS.ui.lightbox_dialog.updateGallery,TS.ui.lightbox_dialog);
TS.channels.message_changed_sig.add(TS.ui.lightbox_dialog.updateGallery,TS.ui.lightbox_dialog);
TS.ims.message_changed_sig.add(TS.ui.lightbox_dialog.updateGallery,TS.ui.lightbox_dialog);
TS.groups.message_changed_sig.add(TS.ui.lightbox_dialog.updateGallery,TS.ui.lightbox_dialog)
},onKeydown:function(a){if(!TS.ui.lightbox_dialog.showing){return
}if(a.which==TS.utility.keymap.space||a.which==TS.utility.keymap.enter||a.which==TS.utility.keymap.esc){TS.ui.lightbox_dialog.cancel();
a.preventDefault()
}else{if(TS.ui.lightbox_dialog.is_gallery){if(a.which==TS.utility.keymap.right){TS.ui.lightbox_dialog.goRight();
a.preventDefault()
}else{if(a.which==TS.utility.keymap.left){TS.ui.lightbox_dialog.goLeft();
a.preventDefault()
}}}}},start:function(i,f,e,c,h,a){var b,d,g;
TS.ui.lightbox_dialog.is_gallery=i;
TS.ui.lightbox_dialog.current_image_id=f;
if(TS.client.ui.checkForEditing()){return
}if(!TS.ui.lightbox_dialog.$div){TS.ui.lightbox_dialog.build()
}if(i){TS.ui.lightbox_dialog.gallery=$("#msgs_div").find(".lightbox_link, .lightbox_external_link, .thumbnail_link");
TS.ui.lightbox_dialog.dedupeGallery();
TS.ui.lightbox_dialog.updateCurrentIndex();
setTimeout(function(){for(var j=TS.ui.lightbox_dialog.current_index-TS.ui.lightbox_dialog.preload_dist;
j<=TS.ui.lightbox_dialog.current_index+TS.ui.lightbox_dialog.preload_dist;
j++){TS.ui.lightbox_dialog.preloadImage(j)
}},500)
}b=null;
if(!e){b=TS.files.getFileById(f)
}d=TS.templates.lightbox_dialog({external:e,file:b});
g=TS.ui.lightbox_dialog.$div;
g.html(d).modal("show");
g.find(".dialog_cancel").click(TS.ui.lightbox_dialog.cancel);
if(i&&TS.ui.lightbox_dialog.gallery.length>1){g.find(".lightbox_nav").removeClass("hidden")
}else{g.find("lightbox_nav").addClass("hidden")
}g.find(".lightbox_nav").hover(function(j){$(window.document).unbind("mousemove",TS.ui.lightbox_dialog.fadeControls);
clearTimeout(TS.ui.lightbox_dialog.timeout)
},function(j){$(window.document).bind("mousemove",TS.ui.lightbox_dialog.fadeControls)
});
g.find("#lightbox_go_left").click(function(j){j.stopPropagation();
TS.ui.lightbox_dialog.goLeft()
});
g.find("#lightbox_go_right").click(function(j){j.stopPropagation();
TS.ui.lightbox_dialog.goRight()
});
TS.ui.lightbox_dialog.renderImage(f,e,c,h,a);
TS.ui.lightbox_dialog.fadeControls()
},fadeControls:function(){if(TS.ui.lightbox_dialog.timeout){clearTimeout(TS.ui.lightbox_dialog.timeout)
}TS.ui.lightbox_dialog.$div.find(".lightbox_nav").show();
TS.ui.lightbox_dialog.timeout=setTimeout(function(){TS.ui.lightbox_dialog.$div.find(".lightbox_nav").fadeOut(500)
},1000)
},channelOrImOrGroupDisplaySwitched:function(){if(!TS.ui.lightbox_dialog.showing){return
}TS.ui.lightbox_dialog.cancel();
TS.ui.lightbox_dialog.gallery=null
},updateGallery:function(){if(!TS.ui.lightbox_dialog.showing){return
}setTimeout(function(){var a=$("#msgs_div").find(".lightbox_link, .lightbox_external_link, .thumbnail_link");
if(a!==TS.ui.lightbox_dialog.gallery){TS.ui.lightbox_dialog.gallery=a;
TS.ui.lightbox_dialog.updateArrows();
TS.ui.lightbox_dialog.updateCurrentIndex();
if(TS.ui.lightbox_dialog.current_index>TS.ui.lightbox_dialog.gallery.length-TS.ui.lightbox_dialog.preload_dist){for(var b=TS.ui.lightbox_dialog.current_index+1;
b<TS.ui.lightbox_dialog.gallery.length;
b++){TS.ui.lightbox_dialog.preloadImage(b)
}}}},500)
},updateArrows:function(){if(TS.ui.lightbox_dialog.current_index===0){$("#lightbox_go_left").addClass("faded")
}else{$("#lightbox_go_left").removeClass("faded")
}if(TS.ui.lightbox_dialog.current_index==TS.ui.lightbox_dialog.gallery.length-1){$("#lightbox_go_right").addClass("faded")
}else{$("#lightbox_go_right").removeClass("faded")
}},goLeft:function(){if(TS.ui.lightbox_dialog.current_index===0){return
}TS.ui.lightbox_dialog.navigate(-1)
},goRight:function(){if(TS.ui.lightbox_dialog.current_index==TS.ui.lightbox_dialog.gallery.length-1){return
}TS.ui.lightbox_dialog.navigate(1)
},navigate:function(c){var e,f,g,b,d,a;
TS.ui.lightbox_dialog.current_index+=c;
e=TS.ui.lightbox_dialog.gallery[TS.ui.lightbox_dialog.current_index];
if(e.getAttribute("data-file-id")){f=TS.ui.lightbox_dialog.current_image_id=e.getAttribute("data-file-id");
TS.ui.lightbox_dialog.renderImage(f)
}else{g=TS.ui.lightbox_dialog.current_image_id=e.getAttribute("data-src");
b=e.getAttribute("data-link-url");
d=e.getAttribute("data-width");
a=e.getAttribute("data-height");
TS.ui.lightbox_dialog.renderImage(g,true,b,d,a)
}TS.ui.lightbox_dialog.preloadImage(TS.ui.lightbox_dialog.current_index+c*TS.ui.lightbox_dialog.preload_dist)
},dedupeGallery:function(){var a={};
TS.ui.lightbox_dialog.gallery=TS.ui.lightbox_dialog.gallery.filter(function(b){var c=this.getAttribute("data-file-id")?this.getAttribute("data-file-id"):"";
c+=this.getAttribute("data-src")?this.getAttribute("data-src"):"";
if(a.hasOwnProperty(c)){return false
}else{a[c]=true;
return true
}})
},updateCurrentIndex:function(){for(var a=0;
a<TS.ui.lightbox_dialog.gallery.length;
a++){if(TS.ui.lightbox_dialog.gallery[a].getAttribute("data-file-id")){if(TS.ui.lightbox_dialog.gallery[a].getAttribute("data-file-id")==TS.ui.lightbox_dialog.current_image_id){TS.ui.lightbox_dialog.current_index=a
}}else{if(TS.ui.lightbox_dialog.gallery[a].getAttribute("data-src")==TS.ui.lightbox_dialog.current_image_id){TS.ui.lightbox_dialog.current_index=a
}}}},renderImage:function(d,f,c,b,e){var a=TS.ui.lightbox_dialog.loaded_images[d];
TS.ui.lightbox_dialog.$div.addClass("loading");
TS.ui.lightbox_dialog.$div.find(".lightbox_image").removeClass("loaded");
if(a){TS.ui.lightbox_dialog.$div.find("#lightbox_image_container").html(a)
}else{TS.ui.lightbox_dialog.loadImage(d,f,c,b,e,function(){TS.ui.lightbox_dialog.$div.find("#lightbox_image_container").html(TS.ui.lightbox_dialog.loaded_images[d])
})
}TS.ui.lightbox_dialog.$div.imagesLoaded(function(){TS.ui.lightbox_dialog.$div.find("#spinner").removeClass("loading");
TS.ui.lightbox_dialog.position();
TS.ui.lightbox_dialog.$div.find(".lightbox_meta").click(function(h){var g=$(this).data("url");
if(!h.target.href){TS.utility.openInNewTab(g,g)
}})
});
TS.ui.lightbox_dialog.current_image_id=d;
if(TS.ui.lightbox_dialog.is_gallery){TS.ui.lightbox_dialog.updateArrows()
}},preloadImage:function(f){var e,d,g,b,c,a;
if(f>=0&&f<TS.ui.lightbox_dialog.gallery.length){e=TS.ui.lightbox_dialog.gallery[f];
if(e.getAttribute("data-file-id")){d=e.getAttribute("data-file-id");
if(!TS.ui.lightbox_dialog.loaded_images[d]){TS.ui.lightbox_dialog.loadImage(d)
}}else{g=e.getAttribute("data-src");
b=e.getAttribute("data-link-url");
c=e.getAttribute("data-width");
a=e.getAttribute("data-height");
if(!TS.ui.lightbox_dialog.loaded_images[g]){TS.ui.lightbox_dialog.loadImage(g,true,b,c,a)
}}}},loadImage:function(g,f,c,j,a,k){var e,h,b,d,i;
e="";
h=$('<div class="lightbox_loading_image"></div>');
$("#lightbox_preloader").append(h);
if(f){e=TS.templates.lightbox_external_image({file_src:TS.utility.getImgProxyURL(g,j,a),link_url:c,img_width:j,img_height:a})
}else{b=TS.files.getFileById(g);
d=TS.members.getMemberById(b.user);
e=TS.templates.lightbox_image({file:b,member:d})
}h.html(e);
i=new Spinner({lines:13,length:10,width:2,radius:10,corners:1,rotate:0,direction:1,color:"#FFF",speed:1.3,trail:60,shadow:false,hwaccel:true,className:"spinner",zIndex:2000000000,top:10,left:10}).spin(h.find("#spinner")[0]);
TS.ui.lightbox_dialog.loaded_images[g]=h;
if(k){k()
}},position:function(){var a,c;
a=TS.ui.lightbox_dialog.$div.find(".lightbox_image");
c=new Image();
c.onerror=function(){TS.warn("error loading: "+this.src);
if(this.src!=TS.ui.lightbox_dialog.last_loaded_src){return
}TS.ui.lightbox_dialog.cancel()
};
c.onload=function(){if(this.src!=TS.ui.lightbox_dialog.last_loaded_src){return
}var o,e,k,g,l,d,j,i,p,f,m,h;
o=$(window).height();
e=$(window).width();
k=16;
g=16;
l=c.width;
d=c.height;
if(l===0&&d===0){l=a.data("width");
d=a.data("height")
}i={top:0,bottom:0,left:0,right:0,width:l,height:d,max_width:e-(g*2),max_height:o-(k*2)};
if(d>i.max_height&&l>i.max_width){p=i.max_height/d;
f=i.max_width/l;
if(p<f){i.height=i.max_height;
i.width=p*l
}else{i.height=f*d;
i.width=i.max_width
}}else{if(d>i.max_height){p=i.max_height/d;
i.height=i.max_height;
i.width=p*l
}else{if(l>i.max_width){f=i.max_width/l;
i.height=f*d;
i.width=i.max_width
}}}m=(o-i.height)/2;
h=(e-i.width)/2;
i.top=i.bottom=m;
i.right=i.left=h;
TS.ui.lightbox_dialog.$div.removeClass("loading").css({top:i.top,bottom:i.bottom,left:i.left,right:i.right,width:i.width,height:i.height,"max-width":i.max_width,"max-height":i.max_height});
if(j==6||j==8){a.css({width:i.height,height:i.width,"max-width":i.max_height,"max-height":i.max_width})
}else{a.css({width:i.width,height:i.height,"max-width":i.max_width,"max-height":i.max_height})
}if(i.width<100||i.height<100){TS.ui.lightbox_dialog.$div.addClass("small")
}else{TS.ui.lightbox_dialog.$div.removeClass("small")
}a.addClass("loaded")
};
var b=a.attr("src");
TS.ui.lightbox_dialog.last_loaded_src=b;
c.src=b
},cancel:function(){TS.ui.lightbox_dialog.$div.modal("hide")
},end:function(){TS.ui.lightbox_dialog.showing=TS.model.dialog_is_showing=false;
TS.ui.lightbox_dialog.timeout=null;
TS.ui.lightbox_dialog.$div.empty();
$(window.document).unbind("keydown",TS.ui.lightbox_dialog.onKeydown);
$(window.document).unbind("mousemove",TS.ui.lightbox_dialog.fadeControls)
},build:function(){var a;
$("body").append('<div id="lightbox_dialog" class="lightbox_dialog modal gallery hide fade"></div>');
a=TS.ui.lightbox_dialog.$div=$("#lightbox_dialog");
a.on("hidden",function(b){if(b.target!=this){return
}TS.ui.lightbox_dialog.end();
window.setTimeout(function(){var c=$(".modal-backdrop");
if(c&&!TS.ui.lightbox_dialog.showing){c.remove()
}},1000)
});
a.on("show",function(b){if(b.target!=this){return
}TS.ui.lightbox_dialog.showing=TS.model.dialog_is_showing=true
});
a.on("shown",function(b){if(b.target!=this){return
}$(window.document).bind("keydown",TS.ui.lightbox_dialog.onKeydown);
$(window.document).bind("mousemove",TS.ui.lightbox_dialog.fadeControls)
});
a.on("click",function(b){TS.ui.lightbox_dialog.cancel();
TS.view.doLinkThings(b)
})
}})
})();
(function(){TS.registerModule("view.overlay",{onStart:function(){a=$("#msgs_overlay_div");
$(window.document).keydown(function(h){if(!TS.model.overlay_is_showing){return
}if(h.which==TS.utility.keymap.enter||h.which==TS.utility.keymap.esc){if(f){f()
}else{g(true)
}}})
},startWithJoinedChannel:function(h){d();
c=true;
a.html(TS.templates.channel_join_overlay({invited:false,channel:h}));
$("#channel_joined").bind("click.view",TS.view.onChannelOverlayClick);
f=function(i){h.needs_joined_message=false;
g(true);
f=null
};
a.find("a.btn").bind("click.clear_overlay",f)
},startWithInvitedChannel:function(h){d();
c=true;
a.html(TS.templates.channel_join_overlay({invited:true,channel:h}));
$("#channel_joined").bind("click.view",TS.view.onChannelOverlayClick);
f=function(i){h.needs_invited_message=false;
g(true);
f=null
};
a.find("a.btn").bind("click.clear_overlay",f)
},startWithCreatedChannel:function(h){d();
c=true;
a.html(TS.templates.channel_create_overlay({channel:h}));
$("#channel_created").bind("click.view",TS.view.onChannelOverlayClick);
f=function(i){h.needs_created_message=false;
g(true);
f=null
};
a.find("a.invite_link").bind("click.invite_and_clear_overlay",function(i){TS.ui.invite.showInviteMembersFromChannelDialog(h.id);
f(i)
});
a.find("a.btn").bind("click.clear_overlay",f)
},startWithInvitedGroup:function(h){d();
c=true;
a.html(TS.templates.group_join_overlay({invited:true,group:h}));
$("#group_joined").bind("click.view",TS.view.onChannelOverlayClick);
f=function(i){h.needs_invited_message=false;
g(true);
f=null
};
a.find("a.btn").bind("click.clear_overlay",f);
$("#group_joined").wrap('<div id="group_joined_wrapper">');
$("#group_joined_wrapper").monkeyScroll()
},startWithCreatedGroup:function(h){d();
c=true;
a.html(TS.templates.group_create_overlay({group:h}));
$(window).trigger("resize");
$("#group_created").bind("click.view",TS.view.onChannelOverlayClick);
f=function(i){h.needs_created_message=false;
g(true);
f=null
};
a.find("a.btn").bind("click.clear_overlay",f)
},startWithGrowlPromptDisplay:function(){d();
c=true;
var h=a;
h.html(TS.templates.growl_prompt_overlay({}));
h.find(".prompt_allow").bind("click",function(i){e(i)
});
h.find(".prompt_cancel_forever").bind("click",function(i){createCookie("no_growl_prompt","1",365*10);
$("#growl_prompt_div").addClass("hidden");
g()
});
h.find(".see-apps").bind("click",function(i){createCookie("no_growl_prompt","1",0.5);
$("#growl_prompt_div").addClass("hidden");
g()
});
h.find(".prompt_cancel").bind("click",function(i){$("#growl_prompt_div").addClass("hidden");
g()
});
h.find(".prompt_test").bind("click",function(i){$("#growl_prompt_div").addClass("hidden");
TS.sounds.play("new_message");
TS.ui.growls.show("Test Notification","","Hey! it works",null,null,true,{id:"test_notification"})
});
if(TS.ui.growls.no_notifications){$("#growl_prompt_overlay_impossible").removeClass("hidden")
}else{$("#growl_prompt_overlay_start").removeClass("hidden")
}},fadeInAndOut:function(){d();
g()
},cancelFromSendingMessage:function(){if(!TS.model.overlay_is_showing){return
}if(f){f()
}else{g(true)
}}});
var a=null;
var c=false;
var f=null;
var e=function(){$("#growl_prompt_overlay_start").addClass("hidden");
$("#growl_prompt_overlay_tell_to_allow").removeClass("hidden");
TS.ui.growls.promptForPermission(function(i,h){$("#growl_prompt_overlay_tell_to_allow").addClass("hidden");
if(h=="granted"&&i){$("#growl_prompt_overlay_success").removeClass("hidden");
TS.prefs.setPrefByAPI({name:"growls_enabled",value:true})
}else{if(h=="default"){$("#growl_prompt_overlay_start").removeClass("hidden")
}else{if(h=="denied"){$("#growl_prompt_overlay_disallowed").removeClass("hidden")
}else{alert("huh allowed:"+i+" permission_level:"+h)
}}}})
};
var d=function(h){if(TS.model.overlay_is_showing){return
}a.stop();
a.empty();
a.removeClass("hidden");
if(h){a.css("opacity",0);
a.transition({opacity:1},250)
}else{a.css("opacity",1)
}TS.model.overlay_is_showing=true
};
var g=function(k){var j=TS.model.overlay_is_showing;
TS.model.overlay_is_showing=false;
var h=a.find("#no_joined_overlays_cb");
if(h.length&&h.prop("checked")){TS.prefs.setPrefByAPI({name:"no_joined_overlays",value:true})
}var i=a.find("#no_created_overlays_cb");
if(i.length&&i.prop("checked")){TS.prefs.setPrefByAPI({name:"no_created_overlays",value:true})
}a.transition({opacity:0},250,function(){b()
});
if(c){c=false;
TS.view.showInterstitialAfterChannelOrImShown()
}if(j&&k){TS.client.msg_pane.checkUnreads()
}};
var b=function(){a.addClass("hidden");
TS.model.overlay_is_showing=false
}
})();
(function(){TS.registerModule("ui.invite",{onStart:function(){},showInviteMembersFromChannelDialog:function(c){var f=TS.channels.getChannelById(c);
var e=TS.channels.getActiveMembersNotInThisChannelForInviting(f.id,true);
var g=(TS.model.user.is_admin)?e:TS.channels.getActiveMembersNotInThisChannelForInviting(f.id);
var b=TS.channels.makeMembersWithPreselectsForTemplate(g);
if(b.length){TS.generic_dialog.start({title:"Invite new members to #"+f.name,body:TS.templates.channel_member_invite_list({invite_members:b,show_ra_tip:g.length!=e.length}),show_cancel_button:true,show_go_button:true,go_button_text:"Invite New Members",on_go:function(){var j=$("#select_invite_channel_members").val();
if(j){for(var h=0;
h<j.length;
h++){TS.api.call("channels.invite",{channel:f.id,user:j[h]})
}}else{return false
}},on_end:function(){$(".modal-body").css("overflow-y","auto")
}});
$("#select_invite_channel_members").chosen({placeholder_text_multiple:" ",multiple_always_open:true,multiple_select_maintains_winnow:false});
var d=0;
$("#select_invite_channel_members").bind("focus",function(){$("#select_invite_channel_members_holder").find(".chzn-drop").show();
d=d+1;
if(d==2){$("#select_invite_channel_members").bind("blur",function(){$("#select_invite_channel_members_holder").find(".chzn-drop").hide()
})
}});
$("#select_invite_channel_members_chzn").find(".chzn-results").css("max-height","200px");
$("#select_invite_channel_members_holder").css("min-height",250);
$("#select_invite_channel_members_chzn").find(".chzn-choices").css({"max-height":58,"overflow-y":"scroll"});
$(".modal-body").css("overflow-y","visible");
$("#select_invite_channel_members_chzn").css("width","100%");
$("#select_invite_channel_members_chzn").find(".default").css("width","100%");
if(TS.model.user.is_admin){$("#generic_dialog").find(".modal-footer").prepend('<span class="mini float_left small_top_margin">Or, <a href="/admin/invites" target="new">invite a new person to your team</a></span>')
}}else{TS.generic_dialog.start({title:"Everyone is already in this channel",body:"Since everyone is already in this channel, there is no one to invite!",show_cancel_button:false,show_go_button:true,go_button_text:"OK",esc_for_ok:true})
}},showInviteMembersFromGroupDialog:function(b){a(b)
},showInviteMembersPreSelected:function(d,b,c){a(d,b,c)
},showInviteMemberToChannelDialog:function(c){var d=TS.members.getMemberById(c);
var b=TS.members.getMyChannelsThatThisMemberIsNotIn(d.id);
if(TS.model.user.is_ultra_restricted){TS.generic_dialog.start({title:"Invite "+TS.members.getMemberDisplayName(d,true)+" to a channel",body:"You are not allowed to invite other members to channels.",show_cancel_button:false})
}else{if(d.is_ultra_restricted){TS.generic_dialog.start({title:"Invite "+TS.members.getMemberDisplayName(d,true)+" to a channel",body:TS.members.getMemberDisplayName(d,true)+" cannot be invited to any new channels.",show_cancel_button:false})
}else{if(d.is_restricted&&!TS.model.user.is_admin){TS.generic_dialog.start({title:"Invite "+TS.members.getMemberDisplayName(d,true)+" to a channel",body:"Only a team admin can invite "+TS.members.getMemberDisplayName(d,true)+" into new channels.",show_cancel_button:false})
}else{if(b.length){TS.generic_dialog.start({title:"Invite "+TS.members.getMemberDisplayName(d,true)+" to a channel",body:TS.templates.channel_invite_list({channels:b}),show_cancel_button:true,show_go_button:true,go_button_text:"Invite",on_go:function(){var e=$("#select_invite_channels").val();
if(e!="ts_null_value"){TS.api.call("channels.invite",{channel:e,user:d.id})
}else{return false
}}});
$("#select_invite_channels").chosen({width:"192px"});
$("#generic_dialog").find(".modal-body").css("overflow","visible")
}else{TS.generic_dialog.start({title:""+TS.members.getMemberDisplayName(d,true)+" is already in all the channels you are in",body:"Since "+TS.members.getMemberDisplayName(d,true)+" is already in all the channels you are in, there is nothing to invite them to!",show_cancel_button:false,show_go_button:true,go_button_text:"OK",esc_for_ok:true})
}}}}},showInviteMemberToGroupDialog:function(c){if(!TS.model.allow_invite_to_group_from_person){TS.error("showInviteMemberToGroupDialog disabled (You should never see this because no one shoudl be calling this function!)");
return
}var g=TS.members.getMemberById(c);
var e=TS.members.getMyGroupsThatThisMemberIsNotIn(g.id);
var d;
var f;
if(TS.model.user.is_admin){f=d=TS.groups.getActiveMembersForInviting()
}else{d=TS.groups.getActiveMembersForInviting(true);
f=TS.groups.getActiveMembersForInviting()
}var b=TS.channels.makeMembersWithPreselectsForTemplate(f,[c]);
TS.generic_dialog.start({title:"Invite "+TS.members.getMemberDisplayName(g,true)+" to a group",body:TS.templates.group_invite_list({groups:e,show_ra_tip:f.length!=d.length})+TS.templates.group_create({invite_members:b,preselected:c}),show_cancel_button:true,show_go_button:true,go_button_text:"Invite",on_go:function(){var h=$("#select_invite_groups").val();
if(h!="ts_null_value"){TS.api.call("groups.invite",{channel:h,user:g.id})
}else{if(!TS.ui.group_create_dialog.validateAndSubmit()){return false
}}}});
TS.ui.group_create_dialog.bindCreateInvite()
}});
var a=function(o,h,g){h=h||[];
var m=TS.groups.getGroupById(o);
var k=TS.groups.getActiveMembersNotInThisGroupForInviting(m.id,true);
var j=(TS.model.user.is_admin)?k:TS.groups.getActiveMembersNotInThisGroupForInviting(m.id);
var b=TS.channels.makeMembersWithPreselectsForTemplate(j);
if(b.length){var e=false;
var d=function(i){e=true;
$("#archive_access_cb").prop("checked",i);
$("#generic_dialog").find(".dialog_secondary_go").addClass("hidden");
$("#generic_dialog").find(".dialog_go").text("Invite New Members").removeClass("btn_success");
$("#group_invite_archives_prompt").addClass("hidden");
$("#group_invite_member_chooser").removeClass("hidden");
$("#select_invite_group_members").trigger("liszt:activate");
if(TS.model.user.is_admin){$("#generic_dialog").find(".modal-footer").prepend('<span class="mini float_left small_top_margin">Or, <a href="/admin/invites" target="new">invite a new person to your team</a></span>')
}return
};
var c=function(r,q){if(g){TS.groups.removeMsg(m.id,TS.utility.msgs.getMsg(g,m.msgs))
}if(r){for(var p=0;
p<q.length;
p++){TS.api.call("groups.invite",{channel:m.id,user:q[p]})
}return true
}TS.groups.createChild(m.id,q,function(s,t,i){if(!s){if(t&&t.error=="restricted_action"){setTimeout(function(){TS.generic_dialog.alert("<p>You don't have permission to create new groups.</p><p>Talk to your team owner.</p>")
},500)
}else{alert("failed! "+t.error)
}return
}})
};
var l="new members";
if(h.length){l="";
for(var f=0;
f<h.length;
f++){if(f!==0){if(f==h.length-1){if(h.length>2){l+=","
}l+=" and "
}else{l+=", "
}}l+="<b>"+TS.members.getMemberDisplayName(TS.members.getMemberById(h[f]),true)+"</b>"
}}TS.generic_dialog.start({title:"Invite "+l+" to "+TS.model.group_prefix+m.name,body:TS.templates.group_member_invite_list({invite_members:b,group:m,show_ra_tip:j.length!=k.length}),show_cancel_button:true,show_go_button:true,go_button_text:"Yes, show group history",show_secondary_go_button:true,secondary_go_button_text:"No, start new group",secondary_go_button_class:"btn_info",on_go:function(){if(!e){if(h.length){return c(true,h)
}d(true);
return false
}else{var i=!!$("#archive_access_cb").prop("checked");
var p=$("#select_invite_group_members").val();
if(!p){return false
}return c(i,p)
}},on_secondary_go:function(){if(h.length){return c(false,h)
}d(false);
return false
},on_end:function(){$(".modal-body").css("overflow-y","auto")
}});
$("#select_invite_group_members").chosen({placeholder_text_multiple:" ",multiple_always_open:true,multiple_select_maintains_winnow:false});
$("#select_invite_group_members_chzn").find(".chzn-results").css("max-height","200px");
$("#select_invite_group_members_holder").css("min-height",235);
$(".modal-body").css("overflow-y","visible");
$("#select_invite_group_members_chzn").css("width","100%");
$("#select_invite_group_members_chzn").find(".default").css("width","100%")
}else{TS.generic_dialog.start({title:"Everyone is already in this group",body:"Since everyone is already in this group, there is no one to invite!",show_cancel_button:false,show_go_button:true,go_button_text:"OK",esc_for_ok:true})
}}
})();
(function(){TS.registerModule("ui.banner",{onStart:function(){TS.client.login_sig.add(TS.ui.banner.loggedIn,TS.ui.banner);
TS.ui.growls.permission_changed_sig.add(TS.ui.banner.growlsPermissionChanged,TS.ui.banner)
},loggedIn:function(){if(TS.qs_args.show_notifications_banner=="1"||TS.qs_args.show_banner=="1"){TS.ui.banner.show("notifications");
return
}if(TS.qs_args.show_macssb1_banner=="1"){TS.ui.banner.show("macssb1");
return
}var a=!TS.model.is_iOS&&!TS.ui.growls.no_notifications&&TS.ui.growls.shouldShowPermissionButton()&&TS.ui.growls.getPermissionLevel()!="denied"&&readCookie("no_growl_banner")!="1";
if(a){TS.ui.banner.show("notifications");
return
}var b=TS.boot_data.feature_macssb1_banner&&TS.model.is_mac&&!TS.model.mac_ssb_version&&!TS.model.prefs.no_macssb1_banner;
if(b){TS.ui.banner.show("macssb1");
return
}},growlsPermissionChanged:function(b,a){if(a!="default"){TS.ui.banner.close()
}},show:function(b){b=b||"notifications";
var a=TS.client.ui.$banner;
a.removeClass("hidden");
$("body").addClass("banner_showing");
a.css("display","block");
a.children(".banner_content").addClass("hidden");
if(b=="notifications_dismiss"){$("#notifications_dismiss_banner").removeClass("hidden");
a.unbind("click").bind("click",function(c){TS.ui.banner.close()
})
}else{if(b=="notifications"){$("#notifications_banner").removeClass("hidden");
a.unbind("click").bind("click",function(c){if($(c.target).closest(".dismiss").length===0){setTimeout(function(){TS.ui.prefs_dialog.start("notifications")
},500)
}else{$("#notifications_banner").addClass("hidden");
TS.ui.banner.show("notifications_dismiss");
return
}TS.ui.banner.close()
})
}else{if(b=="macssb1"){$("#macssb1_banner").removeClass("hidden");
a.unbind("click").bind("click",function(c){if($(c.target).closest(".dismiss").length){$("#macssb1_banner").addClass("hidden");
TS.ui.banner.show("macssb1_dismiss")
}else{if(!$(c.target).hasClass("apps_page_link")){var d=$(this).find(".apps_page_link");
TS.utility.openInNewTab(d.attr("href"),d.attr("target"));
d.click()
}}})
}else{if(b=="macssb1_dismiss"){a.unbind("click").bind("click",function(c){if($(c.target).closest("a").length===0){var d=$(this).find(".apps_page_link");
TS.utility.openInNewTab(d.attr("href"),d.attr("target"))
}});
$("#macssb1_dismiss_banner").removeClass("hidden")
}}}}TS.view.resizeManually("TS.ui.banner.show")
},onClickedMacSSB1Link:function(a){if(a){TS.ui.banner.close()
}TS.prefs.setPrefByAPI({name:"no_macssb1_banner",value:true})
},closeNagAndSetCookie:function(){TS.ui.banner.close();
createCookie("no_growl_banner","1",365*10)
},closeNagAndOpenPrefs:function(){TS.ui.banner.close();
setTimeout(function(){TS.ui.prefs_dialog.start("notifications")
},500)
},close:function(){var a=TS.client.ui.$banner;
a.slideUp(200,function(){a.addClass("hidden");
$("body").removeClass("banner_showing");
var b=(TS.client&&TS.client.ui.areMsgsScrolledToBottom());
TS.view.resizeManually("TS.ui.banner.close");
if(b){TS.client.ui.instaScrollMsgsToBottom(false)
}})
}})
})();
(function(){TS.registerModule("ui.msg_tab_complete",{$el:null,$input:null,$scroller:null,current_matches:null,is_showing:false,last_shown_matches:null,show_delay_tim:0,show_delay_ms:500,lazy_load:null,date_start:new Date(),onStart:function(){},start:function(c){if(TS.boot_data.feature_comment_mentions_autocomplete){if(a){return
}a=true;
TS.ui.msg_tab_complete.$input=c;
c.tab_complete_ui({id:"chat_input_tab_ui"});
return
}if(TS.ui.msg_tab_complete.$el){return
}$("body").append('<div id="chat_input_tab_ui" class="hidden inactive"> 				<div id="chat_input_tab_ui_header"> 					<span class="header_label"></span> 					<span class="header_help"><strong>tab</strong>&nbsp; or &nbsp;<strong>&uarr;</strong> <strong>&darr;</strong>&nbsp; to navigate <strong class="left_margin">↵</strong>&nbsp; to select <strong class="left_margin">esc</strong>&nbsp; to dismiss</span> 				</div> 				<div id="chat_input_tab_ui_scroller"></div> 			</div>');
TS.ui.msg_tab_complete.$el=$("#chat_input_tab_ui");
TS.ui.msg_tab_complete.$scroller=$("#chat_input_tab_ui_scroller");
var b=TS.qs_args.debug_scroll=="1";
TS.ui.msg_tab_complete.$scroller.monkeyScroll({debug:b});
TS.ui.msg_tab_complete.$input=c;
TS.ui.msg_tab_complete.$el.bind("click",TS.ui.msg_tab_complete.onElClick);
c.bind("matches_set",TS.ui.msg_tab_complete.onInputMatchesSet);
c.bind("match_changed",TS.ui.msg_tab_complete.onInputMatchChanged);
c.bind("reset",TS.ui.msg_tab_complete.onInputReset)
},show_threshold:1000,show_slow:null,show:function(b){var g=new Date();
b.shown_callback();
var c=TS.ui.msg_tab_complete.$el;
var e=TS.ui.msg_tab_complete.$scroller;
var f=b.current_matches.join("");
if(TS.ui.msg_tab_complete.last_shown_matches!==f){TS.ui.msg_tab_complete.last_shown_matches=f;
TS.ui.msg_tab_complete.buildAndInsertHTML(b)
}if(!TS.ui.msg_tab_complete.is_showing){c.removeClass("inactive").removeClass("hidden");
$("#chat_input_tab_ui_scroller").trigger("resize-immediate")
}TS.ui.msg_tab_complete.is_showing=true;
$("html").unbind("mousedown.tabcomplete").bind("mousedown.tabcomplete",TS.ui.msg_tab_complete.onMouseDown);
e.data("monkeyScroll").updateFunc();
TS.ui.msg_tab_complete.positionUI();
var d=new Date()-g;
if(b&&b.w&&d>TS.ui.msg_tab_complete.show_threshold&&!TS.ui.msg_tab_complete.show_slow){if(b.w==="emoji"){TS.logError({message:"TS.ui.msg_tab_complete.show() with emoji > "+TS.ui.msg_tab_complete.show_threshold+" ms"}," emoji took "+d+" ms for "+b.current_matches.length+" items. localStorage = "+(TS.model.prefs.ls_disabled?0:1))
}else{if(b.w==="members"){TS.logError({message:"TS.ui.msg_tab_complete.show() with members > "+TS.ui.msg_tab_complete.show_threshold+" ms"}," members took "+d+" ms for "+b.current_matches.length+" items. Member images: "+((!TS.model.mac_ssb_version||b.current_matches.length<100)?"included.":"excluded.")+" App open for "+((new Date()-TS.ui.msg_tab_complete.date_start)/1000/60).toFixed(2)+" min.")
}}TS.ui.msg_tab_complete.show_slow=true
}},hide:function(){var b=TS.ui.msg_tab_complete.$el;
TS.ui.msg_tab_complete.is_showing=false;
b.addClass("inactive");
b.addClass("hidden");
TS.ui.msg_tab_complete.last_shown_matches=null
},onElClick:function(c){var d=TS.ui.msg_tab_complete.$input;
var b=$(c.target).closest(".chat_input_tab_item");
if(!b.length){return
}d.TS_tabComplete2("choose",b.data("index"))
},onInputMatchesSet:function(f,b){clearTimeout(TS.ui.msg_tab_complete.show_delay_tim);
var c=TS.ui.msg_tab_complete.$el;
var g=TS.ui.msg_tab_complete.$scroller;
TS.ui.msg_tab_complete.current_matches=b.current_matches;
if(b.hide_ui){TS.ui.msg_tab_complete.hide()
}else{var d=function(){TS.ui.msg_tab_complete.show(b);
g.scrollTop(0);
if(b.i!=-1){c.find('.chat_input_tab_item[data-index="'+b.i+'"]:not(.just_one)').addClass("active").scrollintoview({duration:10})
}};
if(b.delay_ui){TS.ui.msg_tab_complete.show_delay_tim=setTimeout(d,TS.ui.msg_tab_complete.show_delay_ms);
g.scrollTop(0);
if(b.i!=-1){c.find('.chat_input_tab_item[data-index="'+b.i+'"]:not(.just_one)').addClass("active").scrollintoview({duration:10})
}g.data("monkeyScroll").updateFunc();
TS.ui.msg_tab_complete.positionUI()
}else{d()
}}},onInputMatchChanged:function(d,b){clearTimeout(TS.ui.msg_tab_complete.show_delay_tim);
var c=TS.ui.msg_tab_complete.$el;
if(!TS.ui.msg_tab_complete.current_matches){TS.ui.msg_tab_complete.onInputMatchesSet(d,b);
return
}TS.ui.msg_tab_complete.show(b);
c.find(".chat_input_tab_item").removeClass("active");
c.find('.chat_input_tab_item[data-index="'+b.i+'"]').addClass("active").scrollintoview({duration:10})
},onInputReset:function(c,b){clearTimeout(TS.ui.msg_tab_complete.show_delay_tim);
$("html").unbind("mousedown.tabcomplete");
TS.ui.msg_tab_complete.hide();
TS.ui.msg_tab_complete.current_matches=null
},positionUI:function(){if(TS.boot_data.feature_comment_mentions_autocomplete){if(!a){return
}TS.ui.msg_tab_complete.$input.tab_complete_ui("positionUI");
return
}if(!TS.ui.msg_tab_complete.$el||!TS.ui.msg_tab_complete.$el.length){return
}var c=TS.ui.msg_tab_complete.$el;
var f=TS.ui.msg_tab_complete.$input;
c.css({width:Math.max(f.width(),500)});
var d=f.offset();
var b=d.left;
var e=d.top-c.outerHeight();
c.css({top:e,left:b})
},onMouseDown:function(c){var b=TS.ui.msg_tab_complete.$el;
var d=TS.ui.msg_tab_complete.$input;
if($(c.target).closest(b).length===0&&$(c.target).closest(d).length===0){d.TS_tabComplete2("reset","mousedown")
}},isShowing:function(){if(!TS.boot_data.feature_comment_mentions_autocomplete){return false
}return a&&TS.ui.msg_tab_complete.$input.tab_complete_ui("isShowing")
},buildItemsHTML:function(l){var h=[];
var f=TS.ui.msg_tab_complete.current_matches;
var m="type_"+l.w;
h.push('<ul class="'+m+'">');
var d=false&&f.length==1;
var j=false;
var b={};
for(var g=0;
g<f.length;
g++){if(l.w=="emoji"){h.push('<li class="chat_input_tab_item" data-index="'+g+'">'+TS.ui.msg_tab_complete.buildEmojiHTML(f[g])+"</li>")
}else{if(l.w=="channels"){h.push('<li class="chat_input_tab_item" data-index="'+g+'">'+TS.ui.msg_tab_complete.buildChannelHTML(f[g])+"</li>")
}else{if(l.w=="cmds"){h.push('<li class="chat_input_tab_item '+(d?"just_one":"")+'" data-index="'+g+'">'+TS.ui.msg_tab_complete.buildCmdHTML(f[g],d)+"</li>");
if(j){var c=TS.utility.clone(TS.cmd_handlers[f[g]]);
if(c){b[f[g]]=c;
for(var e in c){if(!c[e]||e=="autocomplete"){delete c[e]
}}}}}else{h.push(TS.ui.msg_tab_complete.buildMemberHTML(f,g,l.sort_by_membership))
}}}}if(j){TS.warn(JSON.stringify(b,null,"\t"))
}h.push("</ul>");
h=h.join("");
if(l.w=="emoji"){h=TS.utility.emojiGraphicReplace(h)
}return h
},buildMemberHTML:function(g,f,d){var j=g[f];
var h;
var m=false;
if(j=="everyone"||j=="channel"||j=="group"){m=d&&f>0&&TS.members.getMemberByName(g[f-1]);
h='<span class="broadcast">@'+j+"</span>";
switch(j){case"everyone":h+=' <span class="broadcast_info">This will notify everyone on your team.</span>';
break;
case"channel":h+=' <span class="broadcast_info">This will notify everyone in this channel.</span>';
break;
case"group":h+=' <span class="broadcast_info">This will notify everyone in this group.</span>';
break;
default:break
}}else{h='<span class="username">'+j+"</span>";
var e=TS.members.getMemberByName(j);
if(!e){h="@"+h
}else{var c=TS.shared.getActiveModelOb();
var k=!c.is_im&&(c.members.indexOf(e.id)>-1||e.is_slackbot);
if(d&&f>0&&!k&&!c.is_im){var b=TS.members.getMemberByName(g[f-1]);
if(!b||b.is_slackbot||c.members.indexOf(b.id)>-1){m=true
}}if(g.length<100){h=TS.templates.builders.makeMemberImage(e.id,24,true)+" "+h
}h+=TS.templates.makeMemberPresenceIcon(e);
h+=' <span class="realname">'+TS.utility.htmlEntities(e.profile.real_name)+"</span>";
if(!e.is_slackbot&&!c.is_im){var l="channel";
if(c.is_group){l="group"
}if(!k){h+=' <span class="not_in_channel">(not in '+l+")</span>"
}}}}h='<li class="chat_input_tab_item" data-index="'+f+'">'+h+"</li>";
if(m){h='<hr class="small_top_margin small_bottom_margin" />'+h
}return h
},buildChannelHTML:function(b){var c='<span class="channelname"><span class="hash">#</span>'+b+"</span>";
return c
},buildCmdHTML:function(h,d){var c=TS.cmd_handlers[h];
var g;
if(c){var b="";
if(c.aliases){b=" (or "+c.aliases.join(", ")+")"
}var j="";
if(c.usage){j=" "+c.usage;
j=j.replace(/</g,'<span class="argname argoptional"%%%% &lt;');
j=j.replace(/\>/g,"&gt;</span>");
j=j.replace(/\%\%\%\%/g,">");
j=j.replace(/\[/g,'<span class="argname"> [');
j=j.replace(/\]/g,"]</span>")
}else{if(c.args){var k;
for(var f=0;
f<c.args.length;
f++){k=c.args[f];
if(k.optional){j+=' <span class="argname argoptional"> ['+k.name+"]</span>"
}else{j+=' <span class="argname"> '+k.name+"</span>"
}}}}var l="";
var e="";
if(c.type=="client"&&c.override){e=" override"
}if(c.type=="service"||c.type=="custom"){l="["+c.type+e+"]"
}g='<div class="cmd-left-td"><span class="cmdname">'+TS.utility.htmlEntities(h)+"</span>"+b+j+'</div><div class="cmd-right-td"><span class="cmddesc"><span class="cmdtype">'+l+"</span> "+TS.utility.htmlEntities(c.desc)+"</span></div>"
}else{g='<div class="cmd-left-td"><span class="cmdname">'+h+"</span></div>"
}if(d){}return g
},buildEmojiHTML:function(b){var d=true;
var c=":"+b+": ";
if(d){c=":"+b+": &#58;"+b+"&#58"
}return c
},buildHeaderHTML:function(b){var c="";
if(b.w=="members"){c="People"
}else{if(b.w=="cmds"){c="Commands"
}else{c=TS.utility.capitalize(b.w)
}}if(b.matched_on&&b.matched_on!="@"&&b.matched_on!="#"){c+=" matching <strong>"+TS.utility.htmlEntities(b.matched_on)+"</strong>"
}return c
},buildAndInsertHTML:function(b){var c=TS.ui.msg_tab_complete.$scroller;
$("#chat_input_tab_ui_header .header_label").html(TS.ui.msg_tab_complete.buildHeaderHTML(b));
c.html(TS.ui.msg_tab_complete.buildItemsHTML(b));
if(TS.ui.msg_tab_complete.lazyload&&TS.ui.msg_tab_complete.lazyload.detachEvents){TS.ui.msg_tab_complete.lazyload.detachEvents()
}TS.ui.msg_tab_complete.lazyload=c.find("img.lazy").lazyload({container:$("#chat_input_tab_ui_scroller")})
}});
var a=false
})();
(function(){TS.registerModule("typing",{typing_self_lasts_ms:3000,typing_lasts_ms:6000,started_sig:new signals.Signal(),ended_sig:new signals.Signal(),map:{},onStart:function(){setInterval(TS.typing.checkMap,1000)
},userStarted:function(a){if(!TS.model.ms_connected){return
}if(!a){return
}var c=TS.model.user;
var b=a.id+"_"+c.id;
if(TS.typing.map[b]){return
}TS.ms.sendTyping(a.id);
TS.typing.memberStarted(a,TS.model.user)
},memberStarted:function(a,d){var c=a.id+"_"+d.id;
var b=TS.utility.date.getTimeStamp();
if(TS.typing.map[c]){TS.typing.map[c].started=b;
TS.log(47,"updated "+c)
}else{TS.typing.map[c]={started:b,model_ob:a,member:d};
TS.log(47,"added "+c);
TS.typing.started_sig.dispatch(a,d)
}},userEnded:function(a){if(!a){return
}var b=TS.model.user;
TS.typing.memberEnded(a,b)
},memberEnded:function(a,c){var b=a.id+"_"+c.id;
TS.typing.expungeMember(a,c);
TS.log(47,"removed "+b)
},expungeMember:function(a,c){var b=a.id+"_"+c.id;
delete TS.typing.map[b];
TS.typing.ended_sig.dispatch(a,c)
},checkMap:function(){var b=TS.utility.date.getTimeStamp();
var a;
for(var c in TS.typing.map){a=TS.typing.map[c];
var e=(a.member.is_self)?TS.typing.typing_self_lasts_ms:TS.typing.typing_lasts_ms;
var d=b-a.started;
if(d>=e){TS.typing.memberEnded(a.model_ob,a.member);
TS.log(47,"removed "+c+" after "+d)
}}},getTypersInChannel:function(d){var a=[];
var b;
for(var c in TS.typing.map){b=TS.typing.map[c];
if(b.model_ob.id==d&&!b.member.is_self){a.push(b.member)
}}a.sort(function(f,e){if(TS.members.getMemberDisplayNameLowerCase(f)<TS.members.getMemberDisplayNameLowerCase(e)){return -1
}if(TS.members.getMemberDisplayNameLowerCase(f)>TS.members.getMemberDisplayNameLowerCase(e)){return 1
}return 0
});
return a
}})
})();
(function(){TS.registerModule("ui.shortcuts_dialog",{$div:null,showing:false,onStart:function(){},onKeydown:function(a){if(!TS.ui.shortcuts_dialog.showing){return
}if(a.which==TS.utility.keymap.enter||a.which==TS.utility.keymap.esc){TS.ui.shortcuts_dialog.cancel();
a.preventDefault()
}},start:function(){if(!TS.ui.shortcuts_dialog.$div){TS.ui.shortcuts_dialog.build()
}var b=TS.templates.shortcuts_dialog();
var a=TS.ui.shortcuts_dialog.$div;
a.html(b).modal("show").find(".dialog_cancel").click(TS.ui.shortcuts_dialog.cancel);
TS.ui.a11y.saveCurrentFocusAndFocusOnElement(a)
},cancel:function(){TS.ui.shortcuts_dialog.$div.modal("hide")
},end:function(){TS.ui.shortcuts_dialog.showing=TS.model.dialog_is_showing=false;
TS.ui.shortcuts_dialog.$div.empty();
$(window.document).unbind("keydown",TS.ui.shortcuts_dialog.onKeydown);
TS.ui.a11y.restorePreviousFocusAndCleanUpElement(TS.ui.shortcuts_dialog.$div)
},build:function(){$("body").append('<div id="shortcuts_dialog" class="modal hide fade"></div>');
var a=TS.ui.shortcuts_dialog.$div=$("#shortcuts_dialog");
a.on("hidden",function(b){if(b.target!=this){return
}TS.ui.shortcuts_dialog.end()
});
a.on("show",function(b){if(b.target!=this){return
}TS.ui.shortcuts_dialog.showing=TS.model.dialog_is_showing=true
});
a.on("shown",function(b){if(b.target!=this){return
}$(window.document).bind("keydown",TS.ui.shortcuts_dialog.onKeydown)
})
}})
})();
(function(){TS.registerModule("ui.omnibox",{div:null,showing:false,all_results:[],main_grouping:[],secondary_grouping:[],matches:[],teams:[],input_el:"",results_el:"",selected_index:-1,onStart:function(){},onKeyDown:function(f){var d;
if(!TS.ui.omnibox.showing){return
}if(f.which==TS.utility.keymap.enter){d=TS.ui.omnibox.results_el.find(".selected");
if(d.length>0){if(d.data("team-url")){TS.ui.omnibox.selectTeamResult(d.data("team-url"),d.data("team-name"),d.data("team-id"))
}else{if(d.data("item-id")){TS.ui.omnibox.selectResult(d.data("item-id"))
}else{TS.ui.omnibox.selectSignInLink(d.attr("href"))
}}}f.preventDefault()
}else{if(f.which==TS.utility.keymap.esc){TS.ui.omnibox.cancel();
f.preventDefault()
}else{if(!f.altKey&&f.which==75&&TS.utility.cmdKey(f)){if(!$.trim(TS.ui.omnibox.input_el.val())){TS.ui.omnibox.cancel();
f.preventDefault()
}else{TS.ui.omnibox.input_el.val("")
}}else{if(TS.model.is_our_app&&!f.altKey&&f.which==84&&TS.utility.cmdKey(f)){TS.ui.omnibox.cancel();
f.preventDefault()
}else{if(f.which==TS.utility.keymap.up||f.which==TS.utility.keymap.down||f.which==TS.utility.keymap.tab){TS.ui.omnibox.results_el.find(".omnibox_item").removeClass("selected");
if(f.which==TS.utility.keymap.up){if(TS.ui.omnibox.selected_index===0){TS.ui.omnibox.selected_index=TS.ui.omnibox.results_el.find(".omnibox_item").length-1
}else{TS.ui.omnibox.selected_index--
}}else{if(f.which==TS.utility.keymap.down||f.which==TS.utility.keymap.tab){if(TS.ui.omnibox.selected_index==(TS.ui.omnibox.results_el.find(".omnibox_item").length-1)){TS.ui.omnibox.selected_index=0
}else{TS.ui.omnibox.selected_index++
}}}d=TS.ui.omnibox.results_el.find(".omnibox_item[data-index="+TS.ui.omnibox.selected_index+"]");
d.addClass("selected").scrollintoview({offset:"top",px_offset:0,duration:0});
TS.ui.a11y.ariaLiveAnnounce(d.attr("aria-label"),true);
f.preventDefault()
}}}}}},onKeyUp:function(d){if(!TS.ui.omnibox.showing){return
}if(d.which==TS.utility.keymap.up||d.which==TS.utility.keymap.down||d.which==TS.utility.keymap.tab){d.preventDefault()
}else{if(d.which!=TS.utility.keymap.enter&&d.which!=TS.utility.keymap.esc){TS.ui.omnibox.showResults()
}}},start:function(){if(!TS.ui.omnibox.div){TS.ui.omnibox.build()
}var m=TS.templates.omnibox();
var p=TS.ui.omnibox.div;
p.html(m);
TS.ui.omnibox.input_el=TS.ui.omnibox.div.find("#omnibox_input");
TS.ui.omnibox.results_el=TS.ui.omnibox.div.find("#omnibox_results");
var d=TS.channels.getChannelsForUser();
var l=[];
var o=[];
var g=[];
var j=[];
TS.ui.omnibox.teams.length=0;
if(TS.boot_data.other_accounts){$.each(TS.boot_data.other_accounts,function(i,A){TS.ui.omnibox.teams.push(A)
})
}var u,z;
for(u=0;
u<d.length;
u++){z=d[u];
if(z.is_archived){continue
}if(z.is_member){if(z.unread_highlight_cnt&&z.unread_highlight_cnt>0){l.push(z)
}else{if(z.unread_cnt&&z.unread_cnt>0){o.push(z)
}else{g.push(z)
}}}else{j.push(z)
}}var t;
if(TS.boot_data.feature_bot_users){t=function(A,i){return((A._name_lc||A.name)>(i._name_lc||i.name))?1:(((i._name_lc||i.name)>(A._name_lc||A.name))?-1:0)
}
}else{t=function(A,i){return(A._name_lc>i._name_lc)?1:((i._name_lc>A._name_lc)?-1:0)
}
}l.sort(t);
o.sort(t);
g.sort(t);
j.sort(t);
var w=[];
var y=[];
var f=[];
TS.members.getActiveMembersWithSlackbotAndNotSelf().forEach(function(A){var i=TS.ims.getImByMemberId(A.id);
if(i&&i.unread_cnt&&i.unread_cnt>0){w.push(A)
}else{if(TS.boot_data.feature_bot_users&&(A.is_bot||A.is_slackbot)){f.push(A)
}else{y.push(A)
}}});
w.sort(t);
y.sort(t);
f.sort(t);
var x=TS.model.groups;
var r=[];
var q=[];
var e=[];
var k;
for(u=0;
u<x.length;
u++){k=x[u];
if(k.is_archived){continue
}if(k.unread_highlight_cnt&&k.unread_highlight_cnt>0){r.push(k)
}else{if(k.unread_cnt&&k.unread_cnt>0){q.push(k)
}else{e.push(k)
}}}r.sort(t);
q.sort(t);
e.sort(t);
TS.ui.omnibox.all_results=l.concat(w,r,o,q,g,y,f,e,j);
if(TS.boot_data.other_accounts){TS.ui.omnibox.all_results=TS.ui.omnibox.all_results.concat(TS.ui.omnibox.teams)
}var h=l.concat(o,g).sort(t);
var s=w.concat(y).sort(t);
var v=r.concat(q,e).sort(t);
s=s.concat(f);
TS.ui.omnibox.main_grouping=h.concat(s,v);
TS.ui.omnibox.secondary_grouping=j;
TS.ui.omnibox.showResults();
p.modal("show")
},cancel:function(){TS.ui.omnibox.div.modal("hide")
},end:function(){TS.ui.omnibox.showing=TS.model.dialog_is_showing=false;
TS.ui.omnibox.file=null;
TS.ui.omnibox.div.empty();
TS.ui.omnibox.selected_index=0;
$(window.document).unbind("keyup",TS.ui.omnibox.onKeyUp);
$(window.document).unbind("keydown",TS.ui.omnibox.onKeyDown);
TS.ui.a11y.restorePreviousFocusAndCleanUpElement(TS.ui.omnibox.input_el)
},build:function(){$("body").append('<div id="omnibox" class="modal hide" data-keyboard="false"></div>');
var d=TS.ui.omnibox.div=$("#omnibox");
d.on("hidden",function(f){if(f.target!=this){return
}TS.ui.omnibox.end()
});
d.on("show",function(f){if(f.target!=this){return
}TS.ui.omnibox.showing=TS.model.dialog_is_showing=true
});
d.on("shown",function(f){$(window.document).bind("keyup",TS.ui.omnibox.onKeyUp);
$(window.document).bind("keydown",TS.ui.omnibox.onKeyDown);
TS.ui.omnibox.results_el.monkeyScroll();
setTimeout(function(){TS.ui.a11y.saveCurrentFocusAndFocusOnElement(TS.ui.omnibox.input_el)
},0)
})
},appendResultsHtml:function(e){var f,i,d;
if(0&&TS.boot_data.feature_bot_users){$.each(e,function(j,k){i=false;
if(k.is_channel){d="channel"
}else{if(k.is_group){d="group"
}else{if(k.is_bot||k.is_slackbot){d="bot"
}else{if(k.hasOwnProperty("team_name")&&k.team_name){d="team"
}else{d="member"
}}}}if(d&&d!==f){f=d;
if(j!==0){i=true
}}TS.ui.omnibox.results_el.append(TS.ui.omnibox.buildItemHTML(k,j,i))
})
}else{var h=false,g=false;
$.each(e,function(j,k){var l=false;
if(j!==0&&!h&&k.is_channel&&!k.is_member){l=true;
h=true
}if(!g&&k.hasOwnProperty("team_name")){if(j===0){l=false
}else{l=true
}g=true
}TS.ui.omnibox.results_el.append(TS.ui.omnibox.buildItemHTML(k,j,l))
})
}},buildItemHTML:function(k,g,d){var f="";
var e="";
var j="";
var h=false;
var i=null;
var l="<hr />";
if(k.hasOwnProperty("team_name")){f+='<div class="omnibox_item" data-index="'+g+'" data-team-url="'+k.team_url+'" data-team-name="'+TS.utility.htmlEntities(k.team_name)+'" data-team-id="'+k.id+'" aria-label="Switch to '+TS.utility.htmlEntities(k.team_name)+" (signed in as "+TS.utility.htmlEntities(k.name)+')">';
f+='<i class="fa fa-random prefix"></i> <span class="subtext no_left_margin">Switch to</span> '+TS.utility.htmlEntities(k.team_name)+' <span class="subtext no_left_margin">(signed in as '+TS.utility.htmlEntities(k.name)+")</span>"
}else{if(k.is_group){e+='<i class="fa fa-lock prefix"></i>'+TS.utility.htmlEntities(k.name);
j=TS.utility.htmlEntities(k.name);
h=k.unread_cnt&&k.unread_cnt>0;
if(k.unread_highlight_cnt&&k.unread_highlight_cnt>0){e+='<span class="unread_highlight_cnt">'+k.unread_highlight_cnt+"</span>"
}}else{if(k.is_channel){e+='<span class="prefix">#</span>'+TS.utility.htmlEntities(k.name);
j="#"+TS.utility.htmlEntities(k.name);
if(!k.is_member){e+=' <span class="subtext">(not a member)</span>';
j+=", not a member"
}h=k.unread_cnt&&k.unread_cnt>0;
if(k.unread_highlight_cnt&&k.unread_highlight_cnt>0){e+='<span class="unread_highlight_cnt">'+k.unread_highlight_cnt+"</span>"
}}else{e+=TS.templates.makeMemberPresenceIcon(k);
e+=TS.utility.htmlEntities(k.name);
j="@"+TS.utility.htmlEntities(k.name);
if(k.profile.real_name){e+='<span class="subtext">'+TS.utility.htmlEntities(k.profile.real_name)+"</span>";
j+=", "+TS.utility.htmlEntities(k.profile.real_name)
}i=TS.ims.getImByMemberId(k.id);
if(i&&i.unread_cnt&&i.unread_cnt>0){h=true;
e+='<span class="unread_highlight_cnt">'+i.unread_cnt+"</span>"
}}}if(h){f+='<div class="omnibox_item unread" data-index="'+g+'" data-item-id="'+k.id+'" aria-label="'+j+'">';
d=false
}else{f+='<div class="omnibox_item" data-index="'+g+'" data-item-id="'+k.id+'" aria-label="'+j+'">'
}f+=e
}if(d){f=l+f
}f+="</div>";
return f
},showResults:function(){var h=$.trim(TS.ui.omnibox.input_el.val());
var f=h;
var p=false;
var k=false;
var m=false;
var g="";
var d="";
if(f.indexOf("#")===0){f=f.substr(1);
g="c";
p=true
}else{if(f.indexOf("@")===0){f=f.substr(1);
g="m";
k=true
}else{if(f.indexOf("switch ")===0){f=f.substr(7);
g="t";
m=true
}}}if(f!==""||p||k||m){var j=a(TS.ui.omnibox.main_grouping,f,g);
var e=a(TS.ui.omnibox.secondary_grouping,f,g);
var o=[];
if(TS.ui.omnibox.teams.length>0){o=a(TS.ui.omnibox.teams,f,"t")
}TS.ui.omnibox.matches=j.concat(e,o)
}else{TS.ui.omnibox.matches.length=0
}TS.ui.omnibox.results_el.empty();
TS.ui.omnibox.selected_index=-1;
TS.ui.omnibox.div.find(".no_results").addClass("hidden");
if(TS.ui.omnibox.matches.length>0){var w=[],l;
for(var t=(TS.ui.omnibox.matches.length-1);
t>-1;
t--){l=TS.ui.omnibox.matches[t];
if(l.hasOwnProperty("team_name")&&l.team_name==f){w.push(TS.ui.omnibox.matches.splice(t,1)[0])
}else{if(l.id.charAt(0)==="U"&&!l.hasOwnProperty("team_name")&&(l.name==f||(l.profile.real_name_normalized&&l.profile.real_name_normalized==f)||(l.profile.real_name&&l.profile.real_name==f))){w.push(TS.ui.omnibox.matches.splice(t,1)[0])
}else{if(l.name==f){w.push(TS.ui.omnibox.matches.splice(t,1)[0])
}}}}if(w.length>0){$.each(w,function(y,x){TS.ui.omnibox.matches.unshift(x)
})
}TS.ui.omnibox.appendResultsHtml(TS.ui.omnibox.matches);
d="Found "+TS.ui.omnibox.matches.length+" results.";
if(f!==""){TS.ui.omnibox.selected_index=0;
TS.ui.omnibox.results_el.find(".omnibox_item").first().addClass("selected");
d+=" First result "+TS.ui.omnibox.results_el.find(".omnibox_item").first().attr("aria-label")
}}else{if(f===""){TS.ui.omnibox.appendResultsHtml(TS.ui.omnibox.all_results);
TS.ui.omnibox.results_el.find(".omnibox_item.unread:last").after("<hr>")
}else{var r=f;
if(p){r="#"+r
}else{if(k){r="@"+r
}}TS.ui.omnibox.div.find(".no_results").removeClass("hidden").find(".query").text(r);
d="No matches found.";
b(h)
}}var s=new RegExp("^(s|sw|swi|swit|switc|switch)$","i");
if(TS.ui.omnibox.teams.length>0&&f.match(s)&&!m){TS.ui.omnibox.results_el.empty();
TS.ui.omnibox.selected_index=-1;
TS.ui.omnibox.div.find(".no_results").addClass("hidden");
var v=TS.ui.omnibox.teams.filter(function(i){return !i.team_name.match(s)
});
TS.ui.omnibox.appendResultsHtml(TS.ui.omnibox.matches.concat(v));
var q=TS.ui.omnibox.results_el.find(".omnibox_item").length;
var u='<a id="signin_item" data-index="'+q+'" class="omnibox_item" href="'+TS.boot_data.signin_url+'" aria-label="Sign in to another team"><i class="fa fa-random prefix"></i> <span class="subtext no_left_margin">Sign in to another team...</span</a>';
if(TS.ui.omnibox.div.find("#signin_item").length===0){TS.ui.omnibox.results_el.append(u)
}else{TS.ui.omnibox.results_el.find("#signin_item").replaceWith(u)
}TS.ui.omnibox.div.find(".no_results").addClass("hidden");
d="Switch teams."
}TS.client.ui.updateClosestMonkeyScroller($("#omnibox_results"));
$(".omnibox_item").on("click",function(i){if($(this).data("team-url")){TS.ui.omnibox.selectTeamResult($(this).data("team-url"),$(this).data("team-name"),$(this).data("team-id"))
}else{if($(this).data("item-id")){TS.ui.omnibox.selectResult($(this).data("item-id"))
}else{TS.ui.omnibox.selectSignInLink($(this).attr("href"));
i.preventDefault()
}}});
TS.ui.omnibox.results_el.hover(function(){TS.ui.omnibox.div.find(".selected").addClass("suspended")
},function(){TS.ui.omnibox.div.find(".selected.suspended").removeClass("suspended")
});
TS.ui.a11y.ariaLiveAnnounce(d)
},selectResult:function(d){if(d.charAt(0)==="G"){TS.groups.displayGroup(d)
}else{if(d.charAt(0)==="C"){TS.channels.displayChannel(d)
}else{TS.ims.startImByMemberId(d)
}}TS.ui.omnibox.cancel()
},selectTeamResult:function(d,e,f){TS.ui.omnibox.div.find("#omnibox_ui").addClass("hidden");
if(TSSSB.call("displayTeam",f)){TS.ui.omnibox.cancel();
return
}window.location.href=d;
TS.ui.omnibox.div.find("#omnibox_switching").removeClass("hidden").find("#switched_team_name").text(e)
},selectSignInLink:function(){TS.ui.omnibox.cancel();
TS.generic_dialog.start({title:"Sign in to another team?",body:"<p><strong>This window will reload and you'll be able to sign in to another team.</strong> You'll stay signed in to "+TS.utility.htmlEntities(TS.model.team.name)+" and can switch back at any time.</p>",go_button_text:"Sign in to another team",on_go:function(){window.location.href=TS.boot_data.signin_url
}})
},_filterMatchesOnlyForTesting:function(f,e,d){return a(f,e,d)
}});
var c=50;
var a=function(r,k,l){var e=k.toLocaleLowerCase();
var p=TS.utility.regexpEscape(e);
var o=new RegExp("^"+p+"|(-|_|\\s)"+p,"i");
var s=!!TS.model.prefs.fuzzy_matching;
if(s){o=new RegExp("^.*("+e.split("").map(TS.utility.regexpEscape).join(".*?")+")","i")
}function j(v,w){if(!v){return
}var u=o.exec(v);
if(!u){return
}return{length:s?u[1].length:u[0].length,index:s?(u[0].length-u[1].length):u.index,string:v,item:w}
}var f=function(v,u){if(v.length!=u.length){return v.length-u.length
}else{if(v.index!=u.index){return v.index-u.index
}return v.string.localeCompare(u.string)
}};
var g=function(){return[].filter.call(arguments,function(u){return !!u
}).sort(f)[0]
};
var t=function(u){return u.is_channel&&j(u.name,u)
};
var d=function(u){return(u.id[0]==="U"&&!u.hasOwnProperty("team_name"))&&(g(j(u.name,u),j(u.profile.real_name_normalized,u),j(u.profile.real_name,u)))
};
var m=function(u){return u.hasOwnProperty("team_name")&&j(u.team_name,u)
};
var i=function(u){return g(t(u),d(u),m(u),j(u.name,u))
};
var h;
switch(l){case"c":h=t;
break;
case"m":h=d;
break;
case"t":h=m;
break;
default:h=i;
break
}var q=r.map(h).filter(function(u){return !!u
});
return q.sort(f).slice(0,c).map(function(u){return u.item
})
};
var b=function(f){var e=TS.ui.omnibox.div.find(".create_channel");
if(!f||!(/[a-zA-Z\d]/.test(f))||(f.charAt(0)==="@")||!TS.members.canUserCreateChannels()){e.addClass("hidden");
return
}if(f.length>21){f=f.substring(0,21)
}var d=TS.utility.cleanChannelName(f);
if(!d||TS.channels.getChannelByName(d)||TS.groups.getGroupByName(d)||TS.members.getMemberByName(d)){e.addClass("hidden");
return
}e.removeClass("hidden").text("Create a channel named #"+d);
e.off("click.create_channel").on("click.create_channel",function(){TS.ui.omnibox.cancel();
TS.ui.channel_create_dialog.start(d)
})
}
})();
(function(){TS.registerModule("ui.channel_options_dialog",{div:null,showing:false,c_id:null,onStart:function(){},onKeydown:function(b){if(!TS.ui.channel_options_dialog.showing){return
}if(b.which==TS.utility.keymap.esc){TS.ui.channel_options_dialog.cancel()
}},start:function(k){if(!TS.ui.channel_options_dialog.div){TS.ui.channel_options_dialog.build()
}if(TS.ui.channel_options_dialog.showing){return
}var b=TS.ui.channel_options_dialog.div;
var c=TS.shared.getModelObById(k);
if(!c||c.is_im){alert(k+" ???");
return
}var f="";
var j="";
if(c.is_channel){f="channel";
j="#"+c.name
}else{if(c.is_group){f="group";
j=c.name
}}TS.ui.channel_options_dialog.c_id=k;
var l=false;
if(f=="channel"&&!c.is_general&&TS.model.user.is_admin){l=TS.members.canUserCreateGroups()
}var e=false;
if(!c.is_general){e=(f=="channel"&&TS.members.canUserArchiveChannels())||(f=="group"&&!TS.model.user.is_restricted)
}var d=false;
if(TS.model.user.is_admin||c.creator==TS.model.user.id){d=true
}var i=false;
if(!TS.model.user.is_ultra_restricted&&(!c.is_general||TS.members.canUserPostInGeneral())){i=true
}var g=TS.templates.channel_options_dialog({c_or_g:f,model_ob:c,display_name:j,show_convert_btn:l,show_archive_btn:e,show_rename_btn:d,show_purpose_btn:i});
b.html(g);
TS.ui.channel_options_dialog.div.find("#channel_rename_btn").bind("click",function(){TS.ui.channel_options_dialog.cancel();
setTimeout(function(){TS.ui.channel_create_dialog.start(c.name,c)
},500)
});
TS.ui.channel_options_dialog.div.find("#channel_purpose_btn").bind("click",function(){TS.ui.channel_options_dialog.cancel();
setTimeout(function(){TS.ui.purpose_dialog.start(c.name,c)
},500)
});
TS.ui.channel_options_dialog.div.find("#channel_archive_btn").bind("click",function(){TS.ui.channel_options_dialog.cancel();
setTimeout(function(){TS.generic_dialog.start({title:"Archive #"+c.name,body:"<p>Archiving a channel is useful to clean things up when you do not anticipate using the channel any more. If you archive this channel:</p> 					<ul> 						<li>No one will be able to send messages to it anymore</li> 						<li>It will be closed for anyone who has it open and all members will be removed</li> 						<li>You will be able to view past conversations in the Archives on the site</li> 						<li>You will be able to search for archived messages from this channel</li> 						<li>You will always be able to un-archive it later</li> 					</ul> 					<p>Are you sure you want to archive <b>#"+c.name+"</b>?</p>",go_button_text:"Yes, archive the channel",on_go:function(){TS.api.call("channels.archive",{channel:c.id},function(o,p,m){if(o){return
}var q='Archiving failed with error "'+p.error+'"';
if(p.error=="last_ra_channel"){if(TS.model.user.is_admin){q="Sorry, you can't archive this channel because it is the only group or channel one of the guest account members belongs to. If you first disable the guest account, you will then be able to archive the channel."
}else{q="Sorry, you can't archive this channel because it is the only group or channel one of the guest account members belongs to."
}}else{if(p.error=="restricted_action"){q="<p>You don't have permission to archive channels.</p><p>Talk to your team owner.</p>"
}}setTimeout(TS.generic_dialog.alert,500,q)
})
}})
},500)
});
TS.ui.channel_options_dialog.div.find("#group_archive_btn").bind("click",function(){TS.ui.channel_options_dialog.cancel();
setTimeout(function(){TS.generic_dialog.start({title:"Archive "+TS.model.group_prefix+c.name,body:"<p>If you archive the group, you will no longer be able to send any messages in it. You will still be able to view the archives on the site.</p><p>Are you sure you want to archive <b>"+TS.model.group_prefix+c.name+"</b>?</p",go_button_text:"Yes, archive the group",on_go:function(){TS.api.call("groups.archive",{channel:c.id},function(o,p,m){if(o){return
}var q='Archiving failed with error "'+p.error+'"';
if(p.error=="last_ra_channel"){if(TS.model.user.is_admin){q="Sorry, you can't archive this group because it is the only group or channel one of the guest account members belongs to. If you first disable the guest account, you will then be able to archive the group."
}else{q="Sorry, you can't archive this group because it is the only group or channel one of the guest account members belongs to."
}}TS.generic_dialog.alert(q)
})
}})
},500)
});
TS.ui.channel_options_dialog.div.find("#channel_convert_btn").bind("click",function(){TS.ui.channel_options_dialog.cancel();
setTimeout(function(){TS.generic_dialog.start({title:"Convert #"+c.name+" to a private group?",body:TS.templates.channel_conversion_dialog({name:TS.utility.htmlEntities(c.name)}),go_button_text:"Yes, convert this channel",on_go:function(){TS.api.call("channels.convertToGroup",{channel:c.id},function(o,p,m){if(o){return
}var q='converting to group failed with error "'+p.error+'"';
if(p.error=="restricted_action"){q="<p>You don't have permission to create groups.</p><p>Talk to your team owner.</p>"
}else{if(p.error=="last_ra_channel"){q="<p>Sorry, you can't convert this channel because it is the only channel one of the guest account members belongs to. If you first disable the guest account, you will then be able to convert the channel.</p>"
}}setTimeout(TS.generic_dialog.alert,500,q)
})
}})
},500)
});
TS.ui.channel_options_dialog.div.find("#data_retention_btn").bind("click",function(){TS.ui.channel_options_dialog.cancel();
setTimeout(function(){TS.channels.ui.showDataRetentionDialog(k)
},500)
});
b.modal("show");
b.find(".dialog_cancel").click(TS.ui.channel_options_dialog.cancel);
b.find(".dialog_go").click(TS.ui.channel_options_dialog.go);
var h=false;
if(TS.model.user.is_owner||f=="group"){h=true
}if(h){TS.api.call("team.paymentStatus",{},function(m,o){if(m&&o.has_paid){b.find(".retention_policy_container").removeClass("hidden")
}a()
})
}else{a()
}},go:function(){if(!TS.ui.channel_options_dialog.showing){TS.error("not showing?");
return
}var b=TS.ui.channel_options_dialog.div;
b.modal("hide")
},cancel:function(){TS.ui.channel_options_dialog.div.modal("hide")
},end:function(){TS.ui.channel_options_dialog.c_id=null;
TS.ui.channel_options_dialog.showing=TS.model.dialog_is_showing=false;
$(window.document).unbind("keydown",TS.ui.channel_options_dialog.onKeydown)
},build:function(){$("body").append('<div id="channel_options_dialog" class="modal hide fade"></div>');
var b=TS.ui.channel_options_dialog.div=$("#channel_options_dialog");
b.on("hide",function(c){if(c.target!=this){return
}TS.ui.channel_options_dialog.end()
});
b.on("show",function(c){if(c.target!=this){return
}TS.ui.channel_options_dialog.showing=TS.model.dialog_is_showing=true
});
b.on("shown",function(c){if(c.target!=this){return
}setTimeout(function(){$(window.document).bind("keydown",TS.ui.channel_options_dialog.onKeydown)
},100)
})
}});
var a=function(){var b=TS.ui.channel_options_dialog.div;
b.find(".loading_animation_container").remove();
b.find(".modal-body.hidden").removeClass("hidden")
}
})();
(function(e){var h=function(){var L='<div class="colpick"><div class="colpick_color"><div class="colpick_color_overlay1"><div class="colpick_color_overlay2"><div class="colpick_selector_outer"><div class="colpick_selector_inner"></div></div></div></div></div><div class="colpick_hue"><div class="colpick_hue_arrs"><div class="colpick_hue_larr"></div><div class="colpick_hue_rarr"></div></div></div><div class="colpick_new_color"></div><div class="colpick_current_color"></div><div class="colpick_hex_field"><div class="colpick_field_letter">#</div><input type="text" maxlength="6" size="6" /></div><div class="colpick_rgb_r colpick_field"><div class="colpick_field_letter">R</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_rgb_g colpick_field"><div class="colpick_field_letter">G</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_rgb_b colpick_field"><div class="colpick_field_letter">B</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_h colpick_field"><div class="colpick_field_letter">H</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_s colpick_field"><div class="colpick_field_letter">S</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_b colpick_field"><div class="colpick_field_letter">B</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_submit"></div></div>',q={showEvent:"click",onShow:function(){},onBeforeShow:function(){},onHide:function(){},onChange:function(){},onSubmit:function(){},colorScheme:"light",color:"3289c7",livePreview:true,flat:false,layout:"full",submit:1,submitText:"OK",height:156},D=function(M,O){var N=f(M);
e(O).data("colpick").fields.eq(1).val(N.r).end().eq(2).val(N.g).end().eq(3).val(N.b).end()
},p=function(M,N){e(N).data("colpick").fields.eq(4).val(Math.round(M.h)).end().eq(5).val(Math.round(M.s)).end().eq(6).val(Math.round(M.b)).end()
},s=function(M,N){e(N).data("colpick").fields.eq(0).val(a(M))
},H=function(M,N){e(N).data("colpick").selector.css("backgroundColor","#"+a({h:M.h,s:100,b:100}));
e(N).data("colpick").selectorIndic.css({left:parseInt(e(N).data("colpick").height*M.s/100,10),top:parseInt(e(N).data("colpick").height*(100-M.b)/100,10)})
},l=function(M,N){e(N).data("colpick").hue.css("top",parseInt(e(N).data("colpick").height-e(N).data("colpick").height*M.h/360,10))
},k=function(M,N){e(N).data("colpick").currentColor.css("backgroundColor","#"+a(M))
},w=function(M,N){e(N).data("colpick").newColor.css("backgroundColor","#"+a(M))
},u=function(N){var O=e(this).parent().parent(),M;
if(this.parentNode.className.indexOf("_hex")>0){O.data("colpick").color=M=g(A(this.value));
D(M,O.get(0));
p(M,O.get(0))
}else{if(this.parentNode.className.indexOf("_hsb")>0){O.data("colpick").color=M=B({h:parseInt(O.data("colpick").fields.eq(4).val(),10),s:parseInt(O.data("colpick").fields.eq(5).val(),10),b:parseInt(O.data("colpick").fields.eq(6).val(),10)});
D(M,O.get(0));
s(M,O.get(0))
}else{O.data("colpick").color=M=b(m({r:parseInt(O.data("colpick").fields.eq(1).val(),10),g:parseInt(O.data("colpick").fields.eq(2).val(),10),b:parseInt(O.data("colpick").fields.eq(3).val(),10)}));
s(M,O.get(0));
p(M,O.get(0))
}}H(M,O.get(0));
l(M,O.get(0));
w(M,O.get(0));
O.data("colpick").onChange.apply(O.parent(),[M,a(M),f(M),O.data("colpick").el,0])
},z=function(M){e(this).parent().removeClass("colpick_focus")
},v=function(){e(this).parent().parent().data("colpick").fields.parent().removeClass("colpick_focus");
e(this).parent().addClass("colpick_focus")
},j=function(M){M.preventDefault?M.preventDefault():M.returnValue=false;
var O=e(this).parent().find("input").focus();
var N={el:e(this).parent().addClass("colpick_slider"),max:this.parentNode.className.indexOf("_hsb_h")>0?360:(this.parentNode.className.indexOf("_hsb")>0?100:255),y:M.pageY,field:O,val:parseInt(O.val(),10),preview:e(this).parent().parent().data("colpick").livePreview};
e(document).mouseup(N,y);
e(document).mousemove(N,E)
},E=function(M){M.data.field.val(Math.max(0,Math.min(M.data.max,parseInt(M.data.val-M.pageY+M.data.y,10))));
if(M.data.preview){u.apply(M.data.field.get(0),[true])
}return false
},y=function(M){u.apply(M.data.field.get(0),[true]);
M.data.el.removeClass("colpick_slider").find("input").focus();
e(document).off("mouseup",y);
e(document).off("mousemove",E);
return false
},K=function(N){N.preventDefault?N.preventDefault():N.returnValue=false;
var O={cal:e(this).parent(),y:e(this).offset().top};
e(document).on("mouseup touchend",O,o);
e(document).on("mousemove touchmove",O,r);
var M=((N.type=="touchstart")?N.originalEvent.changedTouches[0].pageY:N.pageY);
u.apply(O.cal.data("colpick").fields.eq(4).val(parseInt(360*(O.cal.data("colpick").height-(M-O.y))/O.cal.data("colpick").height,10)).get(0),[O.cal.data("colpick").livePreview]);
return false
},r=function(N){var M=((N.type=="touchmove")?N.originalEvent.changedTouches[0].pageY:N.pageY);
u.apply(N.data.cal.data("colpick").fields.eq(4).val(parseInt(360*(N.data.cal.data("colpick").height-Math.max(0,Math.min(N.data.cal.data("colpick").height,(M-N.data.y))))/N.data.cal.data("colpick").height,10)).get(0),[N.data.preview]);
return false
},o=function(M){D(M.data.cal.data("colpick").color,M.data.cal.get(0));
s(M.data.cal.data("colpick").color,M.data.cal.get(0));
e(document).off("mouseup touchend",o);
e(document).off("mousemove touchmove",r);
return false
},F=function(N){N.preventDefault?N.preventDefault():N.returnValue=false;
var O={cal:e(this).parent(),pos:e(this).offset()};
O.preview=O.cal.data("colpick").livePreview;
e(document).on("mouseup touchend",O,J);
e(document).on("mousemove touchmove",O,i);
var P,M;
if(N.type=="touchstart"){pageX=N.originalEvent.changedTouches[0].pageX,M=N.originalEvent.changedTouches[0].pageY
}else{pageX=N.pageX;
M=N.pageY
}u.apply(O.cal.data("colpick").fields.eq(6).val(parseInt(100*(O.cal.data("colpick").height-(M-O.pos.top))/O.cal.data("colpick").height,10)).end().eq(5).val(parseInt(100*(pageX-O.pos.left)/O.cal.data("colpick").height,10)).get(0),[O.preview]);
return false
},i=function(N){var O,M;
if(N.type=="touchmove"){pageX=N.originalEvent.changedTouches[0].pageX,M=N.originalEvent.changedTouches[0].pageY
}else{pageX=N.pageX;
M=N.pageY
}u.apply(N.data.cal.data("colpick").fields.eq(6).val(parseInt(100*(N.data.cal.data("colpick").height-Math.max(0,Math.min(N.data.cal.data("colpick").height,(M-N.data.pos.top))))/N.data.cal.data("colpick").height,10)).end().eq(5).val(parseInt(100*(Math.max(0,Math.min(N.data.cal.data("colpick").height,(pageX-N.data.pos.left))))/N.data.cal.data("colpick").height,10)).get(0),[N.data.preview]);
return false
},J=function(M){D(M.data.cal.data("colpick").color,M.data.cal.get(0));
s(M.data.cal.data("colpick").color,M.data.cal.get(0));
e(document).off("mouseup touchend",J);
e(document).off("mousemove touchmove",i);
return false
},x=function(N){var O=e(this).parent();
var M=O.data("colpick").color;
O.data("colpick").origColor=M;
k(M,O.get(0));
O.data("colpick").onSubmit(M,a(M),f(M),O.data("colpick").el)
},I=function(N){if(N){N.stopPropagation()
}var R=e("#"+e(this).data("colpickId"));
R.data("colpick").onBeforeShow.apply(this,[R.get(0)]);
var S=e(this).offset();
var Q=S.top+this.offsetHeight;
var P=S.left;
var O=C();
var M=R.width();
if(P+M>O.l+O.w){P-=M
}R.css({left:P+"px",top:Q+"px"});
if(R.data("colpick").onShow.apply(this,[R.get(0)])!=false){R.show()
}e("html").mousedown({cal:R},t);
R.mousedown(function(T){T.stopPropagation()
})
},t=function(M){if(M.data.cal.data("colpick").onHide.apply(this,[M.data.cal.get(0)])!=false){M.data.cal.hide()
}e("html").off("mousedown",t)
},C=function(){var M=document.compatMode=="CSS1Compat";
return{l:window.pageXOffset||(M?document.documentElement.scrollLeft:document.body.scrollLeft),w:window.innerWidth||(M?document.documentElement.clientWidth:document.body.clientWidth)}
},B=function(M){return{h:Math.min(360,Math.max(0,M.h)),s:Math.min(100,Math.max(0,M.s)),b:Math.min(100,Math.max(0,M.b))}
},m=function(M){return{r:Math.min(255,Math.max(0,M.r)),g:Math.min(255,Math.max(0,M.g)),b:Math.min(255,Math.max(0,M.b))}
},A=function(O){var M=6-O.length;
if(M>0){var P=[];
for(var N=0;
N<M;
N++){P.push("0")
}P.push(O);
O=P.join("")
}return O
},G=function(){var N=e(this).parent();
var M=N.data("colpick").origColor;
N.data("colpick").color=M;
D(M,N.get(0));
s(M,N.get(0));
p(M,N.get(0));
H(M,N.get(0));
l(M,N.get(0));
w(M,N.get(0))
};
return{init:function(M){M=e.extend({},q,M||{});
if(typeof M.color=="string"){M.color=g(M.color)
}else{if(M.color.r!=undefined&&M.color.g!=undefined&&M.color.b!=undefined){M.color=b(M.color)
}else{if(M.color.h!=undefined&&M.color.s!=undefined&&M.color.b!=undefined){M.color=B(M.color)
}else{return this
}}}return this.each(function(){if(!e(this).data("colpickId")){var W=e.extend({},M);
W.origColor=M.color;
var P="collorpicker_"+parseInt(Math.random()*1000);
e(this).data("colpickId",P);
var O=e(L).attr("id",P);
O.addClass("colpick_"+W.layout+(W.submit?"":" colpick_"+W.layout+"_ns"));
if(W.colorScheme!="light"){O.addClass("colpick_"+W.colorScheme)
}O.find("div.colpick_submit").html(W.submitText).click(x);
W.fields=O.find("input").change(u).blur(z).focus(v);
O.find("div.colpick_field_arrs").mousedown(j).end().find("div.colpick_current_color").click(G);
W.selector=O.find("div.colpick_color").on("mousedown touchstart",F);
W.selectorIndic=W.selector.find("div.colpick_selector_outer");
W.el=this;
W.hue=O.find("div.colpick_hue_arrs");
huebar=W.hue.parent();
var U=navigator.userAgent.toLowerCase();
var Q=navigator.appName==="Microsoft Internet Explorer";
var R=Q?parseFloat(U.match(/msie ([0-9]{1,}[\.0-9]{0,})/)[1]):0;
var S=(Q&&R<10);
var V=["#ff0000","#ff0080","#ff00ff","#8000ff","#0000ff","#0080ff","#00ffff","#00ff80","#00ff00","#80ff00","#ffff00","#ff8000","#ff0000"];
if(S){var T,N;
for(T=0;
T<=11;
T++){N=e("<div></div>").attr("style","height:8.333333%; filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr="+V[T]+", endColorstr="+V[T+1]+'); -ms-filter: "progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='+V[T]+", endColorstr="+V[T+1]+')";');
huebar.append(N)
}}else{stopList=V.join(",");
huebar.attr("style","background:-webkit-linear-gradient(top,"+stopList+"); background: -o-linear-gradient(top,"+stopList+"); background: -ms-linear-gradient(top,"+stopList+"); background:-moz-linear-gradient(top,"+stopList+"); -webkit-linear-gradient(top,"+stopList+"); background:linear-gradient(to bottom,"+stopList+"); ")
}O.find("div.colpick_hue").on("mousedown touchstart",K);
W.newColor=O.find("div.colpick_new_color");
W.currentColor=O.find("div.colpick_current_color");
O.data("colpick",W);
D(W.color,O.get(0));
p(W.color,O.get(0));
s(W.color,O.get(0));
l(W.color,O.get(0));
H(W.color,O.get(0));
k(W.color,O.get(0));
w(W.color,O.get(0));
if(W.flat){O.appendTo(this).show();
O.css({position:"relative",display:"block"})
}else{O.appendTo(document.body);
e(this).on(W.showEvent,I);
O.css({position:"absolute"})
}}})
},showPicker:function(){return this.each(function(){if(e(this).data("colpickId")){I.apply(this)
}})
},hidePicker:function(){return this.each(function(){if(e(this).data("colpickId")){e("#"+e(this).data("colpickId")).hide()
}})
},setColor:function(M,N){N=(typeof N==="undefined")?1:N;
if(typeof M=="string"){M=g(M)
}else{if(M.r!=undefined&&M.g!=undefined&&M.b!=undefined){M=b(M)
}else{if(M.h!=undefined&&M.s!=undefined&&M.b!=undefined){M=B(M)
}else{return this
}}}return this.each(function(){if(e(this).data("colpickId")){var O=e("#"+e(this).data("colpickId"));
O.data("colpick").color=M;
O.data("colpick").origColor=M;
D(M,O.get(0));
p(M,O.get(0));
s(M,O.get(0));
l(M,O.get(0));
H(M,O.get(0));
w(M,O.get(0));
O.data("colpick").onChange.apply(O.parent(),[M,a(M),f(M),O.data("colpick").el,1]);
if(N){k(M,O.get(0))
}}})
}}
}();
var c=function(i){var i=parseInt(((i.indexOf("#")>-1)?i.substring(1):i),16);
return{r:i>>16,g:(i&65280)>>8,b:(i&255)}
};
var g=function(i){return b(c(i))
};
var b=function(k){var j={h:0,s:0,b:0};
var l=Math.min(k.r,k.g,k.b);
var i=Math.max(k.r,k.g,k.b);
var m=i-l;
j.b=i;
j.s=i!=0?255*m/i:0;
if(j.s!=0){if(k.r==i){j.h=(k.g-k.b)/m
}else{if(k.g==i){j.h=2+(k.b-k.r)/m
}else{j.h=4+(k.r-k.g)/m
}}}else{j.h=-1
}j.h*=60;
if(j.h<0){j.h+=360
}j.s*=100/255;
j.b*=100/255;
return j
};
var f=function(i){var k={};
var p=i.h;
var o=i.s*255/100;
var j=i.b*255/100;
if(o==0){k.r=k.g=k.b=j
}else{var q=j;
var m=(255-o)*j/255;
var l=(q-m)*(p%60)/60;
if(p==360){p=0
}if(p<60){k.r=q;
k.b=m;
k.g=m+l
}else{if(p<120){k.g=q;
k.b=m;
k.r=q-l
}else{if(p<180){k.g=q;
k.r=m;
k.b=m+l
}else{if(p<240){k.b=q;
k.r=m;
k.g=q-l
}else{if(p<300){k.b=q;
k.g=m;
k.r=m+l
}else{if(p<360){k.r=q;
k.g=m;
k.b=q-l
}else{k.r=0;
k.g=0;
k.b=0
}}}}}}}return{r:Math.round(k.r),g:Math.round(k.g),b:Math.round(k.b)}
};
var d=function(i){var j=[i.r.toString(16),i.g.toString(16),i.b.toString(16)];
e.each(j,function(k,l){if(l.length==1){j[k]="0"+l
}});
return j.join("")
};
var a=function(i){return d(f(i))
};
e.fn.extend({colpick:h.init,colpickHide:h.hidePicker,colpickShow:h.showPicker,colpickSetColor:h.setColor});
e.extend({colpick:{rgbToHex:d,rgbToHsb:b,hsbToHex:a,hsbToRgb:f,hexToHsb:g,hexToRgb:c}})
})(jQuery);
(function(){TS.registerModule("ui.a11y",{focus_stack:[],unread_message_strings:{},$aria_live_div:null,onStart:function(){TS.ui.a11y.$aria_live_div=$('<div id="aria_live_announcer" role="status"></div>');
$("body").append(TS.ui.a11y.$aria_live_div);
TS.channels.switched_sig.add(TS.ui.a11y.annouceCurrentChannelOrImOrGroup);
TS.ims.switched_sig.add(TS.ui.a11y.annouceCurrentChannelOrImOrGroup);
TS.groups.switched_sig.add(TS.ui.a11y.annouceCurrentChannelOrImOrGroup)
},focusOnNextMessage:function(){var g=$(document.activeElement);
var f;
var d=a();
var e=(g.is(c));
if(e&&g.next().length){f=g.next()
}else{if(e){f=b()
}else{if(g.is(b())&&TS.model.archive_view_is_showing){f=d.children(c).first()
}else{if(g.is(b())&&!$("#end_display_meta").hasClass("hidden")){f=$("#end_display_meta")
}else{if(d.children(c).length&&d.children(c).first()){f=d.children(c).first()
}else{f=b()
}}}}}TS.ui.a11y.focusAndAddTabindex(f)
},focusOnPreviousMessage:function(){var g=$(document.activeElement);
var f;
var d=a();
var e=(g.is(c));
if(e&&g.prev().length){f=g.prev()
}else{if(e&&TS.model.archive_view_is_showing){f=b()
}else{if(e&&!$("#end_display_meta").hasClass("hidden")){f=$("#end_display_meta")
}else{if(g.is("#end_display_meta")){f=b()
}else{if(d.children(c).length&&d.children(c).last()){f=d.children(c).last()
}else{f=b()
}}}}}TS.ui.a11y.focusAndAddTabindex(f)
},focusOnOldestUnreadMessage:function(){if(TS.client.ui.$msgs_unread_divider&&TS.client.ui.$msgs_unread_divider.next().length){TS.ui.a11y.focusAndAddTabindex(TS.client.ui.$msgs_unread_divider.next())
}else{TS.ui.a11y.ariaLiveAnnounce("No unread messages.",true)
}},focusOnMessageInput:function(){TS.ui.a11y.focusAndAddTabindex(b())
},focusAndAddTabindex:function(d){if(!d){return
}if(d.attr("tabindex")){d.data("previous-tabindex",d.attr("tabindex"))
}d.attr("tabindex","0");
d.focus()
},cleanUpTabindex:function(d){if(!d){return
}if(d.data("previous-tabindex")){d.attr("tabindex",d.data("previous-tabindex"))
}else{d.removeAttr("tabindex")
}},saveCurrentFocus:function(){TS.ui.a11y.focus_stack.push(document.activeElement);
return document.activeElement
},saveCurrentFocusAndFocusOnElement:function(e){var d=TS.ui.a11y.saveCurrentFocus();
TS.ui.a11y.focusAndAddTabindex(e);
return d
},restorePreviousFocus:function(){var d=TS.ui.a11y.focus_stack.pop();
if(d&&typeof d.focus==="function"){d.focus();
return d
}},restorePreviousFocusAndCleanUpElement:function(d){var e=TS.ui.a11y.restorePreviousFocus();
TS.ui.a11y.cleanUpTabindex(d);
return e
},ariaLiveAnnounce:function(e,d){TS.ui.a11y.$aria_live_div.empty();
TS.ui.a11y.$aria_live_div.attr("aria-live",(d)?"assertive":"polite");
TS.ui.a11y.$aria_live_div.text(e)
},assembleActiveModelName:function(){var d=TS.shared.getActiveModelOb();
var e="";
if(d.is_channel){e="Channel #"+d.name
}else{if(d.is_im){e="Direct message with "+d.name
}else{if(d.is_group){e="Group "+d.name
}}}return e
},saveUnreadCountMessage:function(d,e){if(!d||!d.name||!e){return
}TS.ui.a11y.unread_message_strings[d.name]=e
},annouceCurrentChannelOrImOrGroup:function(){var e=TS.ui.a11y.assembleActiveModelName();
var f=e;
var d=TS.shared.getActiveModelOb();
if(TS.model.archive_view_is_showing){TS.ui.a11y.focusAndAddTabindex(b());
return
}if(TS.ui.a11y.unread_message_strings[d.name]){f+=", "+TS.ui.a11y.unread_message_strings[d.name];
delete TS.ui.a11y.unread_message_strings[d.name]
}TS.ui.a11y.ariaLiveAnnounce(f,true);
TS.client.ui.$msg_input.attr("aria-label","Message input for "+e)
}});
var c=".message, .day_divider, .unread_divider";
var b=function(){return(TS.model.archive_view_is_showing&&TS.client.archives.not_member)?$("#footer_archives"):TS.client.ui.$msg_input
};
var a=function(){return(TS.model.archive_view_is_showing)?TS.client.archives.$archives_msgs_div:TS.client.ui.$msgs_div
}
})();
(function(){TS.registerModule("ui.at_channel_warning_dialog",{$div:null,showing:false,onStart:function(){},onKeydown:function(f){if(!TS.ui.at_channel_warning_dialog.showing){return
}switch(f.which){case TS.utility.keymap.esc:TS.ui.at_channel_warning_dialog.cancel();
break;
case TS.utility.keymap.enter:TS.ui.at_channel_warning_dialog.go();
break
}},start:function(p,m,f,j,l,k){if(!TS.ui.at_channel_warning_dialog.$div){TS.ui.at_channel_warning_dialog.build()
}if(TS.ui.at_channel_warning_dialog.showing){return
}var i=TS.ui.at_channel_warning_dialog.$div;
a=l;
c=p;
var e=TS.format.cleanMsg(m);
var h="";
if(TS.model.everyone_regex.test(e)){h="everyone"
}else{if(TS.model.channel_regex.test(e)){h="channel"
}else{if(TS.model.group_regex.test(e)){h="group"
}}}if(f.length<1){TS.ui.at_channel_warning_dialog.go();
return
}var g=TS.templates.at_channel_warning_dialog({keyword:h,member_count:f.length,timezone_count:Object.keys(j).length,can_show_non_admin_message:TS.boot_data.feature_at_channel_warning_non_admin_message});
i.html(g);
(k)?i.addClass("fullsize"):i.removeClass("fullsize");
i.modal("show");
TS.ui.a11y.saveCurrentFocusAndFocusOnElement(i);
i.find(".dialog_cancel").click(TS.ui.at_channel_warning_dialog.cancel);
i.find(".dialog_go").click(TS.ui.at_channel_warning_dialog.go);
i.find(".channel_members_toggle").click(TS.ui.at_channel_warning_dialog.showChannelMemberList);
i.find(".channel_members_count_underlay").click(TS.ui.at_channel_warning_dialog.hideChannelMemberList);
var o=TS.templates.channel_members_list({channel:{id:"at_warning_dialog_"+TS.utility.date.getTimeStamp()},members:f,current_user_id:TS.model.user.id,color_names:TS.model.prefs.color_names_in_list});
d=i.find(".channel_members");
b=d.find(".channel_members_scroller");
b.html(o);
b.monkeyScroll();
$(window).bind("resize",TS.ui.at_channel_warning_dialog.position);
TS.ui.at_channel_warning_dialog.position();
TS.prefs.setPrefByAPI({name:"last_seen_at_channel_warning",value:TS.utility.date.getTimeStamp()})
},startInMessagePane:function(l,k,g){var e=TS.shared.getModelObById(l);
if(!e||e.is_im){return
}var j=function(){TS.view.clearMessageInput();
TS.shared.sendMsg(l,k,g)
};
var m=TS.client.ui.$msg_input;
var i=true;
var f=[];
var h={};
e.members.forEach(function(p){var q=TS.members.getMemberById(p);
var o=(q&&!q.deleted&&!q.is_bot&&!q.is_slackbot);
if(o&&!q.is_self){f.push(q);
h[""+q.tz_offset]=1
}});
f.sort(TS.members.memberSorterByName);
TS.client.ui.populateChatInput(k);
TS.ui.at_channel_warning_dialog.start(m,k,f,h,j,i)
},startInFlexPane:function(i,j){var k=function(){var l=true;
TS.client.ui.submitFileComment(l)
};
var h=$("#file_comment_form #file_comment");
var f=false;
var e=[];
var g={};
i.forEach(function(m){var l=TS.shared.getModelObById(m);
if(!l||l.is_im){return
}l.members.forEach(function(p){var r=TS.members.getMemberById(p);
var o=(r&&!r.deleted&&!r.is_bot&&!r.is_slackbot);
var q=e.some(function(s){return s.id===r.id
});
if(o&&!r.is_self&&!q){e.push(r);
g[""+r.tz_offset]=1
}})
});
e.sort(TS.members.memberSorterByName);
TS.ui.at_channel_warning_dialog.start(h,j,e,g,k,f)
},position:function(){var e=TS.ui.at_channel_warning_dialog.$div;
var f=c.offset();
e.css({top:f.top-e.height()-8,left:f.left})
},showChannelMemberList:function(i){if(i){i.preventDefault()
}var f=TS.ui.at_channel_warning_dialog.$div;
var g=f.offset();
var h=f.find(".channel_members_toggle").offset();
d.removeClass("hidden");
d.css({top:h.top-g.top-d.outerHeight()-2,left:h.left-g.left-13});
TS.client.ui.updateClosestMonkeyScroller(b);
b.bind("click.view",TS.ui.at_channel_warning_dialog.onMemberClick)
},hideChannelMemberList:function(f){if(f){f.preventDefault()
}d.addClass("hidden");
b.unbind("click.view",TS.ui.at_channel_warning_dialog.onMemberClick)
},onMemberClick:function(g){g.preventDefault();
var f=$(g.target).closest("li").data("member-id");
if(!f){return
}TS.ui.at_channel_warning_dialog.cancel();
TS.client.ui.previewMember(f)
},go:function(){TS.ui.at_channel_warning_dialog.$div.modal("hide");
a()
},cancel:function(){TS.ui.at_channel_warning_dialog.$div.modal("hide");
TS.ui.a11y.restorePreviousFocus()
},end:function(){TS.ui.at_channel_warning_dialog.showing=TS.model.dialog_is_showing=false;
$(window.document).unbind("keydown",TS.ui.at_channel_warning_dialog.onKeydown);
$(window).unbind("resize",TS.ui.at_channel_warning_dialog.position)
},build:function(){$("body").append('<div id="at_channel_warning_dialog" class="modal hide fade"></div>');
var e=TS.ui.at_channel_warning_dialog.$div=$("#at_channel_warning_dialog");
e.on("hide",function(f){if(f.target!=this){return
}TS.ui.at_channel_warning_dialog.end()
});
e.on("show",function(f){if(f.target!=this){return
}TS.ui.at_channel_warning_dialog.showing=TS.model.dialog_is_showing=true
});
e.on("shown",function(f){if(f.target!=this){return
}setTimeout(function(){$(window.document).bind("keydown",TS.ui.at_channel_warning_dialog.onKeydown)
},100)
})
}});
var a=function(){};
var c;
var d;
var b
})();
(function(){TS.registerModule("client.archives",{current_model_ob:null,not_member:false,$scroller:$("#archive_msgs_scroller_div"),$archives_msgs_div:$("#archives_msgs_div"),msgs_are_auto_scrolling:false,active_highlight_count:0,onStart:function(){TS.shared.msg_sent_sig.add(B);
TS.channels.joined_sig.add(p);
TS.groups.unarchived_sig.add(z);
TS.groups.archived_sig.add(v);
TS.channels.unarchived_sig.add(i);
TS.channels.archived_sig.add(t);
TS.channels.message_received_sig.add(f);
TS.channels.message_removed_sig.add(s);
TS.channels.message_changed_sig.add(D);
TS.groups.message_received_sig.add(f);
TS.groups.message_removed_sig.add(s);
TS.groups.message_changed_sig.add(D);
TS.ims.message_received_sig.add(f);
TS.ims.message_removed_sig.add(s);
TS.ims.message_changed_sig.add(D);
TS.client.archives.$scroller.monkeyScroll({debug:false,always_show:true});
d=$("#monkey_scroll_wrapper_for_archive_msgs_scroller_div");
d.addClass("hidden");
$("#archives_return").addClass("hidden").removeClass("warning").find(".cancel_archives").addClass("hidden");
j()
},start:function(K){var I=TS.shared.getActiveModelOb();
if(!I){TS.warn("WTF no model_ob in TS.client.archives.start()");
return
}if(TS.client.archives.current_model_ob){if(I.id==TS.client.archives.current_model_ob.id){if(K&&K==k){TS.client.ui.scrollMsgsSoMsgIsInView(k,false,true);
return
}else{if(K){if(I._archive_msgs&&TS.utility.msgs.getMsg(K,I._archive_msgs)){k=K;
TS.client.ui.scrollMsgsSoMsgIsInView(k,false,true);
return
}else{o()
}}else{TS.info("no change requested in TS.client.archives.start()");
return
}}}else{o()
}}TS.client.archives.$archives_msgs_div.html('<div class="loading_hash_animation"><img src="'+cdn_url+'/f85a/img/loading_hash_animation_@2x.gif" alt="Loading" /><br />loading...</div>');
q=I.id+(K||"");
k=K||null;
TS.client.archives.current_model_ob=I;
TS.client.archives.not_member=(I.is_channel&&(!I.is_member||I.is_archived))||(I.is_group&&I.is_archived);
I.never_needs_joined_msg=true;
a();
d.removeClass("hidden");
TS.client.archives.$scroller.removeClass("hidden");
var M={channel:I.id,count:50,_showing_id:q};
h=false;
F=false;
r=0;
m=0;
c=null;
y=null;
G=false;
e=false;
E();
g();
var J=function(O,P,N){if(!l(O,P,N)){return
}if(m!=r){return
}w(I,I._archive_msgs);
var Q=TS.client.archives.$scroller;
var R=function(){TS.client.archives.msgs_are_auto_scrolling=true;
Q.scrollTop(Q[0].scrollHeight);
TS.client.archives.msgs_are_auto_scrolling=false;
if(k){TS.client.ui.scrollMsgsSoMsgIsInView(k,false,true)
}};
R();
if(y){return
}if(TS.client.archives.$archives_msgs_div.find(".message").length>=20){return
}u(function(){R()
})
};
if(k){var L={channel:I.id,count:50,oldest:k,inclusive:true,_showing_id:q};
M.latest=k;
M.count=25;
r=2;
TS.api.callImmediately(H(),L,J);
TS.api.callImmediately(H(),M,J)
}else{r=1;
setTimeout(function(){if(!TS.model.archive_view_is_showing){return
}if(k){return
}TS.api.callImmediately(H(),M,J)
},20)
}TS.model.archive_view_is_showing=true;
if(TS.client.archives.not_member){TS.client.channel_pane.rebuildStarredList();
if(I.is_group){TS.client.channel_pane.rebuildGroupList()
}else{if(I.is_channel){TS.client.channel_pane.rebuildChannelList();
TS.api.callImmediately("channels.info",{channel:I.id},function(O,Q,N){if(!TS.model.archive_view_is_showing){return
}if(!O){TS.warn("WTF, bad API rsp? error:"+Q.error);
return
}if(!Q.channel){TS.warn("WTF, no channel?");
return
}var P=TS.channels.upsertChannel(Q.channel);
if(P.id!=TS.client.archives.current_model_ob.id){return
}TS.channels.data_updated_sig.dispatch(P)
})
}}}TS.view.resizeManually("TS.client.archives started")
},maybeHandleArchiveLink:function(Q){if(!TS.model.prefs.temp_archive_viewer){return false
}if(!TS.client){return false
}if(!Q||!Q.length){return false
}if(!Q.is("a")){return false
}var J=Q.attr("href");
if(!J){return false
}J=TS.utility.normalizeUrlForComparison(J);
J=J.replace("https://","").replace("http://","");
var M=TS.client.archives_url.replace("https://","").replace("http://","");
if(J.indexOf(M)===0){J=J.replace(M,"archives")
}while(J.indexOf("/")===0){J=J.substr(1)
}if(J.indexOf("archives/")===0){var L=J.split("/");
if(L.length<2){return false
}var O=L[1];
if(!O){return false
}var K=TS.channels.getChannelByName(O)||TS.groups.getGroupByName(O)||TS.ims.getImById(O);
if(!K){return false
}if(L.length==2||!L[2]){if(K.is_channel){TS.channels.displayChannel(K.id)
}else{if(K.is_group){TS.groups.displayGroup(K.id)
}else{TS.ims.startImById(K.id)
}}return(K.id==TS.model.active_cid)
}var I=L[2];
if(!I){return false
}if(I.indexOf("p")!==0){return false
}if(I.length!=17){return false
}I=I.replace("p","");
if(isNaN(I)){return false
}var P=I.substr(0,10)+"."+I.substr(10);
if(K.id==TS.model.active_cid){if(Q.hasClass("timestamp")){if(Q.closest("#msgs_div").length!==0||Q.closest("#archives_msgs_div").length!==0){var N=TS.templates.makeMsgDomId(P);
if(Q.closest("#"+N).length!==0){return false
}}}}return TS.client.ui.tryToJump(K.id,P)
}return false
},onMsgsScroll:function(){if(!TS.model.archive_view_is_showing){return
}TS.utility.throttle.method(C,"ts_archives_on_msgs_scroll",250)
},maybeLoadScrollBackHistory:function(){if(TS.client.archives.active_highlight_count||TS.model.ui.is_mouse_down){return
}if(m!=r){return
}if(h){TS.info("_scrolled_to_bottom _all_loaded_bottom:"+c);
if(!c){b()
}}else{if(F){TS.info("_scrolled_to_top _all_loaded_top:"+y);
if(!y){u()
}}}},loadMoreBottom:function(){if(!TS.model.archive_view_is_showing){return
}if(!c){b()
}},loadMoreTop:function(){if(!TS.model.archive_view_is_showing){return
}if(!y){u()
}},padOutMsgsScroller:function(){var J=$("#archives_top_div");
J.css("margin-top","");
var I=J.outerHeight();
var K=TS.client.archives.$scroller[0].scrollHeight-(TS.client.archives.$archives_msgs_div.outerHeight()+$("#archives_top_div").outerHeight());
K-=13;
if(K>I){J.css("margin-top",(K-J.outerHeight())+"px")
}},tryToJoin:function(){if(!TS.model.archive_view_is_showing){return
}if(!TS.client.archives.current_model_ob){return
}if(!TS.client.archives.current_model_ob.is_channel){return
}if(TS.client.archives.current_model_ob.is_archived){return
}$("#footer_archives_action_button").trigger("click")
},cancel:function(I){if(!TS.model.archive_view_is_showing){return
}var J=TS.client.archives.not_member&&!I;
o(J)
}});
var d=null;
var k=null;
var h=false;
var F=false;
var r=0;
var m=0;
var c=null;
var y=null;
var G=false;
var e=false;
var q=false;
var w=function(J,O){var L=TS.client.archives.$archives_msgs_div;
L.empty();
var P=[];
var K;
var Q;
var N="";
for(var M=O.length-1;
M>-1;
M--){if(!K||!K.no_display){Q=K
}K=O[M];
var I=TS.utility.msgs.msgRollUpWorker(M,K,O,P);
if(I=="continue"){K=Q;
continue
}else{if(I=="swap"){K=P[0];
P.length=0
}}N+=TS.templates.builders.buildMsgHTML({msg:K,model_ob:J,prev_msg:Q,container_id:"archives_msgs_div",enable_slack_action_links:false})
}TS.utility.makeSureAllExternalLinksAreRefererSafe(L);
L.html(N).find(".message .edited").tooltip();
L.find(".message .timestamp").tooltip({delay:{show:450,hide:150},container:"body"});
var R=!c;
$("#archives_bottom_div").toggleClass("hidden",!R);
$("#archives_return").toggleClass("hidden",!R);
$("#archives_top_div").removeClass("hidden");
TS.client.archives.padOutMsgsScroller();
TS.client.archives.msgs_are_auto_scrolling=true;
C();
TS.client.archives.msgs_are_auto_scrolling=false;
TS.client.archives.$scroller.data("monkeyScroll").updateFunc();
A()
};
var u=function(K){e=true;
E();
var I=TS.client.archives.current_model_ob;
var J=I._archive_msgs[I._archive_msgs.length-1].ts;
r++;
TS.api.callImmediately(H(),{channel:I.id,latest:J,count:parseInt(TS.model.subsequent_msgs_cnt/2),_showing_id:q},function(M,N,L){if(!l(M,N,L)){return
}e=false;
E();
w(I,I._archive_msgs);
if(J){TS.client.ui.scrollMsgsSoMsgIsInView(J,true,false)
}if(K){K()
}})
};
var b=function(){G=true;
g();
var J=TS.client.archives.current_model_ob;
var I=J._archive_msgs[0].ts;
r++;
TS.api.callImmediately(H(),{channel:J.id,oldest:I,count:parseInt(TS.model.subsequent_msgs_cnt/2),_showing_id:q},function(L,M,K){if(!l(L,M,K)){return
}G=false;
g();
w(J,J._archive_msgs);
if(I){TS.client.ui.scrollMsgsSoMsgIsInView(I,false,false,0)
}})
};
var l=function(S,O,Q){if(!TS.model.archive_view_is_showing){return false
}if(Q._showing_id!=q){return false
}var J=TS.client.archives.current_model_ob;
var M=J._archive_msgs;
var V=[];
var T;
var U=false;
var L;
var N;
var P=(M&&M.length)?M[0]:"";
if(P&&!TS.client.msg_pane.getDivForArchiveMsg(P.ts).length){P=null
}if(O.messages){for(N=0;
N<O.messages.length;
N++){L=O.messages[N].ts;
if(!M||!TS.utility.msgs.getMsg(L,M)){T=O.messages[N];
V.push(TS.utility.msgs.processImsgFromHistory(T,J.id))
}if(!TS.client.archives.not_member&&!U&&TS.utility.msgs.getMsg(L,J.msgs)){U=true
}}}J._archive_msgs=M?V.concat(M):V;
if(U){V=[];
for(N=0;
N<J._archive_msgs.length;
N++){if(!TS.utility.msgs.getMsg(J._archive_msgs[N].ts,J.msgs)){T=J._archive_msgs[N];
V.push(T)
}}TS.utility.msgs.setMsgs(J,V.concat(J.msgs));
TS.client.msg_pane.rebuildMsgs();
var R;
var K;
if(P){K=TS.client.archives.$scroller.scrollTop()
}else{R=k
}var I=true;
o(false,I);
if(P){TS.client.ui.$msgs_scroller_div.scrollTop(K)
}else{if(R){TS.client.ui.scrollMsgsSoMsgIsInView(R,false,true)
}}return false
}TS.utility.msgs.sortMsgs(J._archive_msgs);
if(Q.latest){y=!O.has_more;
E()
}else{if(Q.oldest){c=!O.has_more;
g()
}else{y=Q.count!=O.messages.length;
E();
c=true;
g()
}}m++;
return true
};
var H=function(){if(TS.client.archives.current_model_ob.is_channel){return"channels.history"
}if(TS.client.archives.current_model_ob.is_group){return"groups.history"
}return"im.history"
};
var a=function(){$("#monkey_scroll_wrapper_for_msgs_scroller_div").addClass("hidden");
var I=TS.client.archives.current_model_ob;
var K=I.is_channel?"#":"";
$("#footer_archives_action_button").addClass("btn_outline");
if(TS.client.archives.not_member){$("#active_channel_name").addClass("no_star");
$("#footer_msgs").addClass("hidden");
$("#footer").css("height","auto");
$("#footer_archives").removeClass("hidden");
if(I.is_archived){var J=I.is_channel?"Channel":"Group";
$("#footer_archives_text").html("You are viewing <b>"+TS.utility.htmlEntities(TS.utility.ellipsize(K+I.name,25))+"</b>, an archived "+J.toLowerCase());
$("#footer_archives_action_button").text("Close "+J);
$("#footer_archives_action_tip").html('<span class="tiny dialog_cancel_hint"><strong aria-label="return">Esc </strong> to close</span>')
}else{$("#footer_archives_text").html("You are viewing a preview of <b>"+TS.utility.htmlEntities(TS.utility.ellipsize(K+I.name,25))+"</b>");
$("#footer_archives_action_button").text("Join Channel");
$("#footer_archives_action_button").removeClass("btn_outline");
$("#footer_archives_action_tip").html('<span class="tiny dialog_cancel_hint"><strong aria-label="return">Return <span class="return_char">&crarr;</span></strong> to join</span>')
}TS.client.ui.$msg_input.attr("placeholder","")
}else{TS.client.ui.$msg_input.attr("placeholder","You are viewing the archives of "+K+I.name)
}};
var x=function(){$("#monkey_scroll_wrapper_for_msgs_scroller_div").removeClass("hidden");
$("#active_channel_name").removeClass("no_star");
$("#footer_msgs").removeClass("hidden");
$("#footer").css("height","");
$("#footer_archives").addClass("hidden");
$("#archives_bottom_div").addClass("hidden");
$("#archives_top_div").addClass("hidden");
$("#archives_return").addClass("hidden").removeClass("warning");
TS.client.ui.$msg_input.attr("placeholder","");
TS.view.measureInput();
TS.client.ui.$file_button.css("height",(TS.view.last_input_height)+"px")
};
var g=function(){var I;
if(G){I="retrieving history..."
}else{if(c){if(k){I="&nbsp;"
}else{I=""
}}else{I='<a onclick="TS.client.archives.loadMoreBottom()">and more...</a>'
}}$("#archives_bottom_div").html(I)
};
var E=function(){var I;
if(e){I="retrieving history..."
}else{if(y){I="~FIN~"
}else{I='<a onclick="TS.client.archives.loadMoreTop()">and more...</a>'
}}$("#archives_top_div").html(I)
};
var o=function(J,K){if(!TS.model.archive_view_is_showing){return
}TS.client.archives.$archives_msgs_div.empty();
TS.client.archives.$scroller.data("monkeyScroll").updateFunc();
d.addClass("hidden");
var I=false;
if(TS.client.archives.current_model_ob){delete TS.client.archives.current_model_ob._archive_msgs;
if(TS.client.archives.not_member){I=true
}}k=null;
TS.client.archives.current_model_ob=null;
TS.model.archive_view_is_showing=false;
if(I){TS.client.channel_pane.rebuildStarredList();
TS.client.channel_pane.rebuildChannelList()
}x();
TS.view.resizeManually("TS.client.archives ended");
if(!K&&TS.model.prefs.start_scroll_at_oldest&&TS.shared.getActiveModelOb().unread_cnt){setTimeout(TS.client.ui.scrollMsgsSoFirstUnreadMsgIsInView,100)
}else{TS.client.msg_pane.checkUnreads()
}if(J){window.history.go(-1)
}};
var j=function(){TS.client.archives.$archives_msgs_div.bind("click.archives",TS.view.doLinkThings);
$("#footer_archives_action_button").bind("click",function(){var I=TS.client.archives.current_model_ob;
if(I.is_channel){if(I.is_archived){TS.channels.closeArchivedChannel(I.id)
}else{TS.channels.join(I.name)
}}else{TS.groups.closeGroup(I.id);
TS.client.activeChannelDisplayGoneAway()
}});
$("#footer_archives_unarchive_link").bind("click",function(){var I=TS.client.archives.current_model_ob;
if(I.is_channel){if(I.is_archived){TS.api.call("channels.unarchive",{channel:I.id},function(K,L,J){if(K){return
}var M='Un-archiving failed with error "'+L.error+'"';
if(L.error=="restricted_action"){M="<p>You don't have permission to un-archive channels.</p><p>Talk to your team owner.</p>"
}setTimeout(TS.generic_dialog.alert,100,M)
})
}}else{TS.api.call("groups.unarchive",{channel:I.id})
}});
TS.client.archives.$scroller.scroll(function(){TS.client.archives.onMsgsScroll()
});
$("#archives_return .cancel_archives").bind("click",function(){if(TS.client.archives.not_member){if(c){TS.client.ui.slowScrollMsgsToBottom()
}else{o();
TS.client.archives.start()
}}else{o()
}});
TS.client.ui.$msg_input.bind("textchange",function(J,K){if(!TS.model.archive_view_is_showing){return
}if(TS.client.archives.not_member){return
}var I=$(this);
if(I.val()===""){$("#archives_return").removeClass("warning")
}else{$("#archives_return").addClass("warning")
}})
};
var C=function(){if(!TS.model.archive_view_is_showing){return
}var J;
F=false;
h=false;
if(TS.client.ui.areMsgsScrolledToBottom(0)){J=-1;
h=true
}else{J=TS.client.archives.$scroller[0].scrollTop;
if(J===0){F=true
}}var I=TS.client.ui.areMsgsScrolledToBottom(50);
$("#archives_return").find(".cancel_archives").toggleClass("hidden",!!I&&c);
if(TS.client.archives.msgs_are_auto_scrolling){return
}TS.client.ui.checkInlineImgsAndIframes("archives");
TS.client.archives.maybeLoadScrollBackHistory()
};
var A=function(){var J=TS.client.archives.$scroller.find(".message");
var K=[];
if(J.length){K.push(TS.utility.date.toCalendarDate(J.eq(0).data("ts")));
if(J.length>1){var I=TS.utility.date.toCalendarDate(J.eq(J.length-1).data("ts"));
if(I!=K[0]){K.push(I)
}}$("#archives_return_date").text(K.join(" - "))
}else{}};
var p=function(I){if(!TS.model.archive_view_is_showing){return
}if(I.id!=TS.client.archives.current_model_ob.id){return
}TS.client.archives.not_member=false;
TS.client.archives.cancel();
TS.client.ui.instaScrollMsgsToBottom(false)
};
var z=function(I){if(!TS.model.archive_view_is_showing){return
}if(I.id!=TS.client.archives.current_model_ob.id){return
}TS.client.archives.not_member=false;
TS.client.archives.cancel();
TS.client.ui.instaScrollMsgsToBottom(false)
};
var v=function(I){if(!TS.model.archive_view_is_showing){return
}if(I.id!=TS.client.archives.current_model_ob.id){return
}};
var i=function(I){if(!TS.model.archive_view_is_showing){return
}if(I.id!=TS.client.archives.current_model_ob.id){return
}a()
};
var t=function(I){if(!TS.model.archive_view_is_showing){return
}if(I.id!=TS.client.archives.current_model_ob.id){return
}a()
};
var B=function(I,J){if(!TS.model.archive_view_is_showing){return
}if(TS.client.archives.not_member){return
}if(I.id!=TS.client.archives.current_model_ob.id){return
}TS.client.archives.cancel()
};
var f=function(I,J){if(!TS.model.archive_view_is_showing){return
}if(!J){return
}if(I.id!=TS.client.archives.current_model_ob.id){return
}};
var s=function(I,K){if(!TS.model.archive_view_is_showing){return
}if(!K){return
}if(I.id!=TS.client.archives.current_model_ob.id){return
}var J=TS.client.msg_pane.getDivForArchiveMsg(K.ts);
if(!J.length){return
}w(I,I._archive_msgs)
};
var D=function(I,K){if(!TS.model.archive_view_is_showing){return
}if(!K){return
}if(I.id!=TS.client.archives.current_model_ob.id){return
}var J=TS.client.msg_pane.getDivForArchiveMsg(K.ts);
if(!J.length){return
}w(I,I._archive_msgs)
}
})();