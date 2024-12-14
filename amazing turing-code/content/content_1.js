// 定义一个函数用于删除指定类名的div元素（之前用于删除section side相关div）
function removeTargetDivs() {
  var targetDivs = document.querySelectorAll('div.section.side.nojs--hide.visible');
  targetDivs.forEach(function (div) {
    div.parentNode.removeChild(div);
  });
}

// 定义函数用于修改指定div内的h1和p标签内容及设置h1标签样式
function modifyContent() {
  var targetDiv = document.querySelector('div.section__body.typo[style="text-align: center"]');
  if (targetDiv) {
    var h1Tag = targetDiv.querySelector('h1');
    if (h1Tag) {
      h1Tag.textContent = "§ 大事不妙 §";
      // 设置h1标签的样式
      h1Tag.style.cssText = `
        font-weight: bold;
        color: transparent;
        -webkit-background-clip: text;
        background-clip: text;
        background-image: linear-gradient(88deg, #7557ff, #fe97dc);
      `;
    }
    var pTag = targetDiv.querySelector('p');
    if (pTag) {
      pTag.textContent = "已连续打卡 0 天，累计打卡 -999 天";
    }
  }
}

// 页面加载完成时，先执行删除和修改内容操作
document.addEventListener('DOMContentLoaded', function () {
  removeTargetDivs();
  modifyContent();
});

// 创建MutationObserver实例来监听DOM变化
const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    // 检查变化的类型是否是新增节点（比如新增的div元素）
    if (mutation.type === 'childList') {
      removeTargetDivs();
      modifyContent();
    }
  });
});

// 配置要观察的目标（一般就是整个文档的根节点）以及观察的选项
const config = {
    childList: true,
    subtree: true
};

// 开始观察文档的DOM变化
observer.observe(document.documentElement, config);