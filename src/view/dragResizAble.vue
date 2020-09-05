<template>
  <div class="drag">
    <!-- 侧面操作列表 -->
    <aside class="left-box">
      <ul>
        <li v-for="item in boxBlockItem" v-drag-item="{
          activeItem: item,
          moveEle: eleMoving,
          targetProp: designAreaProp,
          enterBox: enterBox,
          liveBox: liveBox,
          dragSuccess: dragSuccess
        }" :key="item.id">{{ item.name }}</li>
      </ul>
    </aside>

    <!-- 右侧绘制区域 -->
    <div class="right-box">
      <div class="drag-area" :class="{'high-ligh': isHighLigh}" ref="DragArea">
        <template v-for="(item) in addItem">
          <template v-if="item.type == 'shelf'">
            <vdr
              class="widget-item"
              :widget-key="item.key"
              :key="item.key"
              :w="item.width"
              :h="item.height"
              :x="item.left"
              :y="item.top"
              :parent="true"
              :snap="true"
              :style="item.style"
              @dragstop="onDragStop"
              @resizestop="onResizeStop"
              @refLineParams="getRefLineParams"
            >{{item.html}}<a href="javascript:;" class="remove-widget" @click="removeWidget(item)">移除</a></vdr>
          </template>
          
          <template v-if="item.type == 'road'">
            <vdr
              class="widget-item"
              :widget-key="item.key"
              :key="item.key"
              :w="item.width"
              :h="item.height"
              :x="item.left"
              :y="item.top"
              :parent="true"
              :snap="true"
              :style="item.style"
              @dragstop="onDragStop"
              @resizestop="onResizeStop"
              @refLineParams="getRefLineParams"
            >{{item.html}}<a href="javascript:;" class="remove-widget" @click="removeWidget(item)">移除</a></vdr>
          </template>

          <template v-if="item.type == 'exit'">
            <vdr
              class="widget-item"
              :widget-key="item.key"
              :key="item.key"
              :w="item.width"
              :h="item.height"
              :x="item.left"
              :y="item.top"
              :parent="true"
              :snap="true"
              :style="item.style"
              @dragstop="onDragStop"
              @resizestop="onResizeStop"
              @refLineParams="getRefLineParams"
            >{{item.html}}<a href="javascript:;" class="remove-widget" @click="removeWidget(item)">移除</a></vdr>
          </template>

          <template v-if="item.type == 'storage'">
            <vdr
              class="widget-item"
              :widget-key="item.key"
              :key="item.key"
              :w="item.width"
              :h="item.height"
              :x="item.left"
              :y="item.top"
              :parent="true"
              :snap="true"
              :style="item.style"
              @dragstop="onDragStop"
              @resizestop="onResizeStop"
              @refLineParams="getRefLineParams"
            >{{item.html}}<a href="javascript:;" class="remove-widget" @click="removeWidget(item)">移除</a></vdr>
          </template>

          <template v-if="item.type == 'warehouse'">
            <vdr
              class="widget-item"
              :widget-key="item.key"
              :key="item.key"
              :w="item.width"
              :h="item.height"
              :x="item.left"
              :y="item.top"
              :parent="true"
              :snap="true"
              :style="item.style"
              @dragstop="onDragStop"
              @resizestop="onResizeStop"
              @refLineParams="getRefLineParams"
            >{{item.html}}<a href="javascript:;" class="remove-widget" @click="removeWidget(item)">移除</a></vdr>
          </template>
          
        </template>
      </div>

      <!--辅助线-->
      <span
        class="ref-line v-line"
        v-for="(item, i) in vLine"
        v-show="item.display"
        :key="i"
        :style="{ left: item.position, top: item.origin, height: item.lineLength}"
      />
      <span
        class="ref-line h-line"
        v-for="(item, i) in hLine"
        v-show="item.display"
        :key="i+'_'+(+new Date())"
        :style="{ top: item.position, left: item.origin, width: item.lineLength}"
       />
      <!--辅助线END-->
    </div>

    <!-- 拖动示意模块 -->
    <div class="move-ele" ref="MoveEle" v-show="eleMoving.visible" :style="eleMoving.style" v-html="eleMoving.ele"></div>
  </div>
</template>

