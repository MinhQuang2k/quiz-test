const markdownParser = markdown => {
  let array = markdown.split(" ")
  let lengthArr = array[0].length;
  if(lengthArr <= 1 || lengthArr >= 7)
     return "#Invalid";
  if(array[0].split("").filter(x => x == "#").length === lengthArr)
     return "#Invalid";
  let newValue = array.slice(1).join(" ")
  return `<h${lengthArr}>${newValue}</h${lengthArr}>`
};

console.log(markdownParser("#NoSpace"))