import React,{useState} from 'react';
import {ScrollView,Text,TextInput,TouchableOpacity,View,ActivityIndicator} from 'react-native';
const base=(process.env.EXPO_PUBLIC_SUPABASE_URL||'https://hqgoosnzjwpttygdbnzr.supabase.co').replace(/\/$/,'');
const key=process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY||'sb_publishable_cngrbDtdgADG8Pt5rTDRqA_AMzZuy7V';
const gold='#DEB967';
type Field='full_name'|'phone'|'vk_account'|'telegram_account'|'height_cm'|'weight_kg'|'sports_history';
export default function RecruitApplication({onBack}:{onBack:()=>void}){
 const [f,setF]=useState<Record<Field,string>>({full_name:'',phone:'',vk_account:'',telegram_account:'',height_cm:'',weight_kg:'',sports_history:''});
 const [american,setAmerican]=useState<'yes'|'no'|null>(null),[flag,setFlag]=useState<'yes'|'no'|null>(null),[consent,setConsent]=useState(false);
 const [pending,setPending]=useState(false),[success,setSuccess]=useState(false),[error,setError]=useState('');
 const input=(label:string,k:Field,placeholder?:string)=><View style={{gap:6}}><Text style={{color:gold,fontSize:13}}>{label}</Text><TextInput value={f[k]} onChangeText={v=>setF(p=>({...p,[k]:v}))} placeholder={placeholder||label} placeholderTextColor="#888" keyboardType={k==='phone'?'phone-pad':k==='height_cm'||k==='weight_kg'?'numeric':'default'} multiline={k==='sports_history'} style={{backgroundColor:'#202020',borderWidth:1,borderColor:'#64502E',borderRadius:8,padding:13,color:'#fff',minHeight:k==='sports_history'?90:48}}/></View>;
 const options=(label:string,v:'yes'|'no'|null,set:(v:'yes'|'no')=>void)=><View style={{gap:9}}><Text style={{color:'#F5E1B4'}}>{label}</Text><View style={{flexDirection:'row',gap:12}}>{(['yes','no'] as const).map(q=><TouchableOpacity key={q} onPress={()=>set(q)} style={{padding:12,borderWidth:1,borderColor:gold,backgroundColor:v===q?'#644C27':'#1A1A1A',flex:1,alignItems:'center'}}><Text style={{color:'#fff'}}>{q==='yes'?'Да':'Нет'}</Text></TouchableOpacity>)}</View></View>;
 async function submit(){
  setError('');
  if(f.full_name.trim().length<3||f.phone.replace(/\D/g,'').length<7||!american||!flag){setError('Заполните ФИО, телефон и ответы об опыте игры.');return;}
  if(!consent){setError('Для отправки необходимо согласие на обработку данных заявки.');return;}
  if(!base||!key){setError('Приём заявок ещё не подключён к закрытой базе. Данные не отправлены.');return;}
  setPending(true);
  try{const res=await fetch(base+'/rest/v1/recruit_applications',{method:'POST',headers:{apikey:key,'content-type':'application/json',Prefer:'return=minimal'},body:JSON.stringify({full_name:f.full_name.trim(),phone:f.phone.trim(),vk_account:f.vk_account.trim()||null,telegram_account:f.telegram_account.trim()||null,height_cm:f.height_cm?Number(f.height_cm.replace(',','.')):null,weight_kg:f.weight_kg?Number(f.weight_kg.replace(',','.')):null,sports_history:f.sports_history.trim()||null,american_football_experience:american,flag_football_experience:flag})});if(!res.ok)throw Error('Не удалось отправить заявку. Попробуйте позже.');setSuccess(true);}catch(e){setError(e instanceof Error?e.message:'Ошибка отправки');}finally{setPending(false);}
 }
 return <ScrollView contentContainerStyle={{padding:22,paddingBottom:60,gap:18,backgroundColor:'#101010',minHeight:'100%'}}>
 <TouchableOpacity onPress={onBack}><Text style={{color:gold}}>← На главный экран</Text></TouchableOpacity>
 <Text style={{color:gold,fontSize:12,letterSpacing:2}}>МОСКОВСКИЕ СПАРТАНЦЫ</Text>
 <Text style={{color:'#fff',fontSize:28,fontWeight:'700'}}>ЗАЯВКА В КОМАНДУ</Text>
 {success?<><Text style={{color:'#e9d9ab',fontSize:18}}>Заявка отправлена! С вами свяжется представитель команды.</Text><TouchableOpacity onPress={onBack}><Text style={{color:gold}}>Вернуться на главную</Text></TouchableOpacity></>:<>
 <Text style={{color:'#aaa'}}>Заполните анкету — она поступит только уполномоченному администратору в закрытый раздел заявок.</Text>
 {input('ФИО *','full_name','Фамилия Имя Отчество')}
 {input('Номер телефона *','phone','+7 ...')}
 {input('Аккаунт ВКонтакте','vk_account','Ссылка или @имя')}
 {input('Аккаунт Telegram','telegram_account','@имя')}
 {input('Рост, см','height_cm')}
 {input('Вес, кг','weight_kg')}
 {input('Какими видами спорта занимались?','sports_history','Расскажите о спортивном опыте')}
 {options('Есть опыт игры в американский футбол? *',american,setAmerican)}
 {options('Есть опыт игры во флаг-футбол? *',flag,setFlag)}
 <TouchableOpacity accessibilityRole="checkbox" accessibilityState={{checked:consent}} onPress={()=>setConsent(v=>!v)} style={{flexDirection:'row',gap:12,alignItems:'flex-start'}}><Text style={{color:gold,fontSize:21}}>{consent?'☑':'☐'}</Text><Text style={{color:'#eee',flex:1,lineHeight:20}}>Согласен на обработку данных анкеты для рассмотрения заявки и связи со мной.</Text></TouchableOpacity>
 {!!error&&<Text style={{color:'#ffad9d'}}>{error}</Text>}
 <TouchableOpacity onPress={submit} disabled={pending} style={{padding:16,backgroundColor:gold,borderRadius:8,alignItems:'center'}}>{pending?<ActivityIndicator color="#111"/>:<Text style={{color:'#151515',fontWeight:'700'}}>ОТПРАВИТЬ</Text>}</TouchableOpacity>
 </>}
 </ScrollView>
}
