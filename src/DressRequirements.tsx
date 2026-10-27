import React,{useState} from 'react';
import {View,Text,TouchableOpacity,Linking,Image} from 'react-native';
const GOLD='#DEB967';
const blackUniform={uri:'data:image/webp;base64,UklGRkwFAABXRUJQVlA4IEAFAADQLgCdASqyACIBPtVorlGoJaSiotQJ+QAaiWlu4XB3DtoTjX1LJOEs6SRhK+nQNHRyTnWsEn/qi5/c2++3v1IUGWtFDVpi3zRvnmfYX8UcxZwh6g0i1hieExeKxUHXyOckKEcFbYQ+Dm5/5mwVgQq8puhKEzQnLSvHh4CyEnsJhH1t0DliJRoV3onvscYCQwdSV+VZMZHWBUyXuBQskG4R4jdmzFJy2fhJLOVCnrsmsjFaKqO6bENN+LvVu9TMoaz5qPxtaOtuEn449VUbI61T9s0WVD2ClmbXHJYSzkNTi4/uD7v47vuQl47iRsung9Yyk4wdRO2NkRdGkg1ByNvuSBjdImSsqDBugwK0g7u7nxiKGMU9wEE7Le9kqCeKdA0c/mbwlMHvm2lgjmjo5JehDdsHT8aahIi6Jyyf8Viu7qpX/PobyTQL+PPDq6tHmUSgkjCUPADfanBxdeWmpEY2NfoNMTF5GAkYSfyeX50pTWEs6SRhK+nQNHRyTu7uYAD+/HmABv5wdFpSVOzx+SUPRx8Q1oDwzq+uv7ifh5opHW/kgg6ZOkZCbkdhrtPoV4QQ12LBg7AIEyBwLtgGORd+UPm0vPOcS418VmwZkmodGdRJXQ5kgM8euXJc4p9qYmLLbCpralJCurj3Z6T2AMj+zcx5pkvjga7IVKndPHkMadogQnyhctK07DU2vYVR/WgNZIvfgMheKYyoEIVeWdva8tvyidpjgUk+B7fsmUpIsgjVgVxiOp5c8pmF9+UgVz6G60trTU1nwkvrzhpzwFyqSJoqLha82/X7YYeCyBcfxeNo+zxtzHtavRkE2bneq1nxaduF+itcBUJiUjoHJdvz0i01DPnElNnueYARTuie7PaNxhOGR9ev4+OA1G6kC2K6TopZ4oTVHwlXU0gMkg+GuveuUW5NevfxH5KNXI3r9jM2w/yJddiOM9RNX/24wednpFa4Eolod7961c1NqeeudM5Kmx2No8TktE44Ni88+FOgkqNfKgvHHB8hYzx6OlniULBSJsShKxcpg90qcc4KC1sS6dhfwxo1JlBPlRQGyrw7CKZAMrQ4Y2xJLyYrVNvfOEqphhjxJT+OZC0t25K4saKkBzVtnUoADgoD5fupmcU/uTN8EKJIKitYT4AmhMUTqNw2cTEwWVFJmSmxz7VBzBZ/UX39xi90ptPxZ6LE/SzZVhikBaeViuJF8dom9QVodQEBPyPnFzYJhpfbq8w4fjIzJdq6AHjbEhtMkh6eUzEuGEOk801EM48Vo7tiMmQjhQClpaPwU106LZl98pWsKbv8JOejdFQmGOsZfj5DnzvRppXfCfOx5/SlCZf6SSneQkxYZMy6PArMSOFwdCG41FVKLdUKGJCJyf8u5xmQhEeJboTLw3pfW6L1HaZRtdbWvA6vQ+hN7a3DWO3rMF4cAlSQwIQ1lOfYvqHM84LmnkzJje5fSqfpji6anmRCsE9d9kefP5I/ohLRXlQWpMFvj0waI5a2Yv5gAzskmy5PV41W3mxOtajiEh4/vsNVuJlETLwXBFlZXy/1xKECFsr9BcYiiFXujX3Rp4mO+Vbr8DnD5QzwFBZUOmmx01qzSt6N1ej6aOuRTzGOYwbBM/MFoxPf/vMKyk/QT/6Vd9q+yvsnxMfvBwtqvYsnSRTCGJo6AZ+m7RjEtLFLs69lRbPLAVHEiz48H46etEmAe4OPi7ez+Ly/GwytmPPcputFn/g2u1n3SYlJLw+DKnAwyWVUPldXHqMNVp5PdugqhMo4oMhgoCRaBuErLWhdIAAAAAA='};
const SEARCH='https://www.wildberries.ru/catalog/0/search.aspx?search=';
const CLUB='https://vk.com/moscow.spartans';
type Item={name:string;query:string;note?:string};
const sets:{title:string;description:string;items:Item[]}[]=[
 {title:'Чёрная форма',description:'Основной комплект: чёрная форма с золотыми акцентами. Эталон цветов — присланное изображение формы №71.',items:[
 {name:'Шлем чёрно-золотой',query:'шлем американский футбол черный золотой',note:'Защитная экипировка — только по согласованию с тренером'},
 {name:'Джерси чёрная с золотым номером',query:'джерси американский футбол черная',note:'Игровой номер и оформление — через клуб'},
 {name:'Бриджи / игровые штаны чёрные',query:'штаны американский футбол черные'},
 {name:'Наплечники',query:'плечевая защита американский футбол'},
 {name:'Гетры чёрные',query:'гетры спортивные черные'},
 {name:'Бутсы чёрные',query:'бутсы американский футбол черные'},
 {name:'Перчатки чёрные',query:'перчатки американский футбол черные'}]},
 {title:'Золотая форма',description:'Альтернативный комплект. Конкретный оттенок, номера и рисунок формы подтверждает клуб.',items:[
 {name:'Джерси золотая',query:'джерси американский футбол золотая'},
 {name:'Игровые брюки чёрные',query:'штаны американский футбол черные'},
 {name:'Гетры золотые',query:'гетры спортивные золотые'},
 {name:'Бутсы чёрные',query:'бутсы американский футбол черные'},
 {name:'Перчатки',query:'перчатки американский футбол'}]},
 {title:'ОФП и лёгкая атлетика',description:'Комплект для зала, бега и тренировки на стадионе.',items:[
 {name:'Спортивная футболка',query:'футболка спортивная черная мужская'},
 {name:'Тренировочные шорты',query:'шорты спортивные мужские черные'},
 {name:'Тайтсы',query:'тайтсы беговые мужские'},
 {name:'Беговые кроссовки',query:'беговые кроссовки мужские'},
 {name:'Спортивные носки',query:'носки спортивные черные'},
 {name:'Ветровка',query:'ветровка беговая мужская'}]},
 {title:'Повседневный casual',description:'Клубная палитра — чёрный, графит и золото. Повседневная одежда и выезды.',items:[
 {name:'Худи чёрное',query:'худи мужское черное'},
 {name:'Футболка чёрная',query:'футболка хлопковая мужская черная'},
 {name:'Джоггеры',query:'джоггеры мужские черные'},
 {name:'Кеды или кроссовки',query:'кроссовки повседневные мужские черные'},
 {name:'Кепка чёрная',query:'кепка черная мужская'}]}
];
const accessories:Item[]=[{name:'Рюкзак команды',query:'рюкзак спортивный черный',note:'Фото клубного рюкзака будет добавлено после загрузки'}, {name:'Бутылка для воды',query:'бутылка спортивная для воды'},{name:'Спортивная сумка',query:'сумка спортивная черная'}];
export default function DressRequirements(){
 const [open,setOpen]=useState(false),[tab,setTab]=useState(0),[showAccessories,setShowAccessories]=useState(false);
 const itemRow=(it:Item,i:number)=><View key={i} style={{padding:12,borderWidth:1,borderColor:'#4b3c25',borderRadius:8,gap:7,backgroundColor:'#1c1b18'}}><Text style={{color:'#fff',fontSize:15,fontWeight:'700'}}>{it.name}</Text>{it.note&&<Text style={{color:'#bca881',fontSize:12}}>{it.note}</Text>}<View style={{flexDirection:'row',flexWrap:'wrap',gap:12}}><TouchableOpacity accessibilityRole="link" onPress={()=>Linking.openURL(SEARCH+encodeURIComponent(it.query))}><Text style={{color:GOLD}}>Где купить ↗</Text></TouchableOpacity><TouchableOpacity accessibilityRole="link" onPress={()=>Linking.openURL(CLUB)}><Text style={{color:GOLD}}>Заказать через клуб ↗</Text></TouchableOpacity></View></View>;
 return <View style={{gap:12}}>
 <TouchableOpacity accessibilityRole="button" onPress={()=>setOpen(x=>!x)} style={{backgroundColor:'#514026',borderColor:GOLD,borderWidth:1,padding:17,borderRadius:9}}><Text style={{color:'#fff',fontWeight:'700',fontSize:15}}>ТРЕБОВАНИЯ ПО ВНЕШНЕМУ ВИДУ {open?'▲':'▼'}</Text></TouchableOpacity>
 {open&&<View style={{gap:13}}>
 <Text style={{color:'#bcb2a1'}}>Рекомендации для прототипа; официальные требования и модель экипировки уточняются у клуба. «Где купить» открывает поиск, а не подтверждённый товар в наличии.</Text>
 <View style={{flexDirection:'row',flexWrap:'wrap',gap:7}}>{sets.map((s,i)=><TouchableOpacity key={s.title} onPress={()=>{setTab(i);setShowAccessories(false)}} style={{padding:11,borderWidth:1,borderColor:GOLD,backgroundColor:tab===i&&!showAccessories?'#624a27':'#21201c',borderRadius:7}}><Text style={{color:'#fff',fontSize:12}}>{s.title}</Text></TouchableOpacity>)}</View>
 <TouchableOpacity onPress={()=>setShowAccessories(a=>!a)} style={{borderWidth:1,borderColor:GOLD,padding:12,borderRadius:7,backgroundColor:showAccessories?'#624a27':'#21201c'}}><Text style={{color:'#fff'}}>АКСЕССУАРЫ · РЮКЗАК И ДРУГОЕ {showAccessories?'▲':'▼'}</Text></TouchableOpacity>
 <Text style={{color:GOLD,fontSize:19,fontWeight:'700'}}>{showAccessories?'Аксессуары':sets[tab].title}</Text>
 <Text style={{color:'#ccc',lineHeight:20}}>{showAccessories?'Рюкзак и дополнительные принадлежности. Фото рюкзака ожидается.':sets[tab].description}</Text>
 {!showAccessories&&tab<=1&&<View style={{flexDirection:'row',gap:8,alignItems:'center'}}>{tab===0&&<Image source={blackUniform} resizeMode="contain" style={{width:145,height:235}}/>}<View style={{width:64,height:75,borderColor:GOLD,borderWidth:1,backgroundColor:tab===0?'#090909':'#AD925D',alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:28,color:tab===0?GOLD:'#111'}}>71</Text></View><Text style={{color:'#aaa',flex:1}}>Цветовая схема: чёрный + золото. Образец чёрной формы показан слева. Золотая форма пока без фото.</Text></View>}
 {(showAccessories?accessories:sets[tab].items).map(itemRow)}
 <Text style={{color:'#bcb2a1',fontSize:12}}>По вопросам заказа: сообщество «Московские Спартанцы» во ВКонтакте. Контакт конкретного ответственного пока не указан.</Text>
 </View>}
 </View>
}
