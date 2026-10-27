import React,{useState} from 'react';
import {View,Text,TextInput,TouchableOpacity,ActivityIndicator,ScrollView,Image} from 'react-native';
const GOLD='#DEB967',BG='#1C1A17',API='https://hqgoosnzjwpttygdbnzr.supabase.co',KEY='sb_publishable_cngrbDtdgADG8Pt5rTDRqA_AMzZuy7V';
export const products=[
 {id:'long-white',name:'Лонгслив белый (оверсайз)',price:2990},
 {id:'pants-black',name:'Штаны чёрные',price:3490},
 {id:'hoodie-black',name:'Худи чёрный (оверсайз)',price:4490},
 {id:'zip-black',name:'Кофта на молнии чёрная (оверсайз)',price:4490},
 {id:'shorts-black',name:'Шорты чёрные',price:3490},
 {id:'shirt-oversize',name:'Футболка чёрная (оверсайз)',price:2290},
 {id:'shirt-regular',name:'Футболка чёрная (стандарт)',price:2490}
];
type CartItem={id:string;size:string;qty:number};
const sizes=['XS','S','M','L','XL','XXL','3XL'];
const fmt=(n:number)=>n.toLocaleString('ru-RU')+' ₽';
const field={borderWidth:1,borderColor:'#665535',backgroundColor:'#201D18',color:'#fff',padding:13,borderRadius:9} as const;
export default function MerchShop(){
 const [selected,setSelected]=useState<Record<string,string>>({}),[cart,setCart]=useState<CartItem[]>([]),[checkout,setCheckout]=useState(false),[name,setName]=useState(''),[contact,setContact]=useState(''),[social,setSocial]=useState(''),[notes,setNotes]=useState(''),[agree,setAgree]=useState(false),[loading,setLoading]=useState(false),[error,setError]=useState(''),[complete,setComplete]=useState(false);
 const sum=cart.reduce((total,c)=>total+(products.find(p=>p.id===c.id)?.price||0)*c.qty,0);
 const add=(id:string)=>{const size=selected[id];if(!size){setError('Сначала выберите размер изделия.');return;}setError('');setCart(old=>{const i=old.findIndex(x=>x.id===id&&x.size===size);return i<0?[...old,{id,size,qty:1}]:old.map((x,j)=>j===i?{...x,qty:x.qty+1}:x)});};
 const quantity=(id:string,size:string,change:number)=>setCart(v=>v.map(x=>x.id===id&&x.size===size?{...x,qty:x.qty+change}:x).filter(x=>x.qty>0));
 async function submit(){setError('');if(!name.trim()||!contact.trim()||!agree){setError('Укажите имя, контакт и согласие на обработку данных.');return;}setLoading(true);try{const items=cart.map(x=>{const p=products.find(v=>v.id===x.id)!;return {id:p.id,name:p.name,price:p.price,size:x.size,qty:x.qty};});const r=await fetch(API+'/rest/v1/merch_orders',{method:'POST',headers:{apikey:KEY,'content-type':'application/json',Prefer:'return=minimal'},body:JSON.stringify({customer_name:name.trim(),contact:contact.trim(),social:social.trim()||null,notes:notes.trim()||null,items})});if(!r.ok)throw Error('Не удалось отправить заказ. Проверьте соединение и попробуйте снова.');setComplete(true);setCart([]);}catch(e){setError(e instanceof Error?e.message:'Ошибка отправки');}finally{setLoading(false);}}
 if(complete)return <View style={{backgroundColor:'#272318',padding:18,borderRadius:14,gap:10}}><Text style={{color:GOLD,fontSize:23,fontWeight:'700'}}>Заказ отправлен ✓</Text><Text style={{color:'#fff'}}>Заказ передан в закрытый кабинет администратора. С вами свяжутся по указанным контактам.</Text><TouchableOpacity onPress={()=>{setComplete(false);setCheckout(false);setAgree(false);}}><Text style={{color:GOLD}}>Оформить ещё один заказ →</Text></TouchableOpacity></View>;
 return <View style={{gap:15}}>
 <Text style={{color:GOLD,fontSize:22,fontWeight:'700'}}>Клубная коллекция</Text>
 <Text style={{color:'#cbbda6'}}>Выбери размер, добавь товары в корзину и оформи заказ прямо в приложении. Размеры следует уточнять у клуба — информация о доступности размеров в исходной форме не указана.</Text>
 {products.map((p,i)=><View key={p.id} style={{backgroundColor:BG,borderWidth:1,borderColor:'#715B39',borderRadius:16,padding:14,gap:12}}>
 <View style={{height:220,backgroundColor:'#32302c',borderRadius:10,overflow:'hidden',justifyContent:'center',alignItems:'center'}}><Text style={{color:GOLD,fontSize:50}}>♜</Text><Text style={{color:'#C4AF89',fontSize:12}}>Фото товара · {i+1}</Text></View>
 <Text style={{color:'#fff',fontWeight:'700',fontSize:18}}>{p.name}</Text>
 <Text style={{color:GOLD,fontWeight:'700',fontSize:23}}>{fmt(p.price)}</Text>
 <Text style={{color:'#ccc'}}>Размер</Text>
 <View style={{flexDirection:'row',flexWrap:'wrap',gap:7}}>{sizes.map(size=><TouchableOpacity key={size} onPress={()=>setSelected(old=>({...old,[p.id]:size}))} style={{paddingHorizontal:10,paddingVertical:9,borderRadius:6,borderWidth:1,borderColor:GOLD,backgroundColor:selected[p.id]===size?'#67502B':'#211D18'}}><Text style={{color:'#fff',fontSize:12}}>{size}</Text></TouchableOpacity>)}</View>
 <TouchableOpacity accessibilityRole="button" onPress={()=>add(p.id)} style={{backgroundColor:GOLD,padding:13,borderRadius:9,alignItems:'center'}}><Text style={{color:'#19150F',fontWeight:'700'}}>+ В КОРЗИНУ</Text></TouchableOpacity></View>)}
 <View style={{backgroundColor:'#302719',borderWidth:1,borderColor:GOLD,borderRadius:15,padding:15,gap:13}}>
 <Text style={{color:GOLD,fontSize:22,fontWeight:'700'}}>Корзина · {cart.reduce((s,x)=>s+x.qty,0)} шт.</Text>
 {cart.length===0?<Text style={{color:'#d3c8b7'}}>Пока пусто. Добавь понравившуюся вещь.</Text>:cart.map(x=>{const p=products.find(v=>v.id===x.id)!;return <View key={x.id+x.size} style={{paddingVertical:8,borderBottomWidth:1,borderColor:'#604B2C',gap:8}}><Text style={{color:'#fff',fontWeight:'700'}}>{p.name} · {x.size}</Text><View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}><View style={{flexDirection:'row',gap:12,alignItems:'center'}}><TouchableOpacity onPress={()=>quantity(x.id,x.size,-1)}><Text style={{color:GOLD,fontSize:25}}>−</Text></TouchableOpacity><Text style={{color:'#fff'}}>{x.qty}</Text><TouchableOpacity onPress={()=>quantity(x.id,x.size,1)}><Text style={{color:GOLD,fontSize:25}}>+</Text></TouchableOpacity></View><Text style={{color:GOLD,fontSize:16}}>{fmt(x.qty*p.price)}</Text></View></View>})}
 <Text style={{color:'#fff',fontSize:19,fontWeight:'700'}}>Итого: {fmt(sum)}</Text>
 {cart.length>0&&!checkout&&<TouchableOpacity onPress={()=>setCheckout(true)} style={{backgroundColor:GOLD,borderRadius:8,padding:15,alignItems:'center'}}><Text style={{fontWeight:'700',color:'#16110b'}}>ОФОРМИТЬ ЗАКАЗ →</Text></TouchableOpacity>}
 {checkout&&cart.length>0&&<View style={{gap:11}}><Text style={{color:GOLD,fontWeight:'700',fontSize:18}}>Данные для заказа</Text><TextInput value={name} onChangeText={setName} placeholder="Имя *" placeholderTextColor="#999" style={field}/><TextInput value={contact} onChangeText={setContact} placeholder="Телефон или email *" placeholderTextColor="#999" style={field}/><TextInput value={social} onChangeText={setSocial} placeholder="Telegram / VK (необязательно)" placeholderTextColor="#999" style={field}/><TextInput value={notes} onChangeText={setNotes} placeholder="Комментарий к заказу" placeholderTextColor="#999" multiline style={[field,{minHeight:75}]}/><TouchableOpacity accessibilityRole="checkbox" accessibilityState={{checked:agree}} onPress={()=>setAgree(v=>!v)} style={{flexDirection:'row',gap:10,alignItems:'flex-start'}}><Text style={{color:GOLD,fontSize:21}}>{agree?'☑':'☐'}</Text><Text style={{color:'#ddd',flex:1}}>Согласен на обработку данных для выполнения заказа и обратной связи.</Text></TouchableOpacity><TouchableOpacity onPress={submit} disabled={loading} style={{padding:15,backgroundColor:GOLD,borderRadius:8,alignItems:'center'}}>{loading?<ActivityIndicator/>:<Text style={{color:'#16110B',fontWeight:'700'}}>ОТПРАВИТЬ ЗАКАЗ · {fmt(sum)}</Text>}</TouchableOpacity></View>}
 {!!error&&<Text style={{color:'#ffab92'}}>{error}</Text>}
 </View></View>
}
