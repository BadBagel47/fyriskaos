var Yh="0.7.0",Qs=.016666666666666666,on={radius:.35,mass:80,walkSpeed:5.2,response:12,reach:1.3},os={bike:{class:"bike",name:"Cykel",label:{enter:"Ta cykeln",exit:"Kliv av"},length:1.8,width:.6,mass:90,circles:[{o:-.55,r:.32},{o:.55,r:.32}],maxSpeed:10,reverseSpeed:1.5,accel:5.5,brake:12,coast:1.2,drag:.05,grip:10,turnRate:3.4,turnRefSpeed:2.5,minTurn:.45,steerGain:2.4,grassFactor:1,fallImpact:4},small:{class:"car",name:"Sm\xE5bil",label:{enter:"Kliv in",exit:"Kliv ur"},length:3.6,width:1.7,mass:950,circles:[{o:-1,r:.85},{o:0,r:.85},{o:1,r:.85}],maxSpeed:19,reverseSpeed:6,accel:7,brake:20,coast:2.5,drag:.08,grip:7,turnRate:2.9,turnRefSpeed:4,minTurn:0,steerGain:2.2,grassFactor:.5,fallImpact:1/0,handbrake:{grip:1.4,turnBoost:2,decel:4,redirect:3}},car:{class:"car",name:"Bil",label:{enter:"Kliv in",exit:"Kliv ur"},length:4.4,width:1.9,mass:1300,circles:[{o:-1.35,r:.95},{o:0,r:.95},{o:1.35,r:.95}],maxSpeed:25,reverseSpeed:6,accel:9,brake:22,coast:2.5,drag:.06,grip:6,turnRate:2.4,turnRefSpeed:5,minTurn:0,steerGain:2,grassFactor:.5,fallImpact:1/0,handbrake:{grip:1.3,turnBoost:2,decel:4,redirect:3}},sport:{class:"car",name:"Sportbil",label:{enter:"Kliv in",exit:"Kliv ur"},length:4.5,width:1.95,mass:1350,circles:[{o:-1.4,r:.97},{o:0,r:.97},{o:1.4,r:.97}],maxSpeed:33.5,reverseSpeed:7,accel:14,brake:26,coast:2.5,drag:.05,grip:6.5,turnRate:2.5,turnRefSpeed:5,minTurn:0,steerGain:2,grassFactor:.45,fallImpact:1/0,handbrake:{grip:1.2,turnBoost:2.1,decel:4,redirect:3}}};async function Zh(i){let e=await fetch(i);if(!e.ok)throw new Error(`map ${e.status}`);return rp(await e.json())}function rp(i){let{width:e,height:t}=i,n=atob(i.ground.rle),s=new Uint16Array(n.length/2);for(let y=0;y<s.length;y++)s[y]=n.charCodeAt(y*2)|n.charCodeAt(y*2+1)<<8;let r=new Uint8Array(e*t),o=0;for(let y=0;y<s.length;y+=2)r.fill(s[y],o,o+s[y+1]),o+=s[y+1];let a=i.ground.types,l=[];{let y=new Uint8Array(e*t);for(let g=0;g<t;g++)for(let p=0;p<e;p++){let _=g*e+p;if(r[_]!==a.water||y[_])continue;let E=p;for(;E+1<e&&r[_+E+1-p]===a.water&&!y[_+E+1-p];)E++;let v=g;e:for(;v+1<t;){for(let w=p;w<=E;w++)if(r[(v+1)*e+w]!==a.water||y[(v+1)*e+w])break e;v++}for(let w=g;w<=v;w++)y.fill(1,w*e+p,w*e+E+1);l.push({x:p,y:g,w:E-p+1,h:v-g+1})}}let c=i.buildings,h=new Map(c.map(y=>[y.id,y]));for(let y of c)y.parts=0;for(let y of i.parts)h.get(y.b).parts++;let u=i.parts.map(y=>{let g=h.get(y.b);return{x:y.x,y:y.y,w:y.w,h:y.h,house:g,height:g.floors*3.2+1,landmark:g.landmark}}),f=i.places.gunillaklockan;f&&u.push({x:f[0]-3.2,y:f[1]-3.2,w:6.4,h:6.4,house:null,height:16,landmark:"gunillaklockan"});let d=i.start,m=[d.car,d.sport,...i.parked];return{kind:"city",width:e,height:t,north:i.north,cells:r,G:a,cellAt(y,g){let p=Math.floor(y),_=Math.floor(g);return p<0||_<0||p>=e||_>=t?0:r[_*e+p]},buildings:u,houses:c,water:l,grass:[],paths:[],trees:i.trees,lamps:i.lamps,props:i.props,roads:i.roads,bridges:i.bridges,places:i.places,start:d,spawns:{player:d.player,cars:m,bikes:[d.bike]}}}var Dl={...os.car,name:"Polisbil",maxSpeed:28,accel:10.5},op=500,$h=100,Jh=200,Kh=[3829413,11879482,5212746,14263354,6965898,3092275,15262420,3836554];function Qh(i){let e=i.map,t=e.G,n=e.places,s=M=>M===t.sidewalk||M===t.slab||M===t.path||M===t.deck,r=M=>M!==0&&M!==t.building&&M!==t.water,o={money:op,stars:0,health:100,peds:[],police:[],mission:null,target:null,phone:null,ticket:0,calm:0,seen:0,bustedFor:0};i.play=o;for(let M=0;M<3;M++){let D={id:`police${M}`,kind:"vehicle",type:"car",spec:Dl,police:!0,x:n.polis[0]+M*6,y:n.polis[1]+4,heading:0,vx:0,vy:0,color:16053490,driver:null,reversing:!1,grip:Dl.grip,handbrake:!1,mass:Dl.mass,awake:!1,ai:null};i.vehicles.push(D),o.police.push(D)}let a=M=>i.events.push({type:"toast",text:M}),l=(M,D)=>Math.hypot(M.x-D.x,M.y-D.y),c=i.player,h=(()=>{let M=12345;return()=>(M=M*16807%2147483647)/2147483647})();function u(){let M=c.vehicle;M&&(M.driver=null,M.vx=M.vy=0,c.vehicle=null)}function f([M,D]){u(),Object.assign(c,{x:M,y:D,vx:0,vy:0,stun:0})}function d(){o.stars=0,o.calm=0,o.seen=0,o.police.forEach((M,D)=>{M.ai=null,Object.assign(M,{x:n.polis[0]+D*6,y:n.polis[1]+4,vx:0,vy:0,heading:0,awake:!1})})}function m(){let M=n.vardcentraler.reduce((D,Y)=>Math.hypot(Y[0]-c.x,Y[1]-c.y)<Math.hypot(D[0]-c.x,D[1]-c.y)?Y:D);f(M),o.money=Math.max(0,o.money-$h),o.health=100,d(),o.ticket=4,a(`V\xE5rdcentralen tog ${$h} kr.`),o.mission&&o.mission.step==="deliver"&&_("Mackorna blev kvar p\xE5 olycksplatsen.")}function y(){f(n.polis),o.money=Math.max(0,o.money-Jh),d(),a(`Gripen! B\xF6ter: ${Jh} kr.`),o.mission&&o.mission.step==="deliver"&&_("Polisen beslagtog nattmackorna.")}function g(M,D){let Y=o.stars;o.stars=Math.min(3,o.stars+M),o.calm=0,o.stars>Y&&a(`${D} Efterlyst: ${"\u2605".repeat(o.stars)}`)}function p(){o.mission={step:"pickup",sandwiches:0,time:0},o.phone={from:"Punschbergs nation",text:"Sittningen har slut p\xE5 nattmackor! H\xE4mta 12 mackor p\xE5 Mackbaren och k\xF6r hit innan sittningen slutar. Swosh: 300 kr.",until:i.time+9}}function _(M){a(`Uppdraget misslyckades. ${M}`),o.mission={step:"retry",at:i.time+8}}function E(M){let D=o.mission;if(!D){i.time>4&&p();return}if(D.step==="retry"){i.time>D.at&&p();return}let Y=(c.vehicle?Math.hypot(c.vehicle.vx,c.vehicle.vy):0)<4,F=(W,Z)=>Math.hypot(c.x-W[0],c.y-W[1])<Z;if(D.step==="pickup")o.target={x:n.kiosk[0],y:n.kiosk[1],label:"Mackbaren"},F(n.kiosk,5)&&Y&&(D.step="deliver",D.sandwiches=12,D.time=120,D.goal=n.nation,D.label="Punschbergs nation",D.twisted=!1,a("Du h\xE4mtade 12 nattmackor. K\xF6r f\xF6rsiktigt: varje krock tappar en macka."));else if(D.step==="deliver"){if(D.time-=M,o.target={x:D.goal[0],y:D.goal[1],label:D.label},D.time<=0)return _("Sittningen tog slut.");if(D.sandwiches<6)return _("F\xF6r f\xE5 mackor kvar.");if(F(D.goal,6)&&Y){if(!D.twisted){D.twisted=!0,D.goal=n.slottsgard||n.slottet,D.label="Slottet",D.time+=50,o.phone={from:"Punschbergs nation",text:"Haha, fel st\xE4lle! Sittningen flyttade till Slottet. Skynda!",until:i.time+7};return}let W=300+(D.sandwiches-6)*20;o.money+=W,a(`Levererat! ${D.sandwiches} mackor. Swosh: +${W} kr.`),o.mission={step:"done"},o.target=null}}}function v(){for(let M=0;M<30;M++){let D=h()*Math.PI*2,Y=25+h()*50,F=c.x+Math.cos(D)*Y,W=c.y+Math.sin(D)*Y;if(!s(e.cellAt(F,W)))continue;let Z=Math.floor(h()*4),te=Z*(Math.PI/2);for(let J=0;J<4;J++){let se=(Z+J)%4*(Math.PI/2);if(R(F,W,se,3)){te=se;break}}return{x:F,y:W,heading:te,want:te,speed:1.1+h()*.6,pace:0,kind:Math.floor(h()*2),stand:h()<.2,shirt:Kh[Math.floor(h()*Kh.length)],down:0,look:0}}return null}function w(M){for(;o.peds.length<34;){let F=v();if(!F)break;o.peds.push(F)}let D=c.vehicle,Y=D?Math.hypot(D.vx,D.vy):0;for(let F=o.peds.length-1;F>=0;F--){let W=o.peds[F];if(l(W,c)>95){o.peds.splice(F,1);continue}if(W.down>0){W.down-=M,W.down<=0&&(W.speed=3);continue}if(D&&Y>3&&Math.hypot(W.x-D.x,W.y-D.y)<D.spec.length/2+.4){W.down=5,W.heading=Math.atan2(D.vy,D.vx),W.x+=Math.cos(W.heading)*1.2,W.y+=Math.sin(W.heading)*1.2,g(1,"Du k\xF6rde p\xE5 n\xE5gon!");continue}if(W.stand){W.pace=0;continue}S(W,M)}}function R(M,D,Y,F){let W=Math.cos(Y),Z=Math.sin(Y);for(let te=1;te<=F;te+=1)if(!s(e.cellAt(M+W*te,D+Z*te)))return!1;return!0}let x=2.2;function S(M,D){if(M.look-=D,M.look<=0){if(M.look=.4+h()*.3,R(M.x,M.y,M.want,2)){if(h()<.04){let te=M.want+(h()<.5?1:-1)*(Math.PI/2);R(M.x,M.y,te,6)&&(M.want=te)}}else{let te=h()<.5?1:-1,J=[M.want+te*(Math.PI/2),M.want-te*(Math.PI/2),M.want+Math.PI];M.want=J.find(se=>R(M.x,M.y,se,3))??J.find(se=>R(M.x,M.y,se,1))??M.want+Math.PI}M.want=Math.atan2(Math.sin(M.want),Math.cos(M.want))}let Y=M.want-M.heading;Y=Math.atan2(Math.sin(Y),Math.cos(Y)),M.heading+=Math.max(-x*D,Math.min(x*D,Y));let F=M.speed*Math.max(.25,Math.cos(Math.min(Math.PI/2,Math.abs(Y))));M.pace+=(F-M.pace)*Math.min(1,D*4);let W=M.x+Math.cos(M.heading)*M.pace*D,Z=M.y+Math.sin(M.heading)*M.pace*D;s(e.cellAt(W+Math.cos(M.heading)*.4,Z+Math.sin(M.heading)*.4))?(M.x=W,M.y=Z):M.look=0}let N=2,C=160,O=new Float32Array(C*C),T=0,U=0,P=-1;function k(){T=Math.floor(c.x/N)-C/2,U=Math.floor(c.y/N)-C/2,O.fill(1/0);let M=new Int32Array(C*C),D=0,Y=0,F=C/2*C+C/2;for(O[F]=0,M[Y++]=F;D<Y;){let W=M[D++],Z=W%C,te=(W-Z)/C;for(let[J,se]of[[1,0],[-1,0],[0,1],[0,-1]]){let Ne=Z+J,pe=te+se;if(Ne<0||pe<0||Ne>=C||pe>=C)continue;let me=pe*C+Ne;O[me]===1/0&&r(e.cellAt((T+Ne+.5)*N,(U+pe+.5)*N))&&(O[me]=O[W]+1,M[Y++]=me)}}P=i.time}let H=(M,D)=>{let Y=Math.floor(M/N)-T,F=Math.floor(D/N)-U;return Y<0||F<0||Y>=C||F>=C?1/0:O[F*C+Y]};function V(M){for(let D=0;D<60;D++){let Y=h()*Math.PI*2,F=75+h()*40,W=c.x+Math.cos(Y)*F,Z=c.y+Math.sin(Y)*F;if(!(e.cellAt(W,Z)!==t.road||H(W,Z)===1/0)){Object.assign(M,{x:W,y:Z,vx:0,vy:0,heading:Y+Math.PI,awake:!0,stuck:0,backUp:0}),M.ai={steer:"screen",stick:{x:0,y:0,m:0},brake:!1};return}}}function $(M,D){let Y=l(M,c),F=c.x-M.x,W=c.y-M.y;if(Y>9){let se=H(M.x,M.y),Ne=0,pe=0;for(let me=0;me<16;me++){let Le=me/16*Math.PI*2,ee=H(M.x+Math.cos(Le)*6,M.y+Math.sin(Le)*6);ee<se&&(se=ee,Ne=Math.cos(Le),pe=Math.sin(Le))}(Ne||pe)&&(F=Ne,W=pe)}let Z=Math.hypot(F,W)||1,te=Math.hypot(M.vx,M.vy);if(M.stuck=te<1&&Y>10?M.stuck+D:0,M.stuck>1.5&&(M.backUp=1),M.backUp>0){M.backUp-=D,M.ai.stick={x:-Math.cos(M.heading),y:-Math.sin(M.heading),m:1};return}let J=Y<9?.45:1;M.ai.stick={x:F/Z,y:W/Z,m:J},M.ai.brake=Y<6&&te>4}function B(M){let D=o.police.filter(Z=>Z.ai),Y=o.stars;for(let Z of o.police)!Z.ai&&D.length<Y&&(i.time-P>.5&&k(),V(Z),Z.ai&&D.push(Z));if(!D.length)return;i.time-P>.6&&k();let F=!1;for(let Z of D)$(Z,M),l(Z,c)<70&&(F=!0);let W=c.vehicle?Math.hypot(c.vehicle.vx,c.vehicle.vy):Math.hypot(c.vx,c.vy);if(o.seen=D.some(Z=>l(Z,c)<5)&&W<1.5?o.seen+M:0,o.seen>2)return y();if(o.calm=F?0:o.calm+M,o.calm>14)if(o.stars-=1,o.calm=0,a(o.stars?`Efterlyst: ${"\u2605".repeat(o.stars)}`:"Polisen tappade bort dig."),!o.stars)d();else{let Z=D.pop();Z.ai=null,Object.assign(Z,{x:n.polis[0],y:n.polis[1]+4,vx:0,vy:0,awake:!1})}}function L(M,D){for(let Y of D)Y.type==="hurt"&&(o.health-=Y.amount),Y.type==="policeBump"&&g(1,"Du rammade en polisbil!"),Y.type==="crash"&&o.mission&&o.mission.step==="deliver"&&o.mission.sandwiches>0&&i.time-(o.mission.lastDrop||0)>.6&&(o.mission.sandwiches-=1,o.mission.lastDrop=i.time,a(`En macka fl\xF6g ut! ${o.mission.sandwiches} kvar.`)),Y.type==="crash"&&Y.speed>14&&(o.health-=(Y.speed-14)*3);o.health<=0&&m(),o.ticket>0&&(o.ticket-=M),o.health<100&&(o.health=Math.min(100,o.health+M*1.5)),E(M),w(M),B(M),o.phone&&i.time>o.phone.until&&(o.phone=null)}return{state:o,step:L}}var jh=Math.PI*2,Nl=.12;function Ul(i){return i=(i+Math.PI)%jh,i<0&&(i+=jh),i-Math.PI}var Hi=(i,e,t)=>i<e?e:i>t?t:i;function ru(i){let e=i.spawns.player,t={id:"p1",kind:"person",x:e.x,y:e.y,vx:0,vy:0,heading:e.heading,vehicle:null,stun:0,mass:on.mass},n=[];return i.spawns.bikes.forEach((r,o)=>n.push(eu("bike",r,o))),i.spawns.cars.forEach((r,o)=>n.push(eu(r.type||"car",r,o))),{map:i,player:t,vehicles:n,time:0,events:[],shake:0,grid:ap(i)}}function eu(i,e,t){return{id:`${i}${t}`,kind:"vehicle",type:i,spec:os[i],x:e.x,y:e.y,heading:e.heading,vx:0,vy:0,color:e.color,driver:null,reversing:!1,grip:os[i].grip,handbrake:!1,mass:os[i].mass,awake:!1}}var zn=20;function ap(i){let e=Math.ceil(i.width/zn),t=Math.ceil(i.height/zn),n=Array.from({length:e*t},()=>({rects:[],circles:[]})),s=o=>{for(let a=Math.floor(o.x/zn);a<=Math.floor((o.x+o.w)/zn);a++)for(let l=Math.floor(o.y/zn);l<=Math.floor((o.y+o.h)/zn);l++)a>=0&&l>=0&&a<e&&l<t&&n[l*e+a].rects.push(o)};i.buildings.forEach(s),i.water.forEach(s);for(let o of i.props||[]){if(o.kind!=="bench")continue;let a=Math.abs(Math.sin(o.rot))<.5;s(a?{x:o.x-.9,y:o.y-.3,w:1.8,h:.6}:{x:o.x-.3,y:o.y-.9,w:.6,h:1.8})}let r=[...i.trees,...i.lamps||[],...(i.props||[]).filter(o=>o.kind==="bin").map(o=>({x:o.x,y:o.y,r:.3}))];for(let o of r){let a=Math.floor(o.x/zn),l=Math.floor(o.y/zn);a>=0&&l>=0&&a<e&&l<t&&n[l*e+a].circles.push(o)}return{cols:e,rows:t,cells:n}}function ou(i,e,t,n){n.rects.length=0,n.circles.length=0;let s=Math.floor(e/zn),r=Math.floor(t/zn);for(let o=s-1;o<=s+1;o++)for(let a=r-1;a<=r+1;a++){if(o<0||a<0||o>=i.cols||a>=i.rows)continue;let l=i.cells[a*i.cols+o];for(let c of l.rects)n.rects.includes(c)||n.rects.push(c);for(let c of l.circles)n.circles.includes(c)||n.circles.push(c)}return n}function js(i){if(i.kind==="person")return[{x:i.x,y:i.y,r:on.radius}];let e=Math.cos(i.heading),t=Math.sin(i.heading);return i.spec.circles.map(n=>({x:i.x+e*n.o,y:i.y+t*n.o,r:n.r}))}function tu(i){return i.kind==="person"?on.radius:i.spec.length/2+.2}function Fl(i,e,t,n){let s=Hi(i,n.x,n.x+n.w),r=Hi(e,n.y,n.y+n.h),o=i-s,a=e-r,l=o*o+a*a;if(l>=t*t)return null;if(l>1e-9){let m=Math.sqrt(l);return{nx:o/m,ny:a/m,pen:t-m}}let c=i-n.x,h=n.x+n.w-i,u=e-n.y,f=n.y+n.h-e,d=Math.min(c,h,u,f);return d===c?{nx:-1,ny:0,pen:c+t}:d===h?{nx:1,ny:0,pen:h+t}:d===u?{nx:0,ny:-1,pen:u+t}:{nx:0,ny:1,pen:f+t}}var lp={rects:[],circles:[]};function cp(i,e){let t=i.map,n=0,s=0,r=0;for(let o=0;o<2;o++){let a=js(e);for(let l of a){let c=ou(i.grid,l.x,l.y,lp),h=[];for(let u of c.rects){let f=Fl(l.x,l.y,l.r,u);f&&h.push(f)}for(let u of c.circles){let f=l.x-u.x,d=l.y-u.y,m=Math.hypot(f,d),y=l.r+u.r;m<y&&m>1e-6&&h.push({nx:f/m,ny:d/m,pen:y-m})}l.x-l.r<0&&h.push({nx:1,ny:0,pen:l.r-l.x}),l.y-l.r<0&&h.push({nx:0,ny:1,pen:l.r-l.y}),l.x+l.r>t.width&&h.push({nx:-1,ny:0,pen:l.x+l.r-t.width}),l.y+l.r>t.height&&h.push({nx:0,ny:-1,pen:l.y+l.r-t.height});for(let u of h){e.x+=u.nx*u.pen,e.y+=u.ny*u.pen,l.x+=u.nx*u.pen,l.y+=u.ny*u.pen;let f=e.vx*u.nx+e.vy*u.ny;if(f<0){-f>n&&(n=-f,s=u.nx,r=u.ny);let d=e.kind==="person"?1:1.2;e.vx-=d*f*u.nx,e.vy-=d*f*u.ny,e.kind==="vehicle"&&-f>2&&(e.vx*=.85,e.vy*=.85)}}}}return{impact:n,nx:s,ny:r}}function hp(i,e,t){let n=tu(e)+tu(t);if(Math.abs(e.x-t.x)>n||Math.abs(e.y-t.y)>n)return;let s=js(e),r=js(t);for(let o of s)for(let a of r){let l=a.x-o.x,c=a.y-o.y,h=Math.hypot(l,c),u=o.r+a.r;if(h>=u||h<1e-6)continue;let f=l/h,d=c/h,m=u-h,y=1/e.mass,g=1/t.mass,p=y+g;e.x-=f*m*(y/p),e.y-=d*m*(y/p),t.x+=f*m*(g/p),t.y+=d*m*(g/p);let _=(t.vx-e.vx)*f+(t.vy-e.vy)*d;if(_<0){let E=-1.2*_/p;e.vx-=E*y*f,e.vy-=E*y*d,t.vx+=E*g*f,t.vy+=E*g*d,e.awake=!0,t.awake=!0,up(i,e,t,-_)}}}function up(i,e,t,n){let s=i.player;!s.vehicle&&(e===s||t===s)&&n>5&&s.stun<=0&&(s.stun=1,po(i,"P\xE5k\xF6rd! Titta \xE5t b\xE5da h\xE5llen n\xE4sta g\xE5ng."),i.events.push({type:"hurt",amount:Math.min(60,n*4)})),s.vehicle&&n>5&&(e===s.vehicle&&t.police||t===s.vehicle&&e.police)&&i.events.push({type:"policeBump"}),s.vehicle&&(e===s.vehicle||t===s.vehicle)&&n>8&&i.events.push({type:"crash",speed:n});for(let o of[e,t])if(o.kind==="vehicle"&&o.driver&&o.spec.class==="bike"&&n>o.spec.fallImpact){let a=o===e?t:e,l=o.x-a.x,c=o.y-a.y,h=Math.hypot(l,c)||1;hu(i,o,l/h,c/h)}s.vehicle&&(e===s.vehicle||t===s.vehicle)&&n>6&&(i.shake=Math.min(1,n/15))}function dp(i,e,t){let n=i.stun>0?{x:0,y:0,m:0}:e.stick,s=on.walkSpeed*(n.m>Nl?n.m:0),r=n.m>Nl?n.x/n.m*s:0,o=n.m>Nl?n.y/n.m*s:0,a=Math.min(1,(i.stun>0?4:on.response)*t);i.vx+=(r-i.vx)*a,i.vy+=(o-i.vy)*a,Math.hypot(i.vx,i.vy)>.3&&i.stun<=0&&(i.heading=Math.atan2(i.vy,i.vx))}function fp(i,e,t){if(i.map.cells)return i.map.cellAt(e,t)===i.map.G.grass;for(let n of i.map.grass)if(e>=n.x&&e<=n.x+n.w&&t>=n.y&&t<=n.y+n.h){for(let s of i.map.paths)if(e>=s.x&&e<=s.x+s.w&&t>=s.y&&t<=s.y+s.h)return!1;return!0}return!1}var as=.15,nu=i=>Math.abs(i)<as?0:(i-Math.sign(i)*as)/(1-as),iu=.5,pp=115*Math.PI/180,mp=135*Math.PI/180;function gp(i,e,t){let n=e.m>as?Math.min(1,(e.m-as)/(1-as)):0;if(!n)return t>-.3&&(i.reversing=!1),{throttle:0,brake:0,turn:0};let s=Math.atan2(e.y,e.x),r=Ul(s-i.heading),o=Ul(s-i.heading-Math.PI),a=()=>({throttle:-n,brake:0,turn:-Hi(o/iu,-1,1)});if(i.reversing){if(Math.abs(r)>Math.PI/2.2)return a();if(t<-.5)return{throttle:0,brake:n,turn:0};i.reversing=!1}return Math.abs(r)<=pp?{throttle:n*Math.max(.35,Math.cos(Math.min(Math.abs(r),Math.PI/2))),brake:0,turn:Hi(r/iu,-1,1)}:t>1.2?{throttle:0,brake:n,turn:0}:Math.abs(r)>=mp&&i.spec.class==="car"?(i.reversing=!0,a()):{throttle:.5*n,brake:0,turn:Math.sign(r)}}function su(i,e,t,n){let s=e.spec,r=Math.cos(e.heading),o=Math.sin(e.heading),a=e.vx*r+e.vy*o,l=-e.vx*o+e.vy*r,c=t.stick,h=0,u=0,f;if(t.steer==="screen"){let x=gp(e,c,a);h=x.throttle,u=x.brake,f=x.turn}else{let x=nu(-c.y);f=nu(c.x),x>=0?e.reversing=!1:a<.5&&(e.reversing=!0),x>0?h=x:x<0&&(h=e.reversing?x:0),x<0&&!e.reversing&&(u=-x)}let d=u>0;e.braking=d||t.brake;let m=fp(i,e.x,e.y)?s.grassFactor:1,y=s.maxSpeed*m,g=Hi(f,-1,1)*(a<-.2?-1:1),p=s.handbrake,_=a>6&&Math.abs(f)>.35;e.handbrake=!!(p&&t.brake&&!e.reversing&&(e.handbrake?a>3:_));let E=e.handbrake?p.grip:s.grip;if(e.grip+=(E-e.grip)*Math.min(1,(e.handbrake?12:2.5)*n),e.handbrake){a=Math.max(0,a-p.decel*n);let x=l*Math.min(1,p.redirect*n);l-=x,a+=Math.abs(x)*.85}else if(t.brake||d){let x=s.brake*n*(d&&!t.brake?Math.max(.4,u):1);a>0?a=Math.max(0,a-x):a=Math.min(0,a+x)}else if(h>0)a<y?a=Math.min(y,a+s.accel*h*n):a-=(a-y)*Math.min(1,2*n),a<0&&(a=Math.min(0,a+s.brake*n));else if(h<0)a=Math.max(-s.reverseSpeed,a+s.accel*h*.6*n);else{let x=s.coast*n;a=a>0?Math.max(0,a-x):Math.min(0,a+x)}a-=a*s.drag*n,m<1&&Math.abs(a)>y&&(a-=(a-Math.sign(a)*y)*Math.min(1,3*n)),l*=Math.exp(-e.grip*n),e.vx=r*a-o*l,e.vy=o*a+r*l;let v=Hi(Math.abs(a)/s.turnRefSpeed,s.minTurn,1),w=1-.35*Hi(Math.abs(a)/s.maxSpeed,0,1),R=e.handbrake?p.turnBoost/w:1;e.heading=Ul(e.heading+g*s.turnRate*v*w*R*n)}function xp(i,e){let t=Math.cos(i.heading),n=Math.sin(i.heading),s=i.vx*t+i.vy*n,r=-i.vx*n+i.vy*t,o=i.spec.brake*.4*e;s=s>0?Math.max(0,s-o):Math.min(0,s+o),r*=Math.exp(-i.spec.grip*e),i.vx=t*s-n*r,i.vy=n*s+t*r,Math.abs(i.vx)+Math.abs(i.vy)<.01&&(i.vx=0,i.vy=0,i.awake=!1)}function au(i){let e=i.player,t=null,n=on.reach;for(let s of i.vehicles)if(!s.driver)for(let r of js(s)){let o=Math.hypot(r.x-e.x,r.y-e.y)-r.r-on.radius;o<n&&(n=o,t=s)}return t}function lu(i){let e=i.player;if(e.stun>0)return null;if(e.vehicle)return e.vehicle.spec.label.exit;let t=au(i);return t?t.spec.label.enter:null}function _p(i){let e=i.player;if(e.stun>0)return;if(e.vehicle){yp(i,e.vehicle);return}let t=au(i);t&&(e.vehicle=t,t.driver=e,t.reversing=!1,t.awake=!0,i.events.push({type:"enter",vehicle:t}),e.vx=0,e.vy=0)}function cu(i,e,t){let n={kind:"person",x:e,y:t,vx:0,vy:0},s=ou(i.grid,e,t,{rects:[],circles:[]});for(let r of s.rects)if(Fl(e,t,on.radius+.05,r))return!1;for(let r of s.circles)if(Math.hypot(r.x-e,r.y-t)<r.r+on.radius)return!1;for(let r of s.rects)if(Fl(e,t,on.radius,r))return!1;for(let r of i.vehicles)if(r!==i.player.vehicle){for(let o of js(r))if(Math.hypot(o.x-n.x,o.y-n.y)<o.r+on.radius)return!1}return e>.5&&t>.5&&e<i.map.width-.5&&t<i.map.height-.5}function yp(i,e){let t=i.player,n=Math.cos(e.heading),s=Math.sin(e.heading),r=e.spec.width/2+on.radius+.2,o=e.spec.length/2+on.radius+.2,a=[[s*r,-n*r],[-s*r,n*r],[-n*o,-s*o],[n*o,s*o]],l=null;for(let[h,u]of a)if(cu(i,e.x+h,e.y+u)){l=[e.x+h,e.y+u];break}if(!l){po(i,"Det g\xE5r inte att kliva ur h\xE4r.");return}let c=Math.hypot(e.vx,e.vy);t.vehicle=null,e.driver=null,e.handbrake=!1,e.grip=e.spec.grip,t.x=l[0],t.y=l[1],t.heading=e.heading,c>4?(t.vx=e.vx*.4,t.vy=e.vy*.4,t.stun=.8,po(i,e.spec.class==="bike"?"Du hoppade av i farten.":"Du kastade dig ut ur bilen. Snyggt.")):(t.vx=0,t.vy=0)}function hu(i,e,t,n){let s=i.player;if(s.vehicle!==e)return;s.vehicle=null,e.driver=null;let r=e.x+t*1.1,o=e.y+n*1.1;cu(i,r,o)||(r=e.x,o=e.y),s.x=r,s.y=o,s.vx=t*2,s.vy=n*2,s.stun=1.2,e.vx*=.3,e.vy*=.3,i.shake=.6,po(i,"Aj! Du ramlade av cykeln."),i.events.push({type:"hurt",amount:15})}function po(i,e){i.events.push({type:"toast",text:e})}function uu(i,e,t){i.time+=t;let n=i.player;e.consumeAction()&&_p(i),n.vehicle?su(i,n.vehicle,e,t):dp(n,e,t),i.braking=!!(n.vehicle&&n.vehicle.braking);for(let o of i.vehicles)o.ai&&!o.driver&&su(i,o,o.ai,t);for(let o of i.vehicles)!o.driver&&!o.ai&&o.awake&&xp(o,t);let s=[];n.vehicle||s.push(n);for(let o of i.vehicles)(o.driver||o.awake||o.ai)&&s.push(o);for(let o of s)o.x+=o.vx*t,o.y+=o.vy*t;let r=n.vehicle?i.vehicles:[n,...i.vehicles];for(let o of s)for(let a of r)a!==o&&(!s.includes(a)||s.indexOf(a)>s.indexOf(o))&&hp(i,o,a);for(let o of[...s,...i.vehicles.filter(a=>a.awake&&!s.includes(a))]){let a=cp(i,o);o.kind==="vehicle"&&o.driver&&a.impact>0&&(o.spec.class==="bike"&&a.impact>o.spec.fallImpact?hu(i,o,a.nx,a.ny):a.impact>6&&(i.shake=Math.min(1,a.impact/15)),a.impact>8&&i.events.push({type:"crash",speed:a.impact}))}n.vehicle&&(n.x=n.vehicle.x,n.y=n.vehicle.y,n.heading=n.vehicle.heading),n.stun>0&&(n.stun=Math.max(0,n.stun-t)),i.shake=Math.max(0,i.shake-t*2)}function du(i){let e={stick:{x:0,y:0,m:0},brake:!1,enabled:!1,touchSteer:"screen",steer:"classic",actionQueued:!1,consumeAction(){let d=this.actionQueued;return this.actionQueued=!1,d&&this.enabled}},t=new Set,n=()=>{let d=0,m=0;(t.has("ArrowLeft")||t.has("KeyA"))&&(d-=1),(t.has("ArrowRight")||t.has("KeyD"))&&(d+=1),(t.has("ArrowUp")||t.has("KeyW"))&&(m-=1),(t.has("ArrowDown")||t.has("KeyS"))&&(m+=1);let y=Math.hypot(d,m);return y?{x:d/y,y:m/y,m:1}:null};window.addEventListener("keydown",d=>{(d.code==="Space"||d.code.startsWith("Arrow"))&&d.preventDefault(),!d.repeat&&(d.code==="KeyE"||d.code==="Enter")&&(e.actionQueued=!0),t.add(d.code)}),window.addEventListener("keyup",d=>t.delete(d.code)),window.addEventListener("blur",()=>t.clear());let s=null,r=0,o=0,a={x:0,y:0,m:0},l=(d,m)=>{i.joy.hidden=!1,i.joy.style.transform=`translate(${r}px, ${o}px)`,i.knob.style.transform=`translate(${d}px, ${m}px)`};i.surface.addEventListener("pointerdown",d=>{s===null&&(d.pointerType!=="mouse"&&d.clientX>window.innerWidth*.6||(s=d.pointerId,r=d.clientX,o=d.clientY,a={x:0,y:0,m:0},i.surface.setPointerCapture?.(d.pointerId),l(0,0),d.preventDefault()))}),i.surface.addEventListener("pointermove",d=>{if(d.pointerId!==s)return;let m=d.clientX-r,y=d.clientY-o,g=Math.hypot(m,y);g>60&&(r+=m/g*(g-60),o+=y/g*(g-60),m=d.clientX-r,y=d.clientY-o);let p=Math.min(1,Math.hypot(m,y)/60);a=p>0?{x:m/60,y:y/60,m:p}:{x:0,y:0,m:0},l(m,y)});let c=d=>{d.pointerId===s&&(s=null,a={x:0,y:0,m:0},i.joy.hidden=!0)};i.surface.addEventListener("pointerup",c),i.surface.addEventListener("pointercancel",c),i.action.addEventListener("pointerdown",d=>{d.preventDefault(),e.actionQueued=!0});let h=d=>{d.preventDefault(),i.brake.classList.add("down"),f=!0},u=()=>{i.brake.classList.remove("down"),f=!1},f=!1;i.brake.addEventListener("pointerdown",h),i.brake.addEventListener("pointerup",u),i.brake.addEventListener("pointercancel",u),i.brake.addEventListener("pointerleave",u);for(let d of["touchstart","touchmove","gesturestart","contextmenu"])document.addEventListener(d,m=>m.target.closest?.(".overlay")||m.preventDefault(),{passive:!1});return e.update=()=>{let d=n();e.stick=e.enabled?d||a:{x:0,y:0,m:0},e.steer=d?"classic":e.touchSteer,e.brake=e.enabled&&(f||t.has("Space"))},e}function fu(i){let e=0,t;return{update(n,s,r){s!==t&&(t=s,i.action.hidden=!s,s&&(i.action.textContent=s));let o=n.player.vehicle;i.brake.hidden=!o,i.speed.hidden=!o,o&&(i.speed.textContent=`${o.spec.name} \xB7 ${Math.round(Math.hypot(o.vx,o.vy)*3.6)} km/h`),e>0&&(e-=r,e<=0&&(i.toast.hidden=!0))},toast(n){i.toast.textContent=n,i.toast.hidden=!1,e=2.5}}}function mu(i){let e=(i%600+600)%600/600;return e<.4?0:e<.5?pu((e-.4)/.1):e<.9?1:1-pu((e-.9)/.1)}function pu(i){return i*i*(3-2*i)}var Ju=0,xc=1,Ku=2;var Qi=1,Qu=2,ks=3,Zn=0,Wt=1,Zt=2,ai=0,zs=1,Tn=2,_c=3,yc=4,ju=5;var ji=100,ed=101,td=102,nd=103,id=104,sd=200,rd=201,od=202,ad=203,vc=204,Mc=205,ld=206,cd=207,hd=208,ud=209,dd=210,fd=211,pd=212,md=213,gd=214,Ho=0,Go=1,Vo=2,Es=3,Wo=4,Xo=5,qo=6,Yo=7,Sc=0,xd=1,_d=2,An=0,kr=1,zr=2,Hr=3,Ii=4,Gr=5,Vr=6,Wr=7;var bc=300,es=301,Hs=302,Xr=303,Sa=304,Vn=1e3,Nn=1001,Zo=1002,Vt=1003,yd=1004;var qr=1005;var Yt=1006,ba=1007;var On=1008;var hn=1009,Ec=1010,wc=1011,Gs=1012,Ea=1013,Bn=1014,un=1015,Nt=1016,wa=1017,Ta=1018,ts=1020,Tc=35902,Ac=35899,Rc=1021,Cc=1022,yn=1023,ri=1026,li=1027,Aa=1028,Ra=1029,Li=1030,Ca=1031;var Pa=1033,Yr=33776,Zr=33777,$r=33778,Jr=33779,Ia=35840,La=35841,Da=35842,Na=35843,Ua=36196,Fa=37492,Oa=37496,Ba=37488,ka=37489,Kr=37490,za=37491,Ha=37808,Ga=37809,Va=37810,Wa=37811,Xa=37812,qa=37813,Ya=37814,Za=37815,$a=37816,Ja=37817,Ka=37818,Qa=37819,ja=37820,el=37821,tl=36492,nl=36494,il=36495,sl=36283,rl=36284,Qr=36285,ol=36286;var ur=2300,$o=2301,Bo=2302,oc=2303,ac=2400,lc=2401,cc=2402;var vd=3200;var al=0,Md=1,ci="",At="srgb",dr="srgb-linear",fr="linear",pt="srgb";var ko=7680;var Sd=519,bd=512,Ed=513,wd=514,Pc=515,Td=516,Ad=517,Ic=518,Lc=519,Dc=35044,Nc=35048;var Uc="300 es",En=2e3,ws=2001;function vp(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Mp(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Ts(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Rd(){let i=Ts("canvas");return i.style.display="block",i}var gu={},As=null;function pr(...i){let e="THREE."+i.shift();As?As("log",e,...i):console.log(e,...i)}function Cd(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ye(...i){i=Cd(i);let e="THREE."+i.shift();if(As)As("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function $e(...i){i=Cd(i);let e="THREE."+i.shift();if(As)As("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function qi(...i){let e=i.join(" ");e in gu||(gu[e]=!0,Ye(...i))}function Pd(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Id={[Ho]:Ho,[Vo]:qo,[Wo]:Wo,[Es]:Xo,[Go]:Go,[qo]:Vo,[Yo]:Yo,[Xo]:Es},Wn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},Kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],xu=1234567,ar=Math.PI/180,Rs=180/Math.PI;function hi(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Kt[i&255]+Kt[i>>8&255]+Kt[i>>16&255]+Kt[i>>24&255]+"-"+Kt[e&255]+Kt[e>>8&255]+"-"+Kt[e>>16&15|64]+Kt[e>>24&255]+"-"+Kt[t&63|128]+Kt[t>>8&255]+"-"+Kt[t>>16&255]+Kt[t>>24&255]+Kt[n&255]+Kt[n>>8&255]+Kt[n>>16&255]+Kt[n>>24&255]).toLowerCase()}function ot(i,e,t){return Math.max(e,Math.min(t,i))}function Fc(i,e){return(i%e+e)%e}function Sp(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function bp(i,e,t){return i!==e?(t-i)/(e-i):0}function lr(i,e,t){return(1-t)*i+t*e}function Ep(i,e,t,n){return lr(i,e,1-Math.exp(-t*n))}function wp(i,e=1){return e-Math.abs(Fc(i,e*2)-e)}function Tp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Ap(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Rp(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Cp(i,e){return i+Math.random()*(e-i)}function Pp(i){return i*(.5-Math.random())}function Ip(i){i!==void 0&&(xu=i);let e=xu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Lp(i){return i*ar}function Dp(i){return i*Rs}function Np(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Up(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Oc(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Fp(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),f=o((e-n)/2),d=r((n-e)/2),m=o((n-e)/2);switch(s){case"XYX":i.set(a*h,l*u,l*f,a*c);break;case"YZY":i.set(l*f,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*f,a*h,a*c);break;case"XZX":i.set(a*h,l*m,l*d,a*c);break;case"YXY":i.set(l*d,a*h,l*m,a*c);break;case"ZYZ":i.set(l*m,l*d,a*h,a*c);break;default:Ye("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ll(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Bc(i,e){if(e.constructor===Float32Array)return i;let t=ll(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/t,-1)}function kc(i,e){if(e.constructor===Float32Array)return i;let t=ll(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*t)}var kn={DEG2RAD:ar,RAD2DEG:Rs,generateUUID:hi,clamp:ot,euclideanModulo:Fc,mapLinear:Sp,inverseLerp:bp,lerp:lr,damp:Ep,pingpong:wp,smoothstep:Tp,smootherstep:Ap,randInt:Rp,randFloat:Cp,randFloatSpread:Pp,seededRandom:Ip,degToRad:Lp,radToDeg:Dp,isPowerOfTwo:Np,ceilPowerOfTwo:Up,floorPowerOfTwo:Oc,setQuaternionFromProperEuler:Fp,normalize:kc,denormalize:Bc},Xc=class Xc{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Xc.prototype.isVector2=!0;var fe=Xc,Ot=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3],f=r[o+0],d=r[o+1],m=r[o+2],y=r[o+3];if(u!==y||l!==f||c!==d||h!==m){let g=l*f+c*d+h*m+u*y;g<0&&(f=-f,d=-d,m=-m,y=-y,g=-g);let p=1-a;if(g<.9995){let _=Math.acos(g),E=Math.sin(_);p=Math.sin(p*_)/E,a=Math.sin(a*_)/E,l=l*p+f*a,c=c*p+d*a,h=h*p+m*a,u=u*p+y*a}else{l=l*p+f*a,c=c*p+d*a,h=h*p+m*a,u=u*p+y*a;let _=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=_,c*=_,h*=_,u*=_}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],f=r[o+1],d=r[o+2],m=r[o+3];return e[t]=a*m+h*u+l*d-c*f,e[t+1]=l*m+h*f+c*u-a*d,e[t+2]=c*m+h*d+a*f-l*u,e[t+3]=h*m-a*u-l*f-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),f=l(n/2),d=l(s/2),m=l(r/2);switch(o){case"XYZ":this._x=f*h*u+c*d*m,this._y=c*d*u-f*h*m,this._z=c*h*m+f*d*u,this._w=c*h*u-f*d*m;break;case"YXZ":this._x=f*h*u+c*d*m,this._y=c*d*u-f*h*m,this._z=c*h*m-f*d*u,this._w=c*h*u+f*d*m;break;case"ZXY":this._x=f*h*u-c*d*m,this._y=c*d*u+f*h*m,this._z=c*h*m+f*d*u,this._w=c*h*u-f*d*m;break;case"ZYX":this._x=f*h*u-c*d*m,this._y=c*d*u+f*h*m,this._z=c*h*m-f*d*u,this._w=c*h*u+f*d*m;break;case"YZX":this._x=f*h*u+c*d*m,this._y=c*d*u+f*h*m,this._z=c*h*m-f*d*u,this._w=c*h*u-f*d*m;break;case"XZY":this._x=f*h*u-c*d*m,this._y=c*d*u-f*h*m,this._z=c*h*m+f*d*u,this._w=c*h*u+f*d*m;break;default:Ye("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],f=n+a+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(o-s)*d}else if(n>a&&n>u){let d=2*Math.sqrt(1+n-a-u);this._w=(h-l)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+c)/d}else if(a>u){let d=2*Math.sqrt(1+a-n-u);this._w=(r-c)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(l+h)/d}else{let d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ot(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let l=1-t;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},qc=class qc{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(_u.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(_u.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ol.copy(this).projectOnVector(e),this.sub(Ol)}reflect(e){return this.sub(Ol.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};qc.prototype.isVector3=!0;var z=qc,Ol=new z,_u=new Ot,Yc=class Yc{constructor(e,t,n,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){let h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],m=n[8],y=s[0],g=s[3],p=s[6],_=s[1],E=s[4],v=s[7],w=s[2],R=s[5],x=s[8];return r[0]=o*y+a*_+l*w,r[3]=o*g+a*E+l*R,r[6]=o*p+a*v+l*x,r[1]=c*y+h*_+u*w,r[4]=c*g+h*E+u*R,r[7]=c*p+h*v+u*x,r[2]=f*y+d*_+m*w,r[5]=f*g+d*E+m*R,r[8]=f*p+d*v+m*x,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,f=a*l-h*r,d=c*r-o*l,m=t*u+n*f+s*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/m;return e[0]=u*y,e[1]=(s*c-h*n)*y,e[2]=(a*n-s*o)*y,e[3]=f*y,e[4]=(h*t-s*l)*y,e[5]=(s*r-a*t)*y,e[6]=d*y,e[7]=(n*l-c*t)*y,e[8]=(o*t-n*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return qi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Bl.makeScale(e,t)),this}rotate(e){return qi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Bl.makeRotation(-e)),this}translate(e,t){return qi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Bl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Yc.prototype.isMatrix3=!0;var Ke=Yc,Bl=new Ke,yu=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),vu=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Op(){let i={enabled:!0,workingColorSpace:dr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===pt&&(s.r=si(s.r),s.g=si(s.g),s.b=si(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===pt&&(s.r=bs(s.r),s.g=bs(s.g),s.b=bs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ci?fr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[dr]:{primaries:e,whitePoint:n,transfer:fr,toXYZ:yu,fromXYZ:vu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:At},outputColorSpaceConfig:{drawingBufferColorSpace:At}},[At]:{primaries:e,whitePoint:n,transfer:pt,toXYZ:yu,fromXYZ:vu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:At}}}),i}var at=Op();function si(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function bs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ls,Jo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ls===void 0&&(ls=Ts("canvas")),ls.width=e.width,ls.height=e.height;let s=ls.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=ls}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Ts("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=si(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(si(t[n]/255)*255):t[n]=si(t[n]);return{data:t,width:e.width,height:e.height}}else return Ye("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Bp=0,Cs=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Bp++}),this.uuid=hi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(kl(s[o].image)):r.push(kl(s[o]))}else r=kl(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function kl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Jo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ye("Texture: Unable to serialize Texture."),{})}var kp=0,zl=new z,jt=class i extends Wn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Nn,s=Nn,r=Yt,o=On,a=yn,l=hn,c=i.DEFAULT_ANISOTROPY,h=ci){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:kp++}),this.uuid=hi(),this.name="",this.source=new Cs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new fe(0,0),this.repeat=new fe(1,1),this.center=new fe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(zl).x}get height(){return this.source.getSize(zl).y}get depth(){return this.source.getSize(zl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ye(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ye(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==bc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Vn:e.x=e.x-Math.floor(e.x);break;case Nn:e.x=e.x<0?0:1;break;case Zo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Vn:e.y=e.y-Math.floor(e.y);break;case Nn:e.y=e.y<0?0:1;break;case Zo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};jt.DEFAULT_IMAGE=null;jt.DEFAULT_MAPPING=bc;jt.DEFAULT_ANISOTROPY=1;var Zc=class Zc{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],m=l[9],y=l[2],g=l[6],p=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-y)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+y)<.1&&Math.abs(m+g)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let E=(c+1)/2,v=(d+1)/2,w=(p+1)/2,R=(h+f)/4,x=(u+y)/4,S=(m+g)/4;return E>v&&E>w?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=R/n,r=x/n):v>w?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=R/s,r=S/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=x/r,s=S/r),this.set(n,s,r,t),this}let _=Math.sqrt((g-m)*(g-m)+(u-y)*(u-y)+(f-h)*(f-h));return Math.abs(_)<.001&&(_=1),this.x=(g-m)/_,this.y=(u-y)/_,this.z=(f-h)/_,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this.w=ot(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this.w=ot(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Zc.prototype.isVector4=!0;var gt=Zc,Ko=class extends Wn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Yt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new gt(0,0,e,t),this.scissorTest=!1,this.viewport=new gt(0,0,e,t),this.textures=[];let s=n.count;for(let r=0;r<s;r++)this.textures[r]=new jt({width:e,height:t,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Yt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Cs(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Pt=class extends Ko{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},mr=class extends jt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=Nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Qo=class extends jt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=Nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Ma=class Ma{constructor(e,t,n,s,r,o,a,l,c,h,u,f,d,m,y,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,h,u,f,d,m,y,g)}set(e,t,n,s,r,o,a,l,c,h,u,f,d,m,y,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=m,p[11]=y,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ma().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/cs.setFromMatrixColumn(e,0).length(),r=1/cs.setFromMatrixColumn(e,1).length(),o=1/cs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let f=o*h,d=o*u,m=a*h,y=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=d+m*c,t[5]=f-y*c,t[9]=-a*l,t[2]=y-f*c,t[6]=m+d*c,t[10]=o*l}else if(e.order==="YXZ"){let f=l*h,d=l*u,m=c*h,y=c*u;t[0]=f+y*a,t[4]=m*a-d,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=d*a-m,t[6]=y+f*a,t[10]=o*l}else if(e.order==="ZXY"){let f=l*h,d=l*u,m=c*h,y=c*u;t[0]=f-y*a,t[4]=-o*u,t[8]=m+d*a,t[1]=d+m*a,t[5]=o*h,t[9]=y-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let f=o*h,d=o*u,m=a*h,y=a*u;t[0]=l*h,t[4]=m*c-d,t[8]=f*c+y,t[1]=l*u,t[5]=y*c+f,t[9]=d*c-m,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let f=o*l,d=o*c,m=a*l,y=a*c;t[0]=l*h,t[4]=y-f*u,t[8]=m*u+d,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=d*u+m,t[10]=f-y*u}else if(e.order==="XZY"){let f=o*l,d=o*c,m=a*l,y=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=f*u+y,t[5]=o*h,t[9]=d*u-m,t[2]=m*u-d,t[6]=a*h,t[10]=y*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(zp,e,Hp)}lookAt(e,t,n){let s=this.elements;return pn.subVectors(e,t),pn.lengthSq()===0&&(pn.z=1),pn.normalize(),mi.crossVectors(n,pn),mi.lengthSq()===0&&(Math.abs(n.z)===1?pn.x+=1e-4:pn.z+=1e-4,pn.normalize(),mi.crossVectors(n,pn)),mi.normalize(),mo.crossVectors(pn,mi),s[0]=mi.x,s[4]=mo.x,s[8]=pn.x,s[1]=mi.y,s[5]=mo.y,s[9]=pn.y,s[2]=mi.z,s[6]=mo.z,s[10]=pn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],m=n[2],y=n[6],g=n[10],p=n[14],_=n[3],E=n[7],v=n[11],w=n[15],R=s[0],x=s[4],S=s[8],N=s[12],C=s[1],O=s[5],T=s[9],U=s[13],P=s[2],k=s[6],H=s[10],V=s[14],$=s[3],B=s[7],L=s[11],M=s[15];return r[0]=o*R+a*C+l*P+c*$,r[4]=o*x+a*O+l*k+c*B,r[8]=o*S+a*T+l*H+c*L,r[12]=o*N+a*U+l*V+c*M,r[1]=h*R+u*C+f*P+d*$,r[5]=h*x+u*O+f*k+d*B,r[9]=h*S+u*T+f*H+d*L,r[13]=h*N+u*U+f*V+d*M,r[2]=m*R+y*C+g*P+p*$,r[6]=m*x+y*O+g*k+p*B,r[10]=m*S+y*T+g*H+p*L,r[14]=m*N+y*U+g*V+p*M,r[3]=_*R+E*C+v*P+w*$,r[7]=_*x+E*O+v*k+w*B,r[11]=_*S+E*T+v*H+w*L,r[15]=_*N+E*U+v*V+w*M,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],f=e[10],d=e[14],m=e[3],y=e[7],g=e[11],p=e[15],_=l*d-c*f,E=a*d-c*u,v=a*f-l*u,w=o*d-c*h,R=o*f-l*h,x=o*u-a*h;return t*(y*_-g*E+p*v)-n*(m*_-g*w+p*R)+s*(m*E-y*w+p*x)-r*(m*v-y*R+g*x)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],o=e[5],a=e[9],l=e[2],c=e[6],h=e[10];return t*(o*h-a*c)-n*(r*h-a*l)+s*(r*c-o*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],f=e[10],d=e[11],m=e[12],y=e[13],g=e[14],p=e[15],_=t*a-n*o,E=t*l-s*o,v=t*c-r*o,w=n*l-s*a,R=n*c-r*a,x=s*c-r*l,S=h*y-u*m,N=h*g-f*m,C=h*p-d*m,O=u*g-f*y,T=u*p-d*y,U=f*p-d*g,P=_*U-E*T+v*O+w*C-R*N+x*S;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let k=1/P;return e[0]=(a*U-l*T+c*O)*k,e[1]=(s*T-n*U-r*O)*k,e[2]=(y*x-g*R+p*w)*k,e[3]=(f*R-u*x-d*w)*k,e[4]=(l*C-o*U-c*N)*k,e[5]=(t*U-s*C+r*N)*k,e[6]=(g*v-m*x-p*E)*k,e[7]=(h*x-f*v+d*E)*k,e[8]=(o*T-a*C+c*S)*k,e[9]=(n*C-t*T-r*S)*k,e[10]=(m*R-y*v+p*_)*k,e[11]=(u*v-h*R-d*_)*k,e[12]=(a*N-o*O-l*S)*k,e[13]=(t*O-n*N+s*S)*k,e[14]=(y*E-m*w-g*_)*k,e[15]=(h*w-u*E+f*_)*k,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,f=r*c,d=r*h,m=r*u,y=o*h,g=o*u,p=a*u,_=l*c,E=l*h,v=l*u,w=n.x,R=n.y,x=n.z;return s[0]=(1-(y+p))*w,s[1]=(d+v)*w,s[2]=(m-E)*w,s[3]=0,s[4]=(d-v)*R,s[5]=(1-(f+p))*R,s[6]=(g+_)*R,s[7]=0,s[8]=(m+E)*x,s[9]=(g-_)*x,s[10]=(1-(f+y))*x,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let o=cs.set(s[0],s[1],s[2]).length(),a=cs.set(s[4],s[5],s[6]).length(),l=cs.set(s[8],s[9],s[10]).length();r<0&&(o=-o),In.copy(this);let c=1/o,h=1/a,u=1/l;return In.elements[0]*=c,In.elements[1]*=c,In.elements[2]*=c,In.elements[4]*=h,In.elements[5]*=h,In.elements[6]*=h,In.elements[8]*=u,In.elements[9]*=u,In.elements[10]*=u,t.setFromRotationMatrix(In),n.x=o,n.y=a,n.z=l,this}makePerspective(e,t,n,s,r,o,a=En,l=!1){let c=this.elements,h=2*r/(t-e),u=2*r/(n-s),f=(t+e)/(t-e),d=(n+s)/(n-s),m,y;if(l)m=r/(o-r),y=o*r/(o-r);else if(a===En)m=-(o+r)/(o-r),y=-2*o*r/(o-r);else if(a===ws)m=-o/(o-r),y=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=En,l=!1){let c=this.elements,h=2/(t-e),u=2/(n-s),f=-(t+e)/(t-e),d=-(n+s)/(n-s),m,y;if(l)m=1/(o-r),y=o/(o-r);else if(a===En)m=-2/(o-r),y=-(o+r)/(o-r);else if(a===ws)m=-1/(o-r),y=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=u,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=m,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Ma.prototype.isMatrix4=!0;var We=Ma,cs=new z,In=new We,zp=new z(0,0,0),Hp=new z(1,1,1),mi=new z,mo=new z,pn=new z,Mu=new We,Su=new Ot,Un=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(ot(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ot(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ot(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ot(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ot(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-ot(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Ye("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Mu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Mu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Su.setFromEuler(this),this.setFromQuaternion(Su,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Un.DEFAULT_ORDER="XYZ";var gr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Gp=0,bu=new z,hs=new Ot,jn=new We,go=new z,er=new z,Vp=new z,Wp=new Ot,Eu=new z(1,0,0),wu=new z(0,1,0),Tu=new z(0,0,1),Au={type:"added"},Xp={type:"removed"},us={type:"childadded",child:null},Hl={type:"childremoved",child:null},en=class i extends Wn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Gp++}),this.uuid=hi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new z,t=new Un,n=new Ot,s=new z(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new We},normalMatrix:{value:new Ke}}),this.matrix=new We,this.matrixWorld=new We,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new gr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return hs.setFromAxisAngle(e,t),this.quaternion.multiply(hs),this}rotateOnWorldAxis(e,t){return hs.setFromAxisAngle(e,t),this.quaternion.premultiply(hs),this}rotateX(e){return this.rotateOnAxis(Eu,e)}rotateY(e){return this.rotateOnAxis(wu,e)}rotateZ(e){return this.rotateOnAxis(Tu,e)}translateOnAxis(e,t){return bu.copy(e).applyQuaternion(this.quaternion),this.position.add(bu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Eu,e)}translateY(e){return this.translateOnAxis(wu,e)}translateZ(e){return this.translateOnAxis(Tu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(jn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?go.copy(e):go.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),er.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?jn.lookAt(er,go,this.up):jn.lookAt(go,er,this.up),this.quaternion.setFromRotationMatrix(jn),s&&(jn.extractRotation(s.matrixWorld),hs.setFromRotationMatrix(jn),this.quaternion.premultiply(hs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?($e("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Au),us.child=e,this.dispatchEvent(us),us.child=null):$e("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Xp),Hl.child=e,this.dispatchEvent(Hl),Hl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),jn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),jn.multiply(e.parent.matrixWorld)),e.applyMatrix4(jn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Au),us.child=e,this.dispatchEvent(us),us.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,e,Vp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,Wp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),f=o(e.skeletons),d=o(e.animations),m=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};en.DEFAULT_UP=new z(0,1,0);en.DEFAULT_MATRIX_AUTO_UPDATE=!0;en.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ct=class extends en{constructor(){super(),this.isGroup=!0,this.type="Group"}},qp={type:"move"},Ps=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ct,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ct,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ct,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let y of e.hand.values()){let g=t.getJointPose(y,n),p=this._getHandJoint(c,y);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.quaternion,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,m=.005;c.inputState.pinching&&f>d+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=d-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(qp)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ct;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Ld={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},gi={h:0,s:0,l:0},xo={h:0,s:0,l:0};function Gl(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Pe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=At){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,at.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=at.workingColorSpace){return this.r=e,this.g=t,this.b=n,at.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=at.workingColorSpace){if(e=Fc(e,1),t=ot(t,0,1),n=ot(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Gl(o,r,e+1/3),this.g=Gl(o,r,e),this.b=Gl(o,r,e-1/3)}return at.colorSpaceToWorking(this,s),this}setStyle(e,t=At){function n(r){r!==void 0&&parseFloat(r)<1&&Ye("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ye("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Ye("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=At){let n=Ld[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ye("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=si(e.r),this.g=si(e.g),this.b=si(e.b),this}copyLinearToSRGB(e){return this.r=bs(e.r),this.g=bs(e.g),this.b=bs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=At){return at.workingToColorSpace(Qt.copy(this),e),Math.round(ot(Qt.r*255,0,255))*65536+Math.round(ot(Qt.g*255,0,255))*256+Math.round(ot(Qt.b*255,0,255))}getHexString(e=At){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=at.workingColorSpace){at.workingToColorSpace(Qt.copy(this),t);let n=Qt.r,s=Qt.g,r=Qt.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=at.workingColorSpace){return at.workingToColorSpace(Qt.copy(this),t),e.r=Qt.r,e.g=Qt.g,e.b=Qt.b,e}getStyle(e=At){at.workingToColorSpace(Qt.copy(this),e);let t=Qt.r,n=Qt.g,s=Qt.b;return e!==At?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(gi),this.setHSL(gi.h+e,gi.s+t,gi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(gi),e.getHSL(xo);let n=lr(gi.h,xo.h,t),s=lr(gi.s,xo.s,t),r=lr(gi.l,xo.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Qt=new Pe;Pe.NAMES=Ld;var xr=class i{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Pe(e),this.density=t}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Mi=class extends en{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Un,this.environmentIntensity=1,this.environmentRotation=new Un,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ln=new z,ei=new z,Vl=new z,ti=new z,ds=new z,fs=new z,Ru=new z,Wl=new z,Xl=new z,ql=new z,Yl=new gt,Zl=new gt,$l=new gt,vi=class i{constructor(e=new z,t=new z,n=new z){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Ln.subVectors(e,t),s.cross(Ln);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Ln.subVectors(s,t),ei.subVectors(n,t),Vl.subVectors(e,t);let o=Ln.dot(Ln),a=Ln.dot(ei),l=Ln.dot(Vl),c=ei.dot(ei),h=ei.dot(Vl),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(c*l-a*h)*f,m=(o*h-a*l)*f;return r.set(1-d-m,m,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,ti)===null?!1:ti.x>=0&&ti.y>=0&&ti.x+ti.y<=1}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,ti)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ti.x),l.addScaledVector(o,ti.y),l.addScaledVector(a,ti.z),l)}static getInterpolatedAttribute(e,t,n,s,r,o){return Yl.setScalar(0),Zl.setScalar(0),$l.setScalar(0),Yl.fromBufferAttribute(e,t),Zl.fromBufferAttribute(e,n),$l.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Yl,r.x),o.addScaledVector(Zl,r.y),o.addScaledVector($l,r.z),o}static isFrontFacing(e,t,n,s){return Ln.subVectors(n,t),ei.subVectors(e,t),Ln.cross(ei).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ln.subVectors(this.c,this.b),ei.subVectors(this.a,this.b),Ln.cross(ei).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;ds.subVectors(s,n),fs.subVectors(r,n),Wl.subVectors(e,n);let l=ds.dot(Wl),c=fs.dot(Wl);if(l<=0&&c<=0)return t.copy(n);Xl.subVectors(e,s);let h=ds.dot(Xl),u=fs.dot(Xl);if(h>=0&&u<=h)return t.copy(s);let f=l*u-h*c;if(f<=0&&l>=0&&h<=0&&l-h>0)return o=l/(l-h),t.copy(n).addScaledVector(ds,o);ql.subVectors(e,r);let d=ds.dot(ql),m=fs.dot(ql);if(m>=0&&d<=m)return t.copy(r);let y=d*c-l*m;if(y<=0&&c>=0&&m<=0)return a=c/(c-m),t.copy(n).addScaledVector(fs,a);let g=h*m-d*u;if(g<=0&&u-h>=0&&d-m>=0)return Ru.subVectors(r,s),a=(u-h)/(u-h+(d-m)),t.copy(s).addScaledVector(Ru,a);let p=1/(g+y+f);return o=y*p,a=f*p,t.copy(n).addScaledVector(ds,o).addScaledVector(fs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Xn=class{constructor(e=new z(1/0,1/0,1/0),t=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Dn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Dn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Dn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Dn):Dn.fromBufferAttribute(r,o),Dn.applyMatrix4(e.matrixWorld),this.expandByPoint(Dn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),_o.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),_o.copy(n.boundingBox)),_o.applyMatrix4(e.matrixWorld),this.union(_o)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Dn),Dn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(tr),yo.subVectors(this.max,tr),ps.subVectors(e.a,tr),ms.subVectors(e.b,tr),gs.subVectors(e.c,tr),xi.subVectors(ms,ps),_i.subVectors(gs,ms),Gi.subVectors(ps,gs);let t=[0,-xi.z,xi.y,0,-_i.z,_i.y,0,-Gi.z,Gi.y,xi.z,0,-xi.x,_i.z,0,-_i.x,Gi.z,0,-Gi.x,-xi.y,xi.x,0,-_i.y,_i.x,0,-Gi.y,Gi.x,0];return!Jl(t,ps,ms,gs,yo)||(t=[1,0,0,0,1,0,0,0,1],!Jl(t,ps,ms,gs,yo))?!1:(vo.crossVectors(xi,_i),t=[vo.x,vo.y,vo.z],Jl(t,ps,ms,gs,yo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Dn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Dn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ni[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ni[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ni[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ni[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ni[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ni[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ni[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ni[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ni),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ni=[new z,new z,new z,new z,new z,new z,new z,new z],Dn=new z,_o=new Xn,ps=new z,ms=new z,gs=new z,xi=new z,_i=new z,Gi=new z,tr=new z,yo=new z,vo=new z,Vi=new z;function Jl(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Vi.fromArray(i,r);let a=s.x*Math.abs(Vi.x)+s.y*Math.abs(Vi.y)+s.z*Math.abs(Vi.z),l=e.dot(Vi),c=t.dot(Vi),h=n.dot(Vi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var Ft=new z,Mo=new fe,Yp=0,ht=class extends Wn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Yp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Dc,this.updateRanges=[],this.gpuType=un,this.version=0,this._normalizationScale=e!==void 0?ll(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Mo.fromBufferAttribute(this,t),Mo.applyMatrix3(e),this.setXY(t,Mo.x,Mo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix3(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix4(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyNormalMatrix(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.transformDirection(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Bc(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):kc(e,this.array)}};var _r=class extends ht{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var yr=class extends ht{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Xe=class extends ht{constructor(e,t,n){super(new Float32Array(e),t,n)}},Zp=new Xn,nr=new z,Kl=new z,Si=class{constructor(e=new z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Zp.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;nr.subVectors(e,this.center);let t=nr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(nr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Kl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(nr.copy(e.center).add(Kl)),this.expandByPoint(nr.copy(e.center).sub(Kl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},$p=0,bn=new We,Ql=new en,xs=new z,mn=new Xn,ir=new Xn,Gt=new z,dt=class i extends Wn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$p++}),this.uuid=hi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(vp(e)?yr:_r)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ke().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return bn.makeRotationFromQuaternion(e),this.applyMatrix4(bn),this}rotateX(e){return bn.makeRotationX(e),this.applyMatrix4(bn),this}rotateY(e){return bn.makeRotationY(e),this.applyMatrix4(bn),this}rotateZ(e){return bn.makeRotationZ(e),this.applyMatrix4(bn),this}translate(e,t,n){return bn.makeTranslation(e,t,n),this.applyMatrix4(bn),this}scale(e,t,n){return bn.makeScale(e,t,n),this.applyMatrix4(bn),this}lookAt(e){return Ql.lookAt(e),Ql.updateMatrix(),this.applyMatrix4(Ql.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(xs).negate(),this.translate(xs.x,xs.y,xs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Xe(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ye("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$e("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];mn.setFromBufferAttribute(r),this.morphTargetsRelative?(Gt.addVectors(this.boundingBox.min,mn.min),this.boundingBox.expandByPoint(Gt),Gt.addVectors(this.boundingBox.max,mn.max),this.boundingBox.expandByPoint(Gt)):(this.boundingBox.expandByPoint(mn.min),this.boundingBox.expandByPoint(mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&$e('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Si);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$e("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(e){let n=this.boundingSphere.center;if(mn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];ir.setFromBufferAttribute(a),this.morphTargetsRelative?(Gt.addVectors(mn.min,ir.min),mn.expandByPoint(Gt),Gt.addVectors(mn.max,ir.max),mn.expandByPoint(Gt)):(mn.expandByPoint(ir.min),mn.expandByPoint(ir.max))}mn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Gt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Gt));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Gt.fromBufferAttribute(a,c),l&&(xs.fromBufferAttribute(e,c),Gt.add(xs)),s=Math.max(s,n.distanceToSquared(Gt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&$e('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){$e("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new ht(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[],c=new Uint8Array(n.count);for(let N=0;N<n.count;N++)a[N]=new z,l[N]=new z;let h=new z,u=new z,f=new z,d=new fe,m=new fe,y=new fe,g=new z,p=new z;function _(N,C,O){c[N]=c[C]=c[O]=1,h.fromBufferAttribute(n,N),u.fromBufferAttribute(n,C),f.fromBufferAttribute(n,O),d.fromBufferAttribute(r,N),m.fromBufferAttribute(r,C),y.fromBufferAttribute(r,O),u.sub(h),f.sub(h),m.sub(d),y.sub(d);let T=1/(m.x*y.y-y.x*m.y);isFinite(T)&&(g.copy(u).multiplyScalar(y.y).addScaledVector(f,-m.y).multiplyScalar(T),p.copy(f).multiplyScalar(m.x).addScaledVector(u,-y.x).multiplyScalar(T),a[N].add(g),a[C].add(g),a[O].add(g),l[N].add(p),l[C].add(p),l[O].add(p))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let N=0,C=E.length;N<C;++N){let O=E[N],T=O.start,U=O.count;for(let P=T,k=T+U;P<k;P+=3)_(e.getX(P+0),e.getX(P+1),e.getX(P+2))}let v=new z,w=new z,R=new z,x=new z;function S(N){R.fromBufferAttribute(s,N),x.copy(R);let C=a[N];v.copy(C),v.sub(R.multiplyScalar(R.dot(C))).normalize(),w.crossVectors(x,C);let T=w.dot(l[N])<0?-1:1;o.setXYZW(N,v.x,v.y,v.z,T)}for(let N=0,C=n.count;N<C;++N)c[N]&&S(N);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new ht(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let s=new z,r=new z,o=new z,a=new z,l=new z,c=new z,h=new z,u=new z;if(e)for(let f=0,d=e.count;f<d;f+=3){let m=e.getX(f+0),y=e.getX(f+1),g=e.getX(f+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,y),o.fromBufferAttribute(t,g),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,d=t.count;f<d;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Gt.fromBufferAttribute(e,t),Gt.normalize(),e.setXYZ(t,Gt.x,Gt.y,Gt.z)}toNonIndexed(){function e(a,l){let c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h),d=0,m=0;for(let y=0,g=l.length;y<g;y++){a.isInterleavedBufferAttribute?d=l[y]*a.data.stride+a.offset:d=l[y]*h;for(let p=0;p<h;p++)f[m++]=c[d++]}return new ht(f,h,u)}if(this.index===null)return Ye("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=e(l,n);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let f=c[h],d=e(f,n);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){let d=c[u];h.push(d.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},vr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Dc,this.updateRanges=[],this.version=0,this.uuid=hi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=Cu(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let n=new this.array.constructor(e.arrayBuffers[t]),s=new this.constructor(n,this.stride);return s.setUsage(this.usage),s}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=Cu(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};function Cu(i){return i.buffer._uuid===void 0&&(i.buffer._uuid=hi()),i.byteOffset===0&&i.byteLength===i.buffer.byteLength?i.buffer._uuid:i.buffer._uuid+":"+i.byteOffset+":"+i.byteLength}var rn=new z,Is=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s,this._normalizationScale=e!==void 0?ll(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)rn.fromBufferAttribute(this,t),rn.applyMatrix4(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)rn.fromBufferAttribute(this,t),rn.applyNormalMatrix(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)rn.fromBufferAttribute(this,t),rn.transformDirection(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){pr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new ht(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){pr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Bc(e,this.data.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):kc(e,this.data.array)}},jl=new z,Jp=new z,Kp=new Ke,an=class{constructor(e=new z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=jl.subVectors(n,t).cross(Jp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(jl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Kp.getNormalMatrix(e),s=this.coplanarPoint(jl).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Qp=0,bi=class extends Wn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Qp++}),this.uuid=hi(),this.name="",this.type="Material",this.blending=zs,this.side=Zn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=vc,this.blendDst=Mc,this.blendEquation=ji,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Pe(0,0,0),this.blendAlpha=0,this.depthFunc=Es,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Sd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ko,this.stencilZFail=ko,this.stencilZPass=ko,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ye(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ye(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Pe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new an().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new fe().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new fe().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var ii=new z,ec=new z,So=new z,bo=new z,jo=class{constructor(e=new z,t=new z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ii)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ii.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ii.copy(this.origin).addScaledVector(this.direction,t),ii.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ec.copy(e).add(t).multiplyScalar(.5),So.copy(t).sub(e).normalize(),bo.copy(this.origin).sub(ec);let r=e.distanceTo(t)*.5,o=-this.direction.dot(So),a=bo.dot(this.direction),l=-bo.dot(So),c=bo.lengthSq(),h=Math.abs(1-o*o),u,f,d,m;if(h>0)if(u=o*l-a,f=o*a-l,m=r*h,u>=0)if(f>=-m)if(f<=m){let y=1/h;u*=y,f*=y,d=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f<=-m?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=m?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(ec).addScaledVector(So,f),d}intersectSphere(e,t){if(e.radius<0)return null;ii.subVectors(e.center,this.origin);let n=ii.dot(this.direction),s=ii.dot(ii)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),h>=0?(r=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-f.z)*u,l=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,l=(e.min.z-f.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,ii)!==null}intersectTriangle(e,t,n,s,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,h=a.z,u=e.x-o.x,f=e.y-o.y,d=e.z-o.z,m=t.x-o.x,y=t.y-o.y,g=t.z-o.z,p=n.x-o.x,_=n.y-o.y,E=n.z-o.z,v=Math.abs(l),w=Math.abs(c),R=Math.abs(h),x,S,N,C,O,T,U,P,k,H,V,$;if(v>=w&&v>=R?(N=l,T=u,k=m,$=p,l>=0?(x=c,S=h,C=f,O=d,U=y,P=g,H=_,V=E):(x=h,S=c,C=d,O=f,U=g,P=y,H=E,V=_)):w>=R?(N=c,T=f,k=y,$=_,c>=0?(x=h,S=l,C=d,O=u,U=g,P=m,H=E,V=p):(x=l,S=h,C=u,O=d,U=m,P=g,H=p,V=E)):(N=h,T=d,k=g,$=E,h>=0?(x=l,S=c,C=u,O=f,U=m,P=y,H=p,V=_):(x=c,S=l,C=f,O=u,U=y,P=m,H=_,V=p)),N===0)return null;let B=x/N,L=S/N,M=1/N,D=C-B*T,Y=O-L*T,F=U-B*k,W=P-L*k,Z=H-B*$,te=V-L*$,J=Z*W-te*F,se=D*te-Y*Z,Ne=F*Y-W*D;if(s){if(J<0||se<0||Ne<0)return null}else if((J<0||se<0||Ne<0)&&(J>0||se>0||Ne>0))return null;let pe=J+se+Ne;if(pe===0)return null;let me=M*(J*T+se*k+Ne*$);return(pe>0?me<0:me>0)?null:this.at(me/pe,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Lt=class extends bi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Pe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.combine=Sc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Pu=new We,Wi=new jo,Eo=new Si,Iu=new z,wo=new z,To=new z,Ao=new z,tc=new z,Ro=new z,Lu=new z,Co=new z,Qe=class extends en{constructor(e=new dt,t=new Lt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){Ro.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(tc.fromBufferAttribute(u,e),o?Ro.addScaledVector(tc,h):Ro.addScaledVector(tc.sub(t),h))}t.add(Ro)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Eo.copy(n.boundingSphere),Eo.applyMatrix4(r),Wi.copy(e.ray).recast(e.near),!(Eo.containsPoint(Wi.origin)===!1&&(Wi.intersectSphere(Eo,Iu)===null||Wi.origin.distanceToSquared(Iu)>(e.far-e.near)**2))&&(Pu.copy(r).invert(),Wi.copy(e.ray).applyMatrix4(Pu),!(n.boundingBox!==null&&Wi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Wi)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,y=f.length;m<y;m++){let g=f[m],p=o[g.materialIndex],_=Math.max(g.start,d.start),E=Math.min(a.count,Math.min(g.start+g.count,d.start+d.count));for(let v=_,w=E;v<w;v+=3){let R=a.getX(v),x=a.getX(v+1),S=a.getX(v+2);s=Po(this,p,e,n,c,h,u,R,x,S),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,d.start),y=Math.min(a.count,d.start+d.count);for(let g=m,p=y;g<p;g+=3){let _=a.getX(g),E=a.getX(g+1),v=a.getX(g+2);s=Po(this,o,e,n,c,h,u,_,E,v),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,y=f.length;m<y;m++){let g=f[m],p=o[g.materialIndex],_=Math.max(g.start,d.start),E=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let v=_,w=E;v<w;v+=3){let R=v,x=v+1,S=v+2;s=Po(this,p,e,n,c,h,u,R,x,S),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,d.start),y=Math.min(l.count,d.start+d.count);for(let g=m,p=y;g<p;g+=3){let _=g,E=g+1,v=g+2;s=Po(this,o,e,n,c,h,u,_,E,v),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function jp(i,e,t,n,s,r,o,a){let l;if(e.side===Wt?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===Zn,a),l===null)return null;Co.copy(a),Co.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Co);return c<t.near||c>t.far?null:{distance:c,point:Co.clone(),object:i}}function Po(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,wo),i.getVertexPosition(l,To),i.getVertexPosition(c,Ao);let h=jp(i,e,t,n,wo,To,Ao,Lu);if(h){let u=new z;vi.getBarycoord(Lu,wo,To,Ao,u),s&&(h.uv=vi.getInterpolatedAttribute(s,a,l,c,u,new fe)),r&&(h.uv1=vi.getInterpolatedAttribute(r,a,l,c,u,new fe)),o&&(h.normal=vi.getInterpolatedAttribute(o,a,l,c,u,new z),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a,b:l,c,normal:new z,materialIndex:0};vi.getNormal(wo,To,Ao,f.normal),h.face=f,h.barycoord=u}return h}var Yi=class extends jt{constructor(e=null,t=1,n=1,s,r,o,a,l,c=Vt,h=Vt,u,f){super(null,o,a,l,c,h,s,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ei=class extends ht{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},_s=new We,Du=new We,Io=[],Nu=new Xn,em=new We,sr=new Qe,rr=new Si,ln=class extends Qe{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ei(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,em)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Xn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,_s),Nu.copy(e.boundingBox).applyMatrix4(_s),this.boundingBox.union(Nu)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Si),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,_s),rr.copy(e.boundingSphere).applyMatrix4(_s),this.boundingSphere.union(rr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(sr.geometry=this.geometry,sr.material=this.material,sr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),rr.copy(this.boundingSphere),rr.applyMatrix4(n),e.ray.intersectsSphere(rr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,_s),Du.multiplyMatrices(n,_s),sr.matrixWorld=Du,sr.raycast(e,Io);for(let o=0,a=Io.length;o<a;o++){let l=Io[o];l.instanceId=r,l.object=this,t.push(l)}Io.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Ei(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Yi(new Float32Array(s*this.count),s,this.count,Aa,un));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=s*e;return r[l]=a,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Xi=new Si,tm=new fe(.5,.5),Lo=new z,wi=class{constructor(e=new an,t=new an,n=new an,s=new an,r=new an,o=new an){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=En,n=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],f=r[6],d=r[7],m=r[8],y=r[9],g=r[10],p=r[11],_=r[12],E=r[13],v=r[14],w=r[15];if(s[0].setComponents(c-o,d-h,p-m,w-_).normalize(),s[1].setComponents(c+o,d+h,p+m,w+_).normalize(),s[2].setComponents(c+a,d+u,p+y,w+E).normalize(),s[3].setComponents(c-a,d-u,p-y,w-E).normalize(),n)s[4].setComponents(l,f,g,v).normalize(),s[5].setComponents(c-l,d-f,p-g,w-v).normalize();else if(s[4].setComponents(c-l,d-f,p-g,w-v).normalize(),t===En)s[5].setComponents(c+l,d+f,p+g,w+v).normalize();else if(t===ws)s[5].setComponents(l,f,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Xi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Xi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Xi)}intersectsSprite(e){Xi.center.set(0,0,0);let t=tm.distanceTo(e.center);return Xi.radius=.7071067811865476+t,Xi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Xi)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Lo.x=s.normal.x>0?e.max.x:e.min.x,Lo.y=s.normal.y>0?e.max.y:e.min.y,Lo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Lo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Uu=new We,ea=class i{constructor(){this.coordinateSystem=En,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let s=0;s<t.length;s++){let r=t[s];Uu.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new wi),n[s].setFromProjectionMatrix(Uu,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new wi),t[s].copy(n[s]);return this._count=e._count,this}clone(){return new i().copy(this)}};var Mr=class extends jt{constructor(e=[],t=es,n,s,r,o,a,l,c,h){super(e,t,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},qn=class extends jt{constructor(e,t,n,s,r,o,a,l,c){super(e,t,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var oi=class extends jt{constructor(e,t,n=Bn,s,r,o,a=Vt,l=Vt,c,h=ri,u=1){if(h!==ri&&h!==li)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:u};super(f,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Cs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Sr=class extends oi{constructor(e,t=Bn,n=es,s,r,o=Vt,a=Vt,l,c=ri){let h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,s,r,o,a,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},br=class extends jt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Ce=class i extends dt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],f=0,d=0;m("z","y","x",-1,-1,n,t,e,o,r,0),m("z","y","x",1,-1,n,t,-e,o,r,1),m("x","z","y",1,1,e,n,t,s,o,2),m("x","z","y",1,-1,e,n,-t,s,o,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Xe(c,3)),this.setAttribute("normal",new Xe(h,3)),this.setAttribute("uv",new Xe(u,2));function m(y,g,p,_,E,v,w,R,x,S,N){let C=v/x,O=w/S,T=v/2,U=w/2,P=R/2,k=x+1,H=S+1,V=0,$=0,B=new z;for(let L=0;L<H;L++){let M=L*O-U;for(let D=0;D<k;D++){let Y=D*C-T;B[y]=Y*_,B[g]=M*E,B[p]=P,c.push(B.x,B.y,B.z),B[y]=0,B[g]=0,B[p]=R>0?1:-1,h.push(B.x,B.y,B.z),u.push(D/x),u.push(1-L/S),V+=1}}for(let L=0;L<S;L++)for(let M=0;M<x;M++){let D=f+M+k*L,Y=f+M+k*(L+1),F=f+(M+1)+k*(L+1),W=f+(M+1)+k*L;l.push(D,Y,W),l.push(Y,F,W),$+=6}a.addGroup(d,$,N),d+=$,f+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},Zi=class i extends dt{constructor(e=1,t=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:s,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let o=[],a=[],l=[],c=[],h=t/2,u=Math.PI/2*e,f=t,d=2*u+f,m=n*2+r,y=s+1,g=new z,p=new z;for(let _=0;_<=m;_++){let E=0,v=0,w=0,R=0;if(_<=n){let N=_/n,C=N*Math.PI/2;v=-h-e*Math.cos(C),w=e*Math.sin(C),R=-e*Math.cos(C),E=N*u}else if(_<=n+r){let N=(_-n)/r;v=-h+N*t,w=e,R=0,E=u+N*f}else{let N=(_-n-r)/n,C=N*Math.PI/2;v=h+e*Math.sin(C),w=e*Math.cos(C),R=e*Math.sin(C),E=u+f+N*u}let x=Math.max(0,Math.min(1,E/d)),S=0;_===0?S=.5/s:_===m&&(S=-.5/s);for(let N=0;N<=s;N++){let C=N/s,O=C*Math.PI*2,T=Math.sin(O),U=Math.cos(O);p.x=-w*U,p.y=v,p.z=w*T,a.push(p.x,p.y,p.z),g.set(-w*U,R,w*T),g.normalize(),l.push(g.x,g.y,g.z),c.push(C+S,x)}if(_>0){let N=(_-1)*y;for(let C=0;C<s;C++){let O=N+C,T=N+C+1,U=_*y+C,P=_*y+C+1;o.push(O,T,U),o.push(T,P,U)}}}this.setIndex(o),this.setAttribute("position",new Xe(a,3)),this.setAttribute("normal",new Xe(l,3)),this.setAttribute("uv",new Xe(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Er=class i extends dt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],o=[],a=[],l=[],c=new z,h=new fe;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=t;u++,f+=3){let d=n+u/t*s;c.x=e*Math.cos(d),c.y=e*Math.sin(d),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[f]/e+1)/2,h.y=(o[f+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Xe(o,3)),this.setAttribute("normal",new Xe(a,3)),this.setAttribute("uv",new Xe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},ut=class i extends dt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],f=[],d=[],m=0,y=[],g=n/2,p=0;_(),o===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new Xe(u,3)),this.setAttribute("normal",new Xe(f,3)),this.setAttribute("uv",new Xe(d,2));function _(){let v=new z,w=new z,R=0,x=(t-e)/n;for(let S=0;S<=r;S++){let N=[],C=S/r,O=C*(t-e)+e;for(let T=0;T<=s;T++){let U=T/s,P=U*l+a,k=Math.sin(P),H=Math.cos(P);w.x=O*k,w.y=-C*n+g,w.z=O*H,u.push(w.x,w.y,w.z),v.set(k,x,H).normalize(),f.push(v.x,v.y,v.z),d.push(U,1-C),N.push(m++)}y.push(N)}for(let S=0;S<s;S++)for(let N=0;N<r;N++){let C=y[N][S],O=y[N+1][S],T=y[N+1][S+1],U=y[N][S+1];(e>0||N!==0)&&(h.push(C,O,U),R+=3),(t>0||N!==r-1)&&(h.push(O,T,U),R+=3)}c.addGroup(p,R,0),p+=R}function E(v){let w=m,R=new fe,x=new z,S=0,N=v===!0?e:t,C=v===!0?1:-1;for(let T=1;T<=s;T++)u.push(0,g*C,0),f.push(0,C,0),d.push(.5,.5),m++;let O=m;for(let T=0;T<=s;T++){let P=T/s*l+a,k=Math.cos(P),H=Math.sin(P);x.x=N*H,x.y=g*C,x.z=N*k,u.push(x.x,x.y,x.z),f.push(0,C,0),R.x=k*.5+.5,R.y=H*.5*C+.5,d.push(R.x,R.y),m++}for(let T=0;T<s;T++){let U=w+T,P=O+T;v===!0?h.push(P,P+1,U):h.push(P+1,P,U),S+=3}c.addGroup(p,S,v===!0?1:2),p+=S}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},gn=class i extends ut{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ta=class i extends dt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],o=[];a(s),c(n),h(),this.setAttribute("position",new Xe(r,3)),this.setAttribute("normal",new Xe(r.slice(),3)),this.setAttribute("uv",new Xe(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(_){let E=new z,v=new z,w=new z;for(let R=0;R<t.length;R+=3)d(t[R+0],E),d(t[R+1],v),d(t[R+2],w),l(E,v,w,_)}function l(_,E,v,w){let R=w+1,x=[];for(let S=0;S<=R;S++){x[S]=[];let N=_.clone().lerp(v,S/R),C=E.clone().lerp(v,S/R),O=R-S;for(let T=0;T<=O;T++)T===0&&S===R?x[S][T]=N:x[S][T]=N.clone().lerp(C,T/O)}for(let S=0;S<R;S++)for(let N=0;N<2*(R-S)-1;N++){let C=Math.floor(N/2);N%2===0?(f(x[S][C+1]),f(x[S+1][C]),f(x[S][C])):(f(x[S][C+1]),f(x[S+1][C+1]),f(x[S+1][C]))}}function c(_){let E=new z;for(let v=0;v<r.length;v+=3)E.x=r[v+0],E.y=r[v+1],E.z=r[v+2],E.normalize().multiplyScalar(_),r[v+0]=E.x,r[v+1]=E.y,r[v+2]=E.z}function h(){let _=new z;for(let E=0;E<r.length;E+=3){_.x=r[E+0],_.y=r[E+1],_.z=r[E+2];let v=g(_)/2/Math.PI+.5,w=p(_)/Math.PI+.5;o.push(v,1-w)}m(),u()}function u(){for(let _=0;_<o.length;_+=6){let E=o[_+0],v=o[_+2],w=o[_+4],R=Math.max(E,v,w),x=Math.min(E,v,w);R>.9&&x<.1&&(E<.2&&(o[_+0]+=1),v<.2&&(o[_+2]+=1),w<.2&&(o[_+4]+=1))}}function f(_){r.push(_.x,_.y,_.z)}function d(_,E){let v=_*3;E.x=e[v+0],E.y=e[v+1],E.z=e[v+2]}function m(){let _=new z,E=new z,v=new z,w=new z,R=new fe,x=new fe,S=new fe;for(let N=0,C=0;N<r.length;N+=9,C+=6){_.set(r[N+0],r[N+1],r[N+2]),E.set(r[N+3],r[N+4],r[N+5]),v.set(r[N+6],r[N+7],r[N+8]),R.set(o[C+0],o[C+1]),x.set(o[C+2],o[C+3]),S.set(o[C+4],o[C+5]),w.copy(_).add(E).add(v).divideScalar(3);let O=g(w);y(R,C+0,_,O),y(x,C+2,E,O),y(S,C+4,v,O)}}function y(_,E,v,w){w<0&&_.x===1&&(o[E]=_.x-1),v.x===0&&v.z===0&&(o[E]=w/2/Math.PI+.5)}function g(_){return Math.atan2(_.z,-_.x)}function p(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.detail)}};var xn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ye("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);let h=n[s],f=n[s+1]-h,d=(o-h)/f;return(s+d)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new fe:new z);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new z,s=[],r=[],o=[],a=new z,l=new We;for(let d=0;d<=e;d++){let m=d/e;s[d]=this.getTangentAt(m,new z)}r[0]=new z,o[0]=new z;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos(ot(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(a,m))}o[d].crossVectors(s[d],r[d])}if(t===!0){let d=Math.acos(ot(r[0].dot(r[e]),-1,1));d/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(d=-d);for(let m=1;m<=e;m++)r[m].applyMatrix4(l.makeRotationAxis(s[m],d*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}},Ls=class extends xn{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new fe){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*h-d*u+this.aX,c=f*u+d*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},na=class extends Ls{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function zc(){let i=0,e=0,t=0,n=0;function s(r,o,a,l){i=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let f=(o-r)/c-(a-r)/(c+h)+(a-o)/h,d=(a-o)/h-(l-o)/(h+u)+(l-a)/u;f*=h,d*=h,s(o,a,f,d)},calc:function(r){let o=r*r,a=o*r;return i+e*r+t*o+n*a}}}var Fu=new z,Ou=new z,nc=new zc,ic=new zc,sc=new zc,ia=class extends xn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new z){let n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(Ou.subVectors(s[0],s[1]).add(s[0]),c=Ou);let u=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Fu.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Fu),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(u),d),y=Math.pow(u.distanceToSquared(f),d),g=Math.pow(f.distanceToSquared(h),d);y<1e-4&&(y=1),m<1e-4&&(m=y),g<1e-4&&(g=y),nc.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,m,y,g),ic.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,m,y,g),sc.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,m,y,g)}else this.curveType==="catmullrom"&&(nc.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),ic.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),sc.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return n.set(nc.calc(l),ic.calc(l),sc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new z().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Bu(i,e,t,n,s){let r=(n-e)*.5,o=(s-t)*.5,a=i*i,l=i*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*i+t}function nm(i,e){let t=1-i;return t*t*e}function im(i,e){return 2*(1-i)*i*e}function sm(i,e){return i*i*e}function cr(i,e,t,n){return nm(i,e)+im(i,t)+sm(i,n)}function rm(i,e){let t=1-i;return t*t*t*e}function om(i,e){let t=1-i;return 3*t*t*i*e}function am(i,e){return 3*(1-i)*i*i*e}function lm(i,e){return i*i*i*e}function hr(i,e,t,n,s){return rm(i,e)+om(i,t)+am(i,n)+lm(i,s)}var wr=class extends xn{constructor(e=new fe,t=new fe,n=new fe,s=new fe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new fe){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(hr(e,s.x,r.x,o.x,a.x),hr(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},sa=class extends xn{constructor(e=new z,t=new z,n=new z,s=new z){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new z){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(hr(e,s.x,r.x,o.x,a.x),hr(e,s.y,r.y,o.y,a.y),hr(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Tr=class extends xn{constructor(e=new fe,t=new fe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new fe){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new fe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ra=class extends xn{constructor(e=new z,t=new z){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new z){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new z){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ar=class extends xn{constructor(e=new fe,t=new fe,n=new fe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new fe){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(cr(e,s.x,r.x,o.x),cr(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},oa=class extends xn{constructor(e=new z,t=new z,n=new z){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new z){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(cr(e,s.x,r.x,o.x),cr(e,s.y,r.y,o.y),cr(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Rr=class extends xn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new fe){let n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(Bu(a,l.x,c.x,h.x,u.x),Bu(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new fe().fromArray(s))}return this}},hc=Object.freeze({__proto__:null,ArcCurve:na,CatmullRomCurve3:ia,CubicBezierCurve:wr,CubicBezierCurve3:sa,EllipseCurve:Ls,LineCurve:Tr,LineCurve3:ra,QuadraticBezierCurve:Ar,QuadraticBezierCurve3:oa,SplineCurve:Rr}),aa=class extends xn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new hc[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this.cacheLengths=null,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new hc[s.type]().fromJSON(s))}return this.cacheLengths=null,this}},Cr=class extends aa{constructor(e){super(),this.type="Path",this.currentPoint=new fe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Tr(this.currentPoint.clone(),new fe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new Ar(this.currentPoint.clone(),new fe(e,t),new fe(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){let a=new wr(this.currentPoint.clone(),new fe(e,t),new fe(n,s),new fe(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Rr(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,s,r,o,a,l),this}absellipse(e,t,n,s,r,o,a,l){let c=new Ls(e,t,n,s,r,o,a,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},wn=class extends Cr{constructor(e){super(e),this.uuid=hi(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new Cr().fromJSON(s))}return this}};function cm(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=Dd(i,0,s,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=pm(i,e,r,t)),i.length>80*t){a=i[0],l=i[1];let h=a,u=l;for(let f=t;f<s;f+=t){let d=i[f],m=i[f+1];d<a&&(a=d),m<l&&(l=m),d>h&&(h=d),m>u&&(u=m)}c=Math.max(h-a,u-l),c=c!==0?32767/c:0}return Pr(r,o,t,a,l,c,0),o}function Dd(i,e,t,n,s){let r;if(s===wm(i,e,t,n)>0)for(let o=e;o<t;o+=n)r=ku(o/n|0,i[o],i[o+1],r);else for(let o=t-n;o>=e;o-=n)r=ku(o/n|0,i[o],i[o+1],r);return r&&Ds(r,r.next)&&(Lr(r),r=r.next),r}function $i(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Ds(t,t.next)||Rt(t.prev,t,t.next)===0)){if(Lr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Pr(i,e,t,n,s,r,o){if(!i)return;!o&&r&&ym(i,n,s,r);let a=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?um(i,n,s,r):hm(i)){e.push(l.i,i.i,c.i),Lr(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=dm($i(i),e),Pr(i,e,t,n,s,r,2)):o===2&&fm(i,e,t,n,s,r):Pr($i(i),e,t,n,s,r,1);break}}}function hm(i){let e=i.prev,t=i,n=i.next;if(Rt(e,t,n)>=0)return!1;let s=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,h=Math.min(s,r,o),u=Math.min(a,l,c),f=Math.max(s,r,o),d=Math.max(a,l,c),m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=f&&m.y>=u&&m.y<=d&&or(s,a,r,l,o,c,m.x,m.y)&&Rt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function um(i,e,t,n){let s=i.prev,r=i,o=i.next;if(Rt(s,r,o)>=0)return!1;let a=s.x,l=r.x,c=o.x,h=s.y,u=r.y,f=o.y,d=Math.min(a,l,c),m=Math.min(h,u,f),y=Math.max(a,l,c),g=Math.max(h,u,f),p=uc(d,m,e,t,n),_=uc(y,g,e,t,n),E=i.prevZ,v=i.nextZ;for(;E&&E.z>=p&&v&&v.z<=_;){if(E.x>=d&&E.x<=y&&E.y>=m&&E.y<=g&&E!==s&&E!==o&&or(a,h,l,u,c,f,E.x,E.y)&&Rt(E.prev,E,E.next)>=0||(E=E.prevZ,v.x>=d&&v.x<=y&&v.y>=m&&v.y<=g&&v!==s&&v!==o&&or(a,h,l,u,c,f,v.x,v.y)&&Rt(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;E&&E.z>=p;){if(E.x>=d&&E.x<=y&&E.y>=m&&E.y<=g&&E!==s&&E!==o&&or(a,h,l,u,c,f,E.x,E.y)&&Rt(E.prev,E,E.next)>=0)return!1;E=E.prevZ}for(;v&&v.z<=_;){if(v.x>=d&&v.x<=y&&v.y>=m&&v.y<=g&&v!==s&&v!==o&&or(a,h,l,u,c,f,v.x,v.y)&&Rt(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function dm(i,e){let t=i;do{let n=t.prev,s=t.next.next;!Ds(n,s)&&Ud(n,t,t.next,s)&&Ir(n,s)&&Ir(s,n)&&(e.push(n.i,t.i,s.i),Lr(t),Lr(t.next),t=i=s),t=t.next}while(t!==i);return $i(t)}function fm(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Sm(o,a)){let l=Fd(o,a);o=$i(o,o.next),l=$i(l,l.next),Pr(o,e,t,n,s,r,0),Pr(l,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function pm(i,e,t,n){let s=[];for(let r=0,o=e.length;r<o;r++){let a=e[r]*n,l=r<o-1?e[r+1]*n:i.length,c=Dd(i,a,l,n,!1);c===c.next&&(c.steiner=!0),s.push(Mm(c))}s.sort(mm);for(let r=0;r<s.length;r++)t=gm(s[r],t);return t}function mm(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function gm(i,e){let t=xm(i,e);if(!t)return e;let n=Fd(t,i);return $i(n,n.next),$i(t,t.next)}function xm(i,e){let t=e,n=i.x,s=i.y,r=-1/0,o;if(Ds(i,t))return t;do{if(Ds(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let u=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>r&&(r=u,o=t.x<t.next.x?t:t.next,u===n))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;t=o;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Nd(s<c?n:r,s,l,c,s<c?r:n,s,t.x,t.y)){let u=Math.abs(s-t.y)/(n-t.x);Ir(t,i)&&(u<h||u===h&&(t.x>o.x||t.x===o.x&&_m(o,t)))&&(o=t,h=u)}t=t.next}while(t!==a);return o}function _m(i,e){return Rt(i.prev,i,e.prev)<0&&Rt(e.next,i,i.next)<0}function ym(i,e,t,n){let s=i;do s.z===0&&(s.z=uc(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,vm(s)}function vm(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,t*=2}while(e>1);return i}function uc(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Mm(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Nd(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function or(i,e,t,n,s,r,o,a){return!(i===o&&e===a)&&Nd(i,e,t,n,s,r,o,a)}function Sm(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!bm(i,e)&&(Ir(i,e)&&Ir(e,i)&&Em(i,e)&&(Rt(i.prev,i,e.prev)||Rt(i,e.prev,e))||Ds(i,e)&&Rt(i.prev,i,i.next)>0&&Rt(e.prev,e,e.next)>0)}function Rt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Ds(i,e){return i.x===e.x&&i.y===e.y}function Ud(i,e,t,n){let s=No(Rt(i,e,t)),r=No(Rt(i,e,n)),o=No(Rt(t,n,i)),a=No(Rt(t,n,e));return!!(s!==r&&o!==a||s===0&&Do(i,t,e)||r===0&&Do(i,n,e)||o===0&&Do(t,i,n)||a===0&&Do(t,e,n))}function Do(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function No(i){return i>0?1:i<0?-1:0}function bm(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Ud(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Ir(i,e){return Rt(i.prev,i,i.next)<0?Rt(i,e,i.next)>=0&&Rt(i,i.prev,e)>=0:Rt(i,e,i.prev)<0||Rt(i,i.next,e)<0}function Em(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Fd(i,e){let t=dc(i.i,i.x,i.y),n=dc(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function ku(i,e,t,n){let s=dc(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Lr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function dc(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function wm(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var fc=class{static triangulate(e,t,n=2){return cm(e,t,n)}},Gn=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];zu(e),Hu(n,e);let o=e.length;t.forEach(zu);for(let l=0;l<t.length;l++)s.push(o),o+=t[l].length,Hu(n,t[l]);let a=fc.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function zu(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Hu(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Ti=class i extends dt{constructor(e=new wn([new fe(.5,.5),new fe(-.5,.5),new fe(-.5,-.5),new fe(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let a=0,l=e.length;a<l;a++){let c=e[a];o(c)}this.setAttribute("position",new Xe(s,3)),this.setAttribute("uv",new Xe(r,2)),this.computeVertexNormals();function o(a){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:d-.1,y=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,p=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:Tm,E,v=!1,w,R,x,S;if(p){E=p.getSpacedPoints(h),v=!0,f=!1;let ee=p.isCatmullRomCurve3?p.closed:!1;w=p.computeFrenetFrames(h,ee),R=new z,x=new z,S=new z}f||(g=0,d=0,m=0,y=0);let N=a.extractPoints(c),C=N.shape,O=N.holes;if(!Gn.isClockWise(C)){C=C.reverse();for(let ee=0,re=O.length;ee<re;ee++){let oe=O[ee];Gn.isClockWise(oe)&&(O[ee]=oe.reverse())}}function U(ee){let oe=10000000000000001e-36,de=ee[0];for(let ue=1;ue<=ee.length;ue++){let Fe=ue%ee.length,be=ee[Fe],ze=be.x-de.x,Je=be.y-de.y,et=ze*ze+Je*Je,X=Math.max(Math.abs(be.x),Math.abs(be.y),Math.abs(de.x),Math.abs(de.y)),wt=oe*X*X;if(et<=wt){ee.splice(Fe,1),ue--;continue}de=be}}U(C),O.forEach(U);let P=O.length,k=C;for(let ee=0;ee<P;ee++){let re=O[ee];C=C.concat(re)}function H(ee,re,oe){return re||$e("ExtrudeGeometry: vec does not exist"),ee.clone().addScaledVector(re,oe)}let V=C.length;function $(ee,re,oe){let de,ue,Fe,be=ee.x-re.x,ze=ee.y-re.y,Je=oe.x-ee.x,et=oe.y-ee.y,X=be*be+ze*ze,wt=be*et-ze*Je;if(Math.abs(wt)>Number.EPSILON){let nt=Math.sqrt(X),xt=Math.sqrt(Je*Je+et*et),ve=re.x-ze/nt,yt=re.y+be/nt,Ve=oe.x-et/xt,Ze=oe.y+Je/xt,I=((Ve-ve)*et-(Ze-yt)*Je)/(be*et-ze*Je);de=ve+be*I-ee.x,ue=yt+ze*I-ee.y;let b=de*de+ue*ue;if(b<=2)return new fe(de,ue);Fe=Math.sqrt(b/2)}else{let nt=!1;be>Number.EPSILON?Je>Number.EPSILON&&(nt=!0):be<-Number.EPSILON?Je<-Number.EPSILON&&(nt=!0):Math.sign(ze)===Math.sign(et)&&(nt=!0),nt?(de=-ze,ue=be,Fe=Math.sqrt(X)):(de=be,ue=ze,Fe=Math.sqrt(X/2))}return new fe(de/Fe,ue/Fe)}let B=[];for(let ee=0,re=k.length,oe=re-1,de=ee+1;ee<re;ee++,oe++,de++)oe===re&&(oe=0),de===re&&(de=0),B[ee]=$(k[ee],k[oe],k[de]);let L=[],M,D=B.concat();for(let ee=0,re=P;ee<re;ee++){let oe=O[ee];M=[];for(let de=0,ue=oe.length,Fe=ue-1,be=de+1;de<ue;de++,Fe++,be++)Fe===ue&&(Fe=0),be===ue&&(be=0),M[de]=$(oe[de],oe[Fe],oe[be]);L.push(M),D=D.concat(M)}let Y;if(g===0)Y=Gn.triangulateShape(k,O);else{let ee=[],re=[];for(let oe=0;oe<g;oe++){let de=oe/g,ue=d*Math.cos(de*Math.PI/2),Fe=m*Math.sin(de*Math.PI/2)+y;for(let be=0,ze=k.length;be<ze;be++){let Je=H(k[be],B[be],Fe);se(Je.x,Je.y,-ue),de===0&&ee.push(Je)}for(let be=0,ze=P;be<ze;be++){let Je=O[be];M=L[be];let et=[];for(let X=0,wt=Je.length;X<wt;X++){let nt=H(Je[X],M[X],Fe);se(nt.x,nt.y,-ue),de===0&&et.push(nt)}de===0&&re.push(et)}}Y=Gn.triangulateShape(ee,re)}let F=Y.length,W=m+y;for(let ee=0;ee<V;ee++){let re=f?H(C[ee],D[ee],W):C[ee];v?(x.copy(w.normals[0]).multiplyScalar(re.x),R.copy(w.binormals[0]).multiplyScalar(re.y),S.copy(E[0]).add(x).add(R),se(S.x,S.y,S.z)):se(re.x,re.y,0)}for(let ee=1;ee<=h;ee++)for(let re=0;re<V;re++){let oe=f?H(C[re],D[re],W):C[re];v?(x.copy(w.normals[ee]).multiplyScalar(oe.x),R.copy(w.binormals[ee]).multiplyScalar(oe.y),S.copy(E[ee]).add(x).add(R),se(S.x,S.y,S.z)):se(oe.x,oe.y,u/h*ee)}for(let ee=g-1;ee>=0;ee--){let re=ee/g,oe=d*Math.cos(re*Math.PI/2),de=m*Math.sin(re*Math.PI/2)+y;for(let ue=0,Fe=k.length;ue<Fe;ue++){let be=H(k[ue],B[ue],de);se(be.x,be.y,u+oe)}for(let ue=0,Fe=O.length;ue<Fe;ue++){let be=O[ue];M=L[ue];for(let ze=0,Je=be.length;ze<Je;ze++){let et=H(be[ze],M[ze],de);v?se(et.x,et.y+E[h-1].y,E[h-1].x+oe):se(et.x,et.y,u+oe)}}}Z(),te();function Z(){let ee=s.length/3;if(f){let re=0,oe=V*re;for(let de=0;de<F;de++){let ue=Y[de];Ne(ue[2]+oe,ue[1]+oe,ue[0]+oe)}re=h+g*2,oe=V*re;for(let de=0;de<F;de++){let ue=Y[de];Ne(ue[0]+oe,ue[1]+oe,ue[2]+oe)}}else{for(let re=0;re<F;re++){let oe=Y[re];Ne(oe[2],oe[1],oe[0])}for(let re=0;re<F;re++){let oe=Y[re];Ne(oe[0]+V*h,oe[1]+V*h,oe[2]+V*h)}}n.addGroup(ee,s.length/3-ee,0)}function te(){let ee=s.length/3,re=0;J(k,re),re+=k.length;for(let oe=0,de=O.length;oe<de;oe++){let ue=O[oe];J(ue,re),re+=ue.length}n.addGroup(ee,s.length/3-ee,1)}function J(ee,re){let oe=ee.length;for(;--oe>=0;){let de=oe,ue=oe-1;ue<0&&(ue=ee.length-1);for(let Fe=0,be=h+g*2;Fe<be;Fe++){let ze=V*Fe,Je=V*(Fe+1),et=re+de+ze,X=re+ue+ze,wt=re+ue+Je,nt=re+de+Je;pe(et,X,wt,nt)}}}function se(ee,re,oe){l.push(ee),l.push(re),l.push(oe)}function Ne(ee,re,oe){me(ee),me(re),me(oe);let de=s.length/3,ue=_.generateTopUV(n,s,de-3,de-2,de-1);Le(ue[0]),Le(ue[1]),Le(ue[2])}function pe(ee,re,oe,de){me(ee),me(re),me(de),me(re),me(oe),me(de);let ue=s.length/3,Fe=_.generateSideWallUV(n,s,ue-6,ue-3,ue-2,ue-1);Le(Fe[0]),Le(Fe[1]),Le(Fe[3]),Le(Fe[1]),Le(Fe[2]),Le(Fe[3])}function me(ee){s.push(l[ee*3+0]),s.push(l[ee*3+1]),s.push(l[ee*3+2])}function Le(ee){r.push(ee.x),r.push(ee.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Am(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,o=e.shapes.length;r<o;r++){let a=t[e.shapes[r]];n.push(a)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new hc[s.type]().fromJSON(s)),new i(n,e.options)}},Tm={generateTopUV:function(i,e,t,n,s){let r=e[t*3],o=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[s*3],h=e[s*3+1];return[new fe(r,o),new fe(a,l),new fe(c,h)]},generateSideWallUV:function(i,e,t,n,s,r){let o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],u=e[n*3+2],f=e[s*3],d=e[s*3+1],m=e[s*3+2],y=e[r*3],g=e[r*3+1],p=e[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new fe(o,1-l),new fe(c,1-u),new fe(f,1-m),new fe(y,1-p)]:[new fe(a,1-l),new fe(h,1-u),new fe(d,1-m),new fe(g,1-p)]}};function Am(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Yn=class i extends ta{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var It=class i extends dt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=e/a,f=t/l,d=[],m=[],y=[],g=[];for(let p=0;p<h;p++){let _=p*f-o;for(let E=0;E<c;E++){let v=E*u-r;m.push(v,-_,0),y.push(0,0,1),g.push(E/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let _=0;_<a;_++){let E=_+c*p,v=_+c*(p+1),w=_+1+c*(p+1),R=_+1+c*p;d.push(E,v,R),d.push(v,w,R)}this.setIndex(d),this.setAttribute("position",new Xe(m,3)),this.setAttribute("normal",new Xe(y,3)),this.setAttribute("uv",new Xe(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Dr=class i extends dt{constructor(e=new wn([new fe(0,.5),new fe(-.5,-.5),new fe(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],s=[],r=[],o=[],a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new Xe(s,3)),this.setAttribute("normal",new Xe(r,3)),this.setAttribute("uv",new Xe(o,2));function c(h){let u=s.length/3,f=h.extractPoints(t),d=f.shape,m=f.holes;Gn.isClockWise(d)===!1&&(d=d.reverse());for(let g=0,p=m.length;g<p;g++){let _=m[g];Gn.isClockWise(_)===!0&&(m[g]=_.reverse())}let y=Gn.triangulateShape(d,m);for(let g=0,p=m.length;g<p;g++){let _=m[g];d=d.concat(_)}for(let g=0,p=d.length;g<p;g++){let _=d[g];s.push(_.x,_.y,0),r.push(0,0,1),o.push(_.x,_.y)}for(let g=0,p=y.length;g<p;g++){let _=y[g],E=_[0]+u,v=_[1]+u,w=_[2]+u;n.push(E,v,w),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return Rm(t,e)}static fromJSON(e,t){let n=[];for(let s=0,r=e.shapes.length;s<r;s++){let o=t[e.shapes[s]];n.push(o)}return new i(n,e.curveSegments)}};function Rm(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){let s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}var cn=class i extends dt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new z,f=new z,d=[],m=[],y=[],g=[];for(let p=0;p<=n;p++){let _=[],E=p/n,v=o+E*a,w=e*Math.cos(v),R=Math.sqrt(e*e-w*w),x=0;p===0&&o===0?x=.5/t:p===n&&l===Math.PI&&(x=-.5/t);for(let S=0;S<=t;S++){let N=S/t,C=s+N*r;u.x=-R*Math.cos(C),u.y=w,u.z=R*Math.sin(C),m.push(u.x,u.y,u.z),f.copy(u).normalize(),y.push(f.x,f.y,f.z),g.push(N+x,1-E),_.push(c++)}h.push(_)}for(let p=0;p<n;p++)for(let _=0;_<t;_++){let E=h[p][_+1],v=h[p][_],w=h[p+1][_],R=h[p+1][_+1];(p!==0||o>0)&&d.push(E,v,R),(p!==n-1||l<Math.PI)&&d.push(v,w,R)}this.setIndex(d),this.setAttribute("position",new Xe(m,3)),this.setAttribute("normal",new Xe(y,3)),this.setAttribute("uv",new Xe(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Fn=class i extends dt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),s=Math.floor(s);let l=[],c=[],h=[],u=[],f=new z,d=new z,m=new z;for(let y=0;y<=n;y++){let g=o+y/n*a;for(let p=0;p<=s;p++){let _=p/s*r;d.x=(e+t*Math.cos(g))*Math.cos(_),d.y=(e+t*Math.cos(g))*Math.sin(_),d.z=t*Math.sin(g),c.push(d.x,d.y,d.z),f.x=e*Math.cos(_),f.y=e*Math.sin(_),m.subVectors(d,f).normalize(),h.push(m.x,m.y,m.z),u.push(p/s),u.push(y/n)}}for(let y=1;y<=n;y++)for(let g=1;g<=s;g++){let p=(s+1)*y+g-1,_=(s+1)*(y-1)+g-1,E=(s+1)*(y-1)+g,v=(s+1)*y+g;l.push(p,_,v),l.push(_,E,v)}this.setIndex(l),this.setAttribute("position",new Xe(c,3)),this.setAttribute("normal",new Xe(h,3)),this.setAttribute("uv",new Xe(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};function ns(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(Gu(s))s.isRenderTargetTexture?(Ye("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Gu(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function tn(i){let e={};for(let t=0;t<i.length;t++){let n=ns(i[t]);for(let s in n)e[s]=n[s]}return e}function Gu(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Cm(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Hc(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:at.workingColorSpace}var dn={clone:ns,merge:tn},Pm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Im=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Dt=class extends bi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Pm,this.fragmentShader=Im,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ns(e.uniforms),this.uniformsGroups=Cm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Pe().setHex(s.value);break;case"v2":this.uniforms[n].value=new fe().fromArray(s.value);break;case"v3":this.uniforms[n].value=new z().fromArray(s.value);break;case"v4":this.uniforms[n].value=new gt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ke().fromArray(s.value);break;case"m4":this.uniforms[n].value=new We().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Ns=class extends Dt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},St=class extends bi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Pe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=al,this.normalScale=new fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Us=class extends St{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new fe(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ot(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new Pe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Pe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Pe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(e){this._diffuseRoughness>0!=e>0&&this.version++,this._diffuseRoughness=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}get iridescenceThicknessRange(){return qi('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(e){qi('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=e[0],this.iridescenceThicknessMaximum=e[1]}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.diffuseRoughness=e.diffuseRoughness,this.diffuseRoughnessMap=e.diffuseRoughnessMap,this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Fs=class extends bi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=vd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},la=class extends bi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ys(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Uo(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Ai=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break t}o=t.length;break n}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ca=class extends Ai{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ac,endingEnd:ac}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case lc:r=e,a=2*t-n;break;case cc:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case lc:o=e,l=2*n-t;break;case cc:o=1,l=n+s[1]-s[0];break;default:o=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,m=(n-t)/(s-t),y=m*m,g=y*m,p=-f*g+2*f*y-f*m,_=(1+f)*g+(-1.5-2*f)*y+(-.5+f)*m+1,E=(-1-d)*g+(1.5+d)*y+.5*m,v=d*g-d*y;for(let w=0;w!==a;++w)r[w]=p*o[h+w]+_*o[c+w]+E*o[l+w]+v*o[u+w];return r}},ha=class extends Ai{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(s-t),u=1-h;for(let f=0;f!==a;++f)r[f]=o[c+f]*u+o[l+f]*h;return r}},ua=class extends Ai{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},da=class extends Ai{interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this.inTangents,u=this.outTangents;if(!h||!u){let m=(n-t)/(s-t),y=1-m;for(let g=0;g!==a;++g)r[g]=o[c+g]*y+o[l+g]*m;return r}let f=a*2,d=e-1;for(let m=0;m!==a;++m){let y=o[c+m],g=o[l+m],p=d*f+m*2,_=u[p],E=u[p+1],v=e*f+m*2,w=h[v],R=h[v+1],x=Dm(n,t,_,w,s);r[m]=Od(x,y,E,R,g)}return r}};function Od(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function Lm(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function Dm(i,e,t,n,s){let r=(i-e)/(s-e);for(let o=0;o<8;o++){let a=Od(r,e,t,n,s)-i;if(Math.abs(a)<1e-10)break;let l=Lm(r,e,t,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var _n=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ys(t,this.TimeBufferType),this.values=ys(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ys(e.times,Array),values:ys(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),Uo(e.settings)&&(n.settings={inTangents:ys(e.settings.inTangents,Array),outTangents:ys(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new ua(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ha(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ca(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new da(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case ur:t=this.InterpolantFactoryMethodDiscrete;break;case $o:t=this.InterpolantFactoryMethodLinear;break;case Bo:t=this.InterpolantFactoryMethodSmooth;break;case oc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ye("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ur;case this.InterpolantFactoryMethodLinear:return $o;case this.InterpolantFactoryMethodSmooth:return Bo;case this.InterpolantFactoryMethodBezier:return oc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e;Uo(this.settings)&&(Vu(this.settings.inTangents,e),Vu(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;Uo(this.settings)&&(Wu(this.settings.inTangents,e),Wu(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&($e("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&($e("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){$e("KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){$e("KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(s!==void 0&&Mp(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){$e("KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Bo,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(s)l=!0;else{let u=a*n,f=u-n,d=u+n;for(let m=0;m!==n;++m){let y=t[u+m];if(y!==t[f+m]||y!==t[d+m]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let u=a*n,f=o*n;for(let d=0;d!==n;++d)t[f+d]=t[u+d]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,Uo(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Vu(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]+=e}function Wu(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}_n.prototype.ValueTypeName="";_n.prototype.TimeBufferType=Float32Array;_n.prototype.ValueBufferType=Float32Array;_n.prototype.DefaultInterpolation=$o;var Ri=class extends _n{constructor(e,t,n){super(e,t,n)}};Ri.prototype.ValueTypeName="bool";Ri.prototype.ValueBufferType=Array;Ri.prototype.DefaultInterpolation=ur;Ri.prototype.InterpolantFactoryMethodLinear=void 0;Ri.prototype.InterpolantFactoryMethodSmooth=void 0;var fa=class extends _n{constructor(e,t,n,s){super(e,t,n,s)}};fa.prototype.ValueTypeName="color";var pa=class extends _n{constructor(e,t,n,s){super(e,t,n,s)}};pa.prototype.ValueTypeName="number";var ma=class extends Ai{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(s-t),c=e*a;for(let h=c+a;c!==h;c+=4)Ot.slerpFlat(r,0,o,c-a,o,c,l);return r}},Nr=class extends _n{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new ma(this.times,this.values,this.getValueSize(),e)}};Nr.prototype.ValueTypeName="quaternion";Nr.prototype.InterpolantFactoryMethodSmooth=void 0;var Ci=class extends _n{constructor(e,t,n){super(e,t,n)}};Ci.prototype.ValueTypeName="string";Ci.prototype.ValueBufferType=Array;Ci.prototype.DefaultInterpolation=ur;Ci.prototype.InterpolantFactoryMethodLinear=void 0;Ci.prototype.InterpolantFactoryMethodSmooth=void 0;var ga=class extends _n{constructor(e,t,n,s){super(e,t,n,s)}};ga.prototype.ValueTypeName="vector";var zo={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(Xu(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!Xu(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function Xu(i){try{let e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var xa=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=c.length;u<f;u+=2){let d=c[u],m=c[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Bd=new xa,Os=class{constructor(e){this.manager=e!==void 0?e:Bd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};Os.DEFAULT_MATERIAL_NAME="__DEFAULT";var vs=new WeakMap,_a=class extends Os{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=zo.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let u=vs.get(o);u===void 0&&(u=[],vs.set(o,u)),u.push({onLoad:t,onError:s})}return o}let a=Ts("img");function l(){h(),t&&t(this);let u=vs.get(this)||[];for(let f=0;f<u.length;f++){let d=u[f];d.onLoad&&d.onLoad(this)}vs.delete(this),r.manager.itemEnd(e)}function c(u){h(),s&&s(u),zo.remove(`image:${e}`);let f=vs.get(this)||[];for(let d=0;d<f.length;d++){let m=f[d];m.onError&&m.onError(u)}vs.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),zo.add(`image:${e}`,a),r.manager.itemStart(e),a.fetchPriority=this.priority,a.src=e,a}};var Ur=class extends Os{constructor(e){super(e)}load(e,t,n,s){let r=new jt,o=new _a(this.manager);return o.setPriority(this.priority),o.setCache(this.cache),o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},Fr=class extends en{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Pe(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Bs=class extends Fr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(en.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Pe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},rc=new We,qu=new z,Yu=new z,ya=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new fe(512,512),this.mapType=hn,this.map=null,this.mapPass=null,this.matrix=new We,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new wi,this._frameExtents=new fe(1,1),this._viewportCount=1,this._viewports=[new gt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;qu.setFromMatrixPosition(e.matrixWorld),t.position.copy(qu),Yu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Yu),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){rc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(rc,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===ws||e.reversedDepth?t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),t.multiply(rc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Fo=new z,Oo=new Ot,Hn=new z,Or=class extends en{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new We,this.projectionMatrix=new We,this.projectionMatrixInverse=new We,this.coordinateSystem=En,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Fo,Oo,Hn),Hn.x===1&&Hn.y===1&&Hn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Fo,Oo,Hn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Fo,Oo,Hn),Hn.x===1&&Hn.y===1&&Hn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Fo,Oo,Hn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},yi=new z,Zu=new fe,$u=new fe,qt=class extends Or{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Rs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ar*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Rs*2*Math.atan(Math.tan(ar*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){yi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(yi.x,yi.y).multiplyScalar(-e/yi.z),yi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(yi.x,yi.y).multiplyScalar(-e/yi.z)}getViewSize(e,t){return this.getViewBounds(e,Zu,$u),t.subVectors($u,Zu)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ar*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Ji=class extends Or{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},pc=class extends ya{constructor(){super(new Ji(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ki=class extends Fr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(en.DEFAULT_UP),this.updateMatrix(),this.target=new en,this.shadow=new pc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var Ms=-90,Ss=1,Pi=class extends en{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new qt(Ms,Ss,e,t);s.layers=this.layers,this.add(s);let r=new qt(Ms,Ss,e,t);r.layers=this.layers,this.add(r);let o=new qt(Ms,Ss,e,t);o.layers=this.layers,this.add(o);let a=new qt(Ms,Ss,e,t);a.layers=this.layers,this.add(a);let l=new qt(Ms,Ss,e,t);l.layers=this.layers,this.add(l);let c=new qt(Ms,Ss,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(let c of t)this.remove(c);if(e===En)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ws)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=y,e.setRenderTarget(n,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,f,d),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},va=class extends qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}},Br=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Nm.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Nm(){this._document.hidden===!1&&this.reset()}var Gc="\\[\\]\\.:\\/",Um=new RegExp("["+Gc+"]","g"),Vc="[^"+Gc+"]",Fm="[^"+Gc.replace("\\.","")+"]",Om=/((?:WC+[\/:])*)/.source.replace("WC",Vc),Bm=/(WCOD+)?/.source.replace("WCOD",Fm),km=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Vc),zm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Vc),Hm=new RegExp("^"+Om+Bm+km+zm+"$"),Gm=["material","materials","bones","map"],mc=class{constructor(e,t,n){let s=n||bt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},bt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Um,"")}static parseTrackName(e){let t=Hm.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Gm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ye("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){$e("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){$e("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){$e("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){$e("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){$e("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){$e("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){$e("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[s];if(o===void 0){let c=t.nodeName;$e("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){$e("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){$e("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};bt.Composite=mc;bt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};bt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};bt.prototype.GetterByBindingType=[bt.prototype._getValue_direct,bt.prototype._getValue_array,bt.prototype._getValue_arrayElement,bt.prototype._getValue_toArray];bt.prototype.SetterByBindingTypeAndVersioning=[[bt.prototype._setValue_direct,bt.prototype._setValue_direct_setNeedsUpdate,bt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[bt.prototype._setValue_array,bt.prototype._setValue_array_setNeedsUpdate,bt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[bt.prototype._setValue_arrayElement,bt.prototype._setValue_arrayElement_setNeedsUpdate,bt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[bt.prototype._setValue_fromArray,bt.prototype._setValue_fromArray_setNeedsUpdate,bt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Rv=new Float32Array(1);var $c=class $c{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};$c.prototype.isMatrix2=!0;var gc=$c;function Wc(i,e,t,n){let s=Vm(n);switch(t){case Rc:return i*e;case Aa:return i*e/s.components*s.byteLength;case Ra:return i*e/s.components*s.byteLength;case Li:return i*e*2/s.components*s.byteLength;case Ca:return i*e*2/s.components*s.byteLength;case Cc:return i*e*3/s.components*s.byteLength;case yn:return i*e*4/s.components*s.byteLength;case Pa:return i*e*4/s.components*s.byteLength;case Yr:case Zr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case $r:case Jr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case La:case Na:return Math.max(i,16)*Math.max(e,8)/4;case Ia:case Da:return Math.max(i,8)*Math.max(e,8)/2;case Ua:case Fa:case Ba:case ka:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Oa:case Kr:case za:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ha:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ga:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Va:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Wa:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Xa:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case qa:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ya:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Za:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case $a:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ja:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ka:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Qa:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ja:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case el:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case tl:case nl:case il:return Math.ceil(i/4)*Math.ceil(e/4)*16;case sl:case rl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Qr:case ol:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Vm(i){switch(i){case hn:case Ec:return{byteLength:1,components:1};case Gs:case wc:case Nt:return{byteLength:2,components:1};case wa:case Ta:return{byteLength:2,components:4};case Bn:case Ea:case un:return{byteLength:4,components:1};case Tc:case Ac:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Ye("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function af(){let i=null,e=!1,t=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),t(r,o)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function qm(i){let e=new WeakMap;function t(a,l){let c=a.array,h=a.usage,u=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,h),a.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){let h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((d,m)=>d.start-m.start);let f=0;for(let d=1;d<u.length;d++){let m=u[f],y=u[d];y.start<=m.start+m.count+1?m.count=Math.max(m.count,y.start+y.count-m.start):(++f,u[f]=y)}u.length=f+1;for(let d=0,m=u.length;d<m;d++){let y=u[d];i.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Ym=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Zm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,$m=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Jm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Km=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Qm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,jm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,e0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,t0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,n0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,i0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,s0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,r0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,o0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,a0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,l0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,c0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,h0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,u0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,d0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,f0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,p0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,m0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,g0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,x0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,_0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,y0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,v0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,M0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,S0="gl_FragColor = linearToOutputTexel( gl_FragColor );",b0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,E0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,w0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,T0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,A0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,R0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,C0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,P0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,I0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,L0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,D0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,N0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,U0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,F0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,O0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,B0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,k0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,z0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,H0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,G0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,V0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,W0=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,X0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,q0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Y0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Z0=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,$0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,J0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,K0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Q0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,j0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,eg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,tg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ng=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ig=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,sg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,rg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,og=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ag=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,cg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,ug=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,dg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,mg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,gg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,xg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,_g=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,yg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,vg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Mg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Sg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,bg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Eg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,wg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Tg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ag=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Rg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Cg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Pg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ig=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Lg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Dg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ng=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ug=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Fg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Og=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Bg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,kg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,zg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Hg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Gg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Vg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Wg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Xg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,qg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Yg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$g=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,jg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,ex=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,tx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,nx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ix=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,rx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ox=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ax=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ux=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,fx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,px=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,xx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_x=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Mx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Sx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ex=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,wx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,rt={alphahash_fragment:Ym,alphahash_pars_fragment:Zm,alphamap_fragment:$m,alphamap_pars_fragment:Jm,alphatest_fragment:Km,alphatest_pars_fragment:Qm,aomap_fragment:jm,aomap_pars_fragment:e0,batching_pars_vertex:t0,batching_vertex:n0,begin_vertex:i0,beginnormal_vertex:s0,bsdfs:r0,iridescence_fragment:o0,bumpmap_pars_fragment:a0,clipping_planes_fragment:l0,clipping_planes_pars_fragment:c0,clipping_planes_pars_vertex:h0,clipping_planes_vertex:u0,color_fragment:d0,color_pars_fragment:f0,color_pars_vertex:p0,color_vertex:m0,common:g0,defaultnormal_vertex:x0,displacementmap_pars_vertex:_0,displacementmap_vertex:y0,emissivemap_fragment:v0,emissivemap_pars_fragment:M0,colorspace_fragment:S0,colorspace_pars_fragment:b0,envmap_fragment:E0,envmap_common_pars_fragment:w0,envmap_pars_fragment:T0,envmap_pars_vertex:A0,envmap_physical_pars_fragment:B0,envmap_vertex:R0,fog_vertex:C0,fog_pars_vertex:P0,fog_fragment:I0,fog_pars_fragment:L0,gradientmap_pars_fragment:D0,lightmap_pars_fragment:N0,lights_lambert_fragment:U0,lights_lambert_pars_fragment:F0,lights_pars_begin:O0,lights_toon_fragment:k0,lights_toon_pars_fragment:z0,lights_phong_fragment:H0,lights_phong_pars_fragment:G0,lights_physical_fragment:V0,lights_physical_pars_fragment:W0,lights_fragment_begin:X0,lights_fragment_maps:q0,lights_fragment_end:Y0,lightprobes_pars_fragment:Z0,logdepthbuf_fragment:$0,logdepthbuf_pars_fragment:J0,logdepthbuf_pars_vertex:K0,logdepthbuf_vertex:Q0,map_fragment:j0,map_pars_fragment:eg,map_particle_fragment:tg,map_particle_pars_fragment:ng,metalnessmap_fragment:ig,metalnessmap_pars_fragment:sg,morphinstance_vertex:rg,morphcolor_vertex:og,morphnormal_vertex:ag,morphtarget_pars_vertex:lg,morphtarget_vertex:cg,normal_fragment_begin:hg,normal_fragment_maps:ug,normal_pars_fragment:dg,normal_pars_vertex:fg,normal_vertex:pg,normalmap_pars_fragment:mg,clearcoat_normal_fragment_begin:gg,clearcoat_normal_fragment_maps:xg,clearcoat_pars_fragment:_g,iridescence_pars_fragment:yg,opaque_fragment:vg,packing:Mg,premultiplied_alpha_fragment:Sg,project_vertex:bg,dithering_fragment:Eg,dithering_pars_fragment:wg,roughnessmap_fragment:Tg,roughnessmap_pars_fragment:Ag,shadowmap_pars_fragment:Rg,shadowmap_pars_vertex:Cg,shadowmap_vertex:Pg,shadowmask_pars_fragment:Ig,skinbase_vertex:Lg,skinning_pars_vertex:Dg,skinning_vertex:Ng,skinnormal_vertex:Ug,specularmap_fragment:Fg,specularmap_pars_fragment:Og,tonemapping_fragment:Bg,tonemapping_pars_fragment:kg,transmission_fragment:zg,transmission_pars_fragment:Hg,uv_pars_fragment:Gg,uv_pars_vertex:Vg,uv_vertex:Wg,worldpos_vertex:Xg,background_vert:qg,background_frag:Yg,backgroundCube_vert:Zg,backgroundCube_frag:$g,cube_vert:Jg,cube_frag:Kg,depth_vert:Qg,depth_frag:jg,distance_vert:ex,distance_frag:tx,equirect_vert:nx,equirect_frag:ix,linedashed_vert:sx,linedashed_frag:rx,meshbasic_vert:ox,meshbasic_frag:ax,meshlambert_vert:lx,meshlambert_frag:cx,meshmatcap_vert:hx,meshmatcap_frag:ux,meshnormal_vert:dx,meshnormal_frag:fx,meshphong_vert:px,meshphong_frag:mx,meshphysical_vert:gx,meshphysical_frag:xx,meshtoon_vert:_x,meshtoon_frag:yx,points_vert:vx,points_frag:Mx,shadow_vert:Sx,shadow_frag:bx,sprite_vert:Ex,sprite_frag:wx},Ie={common:{diffuse:{value:new Pe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new fe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Pe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Pe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new Pe(16777215)},opacity:{value:1},center:{value:new fe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},Jn={basic:{uniforms:tn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.fog]),vertexShader:rt.meshbasic_vert,fragmentShader:rt.meshbasic_frag},lambert:{uniforms:tn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new Pe(0)},envMapIntensity:{value:1}}]),vertexShader:rt.meshlambert_vert,fragmentShader:rt.meshlambert_frag},phong:{uniforms:tn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new Pe(0)},specular:{value:new Pe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:rt.meshphong_vert,fragmentShader:rt.meshphong_frag},standard:{uniforms:tn([Ie.common,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.roughnessmap,Ie.metalnessmap,Ie.fog,Ie.lights,{emissive:{value:new Pe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag},toon:{uniforms:tn([Ie.common,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.gradientmap,Ie.fog,Ie.lights,{emissive:{value:new Pe(0)}}]),vertexShader:rt.meshtoon_vert,fragmentShader:rt.meshtoon_frag},matcap:{uniforms:tn([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,{matcap:{value:null}}]),vertexShader:rt.meshmatcap_vert,fragmentShader:rt.meshmatcap_frag},points:{uniforms:tn([Ie.points,Ie.fog]),vertexShader:rt.points_vert,fragmentShader:rt.points_frag},dashed:{uniforms:tn([Ie.common,Ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:rt.linedashed_vert,fragmentShader:rt.linedashed_frag},depth:{uniforms:tn([Ie.common,Ie.displacementmap]),vertexShader:rt.depth_vert,fragmentShader:rt.depth_frag},normal:{uniforms:tn([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,{opacity:{value:1}}]),vertexShader:rt.meshnormal_vert,fragmentShader:rt.meshnormal_frag},sprite:{uniforms:tn([Ie.sprite,Ie.fog]),vertexShader:rt.sprite_vert,fragmentShader:rt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:rt.background_vert,fragmentShader:rt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:rt.backgroundCube_vert,fragmentShader:rt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:rt.cube_vert,fragmentShader:rt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:rt.equirect_vert,fragmentShader:rt.equirect_frag},distance:{uniforms:tn([Ie.common,Ie.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:rt.distance_vert,fragmentShader:rt.distance_frag},shadow:{uniforms:tn([Ie.lights,Ie.fog,{color:{value:new Pe(0)},opacity:{value:1}}]),vertexShader:rt.shadow_vert,fragmentShader:rt.shadow_frag}};Jn.physical={uniforms:tn([Jn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new fe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Ke},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new Pe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new fe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new Pe(0)},specularColor:{value:new Pe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new fe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag};var cl={r:0,b:0,g:0},Tx=new We,lf=new Ke;lf.set(-1,0,0,0,1,0,0,0,1);function Ax(i,e,t,n,s,r){let o=new Pe(0),a=s===!0?0:1,l,c,h=null,u=0,f=null;function d(_){let E=_.isScene===!0?_.background:null;if(E&&E.isTexture){let v=_.backgroundBlurriness>0;E=e.get(E,v)}return E}function m(_){let E=!1,v=d(_);v===null?g(o,a):v&&v.isColor&&(g(v,1),E=!0);let w=i.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(_,E){let v=d(E);v&&v.isCubeTexture?(c===void 0&&(c=new Qe(new Ce(1,1,1),new Dt({name:"BackgroundCubeMaterial",uniforms:ns(Jn.backgroundCube.uniforms),vertexShader:Jn.backgroundCube.vertexShader,fragmentShader:Jn.backgroundCube.fragmentShader,side:Wt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,R,x){this.matrixWorld.copyPosition(x.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Tx.makeRotationFromEuler(E.backgroundRotation)).transpose(),v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(lf),c.material.toneMapped=at.getTransfer(v.colorSpace)!==pt,(h!==v||u!==v.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=v,u=v.version,f=i.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new Qe(new It(2,2),new Dt({name:"BackgroundMaterial",uniforms:ns(Jn.background.uniforms),vertexShader:Jn.background.vertexShader,fragmentShader:Jn.background.fragmentShader,side:Zn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=at.getTransfer(v.colorSpace)!==pt,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||u!==v.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=v,u=v.version,f=i.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function g(_,E){_.getRGB(cl,Hc(i)),t.buffers.color.setClear(cl.r,cl.g,cl.b,E,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(_,E=1){o.set(_),a=E,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(_){a=_,g(o,a)},render:m,addToRenderList:y,dispose:p}}function Rx(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,o=!1;function a(O,T,U,P,k){let H=!1,V=u(O,P,U,T);r!==V&&(r=V,c(r.object)),H=d(O,P,U,k),H&&m(O,P,U,k),k!==null&&e.update(k,i.ELEMENT_ARRAY_BUFFER),(H||o)&&(o=!1,v(O,T,U,P),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function l(){return i.createVertexArray()}function c(O){return i.bindVertexArray(O)}function h(O){return i.deleteVertexArray(O)}function u(O,T,U,P){let k=P.wireframe===!0,H=n[T.id];H===void 0&&(H={},n[T.id]=H);let V=O.isInstancedMesh===!0?O.id:0,$=H[V];$===void 0&&($={},H[V]=$);let B=$[U.id];B===void 0&&(B={},$[U.id]=B);let L=B[k];return L===void 0&&(L=f(l()),B[k]=L),L}function f(O){let T=[],U=[],P=[];for(let k=0;k<t;k++)T[k]=0,U[k]=0,P[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:T,enabledAttributes:U,attributeDivisors:P,object:O,attributes:{},index:null}}function d(O,T,U,P){let k=r.attributes,H=T.attributes,V=0,$=U.getAttributes();for(let B in $)if($[B].location>=0){let M=k[B],D=H[B];if(D===void 0&&(B==="instanceMatrix"&&O.instanceMatrix&&(D=O.instanceMatrix),B==="instanceColor"&&O.instanceColor&&(D=O.instanceColor)),M===void 0||M.attribute!==D||D&&M.data!==D.data)return!0;V++}return r.attributesNum!==V||r.index!==P}function m(O,T,U,P){let k={},H=T.attributes,V=0,$=U.getAttributes();for(let B in $)if($[B].location>=0){let M=H[B];M===void 0&&(B==="instanceMatrix"&&O.instanceMatrix&&(M=O.instanceMatrix),B==="instanceColor"&&O.instanceColor&&(M=O.instanceColor));let D={};D.attribute=M,M&&M.data&&(D.data=M.data),k[B]=D,V++}r.attributes=k,r.attributesNum=V,r.index=P}function y(){let O=r.newAttributes;for(let T=0,U=O.length;T<U;T++)O[T]=0}function g(O){p(O,0)}function p(O,T){let U=r.newAttributes,P=r.enabledAttributes,k=r.attributeDivisors;U[O]=1,P[O]===0&&(i.enableVertexAttribArray(O),P[O]=1),k[O]!==T&&(i.vertexAttribDivisor(O,T),k[O]=T)}function _(){let O=r.newAttributes,T=r.enabledAttributes;for(let U=0,P=T.length;U<P;U++)T[U]!==O[U]&&(i.disableVertexAttribArray(U),T[U]=0)}function E(O,T,U,P,k,H,V){V===!0?i.vertexAttribIPointer(O,T,U,k,H):i.vertexAttribPointer(O,T,U,P,k,H)}function v(O,T,U,P){y();let k=P.attributes,H=U.getAttributes(),V=T.defaultAttributeValues;for(let $ in H){let B=H[$];if(B.location>=0){let L=k[$];if(L===void 0&&($==="instanceMatrix"&&O.instanceMatrix&&(L=O.instanceMatrix),$==="instanceColor"&&O.instanceColor&&(L=O.instanceColor)),L!==void 0){let M=L.normalized,D=L.itemSize,Y=e.get(L);if(Y===void 0)continue;let F=Y.buffer,W=Y.type,Z=Y.bytesPerElement,te=W===i.INT||W===i.UNSIGNED_INT||L.gpuType===Ea;if(L.isInterleavedBufferAttribute){let J=L.data,se=J.isInterleavedBuffer===!0?J.stride:J.itemSize,Ne=L.offset;if(J.isInstancedInterleavedBuffer||J.isInstancedBufferAttribute){for(let pe=0;pe<B.locationSize;pe++)p(B.location+pe,J.meshPerAttribute);O.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let pe=0;pe<B.locationSize;pe++)g(B.location+pe);i.bindBuffer(i.ARRAY_BUFFER,F);for(let pe=0;pe<B.locationSize;pe++)E(B.location+pe,D/B.locationSize,W,M,se*Z,(Ne+D/B.locationSize*pe)*Z,te)}else{if(L.isInstancedBufferAttribute){for(let J=0;J<B.locationSize;J++)p(B.location+J,L.meshPerAttribute);O.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=L.meshPerAttribute*L.count)}else for(let J=0;J<B.locationSize;J++)g(B.location+J);i.bindBuffer(i.ARRAY_BUFFER,F);for(let J=0;J<B.locationSize;J++)E(B.location+J,D/B.locationSize,W,M,D*Z,D/B.locationSize*J*Z,te)}}else if(V!==void 0){let M=V[$];if(M!==void 0)switch(M.length){case 2:i.vertexAttrib2fv(B.location,M);break;case 3:i.vertexAttrib3fv(B.location,M);break;case 4:i.vertexAttrib4fv(B.location,M);break;default:i.vertexAttrib1fv(B.location,M)}}}}_()}function w(){N();for(let O in n){let T=n[O];for(let U in T){let P=T[U];for(let k in P){let H=P[k];for(let V in H)h(H[V].object),delete H[V];delete P[k]}}delete n[O]}}function R(O){if(n[O.id]===void 0)return;let T=n[O.id];for(let U in T){let P=T[U];for(let k in P){let H=P[k];for(let V in H)h(H[V].object),delete H[V];delete P[k]}}delete n[O.id]}function x(O){for(let T in n){let U=n[T];for(let P in U){let k=U[P];if(k[O.id]===void 0)continue;let H=k[O.id];for(let V in H)h(H[V].object),delete H[V];delete k[O.id]}}}function S(O){for(let T in n){let U=n[T],P=O.isInstancedMesh===!0?O.id:0,k=U[P];if(k!==void 0){for(let H in k){let V=k[H];for(let $ in V)h(V[$].object),delete V[$];delete k[H]}delete U[P],Object.keys(U).length===0&&delete n[T]}}}function N(){C(),o=!0,r!==s&&(r=s,c(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:N,resetDefaultState:C,dispose:w,releaseStatesOfGeometry:R,releaseStatesOfObject:S,releaseStatesOfProgram:x,initAttributes:y,enableAttribute:g,disableUnusedAttributes:_}}function Cx(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function o(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function a(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let f=0;for(let d=0;d<h;d++)f+=c[d];t.update(f,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function Px(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let x=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(x){return!(x!==yn&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(x){let S=x===Nt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(x!==hn&&x!==un&&!S&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(x){if(x==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(Ye("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=t.logarithmicDepthBuffer===!0&&u===!1;t.reversedDepthBuffer===!0&&u===!1&&Ye("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&u===!0&&Ye("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),_=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),R=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:m,maxTextureSize:y,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:_,maxVaryings:E,maxFragmentUniforms:v,maxSamples:w,samples:R}}function Ix(i){let e=this,t=null,n=0,s=!1,r=!1,o=new an,a=new Ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,d){let m=u.clippingPlanes,y=u.clipIntersection,g=u.clipShadows,p=i.get(u);if(!s||m===null||m.length===0||r&&!g)r?h(null):c();else{let _=r?0:n,E=_*4,v=p.clippingState||null;l.value=v,v=h(m,f,E,d);for(let w=0;w!==E;++w)v[w]=t[w];p.clippingState=v,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,d,m){let y=u!==null?u.length:0,g=null;if(y!==0){if(g=l.value,m!==!0||g===null){let p=d+y*4,_=f.matrixWorldInverse;a.getNormalMatrix(_),(g===null||g.length<p)&&(g=new Float32Array(p));for(let E=0,v=d;E!==y;++E,v+=4)o.copy(u[E]).applyMatrix4(_,a),o.normal.toArray(g,v),g[v+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,g}}var is=class extends Pt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Mr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ce(5,5,5),r=new Dt({name:"CubemapFromEquirect",uniforms:ns(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Wt,blending:ai});r.uniforms.tEquirect.value=t;let o=new Qe(s,r),a=t.minFilter;return t.minFilter===On&&(t.minFilter=Yt),new Pi(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}},kd=256,Lx=3,Dx=20,cf=256,hf=16,Nx=3,Ux=new z,Fx=new Pe,ss=class i{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Pi(1,10,null),this._boxMesh=new Qe(new Ce(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:o=256,position:a=Ux}=r,l=this._renderer;this._setSize(o);let c=this._allocateTarget(),h=this._getSourceTarget(!0);t>0&&(h.texture.mipmapsAutoUpdate=!1);let u=l.autoClear,f=l.autoClearColor,d=l.autoClearDepth,m=l.autoClearStencil,y=e.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,y===null&&(e.background=l.getClearColor(Fx));let g=new Pi(n,s,h);return g.position.copy(a),g.update(l,e),l.autoClear=u,l.autoClearColor=f,l.autoClearDepth=d,l.autoClearStencil=m,e.background=y,t>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(kd,Oc(e))}_fromTexture(e,t){e.mapping===es||e.mapping===Hs?this._setSize(e.image.length===0?kd:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=zd(e,!1,!1),n=Math.log2(e)-Lx;for(let s=0;s<=n;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=zd(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=e,r.activeMipmapLevel=t;let o=e.width>>t;e.viewport.set(0,0,o,o),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===es||e.mapping===Hs?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gd()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Hd()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=Ox(),this._integrationMaterial=Bx());let t=this._cubeSize,n=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/hf);for(let o=0;o<=n;o++){let a=i.lodToRoughness(o,n);if(o>n-Nx)r.roughness.value=a,this._renderCube(e,o,this._integrationMaterial);else{let l=a>0?Math.log2(t)+.5*Math.log2(6/(cf*Math.pow(a,4)))+.5:0;s.roughness.value=a,s.lodBias.value=l,this._renderCube(e,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=kx());let n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,n),s.envMap.value=e.texture,this._renderCube(r,0,n)}};function zd(i,e,t){return new is(i,{minFilter:On,generateMipmaps:e,type:Nt,colorSpace:dr,depthBuffer:t})}function to(i,e,t){return new Dt({name:i,uniforms:e,vertexShader:rt.cube_vert,fragmentShader:t,side:Wt,blending:ai,depthTest:!1,depthWrite:!1})}function Ox(){return to("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${cf}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Bx(){return to("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:hf}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function kx(){return to("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Dx}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Hd(){return to("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Gd(){return to("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function zx(i){let e=new WeakMap,t=new WeakMap,n=null;function s(f,d=!1){return f==null?null:d?o(f):r(f)}function r(f){if(f&&f.isTexture){let d=f.mapping;if(d===Xr||d===Sa)if(e.has(f)){let m=e.get(f).texture;return a(m,f.mapping)}else{let m=f.image;if(m&&m.height>0){let y=new is(m.height);return y.fromEquirectangularTexture(i,f),e.set(f,y),f.addEventListener("dispose",c),a(y.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture&&f.isPMREMTexture!==!0){let d=f.mapping,m=d===Xr||d===Sa,y=d===es||d===Hs;if(m||y){let g=t.get(f),p=g!==void 0?g.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return n===null&&(n=new ss(i)),g=m?n.fromEquirectangular(f,g):n.fromCubemap(f,g),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),g.texture;if(g!==void 0)return g.texture;{let _=f.image;return m&&_&&_.height>0||y&&_&&l(_)?(n===null&&(n=new ss(i)),g=m?n.fromEquirectangular(f):n.fromCubemap(f),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),f.addEventListener("dispose",h),g.texture):null}}}return f}function a(f,d){return d===Xr?f.mapping=es:d===Sa&&(f.mapping=Hs),f}function l(f){let d=0,m=6;for(let y=0;y<m;y++)f[y]!==void 0&&d++;return d===m}function c(f){let d=f.target;d.removeEventListener("dispose",c);let m=e.get(d);m!==void 0&&(e.delete(d),m.dispose())}function h(f){let d=f.target;d.removeEventListener("dispose",h);let m=t.get(d);m!==void 0&&(t.delete(d),m.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function Hx(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&qi("WebGLRenderer: "+n+" extension not supported."),s}}}function Gx(i,e,t,n){let s={},r=new WeakMap,o=new FinalizationRegistry(m=>delete s[m]);function a(m){l(m.target)}function l(m){m.index!==null&&e.remove(m.index);for(let g in m.attributes)e.remove(m.attributes[g]);m.removeEventListener("dispose",a),delete s[m.id],o.unregister(m);let y=r.get(m);y&&(e.remove(y),r.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,t.memory.geometries--}function c(m,y){return s[y.id]!==void 0||(y.addEventListener("dispose",a),s[y.id]=new WeakRef(y),o.register(y,y.id,y),t.memory.geometries++),y}function h(m){let y=m.attributes;for(let g in y)e.update(y[g],i.ARRAY_BUFFER)}function u(m){let y=m.index,g=m.attributes.position,p=0;if(g===void 0)return;let _=y!==null?y.array.length:g.array.length/3-1,E=g.count>=65535?yr:_r,v=new E(Math.ceil(_/3)*6,1),w=v.array;if(y!==null){let x=y.array;p=y.version;for(let S=0,N=0;S<_;S+=3){let C=x[S+0],O=x[S+1],T=x[S+2];w[N++]=C,w[N++]=O,w[N++]=O,w[N++]=T,w[N++]=T,w[N++]=C}}else{p=g.version;for(let x=0,S=0;x<_;x+=3){let N=x+0,C=x+1,O=x+2;w[S++]=N,w[S++]=C,w[S++]=C,w[S++]=O,w[S++]=O,w[S++]=N}}v.version=p;let R=r.get(m);R&&e.remove(R),r.set(m,v)}function f(m){let y=r.get(m);if(y){let g=m.index;g!==null&&y.version<g.version&&u(m)}else u(m);return r.get(m)}function d(){for(let m in s){let y=s[m].deref();y!==void 0&&l(y)}}return{get:c,update:h,getWireframeAttribute:f,dispose:d}}function Vx(i,e,t){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,f){i.drawElements(n,f,r,u*o),t.update(f,n,1)}function c(u,f,d){d!==0&&(i.drawElementsInstanced(n,f,r,u*o,d),t.update(f,n,d))}function h(u,f,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,d);let y=0;for(let g=0;g<d;g++)y+=f[g];t.update(y,n,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Wx(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:$e("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Xx(i,e,t){let n=new WeakMap,s=new gt;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,f=n.get(a);if(f===void 0||f.count!==u){let N=function(){x.dispose(),n.delete(a),a.removeEventListener("dispose",N)};f!==void 0&&f.texture.dispose();let d=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],_=a.morphAttributes.color||[],E=0;d===!0&&(E=1),m===!0&&(E=2),y===!0&&(E=3);let v=a.attributes.position.count*E,w=1;v>e.maxTextureSize&&(w=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let R=new Float32Array(v*w*4*u),x=new mr(R,v,w,u);x.type=un,x.needsUpdate=!0;let S=E*4;for(let C=0;C<u;C++){let O=g[C],T=p[C],U=_[C],P=v*w*4*C;for(let k=0;k<O.count;k++){let H=k*S;d===!0&&(s.fromBufferAttribute(O,k),R[P+H+0]=s.x,R[P+H+1]=s.y,R[P+H+2]=s.z,R[P+H+3]=0),m===!0&&(s.fromBufferAttribute(T,k),R[P+H+4]=s.x,R[P+H+5]=s.y,R[P+H+6]=s.z,R[P+H+7]=0),y===!0&&(s.fromBufferAttribute(U,k),R[P+H+8]=s.x,R[P+H+9]=s.y,R[P+H+10]=s.z,R[P+H+11]=U.itemSize===4?s.w:1)}}f={count:u,texture:x,size:new fe(v,w)},n.set(a,f),a.addEventListener("dispose",N)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let d=0;for(let y=0;y<c.length;y++)d+=c[y];let m=a.morphTargetsRelative?1:1-d;l.getUniforms().setValue(i,"morphTargetBaseInfluence",m),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function qx(i,e,t,n,s){let r=new WeakMap;function o(c){let h=s.render.frame,u=c.geometry,f=e.get(c,u);if(r.get(f)!==h&&(e.update(f),r.set(f,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let d=c.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return f}function a(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:a}}var Yx={[kr]:"LINEAR_TONE_MAPPING",[zr]:"REINHARD_TONE_MAPPING",[Hr]:"CINEON_TONE_MAPPING",[Ii]:"ACES_FILMIC_TONE_MAPPING",[Vr]:"AGX_TONE_MAPPING",[Wr]:"NEUTRAL_TONE_MAPPING",[Gr]:"CUSTOM_TONE_MAPPING"};function Zx(i,e,t,n,s,r){let o=new Pt(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=null,h=new dt;h.setAttribute("position",new Xe([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new Xe([0,2,0,0,2,0],2));let u=new Ns({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new Qe(h,u),d=new Ji(-1,1,1,-1,0,1),m=null,y=null,g=!1,p,_=null,E=[],v=!1;this.setSize=function(w,R){o.setSize(w,R),a!==null&&a.setSize(w,R),l!==null&&l.setSize(w,R);for(let x=0;x<E.length;x++){let S=E[x];S.setSize&&S.setSize(w,R)}},this.setEffects=function(w){E=w,v=E.length>0&&E[0].isRenderPass===!0;let R=o.width,x=o.height;E.length>0&&a===null&&(a=new Pt(R,x,{type:Nt,depthBuffer:!1,stencilBuffer:!1}),l=new Pt(R,x,{type:Nt,depthBuffer:!1,stencilBuffer:!1}));let S=s===!0&&E.some(N=>N.needsDepthTexture===!0);S!==(o.depthTexture!==null)&&(S===!0&&c===null&&(c=new oi(R,x),r===!0&&(c.format=li,c.type=ts)),o.dispose(),o.depthTexture=S?c:null,o.resolveDepthBuffer=S,o.storeMultisampledDepthBuffer=S);for(let N=0;N<E.length;N++){let C=E[N];C.setSize&&C.setSize(R,x),S&&C.needsDepthTexture===!0&&C.setDepthTexture&&C.setDepthTexture(c)}},this.begin=function(w,R){if(g||w.toneMapping===An&&E.length===0)return!1;if(_=R,R!==null){let x=R.width,S=R.height;(o.width!==x||o.height!==S)&&this.setSize(x,S)}return v===!1&&w.setRenderTarget(o),p=w.toneMapping,w.toneMapping=An,!0},this.hasRenderPass=function(){return v},this.end=function(w,R){w.toneMapping=p,g=!0;let x=o,S=a;for(let N=0;N<E.length;N++){let C=E[N];C.enabled!==!1&&(C.render(w,S,x,R),C.needsSwap!==!1&&(x=S,S=S===a?l:a))}if(m!==w.outputColorSpace||y!==w.toneMapping){m=w.outputColorSpace,y=w.toneMapping,u.defines={},at.getTransfer(m)===pt&&(u.defines.SRGB_TRANSFER="");let N=Yx[y];N&&(u.defines[N]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=x.texture,w.setRenderTarget(_),w.render(f,d),_=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),h.dispose(),u.dispose()}}var uf=new jt,df=new oi(1,1),ff=new Sr(1),pf=new mr,mf=new Qo,gf=new Mr,Vd=[],Wd=[],Xd=new Float32Array(16),qd=new Float32Array(9),Yd=new Float32Array(4);function Ws(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Vd[s];if(r===void 0&&(r=new Float32Array(s),Vd[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Bt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function kt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function dl(i,e){let t=Wd[e];t===void 0&&(t=new Int32Array(e),Wd[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function $x(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Jx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;i.uniform2fv(this.addr,e),kt(t,e)}}function Kx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Bt(t,e))return;i.uniform3fv(this.addr,e),kt(t,e)}}function Qx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;i.uniform4fv(this.addr,e),kt(t,e)}}function jx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Bt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),kt(t,e)}else{if(Bt(t,n))return;Yd.set(n),i.uniformMatrix2fv(this.addr,!1,Yd),kt(t,n)}}function e_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Bt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),kt(t,e)}else{if(Bt(t,n))return;qd.set(n),i.uniformMatrix3fv(this.addr,!1,qd),kt(t,n)}}function t_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Bt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),kt(t,e)}else{if(Bt(t,n))return;Xd.set(n),i.uniformMatrix4fv(this.addr,!1,Xd),kt(t,n)}}function n_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function i_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;i.uniform2iv(this.addr,e),kt(t,e)}}function s_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;i.uniform3iv(this.addr,e),kt(t,e)}}function r_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;i.uniform4iv(this.addr,e),kt(t,e)}}function o_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function a_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;i.uniform2uiv(this.addr,e),kt(t,e)}}function l_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;i.uniform3uiv(this.addr,e),kt(t,e)}}function c_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;i.uniform4uiv(this.addr,e),kt(t,e)}}function fl(i){return i.version===0&&(i.compareFunction=Lc,i.needsUpdate=!0),i}function h_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=fl(df):r=uf,t.setTexture2D(e||r,s)}function u_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||mf,s)}function d_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=fl(ff):r=gf,t.setTextureCube(e||r,s)}function f_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||pf,s)}function p_(i){switch(i){case 5126:return $x;case 35664:return Jx;case 35665:return Kx;case 35666:return Qx;case 35674:return jx;case 35675:return e_;case 35676:return t_;case 5124:case 35670:return n_;case 35667:case 35671:return i_;case 35668:case 35672:return s_;case 35669:case 35673:return r_;case 5125:return o_;case 36294:return a_;case 36295:return l_;case 36296:return c_;case 35678:case 36198:case 36298:case 36306:case 35682:return h_;case 35679:case 36299:case 36307:return u_;case 35680:case 36300:case 36308:case 36293:return d_;case 36289:case 36303:case 36311:case 36292:return f_}}function m_(i,e){i.uniform1fv(this.addr,e)}function g_(i,e){let t=Ws(e,this.size,2);i.uniform2fv(this.addr,t)}function x_(i,e){let t=Ws(e,this.size,3);i.uniform3fv(this.addr,t)}function __(i,e){let t=Ws(e,this.size,4);i.uniform4fv(this.addr,t)}function y_(i,e){let t=Ws(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function v_(i,e){let t=Ws(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function M_(i,e){let t=Ws(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function S_(i,e){i.uniform1iv(this.addr,e)}function b_(i,e){i.uniform2iv(this.addr,e)}function E_(i,e){i.uniform3iv(this.addr,e)}function w_(i,e){i.uniform4iv(this.addr,e)}function T_(i,e){i.uniform1uiv(this.addr,e)}function A_(i,e){i.uniform2uiv(this.addr,e)}function R_(i,e){i.uniform3uiv(this.addr,e)}function C_(i,e){i.uniform4uiv(this.addr,e)}function P_(i,e,t){let n=this.cache,s=e.length,r=dl(t,s);Bt(n,r)||(i.uniform1iv(this.addr,r),kt(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=fl(df):o=uf;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function I_(i,e,t){let n=this.cache,s=e.length,r=dl(t,s);Bt(n,r)||(i.uniform1iv(this.addr,r),kt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||mf,r[o])}function L_(i,e,t){let n=this.cache,s=e.length,r=dl(t,s);Bt(n,r)||(i.uniform1iv(this.addr,r),kt(n,r));let o;this.type===i.SAMPLER_CUBE_SHADOW?o=fl(ff):o=gf;for(let a=0;a!==s;++a)t.setTextureCube(e[a]||o,r[a])}function D_(i,e,t){let n=this.cache,s=e.length,r=dl(t,s);Bt(n,r)||(i.uniform1iv(this.addr,r),kt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||pf,r[o])}function N_(i){switch(i){case 5126:return m_;case 35664:return g_;case 35665:return x_;case 35666:return __;case 35674:return y_;case 35675:return v_;case 35676:return M_;case 5124:case 35670:return S_;case 35667:case 35671:return b_;case 35668:case 35672:return E_;case 35669:case 35673:return w_;case 5125:return T_;case 36294:return A_;case 36295:return R_;case 36296:return C_;case 35678:case 36198:case 36298:case 36306:case 35682:return P_;case 35679:case 36299:case 36307:return I_;case 35680:case 36300:case 36308:case 36293:return L_;case 36289:case 36303:case 36311:case 36292:return D_}}var Qc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=p_(t.type)}},jc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=N_(t.type)}},eh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},Jc=/(\w+)(\])?(\[|\.)?/g;function Zd(i,e){i.seq.push(e),i.map[e.id]=e}function U_(i,e,t){let n=i.name,s=n.length;for(Jc.lastIndex=0;;){let r=Jc.exec(n),o=Jc.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Zd(t,c===void 0?new Qc(a,i,e):new jc(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new eh(a),Zd(t,u)),t=u}}}var Vs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);U_(a,l,this)}let s=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function $d(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var F_=37297,O_=0;function B_(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var Jd=new Ke;function k_(i){at._getMatrix(Jd,at.workingColorSpace,i);let e=`mat3( ${Jd.elements.map(t=>t.toFixed(4))} )`;switch(at.getTransfer(i)){case fr:return[e,"LinearTransferOETF"];case pt:return[e,"sRGBTransferOETF"];default:return Ye("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Kd(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+B_(i.getShaderSource(e),a)}else return r}function z_(i,e){let t=k_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var H_={[kr]:"Linear",[zr]:"Reinhard",[Hr]:"Cineon",[Ii]:"ACESFilmic",[Vr]:"AgX",[Wr]:"Neutral",[Gr]:"Custom"};function G_(i,e){let t=H_[e];return t===void 0?(Ye("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var hl=new z;function V_(){at.getLuminanceCoefficients(hl);let i=hl.x.toFixed(4),e=hl.y.toFixed(4),t=hl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function W_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(eo).join(`
`)}function X_(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function q_(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function eo(i){return i!==""}function Qd(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function jd(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Y_=/^[ \t]*#include +<([\w\d./]+)>/gm;function th(i){return i.replace(Y_,Z_)}function Z_(i,e){let t=rt[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return th(t)}var $_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ef(i){return i.replace($_,J_)}function J_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function tf(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var K_={[Qi]:"SHADOWMAP_TYPE_PCF",[ks]:"SHADOWMAP_TYPE_VSM"};function Q_(i){return K_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var j_={[Hs]:"ENVMAP_MODE_REFRACTION"};function ey(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":j_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var ty={[Sc]:"ENVMAP_BLENDING_MULTIPLY",[xd]:"ENVMAP_BLENDING_MIX",[_d]:"ENVMAP_BLENDING_ADD"};function ny(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":ty[i.combine]||"ENVMAP_BLENDING_NONE"}function iy(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=Q_(t),c=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=ey(t),u=ny(t),f=W_(t),d=X_(r),m=s.createProgram(),y,g,p=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(y=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d].filter(eo).join(`
`),y.length>0&&(y+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d].filter(eo).join(`
`),g.length>0&&(g+=`
`)):(y=[tf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(eo).join(`
`),g=[tf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==An?"#define TONE_MAPPING":"",t.toneMapping!==An?rt.tonemapping_pars_fragment:"",t.toneMapping!==An?G_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",rt.colorspace_pars_fragment,z_("linearToOutputTexel",t.outputColorSpace),V_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(eo).join(`
`)),o=th(o),o=Qd(o,t),o=jd(o,t),a=th(a),a=Qd(a,t),a=jd(a,t),o=ef(o),a=ef(a),t.isRawShaderMaterial!==!0&&(p=`#version 300 es
`,y=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,g=["#define varying in",t.glslVersion===Uc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Uc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let _=p+y+o,E=p+g+a,v=$d(s,s.VERTEX_SHADER,_),w=$d(s,s.FRAGMENT_SHADER,E);s.attachShader(m,v),s.attachShader(m,w),t.index0AttributeName!==void 0?s.bindAttribLocation(m,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function R(C){if(i.debug.checkShaderErrors){let O=s.getProgramInfoLog(m)||"",T=s.getShaderInfoLog(v)||"",U=s.getShaderInfoLog(w)||"",P=O.trim(),k=T.trim(),H=U.trim(),V=!0,$=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(V=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,m,v,w);else{let B=Kd(s,v,"vertex"),L=Kd(s,w,"fragment");$e("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+P+`
`+B+`
`+L)}else P!==""?Ye("WebGLProgram: Program Info Log:",P):(k===""||H==="")&&($=!1);$&&(C.diagnostics={runnable:V,programLog:P,vertexShader:{log:k,prefix:y},fragmentShader:{log:H,prefix:g}})}s.deleteShader(v),s.deleteShader(w),x=new Vs(s,m),S=q_(s,m)}let x;this.getUniforms=function(){return x===void 0&&R(this),x};let S;this.getAttributes=function(){return S===void 0&&R(this),S};let N=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=s.getProgramParameter(m,F_)),N},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=O_++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=v,this.fragmentShader=w,this}var sy=0,nh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new ih(e),t.set(e,n)),n}},ih=class{constructor(e){this.id=sy++,this.code=e,this.usedTimes=0}};function ry(i){return i===Li||i===Kr||i===Qr}function oy(i,e,t,n,s,r){let o=new gr,a=new nh,l=new Set,c=[],h=new Map,u=n.logarithmicDepthBuffer,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(x){return l.add(x),x===0?"uv":`uv${x}`}function m(x,S,N,C,O,T){let U=C.fog,P=O.geometry,k=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?C.environment:null,H=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,V=e.get(x.envMap||k,H),$=f[x.type],B=n.precision;x.precision!==null&&(B=n.getMaxPrecision(x.precision),B!==x.precision&&Ye("WebGLProgram.getParameters:",x.precision,"not supported, using",B,"instead."));let L=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,M=L!==void 0?L.length:0,D=0;P.morphAttributes.position!==void 0&&(D=1),P.morphAttributes.normal!==void 0&&(D=2),P.morphAttributes.color!==void 0&&(D=3);let Y,F,W,Z;if($){let De=Jn[$];Y=De.vertexShader,F=De.fragmentShader}else{Y=x.vertexShader,F=x.fragmentShader;let De=a.getVertexShaderStage(x),_t=a.getFragmentShaderStage(x);a.update(x,De,_t),W=De.id,Z=_t.id}let te=i.getRenderTarget(),J=i.state.buffers.depth.getReversed(),se=O.isInstancedMesh===!0,Ne=O.isBatchedMesh===!0,pe=!!x.map,me=!!x.matcap,Le=!!V,ee=Le&&V.isPMREMTexture===!0,re=!!x.aoMap,oe=!!x.lightMap,de=!!x.bumpMap&&x.wireframe===!1,ue=!!x.normalMap,Fe=!!x.displacementMap,be=!!x.emissiveMap,ze=!!x.metalnessMap,Je=!!x.roughnessMap,et=x.anisotropy>0,X=x.clearcoat>0,wt=x.diffuseRoughness>0,nt=x.dispersion>0,xt=x.retroreflectivity>0,ve=x.iridescence>0,yt=x.sheen>0,Ve=x.transmission>0,Ze=et&&!!x.anisotropyMap,I=X&&!!x.clearcoatMap,b=X&&!!x.clearcoatNormalMap,K=X&&!!x.clearcoatRoughnessMap,ge=wt&&!!x.diffuseRoughnessMap,he=ve&&!!x.iridescenceMap,Me=ve&&!!x.iridescenceThicknessMap,Ae=yt&&!!x.sheenColorMap,ae=yt&&!!x.sheenRoughnessMap,le=!!x.specularMap,Ee=!!x.specularColorMap,G=!!x.specularIntensityMap,ce=Ve&&!!x.transmissionMap,ie=Ve&&!!x.thicknessMap,we=!!x.gradientMap,ye=!!x.alphaMap,Se=x.alphaTest>0,Ge=!!x.alphaHash,st=!!x.extensions,xe=An;x.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(xe=i.toneMapping);let qe=ee?V.isCompressedCubeTexture?V.image[0].mipmaps:V.mipmaps:null,it={shaderID:$,shaderType:x.type,shaderName:x.name,vertexShader:Y,fragmentShader:F,defines:x.defines,customVertexShaderID:W,customFragmentShaderID:Z,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:B,batching:Ne,batchingColor:Ne&&O._colorsTexture!==null,instancing:se,instancingColor:se&&O.instanceColor!==null,instancingMorph:se&&O.morphTexture!==null,outputColorSpace:te===null?i.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:at.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:pe,matcap:me,envMap:Le,envMapMode:Le&&V.mapping,envMapPMREM:ee,envMapMaxLod:ee?qe.length-1:null,envMapSize:ee?qe[0].width:null,aoMap:re,lightMap:oe,bumpMap:de,normalMap:ue,displacementMap:Fe,emissiveMap:be,normalMapObjectSpace:ue&&x.normalMapType===Md,normalMapTangentSpace:ue&&x.normalMapType===al,packedNormalMap:ue&&x.normalMapType===al&&ry(x.normalMap.format),metalnessMap:ze,roughnessMap:Je,anisotropy:et,anisotropyMap:Ze,clearcoat:X,clearcoatMap:I,clearcoatNormalMap:b,clearcoatRoughnessMap:K,diffuseRoughness:wt,diffuseRoughnessMap:ge,dispersion:nt,retroreflection:xt,iridescence:ve,iridescenceMap:he,iridescenceThicknessMap:Me,sheen:yt,sheenColorMap:Ae,sheenRoughnessMap:ae,specularMap:le,specularColorMap:Ee,specularIntensityMap:G,transmission:Ve,transmissionMap:ce,thicknessMap:ie,gradientMap:we,opaque:x.transparent===!1&&x.blending===zs&&x.alphaToCoverage===!1,alphaMap:ye,alphaTest:Se,alphaHash:Ge,combine:x.combine,mapUv:pe&&d(x.map.channel),aoMapUv:re&&d(x.aoMap.channel),lightMapUv:oe&&d(x.lightMap.channel),bumpMapUv:de&&d(x.bumpMap.channel),normalMapUv:ue&&d(x.normalMap.channel),displacementMapUv:Fe&&d(x.displacementMap.channel),emissiveMapUv:be&&d(x.emissiveMap.channel),metalnessMapUv:ze&&d(x.metalnessMap.channel),roughnessMapUv:Je&&d(x.roughnessMap.channel),anisotropyMapUv:Ze&&d(x.anisotropyMap.channel),clearcoatMapUv:I&&d(x.clearcoatMap.channel),clearcoatNormalMapUv:b&&d(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:K&&d(x.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ge&&d(x.diffuseRoughnessMap.channel),iridescenceMapUv:he&&d(x.iridescenceMap.channel),iridescenceThicknessMapUv:Me&&d(x.iridescenceThicknessMap.channel),sheenColorMapUv:Ae&&d(x.sheenColorMap.channel),sheenRoughnessMapUv:ae&&d(x.sheenRoughnessMap.channel),specularMapUv:le&&d(x.specularMap.channel),specularColorMapUv:Ee&&d(x.specularColorMap.channel),specularIntensityMapUv:G&&d(x.specularIntensityMap.channel),transmissionMapUv:ce&&d(x.transmissionMap.channel),thicknessMapUv:ie&&d(x.thicknessMap.channel),alphaMapUv:ye&&d(x.alphaMap.channel),vertexTangents:!!P.attributes.tangent&&(ue||et),vertexNormals:!!P.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!P.attributes.color&&P.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!P.attributes.uv&&(pe||ye),fog:!!U,useFog:x.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||P.attributes.normal===void 0&&ue===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:J,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:P.attributes.position!==void 0,morphTargets:P.morphAttributes.position!==void 0,morphNormals:P.morphAttributes.normal!==void 0,morphColors:P.morphAttributes.color!==void 0,morphTargetsCount:M,morphTextureStride:D,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:T.filter(De=>De.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:xe,decodeVideoTexture:pe&&x.map.isVideoTexture===!0&&at.getTransfer(x.map.colorSpace)===pt,decodeVideoTextureEmissive:be&&x.emissiveMap.isVideoTexture===!0&&at.getTransfer(x.emissiveMap.colorSpace)===pt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Zt,flipSided:x.side===Wt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:st&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(st&&x.extensions.multiDraw===!0||Ne)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return it.vertexUv1s=l.has(1),it.vertexUv2s=l.has(2),it.vertexUv3s=l.has(3),l.clear(),it}function y(x){let S=[];if(x.shaderID?S.push(x.shaderID):(S.push(x.customVertexShaderID),S.push(x.customFragmentShaderID)),x.defines!==void 0)for(let N in x.defines)S.push(N),S.push(x.defines[N]);return x.isRawShaderMaterial===!1&&(g(S,x),p(S,x),S.push(i.outputColorSpace)),S.push(x.customProgramCacheKey),S.join()}function g(x,S){x.push(S.precision),x.push(S.outputColorSpace),x.push(S.envMapMode),x.push(S.envMapPMREM),x.push(S.envMapMaxLod),x.push(S.envMapSize),x.push(S.mapUv),x.push(S.alphaMapUv),x.push(S.lightMapUv),x.push(S.aoMapUv),x.push(S.bumpMapUv),x.push(S.normalMapUv),x.push(S.displacementMapUv),x.push(S.emissiveMapUv),x.push(S.metalnessMapUv),x.push(S.roughnessMapUv),x.push(S.anisotropyMapUv),x.push(S.clearcoatMapUv),x.push(S.clearcoatNormalMapUv),x.push(S.clearcoatRoughnessMapUv),x.push(S.diffuseRoughnessMapUv),x.push(S.iridescenceMapUv),x.push(S.iridescenceThicknessMapUv),x.push(S.sheenColorMapUv),x.push(S.sheenRoughnessMapUv),x.push(S.specularMapUv),x.push(S.specularColorMapUv),x.push(S.specularIntensityMapUv),x.push(S.transmissionMapUv),x.push(S.thicknessMapUv),x.push(S.combine),x.push(S.fogExp2),x.push(S.sizeAttenuation),x.push(S.morphTargetsCount),x.push(S.numSunLights),x.push(S.numDirLights),x.push(S.numPointLights),x.push(S.numSpotLights),x.push(S.numSpotLightMaps),x.push(S.numHemiLights),x.push(S.numRectAreaLights),x.push(S.numSunLightShadows),x.push(S.numDirLightShadows),x.push(S.numPointLightShadows),x.push(S.numSpotLightShadows),x.push(S.numSpotLightShadowsWithMaps),x.push(S.numLightProbes),x.push(S.numLightProbeGrids),x.push(S.shadowMapType),x.push(S.toneMapping),x.push(S.numClippingPlanes),x.push(S.numClipIntersection),x.push(S.depthPacking)}function p(x,S){o.disableAll(),S.instancing&&o.enable(0),S.instancingColor&&o.enable(1),S.instancingMorph&&o.enable(2),S.matcap&&o.enable(3),S.envMap&&o.enable(4),S.normalMapObjectSpace&&o.enable(5),S.normalMapTangentSpace&&o.enable(6),S.clearcoat&&o.enable(7),S.iridescence&&o.enable(8),S.alphaTest&&o.enable(9),S.vertexColors&&o.enable(10),S.vertexAlphas&&o.enable(11),S.vertexUv1s&&o.enable(12),S.vertexUv2s&&o.enable(13),S.vertexUv3s&&o.enable(14),S.vertexTangents&&o.enable(15),S.anisotropy&&o.enable(16),S.alphaHash&&o.enable(17),S.batching&&o.enable(18),S.dispersion&&o.enable(19),S.retroreflection&&o.enable(24),S.diffuseRoughness&&o.enable(25),S.batchingColor&&o.enable(20),S.gradientMap&&o.enable(21),S.packedNormalMap&&o.enable(22),S.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reversedDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),S.numLightProbeGrids>0&&o.enable(22),S.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function _(x){let S=f[x.type],N;if(S){let C=Jn[S];N=dn.clone(C.uniforms)}else N=x.uniforms;return N}function E(x,S){let N=h.get(S);return N!==void 0?++N.usedTimes:(N=new iy(i,S,x,s),c.push(N),h.set(S,N)),N}function v(x){if(--x.usedTimes===0){let S=c.indexOf(x);c[S]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function w(x){a.remove(x)}function R(){a.dispose()}return{getParameters:m,getProgramCacheKey:y,getUniforms:_,acquireProgram:E,releaseProgram:v,releaseShaderCache:w,programs:c,dispose:R}}function ay(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function ly(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function nf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function sf(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function a(f,d,m,y,g,p){let _=i[e];return _===void 0?(_={id:f.id,object:f,geometry:d,material:m,materialVariant:o(f),groupOrder:y,renderOrder:f.renderOrder,z:g,group:p},i[e]=_):(_.id=f.id,_.object=f,_.geometry=d,_.material=m,_.materialVariant=o(f),_.groupOrder=y,_.renderOrder=f.renderOrder,_.z=g,_.group=p),e++,_}function l(f,d,m,y,g,p,_){_.reversedDepth===!0&&(g=-g);let E=a(f,d,m,y,g,p);m.transmission>0?n.push(E):m.transparent===!0?s.push(E):t.push(E)}function c(f,d,m,y,g,p){let _=a(f,d,m,y,g,p);m.transmission>0?n.unshift(_):m.transparent===!0?s.unshift(_):t.unshift(_)}function h(f,d){t.length>1&&t.sort(f||ly),n.length>1&&n.sort(d||nf),s.length>1&&s.sort(d||nf)}function u(){for(let f=e,d=i.length;f<d;f++){let m=i[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:u,sort:h}}function cy(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new sf,i.set(n,[o])):s>=r.length?(o=new sf,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function hy(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new z,color:new Pe};break;case"SpotLight":t={position:new z,direction:new z,color:new Pe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new z,color:new Pe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new z,skyColor:new Pe,groundColor:new Pe};break;case"RectAreaLight":t={color:new Pe,position:new z,halfWidth:new z,halfHeight:new z};break}return i[e.id]=t,t}}}function uy(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var dy=0;function fy(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function py(i){let e=new hy,t=uy(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new z);let s=new z,r=new We,o=new We;function a(c){let h=0,u=0,f=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let d=0,m=0,y=0,g=0,p=0,_=0,E=0,v=0,w=0,R=0,x=0,S=0,N=0,C=0;c.sort(fy);for(let T=0,U=c.length;T<U;T++){let P=c[T],k=P.color,H=P.intensity,V=P.distance,$=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Li?$=P.shadow.map.texture:$=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=k.r*H,u+=k.g*H,f+=k.b*H;else if(P.isLightProbe){for(let B=0;B<9;B++)n.probe[B].addScaledVector(P.sh.coefficients[B],H);C++}else if(P.isSunLight){let B=e.get(P);if(B.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let L=P.shadow,M=t.get(P);M.shadowIntensity=L.intensity,M.shadowBias=L.bias,M.shadowNormalBias=L.normalBias,M.shadowRadius=L.radius,M.shadowMapSize.copy(L.mapSize).multiply(L.getFrameExtents()),n.sunShadow[m]=M,n.sunShadowMap[m]=$;let D=L.getViewportCount();for(let Y=0;Y<D;Y++)n.sunShadowMatrix[y+Y]=L.getMatrix(Y),n.sunShadowCascade[y+Y]=L._cascadeData[Y];y+=D,m++}n.sun[d]=B,d++}else if(P.isDirectionalLight){let B=e.get(P);if(B.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let L=P.shadow,M=t.get(P);M.shadowIntensity=L.intensity,M.shadowBias=L.bias,M.shadowNormalBias=L.normalBias,M.shadowRadius=L.radius,M.shadowMapSize=L.mapSize,n.directionalShadow[g]=M,n.directionalShadowMap[g]=$,n.directionalShadowMatrix[g]=P.shadow.matrix,w++}n.directional[g]=B,g++}else if(P.isSpotLight){let B=e.get(P);B.position.setFromMatrixPosition(P.matrixWorld),B.color.copy(k).multiplyScalar(H),B.distance=V,B.coneCos=Math.cos(P.angle),B.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),B.decay=P.decay,n.spot[_]=B;let L=P.shadow;if(P.map&&(n.spotLightMap[S]=P.map,S++,L.updateMatrices(P),P.castShadow&&N++),n.spotLightMatrix[_]=L.matrix,P.castShadow){let M=t.get(P);M.shadowIntensity=L.intensity,M.shadowBias=L.bias,M.shadowNormalBias=L.normalBias,M.shadowRadius=L.radius,M.shadowMapSize=L.mapSize,n.spotShadow[_]=M,n.spotShadowMap[_]=$,x++}_++}else if(P.isRectAreaLight){let B=e.get(P);B.color.copy(k).multiplyScalar(H),B.halfWidth.set(P.width*.5,0,0),B.halfHeight.set(0,P.height*.5,0),n.rectArea[E]=B,E++}else if(P.isPointLight){let B=e.get(P);if(B.color.copy(P.color).multiplyScalar(P.intensity),B.distance=P.distance,B.decay=P.decay,P.castShadow){let L=P.shadow,M=t.get(P);M.shadowIntensity=L.intensity,M.shadowBias=L.bias,M.shadowNormalBias=L.normalBias,M.shadowRadius=L.radius,M.shadowMapSize=L.mapSize,M.shadowCameraNear=L.camera.near,M.shadowCameraFar=L.camera.far,n.pointShadow[p]=M,n.pointShadowMap[p]=$,n.pointShadowMatrix[p]=P.shadow.matrix,R++}n.point[p]=B,p++}else if(P.isHemisphereLight){let B=e.get(P);B.skyColor.copy(P.color).multiplyScalar(H),B.groundColor.copy(P.groundColor).multiplyScalar(H),n.hemi[v]=B,v++}}E>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ie.LTC_FLOAT_1,n.rectAreaLTC2=Ie.LTC_FLOAT_2):(n.rectAreaLTC1=Ie.LTC_HALF_1,n.rectAreaLTC2=Ie.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;let O=n.hash;(O.sunLength!==d||O.directionalLength!==g||O.pointLength!==p||O.spotLength!==_||O.rectAreaLength!==E||O.hemiLength!==v||O.numSunShadows!==m||O.numDirectionalShadows!==w||O.numPointShadows!==R||O.numSpotShadows!==x||O.numSpotMaps!==S||O.numLightProbes!==C)&&(n.sun.length=d,n.directional.length=g,n.spot.length=_,n.rectArea.length=E,n.point.length=p,n.hemi.length=v,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.directionalShadowMatrix.length=w,n.pointShadow.length=R,n.pointShadowMap.length=R,n.pointShadowMatrix.length=R,n.spotShadow.length=x,n.spotShadowMap.length=x,n.spotLightMatrix.length=x+S-N,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=N,n.numLightProbes=C,O.sunLength=d,O.directionalLength=g,O.pointLength=p,O.spotLength=_,O.rectAreaLength=E,O.hemiLength=v,O.numSunShadows=m,O.numDirectionalShadows=w,O.numPointShadows=R,O.numSpotShadows=x,O.numSpotMaps=S,O.numLightProbes=C,n.version=dy++)}function l(c,h){let u=0,f=0,d=0,m=0,y=0,g=0,p=h.matrixWorldInverse;for(let _=0,E=c.length;_<E;_++){let v=c[_];if(v.isSunLight){let w=n.sun[u];w.direction.setFromMatrixPosition(v.matrixWorld),w.direction.transformDirection(p),u++}else if(v.isDirectionalLight){let w=n.directional[f];w.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(p),f++}else if(v.isSpotLight){let w=n.spot[m];w.position.setFromMatrixPosition(v.matrixWorld),w.position.applyMatrix4(p),w.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(p),m++}else if(v.isRectAreaLight){let w=n.rectArea[y];w.position.setFromMatrixPosition(v.matrixWorld),w.position.applyMatrix4(p),o.identity(),r.copy(v.matrixWorld),r.premultiply(p),o.extractRotation(r),w.halfWidth.set(v.width*.5,0,0),w.halfHeight.set(0,v.height*.5,0),w.halfWidth.applyMatrix4(o),w.halfHeight.applyMatrix4(o),y++}else if(v.isPointLight){let w=n.point[d];w.position.setFromMatrixPosition(v.matrixWorld),w.position.applyMatrix4(p),d++}else if(v.isHemisphereLight){let w=n.hemi[g];w.direction.setFromMatrixPosition(v.matrixWorld),w.direction.transformDirection(p),g++}}}return{setup:a,setupView:l,state:n}}function rf(i){let e=new py(i),t=[],n=[],s=[];function r(u){h.camera=u,t.length=0,n.length=0,s.length=0}function o(u){u.isLightProbeGrid?s.push(u):t.push(u)}function a(u){n.push(u)}function l(){e.setup(t),s.sort((u,f)=>u.priority-f.priority||u.id-f.id)}function c(u){e.setupView(t,u)}let h={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function my(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new rf(i),e.set(s,[a])):r>=o.length?(a=new rf(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var gy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,xy=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,_y=[new z(1,0,0),new z(-1,0,0),new z(0,1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1)],yy=[new z(0,-1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1),new z(0,-1,0),new z(0,-1,0)],of=new We,jr=new z,Kc=new z;function vy(i,e,t){let n=new wi,s=new fe,r=new fe,o=new gt,a=new Fs,l=new la,c={},h=t.maxTextureSize,u={[Zn]:Wt,[Wt]:Zn,[Zt]:Zt},f=new Dt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new fe},radius:{value:4}},vertexShader:gy,fragmentShader:xy}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let m=new dt;m.setAttribute("position",new ht(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new Qe(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qi;let p=this.type;this.render=function(R,x,S){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||R.length===0)return;this.type===Qu&&(Ye("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Qi);let N=i.getRenderTarget(),C=i.getActiveCubeFace(),O=i.getActiveMipmapLevel(),T=i.state;T.setBlending(ai),T.buffers.depth.getReversed()===!0?T.buffers.color.setClear(0,0,0,0):T.buffers.color.setClear(1,1,1,1),T.buffers.depth.setTest(!0),T.setScissorTest(!1);let U=p!==this.type;U&&x.traverse(function(P){P.material&&(Array.isArray(P.material)?P.material.forEach(k=>k.needsUpdate=!0):P.material.needsUpdate=!0)});for(let P=0,k=R.length;P<k;P++){let H=R[P],V=H.shadow;if(V===void 0){Ye("WebGLShadowMap:",H,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);let $=V.getFrameExtents();s.multiply($),r.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/$.x),s.x=r.x*$.x,V.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/$.y),s.y=r.y*$.y,V.mapSize.y=r.y));let B=i.state.buffers.depth.getReversed();if(V.camera._reversedDepth=B,V.map===null||U===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===ks){if(H.isPointLight){Ye("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new Pt(s.x,s.y,{format:Li,type:Nt,minFilter:Yt,magFilter:Yt,generateMipmaps:!1}),V.map.texture.name=H.name+".shadowMap",V.map.depthTexture=new oi(s.x,s.y,un),V.map.depthTexture.name=H.name+".shadowMapDepth",V.map.depthTexture.format=ri,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Vt,V.map.depthTexture.magFilter=Vt}else H.isPointLight?(V.map=new is(s.x),V.map.depthTexture=new Sr(s.x,Bn)):(V.map=new Pt(s.x,s.y),V.map.depthTexture=new oi(s.x,s.y,Bn)),V.map.depthTexture.name=H.name+".shadowMap",V.map.depthTexture.format=ri,this.type===Qi?(V.map.depthTexture.compareFunction=B?Ic:Pc,V.map.depthTexture.minFilter=Yt,V.map.depthTexture.magFilter=Yt):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Vt,V.map.depthTexture.magFilter=Vt);V.camera.updateProjectionMatrix()}V.map.isWebGLCubeRenderTarget!==!0&&(V.map.width!==s.x||V.map.height!==s.y)&&V.map.setSize(s.x,s.y);let L=V.map.isWebGLCubeRenderTarget?6:V.getViewportCount();H.isPointLight!==!0&&V.updateMatrices(H,S);let M=(V.camera.layers.mask&4294967294)!==0?V.camera.layers:S.layers;for(let D=0;D<L;D++){let Y=V.getCamera(D);if(H.isPointLight){let F=V.camera,W=V.matrix,Z=H.distance||F.far;Z!==F.far&&(F.far=Z,F.updateProjectionMatrix()),jr.setFromMatrixPosition(H.matrixWorld),F.position.copy(jr),Kc.copy(F.position),Kc.add(_y[D]),F.up.copy(yy[D]),F.lookAt(Kc),F.updateMatrixWorld(),W.makeTranslation(-jr.x,-jr.y,-jr.z),of.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),V._frustum.setFromProjectionMatrix(of,F.coordinateSystem,F.reversedDepth)}if(V.map.isWebGLCubeRenderTarget)i.setRenderTarget(V.map,D),i.clear();else{D===0&&(i.setRenderTarget(V.map),i.clear());let F=V.getViewport(D);o.set(r.x*F.x,r.y*F.y,r.x*F.z,r.y*F.w),T.viewport(o)}n=V.getFrustum(D),v(x,S,Y,H,M,this.type)}V.isPointLightShadow!==!0&&this.type===ks&&_(V,S),V.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(N,C,O)};function _(R,x){let S=e.update(y);f.defines.VSM_SAMPLES!==R.blurSamples&&(f.defines.VSM_SAMPLES=R.blurSamples,d.defines.VSM_SAMPLES=R.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),R.mapPass===null?R.mapPass=new Pt(s.x,s.y,{format:Li,type:Nt}):(R.mapPass.width!==R.map.width||R.mapPass.height!==R.map.height)&&R.mapPass.setSize(R.map.width,R.map.height),f.uniforms.shadow_pass.value=R.map.depthTexture,f.uniforms.resolution.value.set(R.map.width,R.map.height),f.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(x,null,S,f,y,null),d.uniforms.shadow_pass.value=R.mapPass.texture,d.uniforms.resolution.value.set(R.map.width,R.map.height),d.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(x,null,S,d,y,null)}function E(R,x,S,N){let C=null,O=S.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(O!==void 0)C=O;else if(C=S.isPointLight===!0?l:a,i.localClippingEnabled&&x.clipShadows===!0&&Array.isArray(x.clippingPlanes)&&x.clippingPlanes.length!==0||x.displacementMap&&x.displacementScale!==0||x.alphaMap&&x.alphaTest>0||x.map&&x.alphaTest>0||x.alphaToCoverage===!0){let T=C.uuid,U=x.uuid,P=c[T];P===void 0&&(P={},c[T]=P);let k=P[U];k===void 0&&(k=C.clone(),P[U]=k,x.addEventListener("dispose",w)),C=k}if(C.visible=x.visible,C.wireframe=x.wireframe,N===ks?C.side=x.shadowSide!==null?x.shadowSide:x.side:C.side=x.shadowSide!==null?x.shadowSide:u[x.side],C.alphaMap=x.alphaMap,C.alphaTest=x.alphaToCoverage===!0?.5:x.alphaTest,C.map=x.map,C.clipShadows=x.clipShadows,C.clippingPlanes=x.clippingPlanes,C.clipIntersection=x.clipIntersection,C.displacementMap=x.displacementMap,C.displacementScale=x.displacementScale,C.displacementBias=x.displacementBias,C.wireframeLinewidth=x.wireframeLinewidth,C.linewidth=x.linewidth,S.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let T=i.properties.get(C);T.light=S}return C}function v(R,x,S,N,C,O){if(R.visible===!1)return;if(R.layers.test(C)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&O===ks)&&(!R.frustumCulled||R.intersectsFrustum(n))){R.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,R.matrixWorld);let P=e.update(R),k=R.material;if(Array.isArray(k)){let H=P.groups;for(let V=0,$=H.length;V<$;V++){let B=H[V],L=k[B.materialIndex];if(L&&L.visible){let M=E(R,L,N,O);R.onBeforeShadow(i,R,x,S,P,M,B),i.renderBufferDirect(S,null,P,M,R,B),R.onAfterShadow(i,R,x,S,P,M,B)}}}else if(k.visible){let H=E(R,k,N,O);R.onBeforeShadow(i,R,x,S,P,H,null),i.renderBufferDirect(S,null,P,H,R,null),R.onAfterShadow(i,R,x,S,P,H,null)}}let U=R.children;for(let P=0,k=U.length;P<k;P++)v(U[P],x,S,N,C,O)}function w(R){R.target.removeEventListener("dispose",w);for(let S in c){let N=c[S],C=R.target.uuid;C in N&&(N[C].dispose(),delete N[C])}}}function My(i,e){function t(){let G=!1,ce=new gt,ie=null,we=new gt(0,0,0,0);return{setMask:function(ye){ie!==ye&&!G&&(i.colorMask(ye,ye,ye,ye),ie=ye)},setLocked:function(ye){G=ye},setClear:function(ye,Se,Ge,st,xe){xe===!0&&(ye*=st,Se*=st,Ge*=st),ce.set(ye,Se,Ge,st),we.equals(ce)===!1&&(i.clearColor(ye,Se,Ge,st),we.copy(ce))},reset:function(){G=!1,ie=null,we.set(-1,0,0,0)}}}function n(){let G=!1,ce=!1,ie=null,we=null,ye=null;return{setReversed:function(Se){if(ce!==Se){let Ge=e.get("EXT_clip_control");Se?Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.ZERO_TO_ONE_EXT):Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.NEGATIVE_ONE_TO_ONE_EXT),ce=Se;let st=ye;ye=null,this.setClear(st)}},getReversed:function(){return ce},setTest:function(Se){Se?J(i.DEPTH_TEST):se(i.DEPTH_TEST)},setMask:function(Se){ie!==Se&&!G&&(i.depthMask(Se),ie=Se)},setFunc:function(Se){if(ce&&(Se=Id[Se]),we!==Se){switch(Se){case Ho:i.depthFunc(i.NEVER);break;case Go:i.depthFunc(i.ALWAYS);break;case Vo:i.depthFunc(i.LESS);break;case Es:i.depthFunc(i.LEQUAL);break;case Wo:i.depthFunc(i.EQUAL);break;case Xo:i.depthFunc(i.GEQUAL);break;case qo:i.depthFunc(i.GREATER);break;case Yo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}we=Se}},setLocked:function(Se){G=Se},setClear:function(Se){ye!==Se&&(ye=Se,ce&&(Se=1-Se),i.clearDepth(Se))},reset:function(){G=!1,ie=null,we=null,ye=null,ce=!1}}}function s(){let G=!1,ce=null,ie=null,we=null,ye=null,Se=null,Ge=null,st=null,xe=null;return{setTest:function(qe){G||(qe?J(i.STENCIL_TEST):se(i.STENCIL_TEST))},setMask:function(qe){ce!==qe&&!G&&(i.stencilMask(qe),ce=qe)},setFunc:function(qe,it,De){(ie!==qe||we!==it||ye!==De)&&(i.stencilFunc(qe,it,De),ie=qe,we=it,ye=De)},setOp:function(qe,it,De){(Se!==qe||Ge!==it||st!==De)&&(i.stencilOp(qe,it,De),Se=qe,Ge=it,st=De)},setLocked:function(qe){G=qe},setClear:function(qe){xe!==qe&&(i.clearStencil(qe),xe=qe)},reset:function(){G=!1,ce=null,ie=null,we=null,ye=null,Se=null,Ge=null,st=null,xe=null}}}let r=new t,o=new n,a=new s,l={},c=new WeakMap,h={},u={},f={},d=new WeakMap,m=[],y=null,g=!1,p=null,_=null,E=null,v=null,w=null,R=null,x=null,S=new Pe(0,0,0),N=0,C=!1,O=null,T=null,U=null,P=null,k=null,H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,$=0,B=i.getParameter(i.VERSION);B.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(B)[1]),V=$>=1):B.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),V=$>=2);let L=null,M={},D=i.getParameter(i.SCISSOR_BOX),Y=i.getParameter(i.VIEWPORT),F=new gt().fromArray(D),W=new gt().fromArray(Y);function Z(G,ce,ie,we){let ye=new Uint8Array(4),Se=i.createTexture();i.bindTexture(G,Se),i.texParameteri(G,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(G,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ge=0;Ge<ie;Ge++)G===i.TEXTURE_3D||G===i.TEXTURE_2D_ARRAY?i.texImage3D(ce,0,i.RGBA,1,1,we,0,i.RGBA,i.UNSIGNED_BYTE,ye):i.texImage2D(ce+Ge,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ye);return Se}let te={};te[i.TEXTURE_2D]=Z(i.TEXTURE_2D,i.TEXTURE_2D,1),te[i.TEXTURE_CUBE_MAP]=Z(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),te[i.TEXTURE_2D_ARRAY]=Z(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),te[i.TEXTURE_3D]=Z(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),J(i.DEPTH_TEST),o.setFunc(Es),de(!1),ue(xc),J(i.CULL_FACE),re(ai);function J(G){h[G]!==!0&&(i.enable(G),h[G]=!0)}function se(G){h[G]!==!1&&(i.disable(G),h[G]=!1)}function Ne(G,ce){return f[G]!==ce?(i.bindFramebuffer(G,ce),f[G]=ce,G===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=ce),G===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=ce),!0):!1}function pe(G,ce){let ie=m,we=!1;if(G){ie=d.get(ce),ie===void 0&&(ie=[],d.set(ce,ie));let ye=G.textures;if(ie.length!==ye.length||ie[0]!==i.COLOR_ATTACHMENT0){for(let Se=0,Ge=ye.length;Se<Ge;Se++)ie[Se]=i.COLOR_ATTACHMENT0+Se;ie.length=ye.length,we=!0}}else ie[0]!==i.BACK&&(ie[0]=i.BACK,we=!0);we&&i.drawBuffers(ie)}function me(G){return y!==G?(i.useProgram(G),y=G,!0):!1}let Le={[ji]:i.FUNC_ADD,[ed]:i.FUNC_SUBTRACT,[td]:i.FUNC_REVERSE_SUBTRACT};Le[nd]=i.MIN,Le[id]=i.MAX;let ee={[sd]:i.ZERO,[rd]:i.ONE,[od]:i.SRC_COLOR,[vc]:i.SRC_ALPHA,[dd]:i.SRC_ALPHA_SATURATE,[hd]:i.DST_COLOR,[ld]:i.DST_ALPHA,[ad]:i.ONE_MINUS_SRC_COLOR,[Mc]:i.ONE_MINUS_SRC_ALPHA,[ud]:i.ONE_MINUS_DST_COLOR,[cd]:i.ONE_MINUS_DST_ALPHA,[fd]:i.CONSTANT_COLOR,[pd]:i.ONE_MINUS_CONSTANT_COLOR,[md]:i.CONSTANT_ALPHA,[gd]:i.ONE_MINUS_CONSTANT_ALPHA};function re(G,ce,ie,we,ye,Se,Ge,st,xe,qe){if(G===ai){g===!0&&(se(i.BLEND),g=!1);return}if(g===!1&&(J(i.BLEND),g=!0),G!==ju){if(G!==p||qe!==C){if((_!==ji||w!==ji)&&(i.blendEquation(i.FUNC_ADD),_=ji,w=ji),qe)switch(G){case zs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Tn:i.blendFunc(i.ONE,i.ONE);break;case _c:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case yc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:$e("WebGLState: Invalid blending: ",G);break}else switch(G){case zs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Tn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case _c:$e("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case yc:$e("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:$e("WebGLState: Invalid blending: ",G);break}E=null,v=null,R=null,x=null,S.set(0,0,0),N=0,p=G,C=qe}return}ye=ye||ce,Se=Se||ie,Ge=Ge||we,(ce!==_||ye!==w)&&(i.blendEquationSeparate(Le[ce],Le[ye]),_=ce,w=ye),(ie!==E||we!==v||Se!==R||Ge!==x)&&(i.blendFuncSeparate(ee[ie],ee[we],ee[Se],ee[Ge]),E=ie,v=we,R=Se,x=Ge),(st.equals(S)===!1||xe!==N)&&(i.blendColor(st.r,st.g,st.b,xe),S.copy(st),N=xe),p=G,C=!1}function oe(G,ce){G.side===Zt?se(i.CULL_FACE):J(i.CULL_FACE);let ie=G.side===Wt;ce&&(ie=!ie),de(ie),G.blending===zs&&G.transparent===!1?re(ai):re(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),o.setFunc(G.depthFunc),o.setTest(G.depthTest),o.setMask(G.depthWrite),r.setMask(G.colorWrite);let we=G.stencilWrite;a.setTest(we),we&&(a.setMask(G.stencilWriteMask),a.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),a.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),be(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?J(i.SAMPLE_ALPHA_TO_COVERAGE):se(i.SAMPLE_ALPHA_TO_COVERAGE)}function de(G){O!==G&&(G?i.frontFace(i.CW):i.frontFace(i.CCW),O=G)}function ue(G){G!==Ju?(J(i.CULL_FACE),G!==T&&(G===xc?i.cullFace(i.BACK):G===Ku?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):se(i.CULL_FACE),T=G}function Fe(G){G!==U&&(V&&i.lineWidth(G),U=G)}function be(G,ce,ie){G?(J(i.POLYGON_OFFSET_FILL),(P!==ce||k!==ie)&&(P=ce,k=ie,o.getReversed()&&(ce=-ce,ie=-ie),i.polygonOffset(ce,ie))):se(i.POLYGON_OFFSET_FILL)}function ze(G){G?J(i.SCISSOR_TEST):se(i.SCISSOR_TEST)}function Je(G){G===void 0&&(G=i.TEXTURE0+H-1),L!==G&&(i.activeTexture(G),L=G)}function et(G,ce,ie){ie===void 0&&(L===null?ie=i.TEXTURE0+H-1:ie=L);let we=M[ie];we===void 0&&(we={type:void 0,texture:void 0},M[ie]=we),(we.type!==G||we.texture!==ce)&&(L!==ie&&(i.activeTexture(ie),L=ie),i.bindTexture(G,ce||te[G]),we.type=G,we.texture=ce)}function X(){let G=M[L];G!==void 0&&G.type!==void 0&&(i.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function wt(){try{i.compressedTexImage2D(...arguments)}catch(G){$e("WebGLState:",G)}}function nt(){try{i.compressedTexImage3D(...arguments)}catch(G){$e("WebGLState:",G)}}function xt(){try{i.texSubImage2D(...arguments)}catch(G){$e("WebGLState:",G)}}function ve(){try{i.texSubImage3D(...arguments)}catch(G){$e("WebGLState:",G)}}function yt(){try{i.compressedTexSubImage2D(...arguments)}catch(G){$e("WebGLState:",G)}}function Ve(){try{i.compressedTexSubImage3D(...arguments)}catch(G){$e("WebGLState:",G)}}function Ze(){try{i.texStorage2D(...arguments)}catch(G){$e("WebGLState:",G)}}function I(){try{i.texStorage3D(...arguments)}catch(G){$e("WebGLState:",G)}}function b(){try{i.texImage2D(...arguments)}catch(G){$e("WebGLState:",G)}}function K(){try{i.texImage3D(...arguments)}catch(G){$e("WebGLState:",G)}}function ge(G){return u[G]!==void 0?u[G]:i.getParameter(G)}function he(G,ce){u[G]!==ce&&(i.pixelStorei(G,ce),u[G]=ce)}function Me(G){F.equals(G)===!1&&(i.scissor(G.x,G.y,G.z,G.w),F.copy(G))}function Ae(G){W.equals(G)===!1&&(i.viewport(G.x,G.y,G.z,G.w),W.copy(G))}function ae(G,ce){let ie=c.get(ce);ie===void 0&&(ie=new WeakMap,c.set(ce,ie));let we=ie.get(G);we===void 0&&(we=i.getUniformBlockIndex(ce,G.name),i.uniformBlockBinding(ce,we,we),ie.set(G,we))}function le(G,ce,ie){let ye=c.get(ce).get(G);l[ye]!==ie&&(i.bindBufferBase(i.UNIFORM_BUFFER,ye,ie),l[ye]=ie)}function Ee(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},L=null,M={},f={},l={},d=new WeakMap,m=[],y=null,g=!1,p=null,_=null,E=null,v=null,w=null,R=null,x=null,S=new Pe(0,0,0),N=0,C=!1,O=null,T=null,U=null,P=null,k=null,F.set(0,0,i.canvas.width,i.canvas.height),W.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:J,disable:se,bindFramebuffer:Ne,drawBuffers:pe,useProgram:me,setBlending:re,setMaterial:oe,setFlipSided:de,setCullFace:ue,setLineWidth:Fe,setPolygonOffset:be,setScissorTest:ze,activeTexture:Je,bindTexture:et,unbindTexture:X,compressedTexImage2D:wt,compressedTexImage3D:nt,texImage2D:b,texImage3D:K,pixelStorei:he,getParameter:ge,updateUBOMapping:ae,uniformBlockBinding:le,texStorage2D:Ze,texStorage3D:I,texSubImage2D:xt,texSubImage3D:ve,compressedTexSubImage2D:yt,compressedTexSubImage3D:Ve,scissor:Me,viewport:Ae,reset:Ee}}function Sy(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new fe,h=new WeakMap,u=new Set,f,d=new WeakMap,m=new Set,y=new FinalizationRegistry(I=>m.delete(I)),g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(I,b){return g?new OffscreenCanvas(I,b):Ts("canvas")}function _(I,b,K){let ge=1,he=Ze(I);if((he.width>K||he.height>K)&&(ge=K/Math.max(he.width,he.height)),ge<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){let Me=Math.floor(ge*he.width),Ae=Math.floor(ge*he.height);f===void 0&&(f=p(Me,Ae));let ae=b?p(Me,Ae):f;return ae.width=Me,ae.height=Ae,ae.getContext("2d").drawImage(I,0,0,Me,Ae),Ye("WebGLRenderer: Texture has been resized from ("+he.width+"x"+he.height+") to ("+Me+"x"+Ae+")."),ae}else return"data"in I&&Ye("WebGLRenderer: Image in DataTexture is too big ("+he.width+"x"+he.height+")."),I;return I}function E(I){return I.generateMipmaps}function v(I){i.generateMipmap(I)}function w(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function R(I,b,K,ge,he,Me=!1){if(I!==null){if(i[I]!==void 0)return i[I];Ye("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let Ae;ge&&(Ae=e.get("EXT_texture_norm16"),Ae||Ye("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ae=b;if(b===i.RED&&(K===i.FLOAT&&(ae=i.R32F),K===i.HALF_FLOAT&&(ae=i.R16F),K===i.UNSIGNED_BYTE&&(ae=i.R8),K===i.UNSIGNED_SHORT&&Ae&&(ae=Ae.R16_EXT),K===i.SHORT&&Ae&&(ae=Ae.R16_SNORM_EXT)),b===i.RED_INTEGER&&(K===i.UNSIGNED_BYTE&&(ae=i.R8UI),K===i.UNSIGNED_SHORT&&(ae=i.R16UI),K===i.UNSIGNED_INT&&(ae=i.R32UI),K===i.BYTE&&(ae=i.R8I),K===i.SHORT&&(ae=i.R16I),K===i.INT&&(ae=i.R32I)),b===i.RG&&(K===i.FLOAT&&(ae=i.RG32F),K===i.HALF_FLOAT&&(ae=i.RG16F),K===i.UNSIGNED_BYTE&&(ae=i.RG8),K===i.UNSIGNED_SHORT&&Ae&&(ae=Ae.RG16_EXT),K===i.SHORT&&Ae&&(ae=Ae.RG16_SNORM_EXT)),b===i.RG_INTEGER&&(K===i.UNSIGNED_BYTE&&(ae=i.RG8UI),K===i.UNSIGNED_SHORT&&(ae=i.RG16UI),K===i.UNSIGNED_INT&&(ae=i.RG32UI),K===i.BYTE&&(ae=i.RG8I),K===i.SHORT&&(ae=i.RG16I),K===i.INT&&(ae=i.RG32I)),b===i.RGB_INTEGER&&(K===i.UNSIGNED_BYTE&&(ae=i.RGB8UI),K===i.UNSIGNED_SHORT&&(ae=i.RGB16UI),K===i.UNSIGNED_INT&&(ae=i.RGB32UI),K===i.BYTE&&(ae=i.RGB8I),K===i.SHORT&&(ae=i.RGB16I),K===i.INT&&(ae=i.RGB32I)),b===i.RGBA_INTEGER&&(K===i.UNSIGNED_BYTE&&(ae=i.RGBA8UI),K===i.UNSIGNED_SHORT&&(ae=i.RGBA16UI),K===i.UNSIGNED_INT&&(ae=i.RGBA32UI),K===i.BYTE&&(ae=i.RGBA8I),K===i.SHORT&&(ae=i.RGBA16I),K===i.INT&&(ae=i.RGBA32I)),b===i.RGB&&(K===i.UNSIGNED_SHORT&&Ae&&(ae=Ae.RGB16_EXT),K===i.SHORT&&Ae&&(ae=Ae.RGB16_SNORM_EXT),K===i.UNSIGNED_INT_5_9_9_9_REV&&(ae=i.RGB9_E5),K===i.UNSIGNED_INT_10F_11F_11F_REV&&(ae=i.R11F_G11F_B10F)),b===i.RGBA){let le=Me?fr:at.getTransfer(he);K===i.FLOAT&&(ae=i.RGBA32F),K===i.HALF_FLOAT&&(ae=i.RGBA16F),K===i.UNSIGNED_BYTE&&(ae=le===pt?i.SRGB8_ALPHA8:i.RGBA8),K===i.UNSIGNED_SHORT&&Ae&&(ae=Ae.RGBA16_EXT),K===i.SHORT&&Ae&&(ae=Ae.RGBA16_SNORM_EXT),K===i.UNSIGNED_SHORT_4_4_4_4&&(ae=i.RGBA4),K===i.UNSIGNED_SHORT_5_5_5_1&&(ae=i.RGB5_A1)}return(ae===i.R16F||ae===i.R32F||ae===i.RG16F||ae===i.RG32F||ae===i.RGBA16F||ae===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ae}function x(I,b){let K;return I?b===null||b===Bn||b===ts?K=i.DEPTH24_STENCIL8:b===un?K=i.DEPTH32F_STENCIL8:b===Gs&&(K=i.DEPTH24_STENCIL8,Ye("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Bn||b===ts?K=i.DEPTH_COMPONENT24:b===un?K=i.DEPTH_COMPONENT32F:b===Gs&&(K=i.DEPTH_COMPONENT16),K}function S(I,b){return E(I)===!0||I.isFramebufferTexture&&I.minFilter!==Vt&&I.minFilter!==Yt?Math.log2(Math.max(b.width,b.height))+1:I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?b.mipmaps.length:1}function N(I){let b=new WeakRef(I);n.get(I).__ref=b,m.add(b),y.register(I,b,b)}function C(I){let b=n.get(I).__ref;b!==void 0&&(m.delete(b),y.unregister(b))}function O(I){U(I.target)}function T(I){P(I.target)}function U(I){I.removeEventListener("dispose",O),C(I),H(I),I.isVideoTexture&&h.delete(I),I.isHTMLTexture&&u.delete(I)}function P(I){I.removeEventListener("dispose",T),C(I),$(I)}function k(){for(let I of m){let b=I.deref();b!==void 0&&(b.isRenderTarget===!0?P(b):U(b))}m.clear(),u.clear()}function H(I){let b=n.get(I);if(b.__webglInit===void 0)return;let K=I.source,ge=d.get(K);if(ge){let he=ge[b.__cacheKey];he.usedTimes--,he.usedTimes===0&&V(I),Object.keys(ge).length===0&&d.delete(K)}n.remove(I)}function V(I){let b=n.get(I);i.deleteTexture(b.__webglTexture);let K=I.source,ge=d.get(K);delete ge[b.__cacheKey],o.memory.textures--}function $(I){let b=n.get(I);b.__depthDisposeCallback&&b.__depthDisposeCallback();let K=I.depthTexture;if(K&&K.renderTarget===I&&U(K),I.isWebGLCubeRenderTarget)for(let he=0;he<6;he++){if(Array.isArray(b.__webglFramebuffer[he]))for(let Me=0;Me<b.__webglFramebuffer[he].length;Me++)i.deleteFramebuffer(b.__webglFramebuffer[he][Me]);else i.deleteFramebuffer(b.__webglFramebuffer[he]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[he])}else{if(Array.isArray(b.__webglFramebuffer))for(let he=0;he<b.__webglFramebuffer.length;he++)i.deleteFramebuffer(b.__webglFramebuffer[he]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let he=0;he<b.__webglColorRenderbuffer.length;he++)b.__webglColorRenderbuffer[he]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[he]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let ge=I.textures;for(let he=0,Me=ge.length;he<Me;he++){let Ae=n.get(ge[he]);Ae.__webglTexture&&(i.deleteTexture(Ae.__webglTexture),o.memory.textures--),n.remove(ge[he])}n.remove(I)}let B=0;function L(){B=0}function M(){return B}function D(I){B=I}function Y(){let I=B;return I>=s.maxTextures&&Ye("WebGLTextures: Trying to use "+(I+1)+" texture units while this GPU supports only "+s.maxTextures),B+=1,I}function F(I){let b=[];return b.push(I.wrapS),b.push(I.wrapT),b.push(I.wrapR||0),b.push(I.magFilter),b.push(I.minFilter),b.push(I.anisotropy),b.push(I.internalFormat),b.push(I.format),b.push(I.type),b.push(I.generateMipmaps),b.push(I.mipmapsAutoUpdate),b.push(I.premultiplyAlpha),b.push(I.flipY),b.push(I.unpackAlignment),b.push(I.colorSpace),b.join()}function W(I,b){let K=n.get(I);if(I.isVideoTexture&&yt(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&K.__version!==I.version){let ge=I.image;if(ge===null)Ye("WebGLRenderer: Texture marked for update but no image data found.");else if(ge.complete===!1)Ye("WebGLRenderer: Texture marked for update but image is incomplete");else{oe(K,I,b);return}}else I.isExternalTexture&&(K.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,K.__webglTexture,i.TEXTURE0+b)}function Z(I,b){let K=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&K.__version!==I.version){oe(K,I,b);return}else I.isExternalTexture&&(K.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,K.__webglTexture,i.TEXTURE0+b)}function te(I,b){let K=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&K.__version!==I.version){oe(K,I,b);return}t.bindTexture(i.TEXTURE_3D,K.__webglTexture,i.TEXTURE0+b)}function J(I,b){let K=n.get(I);if(I.version>0&&K.__version!==I.version){de(K,I,b);return}t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture,i.TEXTURE0+b)}let se={[Vn]:i.REPEAT,[Nn]:i.CLAMP_TO_EDGE,[Zo]:i.MIRRORED_REPEAT},Ne={[Vt]:i.NEAREST,[yd]:i.NEAREST_MIPMAP_NEAREST,[qr]:i.NEAREST_MIPMAP_LINEAR,[Yt]:i.LINEAR,[ba]:i.LINEAR_MIPMAP_NEAREST,[On]:i.LINEAR_MIPMAP_LINEAR},pe={[bd]:i.NEVER,[Lc]:i.ALWAYS,[Ed]:i.LESS,[Pc]:i.LEQUAL,[wd]:i.EQUAL,[Ic]:i.GEQUAL,[Td]:i.GREATER,[Ad]:i.NOTEQUAL};function me(I,b){if(b.type===un&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===Yt||b.magFilter===ba||b.magFilter===qr||b.magFilter===On||b.minFilter===Yt||b.minFilter===ba||b.minFilter===qr||b.minFilter===On)&&Ye("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,se[b.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,se[b.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,se[b.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,Ne[b.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,Ne[b.minFilter]),b.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,pe[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Vt||b.minFilter!==qr&&b.minFilter!==On||b.type===un&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){let K=e.get("EXT_texture_filter_anisotropic");i.texParameterf(I,K.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function Le(I,b){let K=!1;I.__webglInit===void 0&&(I.__webglInit=!0,b.addEventListener("dispose",O),N(b));let ge=b.source,he=d.get(ge);he===void 0&&(he={},d.set(ge,he));let Me=F(b);if(Me!==I.__cacheKey){he[Me]===void 0&&(he[Me]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,K=!0),he[Me].usedTimes++;let Ae=he[I.__cacheKey];Ae!==void 0&&(he[I.__cacheKey].usedTimes--,Ae.usedTimes===0&&V(b)),I.__cacheKey=Me,I.__webglTexture=he[Me].texture}return K}function ee(I,b,K){return Math.floor(Math.floor(I/K)/b)}function re(I,b,K,ge){let Me=I.updateRanges;if(Me.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,b.width,b.height,K,ge,b.data);else{Me.sort((G,ce)=>G.start-ce.start);let Ae=0;for(let G=1;G<Me.length;G++){let ce=Me[Ae],ie=Me[G],we=ce.start+ce.count,ye=ee(ie.start,b.width,4),Se=ee(ce.start,b.width,4);ie.start<=we+1&&ye===Se&&ee(ie.start+ie.count-1,b.width,4)===ye?ce.count=Math.max(ce.count,ie.start+ie.count-ce.start):(++Ae,Me[Ae]=ie)}Me.length=Ae+1;let ae=t.getParameter(i.UNPACK_ROW_LENGTH),le=t.getParameter(i.UNPACK_SKIP_PIXELS),Ee=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,b.width);for(let G=0,ce=Me.length;G<ce;G++){let ie=Me[G],we=Math.floor(ie.start/4),ye=Math.ceil(ie.count/4),Se=we%b.width,Ge=Math.floor(we/b.width),st=ye,xe=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Se),t.pixelStorei(i.UNPACK_SKIP_ROWS,Ge),t.texSubImage2D(i.TEXTURE_2D,0,Se,Ge,st,xe,K,ge,b.data)}I.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,ae),t.pixelStorei(i.UNPACK_SKIP_PIXELS,le),t.pixelStorei(i.UNPACK_SKIP_ROWS,Ee)}}function oe(I,b,K){let ge=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(ge=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(ge=i.TEXTURE_3D);let he=Le(I,b),Me=b.source;t.bindTexture(ge,I.__webglTexture,i.TEXTURE0+K);let Ae=n.get(Me);if(Me.version!==Ae.__version||he===!0){if(t.activeTexture(i.TEXTURE0+K),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){let xe=at.getPrimaries(at.workingColorSpace),qe=b.colorSpace===ci?null:at.getPrimaries(b.colorSpace),it=b.colorSpace===ci||xe===qe?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,it)}t.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment);let le=_(b.image,!1,s.maxTextureSize);le=Ve(b,le);let Ee=r.convert(b.format,b.colorSpace),G=r.convert(b.type),ce=R(b.internalFormat,Ee,G,b.normalized,b.colorSpace,b.isVideoTexture);me(ge,b);let ie,we=b.mipmaps,ye=b.isVideoTexture!==!0,Se=Ae.__version===void 0||he===!0,Ge=Me.dataReady,st=S(b,le);if(b.isDepthTexture)ce=x(b.format===li,b.type),Se&&(ye?t.texStorage2D(i.TEXTURE_2D,1,ce,le.width,le.height):t.texImage2D(i.TEXTURE_2D,0,ce,le.width,le.height,0,Ee,G,null));else if(b.isDataTexture)if(we.length>0){ye&&Se&&t.texStorage2D(i.TEXTURE_2D,st,ce,we[0].width,we[0].height);for(let xe=0,qe=we.length;xe<qe;xe++)ie=we[xe],ye?Ge&&t.texSubImage2D(i.TEXTURE_2D,xe,0,0,ie.width,ie.height,Ee,G,ie.data):t.texImage2D(i.TEXTURE_2D,xe,ce,ie.width,ie.height,0,Ee,G,ie.data);b.generateMipmaps=!1}else ye?(Se&&t.texStorage2D(i.TEXTURE_2D,st,ce,le.width,le.height),Ge&&re(b,le,Ee,G)):t.texImage2D(i.TEXTURE_2D,0,ce,le.width,le.height,0,Ee,G,le.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){ye&&Se&&t.texStorage3D(i.TEXTURE_2D_ARRAY,st,ce,we[0].width,we[0].height,le.depth);for(let xe=0,qe=we.length;xe<qe;xe++)if(ie=we[xe],b.format!==yn)if(Ee!==null)if(ye){if(Ge)if(b.layerUpdates.size>0){let it=Wc(ie.width,ie.height,b.format,b.type);for(let De of b.layerUpdates){let _t=ie.data.subarray(De*it/ie.data.BYTES_PER_ELEMENT,(De+1)*it/ie.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,xe,0,0,De,ie.width,ie.height,1,Ee,_t)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,xe,0,0,0,ie.width,ie.height,le.depth,Ee,ie.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,xe,ce,ie.width,ie.height,le.depth,0,ie.data,0,0);else Ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ye?Ge&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,xe,0,0,0,ie.width,ie.height,le.depth,Ee,G,ie.data):t.texImage3D(i.TEXTURE_2D_ARRAY,xe,ce,ie.width,ie.height,le.depth,0,Ee,G,ie.data);b.layerUpdates.size>0&&b.clearLayerUpdates()}else{ye&&Se&&t.texStorage2D(i.TEXTURE_2D,st,ce,we[0].width,we[0].height);for(let xe=0,qe=we.length;xe<qe;xe++)ie=we[xe],b.format!==yn?Ee!==null?ye?Ge&&t.compressedTexSubImage2D(i.TEXTURE_2D,xe,0,0,ie.width,ie.height,Ee,ie.data):t.compressedTexImage2D(i.TEXTURE_2D,xe,ce,ie.width,ie.height,0,ie.data):Ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ye?Ge&&t.texSubImage2D(i.TEXTURE_2D,xe,0,0,ie.width,ie.height,Ee,G,ie.data):t.texImage2D(i.TEXTURE_2D,xe,ce,ie.width,ie.height,0,Ee,G,ie.data)}else if(b.isDataArrayTexture)if(ye){if(Se&&t.texStorage3D(i.TEXTURE_2D_ARRAY,st,ce,le.width,le.height,le.depth),Ge)if(b.layerUpdates.size>0){let xe=Wc(le.width,le.height,b.format,b.type);for(let qe of b.layerUpdates){let it=le.data.subarray(qe*xe/le.data.BYTES_PER_ELEMENT,(qe+1)*xe/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,qe,le.width,le.height,1,Ee,G,it)}b.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,Ee,G,le.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ce,le.width,le.height,le.depth,0,Ee,G,le.data);else if(b.isData3DTexture)ye?(Se&&t.texStorage3D(i.TEXTURE_3D,st,ce,le.width,le.height,le.depth),Ge&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,Ee,G,le.data)):t.texImage3D(i.TEXTURE_3D,0,ce,le.width,le.height,le.depth,0,Ee,G,le.data);else if(b.isFramebufferTexture){if(Se)if(ye)t.texStorage2D(i.TEXTURE_2D,st,ce,le.width,le.height);else{let xe=le.width,qe=le.height;for(let it=0;it<st;it++)t.texImage2D(i.TEXTURE_2D,it,ce,xe,qe,0,Ee,G,null),xe>>=1,qe>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in i){let xe=i.canvas;if(xe.hasAttribute("layoutsubtree")||xe.setAttribute("layoutsubtree","true"),le.parentNode!==xe){xe.appendChild(le),u.add(b),xe.onpaint=qe=>{let it=qe.changedElements;for(let De of u)it.includes(De.image)&&(De.needsUpdate=!0)},xe.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,le);else{let it=i.RGBA,De=i.RGBA,_t=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,it,De,_t,le)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(we.length>0){if(ye&&Se){let xe=Ze(we[0]);t.texStorage2D(i.TEXTURE_2D,st,ce,xe.width,xe.height)}for(let xe=0,qe=we.length;xe<qe;xe++)ie=we[xe],ye?Ge&&t.texSubImage2D(i.TEXTURE_2D,xe,0,0,Ee,G,ie):t.texImage2D(i.TEXTURE_2D,xe,ce,Ee,G,ie);b.generateMipmaps=!1}else if(ye){if(Se){let xe=Ze(le);t.texStorage2D(i.TEXTURE_2D,st,ce,xe.width,xe.height)}Ge&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ee,G,le)}else t.texImage2D(i.TEXTURE_2D,0,ce,Ee,G,le);E(b)&&b.mipmapsAutoUpdate===!0&&v(ge),Ae.__version=Me.version,b.onUpdate&&b.onUpdate(b)}I.__version=b.version}function de(I,b,K){if(b.image.length!==6)return;let ge=Le(I,b),he=b.source;t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+K);let Me=n.get(he);if(he.version!==Me.__version||ge===!0){t.activeTexture(i.TEXTURE0+K);let Ae=at.getPrimaries(at.workingColorSpace),ae=b.colorSpace===ci?null:at.getPrimaries(b.colorSpace),le=b.colorSpace===ci||Ae===ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,le);let Ee=b.isCompressedTexture||b.image[0].isCompressedTexture,G=b.image[0]&&b.image[0].isDataTexture,ce=[];for(let De=0;De<6;De++)!Ee&&!G?ce[De]=_(b.image[De],!0,s.maxCubemapSize):ce[De]=G?b.image[De].image:b.image[De],ce[De]=Ve(b,ce[De]);let ie=ce[0],we=r.convert(b.format,b.colorSpace),ye=r.convert(b.type),Se=R(b.internalFormat,we,ye,b.normalized,b.colorSpace),Ge=b.isVideoTexture!==!0,st=Me.__version===void 0||ge===!0,xe=he.dataReady,qe=S(b,ie);me(i.TEXTURE_CUBE_MAP,b);let it;if(b.isDepthTexture){if(Se=x(b.format===li,b.type),st)if(Ge)t.texStorage2D(i.TEXTURE_CUBE_MAP,1,Se,ie.width,ie.height);else for(let De=0;De<6;De++)t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,0,Se,ie.width,ie.height,0,we,ye,null)}else if(Ee){Ge&&st&&t.texStorage2D(i.TEXTURE_CUBE_MAP,qe,Se,ie.width,ie.height);for(let De=0;De<6;De++){it=ce[De].mipmaps;for(let _t=0;_t<it.length;_t++){let zt=it[_t];b.format!==yn?we!==null?Ge?xe&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,_t,0,0,zt.width,zt.height,we,zt.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,_t,Se,zt.width,zt.height,0,zt.data):Ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ge?xe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,_t,0,0,zt.width,zt.height,we,ye,zt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,_t,Se,zt.width,zt.height,0,we,ye,zt.data)}}}else{if(it=b.mipmaps,Ge&&st){it.length>0&&qe++;let De=Ze(ce[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,qe,Se,De.width,De.height)}for(let De=0;De<6;De++)if(G){Ge?xe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,0,0,0,ce[De].width,ce[De].height,we,ye,ce[De].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,0,Se,ce[De].width,ce[De].height,0,we,ye,ce[De].data);for(let _t=0;_t<it.length;_t++){let fi=it[_t].image[De].image;Ge?xe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,_t+1,0,0,fi.width,fi.height,we,ye,fi.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,_t+1,Se,fi.width,fi.height,0,we,ye,fi.data)}}else{Ge?xe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,0,0,0,we,ye,ce[De]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,0,Se,we,ye,ce[De]);for(let _t=0;_t<it.length;_t++){let zt=it[_t];Ge?xe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,_t+1,0,0,we,ye,zt.image[De]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,_t+1,Se,we,ye,zt.image[De])}}}E(b)&&b.mipmapsAutoUpdate===!0&&v(i.TEXTURE_CUBE_MAP),Me.__version=he.version,b.onUpdate&&b.onUpdate(b)}I.__version=b.version}function ue(I,b,K,ge,he,Me){let Ae=r.convert(K.format,K.colorSpace),ae=r.convert(K.type),le=R(K.internalFormat,Ae,ae,K.normalized,K.colorSpace),Ee=n.get(b),G=n.get(K);if(G.__renderTarget=b,!Ee.__hasExternalTextures){let ce=Math.max(1,b.width>>Me),ie=Math.max(1,b.height>>Me);he===i.TEXTURE_3D||he===i.TEXTURE_2D_ARRAY?t.texImage3D(he,Me,le,ce,ie,b.depth,0,Ae,ae,null):t.texImage2D(he,Me,le,ce,ie,0,Ae,ae,null)}t.bindFramebuffer(i.FRAMEBUFFER,I),ve(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ge,he,G.__webglTexture,0,xt(b)):(he===i.TEXTURE_2D||he>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&he<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ge,he,G.__webglTexture,Me),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Fe(I,b,K){if(i.bindRenderbuffer(i.RENDERBUFFER,I),b.depthBuffer){let ge=b.depthTexture,he=ge&&ge.isDepthTexture?ge.type:null,Me=x(b.stencilBuffer,he),Ae=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ve(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,xt(b),Me,b.width,b.height):K?i.renderbufferStorageMultisample(i.RENDERBUFFER,xt(b),Me,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,Me,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ae,i.RENDERBUFFER,I)}else{let ge=b.textures;for(let he=0;he<ge.length;he++){let Me=ge[he],Ae=r.convert(Me.format,Me.colorSpace),ae=r.convert(Me.type),le=R(Me.internalFormat,Ae,ae,Me.normalized,Me.colorSpace);ve(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,xt(b),le,b.width,b.height):K?i.renderbufferStorageMultisample(i.RENDERBUFFER,xt(b),le,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,le,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function be(I,b,K){let ge=b.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,I),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let he=n.get(b.depthTexture);he.__renderTarget=b;let Me=ge?b.depthTexture.image[0]:b.depthTexture.image;(!he.__webglTexture||Me.width!==b.width||Me.height!==b.height)&&(Me.width=b.width,Me.height=b.height,b.depthTexture.needsUpdate=!0),ge?J(b.depthTexture,0):W(b.depthTexture,0);let Ae=he.__webglTexture,ae=xt(b),le=ge?i.TEXTURE_CUBE_MAP_POSITIVE_X+K:i.TEXTURE_2D,Ee=b.depthTexture.format===li?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(b.depthTexture.format===ri)ve(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Ee,le,Ae,0,ae):i.framebufferTexture2D(i.FRAMEBUFFER,Ee,le,Ae,0);else if(b.depthTexture.format===li)ve(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Ee,le,Ae,0,ae):i.framebufferTexture2D(i.FRAMEBUFFER,Ee,le,Ae,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ze(I){let b=n.get(I),K=I.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==I.depthTexture){let ge=I.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),ge){let he=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,ge.removeEventListener("dispose",he)};ge.addEventListener("dispose",he),b.__depthDisposeCallback=he}b.__boundDepthTexture=ge}if(I.depthTexture&&!b.__autoAllocateDepthBuffer)if(K)for(let ge=0;ge<6;ge++)be(b.__webglFramebuffer[ge],I,ge);else I.texture.mipmaps.length>0?be(b.__webglFramebuffer[0],I,0):be(b.__webglFramebuffer,I,0);else if(K){b.__webglDepthbuffer=[];for(let ge=0;ge<6;ge++)if(t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[ge]),b.__webglDepthbuffer[ge]===void 0)b.__webglDepthbuffer[ge]=i.createRenderbuffer(),Fe(b.__webglDepthbuffer[ge],I,!1);else{let he=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Me=b.__webglDepthbuffer[ge];i.bindRenderbuffer(i.RENDERBUFFER,Me),i.framebufferRenderbuffer(i.FRAMEBUFFER,he,i.RENDERBUFFER,Me)}}else if(I.texture.mipmaps.length>0?t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),Fe(b.__webglDepthbuffer,I,!1);else{let he=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Me=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Me),i.framebufferRenderbuffer(i.FRAMEBUFFER,he,i.RENDERBUFFER,Me)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Je(I,b,K){let ge=n.get(I);b!==void 0&&ue(ge.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),K!==void 0&&ze(I)}function et(I){let b=I.texture,K=n.get(I),ge=n.get(b);I.addEventListener("dispose",T),N(I);let he=I.textures,Me=I.isWebGLCubeRenderTarget===!0,Ae=he.length>1;if(Ae||(ge.__webglTexture===void 0&&(ge.__webglTexture=i.createTexture()),ge.__version=b.version,o.memory.textures++),Me){K.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(b.mipmaps.length>0){K.__webglFramebuffer[ae]=[];for(let le=0;le<b.mipmaps.length;le++)K.__webglFramebuffer[ae][le]=i.createFramebuffer()}else K.__webglFramebuffer[ae]=i.createFramebuffer()}else{if(b.mipmaps.length>0){K.__webglFramebuffer=[];for(let ae=0;ae<b.mipmaps.length;ae++)K.__webglFramebuffer[ae]=i.createFramebuffer()}else K.__webglFramebuffer=i.createFramebuffer();if(Ae)for(let ae=0,le=he.length;ae<le;ae++){let Ee=n.get(he[ae]);Ee.__webglTexture===void 0&&(Ee.__webglTexture=i.createTexture(),o.memory.textures++)}if(I.samples>0&&ve(I)===!1){K.__webglMultisampledFramebuffer=i.createFramebuffer(),K.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,K.__webglMultisampledFramebuffer);for(let ae=0;ae<he.length;ae++){let le=he[ae];K.__webglColorRenderbuffer[ae]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,K.__webglColorRenderbuffer[ae]);let Ee=r.convert(le.format,le.colorSpace),G=r.convert(le.type),ce=R(le.internalFormat,Ee,G,le.normalized,le.colorSpace,I.isXRRenderTarget===!0),ie=xt(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,ie,ce,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.RENDERBUFFER,K.__webglColorRenderbuffer[ae])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(K.__webglDepthRenderbuffer=i.createRenderbuffer(),Fe(K.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Me){t.bindTexture(i.TEXTURE_CUBE_MAP,ge.__webglTexture),me(i.TEXTURE_CUBE_MAP,b);for(let ae=0;ae<6;ae++)if(b.mipmaps.length>0)for(let le=0;le<b.mipmaps.length;le++)ue(K.__webglFramebuffer[ae][le],I,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,le);else ue(K.__webglFramebuffer[ae],I,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);E(b)?v(i.TEXTURE_CUBE_MAP):b.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,b.mipmaps.length-1),t.unbindTexture()}else if(Ae){for(let ae=0,le=he.length;ae<le;ae++){let Ee=he[ae],G=n.get(Ee),ce=i.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ce=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ce,G.__webglTexture),me(ce,Ee),ue(K.__webglFramebuffer,I,Ee,i.COLOR_ATTACHMENT0+ae,ce,0),E(Ee)&&v(ce)}t.unbindTexture()}else{let ae=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ae=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ae,ge.__webglTexture),me(ae,b),b.mipmaps.length>0)for(let le=0;le<b.mipmaps.length;le++)ue(K.__webglFramebuffer[le],I,b,i.COLOR_ATTACHMENT0,ae,le);else ue(K.__webglFramebuffer,I,b,i.COLOR_ATTACHMENT0,ae,0);E(b)?v(ae):b.mipmaps.length>0&&i.texParameteri(ae,i.TEXTURE_MAX_LEVEL,b.mipmaps.length-1),t.unbindTexture()}I.depthBuffer&&ze(I)}function X(I){let b=I.textures;for(let K=0,ge=b.length;K<ge;K++){let he=b[K];if(E(he)&&he.mipmapsAutoUpdate===!0){let Me=w(I),Ae=n.get(he).__webglTexture;t.bindTexture(Me,Ae),v(Me),t.unbindTexture()}}}let wt=[];function nt(I){if(I.samples>0){if(ve(I)===!1){let b=I.textures,K=I.width,ge=I.height,he=i.COLOR_BUFFER_BIT,Me=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ae=n.get(I),ae=b.length>1;if(ae)for(let Ee=0;Ee<b.length;Ee++)t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),I.texture.mipmaps.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer);for(let Ee=0;Ee<b.length;Ee++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(he|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(he|=i.STENCIL_BUFFER_BIT)),ae){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ae.__webglColorRenderbuffer[Ee]);let G=n.get(b[Ee]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,G,0)}i.blitFramebuffer(0,0,K,ge,0,0,K,ge,he,i.NEAREST),l===!0&&(wt.length=0,wt.push(i.COLOR_ATTACHMENT0+Ee),I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&wt.push(Me),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,wt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ae)for(let Ee=0;Ee<b.length;Ee++){t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,Ae.__webglColorRenderbuffer[Ee]);let G=n.get(b[Ee]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,G,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&l){let b=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function xt(I){return Math.min(s.maxSamples,I.samples)}function ve(I){let b=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function yt(I){let b=o.render.frame;h.get(I)!==b&&(h.set(I,b),I.update())}function Ve(I,b){let K=I.colorSpace,ge=I.format,he=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||K!==dr&&K!==ci&&(at.getTransfer(K)===pt?(ge!==yn||he!==hn)&&Ye("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):$e("WebGLTextures: Unsupported texture color space:",K)),b}function Ze(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=Y,this.resetTextureUnits=L,this.getTextureUnits=M,this.setTextureUnits=D,this.setTexture2D=W,this.setTexture2DArray=Z,this.setTexture3D=te,this.setTextureCube=J,this.rebindTextures=Je,this.setupRenderTarget=et,this.updateRenderTargetMipmap=X,this.updateMultisampleRenderTarget=nt,this.setupDepthRenderbuffer=ze,this.setupFrameBufferTexture=ue,this.useMultisampledRTT=ve,this.dispose=k}function by(i,e){function t(n,s=ci){let r,o=at.getTransfer(s);if(n===hn)return i.UNSIGNED_BYTE;if(n===wa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ta)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Tc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ac)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ec)return i.BYTE;if(n===wc)return i.SHORT;if(n===Gs)return i.UNSIGNED_SHORT;if(n===Ea)return i.INT;if(n===Bn)return i.UNSIGNED_INT;if(n===un)return i.FLOAT;if(n===Nt)return i.HALF_FLOAT;if(n===Rc)return i.ALPHA;if(n===Cc)return i.RGB;if(n===yn)return i.RGBA;if(n===ri)return i.DEPTH_COMPONENT;if(n===li)return i.DEPTH_STENCIL;if(n===Aa)return i.RED;if(n===Ra)return i.RED_INTEGER;if(n===Li)return i.RG;if(n===Ca)return i.RG_INTEGER;if(n===Pa)return i.RGBA_INTEGER;if(n===Yr||n===Zr||n===$r||n===Jr)if(o===pt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Yr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===$r)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Yr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Zr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===$r)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Jr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ia||n===La||n===Da||n===Na)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ia)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===La)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Da)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Na)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ua||n===Fa||n===Oa||n===Ba||n===ka||n===Kr||n===za)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ua||n===Fa)return o===pt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Oa)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ba)return r.COMPRESSED_R11_EAC;if(n===ka)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Kr)return r.COMPRESSED_RG11_EAC;if(n===za)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ha||n===Ga||n===Va||n===Wa||n===Xa||n===qa||n===Ya||n===Za||n===$a||n===Ja||n===Ka||n===Qa||n===ja||n===el)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ha)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ga)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Va)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Wa)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Xa)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===qa)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ya)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Za)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===$a)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ja)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ka)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Qa)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ja)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===el)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===tl||n===nl||n===il)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===tl)return o===pt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===nl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===il)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===sl||n===rl||n===Qr||n===ol)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===sl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===rl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Qr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ol)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ts?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Ey=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,wy=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,sh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new br(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Dt({vertexShader:Ey,fragmentShader:wy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Qe(new It(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},rh=class extends Wn{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,m=null,y=typeof XRWebGLBinding<"u",g=new sh,p={},_=t.getContextAttributes(),E=null,v=null,w=[],R=[],x=new fe,S=null,N=null,C=new qt;C.viewport=new gt;let O=new qt;O.viewport=new gt;let T=[C,O],U=new va,P=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(F){let W=w[F];return W===void 0&&(W=new Ps,w[F]=W),W.getTargetRaySpace()},this.getControllerGrip=function(F){let W=w[F];return W===void 0&&(W=new Ps,w[F]=W),W.getGripSpace()},this.getHand=function(F){let W=w[F];return W===void 0&&(W=new Ps,w[F]=W),W.getHandSpace()};function H(F){let W=R.indexOf(F.inputSource);if(W===-1)return;let Z=w[W];Z!==void 0&&(Z.update(F.inputSource,F.frame,c||o),Z.dispatchEvent({type:F.type,data:F.inputSource}))}function V(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",$);for(let F=0;F<w.length;F++){let W=R[F];W!==null&&(R[F]=null,w[F].disconnect(W))}P=null,k=null,g.reset();for(let F in p)delete p[F];if(e.setRenderTarget(E),d=null,f=null,u=null,s=null,v=null,Y.stop(),n.isPresenting=!1,e.setPixelRatio(S),e.setSize(x.width,x.height,!1),N!==null){let F=N.camera;F.fov=N.fov,F.zoom=N.zoom,F.updateProjectionMatrix(),N=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(F){r=F,n.isPresenting===!0&&Ye("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(F){a=F,n.isPresenting===!0&&Ye("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(F){c=F},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&y&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(F){if(s=F,s!==null){if(E=e.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",V),s.addEventListener("inputsourceschange",$),_.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(x),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let Z=null,te=null,J=null;_.depth&&(J=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Z=_.stencil?li:ri,te=_.stencil?ts:Bn);let se={colorFormat:t.RGBA8,depthFormat:J,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(se),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),v=new Pt(f.textureWidth,f.textureHeight,{format:yn,type:hn,depthTexture:new oi(f.textureWidth,f.textureHeight,te,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let Z={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,Z),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new Pt(d.framebufferWidth,d.framebufferHeight,{format:yn,type:hn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Y.setContext(s),Y.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function $(F){for(let W=0;W<F.removed.length;W++){let Z=F.removed[W],te=R.indexOf(Z);te>=0&&(R[te]=null,w[te].disconnect(Z))}for(let W=0;W<F.added.length;W++){let Z=F.added[W],te=R.indexOf(Z);if(te===-1){for(let se=0;se<w.length;se++)if(se>=R.length){R.push(Z),te=se;break}else if(R[se]===null){R[se]=Z,te=se;break}if(te===-1)break}let J=w[te];J&&J.connect(Z)}}function B(F,W){W===null?F.matrixWorld.copy(F.matrix):F.matrixWorld.multiplyMatrices(W.matrixWorld,F.matrix),F.matrixWorldInverse.copy(F.matrixWorld).invert()}this.updateCamera=function(F){if(s===null)return;let W=F.near,Z=F.far;g.texture!==null&&(g.depthNear>0&&(W=g.depthNear),g.depthFar>0&&(Z=g.depthFar)),U.near=O.near=C.near=W,U.far=O.far=C.far=Z,(P!==U.near||k!==U.far)&&(s.updateRenderState({depthNear:U.near,depthFar:U.far}),P=U.near,k=U.far),U.layers.mask=F.layers.mask|6,C.layers.mask=U.layers.mask&-5,O.layers.mask=U.layers.mask&-3;let te=F.parent,J=U.cameras;B(U,te);for(let se=0;se<J.length;se++)B(J[se],te);U.projectionMatrix.copy(C.projectionMatrix),U.projectionMatrixInverse.copy(C.projectionMatrixInverse),N===null&&F.isPerspectiveCamera&&(N={camera:F,fov:F.fov,zoom:F.zoom}),L(F,U,te)};function L(F,W,Z){Z===null?F.matrix.copy(W.matrixWorld):(F.matrix.copy(Z.matrixWorld),F.matrix.invert(),F.matrix.multiply(W.matrixWorld)),F.matrix.decompose(F.position,F.quaternion,F.scale),F.updateMatrixWorld(!0),F.projectionMatrix.copy(W.projectionMatrix),F.projectionMatrixInverse.copy(W.projectionMatrixInverse),F.isPerspectiveCamera&&(F.fov=Rs*2*Math.atan(1/F.projectionMatrix.elements[5]),F.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(F){l=F,f!==null&&(f.fixedFoveation=F),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=F)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(U)},this.getCameraTexture=function(F){return p[F]};let M=null;function D(F,W){if(h=W.getViewerPose(c||o),m=W,h!==null){let Z=h.views;d!==null&&(e.setRenderTargetFramebuffer(v,d.framebuffer),e.setRenderTarget(v));let te=!1;Z.length!==U.cameras.length&&(U.cameras.length=0,te=!0);for(let pe=0;pe<Z.length;pe++){let me=Z[pe],Le=null;if(d!==null)Le=d.getViewport(me);else{let re=u.getViewSubImage(f,me);Le=re.viewport,pe===0&&(e.setRenderTargetTextures(v,re.colorTexture,re.depthStencilTexture),e.setRenderTarget(v))}let ee=T[pe];ee===void 0&&(ee=new qt,ee.layers.enable(pe),ee.viewport=new gt,T[pe]=ee),ee.matrix.fromArray(me.transform.matrix),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.projectionMatrix.fromArray(me.projectionMatrix),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert(),ee.viewport.set(Le.x,Le.y,Le.width,Le.height),pe===0&&(U.matrix.copy(ee.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),te===!0&&U.cameras.push(ee)}let J=s.enabledFeatures;if(J&&J.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){u=n.getBinding();let pe=u.getDepthInformation(Z[0]);pe&&pe.isValid&&pe.texture&&g.init(pe,s.renderState)}if(J&&J.includes("camera-access")&&y){e.state.unbindTexture(),u=n.getBinding();for(let pe=0;pe<Z.length;pe++){let me=Z[pe].camera;if(me){let Le=p[me];Le||(Le=new br,p[me]=Le);let ee=u.getCameraImage(me);Le.sourceTexture=ee}}}}for(let Z=0;Z<w.length;Z++){let te=R[Z],J=w[Z];te!==null&&J!==void 0&&J.update(te,W,c||o)}M&&M(F,W),W.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:W}),m=null}let Y=new af;Y.setAnimationLoop(D),this.setAnimationLoop=function(F){M=F},this.dispose=function(){}}},Ty=new We,xf=new Ke;xf.set(-1,0,0,0,1,0,0,0,1);function Ay(i,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Hc(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,_,E,v){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),f(g,p),p.isMeshPhysicalMaterial&&d(g,p,v)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),y(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,_,E):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Wt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Wt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let _=e.get(p),E=_.envMap,v=_.envMapRotation;E&&(g.envMap.value=E,g.envMapRotation.value.setFromMatrix4(Ty.makeRotationFromEuler(v)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(xf),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,_,E){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*_,g.scale.value=E*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function f(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function d(g,p,_){g.ior.value=p.ior,p.diffuseRoughness>0&&(g.diffuseRoughness.value=p.diffuseRoughness,p.diffuseRoughnessMap&&(g.diffuseRoughnessMap.value=p.diffuseRoughnessMap,t(p.diffuseRoughnessMap,g.diffuseRoughnessMapTransform))),p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Wt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.retroreflectivity>0&&(g.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessMinimum,g.iridescenceThicknessMaximum.value=p.iridescenceThicknessMaximum,p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=_.texture,g.transmissionSamplerSize.value.set(_.width,_.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function y(g,p){let _=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(_.matrixWorld),g.nearDistance.value=_.shadow.camera.near,g.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Ry(i,e,t,n){let s={},r={};function o(_,E){let v=E.program;n.uniformBlockBinding(_,v,s[_.id])}function a(_,E){let v=s[_.id];v===void 0&&(m(_),v=l(_),s[_.id]=v,_.addEventListener("dispose",g));let w=E.program;n.updateUBOMapping(_,w);let R=e.render.frame;r[_.id]!==R&&(c(_),r[_.id]=R)}function l(_){let E=i.createBuffer(),v=_.__size,w=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,v,w),i.bindBuffer(i.UNIFORM_BUFFER,null),E}function c(_){let E=s[_.id],v=_.uniforms,w=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let R=0,x=v.length;R<x;R++){let S=v[R];if(Array.isArray(S))for(let N=0,C=S.length;N<C;N++)h(S[N],R,N,w);else h(S,R,0,w)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(_,E,v,w){if(f(_,E,v,w)===!0){let R=_.__offset,x=_.value;if(Array.isArray(x)){let S=0;for(let N=0;N<x.length;N++){let C=x[N],O=y(C,!0);u(C,_.__data,S),S+=O.storage/Float32Array.BYTES_PER_ELEMENT}}else u(x,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,R,_.__data)}}function u(_,E,v){typeof _=="number"||typeof _=="boolean"?E[v]=_:_.isMatrix3?(E[v]=_.elements[0],E[v+1]=_.elements[1],E[v+2]=_.elements[2],E[v+3]=0,E[v+4]=_.elements[3],E[v+5]=_.elements[4],E[v+6]=_.elements[5],E[v+7]=0,E[v+8]=_.elements[6],E[v+9]=_.elements[7],E[v+10]=_.elements[8],E[v+11]=0):ArrayBuffer.isView(_)?E.set(_.subarray(0,E.length-v),v):_.toArray(E,v)}function f(_,E,v,w){let R=_.value,x=E+"_"+v;if(Array.isArray(R)){w[x]===void 0&&(w[x]=[]);let S=w[x],N=!1;for(let C=0;C<R.length;C++)d(R[C],S,C)===!0&&(N=!0);return N}return d(R,w,x)}function d(_,E,v){if(E[v]===void 0)return typeof _=="number"||typeof _=="boolean"?E[v]=_:ArrayBuffer.isView(_)?E[v]=_.slice():E[v]=_.clone(),!0;{let w=E[v];if(typeof _=="number"||typeof _=="boolean"){if(w!==_)return E[v]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(w.equals(_)===!1)return w.copy(_),!0}}return!1}function m(_){let E=_.uniforms,v=0,w=16;for(let x=0,S=E.length;x<S;x++){let N=Array.isArray(E[x])?E[x]:[E[x]];for(let C=0,O=N.length;C<O;C++){let T=N[C],U=Array.isArray(T.value)?T.value:[T.value],P=Array.isArray(E[x])||Array.isArray(T.value),k=v;for(let V=0,$=U.length;V<$;V++){let B=U[V],L=y(B,P),M=v%w,D=M%L.boundary,Y=M+D;v+=D,Y!==0&&w-Y<L.storage&&(v+=w-Y),V===0&&(k=v),v+=L.storage}let H=T.type==="int"?Int32Array:T.type==="uint"?Uint32Array:Float32Array;T.__data=new H((v-k)/Float32Array.BYTES_PER_ELEMENT),T.__offset=k}}let R=v%w;return R>0&&(v+=w-R),_.__size=v,_.__cache={},this}function y(_,E){let v={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(v.boundary=4,v.storage=4):_.isVector2?(v.boundary=8,v.storage=8):_.isVector3||_.isColor?(v.boundary=16,v.storage=12):_.isVector4?(v.boundary=16,v.storage=16):_.isMatrix3?(v.boundary=16,v.storage=48):_.isMatrix4?(v.boundary=16,v.storage=64):_.isTexture?Ye("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(v.boundary=16,v.storage=_.byteLength):Ye("WebGLRenderer: Unsupported uniform value type.",_),E===!0&&(v.boundary=16,v.storage=Math.ceil(v.storage/16)*16),v}function g(_){let E=_.target;E.removeEventListener("dispose",g),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function p(){for(let _ in s)i.deleteBuffer(s[_]);s={},r={}}return{bind:o,update:a,dispose:p}}var Cy=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),$n=null;function Py(){return $n===null&&($n=new Yi(Cy,16,16,Li,Nt),$n.name="DFG_LUT",$n.minFilter=Yt,$n.magFilter=Yt,$n.wrapS=Nn,$n.wrapT=Nn,$n.generateMipmaps=!1,$n.needsUpdate=!0),$n}var ul=class{constructor(e={}){let{canvas:t=Rd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:d=hn}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=o;let y=d,g=new Set([Pa,Ca,Ra]),p=new Set([hn,Bn,Gs,ts,wa,Ta]),_=new Uint32Array(4),E=new Int32Array(4),v={textures:[],min:[],max:[],resolution:[]},w=null,R=null,x=[],S=[],N=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=An,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let C=this,O=!1,T=null,U=null,P=null,k=null;this._outputColorSpace=At;let H=0,V=0,$=null,B=-1,L=null,M=new gt,D=new gt,Y=null,F=new Pe(0),W=0,Z=t.width,te=t.height,J=1,se=null,Ne=null,pe=new gt(0,0,Z,te),me=new gt(0,0,Z,te),Le=!1,ee=new wi,re=new ea,oe=!1,de=!1,ue=new We,Fe=new z,be=new gt,ze={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Je=!1;function et(){return $===null?J:1}let X=n;function wt(A,q){return t.getContext(A,q)}let nt,xt,ve,yt,Ve,Ze,I,b,K,ge,he,Me,Ae,ae,le,Ee,G,ce,ie,we,ye,Se,Ge;try{let A={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",qe,!1),t.addEventListener("webglcontextrestored",it,!1),t.addEventListener("webglcontextcreationerror",De,!1),X===null){let q="webgl2";if(X=wt(q,A),X===null)throw wt(q)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}st()}catch(A){throw t.removeEventListener("webglcontextlost",qe,!1),t.removeEventListener("webglcontextrestored",it,!1),t.removeEventListener("webglcontextcreationerror",De,!1),$e("WebGLRenderer: "+A.message),A}function st(){nt=new Hx(X),nt.init(),ye=new by(X,nt),xt=new Px(X,nt,e,ye),ve=new My(X,nt),xt.reversedDepthBuffer&&f&&ve.buffers.depth.setReversed(!0),U=X.createFramebuffer(),P=X.createFramebuffer(),k=X.createFramebuffer(),yt=new Wx(X),Ve=new ay,Ze=new Sy(X,nt,ve,Ve,xt,ye,yt),I=new zx(C),b=new qm(X),Se=new Rx(X,b),K=new Gx(X,b,yt,Se),ge=new qx(X,K,b,Se,yt),ce=new Xx(X,xt,Ze),le=new Ix(Ve),he=new oy(C,I,nt,xt,Se,le),Me=new Ay(C,Ve),Ae=new cy,ae=new my(nt),G=new Ax(C,I,ve,ge,m,l),Ee=new vy(C,ge,xt),Ge=new Ry(X,yt,xt,ve),ie=new Cx(X,nt,yt),we=new Vx(X,nt,yt),yt.programs=he.programs,C.capabilities=xt,C.extensions=nt,C.properties=Ve,C.renderLists=Ae,C.shadowMap=Ee,C.state=ve,C.info=yt}y!==hn&&(N=new Zx(y,t.width,t.height,a,s,r));let xe=new rh(C,X);this.xr=xe,this.getContext=function(){return X},this.getContextAttributes=function(){return X.getContextAttributes()},this.forceContextLoss=function(){let A=nt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=nt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(A){A!==void 0&&(J=A,this.setSize(Z,te,!1))},this.getSize=function(A){return A.set(Z,te)},this.setSize=function(A,q,ne=!0){if(xe.isPresenting){Ye("WebGLRenderer: Can't change size while VR device is presenting.");return}Z=A,te=q,t.width=Math.floor(A*J),t.height=Math.floor(q*J),ne===!0&&(t.style.width=A+"px",t.style.height=q+"px"),N!==null&&N.setSize(t.width,t.height),this.setViewport(0,0,A,q)},this.getDrawingBufferSize=function(A){return A.set(Z*J,te*J).floor()},this.setDrawingBufferSize=function(A,q,ne){Z=A,te=q,J=ne,t.width=Math.floor(A*ne),t.height=Math.floor(q*ne),this.setViewport(0,0,A,q)},this.setEffects=function(A){if(y===hn){$e("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let q=0;q<A.length;q++)if(A[q].isOutputPass===!0){Ye("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}N.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(M)},this.getViewport=function(A){return A.copy(pe)},this.setViewport=function(A,q,ne,Q){A.isVector4?pe.set(A.x,A.y,A.z,A.w):pe.set(A,q,ne,Q),ve.viewport(M.copy(pe).multiplyScalar(et()).round())},this.getScissor=function(A){return A.copy(me)},this.setScissor=function(A,q,ne,Q){A.isVector4?me.set(A.x,A.y,A.z,A.w):me.set(A,q,ne,Q),ve.scissor(D.copy(me).multiplyScalar(et()).round())},this.getScissorTest=function(){return Le},this.setScissorTest=function(A){ve.setScissorTest(Le=A)},this.setOpaqueSort=function(A){se=A},this.setTransparentSort=function(A){Ne=A},this.getClearColor=function(A){return A.copy(G.getClearColor())},this.setClearColor=function(){G.setClearColor(...arguments)},this.getClearAlpha=function(){return G.getClearAlpha()},this.setClearAlpha=function(){G.setClearAlpha(...arguments)},this.clear=function(A=!0,q=!0,ne=!0){let Q=0;if(A){let j=!1;if($!==null){let Re=$.texture.format;j=g.has(Re)}if(j){let Re=$.texture.type,Oe=p.has(Re),Te=G.getClearColor(),Ue=G.getClearAlpha(),He=Te.r,je=Te.g,lt=Te.b;Oe?(_[0]=He,_[1]=je,_[2]=lt,_[3]=Ue,X.clearBufferuiv(X.COLOR,0,_)):(E[0]=He,E[1]=je,E[2]=lt,E[3]=Ue,X.clearBufferiv(X.COLOR,0,E))}else Q|=X.COLOR_BUFFER_BIT}q&&(Q|=X.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ne&&(Q|=X.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Q!==0&&X.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),T=A},this.dispose=function(){t.removeEventListener("webglcontextlost",qe,!1),t.removeEventListener("webglcontextrestored",it,!1),t.removeEventListener("webglcontextcreationerror",De,!1),G.dispose(),Ae.dispose(),ae.dispose(),Ze.dispose(),Ve.dispose(),I.dispose(),ge.dispose(),K.dispose(),Se.dispose(),Ge.dispose(),he.dispose(),xe.dispose(),xe.removeEventListener("sessionstart",Oh),xe.removeEventListener("sessionend",Bh),Bi.stop()};function qe(A){A.preventDefault(),pr("WebGLRenderer: Context Lost."),O=!0}function it(){pr("WebGLRenderer: Context Restored."),O=!1;let A=yt.autoReset,q=Ee.enabled,ne=Ee.autoUpdate,Q=Ee.needsUpdate,j=Ee.type;st(),yt.autoReset=A,Ee.enabled=q,Ee.autoUpdate=ne,Ee.needsUpdate=Q,Ee.type=j}function De(A){$e("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function _t(A){let q=A.target;q.removeEventListener("dispose",_t),zt(q)}function zt(A){fi(A),Ve.remove(A)}function fi(A){let q=Ve.get(A).programs;q!==void 0&&(q.forEach(function(ne){he.releaseProgram(ne)}),A.isShaderMaterial&&he.releaseShaderCache(A))}this.renderBufferDirect=function(A,q,ne,Q,j,Re){q===null&&(q=ze);let Oe=j.isMesh&&j.matrixWorld.determinantAffine()<0,Te=np(A,q,ne,Q,j);ve.setMaterial(Q,Oe);let Ue=ne.index,He=1;if(Q.wireframe===!0){if(Ue=K.getWireframeAttribute(ne),Ue===void 0)return;He=2}let je=ne.drawRange,lt=ne.attributes.position,Be=je.start*He,ct=(je.start+je.count)*He;Re!==null&&(Be=Math.max(Be,Re.start*He),ct=Math.min(ct,(Re.start+Re.count)*He)),Ue!==null?(Be=Math.max(Be,0),ct=Math.min(ct,Ue.count)):lt!=null&&(Be=Math.max(Be,0),ct=Math.min(ct,lt.count));let Ut=ct-Be;if(Ut<0||Ut===1/0)return;Se.setup(j,Q,Te,ne,Ue);let Mt,vt=ie;if(Ue!==null&&(Mt=b.get(Ue),vt=we,vt.setIndex(Mt)),j.isMesh)Q.wireframe===!0?(ve.setLineWidth(Q.wireframeLinewidth*et()),vt.setMode(X.LINES)):vt.setMode(X.TRIANGLES);else if(j.isLine){let $t=Q.linewidth;$t===void 0&&($t=1),ve.setLineWidth($t*et()),j.isLineSegments?vt.setMode(X.LINES):j.isLineLoop?vt.setMode(X.LINE_LOOP):vt.setMode(X.LINE_STRIP)}else j.isPoints?vt.setMode(X.POINTS):j.isSprite&&vt.setMode(X.TRIANGLES);if(j.isBatchedMesh)if(nt.get("WEBGL_multi_draw"))vt.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else{let $t=j._multiDrawStarts,ke=j._multiDrawCounts,sn=j._multiDrawCount,mt=Ue?b.get(Ue).bytesPerElement:1,ki=Ve.get(Q).currentProgram.getUniforms();for(let Jt=0;Jt<sn;Jt++)ki.setValue(X,"_gl_DrawID",Jt),vt.render($t[Jt]/mt,ke[Jt])}else if(j.isInstancedMesh)vt.renderInstances(Be,Ut,j.count);else if(ne.isInstancedBufferGeometry){let $t=ne._maxInstanceCount!==void 0?ne._maxInstanceCount:1/0,ke=Math.min(ne.instanceCount,$t);vt.renderInstances(Be,Ut,ke)}else vt.render(Be,Ut)};function Fh(A,q,ne,Q){T!==null&&A.isNodeMaterial&&T.setObject(Q,A),oe===!0&&le.setState(A,ne,!1),A.transparent===!0&&A.side===Zt&&A.forceSinglePass===!1?(A.side=Wt,A.needsUpdate=!0,Ks(A,q,Q),A.side=Zn,A.needsUpdate=!0,Ks(A,q,Q),A.side=Zt):Ks(A,q,Q)}this.compile=function(A,q,ne=null){ne===null&&(ne=A),T!==null&&T.renderStart(A,q,ne),R=ae.get(ne),R.init(q),S.push(R),ne.traverseVisible(function(j){j.isLight&&j.layers.test(q.layers)&&(R.pushLight(j),j.castShadow&&R.pushShadow(j))}),A!==ne&&A.traverseVisible(function(j){j.isLight&&j.layers.test(q.layers)&&(R.pushLight(j),j.castShadow&&R.pushShadow(j))}),R.setupLights(),T!==null&&T.updateLights(R.state.lightsArray),de=this.localClippingEnabled,oe=le.init(this.clippingPlanes,de),oe===!0&&le.setGlobalState(this.clippingPlanes,q),T!==null&&Ee.render(R.state.shadowsArray,ne,q);let Q=new Set;return A.traverse(function(j){if(!(j.isMesh||j.isPoints||j.isLine||j.isSprite))return;let Re=j.material;if(Re)if(Array.isArray(Re))for(let Oe=0;Oe<Re.length;Oe++){let Te=Re[Oe];Fh(Te,ne,q,j),Q.add(Te)}else Fh(Re,ne,q,j),Q.add(Re)}),R=S.pop(),T!==null&&T.renderEnd(),Q},this.compileAsync=function(A,q,ne=null){let Q=this.compile(A,q,ne);return new Promise(j=>{function Re(){if(Q.forEach(function(Oe){let Ue=Ve.get(Oe).currentProgram;(Ue===void 0||Ue.isReady())&&Q.delete(Oe)}),Q.size===0){j(A);return}setTimeout(Re,10)}nt.get("KHR_parallel_shader_compile")!==null?Re():setTimeout(Re,10)})};let Il=null;function ep(A){Il&&Il(A)}function Oh(){Bi.stop()}function Bh(){Bi.start()}let Bi=new af;Bi.setAnimationLoop(ep),typeof self<"u"&&Bi.setContext(self),this.setAnimationLoop=function(A){Il=A,xe.setAnimationLoop(A),A===null?Bi.stop():Bi.start()},xe.addEventListener("sessionstart",Oh),xe.addEventListener("sessionend",Bh),this.render=function(A,q){if(q!==void 0&&q.isCamera!==!0){$e("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(O===!0)return;T!==null&&T.renderStart(A,q);let ne=xe.enabled===!0&&xe.isPresenting===!0,Q=N!==null&&($===null||ne)&&N.begin(C,$);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),xe.enabled===!0&&xe.isPresenting===!0&&(N===null||N.isCompositing()===!1)&&(xe.cameraAutoUpdate===!0&&xe.updateCamera(q),q=xe.getCamera()),A.isScene===!0&&A.onBeforeRender(C,A,q,$),R=ae.get(A,S.length),R.init(q),R.state.textureUnits=Ze.getTextureUnits(),S.push(R),ue.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),q.isArrayCamera?re.setFromArrayCamera(q):ee.setFromProjectionMatrix(ue,En,q.reversedDepth),de=this.localClippingEnabled,oe=le.init(this.clippingPlanes,de),w=Ae.get(A,x.length),w.init(),x.push(w),this.info.render.frame++,xe.enabled===!0&&xe.isPresenting===!0){let Oe=C.xr.getDepthSensingMesh();Oe!==null&&Ll(Oe,q,-1/0,C.sortObjects)}Ll(A,q,0,C.sortObjects),w.finish(),T!==null&&T.updateLights(R.state.lightsArray),C.sortObjects===!0&&w.sort(se,Ne),Je=xe.enabled===!1||xe.isPresenting===!1||xe.hasDepthSensing()===!1,Je&&G.addToRenderList(w,A),this.info.autoReset===!0&&this.info.reset(),oe===!0&&le.beginShadows();let j=R.state.shadowsArray;if(Ee.render(j,A,q),oe===!0&&le.endShadows(),(Q&&N.hasRenderPass())===!1){let Oe=w.opaque,Te=w.transmissive;if(R.setupLights(),q.isArrayCamera){let Ue=q.cameras;if(Te.length>0)for(let He=0,je=Ue.length;He<je;He++){let lt=Ue[He];zh(Oe,Te,A,lt)}Je&&G.render(A);for(let He=0,je=Ue.length;He<je;He++){let lt=Ue[He];kh(w,A,lt,lt.viewport)}}else Te.length>0&&zh(Oe,Te,A,q),Je&&G.render(A),kh(w,A,q)}$!==null&&V===0&&(Ze.updateMultisampleRenderTarget($),Ze.updateRenderTargetMipmap($)),Q&&N.end(C),A.isScene===!0&&A.onAfterRender(C,A,q),Se.resetDefaultState(),B=-1,L=null,S.pop(),S.length>0?(R=S[S.length-1],Ze.setTextureUnits(R.state.textureUnits),oe===!0&&le.setGlobalState(C.clippingPlanes,R.state.camera)):R=null,x.pop(),x.length>0?w=x[x.length-1]:w=null,T!==null&&T.renderEnd()};function Ll(A,q,ne,Q){if(A.visible===!1)return;if(A.layers.test(q.layers)){if(A.isGroup)ne=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(q);else if(A.isLight)R.pushLight(A),A.castShadow&&R.pushShadow(A);else if(A.isSprite){let Oe=q.isArrayCamera?re:ee;if(!A.frustumCulled||A.intersectsFrustum(Oe)){Q&&be.setFromMatrixPosition(A.matrixWorld).applyMatrix4(ue);let Te=ge.update(A),Ue=A.material;Ue.visible&&w.push(A,Te,Ue,ne,be.z,null,q)}}else if(A.isMesh||A.isLine||A.isPoints){let Oe=q.isArrayCamera?re:ee;if(!A.frustumCulled||A.intersectsFrustum(Oe)){let Te=ge.update(A),Ue=A.material;if(Q&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),be.copy(A.boundingSphere.center)):(Te.boundingSphere===null&&Te.computeBoundingSphere(),be.copy(Te.boundingSphere.center)),be.applyMatrix4(A.matrixWorld).applyMatrix4(ue)),Array.isArray(Ue)){let He=Te.groups;for(let je=0,lt=He.length;je<lt;je++){let Be=He[je],ct=Ue[Be.materialIndex];ct&&ct.visible&&w.push(A,Te,ct,ne,be.z,Be,q)}}else Ue.visible&&w.push(A,Te,Ue,ne,be.z,null,q)}}}let Re=A.children;for(let Oe=0,Te=Re.length;Oe<Te;Oe++)Ll(Re[Oe],q,ne,Q)}function kh(A,q,ne,Q){let{opaque:j,transmissive:Re,transparent:Oe}=A;R.setupLightsView(ne),oe===!0&&le.setGlobalState(C.clippingPlanes,ne),Q&&ve.viewport(M.copy(Q)),j.length>0&&uo(j,q,ne),Re.length>0&&uo(Re,q,ne),Oe.length>0&&uo(Oe,q,ne),ve.buffers.depth.setTest(!0),ve.buffers.depth.setMask(!0),ve.buffers.color.setMask(!0),ve.setPolygonOffset(!1)}function zh(A,q,ne,Q){if((ne.isScene===!0?ne.overrideMaterial:null)!==null)return;if(R.state.transmissionRenderTarget[Q.id]===void 0){let Be=nt.has("EXT_color_buffer_half_float")||nt.has("EXT_color_buffer_float");R.state.transmissionRenderTarget[Q.id]=new Pt(1,1,{generateMipmaps:!0,type:Be?Nt:hn,minFilter:On,samples:Math.max(4,xt.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:at.workingColorSpace})}let Re=R.state.transmissionRenderTarget[Q.id],Oe=Q.viewport||M;Re.setSize(Oe.z*C.transmissionResolutionScale,Oe.w*C.transmissionResolutionScale);let Te=C.getRenderTarget(),Ue=C.getActiveCubeFace(),He=C.getActiveMipmapLevel();C.setRenderTarget(Re),C.getClearColor(F),W=C.getClearAlpha(),W<1&&C.setClearColor(16777215,.5),C.clear(),Je&&G.render(ne);let je=C.toneMapping;C.toneMapping=An;let lt=Q.viewport;if(Q.viewport!==void 0&&(Q.viewport=void 0),R.setupLightsView(Q),oe===!0&&le.setGlobalState(C.clippingPlanes,Q),uo(A,ne,Q),Ze.updateMultisampleRenderTarget(Re),Ze.updateRenderTargetMipmap(Re),nt.has("WEBGL_multisampled_render_to_texture")===!1){let Be=!1;for(let ct=0,Ut=q.length;ct<Ut;ct++){let Mt=q[ct],{object:vt,geometry:$t,material:ke,group:sn}=Mt;if(ke.side===Zt&&vt.layers.test(Q.layers)){let mt=ke.side;ke.side=Wt,ke.needsUpdate=!0,Hh(vt,ne,Q,$t,ke,sn),ke.side=mt,ke.needsUpdate=!0,Be=!0}}Be===!0&&(Ze.updateMultisampleRenderTarget(Re),Ze.updateRenderTargetMipmap(Re))}C.setRenderTarget(Te,Ue,He),C.setClearColor(F,W),lt!==void 0&&(Q.viewport=lt),C.toneMapping=je}function uo(A,q,ne){let Q=q.isScene===!0?q.overrideMaterial:null;for(let j=0,Re=A.length;j<Re;j++){let Oe=A[j],{object:Te,geometry:Ue,group:He}=Oe,je=Oe.material;je.allowOverride===!0&&Q!==null&&(je=Q),Te.layers.test(ne.layers)&&Hh(Te,q,ne,Ue,je,He)}}function Hh(A,q,ne,Q,j,Re){T!==null&&j.isNodeMaterial&&T.setObject(A,j),A.onBeforeRender(C,q,ne,Q,j,Re),A.modelViewMatrix.multiplyMatrices(ne.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),j.onBeforeRender(C,q,ne,Q,A,Re),j.transparent===!0&&j.side===Zt&&j.forceSinglePass===!1?(j.side=Wt,j.needsUpdate=!0,C.renderBufferDirect(ne,q,Q,j,A,Re),j.side=Zn,j.needsUpdate=!0,C.renderBufferDirect(ne,q,Q,j,A,Re),j.side=Zt):C.renderBufferDirect(ne,q,Q,j,A,Re),A.onAfterRender(C,q,ne,Q,j,Re)}function Gh(A){let q=0;for(let ne of A)ne.texture!==null&&q++;return q}function Ks(A,q,ne){q.isScene!==!0&&(q=ze);let Q=Ve.get(A),j=R.state.lights,Re=R.state.shadowsArray,Oe=j.state.version,Te=he.getParameters(A,j.state,Re,q,ne,R.state.lightProbeGridArray),Ue=he.getProgramCacheKey(Te),He=Q.programs;Q.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?q.environment:null,Q.fog=q.fog;let je=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;Q.envMap=I.get(A.envMap||Q.environment,je),Q.envMapRotation=Q.environment!==null&&A.envMap===null?q.environmentRotation:A.envMapRotation,He===void 0&&(A.addEventListener("dispose",_t),He=new Map,Q.programs=He,Q.programVariants=new Map);let lt=He.get(Ue);if(lt!==void 0){if(Q.currentProgram===lt&&Q.lightsStateVersion===Oe)return Wh(A,Te),lt}else Te.uniforms=he.getUniforms(A),T!==null&&A.isNodeMaterial&&T.build(A,ne,Te),A.onBeforeCompile(Te,C),lt=he.acquireProgram(Te,Ue),He.set(Ue,lt),Q.uniforms=Te.uniforms;let Be=Q.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Be.clippingPlanes=le.uniform),Wh(A,Te),Q.needsLights=sp(A),Q.lightsStateVersion=Oe,Q.needsLights&&(Be.ambientLightColor.value=j.state.ambient,Be.lightProbe.value=j.state.probe,Be.sunLights.value=j.state.sun,Be.sunLightShadows.value=j.state.sunShadow,Be.directionalLights.value=j.state.directional,Be.directionalLightShadows.value=j.state.directionalShadow,Be.spotLights.value=j.state.spot,Be.spotLightShadows.value=j.state.spotShadow,Be.rectAreaLights.value=j.state.rectArea,Be.ltc_1.value=j.state.rectAreaLTC1,Be.ltc_2.value=j.state.rectAreaLTC2,Be.pointLights.value=j.state.point,Be.pointLightShadows.value=j.state.pointShadow,Be.hemisphereLights.value=j.state.hemi,Be.sunShadowMatrix.value=j.state.sunShadowMatrix,Be.sunShadowCascade.value=j.state.sunShadowCascade,Be.directionalShadowMatrix.value=j.state.directionalShadowMatrix,Be.spotLightMatrix.value=j.state.spotLightMatrix,Be.spotLightMap.value=j.state.spotLightMap,Be.pointShadowMatrix.value=j.state.pointShadowMatrix),Q.numLightProbeGrids=Gh(R.state.lightProbeGridArray),Q.currentProgram=lt,Q.uniformsList=null,lt}function tp(A,q,ne,Q,j){let Re=Ve.get(A),Oe=Re.currentProgram.id+","+Q+","+j,Te=Re.programVariants.get(Oe);return Te===void 0?(Te=Ks(A,q,ne),Re.programVariants.set(Oe,Te)):(Re.currentProgram=Te,Re.uniformsList=null,Re.outputColorSpace=Q,Re.toneMapping=j),Te}function Vh(A){if(A.uniformsList===null){let q=A.currentProgram.getUniforms();A.uniformsList=Vs.seqWithValue(q.seq,A.uniforms)}return A.uniformsList}function Wh(A,q){let ne=Ve.get(A);ne.outputColorSpace=q.outputColorSpace,ne.batching=q.batching,ne.batchingColor=q.batchingColor,ne.instancing=q.instancing,ne.instancingColor=q.instancingColor,ne.instancingMorph=q.instancingMorph,ne.skinning=q.skinning,ne.morphTargets=q.morphTargets,ne.morphNormals=q.morphNormals,ne.morphColors=q.morphColors,ne.morphTargetsCount=q.morphTargetsCount,ne.numClippingPlanes=q.numClippingPlanes,ne.numIntersection=q.numClipIntersection,ne.vertexAlphas=q.vertexAlphas,ne.vertexTangents=q.vertexTangents,ne.toneMapping=q.toneMapping}function np(A,q,ne,Q,j){q.isScene!==!0&&(q=ze),Ze.resetTextureUnits();let Re=q.fog,Oe=Q.isMeshStandardMaterial||Q.isMeshLambertMaterial||Q.isMeshPhongMaterial?q.environment:null,Te=$===null?C.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:at.workingColorSpace,Ue=Q.isMeshStandardMaterial||Q.isMeshLambertMaterial&&!Q.envMap||Q.isMeshPhongMaterial&&!Q.envMap,He=I.get(Q.envMap||Oe,Ue),je=Q.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,lt=!!ne.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),Be=!!ne.morphAttributes.position,ct=!!ne.morphAttributes.normal,Ut=!!ne.morphAttributes.color,Mt=An;Q.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(Mt=C.toneMapping);let vt=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,$t=vt!==void 0?vt.length:0,ke=Ve.get(Q),sn=R.state.lights;if(oe===!0&&(de===!0||A!==L)){let Tt=A===L&&Q.id===B;le.setState(Q,A,Tt)}let mt=!1,ki=!1;Q.version===ke.__version?ke.needsLights&&ke.lightsStateVersion!==sn.state.version||j.isBatchedMesh&&ke.batching===!1||!j.isBatchedMesh&&ke.batching===!0||j.isBatchedMesh&&ke.batchingColor===!0&&j._colorsTexture===null||j.isBatchedMesh&&ke.batchingColor===!1&&j._colorsTexture!==null||j.isInstancedMesh&&ke.instancing===!1||!j.isInstancedMesh&&ke.instancing===!0||j.isSkinnedMesh&&ke.skinning===!1||!j.isSkinnedMesh&&ke.skinning===!0||j.isInstancedMesh&&ke.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&ke.instancingColor===!1&&j.instanceColor!==null||j.isInstancedMesh&&ke.instancingMorph===!0&&j.morphTexture===null||j.isInstancedMesh&&ke.instancingMorph===!1&&j.morphTexture!==null||ke.envMap!==He||Q.fog===!0&&ke.fog!==Re||ke.numClippingPlanes!==void 0&&(ke.numClippingPlanes!==le.numPlanes||ke.numIntersection!==le.numIntersection)||ke.vertexAlphas!==je||ke.vertexTangents!==lt||ke.morphTargets!==Be||ke.morphNormals!==ct||ke.morphColors!==Ut||ke.morphTargetsCount!==$t||ke.numLightProbeGrids!==Gh(R.state.lightProbeGridArray)?mt=!0:(ke.outputColorSpace!==Te||ke.toneMapping!==Mt)&&(ki=!0):(mt=!0,ke.__version=Q.version);let Jt=ke.currentProgram;(mt===!0||ki===!0)&&(Jt=ki===!0?tp(Q,q,j,Te,Mt):Ks(Q,q,j),T&&Q.isNodeMaterial&&T.onUpdateProgram(Q,Jt,ke));let fo=!1,pi=!1,zi=!1,ft=Jt.getUniforms(),Xt=ke.uniforms;if(ve.useProgram(Jt.program)&&(fo=!0,pi=!0,zi=!0),Q.id!==B&&(B=Q.id,pi=!0),fo||L!==A){ve.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),ft.setValue(X,"projectionMatrix",A.projectionMatrix),ft.setValue(X,"viewMatrix",A.matrixWorldInverse);let Ht=ft.map.cameraPosition;Ht!==void 0&&Ht.setValue(X,Fe.setFromMatrixPosition(A.matrixWorld)),xt.logarithmicDepthBuffer&&ft.setValue(X,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)&&ft.setValue(X,"isOrthographic",A.isOrthographicCamera===!0),L!==A&&(L=A,pi=!0,zi=!0)}if(ke.needsLights&&(sn.state.sunShadowMap.length>0&&ft.setValue(X,"sunShadowMap",sn.state.sunShadowMap,Ze),sn.state.directionalShadowMap.length>0&&ft.setValue(X,"directionalShadowMap",sn.state.directionalShadowMap,Ze),sn.state.spotShadowMap.length>0&&ft.setValue(X,"spotShadowMap",sn.state.spotShadowMap,Ze),sn.state.pointShadowMap.length>0&&ft.setValue(X,"pointShadowMap",sn.state.pointShadowMap,Ze)),j.isSkinnedMesh){ft.setOptional(X,j,"bindMatrix"),ft.setOptional(X,j,"bindMatrixInverse");let Tt=j.skeleton;Tt&&(Tt.boneTexture===null&&Tt.computeBoneTexture(),ft.setValue(X,"boneTexture",Tt.boneTexture,Ze))}j.isBatchedMesh&&(ft.setOptional(X,j,"batchingTexture"),ft.setValue(X,"batchingTexture",j._matricesTexture,Ze),ft.setOptional(X,j,"batchingIdTexture"),ft.setValue(X,"batchingIdTexture",j._indirectTexture,Ze),ft.setOptional(X,j,"batchingColorTexture"),j._colorsTexture!==null&&ft.setValue(X,"batchingColorTexture",j._colorsTexture,Ze));let Pn=ne.morphAttributes;if((Pn.position!==void 0||Pn.normal!==void 0||Pn.color!==void 0)&&ce.update(j,ne,Jt),(pi||ke.receiveShadow!==j.receiveShadow)&&(ke.receiveShadow=j.receiveShadow,ft.setValue(X,"receiveShadow",j.receiveShadow)),(Q.isMeshStandardMaterial||Q.isMeshLambertMaterial||Q.isMeshPhongMaterial)&&Q.envMap===null&&q.environment!==null&&(Xt.envMapIntensity.value=q.environmentIntensity),Xt.dfgLUT!==void 0&&(Xt.dfgLUT.value=Py()),pi){if(ft.setValue(X,"toneMappingExposure",C.toneMappingExposure),ke.needsLights&&ip(Xt,zi),Re&&Q.fog===!0&&Me.refreshFogUniforms(Xt,Re),Me.refreshMaterialUniforms(Xt,Q,J,te,R.state.transmissionRenderTarget[A.id]),ke.needsLights&&ke.numLightProbeGrids>0){let Tt=v,Ht=0;for(let Qn of R.state.lightProbeGridArray)Qn.texture!==null&&(Tt.textures[Ht]=Qn.texture,Tt.min[Ht]=Qn.boundingBox.min,Tt.max[Ht]=Qn.boundingBox.max,Tt.resolution[Ht]=Qn.resolution,Ht++);for(let Qn in Tt)Tt[Qn].length=Ht;Xt.probesSH.value=Tt.textures,Xt.probesMin.value=Tt.min,Xt.probesMax.value=Tt.max,Xt.probesResolution.value=Tt.resolution}Vs.upload(X,Vh(ke),Xt,Ze)}if(Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0&&(Vs.upload(X,Vh(ke),Xt,Ze),Q.uniformsNeedUpdate=!1),Q.isSpriteMaterial&&ft.setValue(X,"center",j.center),ft.setValue(X,"modelViewMatrix",j.modelViewMatrix),ft.setValue(X,"normalMatrix",j.normalMatrix),ft.setValue(X,"modelMatrix",j.matrixWorld),Q.uniformsGroups!==void 0){let Tt=Q.uniformsGroups;for(let Ht=0,Qn=Tt.length;Ht<Qn;Ht++){let qh=Tt[Ht];Ge.update(qh,Jt),Ge.bind(qh,Jt)}}return Jt}function ip(A,q){A.ambientLightColor.needsUpdate=q,A.lightProbe.needsUpdate=q,A.sunLights.needsUpdate=q,A.sunLightShadows.needsUpdate=q,A.directionalLights.needsUpdate=q,A.directionalLightShadows.needsUpdate=q,A.pointLights.needsUpdate=q,A.pointLightShadows.needsUpdate=q,A.spotLights.needsUpdate=q,A.spotLightShadows.needsUpdate=q,A.rectAreaLights.needsUpdate=q,A.hemisphereLights.needsUpdate=q}function sp(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return $},this.setRenderTargetTextures=function(A,q,ne){let Q=Ve.get(A);Q.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,Q.__autoAllocateDepthBuffer===!1&&(Q.__useRenderToTexture=!1),Ve.get(A.texture).__webglTexture=q,Ve.get(A.depthTexture).__webglTexture=Q.__autoAllocateDepthBuffer?void 0:ne,Q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,q){let ne=Ve.get(A);ne.__webglFramebuffer=q,ne.__useDefaultFramebuffer=q===void 0},this.setRenderTarget=function(A,q=0,ne=0){$=A,H=q,V=ne;let Q=null,j=!1,Re=!1;if(A){let Te=Ve.get(A);if(Te.__useDefaultFramebuffer!==void 0){ve.bindFramebuffer(X.FRAMEBUFFER,Te.__webglFramebuffer),M.copy(A.viewport),D.copy(A.scissor),Y=A.scissorTest,ve.viewport(M),ve.scissor(D),ve.setScissorTest(Y),B=-1;return}else if(Te.__webglFramebuffer===void 0)Ze.setupRenderTarget(A);else if(Te.__hasExternalTextures)Ze.rebindTextures(A,Ve.get(A.texture).__webglTexture,Ve.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let je=A.depthTexture;if(Te.__boundDepthTexture!==je){if(je!==null&&Ve.has(je)&&(A.width!==je.image.width||A.height!==je.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ze.setupDepthRenderbuffer(A)}}let Ue=A.texture;(Ue.isData3DTexture||Ue.isDataArrayTexture||Ue.isCompressedArrayTexture)&&(Re=!0);let He=Ve.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(He[q])?Q=He[q][ne]:Q=He[q],j=!0):A.samples>0&&Ze.useMultisampledRTT(A)===!1?Q=Ve.get(A).__webglMultisampledFramebuffer:Array.isArray(He)?Q=He[ne]:Q=He,M.copy(A.viewport),D.copy(A.scissor),Y=A.scissorTest}else M.copy(pe).multiplyScalar(J).floor(),D.copy(me).multiplyScalar(J).floor(),Y=Le;if(ne!==0&&(Q=U),ve.bindFramebuffer(X.FRAMEBUFFER,Q)&&ve.drawBuffers(A,Q),ve.viewport(M),ve.scissor(D),ve.setScissorTest(Y),j){let Te=Ve.get(A.texture);X.framebufferTexture2D(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_CUBE_MAP_POSITIVE_X+q,Te.__webglTexture,ne)}else if(Re){let Te=q;for(let Ue=0;Ue<A.textures.length;Ue++){let He=Ve.get(A.textures[Ue]);X.framebufferTextureLayer(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0+Ue,He.__webglTexture,ne,Te)}}else if(A!==null&&ne!==0){let Te=Ve.get(A.texture);X.framebufferTexture2D(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,Te.__webglTexture,ne)}B=-1};function Xh(A){let q=Ve.get(A);return(q.__readFormat!==A.format||q.__readType!==A.type)&&(q.__readFormat=A.format,q.__readType=A.type,q.__formatReadable=xt.textureFormatReadable(A.format),q.__typeReadable=xt.textureTypeReadable(A.type)),q}this.readRenderTargetPixels=function(A,q,ne,Q,j,Re,Oe,Te=0){if(!(A&&A.isWebGLRenderTarget)){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ue=Ve.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Oe!==void 0&&(Ue=Ue[Oe],Array.isArray(Ue)&&(Ue=Ue[0])),Ue){ve.bindFramebuffer(X.FRAMEBUFFER,Ue);try{let He=A.textures[Te],je=He.format,lt=He.type;A.textures.length>1&&X.readBuffer(X.COLOR_ATTACHMENT0+Te);let Be=Xh(He);if(Be.__formatReadable===!1){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Be.__typeReadable===!1){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=A.width-Q&&ne>=0&&ne<=A.height-j&&X.readPixels(q,ne,Q,j,ye.convert(je),ye.convert(lt),Re)}finally{let He=$!==null?Ve.get($).__webglFramebuffer:null;ve.bindFramebuffer(X.FRAMEBUFFER,He)}}},this.readRenderTargetPixelsAsync=async function(A,q,ne,Q,j,Re,Oe,Te=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ue=Ve.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Oe!==void 0&&(Ue=Ue[Oe],Array.isArray(Ue)&&(Ue=Ue[0])),Ue)if(q>=0&&q<=A.width-Q&&ne>=0&&ne<=A.height-j){ve.bindFramebuffer(X.FRAMEBUFFER,Ue);let He=A.textures[Te],je=He.format,lt=He.type;A.textures.length>1&&X.readBuffer(X.COLOR_ATTACHMENT0+Te);let Be=Xh(He);if(Be.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Be.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ct=X.createBuffer();X.bindBuffer(X.PIXEL_PACK_BUFFER,ct),X.bufferData(X.PIXEL_PACK_BUFFER,Re.byteLength,X.STREAM_READ),X.readPixels(q,ne,Q,j,ye.convert(je),ye.convert(lt),0),X.bindBuffer(X.PIXEL_PACK_BUFFER,null);let Ut=$!==null?Ve.get($).__webglFramebuffer:null;ve.bindFramebuffer(X.FRAMEBUFFER,Ut);let Mt=X.fenceSync(X.SYNC_GPU_COMMANDS_COMPLETE,0);return X.flush(),await Pd(X,Mt,4),X.bindBuffer(X.PIXEL_PACK_BUFFER,ct),X.getBufferSubData(X.PIXEL_PACK_BUFFER,0,Re),X.bindBuffer(X.PIXEL_PACK_BUFFER,null),X.deleteBuffer(ct),X.deleteSync(Mt),Re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,q=null,ne=0){let Q=Math.pow(2,-ne),j=Math.floor(A.image.width*Q),Re=Math.floor(A.image.height*Q),Oe=q!==null?q.x:0,Te=q!==null?q.y:0;Ze.setTexture2D(A,0),X.copyTexSubImage2D(X.TEXTURE_2D,ne,0,0,Oe,Te,j,Re),ve.unbindTexture()},this.copyTextureToTexture=function(A,q,ne=null,Q=null,j=0,Re=0){let Oe,Te,Ue,He,je,lt,Be,ct,Ut,Mt=A.isCompressedTexture?A.mipmaps[Re]:A.image;if(ne!==null)Oe=ne.max.x-ne.min.x,Te=ne.max.y-ne.min.y,Ue=ne.isBox3?ne.max.z-ne.min.z:1,He=ne.min.x,je=ne.min.y,lt=ne.isBox3?ne.min.z:0;else{let ft=Math.pow(2,-j);Oe=Math.floor(Mt.width*ft),Te=Math.floor(Mt.height*ft),A.isDataArrayTexture?Ue=Mt.depth:A.isData3DTexture?Ue=Math.floor(Mt.depth*ft):Ue=1,He=0,je=0,lt=0}Q!==null?(Be=Q.x,ct=Q.y,Ut=Q.z):(Be=0,ct=0,Ut=0);let vt=ye.convert(q.format),$t=ye.convert(q.type),ke;q.isData3DTexture?(Ze.setTexture3D(q,0),ke=X.TEXTURE_3D):q.isDataArrayTexture||q.isCompressedArrayTexture?(Ze.setTexture2DArray(q,0),ke=X.TEXTURE_2D_ARRAY):(Ze.setTexture2D(q,0),ke=X.TEXTURE_2D),ve.activeTexture(X.TEXTURE0),ve.pixelStorei(X.UNPACK_FLIP_Y_WEBGL,q.flipY),ve.pixelStorei(X.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),ve.pixelStorei(X.UNPACK_ALIGNMENT,q.unpackAlignment);let sn=ve.getParameter(X.UNPACK_ROW_LENGTH),mt=ve.getParameter(X.UNPACK_IMAGE_HEIGHT),ki=ve.getParameter(X.UNPACK_SKIP_PIXELS),Jt=ve.getParameter(X.UNPACK_SKIP_ROWS),fo=ve.getParameter(X.UNPACK_SKIP_IMAGES);ve.pixelStorei(X.UNPACK_ROW_LENGTH,Mt.width),ve.pixelStorei(X.UNPACK_IMAGE_HEIGHT,Mt.height),ve.pixelStorei(X.UNPACK_SKIP_PIXELS,He),ve.pixelStorei(X.UNPACK_SKIP_ROWS,je),ve.pixelStorei(X.UNPACK_SKIP_IMAGES,lt);let pi=A.isDataArrayTexture||A.isData3DTexture,zi=q.isDataArrayTexture||q.isData3DTexture;if(A.isDepthTexture){let ft=Ve.get(A),Xt=Ve.get(q),Pn=Ve.get(ft.__renderTarget),Tt=Ve.get(Xt.__renderTarget);ve.bindFramebuffer(X.READ_FRAMEBUFFER,Pn.__webglFramebuffer),ve.bindFramebuffer(X.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer);for(let Ht=0;Ht<Ue;Ht++)pi&&(X.framebufferTextureLayer(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,Ve.get(A).__webglTexture,j,lt+Ht),X.framebufferTextureLayer(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,Ve.get(q).__webglTexture,Re,Ut+Ht)),X.blitFramebuffer(He,je,He+Oe,je+Te,Be,ct,Be+Oe,ct+Te,X.DEPTH_BUFFER_BIT,X.NEAREST);ve.bindFramebuffer(X.READ_FRAMEBUFFER,null),ve.bindFramebuffer(X.DRAW_FRAMEBUFFER,null)}else if(j!==0||A.isRenderTargetTexture||Ve.has(A)){let ft=Ve.get(A),Xt=Ve.get(q);ve.bindFramebuffer(X.READ_FRAMEBUFFER,P),ve.bindFramebuffer(X.DRAW_FRAMEBUFFER,k);for(let Pn=0;Pn<Ue;Pn++)pi?X.framebufferTextureLayer(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,ft.__webglTexture,j,lt+Pn):X.framebufferTexture2D(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,ft.__webglTexture,j),zi?X.framebufferTextureLayer(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,Xt.__webglTexture,Re,Ut+Pn):X.framebufferTexture2D(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,Xt.__webglTexture,Re),j!==0?X.blitFramebuffer(He,je,He+Oe,je+Te,Be,ct,Be+Oe,ct+Te,X.COLOR_BUFFER_BIT,X.NEAREST):zi?X.copyTexSubImage3D(ke,Re,Be,ct,Ut+Pn,He,je,Oe,Te):X.copyTexSubImage2D(ke,Re,Be,ct,He,je,Oe,Te);ve.bindFramebuffer(X.READ_FRAMEBUFFER,null),ve.bindFramebuffer(X.DRAW_FRAMEBUFFER,null)}else zi?A.isDataTexture||A.isData3DTexture?X.texSubImage3D(ke,Re,Be,ct,Ut,Oe,Te,Ue,vt,$t,Mt.data):q.isCompressedArrayTexture?X.compressedTexSubImage3D(ke,Re,Be,ct,Ut,Oe,Te,Ue,vt,Mt.data):X.texSubImage3D(ke,Re,Be,ct,Ut,Oe,Te,Ue,vt,$t,Mt):A.isDataTexture?X.texSubImage2D(X.TEXTURE_2D,Re,Be,ct,Oe,Te,vt,$t,Mt.data):A.isCompressedTexture?X.compressedTexSubImage2D(X.TEXTURE_2D,Re,Be,ct,Mt.width,Mt.height,vt,Mt.data):X.texSubImage2D(X.TEXTURE_2D,Re,Be,ct,Oe,Te,vt,$t,Mt);ve.pixelStorei(X.UNPACK_ROW_LENGTH,sn),ve.pixelStorei(X.UNPACK_IMAGE_HEIGHT,mt),ve.pixelStorei(X.UNPACK_SKIP_PIXELS,ki),ve.pixelStorei(X.UNPACK_SKIP_ROWS,Jt),ve.pixelStorei(X.UNPACK_SKIP_IMAGES,fo),Re===0&&q.generateMipmaps===!0&&q.mipmapsAutoUpdate===!0&&X.generateMipmap(ke),ve.unbindTexture()},this.initRenderTarget=function(A){Ve.get(A).__webglFramebuffer===void 0&&Ze.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?Ze.setTextureCube(A,0):A.isData3DTexture?Ze.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?Ze.setTexture2DArray(A,0):Ze.setTexture2D(A,0),ve.unbindTexture()},this.resetState=function(){H=0,V=0,$=null,ve.reset(),Se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return En}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=at._getDrawingBufferColorSpace(e),t.unpackColorSpace=at._getUnpackColorSpace()}};var Iy=new Ur;function no(i){return new Promise(e=>{Iy.load(i,t=>{t.colorSpace=At,t.wrapS=t.wrapT=Vn,t.anisotropy=4,e(t)},void 0,()=>e(null))})}function ui(i,e,t={}){let{triplanar:n=!1,vary:s=0,mapNormal:r=!1,...o}=t,a=new St({map:i,roughness:.9,metalness:0,...o}),l={value:1/e};return a.onBeforeCompile=c=>{c.uniforms.uvScale=l,c.vertexShader=(r?`attribute vec3 mapNormal;
`:"")+`varying vec3 vWP;
varying vec3 vWN;
`+c.vertexShader.replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
      vec4 wpos = vec4(transformed, 1.0);
      #ifdef USE_INSTANCING
        wpos = instanceMatrix * wpos;
      #endif
      wpos = modelMatrix * wpos;
      vWP = wpos.xyz;
      vec3 wn = ${r?"mapNormal":"objectNormal"};
      #ifdef USE_INSTANCING
        wn = mat3(instanceMatrix) * wn;
      #endif
      vWN = normalize(mat3(modelMatrix) * wn);`),c.fragmentShader=`uniform float uvScale;
varying vec3 vWP;
varying vec3 vWN;
`+c.fragmentShader.replace("#include <map_fragment>",n?`vec3 tw = pow(abs(vWN), vec3(4.0));
      tw /= (tw.x + tw.y + tw.z);
      vec4 sampledDiffuseColor = texture2D(map, vWP.zy * uvScale) * tw.x + texture2D(map, vWP.xz * uvScale) * tw.y + texture2D(map, vWP.xy * uvScale) * tw.z;
      diffuseColor *= sampledDiffuseColor;`:`vec3 an = abs(vWN);
      vec2 wuv = an.y > max(an.x, an.z) ? vWP.xz : (an.x > an.z ? vWP.zy : vWP.xy);
      vec4 sampledDiffuseColor = texture2D(map, wuv * uvScale);
      ${s>0?`// Break up repetition: a second, larger and turned sample of the same picture
      // and a soft brightness wave across the surface.
      vec2 ruv = mat2(0.8, -0.6, 0.6, 0.8) * wuv * uvScale * 0.31 + 0.37;
      float big = dot(texture2D(map, ruv).rgb, vec3(0.333));
      float wave = 0.5 + 0.5 * sin(wuv.x * 0.21 + sin(wuv.y * 0.17) * 2.0) * sin(wuv.y * 0.13 + 1.3);
      sampledDiffuseColor.rgb *= mix(1.0, (0.75 + big * 0.6) * (0.88 + wave * 0.24), ${s.toFixed(2)});`:""}
      diffuseColor *= sampledDiffuseColor;`)},a.customProgramCacheKey=()=>`wm${e}${n}${s}${r}`,a}function oh(i,e){let t=document.createElement("canvas");t.width=t.height=i,e(t.getContext("2d"),i);let n=new qn(t);return n.colorSpace=At,n}var ah=()=>oh(128,(i,e)=>{let t=i.createRadialGradient(e/2,e/2,0,e/2,e/2,e/2);t.addColorStop(0,"rgba(0,0,0,0.7)"),t.addColorStop(.55,"rgba(0,0,0,0.38)"),t.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=t,i.fillRect(0,0,e,e)});var Xs=()=>oh(128,(i,e)=>{let t=i.createRadialGradient(e/2,e/2,0,e/2,e/2,e/2);t.addColorStop(0,"rgba(255,220,160,1)"),t.addColorStop(.35,"rgba(255,190,120,0.45)"),t.addColorStop(1,"rgba(255,170,90,0)"),i.fillStyle=t,i.fillRect(0,0,e,e)});var lh=()=>oh(128,(i,e)=>{i.strokeStyle="rgba(255,255,255,1)",i.lineWidth=12,i.beginPath(),i.arc(e/2,e/2,e*.42,0,Math.PI*2),i.stroke(),i.fillStyle="rgba(255,200,120,0.28)",i.beginPath(),i.arc(e/2,e/2,e*.38,0,Math.PI*2),i.fill()});var pl=new Pe,Et=class{constructor(){this.pos=[],this.nor=[],this.col=[]}add(e,t,n){let s=e.attributes.position.array;e.attributes.normal||e.computeVertexNormals();let r=e.attributes.normal.array,o=e.index?e.index.array:null,a=o?o.length:s.length/3;pl.set(t);let l=pl.r,c=pl.g,h=pl.b,u=n?n.elements:null;for(let f=0;f<a;f++){let d=(o?o[f]:f)*3,m=s[d],y=s[d+1],g=s[d+2],p=r[d],_=r[d+1],E=r[d+2];if(u){this.pos.push(u[0]*m+u[4]*y+u[8]*g+u[12],u[1]*m+u[5]*y+u[9]*g+u[13],u[2]*m+u[6]*y+u[10]*g+u[14]);let v=u[0]*p+u[4]*_+u[8]*E,w=u[1]*p+u[5]*_+u[9]*E,R=u[2]*p+u[6]*_+u[10]*E,x=Math.hypot(v,w,R)||1;p=v/x,_=w/x,E=R/x}else this.pos.push(m,y,g);this.nor.push(p,_,E),this.col.push(l,c,h)}return e.dispose(),this}box(e,t,n,s,r,o,a,l=0){return this.add(new Ce(e,t,n),s,_e(r,o,a,l))}build({outline:e=!0}={}){let t=new dt;return t.setAttribute("position",new Xe(this.pos,3)),t.setAttribute("normal",new Xe(this.nor,3)),t.setAttribute("color",new Xe(this.col,3)),e&&Ly(t),t.computeBoundingSphere(),t}};function _e(i,e,t,n=0,s=1,r=1,o=1){let a=new We;return a.compose(new z(i,e,t),new Ot().setFromAxisAngle(new z(0,1,0),n),new z(s,r,o)),a}function Ly(i){let e=i.attributes.position.array,t=i.attributes.normal.array,n=new Map,s=o=>`${Math.round(e[o]*500)},${Math.round(e[o+1]*500)},${Math.round(e[o+2]*500)}`;for(let o=0;o<e.length;o+=3){let a=s(o),l=n.get(a);l||n.set(a,l=[0,0,0]),l[0]+=t[o],l[1]+=t[o+1],l[2]+=t[o+2]}let r=new Float32Array(e.length);for(let o=0;o<e.length;o+=3){let a=n.get(s(o)),l=Math.hypot(a[0],a[1],a[2])||1;r[o]=a[0]/l,r[o+1]=a[1]/l,r[o+2]=a[2]/l}i.setAttribute("outlineNormal",new ht(r,3))}function _f(i,e,t,n){for(let s=0;s<i.length;s+=9){let r=i[s],o=i[s+1],a=i[s+2],l=i[s+3]-r,c=i[s+4]-o,h=i[s+5]-a,u=i[s+6]-r,f=i[s+7]-o,d=i[s+8]-a,m=c*d-h*f,y=h*u-l*d,g=l*f-c*u,p=(r+i[s+3]+i[s+6])/3-e,_=(o+i[s+4]+i[s+7])/3-t,E=(a+i[s+5]+i[s+8])/3-n;if(m*p+y*_+g*E<0)for(let v=0;v<3;v++){let w=i[s+3+v];i[s+3+v]=i[s+6+v],i[s+6+v]=w}}return i}function Di(i,e,t,n=.35){let s=i/2+n,r=e/2+n,o=[[-s,0,-r],[s,0,-r],[s,t,0],[-s,0,-r],[s,t,0],[-s,t,0],[-s,0,r],[-s,t,0],[s,t,0],[-s,0,r],[s,t,0],[s,0,r],[-s,0,-r],[-s,t,0],[-s,0,r],[s,0,-r],[s,0,r],[s,t,0],[-s,0,-r],[-s,0,r],[s,0,r],[-s,0,-r],[s,0,r],[s,0,-r]],a=new dt;return a.setAttribute("position",new Xe(_f(o.flat(),0,t*.3,0),3)),a.computeVertexNormals(),a}function yf(i,e,t,n=.3){let s=i/2+n,r=e/2+n,o=i/2-1.2,a=e/2-1.6,l=t*.7,c={a:[-s,0,-r],b:[s,0,-r],c:[s,0,r],d:[-s,0,r],e:[-o,l,-a],f:[o,l,-a],g:[o,l,a],hh:[-o,l,a],r1:[-o+.6,t,0],r2:[o-.6,t,0]},h=(d,m,y)=>[...c[d],...c[m],...c[y]],u=[...h("a","f","b"),...h("a","e","f"),...h("d","c","g"),...h("d","g","hh"),...h("a","d","hh"),...h("a","hh","e"),...h("b","f","g"),...h("b","g","c"),...h("e","r2","f"),...h("e","r1","r2"),...h("hh","g","r2"),...h("hh","r2","r1"),...h("e","hh","r1"),...h("f","r2","g"),...h("a","c","d"),...h("a","b","c")],f=new dt;return f.setAttribute("position",new Xe(_f(u,0,t*.3,0),3)),f.computeVertexNormals(),f}var ml=i=>new We().makeRotationX(i),qs=i=>new We().makeRotationZ(i),Dy=i=>new We().makeRotationY(i);function hh(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Rn(i,e,t,n,s,r,o=6){let a=new z(...t),l=new z(...n),c=a.distanceTo(l),h=new ut(s,s,c,o,1),u=new Ot().setFromUnitVectors(new z(0,1,0),l.clone().sub(a).normalize()),f=new We().compose(a.clone().add(l).multiplyScalar(.5),u,new z(1,1,1));i.add(h,r,e.clone().multiply(f))}var vf=[15845797,14724230,12946532,9263675],Mf=[2826264,5913378,12093258,1710618,9079434];function uh(i,e,{jacket:t=3824266,pants:n=3093568,skin:s=0,hair:r=0,scale:o=1,bag:a=!1,walk:l=0}={}){let c=(d,m,y,g)=>{let p=e.clone().multiply(_e(d*o,m*o,y*o,0,o,o,o));return g?p.multiply(g):p},h=vf[s%vf.length],u=Mf[r%Mf.length],f=Math.sin(l)*.25;for(let[d,m]of[[.11,f],[-.11,-f]])i.add(new Ce(.26,.09,.11),1908e3,c(.05+m*.4,.045,d)),i.add(new Zi(.075,.68,2,6),n,c(m*.25,.47,d,qs(-m*.5)));i.add(new Ce(.22,.18,.36),n,c(0,.88,0)),i.add(new Zi(.17,.36,2,8),t,c(0,1.2,0,new We().makeScale(.85,1,1.15))),i.add(new ut(.08,.1,.08,8),new Pe(t).multiplyScalar(.8).getHex(),c(0,1.5,0));for(let[d,m]of[[.26,-f],[-.26,f]])i.add(new Zi(.06,.5,2,6),t,c(m*.3,1.15,d,qs(m*.6))),i.add(new cn(.055,6,5),h,c(m*.55,.84,d));i.add(new cn(.12,8,6),h,c(.01,1.66,0)),i.add(new cn(.128,8,4,0,Math.PI*2,0,Math.PI*.55),u,c(-.015,1.68,0,qs(.25))),i.add(new Ce(.04,.04,.04),h,c(.13,1.65,0)),a&&i.add(new Ce(.16,.3,.26),5913124,c(-.2,1.2,0))}function io(i,e,t,{basket:n=!0}={}){let o=u=>{i.add(new Fn(.33,.04,4,14),1776415,e.clone().multiply(_e(u,.35,0)));for(let f=0;f<2;f++)i.add(new Ce(.56,.01,.01),12106946,e.clone().multiply(_e(u,.35,0)).multiply(qs(f*Math.PI/2)));i.add(new ut(.035,.035,.1,6),12106946,e.clone().multiply(_e(u,.35,0)).multiply(ml(Math.PI/2)))};o(-.6),o(.6);let a=(u,f)=>[u,f,0],l=a(-.05,.36),c=a(-.22,.86),h=a(.48,.82);if(Rn(i,e,l,c,.025,t),Rn(i,e,l,a(.46,.66),.028,t),Rn(i,e,a(-.2,.74),a(.47,.74),.022,t),Rn(i,e,l,a(-.6,.35),.018,t),Rn(i,e,a(-.2,.78),a(-.6,.35),.018,t),Rn(i,e,h,a(.6,.35),.02,t),Rn(i,e,c,[-.24,.92,0],.016,12106946),i.add(new Ce(.24,.05,.12),2761760,e.clone().multiply(_e(-.26,.95,0))),Rn(i,e,h,[.46,.98,0],.016,12106946),Rn(i,e,[.44,.98,-.28],[.44,.98,.28],.016,2236966),i.add(new Fn(.37,.025,3,6,Math.PI*.75),t,e.clone().multiply(_e(-.6,.35,0)).multiply(qs(Math.PI*.15))),i.add(new Fn(.37,.025,3,5,Math.PI*.6),t,e.clone().multiply(_e(.6,.35,0)).multiply(qs(Math.PI*.2))),i.add(new Ce(.42,.08,.03),2763310,e.clone().multiply(_e(-.3,.38,.06))),i.add(new Ce(.44,.03,.2),12106946,e.clone().multiply(_e(-.55,.74,0))),n){let u=e.clone().multiply(_e(.66,.92,0));i.add(new Ce(.32,.03,.34),7031338,u);for(let[f,d,m,y]of[[.15,0,.02,.34],[-.15,0,.02,.34],[0,.16,.32,.02],[0,-.16,.32,.02]])i.add(new Ce(m,.2,y),9070144,u.clone().multiply(_e(f,.1,d)))}}function dh(i,e,t,n=.8){for(let r=0;r<t;r++){let o=r*n,a=e.clone().multiply(_e(o,0,0,Math.PI/2));i.add(new Fn(.42,.03,4,8,Math.PI),11120051,a.clone().multiply(_e(0,.4,0))),Rn(i,a,[-.42,0,0],[-.42,.4,0],.03,11120051),Rn(i,a,[.42,0,0],[.42,.4,0],.03,11120051)}Rn(i,e,[-.1,.06,0],[(t-1)*n+.1,.06,0],.035,11120051)}function fh(i,e,t=1){let s=(o,a,l,c)=>c?e.clone().multiply(_e(o,a,l)).multiply(c):e.clone().multiply(_e(o,a,l));i.add(new ut(.22,.3,.5,8),2042406,s(0,.25,0)),i.add(new Fn(.22,.04,4,10),2042406,s(0,.5,0,ml(Math.PI/2))),i.add(new ut(.1,.17,1.2,8),2042406,s(0,1.1,0)),i.add(new ut(.1,.13,3.9,8),2042406,s(0,3.6,0)),i.add(new cn(.11,8,6),2042406,s(0,1.75,0)),i.add(new Fn(.55,.045,5,10,Math.PI/2),2042406,s(0,5,t*.55,Dy(t>0?-Math.PI/2:Math.PI/2))),i.add(new ut(.015,.015,.5,4),2042406,s(0,5.25,t*.95));let r=t*1.12;i.add(new ut(.05,.27,.22,6),2042406,s(0,4.98,r)),i.add(new ut(.29,.29,.05,6),12096058,s(0,4.86,r)),i.add(new cn(.07,6,4),13937224,s(0,5.15,r));for(let o=0;o<6;o++){let a=o/6*Math.PI*2+Math.PI/6;i.add(new Ce(.035,.66,.035),2042406,s(Math.cos(a)*.3,4.52,r+Math.sin(a)*.3))}return i.add(new ut(.24,.12,.12,6),2042406,s(0,4.16,r)),[e.elements[12],e.elements[14]+t*1.12]}function ph(){return new ut(.31,.22,.64,6)}function Ny(i){let e=document.createElement("canvas");return e.width=128,e.height=128,i(e.getContext("2d")),e}function mh(){let i=document.createElement("canvas");i.width=512,i.height=128;let e=i.getContext("2d");[s=>{s.fillStyle="#1f5fbf",s.fillRect(6,6,116,116),s.strokeStyle="#fff",s.lineWidth=6,s.strokeRect(10,10,108,108),s.fillStyle="#fff",s.font="bold 86px sans-serif",s.textAlign="center",s.textBaseline="middle",s.fillText("P",64,70)},s=>{s.fillStyle="#1d4f9e",s.fillRect(0,34,128,60),s.strokeStyle="#fff",s.lineWidth=4,s.strokeRect(4,38,120,52),s.fillStyle="#fff",s.font="bold 15px sans-serif",s.textAlign="center",s.textBaseline="middle",s.fillText("SYSSLOMANSG.",64,64)},s=>{s.fillStyle="#f2c94c",s.fillRect(14,6,100,116),s.fillStyle="#2e7d4f",s.fillRect(28,30,72,44),s.fillStyle="#f2c94c",s.fillRect(36,38,22,16),s.fillRect(66,38,22,16),s.fillStyle="#1a1a1a",s.font="bold 22px sans-serif",s.textAlign="center",s.fillText("BUSS",64,104)},s=>{s.fillStyle="#c62828",s.beginPath(),s.arc(64,64,58,0,Math.PI*2),s.fill(),s.fillStyle="#fff",s.fillRect(24,54,80,20)}].forEach((s,r)=>{let o=Ny(s);e.drawImage(o,r*128,0)});let n=new qn(i);return n.colorSpace=At,n}function gh(i,e,t=2.6){i.add(new ut(.035,.035,t,6),10133670,e.clone().multiply(_e(0,t/2,0))),i.add(new ut(.05,.05,.06,6),5922404,e.clone().multiply(_e(0,t,0)))}function xh(i,e){let n=[9067062,9790524,8344114];for(let s=0;s<4;s++)i.add(new Ce(1.8,.04,.11),n[s%3],e.clone().multiply(_e(0,.46,-.18+s*.12)));for(let s=0;s<3;s++)i.add(new Ce(1.8,.11,.035),n[(s+1)%3],e.clone().multiply(_e(0,.62+s*.13,-.27)).multiply(ml(-.15)));for(let s of[-.75,.75])i.add(new Ce(.06,.44,.06),2042406,e.clone().multiply(_e(s,.22,.17))),i.add(new Ce(.06,.85,.06),2042406,e.clone().multiply(_e(s,.42,-.24)).multiply(ml(-.15))),i.add(new Ce(.06,.05,.48),2042406,e.clone().multiply(_e(s,.44,-.02))),i.add(new Ce(.06,.04,.42),2042406,e.clone().multiply(_e(s,.68,-.02)))}function _h(i,e,t){let n=hh(t),s=[8016436,8806460];for(let o=0;o<4;o++)i.add(new Ce(1.8,.14,.05),s[o%2],e.clone().multiply(_e(0,.1+o*.14,.36)));for(let o=0;o<4;o++)i.add(new Ce(1.8,.14,.05),s[(o+1)%2],e.clone().multiply(_e(0,.1+o*.14,-.36)));for(let o of[-.88,.88])i.add(new Ce(.05,.56,.76),s[0],e.clone().multiply(_e(o,.31,0)));i.add(new Ce(1.74,.04,.7),3811870,e.clone().multiply(_e(0,.58,0)));let r=[14700650,15911244,16777215,14248608,16747066,9071318];for(let o=0;o<16;o++){let a=(n()-.5)*1.6,l=(n()-.5)*.55;i.add(new Yn(.13+n()*.06,0),[4160053,5214010][o%2],e.clone().multiply(_e(a,.68,l))),n()<.75&&i.add(new Yn(.07,0),r[Math.floor(n()*r.length)],e.clone().multiply(_e(a+.03,.82,l)))}}function yh(i,e){i.add(new ut(.27,.23,.85,12),3103298,e.clone().multiply(_e(0,.5,0))),i.add(new ut(.29,.29,.06,12),2369066,e.clone().multiply(_e(0,.95,0))),i.add(new ut(.05,.05,.5,6),2369066,e.clone().multiply(_e(0,.25,-.3)))}function xl(i,e,t){for(let s=0;s<=t+.01;s+=.32)i.add(new Ce(.035,.95,.035),1843744,e.clone().multiply(_e(s,.48,0)));for(let s of[.15,.85])i.add(new Ce(t,.045,.045),1843744,e.clone().multiply(_e(t/2,s,0)))}function Uy(i){i.computeVertexNormals();let e=i.attributes.position,t=i.attributes.normal,n=new Map,s=r=>`${Math.round(e.getX(r)*1e3)},${Math.round(e.getY(r)*1e3)},${Math.round(e.getZ(r)*1e3)}`;for(let r=0;r<e.count;r++){let o=s(r),a=n.get(o)||[0,0,0];a[0]+=t.getX(r),a[1]+=t.getY(r),a[2]+=t.getZ(r),n.set(o,a)}for(let r=0;r<e.count;r++){let o=n.get(s(r)),a=Math.hypot(o[0],o[1],o[2])||1;t.setXYZ(r,o[0]/a,o[1]/a,o[2]/a)}t.needsUpdate=!0}function vh(i,e){let t=hh(e*97+13),n={lind:{h:3.4,br:5,reach:2.4,rise:2.4,cl:[.85,1.25],n:2,leaf:[.55,1.2,.42],bark:4864556,w:.32},lonn:{h:3,br:6,reach:2.8,rise:2,cl:[.9,1.3],n:2,leaf:[.5,1.12,.38],bark:4141864,w:.34},bjork:{h:4.2,br:5,reach:1.6,rise:2.8,cl:[.65,.95],n:2,leaf:[.56,1.2,.42],bark:15131094,w:.17}}[i],s=new gl,r=new gl,o=[(t()-.5)*.3,(t()-.5)*.3],a=[o[0],n.h,o[1]];if(s.tube([0,0,0],a,n.w,n.w*.75,n.bark,7),i==="bjork")for(let m=.5;m<n.h;m+=.42)s.box(n.w*2.1,.05,n.w*2.1,2763306,o[0]*(m/n.h),m,o[1]*(m/n.h));let l=new z(-.9,.35,.3).normalize(),c=[];for(let m=0;m<n.br;m++){let y=m/n.br*Math.PI*2+t()*.9,g=n.reach*(.7+t()*.5),p=n.rise*(.7+t()*.5),_=[a[0],n.h-t()*.8,a[2]],E=[_[0]+Math.cos(y)*g*.55,_[1]+p*.55,_[2]+Math.sin(y)*g*.55],v=[_[0]+Math.cos(y)*g,_[1]+p,_[2]+Math.sin(y)*g];s.tube(_,E,n.w*.55,n.w*.4,n.bark,5),s.tube(E,v,n.w*.4,n.w*.22,n.bark,4);for(let w=0;w<n.n;w++){let R=w===0?1:.55+t()*.35,x=[_[0]+(v[0]-_[0])*R+(t()-.5)*.6,_[1]+(v[1]-_[1])*R+.3+t()*.5,_[2]+(v[2]-_[2])*R+(t()-.5)*.6];c.push([x,n.cl[0]+t()*(n.cl[1]-n.cl[0])])}}c.push([[a[0],n.h+n.rise+.6,a[2]],n.cl[1]*1.05]),i!=="bjork"&&c.push([[a[0]+.5,n.h+n.rise*.7,a[2]-.6],n.cl[1]]);let h=c.reduce((m,y)=>m+y[0][1],0)/c.length,u=c.reduce((m,y)=>m+y[0][0],0)/c.length,f=c.reduce((m,y)=>m+y[0][2],0)/c.length,d=new z;for(let[m,y]of c){let g=Fy(y,Math.floor(t()*1e6)),p=g.attributes.position.array,_=g.attributes.normal.array;g.setAttribute("mapNormal",new ht(_.slice(),3));for(let w=0;w<p.length;w+=3)d.set(m[0]+p[w]-u,(m[1]+p[w+1]-h)*1.2,m[2]+p[w+2]-f).normalize(),d.multiplyScalar(.7).add(new z(_[w],_[w+1],_[w+2]).multiplyScalar(.3)).normalize(),_[w]=d.x,_[w+1]=d.y,_[w+2]=d.z;let E=new Float32Array(p.length),v=.9+t()*.2;for(let w=0;w<p.length;w+=3){let R=Math.max(0,_[w]*l.x+_[w+1]*l.y+_[w+2]*l.z),x=(m[1]+p[w+1]-h)/3,S=Math.max(0,-(_[w]*m[0]+_[w+2]*m[2]))*.08,N=_[w+1]*.5+.5,C=v*(.45+.3*N+.25*Math.min(1,Math.max(0,x+.5))-S),O=1-.4*R;E[w]=n.leaf[0]*C*O*.9,E[w+1]=n.leaf[1]*C*O,E[w+2]=n.leaf[2]*C*O}g.setAttribute("color",new ht(E,3)),g.translate(m[0],m[1],m[2]),r.addColoured(g)}return{wood:s.build(),leaves:r.build()}}function Fy(i,e){let t=new Yn(i,1),n=hh(e),s=t.attributes.position,r=Array.from({length:5},()=>[n()*2-1,n()*2-1,n()*2-1,.1+n()*.2]);for(let a=0;a<s.count;a++){let l=new z().fromBufferAttribute(s,a).normalize(),c=.82+n()*.08;for(let[h,u,f,d]of r)c+=d*Math.max(0,l.x*h+l.y*u+l.z*f)**2;l.multiplyScalar(i*c),l.y*=l.y<0?.5:.8,l.x*=1.15,l.z*=1.15,s.setXYZ(a,l.x,l.y,l.z)}let o=t.toNonIndexed();return o.computeVertexNormals(),Uy(o),t.dispose(),o}var gl=class{constructor(){this.pos=[],this.nor=[],this.col=[],this.mapN=[]}addColoured(e){let t=e.index?e.toNonIndexed():e;this.pos.push(...t.attributes.position.array),this.nor.push(...t.attributes.normal.array),this.col.push(...t.attributes.color.array),this.mapN.push(...(t.attributes.mapNormal||t.attributes.normal).array)}addSolid(e,t){let n=e.index?e.toNonIndexed():e;n.computeVertexNormals();let s=new Pe(t),r=n.attributes.position.count,o=new Float32Array(r*3);for(let a=0;a<r;a++)o.set([s.r,s.g,s.b],a*3);n.setAttribute("color",new ht(o,3)),this.addColoured(n)}tube(e,t,n,s,r,o){let a=new z(...e),l=new z(...t),c=new ut(s,n,a.distanceTo(l),o,1,!0),h=new Ot().setFromUnitVectors(new z(0,1,0),l.clone().sub(a).normalize());c.applyMatrix4(new We().compose(a.clone().add(l).multiplyScalar(.5),h,new z(1,1,1))),this.addSolid(c,r)}box(e,t,n,s,r,o,a){let l=new Ce(e,t,n);l.translate(r,o,a),this.addSolid(l,s)}build(){let e=new dt;return e.setAttribute("position",new Xe(this.pos,3)),e.setAttribute("normal",new Xe(this.nor,3)),e.setAttribute("color",new Xe(this.col,3)),e.setAttribute("mapNormal",new Xe(this.mapN,3)),e}};var di=null,Mh=null;function Sf(i){Mh=i,di=null}function bf(){if(di)return di;if(di=[],Mh){for(let[e,t]of Object.entries(Mh))/^Tree_/.test(e)&&di.push({kind:e,parts:n=>t.map(s=>[s.geo,n[s.mat]||n.leaf])});if(di.length)return di}let i=11;for(let e of["lind","lonn","bjork"])for(let t=0;t<2;t++){let n=vh(e,i++);di.push({kind:e,parts:s=>[[n.wood,s.wood],[n.leaves,s.leaf]]})}return di}var nn=64,Mn=3.2,Ef=[14856796,15783308,15180164,15986404,14272422,15319674,13161400];function Tf(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}var vl=class{constructor(){this.m=[],this.c=[]}add(e,t,n,s,r,o,a,l,c){let h=_e(e,t,n,s,1,1,1);c&&h.multiply(c),h.multiply(new We().makeScale(r,o,a)),this.m.push(h),this.c.push(l)}mesh(e,t){if(!this.m.length)return null;let n=new ln(t,e,this.m.length),s=new Pe;return this.m.forEach((r,o)=>{n.setMatrixAt(o,r),n.setColorAt(o,s.set(this.c[o]))}),n.computeBoundingSphere(),n}};function Oy(i,e){return`${Math.floor(i/nn)},${Math.floor(e/nn)}`}function By(){return{asphalt:new Et,slabs:new Et,grass:new Et,wall:new Et,roof:new Et,trimB:new Et,props:new Et,trim:new vl,glass:new vl,lanterns:[],hedge:new Et,signs:[]}}function ky(i,e,t,n){return{S:{x:i,z:e+n/2,nx:0,nz:1,tx:1,tz:0,L:t,rot:0},E:{x:i+t/2,z:e,nx:1,nz:0,tx:0,tz:-1,L:n,rot:Math.PI/2},W:{x:i-t/2,z:e,nx:-1,nz:0,tx:0,tz:1,L:n,rot:-Math.PI/2},N:{x:i,z:e-n/2,nx:0,nz:-1,tx:-1,tz:0,L:t,rot:Math.PI}}}function zy(i,e,t,n){let s=Tf(Math.floor(e.seed*1e6)+t*7),r=i;r.dark=r.trim;let o=Math.max(1,Math.min(7,Math.round((e.height-1)/Mn))),a=o*Mn+1,l=e.w,c=e.h,h=e.x+l/2,u=e.y+c/2,f=Ef[(e.facadeIndex+t)%Ef.length],d=new Pe(f).multiplyScalar(.82).getHex(),m=16052198,y=s()<.4,g=s()<.3?5913130:s()<.5?3099194:16184042,p=Math.floor(s()*4),_=y?s()<.5?"pediment":"hood":["hood","keystone","none"][Math.floor(s()*3)],E=e.shop??s()<.3,v=[3107402,9054762,2771578,6965802][Math.floor(s()*4)];r.wall.add(new Ce(l,a,c),f,_e(h,a/2,u));let w=(L,M,D,Y,F)=>{let W=M+.06;L.add(new Ce(l+M*2,D,W),F,_e(h,Y,u+c/2+M-W/2)),L.add(new Ce(l+M*2,D,W),F,_e(h,Y,u-c/2-M+W/2)),L.add(new Ce(W,D,c),F,_e(h+l/2+M-W/2,Y,u)),L.add(new Ce(W,D,c),F,_e(h-l/2-M+W/2,Y,u))};w(r.wall,.06,1,.5,9407106),w(r.wall,.04,Mn-.2,1+(Mn-.2)/2,d);for(let L=1;L<o;L++)w(r.trimB,.05,.16,1+L*Mn,m);w(r.trimB,.3,.45,a+.22,m);let R=ky(h,u,l,c),x=[R.S,R.E,R.W].find(L=>n.street(L))||(l>=c?R.S:e.seed<.5?R.E:R.W),S=(L,M,D,Y)=>[L.x+L.tx*M+L.nx*Y,D,L.z+L.tz*M+L.nz*Y],N=(L,M,D,Y,F=L.rot,W=0,Z=0)=>{let te=Y===o-1,J=te?1.15:p===3?1.8:1.5,se=D+(J-1.5)/2,Ne=Math.sin(F),pe=Math.cos(F),me=Math.cos(F),Le=-Math.sin(F),ee=(ue,Fe,be)=>[L.x+L.tx*M+L.nx*W+me*ue+Ne*be,se+Fe,L.z+L.tz*M+L.nz*W+Le*ue+pe*be],re=(ue,Fe)=>{let be=s()<.1;r.trim.add(...ee(ue,0,.04),F,Fe+.22,J+.24,.1,g),r.glass.add(...ee(ue,0,.05),F,Fe,J,.12,be?16763274:[9414335,7309215,11123916,6123910][Math.floor(s()*4)]),!be&&s()<.25&&r.trim.add(...ee(ue-Fe*.24,.05,.065),F,Fe*.4,J*.85,.13,[15986400,14272416,13096160][Math.floor(s()*3)])},oe=Z||1.05;p===1&&L===x&&!Z?(re(-.36,.52),re(.36,.52),oe=1.3):re(0,oe),r.trim.add(...ee(0,-J/2-.18,.12),F,oe+.3,.08,.3,9344154),p===2&&!te&&r.trim.add(...ee(0,J/2+.2,.05),F,oe*.8,.36,.1,g);let de=J/2+(p===2&&!te?.55:.25);_==="pediment"&&!te?(r.trim.add(...ee(0,de,.07),F,oe+.45,.22,.14,m),r.trim.add(...ee(0,de+.2,.07),F,oe*.7,.16,.12,m)):_==="hood"?r.trim.add(...ee(0,de,.12),F,oe+.5,.16,.24,m):_==="keystone"&&r.trim.add(...ee(0,de,.08),F,.28,.34,.16,m)},C=new Set;for(let L of[R.S,R.E,R.W]){if(L!==R.S&&n.blocked(L))continue;let M=Math.max(2,Math.floor(L.L/(y?2.9:2.6))),D=L.L/M,Y=Math.floor(M/2),F=L===x;if(C.clear(),F&&M>=5&&s()<.65){let J=Math.floor(s()*3);J===0?[1,M-2].forEach(se=>C.add(se)):J===1?C.add(Y):C.add(M-2)}for(let J=0;J<o;J++)for(let se=0;se<M;se++){let Ne=-L.L/2+D*(se+.5);F&&J===0&&se===Y||F&&J===0&&E||J>0&&C.has(se)||N(L,Ne,1+J*Mn+1.6,J,L.rot,.04)}if(F&&y)for(let J=1;J<M;J++){let[se,,Ne]=S(L,-L.L/2+D*J,0,.06);r.trim.add(se,1+Mn+(o-1)*Mn/2,Ne,L.rot,.3,(o-1)*Mn,.12,new Pe(f).multiplyScalar(1.06).getHex())}if(!F)continue;for(let J=0;J<Math.floor(L.L/.9);J++){let[se,,Ne]=S(L,-L.L/2+.45+J*.9,0,.25);r.trim.add(se,a-.15,Ne,L.rot,.22,.35,.5,15130578)}let W=-L.L/2+D*(Y+.5),Z=[5912102,3099194,3885674,6957604][e.facadeIndex%4],te=(J,se)=>S(L,W,J,se);r.trim.add(...te(1.6,.05),L.rot,2.1,3.2,.06,14209218),r.trim.add(...te(3.6,.2),L.rot,2.8,.3,.5,15130578);for(let J of[-1.1,1.1]){let[se,,Ne]=S(L,W+J,0,.18);r.trim.add(se,1.65,Ne,L.rot,.3,3.3,.4,15130578)}if(r.dark.add(...te(1.3,.09),L.rot,1.4,2.6,.25,Z),r.glass.add(...te(2.85,.1),L.rot,1.3,.38,.26,16767392),r.trim.add(...te(.17,.55),L.rot,2.6,.35,1.1,10656398),r.trim.add(...te(.06,1.05),L.rot,2.6,.12,.6,10656398),E)for(let J=0;J<M;J++){if(J===Y)continue;let se=-L.L/2+D*(J+.5),[Ne,,pe]=S(L,se,0,.05);if(r.glass.add(Ne,1.55,pe,L.rot,D*.82,2.1,.16,13150328),J%2===0){let[me,,Le]=S(L,se,0,1.5);Ys(r.props,Zs("flowers",ee=>_h(ee,_e(0,0,0),7)),_e(me,.12,Le,L.rot,.7,.8,.7))}for(let me=0;me<6;me++){let[Le,,ee]=S(L,se-D*.45+(me+.5)*(D*.9/6),0,.65);r.trim.add(Le,2.95,ee,L.rot,D*.15,.06,1.3,me%2?15920610:v,new We().makeRotationX(.32))}}for(let J of C){let se=-L.L/2+D*(J+.5),Ne=(o-1)*Mn,pe=1+Mn,me=D*1.3,Le=s()<.4,ee=Le?me:me*.5,re=Le?.9:1.3,[oe,,de]=S(L,se,0,0),ue=_e(oe,0,de,L.rot);r.wall.add(wf(me,ee,re,Ne),new Pe(f).multiplyScalar(1.04).getHex(),ue.clone().multiply(_e(0,pe,0)));for(let ze=0;ze<o;ze++)r.trimB.add(wf(me+.3,ee+.2,re+.12,.18),m,ue.clone().multiply(_e(0,pe+ze*Mn-.09,0)));let Fe=Math.atan2(re,(me-ee)/2),be=(me+ee)/4;for(let ze=1;ze<o;ze++){let Je=1+ze*Mn+1.6;if(N(L,se,Je,ze,L.rot,re+.02),!Le)for(let et of[-1,1]){let X={...L,x:L.x+L.tx*(et*be)+L.nx*0,z:L.z+L.tz*(et*be)};N(X,se,Je,ze,L.rot+et*Fe,re/2+.03,Math.min(1.05,Math.hypot((me-ee)/2,re)-.6))}}r.roof.add(Hy(me,ee,re),7305858,ue.clone().multiply(_e(0,pe+Ne+.05,0)))}}let O=l>=c,T=O?l:c,U=O?c:l,P=O?0:Math.PI/2,k=e.roof==="mansard"&&(T<7||U<7)?"gable":e.roof;if(k==="flat"){r.trimB.add(new Ce(l-.2,.25,c-.2),[4999750,4606544,5589311][t%3],_e(h,a+.3,u));for(let L=0;L<Math.max(1,Math.floor(l*c/120));L++){let M=h+(s()-.5)*(l-3),D=u+(s()-.5)*(c-3);s()<.5?r.trimB.add(new Ce(1.2,.7,1.2),10130828,_e(M,a+.75,D)):r.glass.add(M,a+.5,D,0,1.6,.2,1.1,6123910)}r.wall.add(new Ce(.9,2.2,.9),11033672,_e(h+(s()-.5)*(l-2),a+1.4,u+(s()-.5)*(c-2)));return}let H=Math.min(U*.42,5.2),V=[16777215,15784144,15261912,10133672][e.roofIndex%4],$=k==="gable"?Di(T,U,H,.45):yf(T,U,H,.4);r.roof.add($,V,_e(h,a+.45,u,P)),k==="gable"&&r.trimB.add(new Ce(T+1,.18,.4),10112570,_e(h,a+.45+H,u,P));let B=T>6?Math.max(1,Math.floor(T/5)):0;for(let L=0;L<B;L++){let M=-T/2+T/B*(L+.5),D=U/2-1.6,[Y,F]=O?[h+M,u+D]:[h+(e.seed<.5?D:-D),u+M],W=O?0:e.seed<.5?Math.PI/2:-Math.PI/2;r.wall.add(new Ce(1.5,1.6,1.4),f,_e(Y,a+.45+1.1,F,W)),r.roof.add(Di(1.5,1.4,.8,.15),V,_e(Y,a+.45+1.9,F,W+Math.PI/2));let Z=Math.sin(W),te=Math.cos(W);r.glass.add(Y+Z*.72,a+.45+1.1,F+te*.72,W,.9,.9,.08,7309215)}for(let L of[-.3,.28]){let[M,D]=O?[h+T*L,u-.6]:[h-.6,u+T*L];r.wall.add(new Ce(.9,2.8,.9),11033672,_e(M,a+.45+H*.65,D)),r.trimB.add(new Ce(1.05,.15,1.05),6961710,_e(M,a+.45+H*.65+1.45,D))}}function wf(i,e,t,n){let s=new wn;s.moveTo(-i/2,0),s.lineTo(-e/2,-t),s.lineTo(e/2,-t),s.lineTo(i/2,0),s.lineTo(-i/2,0);let r=new Ti(s,{depth:n,bevelEnabled:!1,curveSegments:1});return r.rotateX(-Math.PI/2),r}function Hy(i,e,t){let r=[[-i/2-.18,0,0],[-e/2-.09,0,t+.18],[e/2+.09,0,t+.18],[i/2+.18,0,0],[-e*.3,.85,0],[e*.3,.85,0]],o=[0,1,4,1,2,5,1,5,4,2,3,5],a=new dt;return a.setAttribute("position",new Xe(o.flatMap(l=>r[l]),3)),a.computeVertexNormals(),a}function Ys(i,e,t){let n=e.attributes.position.array,s=e.attributes.normal.array,r=e.attributes.color.array,o=t.elements;for(let a=0;a<n.length;a+=3){let l=n[a],c=n[a+1],h=n[a+2];i.pos.push(o[0]*l+o[4]*c+o[8]*h+o[12],o[1]*l+o[5]*c+o[9]*h+o[13],o[2]*l+o[6]*c+o[10]*h+o[14]);let u=s[a],f=s[a+1],d=s[a+2],m=o[0]*u+o[4]*f+o[8]*d,y=o[1]*u+o[5]*f+o[9]*d,g=o[2]*u+o[6]*f+o[10]*d,p=Math.hypot(m,y,g)||1;i.nor.push(m/p,y/p,g/p),i.col.push(r[a],r[a+1],r[a+2])}}var Sh={};function Zs(i,e){if(!Sh[i]){let t=new Et;e(t),Sh[i]=t.build({outline:!1})}return Sh[i]}function Ni(i,e,t,n,s,r){let{cells:o,width:a}=i,l=s-t,c=new Uint8Array(l*(r-n)),h=[];for(let u=n;u<r;u++)for(let f=t;f<s;f++){if(c[(u-n)*l+(f-t)]||o[u*a+f]!==e)continue;let d=f;for(;d+1<s&&!c[(u-n)*l+(d+1-t)]&&o[u*a+d+1]===e;)d++;let m=u;e:for(;m+1<r;){for(let y=f;y<=d;y++)if(c[(m+1-n)*l+(y-t)]||o[(m+1)*a+y]!==e)break e;m++}for(let y=u;y<=m;y++)c.fill(1,(y-n)*l+(f-t),(y-n)*l+(d-t)+1);h.push([f,u,d+1,m+1])}return h}function Af(i){let e=i.attributes.normal;for(let t=0;t<e.count;t++)if(Math.abs(e.getY(t))<.5){let n=Math.hypot(e.getX(t)*.25,1,e.getZ(t)*.25);e.setXYZ(t,e.getX(t)*.25/n,1/n,e.getZ(t)*.25/n)}return i}function Ui(i,e,t,n,s=-1.2){let[r,o,a,l]=e,c=new Ce(a-r,t-s,l-o);Af(c),i.add(c,n,_e((r+a)/2,(t+s)/2,(o+l)/2))}function Gy(i,e){if(!i.pos.length&&!e.pos.length)return null;let t=new dt,n=s=>{let r=new Float32Array(i[s].length+e[s].length);return r.set(i[s],0),r.set(e[s],i[s].length),r};return t.setAttribute("position",new ht(n("pos"),3)),t.setAttribute("normal",new ht(n("nor"),3)),t.setAttribute("color",new ht(n("col"),3)),t.computeBoundingSphere(),t}function yl(i,e,t,n,s,r,o,a,l){let c=Math.hypot(n-e,s-t);if(c<.05)return;let h=new Ce(c,a,o);i.add(a<=.3?Af(h):h,l,_e((e+n)/2,r,(t+s)/2,-Math.atan2(s-t,n-e)))}var Vy=[12603466,4880064,4168298,14070076,3092275];function Wy(){let i=new dt,e=[-.5,-.5,.5,.5,-.5,.5,.5,.5,.5,-.5,.5,.5,-.5,.5,.5,.5,.5,.5,.5,.5,-.5,-.5,.5,-.5],t=[0,0,1,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,1,0];return i.setAttribute("position",new Xe(e,3)),i.setAttribute("normal",new Xe(t,3)),i.setIndex([0,1,2,0,2,3,4,5,6,4,6,7]),i.computeBoundingSphere(),i}function Rf(i,e){let t=i.G,n=(T,U)=>i.cellAt(T,U),s=T=>T===t.road||T===t.sidewalk||T===t.bike,r=new Ct,o=Wy(),a=new Map,l=(T,U)=>{let P=Oy(T,U),k=a.get(P);return k||a.set(P,k={parts:[],lamps:[],props:[],trees:[],paint:[],rails:[],strips:[],signs:[]}),k};i.buildings.forEach((T,U)=>!T.landmark&&l(T.x+T.w/2,T.y+T.h/2).parts.push([T,U]));for(let T of i.lamps)l(T.x,T.y).lamps.push(T);for(let T of i.props)l(T.x,T.y).props.push(T);let c=Tf(91);for(let T of i.trees){let U=c(),P=T.canopy/2.7*(.9+c()*.2);l(T.x,T.y).trees.push({pick:U,m:_e(T.x,.1,T.y,c()*Math.PI*2,P,P*(.92+c()*.16),P)})}let h=i.roads.filter(T=>!T.foot&&T.kind!=="service"),u=new Map;for(let T of h)for(let[U,P]of[[0,1],[T.pts.length-1,T.pts.length-2]]){let k=`${Math.round(T.pts[U][0])},${Math.round(T.pts[U][1])}`;u.has(k)||u.set(k,[]),u.get(k).push({r:T,p:T.pts[U],q:T.pts[P]})}for(let T of h){if(T.w<9||T.bridge)continue;let U=0;for(let P=0;P+1<T.pts.length;P++){let[k,H]=T.pts[P],[V,$]=T.pts[P+1],B=Math.hypot(V-k,$-H);for(let L=U;L<B;L+=6){let M=Math.min(B,L+3);L>9&&M<B-9&&l(k,H).paint.push([k+(V-k)*L/B,H+($-H)*L/B,k+(V-k)*M/B,H+($-H)*M/B,.16])}U=0}}for(let T of u.values())if(!(T.length<3)){{let{r:U,p:P,q:k}=T[0],H=Math.hypot(k[0]-P[0],k[1]-P[1])||1,V=(k[0]-P[0])/H,$=(k[1]-P[1])/H,B=U.w/2+1;l(P[0],P[1]).signs.push([P[0]+V*(U.w/2+3)-$*B,P[1]+$*(U.w/2+3)+V*B,1])}for(let{r:U,p:P,q:k}of T){let H=Math.hypot(k[0]-P[0],k[1]-P[1]);if(H<14||U.w<7)continue;let V=(k[0]-P[0])/H,$=(k[1]-P[1])/H,B=U.w/2+4.5;for(let L=-U.w/2+.7;L<U.w/2-.5;L+=1.1){let M=P[0]+V*B-$*L,D=P[1]+$*B+V*L;l(M,D).paint.push([M-V*1.4,D-$*1.4,M+V*1.4,D+$*1.4,.55])}}}i.spawns.cars.forEach((T,U)=>{if(U<2||U%6)return;let P=-Math.sin(T.heading),k=Math.cos(T.heading);for(let H of[1,-1]){let V=T.x+P*H*2.9,$=T.y+k*H*2.9;if(n(V,$)===t.sidewalk){l(V,$).signs.push([V,$,0]);break}}});for(let T of i.roads)for(let U=0;U+1<T.pts.length;U++){let[P,k]=T.pts[U],[H,V]=T.pts[U+1],$=Math.hypot(H-P,V-k);if($<.2)continue;let B=(H-P)/$,L=(V-k)/$,M=-L,D=B,Y=l((P+H)/2,(k+V)/2).strips,F=T.foot?T.w/2:T.w/2+1,W=(te,J,se,Ne,pe,me=F)=>Y.push([P-B*me+M*te,k-L*me+D*te,H+B*me+M*te,V+L*me+D*te,J,se,Ne,pe]);if(T.foot){T.kind==="cycleway"?W(0,T.w,.128,13660252,"asphalt"):W(0,T.w,.126,T.kind==="pedestrian"?16777215:15259312,"slabs");continue}let Z=T.kind==="service"?1.2:3;if(W(0,T.w+Z*2+1,.124,16777215,"slabs",F+Z),W(0,T.w,.13,16777215,"asphalt"),T.bike)for(let te of[-1,1])W(te*(T.w/2-.85),1.7,.133,13660252,"asphalt",F-1);for(let te of[-1,1])W(te*(T.w/2+.12),.24,.15,11841704,"trimB",0)}for(let T of i.bridges)for(let U=0;U+1<T.pts.length;U++){let[P,k]=T.pts[U],[H,V]=T.pts[U+1],$=Math.hypot(H-P,V-k);if($<1)continue;let B=-(V-k)/$,L=(H-P)/$;for(let M of[-1,1])l(P,k).rails.push([P+B*M*(T.w/2-.2),k+L*M*(T.w/2-.2),H+B*M*(T.w/2-.2),V+L*M*(T.w/2-.2)])}let f=(T,U)=>[-.3,0,.3].map(P=>n(T.x+T.tx*T.L*P+T.nx*U,T.z+T.tz*T.L*P+T.nz*U)),d={blocked:T=>f(T,1.5).filter(U=>U===t.building).length>=2,street:T=>f(T,5).some(s)};function*m(T){let[U,P]=T.split(",").map(Number),k=U*nn,H=P*nn,V=Math.min(i.width,k+nn),$=Math.min(i.height,H+nn),B=By(),L=a.get(T)||{parts:[],lamps:[],props:[],trees:[],paint:[],rails:[],strips:[],signs:[]};if(k<i.width&&H<i.height){for(let M of Ni(i,t.road,k,H,V,$))Ui(B.asphalt,M,.12,16777215);for(let M of Ni(i,t.bike,k,H,V,$))Ui(B.asphalt,M,.12,13660252);for(let M of Ni(i,t.sidewalk,k,H,V,$))Ui(B.slabs,M,.12,16777215);for(let M of Ni(i,t.slab,k,H,V,$))Ui(B.slabs,M,.12,15525594);for(let M of Ni(i,t.path,k,H,V,$))Ui(B.slabs,M,.11,15259312);for(let M of Ni(i,t.deck,k,H,V,$))Ui(B.slabs,M,.12,14275786,-.9);for(let M of Ni(i,t.building,k,H,V,$))Ui(B.slabs,M,.13,6971992);for(let M of Ni(i,t.grass,k,H,V,$))Ui(B.grass,M,.1,16777215);yield,y(B,k,H,V,$),yield}for(let[M,D,Y,F,W,Z,te,J]of L.strips)yl(B[J],M,D,Y,F,Z-.02,W,.04,te);for(let[M,D,Y,F,W]of L.paint)yl(B.slabs,M,D,Y,F,.138,W,.02,16777215);for(let[M,D,Y,F]of L.rails){yl(B.trimB,M,D,Y,F,-.4,.5,1.1,9077368);let W=Math.hypot(Y-M,F-D);xl(B.props,_e(M,.12,D,-Math.atan2(F-D,Y-M)),W)}for(let[M,D]of L.parts){let Y=M.house,F=Y.parts===1;zy(B,{x:M.x,y:M.y,w:M.w,h:M.h,height:M.height,roof:F?Y.roof:Math.min(M.w,M.h)>=9?"gable":"flat",facadeIndex:Y.facade,roofIndex:Y.facade%3,seed:Y.seed+D%7*.013,shop:Y.shop},D,d),yield}for(let[M,D,Y]of L.signs)gh(B.props,_e(M,.12,D),2.7),B.signs.push([M,D,Y]);for(let M of L.lamps){let D=Math.atan2(M.ax||0,M.ay||1),Y=_e(M.x,.12,M.y,D);Ys(B.props,Zs("lamp",F=>fh(F,_e(0,0,0),1)),Y),B.lanterns.push(Y.clone().multiply(_e(0,4.64,1.12)))}for(let M of L.props)if(M.kind==="bench")Ys(B.props,Zs("bench",D=>xh(D,_e(0,0,0))),_e(M.x,.12,M.y,-(M.rot||0)));else if(M.kind==="bin")Ys(B.props,Zs("bin",D=>yh(D,_e(0,0,0))),_e(M.x,.12,M.y));else if(M.kind==="rack"){let D=M.n||4;Ys(B.props,Zs(`rack${D}`,Y=>dh(Y,_e(0,0,0),D)),_e(M.x-D*.8/2,.12,M.y));for(let Y=0;Y<D;Y++)(Y*7+Math.round(M.x))%4!==0&&Ys(B.props,Zs(`bike${Y%5}`,F=>io(F,_e(0,0,0,Math.PI/2),Vy[Y%5])),_e(M.x-D*.8/2+Y*.8,.12,M.y))}yield,E(T,B,L)}function y(T,U,P,k,H){let V=i.width,$=(B,L,M,D,Y,F)=>{let W=-1;for(let Z=M;Z<=D;Z++){let te=Z<D&&B(Z);if(te&&W<0&&(W=Z),!te&&W>=0){if(Z-W>=3){let[J,se,Ne,pe]=Y?[W,L+.45*F+.5,Z,L+.45*F+.5]:[L+.45*F+.5,W,L+.45*F+.5,Z];yl(T.hedge,J,se,Ne,pe,.55,.75,.9,10139768);let me=Z-W;for(let Le=.5;Le<me;Le+=1.3){let ee=Y?W+Le:J,re=Y?se:W+Le;T.hedge.add(new Yn(.55,1),11061380,_e(ee,.92,re))}(W+L)%3===0&&xl(T.props,_e(Y?W:J-F*.6,.12,Y?se-F*.6:W,Y?0:-Math.PI/2),me)}W=-1}}};for(let B=P;B<H;B++)for(let L of[-1,1])B+L<0||B+L>=i.height||$(M=>i.cells[B*V+M]===t.grass&&[t.sidewalk,t.slab].includes(i.cells[(B+L)*V+M]),B,U,k,!0,L<0?-1:1);for(let B=U;B<k;B++)for(let L of[-1,1])B+L<0||B+L>=V||$(M=>i.cells[M*V+B]===t.grass&&[t.sidewalk,t.slab].includes(i.cells[M*V+B+L]),B,P,H,!1,L<0?-1:1)}let g=new Map,p=new Map,_=T=>T.pos.length?T.build({outline:!1}):null;function E(T,U,P){let k=[],H=($,B,L=!0,M=!0)=>{if(!$)return;let D=$.isInstancedMesh?$:new Qe($,B);D.castShadow=L,D.receiveShadow=M,r.add(D),k.push(D)};if(H(_(U.asphalt),e.asphalt,!1),H(_(U.slabs),e.slabs,!1),H(_(U.grass),e.grass,!1),H(_(U.hedge),e.hedge),H(_(U.wall),e.wall),H(_(U.roof),e.roof),H(Gy(U.trimB,U.props),e.plain,!1),H(U.trim.mesh(e.trimI,o),null,!1),H(U.glass.mesh(e.glassI,o),null,!1),U.signs.length){let $=[],B=[];for(let[M,D,Y]of U.signs){let F=Y===1?1.6:.7,W=Y===1?.4:.7,Z=2.7+W/2,te=[[-F/2,-W/2,0,0],[F/2,-W/2,1,0],[F/2,W/2,1,1],[-F/2,-W/2,0,0],[F/2,W/2,1,1],[-F/2,W/2,0,1]];for(let[J,se,Ne,pe]of te)$.push(M+J,Z+se,D+.06),B.push((Y+Ne)/4,pe)}let L=new dt;L.setAttribute("position",new Xe($,3)),L.setAttribute("uv",new Xe(B,2)),L.computeVertexNormals(),L.computeBoundingSphere(),H(L,x,!1,!1)}if(U.lanterns.length){let $=new ln(v,e.lantern,U.lanterns.length);if(U.lanterns.forEach((B,L)=>$.setMatrixAt(L,B)),$.computeBoundingSphere(),H($,null,!1,!1),e.halo){let B=new ln(w,e.halo,U.lanterns.length);U.lanterns.forEach((L,M)=>B.setMatrixAt(M,R.makeTranslation(L.elements[12],L.elements[13]+.1,L.elements[14]))),B.computeBoundingSphere(),B.renderOrder=4,H(B,null,!1,!1)}}let V={meshes:k,trees:[],plan:P};g.set(T,V),S(V)}let v=ph(),w=new It(1.5,1.5).rotateX(-(Math.PI/2-kn.degToRad(33))),R=new We,x=new St({map:mh(),roughness:.5,side:Zt});function S(T){for(let k of T.trees)r.remove(k);T.trees=[];let U=bf(),P=new Map;for(let k of T.plan.trees){let H=Math.min(U.length-1,Math.floor(k.pick*U.length));P.has(H)||P.set(H,[]),P.get(H).push(k.m)}for(let[k,H]of P)for(let[V,$]of U[k].parts(e)){let B=new ln(V,$,H.length);H.forEach((L,M)=>B.setMatrixAt(M,L)),B.computeBoundingSphere(),B.castShadow=!0,B.receiveShadow=!0,r.add(B),T.trees.push(B)}}function N(T){let U=g.get(T);if(U){for(let P of[...U.meshes,...U.trees])r.remove(P),P.geometry!==o&&P.geometry!==v&&!U.trees.includes(P)&&P.geometry.dispose(),P.isInstancedMesh&&P.dispose();g.delete(T)}}let C=190;function O(T,U,P=4){let k=performance.now(),H=[],V=Math.ceil(C/nn),$=Math.floor(T/nn),B=Math.floor(U/nn);for(let L=$-V;L<=$+V;L++)for(let M=B-V;M<=B+V;M++){if(L<-1||M<-1||L*nn>i.width||M*nn>i.height)continue;let D=Math.hypot((L+.5)*nn-T,(M+.5)*nn-U);D<C&&H.push([D,`${L},${M}`])}H.sort((L,M)=>L[0]-M[0]);for(let[,L]of H){if(g.has(L))continue;let M=p.get(L);for(M||p.set(L,M=m(L));performance.now()-k<P;)if(M.next().done){p.delete(L);break}if(performance.now()-k>=P)break}for(let L of[...g.keys()]){let[M,D]=L.split(",").map(Number);Math.hypot((M+.5)*nn-T,(D+.5)*nn-U)>C+nn*1.5&&N(L)}}return{group:r,update:O,get pieces(){return g.size},rebuildTrees(){for(let T of g.values())S(T)}}}var so=10766902,Cf=9322288,Fi=3962212,bh=13222066,Pf=12610130,ro=15920354;function Xy(i){let e=i.length,t=i.reduce((g,p)=>g+p[0],0)/e,n=i.reduce((g,p)=>g+p[1],0)/e,s=0,r=0,o=0;for(let[g,p]of i)s+=(g-t)**2,r+=(p-n)**2,o+=(g-t)*(p-n);let a=.5*Math.atan2(2*o,s-r),l=Math.cos(a),c=Math.sin(a),h=1/0,u=-1/0,f=1/0,d=-1/0;for(let[g,p]of i){let _=(g-t)*l+(p-n)*c,E=-(g-t)*c+(p-n)*l;h=Math.min(h,_),u=Math.max(u,_),f=Math.min(f,E),d=Math.max(d,E)}let m=(h+u)/2,y=(f+d)/2;return{x:t+l*m-c*y,z:n+c*m+l*y,angle:a,L:u-h,W:d-f}}function If(i,e){let t=new Ct,n=new Et,s=new Et,r=new Et,o=[Math.cos(i.north+Math.PI/2),Math.sin(i.north+Math.PI/2)];for(let c of i.houses){if(!c.landmark||!c.outline)continue;let h=Xy(c.outline),u=_e(h.x,0,h.z,-h.angle),f=Math.cos(h.angle)*o[0]+Math.sin(h.angle)*o[1]<0?-1:1,d=(m,y,g,p=0)=>u.clone().multiply(_e(m*f,y,g,p));c.landmark==="domkyrkan"&&qy(n,s,r,d,h,f),c.landmark==="slottet"&&Yy(n,s,r,d,h,f)}let a=i.places.gunillaklockan;a&&Zy(n,s,r,(c,h,u,f=0)=>_e(a[0]+c,h,a[1]+u,f));let l=(c,h)=>{if(!c.pos.length)return;let u=new Qe(c.build({outline:!1}),h);u.castShadow=!0,u.receiveShadow=!0,t.add(u)};return l(n,e.wall),l(s,e.plain),l(r,e.plain),t}function qy(i,e,t,n,s){let r=Math.max(60,s.L),o=Math.min(Math.max(18,s.W*.75),26),a=22,l=-r/2;i.add(new Ce(r-16,a,o),so,n(8,a/2,0)),e.add(Di(r-16,o,14,.5),Fi,n(8,a,0)),i.add(new Ce(14,a,o+18),so,n(4,a/2,0)),e.add(Di(o+18,14,12,.5),Fi,n(4,a,0,Math.PI/2)),i.add(new ut(o/2,o/2,a,10,1,!1,0,Math.PI),so,n(r/2-8,a/2,0,-Math.PI/2)),e.add(new gn(o/2+.5,12,10,1,!1,0,Math.PI),Fi,n(r/2-8,a+6,0,-Math.PI/2));for(let h=l+22;h<r/2-10;h+=6)for(let u of[-1,1])Math.abs(h-4)<9||(t.add(new Ce(1.4,a*.8,1.6),Cf,n(h,a*.4,u*(o/2+.8))),t.add(new Ce(2.2,8,.3),4016732,n(h+3,a*.55,u*(o/2+.05))),t.add(new gn(1.1,2.2,4),4016732,n(h+3,a*.55+5,u*(o/2+.05)).multiply(new We().makeScale(1,1,.15))));let c=11;for(let h of[-1,1]){let u=h*(o/2-c/2+2);i.add(new Ce(c,46,c),so,n(l+c/2,23,u));for(let f of[16,30,42])t.add(new Ce(c+.6,.6,c+.6),Cf,n(l+c/2,f,u));for(let f of[20,34])t.add(new Ce(.3,5,2),2764600,n(l-.05,f,u));e.add(new ut(c*.42,c*.5,4,8),Fi,n(l+c/2,48,u)),e.add(new gn(c*.42,30,8),Fi,n(l+c/2,65,u)),t.add(new cn(.7,8,6),13937224,n(l+c/2,80.5,u))}i.add(new Ce(c,30,o-2*c+4),so,n(l+c/2,15,0)),t.add(new ut(3.2,3.2,.4,16),4016732,n(l-.1,22,0).multiply(new We().makeRotationZ(Math.PI/2))),t.add(new Ce(.6,9,5),4861474,n(l-.2,4.5,0)),t.add(new gn(2.6,3,4),bh,n(l-.3,10.5,0).multiply(new We().makeScale(.2,1,1)))}function Yy(i,e,t,n,s){let r=Math.max(70,s.L*.95),o=Math.min(Math.max(14,s.W*.45),22),a=17;t.add(new Ce(r+16,1.6,o+16),bh,n(0,.8,0)),i.add(new Ce(r,a,o),Pf,n(0,a/2+1.6,0)),e.add(Di(r,o,7,.6),4080198,n(0,a+1.6,0));for(let l of[6,11.5])t.add(new Ce(r+.3,.35,o+.3),ro,n(0,l+1.6,0));t.add(new Ce(r+.8,.6,o+.8),ro,n(0,a+1.6,0));for(let l=-r/2+3;l<r/2-2;l+=3.4)for(let c of[-1,1])for(let h of[4,9.5,14])t.add(new Ce(1.3,2.1,.2),3819094,n(l,h+1.6,c*(o/2+.05)));for(let[l,c,h]of[[-1,9,30],[1,7,26]]){let u=l*(r/2);i.add(new ut(c,c+.6,h,16),Pf,n(u,h/2+1.6,o/2-c*.4)),t.add(new ut(c+.4,c+.4,.6,16),ro,n(u,h+1.6,o/2-c*.4)),e.add(new cn(c,16,8,0,Math.PI*2,0,Math.PI/2),4080198,n(u,h+1.6,o/2-c*.4)),e.add(new ut(1.2,1.4,3,8),4080198,n(u,h+c+2.8,o/2-c*.4)),e.add(new gn(1.4,3,8),4080198,n(u,h+c+5.6,o/2-c*.4));for(let f=0;f<8;f++){let d=f/8*Math.PI*2;for(let m of[8,14,20])t.add(new Ce(1.2,2,.3),3819094,n(u+Math.cos(d)*(c+.05),m+1.6,o/2-c*.4+Math.sin(d)*(c+.05),-d+Math.PI/2))}}t.add(new Ce(4,6,.6),ro,n(0,4.6,o/2+.2)),t.add(new Ce(2.6,4.4,.7),3877408,n(0,3.8,o/2+.25))}function Zy(i,e,t,n){i.add(new Ce(5,9,5),15179914,n(0,4.5,0)),t.add(new Ce(5.6,.5,5.6),ro,n(0,9,0));for(let s of[0,Math.PI/2])t.add(new Ce(1.6,2.4,5.1),2763310,n(0,7,0,s));e.add(new ut(1.2,3.4,3.4,8),Fi,n(0,10.9,0)),e.add(new cn(1.3,8,6),Fi,n(0,13,0)),e.add(new gn(.5,2.4,8),Fi,n(0,15,0)),t.add(new cn(.3,6,4),13937224,n(0,16.3,0)),t.add(new Ce(6.4,.6,6.4),bh,n(0,.3,0))}function Lf(i){let e=new Ct,t=i.places,n=(o,a,l,c)=>{let h=document.createElement("canvas");h.width=512,h.height=128;let u=h.getContext("2d");u.fillStyle=a,u.fillRect(0,0,512,128),u.strokeStyle=l,u.lineWidth=8,u.strokeRect(6,6,500,116),u.fillStyle=l,u.font="bold 54px system-ui, sans-serif",u.textAlign="center",u.textBaseline="middle",u.fillText(o,c?290:256,66),c&&c(u);let f=new qn(h);return f.colorSpace=At,f},s=o=>{o.fillStyle="#ffffff",o.beginPath(),o.moveTo(64,96),o.bezierCurveTo(20,66,26,26,64,44),o.bezierCurveTo(102,26,108,66,64,96),o.fill()},r=(o,a,l,c=6)=>{let h=new Qe(new It(c,c/4),new St({map:l,roughness:.6,emissive:16777215,emissiveMap:l,emissiveIntensity:.25}));h.position.set(o,4.2,a),e.add(h);for(let u of[-1,1]){let f=new Qe(new ut(.08,.08,4.2,6),new St({color:3817028}));f.position.set(o+u*(c/2-.3),2.1,a-.05),e.add(f)}};for(let o of t.vardcentraler)r(o[0],o[1],n("V\xC5RDCENTRAL","#2f8a5a","#ffffff",s));return r(t.polis[0],t.polis[1],n("POLIS","#1f4fae","#ffffff")),r(t.kiosk[0],t.kiosk[1],n("MACKBAREN","#f0a43a","#2a1a10")),r(t.nation[0],t.nation[1],n("PUNSCHBERGS NATION","#d96aa0","#ffffff"),8),e}var Q1={height:64,viewShort:30,tiltViewShort:34,center:new z(30,0,-1.5),tiltCenter:new z(30,0,-3.5),tiltDistance:80};var Eh={hatch:{L:4.1,body:[[-2.05,.28],[2.05,.28],[2.05,.66],[1.92,.86],[.85,.98],[-1.95,.98],[-2.05,.82]],cabin:[[.8,.95],[.05,1.45],[-1.6,1.45],[-1.98,.95]],roof:[-1.55,0]},sedan:{L:4.6,body:[[-2.3,.3],[2.3,.3],[2.3,.66],[2.15,.84],[1,.96],[-2.15,.96],[-2.3,.8]],cabin:[[.95,.93],[.15,1.42],[-1.25,1.42],[-1.85,.93]],roof:[-1.2,.1]},sport:{L:4.5,body:[[-2.25,.26],[2.25,.26],[2.25,.56],[2.1,.7],[.9,.8],[-2.15,.84],[-2.25,.7]],cabin:[[.7,.78],[-.1,1.18],[-1.2,1.18],[-1.9,.82]],roof:[-1.05,-.2],roofY:1.2},estate:{L:4.8,body:[[-2.4,.3],[2.4,.3],[2.4,.66],[2.25,.86],[1.05,.98],[-2.35,.98],[-2.4,.82]],cabin:[[1,.95],[.2,1.48],[-2.15,1.48],[-2.3,.95]],roof:[-2.05,.15]}},oo=1.8;function Df(i,e,t){let n=new wn;i.forEach(([r,o],a)=>a?n.lineTo(r,o):n.moveTo(r,o)),n.closePath();let s=new Ti(n,{depth:e,bevelEnabled:!0,bevelThickness:t,bevelSize:t,bevelSegments:3,curveSegments:2});return s.translate(0,0,-e/2),s}function $y(i,e,t,n,s){let r=new wn,o=.25,a=t/2;r.moveTo(i+o,-a),r.lineTo(e-o,-a),r.quadraticCurveTo(e,-a,e,-a+o),r.lineTo(e,a-o),r.quadraticCurveTo(e,a,e-o,a),r.lineTo(i+o,a),r.quadraticCurveTo(i,a,i,a-o),r.lineTo(i,-a+o),r.quadraticCurveTo(i,-a,i+o,-a);let l=new Ti(r,{depth:s,bevelEnabled:!0,bevelThickness:.05,bevelSize:.1,bevelSegments:2,curveSegments:3});return l.rotateX(Math.PI/2),l.translate(0,n+s,0),l}function wh(i){let e=Eh[i],t=new Et;t.add(Df(e.body,oo-.5,.25),16777215),t.add($y(e.roof[0],e.roof[1],oo-.36,e.roofY??1.5,.07),16777215);let n=new Et;n.add(Df(e.cabin,oo-.5,.08),16777215);let s=new Et;for(let r of[-1,1])for(let o of[-1,1])s.add(new ut(.33,.33,.25,10),1776415,_e(r*(e.L/2-.75),.33,o*(oo/2-.12)).multiply(new We().makeRotationX(Math.PI/2)));for(let r of[-1,1])s.add(new Ce(.3,.16,.42),16774352,_e(e.L/2-.05,.86,r*.55)),s.add(new Ce(.22,.16,.4),13642270,_e(-e.L/2+.02,.9,r*.56)),s.add(new Ce(.22,.1,.12),2236966,_e(.75,1.05,r*(oo/2+.02)));if(i==="estate")for(let r of[-1,1])s.add(new Ce(2,.06,.06),2763310,_e(-1.05,1.62,r*.62));return i==="hatch"&&s.add(new Ce(.7,.04,.7),2897990,_e(-.75,1.6,0)),{paint:t.build({outline:!1}),glass:n.build({outline:!1}),det:s.build({outline:!1})}}var Jy=.55,Ky=.9,Qy=.5;function Nf(i){let e=i.attributes.normal;if(!e||e.itemSize!==4||e.isInterleavedBufferAttribute)return i;let t=new vr(e.array,4);return i.setAttribute("normal",new Is(t,3,0,!0)),i.setAttribute("rig",new Is(t,1,3,!0)),i}var jy=`
attribute float rig;
uniform vec4 uRig; // hip, knee, shoulder (metres), figure height
#ifdef USE_INSTANCING
  attribute vec2 walk;
#else
  uniform vec2 uWalk;
#endif
mat2 rigRot(float a) { float c = cos(a), s = sin(a); return mat2(c, s, -s, c); }
// Turns about the side axis (z), so the limbs swing forwards (+x) and back:
// first the shin round the knee, then the whole limb round the hip or shoulder.
void rigPose(out mat2 m1, out mat2 m2, out vec2 p1, out vec2 p2, out float bob) {
  #ifdef USE_INSTANCING
    vec2 wk = walk;
  #else
    vec2 wk = uWalk;
  #endif
  float a = abs(rig) * 127.0;
  float side = sign(rig);
  bool arm = a > 63.5;
  float w = a < 0.5 ? 0.0 : arm ? (a - 64.0) / 60.0 : a / 60.0;
  float s = sin(wk.x) * side;
  // The thigh swings forward and back; the knee bends while the leg swings forward.
  float leg = ${Jy.toFixed(3)} * wk.y * s * w;
  float knee = -${Ky.toFixed(3)} * wk.y * max(0.0, cos(wk.x) * side) * w * smoothstep(uRig.y + 0.06, uRig.y - 0.04, position.y);
  float sw = -${Qy.toFixed(3)} * wk.y * s * w;
  m1 = rigRot(arm ? 0.0 : knee);
  m2 = rigRot(arm ? sw : leg);
  p1 = vec2(0.0, uRig.y);
  p2 = vec2(0.0, arm ? uRig.z : uRig.x);
  // The body rises a little when a leg is straight under it.
  bob = 0.03 * wk.y * (abs(cos(wk.x)) - 0.5);
}
`;function ev(i){i.vertexShader=jy+i.vertexShader.replace("#include <beginnormal_vertex>",`#include <beginnormal_vertex>
      {
        mat2 m1, m2; vec2 p1, p2; float bob;
        rigPose(m1, m2, p1, p2, bob);
        objectNormal.xy = m2 * (m1 * objectNormal.xy);
      }`).replace("#include <begin_vertex>",`#include <begin_vertex>
      {
        mat2 m1, m2; vec2 p1, p2; float bob;
        rigPose(m1, m2, p1, p2, bob);
        transformed.xy = m1 * (transformed.xy - p1) + p1;
        transformed.xy = m2 * (transformed.xy - p2) + p2;
        transformed.y += bob;
      }`)}function ao(i,e,t){let n=i.clone(),s={value:new gt(e.hip*e.h,e.knee*e.h,e.shoulder*e.h,e.h)};return n.onBeforeCompile=r=>{r.uniforms.uRig=s,r.uniforms.uWalk=t||{value:new fe},ev(r)},n.customProgramCacheKey=()=>"walk",n}function Ml(i,e){return ao(new Fs,i,e)}function Th(i){let e=1.3+Math.min(1.6,i*.28);return i/e*Math.PI*2}function Ah(i){return Math.min(1,i/1.4)*(.75+.25*Math.min(1,i/5))}var tv={jacket:15770682,pants:3093568,skin:0,hair:1,scale:1.1},Rh=new Map,Sl={value:new fe},Uf={player(i){let e=Rh.get("player");if(e)return e.map(s=>nv(s,i));let t=new Et;uh(t,_e(0,0,0),{...tv,walk:0});let n=t.build({outline:!1});return[new Qe(n,i.solid),new Qe(n,i.solid)]}};function nv(i,e){let t=new Ct;for(let n of i){let s=e[n.mat]||e.solid,r=new Qe(n.geo,n.rig?ao(s,n.rig,Sl):s);n.rig&&(r.customDepthMaterial=Ml(n.rig,Sl)),r.castShadow=!0,t.add(r)}return t}async function Ff(i){let e=await fetch(i);if(!e.ok)return null;let t=await e.arrayBuffer(),n=new DataView(t).getUint32(0,!0),s=JSON.parse(new TextDecoder().decode(new Uint8Array(t,4,n))),r=4+n+3&-4,o=(l,c)=>{let h=new l(t,r,c);return r+=h.byteLength,r=r+3&-4,h},a={};for(let[l,c]of Object.entries(s.models))a[l]=c.map(h=>{let u=new dt;return u.setAttribute("position",new ht(o(Float32Array,h.n*3),3)),u.setAttribute("normal",new ht(o(Int8Array,h.n*4),4,!0)),u.setAttribute("color",new ht(o(Uint8Array,h.n*4),4,!0)),h.uv&&u.setAttribute("uv",new ht(o(Float32Array,h.n*2),2)),u.setIndex(new ht(o(h.wide?Uint32Array:Uint16Array,h.index),1)),u.computeBoundingSphere(),h.rig&&Nf(u),h.rig?{geo:u,mat:h.mat,rig:h.rig}:{geo:u,mat:h.mat}});return a}function bl(i,e){Rh.set(i,e)}function Of(i){return Rh.get(i)}var Bf={small:["hatch"],car:["sedan","estate","sedan"],sport:["sport"]};function zf(i,e){let t=new Ct,n={},s=kf({head:0,tail:0}),r={head:0,tail:0},o=kf(r),a=M=>{let D=M.reduce((Ne,[pe])=>Ne+(pe.index?pe.index.count:pe.attributes.position.count),0),Y=new Float32Array(D*3),F=new Float32Array(D*3),W=new Float32Array(D*3),Z=new Float32Array(D),te=0,J=new Pe;for(let[Ne,pe,me=Kn.trim]of M){let Le=Ne.index?Ne.toNonIndexed():Ne,ee=Le.attributes.position,re=Le.attributes.normal,oe=Le.attributes.color;pe!=null&&J.set(pe);for(let de=0;de<ee.count;de++,te++){Y.set([ee.getX(de),ee.getY(de),ee.getZ(de)],te*3);let ue=re.getX(de),Fe=re.getY(de),be=re.getZ(de),ze=Math.hypot(ue,Fe,be)||1;F.set([ue/ze,Fe/ze,be/ze],te*3),pe!=null?W.set([J.r,J.g,J.b],te*3):W.set([oe.getX(de),oe.getY(de),oe.getZ(de)],te*3),Z[te]=me===Kn.trim?lv(W[te*3],W[te*3+1],W[te*3+2]):me}}let se=new dt;return se.setAttribute("position",new ht(Y,3)),se.setAttribute("normal",new ht(F,3)),se.setAttribute("color",new ht(W,3)),se.setAttribute("part",new ht(Z,1)),se.computeBoundingSphere(),se},l=new Map,c=(M,D)=>l.get(M)||l.set(M,D()).get(M),h=new Map,u=M=>{let D=h.get(M);if(!D){let Y=new Et;io(Y,_e(0,0,0),M),h.set(M,D=Y.build({outline:!1}))}return D},f=new Map,d=new It(1,1).rotateX(-Math.PI/2).translate(0,.02,0),m=new Lt({map:ah(),transparent:!0,depthWrite:!1,opacity:.8}),y=[],g=M=>{if(M.police){let W=n.sedan||(n.sedan=wh("sedan")),Z=(pe,me,Le,ee,re,oe,de)=>[new Ce(pe,me,Le).translate(ee,re,oe),de],te=c("police",()=>a([[W.paint,16053490,Kn.paint],[W.glass,1910323,Kn.glass],[W.det,null],[...Z(4,.22,1.86,0,.62,0,2052014),Kn.paint],Z(.5,.06,1.2,-.3,1.6,0,2763310)])),J=new Qe(te,o);J.castShadow=!0;let se=new Ct;se.add(J);let Ne=[2780159,16724016].map((pe,me)=>{let Le=new Qe(new Ce(.35,.16,.5),new Lt({color:pe}));return Le.position.set(-.3,1.7,me?.32:-.32),se.add(Le),Le});return y.push([M,Ne]),se}if(M.spec.class==="car"){let W=Bf[M.type]||Bf.car,Z=W[Math.abs(iv(M.id))%W.length],te=n[Z]||(n[Z]=wh(Z)),J=c(`${Z}:${M.color}`,()=>a([[te.paint,M.color,Kn.paint],[te.glass,1910323,Kn.glass],[te.det,null]])),se=new Qe(J,s);return se.scale.set(M.spec.length/Eh[Z].L,1,M.spec.width/1.8*.98),se.castShadow=!0,se.receiveShadow=!0,se}let D=new Qe(u(M.color),e.solid);D.scale.setScalar(1.2),D.castShadow=!0;let Y=new Ct;Y.add(D);let F=new Qe(d,m);return F.scale.set(2.4,1,.9),Y.add(F),Y};for(let M of i.vehicles){let D=new Ct;D.add(g(M)),t.add(D),f.set(M,D)}let p=new Ct,_=[],E=()=>{for(let M of _)p.remove(M);_=Uf.player(e);for(let M of _)M.visible=!1,M.castShadow=!0,p.add(M)};E(),t.add(p),p.scale.setScalar(1.25);let v=new Qe(new It(2.6,2.6).rotateX(-Math.PI/2),new Lt({map:lh(),color:16756800,transparent:!0,depthWrite:!1,opacity:1})),w=new Qe(new gn(.45,.8,4).rotateX(Math.PI),new Lt({color:16752672,depthTest:!1,transparent:!0,opacity:.95}));w.renderOrder=10,t.add(w);let R=new wn([[0,1.2],[.75,0],[.28,.1],[.28,-.9],[-.28,-.9],[-.28,.1],[-.75,0]].map(([M,D])=>new fe(M,D))),x=new Qe(new Dr(R).rotateX(-Math.PI/2),new Lt({color:16756768,depthTest:!1,transparent:!0,opacity:.92}));x.renderOrder=9,t.add(x);let S=new Qe(new ut(1.6,1.6,40,16,1,!0),new Lt({color:16760896,transparent:!0,opacity:.35,blending:Tn,depthWrite:!1,side:Zt}));t.add(S);let N=rv(t,i,e);v.renderOrder=2,t.add(v);let C=sv();t.add(C.mesh);let O=Xs(),T=M=>new Lt({map:O,color:M,transparent:!0,blending:Tn,depthWrite:!1}),U=[0,1].map(()=>new Qe(new It(1,1).rotateX(-Math.PI/2),T(16769704))),P=[0,1].map(()=>new Qe(new It(1,1).rotateX(-Math.PI/2),T(16724e3)));for(let M of[...U,...P])M.renderOrder=3,M.visible=!1,t.add(M);let k=null,H=M=>{let D=null;return f.get(M).traverse(Y=>{!D&&Y.isMesh&&(D=Y)}),D},V=0,$=0;function B(M,D){for(let[re,oe]of f)oe.userData.x===re.x&&oe.userData.y===re.y&&oe.userData.h===re.heading||(oe.position.set(re.x,.14,re.y),oe.rotation.y=-re.heading,oe.userData.x=re.x,oe.userData.y=re.y,oe.userData.h=re.heading);let Y=i.player,F=Y.vehicle,W=F&&F.spec.class==="car";p.visible=!W;let Z=Math.hypot(Y.vx,Y.vy),te=F&&F.spec.class==="bike";_.forEach((re,oe)=>re.visible=oe===(te?1:0));let J=te||Y.stun>0?0:Z;V=(V+M*Th(J))%(Math.PI*2),$+=(Ah(J)-$)*Math.min(1,M*8),Sl.value.set(V,$);let se=F||Y;p.position.set(se.x,te?.14+.35:.14,se.y),p.rotation.y=-(F?F.heading:Y.heading),Y.stun>0?(p.rotation.z=Math.PI/2.4,p.visible=Math.floor(i.time*10)%2===0):p.rotation.z=0,v.visible=!W,v.position.set(se.x,.16,se.y);let Ne=1+.12*Math.sin(i.time*5);v.scale.set(Ne,1,Ne),w.position.set(se.x,(W?3.2:3)+.2*Math.sin(i.time*4),se.y),w.rotation.y=i.time*2;let pe=i.play,me=pe&&pe.target;if(x.visible=S.visible=!!me,me){let re=Math.atan2(me.y-se.y,me.x-se.x),oe=W?4.2:2.4;x.position.set(se.x+Math.cos(re)*oe,.5,se.y+Math.sin(re)*oe),x.rotation.y=-re-Math.PI/2,x.scale.setScalar(W?1.5:1.1),S.position.set(me.x,20,me.y),S.material.opacity=.25+.12*Math.sin(i.time*3)}for(let[re,oe]of y){let de=!!re.ai,ue=Math.floor(i.time*6)%2;oe[0].visible=de?ue===0:!0,oe[1].visible=de?ue===1:!0,oe[0].material.color.setHex(de?3832831:2047887).multiplyScalar(de?18:1),oe[1].material.color.setHex(de?16726586:9379615).multiplyScalar(de?16:1)}let Le=F&&F.spec.class==="car"?F:null;Le!==k&&(k&&!k.police&&(H(k).material=s),Le&&(H(Le).material=o),k=Le),r.head=16*D,r.tail=(i.braking&&Le?24:12)*D,N.update(i.play?i.play.peds:[],M),C.update(i.vehicles);let ee=F&&D>.05;for(let re of[...U,...P])re.visible=!!ee;if(ee){let re=Math.cos(F.heading),oe=Math.sin(F.heading),de=F.spec.length/2,ue=F.spec.class==="car";[-.55,.55].forEach((Fe,be)=>{let ze=ue?11:5,Je=F.x+re*(de+ze/2)-oe*Fe*(ue?1:0),et=F.y+oe*(de+ze/2)+re*Fe*(ue?1:0);U[be].position.set(Je,.17,et),U[be].rotation.y=-F.heading,U[be].scale.set(ze,1,ue?3.2:2.2),U[be].material.opacity=.5*D,U[be].visible=ue||be===0,P[be].position.set(F.x-re*de-oe*Fe,.17,F.y-oe*de+re*Fe),P[be].scale.set(1.4,1,1.4),P[be].material.opacity=(i.braking?.9:.55)*D,P[be].visible=ue})}}function L(){E(),N.load()}return{group:t,update:B,views:f,upgrade:L,player:p,poses:()=>_,crowd:N}}function iv(i){let e=0;for(let t=0;t<i.length;t++)e=e*31+i.charCodeAt(t)|0;return e}function sv(){let e=new It(1,1).rotateX(-Math.PI/2),t=new Lt({color:1710878,transparent:!0,opacity:.5,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),n=new ln(e,t,1200);n.count=0,n.frustumCulled=!1,n.renderOrder=1;let s=0,r=new Map,o=new We,a=new Ot,l=new z(0,1,0);return{mesh:n,update(c){let h=!1;for(let u of c){if(u.spec.class!=="car")continue;let f=Math.cos(u.heading),d=Math.sin(u.heading),m=Math.abs(-u.vx*d+u.vy*f);if(!(u.handbrake&&Math.hypot(u.vx,u.vy)>3||m>2.5)){r.delete(u);continue}let g=u.x-f*u.spec.length*.32,p=u.y-d*u.spec.length*.32,_=u.spec.width*.4,E=[[g+d*_,p-f*_],[g-d*_,p+f*_]],v=r.get(u);if(v)for(let w=0;w<2;w++){let[R,x]=v[w],[S,N]=E[w],C=Math.hypot(S-R,N-x);C<.05||(a.setFromAxisAngle(l,-Math.atan2(N-x,S-R)),o.compose(new z((R+S)/2,.145,(x+N)/2),a,new z(C+.1,1,.26)),n.setMatrixAt(s,o),s=(s+1)%1200,n.count=Math.min(1200,n.count+1),h=!0)}r.set(u,E)}h&&(n.instanceMatrix.needsUpdate=!0)}}}function rv(i,e,t){let s=null,r=new We,o=new Ot,a=new Un,l=new z,c=new z(1,1,1),h=new Pe,u=new WeakMap;return{get sets(){return s},load(){let f=["ped_male","ped_female"].map(d=>Of(d));f.some(d=>!d)||(s=f.map(d=>{let m=d.find(v=>v.mat==="vc"),y=d.find(v=>v.mat==="shirt"),g=m.rig,p=new Ei(new Float32Array(80),2).setUsage(Nc),_=(v,w)=>{v.geo.setAttribute("walk",p);let R=new ln(v.geo,g?ao(w,g):w,40);return g&&(R.customDepthMaterial=Ml(g)),R.count=0,R.castShadow=!0,R.frustumCulled=!1,i.add(R),R},E=y?_(y,new St({roughness:.8})):null;return E&&(E.instanceColor=new Ei(new Float32Array(120).fill(1),3)),{body:_(m,t.solid),shirt:E,walk:p}}))},update(f,d){if(s){for(let m of s)m.body.count=0,m.shirt&&(m.shirt.count=0);for(let m of f){let y=s[m.kind],g=y.body.count;if(g>=40)continue;let p=m.stand||m.down>0?0:m.pace??m.speed,_=u.get(m);_||u.set(m,_={phase:Math.abs(m.x*1.7)%6.28,amt:0}),_.phase=(_.phase+d*Th(p))%(Math.PI*2),_.amt+=(Ah(p)-_.amt)*Math.min(1,d*6),y.walk.setXY(g,_.phase,_.amt),a.set(m.down>0?Math.PI/2:0,-m.heading,0,"YXZ"),o.setFromEuler(a),r.compose(l.set(m.x,.14+(m.down>0?.3:0),m.y),o,c),y.body.setMatrixAt(g,r),y.body.count=g+1,y.shirt&&(y.shirt.setMatrixAt(g,r),y.shirt.setColorAt(g,h.setHex(m.shirt)),y.shirt.count=g+1)}for(let m of s)m.body.instanceMatrix.needsUpdate=!0,m.walk.needsUpdate=!0,m.shirt&&(m.shirt.instanceMatrix.needsUpdate=!0,m.shirt.instanceColor&&(m.shirt.instanceColor.needsUpdate=!0))}}}}var Kn={paint:0,head:1,tail:2,trim:3,glass:4},ov=new Pe(16774352),av=new Pe(13642270);function lv(i,e,t){let n=s=>Math.abs(i-s.r)+Math.abs(e-s.g)+Math.abs(t-s.b)<.03;return n(ov)?Kn.head:n(av)?Kn.tail:Kn.trim}function kf(i){let e=new Us({vertexColors:!0,roughness:.3,metalness:.5,clearcoat:1,clearcoatRoughness:.05,envMapIntensity:2.2});return e.onBeforeCompile=t=>{t.uniforms.uHead={get value(){return i.head}},t.uniforms.uTail={get value(){return i.tail}},t.vertexShader=`attribute float part;
varying float vPart;
`+t.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vPart = part;`),t.fragmentShader=`varying float vPart;
uniform float uHead;
uniform float uTail;
`+t.fragmentShader.replace("#include <metalnessmap_fragment>",`#include <metalnessmap_fragment>
        if (vPart > 3.5) { metalnessFactor = 0.0; roughnessFactor = 0.06; }
        else if (vPart > 0.5) { metalnessFactor = 0.0; roughnessFactor = 0.7; }`).replace("#include <lights_physical_fragment>",`#include <lights_physical_fragment>
if (vPart > 0.5 && vPart < 3.5) material.clearcoat = 0.0;`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
        if (abs(vPart - 1.0) < 0.5) totalEmissiveRadiance += vec3(1.0, 0.92, 0.75) * uHead;
        if (abs(vPart - 2.0) < 0.5) totalEmissiveRadiance += vec3(1.0, 0.06, 0.03) * uTail;`)},e.customProgramCacheKey=()=>"carpaint",e}var Ch={value:new gt(0,0,1.54,2.6)};function fn(i,e=1e4){let t=i.onBeforeCompile,n=i.customProgramCacheKey?i.customProgramCacheKey.bind(i):()=>"";return i.onBeforeCompile=(s,r)=>{t&&t(s,r),s.uniforms.uCut=Ch,s.vertexShader=`varying vec3 vCutP;
`+s.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
      vec4 cutP = vec4(transformed, 1.0);
      #ifdef USE_INSTANCING
        cutP = instanceMatrix * cutP;
      #endif
      vCutP = (modelMatrix * cutP).xyz;`),s.fragmentShader=`uniform vec4 uCut;
varying vec3 vCutP;
`+s.fragmentShader.replace("void main() {",`void main() {
      float cutD = vCutP.z - uCut.y;
      ${e>1e3?"if (cutD > 1.5 && vCutP.y > min(uCut.w + cutD * uCut.z, 2.8)) discard;":`if (cutD > 0.5 && abs(vCutP.x - uCut.x) < ${e.toFixed(1)} && vCutP.y > uCut.w + cutD * uCut.z && fract(sin(dot(floor(gl_FragCoord.xy), vec2(12.9898, 78.233))) * 43758.5453) < 0.72) discard;`}`)},i.customProgramCacheKey=()=>"cut"+e+n(),i}var Ph=i=>new URL(`models/${i}`,document.baseURI).href;async function Hf(){let i=[];try{let r=await fetch(Ph("index.json"));r.ok&&(i=(await r.json()).files||[])}catch{i=[]}let e=r=>i.includes(r)?Ff(Ph(r)).catch(()=>null):null,[t,n,s]=await Promise.all([e("trees.bin"),e("bikes.bin"),e("people.bin")]);if(t&&Sf(t),n&&bl("bikes",n),s){for(let[r,o]of Object.entries(s))r.startsWith("ped_")&&bl(r,o);s.player_stand&&s.player_ride&&bl("player",[s.player_stand,s.player_ride])}}async function Gf(i){let e={};return await Promise.all(["leafA","leafB","barkA","barkB"].map(async t=>{let n=await i(Ph(`tex/${t}.webp`));n&&(n.wrapS=n.wrapT=Vn,e[t]=n)})),e}var $s={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var Sn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},cv=new Ji(-1,1,1,-1,0,1),Ih=class extends dt{constructor(){super(),this.setAttribute("position",new Xe([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Xe([0,2,0,0,2,0],2))}},hv=new Ih,Oi=class{constructor(e){this._mesh=new Qe(hv,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,cv)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var El=class extends Sn{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Dt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=dn.clone(e.uniforms),this.material=new Dt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Oi(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var lo=class extends Sn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},wl=class extends Sn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var Tl=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new fe);this._width=n.width,this._height=n.height,t=new Pt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Nt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new El($s),this.copyPass.material.blending=ai,this.timer=new Br}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let s=0,r=this.passes.length;s<r;s++){let o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){let a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}lo!==void 0&&(o instanceof lo?n=!0:o instanceof wl&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new fe);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Al=class extends Sn{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Pe}render(e,t,n){let s=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=s}};var Vf={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Pe(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var Js=class i extends Sn{constructor(e,t=1,n,s){super(),this.strength=t,this.radius=n,this.threshold=s,this.resolution=e!==void 0?new fe(e.x,e.y):new fe(256,256),this.clearColor=new Pe(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Pt(r,o,{type:Nt,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){let u=new Pt(r,o,{type:Nt,depthBuffer:!1});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);let f=new Pt(r,o,{type:Nt,depthBuffer:!1});f.texture.name="UnrealBloomPass.v"+h,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),o=Math.round(o/2)}let a=Vf;this.highPassUniforms=dn.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Dt({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];let l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new fe(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new z(1,1,1),new z(1,1,1),new z(1,1,1),new z(1,1,1),new z(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=dn.clone($s.uniforms),this.blendMaterial=new Dt({uniforms:this.copyUniforms,vertexShader:$s.vertexShader,fragmentShader:$s.fragmentShader,premultipliedAlpha:!0,blending:Tn,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Pe,this._oldClearAlpha=1,this._basic=new Lt,this._fsQuad=new Oi(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new fe(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(e,t,n,s,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();let o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),a=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let o=0;o<e;o++)t.push(.39894*Math.exp(-.5*o*o/(n*n))/n);let s=[],r=[];for(let o=1;o<e;o+=2){let a=t[o],l=o+1<e?t[o+1]:0,c=a+l;s.push((o*a+(o+1)*l)/c),r.push(c)}return new Dt({defines:{KERNEL_PAIRS:s.length},uniforms:{colorTexture:{value:null},invSize:{value:new fe(.5,.5)},direction:{value:new fe(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:s},gaussianWeights:{value:r}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new Dt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};Js.BlurDirectionX=new fe(1,0);Js.BlurDirectionY=new fe(0,1);var co={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var Rl=class extends Sn{constructor(){super(),this.isOutputPass=!0,this.uniforms=dn.clone(co.uniforms),this.material=new Ns({name:co.name,uniforms:this.uniforms,vertexShader:co.vertexShader,fragmentShader:co.fragmentShader}),this._fsQuad=new Oi(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},at.getTransfer(this._outputColorSpace)===pt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===kr?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===zr?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Hr?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ii?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Vr?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Wr?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Gr&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var ho=class i extends Qe{constructor(){let e=i.SkyShader,t=new Dt({name:e.name,uniforms:dn.clone(e.uniforms),vertexShader:e.vertexShader,fragmentShader:e.fragmentShader,side:Wt,depthWrite:!1});super(new Ce(1,1,1),t),this.isSky=!0}};ho.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new z},cloudScale:{value:2e-4},cloudSpeed:{value:2e-5},cloudCoverage:{value:.4},cloudDensity:{value:.4},cloudElevation:{value:.5},showSunDisc:{value:1},time:{value:0}},vertexShader:`
		uniform vec3 sunPosition;
		uniform float rayleigh;
		uniform float turbidity;
		uniform float mieCoefficient;

		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		// constants for atmospheric scattering
		const float e = 2.71828182845904523536028747135266249775724709369995957;
		const float pi = 3.141592653589793238462643383279502884197169;

		// wavelength of used primaries, according to preetham
		const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
		// this pre-calculation replaces older TotalRayleigh(vec3 lambda) function:
		// (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
		const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

		// mie stuff
		// K coefficient for the primaries
		const float v = 4.0;
		const vec3 K = vec3( 0.686, 0.678, 0.666 );
		// MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
		const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

		// earth shadow hack
		// cutoffAngle = pi / 1.95;
		const float cutoffAngle = 1.6110731556870734;
		const float steepness = 1.5;
		const float EE = 1000.0;

		float sunIntensity( float zenithAngleCos ) {
			zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
			return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
		}

		vec3 totalMie( float T ) {
			float c = ( 0.2 * T ) * 10E-18;
			return 0.434 * c * MieConst;
		}

		void main() {

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vWorldPosition = worldPosition.xyz;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			gl_Position.z = gl_Position.w; // set z to camera.far

			vSunDirection = normalize( sunPosition );

			vSunE = sunIntensity( vSunDirection.y );

			vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

			float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

			// extinction (absorption + out scattering)
			// rayleigh coefficients
			vBetaR = totalRayleigh * rayleighCoefficient;

			// mie coefficients
			vBetaM = totalMie( turbidity ) * mieCoefficient;

		}`,fragmentShader:`
		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		uniform float mieDirectionalG;
		uniform float cloudScale;
		uniform float cloudSpeed;
		uniform float cloudCoverage;
		uniform float cloudDensity;
		uniform float cloudElevation;
		uniform float showSunDisc;
		uniform float time;

		// gradient at a lattice corner; sinless hash so every GPU produces the same clouds
		vec2 gradient( vec2 i ) {
			vec3 p = fract( i.xyx * vec3( 0.1031, 0.1030, 0.0973 ) );
			p += dot( p, p.yzx + 33.33 );
			return fract( ( p.xx + p.yz ) * p.zy ) * 2.0 - 1.0;
		}

		// 2D gradient noise: isotropic lobes like Perlin at value-noise cost
		float noise( vec2 p ) {
			vec2 i = floor( p );
			vec2 f = fract( p );
			vec2 u = f * f * f * ( f * ( f * 6.0 - 15.0 ) + 10.0 ); // quintic fade
			float a = dot( gradient( i ), f );
			float b = dot( gradient( i + vec2( 1.0, 0.0 ) ), f - vec2( 1.0, 0.0 ) );
			float c = dot( gradient( i + vec2( 0.0, 1.0 ) ), f - vec2( 0.0, 1.0 ) );
			float d = dot( gradient( i + vec2( 1.0, 1.0 ) ), f - vec2( 1.0, 1.0 ) );
			return mix( mix( a, b, u.x ), mix( c, d, u.x ), u.y ) * 1.6; // ~[-1,1]
		}

		// fbm; per-octave drift makes clouds billow instead of scrolling as a rigid stamp
		float fbm( vec2 p, float drift ) {
			float result = 0.0;
			float amplitude = 1.0;
			for ( int i = 0; i < 4; i ++ ) {
				result += amplitude * noise( p );
				amplitude *= 0.5;
				p = p * 2.0 + drift;
			}
			return result;
		}

		// constants for atmospheric scattering
		const float pi = 3.141592653589793238462643383279502884197169;

		const float n = 1.0003; // refractive index of air
		const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

		// optical length at zenith for molecules
		const float rayleighZenithLength = 8.4E3;
		const float mieZenithLength = 1.25E3;
		// 66 arc seconds -> degrees, and the cosine of that
		const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

		// 3.0 / ( 16.0 * pi )
		const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
		// 1.0 / ( 4.0 * pi )
		const float ONE_OVER_FOURPI = 0.07957747154594767;

		float rayleighPhase( float cosTheta ) {
			return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
		}

		float hgPhase( float cosTheta, float g ) {
			float g2 = pow( g, 2.0 );
			float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
			return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
		}

		void main() {

			vec3 direction = normalize( vWorldPosition - cameraPosition );

			// optical length
			// cutoff angle at 90 to avoid singularity in next formula.
			float zenithAngle = acos( max( 0.0, direction.y ) );
			float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
			float sR = rayleighZenithLength * inverse;
			float sM = mieZenithLength * inverse;

			// combined extinction factor
			vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

			// in scattering
			float cosTheta = dot( direction, vSunDirection );

			float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
			vec3 betaRTheta = vBetaR * rPhase;

			float mPhase = hgPhase( cosTheta, mieDirectionalG );
			vec3 betaMTheta = vBetaM * mPhase;

			vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
			Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - vSunDirection.y, 5.0 ), 0.0, 1.0 ) );

			// nightsky
			float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
			float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
			vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
			vec3 L0 = vec3( 0.1 ) * Fex;

			// composition + solar disc
			float sundisc = clamp( ( cosTheta - sunAngularDiameterCos ) * 50000.0, 0.0, 1.0 ) * showSunDisc;
			vec3 sundiscColor = ( 760.0 * sundisc ) * min( vSunE * Fex, 80.0 );

			vec3 texColor = ( Lin + L0 ) * 0.04 + sundiscColor + vec3( 0.0, 0.0003, 0.00075 );

			// Clouds
			if ( direction.y > 0.0 && cloudCoverage > 0.0 ) {

				// Project to cloud plane (higher elevation = clouds appear lower/closer)
				float elevation = mix( 1.0, 0.1, cloudElevation );
				vec2 cloudUV = direction.xz / ( direction.y * elevation );
				cloudUV *= cloudScale;
				cloudUV += time * cloudSpeed;

				// Cloud density field
				float evolve = time * cloudSpeed * 300.0;
				float cloudNoise = clamp( fbm( cloudUV * 1000.0, evolve ) * 0.7 + 0.5, 0.0, 1.0 );

				// Large-scale coverage variation: clear gaps next to dense banks
				float region = noise( cloudUV * 300.0 ) * 0.37 + 0.5;
				float cov = clamp( cloudCoverage + ( region - 0.5 ) * 0.6, 0.0, 1.0 );

				// Carve clouds where noise rises above the coverage level
				float threshold = 1.0 - cov;
				float cloudMask = smoothstep( threshold, threshold + 0.3, cloudNoise );

				// Fade clouds near horizon (adjusted by elevation)
				float horizonFade = smoothstep( 0.0, 0.03 + 0.06 * cloudElevation, direction.y );
				cloudMask *= horizonFade;

				// Cloud lighting from the sky's own radiance
				float dayFactor = smoothstep( -0.08, 0.3, vSunDirection.y );
				vec3 sunColor = vSunE * Fex * 0.22 * 0.04; // 0.22 ~ albedo/pi, 0.04 = exposure; the aerial composite adds the eye-leg extinction
				vec3 skyAmbient = Lin * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

				// Beer-powder self-shadow from the sampled density
				float depth = max( 0.0, cloudNoise - threshold );
				float beer = exp( depth * -4.0 );
				float powder = 1.0 - beer * beer; // beer*beer == exp(-8*depth)
				float shade = mix( 0.45, 1.0, clamp( beer * powder * 2.6, 0.0, 1.0 ) ); // 2.6 = 1/0.385, normalizes beer*powder peak to 1

				// Henyey-Greenstein forward lobe ( g = 0.7 ): silver lining on rims toward the sun
				float silver = clamp( 0.51 / pow( 1.49 - cosTheta * 1.4, 1.5 ), 0.0, 3.0 ); // 0.51=1-g^2, 1.49=1+g^2, 1.4=2g
				float edge = cloudMask * ( 1.0 - cloudMask ) * 4.0;

				vec3 cloudColor = skyAmbient + sunColor * shade;
				cloudColor += sunColor * silver * edge * 0.6;
				cloudColor *= max( dayFactor, 0.03 );

				// Cloud opacity via Beer's law: density sets how solid the clouds get
				float alpha = ( 1.0 - exp( depth * cloudDensity * -12.0 ) ) * horizonFade;

				// Occlude the sun disc/glow behind opaque cloud
				texColor -= L0 * 0.04 * alpha;

				// Composite through the atmosphere so distant clouds dissolve into haze
				vec3 cloudAerial = mix( texColor, cloudColor, Fex );
				texColor = mix( texColor, cloudAerial, alpha );

			}

			gl_FragColor = vec4( texColor, 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};var Cl=class extends Qe{constructor(e,t={}){super(e),this.isWater=!0;let n=this,s=t.textureWidth!==void 0?t.textureWidth:512,r=t.textureHeight!==void 0?t.textureHeight:512,o=t.clipBias!==void 0?t.clipBias:0,a=t.alpha!==void 0?t.alpha:1,l=t.time!==void 0?t.time:0,c=t.waterNormals!==void 0?t.waterNormals:null,h=t.sunDirection!==void 0?t.sunDirection:new z(.70707,.70707,0),u=new Pe(t.sunColor!==void 0?t.sunColor:16777215),f=new Pe(t.waterColor!==void 0?t.waterColor:8355711),d=t.eye!==void 0?t.eye:new z(0,0,0),m=t.distortionScale!==void 0?t.distortionScale:20,y=t.side!==void 0?t.side:Zn,g=t.fog!==void 0?t.fog:!1,p=new an,_=new z,E=new z,v=new z,w=new We,R=new z(0,0,-1),x=new gt,S=new z,N=new z,C=new gt,O=new We,T=new qt,U=new Pt(s,r,{type:Nt}),P={name:"MirrorShader",uniforms:dn.merge([Ie.fog,Ie.lights,{normalSampler:{value:null},mirrorSampler:{value:null},alpha:{value:1},time:{value:0},size:{value:1},distortionScale:{value:20},textureMatrix:{value:new We},sunColor:{value:new Pe(8355711)},sunDirection:{value:new z(.70707,.70707,0)},eye:{value:new z},waterColor:{value:new Pe(5592405)}}]),vertexShader:`
				uniform mat4 textureMatrix;
				uniform float time;

				varying vec4 mirrorCoord;
				varying vec4 worldPosition;

				#include <common>
				#include <fog_pars_vertex>
				#include <shadowmap_pars_vertex>
				#include <logdepthbuf_pars_vertex>

				void main() {
					mirrorCoord = modelMatrix * vec4( position, 1.0 );
					worldPosition = mirrorCoord.xyzw;
					mirrorCoord = textureMatrix * mirrorCoord;
					vec4 mvPosition =  modelViewMatrix * vec4( position, 1.0 );
					gl_Position = projectionMatrix * mvPosition;

				#include <beginnormal_vertex>
				#include <defaultnormal_vertex>
				#include <logdepthbuf_vertex>
				#include <fog_vertex>
				#include <shadowmap_vertex>
			}`,fragmentShader:`
				uniform sampler2D mirrorSampler;
				uniform float alpha;
				uniform float time;
				uniform float size;
				uniform float distortionScale;
				uniform sampler2D normalSampler;
				uniform vec3 sunColor;
				uniform vec3 sunDirection;
				uniform vec3 eye;
				uniform vec3 waterColor;

				varying vec4 mirrorCoord;
				varying vec4 worldPosition;

				vec4 getNoise( vec2 uv ) {
					vec2 uv0 = ( uv / 103.0 ) + vec2(time / 17.0, time / 29.0);
					vec2 uv1 = uv / 107.0-vec2( time / -19.0, time / 31.0 );
					vec2 uv2 = uv / vec2( 8907.0, 9803.0 ) + vec2( time / 101.0, time / 97.0 );
					vec2 uv3 = uv / vec2( 1091.0, 1027.0 ) - vec2( time / 109.0, time / -113.0 );
					vec4 noise = texture2D( normalSampler, uv0 ) +
						texture2D( normalSampler, uv1 ) +
						texture2D( normalSampler, uv2 ) +
						texture2D( normalSampler, uv3 );
					return noise * 0.5 - 1.0;
				}

				void sunLight( const vec3 surfaceNormal, const vec3 eyeDirection, float shiny, float spec, float diffuse, inout vec3 diffuseColor, inout vec3 specularColor ) {
					vec3 reflection = normalize( reflect( -sunDirection, surfaceNormal ) );
					float direction = max( 0.0, dot( eyeDirection, reflection ) );
					specularColor += pow( direction, shiny ) * sunColor * spec;
					diffuseColor += max( dot( sunDirection, surfaceNormal ), 0.0 ) * sunColor * diffuse;
				}

				#include <common>
				#include <packing>
				#include <bsdfs>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <lights_pars_begin>
				#include <shadowmap_pars_fragment>
				#include <shadowmask_pars_fragment>

				void main() {

					#include <logdepthbuf_fragment>
					vec4 noise = getNoise( worldPosition.xz * size );
					vec3 surfaceNormal = normalize( noise.xzy * vec3( 1.5, 1.0, 1.5 ) );

					vec3 diffuseLight = vec3(0.0);
					vec3 specularLight = vec3(0.0);

					vec3 worldToEye = eye-worldPosition.xyz;
					vec3 eyeDirection = normalize( worldToEye );
					sunLight( surfaceNormal, eyeDirection, 100.0, 2.0, 0.5, diffuseLight, specularLight );

					float distance = length(worldToEye);

					vec2 distortion = surfaceNormal.xz * ( 0.001 + 1.0 / distance ) * distortionScale;
					vec3 reflectionSample = vec3( texture2D( mirrorSampler, mirrorCoord.xy / mirrorCoord.w + distortion ) );

					float theta = max( dot( eyeDirection, surfaceNormal ), 0.0 );
					float rf0 = 0.02;
					float reflectance = rf0 + ( 1.0 - rf0 ) * pow( ( 1.0 - theta ), 5.0 );
					vec3 scatter = max( 0.0, dot( surfaceNormal, eyeDirection ) ) * waterColor;
					vec3 albedo = mix( ( sunColor * diffuseLight * 0.3 + scatter ) * getShadowMask(), reflectionSample + specularLight, reflectance );
					vec3 outgoingLight = albedo;
					gl_FragColor = vec4( outgoingLight, alpha );

					#include <tonemapping_fragment>
					#include <colorspace_fragment>
					#include <fog_fragment>	
				}`},k=new Dt({name:P.name,uniforms:dn.clone(P.uniforms),vertexShader:P.vertexShader,fragmentShader:P.fragmentShader,lights:!0,side:y,fog:g});k.uniforms.mirrorSampler.value=U.texture,k.uniforms.textureMatrix.value=O,k.uniforms.alpha.value=a,k.uniforms.time.value=l,k.uniforms.normalSampler.value=c,k.uniforms.sunColor.value=u,k.uniforms.waterColor.value=f,k.uniforms.sunDirection.value=h,k.uniforms.distortionScale.value=m,k.uniforms.eye.value=d,n.material=k,n.onBeforeRender=function(H,V,$){if(E.setFromMatrixPosition(n.matrixWorld),v.setFromMatrixPosition($.matrixWorld),w.extractRotation(n.matrixWorld),_.set(0,0,1),_.applyMatrix4(w),S.subVectors(E,v),S.dot(_)>0)return;S.reflect(_).negate(),S.add(E),w.extractRotation($.matrixWorld),R.set(0,0,-1),R.applyMatrix4(w),R.add(v),N.subVectors(E,R),N.reflect(_).negate(),N.add(E),T.position.copy(S),T.up.set(0,1,0),T.up.applyMatrix4(w),T.up.reflect(_),T.lookAt(N),T.far=$.far,T.updateMatrixWorld(),T.projectionMatrix.copy($.projectionMatrix),O.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),O.multiply(T.projectionMatrix),O.multiply(T.matrixWorldInverse),p.setFromNormalAndCoplanarPoint(_,E),p.applyMatrix4(T.matrixWorldInverse),x.set(p.normal.x,p.normal.y,p.normal.z,p.constant);let B=T.projectionMatrix;C.x=(Math.sign(x.x)+B.elements[8])/B.elements[0],C.y=(Math.sign(x.y)+B.elements[9])/B.elements[5],C.z=-1,C.w=(1+B.elements[10])/B.elements[14],x.multiplyScalar(2/x.dot(C)),B.elements[2]=x.x,B.elements[6]=x.y,B.elements[10]=x.z+1-o,B.elements[14]=x.w,d.setFromMatrixPosition($.matrixWorld);let L=H.getRenderTarget(),M=H.xr.enabled,D=H.shadowMap.autoUpdate;n.visible=!1,H.xr.enabled=!1,H.shadowMap.autoUpdate=!1,H.setRenderTarget(U),H.state.buffers.depth.setMask(!0),H.autoClear===!1&&H.clear(),H.render(V,T),n.visible=!0,H.xr.enabled=M,H.shadowMap.autoUpdate=D,H.setRenderTarget(L);let Y=$.viewport;Y!==void 0&&H.state.viewport(Y)}}};var Lh={strength:.5,radius:.45,threshold:2.6};function Wf(i,e,t){let n=new Pt(1,1,{type:Nt,samples:4}),s=new Tl(i,n);s.addPass(new Al(e,t));let r=new Js(new fe(256,256),Lh.strength,Lh.radius,Lh.threshold),o=1,a=r.setSize.bind(r);r.setSize=(c,h)=>a(Math.max(1,Math.round(c*o)),Math.max(1,Math.round(h*o))),s.addPass(r),s.addPass(new Rl);let l=!0;return{composer:s,bloom:r,set(c,h){l=c,o=h},get on(){return l},setSize(c,h,u){s.setPixelRatio(u),s.setSize(c,h)},render(c){l?s.render(c):i.render(e,t)}}}function Xf(i){let e=new ss(i),t=new Mi,n=new ho;n.scale.setScalar(50),t.add(n);let s=n.material.uniforms;s.turbidity.value=6,s.rayleigh.value=1.6,s.mieCoefficient.value=.006,s.mieDirectionalG.value=.86;let r=new Qe(new Er(60,24).rotateX(-Math.PI/2),new Lt({color:3814188}));r.position.y=-1.5,t.add(r);let o=new is(8,{type:un}),a=new Pi(.1,200,o),l=new Float32Array(256),c=()=>{a.update(i,t);let d=0;for(let m=0;m<6;m++){i.readRenderTargetPixels(o,0,0,8,8,l,m);for(let y=0;y<l.length;y+=4)d+=.2126*l[y]+.7152*l[y+1]+.0722*l[y+2]}return d/384||1},h=null,u="",f=1;return{get texture(){return h},get level(){return f},update(d,m,y){let g=`${d.toFixed(1)}:${m.toFixed(0)}:${y.toFixed(2)}`;if(g===u)return!1;u=g;let p=kn.degToRad(90-d),_=kn.degToRad(m);s.sunPosition.value.setFromSphericalCoords(1,p,Math.PI-_),s.rayleigh.value=1.6+1.4*y,s.turbidity.value=6+4*y,r.material.color.setHex(3814188).multiplyScalar(1-.5*y);let E=i.toneMapping;i.toneMapping=An,f=c(),i.toneMapping=E;let v=e.fromScene(t,.02,.1,200);return h&&h.dispose(),h=v.texture,!0}}}function uv(i=128){let e=new Uint8Array(i*i*4),t=[[1,2,.6,.3],[3,-1,.35,1.7],[-2,5,.22,4.1],[6,3,.12,2.2],[-7,-4,.08,.9]];for(let s=0;s<i;s++)for(let r=0;r<i;r++){let o=0,a=0;for(let[h,u,f,d]of t){let m=(h*r+u*s)/i*Math.PI*2+d,y=Math.cos(m)*f;o+=y*h*.05,a+=y*u*.05}let l=Math.hypot(o,a,1),c=(s*i+r)*4;e[c]=Math.round(-o/l*127.5+127.5),e[c+1]=Math.round(-a/l*127.5+127.5),e[c+2]=Math.round(1/l*127.5+127.5),e[c+3]=255}let n=new Yi(e,i,i,yn);return n.wrapS=n.wrapT=Vn,n.generateMipmaps=!0,n.minFilter=On,n.magFilter=Yt,n.needsUpdate=!0,n}function qf(i,e,t,n){let s=i.cells?i.G.water:-1,r=16,o=Math.ceil(i.width/r),a=Math.ceil(i.height/r),l=new Uint8Array(o*a),c=1/0,h=1/0,u=-1/0,f=-1/0;if(i.cells)for(let g=0;g<i.height;g+=2)for(let p=0;p<i.width;p+=2)i.cells[g*i.width+p]===s&&(l[Math.floor(g/r)*o+Math.floor(p/r)]=1,c=Math.min(c,p),h=Math.min(h,g),u=Math.max(u,p),f=Math.max(f,g));let d=null,m=()=>{if(d||u<c)return d;let g=u-c+20,p=f-h+20;d=new Cl(new It(g,p),{textureWidth:512,textureHeight:512,waterNormals:uv(),sunDirection:t.clone(),sunColor:16756848,waterColor:2773606,distortionScale:.9,fog:!0}),d.rotation.x=-Math.PI/2,d.position.set((c+u)/2,e.position.y+.01,(h+f)/2),d.material.uniforms.size.value=6,d.visible=!1;let _=d.onBeforeRender,E=!1;return d.onBeforeRender=(v,w,R)=>{if(E=!E,E&&!d.userData.always)return;let x=w.background,S=w.backgroundIntensity;w.background=n()||x,w.backgroundIntensity=w.environmentIntensity,_(v,w,R),w.background=x,w.backgroundIntensity=S},e.parent.add(d),d},y=(g,p,_,E)=>{let v=Math.max(0,Math.floor(g/r)),w=Math.min(o-1,Math.floor(_/r)),R=Math.max(0,Math.floor(p/r)),x=Math.min(a-1,Math.floor(E/r));for(let S=R;S<=x;S++)for(let N=v;N<=w;N++)if(l[S*o+N])return!0;return!1};return{get mirror(){return d},prepare(){let g=m();return g&&(g.visible=!0,g.userData.always=!0),()=>{g&&(g.visible=!1,g.userData.always=!1)}},update(g,p,_,E,v,w,R){let x=p&&y(_,E,v,w);if(x&&m(),e.visible=!x,d&&(d.visible=x,x)){let S=d.material.uniforms;S.time.value+=g*.35,S.sunDirection.value.copy(R.dir),S.sunColor.value.copy(R.color)}return x}}}var Dh=kn.degToRad(33),Nh=.3,dv=.32,Yf=24,fv=i=>new URL(`stiltest/tex/${i}.webp`,document.baseURI).href,pv=i=>new URL(`stiltest/tex/small/${i}.webp`,document.baseURI).href,$f={value:.25};function mv(i){return i.onBeforeCompile=e=>{e.uniforms.uLit=$f,e.fragmentShader=`uniform float uLit;
`+e.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
      #ifdef USE_INSTANCING_COLOR
        totalEmissiveRadiance += vColor * step(0.97, vColor.r) * uLit;
      #endif`)},i.customProgramCacheKey=()=>"litwin",i}var rs={low:{name:"L\xE5g",ratio:1,shadow:0,bloom:0,mirror:!1},medium:{name:"Medel",ratio:1.5,shadow:1024,bloom:.5,mirror:!1},high:{name:"H\xF6g",ratio:2,shadow:2048,bloom:1,mirror:!0}},Cn={dayElev:21,eveElev:4.5,az:262},Zf=(i,e,t)=>{let n=kn.degToRad(i),s=kn.degToRad(e);return t.set(Math.sin(s)*Math.cos(n),Math.sin(n),-Math.cos(s)*Math.cos(n))};async function Jf(i,e){let t=new ul({antialias:!0,powerPreference:"high-performance"});t.outputColorSpace=At,t.toneMapping=Ii,t.toneMappingExposure=1.15,t.shadowMap.enabled=!0,t.shadowMap.type=Qi,i.appendChild(t.domElement);let n=["asphalt","slabs","grass","plaster","roof","foliage"],s=(Z,te)=>(globalThis.__times||(globalThis.__times=[])).push([Z,Math.round(performance.now()-te)]),r=performance.now(),o=Object.fromEntries(await Promise.all(n.map(async Z=>[Z,await no(pv(Z))]))),a=new Pe(14267530),l=new Mi;l.background=a,l.fog=new xr(a,.005),s("textures",r),r=performance.now();let c=Xf(t);c.update(Cn.dayElev,Cn.az,0),l.environment=c.texture,l.environmentIntensity=Nh/c.level,s("env",r);let h={asphalt:ui(o.asphalt,6,{vertexColors:!0,roughness:.92,vary:.7}),slabs:ui(o.slabs,4,{vertexColors:!0,roughness:.88,vary:.5}),grass:ui(o.grass,4,{vertexColors:!0,roughness:1,vary:.8}),wall:fn(ui(o.plaster,5,{vertexColors:!0,roughness:.95,vary:.6})),roof:fn(ui(o.roof,.7,{vertexColors:!0,roughness:.8,vary:.9})),leaf:fn(ui(o.foliage,3.6,{vertexColors:!0,roughness:.9,triplanar:!0,mapNormal:!0}),4.5),hedge:fn(ui(o.foliage,2.4,{vertexColors:!0,roughness:.9,triplanar:!0}),4.5),wood:fn(new St({vertexColors:!0,roughness:.95}),4.5),plain:fn(new St({vertexColors:!0,roughness:.75,envMapIntensity:.4})),solid:new St({vertexColors:!0,roughness:.75,envMapIntensity:.4}),paint:new St({vertexColors:!0,roughness:.6,color:15131612,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),trimI:fn(new St({roughness:.7,envMapIntensity:.4})),darkI:fn(new St({roughness:.9,envMapIntensity:.3})),glassI:fn(mv(new St({roughness:.12,metalness:.3,envMapIntensity:.9}))),lantern:fn(new Lt({color:16773320})),halo:new Lt({map:Xs(),color:0,transparent:!0,blending:Tn,depthWrite:!1})},u=Z=>Z?fn(new St({map:Z,alphaTest:.45,side:Zt,vertexColors:!0,roughness:.85,envMapIntensity:.5}),4.5):h.leaf,f=Z=>Z?fn(new St({map:Z,vertexColors:!0,roughness:.95}),4.5):h.wood;Object.assign(h,{leafV:fn(new St({vertexColors:!0,roughness:.9}),4.5),vc:h.solid});let d=e.map,m=Rf(d,h);l.add(m.group),l.add(If(d,h)),l.add(Lf(d)),m.update(e.player.x,e.player.y,1/0);let y=new Qe(new It(d.width+40,d.height+40).rotateX(-Math.PI/2),new St({color:2377818,roughness:.06,metalness:.3,envMapIntensity:1.6}));y.position.set(d.width/2,-.85,d.height/2),y.receiveShadow=!0,l.add(y);let g=new Ct,p=200;for(let[Z,te,J,se]of[[-p/2,d.height/2,p,d.height+p*2],[d.width+p/2,d.height/2,p,d.height+p*2],[d.width/2,-p/2,d.width,p],[d.width/2,d.height+p/2,d.width,p]]){let Ne=new It(J,se).rotateX(-Math.PI/2),pe=new Float32Array(Ne.attributes.position.count*3).fill(.75);Ne.setAttribute("color",new ht(pe,3));let me=new Qe(Ne,h.grass);me.position.set(Z,.08,te),me.receiveShadow=!0,g.add(me)}l.add(g);let _=new Lt({map:Xs(),color:16760944,transparent:!0,blending:Tn,depthWrite:!1,opacity:.3}),E=new ln(new It(1,1).rotateX(-Math.PI/2),_,d.lamps.length);d.lamps.forEach((Z,te)=>{let J=new We().compose(new z(Z.x+(Z.ax||0)*1.1,.14,Z.y+(Z.ay||0)*1.1),new Ot,new z(7,1,7));E.setMatrixAt(te,J)}),E.renderOrder=2,l.add(E);let v=zf(e,h);l.add(v.group);let w=new Ki(16754760,8.2);w.castShadow=!0,w.shadow.bias=-4e-4,w.shadow.normalBias=.05,w.shadow.radius=3;let R=Zf(Cn.dayElev,Cn.az,new z);l.add(w,w.target);let x=qf(d,y,R,()=>c.texture),S=new Bs(11841728,8016948,.85);l.add(S);let N=new Ki(10135760,.3);N.position.set(60,30,-10),l.add(N);let C=new qt(Yf,1,4,260),O=Wf(t,l,C),T={x:e.player.x,z:e.player.y,metres:0},U="medium";function P(Z){U=Z;let te=rs[Z];t.setPixelRatio(Math.min(window.devicePixelRatio||1,te.ratio)),w.castShadow=te.shadow>0,O.set(te.bloom>0,te.bloom),te.shadow&&(w.shadow.mapSize.set(te.shadow,te.shadow),w.shadow.map&&(w.shadow.map.dispose(),w.shadow.map=null)),k()}function k(){let Z=i.clientWidth||window.innerWidth,te=i.clientHeight||window.innerHeight;t.setSize(Z,te,!1),t.domElement.style.width="100%",t.domElement.style.height="100%",C.aspect=Z/te,C.updateProjectionMatrix(),O.setSize(Z,te,t.getPixelRatio())}window.addEventListener("resize",k),P("medium");function H(){let Z=e.player.vehicle;if(!Z)return 24;let te=Math.hypot(Z.vx,Z.vy);return Z.spec.class==="car"?28+te*.6:26+te*.5}let V={sun:new Pe(16754760),sky:new Pe(11841728),ground:new Pe(8016948),haze:new Pe(13610636)},$={sun:new Pe(16738852),sky:new Pe(5531808),ground:new Pe(2761776),haze:new Pe(6180952)},B={dir:R,color:new Pe},L=new z,M=new z,D=new z(0,1,0),Y=-1;function F(Z){let te=e.player,J=te.vehicle||te,se=te.vehicle?1.1:.25,Ne=(T.metres||24)*.32,pe=J.vx*se,me=J.vy*se,Le=Math.hypot(pe,me);Le>Ne&&(pe*=Ne/Le,me*=Ne/Le);let ee=J.x+pe,re=J.y+me,oe=1-Math.exp(-6*Z);T.metres===0&&(T.x=ee,T.z=re,T.metres=H()),T.x+=(ee-T.x)*oe,T.z+=(re-T.z)*oe,T.metres+=(H()-T.metres)*(1-Math.exp(-2*Z));let de=0,ue=0;e.shake>0&&(de=(Math.random()-.5)*e.shake*.6,ue=(Math.random()-.5)*e.shake*.6);let Fe=T.metres/2/Math.tan(kn.degToRad(Yf/2));C.position.set(T.x+de,Math.cos(Dh)*Fe,T.z+Math.sin(Dh)*Fe+ue),C.lookAt(T.x+de,0,T.z+ue);let be=performance.now();W.debugTop?m.update(W.debugTop.x,W.debugTop.y,1e3):m.update(T.x,T.z-T.metres*.3,Math.min(30,Math.max(2,Z*250))),W.buildMs=performance.now()-be,C.far=Fe*2.4+40,C.updateProjectionMatrix(),l.fog.density=(.17+.12*Y)/Fe,Ch.value.set(J.x,J.y,1/Math.tan(Dh),.9);let ze=Math.ceil((Math.hypot(T.metres*1.2,T.metres*.8)+6)/4)*4,Je=R.y,et=Math.sqrt(1-Je*Je),X=w.shadow.camera;X.left=-ze,X.right=ze,X.top=Math.ceil(ze*Je+34*et),X.bottom=-Math.ceil(ze*Je+3);let wt=60+100*et*et;X.near=1,X.far=wt+ze*2+40,X.updateProjectionMatrix(),L.crossVectors(R,D).normalize(),M.crossVectors(L,R).normalize();let nt=w.shadow.mapSize.x||1024,xt=2*ze/nt,ve=(X.top-X.bottom)/nt,yt=w.target.position.set(T.x,0,T.z-4),Ve=yt.dot(L),Ze=yt.dot(M);yt.addScaledVector(L,Math.round(Ve/xt)*xt-Ve).addScaledVector(M,Math.round(Ze/ve)*ve-Ze),w.position.copy(yt).addScaledVector(R,wt);let I=mu(e.time+(e.clockOffset||0));if(Math.abs(I-Y)>.002){Y=I,Zf(Cn.dayElev+(Cn.eveElev-Cn.dayElev)*I,Cn.az,R),w.shadow.bias=-4e-4-9e-4*I,w.shadow.normalBias=.05+.1*I,w.intensity=8.2*(1-.45*I),w.color.copy(V.sun).lerp($.sun,I),B.color.copy(w.color).multiplyScalar(.6+.4*(1-I)),S.color.copy(V.sky).lerp($.sky,I),S.groundColor.copy(V.ground).lerp($.ground,I),S.intensity=.75-.15*I,N.intensity=.3*(1-.6*I),l.background.copy(V.haze).lerp($.haze,I),l.fog.color.copy(l.background),t.toneMappingExposure=1.15-.1*I;let K=Math.round(I*4)/4;c.update(Cn.dayElev+(Cn.eveElev-Cn.dayElev)*K,Cn.az,K)&&(l.environment=c.texture),l.environmentIntensity=(Nh+(dv-Nh)*I)/c.level,_.opacity=.08+.4*I,$f.value=.25+5*I,h.lantern.color.setRGB(1,.94,.78).multiplyScalar(.9+20*I),h.halo.color.setRGB(1,.8,.52).multiplyScalar(7*I),h.halo.visible=I>.02,v.night=I}v.update(Z,I);let b=T.metres;W.mirror=x.update(Z,rs[U].mirror&&!W.debugTop,T.x-b*1.2,T.z-b*.95,T.x+b*1.2,T.z+b*.7,B),W.debugTop&&(C.position.set(W.debugTop.x,W.debugTop.h,W.debugTop.y+W.debugTop.h*.6),C.lookAt(W.debugTop.x,0,W.debugTop.y),C.far=W.debugTop.h*2,l.fog.density=0,C.updateProjectionMatrix()),O.render(Z)}O.on&&t.setRenderTarget(O.composer.renderTarget1),t.compileAsync&&await t.compileAsync(l,C).catch(()=>{}),t.setRenderTarget(null),setTimeout(()=>{let Z=x.prepare();x.mirror&&(t.setRenderTarget(O.on?O.composer.renderTarget1:null),t.compile(x.mirror,C,l),x.mirror.onBeforeRender(t,l,C),t.setRenderTarget(null)),Z()},2500);let W={frame:F,renderer:t,scene:l,camera:C,setQuality:P,get quality(){return U},city:m,ents:v,post:O,river:x,async upgradeModels(){let[,Z]=await Promise.all([Hf(),Gf(no)]);Object.assign(h,{leafA:u(Z.leafA),leafB:u(Z.leafB),barkA:f(Z.barkA),barkB:f(Z.barkB)}),m.rebuildTrees(),v.upgrade()},async upgradeTextures(){await Promise.all(n.map(async Z=>{let te=await no(fv(Z)),J=o[Z];!te||!J||(J.dispose(),J.image=te.image,J.needsUpdate=!0)}))}};return W}var gv="3D-grafiken slutade fungera i webbl\xE4saren. Det kan hj\xE4lpa att prova en annan webbl\xE4sare, till exempel Chrome.",Kf="3D-grafiken kunde inte starta i webbl\xE4saren. Det kan hj\xE4lpa att prova en annan webbl\xE4sare, till exempel Chrome.";function Qf(){try{return!!document.createElement("canvas").getContext("webgl2")}catch{return!1}}function Uh(i){let e=document.getElementById("gl-fail");if(!e){e=document.createElement("div"),e.id="gl-fail",e.setAttribute("role","alert"),e.style.cssText='position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;padding:24px;background:#1d1e20f2;color:#f2f1ee;font:18px/1.45 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;text-align:center';let t=document.createElement("p");t.style.cssText="max-width:520px;margin:0",e.appendChild(t),document.body.appendChild(e)}e.firstChild.textContent=i,e.hidden=!1}function jf(i,e){i.addEventListener("webglcontextlost",t=>{t.preventDefault(),e(),Uh(gv)})}var tt=i=>document.getElementById(i),Pl=i=>(globalThis.__marks||(globalThis.__marks=[])).push([i,Math.round(performance.now())]);Pl("module");async function _v(){let i={surface:tt("hud"),joy:tt("joy"),knob:tt("joy-knob"),action:tt("btn-action"),brake:tt("btn-brake"),speed:tt("speed"),toast:tt("toast")};for(let S of document.querySelectorAll("[data-version]"))S.textContent=`v${Yh}`;let e=await Zh(new URL("data/map/centrum.json",document.baseURI).href),t=ru(e),n=Qh(t),s=new URLSearchParams(location.search);s.has("kvall")&&(t.clockOffset=.6*600);let r=du(i),o=fu(i);if(Pl("game"),!Qf()){Uh(Kf);return}let a=await Jf(tt("game"),t),l=!1;jf(a.renderer.domElement,()=>{l=!0,tt("fps").hidden=!0,window.__fyriskaos&&(window.__fyriskaos.glLost=!0)}),Pl("city");let c={quality:s.get("q")||"auto",fps:s.has("fps"),steer:s.get("styrning")==="klassisk"?"classic":"screen"};r.touchSteer=c.steer;let h=tt("fps"),u=()=>{tt("set-fps").textContent=c.fps?"Visa fps: p\xE5":"Visa fps: av",tt("set-quality").textContent=`Grafik: ${c.quality==="auto"?`auto (${rs[a.quality].name})`:rs[c.quality].name}`,tt("set-steer").textContent=c.steer==="screen"?"Styrning: \xE5t h\xE5llet du drar":"Styrning: klassisk",h.hidden=!c.fps};tt("btn-settings").addEventListener("click",()=>{tt("settings").hidden=!tt("settings").hidden,u()}),tt("set-close").addEventListener("click",()=>tt("settings").hidden=!0),tt("set-fps").addEventListener("click",()=>{c.fps=!c.fps,u()}),tt("set-steer").addEventListener("click",()=>{c.steer=c.steer==="screen"?"classic":"screen",r.touchSteer=c.steer,u()}),tt("set-quality").addEventListener("click",()=>{let S=["auto","low","medium","high"];c.quality=S[(S.indexOf(c.quality)+1)%S.length],c.quality!=="auto"&&a.setQuality(c.quality),u()}),c.quality!=="auto"&&rs[c.quality]&&a.setQuality(c.quality),u(),tt("set-credits").addEventListener("click",()=>tt("credits").hidden=!1),tt("credits-close").addEventListener("click",()=>tt("credits").hidden=!0);let f="";function d(S){let N=S.mission,C=S.target,O=C?Math.round(Math.hypot(C.x-t.player.x,C.y-t.player.y)):0,T="",U="";N&&N.step==="pickup"?(T="Nattmackorna",U=`H\xE4mta mackorna p\xE5 Mackbaren \xB7 ${O} m`):N&&N.step==="deliver"&&(T=`Nattmackorna \xB7 ${Math.max(0,Math.ceil(N.time))} s`,U=`${N.sandwiches} mackor till ${N.label} \xB7 ${O} m`);let P=[S.money,S.stars,Math.round(S.health/5),T,U,S.phone&&S.phone.text,S.ticket>0].join("|");P!==f&&(f=P,tt("money").textContent=`${S.money} kr`,tt("stars").textContent=S.stars?"\u2605".repeat(S.stars)+"\u2606".repeat(3-S.stars):"",tt("health").firstChild.style.width=`${Math.max(0,S.health)}%`,tt("mission").hidden=!T,tt("mission-title").textContent=T,tt("mission-info").textContent=U,tt("phone").hidden=!S.phone,S.phone&&(tt("phone-from").textContent=`SMS fr\xE5n ${S.phone.from}`,tt("phone-text").textContent=S.phone.text),tt("ticket").hidden=!(S.ticket>0))}let m={cpu:[],build:[],frames:0},y=0,g=performance.now(),p=0,_=0,E=0,v=0,w=-99,R=0;function x(S){if(l)return;let N=Math.min((S-g)/1e3,.1);g=S;let C=performance.now();for(y+=N,r.update();y>=Qs;){uu(t,r,Qs);let O=t.events.splice(0);r.enabled&&n.step(Qs,O);for(let T of O)T.type==="toast"&&o.toast(T.text);y-=Qs}if(d(n.state),a.frame(N),o.update(t,r.enabled?lu(t):null,N),m.cpu.push(performance.now()-C),m.build.push(a.buildMs||0),m.cpu.length>1200&&(m.cpu.shift(),m.build.shift()),m.frames++,R+=N,p++,_+=N,_>=.5){let O=p/_;if(p=0,_=0,c.fps&&(h.textContent=`${Math.round(O)} fps \xB7 ${rs[a.quality].name}`),c.quality==="auto"&&R>3){let T=["low","medium","high"],U=T.indexOf(a.quality);E=O<50?E+.5:0,v=O>=59?v+.5:0,E>=1&&U>0?(a.setQuality(T[U-1]),E=0,w=R,tt("settings").hidden||u()):v>=8&&U<2&&R-w>20&&(a.setQuality(T[U+1]),v=0,tt("settings").hidden||u())}}requestAnimationFrame(x)}requestAnimationFrame(S=>{g=S;let N=performance.now();x(S),(globalThis.__times||(globalThis.__times=[])).push(["firstFrame",Math.round(performance.now()-N)]),Pl("firstFrame"),setTimeout(()=>{a.upgradeModels().then(()=>window.__fyriskaos.modelsReady=!0),a.upgradeTextures()},200)}),tt("btn-start").addEventListener("click",()=>{tt("start").hidden=!0,r.enabled=!0;let S=document.documentElement;matchMedia("(pointer: coarse)").matches&&S.requestFullscreen&&S.requestFullscreen({navigationUI:"hide"}).then(()=>screen.orientation?.lock?.("landscape")).catch(()=>{})}),tt("btn-start").disabled=!1,window.__fyriskaos={game:t,input:r,renderer:a,perf:m,play:n}}_v().catch(i=>{console.error(i),tt("error").hidden=!1,tt("error").textContent="Spelet kunde inte starta p\xE5 den h\xE4r enheten. Prova att ladda om sidan."});
/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
