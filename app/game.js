var ph="0.6.0",Fs=.016666666666666666,en={radius:.35,mass:80,walkSpeed:5.2,response:12,reach:1.3},Wi={bike:{class:"bike",name:"Cykel",label:{enter:"Ta cykeln",exit:"Kliv av"},length:1.8,width:.6,mass:90,circles:[{o:-.55,r:.32},{o:.55,r:.32}],maxSpeed:10,reverseSpeed:1.5,accel:5.5,brake:12,coast:1.2,drag:.05,grip:10,turnRate:3.4,turnRefSpeed:2.5,minTurn:.45,steerGain:2.4,grassFactor:1,fallImpact:4},small:{class:"car",name:"Sm\xE5bil",label:{enter:"Kliv in",exit:"Kliv ur"},length:3.6,width:1.7,mass:950,circles:[{o:-1,r:.85},{o:0,r:.85},{o:1,r:.85}],maxSpeed:19,reverseSpeed:6,accel:7,brake:20,coast:2.5,drag:.08,grip:7,turnRate:2.9,turnRefSpeed:4,minTurn:0,steerGain:2.2,grassFactor:.5,fallImpact:1/0,handbrake:{grip:1.4,turnBoost:2,decel:4,redirect:3}},car:{class:"car",name:"Bil",label:{enter:"Kliv in",exit:"Kliv ur"},length:4.4,width:1.9,mass:1300,circles:[{o:-1.35,r:.95},{o:0,r:.95},{o:1.35,r:.95}],maxSpeed:25,reverseSpeed:6,accel:9,brake:22,coast:2.5,drag:.06,grip:6,turnRate:2.4,turnRefSpeed:5,minTurn:0,steerGain:2,grassFactor:.5,fallImpact:1/0,handbrake:{grip:1.3,turnBoost:2,decel:4,redirect:3}},sport:{class:"car",name:"Sportbil",label:{enter:"Kliv in",exit:"Kliv ur"},length:4.5,width:1.95,mass:1350,circles:[{o:-1.4,r:.97},{o:0,r:.97},{o:1.4,r:.97}],maxSpeed:33.5,reverseSpeed:7,accel:14,brake:26,coast:2.5,drag:.05,grip:6.5,turnRate:2.5,turnRefSpeed:5,minTurn:0,steerGain:2,grassFactor:.45,fallImpact:1/0,handbrake:{grip:1.2,turnBoost:2.1,decel:4,redirect:3}}};async function mh(i){let t=await fetch(i);if(!t.ok)throw new Error(`map ${t.status}`);return Mf(await t.json())}function Mf(i){let{width:t,height:e}=i,n=atob(i.ground.rle),s=new Uint16Array(n.length/2);for(let y=0;y<s.length;y++)s[y]=n.charCodeAt(y*2)|n.charCodeAt(y*2+1)<<8;let r=new Uint8Array(t*e),o=0;for(let y=0;y<s.length;y+=2)r.fill(s[y],o,o+s[y+1]),o+=s[y+1];let a=i.ground.types,l=[];{let y=new Uint8Array(t*e);for(let p=0;p<e;p++)for(let g=0;g<t;g++){let _=p*t+g;if(r[_]!==a.water||y[_])continue;let w=g;for(;w+1<t&&r[_+w+1-g]===a.water&&!y[_+w+1-g];)w++;let v=p;t:for(;v+1<e;){for(let A=g;A<=w;A++)if(r[(v+1)*t+A]!==a.water||y[(v+1)*t+A])break t;v++}for(let A=p;A<=v;A++)y.fill(1,A*t+g,A*t+w+1);l.push({x:g,y:p,w:w-g+1,h:v-p+1})}}let c=i.buildings,h=new Map(c.map(y=>[y.id,y]));for(let y of c)y.parts=0;for(let y of i.parts)h.get(y.b).parts++;let u=i.parts.map(y=>{let p=h.get(y.b);return{x:y.x,y:y.y,w:y.w,h:y.h,house:p,height:p.floors*3.2+1,landmark:p.landmark}}),d=i.places.gunillaklockan;d&&u.push({x:d[0]-3.2,y:d[1]-3.2,w:6.4,h:6.4,house:null,height:16,landmark:"gunillaklockan"});let f=i.start,m=[f.car,f.sport,...i.parked];return{kind:"city",width:t,height:e,north:i.north,cells:r,G:a,cellAt(y,p){let g=Math.floor(y),_=Math.floor(p);return g<0||_<0||g>=t||_>=e?0:r[_*t+g]},buildings:u,houses:c,water:l,grass:[],paths:[],trees:i.trees,lamps:i.lamps,props:i.props,roads:i.roads,bridges:i.bridges,places:i.places,start:f,spawns:{player:f.player,cars:m,bikes:[f.bike]}}}var tl={...Wi.car,name:"Polisbil",maxSpeed:28,accel:10.5},Sf=500,gh=100,xh=200,_h=[3829413,11879482,5212746,14263354,6965898,3092275,15262420,3836554];function yh(i){let t=i.map,e=t.G,n=t.places,s=L=>L===e.sidewalk||L===e.slab||L===e.path||L===e.deck,r=L=>L!==0&&L!==e.building&&L!==e.water,o={money:Sf,stars:0,health:100,peds:[],police:[],mission:null,target:null,phone:null,ticket:0,calm:0,seen:0,bustedFor:0};i.play=o;for(let L=0;L<3;L++){let b={id:`police${L}`,kind:"vehicle",type:"car",spec:tl,police:!0,x:n.polis[0]+L*6,y:n.polis[1]+4,heading:0,vx:0,vy:0,color:16053490,driver:null,reversing:!1,grip:tl.grip,handbrake:!1,mass:tl.mass,awake:!1,ai:null};i.vehicles.push(b),o.police.push(b)}let a=L=>i.events.push({type:"toast",text:L}),l=(L,b)=>Math.hypot(L.x-b.x,L.y-b.y),c=i.player,h=(()=>{let L=12345;return()=>(L=L*16807%2147483647)/2147483647})();function u(){let L=c.vehicle;L&&(L.driver=null,L.vx=L.vy=0,c.vehicle=null)}function d([L,b]){u(),Object.assign(c,{x:L,y:b,vx:0,vy:0,stun:0})}function f(){o.stars=0,o.calm=0,o.seen=0,o.police.forEach((L,b)=>{L.ai=null,Object.assign(L,{x:n.polis[0]+b*6,y:n.polis[1]+4,vx:0,vy:0,heading:0,awake:!1})})}function m(){let L=n.vardcentraler.reduce((b,C)=>Math.hypot(C[0]-c.x,C[1]-c.y)<Math.hypot(b[0]-c.x,b[1]-c.y)?C:b);d(L),o.money=Math.max(0,o.money-gh),o.health=100,f(),o.ticket=4,a(`V\xE5rdcentralen tog ${gh} kr.`),o.mission&&o.mission.step==="deliver"&&_("Mackorna blev kvar p\xE5 olycksplatsen.")}function y(){d(n.polis),o.money=Math.max(0,o.money-xh),f(),a(`Gripen! B\xF6ter: ${xh} kr.`),o.mission&&o.mission.step==="deliver"&&_("Polisen beslagtog nattmackorna.")}function p(L,b){let C=o.stars;o.stars=Math.min(3,o.stars+L),o.calm=0,o.stars>C&&a(`${b} Efterlyst: ${"\u2605".repeat(o.stars)}`)}function g(){o.mission={step:"pickup",sandwiches:0,time:0},o.phone={from:"Punschbergs nation",text:"Sittningen har slut p\xE5 nattmackor! H\xE4mta 12 mackor p\xE5 Mackbaren och k\xF6r hit innan sittningen slutar. Swosh: 300 kr.",until:i.time+9}}function _(L){a(`Uppdraget misslyckades. ${L}`),o.mission={step:"retry",at:i.time+8}}function w(L){let b=o.mission;if(!b){i.time>4&&g();return}if(b.step==="retry"){i.time>b.at&&g();return}let C=(c.vehicle?Math.hypot(c.vehicle.vx,c.vehicle.vy):0)<4,O=(q,J)=>Math.hypot(c.x-q[0],c.y-q[1])<J;if(b.step==="pickup")o.target={x:n.kiosk[0],y:n.kiosk[1],label:"Mackbaren"},O(n.kiosk,5)&&C&&(b.step="deliver",b.sandwiches=12,b.time=120,b.goal=n.nation,b.label="Punschbergs nation",b.twisted=!1,a("Du h\xE4mtade 12 nattmackor. K\xF6r f\xF6rsiktigt: varje krock tappar en macka."));else if(b.step==="deliver"){if(b.time-=L,o.target={x:b.goal[0],y:b.goal[1],label:b.label},b.time<=0)return _("Sittningen tog slut.");if(b.sandwiches<6)return _("F\xF6r f\xE5 mackor kvar.");if(O(b.goal,6)&&C){if(!b.twisted){b.twisted=!0,b.goal=n.slottsgard||n.slottet,b.label="Slottet",b.time+=50,o.phone={from:"Punschbergs nation",text:"Haha, fel st\xE4lle! Sittningen flyttade till Slottet. Skynda!",until:i.time+7};return}let q=300+(b.sandwiches-6)*20;o.money+=q,a(`Levererat! ${b.sandwiches} mackor. Swosh: +${q} kr.`),o.mission={step:"done"},o.target=null}}}function v(){for(let L=0;L<30;L++){let b=h()*Math.PI*2,C=25+h()*50,O=c.x+Math.cos(b)*C,q=c.y+Math.sin(b)*C;if(s(t.cellAt(O,q)))return{x:O,y:q,heading:Math.floor(h()*4)*(Math.PI/2),speed:1.1+h()*.6,kind:Math.floor(h()*2),stand:h()<.2,shirt:_h[Math.floor(h()*_h.length)],down:0,turn:0}}return null}function A(L){for(;o.peds.length<34;){let O=v();if(!O)break;o.peds.push(O)}let b=c.vehicle,C=b?Math.hypot(b.vx,b.vy):0;for(let O=o.peds.length-1;O>=0;O--){let q=o.peds[O];if(l(q,c)>95){o.peds.splice(O,1);continue}if(q.down>0){q.down-=L,q.down<=0&&(q.speed=3);continue}if(b&&C>3&&Math.hypot(q.x-b.x,q.y-b.y)<b.spec.length/2+.4){q.down=5,q.heading=Math.atan2(b.vy,b.vx),q.x+=Math.cos(q.heading)*1.2,q.y+=Math.sin(q.heading)*1.2,p(1,"Du k\xF6rde p\xE5 n\xE5gon!");continue}if(q.stand)continue;let J=q.x+Math.cos(q.heading)*q.speed*L,V=q.y+Math.sin(q.heading)*q.speed*L,tt=t.cellAt(q.x+Math.cos(q.heading)*1.2,q.y+Math.sin(q.heading)*1.2);s(tt)?(q.x=J,q.y=V):q.heading+=(h()<.5?1:-1)*(Math.PI/2)*(h()<.2?2:1)}}let R=2,x=160,M=new Float32Array(x*x),U=0,S=0,P=-1;function N(){U=Math.floor(c.x/R)-x/2,S=Math.floor(c.y/R)-x/2,M.fill(1/0);let L=new Int32Array(x*x),b=0,C=0,O=x/2*x+x/2;for(M[O]=0,L[C++]=O;b<C;){let q=L[b++],J=q%x,V=(q-J)/x;for(let[tt,ct]of[[1,0],[-1,0],[0,1],[0,-1]]){let lt=J+tt,Q=V+ct;if(lt<0||Q<0||lt>=x||Q>=x)continue;let nt=Q*x+lt;M[nt]===1/0&&r(t.cellAt((U+lt+.5)*R,(S+Q+.5)*R))&&(M[nt]=M[q]+1,L[C++]=nt)}}P=i.time}let k=(L,b)=>{let C=Math.floor(L/R)-U,O=Math.floor(b/R)-S;return C<0||O<0||C>=x||O>=x?1/0:M[O*x+C]};function I(L){for(let b=0;b<60;b++){let C=h()*Math.PI*2,O=75+h()*40,q=c.x+Math.cos(C)*O,J=c.y+Math.sin(C)*O;if(!(t.cellAt(q,J)!==e.road||k(q,J)===1/0)){Object.assign(L,{x:q,y:J,vx:0,vy:0,heading:C+Math.PI,awake:!0,stuck:0,backUp:0}),L.ai={steer:"screen",stick:{x:0,y:0,m:0},brake:!1};return}}}function G(L,b){let C=l(L,c),O=c.x-L.x,q=c.y-L.y;if(C>9){let ct=k(L.x,L.y),lt=0,Q=0;for(let nt=0;nt<16;nt++){let ut=nt/16*Math.PI*2,xt=k(L.x+Math.cos(ut)*6,L.y+Math.sin(ut)*6);xt<ct&&(ct=xt,lt=Math.cos(ut),Q=Math.sin(ut))}(lt||Q)&&(O=lt,q=Q)}let J=Math.hypot(O,q)||1,V=Math.hypot(L.vx,L.vy);if(L.stuck=V<1&&C>10?L.stuck+b:0,L.stuck>1.5&&(L.backUp=1),L.backUp>0){L.backUp-=b,L.ai.stick={x:-Math.cos(L.heading),y:-Math.sin(L.heading),m:1};return}let tt=C<9?.45:1;L.ai.stick={x:O/J,y:q/J,m:tt},L.ai.brake=C<6&&V>4}function B(L){let b=o.police.filter(J=>J.ai),C=o.stars;for(let J of o.police)!J.ai&&b.length<C&&(i.time-P>.5&&N(),I(J),J.ai&&b.push(J));if(!b.length)return;i.time-P>.6&&N();let O=!1;for(let J of b)G(J,L),l(J,c)<70&&(O=!0);let q=c.vehicle?Math.hypot(c.vehicle.vx,c.vehicle.vy):Math.hypot(c.vx,c.vy);if(o.seen=b.some(J=>l(J,c)<5)&&q<1.5?o.seen+L:0,o.seen>2)return y();if(o.calm=O?0:o.calm+L,o.calm>14)if(o.stars-=1,o.calm=0,a(o.stars?`Efterlyst: ${"\u2605".repeat(o.stars)}`:"Polisen tappade bort dig."),!o.stars)f();else{let J=b.pop();J.ai=null,Object.assign(J,{x:n.polis[0],y:n.polis[1]+4,vx:0,vy:0,awake:!1})}}function F(L,b){for(let C of b)C.type==="hurt"&&(o.health-=C.amount),C.type==="policeBump"&&p(1,"Du rammade en polisbil!"),C.type==="crash"&&o.mission&&o.mission.step==="deliver"&&o.mission.sandwiches>0&&i.time-(o.mission.lastDrop||0)>.6&&(o.mission.sandwiches-=1,o.mission.lastDrop=i.time,a(`En macka fl\xF6g ut! ${o.mission.sandwiches} kvar.`)),C.type==="crash"&&C.speed>14&&(o.health-=(C.speed-14)*3);o.health<=0&&m(),o.ticket>0&&(o.ticket-=L),o.health<100&&(o.health=Math.min(100,o.health+L*1.5)),w(L),A(L),B(L),o.phone&&i.time>o.phone.until&&(o.phone=null)}return{state:o,step:F}}var vh=Math.PI*2,el=.12;function nl(i){return i=(i+Math.PI)%vh,i<0&&(i+=vh),i-Math.PI}var Ri=(i,t,e)=>i<t?t:i>e?e:i;function Th(i){let t=i.spawns.player,e={id:"p1",kind:"person",x:t.x,y:t.y,vx:0,vy:0,heading:t.heading,vehicle:null,stun:0,mass:en.mass},n=[];return i.spawns.bikes.forEach((r,o)=>n.push(Mh("bike",r,o))),i.spawns.cars.forEach((r,o)=>n.push(Mh(r.type||"car",r,o))),{map:i,player:e,vehicles:n,time:0,events:[],shake:0,grid:bf(i)}}function Mh(i,t,e){return{id:`${i}${e}`,kind:"vehicle",type:i,spec:Wi[i],x:t.x,y:t.y,heading:t.heading,vx:0,vy:0,color:t.color,driver:null,reversing:!1,grip:Wi[i].grip,handbrake:!1,mass:Wi[i].mass,awake:!1}}var Ln=20;function bf(i){let t=Math.ceil(i.width/Ln),e=Math.ceil(i.height/Ln),n=Array.from({length:t*e},()=>({rects:[],circles:[]})),s=o=>{for(let a=Math.floor(o.x/Ln);a<=Math.floor((o.x+o.w)/Ln);a++)for(let l=Math.floor(o.y/Ln);l<=Math.floor((o.y+o.h)/Ln);l++)a>=0&&l>=0&&a<t&&l<e&&n[l*t+a].rects.push(o)};i.buildings.forEach(s),i.water.forEach(s);for(let o of i.props||[]){if(o.kind!=="bench")continue;let a=Math.abs(Math.sin(o.rot))<.5;s(a?{x:o.x-.9,y:o.y-.3,w:1.8,h:.6}:{x:o.x-.3,y:o.y-.9,w:.6,h:1.8})}let r=[...i.trees,...i.lamps||[],...(i.props||[]).filter(o=>o.kind==="bin").map(o=>({x:o.x,y:o.y,r:.3}))];for(let o of r){let a=Math.floor(o.x/Ln),l=Math.floor(o.y/Ln);a>=0&&l>=0&&a<t&&l<e&&n[l*t+a].circles.push(o)}return{cols:t,rows:e,cells:n}}function Ah(i,t,e,n){n.rects.length=0,n.circles.length=0;let s=Math.floor(t/Ln),r=Math.floor(e/Ln);for(let o=s-1;o<=s+1;o++)for(let a=r-1;a<=r+1;a++){if(o<0||a<0||o>=i.cols||a>=i.rows)continue;let l=i.cells[a*i.cols+o];for(let c of l.rects)n.rects.includes(c)||n.rects.push(c);for(let c of l.circles)n.circles.includes(c)||n.circles.push(c)}return n}function Os(i){if(i.kind==="person")return[{x:i.x,y:i.y,r:en.radius}];let t=Math.cos(i.heading),e=Math.sin(i.heading);return i.spec.circles.map(n=>({x:i.x+t*n.o,y:i.y+e*n.o,r:n.r}))}function Sh(i){return i.kind==="person"?en.radius:i.spec.length/2+.2}function il(i,t,e,n){let s=Ri(i,n.x,n.x+n.w),r=Ri(t,n.y,n.y+n.h),o=i-s,a=t-r,l=o*o+a*a;if(l>=e*e)return null;if(l>1e-9){let m=Math.sqrt(l);return{nx:o/m,ny:a/m,pen:e-m}}let c=i-n.x,h=n.x+n.w-i,u=t-n.y,d=n.y+n.h-t,f=Math.min(c,h,u,d);return f===c?{nx:-1,ny:0,pen:c+e}:f===h?{nx:1,ny:0,pen:h+e}:f===u?{nx:0,ny:-1,pen:u+e}:{nx:0,ny:1,pen:d+e}}var Ef={rects:[],circles:[]};function wf(i,t){let e=i.map,n=0,s=0,r=0;for(let o=0;o<2;o++){let a=Os(t);for(let l of a){let c=Ah(i.grid,l.x,l.y,Ef),h=[];for(let u of c.rects){let d=il(l.x,l.y,l.r,u);d&&h.push(d)}for(let u of c.circles){let d=l.x-u.x,f=l.y-u.y,m=Math.hypot(d,f),y=l.r+u.r;m<y&&m>1e-6&&h.push({nx:d/m,ny:f/m,pen:y-m})}l.x-l.r<0&&h.push({nx:1,ny:0,pen:l.r-l.x}),l.y-l.r<0&&h.push({nx:0,ny:1,pen:l.r-l.y}),l.x+l.r>e.width&&h.push({nx:-1,ny:0,pen:l.x+l.r-e.width}),l.y+l.r>e.height&&h.push({nx:0,ny:-1,pen:l.y+l.r-e.height});for(let u of h){t.x+=u.nx*u.pen,t.y+=u.ny*u.pen,l.x+=u.nx*u.pen,l.y+=u.ny*u.pen;let d=t.vx*u.nx+t.vy*u.ny;if(d<0){-d>n&&(n=-d,s=u.nx,r=u.ny);let f=t.kind==="person"?1:1.2;t.vx-=f*d*u.nx,t.vy-=f*d*u.ny,t.kind==="vehicle"&&-d>2&&(t.vx*=.85,t.vy*=.85)}}}}return{impact:n,nx:s,ny:r}}function Tf(i,t,e){let n=Sh(t)+Sh(e);if(Math.abs(t.x-e.x)>n||Math.abs(t.y-e.y)>n)return;let s=Os(t),r=Os(e);for(let o of s)for(let a of r){let l=a.x-o.x,c=a.y-o.y,h=Math.hypot(l,c),u=o.r+a.r;if(h>=u||h<1e-6)continue;let d=l/h,f=c/h,m=u-h,y=1/t.mass,p=1/e.mass,g=y+p;t.x-=d*m*(y/g),t.y-=f*m*(y/g),e.x+=d*m*(p/g),e.y+=f*m*(p/g);let _=(e.vx-t.vx)*d+(e.vy-t.vy)*f;if(_<0){let w=-1.2*_/g;t.vx-=w*y*d,t.vy-=w*y*f,e.vx+=w*p*d,e.vy+=w*p*f,t.awake=!0,e.awake=!0,Af(i,t,e,-_)}}}function Af(i,t,e,n){let s=i.player;!s.vehicle&&(t===s||e===s)&&n>5&&s.stun<=0&&(s.stun=1,zr(i,"P\xE5k\xF6rd! Titta \xE5t b\xE5da h\xE5llen n\xE4sta g\xE5ng."),i.events.push({type:"hurt",amount:Math.min(60,n*4)})),s.vehicle&&n>5&&(t===s.vehicle&&e.police||e===s.vehicle&&t.police)&&i.events.push({type:"policeBump"}),s.vehicle&&(t===s.vehicle||e===s.vehicle)&&n>8&&i.events.push({type:"crash",speed:n});for(let o of[t,e])if(o.kind==="vehicle"&&o.driver&&o.spec.class==="bike"&&n>o.spec.fallImpact){let a=o===t?e:t,l=o.x-a.x,c=o.y-a.y,h=Math.hypot(l,c)||1;Ih(i,o,l/h,c/h)}s.vehicle&&(t===s.vehicle||e===s.vehicle)&&n>6&&(i.shake=Math.min(1,n/15))}function Rf(i,t,e){let n=i.stun>0?{x:0,y:0,m:0}:t.stick,s=en.walkSpeed*(n.m>el?n.m:0),r=n.m>el?n.x/n.m*s:0,o=n.m>el?n.y/n.m*s:0,a=Math.min(1,(i.stun>0?4:en.response)*e);i.vx+=(r-i.vx)*a,i.vy+=(o-i.vy)*a,Math.hypot(i.vx,i.vy)>.3&&i.stun<=0&&(i.heading=Math.atan2(i.vy,i.vx))}function Cf(i,t,e){if(i.map.cells)return i.map.cellAt(t,e)===i.map.G.grass;for(let n of i.map.grass)if(t>=n.x&&t<=n.x+n.w&&e>=n.y&&e<=n.y+n.h){for(let s of i.map.paths)if(t>=s.x&&t<=s.x+s.w&&e>=s.y&&e<=s.y+s.h)return!1;return!0}return!1}var Xi=.15,bh=i=>Math.abs(i)<Xi?0:(i-Math.sign(i)*Xi)/(1-Xi),Eh=.5,Pf=115*Math.PI/180,If=135*Math.PI/180;function Lf(i,t,e){let n=t.m>Xi?Math.min(1,(t.m-Xi)/(1-Xi)):0;if(!n)return e>-.3&&(i.reversing=!1),{throttle:0,brake:0,turn:0};let s=Math.atan2(t.y,t.x),r=nl(s-i.heading),o=nl(s-i.heading-Math.PI),a=()=>({throttle:-n,brake:0,turn:-Ri(o/Eh,-1,1)});if(i.reversing){if(Math.abs(r)>Math.PI/2.2)return a();if(e<-.5)return{throttle:0,brake:n,turn:0};i.reversing=!1}return Math.abs(r)<=Pf?{throttle:n*Math.max(.35,Math.cos(Math.min(Math.abs(r),Math.PI/2))),brake:0,turn:Ri(r/Eh,-1,1)}:e>1.2?{throttle:0,brake:n,turn:0}:Math.abs(r)>=If&&i.spec.class==="car"?(i.reversing=!0,a()):{throttle:.5*n,brake:0,turn:Math.sign(r)}}function wh(i,t,e,n){let s=t.spec,r=Math.cos(t.heading),o=Math.sin(t.heading),a=t.vx*r+t.vy*o,l=-t.vx*o+t.vy*r,c=e.stick,h=0,u=0,d;if(e.steer==="screen"){let x=Lf(t,c,a);h=x.throttle,u=x.brake,d=x.turn}else{let x=bh(-c.y);d=bh(c.x),x>=0?t.reversing=!1:a<.5&&(t.reversing=!0),x>0?h=x:x<0&&(h=t.reversing?x:0),x<0&&!t.reversing&&(u=-x)}let f=u>0;t.braking=f||e.brake;let m=Cf(i,t.x,t.y)?s.grassFactor:1,y=s.maxSpeed*m,p=Ri(d,-1,1)*(a<-.2?-1:1),g=s.handbrake,_=a>6&&Math.abs(d)>.35;t.handbrake=!!(g&&e.brake&&!t.reversing&&(t.handbrake?a>3:_));let w=t.handbrake?g.grip:s.grip;if(t.grip+=(w-t.grip)*Math.min(1,(t.handbrake?12:2.5)*n),t.handbrake){a=Math.max(0,a-g.decel*n);let x=l*Math.min(1,g.redirect*n);l-=x,a+=Math.abs(x)*.85}else if(e.brake||f){let x=s.brake*n*(f&&!e.brake?Math.max(.4,u):1);a>0?a=Math.max(0,a-x):a=Math.min(0,a+x)}else if(h>0)a<y?a=Math.min(y,a+s.accel*h*n):a-=(a-y)*Math.min(1,2*n),a<0&&(a=Math.min(0,a+s.brake*n));else if(h<0)a=Math.max(-s.reverseSpeed,a+s.accel*h*.6*n);else{let x=s.coast*n;a=a>0?Math.max(0,a-x):Math.min(0,a+x)}a-=a*s.drag*n,m<1&&Math.abs(a)>y&&(a-=(a-Math.sign(a)*y)*Math.min(1,3*n)),l*=Math.exp(-t.grip*n),t.vx=r*a-o*l,t.vy=o*a+r*l;let v=Ri(Math.abs(a)/s.turnRefSpeed,s.minTurn,1),A=1-.35*Ri(Math.abs(a)/s.maxSpeed,0,1),R=t.handbrake?g.turnBoost/A:1;t.heading=nl(t.heading+p*s.turnRate*v*A*R*n)}function Df(i,t){let e=Math.cos(i.heading),n=Math.sin(i.heading),s=i.vx*e+i.vy*n,r=-i.vx*n+i.vy*e,o=i.spec.brake*.4*t;s=s>0?Math.max(0,s-o):Math.min(0,s+o),r*=Math.exp(-i.spec.grip*t),i.vx=e*s-n*r,i.vy=n*s+e*r,Math.abs(i.vx)+Math.abs(i.vy)<.01&&(i.vx=0,i.vy=0,i.awake=!1)}function Rh(i){let t=i.player,e=null,n=en.reach;for(let s of i.vehicles)if(!s.driver)for(let r of Os(s)){let o=Math.hypot(r.x-t.x,r.y-t.y)-r.r-en.radius;o<n&&(n=o,e=s)}return e}function Ch(i){let t=i.player;if(t.stun>0)return null;if(t.vehicle)return t.vehicle.spec.label.exit;let e=Rh(i);return e?e.spec.label.enter:null}function Nf(i){let t=i.player;if(t.stun>0)return;if(t.vehicle){Uf(i,t.vehicle);return}let e=Rh(i);e&&(t.vehicle=e,e.driver=t,e.reversing=!1,e.awake=!0,i.events.push({type:"enter",vehicle:e}),t.vx=0,t.vy=0)}function Ph(i,t,e){let n={kind:"person",x:t,y:e,vx:0,vy:0},s=Ah(i.grid,t,e,{rects:[],circles:[]});for(let r of s.rects)if(il(t,e,en.radius+.05,r))return!1;for(let r of s.circles)if(Math.hypot(r.x-t,r.y-e)<r.r+en.radius)return!1;for(let r of s.rects)if(il(t,e,en.radius,r))return!1;for(let r of i.vehicles)if(r!==i.player.vehicle){for(let o of Os(r))if(Math.hypot(o.x-n.x,o.y-n.y)<o.r+en.radius)return!1}return t>.5&&e>.5&&t<i.map.width-.5&&e<i.map.height-.5}function Uf(i,t){let e=i.player,n=Math.cos(t.heading),s=Math.sin(t.heading),r=t.spec.width/2+en.radius+.2,o=t.spec.length/2+en.radius+.2,a=[[s*r,-n*r],[-s*r,n*r],[-n*o,-s*o],[n*o,s*o]],l=null;for(let[h,u]of a)if(Ph(i,t.x+h,t.y+u)){l=[t.x+h,t.y+u];break}if(!l){zr(i,"Det g\xE5r inte att kliva ur h\xE4r.");return}let c=Math.hypot(t.vx,t.vy);e.vehicle=null,t.driver=null,t.handbrake=!1,t.grip=t.spec.grip,e.x=l[0],e.y=l[1],e.heading=t.heading,c>4?(e.vx=t.vx*.4,e.vy=t.vy*.4,e.stun=.8,zr(i,t.spec.class==="bike"?"Du hoppade av i farten.":"Du kastade dig ut ur bilen. Snyggt.")):(e.vx=0,e.vy=0)}function Ih(i,t,e,n){let s=i.player;if(s.vehicle!==t)return;s.vehicle=null,t.driver=null;let r=t.x+e*1.1,o=t.y+n*1.1;Ph(i,r,o)||(r=t.x,o=t.y),s.x=r,s.y=o,s.vx=e*2,s.vy=n*2,s.stun=1.2,t.vx*=.3,t.vy*=.3,i.shake=.6,zr(i,"Aj! Du ramlade av cykeln."),i.events.push({type:"hurt",amount:15})}function zr(i,t){i.events.push({type:"toast",text:t})}function Lh(i,t,e){i.time+=e;let n=i.player;t.consumeAction()&&Nf(i),n.vehicle?wh(i,n.vehicle,t,e):Rf(n,t,e),i.braking=!!(n.vehicle&&n.vehicle.braking);for(let o of i.vehicles)o.ai&&!o.driver&&wh(i,o,o.ai,e);for(let o of i.vehicles)!o.driver&&!o.ai&&o.awake&&Df(o,e);let s=[];n.vehicle||s.push(n);for(let o of i.vehicles)(o.driver||o.awake||o.ai)&&s.push(o);for(let o of s)o.x+=o.vx*e,o.y+=o.vy*e;let r=n.vehicle?i.vehicles:[n,...i.vehicles];for(let o of s)for(let a of r)a!==o&&(!s.includes(a)||s.indexOf(a)>s.indexOf(o))&&Tf(i,o,a);for(let o of[...s,...i.vehicles.filter(a=>a.awake&&!s.includes(a))]){let a=wf(i,o);o.kind==="vehicle"&&o.driver&&a.impact>0&&(o.spec.class==="bike"&&a.impact>o.spec.fallImpact?Ih(i,o,a.nx,a.ny):a.impact>6&&(i.shake=Math.min(1,a.impact/15)),a.impact>8&&i.events.push({type:"crash",speed:a.impact}))}n.vehicle&&(n.x=n.vehicle.x,n.y=n.vehicle.y,n.heading=n.vehicle.heading),n.stun>0&&(n.stun=Math.max(0,n.stun-e)),i.shake=Math.max(0,i.shake-e*2)}function Dh(i){let t={stick:{x:0,y:0,m:0},brake:!1,enabled:!1,touchSteer:"screen",steer:"classic",actionQueued:!1,consumeAction(){let f=this.actionQueued;return this.actionQueued=!1,f&&this.enabled}},e=new Set,n=()=>{let f=0,m=0;(e.has("ArrowLeft")||e.has("KeyA"))&&(f-=1),(e.has("ArrowRight")||e.has("KeyD"))&&(f+=1),(e.has("ArrowUp")||e.has("KeyW"))&&(m-=1),(e.has("ArrowDown")||e.has("KeyS"))&&(m+=1);let y=Math.hypot(f,m);return y?{x:f/y,y:m/y,m:1}:null};window.addEventListener("keydown",f=>{(f.code==="Space"||f.code.startsWith("Arrow"))&&f.preventDefault(),!f.repeat&&(f.code==="KeyE"||f.code==="Enter")&&(t.actionQueued=!0),e.add(f.code)}),window.addEventListener("keyup",f=>e.delete(f.code)),window.addEventListener("blur",()=>e.clear());let s=null,r=0,o=0,a={x:0,y:0,m:0},l=(f,m)=>{i.joy.hidden=!1,i.joy.style.transform=`translate(${r}px, ${o}px)`,i.knob.style.transform=`translate(${f}px, ${m}px)`};i.surface.addEventListener("pointerdown",f=>{s===null&&(f.pointerType!=="mouse"&&f.clientX>window.innerWidth*.6||(s=f.pointerId,r=f.clientX,o=f.clientY,a={x:0,y:0,m:0},i.surface.setPointerCapture?.(f.pointerId),l(0,0),f.preventDefault()))}),i.surface.addEventListener("pointermove",f=>{if(f.pointerId!==s)return;let m=f.clientX-r,y=f.clientY-o,p=Math.hypot(m,y);p>60&&(r+=m/p*(p-60),o+=y/p*(p-60),m=f.clientX-r,y=f.clientY-o);let g=Math.min(1,Math.hypot(m,y)/60);a=g>0?{x:m/60,y:y/60,m:g}:{x:0,y:0,m:0},l(m,y)});let c=f=>{f.pointerId===s&&(s=null,a={x:0,y:0,m:0},i.joy.hidden=!0)};i.surface.addEventListener("pointerup",c),i.surface.addEventListener("pointercancel",c),i.action.addEventListener("pointerdown",f=>{f.preventDefault(),t.actionQueued=!0});let h=f=>{f.preventDefault(),i.brake.classList.add("down"),d=!0},u=()=>{i.brake.classList.remove("down"),d=!1},d=!1;i.brake.addEventListener("pointerdown",h),i.brake.addEventListener("pointerup",u),i.brake.addEventListener("pointercancel",u),i.brake.addEventListener("pointerleave",u);for(let f of["touchstart","touchmove","gesturestart","contextmenu"])document.addEventListener(f,m=>m.target.closest?.(".overlay")||m.preventDefault(),{passive:!1});return t.update=()=>{let f=n();t.stick=t.enabled?f||a:{x:0,y:0,m:0},t.steer=f?"classic":t.touchSteer,t.brake=t.enabled&&(d||e.has("Space"))},t}function Nh(i){let t=0,e;return{update(n,s,r){s!==e&&(e=s,i.action.hidden=!s,s&&(i.action.textContent=s));let o=n.player.vehicle;i.brake.hidden=!o,i.speed.hidden=!o,o&&(i.speed.textContent=`${o.spec.name} \xB7 ${Math.round(Math.hypot(o.vx,o.vy)*3.6)} km/h`),t>0&&(t-=r,t<=0&&(i.toast.hidden=!0))},toast(n){i.toast.textContent=n,i.toast.hidden=!1,t=2.5}}}function Fh(i){let t=(i%600+600)%600/600;return t<.4?0:t<.5?Uh((t-.4)/.1):t<.9?1:1-Uh((t-.9)/.1)}function Uh(i){return i*i*(3-2*i)}var gu=0,Bl=1,xu=2;var Oi=1,_u=2,Ss=3,yi=0,$e=1,Ge=2,Bi=0,bs=1,Kn=2,kl=3,zl=4,yu=5;var ki=100,vu=101,Mu=102,Su=103,bu=104,Eu=200,wu=201,Tu=202,Au=203,Hl=204,Gl=205,Ru=206,Cu=207,Pu=208,Iu=209,Lu=210,Du=211,Nu=212,Uu=213,Fu=214,po=0,mo=1,go=2,ls=3,xo=4,_o=5,yo=6,vo=7,Vl=0,Ou=1,Bu=2,kn=0,Wl=1,Xl=2,ql=3,Es=4,Yl=5,Zl=6,$l=7;var Jl=300,zi=301,ws=302,Ts=303,Ko=304,ui=1e3,En=1001,Mo=1002,ke=1003,ku=1004;var Mr=1005;var tn=1006,Qo=1007;var Qn=1008;var sn=1009,Kl=1010,Ql=1011,As=1012,jo=1013,Rn=1014,_n=1015,Cn=1016,ta=1017,ea=1018,Hi=1020,jl=35902,tc=35899,ec=1021,nc=1022,Pn=1023,$n=1026,jn=1027,na=1028,ia=1029,vi=1030,sa=1031;var ra=1033,Sr=33776,br=33777,Er=33778,wr=33779,oa=35840,aa=35841,la=35842,ca=35843,ha=36196,ua=37492,da=37496,fa=37488,pa=37489,Tr=37490,ma=37491,ga=37808,xa=37809,_a=37810,ya=37811,va=37812,Ma=37813,Sa=37814,ba=37815,Ea=37816,wa=37817,Ta=37818,Aa=37819,Ra=37820,Ca=37821,Pa=36492,Ia=36494,La=36495,Da=36283,Na=36284,Ar=36285,Ua=36286;var Js=2300,So=2301,ho=2302,Al=2303,Rl=2400,Cl=2401,Pl=2402;var zu=3200;var Fa=0,Hu=1,ti="",be="srgb",Ks="srgb-linear",Qs="linear",me="srgb";var uo=7680;var Gu=519,Vu=512,Wu=513,Xu=514,ic=515,qu=516,Yu=517,sc=518,rc=519,Zu=35044;var oc="300 es",gn=2e3,cs=2001;function Ff(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Of(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function hs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function $u(){let i=hs("canvas");return i.style.display="block",i}var Oh={},us=null;function ac(...i){let t="THREE."+i.shift();us?us("log",t,...i):console.log(t,...i)}function Ju(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Wt(...i){i=Ju(i);let t="THREE."+i.shift();if(us)us("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Yt(...i){i=Ju(i);let t="THREE."+i.shift();if(us)us("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Xs(...i){let t=i.join(" ");t in Oh||(Oh[t]=!0,Wt(...i))}function Ku(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Qu={[po]:po,[go]:yo,[xo]:xo,[ls]:_o,[mo]:mo,[yo]:go,[vo]:vo,[_o]:ls},Un=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Xe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Bh=1234567,qs=Math.PI/180,ds=180/Math.PI;function Gi(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Xe[i&255]+Xe[i>>8&255]+Xe[i>>16&255]+Xe[i>>24&255]+"-"+Xe[t&255]+Xe[t>>8&255]+"-"+Xe[t>>16&15|64]+Xe[t>>24&255]+"-"+Xe[e&63|128]+Xe[e>>8&255]+"-"+Xe[e>>16&255]+Xe[e>>24&255]+Xe[n&255]+Xe[n>>8&255]+Xe[n>>16&255]+Xe[n>>24&255]).toLowerCase()}function se(i,t,e){return Math.max(t,Math.min(e,i))}function lc(i,t){return(i%t+t)%t}function Bf(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function kf(i,t,e){return i!==t?(e-i)/(t-i):0}function Ys(i,t,e){return(1-e)*i+e*t}function zf(i,t,e,n){return Ys(i,t,1-Math.exp(-e*n))}function Hf(i,t=1){return t-Math.abs(lc(i,t*2)-t)}function Gf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Vf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Wf(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Xf(i,t){return i+Math.random()*(t-i)}function qf(i){return i*(.5-Math.random())}function Yf(i){i!==void 0&&(Bh=i);let t=Bh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Zf(i){return i*qs}function $f(i){return i*ds}function Jf(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Kf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function cc(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Qf(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),m=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*u,l*d,a*c);break;case"YZY":i.set(l*d,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*d,a*h,a*c);break;case"XZX":i.set(a*h,l*m,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*m,a*c);break;case"ZYZ":i.set(l*m,l*f,a*h,a*c);break;default:Wt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function hc(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function ju(i,t){if(t.constructor===Float32Array)return i;let e=hc(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/e,-1)}function td(i,t){if(t.constructor===Float32Array)return i;let e=hc(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*e)}var Oa={DEG2RAD:qs,RAD2DEG:ds,generateUUID:Gi,clamp:se,euclideanModulo:lc,mapLinear:Bf,inverseLerp:kf,lerp:Ys,damp:zf,pingpong:Hf,smoothstep:Gf,smootherstep:Vf,randInt:Wf,randFloat:Xf,randFloatSpread:qf,seededRandom:Yf,degToRad:Zf,radToDeg:$f,isPowerOfTwo:Jf,ceilPowerOfTwo:Kf,floorPowerOfTwo:cc,setQuaternionFromProperEuler:Qf,normalize:td,denormalize:ju},gc=class gc{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=se(this.x,t.x,e.x),this.y=se(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=se(this.x,t,e),this.y=se(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(se(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(se(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};gc.prototype.isVector2=!0;var _t=gc,Le=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3],d=r[o+0],f=r[o+1],m=r[o+2],y=r[o+3];if(u!==y||l!==d||c!==f||h!==m){let p=l*d+c*f+h*m+u*y;p<0&&(d=-d,f=-f,m=-m,y=-y,p=-p);let g=1-a;if(p<.9995){let _=Math.acos(p),w=Math.sin(_);g=Math.sin(g*_)/w,a=Math.sin(a*_)/w,l=l*g+d*a,c=c*g+f*a,h=h*g+m*a,u=u*g+y*a}else{l=l*g+d*a,c=c*g+f*a,h=h*g+m*a,u=u*g+y*a;let _=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=_,c*=_,h*=_,u*=_}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],m=r[o+3];return t[e]=a*m+h*u+l*f-c*d,t[e+1]=l*m+h*d+c*u-a*f,t[e+2]=c*m+h*f+a*d-l*u,t[e+3]=h*m-a*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),d=l(n/2),f=l(s/2),m=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"YZX":this._x=d*h*u+c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u-d*f*m;break;case"XZY":this._x=d*h*u-c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u+d*f*m;break;default:Wt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(se(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let l=1-e;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},xc=class xc{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(kh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(kh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=se(this.x,t.x,e.x),this.y=se(this.y,t.y,e.y),this.z=se(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=se(this.x,t,e),this.y=se(this.y,t,e),this.z=se(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(se(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return sl.copy(this).projectOnVector(t),this.sub(sl)}reflect(t){return this.sub(sl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(se(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};xc.prototype.isVector3=!0;var H=xc,sl=new H,kh=new Le,_c=class _c{constructor(t,e,n,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],y=s[0],p=s[3],g=s[6],_=s[1],w=s[4],v=s[7],A=s[2],R=s[5],x=s[8];return r[0]=o*y+a*_+l*A,r[3]=o*p+a*w+l*R,r[6]=o*g+a*v+l*x,r[1]=c*y+h*_+u*A,r[4]=c*p+h*w+u*R,r[7]=c*g+h*v+u*x,r[2]=d*y+f*_+m*A,r[5]=d*p+f*w+m*R,r[8]=d*g+f*v+m*x,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,m=e*u+n*d+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/m;return t[0]=u*y,t[1]=(s*c-h*n)*y,t[2]=(a*n-s*o)*y,t[3]=d*y,t[4]=(h*e-s*l)*y,t[5]=(s*r-a*e)*y,t[6]=f*y,t[7]=(n*l-c*e)*y,t[8]=(o*e-n*r)*y,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return Xs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(rl.makeScale(t,e)),this}rotate(t){return Xs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(rl.makeRotation(-t)),this}translate(t,e){return Xs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(rl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};_c.prototype.isMatrix3=!0;var Jt=_c,rl=new Jt,zh=new Jt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Hh=new Jt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function jf(){let i={enabled:!0,workingColorSpace:Ks,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===me&&(s.r=Zn(s.r),s.g=Zn(s.g),s.b=Zn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===me&&(s.r=as(s.r),s.g=as(s.g),s.b=as(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ti?Qs:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ks]:{primaries:t,whitePoint:n,transfer:Qs,toXYZ:zh,fromXYZ:Hh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:be},outputColorSpaceConfig:{drawingBufferColorSpace:be}},[be]:{primaries:t,whitePoint:n,transfer:me,toXYZ:zh,fromXYZ:Hh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:be}}}),i}var ce=jf();function Zn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function as(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var qi,bo=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{qi===void 0&&(qi=hs("canvas")),qi.width=t.width,qi.height=t.height;let s=qi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=qi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=hs("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Zn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Zn(e[n]/255)*255):e[n]=Zn(e[n]);return{data:e,width:t.width,height:t.height}}else return Wt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},tp=0,fs=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:tp++}),this.uuid=Gi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ol(s[o].image)):r.push(ol(s[o]))}else r=ol(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function ol(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?bo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Wt("Texture: Unable to serialize Texture."),{})}var ep=0,al=new H,Ye=class i extends Un{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=En,s=En,r=tn,o=Qn,a=Pn,l=sn,c=i.DEFAULT_ANISOTROPY,h=ti){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ep++}),this.uuid=Gi(),this.name="",this.source=new fs(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new _t(0,0),this.repeat=new _t(1,1),this.center=new _t(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Jt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(al).x}get height(){return this.source.getSize(al).y}get depth(){return this.source.getSize(al).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Wt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Wt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Jl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ui:t.x=t.x-Math.floor(t.x);break;case En:t.x=t.x<0?0:1;break;case Mo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ui:t.y=t.y-Math.floor(t.y);break;case En:t.y=t.y<0?0:1;break;case Mo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Ye.DEFAULT_IMAGE=null;Ye.DEFAULT_MAPPING=Jl;Ye.DEFAULT_ANISOTROPY=1;var yc=class yc{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],m=l[9],y=l[2],p=l[6],g=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-y)<.01&&Math.abs(m-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+y)<.1&&Math.abs(m+p)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let w=(c+1)/2,v=(f+1)/2,A=(g+1)/2,R=(h+d)/4,x=(u+y)/4,M=(m+p)/4;return w>v&&w>A?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=R/n,r=x/n):v>A?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=R/s,r=M/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=x/r,s=M/r),this.set(n,s,r,e),this}let _=Math.sqrt((p-m)*(p-m)+(u-y)*(u-y)+(d-h)*(d-h));return Math.abs(_)<.001&&(_=1),this.x=(p-m)/_,this.y=(u-y)/_,this.z=(d-h)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=se(this.x,t.x,e.x),this.y=se(this.y,t.y,e.y),this.z=se(this.z,t.z,e.z),this.w=se(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=se(this.x,t,e),this.y=se(this.y,t,e),this.z=se(this.z,t,e),this.w=se(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(se(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};yc.prototype.isVector4=!0;var ve=yc,Eo=class extends Un{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:tn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ve(0,0,t,e),this.scissorTest=!1,this.viewport=new ve(0,0,t,e),this.textures=[];let s=n.count;for(let r=0;r<s;r++)this.textures[r]=new Ye({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:tn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new fs(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},ln=class extends Eo{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},js=class extends Ye{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ke,this.minFilter=ke,this.wrapR=En,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var wo=class extends Ye{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ke,this.minFilter=ke,this.wrapR=En,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Jo=class Jo{constructor(t,e,n,s,r,o,a,l,c,h,u,d,f,m,y,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,u,d,f,m,y,p)}set(t,e,n,s,r,o,a,l,c,h,u,d,f,m,y,p){let g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=s,g[1]=r,g[5]=o,g[9]=a,g[13]=l,g[2]=c,g[6]=h,g[10]=u,g[14]=d,g[3]=f,g[7]=m,g[11]=y,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Jo().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/Yi.setFromMatrixColumn(t,0).length(),r=1/Yi.setFromMatrixColumn(t,1).length(),o=1/Yi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let d=o*h,f=o*u,m=a*h,y=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+m*c,e[5]=d-y*c,e[9]=-a*l,e[2]=y-d*c,e[6]=m+f*c,e[10]=o*l}else if(t.order==="YXZ"){let d=l*h,f=l*u,m=c*h,y=c*u;e[0]=d+y*a,e[4]=m*a-f,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-m,e[6]=y+d*a,e[10]=o*l}else if(t.order==="ZXY"){let d=l*h,f=l*u,m=c*h,y=c*u;e[0]=d-y*a,e[4]=-o*u,e[8]=m+f*a,e[1]=f+m*a,e[5]=o*h,e[9]=y-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let d=o*h,f=o*u,m=a*h,y=a*u;e[0]=l*h,e[4]=m*c-f,e[8]=d*c+y,e[1]=l*u,e[5]=y*c+d,e[9]=f*c-m,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let d=o*l,f=o*c,m=a*l,y=a*c;e[0]=l*h,e[4]=y-d*u,e[8]=m*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*u+m,e[10]=d-y*u}else if(t.order==="XZY"){let d=o*l,f=o*c,m=a*l,y=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+y,e[5]=o*h,e[9]=f*u-m,e[2]=m*u-f,e[6]=a*h,e[10]=y*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(np,t,ip)}lookAt(t,e,n){let s=this.elements;return on.subVectors(t,e),on.lengthSq()===0&&(on.z=1),on.normalize(),ri.crossVectors(n,on),ri.lengthSq()===0&&(Math.abs(n.z)===1?on.x+=1e-4:on.z+=1e-4,on.normalize(),ri.crossVectors(n,on)),ri.normalize(),Hr.crossVectors(on,ri),s[0]=ri.x,s[4]=Hr.x,s[8]=on.x,s[1]=ri.y,s[5]=Hr.y,s[9]=on.y,s[2]=ri.z,s[6]=Hr.z,s[10]=on.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],y=n[6],p=n[10],g=n[14],_=n[3],w=n[7],v=n[11],A=n[15],R=s[0],x=s[4],M=s[8],U=s[12],S=s[1],P=s[5],N=s[9],k=s[13],I=s[2],G=s[6],B=s[10],F=s[14],L=s[3],b=s[7],C=s[11],O=s[15];return r[0]=o*R+a*S+l*I+c*L,r[4]=o*x+a*P+l*G+c*b,r[8]=o*M+a*N+l*B+c*C,r[12]=o*U+a*k+l*F+c*O,r[1]=h*R+u*S+d*I+f*L,r[5]=h*x+u*P+d*G+f*b,r[9]=h*M+u*N+d*B+f*C,r[13]=h*U+u*k+d*F+f*O,r[2]=m*R+y*S+p*I+g*L,r[6]=m*x+y*P+p*G+g*b,r[10]=m*M+y*N+p*B+g*C,r[14]=m*U+y*k+p*F+g*O,r[3]=_*R+w*S+v*I+A*L,r[7]=_*x+w*P+v*G+A*b,r[11]=_*M+w*N+v*B+A*C,r[15]=_*U+w*k+v*F+A*O,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],m=t[3],y=t[7],p=t[11],g=t[15],_=l*f-c*d,w=a*f-c*u,v=a*d-l*u,A=o*f-c*h,R=o*d-l*h,x=o*u-a*h;return e*(y*_-p*w+g*v)-n*(m*_-p*A+g*R)+s*(m*w-y*A+g*x)-r*(m*v-y*R+p*x)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],l=t[2],c=t[6],h=t[10];return e*(o*h-a*c)-n*(r*h-a*l)+s*(r*c-o*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],m=t[12],y=t[13],p=t[14],g=t[15],_=e*a-n*o,w=e*l-s*o,v=e*c-r*o,A=n*l-s*a,R=n*c-r*a,x=s*c-r*l,M=h*y-u*m,U=h*p-d*m,S=h*g-f*m,P=u*p-d*y,N=u*g-f*y,k=d*g-f*p,I=_*k-w*N+v*P+A*S-R*U+x*M;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let G=1/I;return t[0]=(a*k-l*N+c*P)*G,t[1]=(s*N-n*k-r*P)*G,t[2]=(y*x-p*R+g*A)*G,t[3]=(d*R-u*x-f*A)*G,t[4]=(l*S-o*k-c*U)*G,t[5]=(e*k-s*S+r*U)*G,t[6]=(p*v-m*x-g*w)*G,t[7]=(h*x-d*v+f*w)*G,t[8]=(o*N-a*S+c*M)*G,t[9]=(n*S-e*N-r*M)*G,t[10]=(m*R-y*v+g*_)*G,t[11]=(u*v-h*R-f*_)*G,t[12]=(a*U-o*P-l*M)*G,t[13]=(e*P-n*U+s*M)*G,t[14]=(y*w-m*A-p*_)*G,t[15]=(h*A-u*w+d*_)*G,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,m=r*u,y=o*h,p=o*u,g=a*u,_=l*c,w=l*h,v=l*u,A=n.x,R=n.y,x=n.z;return s[0]=(1-(y+g))*A,s[1]=(f+v)*A,s[2]=(m-w)*A,s[3]=0,s[4]=(f-v)*R,s[5]=(1-(d+g))*R,s[6]=(p+_)*R,s[7]=0,s[8]=(m+w)*x,s[9]=(p-_)*x,s[10]=(1-(d+y))*x,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=Yi.set(s[0],s[1],s[2]).length(),a=Yi.set(s[4],s[5],s[6]).length(),l=Yi.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Mn.copy(this);let c=1/o,h=1/a,u=1/l;return Mn.elements[0]*=c,Mn.elements[1]*=c,Mn.elements[2]*=c,Mn.elements[4]*=h,Mn.elements[5]*=h,Mn.elements[6]*=h,Mn.elements[8]*=u,Mn.elements[9]*=u,Mn.elements[10]*=u,e.setFromRotationMatrix(Mn),n.x=o,n.y=a,n.z=l,this}makePerspective(t,e,n,s,r,o,a=gn,l=!1){let c=this.elements,h=2*r/(e-t),u=2*r/(n-s),d=(e+t)/(e-t),f=(n+s)/(n-s),m,y;if(l)m=r/(o-r),y=o*r/(o-r);else if(a===gn)m=-(o+r)/(o-r),y=-2*o*r/(o-r);else if(a===cs)m=-o/(o-r),y=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=gn,l=!1){let c=this.elements,h=2/(e-t),u=2/(n-s),d=-(e+t)/(e-t),f=-(n+s)/(n-s),m,y;if(l)m=1/(o-r),y=o/(o-r);else if(a===gn)m=-2/(o-r),y=-(o+r)/(o-r);else if(a===cs)m=-1/(o-r),y=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Jo.prototype.isMatrix4=!0;var Xt=Jo,Yi=new H,Mn=new Xt,np=new H(0,0,0),ip=new H(1,1,1),ri=new H,Hr=new H,on=new H,Gh=new Xt,Vh=new Le,wn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(se(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-se(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(se(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-se(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(se(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-se(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Wt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Gh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Gh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Vh.setFromEuler(this),this.setFromQuaternion(Vh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};wn.DEFAULT_ORDER="XYZ";var tr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},sp=0,Wh=new H,Zi=new Le,Vn=new Xt,Gr=new H,Bs=new H,rp=new H,op=new Le,Xh=new H(1,0,0),qh=new H(0,1,0),Yh=new H(0,0,1),Zh={type:"added"},ap={type:"removed"},$i={type:"childadded",child:null},ll={type:"childremoved",child:null},Ze=class i extends Un{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:sp++}),this.uuid=Gi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new H,e=new wn,n=new Le,s=new H(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Xt},normalMatrix:{value:new Jt}}),this.matrix=new Xt,this.matrixWorld=new Xt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new tr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Zi.setFromAxisAngle(t,e),this.quaternion.multiply(Zi),this}rotateOnWorldAxis(t,e){return Zi.setFromAxisAngle(t,e),this.quaternion.premultiply(Zi),this}rotateX(t){return this.rotateOnAxis(Xh,t)}rotateY(t){return this.rotateOnAxis(qh,t)}rotateZ(t){return this.rotateOnAxis(Yh,t)}translateOnAxis(t,e){return Wh.copy(t).applyQuaternion(this.quaternion),this.position.add(Wh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Xh,t)}translateY(t){return this.translateOnAxis(qh,t)}translateZ(t){return this.translateOnAxis(Yh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Vn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Gr.copy(t):Gr.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Bs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Vn.lookAt(Bs,Gr,this.up):Vn.lookAt(Gr,Bs,this.up),this.quaternion.setFromRotationMatrix(Vn),s&&(Vn.extractRotation(s.matrixWorld),Zi.setFromRotationMatrix(Vn),this.quaternion.premultiply(Zi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Yt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Zh),$i.child=t,this.dispatchEvent($i),$i.child=null):Yt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ap),ll.child=t,this.dispatchEvent(ll),ll.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Vn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Vn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Vn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Zh),$i.child=t,this.dispatchEvent($i),$i.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bs,t,rp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bs,op,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ze.DEFAULT_UP=new H(0,1,0);Ze.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ze.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ae=class extends Ze{constructor(){super(),this.isGroup=!0,this.type="Group"}},lp={type:"move"},ps=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ae,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ae,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ae,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let y of t.hand.values()){let p=e.getJointPose(y,n),g=this._getHandJoint(c,y);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(lp)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Ae;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},ed={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},oi={h:0,s:0,l:0},Vr={h:0,s:0,l:0};function cl(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Bt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=be){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ce.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=ce.workingColorSpace){return this.r=t,this.g=e,this.b=n,ce.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=ce.workingColorSpace){if(t=lc(t,1),e=se(e,0,1),n=se(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=cl(o,r,t+1/3),this.g=cl(o,r,t),this.b=cl(o,r,t-1/3)}return ce.colorSpaceToWorking(this,s),this}setStyle(t,e=be){function n(r){r!==void 0&&parseFloat(r)<1&&Wt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Wt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Wt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=be){let n=ed[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Wt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Zn(t.r),this.g=Zn(t.g),this.b=Zn(t.b),this}copyLinearToSRGB(t){return this.r=as(t.r),this.g=as(t.g),this.b=as(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=be){return ce.workingToColorSpace(qe.copy(this),t),Math.round(se(qe.r*255,0,255))*65536+Math.round(se(qe.g*255,0,255))*256+Math.round(se(qe.b*255,0,255))}getHexString(t=be){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ce.workingColorSpace){ce.workingToColorSpace(qe.copy(this),e);let n=qe.r,s=qe.g,r=qe.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ce.workingColorSpace){return ce.workingToColorSpace(qe.copy(this),e),t.r=qe.r,t.g=qe.g,t.b=qe.b,t}getStyle(t=be){ce.workingToColorSpace(qe.copy(this),t);let e=qe.r,n=qe.g,s=qe.b;return t!==be?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(oi),this.setHSL(oi.h+t,oi.s+e,oi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(oi),t.getHSL(Vr);let n=Ys(oi.h,Vr.h,e),s=Ys(oi.s,Vr.s,e),r=Ys(oi.l,Vr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},qe=new Bt;Bt.NAMES=ed;var ms=class i{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Bt(t),this.near=e,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},gs=class extends Ze{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wn,this.environmentIntensity=1,this.environmentRotation=new wn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Sn=new H,Wn=new H,hl=new H,Xn=new H,Ji=new H,Ki=new H,$h=new H,ul=new H,dl=new H,fl=new H,pl=new ve,ml=new ve,gl=new ve,hi=class i{constructor(t=new H,e=new H,n=new H){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Sn.subVectors(t,e),s.cross(Sn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Sn.subVectors(s,e),Wn.subVectors(n,e),hl.subVectors(t,e);let o=Sn.dot(Sn),a=Sn.dot(Wn),l=Sn.dot(hl),c=Wn.dot(Wn),h=Wn.dot(hl),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(c*l-a*h)*d,m=(o*h-a*l)*d;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Xn)===null?!1:Xn.x>=0&&Xn.y>=0&&Xn.x+Xn.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,Xn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Xn.x),l.addScaledVector(o,Xn.y),l.addScaledVector(a,Xn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return pl.setScalar(0),ml.setScalar(0),gl.setScalar(0),pl.fromBufferAttribute(t,e),ml.fromBufferAttribute(t,n),gl.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(pl,r.x),o.addScaledVector(ml,r.y),o.addScaledVector(gl,r.z),o}static isFrontFacing(t,e,n,s){return Sn.subVectors(n,e),Wn.subVectors(t,e),Sn.cross(Wn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Sn.subVectors(this.c,this.b),Wn.subVectors(this.a,this.b),Sn.cross(Wn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;Ji.subVectors(s,n),Ki.subVectors(r,n),ul.subVectors(t,n);let l=Ji.dot(ul),c=Ki.dot(ul);if(l<=0&&c<=0)return e.copy(n);dl.subVectors(t,s);let h=Ji.dot(dl),u=Ki.dot(dl);if(h>=0&&u<=h)return e.copy(s);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0&&l-h>0)return o=l/(l-h),e.copy(n).addScaledVector(Ji,o);fl.subVectors(t,r);let f=Ji.dot(fl),m=Ki.dot(fl);if(m>=0&&f<=m)return e.copy(r);let y=f*c-l*m;if(y<=0&&c>=0&&m<=0)return a=c/(c-m),e.copy(n).addScaledVector(Ki,a);let p=h*m-f*u;if(p<=0&&u-h>=0&&f-m>=0)return $h.subVectors(r,s),a=(u-h)/(u-h+(f-m)),e.copy(s).addScaledVector($h,a);let g=1/(p+y+d);return o=y*g,a=d*g,e.copy(n).addScaledVector(Ji,o).addScaledVector(Ki,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Fn=class{constructor(t=new H(1/0,1/0,1/0),e=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(bn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(bn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=bn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,bn):bn.fromBufferAttribute(r,o),bn.applyMatrix4(t.matrixWorld),this.expandByPoint(bn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Wr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Wr.copy(n.boundingBox)),Wr.applyMatrix4(t.matrixWorld),this.union(Wr)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,bn),bn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ks),Xr.subVectors(this.max,ks),Qi.subVectors(t.a,ks),ji.subVectors(t.b,ks),ts.subVectors(t.c,ks),ai.subVectors(ji,Qi),li.subVectors(ts,ji),Ci.subVectors(Qi,ts);let e=[0,-ai.z,ai.y,0,-li.z,li.y,0,-Ci.z,Ci.y,ai.z,0,-ai.x,li.z,0,-li.x,Ci.z,0,-Ci.x,-ai.y,ai.x,0,-li.y,li.x,0,-Ci.y,Ci.x,0];return!xl(e,Qi,ji,ts,Xr)||(e=[1,0,0,0,1,0,0,0,1],!xl(e,Qi,ji,ts,Xr))?!1:(qr.crossVectors(ai,li),e=[qr.x,qr.y,qr.z],xl(e,Qi,ji,ts,Xr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,bn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(bn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(qn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},qn=[new H,new H,new H,new H,new H,new H,new H,new H],bn=new H,Wr=new Fn,Qi=new H,ji=new H,ts=new H,ai=new H,li=new H,Ci=new H,ks=new H,Xr=new H,qr=new H,Pi=new H;function xl(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Pi.fromArray(i,r);let a=s.x*Math.abs(Pi.x)+s.y*Math.abs(Pi.y)+s.z*Math.abs(Pi.z),l=t.dot(Pi),c=e.dot(Pi),h=n.dot(Pi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var Ie=new H,Yr=new _t,cp=0,de=class extends Un{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:cp++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Zu,this.updateRanges=[],this.gpuType=_n,this.version=0,this._normalizationScale=t!==void 0?hc(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Yr.fromBufferAttribute(this,e),Yr.applyMatrix3(t),this.setXY(e,Yr.x,Yr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix3(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix4(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyNormalMatrix(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.transformDirection(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):ju(t,this.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):td(t,this.array)}};var er=class extends de{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var nr=class extends de{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var qt=class extends de{constructor(t,e,n){super(new Float32Array(t),e,n)}},hp=new Fn,zs=new H,_l=new H,di=class{constructor(t=new H,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):hp.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;zs.subVectors(t,this.center);let e=zs.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(zs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(_l.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(zs.copy(t.center).add(_l)),this.expandByPoint(zs.copy(t.center).sub(_l))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},up=0,pn=new Xt,yl=new Ze,es=new H,an=new Fn,Hs=new Fn,Be=new H,pe=class i extends Un{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:up++}),this.uuid=Gi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ff(t)?nr:er)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Jt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return pn.makeRotationFromQuaternion(t),this.applyMatrix4(pn),this}rotateX(t){return pn.makeRotationX(t),this.applyMatrix4(pn),this}rotateY(t){return pn.makeRotationY(t),this.applyMatrix4(pn),this}rotateZ(t){return pn.makeRotationZ(t),this.applyMatrix4(pn),this}translate(t,e,n){return pn.makeTranslation(t,e,n),this.applyMatrix4(pn),this}scale(t,e,n){return pn.makeScale(t,e,n),this.applyMatrix4(pn),this}lookAt(t){return yl.lookAt(t),yl.updateMatrix(),this.applyMatrix4(yl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(es).negate(),this.translate(es.x,es.y,es.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new qt(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Wt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Yt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];an.setFromBufferAttribute(r),this.morphTargetsRelative?(Be.addVectors(this.boundingBox.min,an.min),this.boundingBox.expandByPoint(Be),Be.addVectors(this.boundingBox.max,an.max),this.boundingBox.expandByPoint(Be)):(this.boundingBox.expandByPoint(an.min),this.boundingBox.expandByPoint(an.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Yt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new di);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Yt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(t){let n=this.boundingSphere.center;if(an.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Hs.setFromBufferAttribute(a),this.morphTargetsRelative?(Be.addVectors(an.min,Hs.min),an.expandByPoint(Be),Be.addVectors(an.max,Hs.max),an.expandByPoint(Be)):(an.expandByPoint(Hs.min),an.expandByPoint(Hs.max))}an.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Be.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Be));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Be.fromBufferAttribute(a,c),l&&(es.fromBufferAttribute(t,c),Be.add(es)),s=Math.max(s,n.distanceToSquared(Be))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Yt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Yt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new de(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[],c=new Uint8Array(n.count);for(let U=0;U<n.count;U++)a[U]=new H,l[U]=new H;let h=new H,u=new H,d=new H,f=new _t,m=new _t,y=new _t,p=new H,g=new H;function _(U,S,P){c[U]=c[S]=c[P]=1,h.fromBufferAttribute(n,U),u.fromBufferAttribute(n,S),d.fromBufferAttribute(n,P),f.fromBufferAttribute(r,U),m.fromBufferAttribute(r,S),y.fromBufferAttribute(r,P),u.sub(h),d.sub(h),m.sub(f),y.sub(f);let N=1/(m.x*y.y-y.x*m.y);isFinite(N)&&(p.copy(u).multiplyScalar(y.y).addScaledVector(d,-m.y).multiplyScalar(N),g.copy(d).multiplyScalar(m.x).addScaledVector(u,-y.x).multiplyScalar(N),a[U].add(p),a[S].add(p),a[P].add(p),l[U].add(g),l[S].add(g),l[P].add(g))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let U=0,S=w.length;U<S;++U){let P=w[U],N=P.start,k=P.count;for(let I=N,G=N+k;I<G;I+=3)_(t.getX(I+0),t.getX(I+1),t.getX(I+2))}let v=new H,A=new H,R=new H,x=new H;function M(U){R.fromBufferAttribute(s,U),x.copy(R);let S=a[U];v.copy(S),v.sub(R.multiplyScalar(R.dot(S))).normalize(),A.crossVectors(x,S);let N=A.dot(l[U])<0?-1:1;o.setXYZW(U,v.x,v.y,v.z,N)}for(let U=0,S=n.count;U<S;++U)c[U]&&M(U);this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new de(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let s=new H,r=new H,o=new H,a=new H,l=new H,c=new H,h=new H,u=new H;if(t)for(let d=0,f=t.count;d<f;d+=3){let m=t.getX(d+0),y=t.getX(d+1),p=t.getX(d+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,y),o.fromBufferAttribute(e,p),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,p),a.add(h),l.add(h),c.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Be.fromBufferAttribute(t,e),Be.normalize(),t.setXYZ(e,Be.x,Be.y,Be.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),f=0,m=0;for(let y=0,p=l.length;y<p;y++){a.isInterleavedBufferAttribute?f=l[y]*a.data.stride+a.offset:f=l[y]*h;for(let g=0;g<h;g++)d[m++]=c[f++]}return new de(d,h,u)}if(this.index===null)return Wt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var vl=new H,dp=new H,fp=new Jt,mn=class{constructor(t=new H(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=vl.subVectors(n,e).cross(dp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(vl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||fp.getNormalMatrix(t),s=this.coplanarPoint(vl).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},pp=0,fi=class extends Un{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:pp++}),this.uuid=Gi(),this.name="",this.type="Material",this.blending=bs,this.side=yi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Hl,this.blendDst=Gl,this.blendEquation=ki,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Bt(0,0,0),this.blendAlpha=0,this.depthFunc=ls,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Gu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=uo,this.stencilZFail=uo,this.stencilZPass=uo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Wt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Wt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Bt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new mn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new _t().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new _t().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Yn=new H,Ml=new H,Zr=new H,$r=new H,To=class{constructor(t=new H,e=new H(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Yn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Yn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Yn.copy(this.origin).addScaledVector(this.direction,e),Yn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Ml.copy(t).add(e).multiplyScalar(.5),Zr.copy(e).sub(t).normalize(),$r.copy(this.origin).sub(Ml);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Zr),a=$r.dot(this.direction),l=-$r.dot(Zr),c=$r.lengthSq(),h=Math.abs(1-o*o),u,d,f,m;if(h>0)if(u=o*l-a,d=o*a-l,m=r*h,u>=0)if(d>=-m)if(d<=m){let y=1/h;u*=y,d*=y,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Ml).addScaledVector(Zr,d),f}intersectSphere(t,e){if(t.radius<0)return null;Yn.subVectors(t.center,this.origin);let n=Yn.dot(this.direction),s=Yn.dot(Yn)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Yn)!==null}intersectTriangle(t,e,n,s,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,h=a.z,u=t.x-o.x,d=t.y-o.y,f=t.z-o.z,m=e.x-o.x,y=e.y-o.y,p=e.z-o.z,g=n.x-o.x,_=n.y-o.y,w=n.z-o.z,v=Math.abs(l),A=Math.abs(c),R=Math.abs(h),x,M,U,S,P,N,k,I,G,B,F,L;if(v>=A&&v>=R?(U=l,N=u,G=m,L=g,l>=0?(x=c,M=h,S=d,P=f,k=y,I=p,B=_,F=w):(x=h,M=c,S=f,P=d,k=p,I=y,B=w,F=_)):A>=R?(U=c,N=d,G=y,L=_,c>=0?(x=h,M=l,S=f,P=u,k=p,I=m,B=w,F=g):(x=l,M=h,S=u,P=f,k=m,I=p,B=g,F=w)):(U=h,N=f,G=p,L=w,h>=0?(x=l,M=c,S=u,P=d,k=m,I=y,B=g,F=_):(x=c,M=l,S=d,P=u,k=y,I=m,B=_,F=g)),U===0)return null;let b=x/U,C=M/U,O=1/U,q=S-b*N,J=P-C*N,V=k-b*G,tt=I-C*G,ct=B-b*L,lt=F-C*L,Q=ct*tt-lt*V,nt=q*lt-J*ct,ut=V*J-tt*q;if(s){if(Q<0||nt<0||ut<0)return null}else if((Q<0||nt<0||ut<0)&&(Q>0||nt>0||ut>0))return null;let xt=Q+nt+ut;if(xt===0)return null;let At=O*(Q*N+nt*G+ut*L);return(xt>0?At<0:At>0)?null:this.at(At/xt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},He=class extends fi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Bt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wn,this.combine=Vl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Jh=new Xt,Ii=new To,Jr=new di,Kh=new H,Kr=new H,Qr=new H,jr=new H,Sl=new H,to=new H,Qh=new H,eo=new H,re=class extends Ze{constructor(t=new pe,e=new He){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){to.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(Sl.fromBufferAttribute(u,t),o?to.addScaledVector(Sl,h):to.addScaledVector(Sl.sub(e),h))}e.add(to)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Jr.copy(n.boundingSphere),Jr.applyMatrix4(r),Ii.copy(t.ray).recast(t.near),!(Jr.containsPoint(Ii.origin)===!1&&(Ii.intersectSphere(Jr,Kh)===null||Ii.origin.distanceToSquared(Kh)>(t.far-t.near)**2))&&(Jh.copy(r).invert(),Ii.copy(t.ray).applyMatrix4(Jh),!(n.boundingBox!==null&&Ii.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ii)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,y=d.length;m<y;m++){let p=d[m],g=o[p.materialIndex],_=Math.max(p.start,f.start),w=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let v=_,A=w;v<A;v+=3){let R=a.getX(v),x=a.getX(v+1),M=a.getX(v+2);s=no(this,g,t,n,c,h,u,R,x,M),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let m=Math.max(0,f.start),y=Math.min(a.count,f.start+f.count);for(let p=m,g=y;p<g;p+=3){let _=a.getX(p),w=a.getX(p+1),v=a.getX(p+2);s=no(this,o,t,n,c,h,u,_,w,v),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,y=d.length;m<y;m++){let p=d[m],g=o[p.materialIndex],_=Math.max(p.start,f.start),w=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let v=_,A=w;v<A;v+=3){let R=v,x=v+1,M=v+2;s=no(this,g,t,n,c,h,u,R,x,M),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let m=Math.max(0,f.start),y=Math.min(l.count,f.start+f.count);for(let p=m,g=y;p<g;p+=3){let _=p,w=p+1,v=p+2;s=no(this,o,t,n,c,h,u,_,w,v),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}};function mp(i,t,e,n,s,r,o,a){let l;if(t.side===$e?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===yi,a),l===null)return null;eo.copy(a),eo.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(eo);return c<e.near||c>e.far?null:{distance:c,point:eo.clone(),object:i}}function no(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,Kr),i.getVertexPosition(l,Qr),i.getVertexPosition(c,jr);let h=mp(i,t,e,n,Kr,Qr,jr,Qh);if(h){let u=new H;hi.getBarycoord(Qh,Kr,Qr,jr,u),s&&(h.uv=hi.getInterpolatedAttribute(s,a,l,c,u,new _t)),r&&(h.uv1=hi.getInterpolatedAttribute(r,a,l,c,u,new _t)),o&&(h.normal=hi.getInterpolatedAttribute(o,a,l,c,u,new H),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new H,materialIndex:0};hi.getNormal(Kr,Qr,jr,d.normal),h.face=d,h.barycoord=u}return h}var ir=class extends Ye{constructor(t=null,e=1,n=1,s,r,o,a,l,c=ke,h=ke,u,d){super(null,o,a,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Di=class extends de{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},ns=new Xt,jh=new Xt,io=[],tu=new Fn,gp=new Xt,Gs=new re,Vs=new di,cn=class extends re{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Di(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,gp)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Fn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ns),tu.copy(t.boundingBox).applyMatrix4(ns),this.boundingBox.union(tu)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new di),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ns),Vs.copy(t.boundingSphere).applyMatrix4(ns),this.boundingSphere.union(Vs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),this.morphTexture=t.morphTexture!==null?t.morphTexture.clone():null,this.instanceColor=t.instanceColor!==null?t.instanceColor.clone():null,this.count=t.count,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(Gs.geometry=this.geometry,Gs.material=this.material,Gs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Vs.copy(this.boundingSphere),Vs.applyMatrix4(n),t.ray.intersectsSphere(Vs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ns),jh.multiplyMatrices(n,ns),Gs.matrixWorld=jh,Gs.raycast(t,io);for(let o=0,a=io.length;o<a;o++){let l=io[o];l.instanceId=r,l.object=this,e.push(l)}io.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Di(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new ir(new Float32Array(s*this.count),s,this.count,na,_n));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;return r[l]=a,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Li=new di,xp=new _t(.5,.5),so=new H,pi=class{constructor(t=new mn,e=new mn,n=new mn,s=new mn,r=new mn,o=new mn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=gn,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],m=r[8],y=r[9],p=r[10],g=r[11],_=r[12],w=r[13],v=r[14],A=r[15];if(s[0].setComponents(c-o,f-h,g-m,A-_).normalize(),s[1].setComponents(c+o,f+h,g+m,A+_).normalize(),s[2].setComponents(c+a,f+u,g+y,A+w).normalize(),s[3].setComponents(c-a,f-u,g-y,A-w).normalize(),n)s[4].setComponents(l,d,p,v).normalize(),s[5].setComponents(c-l,f-d,g-p,A-v).normalize();else if(s[4].setComponents(c-l,f-d,g-p,A-v).normalize(),e===gn)s[5].setComponents(c+l,f+d,g+p,A+v).normalize();else if(e===cs)s[5].setComponents(l,d,p,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Li.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Li.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Li)}intersectsSprite(t){Li.center.set(0,0,0);let e=xp.distanceTo(t.center);return Li.radius=.7071067811865476+e,Li.applyMatrix4(t.matrixWorld),this.intersectsSphere(Li)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(so.x=s.normal.x>0?t.max.x:t.min.x,so.y=s.normal.y>0?t.max.y:t.min.y,so.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(so)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},eu=new Xt,Ao=class i{constructor(){this.coordinateSystem=gn,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,n=this._frustums;for(let s=0;s<e.length;s++){let r=e[s];eu.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new pi),n[s].setFromProjectionMatrix(eu,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,n=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new pi),e[s].copy(n[s]);return this._count=t._count,this}clone(){return new i().copy(this)}};var sr=class extends Ye{constructor(t=[],e=zi,n,s,r,o,a,l,c,h){super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Tn=class extends Ye{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Jn=class extends Ye{constructor(t,e,n=Rn,s,r,o,a=ke,l=ke,c,h=$n,u=1){if(h!==$n&&h!==jn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:t,height:e,depth:u};super(d,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new fs(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},rr=class extends Jn{constructor(t,e=Rn,n=zi,s,r,o=ke,a=ke,l,c=$n){let h={width:t,height:t,depth:1},u=[h,h,h,h,h,h];super(t,t,e,n,s,r,o,a,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},or=class extends Ye{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Ct=class i extends pe{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,f=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,s,o,2),m("x","z","y",1,-1,t,n,-e,s,o,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new qt(c,3)),this.setAttribute("normal",new qt(h,3)),this.setAttribute("uv",new qt(u,2));function m(y,p,g,_,w,v,A,R,x,M,U){let S=v/x,P=A/M,N=v/2,k=A/2,I=R/2,G=x+1,B=M+1,F=0,L=0,b=new H;for(let C=0;C<B;C++){let O=C*P-k;for(let q=0;q<G;q++){let J=q*S-N;b[y]=J*_,b[p]=O*w,b[g]=I,c.push(b.x,b.y,b.z),b[y]=0,b[p]=0,b[g]=R>0?1:-1,h.push(b.x,b.y,b.z),u.push(q/x),u.push(1-C/M),F+=1}}for(let C=0;C<M;C++)for(let O=0;O<x;O++){let q=d+O+G*C,J=d+O+G*(C+1),V=d+(O+1)+G*(C+1),tt=d+(O+1)+G*C;l.push(q,J,tt),l.push(J,V,tt),L+=6}a.addGroup(f,L,U),f+=L,d+=F}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Ni=class i extends pe{constructor(t=1,e=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:n,radialSegments:s,heightSegments:r},e=Math.max(0,e),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let o=[],a=[],l=[],c=[],h=e/2,u=Math.PI/2*t,d=e,f=2*u+d,m=n*2+r,y=s+1,p=new H,g=new H;for(let _=0;_<=m;_++){let w=0,v=0,A=0,R=0;if(_<=n){let U=_/n,S=U*Math.PI/2;v=-h-t*Math.cos(S),A=t*Math.sin(S),R=-t*Math.cos(S),w=U*u}else if(_<=n+r){let U=(_-n)/r;v=-h+U*e,A=t,R=0,w=u+U*d}else{let U=(_-n-r)/n,S=U*Math.PI/2;v=h+t*Math.sin(S),A=t*Math.cos(S),R=t*Math.sin(S),w=u+d+U*u}let x=Math.max(0,Math.min(1,w/f)),M=0;_===0?M=.5/s:_===m&&(M=-.5/s);for(let U=0;U<=s;U++){let S=U/s,P=S*Math.PI*2,N=Math.sin(P),k=Math.cos(P);g.x=-A*k,g.y=v,g.z=A*N,a.push(g.x,g.y,g.z),p.set(-A*k,R,A*N),p.normalize(),l.push(p.x,p.y,p.z),c.push(S+M,x)}if(_>0){let U=(_-1)*y;for(let S=0;S<s;S++){let P=U+S,N=U+S+1,k=_*y+S,I=_*y+S+1;o.push(P,N,k),o.push(N,I,k)}}}this.setIndex(o),this.setAttribute("position",new qt(a,3)),this.setAttribute("normal",new qt(l,3)),this.setAttribute("uv",new qt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}};var he=class i extends pe{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],d=[],f=[],m=0,y=[],p=n/2,g=0;_(),o===!1&&(t>0&&w(!0),e>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new qt(u,3)),this.setAttribute("normal",new qt(d,3)),this.setAttribute("uv",new qt(f,2));function _(){let v=new H,A=new H,R=0,x=(e-t)/n;for(let M=0;M<=r;M++){let U=[],S=M/r,P=S*(e-t)+t;for(let N=0;N<=s;N++){let k=N/s,I=k*l+a,G=Math.sin(I),B=Math.cos(I);A.x=P*G,A.y=-S*n+p,A.z=P*B,u.push(A.x,A.y,A.z),v.set(G,x,B).normalize(),d.push(v.x,v.y,v.z),f.push(k,1-S),U.push(m++)}y.push(U)}for(let M=0;M<s;M++)for(let U=0;U<r;U++){let S=y[U][M],P=y[U+1][M],N=y[U+1][M+1],k=y[U][M+1];(t>0||U!==0)&&(h.push(S,P,k),R+=3),(e>0||U!==r-1)&&(h.push(P,N,k),R+=3)}c.addGroup(g,R,0),g+=R}function w(v){let A=m,R=new _t,x=new H,M=0,U=v===!0?t:e,S=v===!0?1:-1;for(let N=1;N<=s;N++)u.push(0,p*S,0),d.push(0,S,0),f.push(.5,.5),m++;let P=m;for(let N=0;N<=s;N++){let I=N/s*l+a,G=Math.cos(I),B=Math.sin(I);x.x=U*B,x.y=p*S,x.z=U*G,u.push(x.x,x.y,x.z),d.push(0,S,0),R.x=G*.5+.5,R.y=B*.5*S+.5,f.push(R.x,R.y),m++}for(let N=0;N<s;N++){let k=A+N,I=P+N;v===!0?h.push(I,I+1,k):h.push(I+1,I,k),M+=3}c.addGroup(g,M,v===!0?1:2),g+=M}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},hn=class i extends he{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ro=class i extends pe{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],o=[];a(s),c(n),h(),this.setAttribute("position",new qt(r,3)),this.setAttribute("normal",new qt(r.slice(),3)),this.setAttribute("uv",new qt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(_){let w=new H,v=new H,A=new H;for(let R=0;R<e.length;R+=3)f(e[R+0],w),f(e[R+1],v),f(e[R+2],A),l(w,v,A,_)}function l(_,w,v,A){let R=A+1,x=[];for(let M=0;M<=R;M++){x[M]=[];let U=_.clone().lerp(v,M/R),S=w.clone().lerp(v,M/R),P=R-M;for(let N=0;N<=P;N++)N===0&&M===R?x[M][N]=U:x[M][N]=U.clone().lerp(S,N/P)}for(let M=0;M<R;M++)for(let U=0;U<2*(R-M)-1;U++){let S=Math.floor(U/2);U%2===0?(d(x[M][S+1]),d(x[M+1][S]),d(x[M][S])):(d(x[M][S+1]),d(x[M+1][S+1]),d(x[M+1][S]))}}function c(_){let w=new H;for(let v=0;v<r.length;v+=3)w.x=r[v+0],w.y=r[v+1],w.z=r[v+2],w.normalize().multiplyScalar(_),r[v+0]=w.x,r[v+1]=w.y,r[v+2]=w.z}function h(){let _=new H;for(let w=0;w<r.length;w+=3){_.x=r[w+0],_.y=r[w+1],_.z=r[w+2];let v=p(_)/2/Math.PI+.5,A=g(_)/Math.PI+.5;o.push(v,1-A)}m(),u()}function u(){for(let _=0;_<o.length;_+=6){let w=o[_+0],v=o[_+2],A=o[_+4],R=Math.max(w,v,A),x=Math.min(w,v,A);R>.9&&x<.1&&(w<.2&&(o[_+0]+=1),v<.2&&(o[_+2]+=1),A<.2&&(o[_+4]+=1))}}function d(_){r.push(_.x,_.y,_.z)}function f(_,w){let v=_*3;w.x=t[v+0],w.y=t[v+1],w.z=t[v+2]}function m(){let _=new H,w=new H,v=new H,A=new H,R=new _t,x=new _t,M=new _t;for(let U=0,S=0;U<r.length;U+=9,S+=6){_.set(r[U+0],r[U+1],r[U+2]),w.set(r[U+3],r[U+4],r[U+5]),v.set(r[U+6],r[U+7],r[U+8]),R.set(o[S+0],o[S+1]),x.set(o[S+2],o[S+3]),M.set(o[S+4],o[S+5]),A.copy(_).add(w).add(v).divideScalar(3);let P=p(A);y(R,S+0,_,P),y(x,S+2,w,P),y(M,S+4,v,P)}}function y(_,w,v,A){A<0&&_.x===1&&(o[w]=_.x-1),v.x===0&&v.z===0&&(o[w]=A/2/Math.PI+.5)}function p(_){return Math.atan2(_.z,-_.x)}function g(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.detail)}};var un=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Wt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);let h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new _t:new H);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new H,s=[],r=[],o=[],a=new H,l=new Xt;for(let f=0;f<=t;f++){let m=f/t;s[f]=this.getTangentAt(m,new H)}r[0]=new H,o[0]=new H;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos(se(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,m))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(se(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(s[m],f*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}},xs=class extends un{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new _t){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Co=class extends xs{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function uc(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}var nu=new H,iu=new H,bl=new uc,El=new uc,wl=new uc,Po=class extends un{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new H){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(iu.subVectors(s[0],s[1]).add(s[0]),c=iu);let u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(nu.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=nu),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(u),f),y=Math.pow(u.distanceToSquared(d),f),p=Math.pow(d.distanceToSquared(h),f);y<1e-4&&(y=1),m<1e-4&&(m=y),p<1e-4&&(p=y),bl.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,m,y,p),El.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,m,y,p),wl.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,m,y,p)}else this.curveType==="catmullrom"&&(bl.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),El.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),wl.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(bl.calc(l),El.calc(l),wl.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new H().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function su(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function _p(i,t){let e=1-i;return e*e*t}function yp(i,t){return 2*(1-i)*i*t}function vp(i,t){return i*i*t}function Zs(i,t,e,n){return _p(i,t)+yp(i,e)+vp(i,n)}function Mp(i,t){let e=1-i;return e*e*e*t}function Sp(i,t){let e=1-i;return 3*e*e*i*t}function bp(i,t){return 3*(1-i)*i*i*t}function Ep(i,t){return i*i*i*t}function $s(i,t,e,n,s){return Mp(i,t)+Sp(i,e)+bp(i,n)+Ep(i,s)}var ar=class extends un{constructor(t=new _t,e=new _t,n=new _t,s=new _t){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new _t){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set($s(t,s.x,r.x,o.x,a.x),$s(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Io=class extends un{constructor(t=new H,e=new H,n=new H,s=new H){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new H){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set($s(t,s.x,r.x,o.x,a.x),$s(t,s.y,r.y,o.y,a.y),$s(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},lr=class extends un{constructor(t=new _t,e=new _t){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new _t){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new _t){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Lo=class extends un{constructor(t=new H,e=new H){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new H){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new H){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},cr=class extends un{constructor(t=new _t,e=new _t,n=new _t){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new _t){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Zs(t,s.x,r.x,o.x),Zs(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Do=class extends un{constructor(t=new H,e=new H,n=new H){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new H){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Zs(t,s.x,r.x,o.x),Zs(t,s.y,r.y,o.y),Zs(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},hr=class extends un{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new _t){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(su(a,l.x,c.x,h.x,u.x),su(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new _t().fromArray(s))}return this}},Il=Object.freeze({__proto__:null,ArcCurve:Co,CatmullRomCurve3:Po,CubicBezierCurve:ar,CubicBezierCurve3:Io,EllipseCurve:xs,LineCurve:lr,LineCurve3:Lo,QuadraticBezierCurve:cr,QuadraticBezierCurve3:Do,SplineCurve:hr}),No=class extends un{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Il[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this.cacheLengths=null,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new Il[s.type]().fromJSON(s))}return this.cacheLengths=null,this}},ur=class extends No{constructor(t){super(),this.type="Path",this.currentPoint=new _t,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new lr(this.currentPoint.clone(),new _t(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new cr(this.currentPoint.clone(),new _t(t,e),new _t(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new ar(this.currentPoint.clone(),new _t(t,e),new _t(n,s),new _t(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new hr(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,o,a,l),this}absellipse(t,e,n,s,r,o,a,l){let c=new xs(t,e,n,s,r,o,a,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},xn=class extends ur{constructor(t){super(t),this.uuid=Gi(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new ur().fromJSON(s))}return this}};function wp(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=nd(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=Pp(i,t,r,e)),i.length>80*e){a=i[0],l=i[1];let h=a,u=l;for(let d=e;d<s;d+=e){let f=i[d],m=i[d+1];f<a&&(a=f),m<l&&(l=m),f>h&&(h=f),m>u&&(u=m)}c=Math.max(h-a,u-l),c=c!==0?32767/c:0}return dr(r,o,e,a,l,c,0),o}function nd(i,t,e,n,s){let r;if(s===Hp(i,t,e,n)>0)for(let o=t;o<e;o+=n)r=ru(o/n|0,i[o],i[o+1],r);else for(let o=e-n;o>=t;o-=n)r=ru(o/n|0,i[o],i[o+1],r);return r&&_s(r,r.next)&&(pr(r),r=r.next),r}function Ui(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(_s(e,e.next)||Te(e.prev,e,e.next)===0)){if(pr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function dr(i,t,e,n,s,r,o){if(!i)return;!o&&r&&Up(i,n,s,r);let a=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?Ap(i,n,s,r):Tp(i)){t.push(l.i,i.i,c.i),pr(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=Rp(Ui(i),t),dr(i,t,e,n,s,r,2)):o===2&&Cp(i,t,e,n,s,r):dr(Ui(i),t,e,n,s,r,1);break}}}function Tp(i){let t=i.prev,e=i,n=i.next;if(Te(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=Math.min(s,r,o),u=Math.min(a,l,c),d=Math.max(s,r,o),f=Math.max(a,l,c),m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=d&&m.y>=u&&m.y<=f&&Ws(s,a,r,l,o,c,m.x,m.y)&&Te(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Ap(i,t,e,n){let s=i.prev,r=i,o=i.next;if(Te(s,r,o)>=0)return!1;let a=s.x,l=r.x,c=o.x,h=s.y,u=r.y,d=o.y,f=Math.min(a,l,c),m=Math.min(h,u,d),y=Math.max(a,l,c),p=Math.max(h,u,d),g=Ll(f,m,t,e,n),_=Ll(y,p,t,e,n),w=i.prevZ,v=i.nextZ;for(;w&&w.z>=g&&v&&v.z<=_;){if(w.x>=f&&w.x<=y&&w.y>=m&&w.y<=p&&w!==s&&w!==o&&Ws(a,h,l,u,c,d,w.x,w.y)&&Te(w.prev,w,w.next)>=0||(w=w.prevZ,v.x>=f&&v.x<=y&&v.y>=m&&v.y<=p&&v!==s&&v!==o&&Ws(a,h,l,u,c,d,v.x,v.y)&&Te(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;w&&w.z>=g;){if(w.x>=f&&w.x<=y&&w.y>=m&&w.y<=p&&w!==s&&w!==o&&Ws(a,h,l,u,c,d,w.x,w.y)&&Te(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;v&&v.z<=_;){if(v.x>=f&&v.x<=y&&v.y>=m&&v.y<=p&&v!==s&&v!==o&&Ws(a,h,l,u,c,d,v.x,v.y)&&Te(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function Rp(i,t){let e=i;do{let n=e.prev,s=e.next.next;!_s(n,s)&&sd(n,e,e.next,s)&&fr(n,s)&&fr(s,n)&&(t.push(n.i,e.i,s.i),pr(e),pr(e.next),e=i=s),e=e.next}while(e!==i);return Ui(e)}function Cp(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Bp(o,a)){let l=rd(o,a);o=Ui(o,o.next),l=Ui(l,l.next),dr(o,t,e,n,s,r,0),dr(l,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function Pp(i,t,e,n){let s=[];for(let r=0,o=t.length;r<o;r++){let a=t[r]*n,l=r<o-1?t[r+1]*n:i.length,c=nd(i,a,l,n,!1);c===c.next&&(c.steiner=!0),s.push(Op(c))}s.sort(Ip);for(let r=0;r<s.length;r++)e=Lp(s[r],e);return e}function Ip(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function Lp(i,t){let e=Dp(i,t);if(!e)return t;let n=rd(e,i);return Ui(n,n.next),Ui(e,e.next)}function Dp(i,t){let e=t,n=i.x,s=i.y,r=-1/0,o;if(_s(i,e))return e;do{if(_s(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let u=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,o=e.x<e.next.x?e:e.next,u===n))return o}e=e.next}while(e!==t);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;e=o;do{if(n>=e.x&&e.x>=l&&n!==e.x&&id(s<c?n:r,s,l,c,s<c?r:n,s,e.x,e.y)){let u=Math.abs(s-e.y)/(n-e.x);fr(e,i)&&(u<h||u===h&&(e.x>o.x||e.x===o.x&&Np(o,e)))&&(o=e,h=u)}e=e.next}while(e!==a);return o}function Np(i,t){return Te(i.prev,i,t.prev)<0&&Te(t.next,i,i.next)<0}function Up(i,t,e,n){let s=i;do s.z===0&&(s.z=Ll(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Fp(s)}function Fp(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let c=0;c<e&&(a++,o=o.nextZ,!!o);c++);let l=e;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,e*=2}while(t>1);return i}function Ll(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Op(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function id(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function Ws(i,t,e,n,s,r,o,a){return!(i===o&&t===a)&&id(i,t,e,n,s,r,o,a)}function Bp(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!kp(i,t)&&(fr(i,t)&&fr(t,i)&&zp(i,t)&&(Te(i.prev,i,t.prev)||Te(i,t.prev,t))||_s(i,t)&&Te(i.prev,i,i.next)>0&&Te(t.prev,t,t.next)>0)}function Te(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function _s(i,t){return i.x===t.x&&i.y===t.y}function sd(i,t,e,n){let s=oo(Te(i,t,e)),r=oo(Te(i,t,n)),o=oo(Te(e,n,i)),a=oo(Te(e,n,t));return!!(s!==r&&o!==a||s===0&&ro(i,e,t)||r===0&&ro(i,n,t)||o===0&&ro(e,i,n)||a===0&&ro(e,t,n))}function ro(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function oo(i){return i>0?1:i<0?-1:0}function kp(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&sd(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function fr(i,t){return Te(i.prev,i,i.next)<0?Te(i,t,i.next)>=0&&Te(i,i.prev,t)>=0:Te(i,t,i.prev)<0||Te(i,i.next,t)<0}function zp(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function rd(i,t){let e=Dl(i.i,i.x,i.y),n=Dl(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function ru(i,t,e,n){let s=Dl(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function pr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Dl(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Hp(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Nl=class{static triangulate(t,e,n=2){return wp(t,e,n)}},Nn=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];ou(t),au(n,t);let o=t.length;e.forEach(ou);for(let l=0;l<e.length;l++)s.push(o),o+=e[l].length,au(n,e[l]);let a=Nl.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function ou(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function au(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var mi=class i extends pe{constructor(t=new xn([new _t(.5,.5),new _t(-.5,.5),new _t(-.5,-.5),new _t(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let a=0,l=t.length;a<l;a++){let c=t[a];o(c)}this.setAttribute("position",new qt(s,3)),this.setAttribute("uv",new qt(r,2)),this.computeVertexNormals();function o(a){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1,d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:f-.1,y=e.bevelOffset!==void 0?e.bevelOffset:0,p=e.bevelSegments!==void 0?e.bevelSegments:3,g=e.extrudePath,_=e.UVGenerator!==void 0?e.UVGenerator:Gp,w,v=!1,A,R,x,M;if(g){w=g.getSpacedPoints(h),v=!0,d=!1;let K=g.isCatmullRomCurve3?g.closed:!1;A=g.computeFrenetFrames(h,K),R=new H,x=new H,M=new H}d||(p=0,f=0,m=0,y=0);let U=a.extractPoints(c),S=U.shape,P=U.holes;if(!Nn.isClockWise(S)){S=S.reverse();for(let K=0,at=P.length;K<at;K++){let ht=P[K];Nn.isClockWise(ht)&&(P[K]=ht.reverse())}}function k(K){let ht=10000000000000001e-36,Rt=K[0];for(let ft=1;ft<=K.length;ft++){let Dt=ft%K.length,Nt=K[Dt],Zt=Nt.x-Rt.x,ne=Nt.y-Rt.y,oe=Zt*Zt+ne*ne,X=Math.max(Math.abs(Nt.x),Math.abs(Nt.y),Math.abs(Rt.x),Math.abs(Rt.y)),Ce=ht*X*X;if(oe<=Ce){K.splice(Dt,1),ft--;continue}Rt=Nt}}k(S),P.forEach(k);let I=P.length,G=S;for(let K=0;K<I;K++){let at=P[K];S=S.concat(at)}function B(K,at,ht){return at||Yt("ExtrudeGeometry: vec does not exist"),K.clone().addScaledVector(at,ht)}let F=S.length;function L(K,at,ht){let Rt,ft,Dt,Nt=K.x-at.x,Zt=K.y-at.y,ne=ht.x-K.x,oe=ht.y-K.y,X=Nt*Nt+Zt*Zt,Ce=Nt*oe-Zt*ne;if(Math.abs(Ce)>Number.EPSILON){let ie=Math.sqrt(X),xe=Math.sqrt(ne*ne+oe*oe),Et=at.x-Zt/ie,Re=at.y+Nt/ie,Vt=ht.x-oe/xe,$t=ht.y+ne/xe,D=((Vt-Et)*oe-($t-Re)*ne)/(Nt*oe-Zt*ne);Rt=Et+Nt*D-K.x,ft=Re+Zt*D-K.y;let E=Rt*Rt+ft*ft;if(E<=2)return new _t(Rt,ft);Dt=Math.sqrt(E/2)}else{let ie=!1;Nt>Number.EPSILON?ne>Number.EPSILON&&(ie=!0):Nt<-Number.EPSILON?ne<-Number.EPSILON&&(ie=!0):Math.sign(Zt)===Math.sign(oe)&&(ie=!0),ie?(Rt=-Zt,ft=Nt,Dt=Math.sqrt(X)):(Rt=Nt,ft=Zt,Dt=Math.sqrt(X/2))}return new _t(Rt/Dt,ft/Dt)}let b=[];for(let K=0,at=G.length,ht=at-1,Rt=K+1;K<at;K++,ht++,Rt++)ht===at&&(ht=0),Rt===at&&(Rt=0),b[K]=L(G[K],G[ht],G[Rt]);let C=[],O,q=b.concat();for(let K=0,at=I;K<at;K++){let ht=P[K];O=[];for(let Rt=0,ft=ht.length,Dt=ft-1,Nt=Rt+1;Rt<ft;Rt++,Dt++,Nt++)Dt===ft&&(Dt=0),Nt===ft&&(Nt=0),O[Rt]=L(ht[Rt],ht[Dt],ht[Nt]);C.push(O),q=q.concat(O)}let J;if(p===0)J=Nn.triangulateShape(G,P);else{let K=[],at=[];for(let ht=0;ht<p;ht++){let Rt=ht/p,ft=f*Math.cos(Rt*Math.PI/2),Dt=m*Math.sin(Rt*Math.PI/2)+y;for(let Nt=0,Zt=G.length;Nt<Zt;Nt++){let ne=B(G[Nt],b[Nt],Dt);nt(ne.x,ne.y,-ft),Rt===0&&K.push(ne)}for(let Nt=0,Zt=I;Nt<Zt;Nt++){let ne=P[Nt];O=C[Nt];let oe=[];for(let X=0,Ce=ne.length;X<Ce;X++){let ie=B(ne[X],O[X],Dt);nt(ie.x,ie.y,-ft),Rt===0&&oe.push(ie)}Rt===0&&at.push(oe)}}J=Nn.triangulateShape(K,at)}let V=J.length,tt=m+y;for(let K=0;K<F;K++){let at=d?B(S[K],q[K],tt):S[K];v?(x.copy(A.normals[0]).multiplyScalar(at.x),R.copy(A.binormals[0]).multiplyScalar(at.y),M.copy(w[0]).add(x).add(R),nt(M.x,M.y,M.z)):nt(at.x,at.y,0)}for(let K=1;K<=h;K++)for(let at=0;at<F;at++){let ht=d?B(S[at],q[at],tt):S[at];v?(x.copy(A.normals[K]).multiplyScalar(ht.x),R.copy(A.binormals[K]).multiplyScalar(ht.y),M.copy(w[K]).add(x).add(R),nt(M.x,M.y,M.z)):nt(ht.x,ht.y,u/h*K)}for(let K=p-1;K>=0;K--){let at=K/p,ht=f*Math.cos(at*Math.PI/2),Rt=m*Math.sin(at*Math.PI/2)+y;for(let ft=0,Dt=G.length;ft<Dt;ft++){let Nt=B(G[ft],b[ft],Rt);nt(Nt.x,Nt.y,u+ht)}for(let ft=0,Dt=P.length;ft<Dt;ft++){let Nt=P[ft];O=C[ft];for(let Zt=0,ne=Nt.length;Zt<ne;Zt++){let oe=B(Nt[Zt],O[Zt],Rt);v?nt(oe.x,oe.y+w[h-1].y,w[h-1].x+ht):nt(oe.x,oe.y,u+ht)}}}ct(),lt();function ct(){let K=s.length/3;if(d){let at=0,ht=F*at;for(let Rt=0;Rt<V;Rt++){let ft=J[Rt];ut(ft[2]+ht,ft[1]+ht,ft[0]+ht)}at=h+p*2,ht=F*at;for(let Rt=0;Rt<V;Rt++){let ft=J[Rt];ut(ft[0]+ht,ft[1]+ht,ft[2]+ht)}}else{for(let at=0;at<V;at++){let ht=J[at];ut(ht[2],ht[1],ht[0])}for(let at=0;at<V;at++){let ht=J[at];ut(ht[0]+F*h,ht[1]+F*h,ht[2]+F*h)}}n.addGroup(K,s.length/3-K,0)}function lt(){let K=s.length/3,at=0;Q(G,at),at+=G.length;for(let ht=0,Rt=P.length;ht<Rt;ht++){let ft=P[ht];Q(ft,at),at+=ft.length}n.addGroup(K,s.length/3-K,1)}function Q(K,at){let ht=K.length;for(;--ht>=0;){let Rt=ht,ft=ht-1;ft<0&&(ft=K.length-1);for(let Dt=0,Nt=h+p*2;Dt<Nt;Dt++){let Zt=F*Dt,ne=F*(Dt+1),oe=at+Rt+Zt,X=at+ft+Zt,Ce=at+ft+ne,ie=at+Rt+ne;xt(oe,X,Ce,ie)}}}function nt(K,at,ht){l.push(K),l.push(at),l.push(ht)}function ut(K,at,ht){At(K),At(at),At(ht);let Rt=s.length/3,ft=_.generateTopUV(n,s,Rt-3,Rt-2,Rt-1);zt(ft[0]),zt(ft[1]),zt(ft[2])}function xt(K,at,ht,Rt){At(K),At(at),At(Rt),At(at),At(ht),At(Rt);let ft=s.length/3,Dt=_.generateSideWallUV(n,s,ft-6,ft-3,ft-2,ft-1);zt(Dt[0]),zt(Dt[1]),zt(Dt[3]),zt(Dt[1]),zt(Dt[2]),zt(Dt[3])}function At(K){s.push(l[K*3+0]),s.push(l[K*3+1]),s.push(l[K*3+2])}function zt(K){r.push(K.x),r.push(K.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Vp(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];n.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Il[s.type]().fromJSON(s)),new i(n,t.options)}},Gp={generateTopUV:function(i,t,e,n,s){let r=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new _t(r,o),new _t(a,l),new _t(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){let o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[s*3],f=t[s*3+1],m=t[s*3+2],y=t[r*3],p=t[r*3+1],g=t[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new _t(o,1-l),new _t(c,1-u),new _t(d,1-m),new _t(y,1-g)]:[new _t(a,1-l),new _t(h,1-u),new _t(f,1-m),new _t(p,1-g)]}};function Vp(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var On=class i extends Ro{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var De=class i extends pe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=t/a,d=e/l,f=[],m=[],y=[],p=[];for(let g=0;g<h;g++){let _=g*d-o;for(let w=0;w<c;w++){let v=w*u-r;m.push(v,-_,0),y.push(0,0,1),p.push(w/a),p.push(1-g/l)}}for(let g=0;g<l;g++)for(let _=0;_<a;_++){let w=_+c*g,v=_+c*(g+1),A=_+1+c*(g+1),R=_+1+c*g;f.push(w,v,R),f.push(v,A,R)}this.setIndex(f),this.setAttribute("position",new qt(m,3)),this.setAttribute("normal",new qt(y,3)),this.setAttribute("uv",new qt(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var mr=class i extends pe{constructor(t=new xn([new _t(0,.5),new _t(-.5,-.5),new _t(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],s=[],r=[],o=[],a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new qt(s,3)),this.setAttribute("normal",new qt(r,3)),this.setAttribute("uv",new qt(o,2));function c(h){let u=s.length/3,d=h.extractPoints(e),f=d.shape,m=d.holes;Nn.isClockWise(f)===!1&&(f=f.reverse());for(let p=0,g=m.length;p<g;p++){let _=m[p];Nn.isClockWise(_)===!0&&(m[p]=_.reverse())}let y=Nn.triangulateShape(f,m);for(let p=0,g=m.length;p<g;p++){let _=m[p];f=f.concat(_)}for(let p=0,g=f.length;p<g;p++){let _=f[p];s.push(_.x,_.y,0),r.push(0,0,1),o.push(_.x,_.y)}for(let p=0,g=y.length;p<g;p++){let _=y[p],w=_[0]+u,v=_[1]+u,A=_[2]+u;n.push(w,v,A),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return Wp(e,t)}static fromJSON(t,e){let n=[];for(let s=0,r=t.shapes.length;s<r;s++){let o=e[t.shapes[s]];n.push(o)}return new i(n,t.curveSegments)}};function Wp(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){let s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}var nn=class i extends pe{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new H,d=new H,f=[],m=[],y=[],p=[];for(let g=0;g<=n;g++){let _=[],w=g/n,v=o+w*a,A=t*Math.cos(v),R=Math.sqrt(t*t-A*A),x=0;g===0&&o===0?x=.5/e:g===n&&l===Math.PI&&(x=-.5/e);for(let M=0;M<=e;M++){let U=M/e,S=s+U*r;u.x=-R*Math.cos(S),u.y=A,u.z=R*Math.sin(S),m.push(u.x,u.y,u.z),d.copy(u).normalize(),y.push(d.x,d.y,d.z),p.push(U+x,1-w),_.push(c++)}h.push(_)}for(let g=0;g<n;g++)for(let _=0;_<e;_++){let w=h[g][_+1],v=h[g][_],A=h[g+1][_],R=h[g+1][_+1];(g!==0||o>0)&&f.push(w,v,R),(g!==n-1||l<Math.PI)&&f.push(v,A,R)}this.setIndex(f),this.setAttribute("position",new qt(m,3)),this.setAttribute("normal",new qt(y,3)),this.setAttribute("uv",new qt(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var An=class i extends pe{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),s=Math.floor(s);let l=[],c=[],h=[],u=[],d=new H,f=new H,m=new H;for(let y=0;y<=n;y++){let p=o+y/n*a;for(let g=0;g<=s;g++){let _=g/s*r;f.x=(t+e*Math.cos(p))*Math.cos(_),f.y=(t+e*Math.cos(p))*Math.sin(_),f.z=e*Math.sin(p),c.push(f.x,f.y,f.z),d.x=t*Math.cos(_),d.y=t*Math.sin(_),m.subVectors(f,d).normalize(),h.push(m.x,m.y,m.z),u.push(g/s),u.push(y/n)}}for(let y=1;y<=n;y++)for(let p=1;p<=s;p++){let g=(s+1)*y+p-1,_=(s+1)*(y-1)+p-1,w=(s+1)*(y-1)+p,v=(s+1)*y+p;l.push(g,_,v),l.push(_,w,v)}this.setIndex(l),this.setAttribute("position",new qt(c,3)),this.setAttribute("normal",new qt(h,3)),this.setAttribute("uv",new qt(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function Vi(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(lu(s))s.isRenderTargetTexture?(Wt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(lu(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Je(i){let t={};for(let e=0;e<i.length;e++){let n=Vi(i[e]);for(let s in n)t[s]=n[s]}return t}function lu(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Xp(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function dc(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ce.workingColorSpace}var od={clone:Vi,merge:Je},qp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Yp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Bn=class extends fi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=qp,this.fragmentShader=Yp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Vi(t.uniforms),this.uniformsGroups=Xp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Bt().setHex(s.value);break;case"v2":this.uniforms[n].value=new _t().fromArray(s.value);break;case"v3":this.uniforms[n].value=new H().fromArray(s.value);break;case"v4":this.uniforms[n].value=new ve().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Jt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Xt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Uo=class extends Bn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Me=class extends fi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Bt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Bt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fa,this.normalScale=new _t(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Fo=class extends fi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=zu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Oo=class extends fi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function is(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function ao(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var gi=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];t:{e:{let o;n:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break e}o=e.length;break n}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break e}o=n,n=0;break n}break t}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Bo=class extends gi{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Rl,endingEnd:Rl}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Cl:r=t,a=2*e-n;break;case Pl:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Cl:o=t,l=2*n-e;break;case Pl:o=1,l=n+s[1]-s[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-e)/(s-e),y=m*m,p=y*m,g=-d*p+2*d*y-d*m,_=(1+d)*p+(-1.5-2*d)*y+(-.5+d)*m+1,w=(-1-f)*p+(1.5+f)*y+.5*m,v=f*p-f*y;for(let A=0;A!==a;++A)r[A]=g*o[h+A]+_*o[c+A]+w*o[l+A]+v*o[u+A];return r}},ko=class extends gi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(s-e),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}},zo=class extends gi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Ho=class extends gi{interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this.inTangents,u=this.outTangents;if(!h||!u){let m=(n-e)/(s-e),y=1-m;for(let p=0;p!==a;++p)r[p]=o[c+p]*y+o[l+p]*m;return r}let d=a*2,f=t-1;for(let m=0;m!==a;++m){let y=o[c+m],p=o[l+m],g=f*d+m*2,_=u[g],w=u[g+1],v=t*d+m*2,A=h[v],R=h[v+1],x=$p(n,e,_,A,s);r[m]=ad(x,y,w,R,p)}return r}};function ad(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function Zp(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function $p(i,t,e,n,s){let r=(i-t)/(s-t);for(let o=0;o<8;o++){let a=ad(r,t,e,n,s)-i;if(Math.abs(a)<1e-10)break;let l=Zp(r,t,e,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var dn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=is(e,this.TimeBufferType),this.values=is(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:is(t.times,Array),values:is(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),ao(t.settings)&&(n.settings={inTangents:is(t.settings.inTangents,Array),outTangents:is(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new zo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new ko(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Bo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Ho(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Js:e=this.InterpolantFactoryMethodDiscrete;break;case So:e=this.InterpolantFactoryMethodLinear;break;case ho:e=this.InterpolantFactoryMethodSmooth;break;case Al:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Wt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Js;case this.InterpolantFactoryMethodLinear:return So;case this.InterpolantFactoryMethodSmooth:return ho;case this.InterpolantFactoryMethodBezier:return Al}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t;ao(this.settings)&&(cu(this.settings.inTangents,t),cu(this.settings.outTangents,t))}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;ao(this.settings)&&(hu(this.settings.inTangents,t),hu(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Yt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Yt("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){Yt("KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){Yt("KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&Of(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){Yt("KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===ho,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(s)l=!0;else{let u=a*n,d=u-n,f=u+n;for(let m=0;m!==n;++m){let y=e[u+m];if(y!==e[d+m]||y!==e[f+m]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)e[d+f]=e[u+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,ao(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function cu(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]+=t}function hu(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}dn.prototype.ValueTypeName="";dn.prototype.TimeBufferType=Float32Array;dn.prototype.ValueBufferType=Float32Array;dn.prototype.DefaultInterpolation=So;var xi=class extends dn{constructor(t,e,n){super(t,e,n)}};xi.prototype.ValueTypeName="bool";xi.prototype.ValueBufferType=Array;xi.prototype.DefaultInterpolation=Js;xi.prototype.InterpolantFactoryMethodLinear=void 0;xi.prototype.InterpolantFactoryMethodSmooth=void 0;var Go=class extends dn{constructor(t,e,n,s){super(t,e,n,s)}};Go.prototype.ValueTypeName="color";var Vo=class extends dn{constructor(t,e,n,s){super(t,e,n,s)}};Vo.prototype.ValueTypeName="number";var Wo=class extends gi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(s-e),c=t*a;for(let h=c+a;c!==h;c+=4)Le.slerpFlat(r,0,o,c-a,o,c,l);return r}},gr=class extends dn{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Wo(this.times,this.values,this.getValueSize(),t)}};gr.prototype.ValueTypeName="quaternion";gr.prototype.InterpolantFactoryMethodSmooth=void 0;var _i=class extends dn{constructor(t,e,n){super(t,e,n)}};_i.prototype.ValueTypeName="string";_i.prototype.ValueBufferType=Array;_i.prototype.DefaultInterpolation=Js;_i.prototype.InterpolantFactoryMethodLinear=void 0;_i.prototype.InterpolantFactoryMethodSmooth=void 0;var Xo=class extends dn{constructor(t,e,n,s){super(t,e,n,s)}};Xo.prototype.ValueTypeName="vector";var fo={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(uu(i)||(this.files[i]=t))},get:function(i){if(this.enabled!==!1&&!uu(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function uu(i){try{let t=i.slice(i.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}var qo=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],m=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},ld=new qo,ys=class{constructor(t){this.manager=t!==void 0?t:ld,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}setPriority(t){return this.priority=t,this}setCache(t){return this.cache=t,this}abort(){return this}};ys.DEFAULT_MATERIAL_NAME="__DEFAULT";var ss=new WeakMap,Yo=class extends ys{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=fo.get(`image:${t}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0);else{let u=ss.get(o);u===void 0&&(u=[],ss.set(o,u)),u.push({onLoad:e,onError:s})}return o}let a=hs("img");function l(){h(),e&&e(this);let u=ss.get(this)||[];for(let d=0;d<u.length;d++){let f=u[d];f.onLoad&&f.onLoad(this)}ss.delete(this),r.manager.itemEnd(t)}function c(u){h(),s&&s(u),fo.remove(`image:${t}`);let d=ss.get(this)||[];for(let f=0;f<d.length;f++){let m=d[f];m.onError&&m.onError(u)}ss.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),fo.add(`image:${t}`,a),r.manager.itemStart(t),a.fetchPriority=this.priority,a.src=t,a}};var xr=class extends ys{constructor(t){super(t)}load(t,e,n,s){let r=new Ye,o=new Yo(this.manager);return o.setPriority(this.priority),o.setCache(this.cache),o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}},_r=class extends Ze{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Bt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},vs=class extends _r{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ze.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Bt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},Tl=new Xt,du=new H,fu=new H,Zo=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new _t(512,512),this.mapType=sn,this.map=null,this.mapPass=null,this.matrix=new Xt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new pi,this._frameExtents=new _t(1,1),this._viewportCount=1,this._viewports=[new ve(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;du.setFromMatrixPosition(t.matrixWorld),e.position.copy(du),fu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(fu),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){Tl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Tl,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===cs||t.reversedDepth?e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),e.multiply(Tl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},lo=new H,co=new Le,Dn=new H,yr=class extends Ze{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Xt,this.projectionMatrix=new Xt,this.projectionMatrixInverse=new Xt,this.coordinateSystem=gn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(lo,co,Dn),Dn.x===1&&Dn.y===1&&Dn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(lo,co,Dn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(lo,co,Dn),Dn.x===1&&Dn.y===1&&Dn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(lo,co,Dn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ci=new H,pu=new _t,mu=new _t,je=class extends yr{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=ds*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(qs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ds*2*Math.atan(Math.tan(qs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ci.x,ci.y).multiplyScalar(-t/ci.z),ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ci.x,ci.y).multiplyScalar(-t/ci.z)}getViewSize(t,e){return this.getViewBounds(t,pu,mu),e.subVectors(mu,pu)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(qs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var vr=class extends yr{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Ul=class extends Zo{constructor(){super(new vr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Fi=class extends _r{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ze.DEFAULT_UP),this.updateMatrix(),this.target=new Ze,this.shadow=new Ul}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var rs=-90,os=1,Ms=class extends Ze{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new je(rs,os,t,e);s.layers=this.layers,this.add(s);let r=new je(rs,os,t,e);r.layers=this.layers,this.add(r);let o=new je(rs,os,t,e);o.layers=this.layers,this.add(o);let a=new je(rs,os,t,e);a.layers=this.layers,this.add(a);let l=new je(rs,os,t,e);l.layers=this.layers,this.add(l);let c=new je(rs,os,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===gn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===cs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let y=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let p=!1;t.isWebGLRenderer===!0?p=t.state.buffers.depth.getReversed():p=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.mipmapsAutoUpdate=y,t.setRenderTarget(n,5,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},$o=class extends je{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}};var fc="\\[\\]\\.:\\/",Jp=new RegExp("["+fc+"]","g"),pc="[^"+fc+"]",Kp="[^"+fc.replace("\\.","")+"]",Qp=/((?:WC+[\/:])*)/.source.replace("WC",pc),jp=/(WCOD+)?/.source.replace("WCOD",Kp),tm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",pc),em=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",pc),nm=new RegExp("^"+Qp+jp+tm+em+"$"),im=["material","materials","bones","map"],Fl=class{constructor(t,e,n){let s=n||Se.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Se=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Jp,"")}static parseTrackName(t){let e=nm.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);im.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Wt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Yt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Yt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Yt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Yt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Yt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Yt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Yt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[s];if(o===void 0){let c=e.nodeName;Yt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Yt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Yt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Se.Composite=Fl;Se.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Se.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Se.prototype.GetterByBindingType=[Se.prototype._getValue_direct,Se.prototype._getValue_array,Se.prototype._getValue_arrayElement,Se.prototype._getValue_toArray];Se.prototype.SetterByBindingTypeAndVersioning=[[Se.prototype._setValue_direct,Se.prototype._setValue_direct_setNeedsUpdate,Se.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Se.prototype._setValue_array,Se.prototype._setValue_array_setNeedsUpdate,Se.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Se.prototype._setValue_arrayElement,Se.prototype._setValue_arrayElement_setNeedsUpdate,Se.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Se.prototype._setValue_fromArray,Se.prototype._setValue_fromArray_setNeedsUpdate,Se.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Iy=new Float32Array(1);var vc=class vc{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};vc.prototype.isMatrix2=!0;var Ol=vc;function mc(i,t,e,n){let s=sm(n);switch(e){case ec:return i*t;case na:return i*t/s.components*s.byteLength;case ia:return i*t/s.components*s.byteLength;case vi:return i*t*2/s.components*s.byteLength;case sa:return i*t*2/s.components*s.byteLength;case nc:return i*t*3/s.components*s.byteLength;case Pn:return i*t*4/s.components*s.byteLength;case ra:return i*t*4/s.components*s.byteLength;case Sr:case br:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Er:case wr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case aa:case ca:return Math.max(i,16)*Math.max(t,8)/4;case oa:case la:return Math.max(i,8)*Math.max(t,8)/2;case ha:case ua:case fa:case pa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case da:case Tr:case ma:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ga:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case xa:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case _a:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ya:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case va:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ma:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Sa:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case ba:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ea:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case wa:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Ta:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Aa:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Ra:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ca:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Pa:case Ia:case La:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Da:case Na:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ar:case Ua:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function sm(i){switch(i){case sn:case Kl:return{byteLength:1,components:1};case As:case Ql:case Cn:return{byteLength:2,components:1};case ta:case ea:return{byteLength:2,components:4};case Rn:case jo:case _n:return{byteLength:4,components:1};case jl:case tc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Wt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function Pd(){let i=null,t=!1,e=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function am(i){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){let h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){let m=u[d],y=u[f];y.start<=m.start+m.count+1?m.count=Math.max(m.count,y.start+y.count-m.start):(++d,u[d]=y)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){let y=u[f];i.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var lm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,cm=`#ifdef USE_ALPHAHASH
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
#endif`,hm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,um=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,dm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,fm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,pm=`#ifdef USE_AOMAP
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
#endif`,mm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,gm=`#ifdef USE_BATCHING
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
#endif`,xm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,_m=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ym=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,vm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Mm=`#ifdef USE_IRIDESCENCE
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
#endif`,Sm=`#ifdef USE_BUMPMAP
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
#endif`,bm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Em=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,wm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Tm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Am=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Rm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Cm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Pm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Im=`#define PI 3.141592653589793
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
} // validated`,Lm=`vec3 transformedNormal = objectNormal;
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
#endif`,Dm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Nm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Um=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Fm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Om="gl_FragColor = linearToOutputTexel( gl_FragColor );",Bm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,km=`#ifdef USE_ENVMAP
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
#endif`,zm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Hm=`#ifdef USE_ENVMAP
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
#endif`,Gm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Vm=`#ifdef USE_ENVMAP
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
#endif`,Wm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Xm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ym=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Zm=`#ifdef USE_GRADIENTMAP
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
}`,$m=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Jm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Km=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Qm=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,jm=`#ifdef USE_ENVMAP
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
#endif`,t0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,e0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,n0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,i0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,s0=`PhysicalMaterial material;
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
#endif`,r0=`uniform sampler2D dfgLUT;
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
}`,o0=`
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
#endif`,a0=`#if defined( RE_IndirectDiffuse )
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
#endif`,l0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,c0=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,h0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,u0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,d0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,f0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,p0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,m0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,g0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,x0=`#if defined( USE_POINTS_UV )
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
#endif`,_0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,y0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,v0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,M0=`#if defined( USE_MORPHCOLORS )
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
#endif`,S0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,b0=`#ifdef USE_MORPHTARGETS
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
#endif`,E0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,w0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,T0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,A0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,R0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,C0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,P0=`#ifdef USE_NORMALMAP
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
#endif`,I0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,L0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,D0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,N0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,U0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,F0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,O0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,B0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,k0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,z0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,H0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,G0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,V0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,W0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,X0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,q0=`float getShadowMask() {
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
}`,Y0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Z0=`#ifdef USE_SKINNING
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
#endif`,$0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,J0=`#ifdef USE_SKINNING
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
#endif`,K0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Q0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,j0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,eg=`#ifdef USE_TRANSMISSION
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
#endif`,ng=`#ifdef USE_TRANSMISSION
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
#endif`,ig=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,rg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,og=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,ag=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,lg=`uniform sampler2D t2D;
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
}`,cg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hg=`uniform float backgroundBlurriness;
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
}`,ug=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fg=`#include <common>
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
}`,pg=`#if DEPTH_PACKING == 3200
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
}`,mg=`#define DISTANCE
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
}`,gg=`#define DISTANCE
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
}`,xg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,_g=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yg=`uniform float scale;
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
}`,vg=`uniform vec3 diffuse;
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
}`,Mg=`#include <common>
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
}`,Sg=`uniform vec3 diffuse;
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
}`,bg=`#define LAMBERT
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
}`,Eg=`#define LAMBERT
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
}`,wg=`#define MATCAP
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
}`,Tg=`#define MATCAP
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
}`,Ag=`#define NORMAL
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
}`,Rg=`#define NORMAL
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
}`,Cg=`#define PHONG
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
}`,Pg=`#define PHONG
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
}`,Ig=`#define STANDARD
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
}`,Lg=`#define STANDARD
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
}`,Dg=`#define TOON
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
}`,Ng=`#define TOON
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
}`,Ug=`uniform float size;
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
}`,Fg=`uniform vec3 diffuse;
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
}`,Og=`#include <common>
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
}`,Bg=`uniform vec3 color;
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
}`,kg=`uniform float rotation;
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
}`,zg=`uniform vec3 diffuse;
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
}`,ee={alphahash_fragment:lm,alphahash_pars_fragment:cm,alphamap_fragment:hm,alphamap_pars_fragment:um,alphatest_fragment:dm,alphatest_pars_fragment:fm,aomap_fragment:pm,aomap_pars_fragment:mm,batching_pars_vertex:gm,batching_vertex:xm,begin_vertex:_m,beginnormal_vertex:ym,bsdfs:vm,iridescence_fragment:Mm,bumpmap_pars_fragment:Sm,clipping_planes_fragment:bm,clipping_planes_pars_fragment:Em,clipping_planes_pars_vertex:wm,clipping_planes_vertex:Tm,color_fragment:Am,color_pars_fragment:Rm,color_pars_vertex:Cm,color_vertex:Pm,common:Im,defaultnormal_vertex:Lm,displacementmap_pars_vertex:Dm,displacementmap_vertex:Nm,emissivemap_fragment:Um,emissivemap_pars_fragment:Fm,colorspace_fragment:Om,colorspace_pars_fragment:Bm,envmap_fragment:km,envmap_common_pars_fragment:zm,envmap_pars_fragment:Hm,envmap_pars_vertex:Gm,envmap_physical_pars_fragment:jm,envmap_vertex:Vm,fog_vertex:Wm,fog_pars_vertex:Xm,fog_fragment:qm,fog_pars_fragment:Ym,gradientmap_pars_fragment:Zm,lightmap_pars_fragment:$m,lights_lambert_fragment:Jm,lights_lambert_pars_fragment:Km,lights_pars_begin:Qm,lights_toon_fragment:t0,lights_toon_pars_fragment:e0,lights_phong_fragment:n0,lights_phong_pars_fragment:i0,lights_physical_fragment:s0,lights_physical_pars_fragment:r0,lights_fragment_begin:o0,lights_fragment_maps:a0,lights_fragment_end:l0,lightprobes_pars_fragment:c0,logdepthbuf_fragment:h0,logdepthbuf_pars_fragment:u0,logdepthbuf_pars_vertex:d0,logdepthbuf_vertex:f0,map_fragment:p0,map_pars_fragment:m0,map_particle_fragment:g0,map_particle_pars_fragment:x0,metalnessmap_fragment:_0,metalnessmap_pars_fragment:y0,morphinstance_vertex:v0,morphcolor_vertex:M0,morphnormal_vertex:S0,morphtarget_pars_vertex:b0,morphtarget_vertex:E0,normal_fragment_begin:w0,normal_fragment_maps:T0,normal_pars_fragment:A0,normal_pars_vertex:R0,normal_vertex:C0,normalmap_pars_fragment:P0,clearcoat_normal_fragment_begin:I0,clearcoat_normal_fragment_maps:L0,clearcoat_pars_fragment:D0,iridescence_pars_fragment:N0,opaque_fragment:U0,packing:F0,premultiplied_alpha_fragment:O0,project_vertex:B0,dithering_fragment:k0,dithering_pars_fragment:z0,roughnessmap_fragment:H0,roughnessmap_pars_fragment:G0,shadowmap_pars_fragment:V0,shadowmap_pars_vertex:W0,shadowmap_vertex:X0,shadowmask_pars_fragment:q0,skinbase_vertex:Y0,skinning_pars_vertex:Z0,skinning_vertex:$0,skinnormal_vertex:J0,specularmap_fragment:K0,specularmap_pars_fragment:Q0,tonemapping_fragment:j0,tonemapping_pars_fragment:tg,transmission_fragment:eg,transmission_pars_fragment:ng,uv_pars_fragment:ig,uv_pars_vertex:sg,uv_vertex:rg,worldpos_vertex:og,background_vert:ag,background_frag:lg,backgroundCube_vert:cg,backgroundCube_frag:hg,cube_vert:ug,cube_frag:dg,depth_vert:fg,depth_frag:pg,distance_vert:mg,distance_frag:gg,equirect_vert:xg,equirect_frag:_g,linedashed_vert:yg,linedashed_frag:vg,meshbasic_vert:Mg,meshbasic_frag:Sg,meshlambert_vert:bg,meshlambert_frag:Eg,meshmatcap_vert:wg,meshmatcap_frag:Tg,meshnormal_vert:Ag,meshnormal_frag:Rg,meshphong_vert:Cg,meshphong_frag:Pg,meshphysical_vert:Ig,meshphysical_frag:Lg,meshtoon_vert:Dg,meshtoon_frag:Ng,points_vert:Ug,points_frag:Fg,shadow_vert:Og,shadow_frag:Bg,sprite_vert:kg,sprite_frag:zg},It={common:{diffuse:{value:new Bt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Jt}},envmap:{envMap:{value:null},envMapRotation:{value:new Jt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Jt},normalScale:{value:new _t(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Bt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Bt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0},uvTransform:{value:new Jt}},sprite:{diffuse:{value:new Bt(16777215)},opacity:{value:1},center:{value:new _t(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}}},Hn={basic:{uniforms:Je([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.fog]),vertexShader:ee.meshbasic_vert,fragmentShader:ee.meshbasic_frag},lambert:{uniforms:Je([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.fog,It.lights,{emissive:{value:new Bt(0)},envMapIntensity:{value:1}}]),vertexShader:ee.meshlambert_vert,fragmentShader:ee.meshlambert_frag},phong:{uniforms:Je([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.fog,It.lights,{emissive:{value:new Bt(0)},specular:{value:new Bt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ee.meshphong_vert,fragmentShader:ee.meshphong_frag},standard:{uniforms:Je([It.common,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.roughnessmap,It.metalnessmap,It.fog,It.lights,{emissive:{value:new Bt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag},toon:{uniforms:Je([It.common,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.gradientmap,It.fog,It.lights,{emissive:{value:new Bt(0)}}]),vertexShader:ee.meshtoon_vert,fragmentShader:ee.meshtoon_frag},matcap:{uniforms:Je([It.common,It.bumpmap,It.normalmap,It.displacementmap,It.fog,{matcap:{value:null}}]),vertexShader:ee.meshmatcap_vert,fragmentShader:ee.meshmatcap_frag},points:{uniforms:Je([It.points,It.fog]),vertexShader:ee.points_vert,fragmentShader:ee.points_frag},dashed:{uniforms:Je([It.common,It.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ee.linedashed_vert,fragmentShader:ee.linedashed_frag},depth:{uniforms:Je([It.common,It.displacementmap]),vertexShader:ee.depth_vert,fragmentShader:ee.depth_frag},normal:{uniforms:Je([It.common,It.bumpmap,It.normalmap,It.displacementmap,{opacity:{value:1}}]),vertexShader:ee.meshnormal_vert,fragmentShader:ee.meshnormal_frag},sprite:{uniforms:Je([It.sprite,It.fog]),vertexShader:ee.sprite_vert,fragmentShader:ee.sprite_frag},background:{uniforms:{uvTransform:{value:new Jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ee.background_vert,fragmentShader:ee.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Jt}},vertexShader:ee.backgroundCube_vert,fragmentShader:ee.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ee.cube_vert,fragmentShader:ee.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ee.equirect_vert,fragmentShader:ee.equirect_frag},distance:{uniforms:Je([It.common,It.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ee.distance_vert,fragmentShader:ee.distance_frag},shadow:{uniforms:Je([It.lights,It.fog,{color:{value:new Bt(0)},opacity:{value:1}}]),vertexShader:ee.shadow_vert,fragmentShader:ee.shadow_frag}};Hn.physical={uniforms:Je([Hn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Jt},clearcoatNormalScale:{value:new _t(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Jt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Jt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Jt},sheen:{value:0},sheenColor:{value:new Bt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Jt},transmissionSamplerSize:{value:new _t},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Jt},attenuationDistance:{value:0},attenuationColor:{value:new Bt(0)},specularColor:{value:new Bt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Jt},anisotropyVector:{value:new _t},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Jt}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag};var Ba={r:0,b:0,g:0},Hg=new Xt,Id=new Jt;Id.set(-1,0,0,0,1,0,0,0,1);function Gg(i,t,e,n,s,r){let o=new Bt(0),a=s===!0?0:1,l,c,h=null,u=0,d=null;function f(_){let w=_.isScene===!0?_.background:null;if(w&&w.isTexture){let v=_.backgroundBlurriness>0;w=t.get(w,v)}return w}function m(_){let w=!1,v=f(_);v===null?p(o,a):v&&v.isColor&&(p(v,1),w=!0);let A=i.xr.getEnvironmentBlendMode();A==="additive"?e.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||w)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(_,w){let v=f(w);v&&v.isCubeTexture?(c===void 0&&(c=new re(new Ct(1,1,1),new Bn({name:"BackgroundCubeMaterial",uniforms:Vi(Hn.backgroundCube.uniforms),vertexShader:Hn.backgroundCube.vertexShader,fragmentShader:Hn.backgroundCube.fragmentShader,side:$e,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,R,x){this.matrixWorld.copyPosition(x.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Hg.makeRotationFromEuler(w.backgroundRotation)).transpose(),v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Id),c.material.toneMapped=ce.getTransfer(v.colorSpace)!==me,(h!==v||u!==v.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=v,u=v.version,d=i.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new re(new De(2,2),new Bn({name:"BackgroundMaterial",uniforms:Vi(Hn.background.uniforms),vertexShader:Hn.background.vertexShader,fragmentShader:Hn.background.fragmentShader,side:yi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=ce.getTransfer(v.colorSpace)!==me,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||u!==v.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=v,u=v.version,d=i.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function p(_,w){_.getRGB(Ba,dc(i)),e.buffers.color.setClear(Ba.r,Ba.g,Ba.b,w,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(_,w=1){o.set(_),a=w,p(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(_){a=_,p(o,a)},render:m,addToRenderList:y,dispose:g}}function Vg(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,o=!1;function a(P,N,k,I,G){let B=!1,F=u(P,I,k,N);r!==F&&(r=F,c(r.object)),B=f(P,I,k,G),B&&m(P,I,k,G),G!==null&&t.update(G,i.ELEMENT_ARRAY_BUFFER),(B||o)&&(o=!1,v(P,N,k,I),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(G).buffer))}function l(){return i.createVertexArray()}function c(P){return i.bindVertexArray(P)}function h(P){return i.deleteVertexArray(P)}function u(P,N,k,I){let G=I.wireframe===!0,B=n[N.id];B===void 0&&(B={},n[N.id]=B);let F=P.isInstancedMesh===!0?P.id:0,L=B[F];L===void 0&&(L={},B[F]=L);let b=L[k.id];b===void 0&&(b={},L[k.id]=b);let C=b[G];return C===void 0&&(C=d(l()),b[G]=C),C}function d(P){let N=[],k=[],I=[];for(let G=0;G<e;G++)N[G]=0,k[G]=0,I[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:k,attributeDivisors:I,object:P,attributes:{},index:null}}function f(P,N,k,I){let G=r.attributes,B=N.attributes,F=0,L=k.getAttributes();for(let b in L)if(L[b].location>=0){let O=G[b],q=B[b];if(q===void 0&&(b==="instanceMatrix"&&P.instanceMatrix&&(q=P.instanceMatrix),b==="instanceColor"&&P.instanceColor&&(q=P.instanceColor)),O===void 0||O.attribute!==q||q&&O.data!==q.data)return!0;F++}return r.attributesNum!==F||r.index!==I}function m(P,N,k,I){let G={},B=N.attributes,F=0,L=k.getAttributes();for(let b in L)if(L[b].location>=0){let O=B[b];O===void 0&&(b==="instanceMatrix"&&P.instanceMatrix&&(O=P.instanceMatrix),b==="instanceColor"&&P.instanceColor&&(O=P.instanceColor));let q={};q.attribute=O,O&&O.data&&(q.data=O.data),G[b]=q,F++}r.attributes=G,r.attributesNum=F,r.index=I}function y(){let P=r.newAttributes;for(let N=0,k=P.length;N<k;N++)P[N]=0}function p(P){g(P,0)}function g(P,N){let k=r.newAttributes,I=r.enabledAttributes,G=r.attributeDivisors;k[P]=1,I[P]===0&&(i.enableVertexAttribArray(P),I[P]=1),G[P]!==N&&(i.vertexAttribDivisor(P,N),G[P]=N)}function _(){let P=r.newAttributes,N=r.enabledAttributes;for(let k=0,I=N.length;k<I;k++)N[k]!==P[k]&&(i.disableVertexAttribArray(k),N[k]=0)}function w(P,N,k,I,G,B,F){F===!0?i.vertexAttribIPointer(P,N,k,G,B):i.vertexAttribPointer(P,N,k,I,G,B)}function v(P,N,k,I){y();let G=I.attributes,B=k.getAttributes(),F=N.defaultAttributeValues;for(let L in B){let b=B[L];if(b.location>=0){let C=G[L];if(C===void 0&&(L==="instanceMatrix"&&P.instanceMatrix&&(C=P.instanceMatrix),L==="instanceColor"&&P.instanceColor&&(C=P.instanceColor)),C!==void 0){let O=C.normalized,q=C.itemSize,J=t.get(C);if(J===void 0)continue;let V=J.buffer,tt=J.type,ct=J.bytesPerElement,lt=tt===i.INT||tt===i.UNSIGNED_INT||C.gpuType===jo;if(C.isInterleavedBufferAttribute){let Q=C.data,nt=Q.isInterleavedBuffer===!0?Q.stride:Q.itemSize,ut=C.offset;if(Q.isInstancedInterleavedBuffer||Q.isInstancedBufferAttribute){for(let xt=0;xt<b.locationSize;xt++)g(b.location+xt,Q.meshPerAttribute);P.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let xt=0;xt<b.locationSize;xt++)p(b.location+xt);i.bindBuffer(i.ARRAY_BUFFER,V);for(let xt=0;xt<b.locationSize;xt++)w(b.location+xt,q/b.locationSize,tt,O,nt*ct,(ut+q/b.locationSize*xt)*ct,lt)}else{if(C.isInstancedBufferAttribute){for(let Q=0;Q<b.locationSize;Q++)g(b.location+Q,C.meshPerAttribute);P.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=C.meshPerAttribute*C.count)}else for(let Q=0;Q<b.locationSize;Q++)p(b.location+Q);i.bindBuffer(i.ARRAY_BUFFER,V);for(let Q=0;Q<b.locationSize;Q++)w(b.location+Q,q/b.locationSize,tt,O,q*ct,q/b.locationSize*Q*ct,lt)}}else if(F!==void 0){let O=F[L];if(O!==void 0)switch(O.length){case 2:i.vertexAttrib2fv(b.location,O);break;case 3:i.vertexAttrib3fv(b.location,O);break;case 4:i.vertexAttrib4fv(b.location,O);break;default:i.vertexAttrib1fv(b.location,O)}}}}_()}function A(){U();for(let P in n){let N=n[P];for(let k in N){let I=N[k];for(let G in I){let B=I[G];for(let F in B)h(B[F].object),delete B[F];delete I[G]}}delete n[P]}}function R(P){if(n[P.id]===void 0)return;let N=n[P.id];for(let k in N){let I=N[k];for(let G in I){let B=I[G];for(let F in B)h(B[F].object),delete B[F];delete I[G]}}delete n[P.id]}function x(P){for(let N in n){let k=n[N];for(let I in k){let G=k[I];if(G[P.id]===void 0)continue;let B=G[P.id];for(let F in B)h(B[F].object),delete B[F];delete G[P.id]}}}function M(P){for(let N in n){let k=n[N],I=P.isInstancedMesh===!0?P.id:0,G=k[I];if(G!==void 0){for(let B in G){let F=G[B];for(let L in F)h(F[L].object),delete F[L];delete G[B]}delete k[I],Object.keys(k).length===0&&delete n[N]}}}function U(){S(),o=!0,r!==s&&(r=s,c(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:U,resetDefaultState:S,dispose:A,releaseStatesOfGeometry:R,releaseStatesOfObject:M,releaseStatesOfProgram:x,initAttributes:y,enableAttribute:p,disableUnusedAttributes:_}}function Wg(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function o(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function a(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let d=0;for(let f=0;f<h;f++)d+=c[f];e.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function Xg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let x=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(x){return!(x!==Pn&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(x){let M=x===Cn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(x!==sn&&x!==_n&&!M&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(x){if(x==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Wt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=e.logarithmicDepthBuffer===!0&&u===!1;e.reversedDepthBuffer===!0&&u===!1&&Wt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&u===!0&&Wt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),_=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=i.getParameter(i.MAX_SAMPLES),R=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:m,maxTextureSize:y,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:_,maxVaryings:w,maxFragmentUniforms:v,maxSamples:A,samples:R}}function qg(i){let t=this,e=null,n=0,s=!1,r=!1,o=new mn,a=new Jt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){let m=u.clippingPlanes,y=u.clipIntersection,p=u.clipShadows,g=i.get(u);if(!s||m===null||m.length===0||r&&!p)r?h(null):c();else{let _=r?0:n,w=_*4,v=g.clippingState||null;l.value=v,v=h(m,d,w,f);for(let A=0;A!==w;++A)v[A]=e[A];g.clippingState=v,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,m){let y=u!==null?u.length:0,p=null;if(y!==0){if(p=l.value,m!==!0||p===null){let g=f+y*4,_=d.matrixWorldInverse;a.getNormalMatrix(_),(p===null||p.length<g)&&(p=new Float32Array(g));for(let w=0,v=f;w!==y;++w,v+=4)o.copy(u[w]).applyMatrix4(_,a),o.normal.toArray(p,v),p[v+3]=o.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,p}}var Pr=class extends ln{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new sr(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ct(5,5,5),r=new Bn({name:"CubemapFromEquirect",uniforms:Vi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:$e,blending:Bi});r.uniforms.tEquirect.value=e;let o=new re(s,r),a=e.minFilter;return e.minFilter===Qn&&(e.minFilter=tn),new Ms(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},cd=256,Yg=3,Zg=20,Ld=256,Dd=16,$g=3,Jg=new H,Kg=new Bt,Cs=class i{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Ms(1,10,null),this._boxMesh=new re(new Ct(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=Jg}=r,l=this._renderer;this._setSize(o);let c=this._allocateTarget(),h=this._getSourceTarget(!0);e>0&&(h.texture.mipmapsAutoUpdate=!1);let u=l.autoClear,d=l.autoClearColor,f=l.autoClearDepth,m=l.autoClearStencil,y=t.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,y===null&&(t.background=l.getClearColor(Kg));let p=new Ms(n,s,h);return p.position.copy(a),p.update(l,t),l.autoClear=u,l.autoClearColor=d,l.autoClearDepth=f,l.autoClearStencil=m,t.background=y,e>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,e)),this._applyPMREM(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=dd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ud(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(cd,cc(t))}_fromTexture(t,e){t.mapping===zi||t.mapping===ws?this._setSize(t.image.length===0?cd:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);let n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){let t=this._cubeSize,e=hd(t,!1,!1),n=Math.log2(t)-Yg;for(let s=0;s<=n;s++)e.texture.mipmaps.push({width:t>>s,height:t>>s});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){let e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=hd(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){let s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=t,r.activeMipmapLevel=e;let o=t.width>>e;t.viewport.set(0,0,o,o),r.update(this._renderer,s),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===zi||t.mapping===ws?(this._cubemapMaterial===null&&(this._cubemapMaterial=dd()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=ud()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=Qg(),this._integrationMaterial=jg());let e=this._cubeSize,n=t.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/Dd);for(let o=0;o<=n;o++){let a=i.lodToRoughness(o,n);if(o>n-$g)r.roughness.value=a,this._renderCube(t,o,this._integrationMaterial);else{let l=a>0?Math.log2(e)+.5*Math.log2(6/(Ld*Math.pow(a,4)))+.5:0;s.roughness.value=a,s.lodBias.value=l,this._renderCube(t,o,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=tx());let n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(t,0,n),s.envMap.value=t.texture,this._renderCube(r,0,n)}};function hd(i,t,e){return new Pr(i,{minFilter:Qn,generateMipmaps:t,type:Cn,colorSpace:Ks,depthBuffer:e})}function Ir(i,t,e){return new Bn({name:i,uniforms:t,vertexShader:ee.cube_vert,fragmentShader:e,side:$e,blending:Bi,depthTest:!1,depthWrite:!1})}function Qg(){return Ir("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Ld}u

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
	`)}function jg(){return Ir("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Dd}},`

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
	`)}function tx(){return Ir("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Zg}
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
	`)}function ud(){return Ir("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function dd(){return Ir("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function ex(i){let t=new WeakMap,e=new WeakMap,n=null;function s(d,f=!1){return d==null?null:f?o(d):r(d)}function r(d){if(d&&d.isTexture){let f=d.mapping;if(f===Ts||f===Ko)if(t.has(d)){let m=t.get(d).texture;return a(m,d.mapping)}else{let m=d.image;if(m&&m.height>0){let y=new Pr(m.height);return y.fromEquirectangularTexture(i,d),t.set(d,y),d.addEventListener("dispose",c),a(y.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture&&d.isPMREMTexture!==!0){let f=d.mapping,m=f===Ts||f===Ko,y=f===zi||f===ws;if(m||y){let p=e.get(d),g=p!==void 0?p.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==g)return n===null&&(n=new Cs(i)),p=m?n.fromEquirectangular(d,p):n.fromCubemap(d,p),p.texture.pmremVersion=d.pmremVersion,e.set(d,p),p.texture;if(p!==void 0)return p.texture;{let _=d.image;return m&&_&&_.height>0||y&&_&&l(_)?(n===null&&(n=new Cs(i)),p=m?n.fromEquirectangular(d):n.fromCubemap(d),p.texture.pmremVersion=d.pmremVersion,e.set(d,p),d.addEventListener("dispose",h),p.texture):null}}}return d}function a(d,f){return f===Ts?d.mapping=zi:f===Ko&&(d.mapping=ws),d}function l(d){let f=0,m=6;for(let y=0;y<m;y++)d[y]!==void 0&&f++;return f===m}function c(d){let f=d.target;f.removeEventListener("dispose",c);let m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function h(d){let f=d.target;f.removeEventListener("dispose",h);let m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function u(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function nx(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Xs("WebGLRenderer: "+n+" extension not supported."),s}}}function ix(i,t,e,n){let s={},r=new WeakMap,o=new FinalizationRegistry(m=>delete s[m]);function a(m){l(m.target)}function l(m){m.index!==null&&t.remove(m.index);for(let p in m.attributes)t.remove(m.attributes[p]);m.removeEventListener("dispose",a),delete s[m.id],o.unregister(m);let y=r.get(m);y&&(t.remove(y),r.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,e.memory.geometries--}function c(m,y){return s[y.id]!==void 0||(y.addEventListener("dispose",a),s[y.id]=new WeakRef(y),o.register(y,y.id,y),e.memory.geometries++),y}function h(m){let y=m.attributes;for(let p in y)t.update(y[p],i.ARRAY_BUFFER)}function u(m){let y=m.index,p=m.attributes.position,g=0;if(p===void 0)return;let _=y!==null?y.array.length:p.array.length/3-1,w=p.count>=65535?nr:er,v=new w(Math.ceil(_/3)*6,1),A=v.array;if(y!==null){let x=y.array;g=y.version;for(let M=0,U=0;M<_;M+=3){let S=x[M+0],P=x[M+1],N=x[M+2];A[U++]=S,A[U++]=P,A[U++]=P,A[U++]=N,A[U++]=N,A[U++]=S}}else{g=p.version;for(let x=0,M=0;x<_;x+=3){let U=x+0,S=x+1,P=x+2;A[M++]=U,A[M++]=S,A[M++]=S,A[M++]=P,A[M++]=P,A[M++]=U}}v.version=g;let R=r.get(m);R&&t.remove(R),r.set(m,v)}function d(m){let y=r.get(m);if(y){let p=m.index;p!==null&&y.version<p.version&&u(m)}else u(m);return r.get(m)}function f(){for(let m in s){let y=s[m].deref();y!==void 0&&l(y)}}return{get:c,update:h,getWireframeAttribute:d,dispose:f}}function sx(i,t,e){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,d){i.drawElements(n,d,r,u*o),e.update(d,n,1)}function c(u,d,f){f!==0&&(i.drawElementsInstanced(n,d,r,u*o,f),e.update(d,n,f))}function h(u,d,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,u,0,f);let y=0;for(let p=0;p<f;p++)y+=d[p];e.update(y,n,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function rx(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:Yt("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function ox(i,t,e){let n=new WeakMap,s=new ve;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let U=function(){x.dispose(),n.delete(a),a.removeEventListener("dispose",U)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],_=a.morphAttributes.color||[],w=0;f===!0&&(w=1),m===!0&&(w=2),y===!0&&(w=3);let v=a.attributes.position.count*w,A=1;v>t.maxTextureSize&&(A=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let R=new Float32Array(v*A*4*u),x=new js(R,v,A,u);x.type=_n,x.needsUpdate=!0;let M=w*4;for(let S=0;S<u;S++){let P=p[S],N=g[S],k=_[S],I=v*A*4*S;for(let G=0;G<P.count;G++){let B=G*M;f===!0&&(s.fromBufferAttribute(P,G),R[I+B+0]=s.x,R[I+B+1]=s.y,R[I+B+2]=s.z,R[I+B+3]=0),m===!0&&(s.fromBufferAttribute(N,G),R[I+B+4]=s.x,R[I+B+5]=s.y,R[I+B+6]=s.z,R[I+B+7]=0),y===!0&&(s.fromBufferAttribute(k,G),R[I+B+8]=s.x,R[I+B+9]=s.y,R[I+B+10]=s.z,R[I+B+11]=k.itemSize===4?s.w:1)}}d={count:u,texture:x,size:new _t(v,A)},n.set(a,d),a.addEventListener("dispose",U)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let y=0;y<c.length;y++)f+=c[y];let m=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",m),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function ax(i,t,e,n,s){let r=new WeakMap;function o(c){let h=s.render.frame,u=c.geometry,d=t.get(c,u);if(r.get(d)!==h&&(t.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return d}function a(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}var lx={[Wl]:"LINEAR_TONE_MAPPING",[Xl]:"REINHARD_TONE_MAPPING",[ql]:"CINEON_TONE_MAPPING",[Es]:"ACES_FILMIC_TONE_MAPPING",[Zl]:"AGX_TONE_MAPPING",[$l]:"NEUTRAL_TONE_MAPPING",[Yl]:"CUSTOM_TONE_MAPPING"};function cx(i,t,e,n,s,r){let o=new ln(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=null,h=new pe;h.setAttribute("position",new qt([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new qt([0,2,0,0,2,0],2));let u=new Uo({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new re(h,u),f=new vr(-1,1,1,-1,0,1),m=null,y=null,p=!1,g,_=null,w=[],v=!1;this.setSize=function(A,R){o.setSize(A,R),a!==null&&a.setSize(A,R),l!==null&&l.setSize(A,R);for(let x=0;x<w.length;x++){let M=w[x];M.setSize&&M.setSize(A,R)}},this.setEffects=function(A){w=A,v=w.length>0&&w[0].isRenderPass===!0;let R=o.width,x=o.height;w.length>0&&a===null&&(a=new ln(R,x,{type:Cn,depthBuffer:!1,stencilBuffer:!1}),l=new ln(R,x,{type:Cn,depthBuffer:!1,stencilBuffer:!1}));let M=s===!0&&w.some(U=>U.needsDepthTexture===!0);M!==(o.depthTexture!==null)&&(M===!0&&c===null&&(c=new Jn(R,x),r===!0&&(c.format=jn,c.type=Hi)),o.dispose(),o.depthTexture=M?c:null,o.resolveDepthBuffer=M,o.storeMultisampledDepthBuffer=M);for(let U=0;U<w.length;U++){let S=w[U];S.setSize&&S.setSize(R,x),M&&S.needsDepthTexture===!0&&S.setDepthTexture&&S.setDepthTexture(c)}},this.begin=function(A,R){if(p||A.toneMapping===kn&&w.length===0)return!1;if(_=R,R!==null){let x=R.width,M=R.height;(o.width!==x||o.height!==M)&&this.setSize(x,M)}return v===!1&&A.setRenderTarget(o),g=A.toneMapping,A.toneMapping=kn,!0},this.hasRenderPass=function(){return v},this.end=function(A,R){A.toneMapping=g,p=!0;let x=o,M=a;for(let U=0;U<w.length;U++){let S=w[U];S.enabled!==!1&&(S.render(A,M,x,R),S.needsSwap!==!1&&(x=M,M=M===a?l:a))}if(m!==A.outputColorSpace||y!==A.toneMapping){m=A.outputColorSpace,y=A.toneMapping,u.defines={},ce.getTransfer(m)===me&&(u.defines.SRGB_TRANSFER="");let U=lx[y];U&&(u.defines[U]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=x.texture,A.setRenderTarget(_),A.render(d,f),_=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),h.dispose(),u.dispose()}}var Nd=new Ye,Ud=new Jn(1,1),Fd=new rr(1),Od=new js,Bd=new wo,kd=new sr,fd=[],pd=[],md=new Float32Array(16),gd=new Float32Array(9),xd=new Float32Array(4);function Ps(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=fd[s];if(r===void 0&&(r=new Float32Array(s),fd[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ne(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ue(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ha(i,t){let e=pd[t];e===void 0&&(e=new Int32Array(t),pd[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function hx(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function ux(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;i.uniform2fv(this.addr,t),Ue(e,t)}}function dx(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ne(e,t))return;i.uniform3fv(this.addr,t),Ue(e,t)}}function fx(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;i.uniform4fv(this.addr,t),Ue(e,t)}}function px(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ne(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ue(e,t)}else{if(Ne(e,n))return;xd.set(n),i.uniformMatrix2fv(this.addr,!1,xd),Ue(e,n)}}function mx(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ne(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ue(e,t)}else{if(Ne(e,n))return;gd.set(n),i.uniformMatrix3fv(this.addr,!1,gd),Ue(e,n)}}function gx(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ne(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ue(e,t)}else{if(Ne(e,n))return;md.set(n),i.uniformMatrix4fv(this.addr,!1,md),Ue(e,n)}}function xx(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function _x(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;i.uniform2iv(this.addr,t),Ue(e,t)}}function yx(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ne(e,t))return;i.uniform3iv(this.addr,t),Ue(e,t)}}function vx(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;i.uniform4iv(this.addr,t),Ue(e,t)}}function Mx(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Sx(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;i.uniform2uiv(this.addr,t),Ue(e,t)}}function bx(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ne(e,t))return;i.uniform3uiv(this.addr,t),Ue(e,t)}}function Ex(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;i.uniform4uiv(this.addr,t),Ue(e,t)}}function Ga(i){return i.version===0&&(i.compareFunction=rc,i.needsUpdate=!0),i}function wx(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=Ga(Ud):r=Nd,e.setTexture2D(t||r,s)}function Tx(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Bd,s)}function Ax(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=Ga(Fd):r=kd,e.setTextureCube(t||r,s)}function Rx(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Od,s)}function Cx(i){switch(i){case 5126:return hx;case 35664:return ux;case 35665:return dx;case 35666:return fx;case 35674:return px;case 35675:return mx;case 35676:return gx;case 5124:case 35670:return xx;case 35667:case 35671:return _x;case 35668:case 35672:return yx;case 35669:case 35673:return vx;case 5125:return Mx;case 36294:return Sx;case 36295:return bx;case 36296:return Ex;case 35678:case 36198:case 36298:case 36306:case 35682:return wx;case 35679:case 36299:case 36307:return Tx;case 35680:case 36300:case 36308:case 36293:return Ax;case 36289:case 36303:case 36311:case 36292:return Rx}}function Px(i,t){i.uniform1fv(this.addr,t)}function Ix(i,t){let e=Ps(t,this.size,2);i.uniform2fv(this.addr,e)}function Lx(i,t){let e=Ps(t,this.size,3);i.uniform3fv(this.addr,e)}function Dx(i,t){let e=Ps(t,this.size,4);i.uniform4fv(this.addr,e)}function Nx(i,t){let e=Ps(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Ux(i,t){let e=Ps(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Fx(i,t){let e=Ps(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Ox(i,t){i.uniform1iv(this.addr,t)}function Bx(i,t){i.uniform2iv(this.addr,t)}function kx(i,t){i.uniform3iv(this.addr,t)}function zx(i,t){i.uniform4iv(this.addr,t)}function Hx(i,t){i.uniform1uiv(this.addr,t)}function Gx(i,t){i.uniform2uiv(this.addr,t)}function Vx(i,t){i.uniform3uiv(this.addr,t)}function Wx(i,t){i.uniform4uiv(this.addr,t)}function Xx(i,t,e){let n=this.cache,s=t.length,r=Ha(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Ue(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=Ga(Ud):o=Nd;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function qx(i,t,e){let n=this.cache,s=t.length,r=Ha(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Ue(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Bd,r[o])}function Yx(i,t,e){let n=this.cache,s=t.length,r=Ha(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Ue(n,r));let o;this.type===i.SAMPLER_CUBE_SHADOW?o=Ga(Fd):o=kd;for(let a=0;a!==s;++a)e.setTextureCube(t[a]||o,r[a])}function Zx(i,t,e){let n=this.cache,s=t.length,r=Ha(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Ue(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Od,r[o])}function $x(i){switch(i){case 5126:return Px;case 35664:return Ix;case 35665:return Lx;case 35666:return Dx;case 35674:return Nx;case 35675:return Ux;case 35676:return Fx;case 5124:case 35670:return Ox;case 35667:case 35671:return Bx;case 35668:case 35672:return kx;case 35669:case 35673:return zx;case 5125:return Hx;case 36294:return Gx;case 36295:return Vx;case 36296:return Wx;case 35678:case 36198:case 36298:case 36306:case 35682:return Xx;case 35679:case 36299:case 36307:return qx;case 35680:case 36300:case 36308:case 36293:return Yx;case 36289:case 36303:case 36311:case 36292:return Zx}}var bc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Cx(e.type)}},Ec=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=$x(e.type)}},wc=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},Mc=/(\w+)(\])?(\[|\.)?/g;function _d(i,t){i.seq.push(t),i.map[t.id]=t}function Jx(i,t,e){let n=i.name,s=n.length;for(Mc.lastIndex=0;;){let r=Mc.exec(n),o=Mc.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){_d(e,c===void 0?new bc(a,i,t):new Ec(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new wc(a),_d(e,u)),e=u}}}var Rs=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=t.getActiveUniform(e,o),l=t.getUniformLocation(e,a.name);Jx(a,l,this)}let s=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function yd(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Kx=37297,Qx=0;function jx(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var vd=new Jt;function t_(i){ce._getMatrix(vd,ce.workingColorSpace,i);let t=`mat3( ${vd.elements.map(e=>e.toFixed(4))} )`;switch(ce.getTransfer(i)){case Qs:return[t,"LinearTransferOETF"];case me:return[t,"sRGBTransferOETF"];default:return Wt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Md(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+jx(i.getShaderSource(t),a)}else return r}function e_(i,t){let e=t_(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var n_={[Wl]:"Linear",[Xl]:"Reinhard",[ql]:"Cineon",[Es]:"ACESFilmic",[Zl]:"AgX",[$l]:"Neutral",[Yl]:"Custom"};function i_(i,t){let e=n_[t];return e===void 0?(Wt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var ka=new H;function s_(){ce.getLuminanceCoefficients(ka);let i=ka.x.toFixed(4),t=ka.y.toFixed(4),e=ka.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function r_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Cr).join(`
`)}function o_(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function a_(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Cr(i){return i!==""}function Sd(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function bd(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var l_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Tc(i){return i.replace(l_,c_)}function c_(i,t){let e=ee[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return Tc(e)}var h_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ed(i){return i.replace(h_,u_)}function u_(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function wd(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}var d_={[Oi]:"SHADOWMAP_TYPE_PCF",[Ss]:"SHADOWMAP_TYPE_VSM"};function f_(i){return d_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var p_={[ws]:"ENVMAP_MODE_REFRACTION"};function m_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":p_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var g_={[Vl]:"ENVMAP_BLENDING_MULTIPLY",[Ou]:"ENVMAP_BLENDING_MIX",[Bu]:"ENVMAP_BLENDING_ADD"};function x_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":g_[i.combine]||"ENVMAP_BLENDING_NONE"}function __(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=f_(e),c=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=m_(e),u=x_(e),d=r_(e),f=o_(r),m=s.createProgram(),y,p,g=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(y=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(Cr).join(`
`),y.length>0&&(y+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(Cr).join(`
`),p.length>0&&(p+=`
`)):(y=[wd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Cr).join(`
`),p=[wd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==kn?"#define TONE_MAPPING":"",e.toneMapping!==kn?ee.tonemapping_pars_fragment:"",e.toneMapping!==kn?i_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ee.colorspace_pars_fragment,e_("linearToOutputTexel",e.outputColorSpace),s_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Cr).join(`
`)),o=Tc(o),o=Sd(o,e),o=bd(o,e),a=Tc(a),a=Sd(a,e),a=bd(a,e),o=Ed(o),a=Ed(a),e.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,y=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,p=["#define varying in",e.glslVersion===oc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===oc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let _=g+y+o,w=g+p+a,v=yd(s,s.VERTEX_SHADER,_),A=yd(s,s.FRAGMENT_SHADER,w);s.attachShader(m,v),s.attachShader(m,A),e.index0AttributeName!==void 0?s.bindAttribLocation(m,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function R(S){if(i.debug.checkShaderErrors){let P=s.getProgramInfoLog(m)||"",N=s.getShaderInfoLog(v)||"",k=s.getShaderInfoLog(A)||"",I=P.trim(),G=N.trim(),B=k.trim(),F=!0,L=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(F=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,m,v,A);else{let b=Md(s,v,"vertex"),C=Md(s,A,"fragment");Yt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Material Name: `+S.name+`
Material Type: `+S.type+`

Program Info Log: `+I+`
`+b+`
`+C)}else I!==""?Wt("WebGLProgram: Program Info Log:",I):(G===""||B==="")&&(L=!1);L&&(S.diagnostics={runnable:F,programLog:I,vertexShader:{log:G,prefix:y},fragmentShader:{log:B,prefix:p}})}s.deleteShader(v),s.deleteShader(A),x=new Rs(s,m),M=a_(s,m)}let x;this.getUniforms=function(){return x===void 0&&R(this),x};let M;this.getAttributes=function(){return M===void 0&&R(this),M};let U=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=s.getProgramParameter(m,Kx)),U},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Qx++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=v,this.fragmentShader=A,this}var y_=0,Ac=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Rc(t),e.set(t,n)),n}},Rc=class{constructor(t){this.id=y_++,this.code=t,this.usedTimes=0}};function v_(i){return i===vi||i===Tr||i===Ar}function M_(i,t,e,n,s,r){let o=new tr,a=new Ac,l=new Set,c=[],h=new Map,u=n.logarithmicDepthBuffer,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(x){return l.add(x),x===0?"uv":`uv${x}`}function m(x,M,U,S,P,N){let k=S.fog,I=P.geometry,G=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?S.environment:null,B=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,F=t.get(x.envMap||G,B),L=d[x.type],b=n.precision;x.precision!==null&&(b=n.getMaxPrecision(x.precision),b!==x.precision&&Wt("WebGLProgram.getParameters:",x.precision,"not supported, using",b,"instead."));let C=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,O=C!==void 0?C.length:0,q=0;I.morphAttributes.position!==void 0&&(q=1),I.morphAttributes.normal!==void 0&&(q=2),I.morphAttributes.color!==void 0&&(q=3);let J,V,tt,ct;if(L){let Pt=Hn[L];J=Pt.vertexShader,V=Pt.fragmentShader}else{J=x.vertexShader,V=x.fragmentShader;let Pt=a.getVertexShaderStage(x),ge=a.getFragmentShaderStage(x);a.update(x,Pt,ge),tt=Pt.id,ct=ge.id}let lt=i.getRenderTarget(),Q=i.state.buffers.depth.getReversed(),nt=P.isInstancedMesh===!0,ut=P.isBatchedMesh===!0,xt=!!x.map,At=!!x.matcap,zt=!!F,K=zt&&F.isPMREMTexture===!0,at=!!x.aoMap,ht=!!x.lightMap,Rt=!!x.bumpMap&&x.wireframe===!1,ft=!!x.normalMap,Dt=!!x.displacementMap,Nt=!!x.emissiveMap,Zt=!!x.metalnessMap,ne=!!x.roughnessMap,oe=x.anisotropy>0,X=x.clearcoat>0,Ce=x.diffuseRoughness>0,ie=x.dispersion>0,xe=x.retroreflectivity>0,Et=x.iridescence>0,Re=x.sheen>0,Vt=x.transmission>0,$t=oe&&!!x.anisotropyMap,D=X&&!!x.clearcoatMap,E=X&&!!x.clearcoatNormalMap,Z=X&&!!x.clearcoatRoughnessMap,dt=Ce&&!!x.diffuseRoughnessMap,ot=Et&&!!x.iridescenceMap,yt=Et&&!!x.iridescenceThicknessMap,wt=Re&&!!x.sheenColorMap,it=Re&&!!x.sheenRoughnessMap,st=!!x.specularMap,Mt=!!x.specularColorMap,z=!!x.specularIntensityMap,rt=Vt&&!!x.transmissionMap,et=Vt&&!!x.thicknessMap,St=!!x.gradientMap,gt=!!x.alphaMap,vt=x.alphaTest>0,Ht=!!x.alphaHash,te=!!x.extensions,pt=kn;x.toneMapped&&(lt===null||lt.isXRRenderTarget===!0)&&(pt=i.toneMapping);let Gt=K?F.isCompressedCubeTexture?F.image[0].mipmaps:F.mipmaps:null,jt={shaderID:L,shaderType:x.type,shaderName:x.name,vertexShader:J,fragmentShader:V,defines:x.defines,customVertexShaderID:tt,customFragmentShaderID:ct,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:b,batching:ut,batchingColor:ut&&P._colorsTexture!==null,instancing:nt,instancingColor:nt&&P.instanceColor!==null,instancingMorph:nt&&P.morphTexture!==null,outputColorSpace:lt===null?i.outputColorSpace:lt.isXRRenderTarget===!0?lt.texture.colorSpace:ce.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:xt,matcap:At,envMap:zt,envMapMode:zt&&F.mapping,envMapPMREM:K,envMapMaxLod:K?Gt.length-1:null,envMapSize:K?Gt[0].width:null,aoMap:at,lightMap:ht,bumpMap:Rt,normalMap:ft,displacementMap:Dt,emissiveMap:Nt,normalMapObjectSpace:ft&&x.normalMapType===Hu,normalMapTangentSpace:ft&&x.normalMapType===Fa,packedNormalMap:ft&&x.normalMapType===Fa&&v_(x.normalMap.format),metalnessMap:Zt,roughnessMap:ne,anisotropy:oe,anisotropyMap:$t,clearcoat:X,clearcoatMap:D,clearcoatNormalMap:E,clearcoatRoughnessMap:Z,diffuseRoughness:Ce,diffuseRoughnessMap:dt,dispersion:ie,retroreflection:xe,iridescence:Et,iridescenceMap:ot,iridescenceThicknessMap:yt,sheen:Re,sheenColorMap:wt,sheenRoughnessMap:it,specularMap:st,specularColorMap:Mt,specularIntensityMap:z,transmission:Vt,transmissionMap:rt,thicknessMap:et,gradientMap:St,opaque:x.transparent===!1&&x.blending===bs&&x.alphaToCoverage===!1,alphaMap:gt,alphaTest:vt,alphaHash:Ht,combine:x.combine,mapUv:xt&&f(x.map.channel),aoMapUv:at&&f(x.aoMap.channel),lightMapUv:ht&&f(x.lightMap.channel),bumpMapUv:Rt&&f(x.bumpMap.channel),normalMapUv:ft&&f(x.normalMap.channel),displacementMapUv:Dt&&f(x.displacementMap.channel),emissiveMapUv:Nt&&f(x.emissiveMap.channel),metalnessMapUv:Zt&&f(x.metalnessMap.channel),roughnessMapUv:ne&&f(x.roughnessMap.channel),anisotropyMapUv:$t&&f(x.anisotropyMap.channel),clearcoatMapUv:D&&f(x.clearcoatMap.channel),clearcoatNormalMapUv:E&&f(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Z&&f(x.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:dt&&f(x.diffuseRoughnessMap.channel),iridescenceMapUv:ot&&f(x.iridescenceMap.channel),iridescenceThicknessMapUv:yt&&f(x.iridescenceThicknessMap.channel),sheenColorMapUv:wt&&f(x.sheenColorMap.channel),sheenRoughnessMapUv:it&&f(x.sheenRoughnessMap.channel),specularMapUv:st&&f(x.specularMap.channel),specularColorMapUv:Mt&&f(x.specularColorMap.channel),specularIntensityMapUv:z&&f(x.specularIntensityMap.channel),transmissionMapUv:rt&&f(x.transmissionMap.channel),thicknessMapUv:et&&f(x.thicknessMap.channel),alphaMapUv:gt&&f(x.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(ft||oe),vertexNormals:!!I.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!I.attributes.uv&&(xt||gt),fog:!!k,useFog:x.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||I.attributes.normal===void 0&&ft===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Q,skinning:P.isSkinnedMesh===!0,hasPositionAttribute:I.attributes.position!==void 0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:O,morphTextureStride:q,numSunLights:M.sun.length,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numSunLightShadows:M.sunShadowMap.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:N.filter(Pt=>Pt.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&U.length>0,shadowMapType:i.shadowMap.type,toneMapping:pt,decodeVideoTexture:xt&&x.map.isVideoTexture===!0&&ce.getTransfer(x.map.colorSpace)===me,decodeVideoTextureEmissive:Nt&&x.emissiveMap.isVideoTexture===!0&&ce.getTransfer(x.emissiveMap.colorSpace)===me,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Ge,flipSided:x.side===$e,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:te&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(te&&x.extensions.multiDraw===!0||ut)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return jt.vertexUv1s=l.has(1),jt.vertexUv2s=l.has(2),jt.vertexUv3s=l.has(3),l.clear(),jt}function y(x){let M=[];if(x.shaderID?M.push(x.shaderID):(M.push(x.customVertexShaderID),M.push(x.customFragmentShaderID)),x.defines!==void 0)for(let U in x.defines)M.push(U),M.push(x.defines[U]);return x.isRawShaderMaterial===!1&&(p(M,x),g(M,x),M.push(i.outputColorSpace)),M.push(x.customProgramCacheKey),M.join()}function p(x,M){x.push(M.precision),x.push(M.outputColorSpace),x.push(M.envMapMode),x.push(M.envMapPMREM),x.push(M.envMapMaxLod),x.push(M.envMapSize),x.push(M.mapUv),x.push(M.alphaMapUv),x.push(M.lightMapUv),x.push(M.aoMapUv),x.push(M.bumpMapUv),x.push(M.normalMapUv),x.push(M.displacementMapUv),x.push(M.emissiveMapUv),x.push(M.metalnessMapUv),x.push(M.roughnessMapUv),x.push(M.anisotropyMapUv),x.push(M.clearcoatMapUv),x.push(M.clearcoatNormalMapUv),x.push(M.clearcoatRoughnessMapUv),x.push(M.diffuseRoughnessMapUv),x.push(M.iridescenceMapUv),x.push(M.iridescenceThicknessMapUv),x.push(M.sheenColorMapUv),x.push(M.sheenRoughnessMapUv),x.push(M.specularMapUv),x.push(M.specularColorMapUv),x.push(M.specularIntensityMapUv),x.push(M.transmissionMapUv),x.push(M.thicknessMapUv),x.push(M.combine),x.push(M.fogExp2),x.push(M.sizeAttenuation),x.push(M.morphTargetsCount),x.push(M.numSunLights),x.push(M.numDirLights),x.push(M.numPointLights),x.push(M.numSpotLights),x.push(M.numSpotLightMaps),x.push(M.numHemiLights),x.push(M.numRectAreaLights),x.push(M.numSunLightShadows),x.push(M.numDirLightShadows),x.push(M.numPointLightShadows),x.push(M.numSpotLightShadows),x.push(M.numSpotLightShadowsWithMaps),x.push(M.numLightProbes),x.push(M.numLightProbeGrids),x.push(M.shadowMapType),x.push(M.toneMapping),x.push(M.numClippingPlanes),x.push(M.numClipIntersection),x.push(M.depthPacking)}function g(x,M){o.disableAll(),M.instancing&&o.enable(0),M.instancingColor&&o.enable(1),M.instancingMorph&&o.enable(2),M.matcap&&o.enable(3),M.envMap&&o.enable(4),M.normalMapObjectSpace&&o.enable(5),M.normalMapTangentSpace&&o.enable(6),M.clearcoat&&o.enable(7),M.iridescence&&o.enable(8),M.alphaTest&&o.enable(9),M.vertexColors&&o.enable(10),M.vertexAlphas&&o.enable(11),M.vertexUv1s&&o.enable(12),M.vertexUv2s&&o.enable(13),M.vertexUv3s&&o.enable(14),M.vertexTangents&&o.enable(15),M.anisotropy&&o.enable(16),M.alphaHash&&o.enable(17),M.batching&&o.enable(18),M.dispersion&&o.enable(19),M.retroreflection&&o.enable(24),M.diffuseRoughness&&o.enable(25),M.batchingColor&&o.enable(20),M.gradientMap&&o.enable(21),M.packedNormalMap&&o.enable(22),M.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),M.numLightProbeGrids>0&&o.enable(22),M.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function _(x){let M=d[x.type],U;if(M){let S=Hn[M];U=od.clone(S.uniforms)}else U=x.uniforms;return U}function w(x,M){let U=h.get(M);return U!==void 0?++U.usedTimes:(U=new __(i,M,x,s),c.push(U),h.set(M,U)),U}function v(x){if(--x.usedTimes===0){let M=c.indexOf(x);c[M]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function A(x){a.remove(x)}function R(){a.dispose()}return{getParameters:m,getProgramCacheKey:y,getUniforms:_,acquireProgram:w,releaseProgram:v,releaseShaderCache:A,programs:c,dispose:R}}function S_(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function b_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Td(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Ad(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function a(d,f,m,y,p,g){let _=i[t];return _===void 0?(_={id:d.id,object:d,geometry:f,material:m,materialVariant:o(d),groupOrder:y,renderOrder:d.renderOrder,z:p,group:g},i[t]=_):(_.id=d.id,_.object=d,_.geometry=f,_.material=m,_.materialVariant=o(d),_.groupOrder=y,_.renderOrder=d.renderOrder,_.z=p,_.group=g),t++,_}function l(d,f,m,y,p,g,_){_.reversedDepth===!0&&(p=-p);let w=a(d,f,m,y,p,g);m.transmission>0?n.push(w):m.transparent===!0?s.push(w):e.push(w)}function c(d,f,m,y,p,g){let _=a(d,f,m,y,p,g);m.transmission>0?n.unshift(_):m.transparent===!0?s.unshift(_):e.unshift(_)}function h(d,f){e.length>1&&e.sort(d||b_),n.length>1&&n.sort(f||Td),s.length>1&&s.sort(f||Td)}function u(){for(let d=t,f=i.length;d<f;d++){let m=i[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:u,sort:h}}function E_(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new Ad,i.set(n,[o])):s>=r.length?(o=new Ad,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function w_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new H,color:new Bt};break;case"SpotLight":e={position:new H,direction:new H,color:new Bt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new H,color:new Bt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new H,skyColor:new Bt,groundColor:new Bt};break;case"RectAreaLight":e={color:new Bt,position:new H,halfWidth:new H,halfHeight:new H};break}return i[t.id]=e,e}}}function T_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var A_=0;function R_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function C_(i){let t=new w_,e=T_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new H);let s=new H,r=new Xt,o=new Xt;function a(c){let h=0,u=0,d=0;for(let N=0;N<9;N++)n.probe[N].set(0,0,0);let f=0,m=0,y=0,p=0,g=0,_=0,w=0,v=0,A=0,R=0,x=0,M=0,U=0,S=0;c.sort(R_);for(let N=0,k=c.length;N<k;N++){let I=c[N],G=I.color,B=I.intensity,F=I.distance,L=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===vi?L=I.shadow.map.texture:L=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=G.r*B,u+=G.g*B,d+=G.b*B;else if(I.isLightProbe){for(let b=0;b<9;b++)n.probe[b].addScaledVector(I.sh.coefficients[b],B);S++}else if(I.isSunLight){let b=t.get(I);if(b.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let C=I.shadow,O=e.get(I);O.shadowIntensity=C.intensity,O.shadowBias=C.bias,O.shadowNormalBias=C.normalBias,O.shadowRadius=C.radius,O.shadowMapSize.copy(C.mapSize).multiply(C.getFrameExtents()),n.sunShadow[m]=O,n.sunShadowMap[m]=L;let q=C.getViewportCount();for(let J=0;J<q;J++)n.sunShadowMatrix[y+J]=C.getMatrix(J),n.sunShadowCascade[y+J]=C._cascadeData[J];y+=q,m++}n.sun[f]=b,f++}else if(I.isDirectionalLight){let b=t.get(I);if(b.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let C=I.shadow,O=e.get(I);O.shadowIntensity=C.intensity,O.shadowBias=C.bias,O.shadowNormalBias=C.normalBias,O.shadowRadius=C.radius,O.shadowMapSize=C.mapSize,n.directionalShadow[p]=O,n.directionalShadowMap[p]=L,n.directionalShadowMatrix[p]=I.shadow.matrix,A++}n.directional[p]=b,p++}else if(I.isSpotLight){let b=t.get(I);b.position.setFromMatrixPosition(I.matrixWorld),b.color.copy(G).multiplyScalar(B),b.distance=F,b.coneCos=Math.cos(I.angle),b.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),b.decay=I.decay,n.spot[_]=b;let C=I.shadow;if(I.map&&(n.spotLightMap[M]=I.map,M++,C.updateMatrices(I),I.castShadow&&U++),n.spotLightMatrix[_]=C.matrix,I.castShadow){let O=e.get(I);O.shadowIntensity=C.intensity,O.shadowBias=C.bias,O.shadowNormalBias=C.normalBias,O.shadowRadius=C.radius,O.shadowMapSize=C.mapSize,n.spotShadow[_]=O,n.spotShadowMap[_]=L,x++}_++}else if(I.isRectAreaLight){let b=t.get(I);b.color.copy(G).multiplyScalar(B),b.halfWidth.set(I.width*.5,0,0),b.halfHeight.set(0,I.height*.5,0),n.rectArea[w]=b,w++}else if(I.isPointLight){let b=t.get(I);if(b.color.copy(I.color).multiplyScalar(I.intensity),b.distance=I.distance,b.decay=I.decay,I.castShadow){let C=I.shadow,O=e.get(I);O.shadowIntensity=C.intensity,O.shadowBias=C.bias,O.shadowNormalBias=C.normalBias,O.shadowRadius=C.radius,O.shadowMapSize=C.mapSize,O.shadowCameraNear=C.camera.near,O.shadowCameraFar=C.camera.far,n.pointShadow[g]=O,n.pointShadowMap[g]=L,n.pointShadowMatrix[g]=I.shadow.matrix,R++}n.point[g]=b,g++}else if(I.isHemisphereLight){let b=t.get(I);b.skyColor.copy(I.color).multiplyScalar(B),b.groundColor.copy(I.groundColor).multiplyScalar(B),n.hemi[v]=b,v++}}w>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=It.LTC_FLOAT_1,n.rectAreaLTC2=It.LTC_FLOAT_2):(n.rectAreaLTC1=It.LTC_HALF_1,n.rectAreaLTC2=It.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let P=n.hash;(P.sunLength!==f||P.directionalLength!==p||P.pointLength!==g||P.spotLength!==_||P.rectAreaLength!==w||P.hemiLength!==v||P.numSunShadows!==m||P.numDirectionalShadows!==A||P.numPointShadows!==R||P.numSpotShadows!==x||P.numSpotMaps!==M||P.numLightProbes!==S)&&(n.sun.length=f,n.directional.length=p,n.spot.length=_,n.rectArea.length=w,n.point.length=g,n.hemi.length=v,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.directionalShadowMatrix.length=A,n.pointShadow.length=R,n.pointShadowMap.length=R,n.pointShadowMatrix.length=R,n.spotShadow.length=x,n.spotShadowMap.length=x,n.spotLightMatrix.length=x+M-U,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=U,n.numLightProbes=S,P.sunLength=f,P.directionalLength=p,P.pointLength=g,P.spotLength=_,P.rectAreaLength=w,P.hemiLength=v,P.numSunShadows=m,P.numDirectionalShadows=A,P.numPointShadows=R,P.numSpotShadows=x,P.numSpotMaps=M,P.numLightProbes=S,n.version=A_++)}function l(c,h){let u=0,d=0,f=0,m=0,y=0,p=0,g=h.matrixWorldInverse;for(let _=0,w=c.length;_<w;_++){let v=c[_];if(v.isSunLight){let A=n.sun[u];A.direction.setFromMatrixPosition(v.matrixWorld),A.direction.transformDirection(g),u++}else if(v.isDirectionalLight){let A=n.directional[d];A.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(g),d++}else if(v.isSpotLight){let A=n.spot[m];A.position.setFromMatrixPosition(v.matrixWorld),A.position.applyMatrix4(g),A.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(g),m++}else if(v.isRectAreaLight){let A=n.rectArea[y];A.position.setFromMatrixPosition(v.matrixWorld),A.position.applyMatrix4(g),o.identity(),r.copy(v.matrixWorld),r.premultiply(g),o.extractRotation(r),A.halfWidth.set(v.width*.5,0,0),A.halfHeight.set(0,v.height*.5,0),A.halfWidth.applyMatrix4(o),A.halfHeight.applyMatrix4(o),y++}else if(v.isPointLight){let A=n.point[f];A.position.setFromMatrixPosition(v.matrixWorld),A.position.applyMatrix4(g),f++}else if(v.isHemisphereLight){let A=n.hemi[p];A.direction.setFromMatrixPosition(v.matrixWorld),A.direction.transformDirection(g),p++}}}return{setup:a,setupView:l,state:n}}function Rd(i){let t=new C_(i),e=[],n=[],s=[];function r(u){h.camera=u,e.length=0,n.length=0,s.length=0}function o(u){u.isLightProbeGrid?s.push(u):e.push(u)}function a(u){n.push(u)}function l(){t.setup(e),s.sort((u,d)=>u.priority-d.priority||u.id-d.id)}function c(u){t.setupView(e,u)}let h={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function P_(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Rd(i),t.set(s,[a])):r>=o.length?(a=new Rd(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var I_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,L_=`uniform sampler2D shadow_pass;
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
}`,D_=[new H(1,0,0),new H(-1,0,0),new H(0,1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1)],N_=[new H(0,-1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1),new H(0,-1,0),new H(0,-1,0)],Cd=new Xt,Rr=new H,Sc=new H;function U_(i,t,e){let n=new pi,s=new _t,r=new _t,o=new ve,a=new Fo,l=new Oo,c={},h=e.maxTextureSize,u={[yi]:$e,[$e]:yi,[Ge]:Ge},d=new Bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new _t},radius:{value:4}},vertexShader:I_,fragmentShader:L_}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let m=new pe;m.setAttribute("position",new de(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new re(m,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Oi;let g=this.type;this.render=function(R,x,M){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||R.length===0)return;this.type===_u&&(Wt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Oi);let U=i.getRenderTarget(),S=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),N=i.state;N.setBlending(Bi),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let k=g!==this.type;k&&x.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(G=>G.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,G=R.length;I<G;I++){let B=R[I],F=B.shadow;if(F===void 0){Wt("WebGLShadowMap:",B,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;s.copy(F.mapSize);let L=F.getFrameExtents();s.multiply(L),r.copy(F.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/L.x),s.x=r.x*L.x,F.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/L.y),s.y=r.y*L.y,F.mapSize.y=r.y));let b=i.state.buffers.depth.getReversed();if(F.camera._reversedDepth=b,F.map===null||k===!0){if(F.map!==null&&(F.map.depthTexture!==null&&(F.map.depthTexture.dispose(),F.map.depthTexture=null),F.map.dispose()),this.type===Ss){if(B.isPointLight){Wt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}F.map=new ln(s.x,s.y,{format:vi,type:Cn,minFilter:tn,magFilter:tn,generateMipmaps:!1}),F.map.texture.name=B.name+".shadowMap",F.map.depthTexture=new Jn(s.x,s.y,_n),F.map.depthTexture.name=B.name+".shadowMapDepth",F.map.depthTexture.format=$n,F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=ke,F.map.depthTexture.magFilter=ke}else B.isPointLight?(F.map=new Pr(s.x),F.map.depthTexture=new rr(s.x,Rn)):(F.map=new ln(s.x,s.y),F.map.depthTexture=new Jn(s.x,s.y,Rn)),F.map.depthTexture.name=B.name+".shadowMap",F.map.depthTexture.format=$n,this.type===Oi?(F.map.depthTexture.compareFunction=b?sc:ic,F.map.depthTexture.minFilter=tn,F.map.depthTexture.magFilter=tn):(F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=ke,F.map.depthTexture.magFilter=ke);F.camera.updateProjectionMatrix()}F.map.isWebGLCubeRenderTarget!==!0&&(F.map.width!==s.x||F.map.height!==s.y)&&F.map.setSize(s.x,s.y);let C=F.map.isWebGLCubeRenderTarget?6:F.getViewportCount();B.isPointLight!==!0&&F.updateMatrices(B,M);let O=(F.camera.layers.mask&4294967294)!==0?F.camera.layers:M.layers;for(let q=0;q<C;q++){let J=F.getCamera(q);if(B.isPointLight){let V=F.camera,tt=F.matrix,ct=B.distance||V.far;ct!==V.far&&(V.far=ct,V.updateProjectionMatrix()),Rr.setFromMatrixPosition(B.matrixWorld),V.position.copy(Rr),Sc.copy(V.position),Sc.add(D_[q]),V.up.copy(N_[q]),V.lookAt(Sc),V.updateMatrixWorld(),tt.makeTranslation(-Rr.x,-Rr.y,-Rr.z),Cd.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),F._frustum.setFromProjectionMatrix(Cd,V.coordinateSystem,V.reversedDepth)}if(F.map.isWebGLCubeRenderTarget)i.setRenderTarget(F.map,q),i.clear();else{q===0&&(i.setRenderTarget(F.map),i.clear());let V=F.getViewport(q);o.set(r.x*V.x,r.y*V.y,r.x*V.z,r.y*V.w),N.viewport(o)}n=F.getFrustum(q),v(x,M,J,B,O,this.type)}F.isPointLightShadow!==!0&&this.type===Ss&&_(F,M),F.needsUpdate=!1}g=this.type,p.needsUpdate=!1,i.setRenderTarget(U,S,P)};function _(R,x){let M=t.update(y);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null?R.mapPass=new ln(s.x,s.y,{format:vi,type:Cn}):(R.mapPass.width!==R.map.width||R.mapPass.height!==R.map.height)&&R.mapPass.setSize(R.map.width,R.map.height),d.uniforms.shadow_pass.value=R.map.depthTexture,d.uniforms.resolution.value.set(R.map.width,R.map.height),d.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(x,null,M,d,y,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value.set(R.map.width,R.map.height),f.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(x,null,M,f,y,null)}function w(R,x,M,U){let S=null,P=M.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(P!==void 0)S=P;else if(S=M.isPointLight===!0?l:a,i.localClippingEnabled&&x.clipShadows===!0&&Array.isArray(x.clippingPlanes)&&x.clippingPlanes.length!==0||x.displacementMap&&x.displacementScale!==0||x.alphaMap&&x.alphaTest>0||x.map&&x.alphaTest>0||x.alphaToCoverage===!0){let N=S.uuid,k=x.uuid,I=c[N];I===void 0&&(I={},c[N]=I);let G=I[k];G===void 0&&(G=S.clone(),I[k]=G,x.addEventListener("dispose",A)),S=G}if(S.visible=x.visible,S.wireframe=x.wireframe,U===Ss?S.side=x.shadowSide!==null?x.shadowSide:x.side:S.side=x.shadowSide!==null?x.shadowSide:u[x.side],S.alphaMap=x.alphaMap,S.alphaTest=x.alphaToCoverage===!0?.5:x.alphaTest,S.map=x.map,S.clipShadows=x.clipShadows,S.clippingPlanes=x.clippingPlanes,S.clipIntersection=x.clipIntersection,S.displacementMap=x.displacementMap,S.displacementScale=x.displacementScale,S.displacementBias=x.displacementBias,S.wireframeLinewidth=x.wireframeLinewidth,S.linewidth=x.linewidth,M.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let N=i.properties.get(S);N.light=M}return S}function v(R,x,M,U,S,P){if(R.visible===!1)return;if(R.layers.test(S)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&P===Ss)&&(!R.frustumCulled||R.intersectsFrustum(n))){R.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,R.matrixWorld);let I=t.update(R),G=R.material;if(Array.isArray(G)){let B=I.groups;for(let F=0,L=B.length;F<L;F++){let b=B[F],C=G[b.materialIndex];if(C&&C.visible){let O=w(R,C,U,P);R.onBeforeShadow(i,R,x,M,I,O,b),i.renderBufferDirect(M,null,I,O,R,b),R.onAfterShadow(i,R,x,M,I,O,b)}}}else if(G.visible){let B=w(R,G,U,P);R.onBeforeShadow(i,R,x,M,I,B,null),i.renderBufferDirect(M,null,I,B,R,null),R.onAfterShadow(i,R,x,M,I,B,null)}}let k=R.children;for(let I=0,G=k.length;I<G;I++)v(k[I],x,M,U,S,P)}function A(R){R.target.removeEventListener("dispose",A);for(let M in c){let U=c[M],S=R.target.uuid;S in U&&(U[S].dispose(),delete U[S])}}}function F_(i,t){function e(){let z=!1,rt=new ve,et=null,St=new ve(0,0,0,0);return{setMask:function(gt){et!==gt&&!z&&(i.colorMask(gt,gt,gt,gt),et=gt)},setLocked:function(gt){z=gt},setClear:function(gt,vt,Ht,te,pt){pt===!0&&(gt*=te,vt*=te,Ht*=te),rt.set(gt,vt,Ht,te),St.equals(rt)===!1&&(i.clearColor(gt,vt,Ht,te),St.copy(rt))},reset:function(){z=!1,et=null,St.set(-1,0,0,0)}}}function n(){let z=!1,rt=!1,et=null,St=null,gt=null;return{setReversed:function(vt){if(rt!==vt){let Ht=t.get("EXT_clip_control");vt?Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.ZERO_TO_ONE_EXT):Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.NEGATIVE_ONE_TO_ONE_EXT),rt=vt;let te=gt;gt=null,this.setClear(te)}},getReversed:function(){return rt},setTest:function(vt){vt?Q(i.DEPTH_TEST):nt(i.DEPTH_TEST)},setMask:function(vt){et!==vt&&!z&&(i.depthMask(vt),et=vt)},setFunc:function(vt){if(rt&&(vt=Qu[vt]),St!==vt){switch(vt){case po:i.depthFunc(i.NEVER);break;case mo:i.depthFunc(i.ALWAYS);break;case go:i.depthFunc(i.LESS);break;case ls:i.depthFunc(i.LEQUAL);break;case xo:i.depthFunc(i.EQUAL);break;case _o:i.depthFunc(i.GEQUAL);break;case yo:i.depthFunc(i.GREATER);break;case vo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}St=vt}},setLocked:function(vt){z=vt},setClear:function(vt){gt!==vt&&(gt=vt,rt&&(vt=1-vt),i.clearDepth(vt))},reset:function(){z=!1,et=null,St=null,gt=null,rt=!1}}}function s(){let z=!1,rt=null,et=null,St=null,gt=null,vt=null,Ht=null,te=null,pt=null;return{setTest:function(Gt){z||(Gt?Q(i.STENCIL_TEST):nt(i.STENCIL_TEST))},setMask:function(Gt){rt!==Gt&&!z&&(i.stencilMask(Gt),rt=Gt)},setFunc:function(Gt,jt,Pt){(et!==Gt||St!==jt||gt!==Pt)&&(i.stencilFunc(Gt,jt,Pt),et=Gt,St=jt,gt=Pt)},setOp:function(Gt,jt,Pt){(vt!==Gt||Ht!==jt||te!==Pt)&&(i.stencilOp(Gt,jt,Pt),vt=Gt,Ht=jt,te=Pt)},setLocked:function(Gt){z=Gt},setClear:function(Gt){pt!==Gt&&(i.clearStencil(Gt),pt=Gt)},reset:function(){z=!1,rt=null,et=null,St=null,gt=null,vt=null,Ht=null,te=null,pt=null}}}let r=new e,o=new n,a=new s,l={},c=new WeakMap,h={},u={},d={},f=new WeakMap,m=[],y=null,p=!1,g=null,_=null,w=null,v=null,A=null,R=null,x=null,M=new Bt(0,0,0),U=0,S=!1,P=null,N=null,k=null,I=null,G=null,B=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),F=!1,L=0,b=i.getParameter(i.VERSION);b.indexOf("WebGL")!==-1?(L=parseFloat(/^WebGL (\d)/.exec(b)[1]),F=L>=1):b.indexOf("OpenGL ES")!==-1&&(L=parseFloat(/^OpenGL ES (\d)/.exec(b)[1]),F=L>=2);let C=null,O={},q=i.getParameter(i.SCISSOR_BOX),J=i.getParameter(i.VIEWPORT),V=new ve().fromArray(q),tt=new ve().fromArray(J);function ct(z,rt,et,St){let gt=new Uint8Array(4),vt=i.createTexture();i.bindTexture(z,vt),i.texParameteri(z,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(z,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ht=0;Ht<et;Ht++)z===i.TEXTURE_3D||z===i.TEXTURE_2D_ARRAY?i.texImage3D(rt,0,i.RGBA,1,1,St,0,i.RGBA,i.UNSIGNED_BYTE,gt):i.texImage2D(rt+Ht,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,gt);return vt}let lt={};lt[i.TEXTURE_2D]=ct(i.TEXTURE_2D,i.TEXTURE_2D,1),lt[i.TEXTURE_CUBE_MAP]=ct(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),lt[i.TEXTURE_2D_ARRAY]=ct(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),lt[i.TEXTURE_3D]=ct(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Q(i.DEPTH_TEST),o.setFunc(ls),Rt(!1),ft(Bl),Q(i.CULL_FACE),at(Bi);function Q(z){h[z]!==!0&&(i.enable(z),h[z]=!0)}function nt(z){h[z]!==!1&&(i.disable(z),h[z]=!1)}function ut(z,rt){return d[z]!==rt?(i.bindFramebuffer(z,rt),d[z]=rt,z===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=rt),z===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=rt),!0):!1}function xt(z,rt){let et=m,St=!1;if(z){et=f.get(rt),et===void 0&&(et=[],f.set(rt,et));let gt=z.textures;if(et.length!==gt.length||et[0]!==i.COLOR_ATTACHMENT0){for(let vt=0,Ht=gt.length;vt<Ht;vt++)et[vt]=i.COLOR_ATTACHMENT0+vt;et.length=gt.length,St=!0}}else et[0]!==i.BACK&&(et[0]=i.BACK,St=!0);St&&i.drawBuffers(et)}function At(z){return y!==z?(i.useProgram(z),y=z,!0):!1}let zt={[ki]:i.FUNC_ADD,[vu]:i.FUNC_SUBTRACT,[Mu]:i.FUNC_REVERSE_SUBTRACT};zt[Su]=i.MIN,zt[bu]=i.MAX;let K={[Eu]:i.ZERO,[wu]:i.ONE,[Tu]:i.SRC_COLOR,[Hl]:i.SRC_ALPHA,[Lu]:i.SRC_ALPHA_SATURATE,[Pu]:i.DST_COLOR,[Ru]:i.DST_ALPHA,[Au]:i.ONE_MINUS_SRC_COLOR,[Gl]:i.ONE_MINUS_SRC_ALPHA,[Iu]:i.ONE_MINUS_DST_COLOR,[Cu]:i.ONE_MINUS_DST_ALPHA,[Du]:i.CONSTANT_COLOR,[Nu]:i.ONE_MINUS_CONSTANT_COLOR,[Uu]:i.CONSTANT_ALPHA,[Fu]:i.ONE_MINUS_CONSTANT_ALPHA};function at(z,rt,et,St,gt,vt,Ht,te,pt,Gt){if(z===Bi){p===!0&&(nt(i.BLEND),p=!1);return}if(p===!1&&(Q(i.BLEND),p=!0),z!==yu){if(z!==g||Gt!==S){if((_!==ki||A!==ki)&&(i.blendEquation(i.FUNC_ADD),_=ki,A=ki),Gt)switch(z){case bs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Kn:i.blendFunc(i.ONE,i.ONE);break;case kl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case zl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Yt("WebGLState: Invalid blending: ",z);break}else switch(z){case bs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Kn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case kl:Yt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case zl:Yt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Yt("WebGLState: Invalid blending: ",z);break}w=null,v=null,R=null,x=null,M.set(0,0,0),U=0,g=z,S=Gt}return}gt=gt||rt,vt=vt||et,Ht=Ht||St,(rt!==_||gt!==A)&&(i.blendEquationSeparate(zt[rt],zt[gt]),_=rt,A=gt),(et!==w||St!==v||vt!==R||Ht!==x)&&(i.blendFuncSeparate(K[et],K[St],K[vt],K[Ht]),w=et,v=St,R=vt,x=Ht),(te.equals(M)===!1||pt!==U)&&(i.blendColor(te.r,te.g,te.b,pt),M.copy(te),U=pt),g=z,S=!1}function ht(z,rt){z.side===Ge?nt(i.CULL_FACE):Q(i.CULL_FACE);let et=z.side===$e;rt&&(et=!et),Rt(et),z.blending===bs&&z.transparent===!1?at(Bi):at(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),o.setFunc(z.depthFunc),o.setTest(z.depthTest),o.setMask(z.depthWrite),r.setMask(z.colorWrite);let St=z.stencilWrite;a.setTest(St),St&&(a.setMask(z.stencilWriteMask),a.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),a.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),Nt(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?Q(i.SAMPLE_ALPHA_TO_COVERAGE):nt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Rt(z){P!==z&&(z?i.frontFace(i.CW):i.frontFace(i.CCW),P=z)}function ft(z){z!==gu?(Q(i.CULL_FACE),z!==N&&(z===Bl?i.cullFace(i.BACK):z===xu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):nt(i.CULL_FACE),N=z}function Dt(z){z!==k&&(F&&i.lineWidth(z),k=z)}function Nt(z,rt,et){z?(Q(i.POLYGON_OFFSET_FILL),(I!==rt||G!==et)&&(I=rt,G=et,o.getReversed()&&(rt=-rt,et=-et),i.polygonOffset(rt,et))):nt(i.POLYGON_OFFSET_FILL)}function Zt(z){z?Q(i.SCISSOR_TEST):nt(i.SCISSOR_TEST)}function ne(z){z===void 0&&(z=i.TEXTURE0+B-1),C!==z&&(i.activeTexture(z),C=z)}function oe(z,rt,et){et===void 0&&(C===null?et=i.TEXTURE0+B-1:et=C);let St=O[et];St===void 0&&(St={type:void 0,texture:void 0},O[et]=St),(St.type!==z||St.texture!==rt)&&(C!==et&&(i.activeTexture(et),C=et),i.bindTexture(z,rt||lt[z]),St.type=z,St.texture=rt)}function X(){let z=O[C];z!==void 0&&z.type!==void 0&&(i.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function Ce(){try{i.compressedTexImage2D(...arguments)}catch(z){Yt("WebGLState:",z)}}function ie(){try{i.compressedTexImage3D(...arguments)}catch(z){Yt("WebGLState:",z)}}function xe(){try{i.texSubImage2D(...arguments)}catch(z){Yt("WebGLState:",z)}}function Et(){try{i.texSubImage3D(...arguments)}catch(z){Yt("WebGLState:",z)}}function Re(){try{i.compressedTexSubImage2D(...arguments)}catch(z){Yt("WebGLState:",z)}}function Vt(){try{i.compressedTexSubImage3D(...arguments)}catch(z){Yt("WebGLState:",z)}}function $t(){try{i.texStorage2D(...arguments)}catch(z){Yt("WebGLState:",z)}}function D(){try{i.texStorage3D(...arguments)}catch(z){Yt("WebGLState:",z)}}function E(){try{i.texImage2D(...arguments)}catch(z){Yt("WebGLState:",z)}}function Z(){try{i.texImage3D(...arguments)}catch(z){Yt("WebGLState:",z)}}function dt(z){return u[z]!==void 0?u[z]:i.getParameter(z)}function ot(z,rt){u[z]!==rt&&(i.pixelStorei(z,rt),u[z]=rt)}function yt(z){V.equals(z)===!1&&(i.scissor(z.x,z.y,z.z,z.w),V.copy(z))}function wt(z){tt.equals(z)===!1&&(i.viewport(z.x,z.y,z.z,z.w),tt.copy(z))}function it(z,rt){let et=c.get(rt);et===void 0&&(et=new WeakMap,c.set(rt,et));let St=et.get(z);St===void 0&&(St=i.getUniformBlockIndex(rt,z.name),i.uniformBlockBinding(rt,St,St),et.set(z,St))}function st(z,rt,et){let gt=c.get(rt).get(z);l[gt]!==et&&(i.bindBufferBase(i.UNIFORM_BUFFER,gt,et),l[gt]=et)}function Mt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},C=null,O={},d={},l={},f=new WeakMap,m=[],y=null,p=!1,g=null,_=null,w=null,v=null,A=null,R=null,x=null,M=new Bt(0,0,0),U=0,S=!1,P=null,N=null,k=null,I=null,G=null,V.set(0,0,i.canvas.width,i.canvas.height),tt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Q,disable:nt,bindFramebuffer:ut,drawBuffers:xt,useProgram:At,setBlending:at,setMaterial:ht,setFlipSided:Rt,setCullFace:ft,setLineWidth:Dt,setPolygonOffset:Nt,setScissorTest:Zt,activeTexture:ne,bindTexture:oe,unbindTexture:X,compressedTexImage2D:Ce,compressedTexImage3D:ie,texImage2D:E,texImage3D:Z,pixelStorei:ot,getParameter:dt,updateUBOMapping:it,uniformBlockBinding:st,texStorage2D:$t,texStorage3D:D,texSubImage2D:xe,texSubImage3D:Et,compressedTexSubImage2D:Re,compressedTexSubImage3D:Vt,scissor:yt,viewport:wt,reset:Mt}}function O_(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new _t,h=new WeakMap,u=new Set,d,f=new WeakMap,m=new Set,y=new FinalizationRegistry(D=>m.delete(D)),p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(D,E){return p?new OffscreenCanvas(D,E):hs("canvas")}function _(D,E,Z){let dt=1,ot=$t(D);if((ot.width>Z||ot.height>Z)&&(dt=Z/Math.max(ot.width,ot.height)),dt<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){let yt=Math.floor(dt*ot.width),wt=Math.floor(dt*ot.height);d===void 0&&(d=g(yt,wt));let it=E?g(yt,wt):d;return it.width=yt,it.height=wt,it.getContext("2d").drawImage(D,0,0,yt,wt),Wt("WebGLRenderer: Texture has been resized from ("+ot.width+"x"+ot.height+") to ("+yt+"x"+wt+")."),it}else return"data"in D&&Wt("WebGLRenderer: Image in DataTexture is too big ("+ot.width+"x"+ot.height+")."),D;return D}function w(D){return D.generateMipmaps}function v(D){i.generateMipmap(D)}function A(D){return D.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?i.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function R(D,E,Z,dt,ot,yt=!1){if(D!==null){if(i[D]!==void 0)return i[D];Wt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let wt;dt&&(wt=t.get("EXT_texture_norm16"),wt||Wt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let it=E;if(E===i.RED&&(Z===i.FLOAT&&(it=i.R32F),Z===i.HALF_FLOAT&&(it=i.R16F),Z===i.UNSIGNED_BYTE&&(it=i.R8),Z===i.UNSIGNED_SHORT&&wt&&(it=wt.R16_EXT),Z===i.SHORT&&wt&&(it=wt.R16_SNORM_EXT)),E===i.RED_INTEGER&&(Z===i.UNSIGNED_BYTE&&(it=i.R8UI),Z===i.UNSIGNED_SHORT&&(it=i.R16UI),Z===i.UNSIGNED_INT&&(it=i.R32UI),Z===i.BYTE&&(it=i.R8I),Z===i.SHORT&&(it=i.R16I),Z===i.INT&&(it=i.R32I)),E===i.RG&&(Z===i.FLOAT&&(it=i.RG32F),Z===i.HALF_FLOAT&&(it=i.RG16F),Z===i.UNSIGNED_BYTE&&(it=i.RG8),Z===i.UNSIGNED_SHORT&&wt&&(it=wt.RG16_EXT),Z===i.SHORT&&wt&&(it=wt.RG16_SNORM_EXT)),E===i.RG_INTEGER&&(Z===i.UNSIGNED_BYTE&&(it=i.RG8UI),Z===i.UNSIGNED_SHORT&&(it=i.RG16UI),Z===i.UNSIGNED_INT&&(it=i.RG32UI),Z===i.BYTE&&(it=i.RG8I),Z===i.SHORT&&(it=i.RG16I),Z===i.INT&&(it=i.RG32I)),E===i.RGB_INTEGER&&(Z===i.UNSIGNED_BYTE&&(it=i.RGB8UI),Z===i.UNSIGNED_SHORT&&(it=i.RGB16UI),Z===i.UNSIGNED_INT&&(it=i.RGB32UI),Z===i.BYTE&&(it=i.RGB8I),Z===i.SHORT&&(it=i.RGB16I),Z===i.INT&&(it=i.RGB32I)),E===i.RGBA_INTEGER&&(Z===i.UNSIGNED_BYTE&&(it=i.RGBA8UI),Z===i.UNSIGNED_SHORT&&(it=i.RGBA16UI),Z===i.UNSIGNED_INT&&(it=i.RGBA32UI),Z===i.BYTE&&(it=i.RGBA8I),Z===i.SHORT&&(it=i.RGBA16I),Z===i.INT&&(it=i.RGBA32I)),E===i.RGB&&(Z===i.UNSIGNED_SHORT&&wt&&(it=wt.RGB16_EXT),Z===i.SHORT&&wt&&(it=wt.RGB16_SNORM_EXT),Z===i.UNSIGNED_INT_5_9_9_9_REV&&(it=i.RGB9_E5),Z===i.UNSIGNED_INT_10F_11F_11F_REV&&(it=i.R11F_G11F_B10F)),E===i.RGBA){let st=yt?Qs:ce.getTransfer(ot);Z===i.FLOAT&&(it=i.RGBA32F),Z===i.HALF_FLOAT&&(it=i.RGBA16F),Z===i.UNSIGNED_BYTE&&(it=st===me?i.SRGB8_ALPHA8:i.RGBA8),Z===i.UNSIGNED_SHORT&&wt&&(it=wt.RGBA16_EXT),Z===i.SHORT&&wt&&(it=wt.RGBA16_SNORM_EXT),Z===i.UNSIGNED_SHORT_4_4_4_4&&(it=i.RGBA4),Z===i.UNSIGNED_SHORT_5_5_5_1&&(it=i.RGB5_A1)}return(it===i.R16F||it===i.R32F||it===i.RG16F||it===i.RG32F||it===i.RGBA16F||it===i.RGBA32F)&&t.get("EXT_color_buffer_float"),it}function x(D,E){let Z;return D?E===null||E===Rn||E===Hi?Z=i.DEPTH24_STENCIL8:E===_n?Z=i.DEPTH32F_STENCIL8:E===As&&(Z=i.DEPTH24_STENCIL8,Wt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Rn||E===Hi?Z=i.DEPTH_COMPONENT24:E===_n?Z=i.DEPTH_COMPONENT32F:E===As&&(Z=i.DEPTH_COMPONENT16),Z}function M(D,E){return w(D)===!0||D.isFramebufferTexture&&D.minFilter!==ke&&D.minFilter!==tn?Math.log2(Math.max(E.width,E.height))+1:D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?E.mipmaps.length:1}function U(D){let E=new WeakRef(D);n.get(D).__ref=E,m.add(E),y.register(D,E,E)}function S(D){let E=n.get(D).__ref;E!==void 0&&(m.delete(E),y.unregister(E))}function P(D){k(D.target)}function N(D){I(D.target)}function k(D){D.removeEventListener("dispose",P),S(D),B(D),D.isVideoTexture&&h.delete(D),D.isHTMLTexture&&u.delete(D)}function I(D){D.removeEventListener("dispose",N),S(D),L(D)}function G(){for(let D of m){let E=D.deref();E!==void 0&&(E.isRenderTarget===!0?I(E):k(E))}m.clear(),u.clear()}function B(D){let E=n.get(D);if(E.__webglInit===void 0)return;let Z=D.source,dt=f.get(Z);if(dt){let ot=dt[E.__cacheKey];ot.usedTimes--,ot.usedTimes===0&&F(D),Object.keys(dt).length===0&&f.delete(Z)}n.remove(D)}function F(D){let E=n.get(D);i.deleteTexture(E.__webglTexture);let Z=D.source,dt=f.get(Z);delete dt[E.__cacheKey],o.memory.textures--}function L(D){let E=n.get(D);E.__depthDisposeCallback&&E.__depthDisposeCallback();let Z=D.depthTexture;if(Z&&Z.renderTarget===D&&k(Z),D.isWebGLCubeRenderTarget)for(let ot=0;ot<6;ot++){if(Array.isArray(E.__webglFramebuffer[ot]))for(let yt=0;yt<E.__webglFramebuffer[ot].length;yt++)i.deleteFramebuffer(E.__webglFramebuffer[ot][yt]);else i.deleteFramebuffer(E.__webglFramebuffer[ot]);E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer[ot])}else{if(Array.isArray(E.__webglFramebuffer))for(let ot=0;ot<E.__webglFramebuffer.length;ot++)i.deleteFramebuffer(E.__webglFramebuffer[ot]);else i.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&i.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let ot=0;ot<E.__webglColorRenderbuffer.length;ot++)E.__webglColorRenderbuffer[ot]&&i.deleteRenderbuffer(E.__webglColorRenderbuffer[ot]);E.__webglDepthRenderbuffer&&i.deleteRenderbuffer(E.__webglDepthRenderbuffer)}let dt=D.textures;for(let ot=0,yt=dt.length;ot<yt;ot++){let wt=n.get(dt[ot]);wt.__webglTexture&&(i.deleteTexture(wt.__webglTexture),o.memory.textures--),n.remove(dt[ot])}n.remove(D)}let b=0;function C(){b=0}function O(){return b}function q(D){b=D}function J(){let D=b;return D>=s.maxTextures&&Wt("WebGLTextures: Trying to use "+(D+1)+" texture units while this GPU supports only "+s.maxTextures),b+=1,D}function V(D){let E=[];return E.push(D.wrapS),E.push(D.wrapT),E.push(D.wrapR||0),E.push(D.magFilter),E.push(D.minFilter),E.push(D.anisotropy),E.push(D.internalFormat),E.push(D.format),E.push(D.type),E.push(D.generateMipmaps),E.push(D.mipmapsAutoUpdate),E.push(D.premultiplyAlpha),E.push(D.flipY),E.push(D.unpackAlignment),E.push(D.colorSpace),E.join()}function tt(D,E){let Z=n.get(D);if(D.isVideoTexture&&Re(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&Z.__version!==D.version){let dt=D.image;if(dt===null)Wt("WebGLRenderer: Texture marked for update but no image data found.");else if(dt.complete===!1)Wt("WebGLRenderer: Texture marked for update but image is incomplete");else{ht(Z,D,E);return}}else D.isExternalTexture&&(Z.__webglTexture=D.sourceTexture?D.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,Z.__webglTexture,i.TEXTURE0+E)}function ct(D,E){let Z=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&Z.__version!==D.version){ht(Z,D,E);return}else D.isExternalTexture&&(Z.__webglTexture=D.sourceTexture?D.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,Z.__webglTexture,i.TEXTURE0+E)}function lt(D,E){let Z=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&Z.__version!==D.version){ht(Z,D,E);return}e.bindTexture(i.TEXTURE_3D,Z.__webglTexture,i.TEXTURE0+E)}function Q(D,E){let Z=n.get(D);if(D.version>0&&Z.__version!==D.version){Rt(Z,D,E);return}e.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture,i.TEXTURE0+E)}let nt={[ui]:i.REPEAT,[En]:i.CLAMP_TO_EDGE,[Mo]:i.MIRRORED_REPEAT},ut={[ke]:i.NEAREST,[ku]:i.NEAREST_MIPMAP_NEAREST,[Mr]:i.NEAREST_MIPMAP_LINEAR,[tn]:i.LINEAR,[Qo]:i.LINEAR_MIPMAP_NEAREST,[Qn]:i.LINEAR_MIPMAP_LINEAR},xt={[Vu]:i.NEVER,[rc]:i.ALWAYS,[Wu]:i.LESS,[ic]:i.LEQUAL,[Xu]:i.EQUAL,[sc]:i.GEQUAL,[qu]:i.GREATER,[Yu]:i.NOTEQUAL};function At(D,E){if(E.type===_n&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===tn||E.magFilter===Qo||E.magFilter===Mr||E.magFilter===Qn||E.minFilter===tn||E.minFilter===Qo||E.minFilter===Mr||E.minFilter===Qn)&&Wt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(D,i.TEXTURE_WRAP_S,nt[E.wrapS]),i.texParameteri(D,i.TEXTURE_WRAP_T,nt[E.wrapT]),(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)&&i.texParameteri(D,i.TEXTURE_WRAP_R,nt[E.wrapR]),i.texParameteri(D,i.TEXTURE_MAG_FILTER,ut[E.magFilter]),i.texParameteri(D,i.TEXTURE_MIN_FILTER,ut[E.minFilter]),E.compareFunction&&(i.texParameteri(D,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(D,i.TEXTURE_COMPARE_FUNC,xt[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===ke||E.minFilter!==Mr&&E.minFilter!==Qn||E.type===_n&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let Z=t.get("EXT_texture_filter_anisotropic");i.texParameterf(D,Z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function zt(D,E){let Z=!1;D.__webglInit===void 0&&(D.__webglInit=!0,E.addEventListener("dispose",P),U(E));let dt=E.source,ot=f.get(dt);ot===void 0&&(ot={},f.set(dt,ot));let yt=V(E);if(yt!==D.__cacheKey){ot[yt]===void 0&&(ot[yt]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,Z=!0),ot[yt].usedTimes++;let wt=ot[D.__cacheKey];wt!==void 0&&(ot[D.__cacheKey].usedTimes--,wt.usedTimes===0&&F(E)),D.__cacheKey=yt,D.__webglTexture=ot[yt].texture}return Z}function K(D,E,Z){return Math.floor(Math.floor(D/Z)/E)}function at(D,E,Z,dt){let yt=D.updateRanges;if(yt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,E.width,E.height,Z,dt,E.data);else{yt.sort((z,rt)=>z.start-rt.start);let wt=0;for(let z=1;z<yt.length;z++){let rt=yt[wt],et=yt[z],St=rt.start+rt.count,gt=K(et.start,E.width,4),vt=K(rt.start,E.width,4);et.start<=St+1&&gt===vt&&K(et.start+et.count-1,E.width,4)===gt?rt.count=Math.max(rt.count,et.start+et.count-rt.start):(++wt,yt[wt]=et)}yt.length=wt+1;let it=e.getParameter(i.UNPACK_ROW_LENGTH),st=e.getParameter(i.UNPACK_SKIP_PIXELS),Mt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,E.width);for(let z=0,rt=yt.length;z<rt;z++){let et=yt[z],St=Math.floor(et.start/4),gt=Math.ceil(et.count/4),vt=St%E.width,Ht=Math.floor(St/E.width),te=gt,pt=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,vt),e.pixelStorei(i.UNPACK_SKIP_ROWS,Ht),e.texSubImage2D(i.TEXTURE_2D,0,vt,Ht,te,pt,Z,dt,E.data)}D.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,it),e.pixelStorei(i.UNPACK_SKIP_PIXELS,st),e.pixelStorei(i.UNPACK_SKIP_ROWS,Mt)}}function ht(D,E,Z){let dt=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(dt=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(dt=i.TEXTURE_3D);let ot=zt(D,E),yt=E.source;e.bindTexture(dt,D.__webglTexture,i.TEXTURE0+Z);let wt=n.get(yt);if(yt.version!==wt.__version||ot===!0){if(e.activeTexture(i.TEXTURE0+Z),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){let pt=ce.getPrimaries(ce.workingColorSpace),Gt=E.colorSpace===ti?null:ce.getPrimaries(E.colorSpace),jt=E.colorSpace===ti||pt===Gt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,jt)}e.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment);let st=_(E.image,!1,s.maxTextureSize);st=Vt(E,st);let Mt=r.convert(E.format,E.colorSpace),z=r.convert(E.type),rt=R(E.internalFormat,Mt,z,E.normalized,E.colorSpace,E.isVideoTexture);At(dt,E);let et,St=E.mipmaps,gt=E.isVideoTexture!==!0,vt=wt.__version===void 0||ot===!0,Ht=yt.dataReady,te=M(E,st);if(E.isDepthTexture)rt=x(E.format===jn,E.type),vt&&(gt?e.texStorage2D(i.TEXTURE_2D,1,rt,st.width,st.height):e.texImage2D(i.TEXTURE_2D,0,rt,st.width,st.height,0,Mt,z,null));else if(E.isDataTexture)if(St.length>0){gt&&vt&&e.texStorage2D(i.TEXTURE_2D,te,rt,St[0].width,St[0].height);for(let pt=0,Gt=St.length;pt<Gt;pt++)et=St[pt],gt?Ht&&e.texSubImage2D(i.TEXTURE_2D,pt,0,0,et.width,et.height,Mt,z,et.data):e.texImage2D(i.TEXTURE_2D,pt,rt,et.width,et.height,0,Mt,z,et.data);E.generateMipmaps=!1}else gt?(vt&&e.texStorage2D(i.TEXTURE_2D,te,rt,st.width,st.height),Ht&&at(E,st,Mt,z)):e.texImage2D(i.TEXTURE_2D,0,rt,st.width,st.height,0,Mt,z,st.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){gt&&vt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,te,rt,St[0].width,St[0].height,st.depth);for(let pt=0,Gt=St.length;pt<Gt;pt++)if(et=St[pt],E.format!==Pn)if(Mt!==null)if(gt){if(Ht)if(E.layerUpdates.size>0){let jt=mc(et.width,et.height,E.format,E.type);for(let Pt of E.layerUpdates){let ge=et.data.subarray(Pt*jt/et.data.BYTES_PER_ELEMENT,(Pt+1)*jt/et.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,pt,0,0,Pt,et.width,et.height,1,Mt,ge)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,pt,0,0,0,et.width,et.height,st.depth,Mt,et.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,pt,rt,et.width,et.height,st.depth,0,et.data,0,0);else Wt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else gt?Ht&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,pt,0,0,0,et.width,et.height,st.depth,Mt,z,et.data):e.texImage3D(i.TEXTURE_2D_ARRAY,pt,rt,et.width,et.height,st.depth,0,Mt,z,et.data);E.layerUpdates.size>0&&E.clearLayerUpdates()}else{gt&&vt&&e.texStorage2D(i.TEXTURE_2D,te,rt,St[0].width,St[0].height);for(let pt=0,Gt=St.length;pt<Gt;pt++)et=St[pt],E.format!==Pn?Mt!==null?gt?Ht&&e.compressedTexSubImage2D(i.TEXTURE_2D,pt,0,0,et.width,et.height,Mt,et.data):e.compressedTexImage2D(i.TEXTURE_2D,pt,rt,et.width,et.height,0,et.data):Wt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):gt?Ht&&e.texSubImage2D(i.TEXTURE_2D,pt,0,0,et.width,et.height,Mt,z,et.data):e.texImage2D(i.TEXTURE_2D,pt,rt,et.width,et.height,0,Mt,z,et.data)}else if(E.isDataArrayTexture)if(gt){if(vt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,te,rt,st.width,st.height,st.depth),Ht)if(E.layerUpdates.size>0){let pt=mc(st.width,st.height,E.format,E.type);for(let Gt of E.layerUpdates){let jt=st.data.subarray(Gt*pt/st.data.BYTES_PER_ELEMENT,(Gt+1)*pt/st.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Gt,st.width,st.height,1,Mt,z,jt)}E.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,st.width,st.height,st.depth,Mt,z,st.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,rt,st.width,st.height,st.depth,0,Mt,z,st.data);else if(E.isData3DTexture)gt?(vt&&e.texStorage3D(i.TEXTURE_3D,te,rt,st.width,st.height,st.depth),Ht&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,st.width,st.height,st.depth,Mt,z,st.data)):e.texImage3D(i.TEXTURE_3D,0,rt,st.width,st.height,st.depth,0,Mt,z,st.data);else if(E.isFramebufferTexture){if(vt)if(gt)e.texStorage2D(i.TEXTURE_2D,te,rt,st.width,st.height);else{let pt=st.width,Gt=st.height;for(let jt=0;jt<te;jt++)e.texImage2D(i.TEXTURE_2D,jt,rt,pt,Gt,0,Mt,z,null),pt>>=1,Gt>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in i){let pt=i.canvas;if(pt.hasAttribute("layoutsubtree")||pt.setAttribute("layoutsubtree","true"),st.parentNode!==pt){pt.appendChild(st),u.add(E),pt.onpaint=Gt=>{let jt=Gt.changedElements;for(let Pt of u)jt.includes(Pt.image)&&(Pt.needsUpdate=!0)},pt.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,st);else{let jt=i.RGBA,Pt=i.RGBA,ge=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,jt,Pt,ge,st)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(St.length>0){if(gt&&vt){let pt=$t(St[0]);e.texStorage2D(i.TEXTURE_2D,te,rt,pt.width,pt.height)}for(let pt=0,Gt=St.length;pt<Gt;pt++)et=St[pt],gt?Ht&&e.texSubImage2D(i.TEXTURE_2D,pt,0,0,Mt,z,et):e.texImage2D(i.TEXTURE_2D,pt,rt,Mt,z,et);E.generateMipmaps=!1}else if(gt){if(vt){let pt=$t(st);e.texStorage2D(i.TEXTURE_2D,te,rt,pt.width,pt.height)}Ht&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Mt,z,st)}else e.texImage2D(i.TEXTURE_2D,0,rt,Mt,z,st);w(E)&&E.mipmapsAutoUpdate===!0&&v(dt),wt.__version=yt.version,E.onUpdate&&E.onUpdate(E)}D.__version=E.version}function Rt(D,E,Z){if(E.image.length!==6)return;let dt=zt(D,E),ot=E.source;e.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+Z);let yt=n.get(ot);if(ot.version!==yt.__version||dt===!0){e.activeTexture(i.TEXTURE0+Z);let wt=ce.getPrimaries(ce.workingColorSpace),it=E.colorSpace===ti?null:ce.getPrimaries(E.colorSpace),st=E.colorSpace===ti||wt===it?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,st);let Mt=E.isCompressedTexture||E.image[0].isCompressedTexture,z=E.image[0]&&E.image[0].isDataTexture,rt=[];for(let Pt=0;Pt<6;Pt++)!Mt&&!z?rt[Pt]=_(E.image[Pt],!0,s.maxCubemapSize):rt[Pt]=z?E.image[Pt].image:E.image[Pt],rt[Pt]=Vt(E,rt[Pt]);let et=rt[0],St=r.convert(E.format,E.colorSpace),gt=r.convert(E.type),vt=R(E.internalFormat,St,gt,E.normalized,E.colorSpace),Ht=E.isVideoTexture!==!0,te=yt.__version===void 0||dt===!0,pt=ot.dataReady,Gt=M(E,et);At(i.TEXTURE_CUBE_MAP,E);let jt;if(E.isDepthTexture){if(vt=x(E.format===jn,E.type),te)if(Ht)e.texStorage2D(i.TEXTURE_CUBE_MAP,1,vt,et.width,et.height);else for(let Pt=0;Pt<6;Pt++)e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,0,vt,et.width,et.height,0,St,gt,null)}else if(Mt){Ht&&te&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Gt,vt,et.width,et.height);for(let Pt=0;Pt<6;Pt++){jt=rt[Pt].mipmaps;for(let ge=0;ge<jt.length;ge++){let Fe=jt[ge];E.format!==Pn?St!==null?Ht?pt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,ge,0,0,Fe.width,Fe.height,St,Fe.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,ge,vt,Fe.width,Fe.height,0,Fe.data):Wt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ht?pt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,ge,0,0,Fe.width,Fe.height,St,gt,Fe.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,ge,vt,Fe.width,Fe.height,0,St,gt,Fe.data)}}}else{if(jt=E.mipmaps,Ht&&te){jt.length>0&&Gt++;let Pt=$t(rt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Gt,vt,Pt.width,Pt.height)}for(let Pt=0;Pt<6;Pt++)if(z){Ht?pt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,0,0,0,rt[Pt].width,rt[Pt].height,St,gt,rt[Pt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,0,vt,rt[Pt].width,rt[Pt].height,0,St,gt,rt[Pt].data);for(let ge=0;ge<jt.length;ge++){let ii=jt[ge].image[Pt].image;Ht?pt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,ge+1,0,0,ii.width,ii.height,St,gt,ii.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,ge+1,vt,ii.width,ii.height,0,St,gt,ii.data)}}else{Ht?pt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,0,0,0,St,gt,rt[Pt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,0,vt,St,gt,rt[Pt]);for(let ge=0;ge<jt.length;ge++){let Fe=jt[ge];Ht?pt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,ge+1,0,0,St,gt,Fe.image[Pt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,ge+1,vt,St,gt,Fe.image[Pt])}}}w(E)&&E.mipmapsAutoUpdate===!0&&v(i.TEXTURE_CUBE_MAP),yt.__version=ot.version,E.onUpdate&&E.onUpdate(E)}D.__version=E.version}function ft(D,E,Z,dt,ot,yt){let wt=r.convert(Z.format,Z.colorSpace),it=r.convert(Z.type),st=R(Z.internalFormat,wt,it,Z.normalized,Z.colorSpace),Mt=n.get(E),z=n.get(Z);if(z.__renderTarget=E,!Mt.__hasExternalTextures){let rt=Math.max(1,E.width>>yt),et=Math.max(1,E.height>>yt);ot===i.TEXTURE_3D||ot===i.TEXTURE_2D_ARRAY?e.texImage3D(ot,yt,st,rt,et,E.depth,0,wt,it,null):e.texImage2D(ot,yt,st,rt,et,0,wt,it,null)}e.bindFramebuffer(i.FRAMEBUFFER,D),Et(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,dt,ot,z.__webglTexture,0,xe(E)):(ot===i.TEXTURE_2D||ot>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ot<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,dt,ot,z.__webglTexture,yt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Dt(D,E,Z){if(i.bindRenderbuffer(i.RENDERBUFFER,D),E.depthBuffer){let dt=E.depthTexture,ot=dt&&dt.isDepthTexture?dt.type:null,yt=x(E.stencilBuffer,ot),wt=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Et(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,xe(E),yt,E.width,E.height):Z?i.renderbufferStorageMultisample(i.RENDERBUFFER,xe(E),yt,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,yt,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,wt,i.RENDERBUFFER,D)}else{let dt=E.textures;for(let ot=0;ot<dt.length;ot++){let yt=dt[ot],wt=r.convert(yt.format,yt.colorSpace),it=r.convert(yt.type),st=R(yt.internalFormat,wt,it,yt.normalized,yt.colorSpace);Et(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,xe(E),st,E.width,E.height):Z?i.renderbufferStorageMultisample(i.RENDERBUFFER,xe(E),st,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,st,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Nt(D,E,Z){let dt=E.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,D),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ot=n.get(E.depthTexture);ot.__renderTarget=E;let yt=dt?E.depthTexture.image[0]:E.depthTexture.image;(!ot.__webglTexture||yt.width!==E.width||yt.height!==E.height)&&(yt.width=E.width,yt.height=E.height,E.depthTexture.needsUpdate=!0),dt?Q(E.depthTexture,0):tt(E.depthTexture,0);let wt=ot.__webglTexture,it=xe(E),st=dt?i.TEXTURE_CUBE_MAP_POSITIVE_X+Z:i.TEXTURE_2D,Mt=E.depthTexture.format===jn?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(E.depthTexture.format===$n)Et(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Mt,st,wt,0,it):i.framebufferTexture2D(i.FRAMEBUFFER,Mt,st,wt,0);else if(E.depthTexture.format===jn)Et(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Mt,st,wt,0,it):i.framebufferTexture2D(i.FRAMEBUFFER,Mt,st,wt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Zt(D){let E=n.get(D),Z=D.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==D.depthTexture){let dt=D.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),dt){let ot=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,dt.removeEventListener("dispose",ot)};dt.addEventListener("dispose",ot),E.__depthDisposeCallback=ot}E.__boundDepthTexture=dt}if(D.depthTexture&&!E.__autoAllocateDepthBuffer)if(Z)for(let dt=0;dt<6;dt++)Nt(E.__webglFramebuffer[dt],D,dt);else D.texture.mipmaps.length>0?Nt(E.__webglFramebuffer[0],D,0):Nt(E.__webglFramebuffer,D,0);else if(Z){E.__webglDepthbuffer=[];for(let dt=0;dt<6;dt++)if(e.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[dt]),E.__webglDepthbuffer[dt]===void 0)E.__webglDepthbuffer[dt]=i.createRenderbuffer(),Dt(E.__webglDepthbuffer[dt],D,!1);else{let ot=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,yt=E.__webglDepthbuffer[dt];i.bindRenderbuffer(i.RENDERBUFFER,yt),i.framebufferRenderbuffer(i.FRAMEBUFFER,ot,i.RENDERBUFFER,yt)}}else if(D.texture.mipmaps.length>0?e.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),Dt(E.__webglDepthbuffer,D,!1);else{let ot=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,yt=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,yt),i.framebufferRenderbuffer(i.FRAMEBUFFER,ot,i.RENDERBUFFER,yt)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function ne(D,E,Z){let dt=n.get(D);E!==void 0&&ft(dt.__webglFramebuffer,D,D.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),Z!==void 0&&Zt(D)}function oe(D){let E=D.texture,Z=n.get(D),dt=n.get(E);D.addEventListener("dispose",N),U(D);let ot=D.textures,yt=D.isWebGLCubeRenderTarget===!0,wt=ot.length>1;if(wt||(dt.__webglTexture===void 0&&(dt.__webglTexture=i.createTexture()),dt.__version=E.version,o.memory.textures++),yt){Z.__webglFramebuffer=[];for(let it=0;it<6;it++)if(E.mipmaps.length>0){Z.__webglFramebuffer[it]=[];for(let st=0;st<E.mipmaps.length;st++)Z.__webglFramebuffer[it][st]=i.createFramebuffer()}else Z.__webglFramebuffer[it]=i.createFramebuffer()}else{if(E.mipmaps.length>0){Z.__webglFramebuffer=[];for(let it=0;it<E.mipmaps.length;it++)Z.__webglFramebuffer[it]=i.createFramebuffer()}else Z.__webglFramebuffer=i.createFramebuffer();if(wt)for(let it=0,st=ot.length;it<st;it++){let Mt=n.get(ot[it]);Mt.__webglTexture===void 0&&(Mt.__webglTexture=i.createTexture(),o.memory.textures++)}if(D.samples>0&&Et(D)===!1){Z.__webglMultisampledFramebuffer=i.createFramebuffer(),Z.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,Z.__webglMultisampledFramebuffer);for(let it=0;it<ot.length;it++){let st=ot[it];Z.__webglColorRenderbuffer[it]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,Z.__webglColorRenderbuffer[it]);let Mt=r.convert(st.format,st.colorSpace),z=r.convert(st.type),rt=R(st.internalFormat,Mt,z,st.normalized,st.colorSpace,D.isXRRenderTarget===!0),et=xe(D);i.renderbufferStorageMultisample(i.RENDERBUFFER,et,rt,D.width,D.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+it,i.RENDERBUFFER,Z.__webglColorRenderbuffer[it])}i.bindRenderbuffer(i.RENDERBUFFER,null),D.depthBuffer&&(Z.__webglDepthRenderbuffer=i.createRenderbuffer(),Dt(Z.__webglDepthRenderbuffer,D,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(yt){e.bindTexture(i.TEXTURE_CUBE_MAP,dt.__webglTexture),At(i.TEXTURE_CUBE_MAP,E);for(let it=0;it<6;it++)if(E.mipmaps.length>0)for(let st=0;st<E.mipmaps.length;st++)ft(Z.__webglFramebuffer[it][st],D,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+it,st);else ft(Z.__webglFramebuffer[it],D,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0);w(E)?v(i.TEXTURE_CUBE_MAP):E.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,E.mipmaps.length-1),e.unbindTexture()}else if(wt){for(let it=0,st=ot.length;it<st;it++){let Mt=ot[it],z=n.get(Mt),rt=i.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(rt=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(rt,z.__webglTexture),At(rt,Mt),ft(Z.__webglFramebuffer,D,Mt,i.COLOR_ATTACHMENT0+it,rt,0),w(Mt)&&v(rt)}e.unbindTexture()}else{let it=i.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(it=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(it,dt.__webglTexture),At(it,E),E.mipmaps.length>0)for(let st=0;st<E.mipmaps.length;st++)ft(Z.__webglFramebuffer[st],D,E,i.COLOR_ATTACHMENT0,it,st);else ft(Z.__webglFramebuffer,D,E,i.COLOR_ATTACHMENT0,it,0);w(E)?v(it):E.mipmaps.length>0&&i.texParameteri(it,i.TEXTURE_MAX_LEVEL,E.mipmaps.length-1),e.unbindTexture()}D.depthBuffer&&Zt(D)}function X(D){let E=D.textures;for(let Z=0,dt=E.length;Z<dt;Z++){let ot=E[Z];if(w(ot)&&ot.mipmapsAutoUpdate===!0){let yt=A(D),wt=n.get(ot).__webglTexture;e.bindTexture(yt,wt),v(yt),e.unbindTexture()}}}let Ce=[];function ie(D){if(D.samples>0){if(Et(D)===!1){let E=D.textures,Z=D.width,dt=D.height,ot=i.COLOR_BUFFER_BIT,yt=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,wt=n.get(D),it=E.length>1;if(it)for(let Mt=0;Mt<E.length;Mt++)e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,wt.__webglMultisampledFramebuffer),D.texture.mipmaps.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,wt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,wt.__webglFramebuffer);for(let Mt=0;Mt<E.length;Mt++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(ot|=i.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(ot|=i.STENCIL_BUFFER_BIT)),it){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,wt.__webglColorRenderbuffer[Mt]);let z=n.get(E[Mt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,z,0)}i.blitFramebuffer(0,0,Z,dt,0,0,Z,dt,ot,i.NEAREST),l===!0&&(Ce.length=0,Ce.push(i.COLOR_ATTACHMENT0+Mt),D.depthBuffer&&D.storeMultisampledDepthBuffer===!1&&Ce.push(yt),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ce))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),it)for(let Mt=0;Mt<E.length;Mt++){e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.RENDERBUFFER,wt.__webglColorRenderbuffer[Mt]);let z=n.get(E[Mt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.TEXTURE_2D,z,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,wt.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.storeMultisampledDepthBuffer===!1&&l){let E=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}}function xe(D){return Math.min(s.maxSamples,D.samples)}function Et(D){let E=n.get(D);return D.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Re(D){let E=o.render.frame;h.get(D)!==E&&(h.set(D,E),D.update())}function Vt(D,E){let Z=D.colorSpace,dt=D.format,ot=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||Z!==Ks&&Z!==ti&&(ce.getTransfer(Z)===me?(dt!==Pn||ot!==sn)&&Wt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Yt("WebGLTextures: Unsupported texture color space:",Z)),E}function $t(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(c.width=D.naturalWidth||D.width,c.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(c.width=D.displayWidth,c.height=D.displayHeight):(c.width=D.width,c.height=D.height),c}this.allocateTextureUnit=J,this.resetTextureUnits=C,this.getTextureUnits=O,this.setTextureUnits=q,this.setTexture2D=tt,this.setTexture2DArray=ct,this.setTexture3D=lt,this.setTextureCube=Q,this.rebindTextures=ne,this.setupRenderTarget=oe,this.updateRenderTargetMipmap=X,this.updateMultisampleRenderTarget=ie,this.setupDepthRenderbuffer=Zt,this.setupFrameBufferTexture=ft,this.useMultisampledRTT=Et,this.dispose=G}function B_(i,t){function e(n,s=ti){let r,o=ce.getTransfer(s);if(n===sn)return i.UNSIGNED_BYTE;if(n===ta)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ea)return i.UNSIGNED_SHORT_5_5_5_1;if(n===jl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===tc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Kl)return i.BYTE;if(n===Ql)return i.SHORT;if(n===As)return i.UNSIGNED_SHORT;if(n===jo)return i.INT;if(n===Rn)return i.UNSIGNED_INT;if(n===_n)return i.FLOAT;if(n===Cn)return i.HALF_FLOAT;if(n===ec)return i.ALPHA;if(n===nc)return i.RGB;if(n===Pn)return i.RGBA;if(n===$n)return i.DEPTH_COMPONENT;if(n===jn)return i.DEPTH_STENCIL;if(n===na)return i.RED;if(n===ia)return i.RED_INTEGER;if(n===vi)return i.RG;if(n===sa)return i.RG_INTEGER;if(n===ra)return i.RGBA_INTEGER;if(n===Sr||n===br||n===Er||n===wr)if(o===me)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Sr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Er)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Sr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===br)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Er)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===wr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===oa||n===aa||n===la||n===ca)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===oa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===aa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===la)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ca)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ha||n===ua||n===da||n===fa||n===pa||n===Tr||n===ma)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ha||n===ua)return o===me?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===da)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===fa)return r.COMPRESSED_R11_EAC;if(n===pa)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Tr)return r.COMPRESSED_RG11_EAC;if(n===ma)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ga||n===xa||n===_a||n===ya||n===va||n===Ma||n===Sa||n===ba||n===Ea||n===wa||n===Ta||n===Aa||n===Ra||n===Ca)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ga)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===xa)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===_a)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ya)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===va)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ma)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Sa)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ba)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ea)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===wa)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ta)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Aa)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ra)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ca)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Pa||n===Ia||n===La)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Pa)return o===me?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ia)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===La)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Da||n===Na||n===Ar||n===Ua)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Da)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Na)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ar)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ua)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Hi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var k_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,z_=`
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

}`,Cc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new or(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Bn({vertexShader:k_,fragmentShader:z_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new re(new De(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Pc=class extends Un{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,m=null,y=typeof XRWebGLBinding<"u",p=new Cc,g={},_=e.getContextAttributes(),w=null,v=null,A=[],R=[],x=new _t,M=null,U=null,S=new je;S.viewport=new ve;let P=new je;P.viewport=new ve;let N=[S,P],k=new $o,I=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let tt=A[V];return tt===void 0&&(tt=new ps,A[V]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(V){let tt=A[V];return tt===void 0&&(tt=new ps,A[V]=tt),tt.getGripSpace()},this.getHand=function(V){let tt=A[V];return tt===void 0&&(tt=new ps,A[V]=tt),tt.getHandSpace()};function B(V){let tt=R.indexOf(V.inputSource);if(tt===-1)return;let ct=A[tt];ct!==void 0&&(ct.update(V.inputSource,V.frame,c||o),ct.dispatchEvent({type:V.type,data:V.inputSource}))}function F(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",F),s.removeEventListener("inputsourceschange",L);for(let V=0;V<A.length;V++){let tt=R[V];tt!==null&&(R[V]=null,A[V].disconnect(tt))}I=null,G=null,p.reset();for(let V in g)delete g[V];if(t.setRenderTarget(w),f=null,d=null,u=null,s=null,v=null,J.stop(),n.isPresenting=!1,t.setPixelRatio(M),t.setSize(x.width,x.height,!1),U!==null){let V=U.camera;V.fov=U.fov,V.zoom=U.zoom,V.updateProjectionMatrix(),U=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){r=V,n.isPresenting===!0&&Wt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){a=V,n.isPresenting===!0&&Wt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(V){c=V},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&y&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(V){if(s=V,s!==null){if(w=t.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",F),s.addEventListener("inputsourceschange",L),_.xrCompatible!==!0&&await e.makeXRCompatible(),M=t.getPixelRatio(),t.getSize(x),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let ct=null,lt=null,Q=null;_.depth&&(Q=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ct=_.stencil?jn:$n,lt=_.stencil?Hi:Rn);let nt={colorFormat:e.RGBA8,depthFormat:Q,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(nt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),v=new ln(d.textureWidth,d.textureHeight,{format:Pn,type:sn,depthTexture:new Jn(d.textureWidth,d.textureHeight,lt,void 0,void 0,void 0,void 0,void 0,void 0,ct),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let ct={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,ct),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new ln(f.framebufferWidth,f.framebufferHeight,{format:Pn,type:sn,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),J.setContext(s),J.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function L(V){for(let tt=0;tt<V.removed.length;tt++){let ct=V.removed[tt],lt=R.indexOf(ct);lt>=0&&(R[lt]=null,A[lt].disconnect(ct))}for(let tt=0;tt<V.added.length;tt++){let ct=V.added[tt],lt=R.indexOf(ct);if(lt===-1){for(let nt=0;nt<A.length;nt++)if(nt>=R.length){R.push(ct),lt=nt;break}else if(R[nt]===null){R[nt]=ct,lt=nt;break}if(lt===-1)break}let Q=A[lt];Q&&Q.connect(ct)}}function b(V,tt){tt===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(tt.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(s===null)return;let tt=V.near,ct=V.far;p.texture!==null&&(p.depthNear>0&&(tt=p.depthNear),p.depthFar>0&&(ct=p.depthFar)),k.near=P.near=S.near=tt,k.far=P.far=S.far=ct,(I!==k.near||G!==k.far)&&(s.updateRenderState({depthNear:k.near,depthFar:k.far}),I=k.near,G=k.far),k.layers.mask=V.layers.mask|6,S.layers.mask=k.layers.mask&-5,P.layers.mask=k.layers.mask&-3;let lt=V.parent,Q=k.cameras;b(k,lt);for(let nt=0;nt<Q.length;nt++)b(Q[nt],lt);k.projectionMatrix.copy(S.projectionMatrix),k.projectionMatrixInverse.copy(S.projectionMatrixInverse),U===null&&V.isPerspectiveCamera&&(U={camera:V,fov:V.fov,zoom:V.zoom}),C(V,k,lt)};function C(V,tt,ct){ct===null?V.matrix.copy(tt.matrixWorld):(V.matrix.copy(ct.matrixWorld),V.matrix.invert(),V.matrix.multiply(tt.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(tt.projectionMatrix),V.projectionMatrixInverse.copy(tt.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=ds*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(V){l=V,d!==null&&(d.fixedFoveation=V),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=V)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(k)},this.getCameraTexture=function(V){return g[V]};let O=null;function q(V,tt){if(h=tt.getViewerPose(c||o),m=tt,h!==null){let ct=h.views;f!==null&&(t.setRenderTargetFramebuffer(v,f.framebuffer),t.setRenderTarget(v));let lt=!1;ct.length!==k.cameras.length&&(k.cameras.length=0,lt=!0);for(let xt=0;xt<ct.length;xt++){let At=ct[xt],zt=null;if(f!==null)zt=f.getViewport(At);else{let at=u.getViewSubImage(d,At);zt=at.viewport,xt===0&&(t.setRenderTargetTextures(v,at.colorTexture,at.depthStencilTexture),t.setRenderTarget(v))}let K=N[xt];K===void 0&&(K=new je,K.layers.enable(xt),K.viewport=new ve,N[xt]=K),K.matrix.fromArray(At.transform.matrix),K.matrix.decompose(K.position,K.quaternion,K.scale),K.projectionMatrix.fromArray(At.projectionMatrix),K.projectionMatrixInverse.copy(K.projectionMatrix).invert(),K.viewport.set(zt.x,zt.y,zt.width,zt.height),xt===0&&(k.matrix.copy(K.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),lt===!0&&k.cameras.push(K)}let Q=s.enabledFeatures;if(Q&&Q.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){u=n.getBinding();let xt=u.getDepthInformation(ct[0]);xt&&xt.isValid&&xt.texture&&p.init(xt,s.renderState)}if(Q&&Q.includes("camera-access")&&y){t.state.unbindTexture(),u=n.getBinding();for(let xt=0;xt<ct.length;xt++){let At=ct[xt].camera;if(At){let zt=g[At];zt||(zt=new or,g[At]=zt);let K=u.getCameraImage(At);zt.sourceTexture=K}}}}for(let ct=0;ct<A.length;ct++){let lt=R[ct],Q=A[ct];lt!==null&&Q!==void 0&&Q.update(lt,tt,c||o)}O&&O(V,tt),tt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:tt}),m=null}let J=new Pd;J.setAnimationLoop(q),this.setAnimationLoop=function(V){O=V},this.dispose=function(){}}},H_=new Xt,zd=new Jt;zd.set(-1,0,0,0,1,0,0,0,1);function G_(i,t){function e(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function n(p,g){g.color.getRGB(p.fogColor.value,dc(i)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function s(p,g,_,w,v){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(p,g):g.isMeshLambertMaterial?(r(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(p,g),u(p,g)):g.isMeshPhongMaterial?(r(p,g),h(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(p,g),d(p,g),g.isMeshPhysicalMaterial&&f(p,g,v)):g.isMeshMatcapMaterial?(r(p,g),m(p,g)):g.isMeshDepthMaterial?r(p,g):g.isMeshDistanceMaterial?(r(p,g),y(p,g)):g.isMeshNormalMaterial?r(p,g):g.isLineBasicMaterial?(o(p,g),g.isLineDashedMaterial&&a(p,g)):g.isPointsMaterial?l(p,g,_,w):g.isSpriteMaterial?c(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,e(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===$e&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,e(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===$e&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,e(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,e(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);let _=t.get(g),w=_.envMap,v=_.envMapRotation;w&&(p.envMap.value=w,p.envMapRotation.value.setFromMatrix4(H_.makeRotationFromEuler(v)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(zd),p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,p.aoMapTransform))}function o(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform))}function a(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function l(p,g,_,w){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*_,p.scale.value=w*.5,g.map&&(p.map.value=g.map,e(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function c(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function h(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function u(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function d(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function f(p,g,_){p.ior.value=g.ior,g.diffuseRoughness>0&&(p.diffuseRoughness.value=g.diffuseRoughness,g.diffuseRoughnessMap&&(p.diffuseRoughnessMap.value=g.diffuseRoughnessMap,e(g.diffuseRoughnessMap,p.diffuseRoughnessMapTransform))),g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===$e&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.retroreflectivity>0&&(p.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessMinimum,p.iridescenceThicknessMaximum.value=g.iridescenceThicknessMaximum,g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=_.texture,p.transmissionSamplerSize.value.set(_.width,_.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,g){g.matcap&&(p.matcap.value=g.matcap)}function y(p,g){let _=t.get(g).light;p.referencePosition.value.setFromMatrixPosition(_.matrixWorld),p.nearDistance.value=_.shadow.camera.near,p.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function V_(i,t,e,n){let s={},r={};function o(_,w){let v=w.program;n.uniformBlockBinding(_,v,s[_.id])}function a(_,w){let v=s[_.id];v===void 0&&(m(_),v=l(_),s[_.id]=v,_.addEventListener("dispose",p));let A=w.program;n.updateUBOMapping(_,A);let R=t.render.frame;r[_.id]!==R&&(c(_),r[_.id]=R)}function l(_){let w=i.createBuffer(),v=_.__size,A=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,v,A),i.bindBuffer(i.UNIFORM_BUFFER,null),w}function c(_){let w=s[_.id],v=_.uniforms,A=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let R=0,x=v.length;R<x;R++){let M=v[R];if(Array.isArray(M))for(let U=0,S=M.length;U<S;U++)h(M[U],R,U,A);else h(M,R,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(_,w,v,A){if(d(_,w,v,A)===!0){let R=_.__offset,x=_.value;if(Array.isArray(x)){let M=0;for(let U=0;U<x.length;U++){let S=x[U],P=y(S,!0);u(S,_.__data,M),M+=P.storage/Float32Array.BYTES_PER_ELEMENT}}else u(x,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,R,_.__data)}}function u(_,w,v){typeof _=="number"||typeof _=="boolean"?w[v]=_:_.isMatrix3?(w[v]=_.elements[0],w[v+1]=_.elements[1],w[v+2]=_.elements[2],w[v+3]=0,w[v+4]=_.elements[3],w[v+5]=_.elements[4],w[v+6]=_.elements[5],w[v+7]=0,w[v+8]=_.elements[6],w[v+9]=_.elements[7],w[v+10]=_.elements[8],w[v+11]=0):ArrayBuffer.isView(_)?w.set(_.subarray(0,w.length-v),v):_.toArray(w,v)}function d(_,w,v,A){let R=_.value,x=w+"_"+v;if(Array.isArray(R)){A[x]===void 0&&(A[x]=[]);let M=A[x],U=!1;for(let S=0;S<R.length;S++)f(R[S],M,S)===!0&&(U=!0);return U}return f(R,A,x)}function f(_,w,v){if(w[v]===void 0)return typeof _=="number"||typeof _=="boolean"?w[v]=_:ArrayBuffer.isView(_)?w[v]=_.slice():w[v]=_.clone(),!0;{let A=w[v];if(typeof _=="number"||typeof _=="boolean"){if(A!==_)return w[v]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(A.equals(_)===!1)return A.copy(_),!0}}return!1}function m(_){let w=_.uniforms,v=0,A=16;for(let x=0,M=w.length;x<M;x++){let U=Array.isArray(w[x])?w[x]:[w[x]];for(let S=0,P=U.length;S<P;S++){let N=U[S],k=Array.isArray(N.value)?N.value:[N.value],I=Array.isArray(w[x])||Array.isArray(N.value),G=v;for(let F=0,L=k.length;F<L;F++){let b=k[F],C=y(b,I),O=v%A,q=O%C.boundary,J=O+q;v+=q,J!==0&&A-J<C.storage&&(v+=A-J),F===0&&(G=v),v+=C.storage}let B=N.type==="int"?Int32Array:N.type==="uint"?Uint32Array:Float32Array;N.__data=new B((v-G)/Float32Array.BYTES_PER_ELEMENT),N.__offset=G}}let R=v%A;return R>0&&(v+=A-R),_.__size=v,_.__cache={},this}function y(_,w){let v={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(v.boundary=4,v.storage=4):_.isVector2?(v.boundary=8,v.storage=8):_.isVector3||_.isColor?(v.boundary=16,v.storage=12):_.isVector4?(v.boundary=16,v.storage=16):_.isMatrix3?(v.boundary=16,v.storage=48):_.isMatrix4?(v.boundary=16,v.storage=64):_.isTexture?Wt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(v.boundary=16,v.storage=_.byteLength):Wt("WebGLRenderer: Unsupported uniform value type.",_),w===!0&&(v.boundary=16,v.storage=Math.ceil(v.storage/16)*16),v}function p(_){let w=_.target;w.removeEventListener("dispose",p),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function g(){for(let _ in s)i.deleteBuffer(s[_]);s={},r={}}return{bind:o,update:a,dispose:g}}var W_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),zn=null;function X_(){return zn===null&&(zn=new ir(W_,16,16,vi,Cn),zn.name="DFG_LUT",zn.minFilter=tn,zn.magFilter=tn,zn.wrapS=En,zn.wrapT=En,zn.generateMipmaps=!1,zn.needsUpdate=!0),zn}var za=class{constructor(t={}){let{canvas:e=$u(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=sn}=t;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=o;let y=f,p=new Set([ra,sa,ia]),g=new Set([sn,Rn,As,Hi,ta,ea]),_=new Uint32Array(4),w=new Int32Array(4),v={textures:[],min:[],max:[],resolution:[]},A=null,R=null,x=[],M=[],U=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=kn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let S=this,P=!1,N=null,k=null,I=null,G=null;this._outputColorSpace=be;let B=0,F=0,L=null,b=-1,C=null,O=new ve,q=new ve,J=null,V=new Bt(0),tt=0,ct=e.width,lt=e.height,Q=1,nt=null,ut=null,xt=new ve(0,0,ct,lt),At=new ve(0,0,ct,lt),zt=!1,K=new pi,at=new Ao,ht=!1,Rt=!1,ft=new Xt,Dt=new H,Nt=new ve,Zt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ne=!1;function oe(){return L===null?Q:1}let X=n;function Ce(T,W){return e.getContext(T,W)}let ie,xe,Et,Re,Vt,$t,D,E,Z,dt,ot,yt,wt,it,st,Mt,z,rt,et,St,gt,vt,Ht;try{let T={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"187"}`),e.addEventListener("webglcontextlost",Gt,!1),e.addEventListener("webglcontextrestored",jt,!1),e.addEventListener("webglcontextcreationerror",Pt,!1),X===null){let W="webgl2";if(X=Ce(W,T),X===null)throw Ce(W)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}te()}catch(T){throw e.removeEventListener("webglcontextlost",Gt,!1),e.removeEventListener("webglcontextrestored",jt,!1),e.removeEventListener("webglcontextcreationerror",Pt,!1),Yt("WebGLRenderer: "+T.message),T}function te(){ie=new nx(X),ie.init(),gt=new B_(X,ie),xe=new Xg(X,ie,t,gt),Et=new F_(X,ie),xe.reversedDepthBuffer&&d&&Et.buffers.depth.setReversed(!0),k=X.createFramebuffer(),I=X.createFramebuffer(),G=X.createFramebuffer(),Re=new rx(X),Vt=new S_,$t=new O_(X,ie,Et,Vt,xe,gt,Re),D=new ex(S),E=new am(X),vt=new Vg(X,E),Z=new ix(X,E,Re,vt),dt=new ax(X,Z,E,vt,Re),rt=new ox(X,xe,$t),st=new qg(Vt),ot=new M_(S,D,ie,xe,vt,st),yt=new G_(S,Vt),wt=new E_,it=new P_(ie),z=new Gg(S,D,Et,dt,m,l),Mt=new U_(S,dt,xe),Ht=new V_(X,Re,xe,Et),et=new Wg(X,ie,Re),St=new sx(X,ie,Re),Re.programs=ot.programs,S.capabilities=xe,S.extensions=ie,S.properties=Vt,S.renderLists=wt,S.shadowMap=Mt,S.state=Et,S.info=Re}y!==sn&&(U=new cx(y,e.width,e.height,a,s,r));let pt=new Pc(S,X);this.xr=pt,this.getContext=function(){return X},this.getContextAttributes=function(){return X.getContextAttributes()},this.forceContextLoss=function(){let T=ie.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=ie.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(T){T!==void 0&&(Q=T,this.setSize(ct,lt,!1))},this.getSize=function(T){return T.set(ct,lt)},this.setSize=function(T,W,j=!0){if(pt.isPresenting){Wt("WebGLRenderer: Can't change size while VR device is presenting.");return}ct=T,lt=W,e.width=Math.floor(T*Q),e.height=Math.floor(W*Q),j===!0&&(e.style.width=T+"px",e.style.height=W+"px"),U!==null&&U.setSize(e.width,e.height),this.setViewport(0,0,T,W)},this.getDrawingBufferSize=function(T){return T.set(ct*Q,lt*Q).floor()},this.setDrawingBufferSize=function(T,W,j){ct=T,lt=W,Q=j,e.width=Math.floor(T*j),e.height=Math.floor(W*j),this.setViewport(0,0,T,W)},this.setEffects=function(T){if(y===sn){Yt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let W=0;W<T.length;W++)if(T[W].isOutputPass===!0){Wt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}U.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(O)},this.getViewport=function(T){return T.copy(xt)},this.setViewport=function(T,W,j,Y){T.isVector4?xt.set(T.x,T.y,T.z,T.w):xt.set(T,W,j,Y),Et.viewport(O.copy(xt).multiplyScalar(oe()).round())},this.getScissor=function(T){return T.copy(At)},this.setScissor=function(T,W,j,Y){T.isVector4?At.set(T.x,T.y,T.z,T.w):At.set(T,W,j,Y),Et.scissor(q.copy(At).multiplyScalar(oe()).round())},this.getScissorTest=function(){return zt},this.setScissorTest=function(T){Et.setScissorTest(zt=T)},this.setOpaqueSort=function(T){nt=T},this.setTransparentSort=function(T){ut=T},this.getClearColor=function(T){return T.copy(z.getClearColor())},this.setClearColor=function(){z.setClearColor(...arguments)},this.getClearAlpha=function(){return z.getClearAlpha()},this.setClearAlpha=function(){z.setClearAlpha(...arguments)},this.clear=function(T=!0,W=!0,j=!0){let Y=0;if(T){let $=!1;if(L!==null){let Tt=L.texture.format;$=p.has(Tt)}if($){let Tt=L.texture.type,Ut=g.has(Tt),bt=z.getClearColor(),Lt=z.getClearAlpha(),kt=bt.r,Kt=bt.g,ae=bt.b;Ut?(_[0]=kt,_[1]=Kt,_[2]=ae,_[3]=Lt,X.clearBufferuiv(X.COLOR,0,_)):(w[0]=kt,w[1]=Kt,w[2]=ae,w[3]=Lt,X.clearBufferiv(X.COLOR,0,w))}else Y|=X.COLOR_BUFFER_BIT}W&&(Y|=X.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),j&&(Y|=X.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Y!==0&&X.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),N=T},this.dispose=function(){e.removeEventListener("webglcontextlost",Gt,!1),e.removeEventListener("webglcontextrestored",jt,!1),e.removeEventListener("webglcontextcreationerror",Pt,!1),z.dispose(),wt.dispose(),it.dispose(),$t.dispose(),Vt.dispose(),D.dispose(),dt.dispose(),Z.dispose(),vt.dispose(),Ht.dispose(),ot.dispose(),pt.dispose(),pt.removeEventListener("sessionstart",sh),pt.removeEventListener("sessionend",rh),wi.stop()};function Gt(T){T.preventDefault(),ac("WebGLRenderer: Context Lost."),P=!0}function jt(){ac("WebGLRenderer: Context Restored."),P=!1;let T=Re.autoReset,W=Mt.enabled,j=Mt.autoUpdate,Y=Mt.needsUpdate,$=Mt.type;te(),Re.autoReset=T,Mt.enabled=W,Mt.autoUpdate=j,Mt.needsUpdate=Y,Mt.type=$}function Pt(T){Yt("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function ge(T){let W=T.target;W.removeEventListener("dispose",ge),Fe(W)}function Fe(T){ii(T),Vt.remove(T)}function ii(T){let W=Vt.get(T).programs;W!==void 0&&(W.forEach(function(j){ot.releaseProgram(j)}),T.isShaderMaterial&&ot.releaseShaderCache(T))}this.renderBufferDirect=function(T,W,j,Y,$,Tt){W===null&&(W=Zt);let Ut=$.isMesh&&$.matrixWorld.determinantAffine()<0,bt=_f(T,W,j,Y,$);Et.setMaterial(Y,Ut);let Lt=j.index,kt=1;if(Y.wireframe===!0){if(Lt=Z.getWireframeAttribute(j),Lt===void 0)return;kt=2}let Kt=j.drawRange,ae=j.attributes.position,Ft=Kt.start*kt,le=(Kt.start+Kt.count)*kt;Tt!==null&&(Ft=Math.max(Ft,Tt.start*kt),le=Math.min(le,(Tt.start+Tt.count)*kt)),Lt!==null?(Ft=Math.max(Ft,0),le=Math.min(le,Lt.count)):ae!=null&&(Ft=Math.max(Ft,0),le=Math.min(le,ae.count));let Pe=le-Ft;if(Pe<0||Pe===1/0)return;vt.setup($,Y,bt,j,Lt);let ye,_e=et;if(Lt!==null&&(ye=E.get(Lt),_e=St,_e.setIndex(ye)),$.isMesh)Y.wireframe===!0?(Et.setLineWidth(Y.wireframeLinewidth*oe()),_e.setMode(X.LINES)):_e.setMode(X.TRIANGLES);else if($.isLine){let Ve=Y.linewidth;Ve===void 0&&(Ve=1),Et.setLineWidth(Ve*oe()),$.isLineSegments?_e.setMode(X.LINES):$.isLineLoop?_e.setMode(X.LINE_LOOP):_e.setMode(X.LINE_STRIP)}else $.isPoints?_e.setMode(X.POINTS):$.isSprite&&_e.setMode(X.TRIANGLES);if($.isBatchedMesh)if(ie.get("WEBGL_multi_draw"))_e.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{let Ve=$._multiDrawStarts,Ot=$._multiDrawCounts,Qe=$._multiDrawCount,fe=Lt?E.get(Lt).bytesPerElement:1,Ti=Vt.get(Y).currentProgram.getUniforms();for(let We=0;We<Qe;We++)Ti.setValue(X,"_gl_DrawID",We),_e.render(Ve[We]/fe,Ot[We])}else if($.isInstancedMesh)_e.renderInstances(Ft,Pe,$.count);else if(j.isInstancedBufferGeometry){let Ve=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,Ot=Math.min(j.instanceCount,Ve);_e.renderInstances(Ft,Pe,Ot)}else _e.render(Ft,Pe)};function ih(T,W,j,Y){N!==null&&T.isNodeMaterial&&N.setObject(Y,T),ht===!0&&st.setState(T,j,!1),T.transparent===!0&&T.side===Ge&&T.forceSinglePass===!1?(T.side=$e,T.needsUpdate=!0,Us(T,W,Y),T.side=yi,T.needsUpdate=!0,Us(T,W,Y),T.side=Ge):Us(T,W,Y)}this.compile=function(T,W,j=null){j===null&&(j=T),N!==null&&N.renderStart(T,W,j),R=it.get(j),R.init(W),M.push(R),j.traverseVisible(function($){$.isLight&&$.layers.test(W.layers)&&(R.pushLight($),$.castShadow&&R.pushShadow($))}),T!==j&&T.traverseVisible(function($){$.isLight&&$.layers.test(W.layers)&&(R.pushLight($),$.castShadow&&R.pushShadow($))}),R.setupLights(),N!==null&&N.updateLights(R.state.lightsArray),Rt=this.localClippingEnabled,ht=st.init(this.clippingPlanes,Rt),ht===!0&&st.setGlobalState(this.clippingPlanes,W),N!==null&&Mt.render(R.state.shadowsArray,j,W);let Y=new Set;return T.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;let Tt=$.material;if(Tt)if(Array.isArray(Tt))for(let Ut=0;Ut<Tt.length;Ut++){let bt=Tt[Ut];ih(bt,j,W,$),Y.add(bt)}else ih(Tt,j,W,$),Y.add(Tt)}),R=M.pop(),N!==null&&N.renderEnd(),Y},this.compileAsync=function(T,W,j=null){let Y=this.compile(T,W,j);return new Promise($=>{function Tt(){if(Y.forEach(function(Ut){let Lt=Vt.get(Ut).currentProgram;(Lt===void 0||Lt.isReady())&&Y.delete(Ut)}),Y.size===0){$(T);return}setTimeout(Tt,10)}ie.get("KHR_parallel_shader_compile")!==null?Tt():setTimeout(Tt,10)})};let Qa=null;function gf(T){Qa&&Qa(T)}function sh(){wi.stop()}function rh(){wi.start()}let wi=new Pd;wi.setAnimationLoop(gf),typeof self<"u"&&wi.setContext(self),this.setAnimationLoop=function(T){Qa=T,pt.setAnimationLoop(T),T===null?wi.stop():wi.start()},pt.addEventListener("sessionstart",sh),pt.addEventListener("sessionend",rh),this.render=function(T,W){if(W!==void 0&&W.isCamera!==!0){Yt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;N!==null&&N.renderStart(T,W);let j=pt.enabled===!0&&pt.isPresenting===!0,Y=U!==null&&(L===null||j)&&U.begin(S,L);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),pt.enabled===!0&&pt.isPresenting===!0&&(U===null||U.isCompositing()===!1)&&(pt.cameraAutoUpdate===!0&&pt.updateCamera(W),W=pt.getCamera()),T.isScene===!0&&T.onBeforeRender(S,T,W,L),R=it.get(T,M.length),R.init(W),R.state.textureUnits=$t.getTextureUnits(),M.push(R),ft.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),W.isArrayCamera?at.setFromArrayCamera(W):K.setFromProjectionMatrix(ft,gn,W.reversedDepth),Rt=this.localClippingEnabled,ht=st.init(this.clippingPlanes,Rt),A=wt.get(T,x.length),A.init(),x.push(A),this.info.render.frame++,pt.enabled===!0&&pt.isPresenting===!0){let Ut=S.xr.getDepthSensingMesh();Ut!==null&&ja(Ut,W,-1/0,S.sortObjects)}ja(T,W,0,S.sortObjects),A.finish(),N!==null&&N.updateLights(R.state.lightsArray),S.sortObjects===!0&&A.sort(nt,ut),ne=pt.enabled===!1||pt.isPresenting===!1||pt.hasDepthSensing()===!1,ne&&z.addToRenderList(A,T),this.info.autoReset===!0&&this.info.reset(),ht===!0&&st.beginShadows();let $=R.state.shadowsArray;if(Mt.render($,T,W),ht===!0&&st.endShadows(),(Y&&U.hasRenderPass())===!1){let Ut=A.opaque,bt=A.transmissive;if(R.setupLights(),W.isArrayCamera){let Lt=W.cameras;if(bt.length>0)for(let kt=0,Kt=Lt.length;kt<Kt;kt++){let ae=Lt[kt];ah(Ut,bt,T,ae)}ne&&z.render(T);for(let kt=0,Kt=Lt.length;kt<Kt;kt++){let ae=Lt[kt];oh(A,T,ae,ae.viewport)}}else bt.length>0&&ah(Ut,bt,T,W),ne&&z.render(T),oh(A,T,W)}L!==null&&F===0&&($t.updateMultisampleRenderTarget(L),$t.updateRenderTargetMipmap(L)),Y&&U.end(S),T.isScene===!0&&T.onAfterRender(S,T,W),vt.resetDefaultState(),b=-1,C=null,M.pop(),M.length>0?(R=M[M.length-1],$t.setTextureUnits(R.state.textureUnits),ht===!0&&st.setGlobalState(S.clippingPlanes,R.state.camera)):R=null,x.pop(),x.length>0?A=x[x.length-1]:A=null,N!==null&&N.renderEnd()};function ja(T,W,j,Y){if(T.visible===!1)return;if(T.layers.test(W.layers)){if(T.isGroup)j=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(W);else if(T.isLight)R.pushLight(T),T.castShadow&&R.pushShadow(T);else if(T.isSprite){let Ut=W.isArrayCamera?at:K;if(!T.frustumCulled||T.intersectsFrustum(Ut)){Y&&Nt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ft);let bt=dt.update(T),Lt=T.material;Lt.visible&&A.push(T,bt,Lt,j,Nt.z,null,W)}}else if(T.isMesh||T.isLine||T.isPoints){let Ut=W.isArrayCamera?at:K;if(!T.frustumCulled||T.intersectsFrustum(Ut)){let bt=dt.update(T),Lt=T.material;if(Y&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Nt.copy(T.boundingSphere.center)):(bt.boundingSphere===null&&bt.computeBoundingSphere(),Nt.copy(bt.boundingSphere.center)),Nt.applyMatrix4(T.matrixWorld).applyMatrix4(ft)),Array.isArray(Lt)){let kt=bt.groups;for(let Kt=0,ae=kt.length;Kt<ae;Kt++){let Ft=kt[Kt],le=Lt[Ft.materialIndex];le&&le.visible&&A.push(T,bt,le,j,Nt.z,Ft,W)}}else Lt.visible&&A.push(T,bt,Lt,j,Nt.z,null,W)}}}let Tt=T.children;for(let Ut=0,bt=Tt.length;Ut<bt;Ut++)ja(Tt[Ut],W,j,Y)}function oh(T,W,j,Y){let{opaque:$,transmissive:Tt,transparent:Ut}=T;R.setupLightsView(j),ht===!0&&st.setGlobalState(S.clippingPlanes,j),Y&&Et.viewport(O.copy(Y)),$.length>0&&Br($,W,j),Tt.length>0&&Br(Tt,W,j),Ut.length>0&&Br(Ut,W,j),Et.buffers.depth.setTest(!0),Et.buffers.depth.setMask(!0),Et.buffers.color.setMask(!0),Et.setPolygonOffset(!1)}function ah(T,W,j,Y){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;if(R.state.transmissionRenderTarget[Y.id]===void 0){let Ft=ie.has("EXT_color_buffer_half_float")||ie.has("EXT_color_buffer_float");R.state.transmissionRenderTarget[Y.id]=new ln(1,1,{generateMipmaps:!0,type:Ft?Cn:sn,minFilter:Qn,samples:Math.max(4,xe.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ce.workingColorSpace})}let Tt=R.state.transmissionRenderTarget[Y.id],Ut=Y.viewport||O;Tt.setSize(Ut.z*S.transmissionResolutionScale,Ut.w*S.transmissionResolutionScale);let bt=S.getRenderTarget(),Lt=S.getActiveCubeFace(),kt=S.getActiveMipmapLevel();S.setRenderTarget(Tt),S.getClearColor(V),tt=S.getClearAlpha(),tt<1&&S.setClearColor(16777215,.5),S.clear(),ne&&z.render(j);let Kt=S.toneMapping;S.toneMapping=kn;let ae=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),R.setupLightsView(Y),ht===!0&&st.setGlobalState(S.clippingPlanes,Y),Br(T,j,Y),$t.updateMultisampleRenderTarget(Tt),$t.updateRenderTargetMipmap(Tt),ie.has("WEBGL_multisampled_render_to_texture")===!1){let Ft=!1;for(let le=0,Pe=W.length;le<Pe;le++){let ye=W[le],{object:_e,geometry:Ve,material:Ot,group:Qe}=ye;if(Ot.side===Ge&&_e.layers.test(Y.layers)){let fe=Ot.side;Ot.side=$e,Ot.needsUpdate=!0,lh(_e,j,Y,Ve,Ot,Qe),Ot.side=fe,Ot.needsUpdate=!0,Ft=!0}}Ft===!0&&($t.updateMultisampleRenderTarget(Tt),$t.updateRenderTargetMipmap(Tt))}S.setRenderTarget(bt,Lt,kt),S.setClearColor(V,tt),ae!==void 0&&(Y.viewport=ae),S.toneMapping=Kt}function Br(T,W,j){let Y=W.isScene===!0?W.overrideMaterial:null;for(let $=0,Tt=T.length;$<Tt;$++){let Ut=T[$],{object:bt,geometry:Lt,group:kt}=Ut,Kt=Ut.material;Kt.allowOverride===!0&&Y!==null&&(Kt=Y),bt.layers.test(j.layers)&&lh(bt,W,j,Lt,Kt,kt)}}function lh(T,W,j,Y,$,Tt){N!==null&&$.isNodeMaterial&&N.setObject(T,$),T.onBeforeRender(S,W,j,Y,$,Tt),T.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),$.onBeforeRender(S,W,j,Y,T,Tt),$.transparent===!0&&$.side===Ge&&$.forceSinglePass===!1?($.side=$e,$.needsUpdate=!0,S.renderBufferDirect(j,W,Y,$,T,Tt),$.side=yi,$.needsUpdate=!0,S.renderBufferDirect(j,W,Y,$,T,Tt),$.side=Ge):S.renderBufferDirect(j,W,Y,$,T,Tt),T.onAfterRender(S,W,j,Y,$,Tt)}function ch(T){let W=0;for(let j of T)j.texture!==null&&W++;return W}function Us(T,W,j){W.isScene!==!0&&(W=Zt);let Y=Vt.get(T),$=R.state.lights,Tt=R.state.shadowsArray,Ut=$.state.version,bt=ot.getParameters(T,$.state,Tt,W,j,R.state.lightProbeGridArray),Lt=ot.getProgramCacheKey(bt),kt=Y.programs;Y.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?W.environment:null,Y.fog=W.fog;let Kt=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;Y.envMap=D.get(T.envMap||Y.environment,Kt),Y.envMapRotation=Y.environment!==null&&T.envMap===null?W.environmentRotation:T.envMapRotation,kt===void 0&&(T.addEventListener("dispose",ge),kt=new Map,Y.programs=kt,Y.programVariants=new Map);let ae=kt.get(Lt);if(ae!==void 0){if(Y.currentProgram===ae&&Y.lightsStateVersion===Ut)return uh(T,bt),ae}else bt.uniforms=ot.getUniforms(T),N!==null&&T.isNodeMaterial&&N.build(T,j,bt),T.onBeforeCompile(bt,S),ae=ot.acquireProgram(bt,Lt),kt.set(Lt,ae),Y.uniforms=bt.uniforms;let Ft=Y.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ft.clippingPlanes=st.uniform),uh(T,bt),Y.needsLights=vf(T),Y.lightsStateVersion=Ut,Y.needsLights&&(Ft.ambientLightColor.value=$.state.ambient,Ft.lightProbe.value=$.state.probe,Ft.sunLights.value=$.state.sun,Ft.sunLightShadows.value=$.state.sunShadow,Ft.directionalLights.value=$.state.directional,Ft.directionalLightShadows.value=$.state.directionalShadow,Ft.spotLights.value=$.state.spot,Ft.spotLightShadows.value=$.state.spotShadow,Ft.rectAreaLights.value=$.state.rectArea,Ft.ltc_1.value=$.state.rectAreaLTC1,Ft.ltc_2.value=$.state.rectAreaLTC2,Ft.pointLights.value=$.state.point,Ft.pointLightShadows.value=$.state.pointShadow,Ft.hemisphereLights.value=$.state.hemi,Ft.sunShadowMatrix.value=$.state.sunShadowMatrix,Ft.sunShadowCascade.value=$.state.sunShadowCascade,Ft.directionalShadowMatrix.value=$.state.directionalShadowMatrix,Ft.spotLightMatrix.value=$.state.spotLightMatrix,Ft.spotLightMap.value=$.state.spotLightMap,Ft.pointShadowMatrix.value=$.state.pointShadowMatrix),Y.numLightProbeGrids=ch(R.state.lightProbeGridArray),Y.currentProgram=ae,Y.uniformsList=null,ae}function xf(T,W,j,Y,$){let Tt=Vt.get(T),Ut=Tt.currentProgram.id+","+Y+","+$,bt=Tt.programVariants.get(Ut);return bt===void 0?(bt=Us(T,W,j),Tt.programVariants.set(Ut,bt)):(Tt.currentProgram=bt,Tt.uniformsList=null,Tt.outputColorSpace=Y,Tt.toneMapping=$),bt}function hh(T){if(T.uniformsList===null){let W=T.currentProgram.getUniforms();T.uniformsList=Rs.seqWithValue(W.seq,T.uniforms)}return T.uniformsList}function uh(T,W){let j=Vt.get(T);j.outputColorSpace=W.outputColorSpace,j.batching=W.batching,j.batchingColor=W.batchingColor,j.instancing=W.instancing,j.instancingColor=W.instancingColor,j.instancingMorph=W.instancingMorph,j.skinning=W.skinning,j.morphTargets=W.morphTargets,j.morphNormals=W.morphNormals,j.morphColors=W.morphColors,j.morphTargetsCount=W.morphTargetsCount,j.numClippingPlanes=W.numClippingPlanes,j.numIntersection=W.numClipIntersection,j.vertexAlphas=W.vertexAlphas,j.vertexTangents=W.vertexTangents,j.toneMapping=W.toneMapping}function _f(T,W,j,Y,$){W.isScene!==!0&&(W=Zt),$t.resetTextureUnits();let Tt=W.fog,Ut=Y.isMeshStandardMaterial||Y.isMeshLambertMaterial||Y.isMeshPhongMaterial?W.environment:null,bt=L===null?S.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:ce.workingColorSpace,Lt=Y.isMeshStandardMaterial||Y.isMeshLambertMaterial&&!Y.envMap||Y.isMeshPhongMaterial&&!Y.envMap,kt=D.get(Y.envMap||Ut,Lt),Kt=Y.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,ae=!!j.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Ft=!!j.morphAttributes.position,le=!!j.morphAttributes.normal,Pe=!!j.morphAttributes.color,ye=kn;Y.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(ye=S.toneMapping);let _e=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Ve=_e!==void 0?_e.length:0,Ot=Vt.get(Y),Qe=R.state.lights;if(ht===!0&&(Rt===!0||T!==C)){let we=T===C&&Y.id===b;st.setState(Y,T,we)}let fe=!1,Ti=!1;Y.version===Ot.__version?Ot.needsLights&&Ot.lightsStateVersion!==Qe.state.version||$.isBatchedMesh&&Ot.batching===!1||!$.isBatchedMesh&&Ot.batching===!0||$.isBatchedMesh&&Ot.batchingColor===!0&&$._colorsTexture===null||$.isBatchedMesh&&Ot.batchingColor===!1&&$._colorsTexture!==null||$.isInstancedMesh&&Ot.instancing===!1||!$.isInstancedMesh&&Ot.instancing===!0||$.isSkinnedMesh&&Ot.skinning===!1||!$.isSkinnedMesh&&Ot.skinning===!0||$.isInstancedMesh&&Ot.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&Ot.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&Ot.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&Ot.instancingMorph===!1&&$.morphTexture!==null||Ot.envMap!==kt||Y.fog===!0&&Ot.fog!==Tt||Ot.numClippingPlanes!==void 0&&(Ot.numClippingPlanes!==st.numPlanes||Ot.numIntersection!==st.numIntersection)||Ot.vertexAlphas!==Kt||Ot.vertexTangents!==ae||Ot.morphTargets!==Ft||Ot.morphNormals!==le||Ot.morphColors!==Pe||Ot.morphTargetsCount!==Ve||Ot.numLightProbeGrids!==ch(R.state.lightProbeGridArray)?fe=!0:(Ot.outputColorSpace!==bt||Ot.toneMapping!==ye)&&(Ti=!0):(fe=!0,Ot.__version=Y.version);let We=Ot.currentProgram;(fe===!0||Ti===!0)&&(We=Ti===!0?xf(Y,W,$,bt,ye):Us(Y,W,$),N&&Y.isNodeMaterial&&N.onUpdateProgram(Y,We,Ot));let kr=!1,si=!1,Ai=!1,ue=We.getUniforms(),ze=Ot.uniforms;if(Et.useProgram(We.program)&&(kr=!0,si=!0,Ai=!0),Y.id!==b&&(b=Y.id,si=!0),kr||C!==T){Et.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),ue.setValue(X,"projectionMatrix",T.projectionMatrix),ue.setValue(X,"viewMatrix",T.matrixWorldInverse);let Oe=ue.map.cameraPosition;Oe!==void 0&&Oe.setValue(X,Dt.setFromMatrixPosition(T.matrixWorld)),xe.logarithmicDepthBuffer&&ue.setValue(X,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&ue.setValue(X,"isOrthographic",T.isOrthographicCamera===!0),C!==T&&(C=T,si=!0,Ai=!0)}if(Ot.needsLights&&(Qe.state.sunShadowMap.length>0&&ue.setValue(X,"sunShadowMap",Qe.state.sunShadowMap,$t),Qe.state.directionalShadowMap.length>0&&ue.setValue(X,"directionalShadowMap",Qe.state.directionalShadowMap,$t),Qe.state.spotShadowMap.length>0&&ue.setValue(X,"spotShadowMap",Qe.state.spotShadowMap,$t),Qe.state.pointShadowMap.length>0&&ue.setValue(X,"pointShadowMap",Qe.state.pointShadowMap,$t)),$.isSkinnedMesh){ue.setOptional(X,$,"bindMatrix"),ue.setOptional(X,$,"bindMatrixInverse");let we=$.skeleton;we&&(we.boneTexture===null&&we.computeBoneTexture(),ue.setValue(X,"boneTexture",we.boneTexture,$t))}$.isBatchedMesh&&(ue.setOptional(X,$,"batchingTexture"),ue.setValue(X,"batchingTexture",$._matricesTexture,$t),ue.setOptional(X,$,"batchingIdTexture"),ue.setValue(X,"batchingIdTexture",$._indirectTexture,$t),ue.setOptional(X,$,"batchingColorTexture"),$._colorsTexture!==null&&ue.setValue(X,"batchingColorTexture",$._colorsTexture,$t));let vn=j.morphAttributes;if((vn.position!==void 0||vn.normal!==void 0||vn.color!==void 0)&&rt.update($,j,We),(si||Ot.receiveShadow!==$.receiveShadow)&&(Ot.receiveShadow=$.receiveShadow,ue.setValue(X,"receiveShadow",$.receiveShadow)),(Y.isMeshStandardMaterial||Y.isMeshLambertMaterial||Y.isMeshPhongMaterial)&&Y.envMap===null&&W.environment!==null&&(ze.envMapIntensity.value=W.environmentIntensity),ze.dfgLUT!==void 0&&(ze.dfgLUT.value=X_()),si){if(ue.setValue(X,"toneMappingExposure",S.toneMappingExposure),Ot.needsLights&&yf(ze,Ai),Tt&&Y.fog===!0&&yt.refreshFogUniforms(ze,Tt),yt.refreshMaterialUniforms(ze,Y,Q,lt,R.state.transmissionRenderTarget[T.id]),Ot.needsLights&&Ot.numLightProbeGrids>0){let we=v,Oe=0;for(let Gn of R.state.lightProbeGridArray)Gn.texture!==null&&(we.textures[Oe]=Gn.texture,we.min[Oe]=Gn.boundingBox.min,we.max[Oe]=Gn.boundingBox.max,we.resolution[Oe]=Gn.resolution,Oe++);for(let Gn in we)we[Gn].length=Oe;ze.probesSH.value=we.textures,ze.probesMin.value=we.min,ze.probesMax.value=we.max,ze.probesResolution.value=we.resolution}Rs.upload(X,hh(Ot),ze,$t)}if(Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(Rs.upload(X,hh(Ot),ze,$t),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&ue.setValue(X,"center",$.center),ue.setValue(X,"modelViewMatrix",$.modelViewMatrix),ue.setValue(X,"normalMatrix",$.normalMatrix),ue.setValue(X,"modelMatrix",$.matrixWorld),Y.uniformsGroups!==void 0){let we=Y.uniformsGroups;for(let Oe=0,Gn=we.length;Oe<Gn;Oe++){let fh=we[Oe];Ht.update(fh,We),Ht.bind(fh,We)}}return We}function yf(T,W){T.ambientLightColor.needsUpdate=W,T.lightProbe.needsUpdate=W,T.sunLights.needsUpdate=W,T.sunLightShadows.needsUpdate=W,T.directionalLights.needsUpdate=W,T.directionalLightShadows.needsUpdate=W,T.pointLights.needsUpdate=W,T.pointLightShadows.needsUpdate=W,T.spotLights.needsUpdate=W,T.spotLightShadows.needsUpdate=W,T.rectAreaLights.needsUpdate=W,T.hemisphereLights.needsUpdate=W}function vf(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(T,W,j){let Y=Vt.get(T);Y.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,Y.__autoAllocateDepthBuffer===!1&&(Y.__useRenderToTexture=!1),Vt.get(T.texture).__webglTexture=W,Vt.get(T.depthTexture).__webglTexture=Y.__autoAllocateDepthBuffer?void 0:j,Y.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,W){let j=Vt.get(T);j.__webglFramebuffer=W,j.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(T,W=0,j=0){L=T,B=W,F=j;let Y=null,$=!1,Tt=!1;if(T){let bt=Vt.get(T);if(bt.__useDefaultFramebuffer!==void 0){Et.bindFramebuffer(X.FRAMEBUFFER,bt.__webglFramebuffer),O.copy(T.viewport),q.copy(T.scissor),J=T.scissorTest,Et.viewport(O),Et.scissor(q),Et.setScissorTest(J),b=-1;return}else if(bt.__webglFramebuffer===void 0)$t.setupRenderTarget(T);else if(bt.__hasExternalTextures)$t.rebindTextures(T,Vt.get(T.texture).__webglTexture,Vt.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let Kt=T.depthTexture;if(bt.__boundDepthTexture!==Kt){if(Kt!==null&&Vt.has(Kt)&&(T.width!==Kt.image.width||T.height!==Kt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");$t.setupDepthRenderbuffer(T)}}let Lt=T.texture;(Lt.isData3DTexture||Lt.isDataArrayTexture||Lt.isCompressedArrayTexture)&&(Tt=!0);let kt=Vt.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(kt[W])?Y=kt[W][j]:Y=kt[W],$=!0):T.samples>0&&$t.useMultisampledRTT(T)===!1?Y=Vt.get(T).__webglMultisampledFramebuffer:Array.isArray(kt)?Y=kt[j]:Y=kt,O.copy(T.viewport),q.copy(T.scissor),J=T.scissorTest}else O.copy(xt).multiplyScalar(Q).floor(),q.copy(At).multiplyScalar(Q).floor(),J=zt;if(j!==0&&(Y=k),Et.bindFramebuffer(X.FRAMEBUFFER,Y)&&Et.drawBuffers(T,Y),Et.viewport(O),Et.scissor(q),Et.setScissorTest(J),$){let bt=Vt.get(T.texture);X.framebufferTexture2D(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_CUBE_MAP_POSITIVE_X+W,bt.__webglTexture,j)}else if(Tt){let bt=W;for(let Lt=0;Lt<T.textures.length;Lt++){let kt=Vt.get(T.textures[Lt]);X.framebufferTextureLayer(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0+Lt,kt.__webglTexture,j,bt)}}else if(T!==null&&j!==0){let bt=Vt.get(T.texture);X.framebufferTexture2D(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,bt.__webglTexture,j)}b=-1};function dh(T){let W=Vt.get(T);return(W.__readFormat!==T.format||W.__readType!==T.type)&&(W.__readFormat=T.format,W.__readType=T.type,W.__formatReadable=xe.textureFormatReadable(T.format),W.__typeReadable=xe.textureTypeReadable(T.type)),W}this.readRenderTargetPixels=function(T,W,j,Y,$,Tt,Ut,bt=0){if(!(T&&T.isWebGLRenderTarget)){Yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Lt=Vt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ut!==void 0&&(Lt=Lt[Ut],Array.isArray(Lt)&&(Lt=Lt[0])),Lt){Et.bindFramebuffer(X.FRAMEBUFFER,Lt);try{let kt=T.textures[bt],Kt=kt.format,ae=kt.type;T.textures.length>1&&X.readBuffer(X.COLOR_ATTACHMENT0+bt);let Ft=dh(kt);if(Ft.__formatReadable===!1){Yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ft.__typeReadable===!1){Yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=T.width-Y&&j>=0&&j<=T.height-$&&X.readPixels(W,j,Y,$,gt.convert(Kt),gt.convert(ae),Tt)}finally{let kt=L!==null?Vt.get(L).__webglFramebuffer:null;Et.bindFramebuffer(X.FRAMEBUFFER,kt)}}},this.readRenderTargetPixelsAsync=async function(T,W,j,Y,$,Tt,Ut,bt=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Lt=Vt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ut!==void 0&&(Lt=Lt[Ut],Array.isArray(Lt)&&(Lt=Lt[0])),Lt)if(W>=0&&W<=T.width-Y&&j>=0&&j<=T.height-$){Et.bindFramebuffer(X.FRAMEBUFFER,Lt);let kt=T.textures[bt],Kt=kt.format,ae=kt.type;T.textures.length>1&&X.readBuffer(X.COLOR_ATTACHMENT0+bt);let Ft=dh(kt);if(Ft.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ft.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let le=X.createBuffer();X.bindBuffer(X.PIXEL_PACK_BUFFER,le),X.bufferData(X.PIXEL_PACK_BUFFER,Tt.byteLength,X.STREAM_READ),X.readPixels(W,j,Y,$,gt.convert(Kt),gt.convert(ae),0),X.bindBuffer(X.PIXEL_PACK_BUFFER,null);let Pe=L!==null?Vt.get(L).__webglFramebuffer:null;Et.bindFramebuffer(X.FRAMEBUFFER,Pe);let ye=X.fenceSync(X.SYNC_GPU_COMMANDS_COMPLETE,0);return X.flush(),await Ku(X,ye,4),X.bindBuffer(X.PIXEL_PACK_BUFFER,le),X.getBufferSubData(X.PIXEL_PACK_BUFFER,0,Tt),X.bindBuffer(X.PIXEL_PACK_BUFFER,null),X.deleteBuffer(le),X.deleteSync(ye),Tt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,W=null,j=0){let Y=Math.pow(2,-j),$=Math.floor(T.image.width*Y),Tt=Math.floor(T.image.height*Y),Ut=W!==null?W.x:0,bt=W!==null?W.y:0;$t.setTexture2D(T,0),X.copyTexSubImage2D(X.TEXTURE_2D,j,0,0,Ut,bt,$,Tt),Et.unbindTexture()},this.copyTextureToTexture=function(T,W,j=null,Y=null,$=0,Tt=0){let Ut,bt,Lt,kt,Kt,ae,Ft,le,Pe,ye=T.isCompressedTexture?T.mipmaps[Tt]:T.image;if(j!==null)Ut=j.max.x-j.min.x,bt=j.max.y-j.min.y,Lt=j.isBox3?j.max.z-j.min.z:1,kt=j.min.x,Kt=j.min.y,ae=j.isBox3?j.min.z:0;else{let ue=Math.pow(2,-$);Ut=Math.floor(ye.width*ue),bt=Math.floor(ye.height*ue),T.isDataArrayTexture?Lt=ye.depth:T.isData3DTexture?Lt=Math.floor(ye.depth*ue):Lt=1,kt=0,Kt=0,ae=0}Y!==null?(Ft=Y.x,le=Y.y,Pe=Y.z):(Ft=0,le=0,Pe=0);let _e=gt.convert(W.format),Ve=gt.convert(W.type),Ot;W.isData3DTexture?($t.setTexture3D(W,0),Ot=X.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?($t.setTexture2DArray(W,0),Ot=X.TEXTURE_2D_ARRAY):($t.setTexture2D(W,0),Ot=X.TEXTURE_2D),Et.activeTexture(X.TEXTURE0),Et.pixelStorei(X.UNPACK_FLIP_Y_WEBGL,W.flipY),Et.pixelStorei(X.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),Et.pixelStorei(X.UNPACK_ALIGNMENT,W.unpackAlignment);let Qe=Et.getParameter(X.UNPACK_ROW_LENGTH),fe=Et.getParameter(X.UNPACK_IMAGE_HEIGHT),Ti=Et.getParameter(X.UNPACK_SKIP_PIXELS),We=Et.getParameter(X.UNPACK_SKIP_ROWS),kr=Et.getParameter(X.UNPACK_SKIP_IMAGES);Et.pixelStorei(X.UNPACK_ROW_LENGTH,ye.width),Et.pixelStorei(X.UNPACK_IMAGE_HEIGHT,ye.height),Et.pixelStorei(X.UNPACK_SKIP_PIXELS,kt),Et.pixelStorei(X.UNPACK_SKIP_ROWS,Kt),Et.pixelStorei(X.UNPACK_SKIP_IMAGES,ae);let si=T.isDataArrayTexture||T.isData3DTexture,Ai=W.isDataArrayTexture||W.isData3DTexture;if(T.isDepthTexture){let ue=Vt.get(T),ze=Vt.get(W),vn=Vt.get(ue.__renderTarget),we=Vt.get(ze.__renderTarget);Et.bindFramebuffer(X.READ_FRAMEBUFFER,vn.__webglFramebuffer),Et.bindFramebuffer(X.DRAW_FRAMEBUFFER,we.__webglFramebuffer);for(let Oe=0;Oe<Lt;Oe++)si&&(X.framebufferTextureLayer(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,Vt.get(T).__webglTexture,$,ae+Oe),X.framebufferTextureLayer(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,Vt.get(W).__webglTexture,Tt,Pe+Oe)),X.blitFramebuffer(kt,Kt,kt+Ut,Kt+bt,Ft,le,Ft+Ut,le+bt,X.DEPTH_BUFFER_BIT,X.NEAREST);Et.bindFramebuffer(X.READ_FRAMEBUFFER,null),Et.bindFramebuffer(X.DRAW_FRAMEBUFFER,null)}else if($!==0||T.isRenderTargetTexture||Vt.has(T)){let ue=Vt.get(T),ze=Vt.get(W);Et.bindFramebuffer(X.READ_FRAMEBUFFER,I),Et.bindFramebuffer(X.DRAW_FRAMEBUFFER,G);for(let vn=0;vn<Lt;vn++)si?X.framebufferTextureLayer(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,ue.__webglTexture,$,ae+vn):X.framebufferTexture2D(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,ue.__webglTexture,$),Ai?X.framebufferTextureLayer(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,ze.__webglTexture,Tt,Pe+vn):X.framebufferTexture2D(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,ze.__webglTexture,Tt),$!==0?X.blitFramebuffer(kt,Kt,kt+Ut,Kt+bt,Ft,le,Ft+Ut,le+bt,X.COLOR_BUFFER_BIT,X.NEAREST):Ai?X.copyTexSubImage3D(Ot,Tt,Ft,le,Pe+vn,kt,Kt,Ut,bt):X.copyTexSubImage2D(Ot,Tt,Ft,le,kt,Kt,Ut,bt);Et.bindFramebuffer(X.READ_FRAMEBUFFER,null),Et.bindFramebuffer(X.DRAW_FRAMEBUFFER,null)}else Ai?T.isDataTexture||T.isData3DTexture?X.texSubImage3D(Ot,Tt,Ft,le,Pe,Ut,bt,Lt,_e,Ve,ye.data):W.isCompressedArrayTexture?X.compressedTexSubImage3D(Ot,Tt,Ft,le,Pe,Ut,bt,Lt,_e,ye.data):X.texSubImage3D(Ot,Tt,Ft,le,Pe,Ut,bt,Lt,_e,Ve,ye):T.isDataTexture?X.texSubImage2D(X.TEXTURE_2D,Tt,Ft,le,Ut,bt,_e,Ve,ye.data):T.isCompressedTexture?X.compressedTexSubImage2D(X.TEXTURE_2D,Tt,Ft,le,ye.width,ye.height,_e,ye.data):X.texSubImage2D(X.TEXTURE_2D,Tt,Ft,le,Ut,bt,_e,Ve,ye);Et.pixelStorei(X.UNPACK_ROW_LENGTH,Qe),Et.pixelStorei(X.UNPACK_IMAGE_HEIGHT,fe),Et.pixelStorei(X.UNPACK_SKIP_PIXELS,Ti),Et.pixelStorei(X.UNPACK_SKIP_ROWS,We),Et.pixelStorei(X.UNPACK_SKIP_IMAGES,kr),Tt===0&&W.generateMipmaps===!0&&W.mipmapsAutoUpdate===!0&&X.generateMipmap(Ot),Et.unbindTexture()},this.initRenderTarget=function(T){Vt.get(T).__webglFramebuffer===void 0&&$t.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?$t.setTextureCube(T,0):T.isData3DTexture?$t.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?$t.setTexture2DArray(T,0):$t.setTexture2D(T,0),Et.unbindTexture()},this.resetState=function(){B=0,F=0,L=null,Et.reset(),vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=ce._getDrawingBufferColorSpace(t),e.unpackColorSpace=ce._getUnpackColorSpace()}};var q_=new xr;function Lr(i){return new Promise(t=>{q_.load(i,e=>{e.colorSpace=be,e.wrapS=e.wrapT=ui,e.anisotropy=4,t(e)},void 0,()=>t(null))})}function ei(i,t,e={}){let{triplanar:n=!1,vary:s=0,mapNormal:r=!1,...o}=e,a=new Me({map:i,roughness:.9,metalness:0,...o}),l={value:1/t};return a.onBeforeCompile=c=>{c.uniforms.uvScale=l,c.vertexShader=(r?`attribute vec3 mapNormal;
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
      diffuseColor *= sampledDiffuseColor;`)},a.customProgramCacheKey=()=>`wm${t}${n}${s}${r}`,a}function Ic(i,t){let e=document.createElement("canvas");e.width=e.height=i,t(e.getContext("2d"),i);let n=new Tn(e);return n.colorSpace=be,n}var Lc=()=>Ic(128,(i,t)=>{let e=i.createRadialGradient(t/2,t/2,0,t/2,t/2,t/2);e.addColorStop(0,"rgba(0,0,0,0.7)"),e.addColorStop(.55,"rgba(0,0,0,0.38)"),e.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=e,i.fillRect(0,0,t,t)});var Dr=()=>Ic(128,(i,t)=>{let e=i.createRadialGradient(t/2,t/2,0,t/2,t/2,t/2);e.addColorStop(0,"rgba(255,220,160,1)"),e.addColorStop(.35,"rgba(255,190,120,0.45)"),e.addColorStop(1,"rgba(255,170,90,0)"),i.fillStyle=e,i.fillRect(0,0,t,t)});var Dc=()=>Ic(128,(i,t)=>{i.strokeStyle="rgba(255,255,255,1)",i.lineWidth=12,i.beginPath(),i.arc(t/2,t/2,t*.42,0,Math.PI*2),i.stroke(),i.fillStyle="rgba(255,200,120,0.28)",i.beginPath(),i.arc(t/2,t/2,t*.38,0,Math.PI*2),i.fill()});function Nc(i){let t=document.createElement("canvas");t.width=256,t.height=128;let e=t.getContext("2d"),n=e.createLinearGradient(0,0,0,128);n.addColorStop(0,"#5f86c0"),n.addColorStop(.42,"#bcc9d8"),n.addColorStop(.5,"#ffd39a"),n.addColorStop(.56,"#8a7766"),n.addColorStop(1,"#2b2724"),e.fillStyle=n,e.fillRect(0,0,256,128);let s=e.createRadialGradient(64,60,0,64,60,30);s.addColorStop(0,"rgba(255,240,200,1)"),s.addColorStop(1,"rgba(255,200,120,0)"),e.fillStyle=s,e.fillRect(0,0,256,128);let r=new Tn(t);r.mapping=Ts,r.colorSpace=be;let o=new Cs(i),a=o.fromEquirectangular(r).texture;return o.dispose(),r.dispose(),a}var Va=new Bt,Ee=class{constructor(){this.pos=[],this.nor=[],this.col=[]}add(t,e,n){let s=t.attributes.position.array;t.attributes.normal||t.computeVertexNormals();let r=t.attributes.normal.array,o=t.index?t.index.array:null,a=o?o.length:s.length/3;Va.set(e);let l=Va.r,c=Va.g,h=Va.b,u=n?n.elements:null;for(let d=0;d<a;d++){let f=(o?o[d]:d)*3,m=s[f],y=s[f+1],p=s[f+2],g=r[f],_=r[f+1],w=r[f+2];if(u){this.pos.push(u[0]*m+u[4]*y+u[8]*p+u[12],u[1]*m+u[5]*y+u[9]*p+u[13],u[2]*m+u[6]*y+u[10]*p+u[14]);let v=u[0]*g+u[4]*_+u[8]*w,A=u[1]*g+u[5]*_+u[9]*w,R=u[2]*g+u[6]*_+u[10]*w,x=Math.hypot(v,A,R)||1;g=v/x,_=A/x,w=R/x}else this.pos.push(m,y,p);this.nor.push(g,_,w),this.col.push(l,c,h)}return t.dispose(),this}box(t,e,n,s,r,o,a,l=0){return this.add(new Ct(t,e,n),s,mt(r,o,a,l))}build({outline:t=!0}={}){let e=new pe;return e.setAttribute("position",new qt(this.pos,3)),e.setAttribute("normal",new qt(this.nor,3)),e.setAttribute("color",new qt(this.col,3)),t&&Y_(e),e.computeBoundingSphere(),e}};function mt(i,t,e,n=0,s=1,r=1,o=1){let a=new Xt;return a.compose(new H(i,t,e),new Le().setFromAxisAngle(new H(0,1,0),n),new H(s,r,o)),a}function Y_(i){let t=i.attributes.position.array,e=i.attributes.normal.array,n=new Map,s=o=>`${Math.round(t[o]*500)},${Math.round(t[o+1]*500)},${Math.round(t[o+2]*500)}`;for(let o=0;o<t.length;o+=3){let a=s(o),l=n.get(a);l||n.set(a,l=[0,0,0]),l[0]+=e[o],l[1]+=e[o+1],l[2]+=e[o+2]}let r=new Float32Array(t.length);for(let o=0;o<t.length;o+=3){let a=n.get(s(o)),l=Math.hypot(a[0],a[1],a[2])||1;r[o]=a[0]/l,r[o+1]=a[1]/l,r[o+2]=a[2]/l}i.setAttribute("outlineNormal",new de(r,3))}function Hd(i,t,e,n){for(let s=0;s<i.length;s+=9){let r=i[s],o=i[s+1],a=i[s+2],l=i[s+3]-r,c=i[s+4]-o,h=i[s+5]-a,u=i[s+6]-r,d=i[s+7]-o,f=i[s+8]-a,m=c*f-h*d,y=h*u-l*f,p=l*d-c*u,g=(r+i[s+3]+i[s+6])/3-t,_=(o+i[s+4]+i[s+7])/3-e,w=(a+i[s+5]+i[s+8])/3-n;if(m*g+y*_+p*w<0)for(let v=0;v<3;v++){let A=i[s+3+v];i[s+3+v]=i[s+6+v],i[s+6+v]=A}}return i}function Mi(i,t,e,n=.35){let s=i/2+n,r=t/2+n,o=[[-s,0,-r],[s,0,-r],[s,e,0],[-s,0,-r],[s,e,0],[-s,e,0],[-s,0,r],[-s,e,0],[s,e,0],[-s,0,r],[s,e,0],[s,0,r],[-s,0,-r],[-s,e,0],[-s,0,r],[s,0,-r],[s,0,r],[s,e,0],[-s,0,-r],[-s,0,r],[s,0,r],[-s,0,-r],[s,0,r],[s,0,-r]],a=new pe;return a.setAttribute("position",new qt(Hd(o.flat(),0,e*.3,0),3)),a.computeVertexNormals(),a}function Gd(i,t,e,n=.3){let s=i/2+n,r=t/2+n,o=i/2-1.2,a=t/2-1.6,l=e*.7,c={a:[-s,0,-r],b:[s,0,-r],c:[s,0,r],d:[-s,0,r],e:[-o,l,-a],f:[o,l,-a],g:[o,l,a],hh:[-o,l,a],r1:[-o+.6,e,0],r2:[o-.6,e,0]},h=(f,m,y)=>[...c[f],...c[m],...c[y]],u=[...h("a","f","b"),...h("a","e","f"),...h("d","c","g"),...h("d","g","hh"),...h("a","d","hh"),...h("a","hh","e"),...h("b","f","g"),...h("b","g","c"),...h("e","r2","f"),...h("e","r1","r2"),...h("hh","g","r2"),...h("hh","r2","r1"),...h("e","hh","r1"),...h("f","r2","g"),...h("a","c","d"),...h("a","b","c")],d=new pe;return d.setAttribute("position",new qt(Hd(u,0,e*.3,0),3)),d.computeVertexNormals(),d}var Wa=i=>new Xt().makeRotationX(i),Is=i=>new Xt().makeRotationZ(i),Z_=i=>new Xt().makeRotationY(i);function Fc(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function yn(i,t,e,n,s,r,o=6){let a=new H(...e),l=new H(...n),c=a.distanceTo(l),h=new he(s,s,c,o,1),u=new Le().setFromUnitVectors(new H(0,1,0),l.clone().sub(a).normalize()),d=new Xt().compose(a.clone().add(l).multiplyScalar(.5),u,new H(1,1,1));i.add(h,r,t.clone().multiply(d))}var Vd=[15845797,14724230,12946532,9263675],Wd=[2826264,5913378,12093258,1710618,9079434];function Oc(i,t,{jacket:e=3824266,pants:n=3093568,skin:s=0,hair:r=0,scale:o=1,bag:a=!1,walk:l=0}={}){let c=(f,m,y,p)=>{let g=t.clone().multiply(mt(f*o,m*o,y*o,0,o,o,o));return p?g.multiply(p):g},h=Vd[s%Vd.length],u=Wd[r%Wd.length],d=Math.sin(l)*.25;for(let[f,m]of[[.11,d],[-.11,-d]])i.add(new Ct(.26,.09,.11),1908e3,c(.05+m*.4,.045,f)),i.add(new Ni(.075,.68,2,6),n,c(m*.25,.47,f,Is(-m*.5)));i.add(new Ct(.22,.18,.36),n,c(0,.88,0)),i.add(new Ni(.17,.36,2,8),e,c(0,1.2,0,new Xt().makeScale(.85,1,1.15))),i.add(new he(.08,.1,.08,8),new Bt(e).multiplyScalar(.8).getHex(),c(0,1.5,0));for(let[f,m]of[[.26,-d],[-.26,d]])i.add(new Ni(.06,.5,2,6),e,c(m*.3,1.15,f,Is(m*.6))),i.add(new nn(.055,6,5),h,c(m*.55,.84,f));i.add(new nn(.12,8,6),h,c(.01,1.66,0)),i.add(new nn(.128,8,4,0,Math.PI*2,0,Math.PI*.55),u,c(-.015,1.68,0,Is(.25))),i.add(new Ct(.04,.04,.04),h,c(.13,1.65,0)),a&&i.add(new Ct(.16,.3,.26),5913124,c(-.2,1.2,0))}function Nr(i,t,e,{basket:n=!0}={}){let o=u=>{i.add(new An(.33,.04,4,14),1776415,t.clone().multiply(mt(u,.35,0)));for(let d=0;d<2;d++)i.add(new Ct(.56,.01,.01),12106946,t.clone().multiply(mt(u,.35,0)).multiply(Is(d*Math.PI/2)));i.add(new he(.035,.035,.1,6),12106946,t.clone().multiply(mt(u,.35,0)).multiply(Wa(Math.PI/2)))};o(-.6),o(.6);let a=(u,d)=>[u,d,0],l=a(-.05,.36),c=a(-.22,.86),h=a(.48,.82);if(yn(i,t,l,c,.025,e),yn(i,t,l,a(.46,.66),.028,e),yn(i,t,a(-.2,.74),a(.47,.74),.022,e),yn(i,t,l,a(-.6,.35),.018,e),yn(i,t,a(-.2,.78),a(-.6,.35),.018,e),yn(i,t,h,a(.6,.35),.02,e),yn(i,t,c,[-.24,.92,0],.016,12106946),i.add(new Ct(.24,.05,.12),2761760,t.clone().multiply(mt(-.26,.95,0))),yn(i,t,h,[.46,.98,0],.016,12106946),yn(i,t,[.44,.98,-.28],[.44,.98,.28],.016,2236966),i.add(new An(.37,.025,3,6,Math.PI*.75),e,t.clone().multiply(mt(-.6,.35,0)).multiply(Is(Math.PI*.15))),i.add(new An(.37,.025,3,5,Math.PI*.6),e,t.clone().multiply(mt(.6,.35,0)).multiply(Is(Math.PI*.2))),i.add(new Ct(.42,.08,.03),2763310,t.clone().multiply(mt(-.3,.38,.06))),i.add(new Ct(.44,.03,.2),12106946,t.clone().multiply(mt(-.55,.74,0))),n){let u=t.clone().multiply(mt(.66,.92,0));i.add(new Ct(.32,.03,.34),7031338,u);for(let[d,f,m,y]of[[.15,0,.02,.34],[-.15,0,.02,.34],[0,.16,.32,.02],[0,-.16,.32,.02]])i.add(new Ct(m,.2,y),9070144,u.clone().multiply(mt(d,.1,f)))}}function Bc(i,t,e,n=.8){for(let r=0;r<e;r++){let o=r*n,a=t.clone().multiply(mt(o,0,0,Math.PI/2));i.add(new An(.42,.03,4,8,Math.PI),11120051,a.clone().multiply(mt(0,.4,0))),yn(i,a,[-.42,0,0],[-.42,.4,0],.03,11120051),yn(i,a,[.42,0,0],[.42,.4,0],.03,11120051)}yn(i,t,[-.1,.06,0],[(e-1)*n+.1,.06,0],.035,11120051)}function kc(i,t,e=1){let s=(o,a,l,c)=>c?t.clone().multiply(mt(o,a,l)).multiply(c):t.clone().multiply(mt(o,a,l));i.add(new he(.22,.3,.5,8),2042406,s(0,.25,0)),i.add(new An(.22,.04,4,10),2042406,s(0,.5,0,Wa(Math.PI/2))),i.add(new he(.1,.17,1.2,8),2042406,s(0,1.1,0)),i.add(new he(.1,.13,3.9,8),2042406,s(0,3.6,0)),i.add(new nn(.11,8,6),2042406,s(0,1.75,0)),i.add(new An(.55,.045,5,10,Math.PI/2),2042406,s(0,5,e*.55,Z_(e>0?-Math.PI/2:Math.PI/2))),i.add(new he(.015,.015,.5,4),2042406,s(0,5.25,e*.95));let r=e*1.12;i.add(new he(.05,.27,.22,6),2042406,s(0,4.98,r)),i.add(new he(.29,.29,.05,6),12096058,s(0,4.86,r)),i.add(new nn(.07,6,4),13937224,s(0,5.15,r));for(let o=0;o<6;o++){let a=o/6*Math.PI*2+Math.PI/6;i.add(new Ct(.035,.66,.035),2042406,s(Math.cos(a)*.3,4.52,r+Math.sin(a)*.3))}return i.add(new he(.24,.12,.12,6),2042406,s(0,4.16,r)),[t.elements[12],t.elements[14]+e*1.12]}function zc(){return new he(.31,.22,.64,6)}function $_(i){let t=document.createElement("canvas");return t.width=128,t.height=128,i(t.getContext("2d")),t}function Hc(){let i=document.createElement("canvas");i.width=512,i.height=128;let t=i.getContext("2d");[s=>{s.fillStyle="#1f5fbf",s.fillRect(6,6,116,116),s.strokeStyle="#fff",s.lineWidth=6,s.strokeRect(10,10,108,108),s.fillStyle="#fff",s.font="bold 86px sans-serif",s.textAlign="center",s.textBaseline="middle",s.fillText("P",64,70)},s=>{s.fillStyle="#1d4f9e",s.fillRect(0,34,128,60),s.strokeStyle="#fff",s.lineWidth=4,s.strokeRect(4,38,120,52),s.fillStyle="#fff",s.font="bold 15px sans-serif",s.textAlign="center",s.textBaseline="middle",s.fillText("SYSSLOMANSG.",64,64)},s=>{s.fillStyle="#f2c94c",s.fillRect(14,6,100,116),s.fillStyle="#2e7d4f",s.fillRect(28,30,72,44),s.fillStyle="#f2c94c",s.fillRect(36,38,22,16),s.fillRect(66,38,22,16),s.fillStyle="#1a1a1a",s.font="bold 22px sans-serif",s.textAlign="center",s.fillText("BUSS",64,104)},s=>{s.fillStyle="#c62828",s.beginPath(),s.arc(64,64,58,0,Math.PI*2),s.fill(),s.fillStyle="#fff",s.fillRect(24,54,80,20)}].forEach((s,r)=>{let o=$_(s);t.drawImage(o,r*128,0)});let n=new Tn(i);return n.colorSpace=be,n}function Gc(i,t,e=2.6){i.add(new he(.035,.035,e,6),10133670,t.clone().multiply(mt(0,e/2,0))),i.add(new he(.05,.05,.06,6),5922404,t.clone().multiply(mt(0,e,0)))}function Vc(i,t){let n=[9067062,9790524,8344114];for(let s=0;s<4;s++)i.add(new Ct(1.8,.04,.11),n[s%3],t.clone().multiply(mt(0,.46,-.18+s*.12)));for(let s=0;s<3;s++)i.add(new Ct(1.8,.11,.035),n[(s+1)%3],t.clone().multiply(mt(0,.62+s*.13,-.27)).multiply(Wa(-.15)));for(let s of[-.75,.75])i.add(new Ct(.06,.44,.06),2042406,t.clone().multiply(mt(s,.22,.17))),i.add(new Ct(.06,.85,.06),2042406,t.clone().multiply(mt(s,.42,-.24)).multiply(Wa(-.15))),i.add(new Ct(.06,.05,.48),2042406,t.clone().multiply(mt(s,.44,-.02))),i.add(new Ct(.06,.04,.42),2042406,t.clone().multiply(mt(s,.68,-.02)))}function Wc(i,t,e){let n=Fc(e),s=[8016436,8806460];for(let o=0;o<4;o++)i.add(new Ct(1.8,.14,.05),s[o%2],t.clone().multiply(mt(0,.1+o*.14,.36)));for(let o=0;o<4;o++)i.add(new Ct(1.8,.14,.05),s[(o+1)%2],t.clone().multiply(mt(0,.1+o*.14,-.36)));for(let o of[-.88,.88])i.add(new Ct(.05,.56,.76),s[0],t.clone().multiply(mt(o,.31,0)));i.add(new Ct(1.74,.04,.7),3811870,t.clone().multiply(mt(0,.58,0)));let r=[14700650,15911244,16777215,14248608,16747066,9071318];for(let o=0;o<16;o++){let a=(n()-.5)*1.6,l=(n()-.5)*.55;i.add(new On(.13+n()*.06,0),[4160053,5214010][o%2],t.clone().multiply(mt(a,.68,l))),n()<.75&&i.add(new On(.07,0),r[Math.floor(n()*r.length)],t.clone().multiply(mt(a+.03,.82,l)))}}function Xc(i,t){i.add(new he(.27,.23,.85,12),3103298,t.clone().multiply(mt(0,.5,0))),i.add(new he(.29,.29,.06,12),2369066,t.clone().multiply(mt(0,.95,0))),i.add(new he(.05,.05,.5,6),2369066,t.clone().multiply(mt(0,.25,-.3)))}function qa(i,t,e){for(let s=0;s<=e+.01;s+=.32)i.add(new Ct(.035,.95,.035),1843744,t.clone().multiply(mt(s,.48,0)));for(let s of[.15,.85])i.add(new Ct(e,.045,.045),1843744,t.clone().multiply(mt(e/2,s,0)))}function J_(i){i.computeVertexNormals();let t=i.attributes.position,e=i.attributes.normal,n=new Map,s=r=>`${Math.round(t.getX(r)*1e3)},${Math.round(t.getY(r)*1e3)},${Math.round(t.getZ(r)*1e3)}`;for(let r=0;r<t.count;r++){let o=s(r),a=n.get(o)||[0,0,0];a[0]+=e.getX(r),a[1]+=e.getY(r),a[2]+=e.getZ(r),n.set(o,a)}for(let r=0;r<t.count;r++){let o=n.get(s(r)),a=Math.hypot(o[0],o[1],o[2])||1;e.setXYZ(r,o[0]/a,o[1]/a,o[2]/a)}e.needsUpdate=!0}function qc(i,t){let e=Fc(t*97+13),n={lind:{h:3.4,br:5,reach:2.4,rise:2.4,cl:[.85,1.25],n:2,leaf:[.55,1.2,.42],bark:4864556,w:.32},lonn:{h:3,br:6,reach:2.8,rise:2,cl:[.9,1.3],n:2,leaf:[.5,1.12,.38],bark:4141864,w:.34},bjork:{h:4.2,br:5,reach:1.6,rise:2.8,cl:[.65,.95],n:2,leaf:[.56,1.2,.42],bark:15131094,w:.17}}[i],s=new Xa,r=new Xa,o=[(e()-.5)*.3,(e()-.5)*.3],a=[o[0],n.h,o[1]];if(s.tube([0,0,0],a,n.w,n.w*.75,n.bark,7),i==="bjork")for(let m=.5;m<n.h;m+=.42)s.box(n.w*2.1,.05,n.w*2.1,2763306,o[0]*(m/n.h),m,o[1]*(m/n.h));let l=new H(-.9,.35,.3).normalize(),c=[];for(let m=0;m<n.br;m++){let y=m/n.br*Math.PI*2+e()*.9,p=n.reach*(.7+e()*.5),g=n.rise*(.7+e()*.5),_=[a[0],n.h-e()*.8,a[2]],w=[_[0]+Math.cos(y)*p*.55,_[1]+g*.55,_[2]+Math.sin(y)*p*.55],v=[_[0]+Math.cos(y)*p,_[1]+g,_[2]+Math.sin(y)*p];s.tube(_,w,n.w*.55,n.w*.4,n.bark,5),s.tube(w,v,n.w*.4,n.w*.22,n.bark,4);for(let A=0;A<n.n;A++){let R=A===0?1:.55+e()*.35,x=[_[0]+(v[0]-_[0])*R+(e()-.5)*.6,_[1]+(v[1]-_[1])*R+.3+e()*.5,_[2]+(v[2]-_[2])*R+(e()-.5)*.6];c.push([x,n.cl[0]+e()*(n.cl[1]-n.cl[0])])}}c.push([[a[0],n.h+n.rise+.6,a[2]],n.cl[1]*1.05]),i!=="bjork"&&c.push([[a[0]+.5,n.h+n.rise*.7,a[2]-.6],n.cl[1]]);let h=c.reduce((m,y)=>m+y[0][1],0)/c.length,u=c.reduce((m,y)=>m+y[0][0],0)/c.length,d=c.reduce((m,y)=>m+y[0][2],0)/c.length,f=new H;for(let[m,y]of c){let p=K_(y,Math.floor(e()*1e6)),g=p.attributes.position.array,_=p.attributes.normal.array;p.setAttribute("mapNormal",new de(_.slice(),3));for(let A=0;A<g.length;A+=3)f.set(m[0]+g[A]-u,(m[1]+g[A+1]-h)*1.2,m[2]+g[A+2]-d).normalize(),f.multiplyScalar(.7).add(new H(_[A],_[A+1],_[A+2]).multiplyScalar(.3)).normalize(),_[A]=f.x,_[A+1]=f.y,_[A+2]=f.z;let w=new Float32Array(g.length),v=.9+e()*.2;for(let A=0;A<g.length;A+=3){let R=Math.max(0,_[A]*l.x+_[A+1]*l.y+_[A+2]*l.z),x=(m[1]+g[A+1]-h)/3,M=Math.max(0,-(_[A]*m[0]+_[A+2]*m[2]))*.08,U=_[A+1]*.5+.5,S=v*(.45+.3*U+.25*Math.min(1,Math.max(0,x+.5))-M),P=1-.4*R;w[A]=n.leaf[0]*S*P*.9,w[A+1]=n.leaf[1]*S*P,w[A+2]=n.leaf[2]*S*P}p.setAttribute("color",new de(w,3)),p.translate(m[0],m[1],m[2]),r.addColoured(p)}return{wood:s.build(),leaves:r.build()}}function K_(i,t){let e=new On(i,1),n=Fc(t),s=e.attributes.position,r=Array.from({length:5},()=>[n()*2-1,n()*2-1,n()*2-1,.1+n()*.2]);for(let a=0;a<s.count;a++){let l=new H().fromBufferAttribute(s,a).normalize(),c=.82+n()*.08;for(let[h,u,d,f]of r)c+=f*Math.max(0,l.x*h+l.y*u+l.z*d)**2;l.multiplyScalar(i*c),l.y*=l.y<0?.5:.8,l.x*=1.15,l.z*=1.15,s.setXYZ(a,l.x,l.y,l.z)}let o=e.toNonIndexed();return o.computeVertexNormals(),J_(o),e.dispose(),o}var Xa=class{constructor(){this.pos=[],this.nor=[],this.col=[],this.mapN=[]}addColoured(t){let e=t.index?t.toNonIndexed():t;this.pos.push(...e.attributes.position.array),this.nor.push(...e.attributes.normal.array),this.col.push(...e.attributes.color.array),this.mapN.push(...(e.attributes.mapNormal||e.attributes.normal).array)}addSolid(t,e){let n=t.index?t.toNonIndexed():t;n.computeVertexNormals();let s=new Bt(e),r=n.attributes.position.count,o=new Float32Array(r*3);for(let a=0;a<r;a++)o.set([s.r,s.g,s.b],a*3);n.setAttribute("color",new de(o,3)),this.addColoured(n)}tube(t,e,n,s,r,o){let a=new H(...t),l=new H(...e),c=new he(s,n,a.distanceTo(l),o,1,!0),h=new Le().setFromUnitVectors(new H(0,1,0),l.clone().sub(a).normalize());c.applyMatrix4(new Xt().compose(a.clone().add(l).multiplyScalar(.5),h,new H(1,1,1))),this.addSolid(c,r)}box(t,e,n,s,r,o,a){let l=new Ct(t,e,n);l.translate(r,o,a),this.addSolid(l,s)}build(){let t=new pe;return t.setAttribute("position",new qt(this.pos,3)),t.setAttribute("normal",new qt(this.nor,3)),t.setAttribute("color",new qt(this.col,3)),t.setAttribute("mapNormal",new qt(this.mapN,3)),t}};var ni=null,Yc=null;function Xd(i){Yc=i,ni=null}function qd(){if(ni)return ni;if(ni=[],Yc){for(let[t,e]of Object.entries(Yc))/^Tree_/.test(t)&&ni.push({kind:t,parts:n=>e.map(s=>[s.geo,n[s.mat]||n.leaf])});if(ni.length)return ni}let i=11;for(let t of["lind","lonn","bjork"])for(let e=0;e<2;e++){let n=qc(t,i++);ni.push({kind:t,parts:s=>[[n.wood,s.wood],[n.leaves,s.leaf]]})}return ni}var Ke=64,fn=3.2,Yd=[14856796,15783308,15180164,15986404,14272422,15319674,13161400];function $d(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var $a=class{constructor(){this.m=[],this.c=[]}add(t,e,n,s,r,o,a,l,c){let h=mt(t,e,n,s,1,1,1);c&&h.multiply(c),h.multiply(new Xt().makeScale(r,o,a)),this.m.push(h),this.c.push(l)}mesh(t,e){if(!this.m.length)return null;let n=new cn(e,t,this.m.length),s=new Bt;return this.m.forEach((r,o)=>{n.setMatrixAt(o,r),n.setColorAt(o,s.set(this.c[o]))}),n.computeBoundingSphere(),n}};function Q_(i,t){return`${Math.floor(i/Ke)},${Math.floor(t/Ke)}`}function j_(){return{asphalt:new Ee,slabs:new Ee,grass:new Ee,wall:new Ee,roof:new Ee,trimB:new Ee,props:new Ee,trim:new $a,glass:new $a,lanterns:[],hedge:new Ee,signs:[]}}function ty(i,t,e,n){return{S:{x:i,z:t+n/2,nx:0,nz:1,tx:1,tz:0,L:e,rot:0},E:{x:i+e/2,z:t,nx:1,nz:0,tx:0,tz:-1,L:n,rot:Math.PI/2},W:{x:i-e/2,z:t,nx:-1,nz:0,tx:0,tz:1,L:n,rot:-Math.PI/2},N:{x:i,z:t-n/2,nx:0,nz:-1,tx:-1,tz:0,L:e,rot:Math.PI}}}function ey(i,t,e,n){let s=$d(Math.floor(t.seed*1e6)+e*7),r=i;r.dark=r.trim;let o=Math.max(1,Math.min(7,Math.round((t.height-1)/fn))),a=o*fn+1,l=t.w,c=t.h,h=t.x+l/2,u=t.y+c/2,d=Yd[(t.facadeIndex+e)%Yd.length],f=new Bt(d).multiplyScalar(.82).getHex(),m=16052198,y=s()<.4,p=s()<.3?5913130:s()<.5?3099194:16184042,g=Math.floor(s()*4),_=y?s()<.5?"pediment":"hood":["hood","keystone","none"][Math.floor(s()*3)],w=t.shop??s()<.3,v=[3107402,9054762,2771578,6965802][Math.floor(s()*4)];r.wall.add(new Ct(l,a,c),d,mt(h,a/2,u));let A=(C,O,q,J,V)=>{let tt=O+.06;C.add(new Ct(l+O*2,q,tt),V,mt(h,J,u+c/2+O-tt/2)),C.add(new Ct(l+O*2,q,tt),V,mt(h,J,u-c/2-O+tt/2)),C.add(new Ct(tt,q,c),V,mt(h+l/2+O-tt/2,J,u)),C.add(new Ct(tt,q,c),V,mt(h-l/2-O+tt/2,J,u))};A(r.wall,.06,1,.5,9407106),A(r.wall,.04,fn-.2,1+(fn-.2)/2,f);for(let C=1;C<o;C++)A(r.trimB,.05,.16,1+C*fn,m);A(r.trimB,.3,.45,a+.22,m);let R=ty(h,u,l,c),x=[R.S,R.E,R.W].find(C=>n.street(C))||(l>=c?R.S:t.seed<.5?R.E:R.W),M=(C,O,q,J)=>[C.x+C.tx*O+C.nx*J,q,C.z+C.tz*O+C.nz*J],U=(C,O,q,J,V=C.rot,tt=0,ct=0)=>{let lt=J===o-1,Q=lt?1.15:g===3?1.8:1.5,nt=q+(Q-1.5)/2,ut=Math.sin(V),xt=Math.cos(V),At=Math.cos(V),zt=-Math.sin(V),K=(ft,Dt,Nt)=>[C.x+C.tx*O+C.nx*tt+At*ft+ut*Nt,nt+Dt,C.z+C.tz*O+C.nz*tt+zt*ft+xt*Nt],at=(ft,Dt)=>{let Nt=s()<.1;r.trim.add(...K(ft,0,.04),V,Dt+.22,Q+.24,.1,p),r.glass.add(...K(ft,0,.05),V,Dt,Q,.12,Nt?16763274:[9414335,7309215,11123916,6123910][Math.floor(s()*4)]),!Nt&&s()<.25&&r.trim.add(...K(ft-Dt*.24,.05,.065),V,Dt*.4,Q*.85,.13,[15986400,14272416,13096160][Math.floor(s()*3)])},ht=ct||1.05;g===1&&C===x&&!ct?(at(-.36,.52),at(.36,.52),ht=1.3):at(0,ht),r.trim.add(...K(0,-Q/2-.18,.12),V,ht+.3,.08,.3,9344154),g===2&&!lt&&r.trim.add(...K(0,Q/2+.2,.05),V,ht*.8,.36,.1,p);let Rt=Q/2+(g===2&&!lt?.55:.25);_==="pediment"&&!lt?(r.trim.add(...K(0,Rt,.07),V,ht+.45,.22,.14,m),r.trim.add(...K(0,Rt+.2,.07),V,ht*.7,.16,.12,m)):_==="hood"?r.trim.add(...K(0,Rt,.12),V,ht+.5,.16,.24,m):_==="keystone"&&r.trim.add(...K(0,Rt,.08),V,.28,.34,.16,m)},S=new Set;for(let C of[R.S,R.E,R.W]){if(C!==R.S&&n.blocked(C))continue;let O=Math.max(2,Math.floor(C.L/(y?2.9:2.6))),q=C.L/O,J=Math.floor(O/2),V=C===x;if(S.clear(),V&&O>=5&&s()<.65){let Q=Math.floor(s()*3);Q===0?[1,O-2].forEach(nt=>S.add(nt)):Q===1?S.add(J):S.add(O-2)}for(let Q=0;Q<o;Q++)for(let nt=0;nt<O;nt++){let ut=-C.L/2+q*(nt+.5);V&&Q===0&&nt===J||V&&Q===0&&w||Q>0&&S.has(nt)||U(C,ut,1+Q*fn+1.6,Q,C.rot,.04)}if(V&&y)for(let Q=1;Q<O;Q++){let[nt,,ut]=M(C,-C.L/2+q*Q,0,.06);r.trim.add(nt,1+fn+(o-1)*fn/2,ut,C.rot,.3,(o-1)*fn,.12,new Bt(d).multiplyScalar(1.06).getHex())}if(!V)continue;for(let Q=0;Q<Math.floor(C.L/.9);Q++){let[nt,,ut]=M(C,-C.L/2+.45+Q*.9,0,.25);r.trim.add(nt,a-.15,ut,C.rot,.22,.35,.5,15130578)}let tt=-C.L/2+q*(J+.5),ct=[5912102,3099194,3885674,6957604][t.facadeIndex%4],lt=(Q,nt)=>M(C,tt,Q,nt);r.trim.add(...lt(1.6,.05),C.rot,2.1,3.2,.06,14209218),r.trim.add(...lt(3.6,.2),C.rot,2.8,.3,.5,15130578);for(let Q of[-1.1,1.1]){let[nt,,ut]=M(C,tt+Q,0,.18);r.trim.add(nt,1.65,ut,C.rot,.3,3.3,.4,15130578)}if(r.dark.add(...lt(1.3,.09),C.rot,1.4,2.6,.25,ct),r.glass.add(...lt(2.85,.1),C.rot,1.3,.38,.26,16767392),r.trim.add(...lt(.17,.55),C.rot,2.6,.35,1.1,10656398),r.trim.add(...lt(.06,1.05),C.rot,2.6,.12,.6,10656398),w)for(let Q=0;Q<O;Q++){if(Q===J)continue;let nt=-C.L/2+q*(Q+.5),[ut,,xt]=M(C,nt,0,.05);if(r.glass.add(ut,1.55,xt,C.rot,q*.82,2.1,.16,13150328),Q%2===0){let[At,,zt]=M(C,nt,0,1.5);Ls(r.props,Ds("flowers",K=>Wc(K,mt(0,0,0),7)),mt(At,.12,zt,C.rot,.7,.8,.7))}for(let At=0;At<6;At++){let[zt,,K]=M(C,nt-q*.45+(At+.5)*(q*.9/6),0,.65);r.trim.add(zt,2.95,K,C.rot,q*.15,.06,1.3,At%2?15920610:v,new Xt().makeRotationX(.32))}}for(let Q of S){let nt=-C.L/2+q*(Q+.5),ut=(o-1)*fn,xt=1+fn,At=q*1.3,zt=s()<.4,K=zt?At:At*.5,at=zt?.9:1.3,[ht,,Rt]=M(C,nt,0,0),ft=mt(ht,0,Rt,C.rot);r.wall.add(Zd(At,K,at,ut),new Bt(d).multiplyScalar(1.04).getHex(),ft.clone().multiply(mt(0,xt,0)));for(let Zt=0;Zt<o;Zt++)r.trimB.add(Zd(At+.3,K+.2,at+.12,.18),m,ft.clone().multiply(mt(0,xt+Zt*fn-.09,0)));let Dt=Math.atan2(at,(At-K)/2),Nt=(At+K)/4;for(let Zt=1;Zt<o;Zt++){let ne=1+Zt*fn+1.6;if(U(C,nt,ne,Zt,C.rot,at+.02),!zt)for(let oe of[-1,1]){let X={...C,x:C.x+C.tx*(oe*Nt)+C.nx*0,z:C.z+C.tz*(oe*Nt)};U(X,nt,ne,Zt,C.rot+oe*Dt,at/2+.03,Math.min(1.05,Math.hypot((At-K)/2,at)-.6))}}r.roof.add(ny(At,K,at),7305858,ft.clone().multiply(mt(0,xt+ut+.05,0)))}}let P=l>=c,N=P?l:c,k=P?c:l,I=P?0:Math.PI/2,G=t.roof==="mansard"&&(N<7||k<7)?"gable":t.roof;if(G==="flat"){r.trimB.add(new Ct(l-.2,.25,c-.2),[4999750,4606544,5589311][e%3],mt(h,a+.3,u));for(let C=0;C<Math.max(1,Math.floor(l*c/120));C++){let O=h+(s()-.5)*(l-3),q=u+(s()-.5)*(c-3);s()<.5?r.trimB.add(new Ct(1.2,.7,1.2),10130828,mt(O,a+.75,q)):r.glass.add(O,a+.5,q,0,1.6,.2,1.1,6123910)}r.wall.add(new Ct(.9,2.2,.9),11033672,mt(h+(s()-.5)*(l-2),a+1.4,u+(s()-.5)*(c-2)));return}let B=Math.min(k*.42,5.2),F=[16777215,15784144,15261912,10133672][t.roofIndex%4],L=G==="gable"?Mi(N,k,B,.45):Gd(N,k,B,.4);r.roof.add(L,F,mt(h,a+.45,u,I)),G==="gable"&&r.trimB.add(new Ct(N+1,.18,.4),10112570,mt(h,a+.45+B,u,I));let b=N>6?Math.max(1,Math.floor(N/5)):0;for(let C=0;C<b;C++){let O=-N/2+N/b*(C+.5),q=k/2-1.6,[J,V]=P?[h+O,u+q]:[h+(t.seed<.5?q:-q),u+O],tt=P?0:t.seed<.5?Math.PI/2:-Math.PI/2;r.wall.add(new Ct(1.5,1.6,1.4),d,mt(J,a+.45+1.1,V,tt)),r.roof.add(Mi(1.5,1.4,.8,.15),F,mt(J,a+.45+1.9,V,tt+Math.PI/2));let ct=Math.sin(tt),lt=Math.cos(tt);r.glass.add(J+ct*.72,a+.45+1.1,V+lt*.72,tt,.9,.9,.08,7309215)}for(let C of[-.3,.28]){let[O,q]=P?[h+N*C,u-.6]:[h-.6,u+N*C];r.wall.add(new Ct(.9,2.8,.9),11033672,mt(O,a+.45+B*.65,q)),r.trimB.add(new Ct(1.05,.15,1.05),6961710,mt(O,a+.45+B*.65+1.45,q))}}function Zd(i,t,e,n){let s=new xn;s.moveTo(-i/2,0),s.lineTo(-t/2,-e),s.lineTo(t/2,-e),s.lineTo(i/2,0),s.lineTo(-i/2,0);let r=new mi(s,{depth:n,bevelEnabled:!1,curveSegments:1});return r.rotateX(-Math.PI/2),r}function ny(i,t,e){let r=[[-i/2-.18,0,0],[-t/2-.09,0,e+.18],[t/2+.09,0,e+.18],[i/2+.18,0,0],[-t*.3,.85,0],[t*.3,.85,0]],o=[0,1,4,1,2,5,1,5,4,2,3,5],a=new pe;return a.setAttribute("position",new qt(o.flatMap(l=>r[l]),3)),a.computeVertexNormals(),a}function Ls(i,t,e){let n=t.attributes.position.array,s=t.attributes.normal.array,r=t.attributes.color.array,o=e.elements;for(let a=0;a<n.length;a+=3){let l=n[a],c=n[a+1],h=n[a+2];i.pos.push(o[0]*l+o[4]*c+o[8]*h+o[12],o[1]*l+o[5]*c+o[9]*h+o[13],o[2]*l+o[6]*c+o[10]*h+o[14]);let u=s[a],d=s[a+1],f=s[a+2],m=o[0]*u+o[4]*d+o[8]*f,y=o[1]*u+o[5]*d+o[9]*f,p=o[2]*u+o[6]*d+o[10]*f,g=Math.hypot(m,y,p)||1;i.nor.push(m/g,y/g,p/g),i.col.push(r[a],r[a+1],r[a+2])}}var Zc={};function Ds(i,t){if(!Zc[i]){let e=new Ee;t(e),Zc[i]=e.build({outline:!1})}return Zc[i]}function Si(i,t,e,n,s,r){let{cells:o,width:a}=i,l=s-e,c=new Uint8Array(l*(r-n)),h=[];for(let u=n;u<r;u++)for(let d=e;d<s;d++){if(c[(u-n)*l+(d-e)]||o[u*a+d]!==t)continue;let f=d;for(;f+1<s&&!c[(u-n)*l+(f+1-e)]&&o[u*a+f+1]===t;)f++;let m=u;t:for(;m+1<r;){for(let y=d;y<=f;y++)if(c[(m+1-n)*l+(y-e)]||o[(m+1)*a+y]!==t)break t;m++}for(let y=u;y<=m;y++)c.fill(1,(y-n)*l+(d-e),(y-n)*l+(f-e)+1);h.push([d,u,f+1,m+1])}return h}function bi(i,t,e,n,s=-1.2){let[r,o,a,l]=t;i.add(new Ct(a-r,e-s,l-o),n,mt((r+a)/2,(e+s)/2,(o+l)/2))}function iy(i,t){if(!i.pos.length&&!t.pos.length)return null;let e=new pe,n=s=>{let r=new Float32Array(i[s].length+t[s].length);return r.set(i[s],0),r.set(t[s],i[s].length),r};return e.setAttribute("position",new de(n("pos"),3)),e.setAttribute("normal",new de(n("nor"),3)),e.setAttribute("color",new de(n("col"),3)),e.computeBoundingSphere(),e}function Za(i,t,e,n,s,r,o,a,l){let c=Math.hypot(n-t,s-e);c<.05||i.add(new Ct(c,a,o),l,mt((t+n)/2,r,(e+s)/2,-Math.atan2(s-e,n-t)))}var sy=[12603466,4880064,4168298,14070076,3092275];function ry(){let i=new pe,t=[-.5,-.5,.5,.5,-.5,.5,.5,.5,.5,-.5,.5,.5,-.5,.5,.5,.5,.5,.5,.5,.5,-.5,-.5,.5,-.5],e=[0,0,1,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,1,0];return i.setAttribute("position",new qt(t,3)),i.setAttribute("normal",new qt(e,3)),i.setIndex([0,1,2,0,2,3,4,5,6,4,6,7]),i.computeBoundingSphere(),i}function Jd(i,t){let e=i.G,n=(S,P)=>i.cellAt(S,P),s=S=>S===e.road||S===e.sidewalk||S===e.bike,r=new Ae,o=ry(),a=new Map,l=(S,P)=>{let N=Q_(S,P),k=a.get(N);return k||a.set(N,k={parts:[],lamps:[],props:[],trees:[],paint:[],rails:[],strips:[],signs:[]}),k};i.buildings.forEach((S,P)=>!S.landmark&&l(S.x+S.w/2,S.y+S.h/2).parts.push([S,P]));for(let S of i.lamps)l(S.x,S.y).lamps.push(S);for(let S of i.props)l(S.x,S.y).props.push(S);let c=$d(91);for(let S of i.trees){let P=c(),N=S.canopy/2.7*(.9+c()*.2);l(S.x,S.y).trees.push({pick:P,m:mt(S.x,.1,S.y,c()*Math.PI*2,N,N*(.92+c()*.16),N)})}let h=i.roads.filter(S=>!S.foot&&S.kind!=="service"),u=new Map;for(let S of h)for(let[P,N]of[[0,1],[S.pts.length-1,S.pts.length-2]]){let k=`${Math.round(S.pts[P][0])},${Math.round(S.pts[P][1])}`;u.has(k)||u.set(k,[]),u.get(k).push({r:S,p:S.pts[P],q:S.pts[N]})}for(let S of h){if(S.w<9||S.bridge)continue;let P=0;for(let N=0;N+1<S.pts.length;N++){let[k,I]=S.pts[N],[G,B]=S.pts[N+1],F=Math.hypot(G-k,B-I);for(let L=P;L<F;L+=6){let b=Math.min(F,L+3);L>9&&b<F-9&&l(k,I).paint.push([k+(G-k)*L/F,I+(B-I)*L/F,k+(G-k)*b/F,I+(B-I)*b/F,.16])}P=0}}for(let S of u.values())if(!(S.length<3)){{let{r:P,p:N,q:k}=S[0],I=Math.hypot(k[0]-N[0],k[1]-N[1])||1,G=(k[0]-N[0])/I,B=(k[1]-N[1])/I,F=P.w/2+1;l(N[0],N[1]).signs.push([N[0]+G*(P.w/2+3)-B*F,N[1]+B*(P.w/2+3)+G*F,1])}for(let{r:P,p:N,q:k}of S){let I=Math.hypot(k[0]-N[0],k[1]-N[1]);if(I<14||P.w<7)continue;let G=(k[0]-N[0])/I,B=(k[1]-N[1])/I,F=P.w/2+4.5;for(let L=-P.w/2+.7;L<P.w/2-.5;L+=1.1){let b=N[0]+G*F-B*L,C=N[1]+B*F+G*L;l(b,C).paint.push([b-G*1.4,C-B*1.4,b+G*1.4,C+B*1.4,.55])}}}i.spawns.cars.forEach((S,P)=>{if(P<2||P%6)return;let N=-Math.sin(S.heading),k=Math.cos(S.heading);for(let I of[1,-1]){let G=S.x+N*I*2.9,B=S.y+k*I*2.9;if(n(G,B)===e.sidewalk){l(G,B).signs.push([G,B,0]);break}}});for(let S of i.roads)for(let P=0;P+1<S.pts.length;P++){let[N,k]=S.pts[P],[I,G]=S.pts[P+1],B=Math.hypot(I-N,G-k);if(B<.2)continue;let F=(I-N)/B,L=(G-k)/B,b=-L,C=F,O=l((N+I)/2,(k+G)/2).strips,q=S.foot?S.w/2:S.w/2+1,J=(tt,ct,lt,Q,nt,ut=q)=>O.push([N-F*ut+b*tt,k-L*ut+C*tt,I+F*ut+b*tt,G+L*ut+C*tt,ct,lt,Q,nt]);if(S.foot){S.kind==="cycleway"?J(0,S.w,.128,13660252,"asphalt"):J(0,S.w,.126,S.kind==="pedestrian"?16777215:15259312,"slabs");continue}let V=S.kind==="service"?1.2:3;if(J(0,S.w+V*2+1,.124,16777215,"slabs",q+V),J(0,S.w,.13,16777215,"asphalt"),S.bike)for(let tt of[-1,1])J(tt*(S.w/2-.85),1.7,.133,13660252,"asphalt",q-1);for(let tt of[-1,1])J(tt*(S.w/2+.12),.24,.15,11841704,"trimB",0)}for(let S of i.bridges)for(let P=0;P+1<S.pts.length;P++){let[N,k]=S.pts[P],[I,G]=S.pts[P+1],B=Math.hypot(I-N,G-k);if(B<1)continue;let F=-(G-k)/B,L=(I-N)/B;for(let b of[-1,1])l(N,k).rails.push([N+F*b*(S.w/2-.2),k+L*b*(S.w/2-.2),I+F*b*(S.w/2-.2),G+L*b*(S.w/2-.2)])}let d=(S,P)=>[-.3,0,.3].map(N=>n(S.x+S.tx*S.L*N+S.nx*P,S.z+S.tz*S.L*N+S.nz*P)),f={blocked:S=>d(S,1.5).filter(P=>P===e.building).length>=2,street:S=>d(S,5).some(s)};function*m(S){let[P,N]=S.split(",").map(Number),k=P*Ke,I=N*Ke,G=Math.min(i.width,k+Ke),B=Math.min(i.height,I+Ke),F=j_(),L=a.get(S)||{parts:[],lamps:[],props:[],trees:[],paint:[],rails:[],strips:[],signs:[]};if(k<i.width&&I<i.height){for(let b of Si(i,e.road,k,I,G,B))bi(F.asphalt,b,.12,16777215);for(let b of Si(i,e.bike,k,I,G,B))bi(F.asphalt,b,.12,13660252);for(let b of Si(i,e.sidewalk,k,I,G,B))bi(F.slabs,b,.12,16777215);for(let b of Si(i,e.slab,k,I,G,B))bi(F.slabs,b,.12,15525594);for(let b of Si(i,e.path,k,I,G,B))bi(F.slabs,b,.11,15259312);for(let b of Si(i,e.deck,k,I,G,B))bi(F.slabs,b,.12,14275786,-.9);for(let b of Si(i,e.building,k,I,G,B))bi(F.slabs,b,.13,6971992);for(let b of Si(i,e.grass,k,I,G,B))bi(F.grass,b,.1,16777215);yield,y(F,k,I,G,B),yield}for(let[b,C,O,q,J,V,tt,ct]of L.strips)Za(F[ct],b,C,O,q,V-.02,J,.04,tt);for(let[b,C,O,q,J]of L.paint)Za(F.slabs,b,C,O,q,.138,J,.02,16777215);for(let[b,C,O,q]of L.rails){Za(F.trimB,b,C,O,q,-.4,.5,1.1,9077368);let J=Math.hypot(O-b,q-C);qa(F.props,mt(b,.12,C,-Math.atan2(q-C,O-b)),J)}for(let[b,C]of L.parts){let O=b.house,q=O.parts===1;ey(F,{x:b.x,y:b.y,w:b.w,h:b.h,height:b.height,roof:q?O.roof:Math.min(b.w,b.h)>=9?"gable":"flat",facadeIndex:O.facade,roofIndex:O.facade%3,seed:O.seed+C%7*.013,shop:O.shop},C,f),yield}for(let[b,C,O]of L.signs)Gc(F.props,mt(b,.12,C),2.7),F.signs.push([b,C,O]);for(let b of L.lamps){let C=Math.atan2(b.ax||0,b.ay||1),O=mt(b.x,.12,b.y,C);Ls(F.props,Ds("lamp",q=>kc(q,mt(0,0,0),1)),O),F.lanterns.push(O.clone().multiply(mt(0,4.64,1.12)))}for(let b of L.props)if(b.kind==="bench")Ls(F.props,Ds("bench",C=>Vc(C,mt(0,0,0))),mt(b.x,.12,b.y,-(b.rot||0)));else if(b.kind==="bin")Ls(F.props,Ds("bin",C=>Xc(C,mt(0,0,0))),mt(b.x,.12,b.y));else if(b.kind==="rack"){let C=b.n||4;Ls(F.props,Ds(`rack${C}`,O=>Bc(O,mt(0,0,0),C)),mt(b.x-C*.8/2,.12,b.y));for(let O=0;O<C;O++)(O*7+Math.round(b.x))%4!==0&&Ls(F.props,Ds(`bike${O%5}`,q=>Nr(q,mt(0,0,0,Math.PI/2),sy[O%5])),mt(b.x-C*.8/2+O*.8,.12,b.y))}yield,w(S,F,L)}function y(S,P,N,k,I){let G=i.width,B=(F,L,b,C,O,q)=>{let J=-1;for(let V=b;V<=C;V++){let tt=V<C&&F(V);if(tt&&J<0&&(J=V),!tt&&J>=0){if(V-J>=3){let[ct,lt,Q,nt]=O?[J,L+.45*q+.5,V,L+.45*q+.5]:[L+.45*q+.5,J,L+.45*q+.5,V];Za(S.hedge,ct,lt,Q,nt,.55,.75,.9,10139768);let ut=V-J;for(let xt=.5;xt<ut;xt+=1.3){let At=O?J+xt:ct,zt=O?lt:J+xt;S.hedge.add(new On(.55,1),11061380,mt(At,.92,zt))}(J+L)%3===0&&qa(S.props,mt(O?J:ct-q*.6,.12,O?lt-q*.6:J,O?0:-Math.PI/2),ut)}J=-1}}};for(let F=N;F<I;F++)for(let L of[-1,1])F+L<0||F+L>=i.height||B(b=>i.cells[F*G+b]===e.grass&&[e.sidewalk,e.slab].includes(i.cells[(F+L)*G+b]),F,P,k,!0,L<0?-1:1);for(let F=P;F<k;F++)for(let L of[-1,1])F+L<0||F+L>=G||B(b=>i.cells[b*G+F]===e.grass&&[e.sidewalk,e.slab].includes(i.cells[b*G+F+L]),F,N,I,!1,L<0?-1:1)}let p=new Map,g=new Map,_=S=>S.pos.length?S.build({outline:!1}):null;function w(S,P,N){let k=[],I=(B,F,L=!0,b=!0)=>{if(!B)return;let C=B.isInstancedMesh?B:new re(B,F);C.castShadow=L,C.receiveShadow=b,r.add(C),k.push(C)};if(I(_(P.asphalt),t.asphalt,!1),I(_(P.slabs),t.slabs,!1),I(_(P.grass),t.grass,!1),I(_(P.hedge),t.hedge),I(_(P.wall),t.wall),I(_(P.roof),t.roof),I(iy(P.trimB,P.props),t.plain,!1),I(P.trim.mesh(t.trimI,o),null,!1),I(P.glass.mesh(t.glassI,o),null,!1),P.signs.length){let B=[],F=[];for(let[b,C,O]of P.signs){let q=O===1?1.6:.7,J=O===1?.4:.7,V=2.7+J/2,tt=[[-q/2,-J/2,0,0],[q/2,-J/2,1,0],[q/2,J/2,1,1],[-q/2,-J/2,0,0],[q/2,J/2,1,1],[-q/2,J/2,0,1]];for(let[ct,lt,Q,nt]of tt)B.push(b+ct,V+lt,C+.06),F.push((O+Q)/4,nt)}let L=new pe;L.setAttribute("position",new qt(B,3)),L.setAttribute("uv",new qt(F,2)),L.computeVertexNormals(),L.computeBoundingSphere(),I(L,A,!1,!1)}if(P.lanterns.length){let B=new cn(v,t.lantern,P.lanterns.length);P.lanterns.forEach((F,L)=>B.setMatrixAt(L,F)),B.computeBoundingSphere(),I(B,null,!1,!1)}let G={meshes:k,trees:[],plan:N};p.set(S,G),R(G)}let v=zc(),A=new Me({map:Hc(),roughness:.5,side:Ge});function R(S){for(let k of S.trees)r.remove(k);S.trees=[];let P=qd(),N=new Map;for(let k of S.plan.trees){let I=Math.min(P.length-1,Math.floor(k.pick*P.length));N.has(I)||N.set(I,[]),N.get(I).push(k.m)}for(let[k,I]of N)for(let[G,B]of P[k].parts(t)){let F=new cn(G,B,I.length);I.forEach((L,b)=>F.setMatrixAt(b,L)),F.computeBoundingSphere(),F.castShadow=!0,F.receiveShadow=!0,r.add(F),S.trees.push(F)}}function x(S){let P=p.get(S);if(P){for(let N of[...P.meshes,...P.trees])r.remove(N),N.geometry!==o&&N.geometry!==v&&!P.trees.includes(N)&&N.geometry.dispose(),N.isInstancedMesh&&N.dispose();p.delete(S)}}let M=190;function U(S,P,N=4){let k=performance.now(),I=[],G=Math.ceil(M/Ke),B=Math.floor(S/Ke),F=Math.floor(P/Ke);for(let L=B-G;L<=B+G;L++)for(let b=F-G;b<=F+G;b++){if(L<-1||b<-1||L*Ke>i.width||b*Ke>i.height)continue;let C=Math.hypot((L+.5)*Ke-S,(b+.5)*Ke-P);C<M&&I.push([C,`${L},${b}`])}I.sort((L,b)=>L[0]-b[0]);for(let[,L]of I){if(p.has(L))continue;let b=g.get(L);for(b||g.set(L,b=m(L));performance.now()-k<N;)if(b.next().done){g.delete(L);break}if(performance.now()-k>=N)break}for(let L of[...p.keys()]){let[b,C]=L.split(",").map(Number);Math.hypot((b+.5)*Ke-S,(C+.5)*Ke-P)>M+Ke*1.5&&x(L)}}return{group:r,update:U,get pieces(){return p.size},rebuildTrees(){for(let S of p.values())R(S)}}}var Ur=10766902,Kd=9322288,Ei=3962212,$c=13222066,Qd=12610130,Fr=15920354;function oy(i){let t=i.length,e=i.reduce((p,g)=>p+g[0],0)/t,n=i.reduce((p,g)=>p+g[1],0)/t,s=0,r=0,o=0;for(let[p,g]of i)s+=(p-e)**2,r+=(g-n)**2,o+=(p-e)*(g-n);let a=.5*Math.atan2(2*o,s-r),l=Math.cos(a),c=Math.sin(a),h=1/0,u=-1/0,d=1/0,f=-1/0;for(let[p,g]of i){let _=(p-e)*l+(g-n)*c,w=-(p-e)*c+(g-n)*l;h=Math.min(h,_),u=Math.max(u,_),d=Math.min(d,w),f=Math.max(f,w)}let m=(h+u)/2,y=(d+f)/2;return{x:e+l*m-c*y,z:n+c*m+l*y,angle:a,L:u-h,W:f-d}}function jd(i,t){let e=new Ae,n=new Ee,s=new Ee,r=new Ee,o=[Math.cos(i.north+Math.PI/2),Math.sin(i.north+Math.PI/2)];for(let c of i.houses){if(!c.landmark||!c.outline)continue;let h=oy(c.outline),u=mt(h.x,0,h.z,-h.angle),d=Math.cos(h.angle)*o[0]+Math.sin(h.angle)*o[1]<0?-1:1,f=(m,y,p,g=0)=>u.clone().multiply(mt(m*d,y,p,g));c.landmark==="domkyrkan"&&ay(n,s,r,f,h,d),c.landmark==="slottet"&&ly(n,s,r,f,h,d)}let a=i.places.gunillaklockan;a&&cy(n,s,r,(c,h,u,d=0)=>mt(a[0]+c,h,a[1]+u,d));let l=(c,h)=>{if(!c.pos.length)return;let u=new re(c.build({outline:!1}),h);u.castShadow=!0,u.receiveShadow=!0,e.add(u)};return l(n,t.wall),l(s,t.plain),l(r,t.plain),e}function ay(i,t,e,n,s){let r=Math.max(60,s.L),o=Math.min(Math.max(18,s.W*.75),26),a=22,l=-r/2;i.add(new Ct(r-16,a,o),Ur,n(8,a/2,0)),t.add(Mi(r-16,o,14,.5),Ei,n(8,a,0)),i.add(new Ct(14,a,o+18),Ur,n(4,a/2,0)),t.add(Mi(o+18,14,12,.5),Ei,n(4,a,0,Math.PI/2)),i.add(new he(o/2,o/2,a,10,1,!1,0,Math.PI),Ur,n(r/2-8,a/2,0,-Math.PI/2)),t.add(new hn(o/2+.5,12,10,1,!1,0,Math.PI),Ei,n(r/2-8,a+6,0,-Math.PI/2));for(let h=l+22;h<r/2-10;h+=6)for(let u of[-1,1])Math.abs(h-4)<9||(e.add(new Ct(1.4,a*.8,1.6),Kd,n(h,a*.4,u*(o/2+.8))),e.add(new Ct(2.2,8,.3),4016732,n(h+3,a*.55,u*(o/2+.05))),e.add(new hn(1.1,2.2,4),4016732,n(h+3,a*.55+5,u*(o/2+.05)).multiply(new Xt().makeScale(1,1,.15))));let c=11;for(let h of[-1,1]){let u=h*(o/2-c/2+2);i.add(new Ct(c,46,c),Ur,n(l+c/2,23,u));for(let d of[16,30,42])e.add(new Ct(c+.6,.6,c+.6),Kd,n(l+c/2,d,u));for(let d of[20,34])e.add(new Ct(.3,5,2),2764600,n(l-.05,d,u));t.add(new he(c*.42,c*.5,4,8),Ei,n(l+c/2,48,u)),t.add(new hn(c*.42,30,8),Ei,n(l+c/2,65,u)),e.add(new nn(.7,8,6),13937224,n(l+c/2,80.5,u))}i.add(new Ct(c,30,o-2*c+4),Ur,n(l+c/2,15,0)),e.add(new he(3.2,3.2,.4,16),4016732,n(l-.1,22,0).multiply(new Xt().makeRotationZ(Math.PI/2))),e.add(new Ct(.6,9,5),4861474,n(l-.2,4.5,0)),e.add(new hn(2.6,3,4),$c,n(l-.3,10.5,0).multiply(new Xt().makeScale(.2,1,1)))}function ly(i,t,e,n,s){let r=Math.max(70,s.L*.95),o=Math.min(Math.max(14,s.W*.45),22),a=17;e.add(new Ct(r+16,1.6,o+16),$c,n(0,.8,0)),i.add(new Ct(r,a,o),Qd,n(0,a/2+1.6,0)),t.add(Mi(r,o,7,.6),4080198,n(0,a+1.6,0));for(let l of[6,11.5])e.add(new Ct(r+.3,.35,o+.3),Fr,n(0,l+1.6,0));e.add(new Ct(r+.8,.6,o+.8),Fr,n(0,a+1.6,0));for(let l=-r/2+3;l<r/2-2;l+=3.4)for(let c of[-1,1])for(let h of[4,9.5,14])e.add(new Ct(1.3,2.1,.2),3819094,n(l,h+1.6,c*(o/2+.05)));for(let[l,c,h]of[[-1,9,30],[1,7,26]]){let u=l*(r/2);i.add(new he(c,c+.6,h,16),Qd,n(u,h/2+1.6,o/2-c*.4)),e.add(new he(c+.4,c+.4,.6,16),Fr,n(u,h+1.6,o/2-c*.4)),t.add(new nn(c,16,8,0,Math.PI*2,0,Math.PI/2),4080198,n(u,h+1.6,o/2-c*.4)),t.add(new he(1.2,1.4,3,8),4080198,n(u,h+c+2.8,o/2-c*.4)),t.add(new hn(1.4,3,8),4080198,n(u,h+c+5.6,o/2-c*.4));for(let d=0;d<8;d++){let f=d/8*Math.PI*2;for(let m of[8,14,20])e.add(new Ct(1.2,2,.3),3819094,n(u+Math.cos(f)*(c+.05),m+1.6,o/2-c*.4+Math.sin(f)*(c+.05),-f+Math.PI/2))}}e.add(new Ct(4,6,.6),Fr,n(0,4.6,o/2+.2)),e.add(new Ct(2.6,4.4,.7),3877408,n(0,3.8,o/2+.25))}function cy(i,t,e,n){i.add(new Ct(5,9,5),15179914,n(0,4.5,0)),e.add(new Ct(5.6,.5,5.6),Fr,n(0,9,0));for(let s of[0,Math.PI/2])e.add(new Ct(1.6,2.4,5.1),2763310,n(0,7,0,s));t.add(new he(1.2,3.4,3.4,8),Ei,n(0,10.9,0)),t.add(new nn(1.3,8,6),Ei,n(0,13,0)),t.add(new hn(.5,2.4,8),Ei,n(0,15,0)),e.add(new nn(.3,6,4),13937224,n(0,16.3,0)),e.add(new Ct(6.4,.6,6.4),$c,n(0,.3,0))}function tf(i){let t=new Ae,e=i.places,n=(o,a,l,c)=>{let h=document.createElement("canvas");h.width=512,h.height=128;let u=h.getContext("2d");u.fillStyle=a,u.fillRect(0,0,512,128),u.strokeStyle=l,u.lineWidth=8,u.strokeRect(6,6,500,116),u.fillStyle=l,u.font="bold 54px system-ui, sans-serif",u.textAlign="center",u.textBaseline="middle",u.fillText(o,c?290:256,66),c&&c(u);let d=new Tn(h);return d.colorSpace=be,d},s=o=>{o.fillStyle="#ffffff",o.beginPath(),o.moveTo(64,96),o.bezierCurveTo(20,66,26,26,64,44),o.bezierCurveTo(102,26,108,66,64,96),o.fill()},r=(o,a,l,c=6)=>{let h=new re(new De(c,c/4),new Me({map:l,roughness:.6,emissive:16777215,emissiveMap:l,emissiveIntensity:.25}));h.position.set(o,4.2,a),t.add(h);for(let u of[-1,1]){let d=new re(new he(.08,.08,4.2,6),new Me({color:3817028}));d.position.set(o+u*(c/2-.3),2.1,a-.05),t.add(d)}};for(let o of e.vardcentraler)r(o[0],o[1],n("V\xC5RDCENTRAL","#2f8a5a","#ffffff",s));return r(e.polis[0],e.polis[1],n("POLIS","#1f4fae","#ffffff")),r(e.kiosk[0],e.kiosk[1],n("MACKBAREN","#f0a43a","#2a1a10")),r(e.nation[0],e.nation[1],n("PUNSCHBERGS NATION","#d96aa0","#ffffff"),8),t}var o1={height:64,viewShort:30,tiltViewShort:34,center:new H(30,0,-1.5),tiltCenter:new H(30,0,-3.5),tiltDistance:80};var Jc={hatch:{L:4.1,body:[[-2.05,.28],[2.05,.28],[2.05,.66],[1.92,.86],[.85,.98],[-1.95,.98],[-2.05,.82]],cabin:[[.8,.95],[.05,1.45],[-1.6,1.45],[-1.98,.95]],roof:[-1.55,0]},sedan:{L:4.6,body:[[-2.3,.3],[2.3,.3],[2.3,.66],[2.15,.84],[1,.96],[-2.15,.96],[-2.3,.8]],cabin:[[.95,.93],[.15,1.42],[-1.25,1.42],[-1.85,.93]],roof:[-1.2,.1]},sport:{L:4.5,body:[[-2.25,.26],[2.25,.26],[2.25,.56],[2.1,.7],[.9,.8],[-2.15,.84],[-2.25,.7]],cabin:[[.7,.78],[-.1,1.18],[-1.2,1.18],[-1.9,.82]],roof:[-1.05,-.2],roofY:1.2},estate:{L:4.8,body:[[-2.4,.3],[2.4,.3],[2.4,.66],[2.25,.86],[1.05,.98],[-2.35,.98],[-2.4,.82]],cabin:[[1,.95],[.2,1.48],[-2.15,1.48],[-2.3,.95]],roof:[-2.05,.15]}},Or=1.8;function ef(i,t,e){let n=new xn;i.forEach(([r,o],a)=>a?n.lineTo(r,o):n.moveTo(r,o)),n.closePath();let s=new mi(n,{depth:t,bevelEnabled:!0,bevelThickness:e,bevelSize:e,bevelSegments:3,curveSegments:2});return s.translate(0,0,-t/2),s}function hy(i,t,e,n,s){let r=new xn,o=.25,a=e/2;r.moveTo(i+o,-a),r.lineTo(t-o,-a),r.quadraticCurveTo(t,-a,t,-a+o),r.lineTo(t,a-o),r.quadraticCurveTo(t,a,t-o,a),r.lineTo(i+o,a),r.quadraticCurveTo(i,a,i,a-o),r.lineTo(i,-a+o),r.quadraticCurveTo(i,-a,i+o,-a);let l=new mi(r,{depth:s,bevelEnabled:!0,bevelThickness:.05,bevelSize:.1,bevelSegments:2,curveSegments:3});return l.rotateX(Math.PI/2),l.translate(0,n+s,0),l}function Kc(i){let t=Jc[i],e=new Ee;e.add(ef(t.body,Or-.5,.25),16777215),e.add(hy(t.roof[0],t.roof[1],Or-.36,t.roofY??1.5,.07),16777215);let n=new Ee;n.add(ef(t.cabin,Or-.5,.08),16777215);let s=new Ee;for(let r of[-1,1])for(let o of[-1,1])s.add(new he(.33,.33,.25,10),1776415,mt(r*(t.L/2-.75),.33,o*(Or/2-.12)).multiply(new Xt().makeRotationX(Math.PI/2)));for(let r of[-1,1])s.add(new Ct(.3,.16,.42),16774352,mt(t.L/2-.05,.86,r*.55)),s.add(new Ct(.22,.16,.4),13642270,mt(-t.L/2+.02,.9,r*.56)),s.add(new Ct(.22,.1,.12),2236966,mt(.75,1.05,r*(Or/2+.02)));if(i==="estate")for(let r of[-1,1])s.add(new Ct(2,.06,.06),2763310,mt(-1.05,1.62,r*.62));return i==="hatch"&&s.add(new Ct(.7,.04,.7),2897990,mt(-.75,1.6,0)),{paint:e.build({outline:!1}),glass:n.build({outline:!1}),det:s.build({outline:!1})}}var uy={jacket:15770682,pants:3093568,skin:0,hair:1,scale:1.1},Qc=new Map,nf={player(i){let t=Qc.get("player");if(t)return t.map(n=>dy(n,i));let e=[];for(let n of[0,.9,0,-.9,0]){let s=new Ee;Oc(s,mt(0,0,0),{...uy,walk:n}),e.push(new re(s.build({outline:!1}),i.solid))}return e}};function dy(i,t){let e=new Ae;for(let n of i){let s=new re(n.geo,t[n.mat]||t.solid);s.castShadow=!0,e.add(s)}return e}async function sf(i){let t=await fetch(i);if(!t.ok)return null;let e=await t.arrayBuffer(),n=new DataView(e).getUint32(0,!0),s=JSON.parse(new TextDecoder().decode(new Uint8Array(e,4,n))),r=4+n+3&-4,o=(l,c)=>{let h=new l(e,r,c);return r+=h.byteLength,r=r+3&-4,h},a={};for(let[l,c]of Object.entries(s.models))a[l]=c.map(h=>{let u=new pe;return u.setAttribute("position",new de(o(Float32Array,h.n*3),3)),u.setAttribute("normal",new de(o(Int8Array,h.n*4),4,!0)),u.setAttribute("color",new de(o(Uint8Array,h.n*4),4,!0)),h.uv&&u.setAttribute("uv",new de(o(Float32Array,h.n*2),2)),u.setIndex(new de(o(h.wide?Uint32Array:Uint16Array,h.index),1)),u.computeBoundingSphere(),{geo:u,mat:h.mat}});return a}function Ja(i,t){Qc.set(i,t)}function rf(i){return Qc.get(i)}var of={small:["hatch"],car:["sedan","estate","sedan"],sport:["sport"]};function af(i,t){let e=new Ae,n={},s=new Me({vertexColors:!0,roughness:.34,metalness:.35,envMapIntensity:1.4}),r=B=>{let F=B.reduce((V,[tt])=>V+(tt.index?tt.index.count:tt.attributes.position.count),0),L=new Float32Array(F*3),b=new Float32Array(F*3),C=new Float32Array(F*3),O=0,q=new Bt;for(let[V,tt]of B){let ct=V.index?V.toNonIndexed():V,lt=ct.attributes.position,Q=ct.attributes.normal,nt=ct.attributes.color;tt!=null&&q.set(tt);for(let ut=0;ut<lt.count;ut++,O++){L.set([lt.getX(ut),lt.getY(ut),lt.getZ(ut)],O*3);let xt=Q.getX(ut),At=Q.getY(ut),zt=Q.getZ(ut),K=Math.hypot(xt,At,zt)||1;b.set([xt/K,At/K,zt/K],O*3),tt!=null?C.set([q.r,q.g,q.b],O*3):C.set([nt.getX(ut),nt.getY(ut),nt.getZ(ut)],O*3)}}let J=new pe;return J.setAttribute("position",new de(L,3)),J.setAttribute("normal",new de(b,3)),J.setAttribute("color",new de(C,3)),J.computeBoundingSphere(),J},o=new Map,a=(B,F)=>o.get(B)||o.set(B,F()).get(B),l=new Map,c=B=>{let F=l.get(B);if(!F){let L=new Ee;Nr(L,mt(0,0,0),B),l.set(B,F=L.build({outline:!1}))}return F},h=new Map,u=new De(1,1).rotateX(-Math.PI/2).translate(0,.02,0),d=new He({map:Lc(),transparent:!0,depthWrite:!1,opacity:.8}),f=[],m=B=>{if(B.police){let C=n.sedan||(n.sedan=Kc("sedan")),O=(ct,lt,Q,nt,ut,xt,At)=>[new Ct(ct,lt,Q).translate(nt,ut,xt),At],q=a("police",()=>r([[C.paint,16053490],[C.glass,1910323],[C.det,null],O(4,.22,1.86,0,.62,0,2052014),O(.5,.06,1.2,-.3,1.6,0,2763310)])),J=new re(q,s);J.castShadow=!0;let V=new Ae;V.add(J);let tt=[2780159,16724016].map((ct,lt)=>{let Q=new re(new Ct(.35,.16,.5),new He({color:ct}));return Q.position.set(-.3,1.7,lt?.32:-.32),V.add(Q),Q});return f.push([B,tt]),V}if(B.spec.class==="car"){let C=of[B.type]||of.car,O=C[Math.abs(fy(B.id))%C.length],q=n[O]||(n[O]=Kc(O)),J=a(`${O}:${B.color}`,()=>r([[q.paint,B.color],[q.glass,1910323],[q.det,null]])),V=new re(J,s);return V.scale.set(B.spec.length/Jc[O].L,1,B.spec.width/1.8*.98),V.castShadow=!0,V.receiveShadow=!0,V}let F=new re(c(B.color),t.solid);F.scale.setScalar(1.2),F.castShadow=!0;let L=new Ae;L.add(F);let b=new re(u,d);return b.scale.set(2.4,1,.9),L.add(b),L};for(let B of i.vehicles){let F=new Ae;F.add(m(B)),e.add(F),h.set(B,F)}let y=new Ae,p=[],g=()=>{for(let B of p)y.remove(B);p=nf.player(t);for(let B of p)B.visible=!1,B.castShadow=!0,y.add(B)};g(),e.add(y),y.scale.setScalar(1.25);let _=new re(new De(2.6,2.6).rotateX(-Math.PI/2),new He({map:Dc(),color:16756800,transparent:!0,depthWrite:!1,opacity:1})),w=new re(new hn(.45,.8,4).rotateX(Math.PI),new He({color:16752672,depthTest:!1,transparent:!0,opacity:.95}));w.renderOrder=10,e.add(w);let v=new xn([[0,1.2],[.75,0],[.28,.1],[.28,-.9],[-.28,-.9],[-.28,.1],[-.75,0]].map(([B,F])=>new _t(B,F))),A=new re(new mr(v).rotateX(-Math.PI/2),new He({color:16756768,depthTest:!1,transparent:!0,opacity:.92}));A.renderOrder=9,e.add(A);let R=new re(new he(1.6,1.6,40,16,1,!0),new He({color:16760896,transparent:!0,opacity:.35,blending:Kn,depthWrite:!1,side:Ge}));e.add(R);let x=my(e,i,t);_.renderOrder=2,e.add(_);let M=py();e.add(M.mesh);let U=Dr(),S=B=>new He({map:U,color:B,transparent:!0,blending:Kn,depthWrite:!1}),P=[0,1].map(()=>new re(new De(1,1).rotateX(-Math.PI/2),S(16769704))),N=[0,1].map(()=>new re(new De(1,1).rotateX(-Math.PI/2),S(16724e3)));for(let B of[...P,...N])B.renderOrder=3,B.visible=!1,e.add(B);let k=0;function I(B,F){for(let[nt,ut]of h)ut.userData.x===nt.x&&ut.userData.y===nt.y&&ut.userData.h===nt.heading||(ut.position.set(nt.x,.14,nt.y),ut.rotation.y=-nt.heading,ut.userData.x=nt.x,ut.userData.y=nt.y,ut.userData.h=nt.heading);let L=i.player,b=L.vehicle,C=b&&b.spec.class==="car";y.visible=!C;let O=Math.hypot(L.vx,L.vy);k+=B*O*2.2;let q=b&&b.spec.class==="bike",J=q?p.length-1:O>.4?1+Math.floor(k)%(p.length-2):0;p.forEach((nt,ut)=>nt.visible=ut===Math.min(J,p.length-1));let V=b||L;y.position.set(V.x,q?.14+.35:.14,V.y),y.rotation.y=-(b?b.heading:L.heading),L.stun>0?(y.rotation.z=Math.PI/2.4,y.visible=Math.floor(i.time*10)%2===0):y.rotation.z=0,_.visible=!C,_.position.set(V.x,.16,V.y);let tt=1+.12*Math.sin(i.time*5);_.scale.set(tt,1,tt),w.position.set(V.x,(C?3.2:3)+.2*Math.sin(i.time*4),V.y),w.rotation.y=i.time*2;let ct=i.play,lt=ct&&ct.target;if(A.visible=R.visible=!!lt,lt){let nt=Math.atan2(lt.y-V.y,lt.x-V.x),ut=C?4.2:2.4;A.position.set(V.x+Math.cos(nt)*ut,.5,V.y+Math.sin(nt)*ut),A.rotation.y=-nt-Math.PI/2,A.scale.setScalar(C?1.5:1.1),R.position.set(lt.x,20,lt.y),R.material.opacity=.25+.12*Math.sin(i.time*3)}for(let[nt,ut]of f){let xt=!!nt.ai,At=Math.floor(i.time*6)%2;ut[0].visible=xt?At===0:!0,ut[1].visible=xt?At===1:!0,ut[0].material.color.setHex(xt?3832831:2047887),ut[1].material.color.setHex(xt?16726586:9379615)}x.update(i.play?i.play.peds:[]),M.update(i.vehicles);let Q=b&&F>.05;for(let nt of[...P,...N])nt.visible=!!Q;if(Q){let nt=Math.cos(b.heading),ut=Math.sin(b.heading),xt=b.spec.length/2,At=b.spec.class==="car";[-.55,.55].forEach((zt,K)=>{let at=At?11:5,ht=b.x+nt*(xt+at/2)-ut*zt*(At?1:0),Rt=b.y+ut*(xt+at/2)+nt*zt*(At?1:0);P[K].position.set(ht,.17,Rt),P[K].rotation.y=-b.heading,P[K].scale.set(at,1,At?3.2:2.2),P[K].material.opacity=.5*F,P[K].visible=At||K===0,N[K].position.set(b.x-nt*xt-ut*zt,.17,b.y-ut*xt+nt*zt),N[K].scale.set(1.4,1,1.4),N[K].material.opacity=(i.braking?.9:.55)*F,N[K].visible=At})}}function G(){g(),x.load()}return{group:e,update:I,views:h,upgrade:G}}function fy(i){let t=0;for(let e=0;e<i.length;e++)t=t*31+i.charCodeAt(e)|0;return t}function py(){let t=new De(1,1).rotateX(-Math.PI/2),e=new He({color:1710878,transparent:!0,opacity:.5,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),n=new cn(t,e,1200);n.count=0,n.frustumCulled=!1,n.renderOrder=1;let s=0,r=new Map,o=new Xt,a=new Le,l=new H(0,1,0);return{mesh:n,update(c){let h=!1;for(let u of c){if(u.spec.class!=="car")continue;let d=Math.cos(u.heading),f=Math.sin(u.heading),m=Math.abs(-u.vx*f+u.vy*d);if(!(u.handbrake&&Math.hypot(u.vx,u.vy)>3||m>2.5)){r.delete(u);continue}let p=u.x-d*u.spec.length*.32,g=u.y-f*u.spec.length*.32,_=u.spec.width*.4,w=[[p+f*_,g-d*_],[p-f*_,g+d*_]],v=r.get(u);if(v)for(let A=0;A<2;A++){let[R,x]=v[A],[M,U]=w[A],S=Math.hypot(M-R,U-x);S<.05||(a.setFromAxisAngle(l,-Math.atan2(U-x,M-R)),o.compose(new H((R+M)/2,.145,(x+U)/2),a,new H(S+.1,1,.26)),n.setMatrixAt(s,o),s=(s+1)%1200,n.count=Math.min(1200,n.count+1),h=!0)}r.set(u,w)}h&&(n.instanceMatrix.needsUpdate=!0)}}}function my(i,t,e){let s=null,r=new Me({roughness:.8}),o=new Xt,a=new Le,l=new wn,c=new H(1,1,1),h=new Bt;return{load(){let d=["ped_male_walk","ped_male_stand","ped_female_walk","ped_female_stand"].map(f=>rf(f));d.some(f=>!f)||(s=d.map(f=>{let m=(_,w)=>{let v=new cn(_.geo,w,40);return v.count=0,v.castShadow=!0,v.frustumCulled=!1,i.add(v),v},y=f.find(_=>_.mat==="vc"),p=f.find(_=>_.mat==="shirt"),g=p?m(p,r):null;return g&&(g.instanceColor=new Di(new Float32Array(120).fill(1),3)),{body:m(y,e.solid),shirt:g}}))},update(u){if(s){for(let d of s)d.body.count=0,d.shirt&&(d.shirt.count=0);for(let d of u){let f=s[d.kind*2+(d.stand||d.down>0?1:0)],m=f.body.count;if(m>=40)continue;let y=d.stand||d.down>0?0:Math.abs(Math.sin(t.time*7+d.x))*.05;l.set(d.down>0?Math.PI/2:0,-d.heading,0,"YXZ"),a.setFromEuler(l),o.compose(new H(d.x,.14+y+(d.down>0?.3:0),d.y),a,c),f.body.setMatrixAt(m,o),f.body.count=m+1,f.shirt&&(f.shirt.setMatrixAt(m,o),f.shirt.setColorAt(m,h.setHex(d.shirt)),f.shirt.count=m+1)}for(let d of s)d.body.instanceMatrix.needsUpdate=!0,d.shirt&&(d.shirt.instanceMatrix.needsUpdate=!0,d.shirt.instanceColor&&(d.shirt.instanceColor.needsUpdate=!0))}}}}var jc={value:new ve(0,0,1.54,2.6)};function rn(i,t=1e4){let e=i.onBeforeCompile,n=i.customProgramCacheKey?i.customProgramCacheKey.bind(i):()=>"";return i.onBeforeCompile=(s,r)=>{e&&e(s,r),s.uniforms.uCut=jc,s.vertexShader=`varying vec3 vCutP;
`+s.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
      vec4 cutP = vec4(transformed, 1.0);
      #ifdef USE_INSTANCING
        cutP = instanceMatrix * cutP;
      #endif
      vCutP = (modelMatrix * cutP).xyz;`),s.fragmentShader=`uniform vec4 uCut;
varying vec3 vCutP;
`+s.fragmentShader.replace("void main() {",`void main() {
      float cutD = vCutP.z - uCut.y;
      ${t>1e3?"if (cutD > 1.5 && vCutP.y > min(uCut.w + cutD * uCut.z, 2.8)) discard;":`if (cutD > 0.5 && abs(vCutP.x - uCut.x) < ${t.toFixed(1)} && vCutP.y > uCut.w + cutD * uCut.z && fract(sin(dot(floor(gl_FragCoord.xy), vec2(12.9898, 78.233))) * 43758.5453) < 0.72) discard;`}`)},i.customProgramCacheKey=()=>"cut"+t+n(),i}var th=i=>new URL(`models/${i}`,document.baseURI).href;async function lf(){let i=[];try{let r=await fetch(th("index.json"));r.ok&&(i=(await r.json()).files||[])}catch{i=[]}let t=r=>i.includes(r)?sf(th(r)).catch(()=>null):null,[e,n,s]=await Promise.all([t("trees.bin"),t("bikes.bin"),t("people.bin")]);if(e&&Xd(e),n&&Ja("bikes",n),s){for(let[o,a]of Object.entries(s))o.startsWith("ped_")&&Ja(o,a);let r=["stand","walk1","walk2","walk1","ride"].map(o=>s[`player_${o}`]).filter(Boolean);r.length===5&&Ja("player",r)}}async function cf(i){let t={};return await Promise.all(["leafA","leafB","barkA","barkB"].map(async e=>{let n=await i(th(`tex/${e}.webp`));n&&(n.wrapS=n.wrapT=ui,t[e]=n)})),t}var eh=Oa.degToRad(33),hf=24,gy=i=>new URL(`stiltest/tex/${i}.webp`,document.baseURI).href,xy=i=>new URL(`stiltest/tex/small/${i}.webp`,document.baseURI).href,uf={value:.25};function _y(i){return i.onBeforeCompile=t=>{t.uniforms.uLit=uf,t.fragmentShader=`uniform float uLit;
`+t.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
      #ifdef USE_INSTANCING_COLOR
        totalEmissiveRadiance += vColor * step(0.97, vColor.r) * uLit;
      #endif`)},i.customProgramCacheKey=()=>"litwin",i}var Ns={low:{name:"L\xE5g",ratio:1,shadow:0},medium:{name:"Medel",ratio:1.5,shadow:1024},high:{name:"H\xF6g",ratio:2,shadow:2048}};async function df(i,t){let e=new za({antialias:!0,powerPreference:"high-performance"});e.outputColorSpace=be,e.toneMapping=Es,e.toneMappingExposure=1.15,e.shadowMap.enabled=!0,e.shadowMap.type=Oi,i.appendChild(e.domElement);let n=["asphalt","slabs","grass","plaster","roof","foliage"],s=(b,C)=>(globalThis.__times||(globalThis.__times=[])).push([b,Math.round(performance.now()-C)]),r=performance.now(),o=Object.fromEntries(await Promise.all(n.map(async b=>[b,await Lr(xy(b))]))),a=new Bt(14267530),l=new gs;l.background=a,l.fog=new ms(a,70,150),s("textures",r),r=performance.now(),l.environment=Nc(e),s("env",r);let c={asphalt:ei(o.asphalt,6,{vertexColors:!0,roughness:.92,vary:.7}),slabs:ei(o.slabs,4,{vertexColors:!0,roughness:.88,vary:.5}),grass:ei(o.grass,4,{vertexColors:!0,roughness:1,vary:.8}),wall:rn(ei(o.plaster,5,{vertexColors:!0,roughness:.95,vary:.6})),roof:rn(ei(o.roof,.7,{vertexColors:!0,roughness:.8,vary:.9})),leaf:rn(ei(o.foliage,3.6,{vertexColors:!0,roughness:.9,triplanar:!0,mapNormal:!0}),4.5),hedge:rn(ei(o.foliage,2.4,{vertexColors:!0,roughness:.9,triplanar:!0}),4.5),wood:rn(new Me({vertexColors:!0,roughness:.95}),4.5),plain:rn(new Me({vertexColors:!0,roughness:.75,envMapIntensity:.4})),solid:new Me({vertexColors:!0,roughness:.75,envMapIntensity:.4}),paint:new Me({vertexColors:!0,roughness:.6,color:15131612,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),trimI:rn(new Me({roughness:.7,envMapIntensity:.4})),darkI:rn(new Me({roughness:.9,envMapIntensity:.3})),glassI:rn(_y(new Me({roughness:.12,metalness:.3,envMapIntensity:.9}))),lantern:rn(new He({color:16773320}))},h=b=>b?rn(new Me({map:b,alphaTest:.45,side:Ge,vertexColors:!0,roughness:.85,envMapIntensity:.5}),4.5):c.leaf,u=b=>b?rn(new Me({map:b,vertexColors:!0,roughness:.95}),4.5):c.wood;Object.assign(c,{leafV:rn(new Me({vertexColors:!0,roughness:.9}),4.5),vc:c.solid});let d=t.map,f=Jd(d,c);l.add(f.group),l.add(jd(d,c)),l.add(tf(d)),f.update(t.player.x,t.player.y,1/0);let m=new re(new De(d.width+40,d.height+40).rotateX(-Math.PI/2),new Me({color:3103344,roughness:.15,metalness:.2,envMapIntensity:1.2}));m.position.set(d.width/2,-.85,d.height/2),m.receiveShadow=!0,l.add(m);let y=new Ae,p=200;for(let[b,C,O,q]of[[-p/2,d.height/2,p,d.height+p*2],[d.width+p/2,d.height/2,p,d.height+p*2],[d.width/2,-p/2,d.width,p],[d.width/2,d.height+p/2,d.width,p]]){let J=new De(O,q).rotateX(-Math.PI/2),V=new Float32Array(J.attributes.position.count*3).fill(.75);J.setAttribute("color",new de(V,3));let tt=new re(J,c.grass);tt.position.set(b,.08,C),tt.receiveShadow=!0,y.add(tt)}l.add(y);let g=new He({map:Dr(),color:16760944,transparent:!0,blending:Kn,depthWrite:!1,opacity:.3}),_=new cn(new De(1,1).rotateX(-Math.PI/2),g,d.lamps.length);d.lamps.forEach((b,C)=>{let O=new Xt().compose(new H(b.x+(b.ax||0)*1.1,.14,b.y+(b.ay||0)*1.1),new Le,new H(7,1,7));_.setMatrixAt(C,O)}),_.renderOrder=2,l.add(_);let w=af(t,c);l.add(w.group);let v=new Fi(16754760,8.2);v.castShadow=!0,v.shadow.bias=-4e-4,v.shadow.normalBias=.05,v.shadow.radius=3;let A=new H(-52,24,34).normalize();l.add(v,v.target);let R=new vs(11841728,8016948,.85);l.add(R);let x=new Fi(10135760,.3);x.position.set(60,30,-10),l.add(x);let M=new je(hf,1,4,260),U={x:t.player.x,z:t.player.y,metres:0},S="medium";function P(b){S=b;let C=Ns[b];e.setPixelRatio(Math.min(window.devicePixelRatio||1,C.ratio)),v.castShadow=C.shadow>0,C.shadow&&(v.shadow.mapSize.set(C.shadow,C.shadow),v.shadow.map&&(v.shadow.map.dispose(),v.shadow.map=null)),N()}function N(){let b=i.clientWidth||window.innerWidth,C=i.clientHeight||window.innerHeight;e.setSize(b,C,!1),e.domElement.style.width="100%",e.domElement.style.height="100%",M.aspect=b/C,M.updateProjectionMatrix()}window.addEventListener("resize",N),P("medium");function k(){let b=t.player.vehicle;if(!b)return 24;let C=Math.hypot(b.vx,b.vy);return b.spec.class==="car"?28+C*.6:26+C*.5}let I={sun:new Bt(16754760),sky:new Bt(11841728),ground:new Bt(8016948),haze:new Bt(14267530)},G={sun:new Bt(16747072),sky:new Bt(4872842),ground:new Bt(2761776),haze:new Bt(3817568)},B=-1;function F(b){let C=t.player,O=C.vehicle||C,q=C.vehicle?1.1:.25,J=(U.metres||24)*.32,V=O.vx*q,tt=O.vy*q,ct=Math.hypot(V,tt);ct>J&&(V*=J/ct,tt*=J/ct);let lt=O.x+V,Q=O.y+tt,nt=1-Math.exp(-6*b);U.metres===0&&(U.x=lt,U.z=Q,U.metres=k()),U.x+=(lt-U.x)*nt,U.z+=(Q-U.z)*nt,U.metres+=(k()-U.metres)*(1-Math.exp(-2*b));let ut=0,xt=0;t.shake>0&&(ut=(Math.random()-.5)*t.shake*.6,xt=(Math.random()-.5)*t.shake*.6);let At=U.metres/2/Math.tan(Oa.degToRad(hf/2));M.position.set(U.x+ut,Math.cos(eh)*At,U.z+Math.sin(eh)*At+xt),M.lookAt(U.x+ut,0,U.z+xt);let zt=performance.now();L.debugTop?f.update(L.debugTop.x,L.debugTop.y,1e3):f.update(U.x,U.z-U.metres*.3,Math.min(30,Math.max(2,b*250))),L.buildMs=performance.now()-zt,M.far=At*2.4+40,M.updateProjectionMatrix(),l.fog.near=At*1.25,l.fog.far=At*2.6,jc.value.set(O.x,O.y,1/Math.tan(eh),.9);let K=U.metres*.62,at=v.shadow.camera;at.left=-K*1.9,at.right=K*1.9,at.top=K*1.3,at.bottom=-K*1.3,at.near=1,at.far=260,at.updateProjectionMatrix();let ht=K*2/(v.shadow.mapSize.x||1024),Rt=Math.round(U.x/ht)*ht,ft=Math.round((U.z-4)/ht)*ht;v.target.position.set(Rt,0,ft),v.position.set(Rt+A.x*120,A.y*120,ft+A.z*120);let Dt=Fh(t.time+(t.clockOffset||0));Math.abs(Dt-B)>.002&&(B=Dt,v.intensity=8.2*(1-.88*Dt),v.color.copy(I.sun).lerp(G.sun,Dt),R.color.copy(I.sky).lerp(G.sky,Dt),R.groundColor.copy(I.ground).lerp(G.ground,Dt),R.intensity=.85-.35*Dt,l.background.copy(I.haze).lerp(G.haze,Dt),l.fog.color.copy(l.background),e.toneMappingExposure=1.15-.15*Dt,g.opacity=.3+.6*Dt,uf.value=.25+.95*Dt,c.lantern.color.setRGB(1,.94,.78).multiplyScalar(.9+.8*Dt),w.night=Dt),w.update(b,Dt),L.debugTop&&(M.position.set(L.debugTop.x,L.debugTop.h,L.debugTop.y+L.debugTop.h*.6),M.lookAt(L.debugTop.x,0,L.debugTop.y),M.far=L.debugTop.h*2,l.fog.near=1e4,l.fog.far=2e4,M.updateProjectionMatrix()),e.render(l,M)}e.compileAsync&&await e.compileAsync(l,M).catch(()=>{});let L={frame:F,renderer:e,scene:l,camera:M,setQuality:P,get quality(){return S},city:f,async upgradeModels(){let[,b]=await Promise.all([lf(),cf(Lr)]);Object.assign(c,{leafA:h(b.leafA),leafB:h(b.leafB),barkA:u(b.barkA),barkB:u(b.barkB)}),f.rebuildTrees(),w.upgrade()},async upgradeTextures(){await Promise.all(n.map(async b=>{let C=await Lr(gy(b)),O=o[b];!C||!O||(O.dispose(),O.image=C.image,O.needsUpdate=!0)}))}};return L}var yy="3D-grafiken slutade fungera i webbl\xE4saren. Det kan hj\xE4lpa att prova en annan webbl\xE4sare, till exempel Chrome.",ff="3D-grafiken kunde inte starta i webbl\xE4saren. Det kan hj\xE4lpa att prova en annan webbl\xE4sare, till exempel Chrome.";function pf(){try{return!!document.createElement("canvas").getContext("webgl2")}catch{return!1}}function nh(i){let t=document.getElementById("gl-fail");if(!t){t=document.createElement("div"),t.id="gl-fail",t.setAttribute("role","alert"),t.style.cssText='position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;padding:24px;background:#1d1e20f2;color:#f2f1ee;font:18px/1.45 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;text-align:center';let e=document.createElement("p");e.style.cssText="max-width:520px;margin:0",t.appendChild(e),document.body.appendChild(t)}t.firstChild.textContent=i,t.hidden=!1}function mf(i,t){i.addEventListener("webglcontextlost",e=>{e.preventDefault(),t(),nh(yy)})}var Qt=i=>document.getElementById(i),Ka=i=>(globalThis.__marks||(globalThis.__marks=[])).push([i,Math.round(performance.now())]);Ka("module");async function My(){let i={surface:Qt("hud"),joy:Qt("joy"),knob:Qt("joy-knob"),action:Qt("btn-action"),brake:Qt("btn-brake"),speed:Qt("speed"),toast:Qt("toast")};for(let M of document.querySelectorAll("[data-version]"))M.textContent=`v${ph}`;let t=await mh(new URL("data/map/centrum.json",document.baseURI).href),e=Th(t),n=yh(e),s=new URLSearchParams(location.search);s.has("kvall")&&(e.clockOffset=.6*600);let r=Dh(i),o=Nh(i);if(Ka("game"),!pf()){nh(ff);return}let a=await df(Qt("game"),e),l=!1;mf(a.renderer.domElement,()=>{l=!0,Qt("fps").hidden=!0,window.__fyriskaos&&(window.__fyriskaos.glLost=!0)}),Ka("city");let c={quality:s.get("q")||"auto",fps:s.has("fps"),steer:s.get("styrning")==="klassisk"?"classic":"screen"};r.touchSteer=c.steer;let h=Qt("fps"),u=()=>{Qt("set-fps").textContent=c.fps?"Visa fps: p\xE5":"Visa fps: av",Qt("set-quality").textContent=`Grafik: ${c.quality==="auto"?`auto (${Ns[a.quality].name})`:Ns[c.quality].name}`,Qt("set-steer").textContent=c.steer==="screen"?"Styrning: \xE5t h\xE5llet du drar":"Styrning: klassisk",h.hidden=!c.fps};Qt("btn-settings").addEventListener("click",()=>{Qt("settings").hidden=!Qt("settings").hidden,u()}),Qt("set-close").addEventListener("click",()=>Qt("settings").hidden=!0),Qt("set-fps").addEventListener("click",()=>{c.fps=!c.fps,u()}),Qt("set-steer").addEventListener("click",()=>{c.steer=c.steer==="screen"?"classic":"screen",r.touchSteer=c.steer,u()}),Qt("set-quality").addEventListener("click",()=>{let M=["auto","low","medium","high"];c.quality=M[(M.indexOf(c.quality)+1)%M.length],c.quality!=="auto"&&a.setQuality(c.quality),u()}),c.quality!=="auto"&&Ns[c.quality]&&a.setQuality(c.quality),u(),Qt("set-credits").addEventListener("click",()=>Qt("credits").hidden=!1),Qt("credits-close").addEventListener("click",()=>Qt("credits").hidden=!0);let d="";function f(M){let U=M.mission,S=M.target,P=S?Math.round(Math.hypot(S.x-e.player.x,S.y-e.player.y)):0,N="",k="";U&&U.step==="pickup"?(N="Nattmackorna",k=`H\xE4mta mackorna p\xE5 Mackbaren \xB7 ${P} m`):U&&U.step==="deliver"&&(N=`Nattmackorna \xB7 ${Math.max(0,Math.ceil(U.time))} s`,k=`${U.sandwiches} mackor till ${U.label} \xB7 ${P} m`);let I=[M.money,M.stars,Math.round(M.health/5),N,k,M.phone&&M.phone.text,M.ticket>0].join("|");I!==d&&(d=I,Qt("money").textContent=`${M.money} kr`,Qt("stars").textContent=M.stars?"\u2605".repeat(M.stars)+"\u2606".repeat(3-M.stars):"",Qt("health").firstChild.style.width=`${Math.max(0,M.health)}%`,Qt("mission").hidden=!N,Qt("mission-title").textContent=N,Qt("mission-info").textContent=k,Qt("phone").hidden=!M.phone,M.phone&&(Qt("phone-from").textContent=`SMS fr\xE5n ${M.phone.from}`,Qt("phone-text").textContent=M.phone.text),Qt("ticket").hidden=!(M.ticket>0))}let m={cpu:[],build:[],frames:0},y=0,p=performance.now(),g=0,_=0,w=0,v=0,A=-99,R=0;function x(M){if(l)return;let U=Math.min((M-p)/1e3,.1);p=M;let S=performance.now();for(y+=U,r.update();y>=Fs;){Lh(e,r,Fs);let P=e.events.splice(0);r.enabled&&n.step(Fs,P);for(let N of P)N.type==="toast"&&o.toast(N.text);y-=Fs}if(f(n.state),a.frame(U),o.update(e,r.enabled?Ch(e):null,U),m.cpu.push(performance.now()-S),m.build.push(a.buildMs||0),m.cpu.length>1200&&(m.cpu.shift(),m.build.shift()),m.frames++,R+=U,g++,_+=U,_>=.5){let P=g/_;if(g=0,_=0,c.fps&&(h.textContent=`${Math.round(P)} fps \xB7 ${Ns[a.quality].name}`),c.quality==="auto"&&R>3){let N=["low","medium","high"],k=N.indexOf(a.quality);w=P<50?w+.5:0,v=P>=59?v+.5:0,w>=1&&k>0?(a.setQuality(N[k-1]),w=0,A=R,Qt("settings").hidden||u()):v>=8&&k<2&&R-A>20&&(a.setQuality(N[k+1]),v=0,Qt("settings").hidden||u())}}requestAnimationFrame(x)}requestAnimationFrame(M=>{p=M;let U=performance.now();x(M),(globalThis.__times||(globalThis.__times=[])).push(["firstFrame",Math.round(performance.now()-U)]),Ka("firstFrame"),setTimeout(()=>{a.upgradeModels().then(()=>window.__fyriskaos.modelsReady=!0),a.upgradeTextures()},200)}),Qt("btn-start").addEventListener("click",()=>{Qt("start").hidden=!0,r.enabled=!0;let M=document.documentElement;matchMedia("(pointer: coarse)").matches&&M.requestFullscreen&&M.requestFullscreen({navigationUI:"hide"}).then(()=>screen.orientation?.lock?.("landscape")).catch(()=>{})}),Qt("btn-start").disabled=!1,window.__fyriskaos={game:e,input:r,renderer:a,perf:m,play:n}}My().catch(i=>{console.error(i),Qt("error").hidden=!1,Qt("error").textContent="Spelet kunde inte starta p\xE5 den h\xE4r enheten. Prova att ladda om sidan."});
/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
