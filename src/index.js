import style from './style.css';
import iconfontStyle from './iconfont/iconfont.css';
import run from './sync2async/sync2async';
import main from './sync2async/demo';
import { mySum } from './fn/sum';

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

console.log('mySum',mySum(2,5))



// run(main);

