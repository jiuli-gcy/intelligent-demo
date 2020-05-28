import React from 'react';
import { Select } from 'antd'
const Option = Select.Option;

function accMul(arg1, arg2) {
  let m = 0;
  const s1 = arg1.toString();
  const s2 = arg2.toString();
  m += s1.split(".").length > 1 ? s1.split(".")[1].length : 0;
  m += s2.split(".").length > 1 ? s2.split(".")[1].length : 0;
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / 10 ** m;
}

export function digitUppercase(n) {
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [['元', '万', '亿'], ['', '拾', '佰', '仟', '万']];
  let num = Math.abs(n);
  let s = '';
  fraction.forEach((item, index) => {
    s += (digit[Math.floor(accMul(num, 10 * 10 ** index)) % 10] + item).replace(/零./, '');
  });
  s = s || '整';
  num = Math.floor(num);
  for (let i = 0; i < unit[0].length && num > 0; i += 1) {
    let p = '';
    for (let j = 0; j < unit[1].length && num > 0; j += 1) {
      p = digit[num % 10] + unit[1][j] + p;
      num = Math.floor(num / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }

  return s
    .replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整');
}


//生成指定区间的随机整数
export function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//计算提示框的宽度
export function calculateWidth(arr){
  return 30 + arr[0].length*15
}

//图片预加载
export function preloadingImages(arr) {
  arr.forEach(item=>{
    const img = new Image()
    img.src = item
  })
}

export function formateDate(time){
  if(!time)return '';
  let date = new Date(time);
  return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
}

export function pagination(data,callback){
  return {
      onChange:(current)=>{
          callback(current)
      },
      current:data.result.page,
      pageSize:data.result.page_size,
      total: data.result.total_count,
      showTotal:()=>{
          return `共${data.result.total_count}条`
      },
      showQuickJumper:true
  }
}

// 格式化金额,单位:分(eg:430分=4.30元)
export function formatFee(fee, suffix = '') {
  if (!fee) {
      return 0;
  }
  return Number(fee).toFixed(2) + suffix;
}

// 格式化公里（eg:3000 = 3公里）
export function formatMileage(mileage, text) {
  if (!mileage) {
      return 0;
  }
  if (mileage >= 1000) {
      text = text || " km";
      return Math.floor(mileage / 100) / 10 + text;
  } else {
      text = text || " m";
      return mileage + text;
  }
}

// 隐藏手机号中间4位
export function formatPhone(phone) {
  phone += '';
  return phone.replace(/(\d{3})\d*(\d{4})/g, '$1***$2')
}

// 隐藏身份证号中11位
export function formatIdentity(number) {
  number += '';
  return number.replace(/(\d{3})\d*(\d{4})/g, '$1***********$2')
}

export function getOptionList(data){
  if(!data){
      return [];
  }
  let options = [] //[<Option value="0" key="all_key">全部</Option>];
  // eslint-disable-next-line
  data.map((item)=>{
      options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
  })
  return options;
}

/**
* ETable 行点击通用函数
* @param {*选中行的索引} selectedRowKeys
* @param {*选中行对象} selectedItem
*/
export function updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
  if (selectedIds) {
      this.setState({
          selectedRowKeys,
          selectedIds: selectedIds,
          selectedItem: selectedRows
      })
  } else {
      this.setState({
          selectedRowKeys,
          selectedItem: selectedRows
      })
  }
}