
const DefualtTitleLabelText = "请点击左边的标签选择主题";

var windowLeftHeight = window.screen.height;;

console.log("windowLeftHeight is " + windowLeftHeight);

// 标题区域
var o_titleVue = new Vue({
    el: "#TitleZone",
    data:{
        titleZoneMinHeight : 10,
        title: "GSan的电子之海",
        titleStyle: {
            "Title_MouseOut" : true,
            "Title_MouseOver" : false
        },

        ifMouseOverTag: false,
        affectRate: 0.1,
        defaultPosition: {x:0, y:0}
    },
    mounted(){

        //计算初始位置的left
        var halfTitleBoxWidth = this.$refs.titleBox.offsetWidth / 2;
        var halfContentWidth = this.$refs.titleContent.offsetWidth / 2;
        var contentPosX = this.$refs.titleContent.offsetLeft + halfTitleBoxWidth - halfContentWidth;
        console.log("contentPosX is "+contentPosX);
        
        //计算初始位置的Top
        var halfTitleBoxHeight = this.$refs.titleBox.offsetHeight / 2;
        var halfContentHeight = this.$refs.titleContent.offsetHeight / 2;
        var contentPosY = this.$refs.titleContent.offsetTop + halfTitleBoxHeight - halfContentHeight;
        console.log("contentPosY is "+contentPosY);

        //设置新的位置
        this.$refs.titleContent.style.left = contentPosX + "px";
        this.$refs.titleContent.style.top = contentPosY + "px";

        //储存默认位置
        this.defaultPosition.x = contentPosX;
        this.defaultPosition.y = contentPosY;

        //窗口剩余高度
        windowLeftHeight -= parseFloat(this.$refs.titleZone.offsetHeight);

        
    },
    methods:{
        MouseOverTitle(e){
            this.titleStyle.Title_MouseOver = true;
            this.titleStyle.Title_MouseOut = false;
            this.ifMouseOverTag = true;

        },
        MouseMoveTitle(e){
            if(this.ifMouseOverTag){
                //实现
                var vectorX = (e.clientX + 6 - this.defaultPosition.x) * this.affectRate;
                var vectorY = (e.clientY + 6 - this.defaultPosition.y) * this.affectRate;

                var newX = this.defaultPosition.x + vectorX;
                var newY = this.defaultPosition.y + vectorY;

                this.$refs.titleContent.style.left = parseInt(newX) + "px";
                this.$refs.titleContent.style.top = parseInt(newY) + "px";
            }
        },
        MouseOutTitle(e){
            if(this.ifMouseOverTag){
                this.titleStyle.Title_MouseOver = false;
                this.titleStyle.Title_MouseOut = true;
                this.$nextTick( () => { //恢复默认位置
                    this.$refs.titleContent.style.left = this.defaultPosition.x + "px";
                    this.$refs.titleContent.style.top = this.defaultPosition.y + "px";
                });
                this.ifMouseOverTag = false;
            }
        }
    }
});

// 内容区域
var o_contentZoneVue = new Vue({
    el:"#ContentZone",
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

        IfShowContentArea: false,

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

            this.TitleLabelText = this.TagTexts[tagId];

            this.IfShowContentArea = true;
        },

        Return(){
            this.LeftTag.forEach(o_tag => {
                o_tag.HasBeenClicked = false;
                this.ResetDefaultStyle(o_tag);
            });
            this.TitleLabelText = DefualtTitleLabelText;
            this.IfShowContentArea = false;
        }
    }
});

var o_BottomZone = new Vue({
    el:"#BottomZone",
    data:{
        bottomHeight : 30,
        authorInfo:"Author is GSan QQ: 490854014",
    },
    mounted(){
        // 做整体界面适配行为
        windowLeftHeight -= parseFloat(this.$refs.bottomZone.offsetHeight);
        console.log("windowLeftHeight2 is "+ windowLeftHeight);
        o_contentZoneVue.$refs.contentZone.style["min-height"] = windowLeftHeight + "px";
    }
});
