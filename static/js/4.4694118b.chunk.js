(this["webpackJsonpway-of-samuraits"]=this["webpackJsonpway-of-samuraits"]||[]).push([[4],{286:function(e,n,t){"use strict";t.d(n,"a",(function(){return o}));var r=t(95);function o(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var t=[],r=!0,o=!1,s=void 0;try{for(var i,u=e[Symbol.iterator]();!(r=(i=u.next()).done)&&(t.push(i.value),!n||t.length!==n);r=!0);}catch(a){o=!0,s=a}finally{try{r||null==u.return||u.return()}finally{if(o)throw s}}return t}}(e,n)||Object(r.a)(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},287:function(e,n,t){"use strict";n.a=t.p+"static/media/image.b6ed426e.jpg"},293:function(e,n,t){e.exports={usersPhoto:"Pagination_usersPhoto__2L05b",selectedPage:"Pagination_selectedPage__1j0qx",paginator:"Pagination_paginator__2pQMb",pageNumber:"Pagination_pageNumber__vAcn6"}},294:function(e,n,t){e.exports={usersPhoto:"users_usersPhoto__r91E4",selectedPage:"users_selectedPage__cXqw1"}},297:function(e,n,t){"use strict";t.r(n);var r=t(52),o=t(53),s=t(55),i=t(54),u=t(1),a=t(0),c=t.n(a),l=t(22),f=t(128),g=t(43),p=t(286),d=t(293),h=t.n(d),j=function(e){for(var n=e.totalUserCount,t=e.pageSize,r=e.portionSize,o=void 0===r?10:r,s=e.currentPage,i=e.onPageChanged,c=Math.ceil(n/t),l=[],f=1;f<=c;f++)l.push(f);var g=Math.ceil(c/o),d=Object(a.useState)(1),j=Object(p.a)(d,2),b=j[0],P=j[1],v=(b-1)*o+1,w=b*o;return Object(u.jsxs)("div",{children:[b>1&&Object(u.jsx)("button",{onClick:function(){P(b-1)},children:"Prev"}),l.filter((function(e){return e>=v&&e<=w})).map((function(e){return Object(u.jsxs)("span",{className:s===e&&h.a.selectedPage,onClick:function(){i(e)},children:[" ",e]})})),g>b&&Object(u.jsx)("button",{onClick:function(){P(b+1)},children:"Next"})]})},b=t(294),P=t.n(b),v=t(287),w=t(18),O=function(e){var n=e.user,t=e.followingInProgress,r=Object(g.a)(e,["user","followingInProgress"]);return Object(u.jsxs)("div",{children:[Object(u.jsxs)("span",{children:[Object(u.jsx)("div",{children:Object(u.jsx)(w.b,{to:"/profile/"+n.id,children:Object(u.jsx)("img",{src:null!==n.photos.small?n.photos.small:v.a,alt:"#",className:P.a.usersPhoto})})}),Object(u.jsx)("div",{children:n.followed?Object(u.jsx)("button",{disabled:t.some((function(e){return e===n.id})),onClick:function(){r.unfollow(n.id)},children:"Unfollow"}):Object(u.jsx)("button",{disabled:t.some((function(e){return e===n.id})),onClick:function(){r.follow(n.id)},children:"Follow"})})]}),Object(u.jsxs)("span",{children:[Object(u.jsx)("div",{children:n.name}),Object(u.jsx)("div",{children:n.status})]}),Object(u.jsx)("span",{})]},n.id)},y=function(e){var n=e.followingInProgress,t=e.users,r=e.currentPage,o=e.pageSize,s=e.totalUserCount,i=e.onPageChanged,a=Object(g.a)(e,["followingInProgress","users","currentPage","pageSize","totalUserCount","onPageChanged"]);return Object(u.jsxs)("div",{children:[Object(u.jsx)(j,{totalUserCount:s,pageSize:o,currentPage:r,onPageChanged:i}),Object(u.jsx)("div",{children:t.map((function(e){return Object(u.jsx)(O,{user:e,follow:a.follow,unfollow:a.unfollow,followingInProgress:n},e.id)}))})]})},m=t(96),x=t(10);function C(e,n){return e===n}function _(e,n,t){if(null===n||null===t||n.length!==t.length)return!1;for(var r=n.length,o=0;o<r;o++)if(!e(n[o],t[o]))return!1;return!0}function S(e){var n=Array.isArray(e[0])?e[0]:e;if(!n.every((function(e){return"function"===typeof e}))){var t=n.map((function(e){return typeof e})).join(", ");throw new Error("Selector creators expect all input-selectors to be functions, instead received the following types: ["+t+"]")}return n}var U=function(e){for(var n=arguments.length,t=Array(n>1?n-1:0),r=1;r<n;r++)t[r-1]=arguments[r];return function(){for(var n=arguments.length,r=Array(n),o=0;o<n;o++)r[o]=arguments[o];var s=0,i=r.pop(),u=S(r),a=e.apply(void 0,[function(){return s++,i.apply(null,arguments)}].concat(t)),c=e((function(){for(var e=[],n=u.length,t=0;t<n;t++)e.push(u[t].apply(null,arguments));return a.apply(null,e)}));return c.resultFunc=i,c.dependencies=u,c.recomputations=function(){return s},c.resetRecomputations=function(){return s=0},c}}((function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:C,t=null,r=null;return function(){return _(n,t,arguments)||(r=e.apply(null,arguments)),t=arguments,r}}));var z=U((function(e){return e.usersPage.users}),(function(e){return e.filter((function(e){return e}))})),I=function(e){return e.usersPage.pageSize},k=function(e){return e.usersPage.totalUserCount},A=function(e){return e.usersPage.currentPage},F=function(e){return e.usersPage.isFetching},N=function(e){return e.usersPage.followingInProgress},M=function(e){Object(s.a)(t,e);var n=Object(i.a)(t);function t(){var e;Object(r.a)(this,t);for(var o=arguments.length,s=new Array(o),i=0;i<o;i++)s[i]=arguments[i];return(e=n.call.apply(n,[this].concat(s))).onPageChanged=function(n){var t=e.props.pageSize;e.props.getUsers(n,t)},e}return Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this.props,n=e.currentPage,t=e.pageSize;this.props.getUsers(n,t)}},{key:"render",value:function(){return Object(u.jsx)(u.Fragment,{children:this.props.isFetching?Object(u.jsx)(m.a,{}):Object(u.jsx)(y,{totalUserCount:this.props.totalUserCount,pageSize:this.props.pageSize,currentPage:this.props.currentPage,onPageChanged:this.onPageChanged,users:this.props.users,follow:this.props.follow,unfollow:this.props.unfollow,followingInProgress:this.props.followingInProgress})})}}]),t}(c.a.Component);n.default=Object(x.compose)(Object(l.b)((function(e){return{users:z(e),pageSize:I(e),totalUserCount:k(e),currentPage:A(e),isFetching:F(e),followingInProgress:N(e)}}),{follow:f.b,unfollow:f.f,setCurrentPage:f.d,setFollowingProgress:f.e,getUsers:f.c}))(M)}}]);
//# sourceMappingURL=4.4694118b.chunk.js.map