import React,{useState} from 'react';
import {View,Text,TouchableOpacity,Linking,Image} from 'react-native';
import {BACKPACK_IMAGE} from './backpackPhoto';
const GOLD='#DEB967';
const blackUniform={uri:'data:image/webp;base64,UklGRkwFAABXRUJQVlA4IEAFAADQLgCdASqyACIBPtVorlGoJaSiotQJ+QAaiWlu4XB3DtoTjX1LJOEs6SRhK+nQNHRyTnWsEn/qi5/c2++3v1IUGWtFDVpi3zRvnmfYX8UcxZwh6g0i1hieExeKxUHXyOckKEcFbYQ+Dm5/5mwVgQq8puhKEzQnLSvHh4CyEnsJhH1t0DliJRoV3onvscYCQwdSV+VZMZHWBUyXuBQskG4R4jdmzFJy2fhJLOVCnrsmsjFaKqO6bENN+LvVu9TMoaz5qPxtaOtuEn449VUbI61T9s0WVD2ClmbXHJYSzkNTi4/uD7v47vuQl47iRsung9Yyk4wdRO2NkRdGkg1ByNvuSBjdImSsqDBugwK0g7u7nxiKGMU9wEE7Le9kqCeKdA0c/mbwlMHvm2lgjmjo5JehDdsHT8aahIi6Jyyf8Viu7qpX/PobyTQL+PPDq6tHmUSgkjCUPADfanBxdeWmpEY2NfoNMTF5GAkYSfyeX50pTWEs6SRhK+nQNHRyTu7uYAD+/HmABv5wdFpSVOzx+SUPRx8Q1oDwzq+uv7ifh5opHW/kgg6ZOkZCbkdhrtPoV4QQ12LBg7AIEyBwLtgGORd+UPm0vPOcS418VmwZkmodGdRJXQ5kgM8euXJc4p9qYmLLbCpralJCurj3Z6T2AMj+zcx5pkvjga7IVKndPHkMadogQnyhctK07DU2vYVR/WgNZIvfgMheKYyoEIVeWdva8tvyidpjgUk+B7fsmUpIsgjVgVxiOp5c8pmF9+UgVz6G60trTU1nwkvrzhpzwFyqSJoqLha82/X7YYeCyBcfxeNo+zxtzHtavRkE2bneq1nxaduF+itcBUJiUjoHJdvz0i01DPnElNnueYARTuie7PaNxhOGR9ev4+OA1G6kC2K6TopZ4oTVHwlXU0gMkg+GuveuUW5NevfxH5KNXI3r9jM2w/yJddiOM9RNX/24wednpFa4Eolod7961c1NqeeudM5Kmx2No8TktE44Ni88+FOgkqNfKgvHHB8hYzx6OlniULBSJsShKxcpg90qcc4KC1sS6dhfwxo1JlBPlRQGyrw7CKZAMrQ4Y2xJLyYrVNvfOEqphhjxJT+OZC0t25K4saKkBzVtnUoADgoD5fupmcU/uTN8EKJIKitYT4AmhMUTqNw2cTEwWVFJmSmxz7VBzBZ/UX39xi90ptPxZ6LE/SzZVhikBaeViuJF8dom9QVodQEBPyPnFzYJhpfbq8w4fjIzJdq6AHjbEhtMkh6eUzEuGEOk801EM48Vo7tiMmQjhQClpaPwU106LZl98pWsKbv8JOejdFQmGOsZfj5DnzvRppXfCfOx5/SlCZf6SSneQkxYZMy6PArMSOFwdCG41FVKLdUKGJCJyf8u5xmQhEeJboTLw3pfW6L1HaZRtdbWvA6vQ+hN7a3DWO3rMF4cAlSQwIQ1lOfYvqHM84LmnkzJje5fSqfpji6anmRCsE9d9kefP5I/ohLRXlQWpMFvj0waI5a2Yv5gAzskmy5PV41W3mxOtajiEh4/vsNVuJlETLwXBFlZXy/1xKECFsr9BcYiiFXujX3Rp4mO+Vbr8DnD5QzwFBZUOmmx01qzSt6N1ej6aOuRTzGOYwbBM/MFoxPf/vMKyk/QT/6Vd9q+yvsnxMfvBwtqvYsnSRTCGJo6AZ+m7RjEtLFLs69lRbPLAVHEiz48H46etEmAe4OPi7ez+Ly/GwytmPPcputFn/g2u1n3SYlJLw+DKnAwyWVUPldXHqMNVp5PdugqhMo4oMhgoCRaBuErLWhdIAAAAAA='};
const SEARCH='https://www.wildberries.ru/catalog/0/search.aspx?search=';
const CLUB='https://vk.com/moscow.spartans';
const CASUAL_FORM='https://docs.google.com/forms/d/e/1FAIpQLSdqGIGbqne0tSuKnoRfKWnYurNDXfnZ-Go9rbFMx1wSPazTkw/viewform?pli=1';
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
const casualMerch=[
 {name:'Лонгслив белый (оверсайз)',price:2990},
 {name:'Штаны чёрные',price:3490},
 {name:'Худи чёрный (оверсайз)',price:4490},
 {name:'Кофта на молнии чёрная (оверсайз)',price:4490},
 {name:'Шорты чёрные',price:3490},
 {name:'Футболка чёрная (оверсайз)',price:2290},
 {name:'Футболка чёрная (стандарт)',price:2490}
];
const accessories:Item[]=[{name:'Бутылка для воды',query:'бутылка спортивная для воды'},{name:'Спортивная сумка',query:'сумка спортивная черная'}];
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
 {showAccessories&&<View style={{backgroundColor:'#27231d',borderColor:'#765b31',borderWidth:1,borderRadius:16,padding:14,gap:11}}>
 <View style={{backgroundColor:'#f8f7f5',borderRadius:12,overflow:'hidden',padding:8}}><Image source={{uri:BACKPACK_IMAGE}} resizeMode="contain" style={{width:'100%',height:320}}/></View>
 <Text style={{color:GOLD,fontWeight:'700',fontSize:11,letterSpacing:1.4}}>КЛУБНАЯ ЭКИПИРОВКА · 4 РАКУРСА</Text>
 <Text style={{color:'#fff',fontWeight:'700',fontSize:22}}>Рюкзак «Московские Спартанцы»</Text>
 <Text style={{color:'#d7cebd',lineHeight:21}}>Чёрный спортивный рюкзак TROPERS с золотой клубной символикой. На фотографиях — общий вид, передняя панель и два варианта оформления сбоку.</Text>
 <Text style={{color:'#a9a295',fontSize:12}}>Цена и наличие клубной версии не подтверждены. Поиск покупки показывает похожие модели, не гарантирует фирменное нанесение.</Text>
 <View style={{flexDirection:'row',flexWrap:'wrap',gap:10}}>
 <TouchableOpacity accessibilityRole="link" onPress={()=>Linking.openURL(SEARCH+encodeURIComponent('рюкзак TROPERS спортивный черный'))} style={{backgroundColor:GOLD,padding:13,borderRadius:9,flexGrow:1,alignItems:'center'}}><Text style={{color:'#17130B',fontWeight:'700'}}>ГДЕ КУПИТЬ ↗</Text></TouchableOpacity>
 <TouchableOpacity accessibilityRole="link" onPress={()=>Linking.openURL(CLUB)} style={{borderWidth:1,borderColor:GOLD,padding:13,borderRadius:9,flexGrow:1,alignItems:'center'}}><Text style={{color:GOLD,fontWeight:'700'}}>ЗАКАЗАТЬ ЧЕРЕЗ КЛУБ ↗</Text></TouchableOpacity></View>
 </View>}
 <Text style={{color:'#ccc',lineHeight:20}}>{showAccessories?'Рюкзак команды и дополнительные принадлежности.':sets[tab].description}</Text>
 {!showAccessories&&tab===3&&<View style={{backgroundColor:'#29231B',borderColor:'#9B7840',borderWidth:1,borderRadius:14,padding:16,gap:12}}>
 <Text style={{color:GOLD,fontSize:12,fontWeight:'700',letterSpacing:1.3}}>КЛУБНАЯ КОЛЛЕКЦИЯ · CASUAL</Text>
 <Text style={{color:'#fff',fontSize:21,fontWeight:'700'}}>Каталог и заявка на клубную одежду</Text>
 <Text style={{color:'#ddd3c2',lineHeight:21}}>Выбрать фирменную одежду, посмотреть её фотографии, актуальные названия и цены и оформить заявку можно в клубной Google-форме.</Text>
 <TouchableOpacity accessibilityRole="link" onPress={()=>Linking.openURL(CASUAL_FORM)} style={{backgroundColor:GOLD,borderRadius:9,padding:15,alignItems:'center'}}>
 <Text style={{color:'#17130A',fontWeight:'700'}}>ОТКРЫТЬ КАТАЛОГ И ФОРМУ ЗАКАЗА ↗</Text>
 </TouchableOpacity>
 <Text style={{color:'#b8ad9e',fontSize:12,lineHeight:19}}>Товары и цены по PDF «Заказ мерча Спартанцы Медиа Лига» от 27.10.2026. Для выбора размера и оформления заказа откройте форму. Фотографии оригинальных товаров показаны в форме ниже.</Text>
 <View style={{gap:9}}>{casualMerch.map((item,i)=><View key={i} style={{backgroundColor:'#171717',borderWidth:1,borderColor:'#6B5636',borderRadius:12,padding:13,gap:7}}><Text style={{color:'#BA9860',fontSize:11,letterSpacing:1}}>SPARTANS · {String(i+1).padStart(2,'0')}</Text><Text style={{color:'#fff',fontSize:16,fontWeight:'700'}}>{item.name}</Text><Text style={{color:GOLD,fontSize:20,fontWeight:'700'}}>{item.price.toLocaleString('ru-RU')} ₽</Text><TouchableOpacity accessibilityRole="link" onPress={()=>Linking.openURL(CASUAL_FORM)} style={{alignSelf:'flex-start',borderWidth:1,borderColor:GOLD,borderRadius:7,paddingHorizontal:12,paddingVertical:9}}><Text style={{color:GOLD,fontWeight:'700'}}>ВЫБРАТЬ И ЗАКАЗАТЬ ↗</Text></TouchableOpacity></View>)}</View>
 <Text style={{color:GOLD,fontSize:14,fontWeight:'700'}}>Фотографии товаров и форма заявки</Text>
 <Text style={{color:'#ccc',fontSize:12}}>Здесь отображается оригинальная Google-форма с фотографиями каждого изделия. Если она не открылась, используйте кнопку «Открыть каталог и форму заказа» выше.</Text>
 </View>}
 {!showAccessories&&tab<=1&&<View style={{flexDirection:'row',gap:8,alignItems:'center'}}>{tab===0&&<Image source={blackUniform} resizeMode="contain" style={{width:145,height:235}}/>}<View style={{width:64,height:75,borderColor:GOLD,borderWidth:1,backgroundColor:tab===0?'#090909':'#AD925D',alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:28,color:tab===0?GOLD:'#111'}}>71</Text></View><Text style={{color:'#aaa',flex:1}}>Цветовая схема: чёрный + золото. Образец чёрной формы показан слева. Золотая форма пока без фото.</Text></View>}
 {(showAccessories?accessories:sets[tab].items).map(itemRow)}
 {!showAccessories&&tab===3&&<View style={{height:690,overflow:'hidden',borderRadius:10,borderColor:'#75603c',borderWidth:1}}>{React.createElement('iframe' as any,{src:CASUAL_FORM.replace('viewform?pli=1','viewform?embedded=true'),title:'Заказ мерча Спартанцы Медиа Лига',style:{width:'100%',height:'100%',border:0,backgroundColor:'#fff'}})}</View>}
 <Text style={{color:'#bcb2a1',fontSize:12}}>По вопросам заказа: сообщество «Московские Спартанцы» во ВКонтакте. Контакт конкретного ответственного пока не указан.</Text>
 </View>}
 </View>
}
