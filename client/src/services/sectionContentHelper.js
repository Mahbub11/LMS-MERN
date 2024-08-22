export const sectionContentHelper=(data)=>{

    // shape
    // duration from section content
//    const totalduration= data.reduce((acc,data)=> acc+ data.duration,0)
//    const totalLectures= data.length;

//    const newData= data.map((data,index)=>{
//         return{...data, 'totalduration' : totalduration,
//     'totalLectures' :totalLectures }
//     })

//     console.log(newData)

//     return newData


let totalDuration
const newData= data.map((data1,index)=>(
     totalDuration = data1.content.reduce((acc,content)=>
    acc+content.duration,0)

    
//    data.content.map((newData,i)=>{
//     return newData
//    })
// {...data1,'totalDuration':totalDuration}
))
console.log(totalDuration)

     return data
    
}