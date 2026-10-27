import React,{useState} from 'react';
import DressRequirements from './DressRequirements';
import {View,Text,TextInput,TouchableOpacity,ScrollView,ActivityIndicator,Image} from 'react-native';

// Configure through EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY.
// This is a separate, server-verified members area. No password or personal
// roster information is bundled into the static app.
const base=(process.env.EXPO_PUBLIC_SUPABASE_URL||'https://hqgoosnzjwpttygdbnzr.supabase.co').replace(/\/$/,'');
const anon=process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY||'sb_publishable_cngrbDtdgADG8Pt5rTDRqA_AMzZuy7V';
type Profile={id:string;role:'player'|'coach'|'admin';full_name:string;position:string|null;jersey_number:string|null;birth_date:string|null;height_cm:number|null;weight_kg:number|null;jersey_size:string|null;breeches_size:string|null;tshirt_size:string|null;shorts_size:string|null;photo_url:string|null;medical_exam_complete:boolean;rusada_complete:boolean;data_processing_consent:boolean;insurance_complete:boolean};
const C='#DEB967',B='#191919';
const fmt=(v:unknown)=>v===null||v===undefined||v===''?'Не указано':String(v);
export default function SecureClub({onBack}:{onBack:()=>void}){
 const [applications,setApplications]=useState<any[]|null>(null),[applicationError,setApplicationError]=useState(''),[sessionToken,setSessionToken]=useState('');
 const [demo,setDemo]=useState(false),[demoFlags,setDemoFlags]=useState([false,false,false,false]);
 const [login,setLogin]=useState(''),[password,setPassword]=useState(''),[profile,setProfile]=useState<Profile|null>(null),[loading,setLoading]=useState(false),[error,setError]=useState('');
 const line=(label:string,value:unknown)=><View style={{paddingVertical:10,borderBottomWidth:1,borderColor:'#383027'}}><Text style={{color:'#A5A5A5',fontSize:12}}>{label}</Text><Text style={{color:'white',fontSize:16,marginTop:4}}>{fmt(value)}</Text></View>;
 async function enter(){
   if(!base||!anon){setError('Закрытая база ещё не подключена администратором клуба.');return;}
   if(!login.trim()||!password){setError('Укажите логин и пароль.');return;}
   setError('');setLoading(true);
   try{
     const auth=await fetch(base+'/auth/v1/token?grant_type=password',{method:'POST',headers:{'content-type':'application/json',apikey:anon},body:JSON.stringify({email:login.trim(),password})});
     const response=await auth.json();
     if(!auth.ok||!response.access_token)throw new Error('Неверный логин или пароль.');
     const details=await fetch(base+'/rest/v1/club_profiles?select=*&id=eq.'+encodeURIComponent(response.user?.id||''),{headers:{apikey:anon,Authorization:'Bearer '+response.access_token}});
     if(!details.ok)throw new Error('Не удалось получить профиль. Обратитесь к администратору.');
     const rows=await details.json();
     if(!Array.isArray(rows)||rows.length!==1)throw new Error('Личный профиль ещё не назначен администратором.');
     setProfile(rows[0] as Profile);setSessionToken(response.access_token);setPassword('');
   }catch(e){setError(e instanceof Error?e.message:'Ошибка соединения');}
   finally{setLoading(false);}
 }
 const demoLine=(label:string,value:string)=><View style={{paddingVertical:10,borderBottomWidth:1,borderColor:'#383027'}}><Text style={{color:'#A5A5A5',fontSize:12}}>{label}</Text><Text style={{color:'white',fontSize:16,marginTop:4}}>{value}</Text></View>;
 async function loadApplications(){if(profile?.role!=='admin'||!sessionToken)return;setApplicationError('');try{const r=await fetch(base+'/rest/v1/recruit_applications?select=*&order=created_at.desc',{headers:{apikey:anon,Authorization:'Bearer '+sessionToken}});if(!r.ok)throw Error('Ошибка загрузки заявок');const list=await r.json();setApplications(Array.isArray(list)?list:[]);}catch(e){setApplicationError(e instanceof Error?e.message:'Нет связи');}}
 return <ScrollView contentContainerStyle={{padding:22,gap:15,backgroundColor:'#101010',minHeight:'100%'}}>
  <TouchableOpacity accessibilityRole="button" onPress={onBack}><Text style={{color:C}}>← На главную</Text></TouchableOpacity>
  <Text style={{color:C,fontWeight:'700',fontSize:14}}>МОСКОВСКИЕ СПАРТАНЦЫ</Text>
  <Text style={{color:'white',fontWeight:'700',fontSize:27}}>{demo?'ПРОТОТИП · АРСЕНИЙ ЯРЕМКО':profile?'ЛИЧНЫЙ КАБИНЕТ':'ВХОД В ЛИЧНЫЙ КАБИНЕТ'}</Text>
  {demo?<><View style={{padding:12,borderWidth:1,borderColor:C,backgroundColor:'#2b2419',gap:8}}><Text style={{color:C,fontWeight:'700'}}>ДЕМОНСТРАЦИЯ · НЕ ЗАЩИЩЁННЫЙ ВХОД</Text><Text style={{color:'#d0c5b4'}}>Это пример дизайна одного кабинета. Отметки сохраняются только до закрытия страницы. Логин и пароль в демонстрации не используются, реальные закрытые данные не показаны.</Text></View><Image source={{uri:'https://722270a-svg.github.io/ya-spartanets/player-photos/photo_062.webp'}} resizeMode="contain" style={{width:180,height:220,alignSelf:'center'}}/>{demoLine('ФИО','Арсений Яремко')}{demoLine('Роль','Игрок')}{demoLine('Позиция','FS')}{demoLine('Игровой номер','4')}{demoLine('Дата рождения','Не заполнено в публичном прототипе')}{demoLine('Рост','Не заполнено')}{demoLine('Вес','Не заполнено')}{['Размер джерси','Размер бридж','Размер футболки','Размер шорт'].map(t=><View key={t}>{demoLine(t,'Не заполнено')}</View>)}<DressRequirements/><Text style={{color:C,fontSize:17,fontWeight:'700',marginTop:10}}>Отметки · демонстрация</Text>{['Медосмотр пройден','Сертификат РУСАДА','Согласие на обработку данных','Страховка оформлена'].map((label,i)=><TouchableOpacity key={label} accessibilityRole="checkbox" accessibilityState={{checked:demoFlags[i]}} onPress={()=>setDemoFlags(old=>old.map((v,j)=>i===j?!v:v))} style={{backgroundColor:B,padding:16,borderWidth:1,borderColor:'#54452A',flexDirection:'row',gap:12}}><Text style={{color:C,fontSize:20}}>{demoFlags[i]?'☑':'☐'}</Text><Text style={{color:'white',fontSize:15,flex:1}}>{label}</Text></TouchableOpacity>)}<TouchableOpacity accessibilityRole="button" onPress={()=>{setDemo(false);setDemoFlags([false,false,false,false])}} style={{padding:15,borderWidth:1,borderColor:C,alignItems:'center'}}><Text style={{color:C}}>← К ЭКРАНУ ВХОДА</Text></TouchableOpacity></>:!profile?<><Text style={{color:'#A5A5A5',lineHeight:20}}>Доступ только по индивидуальной учётной записи. Игрок видит только свой профиль; права тренеров и администрации назначаются на сервере.</Text>
   <TextInput autoCapitalize="none" autoComplete="email" keyboardType="email-address" style={{backgroundColor:B,color:'white',padding:15,borderWidth:1,borderColor:'#55452A',borderRadius:8}} value={login} onChangeText={setLogin} placeholder="Логин (email)" placeholderTextColor="#888"/>
   <TextInput secureTextEntry autoComplete="password" style={{backgroundColor:B,color:'white',padding:15,borderWidth:1,borderColor:'#55452A',borderRadius:8}} value={password} onChangeText={setPassword} placeholder="Пароль" placeholderTextColor="#888"/>
   {!!error&&<Text style={{color:'#FFAE9D'}}>{error}</Text>}
   <TouchableOpacity accessibilityRole="button" disabled={loading} onPress={enter} style={{backgroundColor:C,borderRadius:8,padding:16,alignItems:'center'}}>{loading?<ActivityIndicator color="black"/>:<Text style={{color:'#141414',fontWeight:'700'}}>ВОЙТИ</Text>}</TouchableOpacity>
   <TouchableOpacity accessibilityRole="button" onPress={()=>setDemo(true)} style={{borderWidth:1,borderColor:C,padding:15,alignItems:'center',backgroundColor:'#30261a'}}><Text style={{color:C,fontWeight:'700'}}>ПОСМОТРЕТЬ ПРОТОТИП АРСЕНИЯ ЯРЕМКО →</Text></TouchableOpacity>
   <Text style={{color:'#888',fontSize:12}}>Логины выдаёт администратор. Никогда не вводите пароль в демонстрационную форму регистрации.</Text>
  </>:<>
   {profile.role==='admin'&&<View style={{gap:12,padding:12,borderColor:C,borderWidth:1}}><Text style={{color:C,fontWeight:'700',fontSize:18}}>ЗАЯВКИ В КОМАНДУ · ТОЛЬКО АДМИНИСТРАТОР</Text><TouchableOpacity onPress={loadApplications} style={{padding:13,backgroundColor:'#604922',alignItems:'center'}}><Text style={{color:'white'}}>ЗАГРУЗИТЬ ЗАЯВКИ</Text></TouchableOpacity>{!!applicationError&&<Text style={{color:'#f99'}}>{applicationError}</Text>}{applications?.map(a=><View key={a.id} style={{padding:12,backgroundColor:'#28241d',gap:6}}><Text style={{color:C,fontSize:17}}>{a.full_name}</Text><Text style={{color:'white'}}>Телефон: {a.phone}</Text><Text style={{color:'white'}}>ВКонтакте: {a.vk_account||'—'}</Text><Text style={{color:'white'}}>Telegram: {a.telegram_account||'—'}</Text><Text style={{color:'white'}}>Рост / вес: {a.height_cm||'—'} / {a.weight_kg||'—'}</Text><Text style={{color:'white'}}>Спортивный опыт: {a.sports_history||'—'}</Text><Text style={{color:'white'}}>Американский футбол: {a.american_football_experience==='yes'?'Да':'Нет'} · Флаг-футбол: {a.flag_football_experience==='yes'?'Да':'Нет'}</Text><Text style={{color:'#aaa'}}>{a.created_at}</Text></View>)}</View>}
   {profile.photo_url?.startsWith('https://722270a-svg.github.io/ya-spartanets/player-photos/')&&<Image source={{uri:profile.photo_url}} resizeMode="contain" style={{height:210,width:180,alignSelf:'center'}}/>}
   {profile.role==='player'&&<DressRequirements/>}
   {line('ФИО',profile.full_name)}
   {line('Роль',profile.role==='player'?'Игрок':profile.role==='coach'?'Тренер':'Администрация')}
   {line('Позиция / должность',profile.position)}
   {line('Игровой номер',profile.jersey_number)}
   {line('Дата рождения',profile.birth_date)}
   {line('Рост, см',profile.height_cm)}
   {line('Вес, кг',profile.weight_kg)}
   {line('Размер джерси',profile.jersey_size)}
   {line('Размер бридж',profile.breeches_size)}
   {line('Размер футболки',profile.tshirt_size)}
   {line('Размер шорт',profile.shorts_size)}
   {line('Медосмотр',profile.medical_exam_complete?'Отмечено':'Не отмечено')}
   {line('Сертификат РУСАДА',profile.rusada_complete?'Отмечено':'Не отмечено')}
   {line('Согласие на обработку',profile.data_processing_consent?'Отмечено':'Не отмечено')}
   {line('Страховка',profile.insurance_complete?'Отмечено':'Не отмечено')}
   <Text style={{color:'#A5A5A5'}}>Отметки отображаются из закрытой базы и не могут меняться через браузер без подтверждения администратора.</Text>
   <TouchableOpacity accessibilityRole="button" onPress={()=>{setProfile(null);setSessionToken('');setApplications(null);setLogin('');setPassword('');setError('')}} style={{borderWidth:1,borderColor:C,padding:15,alignItems:'center'}}><Text style={{color:C}}>ВЫЙТИ ИЗ КАБИНЕТА</Text></TouchableOpacity>
  </>}
 </ScrollView>
}