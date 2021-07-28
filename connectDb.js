function DevidePerten(arr, len) {
  let chunks = [] 
  let i = 0
  let n = arr.length;
  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }
  return chunks;
}
const cases =[{'1':'sd'},{'b':2},{'c':3},{"kds":4},{'e':5},{'f':6},{'1':'sd'},{'b':2},{'c':3},{"kds":4},{'e':5},{'f':6},{'1':'sd'},{'b':2},{'c':3},{"kds":4},{'e':5},{'f':6},{'1':'sd'},{'b':2},{'c':3},{"kds":4},{'e':5},{'f':6}];
var tencases= DevidePerten(cases,10); 
console.log(tencases)