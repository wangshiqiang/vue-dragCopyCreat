// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// 定义全局指令-拖动
Vue.directive('drag-item', {
	bind(el, binding, vnode){
    // console.log(el)
    // console.log(binding)
    // console.log(vnode.context)
    let mouseDownX,
        mouseDownY,
        initX,
        initY,
        flag = false;
    let isEnterArea = false;

    el.onmousedown = (e) => {
      mouseDownX = e.pageX;  
      mouseDownY = e.pageY;  
      //初始位置的X，Y 坐标  
      initX = el.offsetLeft;  
      initY = el.offsetTop;
      flag = true; //表示鼠标已按下
      const targetArea = binding.value.targetProp;
      let moveEleLeft = 0,
          moveEleTop = 0;

      // 移动
      function docMouseMove(e){
        if(flag) {  // 确保鼠标已按下 
          var mouseMoveX = e.pageX,
              mouseMoveY = e.pageY;
          moveEleLeft = parseInt(mouseMoveX) - parseInt(mouseDownX) + parseInt(initX),
          moveEleTop = parseInt(mouseMoveY) - parseInt(mouseDownY) + parseInt(initY);

          binding.value.moveEle.ele = el.innerHTML
          binding.value.moveEle.visible = true
          binding.value.moveEle.style.left = moveEleLeft + "px";
          binding.value.moveEle.style.top = moveEleTop + "px";

          // 是否进入设计区域
          if (
            moveEleLeft > targetArea.left &&
            moveEleLeft < targetArea.left + targetArea.width &&
            moveEleTop > targetArea.top &&
            moveEleTop < targetArea.top + targetArea.height
          ) {
            isEnterArea = true
            binding.value.enterBox()
          }else{
            isEnterArea = false
            binding.value.liveBox()
          }
        }
      }
      document.addEventListener('mousemove', docMouseMove, false)

      // 停止
      function docMouseUp(){
        flag = false; //标识已松开鼠标 
        let type = binding.value.activeItem.type
        binding.value.moveEle.visible = false

        if (isEnterArea) {
          isEnterArea = false
          const currItem = Object.assign({}, binding.value.activeItem);
          currItem.left = moveEleLeft - targetArea.left;
          currItem.top = moveEleTop - targetArea.top;
          binding.value.dragSuccess(currItem)
        }

        // 解除相关绑定
        document.removeEventListener('mousemove', docMouseMove, false)
        document.removeEventListener('mouseup', docMouseUp, false)
      }
      document.addEventListener('mouseup', docMouseUp, false)
    }
  }
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
