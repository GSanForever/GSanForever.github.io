
function getStyle(obj, name){
    if(obj.currentStyle){
        return obj.currentStyle[name];
    }else{
        return document.defaultView.getComputedStyle(obj, null)[name];
    }
}

const DefualtTitleLabelText = "请点击左边的标签选择主题";

window.onload = function(){

    var o_titleVue = new Vue({
        el: "#Title",
        data:{
            title: "GSan的前端学习笔记",
            titleStyle: {
                "Title_MouseOut" : true,
                "Title_MouseOver" : false
            }
        },
        methods:{
            MouseOverTitle(){
                this.titleStyle.Title_MouseOver = true;
                this.titleStyle.Title_MouseOut = false;
            },
            
            MouseOutTitle(){
                this.titleStyle.Title_MouseOver = false;
                this.titleStyle.Title_MouseOut = true;
            }
        }
    });

    var o_legTagZoneVue = new Vue({
        el:"#LeftTagZone",
        data:{
            TagTexts:[
                "学习HTML",
                "学习JavaScript",
                "学习Node.js",
                "学习Vue",
            ],
            LeftTag:[
                {
                    HasBeenClicked: false,
                    LeftTagZone_Tag_Mouse_Out: true,
                    LeftTagZone_Tag_Mouse_Over: false,
                    LeftTagZone_Tag_Mouse_Clicked: false,
                    LeftTagZone_Tag_Mouse_Out_Clicked: false,
                    LeftTagZone_Tag_Mouse_Over_Clicked: false,
                },
                {
                    HasBeenClicked: false,
                    LeftTagZone_Tag_Mouse_Out: true,
                    LeftTagZone_Tag_Mouse_Over: false,
                    LeftTagZone_Tag_Mouse_Clicked: false,
                    LeftTagZone_Tag_Mouse_Out_Clicked: false,
                    LeftTagZone_Tag_Mouse_Over_Clicked: false,
                },
                {
                    HasBeenClicked: false,
                    LeftTagZone_Tag_Mouse_Out: true,
                    LeftTagZone_Tag_Mouse_Over: false,
                    LeftTagZone_Tag_Mouse_Clicked: false,
                    LeftTagZone_Tag_Mouse_Out_Clicked: false,
                    LeftTagZone_Tag_Mouse_Over_Clicked: false,
                },
                {
                    HasBeenClicked: false,
                    LeftTagZone_Tag_Mouse_Out: true,
                    LeftTagZone_Tag_Mouse_Over: false,
                    LeftTagZone_Tag_Mouse_Clicked: false,
                    LeftTagZone_Tag_Mouse_Out_Clicked: false,
                    LeftTagZone_Tag_Mouse_Over_Clicked: false,
                },
            ],

            ReturnButtonText: "返回上一级",
        },
        methods:{
            MouseOverTag(tagId){

                var o_thisTag = this.LeftTag[tagId];

                if(o_thisTag.HasBeenClicked){
                    o_thisTag.LeftTagZone_Tag_Mouse_Over_Clicked = true;
                    o_thisTag.LeftTagZone_Tag_Mouse_Out_Clicked = false;
                }else{
                    o_thisTag.LeftTagZone_Tag_Mouse_Over = true;
                    o_thisTag.LeftTagZone_Tag_Mouse_Out = false;
                }
            },
            
            MouseOutTag(tagId){

                var o_thisTag = this.LeftTag[tagId];

                if(o_thisTag.HasBeenClicked){
                    o_thisTag.LeftTagZone_Tag_Mouse_Over_Clicked = false;
                    o_thisTag.LeftTagZone_Tag_Mouse_Out_Clicked = true;
                }else{
                    o_thisTag.LeftTagZone_Tag_Mouse_Over = false;
                    o_thisTag.LeftTagZone_Tag_Mouse_Out = true;
                }
            },

            ResetDefaultStyle(o_tag){
                o_tag.LeftTagZone_Tag_Mouse_Out = true;
                o_tag.LeftTagZone_Tag_Mouse_Over = false;
                o_tag.LeftTagZone_Tag_Mouse_Clicked = false;
                o_tag.LeftTagZone_Tag_Mouse_Out_Clicked = false;
                o_tag.LeftTagZone_Tag_Mouse_Over_Clicked = false;
            },

            ClickedTag(tagId){
                this.LeftTag.forEach(o_tag => {
                    o_tag.HasBeenClicked = false;
                    this.ResetDefaultStyle(o_tag);
                });
                var o_thisTag = this.LeftTag[tagId];
                o_thisTag.HasBeenClicked = true;
                o_thisTag.LeftTagZone_Tag_Mouse_Out = false;
                o_thisTag.LeftTagZone_Tag_Mouse_Clicked = true;

                o_contentAreaVue.TitleLabelText = this.TagTexts[tagId];

                o_contentAreaVue.IfShowContentArea = true;
            },

            Return(){
                this.LeftTag.forEach(o_tag => {
                    o_tag.HasBeenClicked = false;
                    this.ResetDefaultStyle(o_tag);
                });
                o_contentAreaVue.TitleLabelText = DefualtTitleLabelText;
                o_contentAreaVue.IfShowContentArea = false;
            }
        }
    });

    var o_contentAreaVue = new Vue({
        el:"#ContentArea",
        data:{
            
            ContentAreaDivStyle:{
                ContentAreaDIV: true
            },

            TitleLabelStyle:{
                ContentArea_TitleLabel: true
            },

            TitleLabelText: DefualtTitleLabelText,

            ContentAreaStyle:{
                ContentArea : true
            },
            
            Content: "Test Content",

            IfShowContentArea: false
        }
    });

    // var o_testHtml = new Vue({
    //     el:"#textv-html",
    //     data:{
    //         testHtml:
    //         "<input type='button' value='hihihihihihihi'>"
    //     }
    // });
}