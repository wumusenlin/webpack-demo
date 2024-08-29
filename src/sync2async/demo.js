function getUser() {
  // 测试普通错误
  // throw new Error("普通错误");

  console.log("开始getUser");
  const user1 = fetch("https://api.uomg.com/api/rand.qinghua");
  // const user2 = fetch("https://api.uomg.com/api/rand.qinghua");
  console.log("getUser已获取到用户数据user1", user1);
  // console.log("getUser已获取到用户数据user2", user2);
  // console.log("user1 === user2", user1 === user2);
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


export default main