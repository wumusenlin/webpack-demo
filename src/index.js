import style from './style.css';
import iconfontStyle from './iconfont/iconfont.css';

function component() {
  const element = document.createElement("div");
  const textArr = ['hello', 'webpack']
  element.innerHTML = textArr.join(' ');
  element.classList.add('hello');
  console.log('style', style)
  console.log('iconfontStyle', iconfontStyle)
  return element;
}
function genImgIcon() {
  const element = document.createElement("img");
  element.setAttribute('src', require('./assets/icon.png'))
  return element;
}
function genImgOri() {
  const element = document.createElement("img");
  element.setAttribute('src', require('./assets/ori.jpg'))
  element.setAttribute('width', '100px')
  return element;
}
function genFontIcon(className) {
  const element = document.createElement("i");
  element.classList.add('iconfont')
  element.classList.add(className)

  return element;
}
function appendIconfont() {
  ['icon-aixin', 'icon-caidan', 'icon-ceshi', 'icon-dianzan'].forEach((name) => {
    document.body.appendChild(genFontIcon(name));
  }
  )
}

document.body.appendChild(component());
document.body.appendChild(genImgOri());
document.body.appendChild(genImgIcon());

appendIconfont()

function getUser() {
  // 测试普通错误
  // throw new Error("普通错误");

  console.log("开始getUser");
  const user1 = fetch("https://api.uomg.com/api/rand.qinghua");
  const user2 = fetch("https://api.uomg.com/api/rand.qinghua");
  console.log("getUser已获取到用户数据user1", user1);
  console.log("getUser已获取到用户数据user2", user2);
  console.log("user1 === user2", user1 === user2);
  return user1;
}

function m1() {
  console.log("m1");
  return getUser();
}

function m2() {
  console.log("m2");
  return m1();
}

function m3() {
  console.log("m3");
  return m2();
}

function main() {
  console.log("开始main");
  const user = m3();
  console.log("结束了main", user);
}

// run函数为主要代码，该函数会将异步操作进行处理。
function run(fn) {
  // 保留原有fetch，发起请求时使用。
  const originalFetch = window.fetch;
  // 缓存结果
  const cache = [];
  // 记录fetch调用的顺序，从而缓存多次fetch请求结果。(整条链路上可能有多个fetch调用，需要分别缓存)
  let i = 0;

  // 改写fetch，当有异步操作时则中断fn执行，异步有结果时，重新执行fn，并将异步结果返回。
  window.fetch = (...args) => {
    debugger
    // 命中缓存
    if (cache[i]) {
      const cacheData = cache[i];
      // 使用i++(第一个fetch执行完，才能执行下一个。所以i的变动放在完成后是较好的)
      // 第一次fetch未命中缓存，存下标0的位置。第一次fetch有结果，重新执行fn，重置i为0，下标0有结果命中缓存，i++为1。
      // 第二次fetch未命中缓存，存下标1的位置。第二次fetch有结果，重新执行fn，重置i为0，下标0有结果命中缓存，下标1有结果命中缓存，i++为2。
      i++;
      // 判断结果成功与否，从而决定是否抛出错误。
      // 不需要判断是否等于pending，promise改变了状态才会重新执行fn。
      if (cacheData.status === "fulfilled") {
        return cacheData.data;
      }
      if (cacheData.status === "rejected") {
        throw cacheData.err;
      }
    } else {
      // 未命中缓存
      const result = {
        status: "pending",
        data: null,
        err: null,
      };
      cache[i] = result;
      throw originalFetch(...args)
        .then((res) => res.json())
        .then((jsonData) => {
          console.log('这里是fulfilled')
          result.status = "fulfilled";
          result.data = jsonData;
        })
    }
  };

  const execute = () => {
    try {
      // i需要重置。因为fn可能是重新执行的，需要准确获取缓存。(改写后的fetch，类似React的hook，用调用顺序记录不同的state)
      i = 0;
      console.log('开始执行fn', cache)
      fn();
    } catch (err) {
      // 捕获promise
      if (err instanceof Promise) {
        // 当异步有结果时重新执行fn。
        // 重新执行的fn依旧需要try catch进行错误处理，所以不能单独执行fn。
        // 注意此处并不是递归，只是不断从微任务队列取任务执行。所以不会栈溢出。但是有可能同一事件循环太多任务，导致页面卡顿。
        err.then(execute);
      } else {
        // 将普通错误抛出去
        throw err;
      }
    }
  };

  execute();
}

// run(main);

