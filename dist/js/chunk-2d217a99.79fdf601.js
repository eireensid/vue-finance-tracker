(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d217a99"],{c84b:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.loading?r("Loader"):e.record?r("div",[r("div",{staticClass:"breadcrumb-wrap"},[r("router-link",{staticClass:"breadcrumb",attrs:{to:"/history"}},[e._v(e._s(e.localize("Menu_History")))]),r("a",{staticClass:"breadcrumb",on:{click:function(e){e.preventDefault()}}},[e._v(" "+e._s("income"===e.record.type?e.localize("Income"):e.localize("Expense"))+" ")])],1),r("div",{staticClass:"row"},[r("div",{staticClass:"col s12 m6"},[r("div",{staticClass:"card",class:{red:"expense"===e.record.type,green:"income"===e.record.type}},[r("div",{staticClass:"card-content white-text"},[r("p",[e._v(e._s(e.localize("Description"))+": "+e._s(e.record.description))]),r("p",[e._v(e._s(e.localize("Amount"))+": "+e._s(e.getCurrencySign("RUB",e.record.amount)))]),r("p",[e._v(e._s(e.localize("Category"))+": "+e._s(e.record.categoryName))]),r("small",[e._v(e._s(e.filterDate(e.record.date,"datetime")))])])])])])]):r("p",{staticClass:"center"},[e._v(e._s(e.localize("NoDetailText1"))+" id="+e._s(e.$route.params.id)+" "+e._s(e.localize("NoDetailText2")))])],1)},c=[],s=r("5530"),i=r("1da1"),n=(r("96cf"),r("34d1")),o={name:"Record",metaInfo:function(){return{title:this.$title("Detail_Title")}},data:function(){return{record:null,loading:!0}},mixins:[n["a"]],created:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,a,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=e.$route.params.id,t.next=3,e.$store.dispatch("fetchRecordById",r);case 3:return a=t.sent,t.next=6,e.$store.dispatch("fetchCategoryById",a.categoryId);case 6:c=t.sent,e.record=Object(s["a"])(Object(s["a"])({},a),{},{categoryName:c.title}),e.loading=!1;case 9:case"end":return t.stop()}}),t)})))()}},l=o,d=r("2877"),u=Object(d["a"])(l,a,c,!1,null,null,null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d217a99.79fdf601.js.map