setTimeout(() => {
  var innerIframe = window.frames["ace_outer"].frames["ace_inner"];
  let dataArr = [];
  // 获取所有具有类名以"author-a-"开头的元素
  var elements = innerIframe.document.querySelectorAll('[class^="author-a-"]');
  // 创建一个空数组来存储类名
  var classNames = [];
  // 迭代每个元素并将类名添加到数组中
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    classNames.push(element.className);
  }
  // 使用 Set 对象对数组进行去重
  var uniqueClassNames = Array.from(new Set(classNames));
  // 获取指定类的全部文字字数
  function getTotalTextLengthByClass(className) {
    var elements = innerIframe.document.getElementsByClassName(className); // 根据类名获取元素列表
    var totalLength = 0;

    for (var i = 0; i < elements.length; i++) {
      var text = elements[i].innerText || elements[i].textContent; // 获取元素的文本内容
      var textLength = text.trim().length; // 去除前后空白字符后的文本长度
      totalLength += textLength; // 累加每个元素的文本长度
    }
    return totalLength;
  }
  const getAuthorFromClassName = (className) => {
    const regex = /^author-(.*?)$/; // 匹配以"author-"开头的类名
    const match = className.match(regex); // 执行匹配
    if (match && match.length > 1) {
      const encodedAuthor = match[1]; // 提取匹配到的部分
      const decodedAuthor = encodedAuthor
        .replace(/z(\d+)z/g, (match, p1) => {
          const charCode = parseInt(p1); // 解码字符的Unicode编码
          return String.fromCharCode(charCode); // 转换为字符
        })
        .replace(/-/g, "."); // 将"-"替换回"."
      return decodedAuthor;
    }
    return null; // 如果匹配失败，返回null
  };

  for (let i = 0; i < uniqueClassNames.length; i++) {
    dataArr[i] = {
      userClassName: uniqueClassNames[i],
      userId: getAuthorFromClassName(uniqueClassNames[i]),
      userWordsNum: getTotalTextLengthByClass(uniqueClassNames[i]),
    };
  }
  window.console.log(dataArr);
}, 1000);