<script>
  /*
    参考资源：
    https://blog.csdn.net/weixin_33957648/article/details/91423751
    https://github.com/kirillmurashov/vue-drag-resize#install-and-basic-usage
    https://github.com/gorkys/vue-draggable-resizable-gorkys
  */
  import vdr from 'vue-draggable-resizable-gorkys'
  import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'

  export default {
    components: {
      vdr
    },
    data: function () {
      return {
        boxBlockItem: [
          {
            name: "堆栈",
            id: 101,
            type: 'shelf',
            width: 150,
            height: 250,
            left: 0,
            top: 0,
            style: {
              backgroundColor: '#62ea3c'
            },
            html: '== 堆栈 =='
          },
          {
            name: "通道",
            id: 102,
            type: 'road',
            width: 60,
            height: 250,
            left: 0,
            top: 0,
            style: {
              backgroundColor: '#999'
            },
            html: '== 通道 =='
          },
          {
            name: "出入口",
            id: 103,
            type: 'exit',
            width: 80,
            height: 80,
            left: 0,
            top: 0,
            style: {
              backgroundColor: '#a43cea'
            },
            html: '== 出入口 =='
          },
          {
            name: "存储区",
            id: 104,
            type: 'storage',
            width: 150,
            height: 250,
            left: 0,
            top: 0,
            style: {
              backgroundColor: '#ea3c3c'
            },
            html: '== 存储区 =='
          },
          {
            name: '仓位',
            id: 105,
            type: 'warehouse',
            width: 200,
            height: 50,
            left: 0,
            top: 0,
            style: {
              backgroundColor: '#5bacec'
            },
            html: '== 仓位 =='
          }
        ],
        designAreaProp:{},
        addItem: [], // 提交保存的数据
        vLine: [],
        hLine: [],
        eleMoving: {
          visible: false,
          ele: '',
          style: {
            position: 'absolute',
            left: 0,
            top: 0
          }
        },
        isHighLigh: false
      }
    },
    mounted(){
      // 获取设计区域位置及宽高
      const areaProp = this.$refs.DragArea.getBoundingClientRect()
      Object.assign(this.designAreaProp, {
        left: areaProp.left,
        top: areaProp.top,
        width: areaProp.width,
        height: areaProp.height
      })
    },
    methods: {
      // 进入设计区域
      enterBox(){
        this.isHighLigh = true
      },

      // 离开设计区域
      liveBox(){
        this.isHighLigh = false
      },

      // 拖动成功
      dragSuccess(currItem){
        this.isHighLigh = false
        currItem.key = this.getKey()
        this.addItem.push(currItem)
        // console.log(this.addItem)
      },

      // 辅助线回调事件
      getRefLineParams (params) {
        const { vLine, hLine } = params
        this.vLine = vLine
        this.hLine = hLine
      },

      // 拖动结束
      onDragStop(x, y){
        // console.log('==== onDragStop: ', x, y)
        const _key = this.getWidgetKey();
        this.addItem.forEach((v) => {
          if (v.key == _key) {
            v.left = x
            v.top = y
          }
        })
      },

      // 改变大小结束
      onResizeStop(x, y, width, height){
        // console.log('==== onResizeStop: ')
        const _key = this.getWidgetKey();
        this.addItem.forEach((v) => {
          if (v.key == _key) {
            v.left = x
            v.top = y
            v.width = width
            v.height = height
          }
        })
      },

      // 移除控件
      removeWidget(removeItem){
        this.addItem.forEach((v, i) => {
          if (v.key == removeItem.key) {
            this.addItem.splice(i, 1)
          }
        })
      },

      // 获取当前活动控件
      getWidgetKey(){
        const ele = document.querySelectorAll('.widget-item');
        let key;
        if (ele.length > 0) {
          ele.forEach((v)=>{
            if (v.className.indexOf('active') != -1) {
              key = v.getAttribute('widget-key')
            }
          })
        }
        return key
      },

      // 获取随机值
      getKey(){
        return Math.floor(Math.random() * (1000-100)) + 100 + '_' + (+new Date);
      }
    }
  }
</script>

<style scoped>
  .drag{
    margin-top: 50px;
  }
  .drag:after{
    content: '';
    display: block;
    clear:both;
  }
  .left-box{
    width: 250px;
    float: left;
    background-color: #f0f0f0;
    text-align: center;
    user-select: none;
  }
  .left-box ul{
    list-style: none;
    line-height: 44px;
  }
  .left-box ul li{
    border-bottom: 1px #ccc solid;
    cursor: move;
  }
  .left-box ul li:hover{
    background-color: #ff0;
  }
  .right-box{
    width: 80%;
    margin-left: 260px;
    position: relative;
  }
  .right-box .drag-area{
    background-color: #fcffe4;
    height: 500px;
    border: 1px #666 solid;
  }
  .right-box .drag-area.high-ligh{
    border: 1px solid #f00;
    background-color: #fdf5f5;
  }
  .move-ele{
    border: 1px dotted #333;
    width: 250px;
    line-height: 44px;
    text-align: center;
    background-color: #ff0;
    opacity: .5;
    transform: rotate(5deg);
  }

  .widget-item{
    text-align: center;
    color: #fff
  }
  .remove-widget{
    position: absolute;
    right: 0;
    top: 0;
    font-size: 12px;
    padding: 2px 5px;
    background-color: #999;
    border: 1px #999 solid;
    text-decoration: none;
    opacity: .8;
  }
  .remove-widget:hover{
    border: 1px #c00 solid;
    opacity: 1;
  }
</style>
