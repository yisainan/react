export default function get (url) {
  return new Promise(function(resolve, reject) {
    // 创建request对象
    const xhr = new XMLHttpRequest();
    // 添加状态改变的监听
    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        try {
          // 解析响应数据
          const data = JSON.parse(xhr.responseText);
          // 调用成功的回调
          resolve(data);
        } catch (e) {
          // 调用失败的回调
          reject(e);
        }
      }
    });
    // 添加请求失败的监听
    xhr.addEventListener('error', function(error) {
      // 调用失败的回调
      reject(error);
    });
    // 打开连接
    xhr.open('GET', url);
    // 发送请求
    xhr.send(null);
  });
}
