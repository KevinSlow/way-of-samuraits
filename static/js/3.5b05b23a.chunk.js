(this["webpackJsonpway-of-samuraits"]=this["webpackJsonpway-of-samuraits"]||[]).push([[3],{287:function(t,e,s){"use strict";s.d(e,"a",(function(){return o}));var n=s(95);function o(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var s=[],n=!0,o=!1,i=void 0;try{for(var c,r=t[Symbol.iterator]();!(n=(c=r.next()).done)&&(s.push(c.value),!e||s.length!==e);n=!0);}catch(a){o=!0,i=a}finally{try{n||null==r.return||r.return()}finally{if(o)throw i}}return s}}(t,e)||Object(n.a)(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},288:function(t,e,s){"use strict";e.a=s.p+"static/media/image.b6ed426e.jpg"},289:function(t,e,s){t.exports={descriptionBlock:"ProfileInfo_descriptionBlock__sodEd",mainPhoto:"ProfileInfo_mainPhoto__3dvhv",contact:"ProfileInfo_contact__3h1io"}},292:function(t,e,s){t.exports={item:"Post_item__366-i"}},293:function(t,e,s){t.exports={item:"MyPosts_item__3NYyy",postsBlock:"MyPosts_postsBlock__2xEpi",posts:"MyPosts_posts__SPSS6"}},298:function(t,e,s){"use strict";s.r(e);var n=s(3),o=s(52),i=s(53),c=s(55),r=s(54),a=s(1),u=s(0),l=s.n(u),j=s(43),d=s(287),b=s(289),f=s.n(b),h=s(96),p=function(t){var e=Object(u.useState)(!1),s=Object(d.a)(e,2),n=s[0],o=s[1],i=Object(u.useState)(t.status),c=Object(d.a)(i,2),r=c[0],l=c[1];Object(u.useEffect)((function(){l(t.status)}),[t.status]);return Object(a.jsxs)("div",{children:[!n&&Object(a.jsx)("div",{children:Object(a.jsx)("span",{onDoubleClick:function(){o(!0)},children:t.status||"No Status"})}),n&&Object(a.jsx)("div",{children:Object(a.jsx)("input",{onChange:function(t){l(t.currentTarget.value)},autoFocus:!0,onBlur:function(){o(!1),t.updateStatus(r)},value:r})})]})},O=s(288),v=s(45),x=s.n(v),m=s(26),g=s(127),P=Object(g.a)({form:"edit-profile"})((function(t){var e=t.profile,s=t.handleSubmit,n=t.error;return Object(a.jsxs)("form",{onSubmit:s,className:f.a.descriptionBlock,children:[Object(a.jsx)("div",{children:Object(a.jsx)("button",{children:"save"})}),n&&Object(a.jsx)("div",{className:x.a.formSummaryError,children:n}),Object(a.jsxs)("div",{children:[" Full Name ",Object(a.jsx)("div",{children:Object(m.a)("Full name","fullName",[],m.b)})]}),Object(a.jsxs)("div",{children:["Looking for a Job ",Object(m.a)("","lookingForAJob",[],m.b,{type:"checkbox"})]}),Object(a.jsxs)("div",{children:[Object(a.jsx)("b",{children:"My proffesional skills:"}),Object(m.a)("My proffesional skills","lookingForAJobDescription",[],m.c)]}),Object(a.jsx)("div",{children:"About Me: "}),Object(m.a)("About Me","aboutMe",[],m.c),Object(a.jsx)("div",{children:Object(a.jsxs)("div",{children:[Object(a.jsx)("b",{children:"Contacts:"})," : ",Object.keys(e.contacts).map((function(t){return Object(a.jsx)("div",{className:f.a.contact,children:Object(a.jsxs)("strong",{children:[t,": ",Object(m.a)(t,"contacts."+t,[],m.b)]})},t)}))]})})]})})),_=function(t){var e=t.profile,s=t.isOwner,n=t.goToEditMode;Object(j.a)(t,["profile","isOwner","goToEditMode"]);return Object(a.jsxs)("div",{className:f.a.descriptionBlock,children:[s&&Object(a.jsx)("div",{children:Object(a.jsx)("button",{onClick:n,children:"edit"})}),Object(a.jsxs)("div",{children:["Full Name",Object(a.jsx)("div",{children:e.fullName})]}),Object(a.jsxs)("div",{children:["About Me",Object(a.jsx)("div",{children:e.aboutMe})]}),Object(a.jsx)("div",{children:e.lookingForAJob&&Object(a.jsxs)("div",{children:["lookingForAJobDescription"," ",Object(a.jsx)("div",{children:e.lookingForAJobDescription})]})}),Object(a.jsxs)("div",{children:["Looking for a Job: ",Object(a.jsx)("div",{children:e.lookingForAJob?"Yes":"No"})]}),Object(a.jsx)("div",{children:Object(a.jsxs)("div",{children:[Object(a.jsx)("b",{children:"Contacts:"})," :"," ",Object.keys(e.contacts).map((function(t){return Object(a.jsx)(k,{contactTitle:t,contactValue:e.contacts[t]})}))]})})]})},k=function(t){var e=t.contactTitle,s=t.contactValue;return Object(a.jsxs)("div",{className:f.a.contact,children:[Object(a.jsx)("b",{children:e})," : ",s]})},y=function(t){var e=t.profile,s=t.savePhoto,n=t.isOwner,o=t.status,i=t.updateStatus,c=t.saveProfile,r=Object(u.useState)(!1),l=Object(d.a)(r,2),j=l[0],b=l[1];if(!e)return Object(a.jsx)(h.a,{});return Object(a.jsxs)("div",{children:[Object(a.jsx)("img",{className:f.a.mainPhoto,src:e.photos.large||O.a,alt:""}),n&&Object(a.jsx)("input",{type:"file",onChange:function(t){t.target.files&&t.target.files.length&&s(t.target.files[0])}}),Object(a.jsx)(p,{status:o,updateStatus:i}),j?Object(a.jsx)(P,{profile:e,initialValues:e,onSubmit:function(t){c(t).then((function(){b(!1)}))}}):Object(a.jsx)(_,{profile:e,isOwner:n,goToEditMode:function(){return b(!0)}})]})},S=s(56),w=s(22),N=s(292),A=s.n(N),M=function(t){return Object(a.jsxs)("div",{className:A.a.item,children:[Object(a.jsx)("img",{src:"https://scontent.fiev13-1.fna.fbcdn.net/v/t1.0-1/s320x320/79515135_10111007623880301_5111576226921709568_o.jpg?_nc_cat=1&ccb=2&_nc_sid=7206a8&_nc_ohc=0lzloRNQk5cAX_v-G_b&_nc_ht=scontent.fiev13-1.fna&tp=7&oh=04022734a046621ca05c6f9c6bb207f4&oe=5FF8DFAD",alt:""}),t.message,Object(a.jsxs)("div",{children:[Object(a.jsx)("span",{children:"Like"})," ",t.likesCount]})]})},F=s(293),I=s.n(F),T=s(88),C=s(67),J=Object(C.a)(10),B=Object(g.a)({form:"add-post"})((function(t){return Object(a.jsxs)("form",{onSubmit:t.handleSubmit,children:[Object(a.jsx)(T.a,{validate:[C.b,J],name:"newPostText",placeholder:"Post Message",component:m.c}),Object(a.jsx)("button",{children:"Add Post"})]})}));function D(t){return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)("div",{className:I.a.postsBlock,children:[Object(a.jsx)("h3",{children:"New Post"}),Object(a.jsx)(B,{onSubmit:t.onSubmit})]}),Object(a.jsx)("div",{children:t.elements})]})}var E=l.a.memo((function(t){var e,s=null===(e=t.post)||void 0===e?void 0:e.map((function(t){return Object(a.jsx)(M,{message:t.message,likesCount:t.likesCount},t.id)}));return Object(a.jsx)("div",{children:Object(a.jsx)(D,{onSubmit:function(e){t.addPosts(e.newPostText)},elements:s})})})),U=Object(w.b)((function(t){return{post:t.profilePage.posts,newPostText:t.profilePage.newPostText}}),(function(t){return{addPosts:function(e){t(Object(S.a)(e))}}}))(E),z=function(t){return Object(a.jsxs)("div",{children:[Object(a.jsx)(y,{saveProfile:t.saveProfile,savePhoto:t.savePhoto,isOwner:t.isOwner,profile:t.profile,status:t.status,updateStatus:t.updateStatus}),Object(a.jsx)(U,{})]})},L=s(11),V=s(10),Y=function(t){Object(c.a)(s,t);var e=Object(r.a)(s);function s(){return Object(o.a)(this,s),e.apply(this,arguments)}return Object(i.a)(s,[{key:"refreshProfile",value:function(){var t=+this.props.match.params.userId;t||(t=this.props.authorizedUserId)||this.props.history.push("/login"),this.props.setUserProfile(t),this.props.getStatus(t)}},{key:"componentDidMount",value:function(){this.refreshProfile()}},{key:"componentDidUpdate",value:function(t,e,s){this.props.match.params.userId!==t.match.params.userId&&this.refreshProfile()}},{key:"render",value:function(){return Object(a.jsx)(z,Object(n.a)(Object(n.a)({},this.props),{},{isOwner:!this.props.match.params.userId,profile:this.props.profile,status:this.props.status,updateStatus:this.props.updateStatus,savePhoto:this.props.savePhoto}))}}]),s}(l.a.Component);e.default=Object(V.compose)(Object(w.b)((function(t){return{profile:t.profilePage.profile,status:t.profilePage.status,authorizedUserId:t.auth.userId,isAuth:t.auth.isAuth}}),{setUserProfile:S.f,getStatus:S.c,updateStatus:S.g,savePhoto:S.d,saveProfile:S.e}),L.g)(Y)}}]);
//# sourceMappingURL=3.5b05b23a.chunk.js.map