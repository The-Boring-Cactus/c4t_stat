(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[1],{"713b":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-layout",{attrs:{view:"hHh lpR fFf"}},[n("q-header",{attrs:{elevated:""}},[n("q-toolbar",{staticClass:"q-electron-drag"},[n("q-toolbar-title",[t._v("\n        F-Stat "),n("q-badge",{attrs:{align:"top"}},[t._v("v1.0.0")])],1),n("q-space")],1),n("q-toolbar",{staticClass:"bg-white",attrs:{stretch:""}},[n("q-btn",{staticClass:"text-black",attrs:{flat:"",dense:"",round:"",icon:t.myicon,"aria-label":"Menu"},on:{click:t.sideMenu}}),n("vue-file-toolbar-menu",{attrs:{content:t.menu}})],1)],1),n("q-drawer",{attrs:{"show-if-above":"",bordered:"","content-class":"bg-grey-1"},model:{value:t.leftDrawerOpen,callback:function(e){t.leftDrawerOpen=e},expression:"leftDrawerOpen"}},[n("q-list",[n("q-item-label",{staticClass:"text-grey-8",attrs:{header:""}},[t._v("\n        Data Sets\n      ")]),t._l(t.datanav,(function(e){return n("DataHouse",t._b({key:e.id},"DataHouse",e,!1))}))],2)],1),n("q-page-container",[n("router-view",{on:{newDataset:t.newDataset}})],1)],1)},a=[],i=(n("ddb0"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-item",{attrs:{clickable:"",tag:"a",exact:""},on:{click:function(e){return t.navigate(t.link)}}},[t.icon?n("q-item-section",{attrs:{avatar:""}},[n("q-icon",{attrs:{name:t.icon}})],1):t._e(),n("q-item-section",[n("q-item-label",[t._v(t._s(t.title))]),n("q-item-label",{attrs:{caption:""}},[t._v("\n      "+t._s(t.caption)+"\n    ")])],1)],1)}),l=[],c={name:"DataHouse",props:{title:{type:String,required:!0},caption:{type:String,default:""},link:{type:String,default:"/"},icon:{type:String,default:""}},methods:{navigate(t){this.$router.push("/").catch((t=>{console.log(t)})),this.$nextTick((()=>{this.$router.push(t).catch((t=>{console.log(t)}))}))}}},r=c,s=n("2877"),u=Object(s["a"])(r,i,l,!1,null,null,null),m=u.exports,d=n("2340"),p=n("758b"),h=null;const b=[{text:"Data",menu:[{text:"New",click:()=>{console.log("new"),h.$router.push("/").catch((t=>{console.log(t)})),h.$nextTick((()=>{h.$router.push("/data").catch((t=>{console.log(t)}))}))}},{is:"separator"},{text:"Delete",click:()=>alert("Youre amazing, "+(prompt("Whats your name?")||"friend")+"!")}]},{text:"Edit",menu:[{text:"Cut",click:()=>document.execCommand("cut")},{text:"Copy",click:()=>document.execCommand("copy")},{text:"Paste",click(){navigator.clipboard.readText().then((t=>{document.execCommand("insertText",!1,t)}))}}]},{text:"Formats",menu:[{text:"Basic"},{text:"Disabled",disabled:!0},{text:"Sub-menus",custom_chevron:"►",menu:[{text:"Hello!"},{text:"Im a sub-menu",custom_chevron:"►",menu:[{text:"And Im another sub-menu!"}],menu_width:240}],menu_width:200},{text:"Hotkey",hotkey:"ctrl+e",click(){alert("Hotkey menu triggered either via clicking or shortcut.")}},{text:"Material icon",icon:"shopping_cart",click:()=>window.open("https://material.io/resources/icons","_blank")},{text:"Platform emoji",emoji:"call_me_hand",click:()=>window.open("https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json","_blank")},{text:"Menu text is wrapped when it is too long"}],menu_width:220},{text:"Help",menu:[{text:"About",icon:"help",click:()=>alert("vue-file-toolbar-menu\nhttps://github.com/motla/vue-file-toolbar-menu\nby @motla\nMIT License")},{is:"separator"},{text:"Repository",icon:"exit_to_app",click:()=>window.open("https://github.com/motla/vue-file-toolbar-menu")},{text:"API",icon:"exit_to_app",click:()=>window.open("https://github.com/motla/vue-file-toolbar-menu/blob/master/API.md")},{text:"Report Issue",icon:"exit_to_app",click:()=>window.open("https://github.com/motla/vue-file-toolbar-menu/issues")},{text:"Release Notes",icon:"exit_to_app",click:()=>window.open("https://github.com/motla/vue-file-toolbar-menu/blob/master/CHANGELOG.md")}],menu_width:220}];var f={name:"MainLayout",components:{DataHouse:m,VueFileToolbarMenu:d["a"]},data(){return{leftDrawerOpen:!1,myicon:"chevron_left",datainfo:[]}},methods:{sideMenu:function(){this.leftDrawerOpen=!this.leftDrawerOpen,this.myicon=this.leftDrawerOpen?"chevron_left":"chevron_right"},newDataset:function(t,e){console.log("Arg1: "+t),console.log("Arg2: "+e),this.datainfo.push({title:t,caption:"Data set",id:e,icon:"mdi-file-tree",link:"/data?id="+e+"&title="+t})},testElectron:function(){console.log("Open Bokeh"),this.$router.push("/bokeh")}},mounted:function(){h=this,setTimeout((function(){p["a"].get("getMenu").then((t=>{for(var e of(console.log(t),t.data.menu))h.datainfo.push({title:e.title,caption:"Data set",id:e.id,icon:"mdi-file-tree",link:"/data?id="+e.id+"&title="+e.title});h.$q.loading.hide()}))}),500)},created:function(){this.$q.loading.show()},computed:{menu(){return h=this,b},datanav(){return this.datainfo}}},g=f,w=(n("a9b6"),Object(s["a"])(g,o,a,!1,null,"69d0492e",null));e["default"]=w.exports},a9b6:function(t,e,n){"use strict";n("cf7f")},cf7f:function(t,e,n){}}]);