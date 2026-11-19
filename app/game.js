var Th="0.6.1",ks=.016666666666666666,nn={radius:.35,mass:80,walkSpeed:5.2,response:12,reach:1.3},Xi={bike:{class:"bike",name:"Cykel",label:{enter:"Ta cykeln",exit:"Kliv av"},length:1.8,width:.6,mass:90,circles:[{o:-.55,r:.32},{o:.55,r:.32}],maxSpeed:10,reverseSpeed:1.5,accel:5.5,brake:12,coast:1.2,drag:.05,grip:10,turnRate:3.4,turnRefSpeed:2.5,minTurn:.45,steerGain:2.4,grassFactor:1,fallImpact:4},small:{class:"car",name:"Sm\xE5bil",label:{enter:"Kliv in",exit:"Kliv ur"},length:3.6,width:1.7,mass:950,circles:[{o:-1,r:.85},{o:0,r:.85},{o:1,r:.85}],maxSpeed:19,reverseSpeed:6,accel:7,brake:20,coast:2.5,drag:.08,grip:7,turnRate:2.9,turnRefSpeed:4,minTurn:0,steerGain:2.2,grassFactor:.5,fallImpact:1/0,handbrake:{grip:1.4,turnBoost:2,decel:4,redirect:3}},car:{class:"car",name:"Bil",label:{enter:"Kliv in",exit:"Kliv ur"},length:4.4,width:1.9,mass:1300,circles:[{o:-1.35,r:.95},{o:0,r:.95},{o:1.35,r:.95}],maxSpeed:25,reverseSpeed:6,accel:9,brake:22,coast:2.5,drag:.06,grip:6,turnRate:2.4,turnRefSpeed:5,minTurn:0,steerGain:2,grassFactor:.5,fallImpact:1/0,handbrake:{grip:1.3,turnBoost:2,decel:4,redirect:3}},sport:{class:"car",name:"Sportbil",label:{enter:"Kliv in",exit:"Kliv ur"},length:4.5,width:1.95,mass:1350,circles:[{o:-1.4,r:.97},{o:0,r:.97},{o:1.4,r:.97}],maxSpeed:33.5,reverseSpeed:7,accel:14,brake:26,coast:2.5,drag:.05,grip:6.5,turnRate:2.5,turnRefSpeed:5,minTurn:0,steerGain:2,grassFactor:.45,fallImpact:1/0,handbrake:{grip:1.2,turnBoost:2.1,decel:4,redirect:3}}};async function Ah(i){let t=await fetch(i);if(!t.ok)throw new Error(`map ${t.status}`);return Lf(await t.json())}function Lf(i){let{width:t,height:e}=i,n=atob(i.ground.rle),s=new Uint16Array(n.length/2);for(let y=0;y<s.length;y++)s[y]=n.charCodeAt(y*2)|n.charCodeAt(y*2+1)<<8;let r=new Uint8Array(t*e),o=0;for(let y=0;y<s.length;y+=2)r.fill(s[y],o,o+s[y+1]),o+=s[y+1];let a=i.ground.types,l=[];{let y=new Uint8Array(t*e);for(let p=0;p<e;p++)for(let g=0;g<t;g++){let _=p*t+g;if(r[_]!==a.water||y[_])continue;let E=g;for(;E+1<t&&r[_+E+1-g]===a.water&&!y[_+E+1-g];)E++;let v=p;t:for(;v+1<e;){for(let T=g;T<=E;T++)if(r[(v+1)*t+T]!==a.water||y[(v+1)*t+T])break t;v++}for(let T=p;T<=v;T++)y.fill(1,T*t+g,T*t+E+1);l.push({x:g,y:p,w:E-g+1,h:v-p+1})}}let c=i.buildings,h=new Map(c.map(y=>[y.id,y]));for(let y of c)y.parts=0;for(let y of i.parts)h.get(y.b).parts++;let u=i.parts.map(y=>{let p=h.get(y.b);return{x:y.x,y:y.y,w:y.w,h:y.h,house:p,height:p.floors*3.2+1,landmark:p.landmark}}),d=i.places.gunillaklockan;d&&u.push({x:d[0]-3.2,y:d[1]-3.2,w:6.4,h:6.4,house:null,height:16,landmark:"gunillaklockan"});let f=i.start,m=[f.car,f.sport,...i.parked];return{kind:"city",width:t,height:e,north:i.north,cells:r,G:a,cellAt(y,p){let g=Math.floor(y),_=Math.floor(p);return g<0||_<0||g>=t||_>=e?0:r[_*t+g]},buildings:u,houses:c,water:l,grass:[],paths:[],trees:i.trees,lamps:i.lamps,props:i.props,roads:i.roads,bridges:i.bridges,places:i.places,start:f,spawns:{player:f.player,cars:m,bikes:[f.bike]}}}var ll={...Xi.car,name:"Polisbil",maxSpeed:28,accel:10.5},Df=500,Rh=100,Ch=200,Ph=[3829413,11879482,5212746,14263354,6965898,3092275,15262420,3836554];function Ih(i){let t=i.map,e=t.G,n=t.places,s=A=>A===e.sidewalk||A===e.slab||A===e.path||A===e.deck,r=A=>A!==0&&A!==e.building&&A!==e.water,o={money:Df,stars:0,health:100,peds:[],police:[],mission:null,target:null,phone:null,ticket:0,calm:0,seen:0,bustedFor:0};i.play=o;for(let A=0;A<3;A++){let B={id:`police${A}`,kind:"vehicle",type:"car",spec:ll,police:!0,x:n.polis[0]+A*6,y:n.polis[1]+4,heading:0,vx:0,vy:0,color:16053490,driver:null,reversing:!1,grip:ll.grip,handbrake:!1,mass:ll.mass,awake:!1,ai:null};i.vehicles.push(B),o.police.push(B)}let a=A=>i.events.push({type:"toast",text:A}),l=(A,B)=>Math.hypot(A.x-B.x,A.y-B.y),c=i.player,h=(()=>{let A=12345;return()=>(A=A*16807%2147483647)/2147483647})();function u(){let A=c.vehicle;A&&(A.driver=null,A.vx=A.vy=0,c.vehicle=null)}function d([A,B]){u(),Object.assign(c,{x:A,y:B,vx:0,vy:0,stun:0})}function f(){o.stars=0,o.calm=0,o.seen=0,o.police.forEach((A,B)=>{A.ai=null,Object.assign(A,{x:n.polis[0]+B*6,y:n.polis[1]+4,vx:0,vy:0,heading:0,awake:!1})})}function m(){let A=n.vardcentraler.reduce((B,Z)=>Math.hypot(Z[0]-c.x,Z[1]-c.y)<Math.hypot(B[0]-c.x,B[1]-c.y)?Z:B);d(A),o.money=Math.max(0,o.money-Rh),o.health=100,f(),o.ticket=4,a(`V\xE5rdcentralen tog ${Rh} kr.`),o.mission&&o.mission.step==="deliver"&&_("Mackorna blev kvar p\xE5 olycksplatsen.")}function y(){d(n.polis),o.money=Math.max(0,o.money-Ch),f(),a(`Gripen! B\xF6ter: ${Ch} kr.`),o.mission&&o.mission.step==="deliver"&&_("Polisen beslagtog nattmackorna.")}function p(A,B){let Z=o.stars;o.stars=Math.min(3,o.stars+A),o.calm=0,o.stars>Z&&a(`${B} Efterlyst: ${"\u2605".repeat(o.stars)}`)}function g(){o.mission={step:"pickup",sandwiches:0,time:0},o.phone={from:"Punschbergs nation",text:"Sittningen har slut p\xE5 nattmackor! H\xE4mta 12 mackor p\xE5 Mackbaren och k\xF6r hit innan sittningen slutar. Swosh: 300 kr.",until:i.time+9}}function _(A){a(`Uppdraget misslyckades. ${A}`),o.mission={step:"retry",at:i.time+8}}function E(A){let B=o.mission;if(!B){i.time>4&&g();return}if(B.step==="retry"){i.time>B.at&&g();return}let Z=(c.vehicle?Math.hypot(c.vehicle.vx,c.vehicle.vy):0)<4,k=(Y,et)=>Math.hypot(c.x-Y[0],c.y-Y[1])<et;if(B.step==="pickup")o.target={x:n.kiosk[0],y:n.kiosk[1],label:"Mackbaren"},k(n.kiosk,5)&&Z&&(B.step="deliver",B.sandwiches=12,B.time=120,B.goal=n.nation,B.label="Punschbergs nation",B.twisted=!1,a("Du h\xE4mtade 12 nattmackor. K\xF6r f\xF6rsiktigt: varje krock tappar en macka."));else if(B.step==="deliver"){if(B.time-=A,o.target={x:B.goal[0],y:B.goal[1],label:B.label},B.time<=0)return _("Sittningen tog slut.");if(B.sandwiches<6)return _("F\xF6r f\xE5 mackor kvar.");if(k(B.goal,6)&&Z){if(!B.twisted){B.twisted=!0,B.goal=n.slottsgard||n.slottet,B.label="Slottet",B.time+=50,o.phone={from:"Punschbergs nation",text:"Haha, fel st\xE4lle! Sittningen flyttade till Slottet. Skynda!",until:i.time+7};return}let Y=300+(B.sandwiches-6)*20;o.money+=Y,a(`Levererat! ${B.sandwiches} mackor. Swosh: +${Y} kr.`),o.mission={step:"done"},o.target=null}}}function v(){for(let A=0;A<30;A++){let B=h()*Math.PI*2,Z=25+h()*50,k=c.x+Math.cos(B)*Z,Y=c.y+Math.sin(B)*Z;if(!s(t.cellAt(k,Y)))continue;let et=Math.floor(h()*4),ht=et*(Math.PI/2);for(let j=0;j<4;j++){let ct=(et+j)%4*(Math.PI/2);if(R(k,Y,ct,3)){ht=ct;break}}return{x:k,y:Y,heading:ht,want:ht,speed:1.1+h()*.6,pace:0,kind:Math.floor(h()*2),stand:h()<.2,shirt:Ph[Math.floor(h()*Ph.length)],down:0,look:0}}return null}function T(A){for(;o.peds.length<34;){let k=v();if(!k)break;o.peds.push(k)}let B=c.vehicle,Z=B?Math.hypot(B.vx,B.vy):0;for(let k=o.peds.length-1;k>=0;k--){let Y=o.peds[k];if(l(Y,c)>95){o.peds.splice(k,1);continue}if(Y.down>0){Y.down-=A,Y.down<=0&&(Y.speed=3);continue}if(B&&Z>3&&Math.hypot(Y.x-B.x,Y.y-B.y)<B.spec.length/2+.4){Y.down=5,Y.heading=Math.atan2(B.vy,B.vx),Y.x+=Math.cos(Y.heading)*1.2,Y.y+=Math.sin(Y.heading)*1.2,p(1,"Du k\xF6rde p\xE5 n\xE5gon!");continue}if(Y.stand){Y.pace=0;continue}S(Y,A)}}function R(A,B,Z,k){let Y=Math.cos(Z),et=Math.sin(Z);for(let ht=1;ht<=k;ht+=1)if(!s(t.cellAt(A+Y*ht,B+et*ht)))return!1;return!0}let x=2.2;function S(A,B){if(A.look-=B,A.look<=0){if(A.look=.4+h()*.3,R(A.x,A.y,A.want,2)){if(h()<.04){let ht=A.want+(h()<.5?1:-1)*(Math.PI/2);R(A.x,A.y,ht,6)&&(A.want=ht)}}else{let ht=h()<.5?1:-1,j=[A.want+ht*(Math.PI/2),A.want-ht*(Math.PI/2),A.want+Math.PI];A.want=j.find(ct=>R(A.x,A.y,ct,3))??j.find(ct=>R(A.x,A.y,ct,1))??A.want+Math.PI}A.want=Math.atan2(Math.sin(A.want),Math.cos(A.want))}let Z=A.want-A.heading;Z=Math.atan2(Math.sin(Z),Math.cos(Z)),A.heading+=Math.max(-x*B,Math.min(x*B,Z));let k=A.speed*Math.max(.25,Math.cos(Math.min(Math.PI/2,Math.abs(Z))));A.pace+=(k-A.pace)*Math.min(1,B*4);let Y=A.x+Math.cos(A.heading)*A.pace*B,et=A.y+Math.sin(A.heading)*A.pace*B;s(t.cellAt(Y+Math.cos(A.heading)*.4,et+Math.sin(A.heading)*.4))?(A.x=Y,A.y=et):A.look=0}let F=2,M=160,C=new Float32Array(M*M),N=0,O=0,I=-1;function G(){N=Math.floor(c.x/F)-M/2,O=Math.floor(c.y/F)-M/2,C.fill(1/0);let A=new Int32Array(M*M),B=0,Z=0,k=M/2*M+M/2;for(C[k]=0,A[Z++]=k;B<Z;){let Y=A[B++],et=Y%M,ht=(Y-et)/M;for(let[j,ct]of[[1,0],[-1,0],[0,1],[0,-1]]){let pt=et+j,lt=ht+ct;if(pt<0||lt<0||pt>=M||lt>=M)continue;let _t=lt*M+pt;C[_t]===1/0&&r(t.cellAt((N+pt+.5)*F,(O+lt+.5)*F))&&(C[_t]=C[Y]+1,A[Z++]=_t)}}I=i.time}let X=(A,B)=>{let Z=Math.floor(A/F)-N,k=Math.floor(B/F)-O;return Z<0||k<0||Z>=M||k>=M?1/0:C[k*M+Z]};function U(A){for(let B=0;B<60;B++){let Z=h()*Math.PI*2,k=75+h()*40,Y=c.x+Math.cos(Z)*k,et=c.y+Math.sin(Z)*k;if(!(t.cellAt(Y,et)!==e.road||X(Y,et)===1/0)){Object.assign(A,{x:Y,y:et,vx:0,vy:0,heading:Z+Math.PI,awake:!0,stuck:0,backUp:0}),A.ai={steer:"screen",stick:{x:0,y:0,m:0},brake:!1};return}}}function V(A,B){let Z=l(A,c),k=c.x-A.x,Y=c.y-A.y;if(Z>9){let ct=X(A.x,A.y),pt=0,lt=0;for(let _t=0;_t<16;_t++){let Dt=_t/16*Math.PI*2,Q=X(A.x+Math.cos(Dt)*6,A.y+Math.sin(Dt)*6);Q<ct&&(ct=Q,pt=Math.cos(Dt),lt=Math.sin(Dt))}(pt||lt)&&(k=pt,Y=lt)}let et=Math.hypot(k,Y)||1,ht=Math.hypot(A.vx,A.vy);if(A.stuck=ht<1&&Z>10?A.stuck+B:0,A.stuck>1.5&&(A.backUp=1),A.backUp>0){A.backUp-=B,A.ai.stick={x:-Math.cos(A.heading),y:-Math.sin(A.heading),m:1};return}let j=Z<9?.45:1;A.ai.stick={x:k/et,y:Y/et,m:j},A.ai.brake=Z<6&&ht>4}function P(A){let B=o.police.filter(et=>et.ai),Z=o.stars;for(let et of o.police)!et.ai&&B.length<Z&&(i.time-I>.5&&G(),U(et),et.ai&&B.push(et));if(!B.length)return;i.time-I>.6&&G();let k=!1;for(let et of B)V(et,A),l(et,c)<70&&(k=!0);let Y=c.vehicle?Math.hypot(c.vehicle.vx,c.vehicle.vy):Math.hypot(c.vx,c.vy);if(o.seen=B.some(et=>l(et,c)<5)&&Y<1.5?o.seen+A:0,o.seen>2)return y();if(o.calm=k?0:o.calm+A,o.calm>14)if(o.stars-=1,o.calm=0,a(o.stars?`Efterlyst: ${"\u2605".repeat(o.stars)}`:"Polisen tappade bort dig."),!o.stars)f();else{let et=B.pop();et.ai=null,Object.assign(et,{x:n.polis[0],y:n.polis[1]+4,vx:0,vy:0,awake:!1})}}function L(A,B){for(let Z of B)Z.type==="hurt"&&(o.health-=Z.amount),Z.type==="policeBump"&&p(1,"Du rammade en polisbil!"),Z.type==="crash"&&o.mission&&o.mission.step==="deliver"&&o.mission.sandwiches>0&&i.time-(o.mission.lastDrop||0)>.6&&(o.mission.sandwiches-=1,o.mission.lastDrop=i.time,a(`En macka fl\xF6g ut! ${o.mission.sandwiches} kvar.`)),Z.type==="crash"&&Z.speed>14&&(o.health-=(Z.speed-14)*3);o.health<=0&&m(),o.ticket>0&&(o.ticket-=A),o.health<100&&(o.health=Math.min(100,o.health+A*1.5)),E(A),T(A),P(A),o.phone&&i.time>o.phone.until&&(o.phone=null)}return{state:o,step:L}}var Lh=Math.PI*2,cl=.12;function hl(i){return i=(i+Math.PI)%Lh,i<0&&(i+=Lh),i-Math.PI}var Ii=(i,t,e)=>i<t?t:i>e?e:i;function Bh(i){let t=i.spawns.player,e={id:"p1",kind:"person",x:t.x,y:t.y,vx:0,vy:0,heading:t.heading,vehicle:null,stun:0,mass:nn.mass},n=[];return i.spawns.bikes.forEach((r,o)=>n.push(Dh("bike",r,o))),i.spawns.cars.forEach((r,o)=>n.push(Dh(r.type||"car",r,o))),{map:i,player:e,vehicles:n,time:0,events:[],shake:0,grid:Nf(i)}}function Dh(i,t,e){return{id:`${i}${e}`,kind:"vehicle",type:i,spec:Xi[i],x:t.x,y:t.y,heading:t.heading,vx:0,vy:0,color:t.color,driver:null,reversing:!1,grip:Xi[i].grip,handbrake:!1,mass:Xi[i].mass,awake:!1}}var Dn=20;function Nf(i){let t=Math.ceil(i.width/Dn),e=Math.ceil(i.height/Dn),n=Array.from({length:t*e},()=>({rects:[],circles:[]})),s=o=>{for(let a=Math.floor(o.x/Dn);a<=Math.floor((o.x+o.w)/Dn);a++)for(let l=Math.floor(o.y/Dn);l<=Math.floor((o.y+o.h)/Dn);l++)a>=0&&l>=0&&a<t&&l<e&&n[l*t+a].rects.push(o)};i.buildings.forEach(s),i.water.forEach(s);for(let o of i.props||[]){if(o.kind!=="bench")continue;let a=Math.abs(Math.sin(o.rot))<.5;s(a?{x:o.x-.9,y:o.y-.3,w:1.8,h:.6}:{x:o.x-.3,y:o.y-.9,w:.6,h:1.8})}let r=[...i.trees,...i.lamps||[],...(i.props||[]).filter(o=>o.kind==="bin").map(o=>({x:o.x,y:o.y,r:.3}))];for(let o of r){let a=Math.floor(o.x/Dn),l=Math.floor(o.y/Dn);a>=0&&l>=0&&a<t&&l<e&&n[l*t+a].circles.push(o)}return{cols:t,rows:e,cells:n}}function kh(i,t,e,n){n.rects.length=0,n.circles.length=0;let s=Math.floor(t/Dn),r=Math.floor(e/Dn);for(let o=s-1;o<=s+1;o++)for(let a=r-1;a<=r+1;a++){if(o<0||a<0||o>=i.cols||a>=i.rows)continue;let l=i.cells[a*i.cols+o];for(let c of l.rects)n.rects.includes(c)||n.rects.push(c);for(let c of l.circles)n.circles.includes(c)||n.circles.push(c)}return n}function Hs(i){if(i.kind==="person")return[{x:i.x,y:i.y,r:nn.radius}];let t=Math.cos(i.heading),e=Math.sin(i.heading);return i.spec.circles.map(n=>({x:i.x+t*n.o,y:i.y+e*n.o,r:n.r}))}function Nh(i){return i.kind==="person"?nn.radius:i.spec.length/2+.2}function ul(i,t,e,n){let s=Ii(i,n.x,n.x+n.w),r=Ii(t,n.y,n.y+n.h),o=i-s,a=t-r,l=o*o+a*a;if(l>=e*e)return null;if(l>1e-9){let m=Math.sqrt(l);return{nx:o/m,ny:a/m,pen:e-m}}let c=i-n.x,h=n.x+n.w-i,u=t-n.y,d=n.y+n.h-t,f=Math.min(c,h,u,d);return f===c?{nx:-1,ny:0,pen:c+e}:f===h?{nx:1,ny:0,pen:h+e}:f===u?{nx:0,ny:-1,pen:u+e}:{nx:0,ny:1,pen:d+e}}var Uf={rects:[],circles:[]};function Ff(i,t){let e=i.map,n=0,s=0,r=0;for(let o=0;o<2;o++){let a=Hs(t);for(let l of a){let c=kh(i.grid,l.x,l.y,Uf),h=[];for(let u of c.rects){let d=ul(l.x,l.y,l.r,u);d&&h.push(d)}for(let u of c.circles){let d=l.x-u.x,f=l.y-u.y,m=Math.hypot(d,f),y=l.r+u.r;m<y&&m>1e-6&&h.push({nx:d/m,ny:f/m,pen:y-m})}l.x-l.r<0&&h.push({nx:1,ny:0,pen:l.r-l.x}),l.y-l.r<0&&h.push({nx:0,ny:1,pen:l.r-l.y}),l.x+l.r>e.width&&h.push({nx:-1,ny:0,pen:l.x+l.r-e.width}),l.y+l.r>e.height&&h.push({nx:0,ny:-1,pen:l.y+l.r-e.height});for(let u of h){t.x+=u.nx*u.pen,t.y+=u.ny*u.pen,l.x+=u.nx*u.pen,l.y+=u.ny*u.pen;let d=t.vx*u.nx+t.vy*u.ny;if(d<0){-d>n&&(n=-d,s=u.nx,r=u.ny);let f=t.kind==="person"?1:1.2;t.vx-=f*d*u.nx,t.vy-=f*d*u.ny,t.kind==="vehicle"&&-d>2&&(t.vx*=.85,t.vy*=.85)}}}}return{impact:n,nx:s,ny:r}}function Of(i,t,e){let n=Nh(t)+Nh(e);if(Math.abs(t.x-e.x)>n||Math.abs(t.y-e.y)>n)return;let s=Hs(t),r=Hs(e);for(let o of s)for(let a of r){let l=a.x-o.x,c=a.y-o.y,h=Math.hypot(l,c),u=o.r+a.r;if(h>=u||h<1e-6)continue;let d=l/h,f=c/h,m=u-h,y=1/t.mass,p=1/e.mass,g=y+p;t.x-=d*m*(y/g),t.y-=f*m*(y/g),e.x+=d*m*(p/g),e.y+=f*m*(p/g);let _=(e.vx-t.vx)*d+(e.vy-t.vy)*f;if(_<0){let E=-1.2*_/g;t.vx-=E*y*d,t.vy-=E*y*f,e.vx+=E*p*d,e.vy+=E*p*f,t.awake=!0,e.awake=!0,Bf(i,t,e,-_)}}}function Bf(i,t,e,n){let s=i.player;!s.vehicle&&(t===s||e===s)&&n>5&&s.stun<=0&&(s.stun=1,qr(i,"P\xE5k\xF6rd! Titta \xE5t b\xE5da h\xE5llen n\xE4sta g\xE5ng."),i.events.push({type:"hurt",amount:Math.min(60,n*4)})),s.vehicle&&n>5&&(t===s.vehicle&&e.police||e===s.vehicle&&t.police)&&i.events.push({type:"policeBump"}),s.vehicle&&(t===s.vehicle||e===s.vehicle)&&n>8&&i.events.push({type:"crash",speed:n});for(let o of[t,e])if(o.kind==="vehicle"&&o.driver&&o.spec.class==="bike"&&n>o.spec.fallImpact){let a=o===t?e:t,l=o.x-a.x,c=o.y-a.y,h=Math.hypot(l,c)||1;Vh(i,o,l/h,c/h)}s.vehicle&&(t===s.vehicle||e===s.vehicle)&&n>6&&(i.shake=Math.min(1,n/15))}function kf(i,t,e){let n=i.stun>0?{x:0,y:0,m:0}:t.stick,s=nn.walkSpeed*(n.m>cl?n.m:0),r=n.m>cl?n.x/n.m*s:0,o=n.m>cl?n.y/n.m*s:0,a=Math.min(1,(i.stun>0?4:nn.response)*e);i.vx+=(r-i.vx)*a,i.vy+=(o-i.vy)*a,Math.hypot(i.vx,i.vy)>.3&&i.stun<=0&&(i.heading=Math.atan2(i.vy,i.vx))}function Hf(i,t,e){if(i.map.cells)return i.map.cellAt(t,e)===i.map.G.grass;for(let n of i.map.grass)if(t>=n.x&&t<=n.x+n.w&&e>=n.y&&e<=n.y+n.h){for(let s of i.map.paths)if(t>=s.x&&t<=s.x+s.w&&e>=s.y&&e<=s.y+s.h)return!1;return!0}return!1}var qi=.15,Uh=i=>Math.abs(i)<qi?0:(i-Math.sign(i)*qi)/(1-qi),Fh=.5,zf=115*Math.PI/180,Gf=135*Math.PI/180;function Vf(i,t,e){let n=t.m>qi?Math.min(1,(t.m-qi)/(1-qi)):0;if(!n)return e>-.3&&(i.reversing=!1),{throttle:0,brake:0,turn:0};let s=Math.atan2(t.y,t.x),r=hl(s-i.heading),o=hl(s-i.heading-Math.PI),a=()=>({throttle:-n,brake:0,turn:-Ii(o/Fh,-1,1)});if(i.reversing){if(Math.abs(r)>Math.PI/2.2)return a();if(e<-.5)return{throttle:0,brake:n,turn:0};i.reversing=!1}return Math.abs(r)<=zf?{throttle:n*Math.max(.35,Math.cos(Math.min(Math.abs(r),Math.PI/2))),brake:0,turn:Ii(r/Fh,-1,1)}:e>1.2?{throttle:0,brake:n,turn:0}:Math.abs(r)>=Gf&&i.spec.class==="car"?(i.reversing=!0,a()):{throttle:.5*n,brake:0,turn:Math.sign(r)}}function Oh(i,t,e,n){let s=t.spec,r=Math.cos(t.heading),o=Math.sin(t.heading),a=t.vx*r+t.vy*o,l=-t.vx*o+t.vy*r,c=e.stick,h=0,u=0,d;if(e.steer==="screen"){let x=Vf(t,c,a);h=x.throttle,u=x.brake,d=x.turn}else{let x=Uh(-c.y);d=Uh(c.x),x>=0?t.reversing=!1:a<.5&&(t.reversing=!0),x>0?h=x:x<0&&(h=t.reversing?x:0),x<0&&!t.reversing&&(u=-x)}let f=u>0;t.braking=f||e.brake;let m=Hf(i,t.x,t.y)?s.grassFactor:1,y=s.maxSpeed*m,p=Ii(d,-1,1)*(a<-.2?-1:1),g=s.handbrake,_=a>6&&Math.abs(d)>.35;t.handbrake=!!(g&&e.brake&&!t.reversing&&(t.handbrake?a>3:_));let E=t.handbrake?g.grip:s.grip;if(t.grip+=(E-t.grip)*Math.min(1,(t.handbrake?12:2.5)*n),t.handbrake){a=Math.max(0,a-g.decel*n);let x=l*Math.min(1,g.redirect*n);l-=x,a+=Math.abs(x)*.85}else if(e.brake||f){let x=s.brake*n*(f&&!e.brake?Math.max(.4,u):1);a>0?a=Math.max(0,a-x):a=Math.min(0,a+x)}else if(h>0)a<y?a=Math.min(y,a+s.accel*h*n):a-=(a-y)*Math.min(1,2*n),a<0&&(a=Math.min(0,a+s.brake*n));else if(h<0)a=Math.max(-s.reverseSpeed,a+s.accel*h*.6*n);else{let x=s.coast*n;a=a>0?Math.max(0,a-x):Math.min(0,a+x)}a-=a*s.drag*n,m<1&&Math.abs(a)>y&&(a-=(a-Math.sign(a)*y)*Math.min(1,3*n)),l*=Math.exp(-t.grip*n),t.vx=r*a-o*l,t.vy=o*a+r*l;let v=Ii(Math.abs(a)/s.turnRefSpeed,s.minTurn,1),T=1-.35*Ii(Math.abs(a)/s.maxSpeed,0,1),R=t.handbrake?g.turnBoost/T:1;t.heading=hl(t.heading+p*s.turnRate*v*T*R*n)}function Wf(i,t){let e=Math.cos(i.heading),n=Math.sin(i.heading),s=i.vx*e+i.vy*n,r=-i.vx*n+i.vy*e,o=i.spec.brake*.4*t;s=s>0?Math.max(0,s-o):Math.min(0,s+o),r*=Math.exp(-i.spec.grip*t),i.vx=e*s-n*r,i.vy=n*s+e*r,Math.abs(i.vx)+Math.abs(i.vy)<.01&&(i.vx=0,i.vy=0,i.awake=!1)}function Hh(i){let t=i.player,e=null,n=nn.reach;for(let s of i.vehicles)if(!s.driver)for(let r of Hs(s)){let o=Math.hypot(r.x-t.x,r.y-t.y)-r.r-nn.radius;o<n&&(n=o,e=s)}return e}function zh(i){let t=i.player;if(t.stun>0)return null;if(t.vehicle)return t.vehicle.spec.label.exit;let e=Hh(i);return e?e.spec.label.enter:null}function Xf(i){let t=i.player;if(t.stun>0)return;if(t.vehicle){qf(i,t.vehicle);return}let e=Hh(i);e&&(t.vehicle=e,e.driver=t,e.reversing=!1,e.awake=!0,i.events.push({type:"enter",vehicle:e}),t.vx=0,t.vy=0)}function Gh(i,t,e){let n={kind:"person",x:t,y:e,vx:0,vy:0},s=kh(i.grid,t,e,{rects:[],circles:[]});for(let r of s.rects)if(ul(t,e,nn.radius+.05,r))return!1;for(let r of s.circles)if(Math.hypot(r.x-t,r.y-e)<r.r+nn.radius)return!1;for(let r of s.rects)if(ul(t,e,nn.radius,r))return!1;for(let r of i.vehicles)if(r!==i.player.vehicle){for(let o of Hs(r))if(Math.hypot(o.x-n.x,o.y-n.y)<o.r+nn.radius)return!1}return t>.5&&e>.5&&t<i.map.width-.5&&e<i.map.height-.5}function qf(i,t){let e=i.player,n=Math.cos(t.heading),s=Math.sin(t.heading),r=t.spec.width/2+nn.radius+.2,o=t.spec.length/2+nn.radius+.2,a=[[s*r,-n*r],[-s*r,n*r],[-n*o,-s*o],[n*o,s*o]],l=null;for(let[h,u]of a)if(Gh(i,t.x+h,t.y+u)){l=[t.x+h,t.y+u];break}if(!l){qr(i,"Det g\xE5r inte att kliva ur h\xE4r.");return}let c=Math.hypot(t.vx,t.vy);e.vehicle=null,t.driver=null,t.handbrake=!1,t.grip=t.spec.grip,e.x=l[0],e.y=l[1],e.heading=t.heading,c>4?(e.vx=t.vx*.4,e.vy=t.vy*.4,e.stun=.8,qr(i,t.spec.class==="bike"?"Du hoppade av i farten.":"Du kastade dig ut ur bilen. Snyggt.")):(e.vx=0,e.vy=0)}function Vh(i,t,e,n){let s=i.player;if(s.vehicle!==t)return;s.vehicle=null,t.driver=null;let r=t.x+e*1.1,o=t.y+n*1.1;Gh(i,r,o)||(r=t.x,o=t.y),s.x=r,s.y=o,s.vx=e*2,s.vy=n*2,s.stun=1.2,t.vx*=.3,t.vy*=.3,i.shake=.6,qr(i,"Aj! Du ramlade av cykeln."),i.events.push({type:"hurt",amount:15})}function qr(i,t){i.events.push({type:"toast",text:t})}function Wh(i,t,e){i.time+=e;let n=i.player;t.consumeAction()&&Xf(i),n.vehicle?Oh(i,n.vehicle,t,e):kf(n,t,e),i.braking=!!(n.vehicle&&n.vehicle.braking);for(let o of i.vehicles)o.ai&&!o.driver&&Oh(i,o,o.ai,e);for(let o of i.vehicles)!o.driver&&!o.ai&&o.awake&&Wf(o,e);let s=[];n.vehicle||s.push(n);for(let o of i.vehicles)(o.driver||o.awake||o.ai)&&s.push(o);for(let o of s)o.x+=o.vx*e,o.y+=o.vy*e;let r=n.vehicle?i.vehicles:[n,...i.vehicles];for(let o of s)for(let a of r)a!==o&&(!s.includes(a)||s.indexOf(a)>s.indexOf(o))&&Of(i,o,a);for(let o of[...s,...i.vehicles.filter(a=>a.awake&&!s.includes(a))]){let a=Ff(i,o);o.kind==="vehicle"&&o.driver&&a.impact>0&&(o.spec.class==="bike"&&a.impact>o.spec.fallImpact?Vh(i,o,a.nx,a.ny):a.impact>6&&(i.shake=Math.min(1,a.impact/15)),a.impact>8&&i.events.push({type:"crash",speed:a.impact}))}n.vehicle&&(n.x=n.vehicle.x,n.y=n.vehicle.y,n.heading=n.vehicle.heading),n.stun>0&&(n.stun=Math.max(0,n.stun-e)),i.shake=Math.max(0,i.shake-e*2)}function Xh(i){let t={stick:{x:0,y:0,m:0},brake:!1,enabled:!1,touchSteer:"screen",steer:"classic",actionQueued:!1,consumeAction(){let f=this.actionQueued;return this.actionQueued=!1,f&&this.enabled}},e=new Set,n=()=>{let f=0,m=0;(e.has("ArrowLeft")||e.has("KeyA"))&&(f-=1),(e.has("ArrowRight")||e.has("KeyD"))&&(f+=1),(e.has("ArrowUp")||e.has("KeyW"))&&(m-=1),(e.has("ArrowDown")||e.has("KeyS"))&&(m+=1);let y=Math.hypot(f,m);return y?{x:f/y,y:m/y,m:1}:null};window.addEventListener("keydown",f=>{(f.code==="Space"||f.code.startsWith("Arrow"))&&f.preventDefault(),!f.repeat&&(f.code==="KeyE"||f.code==="Enter")&&(t.actionQueued=!0),e.add(f.code)}),window.addEventListener("keyup",f=>e.delete(f.code)),window.addEventListener("blur",()=>e.clear());let s=null,r=0,o=0,a={x:0,y:0,m:0},l=(f,m)=>{i.joy.hidden=!1,i.joy.style.transform=`translate(${r}px, ${o}px)`,i.knob.style.transform=`translate(${f}px, ${m}px)`};i.surface.addEventListener("pointerdown",f=>{s===null&&(f.pointerType!=="mouse"&&f.clientX>window.innerWidth*.6||(s=f.pointerId,r=f.clientX,o=f.clientY,a={x:0,y:0,m:0},i.surface.setPointerCapture?.(f.pointerId),l(0,0),f.preventDefault()))}),i.surface.addEventListener("pointermove",f=>{if(f.pointerId!==s)return;let m=f.clientX-r,y=f.clientY-o,p=Math.hypot(m,y);p>60&&(r+=m/p*(p-60),o+=y/p*(p-60),m=f.clientX-r,y=f.clientY-o);let g=Math.min(1,Math.hypot(m,y)/60);a=g>0?{x:m/60,y:y/60,m:g}:{x:0,y:0,m:0},l(m,y)});let c=f=>{f.pointerId===s&&(s=null,a={x:0,y:0,m:0},i.joy.hidden=!0)};i.surface.addEventListener("pointerup",c),i.surface.addEventListener("pointercancel",c),i.action.addEventListener("pointerdown",f=>{f.preventDefault(),t.actionQueued=!0});let h=f=>{f.preventDefault(),i.brake.classList.add("down"),d=!0},u=()=>{i.brake.classList.remove("down"),d=!1},d=!1;i.brake.addEventListener("pointerdown",h),i.brake.addEventListener("pointerup",u),i.brake.addEventListener("pointercancel",u),i.brake.addEventListener("pointerleave",u);for(let f of["touchstart","touchmove","gesturestart","contextmenu"])document.addEventListener(f,m=>m.target.closest?.(".overlay")||m.preventDefault(),{passive:!1});return t.update=()=>{let f=n();t.stick=t.enabled?f||a:{x:0,y:0,m:0},t.steer=f?"classic":t.touchSteer,t.brake=t.enabled&&(d||e.has("Space"))},t}function qh(i){let t=0,e;return{update(n,s,r){s!==e&&(e=s,i.action.hidden=!s,s&&(i.action.textContent=s));let o=n.player.vehicle;i.brake.hidden=!o,i.speed.hidden=!o,o&&(i.speed.textContent=`${o.spec.name} \xB7 ${Math.round(Math.hypot(o.vx,o.vy)*3.6)} km/h`),t>0&&(t-=r,t<=0&&(i.toast.hidden=!0))},toast(n){i.toast.textContent=n,i.toast.hidden=!1,t=2.5}}}function Zh(i){let t=(i%600+600)%600/600;return t<.4?0:t<.5?Yh((t-.4)/.1):t<.9?1:1-Yh((t-.9)/.1)}function Yh(i){return i*i*(3-2*i)}var Cu=0,ql=1,Pu=2;var ki=1,Iu=2,ws=3,Si=0,$e=1,Ge=2,Hi=0,Ts=1,Qn=2,Yl=3,Zl=4,Lu=5;var zi=100,Du=101,Nu=102,Uu=103,Fu=104,Ou=200,Bu=201,ku=202,Hu=203,$l=204,Jl=205,zu=206,Gu=207,Vu=208,Wu=209,Xu=210,qu=211,Yu=212,Zu=213,$u=214,vo=0,Mo=1,So=2,cs=3,bo=4,Eo=5,wo=6,To=7,Kl=0,Ju=1,Ku=2,Hn=0,Ql=1,jl=2,tc=3,As=4,ec=5,nc=6,ic=7;var sc=300,Gi=301,Rs=302,Cs=303,na=304,fi=1e3,Tn=1001,Ao=1002,ke=1003,Qu=1004;var Tr=1005;var en=1006,ia=1007;var jn=1008;var rn=1009,rc=1010,oc=1011,Ps=1012,sa=1013,Pn=1014,yn=1015,In=1016,ra=1017,oa=1018,Vi=1020,ac=35902,lc=35899,cc=1021,hc=1022,Ln=1023,Jn=1026,ti=1027,aa=1028,la=1029,bi=1030,ca=1031;var ha=1033,Ar=33776,Rr=33777,Cr=33778,Pr=33779,ua=35840,da=35841,fa=35842,pa=35843,ma=36196,ga=37492,xa=37496,_a=37488,ya=37489,Ir=37490,va=37491,Ma=37808,Sa=37809,ba=37810,Ea=37811,wa=37812,Ta=37813,Aa=37814,Ra=37815,Ca=37816,Pa=37817,Ia=37818,La=37819,Da=37820,Na=37821,Ua=36492,Fa=36494,Oa=36495,Ba=36283,ka=36284,Lr=36285,Ha=36286;var js=2300,Ro=2301,xo=2302,Ul=2303,Fl=2400,Ol=2401,Bl=2402;var ju=3200;var za=0,td=1,ei="",be="srgb",tr="srgb-linear",er="linear",me="srgb";var _o=7680;var ed=519,nd=512,id=513,sd=514,uc=515,rd=516,od=517,dc=518,fc=519,pc=35044,mc=35048;var gc="300 es",xn=2e3,hs=2001;function Yf(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Zf(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function us(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ad(){let i=us("canvas");return i.style.display="block",i}var $h={},ds=null;function nr(...i){let t="THREE."+i.shift();ds?ds("log",t,...i):console.log(t,...i)}function ld(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Wt(...i){i=ld(i);let t="THREE."+i.shift();if(ds)ds("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Yt(...i){i=ld(i);let t="THREE."+i.shift();if(ds)ds("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Zs(...i){let t=i.join(" ");t in $h||($h[t]=!0,Wt(...i))}function cd(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var hd={[vo]:vo,[So]:wo,[bo]:bo,[cs]:Eo,[Mo]:Mo,[wo]:So,[To]:To,[Eo]:cs},Fn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Xe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Jh=1234567,$s=Math.PI/180,fs=180/Math.PI;function ni(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Xe[i&255]+Xe[i>>8&255]+Xe[i>>16&255]+Xe[i>>24&255]+"-"+Xe[t&255]+Xe[t>>8&255]+"-"+Xe[t>>16&15|64]+Xe[t>>24&255]+"-"+Xe[e&63|128]+Xe[e>>8&255]+"-"+Xe[e>>16&255]+Xe[e>>24&255]+Xe[n&255]+Xe[n>>8&255]+Xe[n>>16&255]+Xe[n>>24&255]).toLowerCase()}function se(i,t,e){return Math.max(t,Math.min(e,i))}function xc(i,t){return(i%t+t)%t}function $f(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Jf(i,t,e){return i!==t?(e-i)/(t-i):0}function Js(i,t,e){return(1-e)*i+e*t}function Kf(i,t,e,n){return Js(i,t,1-Math.exp(-e*n))}function Qf(i,t=1){return t-Math.abs(xc(i,t*2)-t)}function jf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function tp(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function ep(i,t){return i+Math.floor(Math.random()*(t-i+1))}function np(i,t){return i+Math.random()*(t-i)}function ip(i){return i*(.5-Math.random())}function sp(i){i!==void 0&&(Jh=i);let t=Jh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function rp(i){return i*$s}function op(i){return i*fs}function ap(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function lp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function _c(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function cp(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),m=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*u,l*d,a*c);break;case"YZY":i.set(l*d,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*d,a*h,a*c);break;case"XZX":i.set(a*h,l*m,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*m,a*c);break;case"ZYZ":i.set(l*m,l*f,a*h,a*c);break;default:Wt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ga(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function yc(i,t){if(t.constructor===Float32Array)return i;let e=Ga(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/e,-1)}function vc(i,t){if(t.constructor===Float32Array)return i;let e=Ga(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*e)}var Va={DEG2RAD:$s,RAD2DEG:fs,generateUUID:ni,clamp:se,euclideanModulo:xc,mapLinear:$f,inverseLerp:Jf,lerp:Js,damp:Kf,pingpong:Qf,smoothstep:jf,smootherstep:tp,randInt:ep,randFloat:np,randFloatSpread:ip,seededRandom:sp,degToRad:rp,radToDeg:op,isPowerOfTwo:ap,ceilPowerOfTwo:lp,floorPowerOfTwo:_c,setQuaternionFromProperEuler:cp,normalize:vc,denormalize:yc},Tc=class Tc{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=se(this.x,t.x,e.x),this.y=se(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=se(this.x,t,e),this.y=se(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(se(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(se(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Tc.prototype.isVector2=!0;var xt=Tc,Le=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3],d=r[o+0],f=r[o+1],m=r[o+2],y=r[o+3];if(u!==y||l!==d||c!==f||h!==m){let p=l*d+c*f+h*m+u*y;p<0&&(d=-d,f=-f,m=-m,y=-y,p=-p);let g=1-a;if(p<.9995){let _=Math.acos(p),E=Math.sin(_);g=Math.sin(g*_)/E,a=Math.sin(a*_)/E,l=l*g+d*a,c=c*g+f*a,h=h*g+m*a,u=u*g+y*a}else{l=l*g+d*a,c=c*g+f*a,h=h*g+m*a,u=u*g+y*a;let _=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=_,c*=_,h*=_,u*=_}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],m=r[o+3];return t[e]=a*m+h*u+l*f-c*d,t[e+1]=l*m+h*d+c*u-a*f,t[e+2]=c*m+h*f+a*d-l*u,t[e+3]=h*m-a*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),d=l(n/2),f=l(s/2),m=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"YZX":this._x=d*h*u+c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u-d*f*m;break;case"XZY":this._x=d*h*u-c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u+d*f*m;break;default:Wt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(se(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let l=1-e;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Ac=class Ac{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Kh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Kh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=se(this.x,t.x,e.x),this.y=se(this.y,t.y,e.y),this.z=se(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=se(this.x,t,e),this.y=se(this.y,t,e),this.z=se(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(se(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return dl.copy(this).projectOnVector(t),this.sub(dl)}reflect(t){return this.sub(dl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(se(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Ac.prototype.isVector3=!0;var z=Ac,dl=new z,Kh=new Le,Rc=class Rc{constructor(t,e,n,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],y=s[0],p=s[3],g=s[6],_=s[1],E=s[4],v=s[7],T=s[2],R=s[5],x=s[8];return r[0]=o*y+a*_+l*T,r[3]=o*p+a*E+l*R,r[6]=o*g+a*v+l*x,r[1]=c*y+h*_+u*T,r[4]=c*p+h*E+u*R,r[7]=c*g+h*v+u*x,r[2]=d*y+f*_+m*T,r[5]=d*p+f*E+m*R,r[8]=d*g+f*v+m*x,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,m=e*u+n*d+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/m;return t[0]=u*y,t[1]=(s*c-h*n)*y,t[2]=(a*n-s*o)*y,t[3]=d*y,t[4]=(h*e-s*l)*y,t[5]=(s*r-a*e)*y,t[6]=f*y,t[7]=(n*l-c*e)*y,t[8]=(o*e-n*r)*y,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return Zs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(fl.makeScale(t,e)),this}rotate(t){return Zs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(fl.makeRotation(-t)),this}translate(t,e){return Zs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(fl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Rc.prototype.isMatrix3=!0;var Jt=Rc,fl=new Jt,Qh=new Jt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),jh=new Jt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function hp(){let i={enabled:!0,workingColorSpace:tr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===me&&(s.r=$n(s.r),s.g=$n(s.g),s.b=$n(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===me&&(s.r=ls(s.r),s.g=ls(s.g),s.b=ls(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ei?er:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[tr]:{primaries:t,whitePoint:n,transfer:er,toXYZ:Qh,fromXYZ:jh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:be},outputColorSpaceConfig:{drawingBufferColorSpace:be}},[be]:{primaries:t,whitePoint:n,transfer:me,toXYZ:Qh,fromXYZ:jh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:be}}}),i}var ce=hp();function $n(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ls(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Yi,Co=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Yi===void 0&&(Yi=us("canvas")),Yi.width=t.width,Yi.height=t.height;let s=Yi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Yi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=us("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=$n(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor($n(e[n]/255)*255):e[n]=$n(e[n]);return{data:e,width:t.width,height:t.height}}else return Wt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},up=0,ps=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:up++}),this.uuid=ni(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(pl(s[o].image)):r.push(pl(s[o]))}else r=pl(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function pl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Co.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Wt("Texture: Unable to serialize Texture."),{})}var dp=0,ml=new z,Ye=class i extends Fn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Tn,s=Tn,r=en,o=jn,a=Ln,l=rn,c=i.DEFAULT_ANISOTROPY,h=ei){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:dp++}),this.uuid=ni(),this.name="",this.source=new ps(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new xt(0,0),this.repeat=new xt(1,1),this.center=new xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Jt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(ml).x}get height(){return this.source.getSize(ml).y}get depth(){return this.source.getSize(ml).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Wt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Wt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==sc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case fi:t.x=t.x-Math.floor(t.x);break;case Tn:t.x=t.x<0?0:1;break;case Ao:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case fi:t.y=t.y-Math.floor(t.y);break;case Tn:t.y=t.y<0?0:1;break;case Ao:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Ye.DEFAULT_IMAGE=null;Ye.DEFAULT_MAPPING=sc;Ye.DEFAULT_ANISOTROPY=1;var Cc=class Cc{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],m=l[9],y=l[2],p=l[6],g=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-y)<.01&&Math.abs(m-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+y)<.1&&Math.abs(m+p)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let E=(c+1)/2,v=(f+1)/2,T=(g+1)/2,R=(h+d)/4,x=(u+y)/4,S=(m+p)/4;return E>v&&E>T?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=R/n,r=x/n):v>T?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=R/s,r=S/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=x/r,s=S/r),this.set(n,s,r,e),this}let _=Math.sqrt((p-m)*(p-m)+(u-y)*(u-y)+(d-h)*(d-h));return Math.abs(_)<.001&&(_=1),this.x=(p-m)/_,this.y=(u-y)/_,this.z=(d-h)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=se(this.x,t.x,e.x),this.y=se(this.y,t.y,e.y),this.z=se(this.z,t.z,e.z),this.w=se(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=se(this.x,t,e),this.y=se(this.y,t,e),this.z=se(this.z,t,e),this.w=se(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(se(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Cc.prototype.isVector4=!0;var xe=Cc,Po=class extends Fn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:en,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new xe(0,0,t,e),this.scissorTest=!1,this.viewport=new xe(0,0,t,e),this.textures=[];let s=n.count;for(let r=0;r<s;r++)this.textures[r]=new Ye({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:en,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new ps(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},cn=class extends Po{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},ir=class extends Ye{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ke,this.minFilter=ke,this.wrapR=Tn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Io=class extends Ye{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ke,this.minFilter=ke,this.wrapR=Tn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var ea=class ea{constructor(t,e,n,s,r,o,a,l,c,h,u,d,f,m,y,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,u,d,f,m,y,p)}set(t,e,n,s,r,o,a,l,c,h,u,d,f,m,y,p){let g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=s,g[1]=r,g[5]=o,g[9]=a,g[13]=l,g[2]=c,g[6]=h,g[10]=u,g[14]=d,g[3]=f,g[7]=m,g[11]=y,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ea().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/Zi.setFromMatrixColumn(t,0).length(),r=1/Zi.setFromMatrixColumn(t,1).length(),o=1/Zi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let d=o*h,f=o*u,m=a*h,y=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+m*c,e[5]=d-y*c,e[9]=-a*l,e[2]=y-d*c,e[6]=m+f*c,e[10]=o*l}else if(t.order==="YXZ"){let d=l*h,f=l*u,m=c*h,y=c*u;e[0]=d+y*a,e[4]=m*a-f,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-m,e[6]=y+d*a,e[10]=o*l}else if(t.order==="ZXY"){let d=l*h,f=l*u,m=c*h,y=c*u;e[0]=d-y*a,e[4]=-o*u,e[8]=m+f*a,e[1]=f+m*a,e[5]=o*h,e[9]=y-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let d=o*h,f=o*u,m=a*h,y=a*u;e[0]=l*h,e[4]=m*c-f,e[8]=d*c+y,e[1]=l*u,e[5]=y*c+d,e[9]=f*c-m,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let d=o*l,f=o*c,m=a*l,y=a*c;e[0]=l*h,e[4]=y-d*u,e[8]=m*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*u+m,e[10]=d-y*u}else if(t.order==="XZY"){let d=o*l,f=o*c,m=a*l,y=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+y,e[5]=o*h,e[9]=f*u-m,e[2]=m*u-f,e[6]=a*h,e[10]=y*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(fp,t,pp)}lookAt(t,e,n){let s=this.elements;return an.subVectors(t,e),an.lengthSq()===0&&(an.z=1),an.normalize(),ai.crossVectors(n,an),ai.lengthSq()===0&&(Math.abs(n.z)===1?an.x+=1e-4:an.z+=1e-4,an.normalize(),ai.crossVectors(n,an)),ai.normalize(),Yr.crossVectors(an,ai),s[0]=ai.x,s[4]=Yr.x,s[8]=an.x,s[1]=ai.y,s[5]=Yr.y,s[9]=an.y,s[2]=ai.z,s[6]=Yr.z,s[10]=an.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],y=n[6],p=n[10],g=n[14],_=n[3],E=n[7],v=n[11],T=n[15],R=s[0],x=s[4],S=s[8],F=s[12],M=s[1],C=s[5],N=s[9],O=s[13],I=s[2],G=s[6],X=s[10],U=s[14],V=s[3],P=s[7],L=s[11],A=s[15];return r[0]=o*R+a*M+l*I+c*V,r[4]=o*x+a*C+l*G+c*P,r[8]=o*S+a*N+l*X+c*L,r[12]=o*F+a*O+l*U+c*A,r[1]=h*R+u*M+d*I+f*V,r[5]=h*x+u*C+d*G+f*P,r[9]=h*S+u*N+d*X+f*L,r[13]=h*F+u*O+d*U+f*A,r[2]=m*R+y*M+p*I+g*V,r[6]=m*x+y*C+p*G+g*P,r[10]=m*S+y*N+p*X+g*L,r[14]=m*F+y*O+p*U+g*A,r[3]=_*R+E*M+v*I+T*V,r[7]=_*x+E*C+v*G+T*P,r[11]=_*S+E*N+v*X+T*L,r[15]=_*F+E*O+v*U+T*A,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],m=t[3],y=t[7],p=t[11],g=t[15],_=l*f-c*d,E=a*f-c*u,v=a*d-l*u,T=o*f-c*h,R=o*d-l*h,x=o*u-a*h;return e*(y*_-p*E+g*v)-n*(m*_-p*T+g*R)+s*(m*E-y*T+g*x)-r*(m*v-y*R+p*x)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],l=t[2],c=t[6],h=t[10];return e*(o*h-a*c)-n*(r*h-a*l)+s*(r*c-o*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],m=t[12],y=t[13],p=t[14],g=t[15],_=e*a-n*o,E=e*l-s*o,v=e*c-r*o,T=n*l-s*a,R=n*c-r*a,x=s*c-r*l,S=h*y-u*m,F=h*p-d*m,M=h*g-f*m,C=u*p-d*y,N=u*g-f*y,O=d*g-f*p,I=_*O-E*N+v*C+T*M-R*F+x*S;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let G=1/I;return t[0]=(a*O-l*N+c*C)*G,t[1]=(s*N-n*O-r*C)*G,t[2]=(y*x-p*R+g*T)*G,t[3]=(d*R-u*x-f*T)*G,t[4]=(l*M-o*O-c*F)*G,t[5]=(e*O-s*M+r*F)*G,t[6]=(p*v-m*x-g*E)*G,t[7]=(h*x-d*v+f*E)*G,t[8]=(o*N-a*M+c*S)*G,t[9]=(n*M-e*N-r*S)*G,t[10]=(m*R-y*v+g*_)*G,t[11]=(u*v-h*R-f*_)*G,t[12]=(a*F-o*C-l*S)*G,t[13]=(e*C-n*F+s*S)*G,t[14]=(y*E-m*T-p*_)*G,t[15]=(h*T-u*E+d*_)*G,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,m=r*u,y=o*h,p=o*u,g=a*u,_=l*c,E=l*h,v=l*u,T=n.x,R=n.y,x=n.z;return s[0]=(1-(y+g))*T,s[1]=(f+v)*T,s[2]=(m-E)*T,s[3]=0,s[4]=(f-v)*R,s[5]=(1-(d+g))*R,s[6]=(p+_)*R,s[7]=0,s[8]=(m+E)*x,s[9]=(p-_)*x,s[10]=(1-(d+y))*x,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=Zi.set(s[0],s[1],s[2]).length(),a=Zi.set(s[4],s[5],s[6]).length(),l=Zi.set(s[8],s[9],s[10]).length();r<0&&(o=-o),bn.copy(this);let c=1/o,h=1/a,u=1/l;return bn.elements[0]*=c,bn.elements[1]*=c,bn.elements[2]*=c,bn.elements[4]*=h,bn.elements[5]*=h,bn.elements[6]*=h,bn.elements[8]*=u,bn.elements[9]*=u,bn.elements[10]*=u,e.setFromRotationMatrix(bn),n.x=o,n.y=a,n.z=l,this}makePerspective(t,e,n,s,r,o,a=xn,l=!1){let c=this.elements,h=2*r/(e-t),u=2*r/(n-s),d=(e+t)/(e-t),f=(n+s)/(n-s),m,y;if(l)m=r/(o-r),y=o*r/(o-r);else if(a===xn)m=-(o+r)/(o-r),y=-2*o*r/(o-r);else if(a===hs)m=-o/(o-r),y=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=xn,l=!1){let c=this.elements,h=2/(e-t),u=2/(n-s),d=-(e+t)/(e-t),f=-(n+s)/(n-s),m,y;if(l)m=1/(o-r),y=o/(o-r);else if(a===xn)m=-2/(o-r),y=-(o+r)/(o-r);else if(a===hs)m=-1/(o-r),y=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};ea.prototype.isMatrix4=!0;var Xt=ea,Zi=new z,bn=new Xt,fp=new z(0,0,0),pp=new z(1,1,1),ai=new z,Yr=new z,an=new z,tu=new Xt,eu=new Le,An=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(se(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-se(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(se(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-se(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(se(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-se(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Wt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return tu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(tu,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return eu.setFromEuler(this),this.setFromQuaternion(eu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};An.DEFAULT_ORDER="XYZ";var sr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},mp=0,nu=new z,$i=new Le,Wn=new Xt,Zr=new z,zs=new z,gp=new z,xp=new Le,iu=new z(1,0,0),su=new z(0,1,0),ru=new z(0,0,1),ou={type:"added"},_p={type:"removed"},Ji={type:"childadded",child:null},gl={type:"childremoved",child:null},Ze=class i extends Fn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:mp++}),this.uuid=ni(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new z,e=new An,n=new Le,s=new z(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Xt},normalMatrix:{value:new Jt}}),this.matrix=new Xt,this.matrixWorld=new Xt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new sr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return $i.setFromAxisAngle(t,e),this.quaternion.multiply($i),this}rotateOnWorldAxis(t,e){return $i.setFromAxisAngle(t,e),this.quaternion.premultiply($i),this}rotateX(t){return this.rotateOnAxis(iu,t)}rotateY(t){return this.rotateOnAxis(su,t)}rotateZ(t){return this.rotateOnAxis(ru,t)}translateOnAxis(t,e){return nu.copy(t).applyQuaternion(this.quaternion),this.position.add(nu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(iu,t)}translateY(t){return this.translateOnAxis(su,t)}translateZ(t){return this.translateOnAxis(ru,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Wn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Zr.copy(t):Zr.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),zs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Wn.lookAt(zs,Zr,this.up):Wn.lookAt(Zr,zs,this.up),this.quaternion.setFromRotationMatrix(Wn),s&&(Wn.extractRotation(s.matrixWorld),$i.setFromRotationMatrix(Wn),this.quaternion.premultiply($i.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Yt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ou),Ji.child=t,this.dispatchEvent(Ji),Ji.child=null):Yt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(_p),gl.child=t,this.dispatchEvent(gl),gl.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Wn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Wn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Wn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ou),Ji.child=t,this.dispatchEvent(Ji),Ji.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zs,t,gp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zs,xp,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ze.DEFAULT_UP=new z(0,1,0);Ze.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ze.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ae=class extends Ze{constructor(){super(),this.isGroup=!0,this.type="Group"}},yp={type:"move"},ms=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ae,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ae,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ae,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let y of t.hand.values()){let p=e.getJointPose(y,n),g=this._getHandJoint(c,y);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(yp)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Ae;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},ud={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},li={h:0,s:0,l:0},$r={h:0,s:0,l:0};function xl(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var kt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=be){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ce.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=ce.workingColorSpace){return this.r=t,this.g=e,this.b=n,ce.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=ce.workingColorSpace){if(t=xc(t,1),e=se(e,0,1),n=se(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=xl(o,r,t+1/3),this.g=xl(o,r,t),this.b=xl(o,r,t-1/3)}return ce.colorSpaceToWorking(this,s),this}setStyle(t,e=be){function n(r){r!==void 0&&parseFloat(r)<1&&Wt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Wt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Wt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=be){let n=ud[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Wt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=$n(t.r),this.g=$n(t.g),this.b=$n(t.b),this}copyLinearToSRGB(t){return this.r=ls(t.r),this.g=ls(t.g),this.b=ls(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=be){return ce.workingToColorSpace(qe.copy(this),t),Math.round(se(qe.r*255,0,255))*65536+Math.round(se(qe.g*255,0,255))*256+Math.round(se(qe.b*255,0,255))}getHexString(t=be){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ce.workingColorSpace){ce.workingToColorSpace(qe.copy(this),e);let n=qe.r,s=qe.g,r=qe.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ce.workingColorSpace){return ce.workingToColorSpace(qe.copy(this),e),t.r=qe.r,t.g=qe.g,t.b=qe.b,t}getStyle(t=be){ce.workingToColorSpace(qe.copy(this),t);let e=qe.r,n=qe.g,s=qe.b;return t!==be?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(li),this.setHSL(li.h+t,li.s+e,li.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(li),t.getHSL($r);let n=Js(li.h,$r.h,e),s=Js(li.s,$r.s,e),r=Js(li.l,$r.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},qe=new kt;kt.NAMES=ud;var gs=class i{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new kt(t),this.near=e,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},xs=class extends Ze{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new An,this.environmentIntensity=1,this.environmentRotation=new An,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},En=new z,Xn=new z,_l=new z,qn=new z,Ki=new z,Qi=new z,au=new z,yl=new z,vl=new z,Ml=new z,Sl=new xe,bl=new xe,El=new xe,di=class i{constructor(t=new z,e=new z,n=new z){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),En.subVectors(t,e),s.cross(En);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){En.subVectors(s,e),Xn.subVectors(n,e),_l.subVectors(t,e);let o=En.dot(En),a=En.dot(Xn),l=En.dot(_l),c=Xn.dot(Xn),h=Xn.dot(_l),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(c*l-a*h)*d,m=(o*h-a*l)*d;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,qn)===null?!1:qn.x>=0&&qn.y>=0&&qn.x+qn.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,qn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,qn.x),l.addScaledVector(o,qn.y),l.addScaledVector(a,qn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return Sl.setScalar(0),bl.setScalar(0),El.setScalar(0),Sl.fromBufferAttribute(t,e),bl.fromBufferAttribute(t,n),El.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Sl,r.x),o.addScaledVector(bl,r.y),o.addScaledVector(El,r.z),o}static isFrontFacing(t,e,n,s){return En.subVectors(n,e),Xn.subVectors(t,e),En.cross(Xn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return En.subVectors(this.c,this.b),Xn.subVectors(this.a,this.b),En.cross(Xn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;Ki.subVectors(s,n),Qi.subVectors(r,n),yl.subVectors(t,n);let l=Ki.dot(yl),c=Qi.dot(yl);if(l<=0&&c<=0)return e.copy(n);vl.subVectors(t,s);let h=Ki.dot(vl),u=Qi.dot(vl);if(h>=0&&u<=h)return e.copy(s);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0&&l-h>0)return o=l/(l-h),e.copy(n).addScaledVector(Ki,o);Ml.subVectors(t,r);let f=Ki.dot(Ml),m=Qi.dot(Ml);if(m>=0&&f<=m)return e.copy(r);let y=f*c-l*m;if(y<=0&&c>=0&&m<=0)return a=c/(c-m),e.copy(n).addScaledVector(Qi,a);let p=h*m-f*u;if(p<=0&&u-h>=0&&f-m>=0)return au.subVectors(r,s),a=(u-h)/(u-h+(f-m)),e.copy(s).addScaledVector(au,a);let g=1/(p+y+d);return o=y*g,a=d*g,e.copy(n).addScaledVector(Ki,o).addScaledVector(Qi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},On=class{constructor(t=new z(1/0,1/0,1/0),e=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(wn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(wn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=wn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,wn):wn.fromBufferAttribute(r,o),wn.applyMatrix4(t.matrixWorld),this.expandByPoint(wn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Jr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Jr.copy(n.boundingBox)),Jr.applyMatrix4(t.matrixWorld),this.union(Jr)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,wn),wn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Gs),Kr.subVectors(this.max,Gs),ji.subVectors(t.a,Gs),ts.subVectors(t.b,Gs),es.subVectors(t.c,Gs),ci.subVectors(ts,ji),hi.subVectors(es,ts),Li.subVectors(ji,es);let e=[0,-ci.z,ci.y,0,-hi.z,hi.y,0,-Li.z,Li.y,ci.z,0,-ci.x,hi.z,0,-hi.x,Li.z,0,-Li.x,-ci.y,ci.x,0,-hi.y,hi.x,0,-Li.y,Li.x,0];return!wl(e,ji,ts,es,Kr)||(e=[1,0,0,0,1,0,0,0,1],!wl(e,ji,ts,es,Kr))?!1:(Qr.crossVectors(ci,hi),e=[Qr.x,Qr.y,Qr.z],wl(e,ji,ts,es,Kr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,wn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(wn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Yn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Yn=[new z,new z,new z,new z,new z,new z,new z,new z],wn=new z,Jr=new On,ji=new z,ts=new z,es=new z,ci=new z,hi=new z,Li=new z,Gs=new z,Kr=new z,Qr=new z,Di=new z;function wl(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Di.fromArray(i,r);let a=s.x*Math.abs(Di.x)+s.y*Math.abs(Di.y)+s.z*Math.abs(Di.z),l=t.dot(Di),c=e.dot(Di),h=n.dot(Di);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var Ie=new z,jr=new xt,vp=0,ue=class extends Fn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:vp++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=pc,this.updateRanges=[],this.gpuType=yn,this.version=0,this._normalizationScale=t!==void 0?Ga(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)jr.fromBufferAttribute(this,e),jr.applyMatrix3(t),this.setXY(e,jr.x,jr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix3(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix4(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyNormalMatrix(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.transformDirection(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):yc(t,this.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):vc(t,this.array)}};var rr=class extends ue{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var or=class extends ue{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var qt=class extends ue{constructor(t,e,n){super(new Float32Array(t),e,n)}},Mp=new On,Vs=new z,Tl=new z,pi=class{constructor(t=new z,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Mp.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Vs.subVectors(t,this.center);let e=Vs.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Vs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Tl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Vs.copy(t.center).add(Tl)),this.expandByPoint(Vs.copy(t.center).sub(Tl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Sp=0,mn=new Xt,Al=new Ze,ns=new z,ln=new On,Ws=new On,Be=new z,pe=class i extends Fn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Sp++}),this.uuid=ni(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Yf(t)?or:rr)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Jt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return mn.makeRotationFromQuaternion(t),this.applyMatrix4(mn),this}rotateX(t){return mn.makeRotationX(t),this.applyMatrix4(mn),this}rotateY(t){return mn.makeRotationY(t),this.applyMatrix4(mn),this}rotateZ(t){return mn.makeRotationZ(t),this.applyMatrix4(mn),this}translate(t,e,n){return mn.makeTranslation(t,e,n),this.applyMatrix4(mn),this}scale(t,e,n){return mn.makeScale(t,e,n),this.applyMatrix4(mn),this}lookAt(t){return Al.lookAt(t),Al.updateMatrix(),this.applyMatrix4(Al.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ns).negate(),this.translate(ns.x,ns.y,ns.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new qt(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Wt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new On);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Yt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];ln.setFromBufferAttribute(r),this.morphTargetsRelative?(Be.addVectors(this.boundingBox.min,ln.min),this.boundingBox.expandByPoint(Be),Be.addVectors(this.boundingBox.max,ln.max),this.boundingBox.expandByPoint(Be)):(this.boundingBox.expandByPoint(ln.min),this.boundingBox.expandByPoint(ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Yt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Yt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(t){let n=this.boundingSphere.center;if(ln.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Ws.setFromBufferAttribute(a),this.morphTargetsRelative?(Be.addVectors(ln.min,Ws.min),ln.expandByPoint(Be),Be.addVectors(ln.max,Ws.max),ln.expandByPoint(Be)):(ln.expandByPoint(Ws.min),ln.expandByPoint(Ws.max))}ln.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Be.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Be));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Be.fromBufferAttribute(a,c),l&&(ns.fromBufferAttribute(t,c),Be.add(ns)),s=Math.max(s,n.distanceToSquared(Be))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Yt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Yt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new ue(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[],c=new Uint8Array(n.count);for(let F=0;F<n.count;F++)a[F]=new z,l[F]=new z;let h=new z,u=new z,d=new z,f=new xt,m=new xt,y=new xt,p=new z,g=new z;function _(F,M,C){c[F]=c[M]=c[C]=1,h.fromBufferAttribute(n,F),u.fromBufferAttribute(n,M),d.fromBufferAttribute(n,C),f.fromBufferAttribute(r,F),m.fromBufferAttribute(r,M),y.fromBufferAttribute(r,C),u.sub(h),d.sub(h),m.sub(f),y.sub(f);let N=1/(m.x*y.y-y.x*m.y);isFinite(N)&&(p.copy(u).multiplyScalar(y.y).addScaledVector(d,-m.y).multiplyScalar(N),g.copy(d).multiplyScalar(m.x).addScaledVector(u,-y.x).multiplyScalar(N),a[F].add(p),a[M].add(p),a[C].add(p),l[F].add(g),l[M].add(g),l[C].add(g))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let F=0,M=E.length;F<M;++F){let C=E[F],N=C.start,O=C.count;for(let I=N,G=N+O;I<G;I+=3)_(t.getX(I+0),t.getX(I+1),t.getX(I+2))}let v=new z,T=new z,R=new z,x=new z;function S(F){R.fromBufferAttribute(s,F),x.copy(R);let M=a[F];v.copy(M),v.sub(R.multiplyScalar(R.dot(M))).normalize(),T.crossVectors(x,M);let N=T.dot(l[F])<0?-1:1;o.setXYZW(F,v.x,v.y,v.z,N)}for(let F=0,M=n.count;F<M;++F)c[F]&&S(F);this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new ue(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let s=new z,r=new z,o=new z,a=new z,l=new z,c=new z,h=new z,u=new z;if(t)for(let d=0,f=t.count;d<f;d+=3){let m=t.getX(d+0),y=t.getX(d+1),p=t.getX(d+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,y),o.fromBufferAttribute(e,p),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,p),a.add(h),l.add(h),c.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Be.fromBufferAttribute(t,e),Be.normalize(),t.setXYZ(e,Be.x,Be.y,Be.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),f=0,m=0;for(let y=0,p=l.length;y<p;y++){a.isInterleavedBufferAttribute?f=l[y]*a.data.stride+a.offset:f=l[y]*h;for(let g=0;g<h;g++)d[m++]=c[f++]}return new ue(d,h,u)}if(this.index===null)return Wt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},ar=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=pc,this.updateRanges=[],this.version=0,this.uuid=ni()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={});let e=lu(this.array);t.arrayBuffers[e]===void 0&&(t.arrayBuffers[e]=this.array.slice(0).buffer);let n=new this.array.constructor(t.arrayBuffers[e]),s=new this.constructor(n,this.stride);return s.setUsage(this.usage),s}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={});let e=lu(this.array);t.arrayBuffers[e]===void 0&&(t.arrayBuffers[e]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:e,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};function lu(i){return i.buffer._uuid===void 0&&(i.buffer._uuid=ni()),i.byteOffset===0&&i.byteLength===i.buffer.byteLength?i.buffer._uuid:i.buffer._uuid+":"+i.byteOffset+":"+i.byteLength}var je=new z,_s=class i{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s,this._normalizationScale=t!==void 0?Ga(t.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)je.fromBufferAttribute(this,e),je.applyMatrix4(t),this.setXYZ(e,je.x,je.y,je.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.applyNormalMatrix(t),this.setXYZ(e,je.x,je.y,je.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.transformDirection(t),this.setXYZ(e,je.x,je.y,je.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=this._denormalize(e)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=this._denormalize(e)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=this._denormalize(e)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=this._denormalize(e)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){nr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new ue(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new i(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){nr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):yc(t,this.data.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):vc(t,this.data.array)}},Rl=new z,bp=new z,Ep=new Jt,gn=class{constructor(t=new z(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Rl.subVectors(n,e).cross(bp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(Rl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Ep.getNormalMatrix(t),s=this.coplanarPoint(Rl).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},wp=0,mi=class extends Fn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:wp++}),this.uuid=ni(),this.name="",this.type="Material",this.blending=Ts,this.side=Si,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=$l,this.blendDst=Jl,this.blendEquation=zi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new kt(0,0,0),this.blendAlpha=0,this.depthFunc=cs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ed,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=_o,this.stencilZFail=_o,this.stencilZPass=_o,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Wt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Wt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new kt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new gn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new xt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new xt().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Zn=new z,Cl=new z,to=new z,eo=new z,Lo=class{constructor(t=new z,e=new z(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Zn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Zn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Zn.copy(this.origin).addScaledVector(this.direction,e),Zn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Cl.copy(t).add(e).multiplyScalar(.5),to.copy(e).sub(t).normalize(),eo.copy(this.origin).sub(Cl);let r=t.distanceTo(e)*.5,o=-this.direction.dot(to),a=eo.dot(this.direction),l=-eo.dot(to),c=eo.lengthSq(),h=Math.abs(1-o*o),u,d,f,m;if(h>0)if(u=o*l-a,d=o*a-l,m=r*h,u>=0)if(d>=-m)if(d<=m){let y=1/h;u*=y,d*=y,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Cl).addScaledVector(to,d),f}intersectSphere(t,e){if(t.radius<0)return null;Zn.subVectors(t.center,this.origin);let n=Zn.dot(this.direction),s=Zn.dot(Zn)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Zn)!==null}intersectTriangle(t,e,n,s,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,h=a.z,u=t.x-o.x,d=t.y-o.y,f=t.z-o.z,m=e.x-o.x,y=e.y-o.y,p=e.z-o.z,g=n.x-o.x,_=n.y-o.y,E=n.z-o.z,v=Math.abs(l),T=Math.abs(c),R=Math.abs(h),x,S,F,M,C,N,O,I,G,X,U,V;if(v>=T&&v>=R?(F=l,N=u,G=m,V=g,l>=0?(x=c,S=h,M=d,C=f,O=y,I=p,X=_,U=E):(x=h,S=c,M=f,C=d,O=p,I=y,X=E,U=_)):T>=R?(F=c,N=d,G=y,V=_,c>=0?(x=h,S=l,M=f,C=u,O=p,I=m,X=E,U=g):(x=l,S=h,M=u,C=f,O=m,I=p,X=g,U=E)):(F=h,N=f,G=p,V=E,h>=0?(x=l,S=c,M=u,C=d,O=m,I=y,X=g,U=_):(x=c,S=l,M=d,C=u,O=y,I=m,X=_,U=g)),F===0)return null;let P=x/F,L=S/F,A=1/F,B=M-P*N,Z=C-L*N,k=O-P*G,Y=I-L*G,et=X-P*V,ht=U-L*V,j=et*Y-ht*k,ct=B*ht-Z*et,pt=k*Z-Y*B;if(s){if(j<0||ct<0||pt<0)return null}else if((j<0||ct<0||pt<0)&&(j>0||ct>0||pt>0))return null;let lt=j+ct+pt;if(lt===0)return null;let _t=A*(j*N+ct*G+pt*V);return(lt>0?_t<0:_t>0)?null:this.at(_t/lt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ze=class extends mi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new An,this.combine=Kl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},cu=new Xt,Ni=new Lo,no=new pi,hu=new z,io=new z,so=new z,ro=new z,Pl=new z,oo=new z,uu=new z,ao=new z,re=class extends Ze{constructor(t=new pe,e=new ze){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){oo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(Pl.fromBufferAttribute(u,t),o?oo.addScaledVector(Pl,h):oo.addScaledVector(Pl.sub(e),h))}e.add(oo)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),no.copy(n.boundingSphere),no.applyMatrix4(r),Ni.copy(t.ray).recast(t.near),!(no.containsPoint(Ni.origin)===!1&&(Ni.intersectSphere(no,hu)===null||Ni.origin.distanceToSquared(hu)>(t.far-t.near)**2))&&(cu.copy(r).invert(),Ni.copy(t.ray).applyMatrix4(cu),!(n.boundingBox!==null&&Ni.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ni)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,y=d.length;m<y;m++){let p=d[m],g=o[p.materialIndex],_=Math.max(p.start,f.start),E=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let v=_,T=E;v<T;v+=3){let R=a.getX(v),x=a.getX(v+1),S=a.getX(v+2);s=lo(this,g,t,n,c,h,u,R,x,S),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let m=Math.max(0,f.start),y=Math.min(a.count,f.start+f.count);for(let p=m,g=y;p<g;p+=3){let _=a.getX(p),E=a.getX(p+1),v=a.getX(p+2);s=lo(this,o,t,n,c,h,u,_,E,v),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,y=d.length;m<y;m++){let p=d[m],g=o[p.materialIndex],_=Math.max(p.start,f.start),E=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let v=_,T=E;v<T;v+=3){let R=v,x=v+1,S=v+2;s=lo(this,g,t,n,c,h,u,R,x,S),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let m=Math.max(0,f.start),y=Math.min(l.count,f.start+f.count);for(let p=m,g=y;p<g;p+=3){let _=p,E=p+1,v=p+2;s=lo(this,o,t,n,c,h,u,_,E,v),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}};function Tp(i,t,e,n,s,r,o,a){let l;if(t.side===$e?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===Si,a),l===null)return null;ao.copy(a),ao.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(ao);return c<e.near||c>e.far?null:{distance:c,point:ao.clone(),object:i}}function lo(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,io),i.getVertexPosition(l,so),i.getVertexPosition(c,ro);let h=Tp(i,t,e,n,io,so,ro,uu);if(h){let u=new z;di.getBarycoord(uu,io,so,ro,u),s&&(h.uv=di.getInterpolatedAttribute(s,a,l,c,u,new xt)),r&&(h.uv1=di.getInterpolatedAttribute(r,a,l,c,u,new xt)),o&&(h.normal=di.getInterpolatedAttribute(o,a,l,c,u,new z),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new z,materialIndex:0};di.getNormal(io,so,ro,d.normal),h.face=d,h.barycoord=u}return h}var lr=class extends Ye{constructor(t=null,e=1,n=1,s,r,o,a,l,c=ke,h=ke,u,d){super(null,o,a,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var gi=class extends ue{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},is=new Xt,du=new Xt,co=[],fu=new On,Ap=new Xt,Xs=new re,qs=new pi,hn=class extends re{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new gi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Ap)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new On),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,is),fu.copy(t.boundingBox).applyMatrix4(is),this.boundingBox.union(fu)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new pi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,is),qs.copy(t.boundingSphere).applyMatrix4(is),this.boundingSphere.union(qs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),this.morphTexture=t.morphTexture!==null?t.morphTexture.clone():null,this.instanceColor=t.instanceColor!==null?t.instanceColor.clone():null,this.count=t.count,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(Xs.geometry=this.geometry,Xs.material=this.material,Xs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),qs.copy(this.boundingSphere),qs.applyMatrix4(n),t.ray.intersectsSphere(qs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,is),du.multiplyMatrices(n,is),Xs.matrixWorld=du,Xs.raycast(t,co);for(let o=0,a=co.length;o<a;o++){let l=co[o];l.instanceId=r,l.object=this,e.push(l)}co.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new gi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new lr(new Float32Array(s*this.count),s,this.count,aa,yn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;return r[l]=a,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ui=new pi,Rp=new xt(.5,.5),ho=new z,xi=class{constructor(t=new gn,e=new gn,n=new gn,s=new gn,r=new gn,o=new gn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=xn,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],m=r[8],y=r[9],p=r[10],g=r[11],_=r[12],E=r[13],v=r[14],T=r[15];if(s[0].setComponents(c-o,f-h,g-m,T-_).normalize(),s[1].setComponents(c+o,f+h,g+m,T+_).normalize(),s[2].setComponents(c+a,f+u,g+y,T+E).normalize(),s[3].setComponents(c-a,f-u,g-y,T-E).normalize(),n)s[4].setComponents(l,d,p,v).normalize(),s[5].setComponents(c-l,f-d,g-p,T-v).normalize();else if(s[4].setComponents(c-l,f-d,g-p,T-v).normalize(),e===xn)s[5].setComponents(c+l,f+d,g+p,T+v).normalize();else if(e===hs)s[5].setComponents(l,d,p,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ui.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ui.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ui)}intersectsSprite(t){Ui.center.set(0,0,0);let e=Rp.distanceTo(t.center);return Ui.radius=.7071067811865476+e,Ui.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ui)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(ho.x=s.normal.x>0?t.max.x:t.min.x,ho.y=s.normal.y>0?t.max.y:t.min.y,ho.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ho)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},pu=new Xt,Do=class i{constructor(){this.coordinateSystem=xn,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,n=this._frustums;for(let s=0;s<e.length;s++){let r=e[s];pu.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new xi),n[s].setFromProjectionMatrix(pu,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,n=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new xi),e[s].copy(n[s]);return this._count=t._count,this}clone(){return new i().copy(this)}};var cr=class extends Ye{constructor(t=[],e=Gi,n,s,r,o,a,l,c,h){super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Rn=class extends Ye{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Kn=class extends Ye{constructor(t,e,n=Pn,s,r,o,a=ke,l=ke,c,h=Jn,u=1){if(h!==Jn&&h!==ti)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:t,height:e,depth:u};super(d,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ps(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},hr=class extends Kn{constructor(t,e=Pn,n=Gi,s,r,o=ke,a=ke,l,c=Jn){let h={width:t,height:t,depth:1},u=[h,h,h,h,h,h];super(t,t,e,n,s,r,o,a,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},ur=class extends Ye{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Ct=class i extends pe{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,f=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,s,o,2),m("x","z","y",1,-1,t,n,-e,s,o,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new qt(c,3)),this.setAttribute("normal",new qt(h,3)),this.setAttribute("uv",new qt(u,2));function m(y,p,g,_,E,v,T,R,x,S,F){let M=v/x,C=T/S,N=v/2,O=T/2,I=R/2,G=x+1,X=S+1,U=0,V=0,P=new z;for(let L=0;L<X;L++){let A=L*C-O;for(let B=0;B<G;B++){let Z=B*M-N;P[y]=Z*_,P[p]=A*E,P[g]=I,c.push(P.x,P.y,P.z),P[y]=0,P[p]=0,P[g]=R>0?1:-1,h.push(P.x,P.y,P.z),u.push(B/x),u.push(1-L/S),U+=1}}for(let L=0;L<S;L++)for(let A=0;A<x;A++){let B=d+A+G*L,Z=d+A+G*(L+1),k=d+(A+1)+G*(L+1),Y=d+(A+1)+G*L;l.push(B,Z,Y),l.push(Z,k,Y),V+=6}a.addGroup(f,V,F),f+=V,d+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Fi=class i extends pe{constructor(t=1,e=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:n,radialSegments:s,heightSegments:r},e=Math.max(0,e),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let o=[],a=[],l=[],c=[],h=e/2,u=Math.PI/2*t,d=e,f=2*u+d,m=n*2+r,y=s+1,p=new z,g=new z;for(let _=0;_<=m;_++){let E=0,v=0,T=0,R=0;if(_<=n){let F=_/n,M=F*Math.PI/2;v=-h-t*Math.cos(M),T=t*Math.sin(M),R=-t*Math.cos(M),E=F*u}else if(_<=n+r){let F=(_-n)/r;v=-h+F*e,T=t,R=0,E=u+F*d}else{let F=(_-n-r)/n,M=F*Math.PI/2;v=h+t*Math.sin(M),T=t*Math.cos(M),R=t*Math.sin(M),E=u+d+F*u}let x=Math.max(0,Math.min(1,E/f)),S=0;_===0?S=.5/s:_===m&&(S=-.5/s);for(let F=0;F<=s;F++){let M=F/s,C=M*Math.PI*2,N=Math.sin(C),O=Math.cos(C);g.x=-T*O,g.y=v,g.z=T*N,a.push(g.x,g.y,g.z),p.set(-T*O,R,T*N),p.normalize(),l.push(p.x,p.y,p.z),c.push(M+S,x)}if(_>0){let F=(_-1)*y;for(let M=0;M<s;M++){let C=F+M,N=F+M+1,O=_*y+M,I=_*y+M+1;o.push(C,N,O),o.push(N,I,O)}}}this.setIndex(o),this.setAttribute("position",new qt(a,3)),this.setAttribute("normal",new qt(l,3)),this.setAttribute("uv",new qt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}};var he=class i extends pe{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],d=[],f=[],m=0,y=[],p=n/2,g=0;_(),o===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new qt(u,3)),this.setAttribute("normal",new qt(d,3)),this.setAttribute("uv",new qt(f,2));function _(){let v=new z,T=new z,R=0,x=(e-t)/n;for(let S=0;S<=r;S++){let F=[],M=S/r,C=M*(e-t)+t;for(let N=0;N<=s;N++){let O=N/s,I=O*l+a,G=Math.sin(I),X=Math.cos(I);T.x=C*G,T.y=-M*n+p,T.z=C*X,u.push(T.x,T.y,T.z),v.set(G,x,X).normalize(),d.push(v.x,v.y,v.z),f.push(O,1-M),F.push(m++)}y.push(F)}for(let S=0;S<s;S++)for(let F=0;F<r;F++){let M=y[F][S],C=y[F+1][S],N=y[F+1][S+1],O=y[F][S+1];(t>0||F!==0)&&(h.push(M,C,O),R+=3),(e>0||F!==r-1)&&(h.push(C,N,O),R+=3)}c.addGroup(g,R,0),g+=R}function E(v){let T=m,R=new xt,x=new z,S=0,F=v===!0?t:e,M=v===!0?1:-1;for(let N=1;N<=s;N++)u.push(0,p*M,0),d.push(0,M,0),f.push(.5,.5),m++;let C=m;for(let N=0;N<=s;N++){let I=N/s*l+a,G=Math.cos(I),X=Math.sin(I);x.x=F*X,x.y=p*M,x.z=F*G,u.push(x.x,x.y,x.z),d.push(0,M,0),R.x=G*.5+.5,R.y=X*.5*M+.5,f.push(R.x,R.y),m++}for(let N=0;N<s;N++){let O=T+N,I=C+N;v===!0?h.push(I,I+1,O):h.push(I+1,I,O),S+=3}c.addGroup(g,S,v===!0?1:2),g+=S}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},un=class i extends he{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},No=class i extends pe{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],o=[];a(s),c(n),h(),this.setAttribute("position",new qt(r,3)),this.setAttribute("normal",new qt(r.slice(),3)),this.setAttribute("uv",new qt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(_){let E=new z,v=new z,T=new z;for(let R=0;R<e.length;R+=3)f(e[R+0],E),f(e[R+1],v),f(e[R+2],T),l(E,v,T,_)}function l(_,E,v,T){let R=T+1,x=[];for(let S=0;S<=R;S++){x[S]=[];let F=_.clone().lerp(v,S/R),M=E.clone().lerp(v,S/R),C=R-S;for(let N=0;N<=C;N++)N===0&&S===R?x[S][N]=F:x[S][N]=F.clone().lerp(M,N/C)}for(let S=0;S<R;S++)for(let F=0;F<2*(R-S)-1;F++){let M=Math.floor(F/2);F%2===0?(d(x[S][M+1]),d(x[S+1][M]),d(x[S][M])):(d(x[S][M+1]),d(x[S+1][M+1]),d(x[S+1][M]))}}function c(_){let E=new z;for(let v=0;v<r.length;v+=3)E.x=r[v+0],E.y=r[v+1],E.z=r[v+2],E.normalize().multiplyScalar(_),r[v+0]=E.x,r[v+1]=E.y,r[v+2]=E.z}function h(){let _=new z;for(let E=0;E<r.length;E+=3){_.x=r[E+0],_.y=r[E+1],_.z=r[E+2];let v=p(_)/2/Math.PI+.5,T=g(_)/Math.PI+.5;o.push(v,1-T)}m(),u()}function u(){for(let _=0;_<o.length;_+=6){let E=o[_+0],v=o[_+2],T=o[_+4],R=Math.max(E,v,T),x=Math.min(E,v,T);R>.9&&x<.1&&(E<.2&&(o[_+0]+=1),v<.2&&(o[_+2]+=1),T<.2&&(o[_+4]+=1))}}function d(_){r.push(_.x,_.y,_.z)}function f(_,E){let v=_*3;E.x=t[v+0],E.y=t[v+1],E.z=t[v+2]}function m(){let _=new z,E=new z,v=new z,T=new z,R=new xt,x=new xt,S=new xt;for(let F=0,M=0;F<r.length;F+=9,M+=6){_.set(r[F+0],r[F+1],r[F+2]),E.set(r[F+3],r[F+4],r[F+5]),v.set(r[F+6],r[F+7],r[F+8]),R.set(o[M+0],o[M+1]),x.set(o[M+2],o[M+3]),S.set(o[M+4],o[M+5]),T.copy(_).add(E).add(v).divideScalar(3);let C=p(T);y(R,M+0,_,C),y(x,M+2,E,C),y(S,M+4,v,C)}}function y(_,E,v,T){T<0&&_.x===1&&(o[E]=_.x-1),v.x===0&&v.z===0&&(o[E]=T/2/Math.PI+.5)}function p(_){return Math.atan2(_.z,-_.x)}function g(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.detail)}};var dn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Wt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);let h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new xt:new z);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new z,s=[],r=[],o=[],a=new z,l=new Xt;for(let f=0;f<=t;f++){let m=f/t;s[f]=this.getTangentAt(m,new z)}r[0]=new z,o[0]=new z;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos(se(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,m))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(se(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(s[m],f*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}},ys=class extends dn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new xt){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Uo=class extends ys{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Mc(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}var mu=new z,gu=new z,Il=new Mc,Ll=new Mc,Dl=new Mc,Fo=class extends dn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new z){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(gu.subVectors(s[0],s[1]).add(s[0]),c=gu);let u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(mu.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=mu),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(u),f),y=Math.pow(u.distanceToSquared(d),f),p=Math.pow(d.distanceToSquared(h),f);y<1e-4&&(y=1),m<1e-4&&(m=y),p<1e-4&&(p=y),Il.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,m,y,p),Ll.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,m,y,p),Dl.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,m,y,p)}else this.curveType==="catmullrom"&&(Il.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Ll.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Dl.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Il.calc(l),Ll.calc(l),Dl.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new z().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function xu(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function Cp(i,t){let e=1-i;return e*e*t}function Pp(i,t){return 2*(1-i)*i*t}function Ip(i,t){return i*i*t}function Ks(i,t,e,n){return Cp(i,t)+Pp(i,e)+Ip(i,n)}function Lp(i,t){let e=1-i;return e*e*e*t}function Dp(i,t){let e=1-i;return 3*e*e*i*t}function Np(i,t){return 3*(1-i)*i*i*t}function Up(i,t){return i*i*i*t}function Qs(i,t,e,n,s){return Lp(i,t)+Dp(i,e)+Np(i,n)+Up(i,s)}var dr=class extends dn{constructor(t=new xt,e=new xt,n=new xt,s=new xt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new xt){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Qs(t,s.x,r.x,o.x,a.x),Qs(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Oo=class extends dn{constructor(t=new z,e=new z,n=new z,s=new z){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new z){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Qs(t,s.x,r.x,o.x,a.x),Qs(t,s.y,r.y,o.y,a.y),Qs(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},fr=class extends dn{constructor(t=new xt,e=new xt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new xt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new xt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Bo=class extends dn{constructor(t=new z,e=new z){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new z){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new z){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},pr=class extends dn{constructor(t=new xt,e=new xt,n=new xt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new xt){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Ks(t,s.x,r.x,o.x),Ks(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ko=class extends dn{constructor(t=new z,e=new z,n=new z){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new z){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Ks(t,s.x,r.x,o.x),Ks(t,s.y,r.y,o.y),Ks(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},mr=class extends dn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new xt){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(xu(a,l.x,c.x,h.x,u.x),xu(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new xt().fromArray(s))}return this}},kl=Object.freeze({__proto__:null,ArcCurve:Uo,CatmullRomCurve3:Fo,CubicBezierCurve:dr,CubicBezierCurve3:Oo,EllipseCurve:ys,LineCurve:fr,LineCurve3:Bo,QuadraticBezierCurve:pr,QuadraticBezierCurve3:ko,SplineCurve:mr}),Ho=class extends dn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new kl[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this.cacheLengths=null,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new kl[s.type]().fromJSON(s))}return this.cacheLengths=null,this}},gr=class extends Ho{constructor(t){super(),this.type="Path",this.currentPoint=new xt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new fr(this.currentPoint.clone(),new xt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new pr(this.currentPoint.clone(),new xt(t,e),new xt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new dr(this.currentPoint.clone(),new xt(t,e),new xt(n,s),new xt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new mr(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,o,a,l),this}absellipse(t,e,n,s,r,o,a,l){let c=new ys(t,e,n,s,r,o,a,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},_n=class extends gr{constructor(t){super(t),this.uuid=ni(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new gr().fromJSON(s))}return this}};function Fp(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=dd(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=zp(i,t,r,e)),i.length>80*e){a=i[0],l=i[1];let h=a,u=l;for(let d=e;d<s;d+=e){let f=i[d],m=i[d+1];f<a&&(a=f),m<l&&(l=m),f>h&&(h=f),m>u&&(u=m)}c=Math.max(h-a,u-l),c=c!==0?32767/c:0}return xr(r,o,e,a,l,c,0),o}function dd(i,t,e,n,s){let r;if(s===Qp(i,t,e,n)>0)for(let o=t;o<e;o+=n)r=_u(o/n|0,i[o],i[o+1],r);else for(let o=e-n;o>=t;o-=n)r=_u(o/n|0,i[o],i[o+1],r);return r&&vs(r,r.next)&&(yr(r),r=r.next),r}function Oi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(vs(e,e.next)||Te(e.prev,e,e.next)===0)){if(yr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function xr(i,t,e,n,s,r,o){if(!i)return;!o&&r&&qp(i,n,s,r);let a=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?Bp(i,n,s,r):Op(i)){t.push(l.i,i.i,c.i),yr(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=kp(Oi(i),t),xr(i,t,e,n,s,r,2)):o===2&&Hp(i,t,e,n,s,r):xr(Oi(i),t,e,n,s,r,1);break}}}function Op(i){let t=i.prev,e=i,n=i.next;if(Te(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=Math.min(s,r,o),u=Math.min(a,l,c),d=Math.max(s,r,o),f=Math.max(a,l,c),m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=d&&m.y>=u&&m.y<=f&&Ys(s,a,r,l,o,c,m.x,m.y)&&Te(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Bp(i,t,e,n){let s=i.prev,r=i,o=i.next;if(Te(s,r,o)>=0)return!1;let a=s.x,l=r.x,c=o.x,h=s.y,u=r.y,d=o.y,f=Math.min(a,l,c),m=Math.min(h,u,d),y=Math.max(a,l,c),p=Math.max(h,u,d),g=Hl(f,m,t,e,n),_=Hl(y,p,t,e,n),E=i.prevZ,v=i.nextZ;for(;E&&E.z>=g&&v&&v.z<=_;){if(E.x>=f&&E.x<=y&&E.y>=m&&E.y<=p&&E!==s&&E!==o&&Ys(a,h,l,u,c,d,E.x,E.y)&&Te(E.prev,E,E.next)>=0||(E=E.prevZ,v.x>=f&&v.x<=y&&v.y>=m&&v.y<=p&&v!==s&&v!==o&&Ys(a,h,l,u,c,d,v.x,v.y)&&Te(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;E&&E.z>=g;){if(E.x>=f&&E.x<=y&&E.y>=m&&E.y<=p&&E!==s&&E!==o&&Ys(a,h,l,u,c,d,E.x,E.y)&&Te(E.prev,E,E.next)>=0)return!1;E=E.prevZ}for(;v&&v.z<=_;){if(v.x>=f&&v.x<=y&&v.y>=m&&v.y<=p&&v!==s&&v!==o&&Ys(a,h,l,u,c,d,v.x,v.y)&&Te(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function kp(i,t){let e=i;do{let n=e.prev,s=e.next.next;!vs(n,s)&&pd(n,e,e.next,s)&&_r(n,s)&&_r(s,n)&&(t.push(n.i,e.i,s.i),yr(e),yr(e.next),e=i=s),e=e.next}while(e!==i);return Oi(e)}function Hp(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&$p(o,a)){let l=md(o,a);o=Oi(o,o.next),l=Oi(l,l.next),xr(o,t,e,n,s,r,0),xr(l,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function zp(i,t,e,n){let s=[];for(let r=0,o=t.length;r<o;r++){let a=t[r]*n,l=r<o-1?t[r+1]*n:i.length,c=dd(i,a,l,n,!1);c===c.next&&(c.steiner=!0),s.push(Zp(c))}s.sort(Gp);for(let r=0;r<s.length;r++)e=Vp(s[r],e);return e}function Gp(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function Vp(i,t){let e=Wp(i,t);if(!e)return t;let n=md(e,i);return Oi(n,n.next),Oi(e,e.next)}function Wp(i,t){let e=t,n=i.x,s=i.y,r=-1/0,o;if(vs(i,e))return e;do{if(vs(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let u=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,o=e.x<e.next.x?e:e.next,u===n))return o}e=e.next}while(e!==t);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;e=o;do{if(n>=e.x&&e.x>=l&&n!==e.x&&fd(s<c?n:r,s,l,c,s<c?r:n,s,e.x,e.y)){let u=Math.abs(s-e.y)/(n-e.x);_r(e,i)&&(u<h||u===h&&(e.x>o.x||e.x===o.x&&Xp(o,e)))&&(o=e,h=u)}e=e.next}while(e!==a);return o}function Xp(i,t){return Te(i.prev,i,t.prev)<0&&Te(t.next,i,i.next)<0}function qp(i,t,e,n){let s=i;do s.z===0&&(s.z=Hl(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Yp(s)}function Yp(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let c=0;c<e&&(a++,o=o.nextZ,!!o);c++);let l=e;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,e*=2}while(t>1);return i}function Hl(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Zp(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function fd(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function Ys(i,t,e,n,s,r,o,a){return!(i===o&&t===a)&&fd(i,t,e,n,s,r,o,a)}function $p(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!Jp(i,t)&&(_r(i,t)&&_r(t,i)&&Kp(i,t)&&(Te(i.prev,i,t.prev)||Te(i,t.prev,t))||vs(i,t)&&Te(i.prev,i,i.next)>0&&Te(t.prev,t,t.next)>0)}function Te(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function vs(i,t){return i.x===t.x&&i.y===t.y}function pd(i,t,e,n){let s=fo(Te(i,t,e)),r=fo(Te(i,t,n)),o=fo(Te(e,n,i)),a=fo(Te(e,n,t));return!!(s!==r&&o!==a||s===0&&uo(i,e,t)||r===0&&uo(i,n,t)||o===0&&uo(e,i,n)||a===0&&uo(e,t,n))}function uo(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function fo(i){return i>0?1:i<0?-1:0}function Jp(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&pd(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function _r(i,t){return Te(i.prev,i,i.next)<0?Te(i,t,i.next)>=0&&Te(i,i.prev,t)>=0:Te(i,t,i.prev)<0||Te(i,i.next,t)<0}function Kp(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function md(i,t){let e=zl(i.i,i.x,i.y),n=zl(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function _u(i,t,e,n){let s=zl(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function yr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function zl(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Qp(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Gl=class{static triangulate(t,e,n=2){return Fp(t,e,n)}},Un=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];yu(t),vu(n,t);let o=t.length;e.forEach(yu);for(let l=0;l<e.length;l++)s.push(o),o+=e[l].length,vu(n,e[l]);let a=Gl.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function yu(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function vu(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var _i=class i extends pe{constructor(t=new _n([new xt(.5,.5),new xt(-.5,.5),new xt(-.5,-.5),new xt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let a=0,l=t.length;a<l;a++){let c=t[a];o(c)}this.setAttribute("position",new qt(s,3)),this.setAttribute("uv",new qt(r,2)),this.computeVertexNormals();function o(a){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1,d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:f-.1,y=e.bevelOffset!==void 0?e.bevelOffset:0,p=e.bevelSegments!==void 0?e.bevelSegments:3,g=e.extrudePath,_=e.UVGenerator!==void 0?e.UVGenerator:jp,E,v=!1,T,R,x,S;if(g){E=g.getSpacedPoints(h),v=!0,d=!1;let Q=g.isCatmullRomCurve3?g.closed:!1;T=g.computeFrenetFrames(h,Q),R=new z,x=new z,S=new z}d||(p=0,f=0,m=0,y=0);let F=a.extractPoints(c),M=F.shape,C=F.holes;if(!Un.isClockWise(M)){M=M.reverse();for(let Q=0,ot=C.length;Q<ot;Q++){let ut=C[Q];Un.isClockWise(ut)&&(C[Q]=ut.reverse())}}function O(Q){let ut=10000000000000001e-36,Rt=Q[0];for(let dt=1;dt<=Q.length;dt++){let Nt=dt%Q.length,Ut=Q[Nt],Zt=Ut.x-Rt.x,ne=Ut.y-Rt.y,oe=Zt*Zt+ne*ne,q=Math.max(Math.abs(Ut.x),Math.abs(Ut.y),Math.abs(Rt.x),Math.abs(Rt.y)),Ce=ut*q*q;if(oe<=Ce){Q.splice(Nt,1),dt--;continue}Rt=Ut}}O(M),C.forEach(O);let I=C.length,G=M;for(let Q=0;Q<I;Q++){let ot=C[Q];M=M.concat(ot)}function X(Q,ot,ut){return ot||Yt("ExtrudeGeometry: vec does not exist"),Q.clone().addScaledVector(ot,ut)}let U=M.length;function V(Q,ot,ut){let Rt,dt,Nt,Ut=Q.x-ot.x,Zt=Q.y-ot.y,ne=ut.x-Q.x,oe=ut.y-Q.y,q=Ut*Ut+Zt*Zt,Ce=Ut*oe-Zt*ne;if(Math.abs(Ce)>Number.EPSILON){let ie=Math.sqrt(q),_e=Math.sqrt(ne*ne+oe*oe),wt=ot.x-Zt/ie,Re=ot.y+Ut/ie,Vt=ut.x-oe/_e,$t=ut.y+ne/_e,D=((Vt-wt)*oe-($t-Re)*ne)/(Ut*oe-Zt*ne);Rt=wt+Ut*D-Q.x,dt=Re+Zt*D-Q.y;let b=Rt*Rt+dt*dt;if(b<=2)return new xt(Rt,dt);Nt=Math.sqrt(b/2)}else{let ie=!1;Ut>Number.EPSILON?ne>Number.EPSILON&&(ie=!0):Ut<-Number.EPSILON?ne<-Number.EPSILON&&(ie=!0):Math.sign(Zt)===Math.sign(oe)&&(ie=!0),ie?(Rt=-Zt,dt=Ut,Nt=Math.sqrt(q)):(Rt=Ut,dt=Zt,Nt=Math.sqrt(q/2))}return new xt(Rt/Nt,dt/Nt)}let P=[];for(let Q=0,ot=G.length,ut=ot-1,Rt=Q+1;Q<ot;Q++,ut++,Rt++)ut===ot&&(ut=0),Rt===ot&&(Rt=0),P[Q]=V(G[Q],G[ut],G[Rt]);let L=[],A,B=P.concat();for(let Q=0,ot=I;Q<ot;Q++){let ut=C[Q];A=[];for(let Rt=0,dt=ut.length,Nt=dt-1,Ut=Rt+1;Rt<dt;Rt++,Nt++,Ut++)Nt===dt&&(Nt=0),Ut===dt&&(Ut=0),A[Rt]=V(ut[Rt],ut[Nt],ut[Ut]);L.push(A),B=B.concat(A)}let Z;if(p===0)Z=Un.triangulateShape(G,C);else{let Q=[],ot=[];for(let ut=0;ut<p;ut++){let Rt=ut/p,dt=f*Math.cos(Rt*Math.PI/2),Nt=m*Math.sin(Rt*Math.PI/2)+y;for(let Ut=0,Zt=G.length;Ut<Zt;Ut++){let ne=X(G[Ut],P[Ut],Nt);ct(ne.x,ne.y,-dt),Rt===0&&Q.push(ne)}for(let Ut=0,Zt=I;Ut<Zt;Ut++){let ne=C[Ut];A=L[Ut];let oe=[];for(let q=0,Ce=ne.length;q<Ce;q++){let ie=X(ne[q],A[q],Nt);ct(ie.x,ie.y,-dt),Rt===0&&oe.push(ie)}Rt===0&&ot.push(oe)}}Z=Un.triangulateShape(Q,ot)}let k=Z.length,Y=m+y;for(let Q=0;Q<U;Q++){let ot=d?X(M[Q],B[Q],Y):M[Q];v?(x.copy(T.normals[0]).multiplyScalar(ot.x),R.copy(T.binormals[0]).multiplyScalar(ot.y),S.copy(E[0]).add(x).add(R),ct(S.x,S.y,S.z)):ct(ot.x,ot.y,0)}for(let Q=1;Q<=h;Q++)for(let ot=0;ot<U;ot++){let ut=d?X(M[ot],B[ot],Y):M[ot];v?(x.copy(T.normals[Q]).multiplyScalar(ut.x),R.copy(T.binormals[Q]).multiplyScalar(ut.y),S.copy(E[Q]).add(x).add(R),ct(S.x,S.y,S.z)):ct(ut.x,ut.y,u/h*Q)}for(let Q=p-1;Q>=0;Q--){let ot=Q/p,ut=f*Math.cos(ot*Math.PI/2),Rt=m*Math.sin(ot*Math.PI/2)+y;for(let dt=0,Nt=G.length;dt<Nt;dt++){let Ut=X(G[dt],P[dt],Rt);ct(Ut.x,Ut.y,u+ut)}for(let dt=0,Nt=C.length;dt<Nt;dt++){let Ut=C[dt];A=L[dt];for(let Zt=0,ne=Ut.length;Zt<ne;Zt++){let oe=X(Ut[Zt],A[Zt],Rt);v?ct(oe.x,oe.y+E[h-1].y,E[h-1].x+ut):ct(oe.x,oe.y,u+ut)}}}et(),ht();function et(){let Q=s.length/3;if(d){let ot=0,ut=U*ot;for(let Rt=0;Rt<k;Rt++){let dt=Z[Rt];pt(dt[2]+ut,dt[1]+ut,dt[0]+ut)}ot=h+p*2,ut=U*ot;for(let Rt=0;Rt<k;Rt++){let dt=Z[Rt];pt(dt[0]+ut,dt[1]+ut,dt[2]+ut)}}else{for(let ot=0;ot<k;ot++){let ut=Z[ot];pt(ut[2],ut[1],ut[0])}for(let ot=0;ot<k;ot++){let ut=Z[ot];pt(ut[0]+U*h,ut[1]+U*h,ut[2]+U*h)}}n.addGroup(Q,s.length/3-Q,0)}function ht(){let Q=s.length/3,ot=0;j(G,ot),ot+=G.length;for(let ut=0,Rt=C.length;ut<Rt;ut++){let dt=C[ut];j(dt,ot),ot+=dt.length}n.addGroup(Q,s.length/3-Q,1)}function j(Q,ot){let ut=Q.length;for(;--ut>=0;){let Rt=ut,dt=ut-1;dt<0&&(dt=Q.length-1);for(let Nt=0,Ut=h+p*2;Nt<Ut;Nt++){let Zt=U*Nt,ne=U*(Nt+1),oe=ot+Rt+Zt,q=ot+dt+Zt,Ce=ot+dt+ne,ie=ot+Rt+ne;lt(oe,q,Ce,ie)}}}function ct(Q,ot,ut){l.push(Q),l.push(ot),l.push(ut)}function pt(Q,ot,ut){_t(Q),_t(ot),_t(ut);let Rt=s.length/3,dt=_.generateTopUV(n,s,Rt-3,Rt-2,Rt-1);Dt(dt[0]),Dt(dt[1]),Dt(dt[2])}function lt(Q,ot,ut,Rt){_t(Q),_t(ot),_t(Rt),_t(ot),_t(ut),_t(Rt);let dt=s.length/3,Nt=_.generateSideWallUV(n,s,dt-6,dt-3,dt-2,dt-1);Dt(Nt[0]),Dt(Nt[1]),Dt(Nt[3]),Dt(Nt[1]),Dt(Nt[2]),Dt(Nt[3])}function _t(Q){s.push(l[Q*3+0]),s.push(l[Q*3+1]),s.push(l[Q*3+2])}function Dt(Q){r.push(Q.x),r.push(Q.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return tm(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];n.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new kl[s.type]().fromJSON(s)),new i(n,t.options)}},jp={generateTopUV:function(i,t,e,n,s){let r=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new xt(r,o),new xt(a,l),new xt(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){let o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[s*3],f=t[s*3+1],m=t[s*3+2],y=t[r*3],p=t[r*3+1],g=t[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new xt(o,1-l),new xt(c,1-u),new xt(d,1-m),new xt(y,1-g)]:[new xt(a,1-l),new xt(h,1-u),new xt(f,1-m),new xt(p,1-g)]}};function tm(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Bn=class i extends No{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var De=class i extends pe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=t/a,d=e/l,f=[],m=[],y=[],p=[];for(let g=0;g<h;g++){let _=g*d-o;for(let E=0;E<c;E++){let v=E*u-r;m.push(v,-_,0),y.push(0,0,1),p.push(E/a),p.push(1-g/l)}}for(let g=0;g<l;g++)for(let _=0;_<a;_++){let E=_+c*g,v=_+c*(g+1),T=_+1+c*(g+1),R=_+1+c*g;f.push(E,v,R),f.push(v,T,R)}this.setIndex(f),this.setAttribute("position",new qt(m,3)),this.setAttribute("normal",new qt(y,3)),this.setAttribute("uv",new qt(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var vr=class i extends pe{constructor(t=new _n([new xt(0,.5),new xt(-.5,-.5),new xt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],s=[],r=[],o=[],a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new qt(s,3)),this.setAttribute("normal",new qt(r,3)),this.setAttribute("uv",new qt(o,2));function c(h){let u=s.length/3,d=h.extractPoints(e),f=d.shape,m=d.holes;Un.isClockWise(f)===!1&&(f=f.reverse());for(let p=0,g=m.length;p<g;p++){let _=m[p];Un.isClockWise(_)===!0&&(m[p]=_.reverse())}let y=Un.triangulateShape(f,m);for(let p=0,g=m.length;p<g;p++){let _=m[p];f=f.concat(_)}for(let p=0,g=f.length;p<g;p++){let _=f[p];s.push(_.x,_.y,0),r.push(0,0,1),o.push(_.x,_.y)}for(let p=0,g=y.length;p<g;p++){let _=y[p],E=_[0]+u,v=_[1]+u,T=_[2]+u;n.push(E,v,T),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return em(e,t)}static fromJSON(t,e){let n=[];for(let s=0,r=t.shapes.length;s<r;s++){let o=e[t.shapes[s]];n.push(o)}return new i(n,t.curveSegments)}};function em(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){let s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}var sn=class i extends pe{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new z,d=new z,f=[],m=[],y=[],p=[];for(let g=0;g<=n;g++){let _=[],E=g/n,v=o+E*a,T=t*Math.cos(v),R=Math.sqrt(t*t-T*T),x=0;g===0&&o===0?x=.5/e:g===n&&l===Math.PI&&(x=-.5/e);for(let S=0;S<=e;S++){let F=S/e,M=s+F*r;u.x=-R*Math.cos(M),u.y=T,u.z=R*Math.sin(M),m.push(u.x,u.y,u.z),d.copy(u).normalize(),y.push(d.x,d.y,d.z),p.push(F+x,1-E),_.push(c++)}h.push(_)}for(let g=0;g<n;g++)for(let _=0;_<e;_++){let E=h[g][_+1],v=h[g][_],T=h[g+1][_],R=h[g+1][_+1];(g!==0||o>0)&&f.push(E,v,R),(g!==n-1||l<Math.PI)&&f.push(v,T,R)}this.setIndex(f),this.setAttribute("position",new qt(m,3)),this.setAttribute("normal",new qt(y,3)),this.setAttribute("uv",new qt(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Cn=class i extends pe{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),s=Math.floor(s);let l=[],c=[],h=[],u=[],d=new z,f=new z,m=new z;for(let y=0;y<=n;y++){let p=o+y/n*a;for(let g=0;g<=s;g++){let _=g/s*r;f.x=(t+e*Math.cos(p))*Math.cos(_),f.y=(t+e*Math.cos(p))*Math.sin(_),f.z=e*Math.sin(p),c.push(f.x,f.y,f.z),d.x=t*Math.cos(_),d.y=t*Math.sin(_),m.subVectors(f,d).normalize(),h.push(m.x,m.y,m.z),u.push(g/s),u.push(y/n)}}for(let y=1;y<=n;y++)for(let p=1;p<=s;p++){let g=(s+1)*y+p-1,_=(s+1)*(y-1)+p-1,E=(s+1)*(y-1)+p,v=(s+1)*y+p;l.push(g,_,v),l.push(_,E,v)}this.setIndex(l),this.setAttribute("position",new qt(c,3)),this.setAttribute("normal",new qt(h,3)),this.setAttribute("uv",new qt(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function Wi(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(Mu(s))s.isRenderTargetTexture?(Wt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(Mu(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Je(i){let t={};for(let e=0;e<i.length;e++){let n=Wi(i[e]);for(let s in n)t[s]=n[s]}return t}function Mu(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function nm(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Sc(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ce.workingColorSpace}var gd={clone:Wi,merge:Je},im=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,sm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,kn=class extends mi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=im,this.fragmentShader=sm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Wi(t.uniforms),this.uniformsGroups=nm(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new kt().setHex(s.value);break;case"v2":this.uniforms[n].value=new xt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new z().fromArray(s.value);break;case"v4":this.uniforms[n].value=new xe().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Jt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Xt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},zo=class extends kn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Me=class extends mi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new kt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=za,this.normalScale=new xt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new An,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Ms=class extends mi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ju,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Go=class extends mi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function ss(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function po(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var yi=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];t:{e:{let o;n:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break e}o=e.length;break n}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break e}o=n,n=0;break n}break t}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Vo=class extends yi{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Fl,endingEnd:Fl}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ol:r=t,a=2*e-n;break;case Bl:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ol:o=t,l=2*n-e;break;case Bl:o=1,l=n+s[1]-s[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-e)/(s-e),y=m*m,p=y*m,g=-d*p+2*d*y-d*m,_=(1+d)*p+(-1.5-2*d)*y+(-.5+d)*m+1,E=(-1-f)*p+(1.5+f)*y+.5*m,v=f*p-f*y;for(let T=0;T!==a;++T)r[T]=g*o[h+T]+_*o[c+T]+E*o[l+T]+v*o[u+T];return r}},Wo=class extends yi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(s-e),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}},Xo=class extends yi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},qo=class extends yi{interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this.inTangents,u=this.outTangents;if(!h||!u){let m=(n-e)/(s-e),y=1-m;for(let p=0;p!==a;++p)r[p]=o[c+p]*y+o[l+p]*m;return r}let d=a*2,f=t-1;for(let m=0;m!==a;++m){let y=o[c+m],p=o[l+m],g=f*d+m*2,_=u[g],E=u[g+1],v=t*d+m*2,T=h[v],R=h[v+1],x=om(n,e,_,T,s);r[m]=xd(x,y,E,R,p)}return r}};function xd(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function rm(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function om(i,t,e,n,s){let r=(i-t)/(s-t);for(let o=0;o<8;o++){let a=xd(r,t,e,n,s)-i;if(Math.abs(a)<1e-10)break;let l=rm(r,t,e,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var fn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ss(e,this.TimeBufferType),this.values=ss(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:ss(t.times,Array),values:ss(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),po(t.settings)&&(n.settings={inTangents:ss(t.settings.inTangents,Array),outTangents:ss(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Xo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Wo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Vo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new qo(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case js:e=this.InterpolantFactoryMethodDiscrete;break;case Ro:e=this.InterpolantFactoryMethodLinear;break;case xo:e=this.InterpolantFactoryMethodSmooth;break;case Ul:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Wt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return js;case this.InterpolantFactoryMethodLinear:return Ro;case this.InterpolantFactoryMethodSmooth:return xo;case this.InterpolantFactoryMethodBezier:return Ul}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t;po(this.settings)&&(Su(this.settings.inTangents,t),Su(this.settings.outTangents,t))}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;po(this.settings)&&(bu(this.settings.inTangents,t),bu(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Yt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Yt("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){Yt("KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){Yt("KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&Zf(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){Yt("KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===xo,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(s)l=!0;else{let u=a*n,d=u-n,f=u+n;for(let m=0;m!==n;++m){let y=e[u+m];if(y!==e[d+m]||y!==e[f+m]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)e[d+f]=e[u+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,po(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Su(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]+=t}function bu(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}fn.prototype.ValueTypeName="";fn.prototype.TimeBufferType=Float32Array;fn.prototype.ValueBufferType=Float32Array;fn.prototype.DefaultInterpolation=Ro;var vi=class extends fn{constructor(t,e,n){super(t,e,n)}};vi.prototype.ValueTypeName="bool";vi.prototype.ValueBufferType=Array;vi.prototype.DefaultInterpolation=js;vi.prototype.InterpolantFactoryMethodLinear=void 0;vi.prototype.InterpolantFactoryMethodSmooth=void 0;var Yo=class extends fn{constructor(t,e,n,s){super(t,e,n,s)}};Yo.prototype.ValueTypeName="color";var Zo=class extends fn{constructor(t,e,n,s){super(t,e,n,s)}};Zo.prototype.ValueTypeName="number";var $o=class extends yi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(s-e),c=t*a;for(let h=c+a;c!==h;c+=4)Le.slerpFlat(r,0,o,c-a,o,c,l);return r}},Mr=class extends fn{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new $o(this.times,this.values,this.getValueSize(),t)}};Mr.prototype.ValueTypeName="quaternion";Mr.prototype.InterpolantFactoryMethodSmooth=void 0;var Mi=class extends fn{constructor(t,e,n){super(t,e,n)}};Mi.prototype.ValueTypeName="string";Mi.prototype.ValueBufferType=Array;Mi.prototype.DefaultInterpolation=js;Mi.prototype.InterpolantFactoryMethodLinear=void 0;Mi.prototype.InterpolantFactoryMethodSmooth=void 0;var Jo=class extends fn{constructor(t,e,n,s){super(t,e,n,s)}};Jo.prototype.ValueTypeName="vector";var yo={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(Eu(i)||(this.files[i]=t))},get:function(i){if(this.enabled!==!1&&!Eu(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function Eu(i){try{let t=i.slice(i.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}var Ko=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],m=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},_d=new Ko,Ss=class{constructor(t){this.manager=t!==void 0?t:_d,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}setPriority(t){return this.priority=t,this}setCache(t){return this.cache=t,this}abort(){return this}};Ss.DEFAULT_MATERIAL_NAME="__DEFAULT";var rs=new WeakMap,Qo=class extends Ss{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=yo.get(`image:${t}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0);else{let u=rs.get(o);u===void 0&&(u=[],rs.set(o,u)),u.push({onLoad:e,onError:s})}return o}let a=us("img");function l(){h(),e&&e(this);let u=rs.get(this)||[];for(let d=0;d<u.length;d++){let f=u[d];f.onLoad&&f.onLoad(this)}rs.delete(this),r.manager.itemEnd(t)}function c(u){h(),s&&s(u),yo.remove(`image:${t}`);let d=rs.get(this)||[];for(let f=0;f<d.length;f++){let m=d[f];m.onError&&m.onError(u)}rs.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),yo.add(`image:${t}`,a),r.manager.itemStart(t),a.fetchPriority=this.priority,a.src=t,a}};var Sr=class extends Ss{constructor(t){super(t)}load(t,e,n,s){let r=new Ye,o=new Qo(this.manager);return o.setPriority(this.priority),o.setCache(this.cache),o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}},br=class extends Ze{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new kt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},bs=class extends br{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ze.DEFAULT_UP),this.updateMatrix(),this.groundColor=new kt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},Nl=new Xt,wu=new z,Tu=new z,jo=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new xt(512,512),this.mapType=rn,this.map=null,this.mapPass=null,this.matrix=new Xt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new xi,this._frameExtents=new xt(1,1),this._viewportCount=1,this._viewports=[new xe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;wu.setFromMatrixPosition(t.matrixWorld),e.position.copy(wu),Tu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Tu),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){Nl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Nl,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===hs||t.reversedDepth?e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),e.multiply(Nl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},mo=new z,go=new Le,Nn=new z,Er=class extends Ze{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Xt,this.projectionMatrix=new Xt,this.projectionMatrixInverse=new Xt,this.coordinateSystem=xn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(mo,go,Nn),Nn.x===1&&Nn.y===1&&Nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(mo,go,Nn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(mo,go,Nn),Nn.x===1&&Nn.y===1&&Nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(mo,go,Nn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ui=new z,Au=new xt,Ru=new xt,tn=class extends Er{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=fs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan($s*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return fs*2*Math.atan(Math.tan($s*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ui.x,ui.y).multiplyScalar(-t/ui.z),ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ui.x,ui.y).multiplyScalar(-t/ui.z)}getViewSize(t,e){return this.getViewBounds(t,Au,Ru),e.subVectors(Ru,Au)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan($s*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var wr=class extends Er{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Vl=class extends jo{constructor(){super(new wr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Bi=class extends br{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ze.DEFAULT_UP),this.updateMatrix(),this.target=new Ze,this.shadow=new Vl}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var os=-90,as=1,Es=class extends Ze{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new tn(os,as,t,e);s.layers=this.layers,this.add(s);let r=new tn(os,as,t,e);r.layers=this.layers,this.add(r);let o=new tn(os,as,t,e);o.layers=this.layers,this.add(o);let a=new tn(os,as,t,e);a.layers=this.layers,this.add(a);let l=new tn(os,as,t,e);l.layers=this.layers,this.add(l);let c=new tn(os,as,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===xn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===hs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let y=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let p=!1;t.isWebGLRenderer===!0?p=t.state.buffers.depth.getReversed():p=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.mipmapsAutoUpdate=y,t.setRenderTarget(n,5,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},ta=class extends tn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}};var bc="\\[\\]\\.:\\/",am=new RegExp("["+bc+"]","g"),Ec="[^"+bc+"]",lm="[^"+bc.replace("\\.","")+"]",cm=/((?:WC+[\/:])*)/.source.replace("WC",Ec),hm=/(WCOD+)?/.source.replace("WCOD",lm),um=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ec),dm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ec),fm=new RegExp("^"+cm+hm+um+dm+"$"),pm=["material","materials","bones","map"],Wl=class{constructor(t,e,n){let s=n||Se.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Se=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(am,"")}static parseTrackName(t){let e=fm.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);pm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Wt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Yt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Yt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Yt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Yt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Yt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Yt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Yt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[s];if(o===void 0){let c=e.nodeName;Yt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Yt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Yt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Se.Composite=Wl;Se.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Se.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Se.prototype.GetterByBindingType=[Se.prototype._getValue_direct,Se.prototype._getValue_array,Se.prototype._getValue_arrayElement,Se.prototype._getValue_toArray];Se.prototype.SetterByBindingTypeAndVersioning=[[Se.prototype._setValue_direct,Se.prototype._setValue_direct_setNeedsUpdate,Se.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Se.prototype._setValue_array,Se.prototype._setValue_array_setNeedsUpdate,Se.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Se.prototype._setValue_arrayElement,Se.prototype._setValue_arrayElement_setNeedsUpdate,Se.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Se.prototype._setValue_fromArray,Se.prototype._setValue_fromArray_setNeedsUpdate,Se.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Yy=new Float32Array(1);var Pc=class Pc{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};Pc.prototype.isMatrix2=!0;var Xl=Pc;function wc(i,t,e,n){let s=mm(n);switch(e){case cc:return i*t;case aa:return i*t/s.components*s.byteLength;case la:return i*t/s.components*s.byteLength;case bi:return i*t*2/s.components*s.byteLength;case ca:return i*t*2/s.components*s.byteLength;case hc:return i*t*3/s.components*s.byteLength;case Ln:return i*t*4/s.components*s.byteLength;case ha:return i*t*4/s.components*s.byteLength;case Ar:case Rr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Cr:case Pr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case da:case pa:return Math.max(i,16)*Math.max(t,8)/4;case ua:case fa:return Math.max(i,8)*Math.max(t,8)/2;case ma:case ga:case _a:case ya:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case xa:case Ir:case va:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ma:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Sa:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case ba:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Ea:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case wa:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ta:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Aa:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Ra:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ca:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Pa:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Ia:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case La:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Da:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Na:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ua:case Fa:case Oa:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Ba:case ka:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Lr:case Ha:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function mm(i){switch(i){case rn:case rc:return{byteLength:1,components:1};case Ps:case oc:case In:return{byteLength:2,components:1};case ra:case oa:return{byteLength:2,components:4};case Pn:case sa:case yn:return{byteLength:4,components:1};case ac:case lc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Wt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function Hd(){let i=null,t=!1,e=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function _m(i){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){let h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){let m=u[d],y=u[f];y.start<=m.start+m.count+1?m.count=Math.max(m.count,y.start+y.count-m.start):(++d,u[d]=y)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){let y=u[f];i.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var ym=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,vm=`#ifdef USE_ALPHAHASH
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
#endif`,Mm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Sm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Em=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,wm=`#ifdef USE_AOMAP
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
#endif`,Tm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Am=`#ifdef USE_BATCHING
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
#endif`,Rm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Cm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Pm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Im=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Lm=`#ifdef USE_IRIDESCENCE
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
#endif`,Dm=`#ifdef USE_BUMPMAP
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
#endif`,Nm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Um=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Fm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Om=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Bm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,km=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Hm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,zm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Gm=`#define PI 3.141592653589793
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
} // validated`,Vm=`vec3 transformedNormal = objectNormal;
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
#endif`,Wm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Xm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,qm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ym=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Zm="gl_FragColor = linearToOutputTexel( gl_FragColor );",$m=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Jm=`#ifdef USE_ENVMAP
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
#endif`,Km=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Qm=`#ifdef USE_ENVMAP
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
#endif`,jm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,t0=`#ifdef USE_ENVMAP
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
#endif`,e0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,n0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,i0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,s0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,r0=`#ifdef USE_GRADIENTMAP
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
}`,o0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,a0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,l0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,c0=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,h0=`#ifdef USE_ENVMAP
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
#endif`,u0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,d0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,f0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,p0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,m0=`PhysicalMaterial material;
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
#endif`,g0=`uniform sampler2D dfgLUT;
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
}`,x0=`
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
#endif`,_0=`#if defined( RE_IndirectDiffuse )
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
#endif`,y0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,v0=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,M0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,S0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,b0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,E0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,w0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,T0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,A0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,R0=`#if defined( USE_POINTS_UV )
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
#endif`,C0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,P0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,I0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,L0=`#if defined( USE_MORPHCOLORS )
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
#endif`,D0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,N0=`#ifdef USE_MORPHTARGETS
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
#endif`,U0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,F0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,O0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,B0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,k0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,H0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,z0=`#ifdef USE_NORMALMAP
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
#endif`,G0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,V0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,W0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,X0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,q0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Y0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Z0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,J0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,K0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Q0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,j0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,tg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,eg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ng=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ig=`float getShadowMask() {
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
}`,sg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,rg=`#ifdef USE_SKINNING
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
#endif`,og=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ag=`#ifdef USE_SKINNING
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
#endif`,lg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,cg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,hg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ug=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,dg=`#ifdef USE_TRANSMISSION
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
#endif`,fg=`#ifdef USE_TRANSMISSION
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
#endif`,pg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,_g=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,yg=`uniform sampler2D t2D;
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
}`,vg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mg=`uniform float backgroundBlurriness;
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
}`,Sg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Eg=`#include <common>
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
}`,wg=`#if DEPTH_PACKING == 3200
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
}`,Tg=`#define DISTANCE
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
}`,Ag=`#define DISTANCE
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
}`,Rg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Cg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pg=`uniform float scale;
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
}`,Ig=`uniform vec3 diffuse;
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
}`,Lg=`#include <common>
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
}`,Dg=`uniform vec3 diffuse;
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
}`,Ng=`#define LAMBERT
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
}`,Ug=`#define LAMBERT
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
}`,Fg=`#define MATCAP
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
}`,Og=`#define MATCAP
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
}`,Bg=`#define NORMAL
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
}`,kg=`#define NORMAL
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
}`,Hg=`#define PHONG
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
}`,zg=`#define PHONG
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
}`,Gg=`#define STANDARD
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
}`,Vg=`#define STANDARD
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
}`,Wg=`#define TOON
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
}`,Xg=`#define TOON
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
}`,qg=`uniform float size;
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
}`,Yg=`uniform vec3 diffuse;
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
}`,Zg=`#include <common>
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
}`,$g=`uniform vec3 color;
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
}`,Jg=`uniform float rotation;
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
}`,Kg=`uniform vec3 diffuse;
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
}`,ee={alphahash_fragment:ym,alphahash_pars_fragment:vm,alphamap_fragment:Mm,alphamap_pars_fragment:Sm,alphatest_fragment:bm,alphatest_pars_fragment:Em,aomap_fragment:wm,aomap_pars_fragment:Tm,batching_pars_vertex:Am,batching_vertex:Rm,begin_vertex:Cm,beginnormal_vertex:Pm,bsdfs:Im,iridescence_fragment:Lm,bumpmap_pars_fragment:Dm,clipping_planes_fragment:Nm,clipping_planes_pars_fragment:Um,clipping_planes_pars_vertex:Fm,clipping_planes_vertex:Om,color_fragment:Bm,color_pars_fragment:km,color_pars_vertex:Hm,color_vertex:zm,common:Gm,defaultnormal_vertex:Vm,displacementmap_pars_vertex:Wm,displacementmap_vertex:Xm,emissivemap_fragment:qm,emissivemap_pars_fragment:Ym,colorspace_fragment:Zm,colorspace_pars_fragment:$m,envmap_fragment:Jm,envmap_common_pars_fragment:Km,envmap_pars_fragment:Qm,envmap_pars_vertex:jm,envmap_physical_pars_fragment:h0,envmap_vertex:t0,fog_vertex:e0,fog_pars_vertex:n0,fog_fragment:i0,fog_pars_fragment:s0,gradientmap_pars_fragment:r0,lightmap_pars_fragment:o0,lights_lambert_fragment:a0,lights_lambert_pars_fragment:l0,lights_pars_begin:c0,lights_toon_fragment:u0,lights_toon_pars_fragment:d0,lights_phong_fragment:f0,lights_phong_pars_fragment:p0,lights_physical_fragment:m0,lights_physical_pars_fragment:g0,lights_fragment_begin:x0,lights_fragment_maps:_0,lights_fragment_end:y0,lightprobes_pars_fragment:v0,logdepthbuf_fragment:M0,logdepthbuf_pars_fragment:S0,logdepthbuf_pars_vertex:b0,logdepthbuf_vertex:E0,map_fragment:w0,map_pars_fragment:T0,map_particle_fragment:A0,map_particle_pars_fragment:R0,metalnessmap_fragment:C0,metalnessmap_pars_fragment:P0,morphinstance_vertex:I0,morphcolor_vertex:L0,morphnormal_vertex:D0,morphtarget_pars_vertex:N0,morphtarget_vertex:U0,normal_fragment_begin:F0,normal_fragment_maps:O0,normal_pars_fragment:B0,normal_pars_vertex:k0,normal_vertex:H0,normalmap_pars_fragment:z0,clearcoat_normal_fragment_begin:G0,clearcoat_normal_fragment_maps:V0,clearcoat_pars_fragment:W0,iridescence_pars_fragment:X0,opaque_fragment:q0,packing:Y0,premultiplied_alpha_fragment:Z0,project_vertex:$0,dithering_fragment:J0,dithering_pars_fragment:K0,roughnessmap_fragment:Q0,roughnessmap_pars_fragment:j0,shadowmap_pars_fragment:tg,shadowmap_pars_vertex:eg,shadowmap_vertex:ng,shadowmask_pars_fragment:ig,skinbase_vertex:sg,skinning_pars_vertex:rg,skinning_vertex:og,skinnormal_vertex:ag,specularmap_fragment:lg,specularmap_pars_fragment:cg,tonemapping_fragment:hg,tonemapping_pars_fragment:ug,transmission_fragment:dg,transmission_pars_fragment:fg,uv_pars_fragment:pg,uv_pars_vertex:mg,uv_vertex:gg,worldpos_vertex:xg,background_vert:_g,background_frag:yg,backgroundCube_vert:vg,backgroundCube_frag:Mg,cube_vert:Sg,cube_frag:bg,depth_vert:Eg,depth_frag:wg,distance_vert:Tg,distance_frag:Ag,equirect_vert:Rg,equirect_frag:Cg,linedashed_vert:Pg,linedashed_frag:Ig,meshbasic_vert:Lg,meshbasic_frag:Dg,meshlambert_vert:Ng,meshlambert_frag:Ug,meshmatcap_vert:Fg,meshmatcap_frag:Og,meshnormal_vert:Bg,meshnormal_frag:kg,meshphong_vert:Hg,meshphong_frag:zg,meshphysical_vert:Gg,meshphysical_frag:Vg,meshtoon_vert:Wg,meshtoon_frag:Xg,points_vert:qg,points_frag:Yg,shadow_vert:Zg,shadow_frag:$g,sprite_vert:Jg,sprite_frag:Kg},It={common:{diffuse:{value:new kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Jt}},envmap:{envMap:{value:null},envMapRotation:{value:new Jt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Jt},normalScale:{value:new xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0},uvTransform:{value:new Jt}},sprite:{diffuse:{value:new kt(16777215)},opacity:{value:1},center:{value:new xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}}},Gn={basic:{uniforms:Je([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.fog]),vertexShader:ee.meshbasic_vert,fragmentShader:ee.meshbasic_frag},lambert:{uniforms:Je([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.fog,It.lights,{emissive:{value:new kt(0)},envMapIntensity:{value:1}}]),vertexShader:ee.meshlambert_vert,fragmentShader:ee.meshlambert_frag},phong:{uniforms:Je([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.fog,It.lights,{emissive:{value:new kt(0)},specular:{value:new kt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ee.meshphong_vert,fragmentShader:ee.meshphong_frag},standard:{uniforms:Je([It.common,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.roughnessmap,It.metalnessmap,It.fog,It.lights,{emissive:{value:new kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag},toon:{uniforms:Je([It.common,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.gradientmap,It.fog,It.lights,{emissive:{value:new kt(0)}}]),vertexShader:ee.meshtoon_vert,fragmentShader:ee.meshtoon_frag},matcap:{uniforms:Je([It.common,It.bumpmap,It.normalmap,It.displacementmap,It.fog,{matcap:{value:null}}]),vertexShader:ee.meshmatcap_vert,fragmentShader:ee.meshmatcap_frag},points:{uniforms:Je([It.points,It.fog]),vertexShader:ee.points_vert,fragmentShader:ee.points_frag},dashed:{uniforms:Je([It.common,It.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ee.linedashed_vert,fragmentShader:ee.linedashed_frag},depth:{uniforms:Je([It.common,It.displacementmap]),vertexShader:ee.depth_vert,fragmentShader:ee.depth_frag},normal:{uniforms:Je([It.common,It.bumpmap,It.normalmap,It.displacementmap,{opacity:{value:1}}]),vertexShader:ee.meshnormal_vert,fragmentShader:ee.meshnormal_frag},sprite:{uniforms:Je([It.sprite,It.fog]),vertexShader:ee.sprite_vert,fragmentShader:ee.sprite_frag},background:{uniforms:{uvTransform:{value:new Jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ee.background_vert,fragmentShader:ee.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Jt}},vertexShader:ee.backgroundCube_vert,fragmentShader:ee.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ee.cube_vert,fragmentShader:ee.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ee.equirect_vert,fragmentShader:ee.equirect_frag},distance:{uniforms:Je([It.common,It.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ee.distance_vert,fragmentShader:ee.distance_frag},shadow:{uniforms:Je([It.lights,It.fog,{color:{value:new kt(0)},opacity:{value:1}}]),vertexShader:ee.shadow_vert,fragmentShader:ee.shadow_frag}};Gn.physical={uniforms:Je([Gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Jt},clearcoatNormalScale:{value:new xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Jt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Jt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Jt},sheen:{value:0},sheenColor:{value:new kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Jt},transmissionSamplerSize:{value:new xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Jt},attenuationDistance:{value:0},attenuationColor:{value:new kt(0)},specularColor:{value:new kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Jt},anisotropyVector:{value:new xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Jt}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag};var Wa={r:0,b:0,g:0},Qg=new Xt,zd=new Jt;zd.set(-1,0,0,0,1,0,0,0,1);function jg(i,t,e,n,s,r){let o=new kt(0),a=s===!0?0:1,l,c,h=null,u=0,d=null;function f(_){let E=_.isScene===!0?_.background:null;if(E&&E.isTexture){let v=_.backgroundBlurriness>0;E=t.get(E,v)}return E}function m(_){let E=!1,v=f(_);v===null?p(o,a):v&&v.isColor&&(p(v,1),E=!0);let T=i.xr.getEnvironmentBlendMode();T==="additive"?e.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||E)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(_,E){let v=f(E);v&&v.isCubeTexture?(c===void 0&&(c=new re(new Ct(1,1,1),new kn({name:"BackgroundCubeMaterial",uniforms:Wi(Gn.backgroundCube.uniforms),vertexShader:Gn.backgroundCube.vertexShader,fragmentShader:Gn.backgroundCube.fragmentShader,side:$e,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,R,x){this.matrixWorld.copyPosition(x.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Qg.makeRotationFromEuler(E.backgroundRotation)).transpose(),v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(zd),c.material.toneMapped=ce.getTransfer(v.colorSpace)!==me,(h!==v||u!==v.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=v,u=v.version,d=i.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new re(new De(2,2),new kn({name:"BackgroundMaterial",uniforms:Wi(Gn.background.uniforms),vertexShader:Gn.background.vertexShader,fragmentShader:Gn.background.fragmentShader,side:Si,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=ce.getTransfer(v.colorSpace)!==me,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||u!==v.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=v,u=v.version,d=i.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function p(_,E){_.getRGB(Wa,Sc(i)),e.buffers.color.setClear(Wa.r,Wa.g,Wa.b,E,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(_,E=1){o.set(_),a=E,p(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(_){a=_,p(o,a)},render:m,addToRenderList:y,dispose:g}}function tx(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,o=!1;function a(C,N,O,I,G){let X=!1,U=u(C,I,O,N);r!==U&&(r=U,c(r.object)),X=f(C,I,O,G),X&&m(C,I,O,G),G!==null&&t.update(G,i.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,v(C,N,O,I),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(G).buffer))}function l(){return i.createVertexArray()}function c(C){return i.bindVertexArray(C)}function h(C){return i.deleteVertexArray(C)}function u(C,N,O,I){let G=I.wireframe===!0,X=n[N.id];X===void 0&&(X={},n[N.id]=X);let U=C.isInstancedMesh===!0?C.id:0,V=X[U];V===void 0&&(V={},X[U]=V);let P=V[O.id];P===void 0&&(P={},V[O.id]=P);let L=P[G];return L===void 0&&(L=d(l()),P[G]=L),L}function d(C){let N=[],O=[],I=[];for(let G=0;G<e;G++)N[G]=0,O[G]=0,I[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:O,attributeDivisors:I,object:C,attributes:{},index:null}}function f(C,N,O,I){let G=r.attributes,X=N.attributes,U=0,V=O.getAttributes();for(let P in V)if(V[P].location>=0){let A=G[P],B=X[P];if(B===void 0&&(P==="instanceMatrix"&&C.instanceMatrix&&(B=C.instanceMatrix),P==="instanceColor"&&C.instanceColor&&(B=C.instanceColor)),A===void 0||A.attribute!==B||B&&A.data!==B.data)return!0;U++}return r.attributesNum!==U||r.index!==I}function m(C,N,O,I){let G={},X=N.attributes,U=0,V=O.getAttributes();for(let P in V)if(V[P].location>=0){let A=X[P];A===void 0&&(P==="instanceMatrix"&&C.instanceMatrix&&(A=C.instanceMatrix),P==="instanceColor"&&C.instanceColor&&(A=C.instanceColor));let B={};B.attribute=A,A&&A.data&&(B.data=A.data),G[P]=B,U++}r.attributes=G,r.attributesNum=U,r.index=I}function y(){let C=r.newAttributes;for(let N=0,O=C.length;N<O;N++)C[N]=0}function p(C){g(C,0)}function g(C,N){let O=r.newAttributes,I=r.enabledAttributes,G=r.attributeDivisors;O[C]=1,I[C]===0&&(i.enableVertexAttribArray(C),I[C]=1),G[C]!==N&&(i.vertexAttribDivisor(C,N),G[C]=N)}function _(){let C=r.newAttributes,N=r.enabledAttributes;for(let O=0,I=N.length;O<I;O++)N[O]!==C[O]&&(i.disableVertexAttribArray(O),N[O]=0)}function E(C,N,O,I,G,X,U){U===!0?i.vertexAttribIPointer(C,N,O,G,X):i.vertexAttribPointer(C,N,O,I,G,X)}function v(C,N,O,I){y();let G=I.attributes,X=O.getAttributes(),U=N.defaultAttributeValues;for(let V in X){let P=X[V];if(P.location>=0){let L=G[V];if(L===void 0&&(V==="instanceMatrix"&&C.instanceMatrix&&(L=C.instanceMatrix),V==="instanceColor"&&C.instanceColor&&(L=C.instanceColor)),L!==void 0){let A=L.normalized,B=L.itemSize,Z=t.get(L);if(Z===void 0)continue;let k=Z.buffer,Y=Z.type,et=Z.bytesPerElement,ht=Y===i.INT||Y===i.UNSIGNED_INT||L.gpuType===sa;if(L.isInterleavedBufferAttribute){let j=L.data,ct=j.isInterleavedBuffer===!0?j.stride:j.itemSize,pt=L.offset;if(j.isInstancedInterleavedBuffer||j.isInstancedBufferAttribute){for(let lt=0;lt<P.locationSize;lt++)g(P.location+lt,j.meshPerAttribute);C.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let lt=0;lt<P.locationSize;lt++)p(P.location+lt);i.bindBuffer(i.ARRAY_BUFFER,k);for(let lt=0;lt<P.locationSize;lt++)E(P.location+lt,B/P.locationSize,Y,A,ct*et,(pt+B/P.locationSize*lt)*et,ht)}else{if(L.isInstancedBufferAttribute){for(let j=0;j<P.locationSize;j++)g(P.location+j,L.meshPerAttribute);C.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=L.meshPerAttribute*L.count)}else for(let j=0;j<P.locationSize;j++)p(P.location+j);i.bindBuffer(i.ARRAY_BUFFER,k);for(let j=0;j<P.locationSize;j++)E(P.location+j,B/P.locationSize,Y,A,B*et,B/P.locationSize*j*et,ht)}}else if(U!==void 0){let A=U[V];if(A!==void 0)switch(A.length){case 2:i.vertexAttrib2fv(P.location,A);break;case 3:i.vertexAttrib3fv(P.location,A);break;case 4:i.vertexAttrib4fv(P.location,A);break;default:i.vertexAttrib1fv(P.location,A)}}}}_()}function T(){F();for(let C in n){let N=n[C];for(let O in N){let I=N[O];for(let G in I){let X=I[G];for(let U in X)h(X[U].object),delete X[U];delete I[G]}}delete n[C]}}function R(C){if(n[C.id]===void 0)return;let N=n[C.id];for(let O in N){let I=N[O];for(let G in I){let X=I[G];for(let U in X)h(X[U].object),delete X[U];delete I[G]}}delete n[C.id]}function x(C){for(let N in n){let O=n[N];for(let I in O){let G=O[I];if(G[C.id]===void 0)continue;let X=G[C.id];for(let U in X)h(X[U].object),delete X[U];delete G[C.id]}}}function S(C){for(let N in n){let O=n[N],I=C.isInstancedMesh===!0?C.id:0,G=O[I];if(G!==void 0){for(let X in G){let U=G[X];for(let V in U)h(U[V].object),delete U[V];delete G[X]}delete O[I],Object.keys(O).length===0&&delete n[N]}}}function F(){M(),o=!0,r!==s&&(r=s,c(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:F,resetDefaultState:M,dispose:T,releaseStatesOfGeometry:R,releaseStatesOfObject:S,releaseStatesOfProgram:x,initAttributes:y,enableAttribute:p,disableUnusedAttributes:_}}function ex(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function o(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function a(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let d=0;for(let f=0;f<h;f++)d+=c[f];e.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function nx(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let x=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(x){return!(x!==Ln&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(x){let S=x===In&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(x!==rn&&x!==yn&&!S&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(x){if(x==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Wt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=e.logarithmicDepthBuffer===!0&&u===!1;e.reversedDepthBuffer===!0&&u===!1&&Wt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&u===!0&&Wt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),_=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=i.getParameter(i.MAX_SAMPLES),R=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:m,maxTextureSize:y,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:_,maxVaryings:E,maxFragmentUniforms:v,maxSamples:T,samples:R}}function ix(i){let t=this,e=null,n=0,s=!1,r=!1,o=new gn,a=new Jt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){let m=u.clippingPlanes,y=u.clipIntersection,p=u.clipShadows,g=i.get(u);if(!s||m===null||m.length===0||r&&!p)r?h(null):c();else{let _=r?0:n,E=_*4,v=g.clippingState||null;l.value=v,v=h(m,d,E,f);for(let T=0;T!==E;++T)v[T]=e[T];g.clippingState=v,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,m){let y=u!==null?u.length:0,p=null;if(y!==0){if(p=l.value,m!==!0||p===null){let g=f+y*4,_=d.matrixWorldInverse;a.getNormalMatrix(_),(p===null||p.length<g)&&(p=new Float32Array(g));for(let E=0,v=f;E!==y;++E,v+=4)o.copy(u[E]).applyMatrix4(_,a),o.normal.toArray(p,v),p[v+3]=o.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,p}}var Ur=class extends cn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new cr(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ct(5,5,5),r=new kn({name:"CubemapFromEquirect",uniforms:Wi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:$e,blending:Hi});r.uniforms.tEquirect.value=e;let o=new re(s,r),a=e.minFilter;return e.minFilter===jn&&(e.minFilter=en),new Es(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},yd=256,sx=3,rx=20,Gd=256,Vd=16,ox=3,ax=new z,lx=new kt,Ls=class i{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Es(1,10,null),this._boxMesh=new re(new Ct(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=ax}=r,l=this._renderer;this._setSize(o);let c=this._allocateTarget(),h=this._getSourceTarget(!0);e>0&&(h.texture.mipmapsAutoUpdate=!1);let u=l.autoClear,d=l.autoClearColor,f=l.autoClearDepth,m=l.autoClearStencil,y=t.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,y===null&&(t.background=l.getClearColor(lx));let p=new Es(n,s,h);return p.position.copy(a),p.update(l,t),l.autoClear=u,l.autoClearColor=d,l.autoClearDepth=f,l.autoClearStencil=m,t.background=y,e>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,e)),this._applyPMREM(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Sd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Md(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(yd,_c(t))}_fromTexture(t,e){t.mapping===Gi||t.mapping===Rs?this._setSize(t.image.length===0?yd:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);let n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){let t=this._cubeSize,e=vd(t,!1,!1),n=Math.log2(t)-sx;for(let s=0;s<=n;s++)e.texture.mipmaps.push({width:t>>s,height:t>>s});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){let e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=vd(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){let s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=t,r.activeMipmapLevel=e;let o=t.width>>e;t.viewport.set(0,0,o,o),r.update(this._renderer,s),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===Gi||t.mapping===Rs?(this._cubemapMaterial===null&&(this._cubemapMaterial=Sd()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Md()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=cx(),this._integrationMaterial=hx());let e=this._cubeSize,n=t.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/Vd);for(let o=0;o<=n;o++){let a=i.lodToRoughness(o,n);if(o>n-ox)r.roughness.value=a,this._renderCube(t,o,this._integrationMaterial);else{let l=a>0?Math.log2(e)+.5*Math.log2(6/(Gd*Math.pow(a,4)))+.5:0;s.roughness.value=a,s.lodBias.value=l,this._renderCube(t,o,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=ux());let n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(t,0,n),s.envMap.value=t.texture,this._renderCube(r,0,n)}};function vd(i,t,e){return new Ur(i,{minFilter:jn,generateMipmaps:t,type:In,colorSpace:tr,depthBuffer:e})}function Fr(i,t,e){return new kn({name:i,uniforms:t,vertexShader:ee.cube_vert,fragmentShader:e,side:$e,blending:Hi,depthTest:!1,depthWrite:!1})}function cx(){return Fr("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Gd}u

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
	`)}function hx(){return Fr("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Vd}},`

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
	`)}function ux(){return Fr("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${rx}
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
	`)}function Md(){return Fr("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function Sd(){return Fr("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function dx(i){let t=new WeakMap,e=new WeakMap,n=null;function s(d,f=!1){return d==null?null:f?o(d):r(d)}function r(d){if(d&&d.isTexture){let f=d.mapping;if(f===Cs||f===na)if(t.has(d)){let m=t.get(d).texture;return a(m,d.mapping)}else{let m=d.image;if(m&&m.height>0){let y=new Ur(m.height);return y.fromEquirectangularTexture(i,d),t.set(d,y),d.addEventListener("dispose",c),a(y.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture&&d.isPMREMTexture!==!0){let f=d.mapping,m=f===Cs||f===na,y=f===Gi||f===Rs;if(m||y){let p=e.get(d),g=p!==void 0?p.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==g)return n===null&&(n=new Ls(i)),p=m?n.fromEquirectangular(d,p):n.fromCubemap(d,p),p.texture.pmremVersion=d.pmremVersion,e.set(d,p),p.texture;if(p!==void 0)return p.texture;{let _=d.image;return m&&_&&_.height>0||y&&_&&l(_)?(n===null&&(n=new Ls(i)),p=m?n.fromEquirectangular(d):n.fromCubemap(d),p.texture.pmremVersion=d.pmremVersion,e.set(d,p),d.addEventListener("dispose",h),p.texture):null}}}return d}function a(d,f){return f===Cs?d.mapping=Gi:f===na&&(d.mapping=Rs),d}function l(d){let f=0,m=6;for(let y=0;y<m;y++)d[y]!==void 0&&f++;return f===m}function c(d){let f=d.target;f.removeEventListener("dispose",c);let m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function h(d){let f=d.target;f.removeEventListener("dispose",h);let m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function u(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function fx(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Zs("WebGLRenderer: "+n+" extension not supported."),s}}}function px(i,t,e,n){let s={},r=new WeakMap,o=new FinalizationRegistry(m=>delete s[m]);function a(m){l(m.target)}function l(m){m.index!==null&&t.remove(m.index);for(let p in m.attributes)t.remove(m.attributes[p]);m.removeEventListener("dispose",a),delete s[m.id],o.unregister(m);let y=r.get(m);y&&(t.remove(y),r.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,e.memory.geometries--}function c(m,y){return s[y.id]!==void 0||(y.addEventListener("dispose",a),s[y.id]=new WeakRef(y),o.register(y,y.id,y),e.memory.geometries++),y}function h(m){let y=m.attributes;for(let p in y)t.update(y[p],i.ARRAY_BUFFER)}function u(m){let y=m.index,p=m.attributes.position,g=0;if(p===void 0)return;let _=y!==null?y.array.length:p.array.length/3-1,E=p.count>=65535?or:rr,v=new E(Math.ceil(_/3)*6,1),T=v.array;if(y!==null){let x=y.array;g=y.version;for(let S=0,F=0;S<_;S+=3){let M=x[S+0],C=x[S+1],N=x[S+2];T[F++]=M,T[F++]=C,T[F++]=C,T[F++]=N,T[F++]=N,T[F++]=M}}else{g=p.version;for(let x=0,S=0;x<_;x+=3){let F=x+0,M=x+1,C=x+2;T[S++]=F,T[S++]=M,T[S++]=M,T[S++]=C,T[S++]=C,T[S++]=F}}v.version=g;let R=r.get(m);R&&t.remove(R),r.set(m,v)}function d(m){let y=r.get(m);if(y){let p=m.index;p!==null&&y.version<p.version&&u(m)}else u(m);return r.get(m)}function f(){for(let m in s){let y=s[m].deref();y!==void 0&&l(y)}}return{get:c,update:h,getWireframeAttribute:d,dispose:f}}function mx(i,t,e){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,d){i.drawElements(n,d,r,u*o),e.update(d,n,1)}function c(u,d,f){f!==0&&(i.drawElementsInstanced(n,d,r,u*o,f),e.update(d,n,f))}function h(u,d,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,u,0,f);let y=0;for(let p=0;p<f;p++)y+=d[p];e.update(y,n,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function gx(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:Yt("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function xx(i,t,e){let n=new WeakMap,s=new xe;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let F=function(){x.dispose(),n.delete(a),a.removeEventListener("dispose",F)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],_=a.morphAttributes.color||[],E=0;f===!0&&(E=1),m===!0&&(E=2),y===!0&&(E=3);let v=a.attributes.position.count*E,T=1;v>t.maxTextureSize&&(T=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let R=new Float32Array(v*T*4*u),x=new ir(R,v,T,u);x.type=yn,x.needsUpdate=!0;let S=E*4;for(let M=0;M<u;M++){let C=p[M],N=g[M],O=_[M],I=v*T*4*M;for(let G=0;G<C.count;G++){let X=G*S;f===!0&&(s.fromBufferAttribute(C,G),R[I+X+0]=s.x,R[I+X+1]=s.y,R[I+X+2]=s.z,R[I+X+3]=0),m===!0&&(s.fromBufferAttribute(N,G),R[I+X+4]=s.x,R[I+X+5]=s.y,R[I+X+6]=s.z,R[I+X+7]=0),y===!0&&(s.fromBufferAttribute(O,G),R[I+X+8]=s.x,R[I+X+9]=s.y,R[I+X+10]=s.z,R[I+X+11]=O.itemSize===4?s.w:1)}}d={count:u,texture:x,size:new xt(v,T)},n.set(a,d),a.addEventListener("dispose",F)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let y=0;y<c.length;y++)f+=c[y];let m=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",m),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function _x(i,t,e,n,s){let r=new WeakMap;function o(c){let h=s.render.frame,u=c.geometry,d=t.get(c,u);if(r.get(d)!==h&&(t.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return d}function a(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}var yx={[Ql]:"LINEAR_TONE_MAPPING",[jl]:"REINHARD_TONE_MAPPING",[tc]:"CINEON_TONE_MAPPING",[As]:"ACES_FILMIC_TONE_MAPPING",[nc]:"AGX_TONE_MAPPING",[ic]:"NEUTRAL_TONE_MAPPING",[ec]:"CUSTOM_TONE_MAPPING"};function vx(i,t,e,n,s,r){let o=new cn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=null,h=new pe;h.setAttribute("position",new qt([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new qt([0,2,0,0,2,0],2));let u=new zo({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new re(h,u),f=new wr(-1,1,1,-1,0,1),m=null,y=null,p=!1,g,_=null,E=[],v=!1;this.setSize=function(T,R){o.setSize(T,R),a!==null&&a.setSize(T,R),l!==null&&l.setSize(T,R);for(let x=0;x<E.length;x++){let S=E[x];S.setSize&&S.setSize(T,R)}},this.setEffects=function(T){E=T,v=E.length>0&&E[0].isRenderPass===!0;let R=o.width,x=o.height;E.length>0&&a===null&&(a=new cn(R,x,{type:In,depthBuffer:!1,stencilBuffer:!1}),l=new cn(R,x,{type:In,depthBuffer:!1,stencilBuffer:!1}));let S=s===!0&&E.some(F=>F.needsDepthTexture===!0);S!==(o.depthTexture!==null)&&(S===!0&&c===null&&(c=new Kn(R,x),r===!0&&(c.format=ti,c.type=Vi)),o.dispose(),o.depthTexture=S?c:null,o.resolveDepthBuffer=S,o.storeMultisampledDepthBuffer=S);for(let F=0;F<E.length;F++){let M=E[F];M.setSize&&M.setSize(R,x),S&&M.needsDepthTexture===!0&&M.setDepthTexture&&M.setDepthTexture(c)}},this.begin=function(T,R){if(p||T.toneMapping===Hn&&E.length===0)return!1;if(_=R,R!==null){let x=R.width,S=R.height;(o.width!==x||o.height!==S)&&this.setSize(x,S)}return v===!1&&T.setRenderTarget(o),g=T.toneMapping,T.toneMapping=Hn,!0},this.hasRenderPass=function(){return v},this.end=function(T,R){T.toneMapping=g,p=!0;let x=o,S=a;for(let F=0;F<E.length;F++){let M=E[F];M.enabled!==!1&&(M.render(T,S,x,R),M.needsSwap!==!1&&(x=S,S=S===a?l:a))}if(m!==T.outputColorSpace||y!==T.toneMapping){m=T.outputColorSpace,y=T.toneMapping,u.defines={},ce.getTransfer(m)===me&&(u.defines.SRGB_TRANSFER="");let F=yx[y];F&&(u.defines[F]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=x.texture,T.setRenderTarget(_),T.render(d,f),_=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),h.dispose(),u.dispose()}}var Wd=new Ye,Xd=new Kn(1,1),qd=new hr(1),Yd=new ir,Zd=new Io,$d=new cr,bd=[],Ed=[],wd=new Float32Array(16),Td=new Float32Array(9),Ad=new Float32Array(4);function Ds(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=bd[s];if(r===void 0&&(r=new Float32Array(s),bd[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ne(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ue(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ya(i,t){let e=Ed[t];e===void 0&&(e=new Int32Array(t),Ed[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Mx(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Sx(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;i.uniform2fv(this.addr,t),Ue(e,t)}}function bx(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ne(e,t))return;i.uniform3fv(this.addr,t),Ue(e,t)}}function Ex(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;i.uniform4fv(this.addr,t),Ue(e,t)}}function wx(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ne(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ue(e,t)}else{if(Ne(e,n))return;Ad.set(n),i.uniformMatrix2fv(this.addr,!1,Ad),Ue(e,n)}}function Tx(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ne(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ue(e,t)}else{if(Ne(e,n))return;Td.set(n),i.uniformMatrix3fv(this.addr,!1,Td),Ue(e,n)}}function Ax(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ne(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ue(e,t)}else{if(Ne(e,n))return;wd.set(n),i.uniformMatrix4fv(this.addr,!1,wd),Ue(e,n)}}function Rx(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Cx(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;i.uniform2iv(this.addr,t),Ue(e,t)}}function Px(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ne(e,t))return;i.uniform3iv(this.addr,t),Ue(e,t)}}function Ix(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;i.uniform4iv(this.addr,t),Ue(e,t)}}function Lx(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Dx(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;i.uniform2uiv(this.addr,t),Ue(e,t)}}function Nx(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ne(e,t))return;i.uniform3uiv(this.addr,t),Ue(e,t)}}function Ux(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;i.uniform4uiv(this.addr,t),Ue(e,t)}}function Za(i){return i.version===0&&(i.compareFunction=fc,i.needsUpdate=!0),i}function Fx(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=Za(Xd):r=Wd,e.setTexture2D(t||r,s)}function Ox(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Zd,s)}function Bx(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=Za(qd):r=$d,e.setTextureCube(t||r,s)}function kx(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Yd,s)}function Hx(i){switch(i){case 5126:return Mx;case 35664:return Sx;case 35665:return bx;case 35666:return Ex;case 35674:return wx;case 35675:return Tx;case 35676:return Ax;case 5124:case 35670:return Rx;case 35667:case 35671:return Cx;case 35668:case 35672:return Px;case 35669:case 35673:return Ix;case 5125:return Lx;case 36294:return Dx;case 36295:return Nx;case 36296:return Ux;case 35678:case 36198:case 36298:case 36306:case 35682:return Fx;case 35679:case 36299:case 36307:return Ox;case 35680:case 36300:case 36308:case 36293:return Bx;case 36289:case 36303:case 36311:case 36292:return kx}}function zx(i,t){i.uniform1fv(this.addr,t)}function Gx(i,t){let e=Ds(t,this.size,2);i.uniform2fv(this.addr,e)}function Vx(i,t){let e=Ds(t,this.size,3);i.uniform3fv(this.addr,e)}function Wx(i,t){let e=Ds(t,this.size,4);i.uniform4fv(this.addr,e)}function Xx(i,t){let e=Ds(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function qx(i,t){let e=Ds(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Yx(i,t){let e=Ds(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Zx(i,t){i.uniform1iv(this.addr,t)}function $x(i,t){i.uniform2iv(this.addr,t)}function Jx(i,t){i.uniform3iv(this.addr,t)}function Kx(i,t){i.uniform4iv(this.addr,t)}function Qx(i,t){i.uniform1uiv(this.addr,t)}function jx(i,t){i.uniform2uiv(this.addr,t)}function t_(i,t){i.uniform3uiv(this.addr,t)}function e_(i,t){i.uniform4uiv(this.addr,t)}function n_(i,t,e){let n=this.cache,s=t.length,r=Ya(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Ue(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=Za(Xd):o=Wd;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function i_(i,t,e){let n=this.cache,s=t.length,r=Ya(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Ue(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Zd,r[o])}function s_(i,t,e){let n=this.cache,s=t.length,r=Ya(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Ue(n,r));let o;this.type===i.SAMPLER_CUBE_SHADOW?o=Za(qd):o=$d;for(let a=0;a!==s;++a)e.setTextureCube(t[a]||o,r[a])}function r_(i,t,e){let n=this.cache,s=t.length,r=Ya(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Ue(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Yd,r[o])}function o_(i){switch(i){case 5126:return zx;case 35664:return Gx;case 35665:return Vx;case 35666:return Wx;case 35674:return Xx;case 35675:return qx;case 35676:return Yx;case 5124:case 35670:return Zx;case 35667:case 35671:return $x;case 35668:case 35672:return Jx;case 35669:case 35673:return Kx;case 5125:return Qx;case 36294:return jx;case 36295:return t_;case 36296:return e_;case 35678:case 36198:case 36298:case 36306:case 35682:return n_;case 35679:case 36299:case 36307:return i_;case 35680:case 36300:case 36308:case 36293:return s_;case 36289:case 36303:case 36311:case 36292:return r_}}var Dc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Hx(e.type)}},Nc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=o_(e.type)}},Uc=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},Ic=/(\w+)(\])?(\[|\.)?/g;function Rd(i,t){i.seq.push(t),i.map[t.id]=t}function a_(i,t,e){let n=i.name,s=n.length;for(Ic.lastIndex=0;;){let r=Ic.exec(n),o=Ic.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Rd(e,c===void 0?new Dc(a,i,t):new Nc(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new Uc(a),Rd(e,u)),e=u}}}var Is=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=t.getActiveUniform(e,o),l=t.getUniformLocation(e,a.name);a_(a,l,this)}let s=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function Cd(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var l_=37297,c_=0;function h_(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var Pd=new Jt;function u_(i){ce._getMatrix(Pd,ce.workingColorSpace,i);let t=`mat3( ${Pd.elements.map(e=>e.toFixed(4))} )`;switch(ce.getTransfer(i)){case er:return[t,"LinearTransferOETF"];case me:return[t,"sRGBTransferOETF"];default:return Wt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Id(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+h_(i.getShaderSource(t),a)}else return r}function d_(i,t){let e=u_(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var f_={[Ql]:"Linear",[jl]:"Reinhard",[tc]:"Cineon",[As]:"ACESFilmic",[nc]:"AgX",[ic]:"Neutral",[ec]:"Custom"};function p_(i,t){let e=f_[t];return e===void 0?(Wt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Xa=new z;function m_(){ce.getLuminanceCoefficients(Xa);let i=Xa.x.toFixed(4),t=Xa.y.toFixed(4),e=Xa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function g_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Nr).join(`
`)}function x_(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function __(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Nr(i){return i!==""}function Ld(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function Dd(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var y_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Fc(i){return i.replace(y_,v_)}function v_(i,t){let e=ee[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return Fc(e)}var M_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nd(i){return i.replace(M_,S_)}function S_(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ud(i){let t=`precision ${i.precision} float;
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
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var b_={[ki]:"SHADOWMAP_TYPE_PCF",[ws]:"SHADOWMAP_TYPE_VSM"};function E_(i){return b_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var w_={[Rs]:"ENVMAP_MODE_REFRACTION"};function T_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":w_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var A_={[Kl]:"ENVMAP_BLENDING_MULTIPLY",[Ju]:"ENVMAP_BLENDING_MIX",[Ku]:"ENVMAP_BLENDING_ADD"};function R_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":A_[i.combine]||"ENVMAP_BLENDING_NONE"}function C_(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=E_(e),c=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=T_(e),u=R_(e),d=g_(e),f=x_(r),m=s.createProgram(),y,p,g=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(y=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(Nr).join(`
`),y.length>0&&(y+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(Nr).join(`
`),p.length>0&&(p+=`
`)):(y=[Ud(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Nr).join(`
`),p=[Ud(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Hn?"#define TONE_MAPPING":"",e.toneMapping!==Hn?ee.tonemapping_pars_fragment:"",e.toneMapping!==Hn?p_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ee.colorspace_pars_fragment,d_("linearToOutputTexel",e.outputColorSpace),m_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Nr).join(`
`)),o=Fc(o),o=Ld(o,e),o=Dd(o,e),a=Fc(a),a=Ld(a,e),a=Dd(a,e),o=Nd(o),a=Nd(a),e.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,y=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,p=["#define varying in",e.glslVersion===gc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===gc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let _=g+y+o,E=g+p+a,v=Cd(s,s.VERTEX_SHADER,_),T=Cd(s,s.FRAGMENT_SHADER,E);s.attachShader(m,v),s.attachShader(m,T),e.index0AttributeName!==void 0?s.bindAttribLocation(m,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function R(M){if(i.debug.checkShaderErrors){let C=s.getProgramInfoLog(m)||"",N=s.getShaderInfoLog(v)||"",O=s.getShaderInfoLog(T)||"",I=C.trim(),G=N.trim(),X=O.trim(),U=!0,V=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(U=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,m,v,T);else{let P=Id(s,v,"vertex"),L=Id(s,T,"fragment");Yt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Material Name: `+M.name+`
Material Type: `+M.type+`

Program Info Log: `+I+`
`+P+`
`+L)}else I!==""?Wt("WebGLProgram: Program Info Log:",I):(G===""||X==="")&&(V=!1);V&&(M.diagnostics={runnable:U,programLog:I,vertexShader:{log:G,prefix:y},fragmentShader:{log:X,prefix:p}})}s.deleteShader(v),s.deleteShader(T),x=new Is(s,m),S=__(s,m)}let x;this.getUniforms=function(){return x===void 0&&R(this),x};let S;this.getAttributes=function(){return S===void 0&&R(this),S};let F=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=s.getProgramParameter(m,l_)),F},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=c_++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=v,this.fragmentShader=T,this}var P_=0,Oc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Bc(t),e.set(t,n)),n}},Bc=class{constructor(t){this.id=P_++,this.code=t,this.usedTimes=0}};function I_(i){return i===bi||i===Ir||i===Lr}function L_(i,t,e,n,s,r){let o=new sr,a=new Oc,l=new Set,c=[],h=new Map,u=n.logarithmicDepthBuffer,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(x){return l.add(x),x===0?"uv":`uv${x}`}function m(x,S,F,M,C,N){let O=M.fog,I=C.geometry,G=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?M.environment:null,X=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,U=t.get(x.envMap||G,X),V=d[x.type],P=n.precision;x.precision!==null&&(P=n.getMaxPrecision(x.precision),P!==x.precision&&Wt("WebGLProgram.getParameters:",x.precision,"not supported, using",P,"instead."));let L=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,A=L!==void 0?L.length:0,B=0;I.morphAttributes.position!==void 0&&(B=1),I.morphAttributes.normal!==void 0&&(B=2),I.morphAttributes.color!==void 0&&(B=3);let Z,k,Y,et;if(V){let Pt=Gn[V];Z=Pt.vertexShader,k=Pt.fragmentShader}else{Z=x.vertexShader,k=x.fragmentShader;let Pt=a.getVertexShaderStage(x),ge=a.getFragmentShaderStage(x);a.update(x,Pt,ge),Y=Pt.id,et=ge.id}let ht=i.getRenderTarget(),j=i.state.buffers.depth.getReversed(),ct=C.isInstancedMesh===!0,pt=C.isBatchedMesh===!0,lt=!!x.map,_t=!!x.matcap,Dt=!!U,Q=Dt&&U.isPMREMTexture===!0,ot=!!x.aoMap,ut=!!x.lightMap,Rt=!!x.bumpMap&&x.wireframe===!1,dt=!!x.normalMap,Nt=!!x.displacementMap,Ut=!!x.emissiveMap,Zt=!!x.metalnessMap,ne=!!x.roughnessMap,oe=x.anisotropy>0,q=x.clearcoat>0,Ce=x.diffuseRoughness>0,ie=x.dispersion>0,_e=x.retroreflectivity>0,wt=x.iridescence>0,Re=x.sheen>0,Vt=x.transmission>0,$t=oe&&!!x.anisotropyMap,D=q&&!!x.clearcoatMap,b=q&&!!x.clearcoatNormalMap,J=q&&!!x.clearcoatRoughnessMap,ft=Ce&&!!x.diffuseRoughnessMap,at=wt&&!!x.iridescenceMap,vt=wt&&!!x.iridescenceThicknessMap,Tt=Re&&!!x.sheenColorMap,it=Re&&!!x.sheenRoughnessMap,st=!!x.specularMap,St=!!x.specularColorMap,H=!!x.specularIntensityMap,rt=Vt&&!!x.transmissionMap,nt=Vt&&!!x.thicknessMap,bt=!!x.gradientMap,yt=!!x.alphaMap,Mt=x.alphaTest>0,zt=!!x.alphaHash,te=!!x.extensions,mt=Hn;x.toneMapped&&(ht===null||ht.isXRRenderTarget===!0)&&(mt=i.toneMapping);let Gt=Q?U.isCompressedCubeTexture?U.image[0].mipmaps:U.mipmaps:null,jt={shaderID:V,shaderType:x.type,shaderName:x.name,vertexShader:Z,fragmentShader:k,defines:x.defines,customVertexShaderID:Y,customFragmentShaderID:et,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:P,batching:pt,batchingColor:pt&&C._colorsTexture!==null,instancing:ct,instancingColor:ct&&C.instanceColor!==null,instancingMorph:ct&&C.morphTexture!==null,outputColorSpace:ht===null?i.outputColorSpace:ht.isXRRenderTarget===!0?ht.texture.colorSpace:ce.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:lt,matcap:_t,envMap:Dt,envMapMode:Dt&&U.mapping,envMapPMREM:Q,envMapMaxLod:Q?Gt.length-1:null,envMapSize:Q?Gt[0].width:null,aoMap:ot,lightMap:ut,bumpMap:Rt,normalMap:dt,displacementMap:Nt,emissiveMap:Ut,normalMapObjectSpace:dt&&x.normalMapType===td,normalMapTangentSpace:dt&&x.normalMapType===za,packedNormalMap:dt&&x.normalMapType===za&&I_(x.normalMap.format),metalnessMap:Zt,roughnessMap:ne,anisotropy:oe,anisotropyMap:$t,clearcoat:q,clearcoatMap:D,clearcoatNormalMap:b,clearcoatRoughnessMap:J,diffuseRoughness:Ce,diffuseRoughnessMap:ft,dispersion:ie,retroreflection:_e,iridescence:wt,iridescenceMap:at,iridescenceThicknessMap:vt,sheen:Re,sheenColorMap:Tt,sheenRoughnessMap:it,specularMap:st,specularColorMap:St,specularIntensityMap:H,transmission:Vt,transmissionMap:rt,thicknessMap:nt,gradientMap:bt,opaque:x.transparent===!1&&x.blending===Ts&&x.alphaToCoverage===!1,alphaMap:yt,alphaTest:Mt,alphaHash:zt,combine:x.combine,mapUv:lt&&f(x.map.channel),aoMapUv:ot&&f(x.aoMap.channel),lightMapUv:ut&&f(x.lightMap.channel),bumpMapUv:Rt&&f(x.bumpMap.channel),normalMapUv:dt&&f(x.normalMap.channel),displacementMapUv:Nt&&f(x.displacementMap.channel),emissiveMapUv:Ut&&f(x.emissiveMap.channel),metalnessMapUv:Zt&&f(x.metalnessMap.channel),roughnessMapUv:ne&&f(x.roughnessMap.channel),anisotropyMapUv:$t&&f(x.anisotropyMap.channel),clearcoatMapUv:D&&f(x.clearcoatMap.channel),clearcoatNormalMapUv:b&&f(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:J&&f(x.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ft&&f(x.diffuseRoughnessMap.channel),iridescenceMapUv:at&&f(x.iridescenceMap.channel),iridescenceThicknessMapUv:vt&&f(x.iridescenceThicknessMap.channel),sheenColorMapUv:Tt&&f(x.sheenColorMap.channel),sheenRoughnessMapUv:it&&f(x.sheenRoughnessMap.channel),specularMapUv:st&&f(x.specularMap.channel),specularColorMapUv:St&&f(x.specularColorMap.channel),specularIntensityMapUv:H&&f(x.specularIntensityMap.channel),transmissionMapUv:rt&&f(x.transmissionMap.channel),thicknessMapUv:nt&&f(x.thicknessMap.channel),alphaMapUv:yt&&f(x.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(dt||oe),vertexNormals:!!I.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:C.isPoints===!0&&!!I.attributes.uv&&(lt||yt),fog:!!O,useFog:x.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||I.attributes.normal===void 0&&dt===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:j,skinning:C.isSkinnedMesh===!0,hasPositionAttribute:I.attributes.position!==void 0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:A,morphTextureStride:B,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:N.filter(Pt=>Pt.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&F.length>0,shadowMapType:i.shadowMap.type,toneMapping:mt,decodeVideoTexture:lt&&x.map.isVideoTexture===!0&&ce.getTransfer(x.map.colorSpace)===me,decodeVideoTextureEmissive:Ut&&x.emissiveMap.isVideoTexture===!0&&ce.getTransfer(x.emissiveMap.colorSpace)===me,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Ge,flipSided:x.side===$e,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:te&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(te&&x.extensions.multiDraw===!0||pt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return jt.vertexUv1s=l.has(1),jt.vertexUv2s=l.has(2),jt.vertexUv3s=l.has(3),l.clear(),jt}function y(x){let S=[];if(x.shaderID?S.push(x.shaderID):(S.push(x.customVertexShaderID),S.push(x.customFragmentShaderID)),x.defines!==void 0)for(let F in x.defines)S.push(F),S.push(x.defines[F]);return x.isRawShaderMaterial===!1&&(p(S,x),g(S,x),S.push(i.outputColorSpace)),S.push(x.customProgramCacheKey),S.join()}function p(x,S){x.push(S.precision),x.push(S.outputColorSpace),x.push(S.envMapMode),x.push(S.envMapPMREM),x.push(S.envMapMaxLod),x.push(S.envMapSize),x.push(S.mapUv),x.push(S.alphaMapUv),x.push(S.lightMapUv),x.push(S.aoMapUv),x.push(S.bumpMapUv),x.push(S.normalMapUv),x.push(S.displacementMapUv),x.push(S.emissiveMapUv),x.push(S.metalnessMapUv),x.push(S.roughnessMapUv),x.push(S.anisotropyMapUv),x.push(S.clearcoatMapUv),x.push(S.clearcoatNormalMapUv),x.push(S.clearcoatRoughnessMapUv),x.push(S.diffuseRoughnessMapUv),x.push(S.iridescenceMapUv),x.push(S.iridescenceThicknessMapUv),x.push(S.sheenColorMapUv),x.push(S.sheenRoughnessMapUv),x.push(S.specularMapUv),x.push(S.specularColorMapUv),x.push(S.specularIntensityMapUv),x.push(S.transmissionMapUv),x.push(S.thicknessMapUv),x.push(S.combine),x.push(S.fogExp2),x.push(S.sizeAttenuation),x.push(S.morphTargetsCount),x.push(S.numSunLights),x.push(S.numDirLights),x.push(S.numPointLights),x.push(S.numSpotLights),x.push(S.numSpotLightMaps),x.push(S.numHemiLights),x.push(S.numRectAreaLights),x.push(S.numSunLightShadows),x.push(S.numDirLightShadows),x.push(S.numPointLightShadows),x.push(S.numSpotLightShadows),x.push(S.numSpotLightShadowsWithMaps),x.push(S.numLightProbes),x.push(S.numLightProbeGrids),x.push(S.shadowMapType),x.push(S.toneMapping),x.push(S.numClippingPlanes),x.push(S.numClipIntersection),x.push(S.depthPacking)}function g(x,S){o.disableAll(),S.instancing&&o.enable(0),S.instancingColor&&o.enable(1),S.instancingMorph&&o.enable(2),S.matcap&&o.enable(3),S.envMap&&o.enable(4),S.normalMapObjectSpace&&o.enable(5),S.normalMapTangentSpace&&o.enable(6),S.clearcoat&&o.enable(7),S.iridescence&&o.enable(8),S.alphaTest&&o.enable(9),S.vertexColors&&o.enable(10),S.vertexAlphas&&o.enable(11),S.vertexUv1s&&o.enable(12),S.vertexUv2s&&o.enable(13),S.vertexUv3s&&o.enable(14),S.vertexTangents&&o.enable(15),S.anisotropy&&o.enable(16),S.alphaHash&&o.enable(17),S.batching&&o.enable(18),S.dispersion&&o.enable(19),S.retroreflection&&o.enable(24),S.diffuseRoughness&&o.enable(25),S.batchingColor&&o.enable(20),S.gradientMap&&o.enable(21),S.packedNormalMap&&o.enable(22),S.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reversedDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),S.numLightProbeGrids>0&&o.enable(22),S.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function _(x){let S=d[x.type],F;if(S){let M=Gn[S];F=gd.clone(M.uniforms)}else F=x.uniforms;return F}function E(x,S){let F=h.get(S);return F!==void 0?++F.usedTimes:(F=new C_(i,S,x,s),c.push(F),h.set(S,F)),F}function v(x){if(--x.usedTimes===0){let S=c.indexOf(x);c[S]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function T(x){a.remove(x)}function R(){a.dispose()}return{getParameters:m,getProgramCacheKey:y,getUniforms:_,acquireProgram:E,releaseProgram:v,releaseShaderCache:T,programs:c,dispose:R}}function D_(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function N_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Fd(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Od(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function a(d,f,m,y,p,g){let _=i[t];return _===void 0?(_={id:d.id,object:d,geometry:f,material:m,materialVariant:o(d),groupOrder:y,renderOrder:d.renderOrder,z:p,group:g},i[t]=_):(_.id=d.id,_.object=d,_.geometry=f,_.material=m,_.materialVariant=o(d),_.groupOrder=y,_.renderOrder=d.renderOrder,_.z=p,_.group=g),t++,_}function l(d,f,m,y,p,g,_){_.reversedDepth===!0&&(p=-p);let E=a(d,f,m,y,p,g);m.transmission>0?n.push(E):m.transparent===!0?s.push(E):e.push(E)}function c(d,f,m,y,p,g){let _=a(d,f,m,y,p,g);m.transmission>0?n.unshift(_):m.transparent===!0?s.unshift(_):e.unshift(_)}function h(d,f){e.length>1&&e.sort(d||N_),n.length>1&&n.sort(f||Fd),s.length>1&&s.sort(f||Fd)}function u(){for(let d=t,f=i.length;d<f;d++){let m=i[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:u,sort:h}}function U_(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new Od,i.set(n,[o])):s>=r.length?(o=new Od,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function F_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new z,color:new kt};break;case"SpotLight":e={position:new z,direction:new z,color:new kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new z,color:new kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new z,skyColor:new kt,groundColor:new kt};break;case"RectAreaLight":e={color:new kt,position:new z,halfWidth:new z,halfHeight:new z};break}return i[t.id]=e,e}}}function O_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var B_=0;function k_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function H_(i){let t=new F_,e=O_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new z);let s=new z,r=new Xt,o=new Xt;function a(c){let h=0,u=0,d=0;for(let N=0;N<9;N++)n.probe[N].set(0,0,0);let f=0,m=0,y=0,p=0,g=0,_=0,E=0,v=0,T=0,R=0,x=0,S=0,F=0,M=0;c.sort(k_);for(let N=0,O=c.length;N<O;N++){let I=c[N],G=I.color,X=I.intensity,U=I.distance,V=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===bi?V=I.shadow.map.texture:V=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=G.r*X,u+=G.g*X,d+=G.b*X;else if(I.isLightProbe){for(let P=0;P<9;P++)n.probe[P].addScaledVector(I.sh.coefficients[P],X);M++}else if(I.isSunLight){let P=t.get(I);if(P.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let L=I.shadow,A=e.get(I);A.shadowIntensity=L.intensity,A.shadowBias=L.bias,A.shadowNormalBias=L.normalBias,A.shadowRadius=L.radius,A.shadowMapSize.copy(L.mapSize).multiply(L.getFrameExtents()),n.sunShadow[m]=A,n.sunShadowMap[m]=V;let B=L.getViewportCount();for(let Z=0;Z<B;Z++)n.sunShadowMatrix[y+Z]=L.getMatrix(Z),n.sunShadowCascade[y+Z]=L._cascadeData[Z];y+=B,m++}n.sun[f]=P,f++}else if(I.isDirectionalLight){let P=t.get(I);if(P.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let L=I.shadow,A=e.get(I);A.shadowIntensity=L.intensity,A.shadowBias=L.bias,A.shadowNormalBias=L.normalBias,A.shadowRadius=L.radius,A.shadowMapSize=L.mapSize,n.directionalShadow[p]=A,n.directionalShadowMap[p]=V,n.directionalShadowMatrix[p]=I.shadow.matrix,T++}n.directional[p]=P,p++}else if(I.isSpotLight){let P=t.get(I);P.position.setFromMatrixPosition(I.matrixWorld),P.color.copy(G).multiplyScalar(X),P.distance=U,P.coneCos=Math.cos(I.angle),P.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),P.decay=I.decay,n.spot[_]=P;let L=I.shadow;if(I.map&&(n.spotLightMap[S]=I.map,S++,L.updateMatrices(I),I.castShadow&&F++),n.spotLightMatrix[_]=L.matrix,I.castShadow){let A=e.get(I);A.shadowIntensity=L.intensity,A.shadowBias=L.bias,A.shadowNormalBias=L.normalBias,A.shadowRadius=L.radius,A.shadowMapSize=L.mapSize,n.spotShadow[_]=A,n.spotShadowMap[_]=V,x++}_++}else if(I.isRectAreaLight){let P=t.get(I);P.color.copy(G).multiplyScalar(X),P.halfWidth.set(I.width*.5,0,0),P.halfHeight.set(0,I.height*.5,0),n.rectArea[E]=P,E++}else if(I.isPointLight){let P=t.get(I);if(P.color.copy(I.color).multiplyScalar(I.intensity),P.distance=I.distance,P.decay=I.decay,I.castShadow){let L=I.shadow,A=e.get(I);A.shadowIntensity=L.intensity,A.shadowBias=L.bias,A.shadowNormalBias=L.normalBias,A.shadowRadius=L.radius,A.shadowMapSize=L.mapSize,A.shadowCameraNear=L.camera.near,A.shadowCameraFar=L.camera.far,n.pointShadow[g]=A,n.pointShadowMap[g]=V,n.pointShadowMatrix[g]=I.shadow.matrix,R++}n.point[g]=P,g++}else if(I.isHemisphereLight){let P=t.get(I);P.skyColor.copy(I.color).multiplyScalar(X),P.groundColor.copy(I.groundColor).multiplyScalar(X),n.hemi[v]=P,v++}}E>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=It.LTC_FLOAT_1,n.rectAreaLTC2=It.LTC_FLOAT_2):(n.rectAreaLTC1=It.LTC_HALF_1,n.rectAreaLTC2=It.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let C=n.hash;(C.sunLength!==f||C.directionalLength!==p||C.pointLength!==g||C.spotLength!==_||C.rectAreaLength!==E||C.hemiLength!==v||C.numSunShadows!==m||C.numDirectionalShadows!==T||C.numPointShadows!==R||C.numSpotShadows!==x||C.numSpotMaps!==S||C.numLightProbes!==M)&&(n.sun.length=f,n.directional.length=p,n.spot.length=_,n.rectArea.length=E,n.point.length=g,n.hemi.length=v,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.directionalShadowMatrix.length=T,n.pointShadow.length=R,n.pointShadowMap.length=R,n.pointShadowMatrix.length=R,n.spotShadow.length=x,n.spotShadowMap.length=x,n.spotLightMatrix.length=x+S-F,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=F,n.numLightProbes=M,C.sunLength=f,C.directionalLength=p,C.pointLength=g,C.spotLength=_,C.rectAreaLength=E,C.hemiLength=v,C.numSunShadows=m,C.numDirectionalShadows=T,C.numPointShadows=R,C.numSpotShadows=x,C.numSpotMaps=S,C.numLightProbes=M,n.version=B_++)}function l(c,h){let u=0,d=0,f=0,m=0,y=0,p=0,g=h.matrixWorldInverse;for(let _=0,E=c.length;_<E;_++){let v=c[_];if(v.isSunLight){let T=n.sun[u];T.direction.setFromMatrixPosition(v.matrixWorld),T.direction.transformDirection(g),u++}else if(v.isDirectionalLight){let T=n.directional[d];T.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(g),d++}else if(v.isSpotLight){let T=n.spot[m];T.position.setFromMatrixPosition(v.matrixWorld),T.position.applyMatrix4(g),T.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(g),m++}else if(v.isRectAreaLight){let T=n.rectArea[y];T.position.setFromMatrixPosition(v.matrixWorld),T.position.applyMatrix4(g),o.identity(),r.copy(v.matrixWorld),r.premultiply(g),o.extractRotation(r),T.halfWidth.set(v.width*.5,0,0),T.halfHeight.set(0,v.height*.5,0),T.halfWidth.applyMatrix4(o),T.halfHeight.applyMatrix4(o),y++}else if(v.isPointLight){let T=n.point[f];T.position.setFromMatrixPosition(v.matrixWorld),T.position.applyMatrix4(g),f++}else if(v.isHemisphereLight){let T=n.hemi[p];T.direction.setFromMatrixPosition(v.matrixWorld),T.direction.transformDirection(g),p++}}}return{setup:a,setupView:l,state:n}}function Bd(i){let t=new H_(i),e=[],n=[],s=[];function r(u){h.camera=u,e.length=0,n.length=0,s.length=0}function o(u){u.isLightProbeGrid?s.push(u):e.push(u)}function a(u){n.push(u)}function l(){t.setup(e),s.sort((u,d)=>u.priority-d.priority||u.id-d.id)}function c(u){t.setupView(e,u)}let h={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function z_(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Bd(i),t.set(s,[a])):r>=o.length?(a=new Bd(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var G_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,V_=`uniform sampler2D shadow_pass;
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
}`,W_=[new z(1,0,0),new z(-1,0,0),new z(0,1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1)],X_=[new z(0,-1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1),new z(0,-1,0),new z(0,-1,0)],kd=new Xt,Dr=new z,Lc=new z;function q_(i,t,e){let n=new xi,s=new xt,r=new xt,o=new xe,a=new Ms,l=new Go,c={},h=e.maxTextureSize,u={[Si]:$e,[$e]:Si,[Ge]:Ge},d=new kn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new xt},radius:{value:4}},vertexShader:G_,fragmentShader:V_}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let m=new pe;m.setAttribute("position",new ue(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new re(m,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ki;let g=this.type;this.render=function(R,x,S){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||R.length===0)return;this.type===Iu&&(Wt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ki);let F=i.getRenderTarget(),M=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),N=i.state;N.setBlending(Hi),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let O=g!==this.type;O&&x.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(G=>G.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,G=R.length;I<G;I++){let X=R[I],U=X.shadow;if(U===void 0){Wt("WebGLShadowMap:",X,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;s.copy(U.mapSize);let V=U.getFrameExtents();s.multiply(V),r.copy(U.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/V.x),s.x=r.x*V.x,U.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/V.y),s.y=r.y*V.y,U.mapSize.y=r.y));let P=i.state.buffers.depth.getReversed();if(U.camera._reversedDepth=P,U.map===null||O===!0){if(U.map!==null&&(U.map.depthTexture!==null&&(U.map.depthTexture.dispose(),U.map.depthTexture=null),U.map.dispose()),this.type===ws){if(X.isPointLight){Wt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}U.map=new cn(s.x,s.y,{format:bi,type:In,minFilter:en,magFilter:en,generateMipmaps:!1}),U.map.texture.name=X.name+".shadowMap",U.map.depthTexture=new Kn(s.x,s.y,yn),U.map.depthTexture.name=X.name+".shadowMapDepth",U.map.depthTexture.format=Jn,U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=ke,U.map.depthTexture.magFilter=ke}else X.isPointLight?(U.map=new Ur(s.x),U.map.depthTexture=new hr(s.x,Pn)):(U.map=new cn(s.x,s.y),U.map.depthTexture=new Kn(s.x,s.y,Pn)),U.map.depthTexture.name=X.name+".shadowMap",U.map.depthTexture.format=Jn,this.type===ki?(U.map.depthTexture.compareFunction=P?dc:uc,U.map.depthTexture.minFilter=en,U.map.depthTexture.magFilter=en):(U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=ke,U.map.depthTexture.magFilter=ke);U.camera.updateProjectionMatrix()}U.map.isWebGLCubeRenderTarget!==!0&&(U.map.width!==s.x||U.map.height!==s.y)&&U.map.setSize(s.x,s.y);let L=U.map.isWebGLCubeRenderTarget?6:U.getViewportCount();X.isPointLight!==!0&&U.updateMatrices(X,S);let A=(U.camera.layers.mask&4294967294)!==0?U.camera.layers:S.layers;for(let B=0;B<L;B++){let Z=U.getCamera(B);if(X.isPointLight){let k=U.camera,Y=U.matrix,et=X.distance||k.far;et!==k.far&&(k.far=et,k.updateProjectionMatrix()),Dr.setFromMatrixPosition(X.matrixWorld),k.position.copy(Dr),Lc.copy(k.position),Lc.add(W_[B]),k.up.copy(X_[B]),k.lookAt(Lc),k.updateMatrixWorld(),Y.makeTranslation(-Dr.x,-Dr.y,-Dr.z),kd.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),U._frustum.setFromProjectionMatrix(kd,k.coordinateSystem,k.reversedDepth)}if(U.map.isWebGLCubeRenderTarget)i.setRenderTarget(U.map,B),i.clear();else{B===0&&(i.setRenderTarget(U.map),i.clear());let k=U.getViewport(B);o.set(r.x*k.x,r.y*k.y,r.x*k.z,r.y*k.w),N.viewport(o)}n=U.getFrustum(B),v(x,S,Z,X,A,this.type)}U.isPointLightShadow!==!0&&this.type===ws&&_(U,S),U.needsUpdate=!1}g=this.type,p.needsUpdate=!1,i.setRenderTarget(F,M,C)};function _(R,x){let S=t.update(y);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null?R.mapPass=new cn(s.x,s.y,{format:bi,type:In}):(R.mapPass.width!==R.map.width||R.mapPass.height!==R.map.height)&&R.mapPass.setSize(R.map.width,R.map.height),d.uniforms.shadow_pass.value=R.map.depthTexture,d.uniforms.resolution.value.set(R.map.width,R.map.height),d.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(x,null,S,d,y,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value.set(R.map.width,R.map.height),f.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(x,null,S,f,y,null)}function E(R,x,S,F){let M=null,C=S.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(C!==void 0)M=C;else if(M=S.isPointLight===!0?l:a,i.localClippingEnabled&&x.clipShadows===!0&&Array.isArray(x.clippingPlanes)&&x.clippingPlanes.length!==0||x.displacementMap&&x.displacementScale!==0||x.alphaMap&&x.alphaTest>0||x.map&&x.alphaTest>0||x.alphaToCoverage===!0){let N=M.uuid,O=x.uuid,I=c[N];I===void 0&&(I={},c[N]=I);let G=I[O];G===void 0&&(G=M.clone(),I[O]=G,x.addEventListener("dispose",T)),M=G}if(M.visible=x.visible,M.wireframe=x.wireframe,F===ws?M.side=x.shadowSide!==null?x.shadowSide:x.side:M.side=x.shadowSide!==null?x.shadowSide:u[x.side],M.alphaMap=x.alphaMap,M.alphaTest=x.alphaToCoverage===!0?.5:x.alphaTest,M.map=x.map,M.clipShadows=x.clipShadows,M.clippingPlanes=x.clippingPlanes,M.clipIntersection=x.clipIntersection,M.displacementMap=x.displacementMap,M.displacementScale=x.displacementScale,M.displacementBias=x.displacementBias,M.wireframeLinewidth=x.wireframeLinewidth,M.linewidth=x.linewidth,S.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let N=i.properties.get(M);N.light=S}return M}function v(R,x,S,F,M,C){if(R.visible===!1)return;if(R.layers.test(M)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&C===ws)&&(!R.frustumCulled||R.intersectsFrustum(n))){R.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,R.matrixWorld);let I=t.update(R),G=R.material;if(Array.isArray(G)){let X=I.groups;for(let U=0,V=X.length;U<V;U++){let P=X[U],L=G[P.materialIndex];if(L&&L.visible){let A=E(R,L,F,C);R.onBeforeShadow(i,R,x,S,I,A,P),i.renderBufferDirect(S,null,I,A,R,P),R.onAfterShadow(i,R,x,S,I,A,P)}}}else if(G.visible){let X=E(R,G,F,C);R.onBeforeShadow(i,R,x,S,I,X,null),i.renderBufferDirect(S,null,I,X,R,null),R.onAfterShadow(i,R,x,S,I,X,null)}}let O=R.children;for(let I=0,G=O.length;I<G;I++)v(O[I],x,S,F,M,C)}function T(R){R.target.removeEventListener("dispose",T);for(let S in c){let F=c[S],M=R.target.uuid;M in F&&(F[M].dispose(),delete F[M])}}}function Y_(i,t){function e(){let H=!1,rt=new xe,nt=null,bt=new xe(0,0,0,0);return{setMask:function(yt){nt!==yt&&!H&&(i.colorMask(yt,yt,yt,yt),nt=yt)},setLocked:function(yt){H=yt},setClear:function(yt,Mt,zt,te,mt){mt===!0&&(yt*=te,Mt*=te,zt*=te),rt.set(yt,Mt,zt,te),bt.equals(rt)===!1&&(i.clearColor(yt,Mt,zt,te),bt.copy(rt))},reset:function(){H=!1,nt=null,bt.set(-1,0,0,0)}}}function n(){let H=!1,rt=!1,nt=null,bt=null,yt=null;return{setReversed:function(Mt){if(rt!==Mt){let zt=t.get("EXT_clip_control");Mt?zt.clipControlEXT(zt.LOWER_LEFT_EXT,zt.ZERO_TO_ONE_EXT):zt.clipControlEXT(zt.LOWER_LEFT_EXT,zt.NEGATIVE_ONE_TO_ONE_EXT),rt=Mt;let te=yt;yt=null,this.setClear(te)}},getReversed:function(){return rt},setTest:function(Mt){Mt?j(i.DEPTH_TEST):ct(i.DEPTH_TEST)},setMask:function(Mt){nt!==Mt&&!H&&(i.depthMask(Mt),nt=Mt)},setFunc:function(Mt){if(rt&&(Mt=hd[Mt]),bt!==Mt){switch(Mt){case vo:i.depthFunc(i.NEVER);break;case Mo:i.depthFunc(i.ALWAYS);break;case So:i.depthFunc(i.LESS);break;case cs:i.depthFunc(i.LEQUAL);break;case bo:i.depthFunc(i.EQUAL);break;case Eo:i.depthFunc(i.GEQUAL);break;case wo:i.depthFunc(i.GREATER);break;case To:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}bt=Mt}},setLocked:function(Mt){H=Mt},setClear:function(Mt){yt!==Mt&&(yt=Mt,rt&&(Mt=1-Mt),i.clearDepth(Mt))},reset:function(){H=!1,nt=null,bt=null,yt=null,rt=!1}}}function s(){let H=!1,rt=null,nt=null,bt=null,yt=null,Mt=null,zt=null,te=null,mt=null;return{setTest:function(Gt){H||(Gt?j(i.STENCIL_TEST):ct(i.STENCIL_TEST))},setMask:function(Gt){rt!==Gt&&!H&&(i.stencilMask(Gt),rt=Gt)},setFunc:function(Gt,jt,Pt){(nt!==Gt||bt!==jt||yt!==Pt)&&(i.stencilFunc(Gt,jt,Pt),nt=Gt,bt=jt,yt=Pt)},setOp:function(Gt,jt,Pt){(Mt!==Gt||zt!==jt||te!==Pt)&&(i.stencilOp(Gt,jt,Pt),Mt=Gt,zt=jt,te=Pt)},setLocked:function(Gt){H=Gt},setClear:function(Gt){mt!==Gt&&(i.clearStencil(Gt),mt=Gt)},reset:function(){H=!1,rt=null,nt=null,bt=null,yt=null,Mt=null,zt=null,te=null,mt=null}}}let r=new e,o=new n,a=new s,l={},c=new WeakMap,h={},u={},d={},f=new WeakMap,m=[],y=null,p=!1,g=null,_=null,E=null,v=null,T=null,R=null,x=null,S=new kt(0,0,0),F=0,M=!1,C=null,N=null,O=null,I=null,G=null,X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),U=!1,V=0,P=i.getParameter(i.VERSION);P.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(P)[1]),U=V>=1):P.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(P)[1]),U=V>=2);let L=null,A={},B=i.getParameter(i.SCISSOR_BOX),Z=i.getParameter(i.VIEWPORT),k=new xe().fromArray(B),Y=new xe().fromArray(Z);function et(H,rt,nt,bt){let yt=new Uint8Array(4),Mt=i.createTexture();i.bindTexture(H,Mt),i.texParameteri(H,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(H,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let zt=0;zt<nt;zt++)H===i.TEXTURE_3D||H===i.TEXTURE_2D_ARRAY?i.texImage3D(rt,0,i.RGBA,1,1,bt,0,i.RGBA,i.UNSIGNED_BYTE,yt):i.texImage2D(rt+zt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,yt);return Mt}let ht={};ht[i.TEXTURE_2D]=et(i.TEXTURE_2D,i.TEXTURE_2D,1),ht[i.TEXTURE_CUBE_MAP]=et(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ht[i.TEXTURE_2D_ARRAY]=et(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ht[i.TEXTURE_3D]=et(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),j(i.DEPTH_TEST),o.setFunc(cs),Rt(!1),dt(ql),j(i.CULL_FACE),ot(Hi);function j(H){h[H]!==!0&&(i.enable(H),h[H]=!0)}function ct(H){h[H]!==!1&&(i.disable(H),h[H]=!1)}function pt(H,rt){return d[H]!==rt?(i.bindFramebuffer(H,rt),d[H]=rt,H===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=rt),H===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=rt),!0):!1}function lt(H,rt){let nt=m,bt=!1;if(H){nt=f.get(rt),nt===void 0&&(nt=[],f.set(rt,nt));let yt=H.textures;if(nt.length!==yt.length||nt[0]!==i.COLOR_ATTACHMENT0){for(let Mt=0,zt=yt.length;Mt<zt;Mt++)nt[Mt]=i.COLOR_ATTACHMENT0+Mt;nt.length=yt.length,bt=!0}}else nt[0]!==i.BACK&&(nt[0]=i.BACK,bt=!0);bt&&i.drawBuffers(nt)}function _t(H){return y!==H?(i.useProgram(H),y=H,!0):!1}let Dt={[zi]:i.FUNC_ADD,[Du]:i.FUNC_SUBTRACT,[Nu]:i.FUNC_REVERSE_SUBTRACT};Dt[Uu]=i.MIN,Dt[Fu]=i.MAX;let Q={[Ou]:i.ZERO,[Bu]:i.ONE,[ku]:i.SRC_COLOR,[$l]:i.SRC_ALPHA,[Xu]:i.SRC_ALPHA_SATURATE,[Vu]:i.DST_COLOR,[zu]:i.DST_ALPHA,[Hu]:i.ONE_MINUS_SRC_COLOR,[Jl]:i.ONE_MINUS_SRC_ALPHA,[Wu]:i.ONE_MINUS_DST_COLOR,[Gu]:i.ONE_MINUS_DST_ALPHA,[qu]:i.CONSTANT_COLOR,[Yu]:i.ONE_MINUS_CONSTANT_COLOR,[Zu]:i.CONSTANT_ALPHA,[$u]:i.ONE_MINUS_CONSTANT_ALPHA};function ot(H,rt,nt,bt,yt,Mt,zt,te,mt,Gt){if(H===Hi){p===!0&&(ct(i.BLEND),p=!1);return}if(p===!1&&(j(i.BLEND),p=!0),H!==Lu){if(H!==g||Gt!==M){if((_!==zi||T!==zi)&&(i.blendEquation(i.FUNC_ADD),_=zi,T=zi),Gt)switch(H){case Ts:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Qn:i.blendFunc(i.ONE,i.ONE);break;case Yl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Zl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Yt("WebGLState: Invalid blending: ",H);break}else switch(H){case Ts:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Qn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Yl:Yt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Zl:Yt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Yt("WebGLState: Invalid blending: ",H);break}E=null,v=null,R=null,x=null,S.set(0,0,0),F=0,g=H,M=Gt}return}yt=yt||rt,Mt=Mt||nt,zt=zt||bt,(rt!==_||yt!==T)&&(i.blendEquationSeparate(Dt[rt],Dt[yt]),_=rt,T=yt),(nt!==E||bt!==v||Mt!==R||zt!==x)&&(i.blendFuncSeparate(Q[nt],Q[bt],Q[Mt],Q[zt]),E=nt,v=bt,R=Mt,x=zt),(te.equals(S)===!1||mt!==F)&&(i.blendColor(te.r,te.g,te.b,mt),S.copy(te),F=mt),g=H,M=!1}function ut(H,rt){H.side===Ge?ct(i.CULL_FACE):j(i.CULL_FACE);let nt=H.side===$e;rt&&(nt=!nt),Rt(nt),H.blending===Ts&&H.transparent===!1?ot(Hi):ot(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),o.setFunc(H.depthFunc),o.setTest(H.depthTest),o.setMask(H.depthWrite),r.setMask(H.colorWrite);let bt=H.stencilWrite;a.setTest(bt),bt&&(a.setMask(H.stencilWriteMask),a.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),a.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),Ut(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?j(i.SAMPLE_ALPHA_TO_COVERAGE):ct(i.SAMPLE_ALPHA_TO_COVERAGE)}function Rt(H){C!==H&&(H?i.frontFace(i.CW):i.frontFace(i.CCW),C=H)}function dt(H){H!==Cu?(j(i.CULL_FACE),H!==N&&(H===ql?i.cullFace(i.BACK):H===Pu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ct(i.CULL_FACE),N=H}function Nt(H){H!==O&&(U&&i.lineWidth(H),O=H)}function Ut(H,rt,nt){H?(j(i.POLYGON_OFFSET_FILL),(I!==rt||G!==nt)&&(I=rt,G=nt,o.getReversed()&&(rt=-rt,nt=-nt),i.polygonOffset(rt,nt))):ct(i.POLYGON_OFFSET_FILL)}function Zt(H){H?j(i.SCISSOR_TEST):ct(i.SCISSOR_TEST)}function ne(H){H===void 0&&(H=i.TEXTURE0+X-1),L!==H&&(i.activeTexture(H),L=H)}function oe(H,rt,nt){nt===void 0&&(L===null?nt=i.TEXTURE0+X-1:nt=L);let bt=A[nt];bt===void 0&&(bt={type:void 0,texture:void 0},A[nt]=bt),(bt.type!==H||bt.texture!==rt)&&(L!==nt&&(i.activeTexture(nt),L=nt),i.bindTexture(H,rt||ht[H]),bt.type=H,bt.texture=rt)}function q(){let H=A[L];H!==void 0&&H.type!==void 0&&(i.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function Ce(){try{i.compressedTexImage2D(...arguments)}catch(H){Yt("WebGLState:",H)}}function ie(){try{i.compressedTexImage3D(...arguments)}catch(H){Yt("WebGLState:",H)}}function _e(){try{i.texSubImage2D(...arguments)}catch(H){Yt("WebGLState:",H)}}function wt(){try{i.texSubImage3D(...arguments)}catch(H){Yt("WebGLState:",H)}}function Re(){try{i.compressedTexSubImage2D(...arguments)}catch(H){Yt("WebGLState:",H)}}function Vt(){try{i.compressedTexSubImage3D(...arguments)}catch(H){Yt("WebGLState:",H)}}function $t(){try{i.texStorage2D(...arguments)}catch(H){Yt("WebGLState:",H)}}function D(){try{i.texStorage3D(...arguments)}catch(H){Yt("WebGLState:",H)}}function b(){try{i.texImage2D(...arguments)}catch(H){Yt("WebGLState:",H)}}function J(){try{i.texImage3D(...arguments)}catch(H){Yt("WebGLState:",H)}}function ft(H){return u[H]!==void 0?u[H]:i.getParameter(H)}function at(H,rt){u[H]!==rt&&(i.pixelStorei(H,rt),u[H]=rt)}function vt(H){k.equals(H)===!1&&(i.scissor(H.x,H.y,H.z,H.w),k.copy(H))}function Tt(H){Y.equals(H)===!1&&(i.viewport(H.x,H.y,H.z,H.w),Y.copy(H))}function it(H,rt){let nt=c.get(rt);nt===void 0&&(nt=new WeakMap,c.set(rt,nt));let bt=nt.get(H);bt===void 0&&(bt=i.getUniformBlockIndex(rt,H.name),i.uniformBlockBinding(rt,bt,bt),nt.set(H,bt))}function st(H,rt,nt){let yt=c.get(rt).get(H);l[yt]!==nt&&(i.bindBufferBase(i.UNIFORM_BUFFER,yt,nt),l[yt]=nt)}function St(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},L=null,A={},d={},l={},f=new WeakMap,m=[],y=null,p=!1,g=null,_=null,E=null,v=null,T=null,R=null,x=null,S=new kt(0,0,0),F=0,M=!1,C=null,N=null,O=null,I=null,G=null,k.set(0,0,i.canvas.width,i.canvas.height),Y.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:j,disable:ct,bindFramebuffer:pt,drawBuffers:lt,useProgram:_t,setBlending:ot,setMaterial:ut,setFlipSided:Rt,setCullFace:dt,setLineWidth:Nt,setPolygonOffset:Ut,setScissorTest:Zt,activeTexture:ne,bindTexture:oe,unbindTexture:q,compressedTexImage2D:Ce,compressedTexImage3D:ie,texImage2D:b,texImage3D:J,pixelStorei:at,getParameter:ft,updateUBOMapping:it,uniformBlockBinding:st,texStorage2D:$t,texStorage3D:D,texSubImage2D:_e,texSubImage3D:wt,compressedTexSubImage2D:Re,compressedTexSubImage3D:Vt,scissor:vt,viewport:Tt,reset:St}}function Z_(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new xt,h=new WeakMap,u=new Set,d,f=new WeakMap,m=new Set,y=new FinalizationRegistry(D=>m.delete(D)),p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(D,b){return p?new OffscreenCanvas(D,b):us("canvas")}function _(D,b,J){let ft=1,at=$t(D);if((at.width>J||at.height>J)&&(ft=J/Math.max(at.width,at.height)),ft<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){let vt=Math.floor(ft*at.width),Tt=Math.floor(ft*at.height);d===void 0&&(d=g(vt,Tt));let it=b?g(vt,Tt):d;return it.width=vt,it.height=Tt,it.getContext("2d").drawImage(D,0,0,vt,Tt),Wt("WebGLRenderer: Texture has been resized from ("+at.width+"x"+at.height+") to ("+vt+"x"+Tt+")."),it}else return"data"in D&&Wt("WebGLRenderer: Image in DataTexture is too big ("+at.width+"x"+at.height+")."),D;return D}function E(D){return D.generateMipmaps}function v(D){i.generateMipmap(D)}function T(D){return D.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?i.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function R(D,b,J,ft,at,vt=!1){if(D!==null){if(i[D]!==void 0)return i[D];Wt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let Tt;ft&&(Tt=t.get("EXT_texture_norm16"),Tt||Wt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let it=b;if(b===i.RED&&(J===i.FLOAT&&(it=i.R32F),J===i.HALF_FLOAT&&(it=i.R16F),J===i.UNSIGNED_BYTE&&(it=i.R8),J===i.UNSIGNED_SHORT&&Tt&&(it=Tt.R16_EXT),J===i.SHORT&&Tt&&(it=Tt.R16_SNORM_EXT)),b===i.RED_INTEGER&&(J===i.UNSIGNED_BYTE&&(it=i.R8UI),J===i.UNSIGNED_SHORT&&(it=i.R16UI),J===i.UNSIGNED_INT&&(it=i.R32UI),J===i.BYTE&&(it=i.R8I),J===i.SHORT&&(it=i.R16I),J===i.INT&&(it=i.R32I)),b===i.RG&&(J===i.FLOAT&&(it=i.RG32F),J===i.HALF_FLOAT&&(it=i.RG16F),J===i.UNSIGNED_BYTE&&(it=i.RG8),J===i.UNSIGNED_SHORT&&Tt&&(it=Tt.RG16_EXT),J===i.SHORT&&Tt&&(it=Tt.RG16_SNORM_EXT)),b===i.RG_INTEGER&&(J===i.UNSIGNED_BYTE&&(it=i.RG8UI),J===i.UNSIGNED_SHORT&&(it=i.RG16UI),J===i.UNSIGNED_INT&&(it=i.RG32UI),J===i.BYTE&&(it=i.RG8I),J===i.SHORT&&(it=i.RG16I),J===i.INT&&(it=i.RG32I)),b===i.RGB_INTEGER&&(J===i.UNSIGNED_BYTE&&(it=i.RGB8UI),J===i.UNSIGNED_SHORT&&(it=i.RGB16UI),J===i.UNSIGNED_INT&&(it=i.RGB32UI),J===i.BYTE&&(it=i.RGB8I),J===i.SHORT&&(it=i.RGB16I),J===i.INT&&(it=i.RGB32I)),b===i.RGBA_INTEGER&&(J===i.UNSIGNED_BYTE&&(it=i.RGBA8UI),J===i.UNSIGNED_SHORT&&(it=i.RGBA16UI),J===i.UNSIGNED_INT&&(it=i.RGBA32UI),J===i.BYTE&&(it=i.RGBA8I),J===i.SHORT&&(it=i.RGBA16I),J===i.INT&&(it=i.RGBA32I)),b===i.RGB&&(J===i.UNSIGNED_SHORT&&Tt&&(it=Tt.RGB16_EXT),J===i.SHORT&&Tt&&(it=Tt.RGB16_SNORM_EXT),J===i.UNSIGNED_INT_5_9_9_9_REV&&(it=i.RGB9_E5),J===i.UNSIGNED_INT_10F_11F_11F_REV&&(it=i.R11F_G11F_B10F)),b===i.RGBA){let st=vt?er:ce.getTransfer(at);J===i.FLOAT&&(it=i.RGBA32F),J===i.HALF_FLOAT&&(it=i.RGBA16F),J===i.UNSIGNED_BYTE&&(it=st===me?i.SRGB8_ALPHA8:i.RGBA8),J===i.UNSIGNED_SHORT&&Tt&&(it=Tt.RGBA16_EXT),J===i.SHORT&&Tt&&(it=Tt.RGBA16_SNORM_EXT),J===i.UNSIGNED_SHORT_4_4_4_4&&(it=i.RGBA4),J===i.UNSIGNED_SHORT_5_5_5_1&&(it=i.RGB5_A1)}return(it===i.R16F||it===i.R32F||it===i.RG16F||it===i.RG32F||it===i.RGBA16F||it===i.RGBA32F)&&t.get("EXT_color_buffer_float"),it}function x(D,b){let J;return D?b===null||b===Pn||b===Vi?J=i.DEPTH24_STENCIL8:b===yn?J=i.DEPTH32F_STENCIL8:b===Ps&&(J=i.DEPTH24_STENCIL8,Wt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Pn||b===Vi?J=i.DEPTH_COMPONENT24:b===yn?J=i.DEPTH_COMPONENT32F:b===Ps&&(J=i.DEPTH_COMPONENT16),J}function S(D,b){return E(D)===!0||D.isFramebufferTexture&&D.minFilter!==ke&&D.minFilter!==en?Math.log2(Math.max(b.width,b.height))+1:D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?b.mipmaps.length:1}function F(D){let b=new WeakRef(D);n.get(D).__ref=b,m.add(b),y.register(D,b,b)}function M(D){let b=n.get(D).__ref;b!==void 0&&(m.delete(b),y.unregister(b))}function C(D){O(D.target)}function N(D){I(D.target)}function O(D){D.removeEventListener("dispose",C),M(D),X(D),D.isVideoTexture&&h.delete(D),D.isHTMLTexture&&u.delete(D)}function I(D){D.removeEventListener("dispose",N),M(D),V(D)}function G(){for(let D of m){let b=D.deref();b!==void 0&&(b.isRenderTarget===!0?I(b):O(b))}m.clear(),u.clear()}function X(D){let b=n.get(D);if(b.__webglInit===void 0)return;let J=D.source,ft=f.get(J);if(ft){let at=ft[b.__cacheKey];at.usedTimes--,at.usedTimes===0&&U(D),Object.keys(ft).length===0&&f.delete(J)}n.remove(D)}function U(D){let b=n.get(D);i.deleteTexture(b.__webglTexture);let J=D.source,ft=f.get(J);delete ft[b.__cacheKey],o.memory.textures--}function V(D){let b=n.get(D);b.__depthDisposeCallback&&b.__depthDisposeCallback();let J=D.depthTexture;if(J&&J.renderTarget===D&&O(J),D.isWebGLCubeRenderTarget)for(let at=0;at<6;at++){if(Array.isArray(b.__webglFramebuffer[at]))for(let vt=0;vt<b.__webglFramebuffer[at].length;vt++)i.deleteFramebuffer(b.__webglFramebuffer[at][vt]);else i.deleteFramebuffer(b.__webglFramebuffer[at]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[at])}else{if(Array.isArray(b.__webglFramebuffer))for(let at=0;at<b.__webglFramebuffer.length;at++)i.deleteFramebuffer(b.__webglFramebuffer[at]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let at=0;at<b.__webglColorRenderbuffer.length;at++)b.__webglColorRenderbuffer[at]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[at]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let ft=D.textures;for(let at=0,vt=ft.length;at<vt;at++){let Tt=n.get(ft[at]);Tt.__webglTexture&&(i.deleteTexture(Tt.__webglTexture),o.memory.textures--),n.remove(ft[at])}n.remove(D)}let P=0;function L(){P=0}function A(){return P}function B(D){P=D}function Z(){let D=P;return D>=s.maxTextures&&Wt("WebGLTextures: Trying to use "+(D+1)+" texture units while this GPU supports only "+s.maxTextures),P+=1,D}function k(D){let b=[];return b.push(D.wrapS),b.push(D.wrapT),b.push(D.wrapR||0),b.push(D.magFilter),b.push(D.minFilter),b.push(D.anisotropy),b.push(D.internalFormat),b.push(D.format),b.push(D.type),b.push(D.generateMipmaps),b.push(D.mipmapsAutoUpdate),b.push(D.premultiplyAlpha),b.push(D.flipY),b.push(D.unpackAlignment),b.push(D.colorSpace),b.join()}function Y(D,b){let J=n.get(D);if(D.isVideoTexture&&Re(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&J.__version!==D.version){let ft=D.image;if(ft===null)Wt("WebGLRenderer: Texture marked for update but no image data found.");else if(ft.complete===!1)Wt("WebGLRenderer: Texture marked for update but image is incomplete");else{ut(J,D,b);return}}else D.isExternalTexture&&(J.__webglTexture=D.sourceTexture?D.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,J.__webglTexture,i.TEXTURE0+b)}function et(D,b){let J=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&J.__version!==D.version){ut(J,D,b);return}else D.isExternalTexture&&(J.__webglTexture=D.sourceTexture?D.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,J.__webglTexture,i.TEXTURE0+b)}function ht(D,b){let J=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&J.__version!==D.version){ut(J,D,b);return}e.bindTexture(i.TEXTURE_3D,J.__webglTexture,i.TEXTURE0+b)}function j(D,b){let J=n.get(D);if(D.version>0&&J.__version!==D.version){Rt(J,D,b);return}e.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture,i.TEXTURE0+b)}let ct={[fi]:i.REPEAT,[Tn]:i.CLAMP_TO_EDGE,[Ao]:i.MIRRORED_REPEAT},pt={[ke]:i.NEAREST,[Qu]:i.NEAREST_MIPMAP_NEAREST,[Tr]:i.NEAREST_MIPMAP_LINEAR,[en]:i.LINEAR,[ia]:i.LINEAR_MIPMAP_NEAREST,[jn]:i.LINEAR_MIPMAP_LINEAR},lt={[nd]:i.NEVER,[fc]:i.ALWAYS,[id]:i.LESS,[uc]:i.LEQUAL,[sd]:i.EQUAL,[dc]:i.GEQUAL,[rd]:i.GREATER,[od]:i.NOTEQUAL};function _t(D,b){if(b.type===yn&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===en||b.magFilter===ia||b.magFilter===Tr||b.magFilter===jn||b.minFilter===en||b.minFilter===ia||b.minFilter===Tr||b.minFilter===jn)&&Wt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(D,i.TEXTURE_WRAP_S,ct[b.wrapS]),i.texParameteri(D,i.TEXTURE_WRAP_T,ct[b.wrapT]),(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)&&i.texParameteri(D,i.TEXTURE_WRAP_R,ct[b.wrapR]),i.texParameteri(D,i.TEXTURE_MAG_FILTER,pt[b.magFilter]),i.texParameteri(D,i.TEXTURE_MIN_FILTER,pt[b.minFilter]),b.compareFunction&&(i.texParameteri(D,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(D,i.TEXTURE_COMPARE_FUNC,lt[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===ke||b.minFilter!==Tr&&b.minFilter!==jn||b.type===yn&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){let J=t.get("EXT_texture_filter_anisotropic");i.texParameterf(D,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function Dt(D,b){let J=!1;D.__webglInit===void 0&&(D.__webglInit=!0,b.addEventListener("dispose",C),F(b));let ft=b.source,at=f.get(ft);at===void 0&&(at={},f.set(ft,at));let vt=k(b);if(vt!==D.__cacheKey){at[vt]===void 0&&(at[vt]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,J=!0),at[vt].usedTimes++;let Tt=at[D.__cacheKey];Tt!==void 0&&(at[D.__cacheKey].usedTimes--,Tt.usedTimes===0&&U(b)),D.__cacheKey=vt,D.__webglTexture=at[vt].texture}return J}function Q(D,b,J){return Math.floor(Math.floor(D/J)/b)}function ot(D,b,J,ft){let vt=D.updateRanges;if(vt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,b.width,b.height,J,ft,b.data);else{vt.sort((H,rt)=>H.start-rt.start);let Tt=0;for(let H=1;H<vt.length;H++){let rt=vt[Tt],nt=vt[H],bt=rt.start+rt.count,yt=Q(nt.start,b.width,4),Mt=Q(rt.start,b.width,4);nt.start<=bt+1&&yt===Mt&&Q(nt.start+nt.count-1,b.width,4)===yt?rt.count=Math.max(rt.count,nt.start+nt.count-rt.start):(++Tt,vt[Tt]=nt)}vt.length=Tt+1;let it=e.getParameter(i.UNPACK_ROW_LENGTH),st=e.getParameter(i.UNPACK_SKIP_PIXELS),St=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,b.width);for(let H=0,rt=vt.length;H<rt;H++){let nt=vt[H],bt=Math.floor(nt.start/4),yt=Math.ceil(nt.count/4),Mt=bt%b.width,zt=Math.floor(bt/b.width),te=yt,mt=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,Mt),e.pixelStorei(i.UNPACK_SKIP_ROWS,zt),e.texSubImage2D(i.TEXTURE_2D,0,Mt,zt,te,mt,J,ft,b.data)}D.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,it),e.pixelStorei(i.UNPACK_SKIP_PIXELS,st),e.pixelStorei(i.UNPACK_SKIP_ROWS,St)}}function ut(D,b,J){let ft=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(ft=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(ft=i.TEXTURE_3D);let at=Dt(D,b),vt=b.source;e.bindTexture(ft,D.__webglTexture,i.TEXTURE0+J);let Tt=n.get(vt);if(vt.version!==Tt.__version||at===!0){if(e.activeTexture(i.TEXTURE0+J),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){let mt=ce.getPrimaries(ce.workingColorSpace),Gt=b.colorSpace===ei?null:ce.getPrimaries(b.colorSpace),jt=b.colorSpace===ei||mt===Gt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,jt)}e.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment);let st=_(b.image,!1,s.maxTextureSize);st=Vt(b,st);let St=r.convert(b.format,b.colorSpace),H=r.convert(b.type),rt=R(b.internalFormat,St,H,b.normalized,b.colorSpace,b.isVideoTexture);_t(ft,b);let nt,bt=b.mipmaps,yt=b.isVideoTexture!==!0,Mt=Tt.__version===void 0||at===!0,zt=vt.dataReady,te=S(b,st);if(b.isDepthTexture)rt=x(b.format===ti,b.type),Mt&&(yt?e.texStorage2D(i.TEXTURE_2D,1,rt,st.width,st.height):e.texImage2D(i.TEXTURE_2D,0,rt,st.width,st.height,0,St,H,null));else if(b.isDataTexture)if(bt.length>0){yt&&Mt&&e.texStorage2D(i.TEXTURE_2D,te,rt,bt[0].width,bt[0].height);for(let mt=0,Gt=bt.length;mt<Gt;mt++)nt=bt[mt],yt?zt&&e.texSubImage2D(i.TEXTURE_2D,mt,0,0,nt.width,nt.height,St,H,nt.data):e.texImage2D(i.TEXTURE_2D,mt,rt,nt.width,nt.height,0,St,H,nt.data);b.generateMipmaps=!1}else yt?(Mt&&e.texStorage2D(i.TEXTURE_2D,te,rt,st.width,st.height),zt&&ot(b,st,St,H)):e.texImage2D(i.TEXTURE_2D,0,rt,st.width,st.height,0,St,H,st.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){yt&&Mt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,te,rt,bt[0].width,bt[0].height,st.depth);for(let mt=0,Gt=bt.length;mt<Gt;mt++)if(nt=bt[mt],b.format!==Ln)if(St!==null)if(yt){if(zt)if(b.layerUpdates.size>0){let jt=wc(nt.width,nt.height,b.format,b.type);for(let Pt of b.layerUpdates){let ge=nt.data.subarray(Pt*jt/nt.data.BYTES_PER_ELEMENT,(Pt+1)*jt/nt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,mt,0,0,Pt,nt.width,nt.height,1,St,ge)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,mt,0,0,0,nt.width,nt.height,st.depth,St,nt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,mt,rt,nt.width,nt.height,st.depth,0,nt.data,0,0);else Wt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else yt?zt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,mt,0,0,0,nt.width,nt.height,st.depth,St,H,nt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,mt,rt,nt.width,nt.height,st.depth,0,St,H,nt.data);b.layerUpdates.size>0&&b.clearLayerUpdates()}else{yt&&Mt&&e.texStorage2D(i.TEXTURE_2D,te,rt,bt[0].width,bt[0].height);for(let mt=0,Gt=bt.length;mt<Gt;mt++)nt=bt[mt],b.format!==Ln?St!==null?yt?zt&&e.compressedTexSubImage2D(i.TEXTURE_2D,mt,0,0,nt.width,nt.height,St,nt.data):e.compressedTexImage2D(i.TEXTURE_2D,mt,rt,nt.width,nt.height,0,nt.data):Wt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):yt?zt&&e.texSubImage2D(i.TEXTURE_2D,mt,0,0,nt.width,nt.height,St,H,nt.data):e.texImage2D(i.TEXTURE_2D,mt,rt,nt.width,nt.height,0,St,H,nt.data)}else if(b.isDataArrayTexture)if(yt){if(Mt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,te,rt,st.width,st.height,st.depth),zt)if(b.layerUpdates.size>0){let mt=wc(st.width,st.height,b.format,b.type);for(let Gt of b.layerUpdates){let jt=st.data.subarray(Gt*mt/st.data.BYTES_PER_ELEMENT,(Gt+1)*mt/st.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Gt,st.width,st.height,1,St,H,jt)}b.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,st.width,st.height,st.depth,St,H,st.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,rt,st.width,st.height,st.depth,0,St,H,st.data);else if(b.isData3DTexture)yt?(Mt&&e.texStorage3D(i.TEXTURE_3D,te,rt,st.width,st.height,st.depth),zt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,st.width,st.height,st.depth,St,H,st.data)):e.texImage3D(i.TEXTURE_3D,0,rt,st.width,st.height,st.depth,0,St,H,st.data);else if(b.isFramebufferTexture){if(Mt)if(yt)e.texStorage2D(i.TEXTURE_2D,te,rt,st.width,st.height);else{let mt=st.width,Gt=st.height;for(let jt=0;jt<te;jt++)e.texImage2D(i.TEXTURE_2D,jt,rt,mt,Gt,0,St,H,null),mt>>=1,Gt>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in i){let mt=i.canvas;if(mt.hasAttribute("layoutsubtree")||mt.setAttribute("layoutsubtree","true"),st.parentNode!==mt){mt.appendChild(st),u.add(b),mt.onpaint=Gt=>{let jt=Gt.changedElements;for(let Pt of u)jt.includes(Pt.image)&&(Pt.needsUpdate=!0)},mt.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,st);else{let jt=i.RGBA,Pt=i.RGBA,ge=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,jt,Pt,ge,st)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(bt.length>0){if(yt&&Mt){let mt=$t(bt[0]);e.texStorage2D(i.TEXTURE_2D,te,rt,mt.width,mt.height)}for(let mt=0,Gt=bt.length;mt<Gt;mt++)nt=bt[mt],yt?zt&&e.texSubImage2D(i.TEXTURE_2D,mt,0,0,St,H,nt):e.texImage2D(i.TEXTURE_2D,mt,rt,St,H,nt);b.generateMipmaps=!1}else if(yt){if(Mt){let mt=$t(st);e.texStorage2D(i.TEXTURE_2D,te,rt,mt.width,mt.height)}zt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,St,H,st)}else e.texImage2D(i.TEXTURE_2D,0,rt,St,H,st);E(b)&&b.mipmapsAutoUpdate===!0&&v(ft),Tt.__version=vt.version,b.onUpdate&&b.onUpdate(b)}D.__version=b.version}function Rt(D,b,J){if(b.image.length!==6)return;let ft=Dt(D,b),at=b.source;e.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+J);let vt=n.get(at);if(at.version!==vt.__version||ft===!0){e.activeTexture(i.TEXTURE0+J);let Tt=ce.getPrimaries(ce.workingColorSpace),it=b.colorSpace===ei?null:ce.getPrimaries(b.colorSpace),st=b.colorSpace===ei||Tt===it?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,st);let St=b.isCompressedTexture||b.image[0].isCompressedTexture,H=b.image[0]&&b.image[0].isDataTexture,rt=[];for(let Pt=0;Pt<6;Pt++)!St&&!H?rt[Pt]=_(b.image[Pt],!0,s.maxCubemapSize):rt[Pt]=H?b.image[Pt].image:b.image[Pt],rt[Pt]=Vt(b,rt[Pt]);let nt=rt[0],bt=r.convert(b.format,b.colorSpace),yt=r.convert(b.type),Mt=R(b.internalFormat,bt,yt,b.normalized,b.colorSpace),zt=b.isVideoTexture!==!0,te=vt.__version===void 0||ft===!0,mt=at.dataReady,Gt=S(b,nt);_t(i.TEXTURE_CUBE_MAP,b);let jt;if(b.isDepthTexture){if(Mt=x(b.format===ti,b.type),te)if(zt)e.texStorage2D(i.TEXTURE_CUBE_MAP,1,Mt,nt.width,nt.height);else for(let Pt=0;Pt<6;Pt++)e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,0,Mt,nt.width,nt.height,0,bt,yt,null)}else if(St){zt&&te&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Gt,Mt,nt.width,nt.height);for(let Pt=0;Pt<6;Pt++){jt=rt[Pt].mipmaps;for(let ge=0;ge<jt.length;ge++){let Fe=jt[ge];b.format!==Ln?bt!==null?zt?mt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,ge,0,0,Fe.width,Fe.height,bt,Fe.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,ge,Mt,Fe.width,Fe.height,0,Fe.data):Wt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):zt?mt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,ge,0,0,Fe.width,Fe.height,bt,yt,Fe.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,ge,Mt,Fe.width,Fe.height,0,bt,yt,Fe.data)}}}else{if(jt=b.mipmaps,zt&&te){jt.length>0&&Gt++;let Pt=$t(rt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Gt,Mt,Pt.width,Pt.height)}for(let Pt=0;Pt<6;Pt++)if(H){zt?mt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,0,0,0,rt[Pt].width,rt[Pt].height,bt,yt,rt[Pt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,0,Mt,rt[Pt].width,rt[Pt].height,0,bt,yt,rt[Pt].data);for(let ge=0;ge<jt.length;ge++){let ri=jt[ge].image[Pt].image;zt?mt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,ge+1,0,0,ri.width,ri.height,bt,yt,ri.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,ge+1,Mt,ri.width,ri.height,0,bt,yt,ri.data)}}else{zt?mt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,0,0,0,bt,yt,rt[Pt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,0,Mt,bt,yt,rt[Pt]);for(let ge=0;ge<jt.length;ge++){let Fe=jt[ge];zt?mt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,ge+1,0,0,bt,yt,Fe.image[Pt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,ge+1,Mt,bt,yt,Fe.image[Pt])}}}E(b)&&b.mipmapsAutoUpdate===!0&&v(i.TEXTURE_CUBE_MAP),vt.__version=at.version,b.onUpdate&&b.onUpdate(b)}D.__version=b.version}function dt(D,b,J,ft,at,vt){let Tt=r.convert(J.format,J.colorSpace),it=r.convert(J.type),st=R(J.internalFormat,Tt,it,J.normalized,J.colorSpace),St=n.get(b),H=n.get(J);if(H.__renderTarget=b,!St.__hasExternalTextures){let rt=Math.max(1,b.width>>vt),nt=Math.max(1,b.height>>vt);at===i.TEXTURE_3D||at===i.TEXTURE_2D_ARRAY?e.texImage3D(at,vt,st,rt,nt,b.depth,0,Tt,it,null):e.texImage2D(at,vt,st,rt,nt,0,Tt,it,null)}e.bindFramebuffer(i.FRAMEBUFFER,D),wt(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ft,at,H.__webglTexture,0,_e(b)):(at===i.TEXTURE_2D||at>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&at<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ft,at,H.__webglTexture,vt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Nt(D,b,J){if(i.bindRenderbuffer(i.RENDERBUFFER,D),b.depthBuffer){let ft=b.depthTexture,at=ft&&ft.isDepthTexture?ft.type:null,vt=x(b.stencilBuffer,at),Tt=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;wt(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,_e(b),vt,b.width,b.height):J?i.renderbufferStorageMultisample(i.RENDERBUFFER,_e(b),vt,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,vt,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Tt,i.RENDERBUFFER,D)}else{let ft=b.textures;for(let at=0;at<ft.length;at++){let vt=ft[at],Tt=r.convert(vt.format,vt.colorSpace),it=r.convert(vt.type),st=R(vt.internalFormat,Tt,it,vt.normalized,vt.colorSpace);wt(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,_e(b),st,b.width,b.height):J?i.renderbufferStorageMultisample(i.RENDERBUFFER,_e(b),st,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,st,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ut(D,b,J){let ft=b.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,D),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let at=n.get(b.depthTexture);at.__renderTarget=b;let vt=ft?b.depthTexture.image[0]:b.depthTexture.image;(!at.__webglTexture||vt.width!==b.width||vt.height!==b.height)&&(vt.width=b.width,vt.height=b.height,b.depthTexture.needsUpdate=!0),ft?j(b.depthTexture,0):Y(b.depthTexture,0);let Tt=at.__webglTexture,it=_e(b),st=ft?i.TEXTURE_CUBE_MAP_POSITIVE_X+J:i.TEXTURE_2D,St=b.depthTexture.format===ti?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(b.depthTexture.format===Jn)wt(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,St,st,Tt,0,it):i.framebufferTexture2D(i.FRAMEBUFFER,St,st,Tt,0);else if(b.depthTexture.format===ti)wt(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,St,st,Tt,0,it):i.framebufferTexture2D(i.FRAMEBUFFER,St,st,Tt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Zt(D){let b=n.get(D),J=D.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==D.depthTexture){let ft=D.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),ft){let at=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,ft.removeEventListener("dispose",at)};ft.addEventListener("dispose",at),b.__depthDisposeCallback=at}b.__boundDepthTexture=ft}if(D.depthTexture&&!b.__autoAllocateDepthBuffer)if(J)for(let ft=0;ft<6;ft++)Ut(b.__webglFramebuffer[ft],D,ft);else D.texture.mipmaps.length>0?Ut(b.__webglFramebuffer[0],D,0):Ut(b.__webglFramebuffer,D,0);else if(J){b.__webglDepthbuffer=[];for(let ft=0;ft<6;ft++)if(e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[ft]),b.__webglDepthbuffer[ft]===void 0)b.__webglDepthbuffer[ft]=i.createRenderbuffer(),Nt(b.__webglDepthbuffer[ft],D,!1);else{let at=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,vt=b.__webglDepthbuffer[ft];i.bindRenderbuffer(i.RENDERBUFFER,vt),i.framebufferRenderbuffer(i.FRAMEBUFFER,at,i.RENDERBUFFER,vt)}}else if(D.texture.mipmaps.length>0?e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),Nt(b.__webglDepthbuffer,D,!1);else{let at=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,vt=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,vt),i.framebufferRenderbuffer(i.FRAMEBUFFER,at,i.RENDERBUFFER,vt)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function ne(D,b,J){let ft=n.get(D);b!==void 0&&dt(ft.__webglFramebuffer,D,D.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),J!==void 0&&Zt(D)}function oe(D){let b=D.texture,J=n.get(D),ft=n.get(b);D.addEventListener("dispose",N),F(D);let at=D.textures,vt=D.isWebGLCubeRenderTarget===!0,Tt=at.length>1;if(Tt||(ft.__webglTexture===void 0&&(ft.__webglTexture=i.createTexture()),ft.__version=b.version,o.memory.textures++),vt){J.__webglFramebuffer=[];for(let it=0;it<6;it++)if(b.mipmaps.length>0){J.__webglFramebuffer[it]=[];for(let st=0;st<b.mipmaps.length;st++)J.__webglFramebuffer[it][st]=i.createFramebuffer()}else J.__webglFramebuffer[it]=i.createFramebuffer()}else{if(b.mipmaps.length>0){J.__webglFramebuffer=[];for(let it=0;it<b.mipmaps.length;it++)J.__webglFramebuffer[it]=i.createFramebuffer()}else J.__webglFramebuffer=i.createFramebuffer();if(Tt)for(let it=0,st=at.length;it<st;it++){let St=n.get(at[it]);St.__webglTexture===void 0&&(St.__webglTexture=i.createTexture(),o.memory.textures++)}if(D.samples>0&&wt(D)===!1){J.__webglMultisampledFramebuffer=i.createFramebuffer(),J.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let it=0;it<at.length;it++){let st=at[it];J.__webglColorRenderbuffer[it]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,J.__webglColorRenderbuffer[it]);let St=r.convert(st.format,st.colorSpace),H=r.convert(st.type),rt=R(st.internalFormat,St,H,st.normalized,st.colorSpace,D.isXRRenderTarget===!0),nt=_e(D);i.renderbufferStorageMultisample(i.RENDERBUFFER,nt,rt,D.width,D.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+it,i.RENDERBUFFER,J.__webglColorRenderbuffer[it])}i.bindRenderbuffer(i.RENDERBUFFER,null),D.depthBuffer&&(J.__webglDepthRenderbuffer=i.createRenderbuffer(),Nt(J.__webglDepthRenderbuffer,D,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(vt){e.bindTexture(i.TEXTURE_CUBE_MAP,ft.__webglTexture),_t(i.TEXTURE_CUBE_MAP,b);for(let it=0;it<6;it++)if(b.mipmaps.length>0)for(let st=0;st<b.mipmaps.length;st++)dt(J.__webglFramebuffer[it][st],D,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+it,st);else dt(J.__webglFramebuffer[it],D,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0);E(b)?v(i.TEXTURE_CUBE_MAP):b.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,b.mipmaps.length-1),e.unbindTexture()}else if(Tt){for(let it=0,st=at.length;it<st;it++){let St=at[it],H=n.get(St),rt=i.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(rt=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(rt,H.__webglTexture),_t(rt,St),dt(J.__webglFramebuffer,D,St,i.COLOR_ATTACHMENT0+it,rt,0),E(St)&&v(rt)}e.unbindTexture()}else{let it=i.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(it=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(it,ft.__webglTexture),_t(it,b),b.mipmaps.length>0)for(let st=0;st<b.mipmaps.length;st++)dt(J.__webglFramebuffer[st],D,b,i.COLOR_ATTACHMENT0,it,st);else dt(J.__webglFramebuffer,D,b,i.COLOR_ATTACHMENT0,it,0);E(b)?v(it):b.mipmaps.length>0&&i.texParameteri(it,i.TEXTURE_MAX_LEVEL,b.mipmaps.length-1),e.unbindTexture()}D.depthBuffer&&Zt(D)}function q(D){let b=D.textures;for(let J=0,ft=b.length;J<ft;J++){let at=b[J];if(E(at)&&at.mipmapsAutoUpdate===!0){let vt=T(D),Tt=n.get(at).__webglTexture;e.bindTexture(vt,Tt),v(vt),e.unbindTexture()}}}let Ce=[];function ie(D){if(D.samples>0){if(wt(D)===!1){let b=D.textures,J=D.width,ft=D.height,at=i.COLOR_BUFFER_BIT,vt=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Tt=n.get(D),it=b.length>1;if(it)for(let St=0;St<b.length;St++)e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),D.texture.mipmaps.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer);for(let St=0;St<b.length;St++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(at|=i.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(at|=i.STENCIL_BUFFER_BIT)),it){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Tt.__webglColorRenderbuffer[St]);let H=n.get(b[St]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,H,0)}i.blitFramebuffer(0,0,J,ft,0,0,J,ft,at,i.NEAREST),l===!0&&(Ce.length=0,Ce.push(i.COLOR_ATTACHMENT0+St),D.depthBuffer&&D.storeMultisampledDepthBuffer===!1&&Ce.push(vt),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ce))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),it)for(let St=0;St<b.length;St++){e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.RENDERBUFFER,Tt.__webglColorRenderbuffer[St]);let H=n.get(b[St]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.TEXTURE_2D,H,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.storeMultisampledDepthBuffer===!1&&l){let b=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function _e(D){return Math.min(s.maxSamples,D.samples)}function wt(D){let b=n.get(D);return D.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Re(D){let b=o.render.frame;h.get(D)!==b&&(h.set(D,b),D.update())}function Vt(D,b){let J=D.colorSpace,ft=D.format,at=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||J!==tr&&J!==ei&&(ce.getTransfer(J)===me?(ft!==Ln||at!==rn)&&Wt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Yt("WebGLTextures: Unsupported texture color space:",J)),b}function $t(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(c.width=D.naturalWidth||D.width,c.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(c.width=D.displayWidth,c.height=D.displayHeight):(c.width=D.width,c.height=D.height),c}this.allocateTextureUnit=Z,this.resetTextureUnits=L,this.getTextureUnits=A,this.setTextureUnits=B,this.setTexture2D=Y,this.setTexture2DArray=et,this.setTexture3D=ht,this.setTextureCube=j,this.rebindTextures=ne,this.setupRenderTarget=oe,this.updateRenderTargetMipmap=q,this.updateMultisampleRenderTarget=ie,this.setupDepthRenderbuffer=Zt,this.setupFrameBufferTexture=dt,this.useMultisampledRTT=wt,this.dispose=G}function $_(i,t){function e(n,s=ei){let r,o=ce.getTransfer(s);if(n===rn)return i.UNSIGNED_BYTE;if(n===ra)return i.UNSIGNED_SHORT_4_4_4_4;if(n===oa)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ac)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===lc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===rc)return i.BYTE;if(n===oc)return i.SHORT;if(n===Ps)return i.UNSIGNED_SHORT;if(n===sa)return i.INT;if(n===Pn)return i.UNSIGNED_INT;if(n===yn)return i.FLOAT;if(n===In)return i.HALF_FLOAT;if(n===cc)return i.ALPHA;if(n===hc)return i.RGB;if(n===Ln)return i.RGBA;if(n===Jn)return i.DEPTH_COMPONENT;if(n===ti)return i.DEPTH_STENCIL;if(n===aa)return i.RED;if(n===la)return i.RED_INTEGER;if(n===bi)return i.RG;if(n===ca)return i.RG_INTEGER;if(n===ha)return i.RGBA_INTEGER;if(n===Ar||n===Rr||n===Cr||n===Pr)if(o===me)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ar)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Rr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Cr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ar)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Rr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Cr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Pr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ua||n===da||n===fa||n===pa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ua)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===da)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===fa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===pa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ma||n===ga||n===xa||n===_a||n===ya||n===Ir||n===va)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ma||n===ga)return o===me?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===xa)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===_a)return r.COMPRESSED_R11_EAC;if(n===ya)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Ir)return r.COMPRESSED_RG11_EAC;if(n===va)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ma||n===Sa||n===ba||n===Ea||n===wa||n===Ta||n===Aa||n===Ra||n===Ca||n===Pa||n===Ia||n===La||n===Da||n===Na)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ma)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Sa)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ba)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ea)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===wa)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ta)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Aa)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ra)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ca)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Pa)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ia)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===La)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Da)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Na)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ua||n===Fa||n===Oa)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ua)return o===me?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Fa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Oa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ba||n===ka||n===Lr||n===Ha)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ba)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ka)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Lr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ha)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Vi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var J_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,K_=`
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

}`,kc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new ur(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new kn({vertexShader:J_,fragmentShader:K_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new re(new De(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Hc=class extends Fn{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,m=null,y=typeof XRWebGLBinding<"u",p=new kc,g={},_=e.getContextAttributes(),E=null,v=null,T=[],R=[],x=new xt,S=null,F=null,M=new tn;M.viewport=new xe;let C=new tn;C.viewport=new xe;let N=[M,C],O=new ta,I=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let Y=T[k];return Y===void 0&&(Y=new ms,T[k]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(k){let Y=T[k];return Y===void 0&&(Y=new ms,T[k]=Y),Y.getGripSpace()},this.getHand=function(k){let Y=T[k];return Y===void 0&&(Y=new ms,T[k]=Y),Y.getHandSpace()};function X(k){let Y=R.indexOf(k.inputSource);if(Y===-1)return;let et=T[Y];et!==void 0&&(et.update(k.inputSource,k.frame,c||o),et.dispatchEvent({type:k.type,data:k.inputSource}))}function U(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",U),s.removeEventListener("inputsourceschange",V);for(let k=0;k<T.length;k++){let Y=R[k];Y!==null&&(R[k]=null,T[k].disconnect(Y))}I=null,G=null,p.reset();for(let k in g)delete g[k];if(t.setRenderTarget(E),f=null,d=null,u=null,s=null,v=null,Z.stop(),n.isPresenting=!1,t.setPixelRatio(S),t.setSize(x.width,x.height,!1),F!==null){let k=F.camera;k.fov=F.fov,k.zoom=F.zoom,k.updateProjectionMatrix(),F=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){r=k,n.isPresenting===!0&&Wt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){a=k,n.isPresenting===!0&&Wt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(k){c=k},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&y&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(k){if(s=k,s!==null){if(E=t.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",U),s.addEventListener("inputsourceschange",V),_.xrCompatible!==!0&&await e.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(x),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let et=null,ht=null,j=null;_.depth&&(j=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,et=_.stencil?ti:Jn,ht=_.stencil?Vi:Pn);let ct={colorFormat:e.RGBA8,depthFormat:j,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(ct),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),v=new cn(d.textureWidth,d.textureHeight,{format:Ln,type:rn,depthTexture:new Kn(d.textureWidth,d.textureHeight,ht,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let et={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,et),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new cn(f.framebufferWidth,f.framebufferHeight,{format:Ln,type:rn,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Z.setContext(s),Z.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function V(k){for(let Y=0;Y<k.removed.length;Y++){let et=k.removed[Y],ht=R.indexOf(et);ht>=0&&(R[ht]=null,T[ht].disconnect(et))}for(let Y=0;Y<k.added.length;Y++){let et=k.added[Y],ht=R.indexOf(et);if(ht===-1){for(let ct=0;ct<T.length;ct++)if(ct>=R.length){R.push(et),ht=ct;break}else if(R[ct]===null){R[ct]=et,ht=ct;break}if(ht===-1)break}let j=T[ht];j&&j.connect(et)}}function P(k,Y){Y===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(Y.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(s===null)return;let Y=k.near,et=k.far;p.texture!==null&&(p.depthNear>0&&(Y=p.depthNear),p.depthFar>0&&(et=p.depthFar)),O.near=C.near=M.near=Y,O.far=C.far=M.far=et,(I!==O.near||G!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),I=O.near,G=O.far),O.layers.mask=k.layers.mask|6,M.layers.mask=O.layers.mask&-5,C.layers.mask=O.layers.mask&-3;let ht=k.parent,j=O.cameras;P(O,ht);for(let ct=0;ct<j.length;ct++)P(j[ct],ht);O.projectionMatrix.copy(M.projectionMatrix),O.projectionMatrixInverse.copy(M.projectionMatrixInverse),F===null&&k.isPerspectiveCamera&&(F={camera:k,fov:k.fov,zoom:k.zoom}),L(k,O,ht)};function L(k,Y,et){et===null?k.matrix.copy(Y.matrixWorld):(k.matrix.copy(et.matrixWorld),k.matrix.invert(),k.matrix.multiply(Y.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy(Y.projectionMatrix),k.projectionMatrixInverse.copy(Y.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=fs*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(k){l=k,d!==null&&(d.fixedFoveation=k),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=k)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(O)},this.getCameraTexture=function(k){return g[k]};let A=null;function B(k,Y){if(h=Y.getViewerPose(c||o),m=Y,h!==null){let et=h.views;f!==null&&(t.setRenderTargetFramebuffer(v,f.framebuffer),t.setRenderTarget(v));let ht=!1;et.length!==O.cameras.length&&(O.cameras.length=0,ht=!0);for(let lt=0;lt<et.length;lt++){let _t=et[lt],Dt=null;if(f!==null)Dt=f.getViewport(_t);else{let ot=u.getViewSubImage(d,_t);Dt=ot.viewport,lt===0&&(t.setRenderTargetTextures(v,ot.colorTexture,ot.depthStencilTexture),t.setRenderTarget(v))}let Q=N[lt];Q===void 0&&(Q=new tn,Q.layers.enable(lt),Q.viewport=new xe,N[lt]=Q),Q.matrix.fromArray(_t.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(_t.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(Dt.x,Dt.y,Dt.width,Dt.height),lt===0&&(O.matrix.copy(Q.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),ht===!0&&O.cameras.push(Q)}let j=s.enabledFeatures;if(j&&j.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){u=n.getBinding();let lt=u.getDepthInformation(et[0]);lt&&lt.isValid&&lt.texture&&p.init(lt,s.renderState)}if(j&&j.includes("camera-access")&&y){t.state.unbindTexture(),u=n.getBinding();for(let lt=0;lt<et.length;lt++){let _t=et[lt].camera;if(_t){let Dt=g[_t];Dt||(Dt=new ur,g[_t]=Dt);let Q=u.getCameraImage(_t);Dt.sourceTexture=Q}}}}for(let et=0;et<T.length;et++){let ht=R[et],j=T[et];ht!==null&&j!==void 0&&j.update(ht,Y,c||o)}A&&A(k,Y),Y.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Y}),m=null}let Z=new Hd;Z.setAnimationLoop(B),this.setAnimationLoop=function(k){A=k},this.dispose=function(){}}},Q_=new Xt,Jd=new Jt;Jd.set(-1,0,0,0,1,0,0,0,1);function j_(i,t){function e(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function n(p,g){g.color.getRGB(p.fogColor.value,Sc(i)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function s(p,g,_,E,v){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(p,g):g.isMeshLambertMaterial?(r(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(p,g),u(p,g)):g.isMeshPhongMaterial?(r(p,g),h(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(p,g),d(p,g),g.isMeshPhysicalMaterial&&f(p,g,v)):g.isMeshMatcapMaterial?(r(p,g),m(p,g)):g.isMeshDepthMaterial?r(p,g):g.isMeshDistanceMaterial?(r(p,g),y(p,g)):g.isMeshNormalMaterial?r(p,g):g.isLineBasicMaterial?(o(p,g),g.isLineDashedMaterial&&a(p,g)):g.isPointsMaterial?l(p,g,_,E):g.isSpriteMaterial?c(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,e(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===$e&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,e(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===$e&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,e(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,e(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);let _=t.get(g),E=_.envMap,v=_.envMapRotation;E&&(p.envMap.value=E,p.envMapRotation.value.setFromMatrix4(Q_.makeRotationFromEuler(v)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(Jd),p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,p.aoMapTransform))}function o(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform))}function a(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function l(p,g,_,E){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*_,p.scale.value=E*.5,g.map&&(p.map.value=g.map,e(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function c(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function h(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function u(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function d(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function f(p,g,_){p.ior.value=g.ior,g.diffuseRoughness>0&&(p.diffuseRoughness.value=g.diffuseRoughness,g.diffuseRoughnessMap&&(p.diffuseRoughnessMap.value=g.diffuseRoughnessMap,e(g.diffuseRoughnessMap,p.diffuseRoughnessMapTransform))),g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===$e&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.retroreflectivity>0&&(p.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessMinimum,p.iridescenceThicknessMaximum.value=g.iridescenceThicknessMaximum,g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=_.texture,p.transmissionSamplerSize.value.set(_.width,_.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,g){g.matcap&&(p.matcap.value=g.matcap)}function y(p,g){let _=t.get(g).light;p.referencePosition.value.setFromMatrixPosition(_.matrixWorld),p.nearDistance.value=_.shadow.camera.near,p.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function ty(i,t,e,n){let s={},r={};function o(_,E){let v=E.program;n.uniformBlockBinding(_,v,s[_.id])}function a(_,E){let v=s[_.id];v===void 0&&(m(_),v=l(_),s[_.id]=v,_.addEventListener("dispose",p));let T=E.program;n.updateUBOMapping(_,T);let R=t.render.frame;r[_.id]!==R&&(c(_),r[_.id]=R)}function l(_){let E=i.createBuffer(),v=_.__size,T=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,v,T),i.bindBuffer(i.UNIFORM_BUFFER,null),E}function c(_){let E=s[_.id],v=_.uniforms,T=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let R=0,x=v.length;R<x;R++){let S=v[R];if(Array.isArray(S))for(let F=0,M=S.length;F<M;F++)h(S[F],R,F,T);else h(S,R,0,T)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(_,E,v,T){if(d(_,E,v,T)===!0){let R=_.__offset,x=_.value;if(Array.isArray(x)){let S=0;for(let F=0;F<x.length;F++){let M=x[F],C=y(M,!0);u(M,_.__data,S),S+=C.storage/Float32Array.BYTES_PER_ELEMENT}}else u(x,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,R,_.__data)}}function u(_,E,v){typeof _=="number"||typeof _=="boolean"?E[v]=_:_.isMatrix3?(E[v]=_.elements[0],E[v+1]=_.elements[1],E[v+2]=_.elements[2],E[v+3]=0,E[v+4]=_.elements[3],E[v+5]=_.elements[4],E[v+6]=_.elements[5],E[v+7]=0,E[v+8]=_.elements[6],E[v+9]=_.elements[7],E[v+10]=_.elements[8],E[v+11]=0):ArrayBuffer.isView(_)?E.set(_.subarray(0,E.length-v),v):_.toArray(E,v)}function d(_,E,v,T){let R=_.value,x=E+"_"+v;if(Array.isArray(R)){T[x]===void 0&&(T[x]=[]);let S=T[x],F=!1;for(let M=0;M<R.length;M++)f(R[M],S,M)===!0&&(F=!0);return F}return f(R,T,x)}function f(_,E,v){if(E[v]===void 0)return typeof _=="number"||typeof _=="boolean"?E[v]=_:ArrayBuffer.isView(_)?E[v]=_.slice():E[v]=_.clone(),!0;{let T=E[v];if(typeof _=="number"||typeof _=="boolean"){if(T!==_)return E[v]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(T.equals(_)===!1)return T.copy(_),!0}}return!1}function m(_){let E=_.uniforms,v=0,T=16;for(let x=0,S=E.length;x<S;x++){let F=Array.isArray(E[x])?E[x]:[E[x]];for(let M=0,C=F.length;M<C;M++){let N=F[M],O=Array.isArray(N.value)?N.value:[N.value],I=Array.isArray(E[x])||Array.isArray(N.value),G=v;for(let U=0,V=O.length;U<V;U++){let P=O[U],L=y(P,I),A=v%T,B=A%L.boundary,Z=A+B;v+=B,Z!==0&&T-Z<L.storage&&(v+=T-Z),U===0&&(G=v),v+=L.storage}let X=N.type==="int"?Int32Array:N.type==="uint"?Uint32Array:Float32Array;N.__data=new X((v-G)/Float32Array.BYTES_PER_ELEMENT),N.__offset=G}}let R=v%T;return R>0&&(v+=T-R),_.__size=v,_.__cache={},this}function y(_,E){let v={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(v.boundary=4,v.storage=4):_.isVector2?(v.boundary=8,v.storage=8):_.isVector3||_.isColor?(v.boundary=16,v.storage=12):_.isVector4?(v.boundary=16,v.storage=16):_.isMatrix3?(v.boundary=16,v.storage=48):_.isMatrix4?(v.boundary=16,v.storage=64):_.isTexture?Wt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(v.boundary=16,v.storage=_.byteLength):Wt("WebGLRenderer: Unsupported uniform value type.",_),E===!0&&(v.boundary=16,v.storage=Math.ceil(v.storage/16)*16),v}function p(_){let E=_.target;E.removeEventListener("dispose",p),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function g(){for(let _ in s)i.deleteBuffer(s[_]);s={},r={}}return{bind:o,update:a,dispose:g}}var ey=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),zn=null;function ny(){return zn===null&&(zn=new lr(ey,16,16,bi,In),zn.name="DFG_LUT",zn.minFilter=en,zn.magFilter=en,zn.wrapS=Tn,zn.wrapT=Tn,zn.generateMipmaps=!1,zn.needsUpdate=!0),zn}var qa=class{constructor(t={}){let{canvas:e=ad(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=rn}=t;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=o;let y=f,p=new Set([ha,ca,la]),g=new Set([rn,Pn,Ps,Vi,ra,oa]),_=new Uint32Array(4),E=new Int32Array(4),v={textures:[],min:[],max:[],resolution:[]},T=null,R=null,x=[],S=[],F=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Hn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let M=this,C=!1,N=null,O=null,I=null,G=null;this._outputColorSpace=be;let X=0,U=0,V=null,P=-1,L=null,A=new xe,B=new xe,Z=null,k=new kt(0),Y=0,et=e.width,ht=e.height,j=1,ct=null,pt=null,lt=new xe(0,0,et,ht),_t=new xe(0,0,et,ht),Dt=!1,Q=new xi,ot=new Do,ut=!1,Rt=!1,dt=new Xt,Nt=new z,Ut=new xe,Zt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ne=!1;function oe(){return V===null?j:1}let q=n;function Ce(w,W){return e.getContext(w,W)}let ie,_e,wt,Re,Vt,$t,D,b,J,ft,at,vt,Tt,it,st,St,H,rt,nt,bt,yt,Mt,zt;try{let w={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"187"}`),e.addEventListener("webglcontextlost",Gt,!1),e.addEventListener("webglcontextrestored",jt,!1),e.addEventListener("webglcontextcreationerror",Pt,!1),q===null){let W="webgl2";if(q=Ce(W,w),q===null)throw Ce(W)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}te()}catch(w){throw e.removeEventListener("webglcontextlost",Gt,!1),e.removeEventListener("webglcontextrestored",jt,!1),e.removeEventListener("webglcontextcreationerror",Pt,!1),Yt("WebGLRenderer: "+w.message),w}function te(){ie=new fx(q),ie.init(),yt=new $_(q,ie),_e=new nx(q,ie,t,yt),wt=new Y_(q,ie),_e.reversedDepthBuffer&&d&&wt.buffers.depth.setReversed(!0),O=q.createFramebuffer(),I=q.createFramebuffer(),G=q.createFramebuffer(),Re=new gx(q),Vt=new D_,$t=new Z_(q,ie,wt,Vt,_e,yt,Re),D=new dx(M),b=new _m(q),Mt=new tx(q,b),J=new px(q,b,Re,Mt),ft=new _x(q,J,b,Mt,Re),rt=new xx(q,_e,$t),st=new ix(Vt),at=new L_(M,D,ie,_e,Mt,st),vt=new j_(M,Vt),Tt=new U_,it=new z_(ie),H=new jg(M,D,wt,ft,m,l),St=new q_(M,ft,_e),zt=new ty(q,Re,_e,wt),nt=new ex(q,ie,Re),bt=new mx(q,ie,Re),Re.programs=at.programs,M.capabilities=_e,M.extensions=ie,M.properties=Vt,M.renderLists=Tt,M.shadowMap=St,M.state=wt,M.info=Re}y!==rn&&(F=new vx(y,e.width,e.height,a,s,r));let mt=new Hc(M,q);this.xr=mt,this.getContext=function(){return q},this.getContextAttributes=function(){return q.getContextAttributes()},this.forceContextLoss=function(){let w=ie.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=ie.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(w){w!==void 0&&(j=w,this.setSize(et,ht,!1))},this.getSize=function(w){return w.set(et,ht)},this.setSize=function(w,W,tt=!0){if(mt.isPresenting){Wt("WebGLRenderer: Can't change size while VR device is presenting.");return}et=w,ht=W,e.width=Math.floor(w*j),e.height=Math.floor(W*j),tt===!0&&(e.style.width=w+"px",e.style.height=W+"px"),F!==null&&F.setSize(e.width,e.height),this.setViewport(0,0,w,W)},this.getDrawingBufferSize=function(w){return w.set(et*j,ht*j).floor()},this.setDrawingBufferSize=function(w,W,tt){et=w,ht=W,j=tt,e.width=Math.floor(w*tt),e.height=Math.floor(W*tt),this.setViewport(0,0,w,W)},this.setEffects=function(w){if(y===rn){Yt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let W=0;W<w.length;W++)if(w[W].isOutputPass===!0){Wt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}F.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(A)},this.getViewport=function(w){return w.copy(lt)},this.setViewport=function(w,W,tt,$){w.isVector4?lt.set(w.x,w.y,w.z,w.w):lt.set(w,W,tt,$),wt.viewport(A.copy(lt).multiplyScalar(oe()).round())},this.getScissor=function(w){return w.copy(_t)},this.setScissor=function(w,W,tt,$){w.isVector4?_t.set(w.x,w.y,w.z,w.w):_t.set(w,W,tt,$),wt.scissor(B.copy(_t).multiplyScalar(oe()).round())},this.getScissorTest=function(){return Dt},this.setScissorTest=function(w){wt.setScissorTest(Dt=w)},this.setOpaqueSort=function(w){ct=w},this.setTransparentSort=function(w){pt=w},this.getClearColor=function(w){return w.copy(H.getClearColor())},this.setClearColor=function(){H.setClearColor(...arguments)},this.getClearAlpha=function(){return H.getClearAlpha()},this.setClearAlpha=function(){H.setClearAlpha(...arguments)},this.clear=function(w=!0,W=!0,tt=!0){let $=0;if(w){let K=!1;if(V!==null){let At=V.texture.format;K=p.has(At)}if(K){let At=V.texture.type,Ft=g.has(At),Et=H.getClearColor(),Lt=H.getClearAlpha(),Ht=Et.r,Kt=Et.g,ae=Et.b;Ft?(_[0]=Ht,_[1]=Kt,_[2]=ae,_[3]=Lt,q.clearBufferuiv(q.COLOR,0,_)):(E[0]=Ht,E[1]=Kt,E[2]=ae,E[3]=Lt,q.clearBufferiv(q.COLOR,0,E))}else $|=q.COLOR_BUFFER_BIT}W&&($|=q.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),tt&&($|=q.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),$!==0&&q.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),N=w},this.dispose=function(){e.removeEventListener("webglcontextlost",Gt,!1),e.removeEventListener("webglcontextrestored",jt,!1),e.removeEventListener("webglcontextcreationerror",Pt,!1),H.dispose(),Tt.dispose(),it.dispose(),$t.dispose(),Vt.dispose(),D.dispose(),ft.dispose(),J.dispose(),Mt.dispose(),zt.dispose(),at.dispose(),mt.dispose(),mt.removeEventListener("sessionstart",gh),mt.removeEventListener("sessionend",xh),Ri.stop()};function Gt(w){w.preventDefault(),nr("WebGLRenderer: Context Lost."),C=!0}function jt(){nr("WebGLRenderer: Context Restored."),C=!1;let w=Re.autoReset,W=St.enabled,tt=St.autoUpdate,$=St.needsUpdate,K=St.type;te(),Re.autoReset=w,St.enabled=W,St.autoUpdate=tt,St.needsUpdate=$,St.type=K}function Pt(w){Yt("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function ge(w){let W=w.target;W.removeEventListener("dispose",ge),Fe(W)}function Fe(w){ri(w),Vt.remove(w)}function ri(w){let W=Vt.get(w).programs;W!==void 0&&(W.forEach(function(tt){at.releaseProgram(tt)}),w.isShaderMaterial&&at.releaseShaderCache(w))}this.renderBufferDirect=function(w,W,tt,$,K,At){W===null&&(W=Zt);let Ft=K.isMesh&&K.matrixWorld.determinantAffine()<0,Et=Cf(w,W,tt,$,K);wt.setMaterial($,Ft);let Lt=tt.index,Ht=1;if($.wireframe===!0){if(Lt=J.getWireframeAttribute(tt),Lt===void 0)return;Ht=2}let Kt=tt.drawRange,ae=tt.attributes.position,Ot=Kt.start*Ht,le=(Kt.start+Kt.count)*Ht;At!==null&&(Ot=Math.max(Ot,At.start*Ht),le=Math.min(le,(At.start+At.count)*Ht)),Lt!==null?(Ot=Math.max(Ot,0),le=Math.min(le,Lt.count)):ae!=null&&(Ot=Math.max(Ot,0),le=Math.min(le,ae.count));let Pe=le-Ot;if(Pe<0||Pe===1/0)return;Mt.setup(K,$,Et,tt,Lt);let ve,ye=nt;if(Lt!==null&&(ve=b.get(Lt),ye=bt,ye.setIndex(ve)),K.isMesh)$.wireframe===!0?(wt.setLineWidth($.wireframeLinewidth*oe()),ye.setMode(q.LINES)):ye.setMode(q.TRIANGLES);else if(K.isLine){let Ve=$.linewidth;Ve===void 0&&(Ve=1),wt.setLineWidth(Ve*oe()),K.isLineSegments?ye.setMode(q.LINES):K.isLineLoop?ye.setMode(q.LINE_LOOP):ye.setMode(q.LINE_STRIP)}else K.isPoints?ye.setMode(q.POINTS):K.isSprite&&ye.setMode(q.TRIANGLES);if(K.isBatchedMesh)if(ie.get("WEBGL_multi_draw"))ye.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{let Ve=K._multiDrawStarts,Bt=K._multiDrawCounts,Qe=K._multiDrawCount,fe=Lt?b.get(Lt).bytesPerElement:1,Ci=Vt.get($).currentProgram.getUniforms();for(let We=0;We<Qe;We++)Ci.setValue(q,"_gl_DrawID",We),ye.render(Ve[We]/fe,Bt[We])}else if(K.isInstancedMesh)ye.renderInstances(Ot,Pe,K.count);else if(tt.isInstancedBufferGeometry){let Ve=tt._maxInstanceCount!==void 0?tt._maxInstanceCount:1/0,Bt=Math.min(tt.instanceCount,Ve);ye.renderInstances(Ot,Pe,Bt)}else ye.render(Ot,Pe)};function mh(w,W,tt,$){N!==null&&w.isNodeMaterial&&N.setObject($,w),ut===!0&&st.setState(w,tt,!1),w.transparent===!0&&w.side===Ge&&w.forceSinglePass===!1?(w.side=$e,w.needsUpdate=!0,Bs(w,W,$),w.side=Si,w.needsUpdate=!0,Bs(w,W,$),w.side=Ge):Bs(w,W,$)}this.compile=function(w,W,tt=null){tt===null&&(tt=w),N!==null&&N.renderStart(w,W,tt),R=it.get(tt),R.init(W),S.push(R),tt.traverseVisible(function(K){K.isLight&&K.layers.test(W.layers)&&(R.pushLight(K),K.castShadow&&R.pushShadow(K))}),w!==tt&&w.traverseVisible(function(K){K.isLight&&K.layers.test(W.layers)&&(R.pushLight(K),K.castShadow&&R.pushShadow(K))}),R.setupLights(),N!==null&&N.updateLights(R.state.lightsArray),Rt=this.localClippingEnabled,ut=st.init(this.clippingPlanes,Rt),ut===!0&&st.setGlobalState(this.clippingPlanes,W),N!==null&&St.render(R.state.shadowsArray,tt,W);let $=new Set;return w.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;let At=K.material;if(At)if(Array.isArray(At))for(let Ft=0;Ft<At.length;Ft++){let Et=At[Ft];mh(Et,tt,W,K),$.add(Et)}else mh(At,tt,W,K),$.add(At)}),R=S.pop(),N!==null&&N.renderEnd(),$},this.compileAsync=function(w,W,tt=null){let $=this.compile(w,W,tt);return new Promise(K=>{function At(){if($.forEach(function(Ft){let Lt=Vt.get(Ft).currentProgram;(Lt===void 0||Lt.isReady())&&$.delete(Ft)}),$.size===0){K(w);return}setTimeout(At,10)}ie.get("KHR_parallel_shader_compile")!==null?At():setTimeout(At,10)})};let ol=null;function Af(w){ol&&ol(w)}function gh(){Ri.stop()}function xh(){Ri.start()}let Ri=new Hd;Ri.setAnimationLoop(Af),typeof self<"u"&&Ri.setContext(self),this.setAnimationLoop=function(w){ol=w,mt.setAnimationLoop(w),w===null?Ri.stop():Ri.start()},mt.addEventListener("sessionstart",gh),mt.addEventListener("sessionend",xh),this.render=function(w,W){if(W!==void 0&&W.isCamera!==!0){Yt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;N!==null&&N.renderStart(w,W);let tt=mt.enabled===!0&&mt.isPresenting===!0,$=F!==null&&(V===null||tt)&&F.begin(M,V);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),mt.enabled===!0&&mt.isPresenting===!0&&(F===null||F.isCompositing()===!1)&&(mt.cameraAutoUpdate===!0&&mt.updateCamera(W),W=mt.getCamera()),w.isScene===!0&&w.onBeforeRender(M,w,W,V),R=it.get(w,S.length),R.init(W),R.state.textureUnits=$t.getTextureUnits(),S.push(R),dt.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),W.isArrayCamera?ot.setFromArrayCamera(W):Q.setFromProjectionMatrix(dt,xn,W.reversedDepth),Rt=this.localClippingEnabled,ut=st.init(this.clippingPlanes,Rt),T=Tt.get(w,x.length),T.init(),x.push(T),this.info.render.frame++,mt.enabled===!0&&mt.isPresenting===!0){let Ft=M.xr.getDepthSensingMesh();Ft!==null&&al(Ft,W,-1/0,M.sortObjects)}al(w,W,0,M.sortObjects),T.finish(),N!==null&&N.updateLights(R.state.lightsArray),M.sortObjects===!0&&T.sort(ct,pt),ne=mt.enabled===!1||mt.isPresenting===!1||mt.hasDepthSensing()===!1,ne&&H.addToRenderList(T,w),this.info.autoReset===!0&&this.info.reset(),ut===!0&&st.beginShadows();let K=R.state.shadowsArray;if(St.render(K,w,W),ut===!0&&st.endShadows(),($&&F.hasRenderPass())===!1){let Ft=T.opaque,Et=T.transmissive;if(R.setupLights(),W.isArrayCamera){let Lt=W.cameras;if(Et.length>0)for(let Ht=0,Kt=Lt.length;Ht<Kt;Ht++){let ae=Lt[Ht];yh(Ft,Et,w,ae)}ne&&H.render(w);for(let Ht=0,Kt=Lt.length;Ht<Kt;Ht++){let ae=Lt[Ht];_h(T,w,ae,ae.viewport)}}else Et.length>0&&yh(Ft,Et,w,W),ne&&H.render(w),_h(T,w,W)}V!==null&&U===0&&($t.updateMultisampleRenderTarget(V),$t.updateRenderTargetMipmap(V)),$&&F.end(M),w.isScene===!0&&w.onAfterRender(M,w,W),Mt.resetDefaultState(),P=-1,L=null,S.pop(),S.length>0?(R=S[S.length-1],$t.setTextureUnits(R.state.textureUnits),ut===!0&&st.setGlobalState(M.clippingPlanes,R.state.camera)):R=null,x.pop(),x.length>0?T=x[x.length-1]:T=null,N!==null&&N.renderEnd()};function al(w,W,tt,$){if(w.visible===!1)return;if(w.layers.test(W.layers)){if(w.isGroup)tt=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(W);else if(w.isLight)R.pushLight(w),w.castShadow&&R.pushShadow(w);else if(w.isSprite){let Ft=W.isArrayCamera?ot:Q;if(!w.frustumCulled||w.intersectsFrustum(Ft)){$&&Ut.setFromMatrixPosition(w.matrixWorld).applyMatrix4(dt);let Et=ft.update(w),Lt=w.material;Lt.visible&&T.push(w,Et,Lt,tt,Ut.z,null,W)}}else if(w.isMesh||w.isLine||w.isPoints){let Ft=W.isArrayCamera?ot:Q;if(!w.frustumCulled||w.intersectsFrustum(Ft)){let Et=ft.update(w),Lt=w.material;if($&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Ut.copy(w.boundingSphere.center)):(Et.boundingSphere===null&&Et.computeBoundingSphere(),Ut.copy(Et.boundingSphere.center)),Ut.applyMatrix4(w.matrixWorld).applyMatrix4(dt)),Array.isArray(Lt)){let Ht=Et.groups;for(let Kt=0,ae=Ht.length;Kt<ae;Kt++){let Ot=Ht[Kt],le=Lt[Ot.materialIndex];le&&le.visible&&T.push(w,Et,le,tt,Ut.z,Ot,W)}}else Lt.visible&&T.push(w,Et,Lt,tt,Ut.z,null,W)}}}let At=w.children;for(let Ft=0,Et=At.length;Ft<Et;Ft++)al(At[Ft],W,tt,$)}function _h(w,W,tt,$){let{opaque:K,transmissive:At,transparent:Ft}=w;R.setupLightsView(tt),ut===!0&&st.setGlobalState(M.clippingPlanes,tt),$&&wt.viewport(A.copy($)),K.length>0&&Wr(K,W,tt),At.length>0&&Wr(At,W,tt),Ft.length>0&&Wr(Ft,W,tt),wt.buffers.depth.setTest(!0),wt.buffers.depth.setMask(!0),wt.buffers.color.setMask(!0),wt.setPolygonOffset(!1)}function yh(w,W,tt,$){if((tt.isScene===!0?tt.overrideMaterial:null)!==null)return;if(R.state.transmissionRenderTarget[$.id]===void 0){let Ot=ie.has("EXT_color_buffer_half_float")||ie.has("EXT_color_buffer_float");R.state.transmissionRenderTarget[$.id]=new cn(1,1,{generateMipmaps:!0,type:Ot?In:rn,minFilter:jn,samples:Math.max(4,_e.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ce.workingColorSpace})}let At=R.state.transmissionRenderTarget[$.id],Ft=$.viewport||A;At.setSize(Ft.z*M.transmissionResolutionScale,Ft.w*M.transmissionResolutionScale);let Et=M.getRenderTarget(),Lt=M.getActiveCubeFace(),Ht=M.getActiveMipmapLevel();M.setRenderTarget(At),M.getClearColor(k),Y=M.getClearAlpha(),Y<1&&M.setClearColor(16777215,.5),M.clear(),ne&&H.render(tt);let Kt=M.toneMapping;M.toneMapping=Hn;let ae=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),R.setupLightsView($),ut===!0&&st.setGlobalState(M.clippingPlanes,$),Wr(w,tt,$),$t.updateMultisampleRenderTarget(At),$t.updateRenderTargetMipmap(At),ie.has("WEBGL_multisampled_render_to_texture")===!1){let Ot=!1;for(let le=0,Pe=W.length;le<Pe;le++){let ve=W[le],{object:ye,geometry:Ve,material:Bt,group:Qe}=ve;if(Bt.side===Ge&&ye.layers.test($.layers)){let fe=Bt.side;Bt.side=$e,Bt.needsUpdate=!0,vh(ye,tt,$,Ve,Bt,Qe),Bt.side=fe,Bt.needsUpdate=!0,Ot=!0}}Ot===!0&&($t.updateMultisampleRenderTarget(At),$t.updateRenderTargetMipmap(At))}M.setRenderTarget(Et,Lt,Ht),M.setClearColor(k,Y),ae!==void 0&&($.viewport=ae),M.toneMapping=Kt}function Wr(w,W,tt){let $=W.isScene===!0?W.overrideMaterial:null;for(let K=0,At=w.length;K<At;K++){let Ft=w[K],{object:Et,geometry:Lt,group:Ht}=Ft,Kt=Ft.material;Kt.allowOverride===!0&&$!==null&&(Kt=$),Et.layers.test(tt.layers)&&vh(Et,W,tt,Lt,Kt,Ht)}}function vh(w,W,tt,$,K,At){N!==null&&K.isNodeMaterial&&N.setObject(w,K),w.onBeforeRender(M,W,tt,$,K,At),w.modelViewMatrix.multiplyMatrices(tt.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),K.onBeforeRender(M,W,tt,$,w,At),K.transparent===!0&&K.side===Ge&&K.forceSinglePass===!1?(K.side=$e,K.needsUpdate=!0,M.renderBufferDirect(tt,W,$,K,w,At),K.side=Si,K.needsUpdate=!0,M.renderBufferDirect(tt,W,$,K,w,At),K.side=Ge):M.renderBufferDirect(tt,W,$,K,w,At),w.onAfterRender(M,W,tt,$,K,At)}function Mh(w){let W=0;for(let tt of w)tt.texture!==null&&W++;return W}function Bs(w,W,tt){W.isScene!==!0&&(W=Zt);let $=Vt.get(w),K=R.state.lights,At=R.state.shadowsArray,Ft=K.state.version,Et=at.getParameters(w,K.state,At,W,tt,R.state.lightProbeGridArray),Lt=at.getProgramCacheKey(Et),Ht=$.programs;$.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?W.environment:null,$.fog=W.fog;let Kt=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;$.envMap=D.get(w.envMap||$.environment,Kt),$.envMapRotation=$.environment!==null&&w.envMap===null?W.environmentRotation:w.envMapRotation,Ht===void 0&&(w.addEventListener("dispose",ge),Ht=new Map,$.programs=Ht,$.programVariants=new Map);let ae=Ht.get(Lt);if(ae!==void 0){if($.currentProgram===ae&&$.lightsStateVersion===Ft)return bh(w,Et),ae}else Et.uniforms=at.getUniforms(w),N!==null&&w.isNodeMaterial&&N.build(w,tt,Et),w.onBeforeCompile(Et,M),ae=at.acquireProgram(Et,Lt),Ht.set(Lt,ae),$.uniforms=Et.uniforms;let Ot=$.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ot.clippingPlanes=st.uniform),bh(w,Et),$.needsLights=If(w),$.lightsStateVersion=Ft,$.needsLights&&(Ot.ambientLightColor.value=K.state.ambient,Ot.lightProbe.value=K.state.probe,Ot.sunLights.value=K.state.sun,Ot.sunLightShadows.value=K.state.sunShadow,Ot.directionalLights.value=K.state.directional,Ot.directionalLightShadows.value=K.state.directionalShadow,Ot.spotLights.value=K.state.spot,Ot.spotLightShadows.value=K.state.spotShadow,Ot.rectAreaLights.value=K.state.rectArea,Ot.ltc_1.value=K.state.rectAreaLTC1,Ot.ltc_2.value=K.state.rectAreaLTC2,Ot.pointLights.value=K.state.point,Ot.pointLightShadows.value=K.state.pointShadow,Ot.hemisphereLights.value=K.state.hemi,Ot.sunShadowMatrix.value=K.state.sunShadowMatrix,Ot.sunShadowCascade.value=K.state.sunShadowCascade,Ot.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Ot.spotLightMatrix.value=K.state.spotLightMatrix,Ot.spotLightMap.value=K.state.spotLightMap,Ot.pointShadowMatrix.value=K.state.pointShadowMatrix),$.numLightProbeGrids=Mh(R.state.lightProbeGridArray),$.currentProgram=ae,$.uniformsList=null,ae}function Rf(w,W,tt,$,K){let At=Vt.get(w),Ft=At.currentProgram.id+","+$+","+K,Et=At.programVariants.get(Ft);return Et===void 0?(Et=Bs(w,W,tt),At.programVariants.set(Ft,Et)):(At.currentProgram=Et,At.uniformsList=null,At.outputColorSpace=$,At.toneMapping=K),Et}function Sh(w){if(w.uniformsList===null){let W=w.currentProgram.getUniforms();w.uniformsList=Is.seqWithValue(W.seq,w.uniforms)}return w.uniformsList}function bh(w,W){let tt=Vt.get(w);tt.outputColorSpace=W.outputColorSpace,tt.batching=W.batching,tt.batchingColor=W.batchingColor,tt.instancing=W.instancing,tt.instancingColor=W.instancingColor,tt.instancingMorph=W.instancingMorph,tt.skinning=W.skinning,tt.morphTargets=W.morphTargets,tt.morphNormals=W.morphNormals,tt.morphColors=W.morphColors,tt.morphTargetsCount=W.morphTargetsCount,tt.numClippingPlanes=W.numClippingPlanes,tt.numIntersection=W.numClipIntersection,tt.vertexAlphas=W.vertexAlphas,tt.vertexTangents=W.vertexTangents,tt.toneMapping=W.toneMapping}function Cf(w,W,tt,$,K){W.isScene!==!0&&(W=Zt),$t.resetTextureUnits();let At=W.fog,Ft=$.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial?W.environment:null,Et=V===null?M.outputColorSpace:V.isXRRenderTarget===!0?V.texture.colorSpace:ce.workingColorSpace,Lt=$.isMeshStandardMaterial||$.isMeshLambertMaterial&&!$.envMap||$.isMeshPhongMaterial&&!$.envMap,Ht=D.get($.envMap||Ft,Lt),Kt=$.vertexColors===!0&&!!tt.attributes.color&&tt.attributes.color.itemSize===4,ae=!!tt.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Ot=!!tt.morphAttributes.position,le=!!tt.morphAttributes.normal,Pe=!!tt.morphAttributes.color,ve=Hn;$.toneMapped&&(V===null||V.isXRRenderTarget===!0)&&(ve=M.toneMapping);let ye=tt.morphAttributes.position||tt.morphAttributes.normal||tt.morphAttributes.color,Ve=ye!==void 0?ye.length:0,Bt=Vt.get($),Qe=R.state.lights;if(ut===!0&&(Rt===!0||w!==L)){let we=w===L&&$.id===P;st.setState($,w,we)}let fe=!1,Ci=!1;$.version===Bt.__version?Bt.needsLights&&Bt.lightsStateVersion!==Qe.state.version||K.isBatchedMesh&&Bt.batching===!1||!K.isBatchedMesh&&Bt.batching===!0||K.isBatchedMesh&&Bt.batchingColor===!0&&K._colorsTexture===null||K.isBatchedMesh&&Bt.batchingColor===!1&&K._colorsTexture!==null||K.isInstancedMesh&&Bt.instancing===!1||!K.isInstancedMesh&&Bt.instancing===!0||K.isSkinnedMesh&&Bt.skinning===!1||!K.isSkinnedMesh&&Bt.skinning===!0||K.isInstancedMesh&&Bt.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Bt.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Bt.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Bt.instancingMorph===!1&&K.morphTexture!==null||Bt.envMap!==Ht||$.fog===!0&&Bt.fog!==At||Bt.numClippingPlanes!==void 0&&(Bt.numClippingPlanes!==st.numPlanes||Bt.numIntersection!==st.numIntersection)||Bt.vertexAlphas!==Kt||Bt.vertexTangents!==ae||Bt.morphTargets!==Ot||Bt.morphNormals!==le||Bt.morphColors!==Pe||Bt.morphTargetsCount!==Ve||Bt.numLightProbeGrids!==Mh(R.state.lightProbeGridArray)?fe=!0:(Bt.outputColorSpace!==Et||Bt.toneMapping!==ve)&&(Ci=!0):(fe=!0,Bt.__version=$.version);let We=Bt.currentProgram;(fe===!0||Ci===!0)&&(We=Ci===!0?Rf($,W,K,Et,ve):Bs($,W,K),N&&$.isNodeMaterial&&N.onUpdateProgram($,We,Bt));let Xr=!1,oi=!1,Pi=!1,de=We.getUniforms(),He=Bt.uniforms;if(wt.useProgram(We.program)&&(Xr=!0,oi=!0,Pi=!0),$.id!==P&&(P=$.id,oi=!0),Xr||L!==w){wt.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),de.setValue(q,"projectionMatrix",w.projectionMatrix),de.setValue(q,"viewMatrix",w.matrixWorldInverse);let Oe=de.map.cameraPosition;Oe!==void 0&&Oe.setValue(q,Nt.setFromMatrixPosition(w.matrixWorld)),_e.logarithmicDepthBuffer&&de.setValue(q,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&de.setValue(q,"isOrthographic",w.isOrthographicCamera===!0),L!==w&&(L=w,oi=!0,Pi=!0)}if(Bt.needsLights&&(Qe.state.sunShadowMap.length>0&&de.setValue(q,"sunShadowMap",Qe.state.sunShadowMap,$t),Qe.state.directionalShadowMap.length>0&&de.setValue(q,"directionalShadowMap",Qe.state.directionalShadowMap,$t),Qe.state.spotShadowMap.length>0&&de.setValue(q,"spotShadowMap",Qe.state.spotShadowMap,$t),Qe.state.pointShadowMap.length>0&&de.setValue(q,"pointShadowMap",Qe.state.pointShadowMap,$t)),K.isSkinnedMesh){de.setOptional(q,K,"bindMatrix"),de.setOptional(q,K,"bindMatrixInverse");let we=K.skeleton;we&&(we.boneTexture===null&&we.computeBoneTexture(),de.setValue(q,"boneTexture",we.boneTexture,$t))}K.isBatchedMesh&&(de.setOptional(q,K,"batchingTexture"),de.setValue(q,"batchingTexture",K._matricesTexture,$t),de.setOptional(q,K,"batchingIdTexture"),de.setValue(q,"batchingIdTexture",K._indirectTexture,$t),de.setOptional(q,K,"batchingColorTexture"),K._colorsTexture!==null&&de.setValue(q,"batchingColorTexture",K._colorsTexture,$t));let Sn=tt.morphAttributes;if((Sn.position!==void 0||Sn.normal!==void 0||Sn.color!==void 0)&&rt.update(K,tt,We),(oi||Bt.receiveShadow!==K.receiveShadow)&&(Bt.receiveShadow=K.receiveShadow,de.setValue(q,"receiveShadow",K.receiveShadow)),($.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial)&&$.envMap===null&&W.environment!==null&&(He.envMapIntensity.value=W.environmentIntensity),He.dfgLUT!==void 0&&(He.dfgLUT.value=ny()),oi){if(de.setValue(q,"toneMappingExposure",M.toneMappingExposure),Bt.needsLights&&Pf(He,Pi),At&&$.fog===!0&&vt.refreshFogUniforms(He,At),vt.refreshMaterialUniforms(He,$,j,ht,R.state.transmissionRenderTarget[w.id]),Bt.needsLights&&Bt.numLightProbeGrids>0){let we=v,Oe=0;for(let Vn of R.state.lightProbeGridArray)Vn.texture!==null&&(we.textures[Oe]=Vn.texture,we.min[Oe]=Vn.boundingBox.min,we.max[Oe]=Vn.boundingBox.max,we.resolution[Oe]=Vn.resolution,Oe++);for(let Vn in we)we[Vn].length=Oe;He.probesSH.value=we.textures,He.probesMin.value=we.min,He.probesMax.value=we.max,He.probesResolution.value=we.resolution}Is.upload(q,Sh(Bt),He,$t)}if($.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Is.upload(q,Sh(Bt),He,$t),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&de.setValue(q,"center",K.center),de.setValue(q,"modelViewMatrix",K.modelViewMatrix),de.setValue(q,"normalMatrix",K.normalMatrix),de.setValue(q,"modelMatrix",K.matrixWorld),$.uniformsGroups!==void 0){let we=$.uniformsGroups;for(let Oe=0,Vn=we.length;Oe<Vn;Oe++){let wh=we[Oe];zt.update(wh,We),zt.bind(wh,We)}}return We}function Pf(w,W){w.ambientLightColor.needsUpdate=W,w.lightProbe.needsUpdate=W,w.sunLights.needsUpdate=W,w.sunLightShadows.needsUpdate=W,w.directionalLights.needsUpdate=W,w.directionalLightShadows.needsUpdate=W,w.pointLights.needsUpdate=W,w.pointLightShadows.needsUpdate=W,w.spotLights.needsUpdate=W,w.spotLightShadows.needsUpdate=W,w.rectAreaLights.needsUpdate=W,w.hemisphereLights.needsUpdate=W}function If(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return V},this.setRenderTargetTextures=function(w,W,tt){let $=Vt.get(w);$.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),Vt.get(w.texture).__webglTexture=W,Vt.get(w.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:tt,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,W){let tt=Vt.get(w);tt.__webglFramebuffer=W,tt.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(w,W=0,tt=0){V=w,X=W,U=tt;let $=null,K=!1,At=!1;if(w){let Et=Vt.get(w);if(Et.__useDefaultFramebuffer!==void 0){wt.bindFramebuffer(q.FRAMEBUFFER,Et.__webglFramebuffer),A.copy(w.viewport),B.copy(w.scissor),Z=w.scissorTest,wt.viewport(A),wt.scissor(B),wt.setScissorTest(Z),P=-1;return}else if(Et.__webglFramebuffer===void 0)$t.setupRenderTarget(w);else if(Et.__hasExternalTextures)$t.rebindTextures(w,Vt.get(w.texture).__webglTexture,Vt.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let Kt=w.depthTexture;if(Et.__boundDepthTexture!==Kt){if(Kt!==null&&Vt.has(Kt)&&(w.width!==Kt.image.width||w.height!==Kt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");$t.setupDepthRenderbuffer(w)}}let Lt=w.texture;(Lt.isData3DTexture||Lt.isDataArrayTexture||Lt.isCompressedArrayTexture)&&(At=!0);let Ht=Vt.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ht[W])?$=Ht[W][tt]:$=Ht[W],K=!0):w.samples>0&&$t.useMultisampledRTT(w)===!1?$=Vt.get(w).__webglMultisampledFramebuffer:Array.isArray(Ht)?$=Ht[tt]:$=Ht,A.copy(w.viewport),B.copy(w.scissor),Z=w.scissorTest}else A.copy(lt).multiplyScalar(j).floor(),B.copy(_t).multiplyScalar(j).floor(),Z=Dt;if(tt!==0&&($=O),wt.bindFramebuffer(q.FRAMEBUFFER,$)&&wt.drawBuffers(w,$),wt.viewport(A),wt.scissor(B),wt.setScissorTest(Z),K){let Et=Vt.get(w.texture);q.framebufferTexture2D(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_CUBE_MAP_POSITIVE_X+W,Et.__webglTexture,tt)}else if(At){let Et=W;for(let Lt=0;Lt<w.textures.length;Lt++){let Ht=Vt.get(w.textures[Lt]);q.framebufferTextureLayer(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0+Lt,Ht.__webglTexture,tt,Et)}}else if(w!==null&&tt!==0){let Et=Vt.get(w.texture);q.framebufferTexture2D(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,Et.__webglTexture,tt)}P=-1};function Eh(w){let W=Vt.get(w);return(W.__readFormat!==w.format||W.__readType!==w.type)&&(W.__readFormat=w.format,W.__readType=w.type,W.__formatReadable=_e.textureFormatReadable(w.format),W.__typeReadable=_e.textureTypeReadable(w.type)),W}this.readRenderTargetPixels=function(w,W,tt,$,K,At,Ft,Et=0){if(!(w&&w.isWebGLRenderTarget)){Yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Lt=Vt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Ft!==void 0&&(Lt=Lt[Ft],Array.isArray(Lt)&&(Lt=Lt[0])),Lt){wt.bindFramebuffer(q.FRAMEBUFFER,Lt);try{let Ht=w.textures[Et],Kt=Ht.format,ae=Ht.type;w.textures.length>1&&q.readBuffer(q.COLOR_ATTACHMENT0+Et);let Ot=Eh(Ht);if(Ot.__formatReadable===!1){Yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ot.__typeReadable===!1){Yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=w.width-$&&tt>=0&&tt<=w.height-K&&q.readPixels(W,tt,$,K,yt.convert(Kt),yt.convert(ae),At)}finally{let Ht=V!==null?Vt.get(V).__webglFramebuffer:null;wt.bindFramebuffer(q.FRAMEBUFFER,Ht)}}},this.readRenderTargetPixelsAsync=async function(w,W,tt,$,K,At,Ft,Et=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Lt=Vt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Ft!==void 0&&(Lt=Lt[Ft],Array.isArray(Lt)&&(Lt=Lt[0])),Lt)if(W>=0&&W<=w.width-$&&tt>=0&&tt<=w.height-K){wt.bindFramebuffer(q.FRAMEBUFFER,Lt);let Ht=w.textures[Et],Kt=Ht.format,ae=Ht.type;w.textures.length>1&&q.readBuffer(q.COLOR_ATTACHMENT0+Et);let Ot=Eh(Ht);if(Ot.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ot.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let le=q.createBuffer();q.bindBuffer(q.PIXEL_PACK_BUFFER,le),q.bufferData(q.PIXEL_PACK_BUFFER,At.byteLength,q.STREAM_READ),q.readPixels(W,tt,$,K,yt.convert(Kt),yt.convert(ae),0),q.bindBuffer(q.PIXEL_PACK_BUFFER,null);let Pe=V!==null?Vt.get(V).__webglFramebuffer:null;wt.bindFramebuffer(q.FRAMEBUFFER,Pe);let ve=q.fenceSync(q.SYNC_GPU_COMMANDS_COMPLETE,0);return q.flush(),await cd(q,ve,4),q.bindBuffer(q.PIXEL_PACK_BUFFER,le),q.getBufferSubData(q.PIXEL_PACK_BUFFER,0,At),q.bindBuffer(q.PIXEL_PACK_BUFFER,null),q.deleteBuffer(le),q.deleteSync(ve),At}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,W=null,tt=0){let $=Math.pow(2,-tt),K=Math.floor(w.image.width*$),At=Math.floor(w.image.height*$),Ft=W!==null?W.x:0,Et=W!==null?W.y:0;$t.setTexture2D(w,0),q.copyTexSubImage2D(q.TEXTURE_2D,tt,0,0,Ft,Et,K,At),wt.unbindTexture()},this.copyTextureToTexture=function(w,W,tt=null,$=null,K=0,At=0){let Ft,Et,Lt,Ht,Kt,ae,Ot,le,Pe,ve=w.isCompressedTexture?w.mipmaps[At]:w.image;if(tt!==null)Ft=tt.max.x-tt.min.x,Et=tt.max.y-tt.min.y,Lt=tt.isBox3?tt.max.z-tt.min.z:1,Ht=tt.min.x,Kt=tt.min.y,ae=tt.isBox3?tt.min.z:0;else{let de=Math.pow(2,-K);Ft=Math.floor(ve.width*de),Et=Math.floor(ve.height*de),w.isDataArrayTexture?Lt=ve.depth:w.isData3DTexture?Lt=Math.floor(ve.depth*de):Lt=1,Ht=0,Kt=0,ae=0}$!==null?(Ot=$.x,le=$.y,Pe=$.z):(Ot=0,le=0,Pe=0);let ye=yt.convert(W.format),Ve=yt.convert(W.type),Bt;W.isData3DTexture?($t.setTexture3D(W,0),Bt=q.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?($t.setTexture2DArray(W,0),Bt=q.TEXTURE_2D_ARRAY):($t.setTexture2D(W,0),Bt=q.TEXTURE_2D),wt.activeTexture(q.TEXTURE0),wt.pixelStorei(q.UNPACK_FLIP_Y_WEBGL,W.flipY),wt.pixelStorei(q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),wt.pixelStorei(q.UNPACK_ALIGNMENT,W.unpackAlignment);let Qe=wt.getParameter(q.UNPACK_ROW_LENGTH),fe=wt.getParameter(q.UNPACK_IMAGE_HEIGHT),Ci=wt.getParameter(q.UNPACK_SKIP_PIXELS),We=wt.getParameter(q.UNPACK_SKIP_ROWS),Xr=wt.getParameter(q.UNPACK_SKIP_IMAGES);wt.pixelStorei(q.UNPACK_ROW_LENGTH,ve.width),wt.pixelStorei(q.UNPACK_IMAGE_HEIGHT,ve.height),wt.pixelStorei(q.UNPACK_SKIP_PIXELS,Ht),wt.pixelStorei(q.UNPACK_SKIP_ROWS,Kt),wt.pixelStorei(q.UNPACK_SKIP_IMAGES,ae);let oi=w.isDataArrayTexture||w.isData3DTexture,Pi=W.isDataArrayTexture||W.isData3DTexture;if(w.isDepthTexture){let de=Vt.get(w),He=Vt.get(W),Sn=Vt.get(de.__renderTarget),we=Vt.get(He.__renderTarget);wt.bindFramebuffer(q.READ_FRAMEBUFFER,Sn.__webglFramebuffer),wt.bindFramebuffer(q.DRAW_FRAMEBUFFER,we.__webglFramebuffer);for(let Oe=0;Oe<Lt;Oe++)oi&&(q.framebufferTextureLayer(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,Vt.get(w).__webglTexture,K,ae+Oe),q.framebufferTextureLayer(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,Vt.get(W).__webglTexture,At,Pe+Oe)),q.blitFramebuffer(Ht,Kt,Ht+Ft,Kt+Et,Ot,le,Ot+Ft,le+Et,q.DEPTH_BUFFER_BIT,q.NEAREST);wt.bindFramebuffer(q.READ_FRAMEBUFFER,null),wt.bindFramebuffer(q.DRAW_FRAMEBUFFER,null)}else if(K!==0||w.isRenderTargetTexture||Vt.has(w)){let de=Vt.get(w),He=Vt.get(W);wt.bindFramebuffer(q.READ_FRAMEBUFFER,I),wt.bindFramebuffer(q.DRAW_FRAMEBUFFER,G);for(let Sn=0;Sn<Lt;Sn++)oi?q.framebufferTextureLayer(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,de.__webglTexture,K,ae+Sn):q.framebufferTexture2D(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,de.__webglTexture,K),Pi?q.framebufferTextureLayer(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,He.__webglTexture,At,Pe+Sn):q.framebufferTexture2D(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,He.__webglTexture,At),K!==0?q.blitFramebuffer(Ht,Kt,Ht+Ft,Kt+Et,Ot,le,Ot+Ft,le+Et,q.COLOR_BUFFER_BIT,q.NEAREST):Pi?q.copyTexSubImage3D(Bt,At,Ot,le,Pe+Sn,Ht,Kt,Ft,Et):q.copyTexSubImage2D(Bt,At,Ot,le,Ht,Kt,Ft,Et);wt.bindFramebuffer(q.READ_FRAMEBUFFER,null),wt.bindFramebuffer(q.DRAW_FRAMEBUFFER,null)}else Pi?w.isDataTexture||w.isData3DTexture?q.texSubImage3D(Bt,At,Ot,le,Pe,Ft,Et,Lt,ye,Ve,ve.data):W.isCompressedArrayTexture?q.compressedTexSubImage3D(Bt,At,Ot,le,Pe,Ft,Et,Lt,ye,ve.data):q.texSubImage3D(Bt,At,Ot,le,Pe,Ft,Et,Lt,ye,Ve,ve):w.isDataTexture?q.texSubImage2D(q.TEXTURE_2D,At,Ot,le,Ft,Et,ye,Ve,ve.data):w.isCompressedTexture?q.compressedTexSubImage2D(q.TEXTURE_2D,At,Ot,le,ve.width,ve.height,ye,ve.data):q.texSubImage2D(q.TEXTURE_2D,At,Ot,le,Ft,Et,ye,Ve,ve);wt.pixelStorei(q.UNPACK_ROW_LENGTH,Qe),wt.pixelStorei(q.UNPACK_IMAGE_HEIGHT,fe),wt.pixelStorei(q.UNPACK_SKIP_PIXELS,Ci),wt.pixelStorei(q.UNPACK_SKIP_ROWS,We),wt.pixelStorei(q.UNPACK_SKIP_IMAGES,Xr),At===0&&W.generateMipmaps===!0&&W.mipmapsAutoUpdate===!0&&q.generateMipmap(Bt),wt.unbindTexture()},this.initRenderTarget=function(w){Vt.get(w).__webglFramebuffer===void 0&&$t.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?$t.setTextureCube(w,0):w.isData3DTexture?$t.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?$t.setTexture2DArray(w,0):$t.setTexture2D(w,0),wt.unbindTexture()},this.resetState=function(){X=0,U=0,V=null,wt.reset(),Mt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=ce._getDrawingBufferColorSpace(t),e.unpackColorSpace=ce._getUnpackColorSpace()}};var iy=new Sr;function Or(i){return new Promise(t=>{iy.load(i,e=>{e.colorSpace=be,e.wrapS=e.wrapT=fi,e.anisotropy=4,t(e)},void 0,()=>t(null))})}function ii(i,t,e={}){let{triplanar:n=!1,vary:s=0,mapNormal:r=!1,...o}=e,a=new Me({map:i,roughness:.9,metalness:0,...o}),l={value:1/t};return a.onBeforeCompile=c=>{c.uniforms.uvScale=l,c.vertexShader=(r?`attribute vec3 mapNormal;
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
      diffuseColor *= sampledDiffuseColor;`)},a.customProgramCacheKey=()=>`wm${t}${n}${s}${r}`,a}function zc(i,t){let e=document.createElement("canvas");e.width=e.height=i,t(e.getContext("2d"),i);let n=new Rn(e);return n.colorSpace=be,n}var Gc=()=>zc(128,(i,t)=>{let e=i.createRadialGradient(t/2,t/2,0,t/2,t/2,t/2);e.addColorStop(0,"rgba(0,0,0,0.7)"),e.addColorStop(.55,"rgba(0,0,0,0.38)"),e.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=e,i.fillRect(0,0,t,t)});var Br=()=>zc(128,(i,t)=>{let e=i.createRadialGradient(t/2,t/2,0,t/2,t/2,t/2);e.addColorStop(0,"rgba(255,220,160,1)"),e.addColorStop(.35,"rgba(255,190,120,0.45)"),e.addColorStop(1,"rgba(255,170,90,0)"),i.fillStyle=e,i.fillRect(0,0,t,t)});var Vc=()=>zc(128,(i,t)=>{i.strokeStyle="rgba(255,255,255,1)",i.lineWidth=12,i.beginPath(),i.arc(t/2,t/2,t*.42,0,Math.PI*2),i.stroke(),i.fillStyle="rgba(255,200,120,0.28)",i.beginPath(),i.arc(t/2,t/2,t*.38,0,Math.PI*2),i.fill()});function Wc(i){let t=document.createElement("canvas");t.width=256,t.height=128;let e=t.getContext("2d"),n=e.createLinearGradient(0,0,0,128);n.addColorStop(0,"#5f86c0"),n.addColorStop(.42,"#bcc9d8"),n.addColorStop(.5,"#ffd39a"),n.addColorStop(.56,"#8a7766"),n.addColorStop(1,"#2b2724"),e.fillStyle=n,e.fillRect(0,0,256,128);let s=e.createRadialGradient(64,60,0,64,60,30);s.addColorStop(0,"rgba(255,240,200,1)"),s.addColorStop(1,"rgba(255,200,120,0)"),e.fillStyle=s,e.fillRect(0,0,256,128);let r=new Rn(t);r.mapping=Cs,r.colorSpace=be;let o=new Ls(i),a=o.fromEquirectangular(r).texture;return o.dispose(),r.dispose(),a}var $a=new kt,Ee=class{constructor(){this.pos=[],this.nor=[],this.col=[]}add(t,e,n){let s=t.attributes.position.array;t.attributes.normal||t.computeVertexNormals();let r=t.attributes.normal.array,o=t.index?t.index.array:null,a=o?o.length:s.length/3;$a.set(e);let l=$a.r,c=$a.g,h=$a.b,u=n?n.elements:null;for(let d=0;d<a;d++){let f=(o?o[d]:d)*3,m=s[f],y=s[f+1],p=s[f+2],g=r[f],_=r[f+1],E=r[f+2];if(u){this.pos.push(u[0]*m+u[4]*y+u[8]*p+u[12],u[1]*m+u[5]*y+u[9]*p+u[13],u[2]*m+u[6]*y+u[10]*p+u[14]);let v=u[0]*g+u[4]*_+u[8]*E,T=u[1]*g+u[5]*_+u[9]*E,R=u[2]*g+u[6]*_+u[10]*E,x=Math.hypot(v,T,R)||1;g=v/x,_=T/x,E=R/x}else this.pos.push(m,y,p);this.nor.push(g,_,E),this.col.push(l,c,h)}return t.dispose(),this}box(t,e,n,s,r,o,a,l=0){return this.add(new Ct(t,e,n),s,gt(r,o,a,l))}build({outline:t=!0}={}){let e=new pe;return e.setAttribute("position",new qt(this.pos,3)),e.setAttribute("normal",new qt(this.nor,3)),e.setAttribute("color",new qt(this.col,3)),t&&sy(e),e.computeBoundingSphere(),e}};function gt(i,t,e,n=0,s=1,r=1,o=1){let a=new Xt;return a.compose(new z(i,t,e),new Le().setFromAxisAngle(new z(0,1,0),n),new z(s,r,o)),a}function sy(i){let t=i.attributes.position.array,e=i.attributes.normal.array,n=new Map,s=o=>`${Math.round(t[o]*500)},${Math.round(t[o+1]*500)},${Math.round(t[o+2]*500)}`;for(let o=0;o<t.length;o+=3){let a=s(o),l=n.get(a);l||n.set(a,l=[0,0,0]),l[0]+=e[o],l[1]+=e[o+1],l[2]+=e[o+2]}let r=new Float32Array(t.length);for(let o=0;o<t.length;o+=3){let a=n.get(s(o)),l=Math.hypot(a[0],a[1],a[2])||1;r[o]=a[0]/l,r[o+1]=a[1]/l,r[o+2]=a[2]/l}i.setAttribute("outlineNormal",new ue(r,3))}function Kd(i,t,e,n){for(let s=0;s<i.length;s+=9){let r=i[s],o=i[s+1],a=i[s+2],l=i[s+3]-r,c=i[s+4]-o,h=i[s+5]-a,u=i[s+6]-r,d=i[s+7]-o,f=i[s+8]-a,m=c*f-h*d,y=h*u-l*f,p=l*d-c*u,g=(r+i[s+3]+i[s+6])/3-t,_=(o+i[s+4]+i[s+7])/3-e,E=(a+i[s+5]+i[s+8])/3-n;if(m*g+y*_+p*E<0)for(let v=0;v<3;v++){let T=i[s+3+v];i[s+3+v]=i[s+6+v],i[s+6+v]=T}}return i}function Ei(i,t,e,n=.35){let s=i/2+n,r=t/2+n,o=[[-s,0,-r],[s,0,-r],[s,e,0],[-s,0,-r],[s,e,0],[-s,e,0],[-s,0,r],[-s,e,0],[s,e,0],[-s,0,r],[s,e,0],[s,0,r],[-s,0,-r],[-s,e,0],[-s,0,r],[s,0,-r],[s,0,r],[s,e,0],[-s,0,-r],[-s,0,r],[s,0,r],[-s,0,-r],[s,0,r],[s,0,-r]],a=new pe;return a.setAttribute("position",new qt(Kd(o.flat(),0,e*.3,0),3)),a.computeVertexNormals(),a}function Qd(i,t,e,n=.3){let s=i/2+n,r=t/2+n,o=i/2-1.2,a=t/2-1.6,l=e*.7,c={a:[-s,0,-r],b:[s,0,-r],c:[s,0,r],d:[-s,0,r],e:[-o,l,-a],f:[o,l,-a],g:[o,l,a],hh:[-o,l,a],r1:[-o+.6,e,0],r2:[o-.6,e,0]},h=(f,m,y)=>[...c[f],...c[m],...c[y]],u=[...h("a","f","b"),...h("a","e","f"),...h("d","c","g"),...h("d","g","hh"),...h("a","d","hh"),...h("a","hh","e"),...h("b","f","g"),...h("b","g","c"),...h("e","r2","f"),...h("e","r1","r2"),...h("hh","g","r2"),...h("hh","r2","r1"),...h("e","hh","r1"),...h("f","r2","g"),...h("a","c","d"),...h("a","b","c")],d=new pe;return d.setAttribute("position",new qt(Kd(u,0,e*.3,0),3)),d.computeVertexNormals(),d}var Ja=i=>new Xt().makeRotationX(i),Ns=i=>new Xt().makeRotationZ(i),ry=i=>new Xt().makeRotationY(i);function qc(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Mn(i,t,e,n,s,r,o=6){let a=new z(...e),l=new z(...n),c=a.distanceTo(l),h=new he(s,s,c,o,1),u=new Le().setFromUnitVectors(new z(0,1,0),l.clone().sub(a).normalize()),d=new Xt().compose(a.clone().add(l).multiplyScalar(.5),u,new z(1,1,1));i.add(h,r,t.clone().multiply(d))}var jd=[15845797,14724230,12946532,9263675],tf=[2826264,5913378,12093258,1710618,9079434];function Yc(i,t,{jacket:e=3824266,pants:n=3093568,skin:s=0,hair:r=0,scale:o=1,bag:a=!1,walk:l=0}={}){let c=(f,m,y,p)=>{let g=t.clone().multiply(gt(f*o,m*o,y*o,0,o,o,o));return p?g.multiply(p):g},h=jd[s%jd.length],u=tf[r%tf.length],d=Math.sin(l)*.25;for(let[f,m]of[[.11,d],[-.11,-d]])i.add(new Ct(.26,.09,.11),1908e3,c(.05+m*.4,.045,f)),i.add(new Fi(.075,.68,2,6),n,c(m*.25,.47,f,Ns(-m*.5)));i.add(new Ct(.22,.18,.36),n,c(0,.88,0)),i.add(new Fi(.17,.36,2,8),e,c(0,1.2,0,new Xt().makeScale(.85,1,1.15))),i.add(new he(.08,.1,.08,8),new kt(e).multiplyScalar(.8).getHex(),c(0,1.5,0));for(let[f,m]of[[.26,-d],[-.26,d]])i.add(new Fi(.06,.5,2,6),e,c(m*.3,1.15,f,Ns(m*.6))),i.add(new sn(.055,6,5),h,c(m*.55,.84,f));i.add(new sn(.12,8,6),h,c(.01,1.66,0)),i.add(new sn(.128,8,4,0,Math.PI*2,0,Math.PI*.55),u,c(-.015,1.68,0,Ns(.25))),i.add(new Ct(.04,.04,.04),h,c(.13,1.65,0)),a&&i.add(new Ct(.16,.3,.26),5913124,c(-.2,1.2,0))}function kr(i,t,e,{basket:n=!0}={}){let o=u=>{i.add(new Cn(.33,.04,4,14),1776415,t.clone().multiply(gt(u,.35,0)));for(let d=0;d<2;d++)i.add(new Ct(.56,.01,.01),12106946,t.clone().multiply(gt(u,.35,0)).multiply(Ns(d*Math.PI/2)));i.add(new he(.035,.035,.1,6),12106946,t.clone().multiply(gt(u,.35,0)).multiply(Ja(Math.PI/2)))};o(-.6),o(.6);let a=(u,d)=>[u,d,0],l=a(-.05,.36),c=a(-.22,.86),h=a(.48,.82);if(Mn(i,t,l,c,.025,e),Mn(i,t,l,a(.46,.66),.028,e),Mn(i,t,a(-.2,.74),a(.47,.74),.022,e),Mn(i,t,l,a(-.6,.35),.018,e),Mn(i,t,a(-.2,.78),a(-.6,.35),.018,e),Mn(i,t,h,a(.6,.35),.02,e),Mn(i,t,c,[-.24,.92,0],.016,12106946),i.add(new Ct(.24,.05,.12),2761760,t.clone().multiply(gt(-.26,.95,0))),Mn(i,t,h,[.46,.98,0],.016,12106946),Mn(i,t,[.44,.98,-.28],[.44,.98,.28],.016,2236966),i.add(new Cn(.37,.025,3,6,Math.PI*.75),e,t.clone().multiply(gt(-.6,.35,0)).multiply(Ns(Math.PI*.15))),i.add(new Cn(.37,.025,3,5,Math.PI*.6),e,t.clone().multiply(gt(.6,.35,0)).multiply(Ns(Math.PI*.2))),i.add(new Ct(.42,.08,.03),2763310,t.clone().multiply(gt(-.3,.38,.06))),i.add(new Ct(.44,.03,.2),12106946,t.clone().multiply(gt(-.55,.74,0))),n){let u=t.clone().multiply(gt(.66,.92,0));i.add(new Ct(.32,.03,.34),7031338,u);for(let[d,f,m,y]of[[.15,0,.02,.34],[-.15,0,.02,.34],[0,.16,.32,.02],[0,-.16,.32,.02]])i.add(new Ct(m,.2,y),9070144,u.clone().multiply(gt(d,.1,f)))}}function Zc(i,t,e,n=.8){for(let r=0;r<e;r++){let o=r*n,a=t.clone().multiply(gt(o,0,0,Math.PI/2));i.add(new Cn(.42,.03,4,8,Math.PI),11120051,a.clone().multiply(gt(0,.4,0))),Mn(i,a,[-.42,0,0],[-.42,.4,0],.03,11120051),Mn(i,a,[.42,0,0],[.42,.4,0],.03,11120051)}Mn(i,t,[-.1,.06,0],[(e-1)*n+.1,.06,0],.035,11120051)}function $c(i,t,e=1){let s=(o,a,l,c)=>c?t.clone().multiply(gt(o,a,l)).multiply(c):t.clone().multiply(gt(o,a,l));i.add(new he(.22,.3,.5,8),2042406,s(0,.25,0)),i.add(new Cn(.22,.04,4,10),2042406,s(0,.5,0,Ja(Math.PI/2))),i.add(new he(.1,.17,1.2,8),2042406,s(0,1.1,0)),i.add(new he(.1,.13,3.9,8),2042406,s(0,3.6,0)),i.add(new sn(.11,8,6),2042406,s(0,1.75,0)),i.add(new Cn(.55,.045,5,10,Math.PI/2),2042406,s(0,5,e*.55,ry(e>0?-Math.PI/2:Math.PI/2))),i.add(new he(.015,.015,.5,4),2042406,s(0,5.25,e*.95));let r=e*1.12;i.add(new he(.05,.27,.22,6),2042406,s(0,4.98,r)),i.add(new he(.29,.29,.05,6),12096058,s(0,4.86,r)),i.add(new sn(.07,6,4),13937224,s(0,5.15,r));for(let o=0;o<6;o++){let a=o/6*Math.PI*2+Math.PI/6;i.add(new Ct(.035,.66,.035),2042406,s(Math.cos(a)*.3,4.52,r+Math.sin(a)*.3))}return i.add(new he(.24,.12,.12,6),2042406,s(0,4.16,r)),[t.elements[12],t.elements[14]+e*1.12]}function Jc(){return new he(.31,.22,.64,6)}function oy(i){let t=document.createElement("canvas");return t.width=128,t.height=128,i(t.getContext("2d")),t}function Kc(){let i=document.createElement("canvas");i.width=512,i.height=128;let t=i.getContext("2d");[s=>{s.fillStyle="#1f5fbf",s.fillRect(6,6,116,116),s.strokeStyle="#fff",s.lineWidth=6,s.strokeRect(10,10,108,108),s.fillStyle="#fff",s.font="bold 86px sans-serif",s.textAlign="center",s.textBaseline="middle",s.fillText("P",64,70)},s=>{s.fillStyle="#1d4f9e",s.fillRect(0,34,128,60),s.strokeStyle="#fff",s.lineWidth=4,s.strokeRect(4,38,120,52),s.fillStyle="#fff",s.font="bold 15px sans-serif",s.textAlign="center",s.textBaseline="middle",s.fillText("SYSSLOMANSG.",64,64)},s=>{s.fillStyle="#f2c94c",s.fillRect(14,6,100,116),s.fillStyle="#2e7d4f",s.fillRect(28,30,72,44),s.fillStyle="#f2c94c",s.fillRect(36,38,22,16),s.fillRect(66,38,22,16),s.fillStyle="#1a1a1a",s.font="bold 22px sans-serif",s.textAlign="center",s.fillText("BUSS",64,104)},s=>{s.fillStyle="#c62828",s.beginPath(),s.arc(64,64,58,0,Math.PI*2),s.fill(),s.fillStyle="#fff",s.fillRect(24,54,80,20)}].forEach((s,r)=>{let o=oy(s);t.drawImage(o,r*128,0)});let n=new Rn(i);return n.colorSpace=be,n}function Qc(i,t,e=2.6){i.add(new he(.035,.035,e,6),10133670,t.clone().multiply(gt(0,e/2,0))),i.add(new he(.05,.05,.06,6),5922404,t.clone().multiply(gt(0,e,0)))}function jc(i,t){let n=[9067062,9790524,8344114];for(let s=0;s<4;s++)i.add(new Ct(1.8,.04,.11),n[s%3],t.clone().multiply(gt(0,.46,-.18+s*.12)));for(let s=0;s<3;s++)i.add(new Ct(1.8,.11,.035),n[(s+1)%3],t.clone().multiply(gt(0,.62+s*.13,-.27)).multiply(Ja(-.15)));for(let s of[-.75,.75])i.add(new Ct(.06,.44,.06),2042406,t.clone().multiply(gt(s,.22,.17))),i.add(new Ct(.06,.85,.06),2042406,t.clone().multiply(gt(s,.42,-.24)).multiply(Ja(-.15))),i.add(new Ct(.06,.05,.48),2042406,t.clone().multiply(gt(s,.44,-.02))),i.add(new Ct(.06,.04,.42),2042406,t.clone().multiply(gt(s,.68,-.02)))}function th(i,t,e){let n=qc(e),s=[8016436,8806460];for(let o=0;o<4;o++)i.add(new Ct(1.8,.14,.05),s[o%2],t.clone().multiply(gt(0,.1+o*.14,.36)));for(let o=0;o<4;o++)i.add(new Ct(1.8,.14,.05),s[(o+1)%2],t.clone().multiply(gt(0,.1+o*.14,-.36)));for(let o of[-.88,.88])i.add(new Ct(.05,.56,.76),s[0],t.clone().multiply(gt(o,.31,0)));i.add(new Ct(1.74,.04,.7),3811870,t.clone().multiply(gt(0,.58,0)));let r=[14700650,15911244,16777215,14248608,16747066,9071318];for(let o=0;o<16;o++){let a=(n()-.5)*1.6,l=(n()-.5)*.55;i.add(new Bn(.13+n()*.06,0),[4160053,5214010][o%2],t.clone().multiply(gt(a,.68,l))),n()<.75&&i.add(new Bn(.07,0),r[Math.floor(n()*r.length)],t.clone().multiply(gt(a+.03,.82,l)))}}function eh(i,t){i.add(new he(.27,.23,.85,12),3103298,t.clone().multiply(gt(0,.5,0))),i.add(new he(.29,.29,.06,12),2369066,t.clone().multiply(gt(0,.95,0))),i.add(new he(.05,.05,.5,6),2369066,t.clone().multiply(gt(0,.25,-.3)))}function Qa(i,t,e){for(let s=0;s<=e+.01;s+=.32)i.add(new Ct(.035,.95,.035),1843744,t.clone().multiply(gt(s,.48,0)));for(let s of[.15,.85])i.add(new Ct(e,.045,.045),1843744,t.clone().multiply(gt(e/2,s,0)))}function ay(i){i.computeVertexNormals();let t=i.attributes.position,e=i.attributes.normal,n=new Map,s=r=>`${Math.round(t.getX(r)*1e3)},${Math.round(t.getY(r)*1e3)},${Math.round(t.getZ(r)*1e3)}`;for(let r=0;r<t.count;r++){let o=s(r),a=n.get(o)||[0,0,0];a[0]+=e.getX(r),a[1]+=e.getY(r),a[2]+=e.getZ(r),n.set(o,a)}for(let r=0;r<t.count;r++){let o=n.get(s(r)),a=Math.hypot(o[0],o[1],o[2])||1;e.setXYZ(r,o[0]/a,o[1]/a,o[2]/a)}e.needsUpdate=!0}function nh(i,t){let e=qc(t*97+13),n={lind:{h:3.4,br:5,reach:2.4,rise:2.4,cl:[.85,1.25],n:2,leaf:[.55,1.2,.42],bark:4864556,w:.32},lonn:{h:3,br:6,reach:2.8,rise:2,cl:[.9,1.3],n:2,leaf:[.5,1.12,.38],bark:4141864,w:.34},bjork:{h:4.2,br:5,reach:1.6,rise:2.8,cl:[.65,.95],n:2,leaf:[.56,1.2,.42],bark:15131094,w:.17}}[i],s=new Ka,r=new Ka,o=[(e()-.5)*.3,(e()-.5)*.3],a=[o[0],n.h,o[1]];if(s.tube([0,0,0],a,n.w,n.w*.75,n.bark,7),i==="bjork")for(let m=.5;m<n.h;m+=.42)s.box(n.w*2.1,.05,n.w*2.1,2763306,o[0]*(m/n.h),m,o[1]*(m/n.h));let l=new z(-.9,.35,.3).normalize(),c=[];for(let m=0;m<n.br;m++){let y=m/n.br*Math.PI*2+e()*.9,p=n.reach*(.7+e()*.5),g=n.rise*(.7+e()*.5),_=[a[0],n.h-e()*.8,a[2]],E=[_[0]+Math.cos(y)*p*.55,_[1]+g*.55,_[2]+Math.sin(y)*p*.55],v=[_[0]+Math.cos(y)*p,_[1]+g,_[2]+Math.sin(y)*p];s.tube(_,E,n.w*.55,n.w*.4,n.bark,5),s.tube(E,v,n.w*.4,n.w*.22,n.bark,4);for(let T=0;T<n.n;T++){let R=T===0?1:.55+e()*.35,x=[_[0]+(v[0]-_[0])*R+(e()-.5)*.6,_[1]+(v[1]-_[1])*R+.3+e()*.5,_[2]+(v[2]-_[2])*R+(e()-.5)*.6];c.push([x,n.cl[0]+e()*(n.cl[1]-n.cl[0])])}}c.push([[a[0],n.h+n.rise+.6,a[2]],n.cl[1]*1.05]),i!=="bjork"&&c.push([[a[0]+.5,n.h+n.rise*.7,a[2]-.6],n.cl[1]]);let h=c.reduce((m,y)=>m+y[0][1],0)/c.length,u=c.reduce((m,y)=>m+y[0][0],0)/c.length,d=c.reduce((m,y)=>m+y[0][2],0)/c.length,f=new z;for(let[m,y]of c){let p=ly(y,Math.floor(e()*1e6)),g=p.attributes.position.array,_=p.attributes.normal.array;p.setAttribute("mapNormal",new ue(_.slice(),3));for(let T=0;T<g.length;T+=3)f.set(m[0]+g[T]-u,(m[1]+g[T+1]-h)*1.2,m[2]+g[T+2]-d).normalize(),f.multiplyScalar(.7).add(new z(_[T],_[T+1],_[T+2]).multiplyScalar(.3)).normalize(),_[T]=f.x,_[T+1]=f.y,_[T+2]=f.z;let E=new Float32Array(g.length),v=.9+e()*.2;for(let T=0;T<g.length;T+=3){let R=Math.max(0,_[T]*l.x+_[T+1]*l.y+_[T+2]*l.z),x=(m[1]+g[T+1]-h)/3,S=Math.max(0,-(_[T]*m[0]+_[T+2]*m[2]))*.08,F=_[T+1]*.5+.5,M=v*(.45+.3*F+.25*Math.min(1,Math.max(0,x+.5))-S),C=1-.4*R;E[T]=n.leaf[0]*M*C*.9,E[T+1]=n.leaf[1]*M*C,E[T+2]=n.leaf[2]*M*C}p.setAttribute("color",new ue(E,3)),p.translate(m[0],m[1],m[2]),r.addColoured(p)}return{wood:s.build(),leaves:r.build()}}function ly(i,t){let e=new Bn(i,1),n=qc(t),s=e.attributes.position,r=Array.from({length:5},()=>[n()*2-1,n()*2-1,n()*2-1,.1+n()*.2]);for(let a=0;a<s.count;a++){let l=new z().fromBufferAttribute(s,a).normalize(),c=.82+n()*.08;for(let[h,u,d,f]of r)c+=f*Math.max(0,l.x*h+l.y*u+l.z*d)**2;l.multiplyScalar(i*c),l.y*=l.y<0?.5:.8,l.x*=1.15,l.z*=1.15,s.setXYZ(a,l.x,l.y,l.z)}let o=e.toNonIndexed();return o.computeVertexNormals(),ay(o),e.dispose(),o}var Ka=class{constructor(){this.pos=[],this.nor=[],this.col=[],this.mapN=[]}addColoured(t){let e=t.index?t.toNonIndexed():t;this.pos.push(...e.attributes.position.array),this.nor.push(...e.attributes.normal.array),this.col.push(...e.attributes.color.array),this.mapN.push(...(e.attributes.mapNormal||e.attributes.normal).array)}addSolid(t,e){let n=t.index?t.toNonIndexed():t;n.computeVertexNormals();let s=new kt(e),r=n.attributes.position.count,o=new Float32Array(r*3);for(let a=0;a<r;a++)o.set([s.r,s.g,s.b],a*3);n.setAttribute("color",new ue(o,3)),this.addColoured(n)}tube(t,e,n,s,r,o){let a=new z(...t),l=new z(...e),c=new he(s,n,a.distanceTo(l),o,1,!0),h=new Le().setFromUnitVectors(new z(0,1,0),l.clone().sub(a).normalize());c.applyMatrix4(new Xt().compose(a.clone().add(l).multiplyScalar(.5),h,new z(1,1,1))),this.addSolid(c,r)}box(t,e,n,s,r,o,a){let l=new Ct(t,e,n);l.translate(r,o,a),this.addSolid(l,s)}build(){let t=new pe;return t.setAttribute("position",new qt(this.pos,3)),t.setAttribute("normal",new qt(this.nor,3)),t.setAttribute("color",new qt(this.col,3)),t.setAttribute("mapNormal",new qt(this.mapN,3)),t}};var si=null,ih=null;function ef(i){ih=i,si=null}function nf(){if(si)return si;if(si=[],ih){for(let[t,e]of Object.entries(ih))/^Tree_/.test(t)&&si.push({kind:t,parts:n=>e.map(s=>[s.geo,n[s.mat]||n.leaf])});if(si.length)return si}let i=11;for(let t of["lind","lonn","bjork"])for(let e=0;e<2;e++){let n=nh(t,i++);si.push({kind:t,parts:s=>[[n.wood,s.wood],[n.leaves,s.leaf]]})}return si}var Ke=64,pn=3.2,sf=[14856796,15783308,15180164,15986404,14272422,15319674,13161400];function of(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var el=class{constructor(){this.m=[],this.c=[]}add(t,e,n,s,r,o,a,l,c){let h=gt(t,e,n,s,1,1,1);c&&h.multiply(c),h.multiply(new Xt().makeScale(r,o,a)),this.m.push(h),this.c.push(l)}mesh(t,e){if(!this.m.length)return null;let n=new hn(e,t,this.m.length),s=new kt;return this.m.forEach((r,o)=>{n.setMatrixAt(o,r),n.setColorAt(o,s.set(this.c[o]))}),n.computeBoundingSphere(),n}};function cy(i,t){return`${Math.floor(i/Ke)},${Math.floor(t/Ke)}`}function hy(){return{asphalt:new Ee,slabs:new Ee,grass:new Ee,wall:new Ee,roof:new Ee,trimB:new Ee,props:new Ee,trim:new el,glass:new el,lanterns:[],hedge:new Ee,signs:[]}}function uy(i,t,e,n){return{S:{x:i,z:t+n/2,nx:0,nz:1,tx:1,tz:0,L:e,rot:0},E:{x:i+e/2,z:t,nx:1,nz:0,tx:0,tz:-1,L:n,rot:Math.PI/2},W:{x:i-e/2,z:t,nx:-1,nz:0,tx:0,tz:1,L:n,rot:-Math.PI/2},N:{x:i,z:t-n/2,nx:0,nz:-1,tx:-1,tz:0,L:e,rot:Math.PI}}}function dy(i,t,e,n){let s=of(Math.floor(t.seed*1e6)+e*7),r=i;r.dark=r.trim;let o=Math.max(1,Math.min(7,Math.round((t.height-1)/pn))),a=o*pn+1,l=t.w,c=t.h,h=t.x+l/2,u=t.y+c/2,d=sf[(t.facadeIndex+e)%sf.length],f=new kt(d).multiplyScalar(.82).getHex(),m=16052198,y=s()<.4,p=s()<.3?5913130:s()<.5?3099194:16184042,g=Math.floor(s()*4),_=y?s()<.5?"pediment":"hood":["hood","keystone","none"][Math.floor(s()*3)],E=t.shop??s()<.3,v=[3107402,9054762,2771578,6965802][Math.floor(s()*4)];r.wall.add(new Ct(l,a,c),d,gt(h,a/2,u));let T=(L,A,B,Z,k)=>{let Y=A+.06;L.add(new Ct(l+A*2,B,Y),k,gt(h,Z,u+c/2+A-Y/2)),L.add(new Ct(l+A*2,B,Y),k,gt(h,Z,u-c/2-A+Y/2)),L.add(new Ct(Y,B,c),k,gt(h+l/2+A-Y/2,Z,u)),L.add(new Ct(Y,B,c),k,gt(h-l/2-A+Y/2,Z,u))};T(r.wall,.06,1,.5,9407106),T(r.wall,.04,pn-.2,1+(pn-.2)/2,f);for(let L=1;L<o;L++)T(r.trimB,.05,.16,1+L*pn,m);T(r.trimB,.3,.45,a+.22,m);let R=uy(h,u,l,c),x=[R.S,R.E,R.W].find(L=>n.street(L))||(l>=c?R.S:t.seed<.5?R.E:R.W),S=(L,A,B,Z)=>[L.x+L.tx*A+L.nx*Z,B,L.z+L.tz*A+L.nz*Z],F=(L,A,B,Z,k=L.rot,Y=0,et=0)=>{let ht=Z===o-1,j=ht?1.15:g===3?1.8:1.5,ct=B+(j-1.5)/2,pt=Math.sin(k),lt=Math.cos(k),_t=Math.cos(k),Dt=-Math.sin(k),Q=(dt,Nt,Ut)=>[L.x+L.tx*A+L.nx*Y+_t*dt+pt*Ut,ct+Nt,L.z+L.tz*A+L.nz*Y+Dt*dt+lt*Ut],ot=(dt,Nt)=>{let Ut=s()<.1;r.trim.add(...Q(dt,0,.04),k,Nt+.22,j+.24,.1,p),r.glass.add(...Q(dt,0,.05),k,Nt,j,.12,Ut?16763274:[9414335,7309215,11123916,6123910][Math.floor(s()*4)]),!Ut&&s()<.25&&r.trim.add(...Q(dt-Nt*.24,.05,.065),k,Nt*.4,j*.85,.13,[15986400,14272416,13096160][Math.floor(s()*3)])},ut=et||1.05;g===1&&L===x&&!et?(ot(-.36,.52),ot(.36,.52),ut=1.3):ot(0,ut),r.trim.add(...Q(0,-j/2-.18,.12),k,ut+.3,.08,.3,9344154),g===2&&!ht&&r.trim.add(...Q(0,j/2+.2,.05),k,ut*.8,.36,.1,p);let Rt=j/2+(g===2&&!ht?.55:.25);_==="pediment"&&!ht?(r.trim.add(...Q(0,Rt,.07),k,ut+.45,.22,.14,m),r.trim.add(...Q(0,Rt+.2,.07),k,ut*.7,.16,.12,m)):_==="hood"?r.trim.add(...Q(0,Rt,.12),k,ut+.5,.16,.24,m):_==="keystone"&&r.trim.add(...Q(0,Rt,.08),k,.28,.34,.16,m)},M=new Set;for(let L of[R.S,R.E,R.W]){if(L!==R.S&&n.blocked(L))continue;let A=Math.max(2,Math.floor(L.L/(y?2.9:2.6))),B=L.L/A,Z=Math.floor(A/2),k=L===x;if(M.clear(),k&&A>=5&&s()<.65){let j=Math.floor(s()*3);j===0?[1,A-2].forEach(ct=>M.add(ct)):j===1?M.add(Z):M.add(A-2)}for(let j=0;j<o;j++)for(let ct=0;ct<A;ct++){let pt=-L.L/2+B*(ct+.5);k&&j===0&&ct===Z||k&&j===0&&E||j>0&&M.has(ct)||F(L,pt,1+j*pn+1.6,j,L.rot,.04)}if(k&&y)for(let j=1;j<A;j++){let[ct,,pt]=S(L,-L.L/2+B*j,0,.06);r.trim.add(ct,1+pn+(o-1)*pn/2,pt,L.rot,.3,(o-1)*pn,.12,new kt(d).multiplyScalar(1.06).getHex())}if(!k)continue;for(let j=0;j<Math.floor(L.L/.9);j++){let[ct,,pt]=S(L,-L.L/2+.45+j*.9,0,.25);r.trim.add(ct,a-.15,pt,L.rot,.22,.35,.5,15130578)}let Y=-L.L/2+B*(Z+.5),et=[5912102,3099194,3885674,6957604][t.facadeIndex%4],ht=(j,ct)=>S(L,Y,j,ct);r.trim.add(...ht(1.6,.05),L.rot,2.1,3.2,.06,14209218),r.trim.add(...ht(3.6,.2),L.rot,2.8,.3,.5,15130578);for(let j of[-1.1,1.1]){let[ct,,pt]=S(L,Y+j,0,.18);r.trim.add(ct,1.65,pt,L.rot,.3,3.3,.4,15130578)}if(r.dark.add(...ht(1.3,.09),L.rot,1.4,2.6,.25,et),r.glass.add(...ht(2.85,.1),L.rot,1.3,.38,.26,16767392),r.trim.add(...ht(.17,.55),L.rot,2.6,.35,1.1,10656398),r.trim.add(...ht(.06,1.05),L.rot,2.6,.12,.6,10656398),E)for(let j=0;j<A;j++){if(j===Z)continue;let ct=-L.L/2+B*(j+.5),[pt,,lt]=S(L,ct,0,.05);if(r.glass.add(pt,1.55,lt,L.rot,B*.82,2.1,.16,13150328),j%2===0){let[_t,,Dt]=S(L,ct,0,1.5);Us(r.props,Fs("flowers",Q=>th(Q,gt(0,0,0),7)),gt(_t,.12,Dt,L.rot,.7,.8,.7))}for(let _t=0;_t<6;_t++){let[Dt,,Q]=S(L,ct-B*.45+(_t+.5)*(B*.9/6),0,.65);r.trim.add(Dt,2.95,Q,L.rot,B*.15,.06,1.3,_t%2?15920610:v,new Xt().makeRotationX(.32))}}for(let j of M){let ct=-L.L/2+B*(j+.5),pt=(o-1)*pn,lt=1+pn,_t=B*1.3,Dt=s()<.4,Q=Dt?_t:_t*.5,ot=Dt?.9:1.3,[ut,,Rt]=S(L,ct,0,0),dt=gt(ut,0,Rt,L.rot);r.wall.add(rf(_t,Q,ot,pt),new kt(d).multiplyScalar(1.04).getHex(),dt.clone().multiply(gt(0,lt,0)));for(let Zt=0;Zt<o;Zt++)r.trimB.add(rf(_t+.3,Q+.2,ot+.12,.18),m,dt.clone().multiply(gt(0,lt+Zt*pn-.09,0)));let Nt=Math.atan2(ot,(_t-Q)/2),Ut=(_t+Q)/4;for(let Zt=1;Zt<o;Zt++){let ne=1+Zt*pn+1.6;if(F(L,ct,ne,Zt,L.rot,ot+.02),!Dt)for(let oe of[-1,1]){let q={...L,x:L.x+L.tx*(oe*Ut)+L.nx*0,z:L.z+L.tz*(oe*Ut)};F(q,ct,ne,Zt,L.rot+oe*Nt,ot/2+.03,Math.min(1.05,Math.hypot((_t-Q)/2,ot)-.6))}}r.roof.add(fy(_t,Q,ot),7305858,dt.clone().multiply(gt(0,lt+pt+.05,0)))}}let C=l>=c,N=C?l:c,O=C?c:l,I=C?0:Math.PI/2,G=t.roof==="mansard"&&(N<7||O<7)?"gable":t.roof;if(G==="flat"){r.trimB.add(new Ct(l-.2,.25,c-.2),[4999750,4606544,5589311][e%3],gt(h,a+.3,u));for(let L=0;L<Math.max(1,Math.floor(l*c/120));L++){let A=h+(s()-.5)*(l-3),B=u+(s()-.5)*(c-3);s()<.5?r.trimB.add(new Ct(1.2,.7,1.2),10130828,gt(A,a+.75,B)):r.glass.add(A,a+.5,B,0,1.6,.2,1.1,6123910)}r.wall.add(new Ct(.9,2.2,.9),11033672,gt(h+(s()-.5)*(l-2),a+1.4,u+(s()-.5)*(c-2)));return}let X=Math.min(O*.42,5.2),U=[16777215,15784144,15261912,10133672][t.roofIndex%4],V=G==="gable"?Ei(N,O,X,.45):Qd(N,O,X,.4);r.roof.add(V,U,gt(h,a+.45,u,I)),G==="gable"&&r.trimB.add(new Ct(N+1,.18,.4),10112570,gt(h,a+.45+X,u,I));let P=N>6?Math.max(1,Math.floor(N/5)):0;for(let L=0;L<P;L++){let A=-N/2+N/P*(L+.5),B=O/2-1.6,[Z,k]=C?[h+A,u+B]:[h+(t.seed<.5?B:-B),u+A],Y=C?0:t.seed<.5?Math.PI/2:-Math.PI/2;r.wall.add(new Ct(1.5,1.6,1.4),d,gt(Z,a+.45+1.1,k,Y)),r.roof.add(Ei(1.5,1.4,.8,.15),U,gt(Z,a+.45+1.9,k,Y+Math.PI/2));let et=Math.sin(Y),ht=Math.cos(Y);r.glass.add(Z+et*.72,a+.45+1.1,k+ht*.72,Y,.9,.9,.08,7309215)}for(let L of[-.3,.28]){let[A,B]=C?[h+N*L,u-.6]:[h-.6,u+N*L];r.wall.add(new Ct(.9,2.8,.9),11033672,gt(A,a+.45+X*.65,B)),r.trimB.add(new Ct(1.05,.15,1.05),6961710,gt(A,a+.45+X*.65+1.45,B))}}function rf(i,t,e,n){let s=new _n;s.moveTo(-i/2,0),s.lineTo(-t/2,-e),s.lineTo(t/2,-e),s.lineTo(i/2,0),s.lineTo(-i/2,0);let r=new _i(s,{depth:n,bevelEnabled:!1,curveSegments:1});return r.rotateX(-Math.PI/2),r}function fy(i,t,e){let r=[[-i/2-.18,0,0],[-t/2-.09,0,e+.18],[t/2+.09,0,e+.18],[i/2+.18,0,0],[-t*.3,.85,0],[t*.3,.85,0]],o=[0,1,4,1,2,5,1,5,4,2,3,5],a=new pe;return a.setAttribute("position",new qt(o.flatMap(l=>r[l]),3)),a.computeVertexNormals(),a}function Us(i,t,e){let n=t.attributes.position.array,s=t.attributes.normal.array,r=t.attributes.color.array,o=e.elements;for(let a=0;a<n.length;a+=3){let l=n[a],c=n[a+1],h=n[a+2];i.pos.push(o[0]*l+o[4]*c+o[8]*h+o[12],o[1]*l+o[5]*c+o[9]*h+o[13],o[2]*l+o[6]*c+o[10]*h+o[14]);let u=s[a],d=s[a+1],f=s[a+2],m=o[0]*u+o[4]*d+o[8]*f,y=o[1]*u+o[5]*d+o[9]*f,p=o[2]*u+o[6]*d+o[10]*f,g=Math.hypot(m,y,p)||1;i.nor.push(m/g,y/g,p/g),i.col.push(r[a],r[a+1],r[a+2])}}var sh={};function Fs(i,t){if(!sh[i]){let e=new Ee;t(e),sh[i]=e.build({outline:!1})}return sh[i]}function wi(i,t,e,n,s,r){let{cells:o,width:a}=i,l=s-e,c=new Uint8Array(l*(r-n)),h=[];for(let u=n;u<r;u++)for(let d=e;d<s;d++){if(c[(u-n)*l+(d-e)]||o[u*a+d]!==t)continue;let f=d;for(;f+1<s&&!c[(u-n)*l+(f+1-e)]&&o[u*a+f+1]===t;)f++;let m=u;t:for(;m+1<r;){for(let y=d;y<=f;y++)if(c[(m+1-n)*l+(y-e)]||o[(m+1)*a+y]!==t)break t;m++}for(let y=u;y<=m;y++)c.fill(1,(y-n)*l+(d-e),(y-n)*l+(f-e)+1);h.push([d,u,f+1,m+1])}return h}function Ti(i,t,e,n,s=-1.2){let[r,o,a,l]=t;i.add(new Ct(a-r,e-s,l-o),n,gt((r+a)/2,(e+s)/2,(o+l)/2))}function py(i,t){if(!i.pos.length&&!t.pos.length)return null;let e=new pe,n=s=>{let r=new Float32Array(i[s].length+t[s].length);return r.set(i[s],0),r.set(t[s],i[s].length),r};return e.setAttribute("position",new ue(n("pos"),3)),e.setAttribute("normal",new ue(n("nor"),3)),e.setAttribute("color",new ue(n("col"),3)),e.computeBoundingSphere(),e}function tl(i,t,e,n,s,r,o,a,l){let c=Math.hypot(n-t,s-e);c<.05||i.add(new Ct(c,a,o),l,gt((t+n)/2,r,(e+s)/2,-Math.atan2(s-e,n-t)))}var my=[12603466,4880064,4168298,14070076,3092275];function gy(){let i=new pe,t=[-.5,-.5,.5,.5,-.5,.5,.5,.5,.5,-.5,.5,.5,-.5,.5,.5,.5,.5,.5,.5,.5,-.5,-.5,.5,-.5],e=[0,0,1,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,1,0];return i.setAttribute("position",new qt(t,3)),i.setAttribute("normal",new qt(e,3)),i.setIndex([0,1,2,0,2,3,4,5,6,4,6,7]),i.computeBoundingSphere(),i}function af(i,t){let e=i.G,n=(M,C)=>i.cellAt(M,C),s=M=>M===e.road||M===e.sidewalk||M===e.bike,r=new Ae,o=gy(),a=new Map,l=(M,C)=>{let N=cy(M,C),O=a.get(N);return O||a.set(N,O={parts:[],lamps:[],props:[],trees:[],paint:[],rails:[],strips:[],signs:[]}),O};i.buildings.forEach((M,C)=>!M.landmark&&l(M.x+M.w/2,M.y+M.h/2).parts.push([M,C]));for(let M of i.lamps)l(M.x,M.y).lamps.push(M);for(let M of i.props)l(M.x,M.y).props.push(M);let c=of(91);for(let M of i.trees){let C=c(),N=M.canopy/2.7*(.9+c()*.2);l(M.x,M.y).trees.push({pick:C,m:gt(M.x,.1,M.y,c()*Math.PI*2,N,N*(.92+c()*.16),N)})}let h=i.roads.filter(M=>!M.foot&&M.kind!=="service"),u=new Map;for(let M of h)for(let[C,N]of[[0,1],[M.pts.length-1,M.pts.length-2]]){let O=`${Math.round(M.pts[C][0])},${Math.round(M.pts[C][1])}`;u.has(O)||u.set(O,[]),u.get(O).push({r:M,p:M.pts[C],q:M.pts[N]})}for(let M of h){if(M.w<9||M.bridge)continue;let C=0;for(let N=0;N+1<M.pts.length;N++){let[O,I]=M.pts[N],[G,X]=M.pts[N+1],U=Math.hypot(G-O,X-I);for(let V=C;V<U;V+=6){let P=Math.min(U,V+3);V>9&&P<U-9&&l(O,I).paint.push([O+(G-O)*V/U,I+(X-I)*V/U,O+(G-O)*P/U,I+(X-I)*P/U,.16])}C=0}}for(let M of u.values())if(!(M.length<3)){{let{r:C,p:N,q:O}=M[0],I=Math.hypot(O[0]-N[0],O[1]-N[1])||1,G=(O[0]-N[0])/I,X=(O[1]-N[1])/I,U=C.w/2+1;l(N[0],N[1]).signs.push([N[0]+G*(C.w/2+3)-X*U,N[1]+X*(C.w/2+3)+G*U,1])}for(let{r:C,p:N,q:O}of M){let I=Math.hypot(O[0]-N[0],O[1]-N[1]);if(I<14||C.w<7)continue;let G=(O[0]-N[0])/I,X=(O[1]-N[1])/I,U=C.w/2+4.5;for(let V=-C.w/2+.7;V<C.w/2-.5;V+=1.1){let P=N[0]+G*U-X*V,L=N[1]+X*U+G*V;l(P,L).paint.push([P-G*1.4,L-X*1.4,P+G*1.4,L+X*1.4,.55])}}}i.spawns.cars.forEach((M,C)=>{if(C<2||C%6)return;let N=-Math.sin(M.heading),O=Math.cos(M.heading);for(let I of[1,-1]){let G=M.x+N*I*2.9,X=M.y+O*I*2.9;if(n(G,X)===e.sidewalk){l(G,X).signs.push([G,X,0]);break}}});for(let M of i.roads)for(let C=0;C+1<M.pts.length;C++){let[N,O]=M.pts[C],[I,G]=M.pts[C+1],X=Math.hypot(I-N,G-O);if(X<.2)continue;let U=(I-N)/X,V=(G-O)/X,P=-V,L=U,A=l((N+I)/2,(O+G)/2).strips,B=M.foot?M.w/2:M.w/2+1,Z=(Y,et,ht,j,ct,pt=B)=>A.push([N-U*pt+P*Y,O-V*pt+L*Y,I+U*pt+P*Y,G+V*pt+L*Y,et,ht,j,ct]);if(M.foot){M.kind==="cycleway"?Z(0,M.w,.128,13660252,"asphalt"):Z(0,M.w,.126,M.kind==="pedestrian"?16777215:15259312,"slabs");continue}let k=M.kind==="service"?1.2:3;if(Z(0,M.w+k*2+1,.124,16777215,"slabs",B+k),Z(0,M.w,.13,16777215,"asphalt"),M.bike)for(let Y of[-1,1])Z(Y*(M.w/2-.85),1.7,.133,13660252,"asphalt",B-1);for(let Y of[-1,1])Z(Y*(M.w/2+.12),.24,.15,11841704,"trimB",0)}for(let M of i.bridges)for(let C=0;C+1<M.pts.length;C++){let[N,O]=M.pts[C],[I,G]=M.pts[C+1],X=Math.hypot(I-N,G-O);if(X<1)continue;let U=-(G-O)/X,V=(I-N)/X;for(let P of[-1,1])l(N,O).rails.push([N+U*P*(M.w/2-.2),O+V*P*(M.w/2-.2),I+U*P*(M.w/2-.2),G+V*P*(M.w/2-.2)])}let d=(M,C)=>[-.3,0,.3].map(N=>n(M.x+M.tx*M.L*N+M.nx*C,M.z+M.tz*M.L*N+M.nz*C)),f={blocked:M=>d(M,1.5).filter(C=>C===e.building).length>=2,street:M=>d(M,5).some(s)};function*m(M){let[C,N]=M.split(",").map(Number),O=C*Ke,I=N*Ke,G=Math.min(i.width,O+Ke),X=Math.min(i.height,I+Ke),U=hy(),V=a.get(M)||{parts:[],lamps:[],props:[],trees:[],paint:[],rails:[],strips:[],signs:[]};if(O<i.width&&I<i.height){for(let P of wi(i,e.road,O,I,G,X))Ti(U.asphalt,P,.12,16777215);for(let P of wi(i,e.bike,O,I,G,X))Ti(U.asphalt,P,.12,13660252);for(let P of wi(i,e.sidewalk,O,I,G,X))Ti(U.slabs,P,.12,16777215);for(let P of wi(i,e.slab,O,I,G,X))Ti(U.slabs,P,.12,15525594);for(let P of wi(i,e.path,O,I,G,X))Ti(U.slabs,P,.11,15259312);for(let P of wi(i,e.deck,O,I,G,X))Ti(U.slabs,P,.12,14275786,-.9);for(let P of wi(i,e.building,O,I,G,X))Ti(U.slabs,P,.13,6971992);for(let P of wi(i,e.grass,O,I,G,X))Ti(U.grass,P,.1,16777215);yield,y(U,O,I,G,X),yield}for(let[P,L,A,B,Z,k,Y,et]of V.strips)tl(U[et],P,L,A,B,k-.02,Z,.04,Y);for(let[P,L,A,B,Z]of V.paint)tl(U.slabs,P,L,A,B,.138,Z,.02,16777215);for(let[P,L,A,B]of V.rails){tl(U.trimB,P,L,A,B,-.4,.5,1.1,9077368);let Z=Math.hypot(A-P,B-L);Qa(U.props,gt(P,.12,L,-Math.atan2(B-L,A-P)),Z)}for(let[P,L]of V.parts){let A=P.house,B=A.parts===1;dy(U,{x:P.x,y:P.y,w:P.w,h:P.h,height:P.height,roof:B?A.roof:Math.min(P.w,P.h)>=9?"gable":"flat",facadeIndex:A.facade,roofIndex:A.facade%3,seed:A.seed+L%7*.013,shop:A.shop},L,f),yield}for(let[P,L,A]of V.signs)Qc(U.props,gt(P,.12,L),2.7),U.signs.push([P,L,A]);for(let P of V.lamps){let L=Math.atan2(P.ax||0,P.ay||1),A=gt(P.x,.12,P.y,L);Us(U.props,Fs("lamp",B=>$c(B,gt(0,0,0),1)),A),U.lanterns.push(A.clone().multiply(gt(0,4.64,1.12)))}for(let P of V.props)if(P.kind==="bench")Us(U.props,Fs("bench",L=>jc(L,gt(0,0,0))),gt(P.x,.12,P.y,-(P.rot||0)));else if(P.kind==="bin")Us(U.props,Fs("bin",L=>eh(L,gt(0,0,0))),gt(P.x,.12,P.y));else if(P.kind==="rack"){let L=P.n||4;Us(U.props,Fs(`rack${L}`,A=>Zc(A,gt(0,0,0),L)),gt(P.x-L*.8/2,.12,P.y));for(let A=0;A<L;A++)(A*7+Math.round(P.x))%4!==0&&Us(U.props,Fs(`bike${A%5}`,B=>kr(B,gt(0,0,0,Math.PI/2),my[A%5])),gt(P.x-L*.8/2+A*.8,.12,P.y))}yield,E(M,U,V)}function y(M,C,N,O,I){let G=i.width,X=(U,V,P,L,A,B)=>{let Z=-1;for(let k=P;k<=L;k++){let Y=k<L&&U(k);if(Y&&Z<0&&(Z=k),!Y&&Z>=0){if(k-Z>=3){let[et,ht,j,ct]=A?[Z,V+.45*B+.5,k,V+.45*B+.5]:[V+.45*B+.5,Z,V+.45*B+.5,k];tl(M.hedge,et,ht,j,ct,.55,.75,.9,10139768);let pt=k-Z;for(let lt=.5;lt<pt;lt+=1.3){let _t=A?Z+lt:et,Dt=A?ht:Z+lt;M.hedge.add(new Bn(.55,1),11061380,gt(_t,.92,Dt))}(Z+V)%3===0&&Qa(M.props,gt(A?Z:et-B*.6,.12,A?ht-B*.6:Z,A?0:-Math.PI/2),pt)}Z=-1}}};for(let U=N;U<I;U++)for(let V of[-1,1])U+V<0||U+V>=i.height||X(P=>i.cells[U*G+P]===e.grass&&[e.sidewalk,e.slab].includes(i.cells[(U+V)*G+P]),U,C,O,!0,V<0?-1:1);for(let U=C;U<O;U++)for(let V of[-1,1])U+V<0||U+V>=G||X(P=>i.cells[P*G+U]===e.grass&&[e.sidewalk,e.slab].includes(i.cells[P*G+U+V]),U,N,I,!1,V<0?-1:1)}let p=new Map,g=new Map,_=M=>M.pos.length?M.build({outline:!1}):null;function E(M,C,N){let O=[],I=(X,U,V=!0,P=!0)=>{if(!X)return;let L=X.isInstancedMesh?X:new re(X,U);L.castShadow=V,L.receiveShadow=P,r.add(L),O.push(L)};if(I(_(C.asphalt),t.asphalt,!1),I(_(C.slabs),t.slabs,!1),I(_(C.grass),t.grass,!1),I(_(C.hedge),t.hedge),I(_(C.wall),t.wall),I(_(C.roof),t.roof),I(py(C.trimB,C.props),t.plain,!1),I(C.trim.mesh(t.trimI,o),null,!1),I(C.glass.mesh(t.glassI,o),null,!1),C.signs.length){let X=[],U=[];for(let[P,L,A]of C.signs){let B=A===1?1.6:.7,Z=A===1?.4:.7,k=2.7+Z/2,Y=[[-B/2,-Z/2,0,0],[B/2,-Z/2,1,0],[B/2,Z/2,1,1],[-B/2,-Z/2,0,0],[B/2,Z/2,1,1],[-B/2,Z/2,0,1]];for(let[et,ht,j,ct]of Y)X.push(P+et,k+ht,L+.06),U.push((A+j)/4,ct)}let V=new pe;V.setAttribute("position",new qt(X,3)),V.setAttribute("uv",new qt(U,2)),V.computeVertexNormals(),V.computeBoundingSphere(),I(V,T,!1,!1)}if(C.lanterns.length){let X=new hn(v,t.lantern,C.lanterns.length);C.lanterns.forEach((U,V)=>X.setMatrixAt(V,U)),X.computeBoundingSphere(),I(X,null,!1,!1)}let G={meshes:O,trees:[],plan:N};p.set(M,G),R(G)}let v=Jc(),T=new Me({map:Kc(),roughness:.5,side:Ge});function R(M){for(let O of M.trees)r.remove(O);M.trees=[];let C=nf(),N=new Map;for(let O of M.plan.trees){let I=Math.min(C.length-1,Math.floor(O.pick*C.length));N.has(I)||N.set(I,[]),N.get(I).push(O.m)}for(let[O,I]of N)for(let[G,X]of C[O].parts(t)){let U=new hn(G,X,I.length);I.forEach((V,P)=>U.setMatrixAt(P,V)),U.computeBoundingSphere(),U.castShadow=!0,U.receiveShadow=!0,r.add(U),M.trees.push(U)}}function x(M){let C=p.get(M);if(C){for(let N of[...C.meshes,...C.trees])r.remove(N),N.geometry!==o&&N.geometry!==v&&!C.trees.includes(N)&&N.geometry.dispose(),N.isInstancedMesh&&N.dispose();p.delete(M)}}let S=190;function F(M,C,N=4){let O=performance.now(),I=[],G=Math.ceil(S/Ke),X=Math.floor(M/Ke),U=Math.floor(C/Ke);for(let V=X-G;V<=X+G;V++)for(let P=U-G;P<=U+G;P++){if(V<-1||P<-1||V*Ke>i.width||P*Ke>i.height)continue;let L=Math.hypot((V+.5)*Ke-M,(P+.5)*Ke-C);L<S&&I.push([L,`${V},${P}`])}I.sort((V,P)=>V[0]-P[0]);for(let[,V]of I){if(p.has(V))continue;let P=g.get(V);for(P||g.set(V,P=m(V));performance.now()-O<N;)if(P.next().done){g.delete(V);break}if(performance.now()-O>=N)break}for(let V of[...p.keys()]){let[P,L]=V.split(",").map(Number);Math.hypot((P+.5)*Ke-M,(L+.5)*Ke-C)>S+Ke*1.5&&x(V)}}return{group:r,update:F,get pieces(){return p.size},rebuildTrees(){for(let M of p.values())R(M)}}}var Hr=10766902,lf=9322288,Ai=3962212,rh=13222066,cf=12610130,zr=15920354;function xy(i){let t=i.length,e=i.reduce((p,g)=>p+g[0],0)/t,n=i.reduce((p,g)=>p+g[1],0)/t,s=0,r=0,o=0;for(let[p,g]of i)s+=(p-e)**2,r+=(g-n)**2,o+=(p-e)*(g-n);let a=.5*Math.atan2(2*o,s-r),l=Math.cos(a),c=Math.sin(a),h=1/0,u=-1/0,d=1/0,f=-1/0;for(let[p,g]of i){let _=(p-e)*l+(g-n)*c,E=-(p-e)*c+(g-n)*l;h=Math.min(h,_),u=Math.max(u,_),d=Math.min(d,E),f=Math.max(f,E)}let m=(h+u)/2,y=(d+f)/2;return{x:e+l*m-c*y,z:n+c*m+l*y,angle:a,L:u-h,W:f-d}}function hf(i,t){let e=new Ae,n=new Ee,s=new Ee,r=new Ee,o=[Math.cos(i.north+Math.PI/2),Math.sin(i.north+Math.PI/2)];for(let c of i.houses){if(!c.landmark||!c.outline)continue;let h=xy(c.outline),u=gt(h.x,0,h.z,-h.angle),d=Math.cos(h.angle)*o[0]+Math.sin(h.angle)*o[1]<0?-1:1,f=(m,y,p,g=0)=>u.clone().multiply(gt(m*d,y,p,g));c.landmark==="domkyrkan"&&_y(n,s,r,f,h,d),c.landmark==="slottet"&&yy(n,s,r,f,h,d)}let a=i.places.gunillaklockan;a&&vy(n,s,r,(c,h,u,d=0)=>gt(a[0]+c,h,a[1]+u,d));let l=(c,h)=>{if(!c.pos.length)return;let u=new re(c.build({outline:!1}),h);u.castShadow=!0,u.receiveShadow=!0,e.add(u)};return l(n,t.wall),l(s,t.plain),l(r,t.plain),e}function _y(i,t,e,n,s){let r=Math.max(60,s.L),o=Math.min(Math.max(18,s.W*.75),26),a=22,l=-r/2;i.add(new Ct(r-16,a,o),Hr,n(8,a/2,0)),t.add(Ei(r-16,o,14,.5),Ai,n(8,a,0)),i.add(new Ct(14,a,o+18),Hr,n(4,a/2,0)),t.add(Ei(o+18,14,12,.5),Ai,n(4,a,0,Math.PI/2)),i.add(new he(o/2,o/2,a,10,1,!1,0,Math.PI),Hr,n(r/2-8,a/2,0,-Math.PI/2)),t.add(new un(o/2+.5,12,10,1,!1,0,Math.PI),Ai,n(r/2-8,a+6,0,-Math.PI/2));for(let h=l+22;h<r/2-10;h+=6)for(let u of[-1,1])Math.abs(h-4)<9||(e.add(new Ct(1.4,a*.8,1.6),lf,n(h,a*.4,u*(o/2+.8))),e.add(new Ct(2.2,8,.3),4016732,n(h+3,a*.55,u*(o/2+.05))),e.add(new un(1.1,2.2,4),4016732,n(h+3,a*.55+5,u*(o/2+.05)).multiply(new Xt().makeScale(1,1,.15))));let c=11;for(let h of[-1,1]){let u=h*(o/2-c/2+2);i.add(new Ct(c,46,c),Hr,n(l+c/2,23,u));for(let d of[16,30,42])e.add(new Ct(c+.6,.6,c+.6),lf,n(l+c/2,d,u));for(let d of[20,34])e.add(new Ct(.3,5,2),2764600,n(l-.05,d,u));t.add(new he(c*.42,c*.5,4,8),Ai,n(l+c/2,48,u)),t.add(new un(c*.42,30,8),Ai,n(l+c/2,65,u)),e.add(new sn(.7,8,6),13937224,n(l+c/2,80.5,u))}i.add(new Ct(c,30,o-2*c+4),Hr,n(l+c/2,15,0)),e.add(new he(3.2,3.2,.4,16),4016732,n(l-.1,22,0).multiply(new Xt().makeRotationZ(Math.PI/2))),e.add(new Ct(.6,9,5),4861474,n(l-.2,4.5,0)),e.add(new un(2.6,3,4),rh,n(l-.3,10.5,0).multiply(new Xt().makeScale(.2,1,1)))}function yy(i,t,e,n,s){let r=Math.max(70,s.L*.95),o=Math.min(Math.max(14,s.W*.45),22),a=17;e.add(new Ct(r+16,1.6,o+16),rh,n(0,.8,0)),i.add(new Ct(r,a,o),cf,n(0,a/2+1.6,0)),t.add(Ei(r,o,7,.6),4080198,n(0,a+1.6,0));for(let l of[6,11.5])e.add(new Ct(r+.3,.35,o+.3),zr,n(0,l+1.6,0));e.add(new Ct(r+.8,.6,o+.8),zr,n(0,a+1.6,0));for(let l=-r/2+3;l<r/2-2;l+=3.4)for(let c of[-1,1])for(let h of[4,9.5,14])e.add(new Ct(1.3,2.1,.2),3819094,n(l,h+1.6,c*(o/2+.05)));for(let[l,c,h]of[[-1,9,30],[1,7,26]]){let u=l*(r/2);i.add(new he(c,c+.6,h,16),cf,n(u,h/2+1.6,o/2-c*.4)),e.add(new he(c+.4,c+.4,.6,16),zr,n(u,h+1.6,o/2-c*.4)),t.add(new sn(c,16,8,0,Math.PI*2,0,Math.PI/2),4080198,n(u,h+1.6,o/2-c*.4)),t.add(new he(1.2,1.4,3,8),4080198,n(u,h+c+2.8,o/2-c*.4)),t.add(new un(1.4,3,8),4080198,n(u,h+c+5.6,o/2-c*.4));for(let d=0;d<8;d++){let f=d/8*Math.PI*2;for(let m of[8,14,20])e.add(new Ct(1.2,2,.3),3819094,n(u+Math.cos(f)*(c+.05),m+1.6,o/2-c*.4+Math.sin(f)*(c+.05),-f+Math.PI/2))}}e.add(new Ct(4,6,.6),zr,n(0,4.6,o/2+.2)),e.add(new Ct(2.6,4.4,.7),3877408,n(0,3.8,o/2+.25))}function vy(i,t,e,n){i.add(new Ct(5,9,5),15179914,n(0,4.5,0)),e.add(new Ct(5.6,.5,5.6),zr,n(0,9,0));for(let s of[0,Math.PI/2])e.add(new Ct(1.6,2.4,5.1),2763310,n(0,7,0,s));t.add(new he(1.2,3.4,3.4,8),Ai,n(0,10.9,0)),t.add(new sn(1.3,8,6),Ai,n(0,13,0)),t.add(new un(.5,2.4,8),Ai,n(0,15,0)),e.add(new sn(.3,6,4),13937224,n(0,16.3,0)),e.add(new Ct(6.4,.6,6.4),rh,n(0,.3,0))}function uf(i){let t=new Ae,e=i.places,n=(o,a,l,c)=>{let h=document.createElement("canvas");h.width=512,h.height=128;let u=h.getContext("2d");u.fillStyle=a,u.fillRect(0,0,512,128),u.strokeStyle=l,u.lineWidth=8,u.strokeRect(6,6,500,116),u.fillStyle=l,u.font="bold 54px system-ui, sans-serif",u.textAlign="center",u.textBaseline="middle",u.fillText(o,c?290:256,66),c&&c(u);let d=new Rn(h);return d.colorSpace=be,d},s=o=>{o.fillStyle="#ffffff",o.beginPath(),o.moveTo(64,96),o.bezierCurveTo(20,66,26,26,64,44),o.bezierCurveTo(102,26,108,66,64,96),o.fill()},r=(o,a,l,c=6)=>{let h=new re(new De(c,c/4),new Me({map:l,roughness:.6,emissive:16777215,emissiveMap:l,emissiveIntensity:.25}));h.position.set(o,4.2,a),t.add(h);for(let u of[-1,1]){let d=new re(new he(.08,.08,4.2,6),new Me({color:3817028}));d.position.set(o+u*(c/2-.3),2.1,a-.05),t.add(d)}};for(let o of e.vardcentraler)r(o[0],o[1],n("V\xC5RDCENTRAL","#2f8a5a","#ffffff",s));return r(e.polis[0],e.polis[1],n("POLIS","#1f4fae","#ffffff")),r(e.kiosk[0],e.kiosk[1],n("MACKBAREN","#f0a43a","#2a1a10")),r(e.nation[0],e.nation[1],n("PUNSCHBERGS NATION","#d96aa0","#ffffff"),8),t}var y1={height:64,viewShort:30,tiltViewShort:34,center:new z(30,0,-1.5),tiltCenter:new z(30,0,-3.5),tiltDistance:80};var oh={hatch:{L:4.1,body:[[-2.05,.28],[2.05,.28],[2.05,.66],[1.92,.86],[.85,.98],[-1.95,.98],[-2.05,.82]],cabin:[[.8,.95],[.05,1.45],[-1.6,1.45],[-1.98,.95]],roof:[-1.55,0]},sedan:{L:4.6,body:[[-2.3,.3],[2.3,.3],[2.3,.66],[2.15,.84],[1,.96],[-2.15,.96],[-2.3,.8]],cabin:[[.95,.93],[.15,1.42],[-1.25,1.42],[-1.85,.93]],roof:[-1.2,.1]},sport:{L:4.5,body:[[-2.25,.26],[2.25,.26],[2.25,.56],[2.1,.7],[.9,.8],[-2.15,.84],[-2.25,.7]],cabin:[[.7,.78],[-.1,1.18],[-1.2,1.18],[-1.9,.82]],roof:[-1.05,-.2],roofY:1.2},estate:{L:4.8,body:[[-2.4,.3],[2.4,.3],[2.4,.66],[2.25,.86],[1.05,.98],[-2.35,.98],[-2.4,.82]],cabin:[[1,.95],[.2,1.48],[-2.15,1.48],[-2.3,.95]],roof:[-2.05,.15]}},Gr=1.8;function df(i,t,e){let n=new _n;i.forEach(([r,o],a)=>a?n.lineTo(r,o):n.moveTo(r,o)),n.closePath();let s=new _i(n,{depth:t,bevelEnabled:!0,bevelThickness:e,bevelSize:e,bevelSegments:3,curveSegments:2});return s.translate(0,0,-t/2),s}function My(i,t,e,n,s){let r=new _n,o=.25,a=e/2;r.moveTo(i+o,-a),r.lineTo(t-o,-a),r.quadraticCurveTo(t,-a,t,-a+o),r.lineTo(t,a-o),r.quadraticCurveTo(t,a,t-o,a),r.lineTo(i+o,a),r.quadraticCurveTo(i,a,i,a-o),r.lineTo(i,-a+o),r.quadraticCurveTo(i,-a,i+o,-a);let l=new _i(r,{depth:s,bevelEnabled:!0,bevelThickness:.05,bevelSize:.1,bevelSegments:2,curveSegments:3});return l.rotateX(Math.PI/2),l.translate(0,n+s,0),l}function ah(i){let t=oh[i],e=new Ee;e.add(df(t.body,Gr-.5,.25),16777215),e.add(My(t.roof[0],t.roof[1],Gr-.36,t.roofY??1.5,.07),16777215);let n=new Ee;n.add(df(t.cabin,Gr-.5,.08),16777215);let s=new Ee;for(let r of[-1,1])for(let o of[-1,1])s.add(new he(.33,.33,.25,10),1776415,gt(r*(t.L/2-.75),.33,o*(Gr/2-.12)).multiply(new Xt().makeRotationX(Math.PI/2)));for(let r of[-1,1])s.add(new Ct(.3,.16,.42),16774352,gt(t.L/2-.05,.86,r*.55)),s.add(new Ct(.22,.16,.4),13642270,gt(-t.L/2+.02,.9,r*.56)),s.add(new Ct(.22,.1,.12),2236966,gt(.75,1.05,r*(Gr/2+.02)));if(i==="estate")for(let r of[-1,1])s.add(new Ct(2,.06,.06),2763310,gt(-1.05,1.62,r*.62));return i==="hatch"&&s.add(new Ct(.7,.04,.7),2897990,gt(-.75,1.6,0)),{paint:e.build({outline:!1}),glass:n.build({outline:!1}),det:s.build({outline:!1})}}var Sy=.55,by=.9,Ey=.5;function ff(i){let t=i.attributes.normal;if(!t||t.itemSize!==4||t.isInterleavedBufferAttribute)return i;let e=new ar(t.array,4);return i.setAttribute("normal",new _s(e,3,0,!0)),i.setAttribute("rig",new _s(e,1,3,!0)),i}var wy=`
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
  float leg = ${Sy.toFixed(3)} * wk.y * s * w;
  float knee = -${by.toFixed(3)} * wk.y * max(0.0, cos(wk.x) * side) * w * smoothstep(uRig.y + 0.06, uRig.y - 0.04, position.y);
  float sw = -${Ey.toFixed(3)} * wk.y * s * w;
  m1 = rigRot(arm ? 0.0 : knee);
  m2 = rigRot(arm ? sw : leg);
  p1 = vec2(0.0, uRig.y);
  p2 = vec2(0.0, arm ? uRig.z : uRig.x);
  // The body rises a little when a leg is straight under it.
  bob = 0.03 * wk.y * (abs(cos(wk.x)) - 0.5);
}
`;function Ty(i){i.vertexShader=wy+i.vertexShader.replace("#include <beginnormal_vertex>",`#include <beginnormal_vertex>
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
      }`)}function Vr(i,t,e){let n=i.clone(),s={value:new xe(t.hip*t.h,t.knee*t.h,t.shoulder*t.h,t.h)};return n.onBeforeCompile=r=>{r.uniforms.uRig=s,r.uniforms.uWalk=e||{value:new xt},Ty(r)},n.customProgramCacheKey=()=>"walk",n}function nl(i,t){return Vr(new Ms,i,t)}function lh(i){let t=1.3+Math.min(1.6,i*.28);return i/t*Math.PI*2}function ch(i){return Math.min(1,i/1.4)*(.75+.25*Math.min(1,i/5))}var Ay={jacket:15770682,pants:3093568,skin:0,hair:1,scale:1.1},hh=new Map,il={value:new xt},pf={player(i){let t=hh.get("player");if(t)return t.map(s=>Ry(s,i));let e=new Ee;Yc(e,gt(0,0,0),{...Ay,walk:0});let n=e.build({outline:!1});return[new re(n,i.solid),new re(n,i.solid)]}};function Ry(i,t){let e=new Ae;for(let n of i){let s=t[n.mat]||t.solid,r=new re(n.geo,n.rig?Vr(s,n.rig,il):s);n.rig&&(r.customDepthMaterial=nl(n.rig,il)),r.castShadow=!0,e.add(r)}return e}async function mf(i){let t=await fetch(i);if(!t.ok)return null;let e=await t.arrayBuffer(),n=new DataView(e).getUint32(0,!0),s=JSON.parse(new TextDecoder().decode(new Uint8Array(e,4,n))),r=4+n+3&-4,o=(l,c)=>{let h=new l(e,r,c);return r+=h.byteLength,r=r+3&-4,h},a={};for(let[l,c]of Object.entries(s.models))a[l]=c.map(h=>{let u=new pe;return u.setAttribute("position",new ue(o(Float32Array,h.n*3),3)),u.setAttribute("normal",new ue(o(Int8Array,h.n*4),4,!0)),u.setAttribute("color",new ue(o(Uint8Array,h.n*4),4,!0)),h.uv&&u.setAttribute("uv",new ue(o(Float32Array,h.n*2),2)),u.setIndex(new ue(o(h.wide?Uint32Array:Uint16Array,h.index),1)),u.computeBoundingSphere(),h.rig&&ff(u),h.rig?{geo:u,mat:h.mat,rig:h.rig}:{geo:u,mat:h.mat}});return a}function sl(i,t){hh.set(i,t)}function gf(i){return hh.get(i)}var xf={small:["hatch"],car:["sedan","estate","sedan"],sport:["sport"]};function _f(i,t){let e=new Ae,n={},s=new Me({vertexColors:!0,roughness:.34,metalness:.35,envMapIntensity:1.4}),r=U=>{let V=U.reduce((Y,[et])=>Y+(et.index?et.index.count:et.attributes.position.count),0),P=new Float32Array(V*3),L=new Float32Array(V*3),A=new Float32Array(V*3),B=0,Z=new kt;for(let[Y,et]of U){let ht=Y.index?Y.toNonIndexed():Y,j=ht.attributes.position,ct=ht.attributes.normal,pt=ht.attributes.color;et!=null&&Z.set(et);for(let lt=0;lt<j.count;lt++,B++){P.set([j.getX(lt),j.getY(lt),j.getZ(lt)],B*3);let _t=ct.getX(lt),Dt=ct.getY(lt),Q=ct.getZ(lt),ot=Math.hypot(_t,Dt,Q)||1;L.set([_t/ot,Dt/ot,Q/ot],B*3),et!=null?A.set([Z.r,Z.g,Z.b],B*3):A.set([pt.getX(lt),pt.getY(lt),pt.getZ(lt)],B*3)}}let k=new pe;return k.setAttribute("position",new ue(P,3)),k.setAttribute("normal",new ue(L,3)),k.setAttribute("color",new ue(A,3)),k.computeBoundingSphere(),k},o=new Map,a=(U,V)=>o.get(U)||o.set(U,V()).get(U),l=new Map,c=U=>{let V=l.get(U);if(!V){let P=new Ee;kr(P,gt(0,0,0),U),l.set(U,V=P.build({outline:!1}))}return V},h=new Map,u=new De(1,1).rotateX(-Math.PI/2).translate(0,.02,0),d=new ze({map:Gc(),transparent:!0,depthWrite:!1,opacity:.8}),f=[],m=U=>{if(U.police){let A=n.sedan||(n.sedan=ah("sedan")),B=(ht,j,ct,pt,lt,_t,Dt)=>[new Ct(ht,j,ct).translate(pt,lt,_t),Dt],Z=a("police",()=>r([[A.paint,16053490],[A.glass,1910323],[A.det,null],B(4,.22,1.86,0,.62,0,2052014),B(.5,.06,1.2,-.3,1.6,0,2763310)])),k=new re(Z,s);k.castShadow=!0;let Y=new Ae;Y.add(k);let et=[2780159,16724016].map((ht,j)=>{let ct=new re(new Ct(.35,.16,.5),new ze({color:ht}));return ct.position.set(-.3,1.7,j?.32:-.32),Y.add(ct),ct});return f.push([U,et]),Y}if(U.spec.class==="car"){let A=xf[U.type]||xf.car,B=A[Math.abs(Cy(U.id))%A.length],Z=n[B]||(n[B]=ah(B)),k=a(`${B}:${U.color}`,()=>r([[Z.paint,U.color],[Z.glass,1910323],[Z.det,null]])),Y=new re(k,s);return Y.scale.set(U.spec.length/oh[B].L,1,U.spec.width/1.8*.98),Y.castShadow=!0,Y.receiveShadow=!0,Y}let V=new re(c(U.color),t.solid);V.scale.setScalar(1.2),V.castShadow=!0;let P=new Ae;P.add(V);let L=new re(u,d);return L.scale.set(2.4,1,.9),P.add(L),P};for(let U of i.vehicles){let V=new Ae;V.add(m(U)),e.add(V),h.set(U,V)}let y=new Ae,p=[],g=()=>{for(let U of p)y.remove(U);p=pf.player(t);for(let U of p)U.visible=!1,U.castShadow=!0,y.add(U)};g(),e.add(y),y.scale.setScalar(1.25);let _=new re(new De(2.6,2.6).rotateX(-Math.PI/2),new ze({map:Vc(),color:16756800,transparent:!0,depthWrite:!1,opacity:1})),E=new re(new un(.45,.8,4).rotateX(Math.PI),new ze({color:16752672,depthTest:!1,transparent:!0,opacity:.95}));E.renderOrder=10,e.add(E);let v=new _n([[0,1.2],[.75,0],[.28,.1],[.28,-.9],[-.28,-.9],[-.28,.1],[-.75,0]].map(([U,V])=>new xt(U,V))),T=new re(new vr(v).rotateX(-Math.PI/2),new ze({color:16756768,depthTest:!1,transparent:!0,opacity:.92}));T.renderOrder=9,e.add(T);let R=new re(new he(1.6,1.6,40,16,1,!0),new ze({color:16760896,transparent:!0,opacity:.35,blending:Qn,depthWrite:!1,side:Ge}));e.add(R);let x=Iy(e,i,t);_.renderOrder=2,e.add(_);let S=Py();e.add(S.mesh);let F=Br(),M=U=>new ze({map:F,color:U,transparent:!0,blending:Qn,depthWrite:!1}),C=[0,1].map(()=>new re(new De(1,1).rotateX(-Math.PI/2),M(16769704))),N=[0,1].map(()=>new re(new De(1,1).rotateX(-Math.PI/2),M(16724e3)));for(let U of[...C,...N])U.renderOrder=3,U.visible=!1,e.add(U);let O=0,I=0;function G(U,V){for(let[pt,lt]of h)lt.userData.x===pt.x&&lt.userData.y===pt.y&&lt.userData.h===pt.heading||(lt.position.set(pt.x,.14,pt.y),lt.rotation.y=-pt.heading,lt.userData.x=pt.x,lt.userData.y=pt.y,lt.userData.h=pt.heading);let P=i.player,L=P.vehicle,A=L&&L.spec.class==="car";y.visible=!A;let B=Math.hypot(P.vx,P.vy),Z=L&&L.spec.class==="bike";p.forEach((pt,lt)=>pt.visible=lt===(Z?1:0));let k=Z||P.stun>0?0:B;O=(O+U*lh(k))%(Math.PI*2),I+=(ch(k)-I)*Math.min(1,U*8),il.value.set(O,I);let Y=L||P;y.position.set(Y.x,Z?.14+.35:.14,Y.y),y.rotation.y=-(L?L.heading:P.heading),P.stun>0?(y.rotation.z=Math.PI/2.4,y.visible=Math.floor(i.time*10)%2===0):y.rotation.z=0,_.visible=!A,_.position.set(Y.x,.16,Y.y);let et=1+.12*Math.sin(i.time*5);_.scale.set(et,1,et),E.position.set(Y.x,(A?3.2:3)+.2*Math.sin(i.time*4),Y.y),E.rotation.y=i.time*2;let ht=i.play,j=ht&&ht.target;if(T.visible=R.visible=!!j,j){let pt=Math.atan2(j.y-Y.y,j.x-Y.x),lt=A?4.2:2.4;T.position.set(Y.x+Math.cos(pt)*lt,.5,Y.y+Math.sin(pt)*lt),T.rotation.y=-pt-Math.PI/2,T.scale.setScalar(A?1.5:1.1),R.position.set(j.x,20,j.y),R.material.opacity=.25+.12*Math.sin(i.time*3)}for(let[pt,lt]of f){let _t=!!pt.ai,Dt=Math.floor(i.time*6)%2;lt[0].visible=_t?Dt===0:!0,lt[1].visible=_t?Dt===1:!0,lt[0].material.color.setHex(_t?3832831:2047887),lt[1].material.color.setHex(_t?16726586:9379615)}x.update(i.play?i.play.peds:[],U),S.update(i.vehicles);let ct=L&&V>.05;for(let pt of[...C,...N])pt.visible=!!ct;if(ct){let pt=Math.cos(L.heading),lt=Math.sin(L.heading),_t=L.spec.length/2,Dt=L.spec.class==="car";[-.55,.55].forEach((Q,ot)=>{let ut=Dt?11:5,Rt=L.x+pt*(_t+ut/2)-lt*Q*(Dt?1:0),dt=L.y+lt*(_t+ut/2)+pt*Q*(Dt?1:0);C[ot].position.set(Rt,.17,dt),C[ot].rotation.y=-L.heading,C[ot].scale.set(ut,1,Dt?3.2:2.2),C[ot].material.opacity=.5*V,C[ot].visible=Dt||ot===0,N[ot].position.set(L.x-pt*_t-lt*Q,.17,L.y-lt*_t+pt*Q),N[ot].scale.set(1.4,1,1.4),N[ot].material.opacity=(i.braking?.9:.55)*V,N[ot].visible=Dt})}}function X(){g(),x.load()}return{group:e,update:G,views:h,upgrade:X,player:y,poses:()=>p,crowd:x}}function Cy(i){let t=0;for(let e=0;e<i.length;e++)t=t*31+i.charCodeAt(e)|0;return t}function Py(){let t=new De(1,1).rotateX(-Math.PI/2),e=new ze({color:1710878,transparent:!0,opacity:.5,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),n=new hn(t,e,1200);n.count=0,n.frustumCulled=!1,n.renderOrder=1;let s=0,r=new Map,o=new Xt,a=new Le,l=new z(0,1,0);return{mesh:n,update(c){let h=!1;for(let u of c){if(u.spec.class!=="car")continue;let d=Math.cos(u.heading),f=Math.sin(u.heading),m=Math.abs(-u.vx*f+u.vy*d);if(!(u.handbrake&&Math.hypot(u.vx,u.vy)>3||m>2.5)){r.delete(u);continue}let p=u.x-d*u.spec.length*.32,g=u.y-f*u.spec.length*.32,_=u.spec.width*.4,E=[[p+f*_,g-d*_],[p-f*_,g+d*_]],v=r.get(u);if(v)for(let T=0;T<2;T++){let[R,x]=v[T],[S,F]=E[T],M=Math.hypot(S-R,F-x);M<.05||(a.setFromAxisAngle(l,-Math.atan2(F-x,S-R)),o.compose(new z((R+S)/2,.145,(x+F)/2),a,new z(M+.1,1,.26)),n.setMatrixAt(s,o),s=(s+1)%1200,n.count=Math.min(1200,n.count+1),h=!0)}r.set(u,E)}h&&(n.instanceMatrix.needsUpdate=!0)}}}function Iy(i,t,e){let s=null,r=new Xt,o=new Le,a=new An,l=new z,c=new z(1,1,1),h=new kt,u=new WeakMap;return{get sets(){return s},load(){let d=["ped_male","ped_female"].map(f=>gf(f));d.some(f=>!f)||(s=d.map(f=>{let m=f.find(v=>v.mat==="vc"),y=f.find(v=>v.mat==="shirt"),p=m.rig,g=new gi(new Float32Array(80),2).setUsage(mc),_=(v,T)=>{v.geo.setAttribute("walk",g);let R=new hn(v.geo,p?Vr(T,p):T,40);return p&&(R.customDepthMaterial=nl(p)),R.count=0,R.castShadow=!0,R.frustumCulled=!1,i.add(R),R},E=y?_(y,new Me({roughness:.8})):null;return E&&(E.instanceColor=new gi(new Float32Array(120).fill(1),3)),{body:_(m,e.solid),shirt:E,walk:g}}))},update(d,f){if(s){for(let m of s)m.body.count=0,m.shirt&&(m.shirt.count=0);for(let m of d){let y=s[m.kind],p=y.body.count;if(p>=40)continue;let g=m.stand||m.down>0?0:m.pace??m.speed,_=u.get(m);_||u.set(m,_={phase:Math.abs(m.x*1.7)%6.28,amt:0}),_.phase=(_.phase+f*lh(g))%(Math.PI*2),_.amt+=(ch(g)-_.amt)*Math.min(1,f*6),y.walk.setXY(p,_.phase,_.amt),a.set(m.down>0?Math.PI/2:0,-m.heading,0,"YXZ"),o.setFromEuler(a),r.compose(l.set(m.x,.14+(m.down>0?.3:0),m.y),o,c),y.body.setMatrixAt(p,r),y.body.count=p+1,y.shirt&&(y.shirt.setMatrixAt(p,r),y.shirt.setColorAt(p,h.setHex(m.shirt)),y.shirt.count=p+1)}for(let m of s)m.body.instanceMatrix.needsUpdate=!0,m.walk.needsUpdate=!0,m.shirt&&(m.shirt.instanceMatrix.needsUpdate=!0,m.shirt.instanceColor&&(m.shirt.instanceColor.needsUpdate=!0))}}}}var uh={value:new xe(0,0,1.54,2.6)};function on(i,t=1e4){let e=i.onBeforeCompile,n=i.customProgramCacheKey?i.customProgramCacheKey.bind(i):()=>"";return i.onBeforeCompile=(s,r)=>{e&&e(s,r),s.uniforms.uCut=uh,s.vertexShader=`varying vec3 vCutP;
`+s.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
      vec4 cutP = vec4(transformed, 1.0);
      #ifdef USE_INSTANCING
        cutP = instanceMatrix * cutP;
      #endif
      vCutP = (modelMatrix * cutP).xyz;`),s.fragmentShader=`uniform vec4 uCut;
varying vec3 vCutP;
`+s.fragmentShader.replace("void main() {",`void main() {
      float cutD = vCutP.z - uCut.y;
      ${t>1e3?"if (cutD > 1.5 && vCutP.y > min(uCut.w + cutD * uCut.z, 2.8)) discard;":`if (cutD > 0.5 && abs(vCutP.x - uCut.x) < ${t.toFixed(1)} && vCutP.y > uCut.w + cutD * uCut.z && fract(sin(dot(floor(gl_FragCoord.xy), vec2(12.9898, 78.233))) * 43758.5453) < 0.72) discard;`}`)},i.customProgramCacheKey=()=>"cut"+t+n(),i}var dh=i=>new URL(`models/${i}`,document.baseURI).href;async function yf(){let i=[];try{let r=await fetch(dh("index.json"));r.ok&&(i=(await r.json()).files||[])}catch{i=[]}let t=r=>i.includes(r)?mf(dh(r)).catch(()=>null):null,[e,n,s]=await Promise.all([t("trees.bin"),t("bikes.bin"),t("people.bin")]);if(e&&ef(e),n&&sl("bikes",n),s){for(let[r,o]of Object.entries(s))r.startsWith("ped_")&&sl(r,o);s.player_stand&&s.player_ride&&sl("player",[s.player_stand,s.player_ride])}}async function vf(i){let t={};return await Promise.all(["leafA","leafB","barkA","barkB"].map(async e=>{let n=await i(dh(`tex/${e}.webp`));n&&(n.wrapS=n.wrapT=fi,t[e]=n)})),t}var fh=Va.degToRad(33),Mf=24,Ly=i=>new URL(`stiltest/tex/${i}.webp`,document.baseURI).href,Dy=i=>new URL(`stiltest/tex/small/${i}.webp`,document.baseURI).href,Sf={value:.25};function Ny(i){return i.onBeforeCompile=t=>{t.uniforms.uLit=Sf,t.fragmentShader=`uniform float uLit;
`+t.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
      #ifdef USE_INSTANCING_COLOR
        totalEmissiveRadiance += vColor * step(0.97, vColor.r) * uLit;
      #endif`)},i.customProgramCacheKey=()=>"litwin",i}var Os={low:{name:"L\xE5g",ratio:1,shadow:0},medium:{name:"Medel",ratio:1.5,shadow:1024},high:{name:"H\xF6g",ratio:2,shadow:2048}};async function bf(i,t){let e=new qa({antialias:!0,powerPreference:"high-performance"});e.outputColorSpace=be,e.toneMapping=As,e.toneMappingExposure=1.15,e.shadowMap.enabled=!0,e.shadowMap.type=ki,i.appendChild(e.domElement);let n=["asphalt","slabs","grass","plaster","roof","foliage"],s=(P,L)=>(globalThis.__times||(globalThis.__times=[])).push([P,Math.round(performance.now()-L)]),r=performance.now(),o=Object.fromEntries(await Promise.all(n.map(async P=>[P,await Or(Dy(P))]))),a=new kt(14267530),l=new xs;l.background=a,l.fog=new gs(a,70,150),s("textures",r),r=performance.now(),l.environment=Wc(e),s("env",r);let c={asphalt:ii(o.asphalt,6,{vertexColors:!0,roughness:.92,vary:.7}),slabs:ii(o.slabs,4,{vertexColors:!0,roughness:.88,vary:.5}),grass:ii(o.grass,4,{vertexColors:!0,roughness:1,vary:.8}),wall:on(ii(o.plaster,5,{vertexColors:!0,roughness:.95,vary:.6})),roof:on(ii(o.roof,.7,{vertexColors:!0,roughness:.8,vary:.9})),leaf:on(ii(o.foliage,3.6,{vertexColors:!0,roughness:.9,triplanar:!0,mapNormal:!0}),4.5),hedge:on(ii(o.foliage,2.4,{vertexColors:!0,roughness:.9,triplanar:!0}),4.5),wood:on(new Me({vertexColors:!0,roughness:.95}),4.5),plain:on(new Me({vertexColors:!0,roughness:.75,envMapIntensity:.4})),solid:new Me({vertexColors:!0,roughness:.75,envMapIntensity:.4}),paint:new Me({vertexColors:!0,roughness:.6,color:15131612,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),trimI:on(new Me({roughness:.7,envMapIntensity:.4})),darkI:on(new Me({roughness:.9,envMapIntensity:.3})),glassI:on(Ny(new Me({roughness:.12,metalness:.3,envMapIntensity:.9}))),lantern:on(new ze({color:16773320}))},h=P=>P?on(new Me({map:P,alphaTest:.45,side:Ge,vertexColors:!0,roughness:.85,envMapIntensity:.5}),4.5):c.leaf,u=P=>P?on(new Me({map:P,vertexColors:!0,roughness:.95}),4.5):c.wood;Object.assign(c,{leafV:on(new Me({vertexColors:!0,roughness:.9}),4.5),vc:c.solid});let d=t.map,f=af(d,c);l.add(f.group),l.add(hf(d,c)),l.add(uf(d)),f.update(t.player.x,t.player.y,1/0);let m=new re(new De(d.width+40,d.height+40).rotateX(-Math.PI/2),new Me({color:3103344,roughness:.15,metalness:.2,envMapIntensity:1.2}));m.position.set(d.width/2,-.85,d.height/2),m.receiveShadow=!0,l.add(m);let y=new Ae,p=200;for(let[P,L,A,B]of[[-p/2,d.height/2,p,d.height+p*2],[d.width+p/2,d.height/2,p,d.height+p*2],[d.width/2,-p/2,d.width,p],[d.width/2,d.height+p/2,d.width,p]]){let Z=new De(A,B).rotateX(-Math.PI/2),k=new Float32Array(Z.attributes.position.count*3).fill(.75);Z.setAttribute("color",new ue(k,3));let Y=new re(Z,c.grass);Y.position.set(P,.08,L),Y.receiveShadow=!0,y.add(Y)}l.add(y);let g=new ze({map:Br(),color:16760944,transparent:!0,blending:Qn,depthWrite:!1,opacity:.3}),_=new hn(new De(1,1).rotateX(-Math.PI/2),g,d.lamps.length);d.lamps.forEach((P,L)=>{let A=new Xt().compose(new z(P.x+(P.ax||0)*1.1,.14,P.y+(P.ay||0)*1.1),new Le,new z(7,1,7));_.setMatrixAt(L,A)}),_.renderOrder=2,l.add(_);let E=_f(t,c);l.add(E.group);let v=new Bi(16754760,8.2);v.castShadow=!0,v.shadow.bias=-4e-4,v.shadow.normalBias=.05,v.shadow.radius=3;let T=new z(-52,24,34).normalize();l.add(v,v.target);let R=new bs(11841728,8016948,.85);l.add(R);let x=new Bi(10135760,.3);x.position.set(60,30,-10),l.add(x);let S=new tn(Mf,1,4,260),F={x:t.player.x,z:t.player.y,metres:0},M="medium";function C(P){M=P;let L=Os[P];e.setPixelRatio(Math.min(window.devicePixelRatio||1,L.ratio)),v.castShadow=L.shadow>0,L.shadow&&(v.shadow.mapSize.set(L.shadow,L.shadow),v.shadow.map&&(v.shadow.map.dispose(),v.shadow.map=null)),N()}function N(){let P=i.clientWidth||window.innerWidth,L=i.clientHeight||window.innerHeight;e.setSize(P,L,!1),e.domElement.style.width="100%",e.domElement.style.height="100%",S.aspect=P/L,S.updateProjectionMatrix()}window.addEventListener("resize",N),C("medium");function O(){let P=t.player.vehicle;if(!P)return 24;let L=Math.hypot(P.vx,P.vy);return P.spec.class==="car"?28+L*.6:26+L*.5}let I={sun:new kt(16754760),sky:new kt(11841728),ground:new kt(8016948),haze:new kt(14267530)},G={sun:new kt(16747072),sky:new kt(4872842),ground:new kt(2761776),haze:new kt(3817568)},X=-1;function U(P){let L=t.player,A=L.vehicle||L,B=L.vehicle?1.1:.25,Z=(F.metres||24)*.32,k=A.vx*B,Y=A.vy*B,et=Math.hypot(k,Y);et>Z&&(k*=Z/et,Y*=Z/et);let ht=A.x+k,j=A.y+Y,ct=1-Math.exp(-6*P);F.metres===0&&(F.x=ht,F.z=j,F.metres=O()),F.x+=(ht-F.x)*ct,F.z+=(j-F.z)*ct,F.metres+=(O()-F.metres)*(1-Math.exp(-2*P));let pt=0,lt=0;t.shake>0&&(pt=(Math.random()-.5)*t.shake*.6,lt=(Math.random()-.5)*t.shake*.6);let _t=F.metres/2/Math.tan(Va.degToRad(Mf/2));S.position.set(F.x+pt,Math.cos(fh)*_t,F.z+Math.sin(fh)*_t+lt),S.lookAt(F.x+pt,0,F.z+lt);let Dt=performance.now();V.debugTop?f.update(V.debugTop.x,V.debugTop.y,1e3):f.update(F.x,F.z-F.metres*.3,Math.min(30,Math.max(2,P*250))),V.buildMs=performance.now()-Dt,S.far=_t*2.4+40,S.updateProjectionMatrix(),l.fog.near=_t*1.25,l.fog.far=_t*2.6,uh.value.set(A.x,A.y,1/Math.tan(fh),.9);let Q=F.metres*.62,ot=v.shadow.camera;ot.left=-Q*1.9,ot.right=Q*1.9,ot.top=Q*1.3,ot.bottom=-Q*1.3,ot.near=1,ot.far=260,ot.updateProjectionMatrix();let ut=Q*2/(v.shadow.mapSize.x||1024),Rt=Math.round(F.x/ut)*ut,dt=Math.round((F.z-4)/ut)*ut;v.target.position.set(Rt,0,dt),v.position.set(Rt+T.x*120,T.y*120,dt+T.z*120);let Nt=Zh(t.time+(t.clockOffset||0));Math.abs(Nt-X)>.002&&(X=Nt,v.intensity=8.2*(1-.88*Nt),v.color.copy(I.sun).lerp(G.sun,Nt),R.color.copy(I.sky).lerp(G.sky,Nt),R.groundColor.copy(I.ground).lerp(G.ground,Nt),R.intensity=.85-.35*Nt,l.background.copy(I.haze).lerp(G.haze,Nt),l.fog.color.copy(l.background),e.toneMappingExposure=1.15-.15*Nt,g.opacity=.3+.6*Nt,Sf.value=.25+.95*Nt,c.lantern.color.setRGB(1,.94,.78).multiplyScalar(.9+.8*Nt),E.night=Nt),E.update(P,Nt),V.debugTop&&(S.position.set(V.debugTop.x,V.debugTop.h,V.debugTop.y+V.debugTop.h*.6),S.lookAt(V.debugTop.x,0,V.debugTop.y),S.far=V.debugTop.h*2,l.fog.near=1e4,l.fog.far=2e4,S.updateProjectionMatrix()),e.render(l,S)}e.compileAsync&&await e.compileAsync(l,S).catch(()=>{});let V={frame:U,renderer:e,scene:l,camera:S,setQuality:C,get quality(){return M},city:f,ents:E,async upgradeModels(){let[,P]=await Promise.all([yf(),vf(Or)]);Object.assign(c,{leafA:h(P.leafA),leafB:h(P.leafB),barkA:u(P.barkA),barkB:u(P.barkB)}),f.rebuildTrees(),E.upgrade()},async upgradeTextures(){await Promise.all(n.map(async P=>{let L=await Or(Ly(P)),A=o[P];!L||!A||(A.dispose(),A.image=L.image,A.needsUpdate=!0)}))}};return V}var Uy="3D-grafiken slutade fungera i webbl\xE4saren. Det kan hj\xE4lpa att prova en annan webbl\xE4sare, till exempel Chrome.",Ef="3D-grafiken kunde inte starta i webbl\xE4saren. Det kan hj\xE4lpa att prova en annan webbl\xE4sare, till exempel Chrome.";function wf(){try{return!!document.createElement("canvas").getContext("webgl2")}catch{return!1}}function ph(i){let t=document.getElementById("gl-fail");if(!t){t=document.createElement("div"),t.id="gl-fail",t.setAttribute("role","alert"),t.style.cssText='position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;padding:24px;background:#1d1e20f2;color:#f2f1ee;font:18px/1.45 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;text-align:center';let e=document.createElement("p");e.style.cssText="max-width:520px;margin:0",t.appendChild(e),document.body.appendChild(t)}t.firstChild.textContent=i,t.hidden=!1}function Tf(i,t){i.addEventListener("webglcontextlost",e=>{e.preventDefault(),t(),ph(Uy)})}var Qt=i=>document.getElementById(i),rl=i=>(globalThis.__marks||(globalThis.__marks=[])).push([i,Math.round(performance.now())]);rl("module");async function Oy(){let i={surface:Qt("hud"),joy:Qt("joy"),knob:Qt("joy-knob"),action:Qt("btn-action"),brake:Qt("btn-brake"),speed:Qt("speed"),toast:Qt("toast")};for(let S of document.querySelectorAll("[data-version]"))S.textContent=`v${Th}`;let t=await Ah(new URL("data/map/centrum.json",document.baseURI).href),e=Bh(t),n=Ih(e),s=new URLSearchParams(location.search);s.has("kvall")&&(e.clockOffset=.6*600);let r=Xh(i),o=qh(i);if(rl("game"),!wf()){ph(Ef);return}let a=await bf(Qt("game"),e),l=!1;Tf(a.renderer.domElement,()=>{l=!0,Qt("fps").hidden=!0,window.__fyriskaos&&(window.__fyriskaos.glLost=!0)}),rl("city");let c={quality:s.get("q")||"auto",fps:s.has("fps"),steer:s.get("styrning")==="klassisk"?"classic":"screen"};r.touchSteer=c.steer;let h=Qt("fps"),u=()=>{Qt("set-fps").textContent=c.fps?"Visa fps: p\xE5":"Visa fps: av",Qt("set-quality").textContent=`Grafik: ${c.quality==="auto"?`auto (${Os[a.quality].name})`:Os[c.quality].name}`,Qt("set-steer").textContent=c.steer==="screen"?"Styrning: \xE5t h\xE5llet du drar":"Styrning: klassisk",h.hidden=!c.fps};Qt("btn-settings").addEventListener("click",()=>{Qt("settings").hidden=!Qt("settings").hidden,u()}),Qt("set-close").addEventListener("click",()=>Qt("settings").hidden=!0),Qt("set-fps").addEventListener("click",()=>{c.fps=!c.fps,u()}),Qt("set-steer").addEventListener("click",()=>{c.steer=c.steer==="screen"?"classic":"screen",r.touchSteer=c.steer,u()}),Qt("set-quality").addEventListener("click",()=>{let S=["auto","low","medium","high"];c.quality=S[(S.indexOf(c.quality)+1)%S.length],c.quality!=="auto"&&a.setQuality(c.quality),u()}),c.quality!=="auto"&&Os[c.quality]&&a.setQuality(c.quality),u(),Qt("set-credits").addEventListener("click",()=>Qt("credits").hidden=!1),Qt("credits-close").addEventListener("click",()=>Qt("credits").hidden=!0);let d="";function f(S){let F=S.mission,M=S.target,C=M?Math.round(Math.hypot(M.x-e.player.x,M.y-e.player.y)):0,N="",O="";F&&F.step==="pickup"?(N="Nattmackorna",O=`H\xE4mta mackorna p\xE5 Mackbaren \xB7 ${C} m`):F&&F.step==="deliver"&&(N=`Nattmackorna \xB7 ${Math.max(0,Math.ceil(F.time))} s`,O=`${F.sandwiches} mackor till ${F.label} \xB7 ${C} m`);let I=[S.money,S.stars,Math.round(S.health/5),N,O,S.phone&&S.phone.text,S.ticket>0].join("|");I!==d&&(d=I,Qt("money").textContent=`${S.money} kr`,Qt("stars").textContent=S.stars?"\u2605".repeat(S.stars)+"\u2606".repeat(3-S.stars):"",Qt("health").firstChild.style.width=`${Math.max(0,S.health)}%`,Qt("mission").hidden=!N,Qt("mission-title").textContent=N,Qt("mission-info").textContent=O,Qt("phone").hidden=!S.phone,S.phone&&(Qt("phone-from").textContent=`SMS fr\xE5n ${S.phone.from}`,Qt("phone-text").textContent=S.phone.text),Qt("ticket").hidden=!(S.ticket>0))}let m={cpu:[],build:[],frames:0},y=0,p=performance.now(),g=0,_=0,E=0,v=0,T=-99,R=0;function x(S){if(l)return;let F=Math.min((S-p)/1e3,.1);p=S;let M=performance.now();for(y+=F,r.update();y>=ks;){Wh(e,r,ks);let C=e.events.splice(0);r.enabled&&n.step(ks,C);for(let N of C)N.type==="toast"&&o.toast(N.text);y-=ks}if(f(n.state),a.frame(F),o.update(e,r.enabled?zh(e):null,F),m.cpu.push(performance.now()-M),m.build.push(a.buildMs||0),m.cpu.length>1200&&(m.cpu.shift(),m.build.shift()),m.frames++,R+=F,g++,_+=F,_>=.5){let C=g/_;if(g=0,_=0,c.fps&&(h.textContent=`${Math.round(C)} fps \xB7 ${Os[a.quality].name}`),c.quality==="auto"&&R>3){let N=["low","medium","high"],O=N.indexOf(a.quality);E=C<50?E+.5:0,v=C>=59?v+.5:0,E>=1&&O>0?(a.setQuality(N[O-1]),E=0,T=R,Qt("settings").hidden||u()):v>=8&&O<2&&R-T>20&&(a.setQuality(N[O+1]),v=0,Qt("settings").hidden||u())}}requestAnimationFrame(x)}requestAnimationFrame(S=>{p=S;let F=performance.now();x(S),(globalThis.__times||(globalThis.__times=[])).push(["firstFrame",Math.round(performance.now()-F)]),rl("firstFrame"),setTimeout(()=>{a.upgradeModels().then(()=>window.__fyriskaos.modelsReady=!0),a.upgradeTextures()},200)}),Qt("btn-start").addEventListener("click",()=>{Qt("start").hidden=!0,r.enabled=!0;let S=document.documentElement;matchMedia("(pointer: coarse)").matches&&S.requestFullscreen&&S.requestFullscreen({navigationUI:"hide"}).then(()=>screen.orientation?.lock?.("landscape")).catch(()=>{})}),Qt("btn-start").disabled=!1,window.__fyriskaos={game:e,input:r,renderer:a,perf:m,play:n}}Oy().catch(i=>{console.error(i),Qt("error").hidden=!1,Qt("error").textContent="Spelet kunde inte starta p\xE5 den h\xE4r enheten. Prova att ladda om sidan."});
/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
