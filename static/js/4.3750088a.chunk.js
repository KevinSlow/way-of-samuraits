(this["webpackJsonpway-of-samuraits"]=this["webpackJsonpway-of-samuraits"]||[]).push([[4],{2064:function(e,s,a){e.exports={dialogs:"Dialogs_dialogs__27VaQ",dialogItems:"Dialogs_dialogItems__23YAO",active:"Dialogs_active__2O4zc",messages:"Dialogs_messages__1PXZx",message:"Dialogs_message__2JiuE","text-center":"Dialogs_text-center__4tHpv",cf:"Dialogs_cf__385Gf",chatBlocks:"Dialogs_chatBlocks__1OCJm",chatFirst:"Dialogs_chatFirst__X2KTn",chatSecond:"Dialogs_chatSecond__2yBbA",send:"Dialogs_send__1EKbq",chatThread:"Dialogs_chatThread__3WDg_","show-chat-odd":"Dialogs_show-chat-odd__2kFfZ","show-chat-even":"Dialogs_show-chat-even__25RAR","chat-window":"Dialogs_chat-window__3kfEQ","chat-window-message":"Dialogs_chat-window-message__3fxCv",credits:"Dialogs_credits__sKj8j"}},2065:function(e,s,a){e.exports={dialog:"DialogItems_dialog__lwgqQ"}},2072:function(e,s,a){"use strict";a.r(s);var t=a(10),c=a(4),i=(a(0),a(2064)),o=a.n(i),n=a(2065),d=a.n(n),l=a(46),r=function(e){var s="/dialogs/"+e.id;return Object(c.jsx)("div",{className:d.a.dialog,children:Object(c.jsxs)(l.c,{to:s,children:[" ",e.name," "]})})},_=function(e){return Object(c.jsx)("li",{children:e.message})},g=a(244),h=a(64),j=a(123),u=a(245),b=Object(j.a)(100),m=Object(g.a)({form:"dialogAddMessageForm"})((function(e){return Object(c.jsx)("div",{className:"write",children:Object(c.jsxs)("form",{onSubmit:e.handleSubmit,children:[Object(h.b)("Enter your message","newMessageBody",[j.b,b],h.d,{type:"text"}),Object(c.jsx)(u.a,{htmlType:"submit",children:"Button"})]})})})),O=function(e){var s=e.dialogsPage,a=s.dialogs.map((function(e){return Object(c.jsx)(r,{name:e.name,id:e.id},e.id)})),t=s.messages.map((function(e){return Object(c.jsx)(_,{message:e.message},e.id)}));return Object(c.jsx)("div",{children:Object(c.jsxs)("div",{className:o.a.chatBlocks,children:[Object(c.jsx)("div",{className:o.a.chatFirst,children:a}),Object(c.jsxs)("div",{className:o.a.chatSecond,children:[Object(c.jsx)("ul",{className:o.a.chatThread,children:t}),Object(c.jsx)(m,{onSubmit:function(s){console.log(s),e.addDialogAction(s.newMessageBody)}})]})]})})},f=a(22),x=a(99),w=a(26),D=function(e){return{isAuth:e.auth.isAuth}};var v=a(23),p=a(207);console.log(p.a);s.default=Object(v.d)(Object(f.b)((function(e){return{dialogsPage:e.dialogsPage}}),Object(t.a)({},p.a)),(function(e){return Object(f.b)(D)((function(s){s.isAuth;var a=Object(x.a)(s,["isAuth"]);return s.isAuth?Object(c.jsx)(e,Object(t.a)({},a)):Object(c.jsx)(w.a,{to:"/login"})}))}))(O)}}]);
//# sourceMappingURL=4.3750088a.chunk.js.map