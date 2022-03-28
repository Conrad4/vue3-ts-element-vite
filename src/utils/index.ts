// 把驼峰转换成横杠连接,感觉很奇妙
export const toLine = (value: string) => {
  // 把驼峰大小写AaBb，变成横杠 aabb
  return value.replace(/(A-Z)g/, '-$1').toLocaleLowerCase()
}
