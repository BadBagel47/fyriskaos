var lh="0.5.0",Ur=.016666666666666666,je={radius:.35,mass:80,walkSpeed:5.2,response:12,reach:1.3},Fr={bike:{class:"bike",name:"Cykel",label:{enter:"Ta cykeln",exit:"Kliv av"},length:1.8,width:.6,mass:90,circles:[{o:-.55,r:.32},{o:.55,r:.32}],maxSpeed:10,reverseSpeed:1.5,accel:5.5,brake:12,coast:1.2,drag:.05,grip:10,turnRate:3.4,turnRefSpeed:2.5,minTurn:.45,steerGain:2.4,grassFactor:1,fallImpact:4},small:{class:"car",name:"Sm\xE5bil",label:{enter:"Kliv in",exit:"Kliv ur"},length:3.6,width:1.7,mass:950,circles:[{o:-1,r:.85},{o:0,r:.85},{o:1,r:.85}],maxSpeed:19,reverseSpeed:6,accel:7,brake:20,coast:2.5,drag:.08,grip:7,turnRate:2.9,turnRefSpeed:4,minTurn:0,steerGain:2.2,grassFactor:.5,fallImpact:1/0,handbrake:{grip:1.4,turnBoost:2,decel:4,redirect:3}},car:{class:"car",name:"Bil",label:{enter:"Kliv in",exit:"Kliv ur"},length:4.4,width:1.9,mass:1300,circles:[{o:-1.35,r:.95},{o:0,r:.95},{o:1.35,r:.95}],maxSpeed:25,reverseSpeed:6,accel:9,brake:22,coast:2.5,drag:.06,grip:6,turnRate:2.4,turnRefSpeed:5,minTurn:0,steerGain:2,grassFactor:.5,fallImpact:1/0,handbrake:{grip:1.3,turnBoost:2,decel:4,redirect:3}},sport:{class:"car",name:"Sportbil",label:{enter:"Kliv in",exit:"Kliv ur"},length:4.5,width:1.95,mass:1350,circles:[{o:-1.4,r:.97},{o:0,r:.97},{o:1.4,r:.97}],maxSpeed:33.5,reverseSpeed:7,accel:14,brake:26,coast:2.5,drag:.05,grip:6.5,turnRate:2.5,turnRefSpeed:5,minTurn:0,steerGain:2,grassFactor:.45,fallImpact:1/0,handbrake:{grip:1.2,turnBoost:2.1,decel:4,redirect:3}}};var Qa=[13777970,15251747,3108822,2039586],Or=[8361392,11566975,10463098,13684165,5593182,10850229,8368294],Br=[12603466,4880064,4168298,14070076,3092275];function ja(i){let t=i>>>0;return function(){t=t+1831565813>>>0;let n=t;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296}}var $e=6,of=3,On=$e+of;function hh(i=1){let t=ja(i),e=560,n=400,s=[40,160,280,400,520],r=[40,140,260,360],o={y0:185,y1:215},a=10,l=[40,280,520],c=[];for(let C of r)c.push({x:0,y:C-$e,w:e,h:$e*2,dir:"h",c:C});for(let C of s)l.includes(C)?c.push({x:C-$e,y:0,w:$e*2,h:n,dir:"v",c:C}):(c.push({x:C-$e,y:0,w:$e*2,h:o.y0-a,dir:"v",c:C}),c.push({x:C-$e,y:o.y1+a,w:$e*2,h:n-o.y1-a,dir:"v",c:C}));let h=l.map(C=>({x:C-On,y:o.y0,w:On*2,h:o.y1-o.y0})),u=[],d=0;for(let C of h)u.push({x:d,y:o.y0,w:C.x-d,h:o.y1-o.y0}),d=C.x+C.w;u.push({x:d,y:o.y0,w:e-d,h:o.y1-o.y0});let f=[{x:0,y:o.y0-a,w:e,h:a},{x:0,y:o.y1,w:e,h:a}],p=[0,...s,e],y=[0,...r,n],m=[];for(let C=0;C<p.length-1;C++)for(let J=0;J<y.length-1;J++){let Q=p[C]+(C===0?0:On),G=p[C+1]-(C+1===p.length-1?0:On),rt=y[J]+(J===0?0:On),at=y[J+1]-(J+1===y.length-1?0:On);rt<o.y0&&at>o.y1?(m.push({x:Q,y:rt,w:G-Q,h:o.y0-a-rt}),m.push({x:Q,y:o.y1+a,w:G-Q,h:at-o.y1-a})):m.push({x:Q,y:rt,w:G-Q,h:at-rt})}let _=m.find(C=>C.x>280&&C.x<300&&C.y>260&&C.y<280),E=[],v=[];if(_){f.push({..._}),E.push({x:_.x,y:_.y+_.h/2-1.5,w:_.w,h:3}),E.push({x:_.x+_.w/2-1.5,y:_.y,w:3,h:_.h});for(let C=0;C<26;C++){let J=_.x+5+t()*(_.w-10),Q=_.y+5+t()*(_.h-10);Math.abs(Q-(_.y+_.h/2))<5||Math.abs(J-(_.x+_.w/2))<5||v.some(rt=>Math.hypot(rt.x-J,rt.y-Q)<7)||v.push({x:J,y:Q,r:.4,canopy:2.2+t()*1.4})}}for(let C=12;C<e;C+=18+t()*10)h.some(J=>C>J.x-4&&C<J.x+J.w+4)||(v.push({x:C,y:o.y0-a/2-2,r:.4,canopy:2.4+t()}),v.push({x:C+6,y:o.y1+a/2+2,r:.4,canopy:2.4+t()}));let b=[];for(let C of m){if(C===_||C.w<8||C.h<8)continue;let J=C.w>=C.h,Q=J?C.w:C.h,G=0;for(;G<Q-6;){let rt=Math.min(Q-G,12+t()*18),at=t()<.35?4:0,ot=.5+t()*1.5,st=rt-at;if(st<6)break;let Et=(J?C.h:C.w)-ot*2,Zt=8+t()*14;J?b.push({x:C.x+G+at/2,y:C.y+ot,w:st,h:Et,height:Zt,seed:t()}):b.push({x:C.x+ot,y:C.y+G+at/2,w:Et,h:st,height:Zt,seed:t()}),G+=rt}}let T=[],x=[],M=(C,J)=>J.some(Q=>Math.abs(C-Q)<On+4);for(let C of c)if(C.dir==="h")for(let J=C.x+8;J<C.x+C.w-8;J+=22+t()*40){if(M(J,s))continue;let Q=t()<.5?-1:1;T.push({x:J,y:C.c+Q*4.3,heading:Q<0?Math.PI:0,...ch(t)})}else for(let J=C.y+8;J<C.y+C.h-8;J+=26+t()*40){if(M(J,r))continue;let Q=t()<.5?-1:1;T.push({x:C.c+Q*4.3,y:J,heading:Q<0?Math.PI/2:-Math.PI/2,...ch(t)})}for(let C=0;C<10;C++){let J=c[Math.floor(t()*c.length)];if(J.dir==="h"){let Q=J.x+10+t()*(J.w-20);if(M(Q,s))continue;let G=t()<.5?-1:1;for(let rt=0;rt<2;rt++)x.push({x:Q+rt*1,y:J.c+G*($e+1.6),heading:Math.PI/2,color:Ls(t,Br)})}else{let Q=J.y+10+t()*(J.h-20);if(M(Q,r))continue;let G=t()<.5?-1:1;for(let rt=0;rt<2;rt++)x.push({x:J.c+G*($e+1.6),y:Q+rt*1,heading:0,color:Ls(t,Br)})}}b.forEach((C,J)=>{let Q=ja(i*7919+J*31+1);C.roof=Q()<.55?"gable":"flat",C.facadeIndex=Math.floor(Q()*6),C.roofIndex=Math.floor(Q()*4)});let I=ja(i*104729+7),A=[],D=[],B=C=>l.some(J=>Math.abs(C-J)<On+3);for(let C of c){let J=C.dir==="h"?C.w:C.h,Q=C.dir==="h"?C.x:C.y,G=1;for(let rt=14;rt<J-6;rt+=28){let at=Q+rt;if(G=-G,M(at,C.dir==="h"?s:r))continue;let ot=G*($e+.6),st=C.dir==="h"?at:C.c+ot,Et=C.dir==="h"?C.c+ot:at;if(!(C.dir==="h"&&Math.abs(C.c+ot-(o.y0+o.y1)/2)<25&&B(at))&&(A.push({x:st,y:Et,ax:C.dir==="h"?0:-G,ay:C.dir==="h"?-G:0,r:.2}),I()<.45)){let Zt=G*($e+2.3),wt=at+6;M(wt,C.dir==="h"?s:r)||(D.push({kind:"bench",x:C.dir==="h"?wt:C.c+Zt,y:C.dir==="h"?C.c+Zt:wt,rot:C.dir==="h"?0:Math.PI/2}),D.push({kind:"bin",x:C.dir==="h"?wt+2:C.c+Zt,y:C.dir==="h"?C.c+Zt:wt+2}))}}}_&&(D.push({kind:"bench",x:_.x+_.w/2-6,y:_.y+_.h/2-2.6,rot:0}),D.push({kind:"bin",x:_.x+_.w/2-3.6,y:_.y+_.h/2-2.6}),D.push({kind:"planter",x:_.x+_.w/2+3,y:_.y+_.h/2+3,w:3,h:1.4}));let H={x:200,y:260-$e-1.5,heading:0},L=(C,J,Q)=>G=>Math.hypot(G.x-C,G.y-J)>Q,k=T.filter(C=>L(H.x+8,260,16)(C)&&!(Math.abs(C.y-(260-4.3))<1&&C.x>168&&C.x<236)),Y=x.filter(L(H.x,H.y,6));Y.push({x:H.x+1.9,y:H.y-.2,heading:0,color:Br[0]}),k.push({x:H.x+11,y:260-4.3,heading:Math.PI,type:"car",color:Or[0]}),k.push({x:H.x+4,y:260+4.3,heading:0,type:"sport",color:Qa[0]});let z=[H,...Y],$=(C,J)=>z.every(Q=>Math.hypot(Q.x-C.x,Q.y-C.y)>J),P=A.filter(C=>$(C,2.2)),X=D.filter(C=>$(C,2.8));return{seed:i,width:e,height:n,roads:c,vRoads:s,hRoads:r,roadHalf:$e,edge:On,bridges:h,water:u,grass:f,paths:E,trees:v,lamps:P,props:X,bridgeXs:l,river:o,buildings:b,spawns:{player:H,cars:k,bikes:Y}}}function ch(i){let t=i();return t<.08?{type:"sport",color:Ls(i,Qa)}:t<.38?{type:"small",color:Ls(i,Or)}:{type:"car",color:Ls(i,Or)}}function Ls(i,t){return t[Math.floor(i()*t.length)]}var uh=Math.PI*2,tl=.12;function af(i){return i=(i+Math.PI)%uh,i<0&&(i+=uh),i-Math.PI}var Ds=(i,t,e)=>i<t?t:i>e?e:i;function mh(i){let t=i.spawns.player,e={id:"p1",kind:"person",x:t.x,y:t.y,vx:0,vy:0,heading:t.heading,vehicle:null,stun:0,mass:je.mass},n=[];return i.spawns.bikes.forEach((r,o)=>n.push(dh("bike",r,o))),i.spawns.cars.forEach((r,o)=>n.push(dh(r.type||"car",r,o))),{map:i,player:e,vehicles:n,time:0,events:[],shake:0,grid:lf(i)}}function dh(i,t,e){return{id:`${i}${e}`,kind:"vehicle",type:i,spec:Fr[i],x:t.x,y:t.y,heading:t.heading,vx:0,vy:0,color:t.color,driver:null,reversing:!1,grip:Fr[i].grip,handbrake:!1,mass:Fr[i].mass,awake:!1}}var Tn=20;function lf(i){let t=Math.ceil(i.width/Tn),e=Math.ceil(i.height/Tn),n=Array.from({length:t*e},()=>({rects:[],circles:[]})),s=o=>{for(let a=Math.floor(o.x/Tn);a<=Math.floor((o.x+o.w)/Tn);a++)for(let l=Math.floor(o.y/Tn);l<=Math.floor((o.y+o.h)/Tn);l++)a>=0&&l>=0&&a<t&&l<e&&n[l*t+a].rects.push(o)};i.buildings.forEach(s),i.water.forEach(s);for(let o of i.props||[]){if(o.kind!=="bench")continue;let a=Math.abs(Math.sin(o.rot))<.5;s(a?{x:o.x-.9,y:o.y-.3,w:1.8,h:.6}:{x:o.x-.3,y:o.y-.9,w:.6,h:1.8})}let r=[...i.trees,...i.lamps||[],...(i.props||[]).filter(o=>o.kind==="bin").map(o=>({x:o.x,y:o.y,r:.3}))];for(let o of r){let a=Math.floor(o.x/Tn),l=Math.floor(o.y/Tn);a>=0&&l>=0&&a<t&&l<e&&n[l*t+a].circles.push(o)}return{cols:t,rows:e,cells:n}}function gh(i,t,e,n){n.rects.length=0,n.circles.length=0;let s=Math.floor(t/Tn),r=Math.floor(e/Tn);for(let o=s-1;o<=s+1;o++)for(let a=r-1;a<=r+1;a++){if(o<0||a<0||o>=i.cols||a>=i.rows)continue;let l=i.cells[a*i.cols+o];for(let c of l.rects)n.rects.includes(c)||n.rects.push(c);for(let c of l.circles)n.circles.includes(c)||n.circles.push(c)}return n}function Ns(i){if(i.kind==="person")return[{x:i.x,y:i.y,r:je.radius}];let t=Math.cos(i.heading),e=Math.sin(i.heading);return i.spec.circles.map(n=>({x:i.x+t*n.o,y:i.y+e*n.o,r:n.r}))}function fh(i){return i.kind==="person"?je.radius:i.spec.length/2+.2}function nl(i,t,e,n){let s=Ds(i,n.x,n.x+n.w),r=Ds(t,n.y,n.y+n.h),o=i-s,a=t-r,l=o*o+a*a;if(l>=e*e)return null;if(l>1e-9){let p=Math.sqrt(l);return{nx:o/p,ny:a/p,pen:e-p}}let c=i-n.x,h=n.x+n.w-i,u=t-n.y,d=n.y+n.h-t,f=Math.min(c,h,u,d);return f===c?{nx:-1,ny:0,pen:c+e}:f===h?{nx:1,ny:0,pen:h+e}:f===u?{nx:0,ny:-1,pen:u+e}:{nx:0,ny:1,pen:d+e}}var cf={rects:[],circles:[]};function hf(i,t){let e=i.map,n=0,s=0,r=0;for(let o=0;o<2;o++){let a=Ns(t);for(let l of a){let c=gh(i.grid,l.x,l.y,cf),h=[];for(let u of c.rects){let d=nl(l.x,l.y,l.r,u);d&&h.push(d)}for(let u of c.circles){let d=l.x-u.x,f=l.y-u.y,p=Math.hypot(d,f),y=l.r+u.r;p<y&&p>1e-6&&h.push({nx:d/p,ny:f/p,pen:y-p})}l.x-l.r<0&&h.push({nx:1,ny:0,pen:l.r-l.x}),l.y-l.r<0&&h.push({nx:0,ny:1,pen:l.r-l.y}),l.x+l.r>e.width&&h.push({nx:-1,ny:0,pen:l.x+l.r-e.width}),l.y+l.r>e.height&&h.push({nx:0,ny:-1,pen:l.y+l.r-e.height});for(let u of h){t.x+=u.nx*u.pen,t.y+=u.ny*u.pen,l.x+=u.nx*u.pen,l.y+=u.ny*u.pen;let d=t.vx*u.nx+t.vy*u.ny;if(d<0){-d>n&&(n=-d,s=u.nx,r=u.ny);let f=t.kind==="person"?1:1.2;t.vx-=f*d*u.nx,t.vy-=f*d*u.ny,t.kind==="vehicle"&&-d>2&&(t.vx*=.85,t.vy*=.85)}}}}return{impact:n,nx:s,ny:r}}function uf(i,t,e){let n=fh(t)+fh(e);if(Math.abs(t.x-e.x)>n||Math.abs(t.y-e.y)>n)return;let s=Ns(t),r=Ns(e);for(let o of s)for(let a of r){let l=a.x-o.x,c=a.y-o.y,h=Math.hypot(l,c),u=o.r+a.r;if(h>=u||h<1e-6)continue;let d=l/h,f=c/h,p=u-h,y=1/t.mass,m=1/e.mass,g=y+m;t.x-=d*p*(y/g),t.y-=f*p*(y/g),e.x+=d*p*(m/g),e.y+=f*p*(m/g);let _=(e.vx-t.vx)*d+(e.vy-t.vy)*f;if(_<0){let E=-1.2*_/g;t.vx-=E*y*d,t.vy-=E*y*f,e.vx+=E*m*d,e.vy+=E*m*f,t.awake=!0,e.awake=!0,df(i,t,e,-_)}}}function df(i,t,e,n){let s=i.player;!s.vehicle&&(t===s||e===s)&&n>5&&s.stun<=0&&(s.stun=1,zr(i,"P\xE5k\xF6rd! Titta \xE5t b\xE5da h\xE5llen n\xE4sta g\xE5ng."));for(let o of[t,e])if(o.kind==="vehicle"&&o.driver&&o.spec.class==="bike"&&n>o.spec.fallImpact){let a=o===t?e:t,l=o.x-a.x,c=o.y-a.y,h=Math.hypot(l,c)||1;vh(i,o,l/h,c/h)}s.vehicle&&(t===s.vehicle||e===s.vehicle)&&n>6&&(i.shake=Math.min(1,n/15))}function ff(i,t,e){let n=i.stun>0?{x:0,y:0,m:0}:t.stick,s=je.walkSpeed*(n.m>tl?n.m:0),r=n.m>tl?n.x/n.m*s:0,o=n.m>tl?n.y/n.m*s:0,a=Math.min(1,(i.stun>0?4:je.response)*e);i.vx+=(r-i.vx)*a,i.vy+=(o-i.vy)*a,Math.hypot(i.vx,i.vy)>.3&&i.stun<=0&&(i.heading=Math.atan2(i.vy,i.vx))}function pf(i,t,e){for(let n of i.map.grass)if(t>=n.x&&t<=n.x+n.w&&e>=n.y&&e<=n.y+n.h){for(let s of i.map.paths)if(t>=s.x&&t<=s.x+s.w&&e>=s.y&&e<=s.y+s.h)return!1;return!0}return!1}var el=.15,ph=i=>Math.abs(i)<el?0:(i-Math.sign(i)*el)/(1-el);function mf(i,t,e,n){let s=t.spec,r=Math.cos(t.heading),o=Math.sin(t.heading),a=t.vx*r+t.vy*o,l=-t.vx*o+t.vy*r,c=e.stick,h=ph(-c.y),u=ph(c.x),d=pf(i,t.x,t.y)?s.grassFactor:1,f=s.maxSpeed*d;h>=0?t.reversing=!1:a<.5&&(t.reversing=!0);let p=0;h>0?p=h:h<0&&(p=t.reversing?h:0);let y=h<0&&!t.reversing,m=Ds(u,-1,1)*(a<-.2?-1:1),g=s.handbrake,_=a>6&&Math.abs(u)>.35;t.handbrake=!!(g&&e.brake&&!t.reversing&&(t.handbrake?a>3:_));let E=t.handbrake?g.grip:s.grip;if(t.grip+=(E-t.grip)*Math.min(1,(t.handbrake?12:2.5)*n),t.handbrake){a=Math.max(0,a-g.decel*n);let x=l*Math.min(1,g.redirect*n);l-=x,a+=Math.abs(x)*.85}else if(e.brake||y){let x=s.brake*n*(y&&!e.brake?Math.max(.4,-h):1);a>0?a=Math.max(0,a-x):a=Math.min(0,a+x)}else if(p>0)a<f?a=Math.min(f,a+s.accel*p*n):a-=(a-f)*Math.min(1,2*n),a<0&&(a=Math.min(0,a+s.brake*n));else if(p<0)a=Math.max(-s.reverseSpeed,a+s.accel*p*.6*n);else{let x=s.coast*n;a=a>0?Math.max(0,a-x):Math.min(0,a+x)}a-=a*s.drag*n,d<1&&Math.abs(a)>f&&(a-=(a-Math.sign(a)*f)*Math.min(1,3*n)),l*=Math.exp(-t.grip*n),t.vx=r*a-o*l,t.vy=o*a+r*l;let v=Ds(Math.abs(a)/s.turnRefSpeed,s.minTurn,1),b=1-.35*Ds(Math.abs(a)/s.maxSpeed,0,1),T=t.handbrake?g.turnBoost/b:1;t.heading=af(t.heading+m*s.turnRate*v*b*T*n)}function gf(i,t){let e=Math.cos(i.heading),n=Math.sin(i.heading),s=i.vx*e+i.vy*n,r=-i.vx*n+i.vy*e,o=i.spec.brake*.4*t;s=s>0?Math.max(0,s-o):Math.min(0,s+o),r*=Math.exp(-i.spec.grip*t),i.vx=e*s-n*r,i.vy=n*s+e*r,Math.abs(i.vx)+Math.abs(i.vy)<.01&&(i.vx=0,i.vy=0,i.awake=!1)}function xh(i){let t=i.player,e=null,n=je.reach;for(let s of i.vehicles)if(!s.driver)for(let r of Ns(s)){let o=Math.hypot(r.x-t.x,r.y-t.y)-r.r-je.radius;o<n&&(n=o,e=s)}return e}function _h(i){let t=i.player;if(t.stun>0)return null;if(t.vehicle)return t.vehicle.spec.label.exit;let e=xh(i);return e?e.spec.label.enter:null}function xf(i){let t=i.player;if(t.stun>0)return;if(t.vehicle){_f(i,t.vehicle);return}let e=xh(i);e&&(t.vehicle=e,e.driver=t,e.reversing=!1,e.awake=!0,i.events.push({type:"enter",vehicle:e}),t.vx=0,t.vy=0)}function yh(i,t,e){let n={kind:"person",x:t,y:e,vx:0,vy:0},s=gh(i.grid,t,e,{rects:[],circles:[]});for(let r of s.rects)if(nl(t,e,je.radius+.05,r))return!1;for(let r of s.circles)if(Math.hypot(r.x-t,r.y-e)<r.r+je.radius)return!1;for(let r of s.rects)if(nl(t,e,je.radius,r))return!1;for(let r of i.vehicles)if(r!==i.player.vehicle){for(let o of Ns(r))if(Math.hypot(o.x-n.x,o.y-n.y)<o.r+je.radius)return!1}return t>.5&&e>.5&&t<i.map.width-.5&&e<i.map.height-.5}function _f(i,t){let e=i.player,n=Math.cos(t.heading),s=Math.sin(t.heading),r=t.spec.width/2+je.radius+.2,o=t.spec.length/2+je.radius+.2,a=[[s*r,-n*r],[-s*r,n*r],[-n*o,-s*o],[n*o,s*o]],l=null;for(let[h,u]of a)if(yh(i,t.x+h,t.y+u)){l=[t.x+h,t.y+u];break}if(!l){zr(i,"Det g\xE5r inte att kliva ur h\xE4r.");return}let c=Math.hypot(t.vx,t.vy);e.vehicle=null,t.driver=null,t.handbrake=!1,t.grip=t.spec.grip,e.x=l[0],e.y=l[1],e.heading=t.heading,c>4?(e.vx=t.vx*.4,e.vy=t.vy*.4,e.stun=.8,zr(i,t.spec.class==="bike"?"Du hoppade av i farten.":"Du kastade dig ut ur bilen. Snyggt.")):(e.vx=0,e.vy=0)}function vh(i,t,e,n){let s=i.player;if(s.vehicle!==t)return;s.vehicle=null,t.driver=null;let r=t.x+e*1.1,o=t.y+n*1.1;yh(i,r,o)||(r=t.x,o=t.y),s.x=r,s.y=o,s.vx=e*2,s.vy=n*2,s.stun=1.2,t.vx*=.3,t.vy*=.3,i.shake=.6,zr(i,"Aj! Du ramlade av cykeln.")}function zr(i,t){i.events.push({type:"toast",text:t})}function Mh(i,t,e){i.time+=e;let n=i.player;t.consumeAction()&&xf(i),n.vehicle?mf(i,n.vehicle,t,e):ff(n,t,e),i.braking=!!(n.vehicle&&(t.brake||t.stick.y>.15&&!n.vehicle.reversing));for(let o of i.vehicles)!o.driver&&o.awake&&gf(o,e);let s=[];n.vehicle||s.push(n);for(let o of i.vehicles)(o.driver||o.awake)&&s.push(o);for(let o of s)o.x+=o.vx*e,o.y+=o.vy*e;let r=n.vehicle?i.vehicles:[n,...i.vehicles];for(let o of s)for(let a of r)a!==o&&(!s.includes(a)||s.indexOf(a)>s.indexOf(o))&&uf(i,o,a);for(let o of[...s,...i.vehicles.filter(a=>a.awake&&!s.includes(a))]){let a=hf(i,o);o.kind==="vehicle"&&o.driver&&a.impact>0&&(o.spec.class==="bike"&&a.impact>o.spec.fallImpact?vh(i,o,a.nx,a.ny):a.impact>6&&(i.shake=Math.min(1,a.impact/15)))}n.vehicle&&(n.x=n.vehicle.x,n.y=n.vehicle.y,n.heading=n.vehicle.heading),n.stun>0&&(n.stun=Math.max(0,n.stun-e)),i.shake=Math.max(0,i.shake-e*2)}function Sh(i){let t={stick:{x:0,y:0,m:0},brake:!1,enabled:!1,actionQueued:!1,consumeAction(){let f=this.actionQueued;return this.actionQueued=!1,f&&this.enabled}},e=new Set,n=()=>{let f=0,p=0;(e.has("ArrowLeft")||e.has("KeyA"))&&(f-=1),(e.has("ArrowRight")||e.has("KeyD"))&&(f+=1),(e.has("ArrowUp")||e.has("KeyW"))&&(p-=1),(e.has("ArrowDown")||e.has("KeyS"))&&(p+=1);let y=Math.hypot(f,p);return y?{x:f/y,y:p/y,m:1}:null};window.addEventListener("keydown",f=>{(f.code==="Space"||f.code.startsWith("Arrow"))&&f.preventDefault(),!f.repeat&&(f.code==="KeyE"||f.code==="Enter")&&(t.actionQueued=!0),e.add(f.code)}),window.addEventListener("keyup",f=>e.delete(f.code)),window.addEventListener("blur",()=>e.clear());let s=null,r=0,o=0,a={x:0,y:0,m:0},l=(f,p)=>{i.joy.hidden=!1,i.joy.style.transform=`translate(${r}px, ${o}px)`,i.knob.style.transform=`translate(${f}px, ${p}px)`};i.surface.addEventListener("pointerdown",f=>{s===null&&(f.pointerType!=="mouse"&&f.clientX>window.innerWidth*.6||(s=f.pointerId,r=f.clientX,o=f.clientY,a={x:0,y:0,m:0},i.surface.setPointerCapture?.(f.pointerId),l(0,0),f.preventDefault()))}),i.surface.addEventListener("pointermove",f=>{if(f.pointerId!==s)return;let p=f.clientX-r,y=f.clientY-o,m=Math.hypot(p,y);m>60&&(r+=p/m*(m-60),o+=y/m*(m-60),p=f.clientX-r,y=f.clientY-o);let g=Math.min(1,Math.hypot(p,y)/60);a=g>0?{x:p/60,y:y/60,m:g}:{x:0,y:0,m:0},l(p,y)});let c=f=>{f.pointerId===s&&(s=null,a={x:0,y:0,m:0},i.joy.hidden=!0)};i.surface.addEventListener("pointerup",c),i.surface.addEventListener("pointercancel",c),i.action.addEventListener("pointerdown",f=>{f.preventDefault(),t.actionQueued=!0});let h=f=>{f.preventDefault(),i.brake.classList.add("down"),d=!0},u=()=>{i.brake.classList.remove("down"),d=!1},d=!1;i.brake.addEventListener("pointerdown",h),i.brake.addEventListener("pointerup",u),i.brake.addEventListener("pointercancel",u),i.brake.addEventListener("pointerleave",u);for(let f of["touchstart","touchmove","gesturestart","contextmenu"])document.addEventListener(f,p=>p.target.closest?.(".overlay")||p.preventDefault(),{passive:!1});return t.update=()=>{let f=n();t.stick=t.enabled?f||a:{x:0,y:0,m:0},t.brake=t.enabled&&(d||e.has("Space"))},t}function bh(i){let t=0,e;return{update(n,s,r){s!==e&&(e=s,i.action.hidden=!s,s&&(i.action.textContent=s));let o=n.player.vehicle;i.brake.hidden=!o,i.speed.hidden=!o,o&&(i.speed.textContent=`${o.spec.name} \xB7 ${Math.round(Math.hypot(o.vx,o.vy)*3.6)} km/h`),t>0&&(t-=r,t<=0&&(i.toast.hidden=!0))},toast(n){i.toast.textContent=n,i.toast.hidden=!1,t=2.5}}}function wh(i){let t=(i%600+600)%600/600;return t<.4?0:t<.5?Eh((t-.4)/.1):t<.9?1:1-Eh((t-.9)/.1)}function Eh(i){return i*i*(3-2*i)}var ru=0,Ol=1,ou=2;var Ni=1,au=2,_s=3,_i=0,Ye=1,an=2,Ui=0,ys=1,yi=2,Bl=3,zl=4,lu=5;var Fi=100,cu=101,hu=102,uu=103,du=104,fu=200,pu=201,mu=202,gu=203,kl=204,Hl=205,xu=206,_u=207,yu=208,vu=209,Mu=210,Su=211,bu=212,Eu=213,wu=214,fo=0,po=1,mo=2,ss=3,go=4,xo=5,_o=6,yo=7,Gl=0,Tu=1,Au=2,Ln=0,Vl=1,Wl=2,Xl=3,vs=4,ql=5,Yl=6,Zl=7;var Jl=300,Oi=301,Ms=302,Ss=303,$o=304,li=1e3,Mn=1001,vo=1002,Oe=1003,Ru=1004;var _r=1005;var Qe=1006,Ko=1007;var Jn=1008;var tn=1009,$l=1010,Kl=1011,bs=1012,Qo=1013,Sn=1014,gn=1015,bn=1016,jo=1017,ta=1018,Bi=1020,Ql=35902,jl=35899,tc=1021,ec=1022,En=1023,Wn=1026,$n=1027,ea=1028,na=1029,vi=1030,ia=1031;var sa=1033,yr=33776,vr=33777,Mr=33778,Sr=33779,ra=35840,oa=35841,aa=35842,la=35843,ca=36196,ha=37492,ua=37496,da=37488,fa=37489,br=37490,pa=37491,ma=37808,ga=37809,xa=37810,_a=37811,ya=37812,va=37813,Ma=37814,Sa=37815,ba=37816,Ea=37817,wa=37818,Ta=37819,Aa=37820,Ra=37821,Ca=36492,Pa=36494,Ia=36495,La=36283,Da=36284,Er=36285,Na=36286;var Ys=2300,Mo=2301,co=2302,Tl=2303,Al=2400,Rl=2401,Cl=2402;var Cu=3200;var Ua=0,Pu=1,Kn="",Ee="srgb",Zs="srgb-linear",Js="linear",ue="srgb";var ho=7680;var Iu=519,Lu=512,Du=513,Nu=514,nc=515,Uu=516,Fu=517,ic=518,sc=519,Ou=35044;var rc="300 es",fn=2e3,rs=2001;function yf(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function vf(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function os(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Bu(){let i=os("canvas");return i.style.display="block",i}var Th={},as=null;function oc(...i){let t="THREE."+i.shift();as?as("log",t,...i):console.log(t,...i)}function zu(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Gt(...i){i=zu(i);let t="THREE."+i.shift();if(as)as("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Wt(...i){i=zu(i);let t="THREE."+i.shift();if(as)as("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Gs(...i){let t=i.join(" ");t in Th||(Th[t]=!0,Gt(...i))}function ku(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Hu={[fo]:fo,[mo]:_o,[go]:go,[ss]:xo,[po]:po,[_o]:mo,[yo]:yo,[xo]:ss},Rn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Ge=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ah=1234567,Vs=Math.PI/180,ls=180/Math.PI;function zi(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ge[i&255]+Ge[i>>8&255]+Ge[i>>16&255]+Ge[i>>24&255]+"-"+Ge[t&255]+Ge[t>>8&255]+"-"+Ge[t>>16&15|64]+Ge[t>>24&255]+"-"+Ge[e&63|128]+Ge[e>>8&255]+"-"+Ge[e>>16&255]+Ge[e>>24&255]+Ge[n&255]+Ge[n>>8&255]+Ge[n>>16&255]+Ge[n>>24&255]).toLowerCase()}function ie(i,t,e){return Math.max(t,Math.min(e,i))}function ac(i,t){return(i%t+t)%t}function Mf(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Sf(i,t,e){return i!==t?(e-i)/(t-i):0}function Ws(i,t,e){return(1-e)*i+e*t}function bf(i,t,e,n){return Ws(i,t,1-Math.exp(-e*n))}function Ef(i,t=1){return t-Math.abs(ac(i,t*2)-t)}function wf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Tf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Af(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Rf(i,t){return i+Math.random()*(t-i)}function Cf(i){return i*(.5-Math.random())}function Pf(i){i!==void 0&&(Ah=i);let t=Ah+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function If(i){return i*Vs}function Lf(i){return i*ls}function Df(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Nf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function lc(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Uf(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),p=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*u,l*d,a*c);break;case"YZY":i.set(l*d,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*d,a*h,a*c);break;case"XZX":i.set(a*h,l*p,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*p,a*c);break;case"ZYZ":i.set(l*p,l*f,a*h,a*c);break;default:Gt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function cc(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Gu(i,t){if(t.constructor===Float32Array)return i;let e=cc(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/e,-1)}function Vu(i,t){if(t.constructor===Float32Array)return i;let e=cc(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*e)}var Fa={DEG2RAD:Vs,RAD2DEG:ls,generateUUID:zi,clamp:ie,euclideanModulo:ac,mapLinear:Mf,inverseLerp:Sf,lerp:Ws,damp:bf,pingpong:Ef,smoothstep:wf,smootherstep:Tf,randInt:Af,randFloat:Rf,randFloatSpread:Cf,seededRandom:Pf,degToRad:If,radToDeg:Lf,isPowerOfTwo:Df,ceilPowerOfTwo:Nf,floorPowerOfTwo:lc,setQuaternionFromProperEuler:Uf,normalize:Vu,denormalize:Gu},mc=class mc{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ie(this.x,t.x,e.x),this.y=ie(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ie(this.x,t,e),this.y=ie(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ie(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ie(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};mc.prototype.isVector2=!0;var bt=mc,Pe=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3],d=r[o+0],f=r[o+1],p=r[o+2],y=r[o+3];if(u!==y||l!==d||c!==f||h!==p){let m=l*d+c*f+h*p+u*y;m<0&&(d=-d,f=-f,p=-p,y=-y,m=-m);let g=1-a;if(m<.9995){let _=Math.acos(m),E=Math.sin(_);g=Math.sin(g*_)/E,a=Math.sin(a*_)/E,l=l*g+d*a,c=c*g+f*a,h=h*g+p*a,u=u*g+y*a}else{l=l*g+d*a,c=c*g+f*a,h=h*g+p*a,u=u*g+y*a;let _=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=_,c*=_,h*=_,u*=_}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],p=r[o+3];return t[e]=a*p+h*u+l*f-c*d,t[e+1]=l*p+h*d+c*u-a*f,t[e+2]=c*p+h*f+a*d-l*u,t[e+3]=h*p-a*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),d=l(n/2),f=l(s/2),p=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"YZX":this._x=d*h*u+c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u-d*f*p;break;case"XZY":this._x=d*h*u-c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u+d*f*p;break;default:Gt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ie(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let l=1-e;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},gc=class gc{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Rh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Rh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ie(this.x,t.x,e.x),this.y=ie(this.y,t.y,e.y),this.z=ie(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ie(this.x,t,e),this.y=ie(this.y,t,e),this.z=ie(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ie(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return il.copy(this).projectOnVector(t),this.sub(il)}reflect(t){return this.sub(il.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ie(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};gc.prototype.isVector3=!0;var U=gc,il=new U,Rh=new Pe,xc=class xc{constructor(t,e,n,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],p=n[8],y=s[0],m=s[3],g=s[6],_=s[1],E=s[4],v=s[7],b=s[2],T=s[5],x=s[8];return r[0]=o*y+a*_+l*b,r[3]=o*m+a*E+l*T,r[6]=o*g+a*v+l*x,r[1]=c*y+h*_+u*b,r[4]=c*m+h*E+u*T,r[7]=c*g+h*v+u*x,r[2]=d*y+f*_+p*b,r[5]=d*m+f*E+p*T,r[8]=d*g+f*v+p*x,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,p=e*u+n*d+s*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/p;return t[0]=u*y,t[1]=(s*c-h*n)*y,t[2]=(a*n-s*o)*y,t[3]=d*y,t[4]=(h*e-s*l)*y,t[5]=(s*r-a*e)*y,t[6]=f*y,t[7]=(n*l-c*e)*y,t[8]=(o*e-n*r)*y,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return Gs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(sl.makeScale(t,e)),this}rotate(t){return Gs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(sl.makeRotation(-t)),this}translate(t,e){return Gs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(sl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};xc.prototype.isMatrix3=!0;var Yt=xc,sl=new Yt,Ch=new Yt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ph=new Yt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ff(){let i={enabled:!0,workingColorSpace:Zs,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ue&&(s.r=Vn(s.r),s.g=Vn(s.g),s.b=Vn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ue&&(s.r=is(s.r),s.g=is(s.g),s.b=is(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Kn?Js:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Zs]:{primaries:t,whitePoint:n,transfer:Js,toXYZ:Ch,fromXYZ:Ph,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ee},outputColorSpaceConfig:{drawingBufferColorSpace:Ee}},[Ee]:{primaries:t,whitePoint:n,transfer:ue,toXYZ:Ch,fromXYZ:Ph,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ee}}}),i}var oe=Ff();function Vn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function is(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Gi,So=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Gi===void 0&&(Gi=os("canvas")),Gi.width=t.width,Gi.height=t.height;let s=Gi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Gi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=os("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Vn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Vn(e[n]/255)*255):e[n]=Vn(e[n]);return{data:e,width:t.width,height:t.height}}else return Gt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Of=0,cs=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Of++}),this.uuid=zi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(rl(s[o].image)):r.push(rl(s[o]))}else r=rl(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function rl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?So.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Gt("Texture: Unable to serialize Texture."),{})}var Bf=0,ol=new U,We=class i extends Rn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Mn,s=Mn,r=Qe,o=Jn,a=En,l=tn,c=i.DEFAULT_ANISOTROPY,h=Kn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bf++}),this.uuid=zi(),this.name="",this.source=new cs(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new bt(0,0),this.repeat=new bt(1,1),this.center=new bt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Yt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(ol).x}get height(){return this.source.getSize(ol).y}get depth(){return this.source.getSize(ol).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Gt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Gt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Jl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case li:t.x=t.x-Math.floor(t.x);break;case Mn:t.x=t.x<0?0:1;break;case vo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case li:t.y=t.y-Math.floor(t.y);break;case Mn:t.y=t.y<0?0:1;break;case vo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};We.DEFAULT_IMAGE=null;We.DEFAULT_MAPPING=Jl;We.DEFAULT_ANISOTROPY=1;var _c=class _c{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],p=l[9],y=l[2],m=l[6],g=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-y)<.01&&Math.abs(p-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+y)<.1&&Math.abs(p+m)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let E=(c+1)/2,v=(f+1)/2,b=(g+1)/2,T=(h+d)/4,x=(u+y)/4,M=(p+m)/4;return E>v&&E>b?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=T/n,r=x/n):v>b?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=T/s,r=M/s):b<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(b),n=x/r,s=M/r),this.set(n,s,r,e),this}let _=Math.sqrt((m-p)*(m-p)+(u-y)*(u-y)+(d-h)*(d-h));return Math.abs(_)<.001&&(_=1),this.x=(m-p)/_,this.y=(u-y)/_,this.z=(d-h)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ie(this.x,t.x,e.x),this.y=ie(this.y,t.y,e.y),this.z=ie(this.z,t.z,e.z),this.w=ie(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ie(this.x,t,e),this.y=ie(this.y,t,e),this.z=ie(this.z,t,e),this.w=ie(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ie(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};_c.prototype.isVector4=!0;var _e=_c,bo=class extends Rn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qe,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new _e(0,0,t,e),this.scissorTest=!1,this.viewport=new _e(0,0,t,e),this.textures=[];let s=n.count;for(let r=0;r<s;r++)this.textures[r]=new We({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Qe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new cs(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},sn=class extends bo{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},$s=class extends We{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Oe,this.minFilter=Oe,this.wrapR=Mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Eo=class extends We{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Oe,this.minFilter=Oe,this.wrapR=Mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Jo=class Jo{constructor(t,e,n,s,r,o,a,l,c,h,u,d,f,p,y,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,u,d,f,p,y,m)}set(t,e,n,s,r,o,a,l,c,h,u,d,f,p,y,m){let g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=s,g[1]=r,g[5]=o,g[9]=a,g[13]=l,g[2]=c,g[6]=h,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=y,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Jo().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/Vi.setFromMatrixColumn(t,0).length(),r=1/Vi.setFromMatrixColumn(t,1).length(),o=1/Vi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let d=o*h,f=o*u,p=a*h,y=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+p*c,e[5]=d-y*c,e[9]=-a*l,e[2]=y-d*c,e[6]=p+f*c,e[10]=o*l}else if(t.order==="YXZ"){let d=l*h,f=l*u,p=c*h,y=c*u;e[0]=d+y*a,e[4]=p*a-f,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-p,e[6]=y+d*a,e[10]=o*l}else if(t.order==="ZXY"){let d=l*h,f=l*u,p=c*h,y=c*u;e[0]=d-y*a,e[4]=-o*u,e[8]=p+f*a,e[1]=f+p*a,e[5]=o*h,e[9]=y-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let d=o*h,f=o*u,p=a*h,y=a*u;e[0]=l*h,e[4]=p*c-f,e[8]=d*c+y,e[1]=l*u,e[5]=y*c+d,e[9]=f*c-p,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let d=o*l,f=o*c,p=a*l,y=a*c;e[0]=l*h,e[4]=y-d*u,e[8]=p*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*u+p,e[10]=d-y*u}else if(t.order==="XZY"){let d=o*l,f=o*c,p=a*l,y=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+y,e[5]=o*h,e[9]=f*u-p,e[2]=p*u-f,e[6]=a*h,e[10]=y*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(zf,t,kf)}lookAt(t,e,n){let s=this.elements;return en.subVectors(t,e),en.lengthSq()===0&&(en.z=1),en.normalize(),ni.crossVectors(n,en),ni.lengthSq()===0&&(Math.abs(n.z)===1?en.x+=1e-4:en.z+=1e-4,en.normalize(),ni.crossVectors(n,en)),ni.normalize(),kr.crossVectors(en,ni),s[0]=ni.x,s[4]=kr.x,s[8]=en.x,s[1]=ni.y,s[5]=kr.y,s[9]=en.y,s[2]=ni.z,s[6]=kr.z,s[10]=en.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],p=n[2],y=n[6],m=n[10],g=n[14],_=n[3],E=n[7],v=n[11],b=n[15],T=s[0],x=s[4],M=s[8],I=s[12],A=s[1],D=s[5],B=s[9],H=s[13],L=s[2],k=s[6],Y=s[10],z=s[14],$=s[3],P=s[7],X=s[11],C=s[15];return r[0]=o*T+a*A+l*L+c*$,r[4]=o*x+a*D+l*k+c*P,r[8]=o*M+a*B+l*Y+c*X,r[12]=o*I+a*H+l*z+c*C,r[1]=h*T+u*A+d*L+f*$,r[5]=h*x+u*D+d*k+f*P,r[9]=h*M+u*B+d*Y+f*X,r[13]=h*I+u*H+d*z+f*C,r[2]=p*T+y*A+m*L+g*$,r[6]=p*x+y*D+m*k+g*P,r[10]=p*M+y*B+m*Y+g*X,r[14]=p*I+y*H+m*z+g*C,r[3]=_*T+E*A+v*L+b*$,r[7]=_*x+E*D+v*k+b*P,r[11]=_*M+E*B+v*Y+b*X,r[15]=_*I+E*H+v*z+b*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],p=t[3],y=t[7],m=t[11],g=t[15],_=l*f-c*d,E=a*f-c*u,v=a*d-l*u,b=o*f-c*h,T=o*d-l*h,x=o*u-a*h;return e*(y*_-m*E+g*v)-n*(p*_-m*b+g*T)+s*(p*E-y*b+g*x)-r*(p*v-y*T+m*x)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],l=t[2],c=t[6],h=t[10];return e*(o*h-a*c)-n*(r*h-a*l)+s*(r*c-o*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],p=t[12],y=t[13],m=t[14],g=t[15],_=e*a-n*o,E=e*l-s*o,v=e*c-r*o,b=n*l-s*a,T=n*c-r*a,x=s*c-r*l,M=h*y-u*p,I=h*m-d*p,A=h*g-f*p,D=u*m-d*y,B=u*g-f*y,H=d*g-f*m,L=_*H-E*B+v*D+b*A-T*I+x*M;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let k=1/L;return t[0]=(a*H-l*B+c*D)*k,t[1]=(s*B-n*H-r*D)*k,t[2]=(y*x-m*T+g*b)*k,t[3]=(d*T-u*x-f*b)*k,t[4]=(l*A-o*H-c*I)*k,t[5]=(e*H-s*A+r*I)*k,t[6]=(m*v-p*x-g*E)*k,t[7]=(h*x-d*v+f*E)*k,t[8]=(o*B-a*A+c*M)*k,t[9]=(n*A-e*B-r*M)*k,t[10]=(p*T-y*v+g*_)*k,t[11]=(u*v-h*T-f*_)*k,t[12]=(a*I-o*D-l*M)*k,t[13]=(e*D-n*I+s*M)*k,t[14]=(y*E-p*b-m*_)*k,t[15]=(h*b-u*E+d*_)*k,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,p=r*u,y=o*h,m=o*u,g=a*u,_=l*c,E=l*h,v=l*u,b=n.x,T=n.y,x=n.z;return s[0]=(1-(y+g))*b,s[1]=(f+v)*b,s[2]=(p-E)*b,s[3]=0,s[4]=(f-v)*T,s[5]=(1-(d+g))*T,s[6]=(m+_)*T,s[7]=0,s[8]=(p+E)*x,s[9]=(m-_)*x,s[10]=(1-(d+y))*x,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=Vi.set(s[0],s[1],s[2]).length(),a=Vi.set(s[4],s[5],s[6]).length(),l=Vi.set(s[8],s[9],s[10]).length();r<0&&(o=-o),_n.copy(this);let c=1/o,h=1/a,u=1/l;return _n.elements[0]*=c,_n.elements[1]*=c,_n.elements[2]*=c,_n.elements[4]*=h,_n.elements[5]*=h,_n.elements[6]*=h,_n.elements[8]*=u,_n.elements[9]*=u,_n.elements[10]*=u,e.setFromRotationMatrix(_n),n.x=o,n.y=a,n.z=l,this}makePerspective(t,e,n,s,r,o,a=fn,l=!1){let c=this.elements,h=2*r/(e-t),u=2*r/(n-s),d=(e+t)/(e-t),f=(n+s)/(n-s),p,y;if(l)p=r/(o-r),y=o*r/(o-r);else if(a===fn)p=-(o+r)/(o-r),y=-2*o*r/(o-r);else if(a===rs)p=-o/(o-r),y=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=fn,l=!1){let c=this.elements,h=2/(e-t),u=2/(n-s),d=-(e+t)/(e-t),f=-(n+s)/(n-s),p,y;if(l)p=1/(o-r),y=o/(o-r);else if(a===fn)p=-2/(o-r),y=-(o+r)/(o-r);else if(a===rs)p=-1/(o-r),y=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Jo.prototype.isMatrix4=!0;var qt=Jo,Vi=new U,_n=new qt,zf=new U(0,0,0),kf=new U(1,1,1),ni=new U,kr=new U,en=new U,Ih=new qt,Lh=new Pe,Xn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(ie(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ie(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ie(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ie(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ie(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-ie(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Gt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ih.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ih,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Lh.setFromEuler(this),this.setFromQuaternion(Lh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Xn.DEFAULT_ORDER="XYZ";var Ks=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Hf=0,Dh=new U,Wi=new Pe,Bn=new qt,Hr=new U,Us=new U,Gf=new U,Vf=new Pe,Nh=new U(1,0,0),Uh=new U(0,1,0),Fh=new U(0,0,1),Oh={type:"added"},Wf={type:"removed"},Xi={type:"childadded",child:null},al={type:"childremoved",child:null},Xe=class i extends Rn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Hf++}),this.uuid=zi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new U,e=new Xn,n=new Pe,s=new U(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new qt},normalMatrix:{value:new Yt}}),this.matrix=new qt,this.matrixWorld=new qt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ks,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Wi.setFromAxisAngle(t,e),this.quaternion.multiply(Wi),this}rotateOnWorldAxis(t,e){return Wi.setFromAxisAngle(t,e),this.quaternion.premultiply(Wi),this}rotateX(t){return this.rotateOnAxis(Nh,t)}rotateY(t){return this.rotateOnAxis(Uh,t)}rotateZ(t){return this.rotateOnAxis(Fh,t)}translateOnAxis(t,e){return Dh.copy(t).applyQuaternion(this.quaternion),this.position.add(Dh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Nh,t)}translateY(t){return this.translateOnAxis(Uh,t)}translateZ(t){return this.translateOnAxis(Fh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Bn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Hr.copy(t):Hr.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Us.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Bn.lookAt(Us,Hr,this.up):Bn.lookAt(Hr,Us,this.up),this.quaternion.setFromRotationMatrix(Bn),s&&(Bn.extractRotation(s.matrixWorld),Wi.setFromRotationMatrix(Bn),this.quaternion.premultiply(Wi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Wt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Oh),Xi.child=t,this.dispatchEvent(Xi),Xi.child=null):Wt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Wf),al.child=t,this.dispatchEvent(al),al.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Bn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Bn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Bn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Oh),Xi.child=t,this.dispatchEvent(Xi),Xi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Us,t,Gf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Us,Vf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),p=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=s,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Xe.DEFAULT_UP=new U(0,1,0);Xe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Fe=class extends Xe{constructor(){super(),this.isGroup=!0,this.type="Group"}},Xf={type:"move"},hs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Fe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Fe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Fe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let y of t.hand.values()){let m=e.getJointPose(y,n),g=this._getHandJoint(c,y);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,p=.005;c.inputState.pinching&&d>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Xf)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Fe;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Wu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ii={h:0,s:0,l:0},Gr={h:0,s:0,l:0};function ll(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Ut=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ee){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,oe.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=oe.workingColorSpace){return this.r=t,this.g=e,this.b=n,oe.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=oe.workingColorSpace){if(t=ac(t,1),e=ie(e,0,1),n=ie(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=ll(o,r,t+1/3),this.g=ll(o,r,t),this.b=ll(o,r,t-1/3)}return oe.colorSpaceToWorking(this,s),this}setStyle(t,e=Ee){function n(r){r!==void 0&&parseFloat(r)<1&&Gt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Gt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Gt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ee){let n=Wu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Gt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Vn(t.r),this.g=Vn(t.g),this.b=Vn(t.b),this}copyLinearToSRGB(t){return this.r=is(t.r),this.g=is(t.g),this.b=is(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ee){return oe.workingToColorSpace(Ve.copy(this),t),Math.round(ie(Ve.r*255,0,255))*65536+Math.round(ie(Ve.g*255,0,255))*256+Math.round(ie(Ve.b*255,0,255))}getHexString(t=Ee){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=oe.workingColorSpace){oe.workingToColorSpace(Ve.copy(this),e);let n=Ve.r,s=Ve.g,r=Ve.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=oe.workingColorSpace){return oe.workingToColorSpace(Ve.copy(this),e),t.r=Ve.r,t.g=Ve.g,t.b=Ve.b,t}getStyle(t=Ee){oe.workingToColorSpace(Ve.copy(this),t);let e=Ve.r,n=Ve.g,s=Ve.b;return t!==Ee?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ii),this.setHSL(ii.h+t,ii.s+e,ii.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ii),t.getHSL(Gr);let n=Ws(ii.h,Gr.h,e),s=Ws(ii.s,Gr.s,e),r=Ws(ii.l,Gr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ve=new Ut;Ut.NAMES=Wu;var us=class i{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ut(t),this.near=e,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},ds=class extends Xe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Xn,this.environmentIntensity=1,this.environmentRotation=new Xn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},yn=new U,zn=new U,cl=new U,kn=new U,qi=new U,Yi=new U,Bh=new U,hl=new U,ul=new U,dl=new U,fl=new _e,pl=new _e,ml=new _e,ai=class i{constructor(t=new U,e=new U,n=new U){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),yn.subVectors(t,e),s.cross(yn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){yn.subVectors(s,e),zn.subVectors(n,e),cl.subVectors(t,e);let o=yn.dot(yn),a=yn.dot(zn),l=yn.dot(cl),c=zn.dot(zn),h=zn.dot(cl),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(c*l-a*h)*d,p=(o*h-a*l)*d;return r.set(1-f-p,p,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,kn)===null?!1:kn.x>=0&&kn.y>=0&&kn.x+kn.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,kn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,kn.x),l.addScaledVector(o,kn.y),l.addScaledVector(a,kn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return fl.setScalar(0),pl.setScalar(0),ml.setScalar(0),fl.fromBufferAttribute(t,e),pl.fromBufferAttribute(t,n),ml.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(fl,r.x),o.addScaledVector(pl,r.y),o.addScaledVector(ml,r.z),o}static isFrontFacing(t,e,n,s){return yn.subVectors(n,e),zn.subVectors(t,e),yn.cross(zn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return yn.subVectors(this.c,this.b),zn.subVectors(this.a,this.b),yn.cross(zn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;qi.subVectors(s,n),Yi.subVectors(r,n),hl.subVectors(t,n);let l=qi.dot(hl),c=Yi.dot(hl);if(l<=0&&c<=0)return e.copy(n);ul.subVectors(t,s);let h=qi.dot(ul),u=Yi.dot(ul);if(h>=0&&u<=h)return e.copy(s);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0&&l-h>0)return o=l/(l-h),e.copy(n).addScaledVector(qi,o);dl.subVectors(t,r);let f=qi.dot(dl),p=Yi.dot(dl);if(p>=0&&f<=p)return e.copy(r);let y=f*c-l*p;if(y<=0&&c>=0&&p<=0)return a=c/(c-p),e.copy(n).addScaledVector(Yi,a);let m=h*p-f*u;if(m<=0&&u-h>=0&&f-p>=0)return Bh.subVectors(r,s),a=(u-h)/(u-h+(f-p)),e.copy(s).addScaledVector(Bh,a);let g=1/(m+y+d);return o=y*g,a=d*g,e.copy(n).addScaledVector(qi,o).addScaledVector(Yi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Cn=class{constructor(t=new U(1/0,1/0,1/0),e=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(vn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(vn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=vn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,vn):vn.fromBufferAttribute(r,o),vn.applyMatrix4(t.matrixWorld),this.expandByPoint(vn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Vr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Vr.copy(n.boundingBox)),Vr.applyMatrix4(t.matrixWorld),this.union(Vr)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,vn),vn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Fs),Wr.subVectors(this.max,Fs),Zi.subVectors(t.a,Fs),Ji.subVectors(t.b,Fs),$i.subVectors(t.c,Fs),si.subVectors(Ji,Zi),ri.subVectors($i,Ji),Ti.subVectors(Zi,$i);let e=[0,-si.z,si.y,0,-ri.z,ri.y,0,-Ti.z,Ti.y,si.z,0,-si.x,ri.z,0,-ri.x,Ti.z,0,-Ti.x,-si.y,si.x,0,-ri.y,ri.x,0,-Ti.y,Ti.x,0];return!gl(e,Zi,Ji,$i,Wr)||(e=[1,0,0,0,1,0,0,0,1],!gl(e,Zi,Ji,$i,Wr))?!1:(Xr.crossVectors(si,ri),e=[Xr.x,Xr.y,Xr.z],gl(e,Zi,Ji,$i,Wr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,vn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(vn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Hn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Hn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Hn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Hn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Hn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Hn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Hn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Hn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Hn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Hn=[new U,new U,new U,new U,new U,new U,new U,new U],vn=new U,Vr=new Cn,Zi=new U,Ji=new U,$i=new U,si=new U,ri=new U,Ti=new U,Fs=new U,Wr=new U,Xr=new U,Ai=new U;function gl(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Ai.fromArray(i,r);let a=s.x*Math.abs(Ai.x)+s.y*Math.abs(Ai.y)+s.z*Math.abs(Ai.z),l=t.dot(Ai),c=e.dot(Ai),h=n.dot(Ai);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var Re=new U,qr=new bt,qf=0,ce=class extends Rn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:qf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ou,this.updateRanges=[],this.gpuType=gn,this.version=0,this._normalizationScale=t!==void 0?cc(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)qr.fromBufferAttribute(this,e),qr.applyMatrix3(t),this.setXY(e,qr.x,qr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.applyMatrix3(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.applyMatrix4(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.applyNormalMatrix(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.transformDirection(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):Gu(t,this.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):Vu(t,this.array)}};var Qs=class extends ce{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var js=class extends ce{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var $t=class extends ce{constructor(t,e,n){super(new Float32Array(t),e,n)}},Yf=new Cn,Os=new U,xl=new U,ci=class{constructor(t=new U,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Yf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Os.subVectors(t,this.center);let e=Os.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Os,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(xl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Os.copy(t.center).add(xl)),this.expandByPoint(Os.copy(t.center).sub(xl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Zf=0,un=new qt,_l=new Xe,Ki=new U,nn=new Cn,Bs=new Cn,Ue=new U,fe=class i extends Rn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Zf++}),this.uuid=zi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(yf(t)?js:Qs)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Yt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return un.makeRotationFromQuaternion(t),this.applyMatrix4(un),this}rotateX(t){return un.makeRotationX(t),this.applyMatrix4(un),this}rotateY(t){return un.makeRotationY(t),this.applyMatrix4(un),this}rotateZ(t){return un.makeRotationZ(t),this.applyMatrix4(un),this}translate(t,e,n){return un.makeTranslation(t,e,n),this.applyMatrix4(un),this}scale(t,e,n){return un.makeScale(t,e,n),this.applyMatrix4(un),this}lookAt(t){return _l.lookAt(t),_l.updateMatrix(),this.applyMatrix4(_l.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ki).negate(),this.translate(Ki.x,Ki.y,Ki.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new $t(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Gt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Cn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Wt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];nn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ue.addVectors(this.boundingBox.min,nn.min),this.boundingBox.expandByPoint(Ue),Ue.addVectors(this.boundingBox.max,nn.max),this.boundingBox.expandByPoint(Ue)):(this.boundingBox.expandByPoint(nn.min),this.boundingBox.expandByPoint(nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Wt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ci);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Wt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(t){let n=this.boundingSphere.center;if(nn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Bs.setFromBufferAttribute(a),this.morphTargetsRelative?(Ue.addVectors(nn.min,Bs.min),nn.expandByPoint(Ue),Ue.addVectors(nn.max,Bs.max),nn.expandByPoint(Ue)):(nn.expandByPoint(Bs.min),nn.expandByPoint(Bs.max))}nn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ue.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ue));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ue.fromBufferAttribute(a,c),l&&(Ki.fromBufferAttribute(t,c),Ue.add(Ki)),s=Math.max(s,n.distanceToSquared(Ue))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Wt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Wt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new ce(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[],c=new Uint8Array(n.count);for(let I=0;I<n.count;I++)a[I]=new U,l[I]=new U;let h=new U,u=new U,d=new U,f=new bt,p=new bt,y=new bt,m=new U,g=new U;function _(I,A,D){c[I]=c[A]=c[D]=1,h.fromBufferAttribute(n,I),u.fromBufferAttribute(n,A),d.fromBufferAttribute(n,D),f.fromBufferAttribute(r,I),p.fromBufferAttribute(r,A),y.fromBufferAttribute(r,D),u.sub(h),d.sub(h),p.sub(f),y.sub(f);let B=1/(p.x*y.y-y.x*p.y);isFinite(B)&&(m.copy(u).multiplyScalar(y.y).addScaledVector(d,-p.y).multiplyScalar(B),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-y.x).multiplyScalar(B),a[I].add(m),a[A].add(m),a[D].add(m),l[I].add(g),l[A].add(g),l[D].add(g))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let I=0,A=E.length;I<A;++I){let D=E[I],B=D.start,H=D.count;for(let L=B,k=B+H;L<k;L+=3)_(t.getX(L+0),t.getX(L+1),t.getX(L+2))}let v=new U,b=new U,T=new U,x=new U;function M(I){T.fromBufferAttribute(s,I),x.copy(T);let A=a[I];v.copy(A),v.sub(T.multiplyScalar(T.dot(A))).normalize(),b.crossVectors(x,A);let B=b.dot(l[I])<0?-1:1;o.setXYZW(I,v.x,v.y,v.z,B)}for(let I=0,A=n.count;I<A;++I)c[I]&&M(I);this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new ce(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let s=new U,r=new U,o=new U,a=new U,l=new U,c=new U,h=new U,u=new U;if(t)for(let d=0,f=t.count;d<f;d+=3){let p=t.getX(d+0),y=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,p),r.fromBufferAttribute(e,y),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ue.fromBufferAttribute(t,e),Ue.normalize(),t.setXYZ(e,Ue.x,Ue.y,Ue.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),f=0,p=0;for(let y=0,m=l.length;y<m;y++){a.isInterleavedBufferAttribute?f=l[y]*a.data.stride+a.offset:f=l[y]*h;for(let g=0;g<h;g++)d[p++]=c[f++]}return new ce(d,h,u)}if(this.index===null)return Gt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var yl=new U,Jf=new U,$f=new Yt,dn=class{constructor(t=new U(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=yl.subVectors(n,e).cross(Jf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(yl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||$f.getNormalMatrix(t),s=this.coplanarPoint(yl).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Kf=0,hi=class extends Rn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Kf++}),this.uuid=zi(),this.name="",this.type="Material",this.blending=ys,this.side=_i,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=kl,this.blendDst=Hl,this.blendEquation=Fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ut(0,0,0),this.blendAlpha=0,this.depthFunc=ss,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Iu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ho,this.stencilZFail=ho,this.stencilZPass=ho,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Gt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Gt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Ut().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new dn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new bt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new bt().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Gn=new U,vl=new U,Yr=new U,Zr=new U,wo=class{constructor(t=new U,e=new U(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Gn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Gn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Gn.copy(this.origin).addScaledVector(this.direction,e),Gn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){vl.copy(t).add(e).multiplyScalar(.5),Yr.copy(e).sub(t).normalize(),Zr.copy(this.origin).sub(vl);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Yr),a=Zr.dot(this.direction),l=-Zr.dot(Yr),c=Zr.lengthSq(),h=Math.abs(1-o*o),u,d,f,p;if(h>0)if(u=o*l-a,d=o*a-l,p=r*h,u>=0)if(d>=-p)if(d<=p){let y=1/h;u*=y,d*=y,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-p?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=p?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(vl).addScaledVector(Yr,d),f}intersectSphere(t,e){if(t.radius<0)return null;Gn.subVectors(t.center,this.origin);let n=Gn.dot(this.direction),s=Gn.dot(Gn)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Gn)!==null}intersectTriangle(t,e,n,s,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,h=a.z,u=t.x-o.x,d=t.y-o.y,f=t.z-o.z,p=e.x-o.x,y=e.y-o.y,m=e.z-o.z,g=n.x-o.x,_=n.y-o.y,E=n.z-o.z,v=Math.abs(l),b=Math.abs(c),T=Math.abs(h),x,M,I,A,D,B,H,L,k,Y,z,$;if(v>=b&&v>=T?(I=l,B=u,k=p,$=g,l>=0?(x=c,M=h,A=d,D=f,H=y,L=m,Y=_,z=E):(x=h,M=c,A=f,D=d,H=m,L=y,Y=E,z=_)):b>=T?(I=c,B=d,k=y,$=_,c>=0?(x=h,M=l,A=f,D=u,H=m,L=p,Y=E,z=g):(x=l,M=h,A=u,D=f,H=p,L=m,Y=g,z=E)):(I=h,B=f,k=m,$=E,h>=0?(x=l,M=c,A=u,D=d,H=p,L=y,Y=g,z=_):(x=c,M=l,A=d,D=u,H=y,L=p,Y=_,z=g)),I===0)return null;let P=x/I,X=M/I,C=1/I,J=A-P*B,Q=D-X*B,G=H-P*k,rt=L-X*k,at=Y-P*$,ot=z-X*$,st=at*rt-ot*G,Et=J*ot-Q*at,Zt=G*Q-rt*J;if(s){if(st<0||Et<0||Zt<0)return null}else if((st<0||Et<0||Zt<0)&&(st>0||Et>0||Zt>0))return null;let wt=st+Et+Zt;if(wt===0)return null;let Nt=C*(st*B+Et*k+Zt*$);return(wt>0?Nt<0:Nt>0)?null:this.at(Nt/wt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},pn=class extends hi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ut(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xn,this.combine=Gl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},zh=new qt,Ri=new wo,Jr=new ci,kh=new U,$r=new U,Kr=new U,Qr=new U,Ml=new U,jr=new U,Hh=new U,to=new U,ge=class extends Xe{constructor(t=new fe,e=new pn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){jr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(Ml.fromBufferAttribute(u,t),o?jr.addScaledVector(Ml,h):jr.addScaledVector(Ml.sub(e),h))}e.add(jr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Jr.copy(n.boundingSphere),Jr.applyMatrix4(r),Ri.copy(t.ray).recast(t.near),!(Jr.containsPoint(Ri.origin)===!1&&(Ri.intersectSphere(Jr,kh)===null||Ri.origin.distanceToSquared(kh)>(t.far-t.near)**2))&&(zh.copy(r).invert(),Ri.copy(t.ray).applyMatrix4(zh),!(n.boundingBox!==null&&Ri.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ri)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,y=d.length;p<y;p++){let m=d[p],g=o[m.materialIndex],_=Math.max(m.start,f.start),E=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let v=_,b=E;v<b;v+=3){let T=a.getX(v),x=a.getX(v+1),M=a.getX(v+2);s=eo(this,g,t,n,c,h,u,T,x,M),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let p=Math.max(0,f.start),y=Math.min(a.count,f.start+f.count);for(let m=p,g=y;m<g;m+=3){let _=a.getX(m),E=a.getX(m+1),v=a.getX(m+2);s=eo(this,o,t,n,c,h,u,_,E,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,y=d.length;p<y;p++){let m=d[p],g=o[m.materialIndex],_=Math.max(m.start,f.start),E=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let v=_,b=E;v<b;v+=3){let T=v,x=v+1,M=v+2;s=eo(this,g,t,n,c,h,u,T,x,M),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let p=Math.max(0,f.start),y=Math.min(l.count,f.start+f.count);for(let m=p,g=y;m<g;m+=3){let _=m,E=m+1,v=m+2;s=eo(this,o,t,n,c,h,u,_,E,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function Qf(i,t,e,n,s,r,o,a){let l;if(t.side===Ye?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===_i,a),l===null)return null;to.copy(a),to.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(to);return c<e.near||c>e.far?null:{distance:c,point:to.clone(),object:i}}function eo(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,$r),i.getVertexPosition(l,Kr),i.getVertexPosition(c,Qr);let h=Qf(i,t,e,n,$r,Kr,Qr,Hh);if(h){let u=new U;ai.getBarycoord(Hh,$r,Kr,Qr,u),s&&(h.uv=ai.getInterpolatedAttribute(s,a,l,c,u,new bt)),r&&(h.uv1=ai.getInterpolatedAttribute(r,a,l,c,u,new bt)),o&&(h.normal=ai.getInterpolatedAttribute(o,a,l,c,u,new U),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new U,materialIndex:0};ai.getNormal($r,Kr,Qr,d.normal),h.face=d,h.barycoord=u}return h}var tr=class extends We{constructor(t=null,e=1,n=1,s,r,o,a,l,c=Oe,h=Oe,u,d){super(null,o,a,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var er=class extends ce{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Qi=new qt,Gh=new qt,no=[],Vh=new Cn,jf=new qt,zs=new ge,ks=new ci,mn=class extends ge{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new er(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,jf)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Cn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Qi),Vh.copy(t.boundingBox).applyMatrix4(Qi),this.boundingBox.union(Vh)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new ci),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Qi),ks.copy(t.boundingSphere).applyMatrix4(Qi),this.boundingSphere.union(ks)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),this.morphTexture=t.morphTexture!==null?t.morphTexture.clone():null,this.instanceColor=t.instanceColor!==null?t.instanceColor.clone():null,this.count=t.count,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(zs.geometry=this.geometry,zs.material=this.material,zs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ks.copy(this.boundingSphere),ks.applyMatrix4(n),t.ray.intersectsSphere(ks)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Qi),Gh.multiplyMatrices(n,Qi),zs.matrixWorld=Gh,zs.raycast(t,no);for(let o=0,a=no.length;o<a;o++){let l=no[o];l.instanceId=r,l.object=this,e.push(l)}no.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new er(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new tr(new Float32Array(s*this.count),s,this.count,ea,gn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;return r[l]=a,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ci=new ci,tp=new bt(.5,.5),io=new U,ui=class{constructor(t=new dn,e=new dn,n=new dn,s=new dn,r=new dn,o=new dn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=fn,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],p=r[8],y=r[9],m=r[10],g=r[11],_=r[12],E=r[13],v=r[14],b=r[15];if(s[0].setComponents(c-o,f-h,g-p,b-_).normalize(),s[1].setComponents(c+o,f+h,g+p,b+_).normalize(),s[2].setComponents(c+a,f+u,g+y,b+E).normalize(),s[3].setComponents(c-a,f-u,g-y,b-E).normalize(),n)s[4].setComponents(l,d,m,v).normalize(),s[5].setComponents(c-l,f-d,g-m,b-v).normalize();else if(s[4].setComponents(c-l,f-d,g-m,b-v).normalize(),e===fn)s[5].setComponents(c+l,f+d,g+m,b+v).normalize();else if(e===rs)s[5].setComponents(l,d,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ci.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ci.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ci)}intersectsSprite(t){Ci.center.set(0,0,0);let e=tp.distanceTo(t.center);return Ci.radius=.7071067811865476+e,Ci.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ci)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(io.x=s.normal.x>0?t.max.x:t.min.x,io.y=s.normal.y>0?t.max.y:t.min.y,io.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(io)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Wh=new qt,To=class i{constructor(){this.coordinateSystem=fn,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,n=this._frustums;for(let s=0;s<e.length;s++){let r=e[s];Wh.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new ui),n[s].setFromProjectionMatrix(Wh,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,n=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new ui),e[s].copy(n[s]);return this._count=t._count,this}clone(){return new i().copy(this)}};var nr=class extends We{constructor(t=[],e=Oi,n,s,r,o,a,l,c,h){super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},di=class extends We{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var qn=class extends We{constructor(t,e,n=Sn,s,r,o,a=Oe,l=Oe,c,h=Wn,u=1){if(h!==Wn&&h!==$n)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:t,height:e,depth:u};super(d,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new cs(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},ir=class extends qn{constructor(t,e=Sn,n=Oi,s,r,o=Oe,a=Oe,l,c=Wn){let h={width:t,height:t,depth:1},u=[h,h,h,h,h,h];super(t,t,e,n,s,r,o,a,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},sr=class extends We{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Vt=class i extends fe{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,f=0;p("z","y","x",-1,-1,n,e,t,o,r,0),p("z","y","x",1,-1,n,e,-t,o,r,1),p("x","z","y",1,1,t,n,e,s,o,2),p("x","z","y",1,-1,t,n,-e,s,o,3),p("x","y","z",1,-1,t,e,n,s,r,4),p("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new $t(c,3)),this.setAttribute("normal",new $t(h,3)),this.setAttribute("uv",new $t(u,2));function p(y,m,g,_,E,v,b,T,x,M,I){let A=v/x,D=b/M,B=v/2,H=b/2,L=T/2,k=x+1,Y=M+1,z=0,$=0,P=new U;for(let X=0;X<Y;X++){let C=X*D-H;for(let J=0;J<k;J++){let Q=J*A-B;P[y]=Q*_,P[m]=C*E,P[g]=L,c.push(P.x,P.y,P.z),P[y]=0,P[m]=0,P[g]=T>0?1:-1,h.push(P.x,P.y,P.z),u.push(J/x),u.push(1-X/M),z+=1}}for(let X=0;X<M;X++)for(let C=0;C<x;C++){let J=d+C+k*X,Q=d+C+k*(X+1),G=d+(C+1)+k*(X+1),rt=d+(C+1)+k*X;l.push(J,Q,rt),l.push(Q,G,rt),$+=6}a.addGroup(f,$,I),f+=$,d+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Ii=class i extends fe{constructor(t=1,e=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:n,radialSegments:s,heightSegments:r},e=Math.max(0,e),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let o=[],a=[],l=[],c=[],h=e/2,u=Math.PI/2*t,d=e,f=2*u+d,p=n*2+r,y=s+1,m=new U,g=new U;for(let _=0;_<=p;_++){let E=0,v=0,b=0,T=0;if(_<=n){let I=_/n,A=I*Math.PI/2;v=-h-t*Math.cos(A),b=t*Math.sin(A),T=-t*Math.cos(A),E=I*u}else if(_<=n+r){let I=(_-n)/r;v=-h+I*e,b=t,T=0,E=u+I*d}else{let I=(_-n-r)/n,A=I*Math.PI/2;v=h+t*Math.sin(A),b=t*Math.cos(A),T=t*Math.sin(A),E=u+d+I*u}let x=Math.max(0,Math.min(1,E/f)),M=0;_===0?M=.5/s:_===p&&(M=-.5/s);for(let I=0;I<=s;I++){let A=I/s,D=A*Math.PI*2,B=Math.sin(D),H=Math.cos(D);g.x=-b*H,g.y=v,g.z=b*B,a.push(g.x,g.y,g.z),m.set(-b*H,T,b*B),m.normalize(),l.push(m.x,m.y,m.z),c.push(A+M,x)}if(_>0){let I=(_-1)*y;for(let A=0;A<s;A++){let D=I+A,B=I+A+1,H=_*y+A,L=_*y+A+1;o.push(D,B,H),o.push(B,L,H)}}}this.setIndex(o),this.setAttribute("position",new $t(a,3)),this.setAttribute("normal",new $t(l,3)),this.setAttribute("uv",new $t(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}};var we=class i extends fe{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],d=[],f=[],p=0,y=[],m=n/2,g=0;_(),o===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new $t(u,3)),this.setAttribute("normal",new $t(d,3)),this.setAttribute("uv",new $t(f,2));function _(){let v=new U,b=new U,T=0,x=(e-t)/n;for(let M=0;M<=r;M++){let I=[],A=M/r,D=A*(e-t)+t;for(let B=0;B<=s;B++){let H=B/s,L=H*l+a,k=Math.sin(L),Y=Math.cos(L);b.x=D*k,b.y=-A*n+m,b.z=D*Y,u.push(b.x,b.y,b.z),v.set(k,x,Y).normalize(),d.push(v.x,v.y,v.z),f.push(H,1-A),I.push(p++)}y.push(I)}for(let M=0;M<s;M++)for(let I=0;I<r;I++){let A=y[I][M],D=y[I+1][M],B=y[I+1][M+1],H=y[I][M+1];(t>0||I!==0)&&(h.push(A,D,H),T+=3),(e>0||I!==r-1)&&(h.push(D,B,H),T+=3)}c.addGroup(g,T,0),g+=T}function E(v){let b=p,T=new bt,x=new U,M=0,I=v===!0?t:e,A=v===!0?1:-1;for(let B=1;B<=s;B++)u.push(0,m*A,0),d.push(0,A,0),f.push(.5,.5),p++;let D=p;for(let B=0;B<=s;B++){let L=B/s*l+a,k=Math.cos(L),Y=Math.sin(L);x.x=I*Y,x.y=m*A,x.z=I*k,u.push(x.x,x.y,x.z),d.push(0,A,0),T.x=k*.5+.5,T.y=Y*.5*A+.5,f.push(T.x,T.y),p++}for(let B=0;B<s;B++){let H=b+B,L=D+B;v===!0?h.push(L,L+1,H):h.push(L+1,L,H),M+=3}c.addGroup(g,M,v===!0?1:2),g+=M}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var Ao=class i extends fe{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],o=[];a(s),c(n),h(),this.setAttribute("position",new $t(r,3)),this.setAttribute("normal",new $t(r.slice(),3)),this.setAttribute("uv",new $t(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(_){let E=new U,v=new U,b=new U;for(let T=0;T<e.length;T+=3)f(e[T+0],E),f(e[T+1],v),f(e[T+2],b),l(E,v,b,_)}function l(_,E,v,b){let T=b+1,x=[];for(let M=0;M<=T;M++){x[M]=[];let I=_.clone().lerp(v,M/T),A=E.clone().lerp(v,M/T),D=T-M;for(let B=0;B<=D;B++)B===0&&M===T?x[M][B]=I:x[M][B]=I.clone().lerp(A,B/D)}for(let M=0;M<T;M++)for(let I=0;I<2*(T-M)-1;I++){let A=Math.floor(I/2);I%2===0?(d(x[M][A+1]),d(x[M+1][A]),d(x[M][A])):(d(x[M][A+1]),d(x[M+1][A+1]),d(x[M+1][A]))}}function c(_){let E=new U;for(let v=0;v<r.length;v+=3)E.x=r[v+0],E.y=r[v+1],E.z=r[v+2],E.normalize().multiplyScalar(_),r[v+0]=E.x,r[v+1]=E.y,r[v+2]=E.z}function h(){let _=new U;for(let E=0;E<r.length;E+=3){_.x=r[E+0],_.y=r[E+1],_.z=r[E+2];let v=m(_)/2/Math.PI+.5,b=g(_)/Math.PI+.5;o.push(v,1-b)}p(),u()}function u(){for(let _=0;_<o.length;_+=6){let E=o[_+0],v=o[_+2],b=o[_+4],T=Math.max(E,v,b),x=Math.min(E,v,b);T>.9&&x<.1&&(E<.2&&(o[_+0]+=1),v<.2&&(o[_+2]+=1),b<.2&&(o[_+4]+=1))}}function d(_){r.push(_.x,_.y,_.z)}function f(_,E){let v=_*3;E.x=t[v+0],E.y=t[v+1],E.z=t[v+2]}function p(){let _=new U,E=new U,v=new U,b=new U,T=new bt,x=new bt,M=new bt;for(let I=0,A=0;I<r.length;I+=9,A+=6){_.set(r[I+0],r[I+1],r[I+2]),E.set(r[I+3],r[I+4],r[I+5]),v.set(r[I+6],r[I+7],r[I+8]),T.set(o[A+0],o[A+1]),x.set(o[A+2],o[A+3]),M.set(o[A+4],o[A+5]),b.copy(_).add(E).add(v).divideScalar(3);let D=m(b);y(T,A+0,_,D),y(x,A+2,E,D),y(M,A+4,v,D)}}function y(_,E,v,b){b<0&&_.x===1&&(o[E]=_.x-1),v.x===0&&v.z===0&&(o[E]=b/2/Math.PI+.5)}function m(_){return Math.atan2(_.z,-_.x)}function g(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.detail)}};var rn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Gt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);let h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new bt:new U);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new U,s=[],r=[],o=[],a=new U,l=new qt;for(let f=0;f<=t;f++){let p=f/t;s[f]=this.getTangentAt(p,new U)}r[0]=new U,o[0]=new U;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let p=Math.acos(ie(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,p))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(ie(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let p=1;p<=t;p++)r[p].applyMatrix4(l.makeRotationAxis(s[p],f*p)),o[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}},fs=class extends rn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new bt){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Ro=class extends fs{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function hc(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}var Xh=new U,qh=new U,Sl=new hc,bl=new hc,El=new hc,Co=class extends rn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new U){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(qh.subVectors(s[0],s[1]).add(s[0]),c=qh);let u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Xh.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Xh),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,p=Math.pow(c.distanceToSquared(u),f),y=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);y<1e-4&&(y=1),p<1e-4&&(p=y),m<1e-4&&(m=y),Sl.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,p,y,m),bl.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,p,y,m),El.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,p,y,m)}else this.curveType==="catmullrom"&&(Sl.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),bl.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),El.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Sl.calc(l),bl.calc(l),El.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new U().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Yh(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function ep(i,t){let e=1-i;return e*e*t}function np(i,t){return 2*(1-i)*i*t}function ip(i,t){return i*i*t}function Xs(i,t,e,n){return ep(i,t)+np(i,e)+ip(i,n)}function sp(i,t){let e=1-i;return e*e*e*t}function rp(i,t){let e=1-i;return 3*e*e*i*t}function op(i,t){return 3*(1-i)*i*i*t}function ap(i,t){return i*i*i*t}function qs(i,t,e,n,s){return sp(i,t)+rp(i,e)+op(i,n)+ap(i,s)}var rr=class extends rn{constructor(t=new bt,e=new bt,n=new bt,s=new bt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new bt){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(qs(t,s.x,r.x,o.x,a.x),qs(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Po=class extends rn{constructor(t=new U,e=new U,n=new U,s=new U){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new U){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(qs(t,s.x,r.x,o.x,a.x),qs(t,s.y,r.y,o.y,a.y),qs(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},or=class extends rn{constructor(t=new bt,e=new bt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new bt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new bt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Io=class extends rn{constructor(t=new U,e=new U){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new U){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new U){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ar=class extends rn{constructor(t=new bt,e=new bt,n=new bt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new bt){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Xs(t,s.x,r.x,o.x),Xs(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Lo=class extends rn{constructor(t=new U,e=new U,n=new U){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new U){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Xs(t,s.x,r.x,o.x),Xs(t,s.y,r.y,o.y),Xs(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},lr=class extends rn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new bt){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(Yh(a,l.x,c.x,h.x,u.x),Yh(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new bt().fromArray(s))}return this}},Pl=Object.freeze({__proto__:null,ArcCurve:Ro,CatmullRomCurve3:Co,CubicBezierCurve:rr,CubicBezierCurve3:Po,EllipseCurve:fs,LineCurve:or,LineCurve3:Io,QuadraticBezierCurve:ar,QuadraticBezierCurve3:Lo,SplineCurve:lr}),Do=class extends rn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Pl[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this.cacheLengths=null,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new Pl[s.type]().fromJSON(s))}return this.cacheLengths=null,this}},cr=class extends Do{constructor(t){super(),this.type="Path",this.currentPoint=new bt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new or(this.currentPoint.clone(),new bt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new ar(this.currentPoint.clone(),new bt(t,e),new bt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new rr(this.currentPoint.clone(),new bt(t,e),new bt(n,s),new bt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new lr(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,o,a,l),this}absellipse(t,e,n,s,r,o,a,l){let c=new fs(t,e,n,s,r,o,a,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Yn=class extends cr{constructor(t){super(t),this.uuid=zi(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new cr().fromJSON(s))}return this}};function lp(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=Xu(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=fp(i,t,r,e)),i.length>80*e){a=i[0],l=i[1];let h=a,u=l;for(let d=e;d<s;d+=e){let f=i[d],p=i[d+1];f<a&&(a=f),p<l&&(l=p),f>h&&(h=f),p>u&&(u=p)}c=Math.max(h-a,u-l),c=c!==0?32767/c:0}return hr(r,o,e,a,l,c,0),o}function Xu(i,t,e,n,s){let r;if(s===Ep(i,t,e,n)>0)for(let o=t;o<e;o+=n)r=Zh(o/n|0,i[o],i[o+1],r);else for(let o=e-n;o>=t;o-=n)r=Zh(o/n|0,i[o],i[o+1],r);return r&&ps(r,r.next)&&(dr(r),r=r.next),r}function Li(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(ps(e,e.next)||Se(e.prev,e,e.next)===0)){if(dr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function hr(i,t,e,n,s,r,o){if(!i)return;!o&&r&&_p(i,n,s,r);let a=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?hp(i,n,s,r):cp(i)){t.push(l.i,i.i,c.i),dr(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=up(Li(i),t),hr(i,t,e,n,s,r,2)):o===2&&dp(i,t,e,n,s,r):hr(Li(i),t,e,n,s,r,1);break}}}function cp(i){let t=i.prev,e=i,n=i.next;if(Se(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=Math.min(s,r,o),u=Math.min(a,l,c),d=Math.max(s,r,o),f=Math.max(a,l,c),p=n.next;for(;p!==t;){if(p.x>=h&&p.x<=d&&p.y>=u&&p.y<=f&&Hs(s,a,r,l,o,c,p.x,p.y)&&Se(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function hp(i,t,e,n){let s=i.prev,r=i,o=i.next;if(Se(s,r,o)>=0)return!1;let a=s.x,l=r.x,c=o.x,h=s.y,u=r.y,d=o.y,f=Math.min(a,l,c),p=Math.min(h,u,d),y=Math.max(a,l,c),m=Math.max(h,u,d),g=Il(f,p,t,e,n),_=Il(y,m,t,e,n),E=i.prevZ,v=i.nextZ;for(;E&&E.z>=g&&v&&v.z<=_;){if(E.x>=f&&E.x<=y&&E.y>=p&&E.y<=m&&E!==s&&E!==o&&Hs(a,h,l,u,c,d,E.x,E.y)&&Se(E.prev,E,E.next)>=0||(E=E.prevZ,v.x>=f&&v.x<=y&&v.y>=p&&v.y<=m&&v!==s&&v!==o&&Hs(a,h,l,u,c,d,v.x,v.y)&&Se(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;E&&E.z>=g;){if(E.x>=f&&E.x<=y&&E.y>=p&&E.y<=m&&E!==s&&E!==o&&Hs(a,h,l,u,c,d,E.x,E.y)&&Se(E.prev,E,E.next)>=0)return!1;E=E.prevZ}for(;v&&v.z<=_;){if(v.x>=f&&v.x<=y&&v.y>=p&&v.y<=m&&v!==s&&v!==o&&Hs(a,h,l,u,c,d,v.x,v.y)&&Se(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function up(i,t){let e=i;do{let n=e.prev,s=e.next.next;!ps(n,s)&&Yu(n,e,e.next,s)&&ur(n,s)&&ur(s,n)&&(t.push(n.i,e.i,s.i),dr(e),dr(e.next),e=i=s),e=e.next}while(e!==i);return Li(e)}function dp(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Mp(o,a)){let l=Zu(o,a);o=Li(o,o.next),l=Li(l,l.next),hr(o,t,e,n,s,r,0),hr(l,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function fp(i,t,e,n){let s=[];for(let r=0,o=t.length;r<o;r++){let a=t[r]*n,l=r<o-1?t[r+1]*n:i.length,c=Xu(i,a,l,n,!1);c===c.next&&(c.steiner=!0),s.push(vp(c))}s.sort(pp);for(let r=0;r<s.length;r++)e=mp(s[r],e);return e}function pp(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function mp(i,t){let e=gp(i,t);if(!e)return t;let n=Zu(e,i);return Li(n,n.next),Li(e,e.next)}function gp(i,t){let e=t,n=i.x,s=i.y,r=-1/0,o;if(ps(i,e))return e;do{if(ps(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let u=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,o=e.x<e.next.x?e:e.next,u===n))return o}e=e.next}while(e!==t);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;e=o;do{if(n>=e.x&&e.x>=l&&n!==e.x&&qu(s<c?n:r,s,l,c,s<c?r:n,s,e.x,e.y)){let u=Math.abs(s-e.y)/(n-e.x);ur(e,i)&&(u<h||u===h&&(e.x>o.x||e.x===o.x&&xp(o,e)))&&(o=e,h=u)}e=e.next}while(e!==a);return o}function xp(i,t){return Se(i.prev,i,t.prev)<0&&Se(t.next,i,i.next)<0}function _p(i,t,e,n){let s=i;do s.z===0&&(s.z=Il(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,yp(s)}function yp(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let c=0;c<e&&(a++,o=o.nextZ,!!o);c++);let l=e;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,e*=2}while(t>1);return i}function Il(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function vp(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function qu(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function Hs(i,t,e,n,s,r,o,a){return!(i===o&&t===a)&&qu(i,t,e,n,s,r,o,a)}function Mp(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!Sp(i,t)&&(ur(i,t)&&ur(t,i)&&bp(i,t)&&(Se(i.prev,i,t.prev)||Se(i,t.prev,t))||ps(i,t)&&Se(i.prev,i,i.next)>0&&Se(t.prev,t,t.next)>0)}function Se(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function ps(i,t){return i.x===t.x&&i.y===t.y}function Yu(i,t,e,n){let s=ro(Se(i,t,e)),r=ro(Se(i,t,n)),o=ro(Se(e,n,i)),a=ro(Se(e,n,t));return!!(s!==r&&o!==a||s===0&&so(i,e,t)||r===0&&so(i,n,t)||o===0&&so(e,i,n)||a===0&&so(e,t,n))}function so(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function ro(i){return i>0?1:i<0?-1:0}function Sp(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Yu(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function ur(i,t){return Se(i.prev,i,i.next)<0?Se(i,t,i.next)>=0&&Se(i,i.prev,t)>=0:Se(i,t,i.prev)<0||Se(i,i.next,t)<0}function bp(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Zu(i,t){let e=Ll(i.i,i.x,i.y),n=Ll(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Zh(i,t,e,n){let s=Ll(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function dr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Ll(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Ep(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Dl=class{static triangulate(t,e,n=2){return lp(t,e,n)}},Pi=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];Jh(t),$h(n,t);let o=t.length;e.forEach(Jh);for(let l=0;l<e.length;l++)s.push(o),o+=e[l].length,$h(n,e[l]);let a=Dl.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function Jh(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function $h(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var fi=class i extends fe{constructor(t=new Yn([new bt(.5,.5),new bt(-.5,.5),new bt(-.5,-.5),new bt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let a=0,l=t.length;a<l;a++){let c=t[a];o(c)}this.setAttribute("position",new $t(s,3)),this.setAttribute("uv",new $t(r,2)),this.computeVertexNormals();function o(a){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1,d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,p=e.bevelSize!==void 0?e.bevelSize:f-.1,y=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3,g=e.extrudePath,_=e.UVGenerator!==void 0?e.UVGenerator:wp,E,v=!1,b,T,x,M;if(g){E=g.getSpacedPoints(h),v=!0,d=!1;let tt=g.isCatmullRomCurve3?g.closed:!1;b=g.computeFrenetFrames(h,tt),T=new U,x=new U,M=new U}d||(m=0,f=0,p=0,y=0);let I=a.extractPoints(c),A=I.shape,D=I.holes;if(!Pi.isClockWise(A)){A=A.reverse();for(let tt=0,ct=D.length;tt<ct;tt++){let ut=D[tt];Pi.isClockWise(ut)&&(D[tt]=ut.reverse())}}function H(tt){let ut=10000000000000001e-36,St=tt[0];for(let dt=1;dt<=tt.length;dt++){let Ht=dt%tt.length,Ct=tt[Ht],Qt=Ct.x-St.x,jt=Ct.y-St.y,ae=Qt*Qt+jt*jt,O=Math.max(Math.abs(Ct.x),Math.abs(Ct.y),Math.abs(St.x),Math.abs(St.y)),Te=ut*O*O;if(ae<=Te){tt.splice(Ht,1),dt--;continue}St=Ct}}H(A),D.forEach(H);let L=D.length,k=A;for(let tt=0;tt<L;tt++){let ct=D[tt];A=A.concat(ct)}function Y(tt,ct,ut){return ct||Wt("ExtrudeGeometry: vec does not exist"),tt.clone().addScaledVector(ct,ut)}let z=A.length;function $(tt,ct,ut){let St,dt,Ht,Ct=tt.x-ct.x,Qt=tt.y-ct.y,jt=ut.x-tt.x,ae=ut.y-tt.y,O=Ct*Ct+Qt*Qt,Te=Ct*ae-Qt*jt;if(Math.abs(Te)>Number.EPSILON){let ne=Math.sqrt(O),pe=Math.sqrt(jt*jt+ae*ae),yt=ct.x-Qt/ne,be=ct.y+Ct/ne,kt=ut.x-ae/pe,Xt=ut.y+jt/pe,R=((kt-yt)*ae-(Xt-be)*jt)/(Ct*ae-Qt*jt);St=yt+Ct*R-tt.x,dt=be+Qt*R-tt.y;let S=St*St+dt*dt;if(S<=2)return new bt(St,dt);Ht=Math.sqrt(S/2)}else{let ne=!1;Ct>Number.EPSILON?jt>Number.EPSILON&&(ne=!0):Ct<-Number.EPSILON?jt<-Number.EPSILON&&(ne=!0):Math.sign(Qt)===Math.sign(ae)&&(ne=!0),ne?(St=-Qt,dt=Ct,Ht=Math.sqrt(O)):(St=Ct,dt=Qt,Ht=Math.sqrt(O/2))}return new bt(St/Ht,dt/Ht)}let P=[];for(let tt=0,ct=k.length,ut=ct-1,St=tt+1;tt<ct;tt++,ut++,St++)ut===ct&&(ut=0),St===ct&&(St=0),P[tt]=$(k[tt],k[ut],k[St]);let X=[],C,J=P.concat();for(let tt=0,ct=L;tt<ct;tt++){let ut=D[tt];C=[];for(let St=0,dt=ut.length,Ht=dt-1,Ct=St+1;St<dt;St++,Ht++,Ct++)Ht===dt&&(Ht=0),Ct===dt&&(Ct=0),C[St]=$(ut[St],ut[Ht],ut[Ct]);X.push(C),J=J.concat(C)}let Q;if(m===0)Q=Pi.triangulateShape(k,D);else{let tt=[],ct=[];for(let ut=0;ut<m;ut++){let St=ut/m,dt=f*Math.cos(St*Math.PI/2),Ht=p*Math.sin(St*Math.PI/2)+y;for(let Ct=0,Qt=k.length;Ct<Qt;Ct++){let jt=Y(k[Ct],P[Ct],Ht);Et(jt.x,jt.y,-dt),St===0&&tt.push(jt)}for(let Ct=0,Qt=L;Ct<Qt;Ct++){let jt=D[Ct];C=X[Ct];let ae=[];for(let O=0,Te=jt.length;O<Te;O++){let ne=Y(jt[O],C[O],Ht);Et(ne.x,ne.y,-dt),St===0&&ae.push(ne)}St===0&&ct.push(ae)}}Q=Pi.triangulateShape(tt,ct)}let G=Q.length,rt=p+y;for(let tt=0;tt<z;tt++){let ct=d?Y(A[tt],J[tt],rt):A[tt];v?(x.copy(b.normals[0]).multiplyScalar(ct.x),T.copy(b.binormals[0]).multiplyScalar(ct.y),M.copy(E[0]).add(x).add(T),Et(M.x,M.y,M.z)):Et(ct.x,ct.y,0)}for(let tt=1;tt<=h;tt++)for(let ct=0;ct<z;ct++){let ut=d?Y(A[ct],J[ct],rt):A[ct];v?(x.copy(b.normals[tt]).multiplyScalar(ut.x),T.copy(b.binormals[tt]).multiplyScalar(ut.y),M.copy(E[tt]).add(x).add(T),Et(M.x,M.y,M.z)):Et(ut.x,ut.y,u/h*tt)}for(let tt=m-1;tt>=0;tt--){let ct=tt/m,ut=f*Math.cos(ct*Math.PI/2),St=p*Math.sin(ct*Math.PI/2)+y;for(let dt=0,Ht=k.length;dt<Ht;dt++){let Ct=Y(k[dt],P[dt],St);Et(Ct.x,Ct.y,u+ut)}for(let dt=0,Ht=D.length;dt<Ht;dt++){let Ct=D[dt];C=X[dt];for(let Qt=0,jt=Ct.length;Qt<jt;Qt++){let ae=Y(Ct[Qt],C[Qt],St);v?Et(ae.x,ae.y+E[h-1].y,E[h-1].x+ut):Et(ae.x,ae.y,u+ut)}}}at(),ot();function at(){let tt=s.length/3;if(d){let ct=0,ut=z*ct;for(let St=0;St<G;St++){let dt=Q[St];Zt(dt[2]+ut,dt[1]+ut,dt[0]+ut)}ct=h+m*2,ut=z*ct;for(let St=0;St<G;St++){let dt=Q[St];Zt(dt[0]+ut,dt[1]+ut,dt[2]+ut)}}else{for(let ct=0;ct<G;ct++){let ut=Q[ct];Zt(ut[2],ut[1],ut[0])}for(let ct=0;ct<G;ct++){let ut=Q[ct];Zt(ut[0]+z*h,ut[1]+z*h,ut[2]+z*h)}}n.addGroup(tt,s.length/3-tt,0)}function ot(){let tt=s.length/3,ct=0;st(k,ct),ct+=k.length;for(let ut=0,St=D.length;ut<St;ut++){let dt=D[ut];st(dt,ct),ct+=dt.length}n.addGroup(tt,s.length/3-tt,1)}function st(tt,ct){let ut=tt.length;for(;--ut>=0;){let St=ut,dt=ut-1;dt<0&&(dt=tt.length-1);for(let Ht=0,Ct=h+m*2;Ht<Ct;Ht++){let Qt=z*Ht,jt=z*(Ht+1),ae=ct+St+Qt,O=ct+dt+Qt,Te=ct+dt+jt,ne=ct+St+jt;wt(ae,O,Te,ne)}}}function Et(tt,ct,ut){l.push(tt),l.push(ct),l.push(ut)}function Zt(tt,ct,ut){Nt(tt),Nt(ct),Nt(ut);let St=s.length/3,dt=_.generateTopUV(n,s,St-3,St-2,St-1);Ot(dt[0]),Ot(dt[1]),Ot(dt[2])}function wt(tt,ct,ut,St){Nt(tt),Nt(ct),Nt(St),Nt(ct),Nt(ut),Nt(St);let dt=s.length/3,Ht=_.generateSideWallUV(n,s,dt-6,dt-3,dt-2,dt-1);Ot(Ht[0]),Ot(Ht[1]),Ot(Ht[3]),Ot(Ht[1]),Ot(Ht[2]),Ot(Ht[3])}function Nt(tt){s.push(l[tt*3+0]),s.push(l[tt*3+1]),s.push(l[tt*3+2])}function Ot(tt){r.push(tt.x),r.push(tt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Tp(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];n.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Pl[s.type]().fromJSON(s)),new i(n,t.options)}},wp={generateTopUV:function(i,t,e,n,s){let r=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new bt(r,o),new bt(a,l),new bt(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){let o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[s*3],f=t[s*3+1],p=t[s*3+2],y=t[r*3],m=t[r*3+1],g=t[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new bt(o,1-l),new bt(c,1-u),new bt(d,1-p),new bt(y,1-g)]:[new bt(a,1-l),new bt(h,1-u),new bt(f,1-p),new bt(m,1-g)]}};function Tp(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var pi=class i extends Ao{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var qe=class i extends fe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=t/a,d=e/l,f=[],p=[],y=[],m=[];for(let g=0;g<h;g++){let _=g*d-o;for(let E=0;E<c;E++){let v=E*u-r;p.push(v,-_,0),y.push(0,0,1),m.push(E/a),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let _=0;_<a;_++){let E=_+c*g,v=_+c*(g+1),b=_+1+c*(g+1),T=_+1+c*g;f.push(E,v,T),f.push(v,b,T)}this.setIndex(f),this.setAttribute("position",new $t(p,3)),this.setAttribute("normal",new $t(y,3)),this.setAttribute("uv",new $t(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var Zn=class i extends fe{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new U,d=new U,f=[],p=[],y=[],m=[];for(let g=0;g<=n;g++){let _=[],E=g/n,v=o+E*a,b=t*Math.cos(v),T=Math.sqrt(t*t-b*b),x=0;g===0&&o===0?x=.5/e:g===n&&l===Math.PI&&(x=-.5/e);for(let M=0;M<=e;M++){let I=M/e,A=s+I*r;u.x=-T*Math.cos(A),u.y=b,u.z=T*Math.sin(A),p.push(u.x,u.y,u.z),d.copy(u).normalize(),y.push(d.x,d.y,d.z),m.push(I+x,1-E),_.push(c++)}h.push(_)}for(let g=0;g<n;g++)for(let _=0;_<e;_++){let E=h[g][_+1],v=h[g][_],b=h[g+1][_],T=h[g+1][_+1];(g!==0||o>0)&&f.push(E,v,T),(g!==n-1||l<Math.PI)&&f.push(v,b,T)}this.setIndex(f),this.setAttribute("position",new $t(p,3)),this.setAttribute("normal",new $t(y,3)),this.setAttribute("uv",new $t(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Pn=class i extends fe{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),s=Math.floor(s);let l=[],c=[],h=[],u=[],d=new U,f=new U,p=new U;for(let y=0;y<=n;y++){let m=o+y/n*a;for(let g=0;g<=s;g++){let _=g/s*r;f.x=(t+e*Math.cos(m))*Math.cos(_),f.y=(t+e*Math.cos(m))*Math.sin(_),f.z=e*Math.sin(m),c.push(f.x,f.y,f.z),d.x=t*Math.cos(_),d.y=t*Math.sin(_),p.subVectors(f,d).normalize(),h.push(p.x,p.y,p.z),u.push(g/s),u.push(y/n)}}for(let y=1;y<=n;y++)for(let m=1;m<=s;m++){let g=(s+1)*y+m-1,_=(s+1)*(y-1)+m-1,E=(s+1)*(y-1)+m,v=(s+1)*y+m;l.push(g,_,v),l.push(_,E,v)}this.setIndex(l),this.setAttribute("position",new $t(c,3)),this.setAttribute("normal",new $t(h,3)),this.setAttribute("uv",new $t(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function ki(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(Kh(s))s.isRenderTargetTexture?(Gt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(Kh(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Ze(i){let t={};for(let e=0;e<i.length;e++){let n=ki(i[e]);for(let s in n)t[s]=n[s]}return t}function Kh(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Ap(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function uc(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:oe.workingColorSpace}var Ju={clone:ki,merge:Ze},Rp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Cp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,In=class extends hi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Rp,this.fragmentShader=Cp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ki(t.uniforms),this.uniformsGroups=Ap(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Ut().setHex(s.value);break;case"v2":this.uniforms[n].value=new bt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new U().fromArray(s.value);break;case"v4":this.uniforms[n].value=new _e().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Yt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new qt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},No=class extends In{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Ce=class extends hi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ut(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ut(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ua,this.normalScale=new bt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Uo=class extends hi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Cu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Fo=class extends hi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function ji(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function oo(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var mi=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];t:{e:{let o;n:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break e}o=e.length;break n}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break e}o=n,n=0;break n}break t}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Oo=class extends mi{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Al,endingEnd:Al}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Rl:r=t,a=2*e-n;break;case Cl:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Rl:o=t,l=2*n-e;break;case Cl:o=1,l=n+s[1]-s[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-e)/(s-e),y=p*p,m=y*p,g=-d*m+2*d*y-d*p,_=(1+d)*m+(-1.5-2*d)*y+(-.5+d)*p+1,E=(-1-f)*m+(1.5+f)*y+.5*p,v=f*m-f*y;for(let b=0;b!==a;++b)r[b]=g*o[h+b]+_*o[c+b]+E*o[l+b]+v*o[u+b];return r}},Bo=class extends mi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(s-e),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}},zo=class extends mi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},ko=class extends mi{interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this.inTangents,u=this.outTangents;if(!h||!u){let p=(n-e)/(s-e),y=1-p;for(let m=0;m!==a;++m)r[m]=o[c+m]*y+o[l+m]*p;return r}let d=a*2,f=t-1;for(let p=0;p!==a;++p){let y=o[c+p],m=o[l+p],g=f*d+p*2,_=u[g],E=u[g+1],v=t*d+p*2,b=h[v],T=h[v+1],x=Ip(n,e,_,b,s);r[p]=$u(x,y,E,T,m)}return r}};function $u(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function Pp(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function Ip(i,t,e,n,s){let r=(i-t)/(s-t);for(let o=0;o<8;o++){let a=$u(r,t,e,n,s)-i;if(Math.abs(a)<1e-10)break;let l=Pp(r,t,e,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var on=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ji(e,this.TimeBufferType),this.values=ji(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:ji(t.times,Array),values:ji(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),oo(t.settings)&&(n.settings={inTangents:ji(t.settings.inTangents,Array),outTangents:ji(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new zo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Bo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Oo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new ko(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Ys:e=this.InterpolantFactoryMethodDiscrete;break;case Mo:e=this.InterpolantFactoryMethodLinear;break;case co:e=this.InterpolantFactoryMethodSmooth;break;case Tl:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Gt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ys;case this.InterpolantFactoryMethodLinear:return Mo;case this.InterpolantFactoryMethodSmooth:return co;case this.InterpolantFactoryMethodBezier:return Tl}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t;oo(this.settings)&&(Qh(this.settings.inTangents,t),Qh(this.settings.outTangents,t))}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;oo(this.settings)&&(jh(this.settings.inTangents,t),jh(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Wt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Wt("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){Wt("KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){Wt("KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&vf(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){Wt("KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===co,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(s)l=!0;else{let u=a*n,d=u-n,f=u+n;for(let p=0;p!==n;++p){let y=e[u+p];if(y!==e[d+p]||y!==e[f+p]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)e[d+f]=e[u+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,oo(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Qh(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]+=t}function jh(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}on.prototype.ValueTypeName="";on.prototype.TimeBufferType=Float32Array;on.prototype.ValueBufferType=Float32Array;on.prototype.DefaultInterpolation=Mo;var gi=class extends on{constructor(t,e,n){super(t,e,n)}};gi.prototype.ValueTypeName="bool";gi.prototype.ValueBufferType=Array;gi.prototype.DefaultInterpolation=Ys;gi.prototype.InterpolantFactoryMethodLinear=void 0;gi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ho=class extends on{constructor(t,e,n,s){super(t,e,n,s)}};Ho.prototype.ValueTypeName="color";var Go=class extends on{constructor(t,e,n,s){super(t,e,n,s)}};Go.prototype.ValueTypeName="number";var Vo=class extends mi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(s-e),c=t*a;for(let h=c+a;c!==h;c+=4)Pe.slerpFlat(r,0,o,c-a,o,c,l);return r}},fr=class extends on{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Vo(this.times,this.values,this.getValueSize(),t)}};fr.prototype.ValueTypeName="quaternion";fr.prototype.InterpolantFactoryMethodSmooth=void 0;var xi=class extends on{constructor(t,e,n){super(t,e,n)}};xi.prototype.ValueTypeName="string";xi.prototype.ValueBufferType=Array;xi.prototype.DefaultInterpolation=Ys;xi.prototype.InterpolantFactoryMethodLinear=void 0;xi.prototype.InterpolantFactoryMethodSmooth=void 0;var Wo=class extends on{constructor(t,e,n,s){super(t,e,n,s)}};Wo.prototype.ValueTypeName="vector";var uo={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(tu(i)||(this.files[i]=t))},get:function(i){if(this.enabled!==!1&&!tu(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function tu(i){try{let t=i.slice(i.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}var Xo=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],p=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Ku=new Xo,ms=class{constructor(t){this.manager=t!==void 0?t:Ku,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}setPriority(t){return this.priority=t,this}setCache(t){return this.cache=t,this}abort(){return this}};ms.DEFAULT_MATERIAL_NAME="__DEFAULT";var ts=new WeakMap,qo=class extends ms{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=uo.get(`image:${t}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0);else{let u=ts.get(o);u===void 0&&(u=[],ts.set(o,u)),u.push({onLoad:e,onError:s})}return o}let a=os("img");function l(){h(),e&&e(this);let u=ts.get(this)||[];for(let d=0;d<u.length;d++){let f=u[d];f.onLoad&&f.onLoad(this)}ts.delete(this),r.manager.itemEnd(t)}function c(u){h(),s&&s(u),uo.remove(`image:${t}`);let d=ts.get(this)||[];for(let f=0;f<d.length;f++){let p=d[f];p.onError&&p.onError(u)}ts.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),uo.add(`image:${t}`,a),r.manager.itemStart(t),a.fetchPriority=this.priority,a.src=t,a}};var pr=class extends ms{constructor(t){super(t)}load(t,e,n,s){let r=new We,o=new qo(this.manager);return o.setPriority(this.priority),o.setCache(this.cache),o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}},mr=class extends Xe{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ut(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},gs=class extends mr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Xe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ut(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},wl=new qt,eu=new U,nu=new U,Yo=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new bt(512,512),this.mapType=tn,this.map=null,this.mapPass=null,this.matrix=new qt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ui,this._frameExtents=new bt(1,1),this._viewportCount=1,this._viewports=[new _e(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;eu.setFromMatrixPosition(t.matrixWorld),e.position.copy(eu),nu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(nu),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){wl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(wl,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===rs||t.reversedDepth?e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),e.multiply(wl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},ao=new U,lo=new Pe,An=new U,gr=class extends Xe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new qt,this.projectionMatrix=new qt,this.projectionMatrixInverse=new qt,this.coordinateSystem=fn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(ao,lo,An),An.x===1&&An.y===1&&An.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ao,lo,An.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(ao,lo,An),An.x===1&&An.y===1&&An.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ao,lo,An.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},oi=new U,iu=new bt,su=new bt,Ke=class extends gr{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=ls*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Vs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ls*2*Math.atan(Math.tan(Vs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(oi.x,oi.y).multiplyScalar(-t/oi.z),oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(oi.x,oi.y).multiplyScalar(-t/oi.z)}getViewSize(t,e){return this.getViewBounds(t,iu,su),e.subVectors(su,iu)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Vs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var xr=class extends gr{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Nl=class extends Yo{constructor(){super(new xr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Di=class extends mr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Xe.DEFAULT_UP),this.updateMatrix(),this.target=new Xe,this.shadow=new Nl}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var es=-90,ns=1,xs=class extends Xe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ke(es,ns,t,e);s.layers=this.layers,this.add(s);let r=new Ke(es,ns,t,e);r.layers=this.layers,this.add(r);let o=new Ke(es,ns,t,e);o.layers=this.layers,this.add(o);let a=new Ke(es,ns,t,e);a.layers=this.layers,this.add(a);let l=new Ke(es,ns,t,e);l.layers=this.layers,this.add(l);let c=new Ke(es,ns,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===fn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===rs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;let y=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.mipmapsAutoUpdate=y,t.setRenderTarget(n,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Zo=class extends Ke{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}};var dc="\\[\\]\\.:\\/",Lp=new RegExp("["+dc+"]","g"),fc="[^"+dc+"]",Dp="[^"+dc.replace("\\.","")+"]",Np=/((?:WC+[\/:])*)/.source.replace("WC",fc),Up=/(WCOD+)?/.source.replace("WCOD",Dp),Fp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",fc),Op=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",fc),Bp=new RegExp("^"+Np+Up+Fp+Op+"$"),zp=["material","materials","bones","map"],Ul=class{constructor(t,e,n){let s=n||ye.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},ye=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Lp,"")}static parseTrackName(t){let e=Bp.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);zp.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Gt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Wt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Wt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Wt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Wt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Wt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Wt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Wt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[s];if(o===void 0){let c=e.nodeName;Wt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Wt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Wt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ye.Composite=Ul;ye.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ye.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ye.prototype.GetterByBindingType=[ye.prototype._getValue_direct,ye.prototype._getValue_array,ye.prototype._getValue_arrayElement,ye.prototype._getValue_toArray];ye.prototype.SetterByBindingTypeAndVersioning=[[ye.prototype._setValue_direct,ye.prototype._setValue_direct_setNeedsUpdate,ye.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ye.prototype._setValue_array,ye.prototype._setValue_array_setNeedsUpdate,ye.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ye.prototype._setValue_arrayElement,ye.prototype._setValue_arrayElement_setNeedsUpdate,ye.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ye.prototype._setValue_fromArray,ye.prototype._setValue_fromArray_setNeedsUpdate,ye.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var oy=new Float32Array(1);var yc=class yc{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};yc.prototype.isMatrix2=!0;var Fl=yc;function pc(i,t,e,n){let s=kp(n);switch(e){case tc:return i*t;case ea:return i*t/s.components*s.byteLength;case na:return i*t/s.components*s.byteLength;case vi:return i*t*2/s.components*s.byteLength;case ia:return i*t*2/s.components*s.byteLength;case ec:return i*t*3/s.components*s.byteLength;case En:return i*t*4/s.components*s.byteLength;case sa:return i*t*4/s.components*s.byteLength;case yr:case vr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Mr:case Sr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case oa:case la:return Math.max(i,16)*Math.max(t,8)/4;case ra:case aa:return Math.max(i,8)*Math.max(t,8)/2;case ca:case ha:case da:case fa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ua:case br:case pa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ma:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ga:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case xa:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case _a:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case ya:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case va:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Ma:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Sa:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case ba:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ea:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case wa:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Ta:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Aa:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ra:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ca:case Pa:case Ia:return Math.ceil(i/4)*Math.ceil(t/4)*16;case La:case Da:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Er:case Na:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function kp(i){switch(i){case tn:case $l:return{byteLength:1,components:1};case bs:case Kl:case bn:return{byteLength:2,components:1};case jo:case ta:return{byteLength:2,components:4};case Sn:case Qo:case gn:return{byteLength:4,components:1};case Ql:case jl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Gt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function yd(){let i=null,t=!1,e=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Wp(i){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){let h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<u.length;f++){let p=u[d],y=u[f];y.start<=p.start+p.count+1?p.count=Math.max(p.count,y.start+y.count-p.start):(++d,u[d]=y)}u.length=d+1;for(let f=0,p=u.length;f<p;f++){let y=u[f];i.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Xp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,qp=`#ifdef USE_ALPHAHASH
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
#endif`,Yp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Zp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Jp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,$p=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Kp=`#ifdef USE_AOMAP
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
#endif`,Qp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,jp=`#ifdef USE_BATCHING
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
#endif`,tm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,em=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,nm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,im=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,sm=`#ifdef USE_IRIDESCENCE
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
#endif`,rm=`#ifdef USE_BUMPMAP
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
#endif`,om=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,am=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,lm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,hm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,um=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,dm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,fm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,pm=`#define PI 3.141592653589793
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
} // validated`,mm=`vec3 transformedNormal = objectNormal;
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
#endif`,gm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,xm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,_m=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ym=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,vm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Mm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Sm=`#ifdef USE_ENVMAP
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
#endif`,bm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Em=`#ifdef USE_ENVMAP
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
#endif`,wm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Tm=`#ifdef USE_ENVMAP
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
#endif`,Am=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Rm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Cm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Pm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Im=`#ifdef USE_GRADIENTMAP
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
}`,Lm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Dm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Nm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Um=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Fm=`#ifdef USE_ENVMAP
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
#endif`,Om=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Bm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,zm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,km=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Hm=`PhysicalMaterial material;
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
#endif`,Gm=`uniform sampler2D dfgLUT;
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
}`,Vm=`
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
#endif`,Wm=`#if defined( RE_IndirectDiffuse )
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
#endif`,Xm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,qm=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,Ym=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Zm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$m=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Km=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Qm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,jm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,t0=`#if defined( USE_POINTS_UV )
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
#endif`,e0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,n0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,i0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,s0=`#if defined( USE_MORPHCOLORS )
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
#endif`,r0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,o0=`#ifdef USE_MORPHTARGETS
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
#endif`,a0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,l0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,c0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,h0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,u0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,d0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,f0=`#ifdef USE_NORMALMAP
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
#endif`,p0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,m0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,g0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,x0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,_0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,y0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,v0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,M0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,S0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,b0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,E0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,w0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,T0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,A0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,R0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,C0=`float getShadowMask() {
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
}`,P0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,I0=`#ifdef USE_SKINNING
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
#endif`,L0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,D0=`#ifdef USE_SKINNING
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
#endif`,N0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,U0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,F0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,O0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,B0=`#ifdef USE_TRANSMISSION
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
#endif`,z0=`#ifdef USE_TRANSMISSION
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
#endif`,k0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,H0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,G0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,V0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,W0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,X0=`uniform sampler2D t2D;
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
}`,q0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Y0=`uniform float backgroundBlurriness;
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
}`,Z0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,J0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$0=`#include <common>
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
}`,K0=`#if DEPTH_PACKING == 3200
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
}`,Q0=`#define DISTANCE
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
}`,j0=`#define DISTANCE
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
}`,tg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,eg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ng=`uniform float scale;
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
}`,ig=`uniform vec3 diffuse;
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
}`,sg=`#include <common>
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
}`,rg=`uniform vec3 diffuse;
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
}`,og=`#define LAMBERT
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
}`,ag=`#define LAMBERT
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
}`,lg=`#define MATCAP
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
}`,cg=`#define MATCAP
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
}`,hg=`#define NORMAL
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
}`,ug=`#define NORMAL
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
}`,dg=`#define PHONG
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
}`,fg=`#define PHONG
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
}`,pg=`#define STANDARD
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
}`,mg=`#define STANDARD
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
}`,gg=`#define TOON
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
}`,xg=`#define TOON
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
}`,_g=`uniform float size;
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
}`,yg=`uniform vec3 diffuse;
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
}`,vg=`#include <common>
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
}`,Mg=`uniform vec3 color;
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
}`,Sg=`uniform float rotation;
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
}`,bg=`uniform vec3 diffuse;
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
}`,ee={alphahash_fragment:Xp,alphahash_pars_fragment:qp,alphamap_fragment:Yp,alphamap_pars_fragment:Zp,alphatest_fragment:Jp,alphatest_pars_fragment:$p,aomap_fragment:Kp,aomap_pars_fragment:Qp,batching_pars_vertex:jp,batching_vertex:tm,begin_vertex:em,beginnormal_vertex:nm,bsdfs:im,iridescence_fragment:sm,bumpmap_pars_fragment:rm,clipping_planes_fragment:om,clipping_planes_pars_fragment:am,clipping_planes_pars_vertex:lm,clipping_planes_vertex:cm,color_fragment:hm,color_pars_fragment:um,color_pars_vertex:dm,color_vertex:fm,common:pm,defaultnormal_vertex:mm,displacementmap_pars_vertex:gm,displacementmap_vertex:xm,emissivemap_fragment:_m,emissivemap_pars_fragment:ym,colorspace_fragment:vm,colorspace_pars_fragment:Mm,envmap_fragment:Sm,envmap_common_pars_fragment:bm,envmap_pars_fragment:Em,envmap_pars_vertex:wm,envmap_physical_pars_fragment:Fm,envmap_vertex:Tm,fog_vertex:Am,fog_pars_vertex:Rm,fog_fragment:Cm,fog_pars_fragment:Pm,gradientmap_pars_fragment:Im,lightmap_pars_fragment:Lm,lights_lambert_fragment:Dm,lights_lambert_pars_fragment:Nm,lights_pars_begin:Um,lights_toon_fragment:Om,lights_toon_pars_fragment:Bm,lights_phong_fragment:zm,lights_phong_pars_fragment:km,lights_physical_fragment:Hm,lights_physical_pars_fragment:Gm,lights_fragment_begin:Vm,lights_fragment_maps:Wm,lights_fragment_end:Xm,lightprobes_pars_fragment:qm,logdepthbuf_fragment:Ym,logdepthbuf_pars_fragment:Zm,logdepthbuf_pars_vertex:Jm,logdepthbuf_vertex:$m,map_fragment:Km,map_pars_fragment:Qm,map_particle_fragment:jm,map_particle_pars_fragment:t0,metalnessmap_fragment:e0,metalnessmap_pars_fragment:n0,morphinstance_vertex:i0,morphcolor_vertex:s0,morphnormal_vertex:r0,morphtarget_pars_vertex:o0,morphtarget_vertex:a0,normal_fragment_begin:l0,normal_fragment_maps:c0,normal_pars_fragment:h0,normal_pars_vertex:u0,normal_vertex:d0,normalmap_pars_fragment:f0,clearcoat_normal_fragment_begin:p0,clearcoat_normal_fragment_maps:m0,clearcoat_pars_fragment:g0,iridescence_pars_fragment:x0,opaque_fragment:_0,packing:y0,premultiplied_alpha_fragment:v0,project_vertex:M0,dithering_fragment:S0,dithering_pars_fragment:b0,roughnessmap_fragment:E0,roughnessmap_pars_fragment:w0,shadowmap_pars_fragment:T0,shadowmap_pars_vertex:A0,shadowmap_vertex:R0,shadowmask_pars_fragment:C0,skinbase_vertex:P0,skinning_pars_vertex:I0,skinning_vertex:L0,skinnormal_vertex:D0,specularmap_fragment:N0,specularmap_pars_fragment:U0,tonemapping_fragment:F0,tonemapping_pars_fragment:O0,transmission_fragment:B0,transmission_pars_fragment:z0,uv_pars_fragment:k0,uv_pars_vertex:H0,uv_vertex:G0,worldpos_vertex:V0,background_vert:W0,background_frag:X0,backgroundCube_vert:q0,backgroundCube_frag:Y0,cube_vert:Z0,cube_frag:J0,depth_vert:$0,depth_frag:K0,distance_vert:Q0,distance_frag:j0,equirect_vert:tg,equirect_frag:eg,linedashed_vert:ng,linedashed_frag:ig,meshbasic_vert:sg,meshbasic_frag:rg,meshlambert_vert:og,meshlambert_frag:ag,meshmatcap_vert:lg,meshmatcap_frag:cg,meshnormal_vert:hg,meshnormal_frag:ug,meshphong_vert:dg,meshphong_frag:fg,meshphysical_vert:pg,meshphysical_frag:mg,meshtoon_vert:gg,meshtoon_frag:xg,points_vert:_g,points_frag:yg,shadow_vert:vg,shadow_frag:Mg,sprite_vert:Sg,sprite_frag:bg},At={common:{diffuse:{value:new Ut(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Yt}},envmap:{envMap:{value:null},envMapRotation:{value:new Yt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Yt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Yt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Yt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Yt},normalScale:{value:new bt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Yt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Yt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Yt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Yt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ut(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Ut(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0},uvTransform:{value:new Yt}},sprite:{diffuse:{value:new Ut(16777215)},opacity:{value:1},center:{value:new bt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}}},Nn={basic:{uniforms:Ze([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.fog]),vertexShader:ee.meshbasic_vert,fragmentShader:ee.meshbasic_frag},lambert:{uniforms:Ze([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new Ut(0)},envMapIntensity:{value:1}}]),vertexShader:ee.meshlambert_vert,fragmentShader:ee.meshlambert_frag},phong:{uniforms:Ze([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new Ut(0)},specular:{value:new Ut(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ee.meshphong_vert,fragmentShader:ee.meshphong_frag},standard:{uniforms:Ze([At.common,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.roughnessmap,At.metalnessmap,At.fog,At.lights,{emissive:{value:new Ut(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag},toon:{uniforms:Ze([At.common,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.gradientmap,At.fog,At.lights,{emissive:{value:new Ut(0)}}]),vertexShader:ee.meshtoon_vert,fragmentShader:ee.meshtoon_frag},matcap:{uniforms:Ze([At.common,At.bumpmap,At.normalmap,At.displacementmap,At.fog,{matcap:{value:null}}]),vertexShader:ee.meshmatcap_vert,fragmentShader:ee.meshmatcap_frag},points:{uniforms:Ze([At.points,At.fog]),vertexShader:ee.points_vert,fragmentShader:ee.points_frag},dashed:{uniforms:Ze([At.common,At.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ee.linedashed_vert,fragmentShader:ee.linedashed_frag},depth:{uniforms:Ze([At.common,At.displacementmap]),vertexShader:ee.depth_vert,fragmentShader:ee.depth_frag},normal:{uniforms:Ze([At.common,At.bumpmap,At.normalmap,At.displacementmap,{opacity:{value:1}}]),vertexShader:ee.meshnormal_vert,fragmentShader:ee.meshnormal_frag},sprite:{uniforms:Ze([At.sprite,At.fog]),vertexShader:ee.sprite_vert,fragmentShader:ee.sprite_frag},background:{uniforms:{uvTransform:{value:new Yt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ee.background_vert,fragmentShader:ee.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Yt}},vertexShader:ee.backgroundCube_vert,fragmentShader:ee.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ee.cube_vert,fragmentShader:ee.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ee.equirect_vert,fragmentShader:ee.equirect_frag},distance:{uniforms:Ze([At.common,At.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ee.distance_vert,fragmentShader:ee.distance_frag},shadow:{uniforms:Ze([At.lights,At.fog,{color:{value:new Ut(0)},opacity:{value:1}}]),vertexShader:ee.shadow_vert,fragmentShader:ee.shadow_frag}};Nn.physical={uniforms:Ze([Nn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Yt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Yt},clearcoatNormalScale:{value:new bt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Yt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Yt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Yt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Yt},sheen:{value:0},sheenColor:{value:new Ut(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Yt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Yt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Yt},transmissionSamplerSize:{value:new bt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Yt},attenuationDistance:{value:0},attenuationColor:{value:new Ut(0)},specularColor:{value:new Ut(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Yt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Yt},anisotropyVector:{value:new bt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Yt}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag};var Oa={r:0,b:0,g:0},Eg=new qt,vd=new Yt;vd.set(-1,0,0,0,1,0,0,0,1);function wg(i,t,e,n,s,r){let o=new Ut(0),a=s===!0?0:1,l,c,h=null,u=0,d=null;function f(_){let E=_.isScene===!0?_.background:null;if(E&&E.isTexture){let v=_.backgroundBlurriness>0;E=t.get(E,v)}return E}function p(_){let E=!1,v=f(_);v===null?m(o,a):v&&v.isColor&&(m(v,1),E=!0);let b=i.xr.getEnvironmentBlendMode();b==="additive"?e.buffers.color.setClear(0,0,0,1,r):b==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||E)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(_,E){let v=f(E);v&&v.isCubeTexture?(c===void 0&&(c=new ge(new Vt(1,1,1),new In({name:"BackgroundCubeMaterial",uniforms:ki(Nn.backgroundCube.uniforms),vertexShader:Nn.backgroundCube.vertexShader,fragmentShader:Nn.backgroundCube.fragmentShader,side:Ye,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(b,T,x){this.matrixWorld.copyPosition(x.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Eg.makeRotationFromEuler(E.backgroundRotation)).transpose(),v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(vd),c.material.toneMapped=oe.getTransfer(v.colorSpace)!==ue,(h!==v||u!==v.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=v,u=v.version,d=i.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new ge(new qe(2,2),new In({name:"BackgroundMaterial",uniforms:ki(Nn.background.uniforms),vertexShader:Nn.background.vertexShader,fragmentShader:Nn.background.fragmentShader,side:_i,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=oe.getTransfer(v.colorSpace)!==ue,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||u!==v.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=v,u=v.version,d=i.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function m(_,E){_.getRGB(Oa,uc(i)),e.buffers.color.setClear(Oa.r,Oa.g,Oa.b,E,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(_,E=1){o.set(_),a=E,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(_){a=_,m(o,a)},render:p,addToRenderList:y,dispose:g}}function Tg(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,o=!1;function a(D,B,H,L,k){let Y=!1,z=u(D,L,H,B);r!==z&&(r=z,c(r.object)),Y=f(D,L,H,k),Y&&p(D,L,H,k),k!==null&&t.update(k,i.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,v(D,B,H,L),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function l(){return i.createVertexArray()}function c(D){return i.bindVertexArray(D)}function h(D){return i.deleteVertexArray(D)}function u(D,B,H,L){let k=L.wireframe===!0,Y=n[B.id];Y===void 0&&(Y={},n[B.id]=Y);let z=D.isInstancedMesh===!0?D.id:0,$=Y[z];$===void 0&&($={},Y[z]=$);let P=$[H.id];P===void 0&&(P={},$[H.id]=P);let X=P[k];return X===void 0&&(X=d(l()),P[k]=X),X}function d(D){let B=[],H=[],L=[];for(let k=0;k<e;k++)B[k]=0,H[k]=0,L[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:H,attributeDivisors:L,object:D,attributes:{},index:null}}function f(D,B,H,L){let k=r.attributes,Y=B.attributes,z=0,$=H.getAttributes();for(let P in $)if($[P].location>=0){let C=k[P],J=Y[P];if(J===void 0&&(P==="instanceMatrix"&&D.instanceMatrix&&(J=D.instanceMatrix),P==="instanceColor"&&D.instanceColor&&(J=D.instanceColor)),C===void 0||C.attribute!==J||J&&C.data!==J.data)return!0;z++}return r.attributesNum!==z||r.index!==L}function p(D,B,H,L){let k={},Y=B.attributes,z=0,$=H.getAttributes();for(let P in $)if($[P].location>=0){let C=Y[P];C===void 0&&(P==="instanceMatrix"&&D.instanceMatrix&&(C=D.instanceMatrix),P==="instanceColor"&&D.instanceColor&&(C=D.instanceColor));let J={};J.attribute=C,C&&C.data&&(J.data=C.data),k[P]=J,z++}r.attributes=k,r.attributesNum=z,r.index=L}function y(){let D=r.newAttributes;for(let B=0,H=D.length;B<H;B++)D[B]=0}function m(D){g(D,0)}function g(D,B){let H=r.newAttributes,L=r.enabledAttributes,k=r.attributeDivisors;H[D]=1,L[D]===0&&(i.enableVertexAttribArray(D),L[D]=1),k[D]!==B&&(i.vertexAttribDivisor(D,B),k[D]=B)}function _(){let D=r.newAttributes,B=r.enabledAttributes;for(let H=0,L=B.length;H<L;H++)B[H]!==D[H]&&(i.disableVertexAttribArray(H),B[H]=0)}function E(D,B,H,L,k,Y,z){z===!0?i.vertexAttribIPointer(D,B,H,k,Y):i.vertexAttribPointer(D,B,H,L,k,Y)}function v(D,B,H,L){y();let k=L.attributes,Y=H.getAttributes(),z=B.defaultAttributeValues;for(let $ in Y){let P=Y[$];if(P.location>=0){let X=k[$];if(X===void 0&&($==="instanceMatrix"&&D.instanceMatrix&&(X=D.instanceMatrix),$==="instanceColor"&&D.instanceColor&&(X=D.instanceColor)),X!==void 0){let C=X.normalized,J=X.itemSize,Q=t.get(X);if(Q===void 0)continue;let G=Q.buffer,rt=Q.type,at=Q.bytesPerElement,ot=rt===i.INT||rt===i.UNSIGNED_INT||X.gpuType===Qo;if(X.isInterleavedBufferAttribute){let st=X.data,Et=st.isInterleavedBuffer===!0?st.stride:st.itemSize,Zt=X.offset;if(st.isInstancedInterleavedBuffer||st.isInstancedBufferAttribute){for(let wt=0;wt<P.locationSize;wt++)g(P.location+wt,st.meshPerAttribute);D.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let wt=0;wt<P.locationSize;wt++)m(P.location+wt);i.bindBuffer(i.ARRAY_BUFFER,G);for(let wt=0;wt<P.locationSize;wt++)E(P.location+wt,J/P.locationSize,rt,C,Et*at,(Zt+J/P.locationSize*wt)*at,ot)}else{if(X.isInstancedBufferAttribute){for(let st=0;st<P.locationSize;st++)g(P.location+st,X.meshPerAttribute);D.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let st=0;st<P.locationSize;st++)m(P.location+st);i.bindBuffer(i.ARRAY_BUFFER,G);for(let st=0;st<P.locationSize;st++)E(P.location+st,J/P.locationSize,rt,C,J*at,J/P.locationSize*st*at,ot)}}else if(z!==void 0){let C=z[$];if(C!==void 0)switch(C.length){case 2:i.vertexAttrib2fv(P.location,C);break;case 3:i.vertexAttrib3fv(P.location,C);break;case 4:i.vertexAttrib4fv(P.location,C);break;default:i.vertexAttrib1fv(P.location,C)}}}}_()}function b(){I();for(let D in n){let B=n[D];for(let H in B){let L=B[H];for(let k in L){let Y=L[k];for(let z in Y)h(Y[z].object),delete Y[z];delete L[k]}}delete n[D]}}function T(D){if(n[D.id]===void 0)return;let B=n[D.id];for(let H in B){let L=B[H];for(let k in L){let Y=L[k];for(let z in Y)h(Y[z].object),delete Y[z];delete L[k]}}delete n[D.id]}function x(D){for(let B in n){let H=n[B];for(let L in H){let k=H[L];if(k[D.id]===void 0)continue;let Y=k[D.id];for(let z in Y)h(Y[z].object),delete Y[z];delete k[D.id]}}}function M(D){for(let B in n){let H=n[B],L=D.isInstancedMesh===!0?D.id:0,k=H[L];if(k!==void 0){for(let Y in k){let z=k[Y];for(let $ in z)h(z[$].object),delete z[$];delete k[Y]}delete H[L],Object.keys(H).length===0&&delete n[B]}}}function I(){A(),o=!0,r!==s&&(r=s,c(r.object))}function A(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:I,resetDefaultState:A,dispose:b,releaseStatesOfGeometry:T,releaseStatesOfObject:M,releaseStatesOfProgram:x,initAttributes:y,enableAttribute:m,disableUnusedAttributes:_}}function Ag(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function o(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function a(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let d=0;for(let f=0;f<h;f++)d+=c[f];e.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function Rg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let x=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(x){return!(x!==En&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(x){let M=x===bn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(x!==tn&&x!==gn&&!M&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(x){if(x==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Gt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=e.logarithmicDepthBuffer===!0&&u===!1;e.reversedDepthBuffer===!0&&u===!1&&Gt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&u===!0&&Gt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),_=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),b=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:p,maxTextureSize:y,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:_,maxVaryings:E,maxFragmentUniforms:v,maxSamples:b,samples:T}}function Cg(i){let t=this,e=null,n=0,s=!1,r=!1,o=new dn,a=new Yt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){let p=u.clippingPlanes,y=u.clipIntersection,m=u.clipShadows,g=i.get(u);if(!s||p===null||p.length===0||r&&!m)r?h(null):c();else{let _=r?0:n,E=_*4,v=g.clippingState||null;l.value=v,v=h(p,d,E,f);for(let b=0;b!==E;++b)v[b]=e[b];g.clippingState=v,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,p){let y=u!==null?u.length:0,m=null;if(y!==0){if(m=l.value,p!==!0||m===null){let g=f+y*4,_=d.matrixWorldInverse;a.getNormalMatrix(_),(m===null||m.length<g)&&(m=new Float32Array(g));for(let E=0,v=f;E!==y;++E,v+=4)o.copy(u[E]).applyMatrix4(_,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,m}}var Ar=class extends sn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new nr(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Vt(5,5,5),r=new In({name:"CubemapFromEquirect",uniforms:ki(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ye,blending:Ui});r.uniforms.tEquirect.value=e;let o=new ge(s,r),a=e.minFilter;return e.minFilter===Jn&&(e.minFilter=Qe),new xs(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},Qu=256,Pg=3,Ig=20,Md=256,Sd=16,Lg=3,Dg=new U,Ng=new Ut,ws=class i{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new xs(1,10,null),this._boxMesh=new ge(new Vt(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=Dg}=r,l=this._renderer;this._setSize(o);let c=this._allocateTarget(),h=this._getSourceTarget(!0);e>0&&(h.texture.mipmapsAutoUpdate=!1);let u=l.autoClear,d=l.autoClearColor,f=l.autoClearDepth,p=l.autoClearStencil,y=t.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,y===null&&(t.background=l.getClearColor(Ng));let m=new xs(n,s,h);return m.position.copy(a),m.update(l,t),l.autoClear=u,l.autoClearColor=d,l.autoClearDepth=f,l.autoClearStencil=p,t.background=y,e>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,e)),this._applyPMREM(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ed(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=td(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(Qu,lc(t))}_fromTexture(t,e){t.mapping===Oi||t.mapping===Ms?this._setSize(t.image.length===0?Qu:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);let n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){let t=this._cubeSize,e=ju(t,!1,!1),n=Math.log2(t)-Pg;for(let s=0;s<=n;s++)e.texture.mipmaps.push({width:t>>s,height:t>>s});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){let e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=ju(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){let s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=t,r.activeMipmapLevel=e;let o=t.width>>e;t.viewport.set(0,0,o,o),r.update(this._renderer,s),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===Oi||t.mapping===Ms?(this._cubemapMaterial===null&&(this._cubemapMaterial=ed()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=td()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=Ug(),this._integrationMaterial=Fg());let e=this._cubeSize,n=t.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/Sd);for(let o=0;o<=n;o++){let a=i.lodToRoughness(o,n);if(o>n-Lg)r.roughness.value=a,this._renderCube(t,o,this._integrationMaterial);else{let l=a>0?Math.log2(e)+.5*Math.log2(6/(Md*Math.pow(a,4)))+.5:0;s.roughness.value=a,s.lodBias.value=l,this._renderCube(t,o,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=Og());let n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(t,0,n),s.envMap.value=t.texture,this._renderCube(r,0,n)}};function ju(i,t,e){return new Ar(i,{minFilter:Jn,generateMipmaps:t,type:bn,colorSpace:Zs,depthBuffer:e})}function Rr(i,t,e){return new In({name:i,uniforms:t,vertexShader:ee.cube_vert,fragmentShader:e,side:Ye,blending:Ui,depthTest:!1,depthWrite:!1})}function Ug(){return Rr("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Md}u

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
	`)}function Fg(){return Rr("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Sd}},`

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
	`)}function Og(){return Rr("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Ig}
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
	`)}function td(){return Rr("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function ed(){return Rr("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Bg(i){let t=new WeakMap,e=new WeakMap,n=null;function s(d,f=!1){return d==null?null:f?o(d):r(d)}function r(d){if(d&&d.isTexture){let f=d.mapping;if(f===Ss||f===$o)if(t.has(d)){let p=t.get(d).texture;return a(p,d.mapping)}else{let p=d.image;if(p&&p.height>0){let y=new Ar(p.height);return y.fromEquirectangularTexture(i,d),t.set(d,y),d.addEventListener("dispose",c),a(y.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture&&d.isPMREMTexture!==!0){let f=d.mapping,p=f===Ss||f===$o,y=f===Oi||f===Ms;if(p||y){let m=e.get(d),g=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==g)return n===null&&(n=new ws(i)),m=p?n.fromEquirectangular(d,m):n.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,e.set(d,m),m.texture;if(m!==void 0)return m.texture;{let _=d.image;return p&&_&&_.height>0||y&&_&&l(_)?(n===null&&(n=new ws(i)),m=p?n.fromEquirectangular(d):n.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,e.set(d,m),d.addEventListener("dispose",h),m.texture):null}}}return d}function a(d,f){return f===Ss?d.mapping=Oi:f===$o&&(d.mapping=Ms),d}function l(d){let f=0,p=6;for(let y=0;y<p;y++)d[y]!==void 0&&f++;return f===p}function c(d){let f=d.target;f.removeEventListener("dispose",c);let p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function h(d){let f=d.target;f.removeEventListener("dispose",h);let p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function u(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function zg(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Gs("WebGLRenderer: "+n+" extension not supported."),s}}}function kg(i,t,e,n){let s={},r=new WeakMap,o=new FinalizationRegistry(p=>delete s[p]);function a(p){l(p.target)}function l(p){p.index!==null&&t.remove(p.index);for(let m in p.attributes)t.remove(p.attributes[m]);p.removeEventListener("dispose",a),delete s[p.id],o.unregister(p);let y=r.get(p);y&&(t.remove(y),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function c(p,y){return s[y.id]!==void 0||(y.addEventListener("dispose",a),s[y.id]=new WeakRef(y),o.register(y,y.id,y),e.memory.geometries++),y}function h(p){let y=p.attributes;for(let m in y)t.update(y[m],i.ARRAY_BUFFER)}function u(p){let y=p.index,m=p.attributes.position,g=0;if(m===void 0)return;let _=y!==null?y.array.length:m.array.length/3-1,E=m.count>=65535?js:Qs,v=new E(Math.ceil(_/3)*6,1),b=v.array;if(y!==null){let x=y.array;g=y.version;for(let M=0,I=0;M<_;M+=3){let A=x[M+0],D=x[M+1],B=x[M+2];b[I++]=A,b[I++]=D,b[I++]=D,b[I++]=B,b[I++]=B,b[I++]=A}}else{g=m.version;for(let x=0,M=0;x<_;x+=3){let I=x+0,A=x+1,D=x+2;b[M++]=I,b[M++]=A,b[M++]=A,b[M++]=D,b[M++]=D,b[M++]=I}}v.version=g;let T=r.get(p);T&&t.remove(T),r.set(p,v)}function d(p){let y=r.get(p);if(y){let m=p.index;m!==null&&y.version<m.version&&u(p)}else u(p);return r.get(p)}function f(){for(let p in s){let y=s[p].deref();y!==void 0&&l(y)}}return{get:c,update:h,getWireframeAttribute:d,dispose:f}}function Hg(i,t,e){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,d){i.drawElements(n,d,r,u*o),e.update(d,n,1)}function c(u,d,f){f!==0&&(i.drawElementsInstanced(n,d,r,u*o,f),e.update(d,n,f))}function h(u,d,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,u,0,f);let y=0;for(let m=0;m<f;m++)y+=d[m];e.update(y,n,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Gg(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:Wt("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Vg(i,t,e){let n=new WeakMap,s=new _e;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let I=function(){x.dispose(),n.delete(a),a.removeEventListener("dispose",I)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],_=a.morphAttributes.color||[],E=0;f===!0&&(E=1),p===!0&&(E=2),y===!0&&(E=3);let v=a.attributes.position.count*E,b=1;v>t.maxTextureSize&&(b=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let T=new Float32Array(v*b*4*u),x=new $s(T,v,b,u);x.type=gn,x.needsUpdate=!0;let M=E*4;for(let A=0;A<u;A++){let D=m[A],B=g[A],H=_[A],L=v*b*4*A;for(let k=0;k<D.count;k++){let Y=k*M;f===!0&&(s.fromBufferAttribute(D,k),T[L+Y+0]=s.x,T[L+Y+1]=s.y,T[L+Y+2]=s.z,T[L+Y+3]=0),p===!0&&(s.fromBufferAttribute(B,k),T[L+Y+4]=s.x,T[L+Y+5]=s.y,T[L+Y+6]=s.z,T[L+Y+7]=0),y===!0&&(s.fromBufferAttribute(H,k),T[L+Y+8]=s.x,T[L+Y+9]=s.y,T[L+Y+10]=s.z,T[L+Y+11]=H.itemSize===4?s.w:1)}}d={count:u,texture:x,size:new bt(v,b)},n.set(a,d),a.addEventListener("dispose",I)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let y=0;y<c.length;y++)f+=c[y];let p=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",p),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Wg(i,t,e,n,s){let r=new WeakMap;function o(c){let h=s.render.frame,u=c.geometry,d=t.get(c,u);if(r.get(d)!==h&&(t.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return d}function a(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}var Xg={[Vl]:"LINEAR_TONE_MAPPING",[Wl]:"REINHARD_TONE_MAPPING",[Xl]:"CINEON_TONE_MAPPING",[vs]:"ACES_FILMIC_TONE_MAPPING",[Yl]:"AGX_TONE_MAPPING",[Zl]:"NEUTRAL_TONE_MAPPING",[ql]:"CUSTOM_TONE_MAPPING"};function qg(i,t,e,n,s,r){let o=new sn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=null,h=new fe;h.setAttribute("position",new $t([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new $t([0,2,0,0,2,0],2));let u=new No({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new ge(h,u),f=new xr(-1,1,1,-1,0,1),p=null,y=null,m=!1,g,_=null,E=[],v=!1;this.setSize=function(b,T){o.setSize(b,T),a!==null&&a.setSize(b,T),l!==null&&l.setSize(b,T);for(let x=0;x<E.length;x++){let M=E[x];M.setSize&&M.setSize(b,T)}},this.setEffects=function(b){E=b,v=E.length>0&&E[0].isRenderPass===!0;let T=o.width,x=o.height;E.length>0&&a===null&&(a=new sn(T,x,{type:bn,depthBuffer:!1,stencilBuffer:!1}),l=new sn(T,x,{type:bn,depthBuffer:!1,stencilBuffer:!1}));let M=s===!0&&E.some(I=>I.needsDepthTexture===!0);M!==(o.depthTexture!==null)&&(M===!0&&c===null&&(c=new qn(T,x),r===!0&&(c.format=$n,c.type=Bi)),o.dispose(),o.depthTexture=M?c:null,o.resolveDepthBuffer=M,o.storeMultisampledDepthBuffer=M);for(let I=0;I<E.length;I++){let A=E[I];A.setSize&&A.setSize(T,x),M&&A.needsDepthTexture===!0&&A.setDepthTexture&&A.setDepthTexture(c)}},this.begin=function(b,T){if(m||b.toneMapping===Ln&&E.length===0)return!1;if(_=T,T!==null){let x=T.width,M=T.height;(o.width!==x||o.height!==M)&&this.setSize(x,M)}return v===!1&&b.setRenderTarget(o),g=b.toneMapping,b.toneMapping=Ln,!0},this.hasRenderPass=function(){return v},this.end=function(b,T){b.toneMapping=g,m=!0;let x=o,M=a;for(let I=0;I<E.length;I++){let A=E[I];A.enabled!==!1&&(A.render(b,M,x,T),A.needsSwap!==!1&&(x=M,M=M===a?l:a))}if(p!==b.outputColorSpace||y!==b.toneMapping){p=b.outputColorSpace,y=b.toneMapping,u.defines={},oe.getTransfer(p)===ue&&(u.defines.SRGB_TRANSFER="");let I=Xg[y];I&&(u.defines[I]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=x.texture,b.setRenderTarget(_),b.render(d,f),_=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),h.dispose(),u.dispose()}}var bd=new We,Ed=new qn(1,1),wd=new ir(1),Td=new $s,Ad=new Eo,Rd=new nr,nd=[],id=[],sd=new Float32Array(16),rd=new Float32Array(9),od=new Float32Array(4);function Ts(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=nd[s];if(r===void 0&&(r=new Float32Array(s),nd[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ie(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Le(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ka(i,t){let e=id[t];e===void 0&&(e=new Int32Array(t),id[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Yg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Zg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ie(e,t))return;i.uniform2fv(this.addr,t),Le(e,t)}}function Jg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ie(e,t))return;i.uniform3fv(this.addr,t),Le(e,t)}}function $g(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ie(e,t))return;i.uniform4fv(this.addr,t),Le(e,t)}}function Kg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ie(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Le(e,t)}else{if(Ie(e,n))return;od.set(n),i.uniformMatrix2fv(this.addr,!1,od),Le(e,n)}}function Qg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ie(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Le(e,t)}else{if(Ie(e,n))return;rd.set(n),i.uniformMatrix3fv(this.addr,!1,rd),Le(e,n)}}function jg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ie(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Le(e,t)}else{if(Ie(e,n))return;sd.set(n),i.uniformMatrix4fv(this.addr,!1,sd),Le(e,n)}}function tx(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function ex(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ie(e,t))return;i.uniform2iv(this.addr,t),Le(e,t)}}function nx(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ie(e,t))return;i.uniform3iv(this.addr,t),Le(e,t)}}function ix(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ie(e,t))return;i.uniform4iv(this.addr,t),Le(e,t)}}function sx(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function rx(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ie(e,t))return;i.uniform2uiv(this.addr,t),Le(e,t)}}function ox(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ie(e,t))return;i.uniform3uiv(this.addr,t),Le(e,t)}}function ax(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ie(e,t))return;i.uniform4uiv(this.addr,t),Le(e,t)}}function Ha(i){return i.version===0&&(i.compareFunction=sc,i.needsUpdate=!0),i}function lx(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=Ha(Ed):r=bd,e.setTexture2D(t||r,s)}function cx(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Ad,s)}function hx(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=Ha(wd):r=Rd,e.setTextureCube(t||r,s)}function ux(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Td,s)}function dx(i){switch(i){case 5126:return Yg;case 35664:return Zg;case 35665:return Jg;case 35666:return $g;case 35674:return Kg;case 35675:return Qg;case 35676:return jg;case 5124:case 35670:return tx;case 35667:case 35671:return ex;case 35668:case 35672:return nx;case 35669:case 35673:return ix;case 5125:return sx;case 36294:return rx;case 36295:return ox;case 36296:return ax;case 35678:case 36198:case 36298:case 36306:case 35682:return lx;case 35679:case 36299:case 36307:return cx;case 35680:case 36300:case 36308:case 36293:return hx;case 36289:case 36303:case 36311:case 36292:return ux}}function fx(i,t){i.uniform1fv(this.addr,t)}function px(i,t){let e=Ts(t,this.size,2);i.uniform2fv(this.addr,e)}function mx(i,t){let e=Ts(t,this.size,3);i.uniform3fv(this.addr,e)}function gx(i,t){let e=Ts(t,this.size,4);i.uniform4fv(this.addr,e)}function xx(i,t){let e=Ts(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function _x(i,t){let e=Ts(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function yx(i,t){let e=Ts(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function vx(i,t){i.uniform1iv(this.addr,t)}function Mx(i,t){i.uniform2iv(this.addr,t)}function Sx(i,t){i.uniform3iv(this.addr,t)}function bx(i,t){i.uniform4iv(this.addr,t)}function Ex(i,t){i.uniform1uiv(this.addr,t)}function wx(i,t){i.uniform2uiv(this.addr,t)}function Tx(i,t){i.uniform3uiv(this.addr,t)}function Ax(i,t){i.uniform4uiv(this.addr,t)}function Rx(i,t,e){let n=this.cache,s=t.length,r=ka(e,s);Ie(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=Ha(Ed):o=bd;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function Cx(i,t,e){let n=this.cache,s=t.length,r=ka(e,s);Ie(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Ad,r[o])}function Px(i,t,e){let n=this.cache,s=t.length,r=ka(e,s);Ie(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));let o;this.type===i.SAMPLER_CUBE_SHADOW?o=Ha(wd):o=Rd;for(let a=0;a!==s;++a)e.setTextureCube(t[a]||o,r[a])}function Ix(i,t,e){let n=this.cache,s=t.length,r=ka(e,s);Ie(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Td,r[o])}function Lx(i){switch(i){case 5126:return fx;case 35664:return px;case 35665:return mx;case 35666:return gx;case 35674:return xx;case 35675:return _x;case 35676:return yx;case 5124:case 35670:return vx;case 35667:case 35671:return Mx;case 35668:case 35672:return Sx;case 35669:case 35673:return bx;case 5125:return Ex;case 36294:return wx;case 36295:return Tx;case 36296:return Ax;case 35678:case 36198:case 36298:case 36306:case 35682:return Rx;case 35679:case 36299:case 36307:return Cx;case 35680:case 36300:case 36308:case 36293:return Px;case 36289:case 36303:case 36311:case 36292:return Ix}}var Sc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=dx(e.type)}},bc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Lx(e.type)}},Ec=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},vc=/(\w+)(\])?(\[|\.)?/g;function ad(i,t){i.seq.push(t),i.map[t.id]=t}function Dx(i,t,e){let n=i.name,s=n.length;for(vc.lastIndex=0;;){let r=vc.exec(n),o=vc.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){ad(e,c===void 0?new Sc(a,i,t):new bc(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new Ec(a),ad(e,u)),e=u}}}var Es=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=t.getActiveUniform(e,o),l=t.getUniformLocation(e,a.name);Dx(a,l,this)}let s=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function ld(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Nx=37297,Ux=0;function Fx(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var cd=new Yt;function Ox(i){oe._getMatrix(cd,oe.workingColorSpace,i);let t=`mat3( ${cd.elements.map(e=>e.toFixed(4))} )`;switch(oe.getTransfer(i)){case Js:return[t,"LinearTransferOETF"];case ue:return[t,"sRGBTransferOETF"];default:return Gt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function hd(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+Fx(i.getShaderSource(t),a)}else return r}function Bx(i,t){let e=Ox(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var zx={[Vl]:"Linear",[Wl]:"Reinhard",[Xl]:"Cineon",[vs]:"ACESFilmic",[Yl]:"AgX",[Zl]:"Neutral",[ql]:"Custom"};function kx(i,t){let e=zx[t];return e===void 0?(Gt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Ba=new U;function Hx(){oe.getLuminanceCoefficients(Ba);let i=Ba.x.toFixed(4),t=Ba.y.toFixed(4),e=Ba.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Gx(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Tr).join(`
`)}function Vx(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Wx(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Tr(i){return i!==""}function ud(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function dd(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Xx=/^[ \t]*#include +<([\w\d./]+)>/gm;function wc(i){return i.replace(Xx,qx)}function qx(i,t){let e=ee[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return wc(e)}var Yx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fd(i){return i.replace(Yx,Zx)}function Zx(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function pd(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}var Jx={[Ni]:"SHADOWMAP_TYPE_PCF",[_s]:"SHADOWMAP_TYPE_VSM"};function $x(i){return Jx[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Kx={[Ms]:"ENVMAP_MODE_REFRACTION"};function Qx(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Kx[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var jx={[Gl]:"ENVMAP_BLENDING_MULTIPLY",[Tu]:"ENVMAP_BLENDING_MIX",[Au]:"ENVMAP_BLENDING_ADD"};function t_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":jx[i.combine]||"ENVMAP_BLENDING_NONE"}function e_(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=$x(e),c=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=Qx(e),u=t_(e),d=Gx(e),f=Vx(r),p=s.createProgram(),y,m,g=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(y=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(Tr).join(`
`),y.length>0&&(y+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(Tr).join(`
`),m.length>0&&(m+=`
`)):(y=[pd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Tr).join(`
`),m=[pd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ln?"#define TONE_MAPPING":"",e.toneMapping!==Ln?ee.tonemapping_pars_fragment:"",e.toneMapping!==Ln?kx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ee.colorspace_pars_fragment,Bx("linearToOutputTexel",e.outputColorSpace),Hx(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Tr).join(`
`)),o=wc(o),o=ud(o,e),o=dd(o,e),a=wc(a),a=ud(a,e),a=dd(a,e),o=fd(o),a=fd(a),e.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,y=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,m=["#define varying in",e.glslVersion===rc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===rc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let _=g+y+o,E=g+m+a,v=ld(s,s.VERTEX_SHADER,_),b=ld(s,s.FRAGMENT_SHADER,E);s.attachShader(p,v),s.attachShader(p,b),e.index0AttributeName!==void 0?s.bindAttribLocation(p,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function T(A){if(i.debug.checkShaderErrors){let D=s.getProgramInfoLog(p)||"",B=s.getShaderInfoLog(v)||"",H=s.getShaderInfoLog(b)||"",L=D.trim(),k=B.trim(),Y=H.trim(),z=!0,$=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,p,v,b);else{let P=hd(s,v,"vertex"),X=hd(s,b,"fragment");Wt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+L+`
`+P+`
`+X)}else L!==""?Gt("WebGLProgram: Program Info Log:",L):(k===""||Y==="")&&($=!1);$&&(A.diagnostics={runnable:z,programLog:L,vertexShader:{log:k,prefix:y},fragmentShader:{log:Y,prefix:m}})}s.deleteShader(v),s.deleteShader(b),x=new Es(s,p),M=Wx(s,p)}let x;this.getUniforms=function(){return x===void 0&&T(this),x};let M;this.getAttributes=function(){return M===void 0&&T(this),M};let I=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(p,Nx)),I},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Ux++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=v,this.fragmentShader=b,this}var n_=0,Tc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Ac(t),e.set(t,n)),n}},Ac=class{constructor(t){this.id=n_++,this.code=t,this.usedTimes=0}};function i_(i){return i===vi||i===br||i===Er}function s_(i,t,e,n,s,r){let o=new Ks,a=new Tc,l=new Set,c=[],h=new Map,u=n.logarithmicDepthBuffer,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(x){return l.add(x),x===0?"uv":`uv${x}`}function p(x,M,I,A,D,B){let H=A.fog,L=D.geometry,k=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?A.environment:null,Y=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,z=t.get(x.envMap||k,Y),$=d[x.type],P=n.precision;x.precision!==null&&(P=n.getMaxPrecision(x.precision),P!==x.precision&&Gt("WebGLProgram.getParameters:",x.precision,"not supported, using",P,"instead."));let X=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,C=X!==void 0?X.length:0,J=0;L.morphAttributes.position!==void 0&&(J=1),L.morphAttributes.normal!==void 0&&(J=2),L.morphAttributes.color!==void 0&&(J=3);let Q,G,rt,at;if($){let Tt=Nn[$];Q=Tt.vertexShader,G=Tt.fragmentShader}else{Q=x.vertexShader,G=x.fragmentShader;let Tt=a.getVertexShaderStage(x),de=a.getFragmentShaderStage(x);a.update(x,Tt,de),rt=Tt.id,at=de.id}let ot=i.getRenderTarget(),st=i.state.buffers.depth.getReversed(),Et=D.isInstancedMesh===!0,Zt=D.isBatchedMesh===!0,wt=!!x.map,Nt=!!x.matcap,Ot=!!z,tt=Ot&&z.isPMREMTexture===!0,ct=!!x.aoMap,ut=!!x.lightMap,St=!!x.bumpMap&&x.wireframe===!1,dt=!!x.normalMap,Ht=!!x.displacementMap,Ct=!!x.emissiveMap,Qt=!!x.metalnessMap,jt=!!x.roughnessMap,ae=x.anisotropy>0,O=x.clearcoat>0,Te=x.diffuseRoughness>0,ne=x.dispersion>0,pe=x.retroreflectivity>0,yt=x.iridescence>0,be=x.sheen>0,kt=x.transmission>0,Xt=ae&&!!x.anisotropyMap,R=O&&!!x.clearcoatMap,S=O&&!!x.clearcoatNormalMap,W=O&&!!x.clearcoatRoughnessMap,lt=Te&&!!x.diffuseRoughnessMap,it=yt&&!!x.iridescenceMap,pt=yt&&!!x.iridescenceThicknessMap,vt=be&&!!x.sheenColorMap,j=be&&!!x.sheenRoughnessMap,et=!!x.specularMap,gt=!!x.specularColorMap,N=!!x.specularIntensityMap,nt=kt&&!!x.transmissionMap,K=kt&&!!x.thicknessMap,xt=!!x.gradientMap,ft=!!x.alphaMap,mt=x.alphaTest>0,Bt=!!x.alphaHash,te=!!x.extensions,ht=Ln;x.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(ht=i.toneMapping);let zt=tt?z.isCompressedCubeTexture?z.image[0].mipmaps:z.mipmaps:null,Kt={shaderID:$,shaderType:x.type,shaderName:x.name,vertexShader:Q,fragmentShader:G,defines:x.defines,customVertexShaderID:rt,customFragmentShaderID:at,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:P,batching:Zt,batchingColor:Zt&&D._colorsTexture!==null,instancing:Et,instancingColor:Et&&D.instanceColor!==null,instancingMorph:Et&&D.morphTexture!==null,outputColorSpace:ot===null?i.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:oe.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:wt,matcap:Nt,envMap:Ot,envMapMode:Ot&&z.mapping,envMapPMREM:tt,envMapMaxLod:tt?zt.length-1:null,envMapSize:tt?zt[0].width:null,aoMap:ct,lightMap:ut,bumpMap:St,normalMap:dt,displacementMap:Ht,emissiveMap:Ct,normalMapObjectSpace:dt&&x.normalMapType===Pu,normalMapTangentSpace:dt&&x.normalMapType===Ua,packedNormalMap:dt&&x.normalMapType===Ua&&i_(x.normalMap.format),metalnessMap:Qt,roughnessMap:jt,anisotropy:ae,anisotropyMap:Xt,clearcoat:O,clearcoatMap:R,clearcoatNormalMap:S,clearcoatRoughnessMap:W,diffuseRoughness:Te,diffuseRoughnessMap:lt,dispersion:ne,retroreflection:pe,iridescence:yt,iridescenceMap:it,iridescenceThicknessMap:pt,sheen:be,sheenColorMap:vt,sheenRoughnessMap:j,specularMap:et,specularColorMap:gt,specularIntensityMap:N,transmission:kt,transmissionMap:nt,thicknessMap:K,gradientMap:xt,opaque:x.transparent===!1&&x.blending===ys&&x.alphaToCoverage===!1,alphaMap:ft,alphaTest:mt,alphaHash:Bt,combine:x.combine,mapUv:wt&&f(x.map.channel),aoMapUv:ct&&f(x.aoMap.channel),lightMapUv:ut&&f(x.lightMap.channel),bumpMapUv:St&&f(x.bumpMap.channel),normalMapUv:dt&&f(x.normalMap.channel),displacementMapUv:Ht&&f(x.displacementMap.channel),emissiveMapUv:Ct&&f(x.emissiveMap.channel),metalnessMapUv:Qt&&f(x.metalnessMap.channel),roughnessMapUv:jt&&f(x.roughnessMap.channel),anisotropyMapUv:Xt&&f(x.anisotropyMap.channel),clearcoatMapUv:R&&f(x.clearcoatMap.channel),clearcoatNormalMapUv:S&&f(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:W&&f(x.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:lt&&f(x.diffuseRoughnessMap.channel),iridescenceMapUv:it&&f(x.iridescenceMap.channel),iridescenceThicknessMapUv:pt&&f(x.iridescenceThicknessMap.channel),sheenColorMapUv:vt&&f(x.sheenColorMap.channel),sheenRoughnessMapUv:j&&f(x.sheenRoughnessMap.channel),specularMapUv:et&&f(x.specularMap.channel),specularColorMapUv:gt&&f(x.specularColorMap.channel),specularIntensityMapUv:N&&f(x.specularIntensityMap.channel),transmissionMapUv:nt&&f(x.transmissionMap.channel),thicknessMapUv:K&&f(x.thicknessMap.channel),alphaMapUv:ft&&f(x.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(dt||ae),vertexNormals:!!L.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!L.attributes.uv&&(wt||ft),fog:!!H,useFog:x.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||L.attributes.normal===void 0&&dt===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:st,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:L.attributes.position!==void 0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:C,morphTextureStride:J,numSunLights:M.sun.length,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numSunLightShadows:M.sunShadowMap.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:B.filter(Tt=>Tt.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:ht,decodeVideoTexture:wt&&x.map.isVideoTexture===!0&&oe.getTransfer(x.map.colorSpace)===ue,decodeVideoTextureEmissive:Ct&&x.emissiveMap.isVideoTexture===!0&&oe.getTransfer(x.emissiveMap.colorSpace)===ue,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===an,flipSided:x.side===Ye,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:te&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(te&&x.extensions.multiDraw===!0||Zt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Kt.vertexUv1s=l.has(1),Kt.vertexUv2s=l.has(2),Kt.vertexUv3s=l.has(3),l.clear(),Kt}function y(x){let M=[];if(x.shaderID?M.push(x.shaderID):(M.push(x.customVertexShaderID),M.push(x.customFragmentShaderID)),x.defines!==void 0)for(let I in x.defines)M.push(I),M.push(x.defines[I]);return x.isRawShaderMaterial===!1&&(m(M,x),g(M,x),M.push(i.outputColorSpace)),M.push(x.customProgramCacheKey),M.join()}function m(x,M){x.push(M.precision),x.push(M.outputColorSpace),x.push(M.envMapMode),x.push(M.envMapPMREM),x.push(M.envMapMaxLod),x.push(M.envMapSize),x.push(M.mapUv),x.push(M.alphaMapUv),x.push(M.lightMapUv),x.push(M.aoMapUv),x.push(M.bumpMapUv),x.push(M.normalMapUv),x.push(M.displacementMapUv),x.push(M.emissiveMapUv),x.push(M.metalnessMapUv),x.push(M.roughnessMapUv),x.push(M.anisotropyMapUv),x.push(M.clearcoatMapUv),x.push(M.clearcoatNormalMapUv),x.push(M.clearcoatRoughnessMapUv),x.push(M.diffuseRoughnessMapUv),x.push(M.iridescenceMapUv),x.push(M.iridescenceThicknessMapUv),x.push(M.sheenColorMapUv),x.push(M.sheenRoughnessMapUv),x.push(M.specularMapUv),x.push(M.specularColorMapUv),x.push(M.specularIntensityMapUv),x.push(M.transmissionMapUv),x.push(M.thicknessMapUv),x.push(M.combine),x.push(M.fogExp2),x.push(M.sizeAttenuation),x.push(M.morphTargetsCount),x.push(M.numSunLights),x.push(M.numDirLights),x.push(M.numPointLights),x.push(M.numSpotLights),x.push(M.numSpotLightMaps),x.push(M.numHemiLights),x.push(M.numRectAreaLights),x.push(M.numSunLightShadows),x.push(M.numDirLightShadows),x.push(M.numPointLightShadows),x.push(M.numSpotLightShadows),x.push(M.numSpotLightShadowsWithMaps),x.push(M.numLightProbes),x.push(M.numLightProbeGrids),x.push(M.shadowMapType),x.push(M.toneMapping),x.push(M.numClippingPlanes),x.push(M.numClipIntersection),x.push(M.depthPacking)}function g(x,M){o.disableAll(),M.instancing&&o.enable(0),M.instancingColor&&o.enable(1),M.instancingMorph&&o.enable(2),M.matcap&&o.enable(3),M.envMap&&o.enable(4),M.normalMapObjectSpace&&o.enable(5),M.normalMapTangentSpace&&o.enable(6),M.clearcoat&&o.enable(7),M.iridescence&&o.enable(8),M.alphaTest&&o.enable(9),M.vertexColors&&o.enable(10),M.vertexAlphas&&o.enable(11),M.vertexUv1s&&o.enable(12),M.vertexUv2s&&o.enable(13),M.vertexUv3s&&o.enable(14),M.vertexTangents&&o.enable(15),M.anisotropy&&o.enable(16),M.alphaHash&&o.enable(17),M.batching&&o.enable(18),M.dispersion&&o.enable(19),M.retroreflection&&o.enable(24),M.diffuseRoughness&&o.enable(25),M.batchingColor&&o.enable(20),M.gradientMap&&o.enable(21),M.packedNormalMap&&o.enable(22),M.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),M.numLightProbeGrids>0&&o.enable(22),M.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function _(x){let M=d[x.type],I;if(M){let A=Nn[M];I=Ju.clone(A.uniforms)}else I=x.uniforms;return I}function E(x,M){let I=h.get(M);return I!==void 0?++I.usedTimes:(I=new e_(i,M,x,s),c.push(I),h.set(M,I)),I}function v(x){if(--x.usedTimes===0){let M=c.indexOf(x);c[M]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function b(x){a.remove(x)}function T(){a.dispose()}return{getParameters:p,getProgramCacheKey:y,getUniforms:_,acquireProgram:E,releaseProgram:v,releaseShaderCache:b,programs:c,dispose:T}}function r_(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function o_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function md(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function gd(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function a(d,f,p,y,m,g){let _=i[t];return _===void 0?(_={id:d.id,object:d,geometry:f,material:p,materialVariant:o(d),groupOrder:y,renderOrder:d.renderOrder,z:m,group:g},i[t]=_):(_.id=d.id,_.object=d,_.geometry=f,_.material=p,_.materialVariant=o(d),_.groupOrder=y,_.renderOrder=d.renderOrder,_.z=m,_.group=g),t++,_}function l(d,f,p,y,m,g,_){_.reversedDepth===!0&&(m=-m);let E=a(d,f,p,y,m,g);p.transmission>0?n.push(E):p.transparent===!0?s.push(E):e.push(E)}function c(d,f,p,y,m,g){let _=a(d,f,p,y,m,g);p.transmission>0?n.unshift(_):p.transparent===!0?s.unshift(_):e.unshift(_)}function h(d,f){e.length>1&&e.sort(d||o_),n.length>1&&n.sort(f||md),s.length>1&&s.sort(f||md)}function u(){for(let d=t,f=i.length;d<f;d++){let p=i[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:u,sort:h}}function a_(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new gd,i.set(n,[o])):s>=r.length?(o=new gd,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function l_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new U,color:new Ut};break;case"SpotLight":e={position:new U,direction:new U,color:new Ut,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new U,color:new Ut,distance:0,decay:0};break;case"HemisphereLight":e={direction:new U,skyColor:new Ut,groundColor:new Ut};break;case"RectAreaLight":e={color:new Ut,position:new U,halfWidth:new U,halfHeight:new U};break}return i[t.id]=e,e}}}function c_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var h_=0;function u_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function d_(i){let t=new l_,e=c_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new U);let s=new U,r=new qt,o=new qt;function a(c){let h=0,u=0,d=0;for(let B=0;B<9;B++)n.probe[B].set(0,0,0);let f=0,p=0,y=0,m=0,g=0,_=0,E=0,v=0,b=0,T=0,x=0,M=0,I=0,A=0;c.sort(u_);for(let B=0,H=c.length;B<H;B++){let L=c[B],k=L.color,Y=L.intensity,z=L.distance,$=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===vi?$=L.shadow.map.texture:$=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=k.r*Y,u+=k.g*Y,d+=k.b*Y;else if(L.isLightProbe){for(let P=0;P<9;P++)n.probe[P].addScaledVector(L.sh.coefficients[P],Y);A++}else if(L.isSunLight){let P=t.get(L);if(P.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let X=L.shadow,C=e.get(L);C.shadowIntensity=X.intensity,C.shadowBias=X.bias,C.shadowNormalBias=X.normalBias,C.shadowRadius=X.radius,C.shadowMapSize.copy(X.mapSize).multiply(X.getFrameExtents()),n.sunShadow[p]=C,n.sunShadowMap[p]=$;let J=X.getViewportCount();for(let Q=0;Q<J;Q++)n.sunShadowMatrix[y+Q]=X.getMatrix(Q),n.sunShadowCascade[y+Q]=X._cascadeData[Q];y+=J,p++}n.sun[f]=P,f++}else if(L.isDirectionalLight){let P=t.get(L);if(P.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let X=L.shadow,C=e.get(L);C.shadowIntensity=X.intensity,C.shadowBias=X.bias,C.shadowNormalBias=X.normalBias,C.shadowRadius=X.radius,C.shadowMapSize=X.mapSize,n.directionalShadow[m]=C,n.directionalShadowMap[m]=$,n.directionalShadowMatrix[m]=L.shadow.matrix,b++}n.directional[m]=P,m++}else if(L.isSpotLight){let P=t.get(L);P.position.setFromMatrixPosition(L.matrixWorld),P.color.copy(k).multiplyScalar(Y),P.distance=z,P.coneCos=Math.cos(L.angle),P.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),P.decay=L.decay,n.spot[_]=P;let X=L.shadow;if(L.map&&(n.spotLightMap[M]=L.map,M++,X.updateMatrices(L),L.castShadow&&I++),n.spotLightMatrix[_]=X.matrix,L.castShadow){let C=e.get(L);C.shadowIntensity=X.intensity,C.shadowBias=X.bias,C.shadowNormalBias=X.normalBias,C.shadowRadius=X.radius,C.shadowMapSize=X.mapSize,n.spotShadow[_]=C,n.spotShadowMap[_]=$,x++}_++}else if(L.isRectAreaLight){let P=t.get(L);P.color.copy(k).multiplyScalar(Y),P.halfWidth.set(L.width*.5,0,0),P.halfHeight.set(0,L.height*.5,0),n.rectArea[E]=P,E++}else if(L.isPointLight){let P=t.get(L);if(P.color.copy(L.color).multiplyScalar(L.intensity),P.distance=L.distance,P.decay=L.decay,L.castShadow){let X=L.shadow,C=e.get(L);C.shadowIntensity=X.intensity,C.shadowBias=X.bias,C.shadowNormalBias=X.normalBias,C.shadowRadius=X.radius,C.shadowMapSize=X.mapSize,C.shadowCameraNear=X.camera.near,C.shadowCameraFar=X.camera.far,n.pointShadow[g]=C,n.pointShadowMap[g]=$,n.pointShadowMatrix[g]=L.shadow.matrix,T++}n.point[g]=P,g++}else if(L.isHemisphereLight){let P=t.get(L);P.skyColor.copy(L.color).multiplyScalar(Y),P.groundColor.copy(L.groundColor).multiplyScalar(Y),n.hemi[v]=P,v++}}E>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=At.LTC_FLOAT_1,n.rectAreaLTC2=At.LTC_FLOAT_2):(n.rectAreaLTC1=At.LTC_HALF_1,n.rectAreaLTC2=At.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let D=n.hash;(D.sunLength!==f||D.directionalLength!==m||D.pointLength!==g||D.spotLength!==_||D.rectAreaLength!==E||D.hemiLength!==v||D.numSunShadows!==p||D.numDirectionalShadows!==b||D.numPointShadows!==T||D.numSpotShadows!==x||D.numSpotMaps!==M||D.numLightProbes!==A)&&(n.sun.length=f,n.directional.length=m,n.spot.length=_,n.rectArea.length=E,n.point.length=g,n.hemi.length=v,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.directionalShadowMatrix.length=b,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=x,n.spotShadowMap.length=x,n.spotLightMatrix.length=x+M-I,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=I,n.numLightProbes=A,D.sunLength=f,D.directionalLength=m,D.pointLength=g,D.spotLength=_,D.rectAreaLength=E,D.hemiLength=v,D.numSunShadows=p,D.numDirectionalShadows=b,D.numPointShadows=T,D.numSpotShadows=x,D.numSpotMaps=M,D.numLightProbes=A,n.version=h_++)}function l(c,h){let u=0,d=0,f=0,p=0,y=0,m=0,g=h.matrixWorldInverse;for(let _=0,E=c.length;_<E;_++){let v=c[_];if(v.isSunLight){let b=n.sun[u];b.direction.setFromMatrixPosition(v.matrixWorld),b.direction.transformDirection(g),u++}else if(v.isDirectionalLight){let b=n.directional[d];b.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(g),d++}else if(v.isSpotLight){let b=n.spot[p];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(g),b.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(g),p++}else if(v.isRectAreaLight){let b=n.rectArea[y];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(g),o.identity(),r.copy(v.matrixWorld),r.premultiply(g),o.extractRotation(r),b.halfWidth.set(v.width*.5,0,0),b.halfHeight.set(0,v.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),y++}else if(v.isPointLight){let b=n.point[f];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(g),f++}else if(v.isHemisphereLight){let b=n.hemi[m];b.direction.setFromMatrixPosition(v.matrixWorld),b.direction.transformDirection(g),m++}}}return{setup:a,setupView:l,state:n}}function xd(i){let t=new d_(i),e=[],n=[],s=[];function r(u){h.camera=u,e.length=0,n.length=0,s.length=0}function o(u){u.isLightProbeGrid?s.push(u):e.push(u)}function a(u){n.push(u)}function l(){t.setup(e),s.sort((u,d)=>u.priority-d.priority||u.id-d.id)}function c(u){t.setupView(e,u)}let h={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function f_(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new xd(i),t.set(s,[a])):r>=o.length?(a=new xd(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var p_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,m_=`uniform sampler2D shadow_pass;
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
}`,g_=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],x_=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],_d=new qt,wr=new U,Mc=new U;function __(i,t,e){let n=new ui,s=new bt,r=new bt,o=new _e,a=new Uo,l=new Fo,c={},h=e.maxTextureSize,u={[_i]:Ye,[Ye]:_i,[an]:an},d=new In({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new bt},radius:{value:4}},vertexShader:p_,fragmentShader:m_}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let p=new fe;p.setAttribute("position",new ce(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new ge(p,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ni;let g=this.type;this.render=function(T,x,M){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===au&&(Gt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ni);let I=i.getRenderTarget(),A=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),B=i.state;B.setBlending(Ui),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);let H=g!==this.type;H&&x.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(k=>k.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,k=T.length;L<k;L++){let Y=T[L],z=Y.shadow;if(z===void 0){Gt("WebGLShadowMap:",Y,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);let $=z.getFrameExtents();s.multiply($),r.copy(z.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/$.x),s.x=r.x*$.x,z.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/$.y),s.y=r.y*$.y,z.mapSize.y=r.y));let P=i.state.buffers.depth.getReversed();if(z.camera._reversedDepth=P,z.map===null||H===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===_s){if(Y.isPointLight){Gt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new sn(s.x,s.y,{format:vi,type:bn,minFilter:Qe,magFilter:Qe,generateMipmaps:!1}),z.map.texture.name=Y.name+".shadowMap",z.map.depthTexture=new qn(s.x,s.y,gn),z.map.depthTexture.name=Y.name+".shadowMapDepth",z.map.depthTexture.format=Wn,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Oe,z.map.depthTexture.magFilter=Oe}else Y.isPointLight?(z.map=new Ar(s.x),z.map.depthTexture=new ir(s.x,Sn)):(z.map=new sn(s.x,s.y),z.map.depthTexture=new qn(s.x,s.y,Sn)),z.map.depthTexture.name=Y.name+".shadowMap",z.map.depthTexture.format=Wn,this.type===Ni?(z.map.depthTexture.compareFunction=P?ic:nc,z.map.depthTexture.minFilter=Qe,z.map.depthTexture.magFilter=Qe):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Oe,z.map.depthTexture.magFilter=Oe);z.camera.updateProjectionMatrix()}z.map.isWebGLCubeRenderTarget!==!0&&(z.map.width!==s.x||z.map.height!==s.y)&&z.map.setSize(s.x,s.y);let X=z.map.isWebGLCubeRenderTarget?6:z.getViewportCount();Y.isPointLight!==!0&&z.updateMatrices(Y,M);let C=(z.camera.layers.mask&4294967294)!==0?z.camera.layers:M.layers;for(let J=0;J<X;J++){let Q=z.getCamera(J);if(Y.isPointLight){let G=z.camera,rt=z.matrix,at=Y.distance||G.far;at!==G.far&&(G.far=at,G.updateProjectionMatrix()),wr.setFromMatrixPosition(Y.matrixWorld),G.position.copy(wr),Mc.copy(G.position),Mc.add(g_[J]),G.up.copy(x_[J]),G.lookAt(Mc),G.updateMatrixWorld(),rt.makeTranslation(-wr.x,-wr.y,-wr.z),_d.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),z._frustum.setFromProjectionMatrix(_d,G.coordinateSystem,G.reversedDepth)}if(z.map.isWebGLCubeRenderTarget)i.setRenderTarget(z.map,J),i.clear();else{J===0&&(i.setRenderTarget(z.map),i.clear());let G=z.getViewport(J);o.set(r.x*G.x,r.y*G.y,r.x*G.z,r.y*G.w),B.viewport(o)}n=z.getFrustum(J),v(x,M,Q,Y,C,this.type)}z.isPointLightShadow!==!0&&this.type===_s&&_(z,M),z.needsUpdate=!1}g=this.type,m.needsUpdate=!1,i.setRenderTarget(I,A,D)};function _(T,x){let M=t.update(y);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null?T.mapPass=new sn(s.x,s.y,{format:vi,type:bn}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),d.uniforms.shadow_pass.value=T.map.depthTexture,d.uniforms.resolution.value.set(T.map.width,T.map.height),d.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(x,null,M,d,y,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value.set(T.map.width,T.map.height),f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(x,null,M,f,y,null)}function E(T,x,M,I){let A=null,D=M.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(D!==void 0)A=D;else if(A=M.isPointLight===!0?l:a,i.localClippingEnabled&&x.clipShadows===!0&&Array.isArray(x.clippingPlanes)&&x.clippingPlanes.length!==0||x.displacementMap&&x.displacementScale!==0||x.alphaMap&&x.alphaTest>0||x.map&&x.alphaTest>0||x.alphaToCoverage===!0){let B=A.uuid,H=x.uuid,L=c[B];L===void 0&&(L={},c[B]=L);let k=L[H];k===void 0&&(k=A.clone(),L[H]=k,x.addEventListener("dispose",b)),A=k}if(A.visible=x.visible,A.wireframe=x.wireframe,I===_s?A.side=x.shadowSide!==null?x.shadowSide:x.side:A.side=x.shadowSide!==null?x.shadowSide:u[x.side],A.alphaMap=x.alphaMap,A.alphaTest=x.alphaToCoverage===!0?.5:x.alphaTest,A.map=x.map,A.clipShadows=x.clipShadows,A.clippingPlanes=x.clippingPlanes,A.clipIntersection=x.clipIntersection,A.displacementMap=x.displacementMap,A.displacementScale=x.displacementScale,A.displacementBias=x.displacementBias,A.wireframeLinewidth=x.wireframeLinewidth,A.linewidth=x.linewidth,M.isPointLight===!0&&A.isMeshDistanceMaterial===!0){let B=i.properties.get(A);B.light=M}return A}function v(T,x,M,I,A,D){if(T.visible===!1)return;if(T.layers.test(A)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&D===_s)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,T.matrixWorld);let L=t.update(T),k=T.material;if(Array.isArray(k)){let Y=L.groups;for(let z=0,$=Y.length;z<$;z++){let P=Y[z],X=k[P.materialIndex];if(X&&X.visible){let C=E(T,X,I,D);T.onBeforeShadow(i,T,x,M,L,C,P),i.renderBufferDirect(M,null,L,C,T,P),T.onAfterShadow(i,T,x,M,L,C,P)}}}else if(k.visible){let Y=E(T,k,I,D);T.onBeforeShadow(i,T,x,M,L,Y,null),i.renderBufferDirect(M,null,L,Y,T,null),T.onAfterShadow(i,T,x,M,L,Y,null)}}let H=T.children;for(let L=0,k=H.length;L<k;L++)v(H[L],x,M,I,A,D)}function b(T){T.target.removeEventListener("dispose",b);for(let M in c){let I=c[M],A=T.target.uuid;A in I&&(I[A].dispose(),delete I[A])}}}function y_(i,t){function e(){let N=!1,nt=new _e,K=null,xt=new _e(0,0,0,0);return{setMask:function(ft){K!==ft&&!N&&(i.colorMask(ft,ft,ft,ft),K=ft)},setLocked:function(ft){N=ft},setClear:function(ft,mt,Bt,te,ht){ht===!0&&(ft*=te,mt*=te,Bt*=te),nt.set(ft,mt,Bt,te),xt.equals(nt)===!1&&(i.clearColor(ft,mt,Bt,te),xt.copy(nt))},reset:function(){N=!1,K=null,xt.set(-1,0,0,0)}}}function n(){let N=!1,nt=!1,K=null,xt=null,ft=null;return{setReversed:function(mt){if(nt!==mt){let Bt=t.get("EXT_clip_control");mt?Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.ZERO_TO_ONE_EXT):Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.NEGATIVE_ONE_TO_ONE_EXT),nt=mt;let te=ft;ft=null,this.setClear(te)}},getReversed:function(){return nt},setTest:function(mt){mt?st(i.DEPTH_TEST):Et(i.DEPTH_TEST)},setMask:function(mt){K!==mt&&!N&&(i.depthMask(mt),K=mt)},setFunc:function(mt){if(nt&&(mt=Hu[mt]),xt!==mt){switch(mt){case fo:i.depthFunc(i.NEVER);break;case po:i.depthFunc(i.ALWAYS);break;case mo:i.depthFunc(i.LESS);break;case ss:i.depthFunc(i.LEQUAL);break;case go:i.depthFunc(i.EQUAL);break;case xo:i.depthFunc(i.GEQUAL);break;case _o:i.depthFunc(i.GREATER);break;case yo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}xt=mt}},setLocked:function(mt){N=mt},setClear:function(mt){ft!==mt&&(ft=mt,nt&&(mt=1-mt),i.clearDepth(mt))},reset:function(){N=!1,K=null,xt=null,ft=null,nt=!1}}}function s(){let N=!1,nt=null,K=null,xt=null,ft=null,mt=null,Bt=null,te=null,ht=null;return{setTest:function(zt){N||(zt?st(i.STENCIL_TEST):Et(i.STENCIL_TEST))},setMask:function(zt){nt!==zt&&!N&&(i.stencilMask(zt),nt=zt)},setFunc:function(zt,Kt,Tt){(K!==zt||xt!==Kt||ft!==Tt)&&(i.stencilFunc(zt,Kt,Tt),K=zt,xt=Kt,ft=Tt)},setOp:function(zt,Kt,Tt){(mt!==zt||Bt!==Kt||te!==Tt)&&(i.stencilOp(zt,Kt,Tt),mt=zt,Bt=Kt,te=Tt)},setLocked:function(zt){N=zt},setClear:function(zt){ht!==zt&&(i.clearStencil(zt),ht=zt)},reset:function(){N=!1,nt=null,K=null,xt=null,ft=null,mt=null,Bt=null,te=null,ht=null}}}let r=new e,o=new n,a=new s,l={},c=new WeakMap,h={},u={},d={},f=new WeakMap,p=[],y=null,m=!1,g=null,_=null,E=null,v=null,b=null,T=null,x=null,M=new Ut(0,0,0),I=0,A=!1,D=null,B=null,H=null,L=null,k=null,Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),z=!1,$=0,P=i.getParameter(i.VERSION);P.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(P)[1]),z=$>=1):P.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(P)[1]),z=$>=2);let X=null,C={},J=i.getParameter(i.SCISSOR_BOX),Q=i.getParameter(i.VIEWPORT),G=new _e().fromArray(J),rt=new _e().fromArray(Q);function at(N,nt,K,xt){let ft=new Uint8Array(4),mt=i.createTexture();i.bindTexture(N,mt),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Bt=0;Bt<K;Bt++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(nt,0,i.RGBA,1,1,xt,0,i.RGBA,i.UNSIGNED_BYTE,ft):i.texImage2D(nt+Bt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ft);return mt}let ot={};ot[i.TEXTURE_2D]=at(i.TEXTURE_2D,i.TEXTURE_2D,1),ot[i.TEXTURE_CUBE_MAP]=at(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ot[i.TEXTURE_2D_ARRAY]=at(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ot[i.TEXTURE_3D]=at(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),st(i.DEPTH_TEST),o.setFunc(ss),St(!1),dt(Ol),st(i.CULL_FACE),ct(Ui);function st(N){h[N]!==!0&&(i.enable(N),h[N]=!0)}function Et(N){h[N]!==!1&&(i.disable(N),h[N]=!1)}function Zt(N,nt){return d[N]!==nt?(i.bindFramebuffer(N,nt),d[N]=nt,N===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=nt),N===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=nt),!0):!1}function wt(N,nt){let K=p,xt=!1;if(N){K=f.get(nt),K===void 0&&(K=[],f.set(nt,K));let ft=N.textures;if(K.length!==ft.length||K[0]!==i.COLOR_ATTACHMENT0){for(let mt=0,Bt=ft.length;mt<Bt;mt++)K[mt]=i.COLOR_ATTACHMENT0+mt;K.length=ft.length,xt=!0}}else K[0]!==i.BACK&&(K[0]=i.BACK,xt=!0);xt&&i.drawBuffers(K)}function Nt(N){return y!==N?(i.useProgram(N),y=N,!0):!1}let Ot={[Fi]:i.FUNC_ADD,[cu]:i.FUNC_SUBTRACT,[hu]:i.FUNC_REVERSE_SUBTRACT};Ot[uu]=i.MIN,Ot[du]=i.MAX;let tt={[fu]:i.ZERO,[pu]:i.ONE,[mu]:i.SRC_COLOR,[kl]:i.SRC_ALPHA,[Mu]:i.SRC_ALPHA_SATURATE,[yu]:i.DST_COLOR,[xu]:i.DST_ALPHA,[gu]:i.ONE_MINUS_SRC_COLOR,[Hl]:i.ONE_MINUS_SRC_ALPHA,[vu]:i.ONE_MINUS_DST_COLOR,[_u]:i.ONE_MINUS_DST_ALPHA,[Su]:i.CONSTANT_COLOR,[bu]:i.ONE_MINUS_CONSTANT_COLOR,[Eu]:i.CONSTANT_ALPHA,[wu]:i.ONE_MINUS_CONSTANT_ALPHA};function ct(N,nt,K,xt,ft,mt,Bt,te,ht,zt){if(N===Ui){m===!0&&(Et(i.BLEND),m=!1);return}if(m===!1&&(st(i.BLEND),m=!0),N!==lu){if(N!==g||zt!==A){if((_!==Fi||b!==Fi)&&(i.blendEquation(i.FUNC_ADD),_=Fi,b=Fi),zt)switch(N){case ys:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case yi:i.blendFunc(i.ONE,i.ONE);break;case Bl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case zl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Wt("WebGLState: Invalid blending: ",N);break}else switch(N){case ys:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case yi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Bl:Wt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case zl:Wt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Wt("WebGLState: Invalid blending: ",N);break}E=null,v=null,T=null,x=null,M.set(0,0,0),I=0,g=N,A=zt}return}ft=ft||nt,mt=mt||K,Bt=Bt||xt,(nt!==_||ft!==b)&&(i.blendEquationSeparate(Ot[nt],Ot[ft]),_=nt,b=ft),(K!==E||xt!==v||mt!==T||Bt!==x)&&(i.blendFuncSeparate(tt[K],tt[xt],tt[mt],tt[Bt]),E=K,v=xt,T=mt,x=Bt),(te.equals(M)===!1||ht!==I)&&(i.blendColor(te.r,te.g,te.b,ht),M.copy(te),I=ht),g=N,A=!1}function ut(N,nt){N.side===an?Et(i.CULL_FACE):st(i.CULL_FACE);let K=N.side===Ye;nt&&(K=!K),St(K),N.blending===ys&&N.transparent===!1?ct(Ui):ct(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),r.setMask(N.colorWrite);let xt=N.stencilWrite;a.setTest(xt),xt&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Ct(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?st(i.SAMPLE_ALPHA_TO_COVERAGE):Et(i.SAMPLE_ALPHA_TO_COVERAGE)}function St(N){D!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),D=N)}function dt(N){N!==ru?(st(i.CULL_FACE),N!==B&&(N===Ol?i.cullFace(i.BACK):N===ou?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Et(i.CULL_FACE),B=N}function Ht(N){N!==H&&(z&&i.lineWidth(N),H=N)}function Ct(N,nt,K){N?(st(i.POLYGON_OFFSET_FILL),(L!==nt||k!==K)&&(L=nt,k=K,o.getReversed()&&(nt=-nt,K=-K),i.polygonOffset(nt,K))):Et(i.POLYGON_OFFSET_FILL)}function Qt(N){N?st(i.SCISSOR_TEST):Et(i.SCISSOR_TEST)}function jt(N){N===void 0&&(N=i.TEXTURE0+Y-1),X!==N&&(i.activeTexture(N),X=N)}function ae(N,nt,K){K===void 0&&(X===null?K=i.TEXTURE0+Y-1:K=X);let xt=C[K];xt===void 0&&(xt={type:void 0,texture:void 0},C[K]=xt),(xt.type!==N||xt.texture!==nt)&&(X!==K&&(i.activeTexture(K),X=K),i.bindTexture(N,nt||ot[N]),xt.type=N,xt.texture=nt)}function O(){let N=C[X];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function Te(){try{i.compressedTexImage2D(...arguments)}catch(N){Wt("WebGLState:",N)}}function ne(){try{i.compressedTexImage3D(...arguments)}catch(N){Wt("WebGLState:",N)}}function pe(){try{i.texSubImage2D(...arguments)}catch(N){Wt("WebGLState:",N)}}function yt(){try{i.texSubImage3D(...arguments)}catch(N){Wt("WebGLState:",N)}}function be(){try{i.compressedTexSubImage2D(...arguments)}catch(N){Wt("WebGLState:",N)}}function kt(){try{i.compressedTexSubImage3D(...arguments)}catch(N){Wt("WebGLState:",N)}}function Xt(){try{i.texStorage2D(...arguments)}catch(N){Wt("WebGLState:",N)}}function R(){try{i.texStorage3D(...arguments)}catch(N){Wt("WebGLState:",N)}}function S(){try{i.texImage2D(...arguments)}catch(N){Wt("WebGLState:",N)}}function W(){try{i.texImage3D(...arguments)}catch(N){Wt("WebGLState:",N)}}function lt(N){return u[N]!==void 0?u[N]:i.getParameter(N)}function it(N,nt){u[N]!==nt&&(i.pixelStorei(N,nt),u[N]=nt)}function pt(N){G.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),G.copy(N))}function vt(N){rt.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),rt.copy(N))}function j(N,nt){let K=c.get(nt);K===void 0&&(K=new WeakMap,c.set(nt,K));let xt=K.get(N);xt===void 0&&(xt=i.getUniformBlockIndex(nt,N.name),i.uniformBlockBinding(nt,xt,xt),K.set(N,xt))}function et(N,nt,K){let ft=c.get(nt).get(N);l[ft]!==K&&(i.bindBufferBase(i.UNIFORM_BUFFER,ft,K),l[ft]=K)}function gt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},X=null,C={},d={},l={},f=new WeakMap,p=[],y=null,m=!1,g=null,_=null,E=null,v=null,b=null,T=null,x=null,M=new Ut(0,0,0),I=0,A=!1,D=null,B=null,H=null,L=null,k=null,G.set(0,0,i.canvas.width,i.canvas.height),rt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:st,disable:Et,bindFramebuffer:Zt,drawBuffers:wt,useProgram:Nt,setBlending:ct,setMaterial:ut,setFlipSided:St,setCullFace:dt,setLineWidth:Ht,setPolygonOffset:Ct,setScissorTest:Qt,activeTexture:jt,bindTexture:ae,unbindTexture:O,compressedTexImage2D:Te,compressedTexImage3D:ne,texImage2D:S,texImage3D:W,pixelStorei:it,getParameter:lt,updateUBOMapping:j,uniformBlockBinding:et,texStorage2D:Xt,texStorage3D:R,texSubImage2D:pe,texSubImage3D:yt,compressedTexSubImage2D:be,compressedTexSubImage3D:kt,scissor:pt,viewport:vt,reset:gt}}function v_(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new bt,h=new WeakMap,u=new Set,d,f=new WeakMap,p=new Set,y=new FinalizationRegistry(R=>p.delete(R)),m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,S){return m?new OffscreenCanvas(R,S):os("canvas")}function _(R,S,W){let lt=1,it=Xt(R);if((it.width>W||it.height>W)&&(lt=W/Math.max(it.width,it.height)),lt<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let pt=Math.floor(lt*it.width),vt=Math.floor(lt*it.height);d===void 0&&(d=g(pt,vt));let j=S?g(pt,vt):d;return j.width=pt,j.height=vt,j.getContext("2d").drawImage(R,0,0,pt,vt),Gt("WebGLRenderer: Texture has been resized from ("+it.width+"x"+it.height+") to ("+pt+"x"+vt+")."),j}else return"data"in R&&Gt("WebGLRenderer: Image in DataTexture is too big ("+it.width+"x"+it.height+")."),R;return R}function E(R){return R.generateMipmaps}function v(R){i.generateMipmap(R)}function b(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(R,S,W,lt,it,pt=!1){if(R!==null){if(i[R]!==void 0)return i[R];Gt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let vt;lt&&(vt=t.get("EXT_texture_norm16"),vt||Gt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=S;if(S===i.RED&&(W===i.FLOAT&&(j=i.R32F),W===i.HALF_FLOAT&&(j=i.R16F),W===i.UNSIGNED_BYTE&&(j=i.R8),W===i.UNSIGNED_SHORT&&vt&&(j=vt.R16_EXT),W===i.SHORT&&vt&&(j=vt.R16_SNORM_EXT)),S===i.RED_INTEGER&&(W===i.UNSIGNED_BYTE&&(j=i.R8UI),W===i.UNSIGNED_SHORT&&(j=i.R16UI),W===i.UNSIGNED_INT&&(j=i.R32UI),W===i.BYTE&&(j=i.R8I),W===i.SHORT&&(j=i.R16I),W===i.INT&&(j=i.R32I)),S===i.RG&&(W===i.FLOAT&&(j=i.RG32F),W===i.HALF_FLOAT&&(j=i.RG16F),W===i.UNSIGNED_BYTE&&(j=i.RG8),W===i.UNSIGNED_SHORT&&vt&&(j=vt.RG16_EXT),W===i.SHORT&&vt&&(j=vt.RG16_SNORM_EXT)),S===i.RG_INTEGER&&(W===i.UNSIGNED_BYTE&&(j=i.RG8UI),W===i.UNSIGNED_SHORT&&(j=i.RG16UI),W===i.UNSIGNED_INT&&(j=i.RG32UI),W===i.BYTE&&(j=i.RG8I),W===i.SHORT&&(j=i.RG16I),W===i.INT&&(j=i.RG32I)),S===i.RGB_INTEGER&&(W===i.UNSIGNED_BYTE&&(j=i.RGB8UI),W===i.UNSIGNED_SHORT&&(j=i.RGB16UI),W===i.UNSIGNED_INT&&(j=i.RGB32UI),W===i.BYTE&&(j=i.RGB8I),W===i.SHORT&&(j=i.RGB16I),W===i.INT&&(j=i.RGB32I)),S===i.RGBA_INTEGER&&(W===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),W===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),W===i.UNSIGNED_INT&&(j=i.RGBA32UI),W===i.BYTE&&(j=i.RGBA8I),W===i.SHORT&&(j=i.RGBA16I),W===i.INT&&(j=i.RGBA32I)),S===i.RGB&&(W===i.UNSIGNED_SHORT&&vt&&(j=vt.RGB16_EXT),W===i.SHORT&&vt&&(j=vt.RGB16_SNORM_EXT),W===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),W===i.UNSIGNED_INT_10F_11F_11F_REV&&(j=i.R11F_G11F_B10F)),S===i.RGBA){let et=pt?Js:oe.getTransfer(it);W===i.FLOAT&&(j=i.RGBA32F),W===i.HALF_FLOAT&&(j=i.RGBA16F),W===i.UNSIGNED_BYTE&&(j=et===ue?i.SRGB8_ALPHA8:i.RGBA8),W===i.UNSIGNED_SHORT&&vt&&(j=vt.RGBA16_EXT),W===i.SHORT&&vt&&(j=vt.RGBA16_SNORM_EXT),W===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),W===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function x(R,S){let W;return R?S===null||S===Sn||S===Bi?W=i.DEPTH24_STENCIL8:S===gn?W=i.DEPTH32F_STENCIL8:S===bs&&(W=i.DEPTH24_STENCIL8,Gt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Sn||S===Bi?W=i.DEPTH_COMPONENT24:S===gn?W=i.DEPTH_COMPONENT32F:S===bs&&(W=i.DEPTH_COMPONENT16),W}function M(R,S){return E(R)===!0||R.isFramebufferTexture&&R.minFilter!==Oe&&R.minFilter!==Qe?Math.log2(Math.max(S.width,S.height))+1:R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?S.mipmaps.length:1}function I(R){let S=new WeakRef(R);n.get(R).__ref=S,p.add(S),y.register(R,S,S)}function A(R){let S=n.get(R).__ref;S!==void 0&&(p.delete(S),y.unregister(S))}function D(R){H(R.target)}function B(R){L(R.target)}function H(R){R.removeEventListener("dispose",D),A(R),Y(R),R.isVideoTexture&&h.delete(R),R.isHTMLTexture&&u.delete(R)}function L(R){R.removeEventListener("dispose",B),A(R),$(R)}function k(){for(let R of p){let S=R.deref();S!==void 0&&(S.isRenderTarget===!0?L(S):H(S))}p.clear(),u.clear()}function Y(R){let S=n.get(R);if(S.__webglInit===void 0)return;let W=R.source,lt=f.get(W);if(lt){let it=lt[S.__cacheKey];it.usedTimes--,it.usedTimes===0&&z(R),Object.keys(lt).length===0&&f.delete(W)}n.remove(R)}function z(R){let S=n.get(R);i.deleteTexture(S.__webglTexture);let W=R.source,lt=f.get(W);delete lt[S.__cacheKey],o.memory.textures--}function $(R){let S=n.get(R);S.__depthDisposeCallback&&S.__depthDisposeCallback();let W=R.depthTexture;if(W&&W.renderTarget===R&&H(W),R.isWebGLCubeRenderTarget)for(let it=0;it<6;it++){if(Array.isArray(S.__webglFramebuffer[it]))for(let pt=0;pt<S.__webglFramebuffer[it].length;pt++)i.deleteFramebuffer(S.__webglFramebuffer[it][pt]);else i.deleteFramebuffer(S.__webglFramebuffer[it]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[it])}else{if(Array.isArray(S.__webglFramebuffer))for(let it=0;it<S.__webglFramebuffer.length;it++)i.deleteFramebuffer(S.__webglFramebuffer[it]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let it=0;it<S.__webglColorRenderbuffer.length;it++)S.__webglColorRenderbuffer[it]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[it]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let lt=R.textures;for(let it=0,pt=lt.length;it<pt;it++){let vt=n.get(lt[it]);vt.__webglTexture&&(i.deleteTexture(vt.__webglTexture),o.memory.textures--),n.remove(lt[it])}n.remove(R)}let P=0;function X(){P=0}function C(){return P}function J(R){P=R}function Q(){let R=P;return R>=s.maxTextures&&Gt("WebGLTextures: Trying to use "+(R+1)+" texture units while this GPU supports only "+s.maxTextures),P+=1,R}function G(R){let S=[];return S.push(R.wrapS),S.push(R.wrapT),S.push(R.wrapR||0),S.push(R.magFilter),S.push(R.minFilter),S.push(R.anisotropy),S.push(R.internalFormat),S.push(R.format),S.push(R.type),S.push(R.generateMipmaps),S.push(R.mipmapsAutoUpdate),S.push(R.premultiplyAlpha),S.push(R.flipY),S.push(R.unpackAlignment),S.push(R.colorSpace),S.join()}function rt(R,S){let W=n.get(R);if(R.isVideoTexture&&be(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&W.__version!==R.version){let lt=R.image;if(lt===null)Gt("WebGLRenderer: Texture marked for update but no image data found.");else if(lt.complete===!1)Gt("WebGLRenderer: Texture marked for update but image is incomplete");else{ut(W,R,S);return}}else R.isExternalTexture&&(W.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,W.__webglTexture,i.TEXTURE0+S)}function at(R,S){let W=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&W.__version!==R.version){ut(W,R,S);return}else R.isExternalTexture&&(W.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,W.__webglTexture,i.TEXTURE0+S)}function ot(R,S){let W=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&W.__version!==R.version){ut(W,R,S);return}e.bindTexture(i.TEXTURE_3D,W.__webglTexture,i.TEXTURE0+S)}function st(R,S){let W=n.get(R);if(R.version>0&&W.__version!==R.version){St(W,R,S);return}e.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture,i.TEXTURE0+S)}let Et={[li]:i.REPEAT,[Mn]:i.CLAMP_TO_EDGE,[vo]:i.MIRRORED_REPEAT},Zt={[Oe]:i.NEAREST,[Ru]:i.NEAREST_MIPMAP_NEAREST,[_r]:i.NEAREST_MIPMAP_LINEAR,[Qe]:i.LINEAR,[Ko]:i.LINEAR_MIPMAP_NEAREST,[Jn]:i.LINEAR_MIPMAP_LINEAR},wt={[Lu]:i.NEVER,[sc]:i.ALWAYS,[Du]:i.LESS,[nc]:i.LEQUAL,[Nu]:i.EQUAL,[ic]:i.GEQUAL,[Uu]:i.GREATER,[Fu]:i.NOTEQUAL};function Nt(R,S){if(S.type===gn&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===Qe||S.magFilter===Ko||S.magFilter===_r||S.magFilter===Jn||S.minFilter===Qe||S.minFilter===Ko||S.minFilter===_r||S.minFilter===Jn)&&Gt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,Et[S.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,Et[S.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,Et[S.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,Zt[S.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,Zt[S.minFilter]),S.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,wt[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Oe||S.minFilter!==_r&&S.minFilter!==Jn||S.type===gn&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){let W=t.get("EXT_texture_filter_anisotropic");i.texParameterf(R,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Ot(R,S){let W=!1;R.__webglInit===void 0&&(R.__webglInit=!0,S.addEventListener("dispose",D),I(S));let lt=S.source,it=f.get(lt);it===void 0&&(it={},f.set(lt,it));let pt=G(S);if(pt!==R.__cacheKey){it[pt]===void 0&&(it[pt]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,W=!0),it[pt].usedTimes++;let vt=it[R.__cacheKey];vt!==void 0&&(it[R.__cacheKey].usedTimes--,vt.usedTimes===0&&z(S)),R.__cacheKey=pt,R.__webglTexture=it[pt].texture}return W}function tt(R,S,W){return Math.floor(Math.floor(R/W)/S)}function ct(R,S,W,lt){let pt=R.updateRanges;if(pt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,S.width,S.height,W,lt,S.data);else{pt.sort((N,nt)=>N.start-nt.start);let vt=0;for(let N=1;N<pt.length;N++){let nt=pt[vt],K=pt[N],xt=nt.start+nt.count,ft=tt(K.start,S.width,4),mt=tt(nt.start,S.width,4);K.start<=xt+1&&ft===mt&&tt(K.start+K.count-1,S.width,4)===ft?nt.count=Math.max(nt.count,K.start+K.count-nt.start):(++vt,pt[vt]=K)}pt.length=vt+1;let j=e.getParameter(i.UNPACK_ROW_LENGTH),et=e.getParameter(i.UNPACK_SKIP_PIXELS),gt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,S.width);for(let N=0,nt=pt.length;N<nt;N++){let K=pt[N],xt=Math.floor(K.start/4),ft=Math.ceil(K.count/4),mt=xt%S.width,Bt=Math.floor(xt/S.width),te=ft,ht=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,mt),e.pixelStorei(i.UNPACK_SKIP_ROWS,Bt),e.texSubImage2D(i.TEXTURE_2D,0,mt,Bt,te,ht,W,lt,S.data)}R.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,j),e.pixelStorei(i.UNPACK_SKIP_PIXELS,et),e.pixelStorei(i.UNPACK_SKIP_ROWS,gt)}}function ut(R,S,W){let lt=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(lt=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(lt=i.TEXTURE_3D);let it=Ot(R,S),pt=S.source;e.bindTexture(lt,R.__webglTexture,i.TEXTURE0+W);let vt=n.get(pt);if(pt.version!==vt.__version||it===!0){if(e.activeTexture(i.TEXTURE0+W),(typeof ImageBitmap<"u"&&S.image instanceof ImageBitmap)===!1){let ht=oe.getPrimaries(oe.workingColorSpace),zt=S.colorSpace===Kn?null:oe.getPrimaries(S.colorSpace),Kt=S.colorSpace===Kn||ht===zt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Kt)}e.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment);let et=_(S.image,!1,s.maxTextureSize);et=kt(S,et);let gt=r.convert(S.format,S.colorSpace),N=r.convert(S.type),nt=T(S.internalFormat,gt,N,S.normalized,S.colorSpace,S.isVideoTexture);Nt(lt,S);let K,xt=S.mipmaps,ft=S.isVideoTexture!==!0,mt=vt.__version===void 0||it===!0,Bt=pt.dataReady,te=M(S,et);if(S.isDepthTexture)nt=x(S.format===$n,S.type),mt&&(ft?e.texStorage2D(i.TEXTURE_2D,1,nt,et.width,et.height):e.texImage2D(i.TEXTURE_2D,0,nt,et.width,et.height,0,gt,N,null));else if(S.isDataTexture)if(xt.length>0){ft&&mt&&e.texStorage2D(i.TEXTURE_2D,te,nt,xt[0].width,xt[0].height);for(let ht=0,zt=xt.length;ht<zt;ht++)K=xt[ht],ft?Bt&&e.texSubImage2D(i.TEXTURE_2D,ht,0,0,K.width,K.height,gt,N,K.data):e.texImage2D(i.TEXTURE_2D,ht,nt,K.width,K.height,0,gt,N,K.data);S.generateMipmaps=!1}else ft?(mt&&e.texStorage2D(i.TEXTURE_2D,te,nt,et.width,et.height),Bt&&ct(S,et,gt,N)):e.texImage2D(i.TEXTURE_2D,0,nt,et.width,et.height,0,gt,N,et.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){ft&&mt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,te,nt,xt[0].width,xt[0].height,et.depth);for(let ht=0,zt=xt.length;ht<zt;ht++)if(K=xt[ht],S.format!==En)if(gt!==null)if(ft){if(Bt)if(S.layerUpdates.size>0){let Kt=pc(K.width,K.height,S.format,S.type);for(let Tt of S.layerUpdates){let de=K.data.subarray(Tt*Kt/K.data.BYTES_PER_ELEMENT,(Tt+1)*Kt/K.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ht,0,0,Tt,K.width,K.height,1,gt,de)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ht,0,0,0,K.width,K.height,et.depth,gt,K.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ht,nt,K.width,K.height,et.depth,0,K.data,0,0);else Gt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ft?Bt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,ht,0,0,0,K.width,K.height,et.depth,gt,N,K.data):e.texImage3D(i.TEXTURE_2D_ARRAY,ht,nt,K.width,K.height,et.depth,0,gt,N,K.data);S.layerUpdates.size>0&&S.clearLayerUpdates()}else{ft&&mt&&e.texStorage2D(i.TEXTURE_2D,te,nt,xt[0].width,xt[0].height);for(let ht=0,zt=xt.length;ht<zt;ht++)K=xt[ht],S.format!==En?gt!==null?ft?Bt&&e.compressedTexSubImage2D(i.TEXTURE_2D,ht,0,0,K.width,K.height,gt,K.data):e.compressedTexImage2D(i.TEXTURE_2D,ht,nt,K.width,K.height,0,K.data):Gt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ft?Bt&&e.texSubImage2D(i.TEXTURE_2D,ht,0,0,K.width,K.height,gt,N,K.data):e.texImage2D(i.TEXTURE_2D,ht,nt,K.width,K.height,0,gt,N,K.data)}else if(S.isDataArrayTexture)if(ft){if(mt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,te,nt,et.width,et.height,et.depth),Bt)if(S.layerUpdates.size>0){let ht=pc(et.width,et.height,S.format,S.type);for(let zt of S.layerUpdates){let Kt=et.data.subarray(zt*ht/et.data.BYTES_PER_ELEMENT,(zt+1)*ht/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,zt,et.width,et.height,1,gt,N,Kt)}S.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,gt,N,et.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,nt,et.width,et.height,et.depth,0,gt,N,et.data);else if(S.isData3DTexture)ft?(mt&&e.texStorage3D(i.TEXTURE_3D,te,nt,et.width,et.height,et.depth),Bt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,gt,N,et.data)):e.texImage3D(i.TEXTURE_3D,0,nt,et.width,et.height,et.depth,0,gt,N,et.data);else if(S.isFramebufferTexture){if(mt)if(ft)e.texStorage2D(i.TEXTURE_2D,te,nt,et.width,et.height);else{let ht=et.width,zt=et.height;for(let Kt=0;Kt<te;Kt++)e.texImage2D(i.TEXTURE_2D,Kt,nt,ht,zt,0,gt,N,null),ht>>=1,zt>>=1}}else if(S.isHTMLTexture){if("texElementImage2D"in i){let ht=i.canvas;if(ht.hasAttribute("layoutsubtree")||ht.setAttribute("layoutsubtree","true"),et.parentNode!==ht){ht.appendChild(et),u.add(S),ht.onpaint=zt=>{let Kt=zt.changedElements;for(let Tt of u)Kt.includes(Tt.image)&&(Tt.needsUpdate=!0)},ht.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,et);else{let Kt=i.RGBA,Tt=i.RGBA,de=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Kt,Tt,de,et)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(xt.length>0){if(ft&&mt){let ht=Xt(xt[0]);e.texStorage2D(i.TEXTURE_2D,te,nt,ht.width,ht.height)}for(let ht=0,zt=xt.length;ht<zt;ht++)K=xt[ht],ft?Bt&&e.texSubImage2D(i.TEXTURE_2D,ht,0,0,gt,N,K):e.texImage2D(i.TEXTURE_2D,ht,nt,gt,N,K);S.generateMipmaps=!1}else if(ft){if(mt){let ht=Xt(et);e.texStorage2D(i.TEXTURE_2D,te,nt,ht.width,ht.height)}Bt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,gt,N,et)}else e.texImage2D(i.TEXTURE_2D,0,nt,gt,N,et);E(S)&&S.mipmapsAutoUpdate===!0&&v(lt),vt.__version=pt.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function St(R,S,W){if(S.image.length!==6)return;let lt=Ot(R,S),it=S.source;e.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+W);let pt=n.get(it);if(it.version!==pt.__version||lt===!0){e.activeTexture(i.TEXTURE0+W);let vt=oe.getPrimaries(oe.workingColorSpace),j=S.colorSpace===Kn?null:oe.getPrimaries(S.colorSpace),et=S.colorSpace===Kn||vt===j?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,et);let gt=S.isCompressedTexture||S.image[0].isCompressedTexture,N=S.image[0]&&S.image[0].isDataTexture,nt=[];for(let Tt=0;Tt<6;Tt++)!gt&&!N?nt[Tt]=_(S.image[Tt],!0,s.maxCubemapSize):nt[Tt]=N?S.image[Tt].image:S.image[Tt],nt[Tt]=kt(S,nt[Tt]);let K=nt[0],xt=r.convert(S.format,S.colorSpace),ft=r.convert(S.type),mt=T(S.internalFormat,xt,ft,S.normalized,S.colorSpace),Bt=S.isVideoTexture!==!0,te=pt.__version===void 0||lt===!0,ht=it.dataReady,zt=M(S,K);Nt(i.TEXTURE_CUBE_MAP,S);let Kt;if(S.isDepthTexture){if(mt=x(S.format===$n,S.type),te)if(Bt)e.texStorage2D(i.TEXTURE_CUBE_MAP,1,mt,K.width,K.height);else for(let Tt=0;Tt<6;Tt++)e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0,mt,K.width,K.height,0,xt,ft,null)}else if(gt){Bt&&te&&e.texStorage2D(i.TEXTURE_CUBE_MAP,zt,mt,K.width,K.height);for(let Tt=0;Tt<6;Tt++){Kt=nt[Tt].mipmaps;for(let de=0;de<Kt.length;de++){let De=Kt[de];S.format!==En?xt!==null?Bt?ht&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,de,0,0,De.width,De.height,xt,De.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,de,mt,De.width,De.height,0,De.data):Gt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Bt?ht&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,de,0,0,De.width,De.height,xt,ft,De.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,de,mt,De.width,De.height,0,xt,ft,De.data)}}}else{if(Kt=S.mipmaps,Bt&&te){Kt.length>0&&zt++;let Tt=Xt(nt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,zt,mt,Tt.width,Tt.height)}for(let Tt=0;Tt<6;Tt++)if(N){Bt?ht&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0,0,0,nt[Tt].width,nt[Tt].height,xt,ft,nt[Tt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0,mt,nt[Tt].width,nt[Tt].height,0,xt,ft,nt[Tt].data);for(let de=0;de<Kt.length;de++){let ti=Kt[de].image[Tt].image;Bt?ht&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,de+1,0,0,ti.width,ti.height,xt,ft,ti.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,de+1,mt,ti.width,ti.height,0,xt,ft,ti.data)}}else{Bt?ht&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0,0,0,xt,ft,nt[Tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0,mt,xt,ft,nt[Tt]);for(let de=0;de<Kt.length;de++){let De=Kt[de];Bt?ht&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,de+1,0,0,xt,ft,De.image[Tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,de+1,mt,xt,ft,De.image[Tt])}}}E(S)&&S.mipmapsAutoUpdate===!0&&v(i.TEXTURE_CUBE_MAP),pt.__version=it.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function dt(R,S,W,lt,it,pt){let vt=r.convert(W.format,W.colorSpace),j=r.convert(W.type),et=T(W.internalFormat,vt,j,W.normalized,W.colorSpace),gt=n.get(S),N=n.get(W);if(N.__renderTarget=S,!gt.__hasExternalTextures){let nt=Math.max(1,S.width>>pt),K=Math.max(1,S.height>>pt);it===i.TEXTURE_3D||it===i.TEXTURE_2D_ARRAY?e.texImage3D(it,pt,et,nt,K,S.depth,0,vt,j,null):e.texImage2D(it,pt,et,nt,K,0,vt,j,null)}e.bindFramebuffer(i.FRAMEBUFFER,R),yt(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,lt,it,N.__webglTexture,0,pe(S)):(it===i.TEXTURE_2D||it>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&it<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,lt,it,N.__webglTexture,pt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ht(R,S,W){if(i.bindRenderbuffer(i.RENDERBUFFER,R),S.depthBuffer){let lt=S.depthTexture,it=lt&&lt.isDepthTexture?lt.type:null,pt=x(S.stencilBuffer,it),vt=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;yt(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pe(S),pt,S.width,S.height):W?i.renderbufferStorageMultisample(i.RENDERBUFFER,pe(S),pt,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,pt,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,vt,i.RENDERBUFFER,R)}else{let lt=S.textures;for(let it=0;it<lt.length;it++){let pt=lt[it],vt=r.convert(pt.format,pt.colorSpace),j=r.convert(pt.type),et=T(pt.internalFormat,vt,j,pt.normalized,pt.colorSpace);yt(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pe(S),et,S.width,S.height):W?i.renderbufferStorageMultisample(i.RENDERBUFFER,pe(S),et,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,et,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ct(R,S,W){let lt=S.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,R),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let it=n.get(S.depthTexture);it.__renderTarget=S;let pt=lt?S.depthTexture.image[0]:S.depthTexture.image;(!it.__webglTexture||pt.width!==S.width||pt.height!==S.height)&&(pt.width=S.width,pt.height=S.height,S.depthTexture.needsUpdate=!0),lt?st(S.depthTexture,0):rt(S.depthTexture,0);let vt=it.__webglTexture,j=pe(S),et=lt?i.TEXTURE_CUBE_MAP_POSITIVE_X+W:i.TEXTURE_2D,gt=S.depthTexture.format===$n?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(S.depthTexture.format===Wn)yt(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,gt,et,vt,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,gt,et,vt,0);else if(S.depthTexture.format===$n)yt(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,gt,et,vt,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,gt,et,vt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Qt(R){let S=n.get(R),W=R.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==R.depthTexture){let lt=R.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),lt){let it=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,lt.removeEventListener("dispose",it)};lt.addEventListener("dispose",it),S.__depthDisposeCallback=it}S.__boundDepthTexture=lt}if(R.depthTexture&&!S.__autoAllocateDepthBuffer)if(W)for(let lt=0;lt<6;lt++)Ct(S.__webglFramebuffer[lt],R,lt);else R.texture.mipmaps.length>0?Ct(S.__webglFramebuffer[0],R,0):Ct(S.__webglFramebuffer,R,0);else if(W){S.__webglDepthbuffer=[];for(let lt=0;lt<6;lt++)if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[lt]),S.__webglDepthbuffer[lt]===void 0)S.__webglDepthbuffer[lt]=i.createRenderbuffer(),Ht(S.__webglDepthbuffer[lt],R,!1);else{let it=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pt=S.__webglDepthbuffer[lt];i.bindRenderbuffer(i.RENDERBUFFER,pt),i.framebufferRenderbuffer(i.FRAMEBUFFER,it,i.RENDERBUFFER,pt)}}else if(R.texture.mipmaps.length>0?e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),Ht(S.__webglDepthbuffer,R,!1);else{let it=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pt=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,pt),i.framebufferRenderbuffer(i.FRAMEBUFFER,it,i.RENDERBUFFER,pt)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function jt(R,S,W){let lt=n.get(R);S!==void 0&&dt(lt.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),W!==void 0&&Qt(R)}function ae(R){let S=R.texture,W=n.get(R),lt=n.get(S);R.addEventListener("dispose",B),I(R);let it=R.textures,pt=R.isWebGLCubeRenderTarget===!0,vt=it.length>1;if(vt||(lt.__webglTexture===void 0&&(lt.__webglTexture=i.createTexture()),lt.__version=S.version,o.memory.textures++),pt){W.__webglFramebuffer=[];for(let j=0;j<6;j++)if(S.mipmaps.length>0){W.__webglFramebuffer[j]=[];for(let et=0;et<S.mipmaps.length;et++)W.__webglFramebuffer[j][et]=i.createFramebuffer()}else W.__webglFramebuffer[j]=i.createFramebuffer()}else{if(S.mipmaps.length>0){W.__webglFramebuffer=[];for(let j=0;j<S.mipmaps.length;j++)W.__webglFramebuffer[j]=i.createFramebuffer()}else W.__webglFramebuffer=i.createFramebuffer();if(vt)for(let j=0,et=it.length;j<et;j++){let gt=n.get(it[j]);gt.__webglTexture===void 0&&(gt.__webglTexture=i.createTexture(),o.memory.textures++)}if(R.samples>0&&yt(R)===!1){W.__webglMultisampledFramebuffer=i.createFramebuffer(),W.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let j=0;j<it.length;j++){let et=it[j];W.__webglColorRenderbuffer[j]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,W.__webglColorRenderbuffer[j]);let gt=r.convert(et.format,et.colorSpace),N=r.convert(et.type),nt=T(et.internalFormat,gt,N,et.normalized,et.colorSpace,R.isXRRenderTarget===!0),K=pe(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,K,nt,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+j,i.RENDERBUFFER,W.__webglColorRenderbuffer[j])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(W.__webglDepthRenderbuffer=i.createRenderbuffer(),Ht(W.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(pt){e.bindTexture(i.TEXTURE_CUBE_MAP,lt.__webglTexture),Nt(i.TEXTURE_CUBE_MAP,S);for(let j=0;j<6;j++)if(S.mipmaps.length>0)for(let et=0;et<S.mipmaps.length;et++)dt(W.__webglFramebuffer[j][et],R,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,et);else dt(W.__webglFramebuffer[j],R,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);E(S)?v(i.TEXTURE_CUBE_MAP):S.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,S.mipmaps.length-1),e.unbindTexture()}else if(vt){for(let j=0,et=it.length;j<et;j++){let gt=it[j],N=n.get(gt),nt=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(nt=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(nt,N.__webglTexture),Nt(nt,gt),dt(W.__webglFramebuffer,R,gt,i.COLOR_ATTACHMENT0+j,nt,0),E(gt)&&v(nt)}e.unbindTexture()}else{let j=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(j=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(j,lt.__webglTexture),Nt(j,S),S.mipmaps.length>0)for(let et=0;et<S.mipmaps.length;et++)dt(W.__webglFramebuffer[et],R,S,i.COLOR_ATTACHMENT0,j,et);else dt(W.__webglFramebuffer,R,S,i.COLOR_ATTACHMENT0,j,0);E(S)?v(j):S.mipmaps.length>0&&i.texParameteri(j,i.TEXTURE_MAX_LEVEL,S.mipmaps.length-1),e.unbindTexture()}R.depthBuffer&&Qt(R)}function O(R){let S=R.textures;for(let W=0,lt=S.length;W<lt;W++){let it=S[W];if(E(it)&&it.mipmapsAutoUpdate===!0){let pt=b(R),vt=n.get(it).__webglTexture;e.bindTexture(pt,vt),v(pt),e.unbindTexture()}}}let Te=[];function ne(R){if(R.samples>0){if(yt(R)===!1){let S=R.textures,W=R.width,lt=R.height,it=i.COLOR_BUFFER_BIT,pt=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,vt=n.get(R),j=S.length>1;if(j)for(let gt=0;gt<S.length;gt++)e.bindFramebuffer(i.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,vt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,vt.__webglMultisampledFramebuffer),R.texture.mipmaps.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,vt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,vt.__webglFramebuffer);for(let gt=0;gt<S.length;gt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(it|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(it|=i.STENCIL_BUFFER_BIT)),j){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,vt.__webglColorRenderbuffer[gt]);let N=n.get(S[gt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,N,0)}i.blitFramebuffer(0,0,W,lt,0,0,W,lt,it,i.NEAREST),l===!0&&(Te.length=0,Te.push(i.COLOR_ATTACHMENT0+gt),R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&Te.push(pt),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Te))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),j)for(let gt=0;gt<S.length;gt++){e.bindFramebuffer(i.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.RENDERBUFFER,vt.__webglColorRenderbuffer[gt]);let N=n.get(S[gt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,vt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.TEXTURE_2D,N,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,vt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&l){let S=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function pe(R){return Math.min(s.maxSamples,R.samples)}function yt(R){let S=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function be(R){let S=o.render.frame;h.get(R)!==S&&(h.set(R,S),R.update())}function kt(R,S){let W=R.colorSpace,lt=R.format,it=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||W!==Zs&&W!==Kn&&(oe.getTransfer(W)===ue?(lt!==En||it!==tn)&&Gt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Wt("WebGLTextures: Unsupported texture color space:",W)),S}function Xt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=Q,this.resetTextureUnits=X,this.getTextureUnits=C,this.setTextureUnits=J,this.setTexture2D=rt,this.setTexture2DArray=at,this.setTexture3D=ot,this.setTextureCube=st,this.rebindTextures=jt,this.setupRenderTarget=ae,this.updateRenderTargetMipmap=O,this.updateMultisampleRenderTarget=ne,this.setupDepthRenderbuffer=Qt,this.setupFrameBufferTexture=dt,this.useMultisampledRTT=yt,this.dispose=k}function M_(i,t){function e(n,s=Kn){let r,o=oe.getTransfer(s);if(n===tn)return i.UNSIGNED_BYTE;if(n===jo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ta)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ql)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===jl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===$l)return i.BYTE;if(n===Kl)return i.SHORT;if(n===bs)return i.UNSIGNED_SHORT;if(n===Qo)return i.INT;if(n===Sn)return i.UNSIGNED_INT;if(n===gn)return i.FLOAT;if(n===bn)return i.HALF_FLOAT;if(n===tc)return i.ALPHA;if(n===ec)return i.RGB;if(n===En)return i.RGBA;if(n===Wn)return i.DEPTH_COMPONENT;if(n===$n)return i.DEPTH_STENCIL;if(n===ea)return i.RED;if(n===na)return i.RED_INTEGER;if(n===vi)return i.RG;if(n===ia)return i.RG_INTEGER;if(n===sa)return i.RGBA_INTEGER;if(n===yr||n===vr||n===Mr||n===Sr)if(o===ue)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===yr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Sr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===yr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===vr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Mr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Sr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ra||n===oa||n===aa||n===la)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ra)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===oa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===aa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===la)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ca||n===ha||n===ua||n===da||n===fa||n===br||n===pa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ca||n===ha)return o===ue?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ua)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===da)return r.COMPRESSED_R11_EAC;if(n===fa)return r.COMPRESSED_SIGNED_R11_EAC;if(n===br)return r.COMPRESSED_RG11_EAC;if(n===pa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ma||n===ga||n===xa||n===_a||n===ya||n===va||n===Ma||n===Sa||n===ba||n===Ea||n===wa||n===Ta||n===Aa||n===Ra)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ma)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ga)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===xa)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===_a)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ya)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===va)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ma)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Sa)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ba)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ea)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===wa)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ta)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Aa)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ra)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ca||n===Pa||n===Ia)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ca)return o===ue?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Pa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ia)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===La||n===Da||n===Er||n===Na)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===La)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Da)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Er)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Na)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Bi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var S_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,b_=`
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

}`,Rc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new sr(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new In({vertexShader:S_,fragmentShader:b_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ge(new qe(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Cc=class extends Rn{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,p=null,y=typeof XRWebGLBinding<"u",m=new Rc,g={},_=e.getContextAttributes(),E=null,v=null,b=[],T=[],x=new bt,M=null,I=null,A=new Ke;A.viewport=new _e;let D=new Ke;D.viewport=new _e;let B=[A,D],H=new Zo,L=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let rt=b[G];return rt===void 0&&(rt=new hs,b[G]=rt),rt.getTargetRaySpace()},this.getControllerGrip=function(G){let rt=b[G];return rt===void 0&&(rt=new hs,b[G]=rt),rt.getGripSpace()},this.getHand=function(G){let rt=b[G];return rt===void 0&&(rt=new hs,b[G]=rt),rt.getHandSpace()};function Y(G){let rt=T.indexOf(G.inputSource);if(rt===-1)return;let at=b[rt];at!==void 0&&(at.update(G.inputSource,G.frame,c||o),at.dispatchEvent({type:G.type,data:G.inputSource}))}function z(){s.removeEventListener("select",Y),s.removeEventListener("selectstart",Y),s.removeEventListener("selectend",Y),s.removeEventListener("squeeze",Y),s.removeEventListener("squeezestart",Y),s.removeEventListener("squeezeend",Y),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",$);for(let G=0;G<b.length;G++){let rt=T[G];rt!==null&&(T[G]=null,b[G].disconnect(rt))}L=null,k=null,m.reset();for(let G in g)delete g[G];if(t.setRenderTarget(E),f=null,d=null,u=null,s=null,v=null,Q.stop(),n.isPresenting=!1,t.setPixelRatio(M),t.setSize(x.width,x.height,!1),I!==null){let G=I.camera;G.fov=I.fov,G.zoom=I.zoom,G.updateProjectionMatrix(),I=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){r=G,n.isPresenting===!0&&Gt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){a=G,n.isPresenting===!0&&Gt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&y&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(G){if(s=G,s!==null){if(E=t.getRenderTarget(),s.addEventListener("select",Y),s.addEventListener("selectstart",Y),s.addEventListener("selectend",Y),s.addEventListener("squeeze",Y),s.addEventListener("squeezestart",Y),s.addEventListener("squeezeend",Y),s.addEventListener("end",z),s.addEventListener("inputsourceschange",$),_.xrCompatible!==!0&&await e.makeXRCompatible(),M=t.getPixelRatio(),t.getSize(x),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let at=null,ot=null,st=null;_.depth&&(st=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,at=_.stencil?$n:Wn,ot=_.stencil?Bi:Sn);let Et={colorFormat:e.RGBA8,depthFormat:st,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Et),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),v=new sn(d.textureWidth,d.textureHeight,{format:En,type:tn,depthTexture:new qn(d.textureWidth,d.textureHeight,ot,void 0,void 0,void 0,void 0,void 0,void 0,at),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let at={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,at),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new sn(f.framebufferWidth,f.framebufferHeight,{format:En,type:tn,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Q.setContext(s),Q.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function $(G){for(let rt=0;rt<G.removed.length;rt++){let at=G.removed[rt],ot=T.indexOf(at);ot>=0&&(T[ot]=null,b[ot].disconnect(at))}for(let rt=0;rt<G.added.length;rt++){let at=G.added[rt],ot=T.indexOf(at);if(ot===-1){for(let Et=0;Et<b.length;Et++)if(Et>=T.length){T.push(at),ot=Et;break}else if(T[Et]===null){T[Et]=at,ot=Et;break}if(ot===-1)break}let st=b[ot];st&&st.connect(at)}}function P(G,rt){rt===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(rt.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(s===null)return;let rt=G.near,at=G.far;m.texture!==null&&(m.depthNear>0&&(rt=m.depthNear),m.depthFar>0&&(at=m.depthFar)),H.near=D.near=A.near=rt,H.far=D.far=A.far=at,(L!==H.near||k!==H.far)&&(s.updateRenderState({depthNear:H.near,depthFar:H.far}),L=H.near,k=H.far),H.layers.mask=G.layers.mask|6,A.layers.mask=H.layers.mask&-5,D.layers.mask=H.layers.mask&-3;let ot=G.parent,st=H.cameras;P(H,ot);for(let Et=0;Et<st.length;Et++)P(st[Et],ot);H.projectionMatrix.copy(A.projectionMatrix),H.projectionMatrixInverse.copy(A.projectionMatrixInverse),I===null&&G.isPerspectiveCamera&&(I={camera:G,fov:G.fov,zoom:G.zoom}),X(G,H,ot)};function X(G,rt,at){at===null?G.matrix.copy(rt.matrixWorld):(G.matrix.copy(at.matrixWorld),G.matrix.invert(),G.matrix.multiply(rt.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(rt.projectionMatrix),G.projectionMatrixInverse.copy(rt.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=ls*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(G){l=G,d!==null&&(d.fixedFoveation=G),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=G)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(H)},this.getCameraTexture=function(G){return g[G]};let C=null;function J(G,rt){if(h=rt.getViewerPose(c||o),p=rt,h!==null){let at=h.views;f!==null&&(t.setRenderTargetFramebuffer(v,f.framebuffer),t.setRenderTarget(v));let ot=!1;at.length!==H.cameras.length&&(H.cameras.length=0,ot=!0);for(let wt=0;wt<at.length;wt++){let Nt=at[wt],Ot=null;if(f!==null)Ot=f.getViewport(Nt);else{let ct=u.getViewSubImage(d,Nt);Ot=ct.viewport,wt===0&&(t.setRenderTargetTextures(v,ct.colorTexture,ct.depthStencilTexture),t.setRenderTarget(v))}let tt=B[wt];tt===void 0&&(tt=new Ke,tt.layers.enable(wt),tt.viewport=new _e,B[wt]=tt),tt.matrix.fromArray(Nt.transform.matrix),tt.matrix.decompose(tt.position,tt.quaternion,tt.scale),tt.projectionMatrix.fromArray(Nt.projectionMatrix),tt.projectionMatrixInverse.copy(tt.projectionMatrix).invert(),tt.viewport.set(Ot.x,Ot.y,Ot.width,Ot.height),wt===0&&(H.matrix.copy(tt.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),ot===!0&&H.cameras.push(tt)}let st=s.enabledFeatures;if(st&&st.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){u=n.getBinding();let wt=u.getDepthInformation(at[0]);wt&&wt.isValid&&wt.texture&&m.init(wt,s.renderState)}if(st&&st.includes("camera-access")&&y){t.state.unbindTexture(),u=n.getBinding();for(let wt=0;wt<at.length;wt++){let Nt=at[wt].camera;if(Nt){let Ot=g[Nt];Ot||(Ot=new sr,g[Nt]=Ot);let tt=u.getCameraImage(Nt);Ot.sourceTexture=tt}}}}for(let at=0;at<b.length;at++){let ot=T[at],st=b[at];ot!==null&&st!==void 0&&st.update(ot,rt,c||o)}C&&C(G,rt),rt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:rt}),p=null}let Q=new yd;Q.setAnimationLoop(J),this.setAnimationLoop=function(G){C=G},this.dispose=function(){}}},E_=new qt,Cd=new Yt;Cd.set(-1,0,0,0,1,0,0,0,1);function w_(i,t){function e(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function n(m,g){g.color.getRGB(m.fogColor.value,uc(i)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function s(m,g,_,E,v){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(m,g):g.isMeshLambertMaterial?(r(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(m,g),u(m,g)):g.isMeshPhongMaterial?(r(m,g),h(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(m,g),d(m,g),g.isMeshPhysicalMaterial&&f(m,g,v)):g.isMeshMatcapMaterial?(r(m,g),p(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),y(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(o(m,g),g.isLineDashedMaterial&&a(m,g)):g.isPointsMaterial?l(m,g,_,E):g.isSpriteMaterial?c(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,e(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===Ye&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,e(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===Ye&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,e(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,e(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);let _=t.get(g),E=_.envMap,v=_.envMapRotation;E&&(m.envMap.value=E,m.envMapRotation.value.setFromMatrix4(E_.makeRotationFromEuler(v)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Cd),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,m.aoMapTransform))}function o(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform))}function a(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,_,E){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*_,m.scale.value=E*.5,g.map&&(m.map.value=g.map,e(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function c(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function u(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function d(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function f(m,g,_){m.ior.value=g.ior,g.diffuseRoughness>0&&(m.diffuseRoughness.value=g.diffuseRoughness,g.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=g.diffuseRoughnessMap,e(g.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Ye&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.retroreflectivity>0&&(m.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=g.iridescenceThicknessMaximum,g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function y(m,g){let _=t.get(g).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function T_(i,t,e,n){let s={},r={};function o(_,E){let v=E.program;n.uniformBlockBinding(_,v,s[_.id])}function a(_,E){let v=s[_.id];v===void 0&&(p(_),v=l(_),s[_.id]=v,_.addEventListener("dispose",m));let b=E.program;n.updateUBOMapping(_,b);let T=t.render.frame;r[_.id]!==T&&(c(_),r[_.id]=T)}function l(_){let E=i.createBuffer(),v=_.__size,b=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,v,b),i.bindBuffer(i.UNIFORM_BUFFER,null),E}function c(_){let E=s[_.id],v=_.uniforms,b=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let T=0,x=v.length;T<x;T++){let M=v[T];if(Array.isArray(M))for(let I=0,A=M.length;I<A;I++)h(M[I],T,I,b);else h(M,T,0,b)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(_,E,v,b){if(d(_,E,v,b)===!0){let T=_.__offset,x=_.value;if(Array.isArray(x)){let M=0;for(let I=0;I<x.length;I++){let A=x[I],D=y(A,!0);u(A,_.__data,M),M+=D.storage/Float32Array.BYTES_PER_ELEMENT}}else u(x,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,T,_.__data)}}function u(_,E,v){typeof _=="number"||typeof _=="boolean"?E[v]=_:_.isMatrix3?(E[v]=_.elements[0],E[v+1]=_.elements[1],E[v+2]=_.elements[2],E[v+3]=0,E[v+4]=_.elements[3],E[v+5]=_.elements[4],E[v+6]=_.elements[5],E[v+7]=0,E[v+8]=_.elements[6],E[v+9]=_.elements[7],E[v+10]=_.elements[8],E[v+11]=0):ArrayBuffer.isView(_)?E.set(_.subarray(0,E.length-v),v):_.toArray(E,v)}function d(_,E,v,b){let T=_.value,x=E+"_"+v;if(Array.isArray(T)){b[x]===void 0&&(b[x]=[]);let M=b[x],I=!1;for(let A=0;A<T.length;A++)f(T[A],M,A)===!0&&(I=!0);return I}return f(T,b,x)}function f(_,E,v){if(E[v]===void 0)return typeof _=="number"||typeof _=="boolean"?E[v]=_:ArrayBuffer.isView(_)?E[v]=_.slice():E[v]=_.clone(),!0;{let b=E[v];if(typeof _=="number"||typeof _=="boolean"){if(b!==_)return E[v]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(b.equals(_)===!1)return b.copy(_),!0}}return!1}function p(_){let E=_.uniforms,v=0,b=16;for(let x=0,M=E.length;x<M;x++){let I=Array.isArray(E[x])?E[x]:[E[x]];for(let A=0,D=I.length;A<D;A++){let B=I[A],H=Array.isArray(B.value)?B.value:[B.value],L=Array.isArray(E[x])||Array.isArray(B.value),k=v;for(let z=0,$=H.length;z<$;z++){let P=H[z],X=y(P,L),C=v%b,J=C%X.boundary,Q=C+J;v+=J,Q!==0&&b-Q<X.storage&&(v+=b-Q),z===0&&(k=v),v+=X.storage}let Y=B.type==="int"?Int32Array:B.type==="uint"?Uint32Array:Float32Array;B.__data=new Y((v-k)/Float32Array.BYTES_PER_ELEMENT),B.__offset=k}}let T=v%b;return T>0&&(v+=b-T),_.__size=v,_.__cache={},this}function y(_,E){let v={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(v.boundary=4,v.storage=4):_.isVector2?(v.boundary=8,v.storage=8):_.isVector3||_.isColor?(v.boundary=16,v.storage=12):_.isVector4?(v.boundary=16,v.storage=16):_.isMatrix3?(v.boundary=16,v.storage=48):_.isMatrix4?(v.boundary=16,v.storage=64):_.isTexture?Gt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(v.boundary=16,v.storage=_.byteLength):Gt("WebGLRenderer: Unsupported uniform value type.",_),E===!0&&(v.boundary=16,v.storage=Math.ceil(v.storage/16)*16),v}function m(_){let E=_.target;E.removeEventListener("dispose",m),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function g(){for(let _ in s)i.deleteBuffer(s[_]);s={},r={}}return{bind:o,update:a,dispose:g}}var A_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Dn=null;function R_(){return Dn===null&&(Dn=new tr(A_,16,16,vi,bn),Dn.name="DFG_LUT",Dn.minFilter=Qe,Dn.magFilter=Qe,Dn.wrapS=Mn,Dn.wrapT=Mn,Dn.generateMipmaps=!1,Dn.needsUpdate=!0),Dn}var za=class{constructor(t={}){let{canvas:e=Bu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=tn}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let y=f,m=new Set([sa,ia,na]),g=new Set([tn,Sn,bs,Bi,jo,ta]),_=new Uint32Array(4),E=new Int32Array(4),v={textures:[],min:[],max:[],resolution:[]},b=null,T=null,x=[],M=[],I=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ln,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let A=this,D=!1,B=null,H=null,L=null,k=null;this._outputColorSpace=Ee;let Y=0,z=0,$=null,P=-1,X=null,C=new _e,J=new _e,Q=null,G=new Ut(0),rt=0,at=e.width,ot=e.height,st=1,Et=null,Zt=null,wt=new _e(0,0,at,ot),Nt=new _e(0,0,at,ot),Ot=!1,tt=new ui,ct=new To,ut=!1,St=!1,dt=new qt,Ht=new U,Ct=new _e,Qt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},jt=!1;function ae(){return $===null?st:1}let O=n;function Te(w,F){return e.getContext(w,F)}let ne,pe,yt,be,kt,Xt,R,S,W,lt,it,pt,vt,j,et,gt,N,nt,K,xt,ft,mt,Bt;try{let w={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"187"}`),e.addEventListener("webglcontextlost",zt,!1),e.addEventListener("webglcontextrestored",Kt,!1),e.addEventListener("webglcontextcreationerror",Tt,!1),O===null){let F="webgl2";if(O=Te(F,w),O===null)throw Te(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}te()}catch(w){throw e.removeEventListener("webglcontextlost",zt,!1),e.removeEventListener("webglcontextrestored",Kt,!1),e.removeEventListener("webglcontextcreationerror",Tt,!1),Wt("WebGLRenderer: "+w.message),w}function te(){ne=new zg(O),ne.init(),ft=new M_(O,ne),pe=new Rg(O,ne,t,ft),yt=new y_(O,ne),pe.reversedDepthBuffer&&d&&yt.buffers.depth.setReversed(!0),H=O.createFramebuffer(),L=O.createFramebuffer(),k=O.createFramebuffer(),be=new Gg(O),kt=new r_,Xt=new v_(O,ne,yt,kt,pe,ft,be),R=new Bg(A),S=new Wp(O),mt=new Tg(O,S),W=new kg(O,S,be,mt),lt=new Wg(O,W,S,mt,be),nt=new Vg(O,pe,Xt),et=new Cg(kt),it=new s_(A,R,ne,pe,mt,et),pt=new w_(A,kt),vt=new a_,j=new f_(ne),N=new wg(A,R,yt,lt,p,l),gt=new __(A,lt,pe),Bt=new T_(O,be,pe,yt),K=new Ag(O,ne,be),xt=new Hg(O,ne,be),be.programs=it.programs,A.capabilities=pe,A.extensions=ne,A.properties=kt,A.renderLists=vt,A.shadowMap=gt,A.state=yt,A.info=be}y!==tn&&(I=new qg(y,e.width,e.height,a,s,r));let ht=new Cc(A,O);this.xr=ht,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let w=ne.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=ne.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return st},this.setPixelRatio=function(w){w!==void 0&&(st=w,this.setSize(at,ot,!1))},this.getSize=function(w){return w.set(at,ot)},this.setSize=function(w,F,Z=!0){if(ht.isPresenting){Gt("WebGLRenderer: Can't change size while VR device is presenting.");return}at=w,ot=F,e.width=Math.floor(w*st),e.height=Math.floor(F*st),Z===!0&&(e.style.width=w+"px",e.style.height=F+"px"),I!==null&&I.setSize(e.width,e.height),this.setViewport(0,0,w,F)},this.getDrawingBufferSize=function(w){return w.set(at*st,ot*st).floor()},this.setDrawingBufferSize=function(w,F,Z){at=w,ot=F,st=Z,e.width=Math.floor(w*Z),e.height=Math.floor(F*Z),this.setViewport(0,0,w,F)},this.setEffects=function(w){if(y===tn){Wt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let F=0;F<w.length;F++)if(w[F].isOutputPass===!0){Gt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}I.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(C)},this.getViewport=function(w){return w.copy(wt)},this.setViewport=function(w,F,Z,V){w.isVector4?wt.set(w.x,w.y,w.z,w.w):wt.set(w,F,Z,V),yt.viewport(C.copy(wt).multiplyScalar(ae()).round())},this.getScissor=function(w){return w.copy(Nt)},this.setScissor=function(w,F,Z,V){w.isVector4?Nt.set(w.x,w.y,w.z,w.w):Nt.set(w,F,Z,V),yt.scissor(J.copy(Nt).multiplyScalar(ae()).round())},this.getScissorTest=function(){return Ot},this.setScissorTest=function(w){yt.setScissorTest(Ot=w)},this.setOpaqueSort=function(w){Et=w},this.setTransparentSort=function(w){Zt=w},this.getClearColor=function(w){return w.copy(N.getClearColor())},this.setClearColor=function(){N.setClearColor(...arguments)},this.getClearAlpha=function(){return N.getClearAlpha()},this.setClearAlpha=function(){N.setClearAlpha(...arguments)},this.clear=function(w=!0,F=!0,Z=!0){let V=0;if(w){let q=!1;if($!==null){let Mt=$.texture.format;q=m.has(Mt)}if(q){let Mt=$.texture.type,It=g.has(Mt),_t=N.getClearColor(),Rt=N.getClearAlpha(),Ft=_t.r,Jt=_t.g,se=_t.b;It?(_[0]=Ft,_[1]=Jt,_[2]=se,_[3]=Rt,O.clearBufferuiv(O.COLOR,0,_)):(E[0]=Ft,E[1]=Jt,E[2]=se,E[3]=Rt,O.clearBufferiv(O.COLOR,0,E))}else V|=O.COLOR_BUFFER_BIT}F&&(V|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Z&&(V|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&O.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),B=w},this.dispose=function(){e.removeEventListener("webglcontextlost",zt,!1),e.removeEventListener("webglcontextrestored",Kt,!1),e.removeEventListener("webglcontextcreationerror",Tt,!1),N.dispose(),vt.dispose(),j.dispose(),Xt.dispose(),kt.dispose(),R.dispose(),lt.dispose(),W.dispose(),mt.dispose(),Bt.dispose(),it.dispose(),ht.dispose(),ht.removeEventListener("sessionstart",Qc),ht.removeEventListener("sessionend",jc),bi.stop()};function zt(w){w.preventDefault(),oc("WebGLRenderer: Context Lost."),D=!0}function Kt(){oc("WebGLRenderer: Context Restored."),D=!1;let w=be.autoReset,F=gt.enabled,Z=gt.autoUpdate,V=gt.needsUpdate,q=gt.type;te(),be.autoReset=w,gt.enabled=F,gt.autoUpdate=Z,gt.needsUpdate=V,gt.type=q}function Tt(w){Wt("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function de(w){let F=w.target;F.removeEventListener("dispose",de),De(F)}function De(w){ti(w),kt.remove(w)}function ti(w){let F=kt.get(w).programs;F!==void 0&&(F.forEach(function(Z){it.releaseProgram(Z)}),w.isShaderMaterial&&it.releaseShaderCache(w))}this.renderBufferDirect=function(w,F,Z,V,q,Mt){F===null&&(F=Qt);let It=q.isMesh&&q.matrixWorld.determinantAffine()<0,_t=nf(w,F,Z,V,q);yt.setMaterial(V,It);let Rt=Z.index,Ft=1;if(V.wireframe===!0){if(Rt=W.getWireframeAttribute(Z),Rt===void 0)return;Ft=2}let Jt=Z.drawRange,se=Z.attributes.position,Lt=Jt.start*Ft,re=(Jt.start+Jt.count)*Ft;Mt!==null&&(Lt=Math.max(Lt,Mt.start*Ft),re=Math.min(re,(Mt.start+Mt.count)*Ft)),Rt!==null?(Lt=Math.max(Lt,0),re=Math.min(re,Rt.count)):se!=null&&(Lt=Math.max(Lt,0),re=Math.min(re,se.count));let Ae=re-Lt;if(Ae<0||Ae===1/0)return;mt.setup(q,V,_t,Z,Rt);let xe,me=K;if(Rt!==null&&(xe=S.get(Rt),me=xt,me.setIndex(xe)),q.isMesh)V.wireframe===!0?(yt.setLineWidth(V.wireframeLinewidth*ae()),me.setMode(O.LINES)):me.setMode(O.TRIANGLES);else if(q.isLine){let ke=V.linewidth;ke===void 0&&(ke=1),yt.setLineWidth(ke*ae()),q.isLineSegments?me.setMode(O.LINES):q.isLineLoop?me.setMode(O.LINE_LOOP):me.setMode(O.LINE_STRIP)}else q.isPoints?me.setMode(O.POINTS):q.isSprite&&me.setMode(O.TRIANGLES);if(q.isBatchedMesh)if(ne.get("WEBGL_multi_draw"))me.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{let ke=q._multiDrawStarts,Dt=q._multiDrawCounts,Je=q._multiDrawCount,he=Rt?S.get(Rt).bytesPerElement:1,Ei=kt.get(V).currentProgram.getUniforms();for(let He=0;He<Je;He++)Ei.setValue(O,"_gl_DrawID",He),me.render(ke[He]/he,Dt[He])}else if(q.isInstancedMesh)me.renderInstances(Lt,Ae,q.count);else if(Z.isInstancedBufferGeometry){let ke=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Dt=Math.min(Z.instanceCount,ke);me.renderInstances(Lt,Ae,Dt)}else me.render(Lt,Ae)};function Kc(w,F,Z,V){B!==null&&w.isNodeMaterial&&B.setObject(V,w),ut===!0&&et.setState(w,Z,!1),w.transparent===!0&&w.side===an&&w.forceSinglePass===!1?(w.side=Ye,w.needsUpdate=!0,Is(w,F,V),w.side=_i,w.needsUpdate=!0,Is(w,F,V),w.side=an):Is(w,F,V)}this.compile=function(w,F,Z=null){Z===null&&(Z=w),B!==null&&B.renderStart(w,F,Z),T=j.get(Z),T.init(F),M.push(T),Z.traverseVisible(function(q){q.isLight&&q.layers.test(F.layers)&&(T.pushLight(q),q.castShadow&&T.pushShadow(q))}),w!==Z&&w.traverseVisible(function(q){q.isLight&&q.layers.test(F.layers)&&(T.pushLight(q),q.castShadow&&T.pushShadow(q))}),T.setupLights(),B!==null&&B.updateLights(T.state.lightsArray),St=this.localClippingEnabled,ut=et.init(this.clippingPlanes,St),ut===!0&&et.setGlobalState(this.clippingPlanes,F),B!==null&&gt.render(T.state.shadowsArray,Z,F);let V=new Set;return w.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;let Mt=q.material;if(Mt)if(Array.isArray(Mt))for(let It=0;It<Mt.length;It++){let _t=Mt[It];Kc(_t,Z,F,q),V.add(_t)}else Kc(Mt,Z,F,q),V.add(Mt)}),T=M.pop(),B!==null&&B.renderEnd(),V},this.compileAsync=function(w,F,Z=null){let V=this.compile(w,F,Z);return new Promise(q=>{function Mt(){if(V.forEach(function(It){let Rt=kt.get(It).currentProgram;(Rt===void 0||Rt.isReady())&&V.delete(It)}),V.size===0){q(w);return}setTimeout(Mt,10)}ne.get("KHR_parallel_shader_compile")!==null?Mt():setTimeout(Mt,10)})};let $a=null;function tf(w){$a&&$a(w)}function Qc(){bi.stop()}function jc(){bi.start()}let bi=new yd;bi.setAnimationLoop(tf),typeof self<"u"&&bi.setContext(self),this.setAnimationLoop=function(w){$a=w,ht.setAnimationLoop(w),w===null?bi.stop():bi.start()},ht.addEventListener("sessionstart",Qc),ht.addEventListener("sessionend",jc),this.render=function(w,F){if(F!==void 0&&F.isCamera!==!0){Wt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;B!==null&&B.renderStart(w,F);let Z=ht.enabled===!0&&ht.isPresenting===!0,V=I!==null&&($===null||Z)&&I.begin(A,$);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),ht.enabled===!0&&ht.isPresenting===!0&&(I===null||I.isCompositing()===!1)&&(ht.cameraAutoUpdate===!0&&ht.updateCamera(F),F=ht.getCamera()),w.isScene===!0&&w.onBeforeRender(A,w,F,$),T=j.get(w,M.length),T.init(F),T.state.textureUnits=Xt.getTextureUnits(),M.push(T),dt.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),F.isArrayCamera?ct.setFromArrayCamera(F):tt.setFromProjectionMatrix(dt,fn,F.reversedDepth),St=this.localClippingEnabled,ut=et.init(this.clippingPlanes,St),b=vt.get(w,x.length),b.init(),x.push(b),this.info.render.frame++,ht.enabled===!0&&ht.isPresenting===!0){let It=A.xr.getDepthSensingMesh();It!==null&&Ka(It,F,-1/0,A.sortObjects)}Ka(w,F,0,A.sortObjects),b.finish(),B!==null&&B.updateLights(T.state.lightsArray),A.sortObjects===!0&&b.sort(Et,Zt),jt=ht.enabled===!1||ht.isPresenting===!1||ht.hasDepthSensing()===!1,jt&&N.addToRenderList(b,w),this.info.autoReset===!0&&this.info.reset(),ut===!0&&et.beginShadows();let q=T.state.shadowsArray;if(gt.render(q,w,F),ut===!0&&et.endShadows(),(V&&I.hasRenderPass())===!1){let It=b.opaque,_t=b.transmissive;if(T.setupLights(),F.isArrayCamera){let Rt=F.cameras;if(_t.length>0)for(let Ft=0,Jt=Rt.length;Ft<Jt;Ft++){let se=Rt[Ft];eh(It,_t,w,se)}jt&&N.render(w);for(let Ft=0,Jt=Rt.length;Ft<Jt;Ft++){let se=Rt[Ft];th(b,w,se,se.viewport)}}else _t.length>0&&eh(It,_t,w,F),jt&&N.render(w),th(b,w,F)}$!==null&&z===0&&(Xt.updateMultisampleRenderTarget($),Xt.updateRenderTargetMipmap($)),V&&I.end(A),w.isScene===!0&&w.onAfterRender(A,w,F),mt.resetDefaultState(),P=-1,X=null,M.pop(),M.length>0?(T=M[M.length-1],Xt.setTextureUnits(T.state.textureUnits),ut===!0&&et.setGlobalState(A.clippingPlanes,T.state.camera)):T=null,x.pop(),x.length>0?b=x[x.length-1]:b=null,B!==null&&B.renderEnd()};function Ka(w,F,Z,V){if(w.visible===!1)return;if(w.layers.test(F.layers)){if(w.isGroup)Z=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(F);else if(w.isLight)T.pushLight(w),w.castShadow&&T.pushShadow(w);else if(w.isSprite){let It=F.isArrayCamera?ct:tt;if(!w.frustumCulled||w.intersectsFrustum(It)){V&&Ct.setFromMatrixPosition(w.matrixWorld).applyMatrix4(dt);let _t=lt.update(w),Rt=w.material;Rt.visible&&b.push(w,_t,Rt,Z,Ct.z,null,F)}}else if(w.isMesh||w.isLine||w.isPoints){let It=F.isArrayCamera?ct:tt;if(!w.frustumCulled||w.intersectsFrustum(It)){let _t=lt.update(w),Rt=w.material;if(V&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Ct.copy(w.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),Ct.copy(_t.boundingSphere.center)),Ct.applyMatrix4(w.matrixWorld).applyMatrix4(dt)),Array.isArray(Rt)){let Ft=_t.groups;for(let Jt=0,se=Ft.length;Jt<se;Jt++){let Lt=Ft[Jt],re=Rt[Lt.materialIndex];re&&re.visible&&b.push(w,_t,re,Z,Ct.z,Lt,F)}}else Rt.visible&&b.push(w,_t,Rt,Z,Ct.z,null,F)}}}let Mt=w.children;for(let It=0,_t=Mt.length;It<_t;It++)Ka(Mt[It],F,Z,V)}function th(w,F,Z,V){let{opaque:q,transmissive:Mt,transparent:It}=w;T.setupLightsView(Z),ut===!0&&et.setGlobalState(A.clippingPlanes,Z),V&&yt.viewport(C.copy(V)),q.length>0&&Dr(q,F,Z),Mt.length>0&&Dr(Mt,F,Z),It.length>0&&Dr(It,F,Z),yt.buffers.depth.setTest(!0),yt.buffers.depth.setMask(!0),yt.buffers.color.setMask(!0),yt.setPolygonOffset(!1)}function eh(w,F,Z,V){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[V.id]===void 0){let Lt=ne.has("EXT_color_buffer_half_float")||ne.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[V.id]=new sn(1,1,{generateMipmaps:!0,type:Lt?bn:tn,minFilter:Jn,samples:Math.max(4,pe.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:oe.workingColorSpace})}let Mt=T.state.transmissionRenderTarget[V.id],It=V.viewport||C;Mt.setSize(It.z*A.transmissionResolutionScale,It.w*A.transmissionResolutionScale);let _t=A.getRenderTarget(),Rt=A.getActiveCubeFace(),Ft=A.getActiveMipmapLevel();A.setRenderTarget(Mt),A.getClearColor(G),rt=A.getClearAlpha(),rt<1&&A.setClearColor(16777215,.5),A.clear(),jt&&N.render(Z);let Jt=A.toneMapping;A.toneMapping=Ln;let se=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),T.setupLightsView(V),ut===!0&&et.setGlobalState(A.clippingPlanes,V),Dr(w,Z,V),Xt.updateMultisampleRenderTarget(Mt),Xt.updateRenderTargetMipmap(Mt),ne.has("WEBGL_multisampled_render_to_texture")===!1){let Lt=!1;for(let re=0,Ae=F.length;re<Ae;re++){let xe=F[re],{object:me,geometry:ke,material:Dt,group:Je}=xe;if(Dt.side===an&&me.layers.test(V.layers)){let he=Dt.side;Dt.side=Ye,Dt.needsUpdate=!0,nh(me,Z,V,ke,Dt,Je),Dt.side=he,Dt.needsUpdate=!0,Lt=!0}}Lt===!0&&(Xt.updateMultisampleRenderTarget(Mt),Xt.updateRenderTargetMipmap(Mt))}A.setRenderTarget(_t,Rt,Ft),A.setClearColor(G,rt),se!==void 0&&(V.viewport=se),A.toneMapping=Jt}function Dr(w,F,Z){let V=F.isScene===!0?F.overrideMaterial:null;for(let q=0,Mt=w.length;q<Mt;q++){let It=w[q],{object:_t,geometry:Rt,group:Ft}=It,Jt=It.material;Jt.allowOverride===!0&&V!==null&&(Jt=V),_t.layers.test(Z.layers)&&nh(_t,F,Z,Rt,Jt,Ft)}}function nh(w,F,Z,V,q,Mt){B!==null&&q.isNodeMaterial&&B.setObject(w,q),w.onBeforeRender(A,F,Z,V,q,Mt),w.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),q.onBeforeRender(A,F,Z,V,w,Mt),q.transparent===!0&&q.side===an&&q.forceSinglePass===!1?(q.side=Ye,q.needsUpdate=!0,A.renderBufferDirect(Z,F,V,q,w,Mt),q.side=_i,q.needsUpdate=!0,A.renderBufferDirect(Z,F,V,q,w,Mt),q.side=an):A.renderBufferDirect(Z,F,V,q,w,Mt),w.onAfterRender(A,F,Z,V,q,Mt)}function ih(w){let F=0;for(let Z of w)Z.texture!==null&&F++;return F}function Is(w,F,Z){F.isScene!==!0&&(F=Qt);let V=kt.get(w),q=T.state.lights,Mt=T.state.shadowsArray,It=q.state.version,_t=it.getParameters(w,q.state,Mt,F,Z,T.state.lightProbeGridArray),Rt=it.getProgramCacheKey(_t),Ft=V.programs;V.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?F.environment:null,V.fog=F.fog;let Jt=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;V.envMap=R.get(w.envMap||V.environment,Jt),V.envMapRotation=V.environment!==null&&w.envMap===null?F.environmentRotation:w.envMapRotation,Ft===void 0&&(w.addEventListener("dispose",de),Ft=new Map,V.programs=Ft,V.programVariants=new Map);let se=Ft.get(Rt);if(se!==void 0){if(V.currentProgram===se&&V.lightsStateVersion===It)return rh(w,_t),se}else _t.uniforms=it.getUniforms(w),B!==null&&w.isNodeMaterial&&B.build(w,Z,_t),w.onBeforeCompile(_t,A),se=it.acquireProgram(_t,Rt),Ft.set(Rt,se),V.uniforms=_t.uniforms;let Lt=V.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Lt.clippingPlanes=et.uniform),rh(w,_t),V.needsLights=rf(w),V.lightsStateVersion=It,V.needsLights&&(Lt.ambientLightColor.value=q.state.ambient,Lt.lightProbe.value=q.state.probe,Lt.sunLights.value=q.state.sun,Lt.sunLightShadows.value=q.state.sunShadow,Lt.directionalLights.value=q.state.directional,Lt.directionalLightShadows.value=q.state.directionalShadow,Lt.spotLights.value=q.state.spot,Lt.spotLightShadows.value=q.state.spotShadow,Lt.rectAreaLights.value=q.state.rectArea,Lt.ltc_1.value=q.state.rectAreaLTC1,Lt.ltc_2.value=q.state.rectAreaLTC2,Lt.pointLights.value=q.state.point,Lt.pointLightShadows.value=q.state.pointShadow,Lt.hemisphereLights.value=q.state.hemi,Lt.sunShadowMatrix.value=q.state.sunShadowMatrix,Lt.sunShadowCascade.value=q.state.sunShadowCascade,Lt.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Lt.spotLightMatrix.value=q.state.spotLightMatrix,Lt.spotLightMap.value=q.state.spotLightMap,Lt.pointShadowMatrix.value=q.state.pointShadowMatrix),V.numLightProbeGrids=ih(T.state.lightProbeGridArray),V.currentProgram=se,V.uniformsList=null,se}function ef(w,F,Z,V,q){let Mt=kt.get(w),It=Mt.currentProgram.id+","+V+","+q,_t=Mt.programVariants.get(It);return _t===void 0?(_t=Is(w,F,Z),Mt.programVariants.set(It,_t)):(Mt.currentProgram=_t,Mt.uniformsList=null,Mt.outputColorSpace=V,Mt.toneMapping=q),_t}function sh(w){if(w.uniformsList===null){let F=w.currentProgram.getUniforms();w.uniformsList=Es.seqWithValue(F.seq,w.uniforms)}return w.uniformsList}function rh(w,F){let Z=kt.get(w);Z.outputColorSpace=F.outputColorSpace,Z.batching=F.batching,Z.batchingColor=F.batchingColor,Z.instancing=F.instancing,Z.instancingColor=F.instancingColor,Z.instancingMorph=F.instancingMorph,Z.skinning=F.skinning,Z.morphTargets=F.morphTargets,Z.morphNormals=F.morphNormals,Z.morphColors=F.morphColors,Z.morphTargetsCount=F.morphTargetsCount,Z.numClippingPlanes=F.numClippingPlanes,Z.numIntersection=F.numClipIntersection,Z.vertexAlphas=F.vertexAlphas,Z.vertexTangents=F.vertexTangents,Z.toneMapping=F.toneMapping}function nf(w,F,Z,V,q){F.isScene!==!0&&(F=Qt),Xt.resetTextureUnits();let Mt=F.fog,It=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?F.environment:null,_t=$===null?A.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:oe.workingColorSpace,Rt=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,Ft=R.get(V.envMap||It,Rt),Jt=V.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,se=!!Z.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Lt=!!Z.morphAttributes.position,re=!!Z.morphAttributes.normal,Ae=!!Z.morphAttributes.color,xe=Ln;V.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(xe=A.toneMapping);let me=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,ke=me!==void 0?me.length:0,Dt=kt.get(V),Je=T.state.lights;if(ut===!0&&(St===!0||w!==X)){let Me=w===X&&V.id===P;et.setState(V,w,Me)}let he=!1,Ei=!1;V.version===Dt.__version?Dt.needsLights&&Dt.lightsStateVersion!==Je.state.version||q.isBatchedMesh&&Dt.batching===!1||!q.isBatchedMesh&&Dt.batching===!0||q.isBatchedMesh&&Dt.batchingColor===!0&&q._colorsTexture===null||q.isBatchedMesh&&Dt.batchingColor===!1&&q._colorsTexture!==null||q.isInstancedMesh&&Dt.instancing===!1||!q.isInstancedMesh&&Dt.instancing===!0||q.isSkinnedMesh&&Dt.skinning===!1||!q.isSkinnedMesh&&Dt.skinning===!0||q.isInstancedMesh&&Dt.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&Dt.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&Dt.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&Dt.instancingMorph===!1&&q.morphTexture!==null||Dt.envMap!==Ft||V.fog===!0&&Dt.fog!==Mt||Dt.numClippingPlanes!==void 0&&(Dt.numClippingPlanes!==et.numPlanes||Dt.numIntersection!==et.numIntersection)||Dt.vertexAlphas!==Jt||Dt.vertexTangents!==se||Dt.morphTargets!==Lt||Dt.morphNormals!==re||Dt.morphColors!==Ae||Dt.morphTargetsCount!==ke||Dt.numLightProbeGrids!==ih(T.state.lightProbeGridArray)?he=!0:(Dt.outputColorSpace!==_t||Dt.toneMapping!==xe)&&(Ei=!0):(he=!0,Dt.__version=V.version);let He=Dt.currentProgram;(he===!0||Ei===!0)&&(He=Ei===!0?ef(V,F,q,_t,xe):Is(V,F,q),B&&V.isNodeMaterial&&B.onUpdateProgram(V,He,Dt));let Nr=!1,ei=!1,wi=!1,le=He.getUniforms(),ze=Dt.uniforms;if(yt.useProgram(He.program)&&(Nr=!0,ei=!0,wi=!0),V.id!==P&&(P=V.id,ei=!0),Nr||X!==w){yt.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),le.setValue(O,"projectionMatrix",w.projectionMatrix),le.setValue(O,"viewMatrix",w.matrixWorldInverse);let Ne=le.map.cameraPosition;Ne!==void 0&&Ne.setValue(O,Ht.setFromMatrixPosition(w.matrixWorld)),pe.logarithmicDepthBuffer&&le.setValue(O,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&le.setValue(O,"isOrthographic",w.isOrthographicCamera===!0),X!==w&&(X=w,ei=!0,wi=!0)}if(Dt.needsLights&&(Je.state.sunShadowMap.length>0&&le.setValue(O,"sunShadowMap",Je.state.sunShadowMap,Xt),Je.state.directionalShadowMap.length>0&&le.setValue(O,"directionalShadowMap",Je.state.directionalShadowMap,Xt),Je.state.spotShadowMap.length>0&&le.setValue(O,"spotShadowMap",Je.state.spotShadowMap,Xt),Je.state.pointShadowMap.length>0&&le.setValue(O,"pointShadowMap",Je.state.pointShadowMap,Xt)),q.isSkinnedMesh){le.setOptional(O,q,"bindMatrix"),le.setOptional(O,q,"bindMatrixInverse");let Me=q.skeleton;Me&&(Me.boneTexture===null&&Me.computeBoneTexture(),le.setValue(O,"boneTexture",Me.boneTexture,Xt))}q.isBatchedMesh&&(le.setOptional(O,q,"batchingTexture"),le.setValue(O,"batchingTexture",q._matricesTexture,Xt),le.setOptional(O,q,"batchingIdTexture"),le.setValue(O,"batchingIdTexture",q._indirectTexture,Xt),le.setOptional(O,q,"batchingColorTexture"),q._colorsTexture!==null&&le.setValue(O,"batchingColorTexture",q._colorsTexture,Xt));let xn=Z.morphAttributes;if((xn.position!==void 0||xn.normal!==void 0||xn.color!==void 0)&&nt.update(q,Z,He),(ei||Dt.receiveShadow!==q.receiveShadow)&&(Dt.receiveShadow=q.receiveShadow,le.setValue(O,"receiveShadow",q.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&F.environment!==null&&(ze.envMapIntensity.value=F.environmentIntensity),ze.dfgLUT!==void 0&&(ze.dfgLUT.value=R_()),ei){if(le.setValue(O,"toneMappingExposure",A.toneMappingExposure),Dt.needsLights&&sf(ze,wi),Mt&&V.fog===!0&&pt.refreshFogUniforms(ze,Mt),pt.refreshMaterialUniforms(ze,V,st,ot,T.state.transmissionRenderTarget[w.id]),Dt.needsLights&&Dt.numLightProbeGrids>0){let Me=v,Ne=0;for(let Fn of T.state.lightProbeGridArray)Fn.texture!==null&&(Me.textures[Ne]=Fn.texture,Me.min[Ne]=Fn.boundingBox.min,Me.max[Ne]=Fn.boundingBox.max,Me.resolution[Ne]=Fn.resolution,Ne++);for(let Fn in Me)Me[Fn].length=Ne;ze.probesSH.value=Me.textures,ze.probesMin.value=Me.min,ze.probesMax.value=Me.max,ze.probesResolution.value=Me.resolution}Es.upload(O,sh(Dt),ze,Xt)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Es.upload(O,sh(Dt),ze,Xt),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&le.setValue(O,"center",q.center),le.setValue(O,"modelViewMatrix",q.modelViewMatrix),le.setValue(O,"normalMatrix",q.normalMatrix),le.setValue(O,"modelMatrix",q.matrixWorld),V.uniformsGroups!==void 0){let Me=V.uniformsGroups;for(let Ne=0,Fn=Me.length;Ne<Fn;Ne++){let ah=Me[Ne];Bt.update(ah,He),Bt.bind(ah,He)}}return He}function sf(w,F){w.ambientLightColor.needsUpdate=F,w.lightProbe.needsUpdate=F,w.sunLights.needsUpdate=F,w.sunLightShadows.needsUpdate=F,w.directionalLights.needsUpdate=F,w.directionalLightShadows.needsUpdate=F,w.pointLights.needsUpdate=F,w.pointLightShadows.needsUpdate=F,w.spotLights.needsUpdate=F,w.spotLightShadows.needsUpdate=F,w.rectAreaLights.needsUpdate=F,w.hemisphereLights.needsUpdate=F}function rf(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return $},this.setRenderTargetTextures=function(w,F,Z){let V=kt.get(w);V.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),kt.get(w.texture).__webglTexture=F,kt.get(w.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:Z,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,F){let Z=kt.get(w);Z.__webglFramebuffer=F,Z.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(w,F=0,Z=0){$=w,Y=F,z=Z;let V=null,q=!1,Mt=!1;if(w){let _t=kt.get(w);if(_t.__useDefaultFramebuffer!==void 0){yt.bindFramebuffer(O.FRAMEBUFFER,_t.__webglFramebuffer),C.copy(w.viewport),J.copy(w.scissor),Q=w.scissorTest,yt.viewport(C),yt.scissor(J),yt.setScissorTest(Q),P=-1;return}else if(_t.__webglFramebuffer===void 0)Xt.setupRenderTarget(w);else if(_t.__hasExternalTextures)Xt.rebindTextures(w,kt.get(w.texture).__webglTexture,kt.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let Jt=w.depthTexture;if(_t.__boundDepthTexture!==Jt){if(Jt!==null&&kt.has(Jt)&&(w.width!==Jt.image.width||w.height!==Jt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Xt.setupDepthRenderbuffer(w)}}let Rt=w.texture;(Rt.isData3DTexture||Rt.isDataArrayTexture||Rt.isCompressedArrayTexture)&&(Mt=!0);let Ft=kt.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ft[F])?V=Ft[F][Z]:V=Ft[F],q=!0):w.samples>0&&Xt.useMultisampledRTT(w)===!1?V=kt.get(w).__webglMultisampledFramebuffer:Array.isArray(Ft)?V=Ft[Z]:V=Ft,C.copy(w.viewport),J.copy(w.scissor),Q=w.scissorTest}else C.copy(wt).multiplyScalar(st).floor(),J.copy(Nt).multiplyScalar(st).floor(),Q=Ot;if(Z!==0&&(V=H),yt.bindFramebuffer(O.FRAMEBUFFER,V)&&yt.drawBuffers(w,V),yt.viewport(C),yt.scissor(J),yt.setScissorTest(Q),q){let _t=kt.get(w.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+F,_t.__webglTexture,Z)}else if(Mt){let _t=F;for(let Rt=0;Rt<w.textures.length;Rt++){let Ft=kt.get(w.textures[Rt]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+Rt,Ft.__webglTexture,Z,_t)}}else if(w!==null&&Z!==0){let _t=kt.get(w.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,_t.__webglTexture,Z)}P=-1};function oh(w){let F=kt.get(w);return(F.__readFormat!==w.format||F.__readType!==w.type)&&(F.__readFormat=w.format,F.__readType=w.type,F.__formatReadable=pe.textureFormatReadable(w.format),F.__typeReadable=pe.textureTypeReadable(w.type)),F}this.readRenderTargetPixels=function(w,F,Z,V,q,Mt,It,_t=0){if(!(w&&w.isWebGLRenderTarget)){Wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Rt=kt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&It!==void 0&&(Rt=Rt[It],Array.isArray(Rt)&&(Rt=Rt[0])),Rt){yt.bindFramebuffer(O.FRAMEBUFFER,Rt);try{let Ft=w.textures[_t],Jt=Ft.format,se=Ft.type;w.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+_t);let Lt=oh(Ft);if(Lt.__formatReadable===!1){Wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Lt.__typeReadable===!1){Wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=w.width-V&&Z>=0&&Z<=w.height-q&&O.readPixels(F,Z,V,q,ft.convert(Jt),ft.convert(se),Mt)}finally{let Ft=$!==null?kt.get($).__webglFramebuffer:null;yt.bindFramebuffer(O.FRAMEBUFFER,Ft)}}},this.readRenderTargetPixelsAsync=async function(w,F,Z,V,q,Mt,It,_t=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Rt=kt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&It!==void 0&&(Rt=Rt[It],Array.isArray(Rt)&&(Rt=Rt[0])),Rt)if(F>=0&&F<=w.width-V&&Z>=0&&Z<=w.height-q){yt.bindFramebuffer(O.FRAMEBUFFER,Rt);let Ft=w.textures[_t],Jt=Ft.format,se=Ft.type;w.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+_t);let Lt=oh(Ft);if(Lt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Lt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let re=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,re),O.bufferData(O.PIXEL_PACK_BUFFER,Mt.byteLength,O.STREAM_READ),O.readPixels(F,Z,V,q,ft.convert(Jt),ft.convert(se),0),O.bindBuffer(O.PIXEL_PACK_BUFFER,null);let Ae=$!==null?kt.get($).__webglFramebuffer:null;yt.bindFramebuffer(O.FRAMEBUFFER,Ae);let xe=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await ku(O,xe,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,re),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,Mt),O.bindBuffer(O.PIXEL_PACK_BUFFER,null),O.deleteBuffer(re),O.deleteSync(xe),Mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,F=null,Z=0){let V=Math.pow(2,-Z),q=Math.floor(w.image.width*V),Mt=Math.floor(w.image.height*V),It=F!==null?F.x:0,_t=F!==null?F.y:0;Xt.setTexture2D(w,0),O.copyTexSubImage2D(O.TEXTURE_2D,Z,0,0,It,_t,q,Mt),yt.unbindTexture()},this.copyTextureToTexture=function(w,F,Z=null,V=null,q=0,Mt=0){let It,_t,Rt,Ft,Jt,se,Lt,re,Ae,xe=w.isCompressedTexture?w.mipmaps[Mt]:w.image;if(Z!==null)It=Z.max.x-Z.min.x,_t=Z.max.y-Z.min.y,Rt=Z.isBox3?Z.max.z-Z.min.z:1,Ft=Z.min.x,Jt=Z.min.y,se=Z.isBox3?Z.min.z:0;else{let le=Math.pow(2,-q);It=Math.floor(xe.width*le),_t=Math.floor(xe.height*le),w.isDataArrayTexture?Rt=xe.depth:w.isData3DTexture?Rt=Math.floor(xe.depth*le):Rt=1,Ft=0,Jt=0,se=0}V!==null?(Lt=V.x,re=V.y,Ae=V.z):(Lt=0,re=0,Ae=0);let me=ft.convert(F.format),ke=ft.convert(F.type),Dt;F.isData3DTexture?(Xt.setTexture3D(F,0),Dt=O.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Xt.setTexture2DArray(F,0),Dt=O.TEXTURE_2D_ARRAY):(Xt.setTexture2D(F,0),Dt=O.TEXTURE_2D),yt.activeTexture(O.TEXTURE0),yt.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,F.flipY),yt.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),yt.pixelStorei(O.UNPACK_ALIGNMENT,F.unpackAlignment);let Je=yt.getParameter(O.UNPACK_ROW_LENGTH),he=yt.getParameter(O.UNPACK_IMAGE_HEIGHT),Ei=yt.getParameter(O.UNPACK_SKIP_PIXELS),He=yt.getParameter(O.UNPACK_SKIP_ROWS),Nr=yt.getParameter(O.UNPACK_SKIP_IMAGES);yt.pixelStorei(O.UNPACK_ROW_LENGTH,xe.width),yt.pixelStorei(O.UNPACK_IMAGE_HEIGHT,xe.height),yt.pixelStorei(O.UNPACK_SKIP_PIXELS,Ft),yt.pixelStorei(O.UNPACK_SKIP_ROWS,Jt),yt.pixelStorei(O.UNPACK_SKIP_IMAGES,se);let ei=w.isDataArrayTexture||w.isData3DTexture,wi=F.isDataArrayTexture||F.isData3DTexture;if(w.isDepthTexture){let le=kt.get(w),ze=kt.get(F),xn=kt.get(le.__renderTarget),Me=kt.get(ze.__renderTarget);yt.bindFramebuffer(O.READ_FRAMEBUFFER,xn.__webglFramebuffer),yt.bindFramebuffer(O.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let Ne=0;Ne<Rt;Ne++)ei&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,kt.get(w).__webglTexture,q,se+Ne),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,kt.get(F).__webglTexture,Mt,Ae+Ne)),O.blitFramebuffer(Ft,Jt,Ft+It,Jt+_t,Lt,re,Lt+It,re+_t,O.DEPTH_BUFFER_BIT,O.NEAREST);yt.bindFramebuffer(O.READ_FRAMEBUFFER,null),yt.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(q!==0||w.isRenderTargetTexture||kt.has(w)){let le=kt.get(w),ze=kt.get(F);yt.bindFramebuffer(O.READ_FRAMEBUFFER,L),yt.bindFramebuffer(O.DRAW_FRAMEBUFFER,k);for(let xn=0;xn<Rt;xn++)ei?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,le.__webglTexture,q,se+xn):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,le.__webglTexture,q),wi?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,ze.__webglTexture,Mt,Ae+xn):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,ze.__webglTexture,Mt),q!==0?O.blitFramebuffer(Ft,Jt,Ft+It,Jt+_t,Lt,re,Lt+It,re+_t,O.COLOR_BUFFER_BIT,O.NEAREST):wi?O.copyTexSubImage3D(Dt,Mt,Lt,re,Ae+xn,Ft,Jt,It,_t):O.copyTexSubImage2D(Dt,Mt,Lt,re,Ft,Jt,It,_t);yt.bindFramebuffer(O.READ_FRAMEBUFFER,null),yt.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else wi?w.isDataTexture||w.isData3DTexture?O.texSubImage3D(Dt,Mt,Lt,re,Ae,It,_t,Rt,me,ke,xe.data):F.isCompressedArrayTexture?O.compressedTexSubImage3D(Dt,Mt,Lt,re,Ae,It,_t,Rt,me,xe.data):O.texSubImage3D(Dt,Mt,Lt,re,Ae,It,_t,Rt,me,ke,xe):w.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,Mt,Lt,re,It,_t,me,ke,xe.data):w.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,Mt,Lt,re,xe.width,xe.height,me,xe.data):O.texSubImage2D(O.TEXTURE_2D,Mt,Lt,re,It,_t,me,ke,xe);yt.pixelStorei(O.UNPACK_ROW_LENGTH,Je),yt.pixelStorei(O.UNPACK_IMAGE_HEIGHT,he),yt.pixelStorei(O.UNPACK_SKIP_PIXELS,Ei),yt.pixelStorei(O.UNPACK_SKIP_ROWS,He),yt.pixelStorei(O.UNPACK_SKIP_IMAGES,Nr),Mt===0&&F.generateMipmaps===!0&&F.mipmapsAutoUpdate===!0&&O.generateMipmap(Dt),yt.unbindTexture()},this.initRenderTarget=function(w){kt.get(w).__webglFramebuffer===void 0&&Xt.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?Xt.setTextureCube(w,0):w.isData3DTexture?Xt.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?Xt.setTexture2DArray(w,0):Xt.setTexture2D(w,0),yt.unbindTexture()},this.resetState=function(){Y=0,z=0,$=null,yt.reset(),mt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=oe._getDrawingBufferColorSpace(t),e.unpackColorSpace=oe._getUnpackColorSpace()}};var C_=new pr;function Cr(i){return new Promise(t=>{C_.load(i,e=>{e.colorSpace=Ee,e.wrapS=e.wrapT=li,e.anisotropy=4,t(e)},void 0,()=>t(null))})}function Mi(i,t,e={}){let{triplanar:n=!1,vary:s=0,mapNormal:r=!1,...o}=e,a=new Ce({map:i,roughness:.9,metalness:0,...o}),l={value:1/t};return a.onBeforeCompile=c=>{c.uniforms.uvScale=l,c.vertexShader=(r?`attribute vec3 mapNormal;
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
      diffuseColor *= sampledDiffuseColor;`)},a.customProgramCacheKey=()=>`wm${t}${n}${s}${r}`,a}function Pd(i,t){let e=document.createElement("canvas");e.width=e.height=i,t(e.getContext("2d"),i);let n=new di(e);return n.colorSpace=Ee,n}var Pr=()=>Pd(128,(i,t)=>{let e=i.createRadialGradient(t/2,t/2,0,t/2,t/2,t/2);e.addColorStop(0,"rgba(255,220,160,1)"),e.addColorStop(.35,"rgba(255,190,120,0.45)"),e.addColorStop(1,"rgba(255,170,90,0)"),i.fillStyle=e,i.fillRect(0,0,t,t)});var Pc=()=>Pd(128,(i,t)=>{i.strokeStyle="rgba(255,255,255,1)",i.lineWidth=12,i.beginPath(),i.arc(t/2,t/2,t*.42,0,Math.PI*2),i.stroke(),i.fillStyle="rgba(255,200,120,0.28)",i.beginPath(),i.arc(t/2,t/2,t*.38,0,Math.PI*2),i.fill()});function Ic(i){let t=document.createElement("canvas");t.width=256,t.height=128;let e=t.getContext("2d"),n=e.createLinearGradient(0,0,0,128);n.addColorStop(0,"#5f86c0"),n.addColorStop(.42,"#bcc9d8"),n.addColorStop(.5,"#ffd39a"),n.addColorStop(.56,"#8a7766"),n.addColorStop(1,"#2b2724"),e.fillStyle=n,e.fillRect(0,0,256,128);let s=e.createRadialGradient(64,60,0,64,60,30);s.addColorStop(0,"rgba(255,240,200,1)"),s.addColorStop(1,"rgba(255,200,120,0)"),e.fillStyle=s,e.fillRect(0,0,256,128);let r=new di(t);r.mapping=Ss,r.colorSpace=Ee;let o=new ws(i),a=o.fromEquirectangular(r).texture;return o.dispose(),r.dispose(),a}var Ga=new Ut,Be=class{constructor(){this.pos=[],this.nor=[],this.col=[]}add(t,e,n){let s=t.attributes.position.array;t.attributes.normal||t.computeVertexNormals();let r=t.attributes.normal.array,o=t.index?t.index.array:null,a=o?o.length:s.length/3;Ga.set(e);let l=Ga.r,c=Ga.g,h=Ga.b,u=n?n.elements:null;for(let d=0;d<a;d++){let f=(o?o[d]:d)*3,p=s[f],y=s[f+1],m=s[f+2],g=r[f],_=r[f+1],E=r[f+2];if(u){this.pos.push(u[0]*p+u[4]*y+u[8]*m+u[12],u[1]*p+u[5]*y+u[9]*m+u[13],u[2]*p+u[6]*y+u[10]*m+u[14]);let v=u[0]*g+u[4]*_+u[8]*E,b=u[1]*g+u[5]*_+u[9]*E,T=u[2]*g+u[6]*_+u[10]*E,x=Math.hypot(v,b,T)||1;g=v/x,_=b/x,E=T/x}else this.pos.push(p,y,m);this.nor.push(g,_,E),this.col.push(l,c,h)}return t.dispose(),this}box(t,e,n,s,r,o,a,l=0){return this.add(new Vt(t,e,n),s,Pt(r,o,a,l))}build({outline:t=!0}={}){let e=new fe;return e.setAttribute("position",new $t(this.pos,3)),e.setAttribute("normal",new $t(this.nor,3)),e.setAttribute("color",new $t(this.col,3)),t&&P_(e),e.computeBoundingSphere(),e}};function Pt(i,t,e,n=0,s=1,r=1,o=1){let a=new qt;return a.compose(new U(i,t,e),new Pe().setFromAxisAngle(new U(0,1,0),n),new U(s,r,o)),a}function P_(i){let t=i.attributes.position.array,e=i.attributes.normal.array,n=new Map,s=o=>`${Math.round(t[o]*500)},${Math.round(t[o+1]*500)},${Math.round(t[o+2]*500)}`;for(let o=0;o<t.length;o+=3){let a=s(o),l=n.get(a);l||n.set(a,l=[0,0,0]),l[0]+=e[o],l[1]+=e[o+1],l[2]+=e[o+2]}let r=new Float32Array(t.length);for(let o=0;o<t.length;o+=3){let a=n.get(s(o)),l=Math.hypot(a[0],a[1],a[2])||1;r[o]=a[0]/l,r[o+1]=a[1]/l,r[o+2]=a[2]/l}i.setAttribute("outlineNormal",new ce(r,3))}function Id(i,t,e,n){for(let s=0;s<i.length;s+=9){let r=i[s],o=i[s+1],a=i[s+2],l=i[s+3]-r,c=i[s+4]-o,h=i[s+5]-a,u=i[s+6]-r,d=i[s+7]-o,f=i[s+8]-a,p=c*f-h*d,y=h*u-l*f,m=l*d-c*u,g=(r+i[s+3]+i[s+6])/3-t,_=(o+i[s+4]+i[s+7])/3-e,E=(a+i[s+5]+i[s+8])/3-n;if(p*g+y*_+m*E<0)for(let v=0;v<3;v++){let b=i[s+3+v];i[s+3+v]=i[s+6+v],i[s+6+v]=b}}return i}function Va(i,t,e,n=.35){let s=i/2+n,r=t/2+n,o=[[-s,0,-r],[s,0,-r],[s,e,0],[-s,0,-r],[s,e,0],[-s,e,0],[-s,0,r],[-s,e,0],[s,e,0],[-s,0,r],[s,e,0],[s,0,r],[-s,0,-r],[-s,e,0],[-s,0,r],[s,0,-r],[s,0,r],[s,e,0],[-s,0,-r],[-s,0,r],[s,0,r],[-s,0,-r],[s,0,r],[s,0,-r]],a=new fe;return a.setAttribute("position",new $t(Id(o.flat(),0,e*.3,0),3)),a.computeVertexNormals(),a}function Ld(i,t,e,n=.3){let s=i/2+n,r=t/2+n,o=i/2-1.2,a=t/2-1.6,l=e*.7,c={a:[-s,0,-r],b:[s,0,-r],c:[s,0,r],d:[-s,0,r],e:[-o,l,-a],f:[o,l,-a],g:[o,l,a],hh:[-o,l,a],r1:[-o+.6,e,0],r2:[o-.6,e,0]},h=(f,p,y)=>[...c[f],...c[p],...c[y]],u=[...h("a","f","b"),...h("a","e","f"),...h("d","c","g"),...h("d","g","hh"),...h("a","d","hh"),...h("a","hh","e"),...h("b","f","g"),...h("b","g","c"),...h("e","r2","f"),...h("e","r1","r2"),...h("hh","g","r2"),...h("hh","r2","r1"),...h("e","hh","r1"),...h("f","r2","g"),...h("a","c","d"),...h("a","b","c")],d=new fe;return d.setAttribute("position",new $t(Id(u,0,e*.3,0),3)),d.computeVertexNormals(),d}var Wa=i=>new qt().makeRotationX(i),As=i=>new qt().makeRotationZ(i),I_=i=>new qt().makeRotationY(i);function Dc(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Qn(i,t,e,n,s,r,o=6){let a=new U(...e),l=new U(...n),c=a.distanceTo(l),h=new we(s,s,c,o,1),u=new Pe().setFromUnitVectors(new U(0,1,0),l.clone().sub(a).normalize()),d=new qt().compose(a.clone().add(l).multiplyScalar(.5),u,new U(1,1,1));i.add(h,r,t.clone().multiply(d))}var Dd=[15845797,14724230,12946532,9263675],Nd=[2826264,5913378,12093258,1710618,9079434];function Nc(i,t,{jacket:e=3824266,pants:n=3093568,skin:s=0,hair:r=0,scale:o=1,bag:a=!1,walk:l=0}={}){let c=(f,p,y,m)=>{let g=t.clone().multiply(Pt(f*o,p*o,y*o,0,o,o,o));return m?g.multiply(m):g},h=Dd[s%Dd.length],u=Nd[r%Nd.length],d=Math.sin(l)*.25;for(let[f,p]of[[.11,d],[-.11,-d]])i.add(new Vt(.26,.09,.11),1908e3,c(.05+p*.4,.045,f)),i.add(new Ii(.075,.68,2,6),n,c(p*.25,.47,f,As(-p*.5)));i.add(new Vt(.22,.18,.36),n,c(0,.88,0)),i.add(new Ii(.17,.36,2,8),e,c(0,1.2,0,new qt().makeScale(.85,1,1.15))),i.add(new we(.08,.1,.08,8),new Ut(e).multiplyScalar(.8).getHex(),c(0,1.5,0));for(let[f,p]of[[.26,-d],[-.26,d]])i.add(new Ii(.06,.5,2,6),e,c(p*.3,1.15,f,As(p*.6))),i.add(new Zn(.055,6,5),h,c(p*.55,.84,f));i.add(new Zn(.12,8,6),h,c(.01,1.66,0)),i.add(new Zn(.128,8,4,0,Math.PI*2,0,Math.PI*.55),u,c(-.015,1.68,0,As(.25))),i.add(new Vt(.04,.04,.04),h,c(.13,1.65,0)),a&&i.add(new Vt(.16,.3,.26),5913124,c(-.2,1.2,0))}function Uc(i,t,e,{basket:n=!0}={}){let o=u=>{i.add(new Pn(.33,.04,4,14),1776415,t.clone().multiply(Pt(u,.35,0)));for(let d=0;d<2;d++)i.add(new Vt(.56,.01,.01),12106946,t.clone().multiply(Pt(u,.35,0)).multiply(As(d*Math.PI/2)));i.add(new we(.035,.035,.1,6),12106946,t.clone().multiply(Pt(u,.35,0)).multiply(Wa(Math.PI/2)))};o(-.6),o(.6);let a=(u,d)=>[u,d,0],l=a(-.05,.36),c=a(-.22,.86),h=a(.48,.82);if(Qn(i,t,l,c,.025,e),Qn(i,t,l,a(.46,.66),.028,e),Qn(i,t,a(-.2,.74),a(.47,.74),.022,e),Qn(i,t,l,a(-.6,.35),.018,e),Qn(i,t,a(-.2,.78),a(-.6,.35),.018,e),Qn(i,t,h,a(.6,.35),.02,e),Qn(i,t,c,[-.24,.92,0],.016,12106946),i.add(new Vt(.24,.05,.12),2761760,t.clone().multiply(Pt(-.26,.95,0))),Qn(i,t,h,[.46,.98,0],.016,12106946),Qn(i,t,[.44,.98,-.28],[.44,.98,.28],.016,2236966),i.add(new Pn(.37,.025,3,6,Math.PI*.75),e,t.clone().multiply(Pt(-.6,.35,0)).multiply(As(Math.PI*.15))),i.add(new Pn(.37,.025,3,5,Math.PI*.6),e,t.clone().multiply(Pt(.6,.35,0)).multiply(As(Math.PI*.2))),i.add(new Vt(.42,.08,.03),2763310,t.clone().multiply(Pt(-.3,.38,.06))),i.add(new Vt(.44,.03,.2),12106946,t.clone().multiply(Pt(-.55,.74,0))),n){let u=t.clone().multiply(Pt(.66,.92,0));i.add(new Vt(.32,.03,.34),7031338,u);for(let[d,f,p,y]of[[.15,0,.02,.34],[-.15,0,.02,.34],[0,.16,.32,.02],[0,-.16,.32,.02]])i.add(new Vt(p,.2,y),9070144,u.clone().multiply(Pt(d,.1,f)))}}function Fc(i,t,e=1){let s=(o,a,l,c)=>c?t.clone().multiply(Pt(o,a,l)).multiply(c):t.clone().multiply(Pt(o,a,l));i.add(new we(.22,.3,.5,8),2042406,s(0,.25,0)),i.add(new Pn(.22,.04,4,10),2042406,s(0,.5,0,Wa(Math.PI/2))),i.add(new we(.1,.17,1.2,8),2042406,s(0,1.1,0)),i.add(new we(.1,.13,3.9,8),2042406,s(0,3.6,0)),i.add(new Zn(.11,8,6),2042406,s(0,1.75,0)),i.add(new Pn(.55,.045,5,10,Math.PI/2),2042406,s(0,5,e*.55,I_(e>0?-Math.PI/2:Math.PI/2))),i.add(new we(.015,.015,.5,4),2042406,s(0,5.25,e*.95));let r=e*1.12;i.add(new we(.05,.27,.22,6),2042406,s(0,4.98,r)),i.add(new we(.29,.29,.05,6),12096058,s(0,4.86,r)),i.add(new Zn(.07,6,4),13937224,s(0,5.15,r));for(let o=0;o<6;o++){let a=o/6*Math.PI*2+Math.PI/6;i.add(new Vt(.035,.66,.035),2042406,s(Math.cos(a)*.3,4.52,r+Math.sin(a)*.3))}return i.add(new we(.24,.12,.12,6),2042406,s(0,4.16,r)),[t.elements[12],t.elements[14]+e*1.12]}function Oc(){return new we(.31,.22,.64,6)}function Bc(i,t){let n=[9067062,9790524,8344114];for(let s=0;s<4;s++)i.add(new Vt(1.8,.04,.11),n[s%3],t.clone().multiply(Pt(0,.46,-.18+s*.12)));for(let s=0;s<3;s++)i.add(new Vt(1.8,.11,.035),n[(s+1)%3],t.clone().multiply(Pt(0,.62+s*.13,-.27)).multiply(Wa(-.15)));for(let s of[-.75,.75])i.add(new Vt(.06,.44,.06),2042406,t.clone().multiply(Pt(s,.22,.17))),i.add(new Vt(.06,.85,.06),2042406,t.clone().multiply(Pt(s,.42,-.24)).multiply(Wa(-.15))),i.add(new Vt(.06,.05,.48),2042406,t.clone().multiply(Pt(s,.44,-.02))),i.add(new Vt(.06,.04,.42),2042406,t.clone().multiply(Pt(s,.68,-.02)))}function zc(i,t,e){let n=Dc(e),s=[8016436,8806460];for(let o=0;o<4;o++)i.add(new Vt(1.8,.14,.05),s[o%2],t.clone().multiply(Pt(0,.1+o*.14,.36)));for(let o=0;o<4;o++)i.add(new Vt(1.8,.14,.05),s[(o+1)%2],t.clone().multiply(Pt(0,.1+o*.14,-.36)));for(let o of[-.88,.88])i.add(new Vt(.05,.56,.76),s[0],t.clone().multiply(Pt(o,.31,0)));i.add(new Vt(1.74,.04,.7),3811870,t.clone().multiply(Pt(0,.58,0)));let r=[14700650,15911244,16777215,14248608,16747066,9071318];for(let o=0;o<16;o++){let a=(n()-.5)*1.6,l=(n()-.5)*.55;i.add(new pi(.13+n()*.06,0),[4160053,5214010][o%2],t.clone().multiply(Pt(a,.68,l))),n()<.75&&i.add(new pi(.07,0),r[Math.floor(n()*r.length)],t.clone().multiply(Pt(a+.03,.82,l)))}}function kc(i,t){i.add(new we(.27,.23,.85,12),3103298,t.clone().multiply(Pt(0,.5,0))),i.add(new we(.29,.29,.06,12),2369066,t.clone().multiply(Pt(0,.95,0))),i.add(new we(.05,.05,.5,6),2369066,t.clone().multiply(Pt(0,.25,-.3)))}function Hc(i,t,e){for(let s=0;s<=e+.01;s+=.32)i.add(new Vt(.035,.95,.035),1843744,t.clone().multiply(Pt(s,.48,0)));for(let s of[.15,.85])i.add(new Vt(e,.045,.045),1843744,t.clone().multiply(Pt(e/2,s,0)))}function L_(i){i.computeVertexNormals();let t=i.attributes.position,e=i.attributes.normal,n=new Map,s=r=>`${Math.round(t.getX(r)*1e3)},${Math.round(t.getY(r)*1e3)},${Math.round(t.getZ(r)*1e3)}`;for(let r=0;r<t.count;r++){let o=s(r),a=n.get(o)||[0,0,0];a[0]+=e.getX(r),a[1]+=e.getY(r),a[2]+=e.getZ(r),n.set(o,a)}for(let r=0;r<t.count;r++){let o=n.get(s(r)),a=Math.hypot(o[0],o[1],o[2])||1;e.setXYZ(r,o[0]/a,o[1]/a,o[2]/a)}e.needsUpdate=!0}function Gc(i,t){let e=Dc(t*97+13),n={lind:{h:3.4,br:5,reach:2.4,rise:2.4,cl:[.85,1.25],n:2,leaf:[.55,1.2,.42],bark:4864556,w:.32},lonn:{h:3,br:6,reach:2.8,rise:2,cl:[.9,1.3],n:2,leaf:[.5,1.12,.38],bark:4141864,w:.34},bjork:{h:4.2,br:5,reach:1.6,rise:2.8,cl:[.65,.95],n:2,leaf:[.56,1.2,.42],bark:15131094,w:.17}}[i],s=new Xa,r=new Xa,o=[(e()-.5)*.3,(e()-.5)*.3],a=[o[0],n.h,o[1]];if(s.tube([0,0,0],a,n.w,n.w*.75,n.bark,7),i==="bjork")for(let p=.5;p<n.h;p+=.42)s.box(n.w*2.1,.05,n.w*2.1,2763306,o[0]*(p/n.h),p,o[1]*(p/n.h));let l=new U(-.9,.35,.3).normalize(),c=[];for(let p=0;p<n.br;p++){let y=p/n.br*Math.PI*2+e()*.9,m=n.reach*(.7+e()*.5),g=n.rise*(.7+e()*.5),_=[a[0],n.h-e()*.8,a[2]],E=[_[0]+Math.cos(y)*m*.55,_[1]+g*.55,_[2]+Math.sin(y)*m*.55],v=[_[0]+Math.cos(y)*m,_[1]+g,_[2]+Math.sin(y)*m];s.tube(_,E,n.w*.55,n.w*.4,n.bark,5),s.tube(E,v,n.w*.4,n.w*.22,n.bark,4);for(let b=0;b<n.n;b++){let T=b===0?1:.55+e()*.35,x=[_[0]+(v[0]-_[0])*T+(e()-.5)*.6,_[1]+(v[1]-_[1])*T+.3+e()*.5,_[2]+(v[2]-_[2])*T+(e()-.5)*.6];c.push([x,n.cl[0]+e()*(n.cl[1]-n.cl[0])])}}c.push([[a[0],n.h+n.rise+.6,a[2]],n.cl[1]*1.05]),i!=="bjork"&&c.push([[a[0]+.5,n.h+n.rise*.7,a[2]-.6],n.cl[1]]);let h=c.reduce((p,y)=>p+y[0][1],0)/c.length,u=c.reduce((p,y)=>p+y[0][0],0)/c.length,d=c.reduce((p,y)=>p+y[0][2],0)/c.length,f=new U;for(let[p,y]of c){let m=D_(y,Math.floor(e()*1e6)),g=m.attributes.position.array,_=m.attributes.normal.array;m.setAttribute("mapNormal",new ce(_.slice(),3));for(let b=0;b<g.length;b+=3)f.set(p[0]+g[b]-u,(p[1]+g[b+1]-h)*1.2,p[2]+g[b+2]-d).normalize(),f.multiplyScalar(.7).add(new U(_[b],_[b+1],_[b+2]).multiplyScalar(.3)).normalize(),_[b]=f.x,_[b+1]=f.y,_[b+2]=f.z;let E=new Float32Array(g.length),v=.9+e()*.2;for(let b=0;b<g.length;b+=3){let T=Math.max(0,_[b]*l.x+_[b+1]*l.y+_[b+2]*l.z),x=(p[1]+g[b+1]-h)/3,M=Math.max(0,-(_[b]*p[0]+_[b+2]*p[2]))*.08,I=_[b+1]*.5+.5,A=v*(.45+.3*I+.25*Math.min(1,Math.max(0,x+.5))-M),D=1-.4*T;E[b]=n.leaf[0]*A*D*.9,E[b+1]=n.leaf[1]*A*D,E[b+2]=n.leaf[2]*A*D}m.setAttribute("color",new ce(E,3)),m.translate(p[0],p[1],p[2]),r.addColoured(m)}return{wood:s.build(),leaves:r.build()}}function D_(i,t){let e=new pi(i,1),n=Dc(t),s=e.attributes.position,r=Array.from({length:5},()=>[n()*2-1,n()*2-1,n()*2-1,.1+n()*.2]);for(let a=0;a<s.count;a++){let l=new U().fromBufferAttribute(s,a).normalize(),c=.82+n()*.08;for(let[h,u,d,f]of r)c+=f*Math.max(0,l.x*h+l.y*u+l.z*d)**2;l.multiplyScalar(i*c),l.y*=l.y<0?.5:.8,l.x*=1.15,l.z*=1.15,s.setXYZ(a,l.x,l.y,l.z)}let o=e.toNonIndexed();return o.computeVertexNormals(),L_(o),e.dispose(),o}var Xa=class{constructor(){this.pos=[],this.nor=[],this.col=[],this.mapN=[]}addColoured(t){let e=t.index?t.toNonIndexed():t;this.pos.push(...e.attributes.position.array),this.nor.push(...e.attributes.normal.array),this.col.push(...e.attributes.color.array),this.mapN.push(...(e.attributes.mapNormal||e.attributes.normal).array)}addSolid(t,e){let n=t.index?t.toNonIndexed():t;n.computeVertexNormals();let s=new Ut(e),r=n.attributes.position.count,o=new Float32Array(r*3);for(let a=0;a<r;a++)o.set([s.r,s.g,s.b],a*3);n.setAttribute("color",new ce(o,3)),this.addColoured(n)}tube(t,e,n,s,r,o){let a=new U(...t),l=new U(...e),c=new we(s,n,a.distanceTo(l),o,1,!0),h=new Pe().setFromUnitVectors(new U(0,1,0),l.clone().sub(a).normalize());c.applyMatrix4(new qt().compose(a.clone().add(l).multiplyScalar(.5),h,new U(1,1,1))),this.addSolid(c,r)}box(t,e,n,s,r,o,a){let l=new Vt(t,e,n);l.translate(r,o,a),this.addSolid(l,s)}build(){let t=new fe;return t.setAttribute("position",new $t(this.pos,3)),t.setAttribute("normal",new $t(this.nor,3)),t.setAttribute("color",new $t(this.col,3)),t.setAttribute("mapNormal",new $t(this.mapN,3)),t}};var jn=null,Vc=null;function Ud(i){Vc=i,jn=null}function Wc(){if(jn)return jn;if(jn=[],Vc){for(let[t,e]of Object.entries(Vc))jn.push({kind:t,parts:n=>e.map(s=>[s.geo,n[s.mat]||n.leaf])});if(jn.length)return jn}let i=11;for(let t of["lind","lonn","bjork"])for(let e=0;e<2;e++){let n=Gc(t,i++);jn.push({kind:t,parts:s=>[[n.wood,s.wood],[n.leaves,s.leaf]]})}return jn}var Ir=64,ln=3.2,Fd=[14856796,15783308,15180164,15986404,14272422,15319674,13161400];function zd(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var Za=class{constructor(){this.m=[],this.c=[]}add(t,e,n,s,r,o,a,l,c){let h=Pt(t,e,n,s,1,1,1);c&&h.multiply(c),h.multiply(new qt().makeScale(r,o,a)),this.m.push(h),this.c.push(l)}mesh(t,e){if(!this.m.length)return null;let n=new mn(e,t,this.m.length),s=new Ut;return this.m.forEach((r,o)=>{n.setMatrixAt(o,r),n.setColorAt(o,s.set(this.c[o]))}),n.computeBoundingSphere(),n}};function Hi(i,t,e){return`${Math.floor(t/Ir)},${Math.floor(e/Ir)}`}var Od=32,Ja=new Map;function N_(i,t){let e=`${Math.floor(i/Od)},${Math.floor(t/Od)}`,n=Ja.get(e);return n||Ja.set(e,n={trim:new Za,glass:new Za}),n}function U_(){return{asphalt:new Be,slabs:new Be,grass:new Be,wall:new Be,roof:new Be,trimB:new Be,props:new Be,trees:new Map}}var wn=.5,cn={slab:1,grass:2,path:3,road:4,water:5,edge:6,deck:7};function F_(i){let t=Math.ceil(i.width/wn),e=Math.ceil(i.height/wn),n=new Uint8Array(t*e).fill(cn.slab),s=(o,a)=>{let l=Math.max(0,Math.round(o.x/wn)),c=Math.min(t,Math.round((o.x+o.w)/wn)),h=Math.max(0,Math.round(o.y/wn)),u=Math.min(e,Math.round((o.y+o.h)/wn));for(let d=h;d<u;d++)n.fill(a,d*t+l,d*t+c)};i.grass.forEach(o=>s(o,cn.grass)),i.paths.forEach(o=>s(o,cn.path));let r=i.river;return s({x:0,y:r.y0-.6,w:i.width,h:r.y1-r.y0+1.2},cn.edge),i.water.forEach(o=>s(o,cn.water)),i.bridges.forEach(o=>s(o,cn.deck)),i.roads.forEach(o=>s(o,cn.road)),{g:n,nx:t,nz:e}}function Rs(i,t,e,n,s,r){let{g:o,nx:a}=i,l=new Uint8Array((s-e)*(r-n)),c=s-e,h=[];for(let u=n;u<r;u++)for(let d=e;d<s;d++){if(l[(u-n)*c+(d-e)]||o[u*a+d]!==t)continue;let f=d;for(;f+1<s&&!l[(u-n)*c+(f+1-e)]&&o[u*a+f+1]===t;)f++;let p=u;t:for(;p+1<r;){for(let y=d;y<=f;y++)if(l[(p+1-n)*c+(y-e)]||o[(p+1)*a+y]!==t)break t;p++}for(let y=u;y<=p;y++)l.fill(1,(y-n)*c+(d-e),(y-n)*c+(f-e)+1);h.push([d*wn,u*wn,(f+1)*wn,(p+1)*wn])}return h}function O_(i,t){if(!i.pos.length&&!t.pos.length)return null;let e=new fe,n=s=>new Float32Array(i[s].length+t[s].length).fill(0).map((r,o)=>o<i[s].length?i[s][o]:t[s][o-i[s].length]);return e.setAttribute("position",new ce(n("pos"),3)),e.setAttribute("normal",new ce(n("nor"),3)),e.setAttribute("color",new ce(n("col"),3)),e.computeBoundingSphere(),e}function Cs(i,t,e,n,s=-1.2){let[r,o,a,l]=t;i.add(new Vt(a-r,e-s,l-o),n,Pt((r+a)/2,(e+s)/2,(o+l)/2))}function B_(i,t){let e=F_(i),n=Ir/wn;for(let a=0;a*Ir<i.height;a++)for(let l=0;l*Ir<i.width;l++){let c=Si(t,`${l},${a}`),h=l*n,u=a*n,d=Math.min(e.nx,h+n),f=Math.min(e.nz,u+n);for(let p of Rs(e,cn.road,h,u,d,f))Cs(c.asphalt,p,0,16777215);for(let p of Rs(e,cn.slab,h,u,d,f))Cs(c.slabs,p,.12,16777215);for(let p of Rs(e,cn.deck,h,u,d,f))Cs(c.slabs,p,.12,14275786,-.9);for(let p of Rs(e,cn.path,h,u,d,f))Cs(c.slabs,p,.11,15259312);for(let p of Rs(e,cn.edge,h,u,d,f))Cs(c.slabs,p,.16,10130828,-1.6);for(let p of Rs(e,cn.grass,h,u,d,f))Cs(c.grass,p,.1,16777215)}for(let a of i.roads){let l=a.dir==="h"?a.w:a.h;for(let c=0;c<l;c+=16){let h=Math.min(16,l-c);for(let u of[-1,1]){let[d,f,p,y]=a.dir==="h"?[a.x+c+h/2,a.c+u*(i.roadHalf+.12),h,.24]:[a.c+u*(i.roadHalf+.12),a.y+c+h/2,.24,h];Si(t,Hi(i,d,f)).trimB.add(new Vt(p,.15,y),11841704,Pt(d,.075,f))}}}for(let a of i.bridges)for(let l of[a.x+.2,a.x+a.w-.2]){let c=Si(t,Hi(i,l,a.y+a.h/2));Hc(c.props,Pt(l,.12,a.y,-Math.PI/2),a.h)}let s=(a,l,c,h)=>Si(t,Hi(i,a,l)).slabs.add(new Vt(c,.02,h),16777215,Pt(a,.006,l)),r=i.edge;for(let a of i.roads)if(a.dir==="h")for(let l=a.x+2;l<a.x+a.w-3;l+=6)i.vRoads.some(c=>Math.abs(l+1.5-c)<r+1)||s(l+1.5,a.c,3,.18);else for(let l=a.y+2;l<a.y+a.h-3;l+=6)i.hRoads.some(c=>Math.abs(l+1.5-c)<r+1)||s(a.c,l+1.5,.18,3);let o=i.roadHalf;for(let a of i.vRoads)for(let l of i.hRoads)if(i.roads.some(h=>h.dir==="v"&&h.c===a&&l>h.y&&l<h.y+h.h))for(let h of[-1,1])for(let u=-o+.6;u<o-.4;u+=1.2)s(a+h*(o+1.2),l+u+.3,1.8,.55),s(a+u+.3,l+h*(o+1.2),.55,1.8)}function Si(i,t){let e=i.get(t);return e||i.set(t,e=U_()),e}function z_(i,t,e,n){return{S:{x:i,z:t+n/2,nx:0,nz:1,tx:1,tz:0,L:e,rot:0},E:{x:i+e/2,z:t,nx:1,nz:0,tx:0,tz:-1,L:n,rot:Math.PI/2},W:{x:i-e/2,z:t,nx:-1,nz:0,tx:0,tz:1,L:n,rot:-Math.PI/2},N:{x:i,z:t-n/2,nx:0,nz:-1,tx:-1,tz:0,L:e,rot:Math.PI}}}function k_(i,t,e,n){let s=zd(Math.floor(t.seed*1e6)+e*7),r={...i,...N_(t.x+t.w/2,t.y+t.h/2)};r.dark=r.trim;let o=Math.max(2,Math.min(6,Math.round((t.height-1)/ln))),a=o*ln+1,l=t.w,c=t.h,h=t.x+l/2,u=t.y+c/2,d=Fd[(t.facadeIndex+e)%Fd.length],f=new Ut(d).multiplyScalar(.82).getHex(),p=16052198,y=s()<.4,m=s()<.3?5913130:s()<.5?3099194:16184042,g=Math.floor(s()*4),_=y?s()<.5?"pediment":"hood":["hood","keystone","none"][Math.floor(s()*3)],E=s()<.3,v=[3107402,9054762,2771578,6965802][Math.floor(s()*4)];r.wall.add(new Vt(l,a,c),d,Pt(h,a/2,u));let b=(P,X,C,J,Q)=>P.add(new Vt(l+X*2,C,c+X*2),Q,Pt(h,J,u));b(r.wall,.06,1,.5,9407106),b(r.wall,.04,ln-.2,1+(ln-.2)/2,f);for(let P=1;P<o;P++)b(r.trimB,.05,.16,1+P*ln,p);b(r.trimB,.3,.45,a+.22,p);let T=z_(h,u,l,c),x=l>=c?T.S:t.seed<.5?T.E:T.W,M=(P,X,C,J)=>[P.x+P.tx*X+P.nx*J,C,P.z+P.tz*X+P.nz*J],I=(P,X,C,J,Q=P.rot,G=0,rt=0)=>{let at=J===o-1,ot=at?1.15:g===3?1.8:1.5,st=C+(ot-1.5)/2,Et=Math.sin(Q),Zt=Math.cos(Q),wt=Math.cos(Q),Nt=-Math.sin(Q),Ot=(St,dt,Ht)=>[P.x+P.tx*X+P.nx*G+wt*St+Et*Ht,st+dt,P.z+P.tz*X+P.nz*G+Nt*St+Zt*Ht],tt=(St,dt)=>{let Ht=s()<.1;r.trim.add(...Ot(St,0,.04),Q,dt+.22,ot+.24,.1,m),r.glass.add(...Ot(St,0,.05),Q,dt,ot,.12,Ht?16763274:[9414335,7309215,11123916,6123910][Math.floor(s()*4)]),dt>.7&&r.trim.add(...Ot(St,0,.06),Q,.06,ot,.15,m),!Ht&&s()<.25&&r.trim.add(...Ot(St-dt*.24,.05,.065),Q,dt*.4,ot*.85,.13,[15986400,14272416,13096160][Math.floor(s()*3)])},ct=rt||1.05;g===1&&P===x&&!rt?(tt(-.36,.52),tt(.36,.52),ct=1.3):tt(0,ct),r.trim.add(...Ot(0,-ot/2-.18,.12),Q,ct+.3,.08,.3,9344154),g===2&&!at&&r.trim.add(...Ot(0,ot/2+.2,.05),Q,ct*.8,.36,.1,m);let ut=ot/2+(g===2&&!at?.55:.25);_==="pediment"&&!at?(r.trim.add(...Ot(0,ut,.07),Q,ct+.45,.22,.14,p),r.trim.add(...Ot(0,ut+.2,.07),Q,ct*.7,.16,.12,p)):_==="hood"?r.trim.add(...Ot(0,ut,.12),Q,ct+.5,.16,.24,p):_==="keystone"&&r.trim.add(...Ot(0,ut,.08),Q,.28,.34,.16,p)},A=new Set;for(let P of[T.S,T.E,T.W]){if(P!==T.S&&n(t,P.nx))continue;let X=Math.max(2,Math.floor(P.L/(y?2.9:2.6))),C=P.L/X,J=Math.floor(X/2),Q=P===x;if(A.clear(),Q&&X>=5&&s()<.65){let ot=Math.floor(s()*3);ot===0?[1,X-2].forEach(st=>A.add(st)):ot===1?A.add(J):A.add(X-2)}for(let ot=0;ot<o;ot++)for(let st=0;st<X;st++){let Et=-P.L/2+C*(st+.5);Q&&ot===0&&st===J||Q&&ot===0&&E||ot>0&&A.has(st)||I(P,Et,1+ot*ln+1.6,ot,P.rot,.04)}if(Q&&y)for(let ot=1;ot<X;ot++){let[st,,Et]=M(P,-P.L/2+C*ot,0,.06);r.trim.add(st,1+ln+(o-1)*ln/2,Et,P.rot,.3,(o-1)*ln,.12,new Ut(d).multiplyScalar(1.06).getHex())}if(!Q)continue;for(let ot=0;ot<Math.floor(P.L/.9);ot++){let[st,,Et]=M(P,-P.L/2+.45+ot*.9,0,.25);r.trim.add(st,a-.15,Et,P.rot,.22,.35,.5,15130578)}let G=-P.L/2+C*(J+.5),rt=[5912102,3099194,3885674,6957604][t.facadeIndex%4],at=(ot,st)=>M(P,G,ot,st);r.trim.add(...at(1.6,.05),P.rot,2.1,3.2,.06,14209218),r.trim.add(...at(3.6,.2),P.rot,2.8,.3,.5,15130578);for(let ot of[-1.1,1.1]){let[st,,Et]=M(P,G+ot,0,.18);r.trim.add(st,1.65,Et,P.rot,.3,3.3,.4,15130578)}if(r.dark.add(...at(1.3,.09),P.rot,1.4,2.6,.25,rt),r.glass.add(...at(2.85,.1),P.rot,1.3,.38,.26,16767392),r.trim.add(...at(.17,.55),P.rot,2.6,.35,1.1,10656398),r.trim.add(...at(.06,1.05),P.rot,2.6,.12,.6,10656398),E)for(let ot=0;ot<X;ot++){if(ot===J)continue;let st=-P.L/2+C*(ot+.5),[Et,,Zt]=M(P,st,0,.05);r.glass.add(Et,1.55,Zt,P.rot,C*.82,2.1,.16,13150328);for(let wt=0;wt<6;wt++){let[Nt,,Ot]=M(P,st-C*.45+(wt+.5)*(C*.9/6),0,.65);r.trim.add(Nt,2.95,Ot,P.rot,C*.15,.06,1.3,wt%2?15920610:v,new qt().makeRotationX(.32))}}for(let ot of A){let st=-P.L/2+C*(ot+.5),Et=(o-1)*ln,Zt=1+ln,wt=C*1.3,Nt=s()<.4,Ot=Nt?wt:wt*.5,tt=Nt?.9:1.3,[ct,,ut]=M(P,st,0,0),St=Pt(ct,0,ut,P.rot);r.wall.add(Bd(wt,Ot,tt,Et),new Ut(d).multiplyScalar(1.04).getHex(),St.clone().multiply(Pt(0,Zt,0)));for(let Ct=0;Ct<o;Ct++)r.trimB.add(Bd(wt+.3,Ot+.2,tt+.12,.18),p,St.clone().multiply(Pt(0,Zt+Ct*ln-.09,0)));let dt=Math.atan2(tt,(wt-Ot)/2),Ht=(wt+Ot)/4;for(let Ct=1;Ct<o;Ct++){let Qt=1+Ct*ln+1.6;if(I(P,st,Qt,Ct,P.rot,tt+.02),!Nt)for(let jt of[-1,1]){let ae={...P,x:P.x+P.tx*(jt*Ht)+P.nx*0,z:P.z+P.tz*(jt*Ht)};I(ae,st,Qt,Ct,P.rot+jt*dt,tt/2+.03,Math.min(1.05,Math.hypot((wt-Ot)/2,tt)-.6))}}r.roof.add(H_(wt,Ot,tt),7305858,St.clone().multiply(Pt(0,Zt+Et+.05,0)))}}let D=l>=c,B=D?l:c,H=D?c:l,L=Math.min(H*.42,5.2),k=D?0:Math.PI/2,Y=[16777215,15784144,15261912,10133672][t.roofIndex%4],z=t.roof==="gable"?Va(B,H,L,.45):Ld(B,H,L,.4);r.roof.add(z,Y,Pt(h,a+.45,u,k)),t.roof==="gable"&&r.trimB.add(new Vt(B+1,.18,.4),10112570,Pt(h,a+.45+L,u,k));let $=Math.max(1,Math.floor(B/5));for(let P=0;P<$;P++){let X=-B/2+B/$*(P+.5),C=H/2-1.6,[J,Q]=D?[h+X,u+C]:[h+(t.seed<.5?C:-C),u+X],G=D?0:t.seed<.5?Math.PI/2:-Math.PI/2;r.wall.add(new Vt(1.5,1.6,1.4),d,Pt(J,a+.45+1.1,Q,G)),r.roof.add(Va(1.5,1.4,.8,.15),Y,Pt(J,a+.45+1.9,Q,G+Math.PI/2));let rt=Math.sin(G),at=Math.cos(G);r.glass.add(J+rt*.72,a+.45+1.1,Q+at*.72,G,.9,.9,.08,7309215)}for(let P of[-.3,.28]){let[X,C]=D?[h+B*P,u-.6]:[h-.6,u+B*P];r.wall.add(new Vt(.9,2.8,.9),11033672,Pt(X,a+.45+L*.65,C)),r.trimB.add(new Vt(1.05,.15,1.05),6961710,Pt(X,a+.45+L*.65+1.45,C))}}function Bd(i,t,e,n){let s=new Yn;s.moveTo(-i/2,0),s.lineTo(-t/2,-e),s.lineTo(t/2,-e),s.lineTo(i/2,0),s.lineTo(-i/2,0);let r=new fi(s,{depth:n,bevelEnabled:!1,curveSegments:1});return r.rotateX(-Math.PI/2),r}function H_(i,t,e){let r=[[-i/2-.18,0,0],[-t/2-.09,0,e+.18],[t/2+.09,0,e+.18],[i/2+.18,0,0],[-t*.3,.85,0],[t*.3,.85,0]],o=[0,1,4,1,2,5,1,5,4,2,3,5],a=new fe;return a.setAttribute("position",new $t(o.flatMap(l=>r[l]),3)),a.computeVertexNormals(),a}var Ya=[];function G_(i,t){for(let n of i.lamps){let s=Si(t,Hi(i,n.x,n.y)),r=Math.atan2(n.ax||0,n.ay||1),o=Pt(n.x,.12,n.y,r);Fc(s.props,o,1),Ya.push(o.clone().multiply(Pt(0,4.64,1.12)))}for(let n of i.props){let s=Si(t,Hi(i,n.x,n.y));n.kind==="bench"?Bc(s.props,Pt(n.x,.12,n.y,-(n.rot||0))):n.kind==="bin"?kc(s.props,Pt(n.x,.12,n.y)):n.kind==="planter"&&zc(s.props,Pt(n.x,.1,n.y,0,(n.w||3)/1.8,1,(n.h||1.4)/.8),7)}let e=zd(91);i.trees.forEach(n=>{let s=Si(t,Hi(i,n.x,n.y)),r=Wc(),o=Math.floor(e()*r.length),a=n.canopy/2.7*(.9+e()*.2),l=s.trees.get(o)||[];l.push(Pt(n.x,.1,n.y,e()*Math.PI*2,a,a*(.92+e()*.16),a)),s.trees.set(o,l)})}function kd(i,t,e){let n=new Map;B_(i,n),Ja.clear(),Ya.length=0;let s=(p,y)=>i.buildings.some(m=>m!==p&&m.y<p.y+p.h-1&&m.y+m.h>p.y+1&&(y>0?m.x>=p.x+p.w-.1&&m.x-(p.x+p.w)<3:m.x+m.w<=p.x+.1&&p.x-(m.x+m.w)<3));i.buildings.forEach((p,y)=>k_(Si(n,Hi(i,p.x+p.w/2,p.y+p.h/2)),p,y,s)),G_(i,n);let r=new Vt(1,1,1),o=Wc(),a=new Fe,l=[],c=(p,y,{cast:m=!0,receive:g=!0}={})=>{if(!p)return null;let _=p.isMesh||p.isInstancedMesh?p:new ge(p,y);return p.isInstancedMesh&&(_.material=y),_.castShadow=m,_.receiveShadow=g,a.add(_),l.push(_),_},h=p=>p.pos.length?p.build({outline:!1}):null,u=0;for(let p of n.values()){c(h(p.asphalt),t.asphalt,{cast:!1}),c(h(p.slabs),t.slabs,{cast:!1}),c(h(p.grass),t.grass,{cast:!1}),c(h(p.wall),t.wall),c(h(p.roof),t.roof),c(O_(p.trimB,p.props),t.plain);for(let[y,m]of p.trees){let g=o[y];for(let[_,E]of g.parts(t)){let v=new mn(_,E,m.length);m.forEach((b,T)=>v.setMatrixAt(T,b)),v.computeBoundingSphere(),c(v,E)}}e&&e(++u/n.size)}for(let p of Ja.values())c(p.trim.mesh(t.trimI,r),t.trimI,{cast:!1}),c(p.glass.mesh(t.glassI,r),t.glassI,{cast:!1});let d=new mn(Oc(),t.lantern,Ya.length);Ya.forEach((p,y)=>d.setMatrixAt(y,p)),d.computeBoundingSphere(),c(d,t.lantern,{cast:!1,receive:!1});let f=0;for(let p of l){let y=p.geometry,m=(y.index?y.index.count:y.attributes.position.count)/3;f+=m*(p.isInstancedMesh?p.count:1)}return{group:a,chunks:n.size,meshes:l.length,tris:Math.round(f)}}var BS={height:64,viewShort:30,tiltViewShort:34,center:new U(30,0,-1.5),tiltCenter:new U(30,0,-3.5),tiltDistance:80};var Xc={hatch:{L:4.1,body:[[-2.05,.28],[2.05,.28],[2.05,.66],[1.92,.86],[.85,.98],[-1.95,.98],[-2.05,.82]],cabin:[[.8,.95],[.05,1.45],[-1.6,1.45],[-1.98,.95]],roof:[-1.55,0]},sedan:{L:4.6,body:[[-2.3,.3],[2.3,.3],[2.3,.66],[2.15,.84],[1,.96],[-2.15,.96],[-2.3,.8]],cabin:[[.95,.93],[.15,1.42],[-1.25,1.42],[-1.85,.93]],roof:[-1.2,.1]},sport:{L:4.5,body:[[-2.25,.26],[2.25,.26],[2.25,.56],[2.1,.7],[.9,.8],[-2.15,.84],[-2.25,.7]],cabin:[[.7,.78],[-.1,1.18],[-1.2,1.18],[-1.9,.82]],roof:[-1.05,-.2],roofY:1.2},estate:{L:4.8,body:[[-2.4,.3],[2.4,.3],[2.4,.66],[2.25,.86],[1.05,.98],[-2.35,.98],[-2.4,.82]],cabin:[[1,.95],[.2,1.48],[-2.15,1.48],[-2.3,.95]],roof:[-2.05,.15]}},Lr=1.8;function Hd(i,t,e){let n=new Yn;i.forEach(([r,o],a)=>a?n.lineTo(r,o):n.moveTo(r,o)),n.closePath();let s=new fi(n,{depth:t,bevelEnabled:!0,bevelThickness:e,bevelSize:e,bevelSegments:3,curveSegments:2});return s.translate(0,0,-t/2),s}function V_(i,t,e,n,s){let r=new Yn,o=.25,a=e/2;r.moveTo(i+o,-a),r.lineTo(t-o,-a),r.quadraticCurveTo(t,-a,t,-a+o),r.lineTo(t,a-o),r.quadraticCurveTo(t,a,t-o,a),r.lineTo(i+o,a),r.quadraticCurveTo(i,a,i,a-o),r.lineTo(i,-a+o),r.quadraticCurveTo(i,-a,i+o,-a);let l=new fi(r,{depth:s,bevelEnabled:!0,bevelThickness:.05,bevelSize:.1,bevelSegments:2,curveSegments:3});return l.rotateX(Math.PI/2),l.translate(0,n+s,0),l}function Gd(i){let t=Xc[i],e=new Be;e.add(Hd(t.body,Lr-.5,.25),16777215),e.add(V_(t.roof[0],t.roof[1],Lr-.36,t.roofY??1.5,.07),16777215);let n=new Be;n.add(Hd(t.cabin,Lr-.5,.08),16777215);let s=new Be;for(let r of[-1,1])for(let o of[-1,1])s.add(new we(.33,.33,.25,10),1776415,Pt(r*(t.L/2-.75),.33,o*(Lr/2-.12)).multiply(new qt().makeRotationX(Math.PI/2)));for(let r of[-1,1])s.add(new Vt(.3,.16,.42),16774352,Pt(t.L/2-.05,.86,r*.55)),s.add(new Vt(.22,.16,.4),13642270,Pt(-t.L/2+.02,.9,r*.56)),s.add(new Vt(.22,.1,.12),2236966,Pt(.75,1.05,r*(Lr/2+.02)));if(i==="estate")for(let r of[-1,1])s.add(new Vt(2,.06,.06),2763310,Pt(-1.05,1.62,r*.62));return i==="hatch"&&s.add(new Vt(.7,.04,.7),2897990,Pt(-.75,1.6,0)),{paint:e.build({outline:!1}),glass:n.build({outline:!1}),det:s.build({outline:!1})}}var W_={jacket:15770682,pants:3093568,skin:0,hair:1,scale:1.1},qc=new Map,Vd={player(i){let t=qc.get("player");if(t)return t.map(n=>X_(n,i));let e=[];for(let n of[0,.9,0,-.9,0]){let s=new Be;Nc(s,Pt(0,0,0),{...W_,walk:n}),e.push(new ge(s.build({outline:!1}),i.solid))}return e}};function X_(i,t){let e=new Fe;for(let n of i){let s=new ge(n.geo,t[n.mat]||t.solid);s.castShadow=!0,e.add(s)}return e}async function Wd(i){let t=await fetch(i);if(!t.ok)return null;let e=await t.arrayBuffer(),n=new DataView(e).getUint32(0,!0),s=JSON.parse(new TextDecoder().decode(new Uint8Array(e,4,n))),r=4+n+3&-4,o=(l,c)=>{let h=new l(e,r,c);return r+=h.byteLength,r=r+3&-4,h},a={};for(let[l,c]of Object.entries(s.models))a[l]=c.map(h=>{let u=new fe;return u.setAttribute("position",new ce(o(Float32Array,h.n*3),3)),u.setAttribute("normal",new ce(o(Int8Array,h.n*4),4,!0)),u.setAttribute("color",new ce(o(Uint8Array,h.n*4),4,!0)),h.uv&&u.setAttribute("uv",new ce(o(Float32Array,h.n*2),2)),u.setIndex(new ce(o(h.wide?Uint32Array:Uint16Array,h.index),1)),u.computeBoundingSphere(),{geo:u,mat:h.mat}});return a}function Yc(i,t){qc.set(i,t)}function Xd(i){return qc.get(i)}var qd={small:["hatch"],car:["sedan","estate","sedan"],sport:["sport"]};function Zd(i,t){let e=new Fe,n={},s=new Ce({vertexColors:!0,roughness:.34,metalness:.35,envMapIntensity:1.4}),r=b=>{let T=b.reduce((H,[L])=>H+(L.index?L.index.count:L.attributes.position.count),0),x=new Float32Array(T*3),M=new Float32Array(T*3),I=new Float32Array(T*3),A=0,D=new Ut;for(let[H,L]of b){let k=H.index?H.toNonIndexed():H,Y=k.attributes.position,z=k.attributes.normal,$=k.attributes.color;L!=null&&D.set(L);for(let P=0;P<Y.count;P++,A++){x.set([Y.getX(P),Y.getY(P),Y.getZ(P)],A*3);let X=z.getX(P),C=z.getY(P),J=z.getZ(P),Q=Math.hypot(X,C,J)||1;M.set([X/Q,C/Q,J/Q],A*3),L!=null?I.set([D.r,D.g,D.b],A*3):I.set([$.getX(P),$.getY(P),$.getZ(P)],A*3)}}let B=new fe;return B.setAttribute("position",new ce(x,3)),B.setAttribute("normal",new ce(M,3)),B.setAttribute("color",new ce(I,3)),B.computeBoundingSphere(),B},o=new Map,a=(b,T)=>o.get(b)||o.set(b,T()).get(b),l=new Map,c=b=>{let T=l.get(b);if(!T){let x=new Be;Uc(x,Pt(0,0,0),b),l.set(b,T=x.build({outline:!1}))}return T},h=new Map;for(let b of i.vehicles){let T=new Fe;if(b.spec.class==="car"){let x=qd[b.type]||qd.car,M=x[Math.abs(Yd(b.id))%x.length],I=n[M]||(n[M]=Gd(M)),A=a(`${M}:${b.color}`,()=>r([[I.paint,b.color],[I.glass,1910323],[I.det,null]])),D=new ge(A,s);D.scale.set(b.spec.length/Xc[M].L,1,b.spec.width/1.8*.98),D.castShadow=!0,D.receiveShadow=!0,T.add(D)}else{let x=Xd("bikes"),M;if(x){let A=Object.keys(x),D=A[Math.abs(Yd(b.id))%A.length];M=a(`bike:${D}:${b.color}`,()=>r(x[D].map(B=>[B.geo,B.mat==="paint"?b.color:null])))}else M=c(b.color);let I=new ge(M,x?s:t.solid);I.castShadow=!0,T.add(I)}e.add(T),h.set(b,T)}let u=new Fe,d=Vd.player(t);for(let b of d)b.visible=!1,b.castShadow=!0,u.add(b);e.add(u);let f=new ge(new qe(2.2,2.2).rotateX(-Math.PI/2),new pn({map:Pc(),transparent:!0,depthWrite:!1,opacity:.9}));f.renderOrder=2,e.add(f);let p=q_();e.add(p.mesh);let y=Pr(),m=b=>new pn({map:y,color:b,transparent:!0,blending:yi,depthWrite:!1}),g=[0,1].map(()=>new ge(new qe(1,1).rotateX(-Math.PI/2),m(16769704))),_=[0,1].map(()=>new ge(new qe(1,1).rotateX(-Math.PI/2),m(16724e3)));for(let b of[...g,..._])b.renderOrder=3,b.visible=!1,e.add(b);let E=0;function v(b,T){for(let[k,Y]of h)Y.position.set(k.x,.02,k.y),Y.rotation.y=-k.heading;let x=i.player,M=x.vehicle,I=M&&M.spec.class==="car";u.visible=!I;let A=Math.hypot(x.vx,x.vy);E+=b*A*2.2;let D=M&&M.spec.class==="bike",B=D?d.length-1:A>.4?1+Math.floor(E)%(d.length-2):0;d.forEach((k,Y)=>k.visible=Y===Math.min(B,d.length-1));let H=M||x;u.position.set(H.x,D?.12+.35:.12,H.y),u.rotation.y=-(M?M.heading:x.heading),x.stun>0?(u.rotation.z=Math.PI/2.4,u.visible=Math.floor(i.time*10)%2===0):u.rotation.z=0,f.visible=!I,f.position.set(H.x,.14,H.y),p.update(i.vehicles);let L=M&&T>.05;for(let k of[...g,..._])k.visible=!!L;if(L){let k=Math.cos(M.heading),Y=Math.sin(M.heading),z=M.spec.length/2,$=M.spec.class==="car";[-.55,.55].forEach((P,X)=>{let C=$?11:5,J=M.x+k*(z+C/2)-Y*P*($?1:0),Q=M.y+Y*(z+C/2)+k*P*($?1:0);g[X].position.set(J,.16,Q),g[X].rotation.y=-M.heading,g[X].scale.set(C,1,$?3.2:2.2),g[X].material.opacity=.5*T,g[X].visible=$||X===0,_[X].position.set(M.x-k*z-Y*P,.16,M.y-Y*z+k*P),_[X].scale.set(1.4,1,1.4),_[X].material.opacity=(i.braking?.9:.55)*T,_[X].visible=$})}}return{group:e,update:v,views:h}}function Yd(i){let t=0;for(let e=0;e<i.length;e++)t=t*31+i.charCodeAt(e)|0;return t}function q_(){let t=new qe(1,1).rotateX(-Math.PI/2),e=new pn({color:1710878,transparent:!0,opacity:.5,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),n=new mn(t,e,1200);n.count=0,n.frustumCulled=!1,n.renderOrder=1;let s=0,r=new Map,o=new qt,a=new Pe,l=new U(0,1,0);return{mesh:n,update(c){let h=!1;for(let u of c){if(u.spec.class!=="car")continue;let d=Math.cos(u.heading),f=Math.sin(u.heading),p=Math.abs(-u.vx*f+u.vy*d);if(!(u.handbrake&&Math.hypot(u.vx,u.vy)>3||p>2.5)){r.delete(u);continue}let m=u.x-d*u.spec.length*.32,g=u.y-f*u.spec.length*.32,_=u.spec.width*.4,E=[[m+f*_,g-d*_],[m-f*_,g+d*_]],v=r.get(u);if(v)for(let b=0;b<2;b++){let[T,x]=v[b],[M,I]=E[b],A=Math.hypot(M-T,I-x);A<.05||(a.setFromAxisAngle(l,-Math.atan2(I-x,M-T)),o.compose(new U((T+M)/2,.015,(x+I)/2),a,new U(A+.1,1,.26)),n.setMatrixAt(s,o),s=(s+1)%1200,n.count=Math.min(1200,n.count+1),h=!0)}r.set(u,E)}h&&(n.instanceMatrix.needsUpdate=!0)}}}var Zc={value:new _e(0,0,1.54,2.6)};function hn(i,t=1e4){let e=i.onBeforeCompile,n=i.customProgramCacheKey?i.customProgramCacheKey.bind(i):()=>"";return i.onBeforeCompile=(s,r)=>{e&&e(s,r),s.uniforms.uCut=Zc,s.vertexShader=`varying vec3 vCutP;
`+s.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
      vec4 cutP = vec4(transformed, 1.0);
      #ifdef USE_INSTANCING
        cutP = instanceMatrix * cutP;
      #endif
      vCutP = (modelMatrix * cutP).xyz;`),s.fragmentShader=`uniform vec4 uCut;
varying vec3 vCutP;
`+s.fragmentShader.replace("void main() {",`void main() {
      float cutD = vCutP.z - uCut.y;
      ${t>1e3?"if (cutD > 1.2 && vCutP.y > uCut.w + cutD * uCut.z) discard;":`if (cutD > 0.5 && abs(vCutP.x - uCut.x) < ${t.toFixed(1)} && vCutP.y > uCut.w + cutD * uCut.z - 1.5 && fract(sin(dot(floor(gl_FragCoord.xy), vec2(12.9898, 78.233))) * 43758.5453) < 0.72) discard;`}`)},i.customProgramCacheKey=()=>"cut"+t+n(),i}var Jc=i=>new URL(`models/${i}`,document.baseURI).href;async function Jd(){let i=[];try{let r=await fetch(Jc("index.json"));r.ok&&(i=(await r.json()).files||[])}catch{i=[]}let t=r=>i.includes(r)?Wd(Jc(r)).catch(()=>null):null,[e,n,s]=await Promise.all([t("trees.bin"),t("bikes.bin"),t("people.bin")]);if(e&&Ud(e),n&&Yc("bikes",n),s){let r=["stand","walk1","walk2","walk1","ride"].map(o=>s[`player_${o}`]).filter(Boolean);r.length===5&&Yc("player",r)}}async function $d(i){let t={};return await Promise.all(["leafA","leafB","barkA","barkB"].map(async e=>{let n=await i(Jc(`tex/${e}.webp`));n&&(n.wrapS=n.wrapT=li,t[e]=n)})),t}var $c=Fa.degToRad(33),Kd=24,Y_=i=>new URL(`stiltest/tex/${i}.webp`,document.baseURI).href,Z_=i=>new URL(`stiltest/tex/small/${i}.webp`,document.baseURI).href,Qd={value:.25};function J_(i){return i.onBeforeCompile=t=>{t.uniforms.uLit=Qd,t.fragmentShader=`uniform float uLit;
`+t.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
      #ifdef USE_INSTANCING_COLOR
        totalEmissiveRadiance += vColor * step(0.97, vColor.r) * uLit;
      #endif`)},i.customProgramCacheKey=()=>"litwin",i}var Ps={low:{name:"L\xE5g",ratio:1,shadow:0},medium:{name:"Medel",ratio:1.5,shadow:1024},high:{name:"H\xF6g",ratio:2,shadow:2048}};async function jd(i,t){let e=new za({antialias:!0,powerPreference:"high-performance"});e.outputColorSpace=Ee,e.toneMapping=vs,e.toneMappingExposure=1.15,e.shadowMap.enabled=!0,e.shadowMap.type=Ni,i.appendChild(e.domElement);let n=["asphalt","slabs","grass","plaster","roof","foliage"],s=Object.fromEntries(await Promise.all(n.map(async z=>[z,await Cr(Z_(z))]))),r=new Ut(14267530),o=new ds;o.background=r,o.fog=new us(r,70,150),o.environment=Ic(e);let a={asphalt:Mi(s.asphalt,6,{vertexColors:!0,roughness:.92,vary:.7}),slabs:Mi(s.slabs,4,{vertexColors:!0,roughness:.88,vary:.5}),grass:Mi(s.grass,4,{vertexColors:!0,roughness:1,vary:.8}),wall:hn(Mi(s.plaster,5,{vertexColors:!0,roughness:.95,vary:.6})),roof:hn(Mi(s.roof,.7,{vertexColors:!0,roughness:.8,vary:.9})),leaf:hn(Mi(s.foliage,3.6,{vertexColors:!0,roughness:.9,triplanar:!0,mapNormal:!0}),4.5),wood:hn(new Ce({vertexColors:!0,roughness:.95}),4.5),plain:hn(new Ce({vertexColors:!0,roughness:.75,envMapIntensity:.4})),solid:new Ce({vertexColors:!0,roughness:.75,envMapIntensity:.4}),paint:new Ce({vertexColors:!0,roughness:.6,color:15131612,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),trimI:hn(new Ce({roughness:.7,envMapIntensity:.4})),darkI:hn(new Ce({roughness:.9,envMapIntensity:.3})),glassI:hn(J_(new Ce({roughness:.12,metalness:.3,envMapIntensity:.9}))),lantern:hn(new pn({color:16773320}))},l=await $d(Cr),c=z=>z?hn(new Ce({map:z,alphaTest:.45,side:an,vertexColors:!0,roughness:.85,envMapIntensity:.5}),4.5):a.leaf,h=z=>z?hn(new Ce({map:z,vertexColors:!0,roughness:.95}),4.5):a.wood;Object.assign(a,{leafA:c(l.leafA),leafB:c(l.leafB),barkA:h(l.barkA),barkB:h(l.barkB),leafV:hn(new Ce({vertexColors:!0,roughness:.9}),4.5),vc:a.solid});let u=t.map,d=kd(u,a);o.add(d.group);let f=new ge(new qe(u.width+40,u.height+40).rotateX(-Math.PI/2),new Ce({color:3103344,roughness:.15,metalness:.2,envMapIntensity:1.2}));f.position.set(u.width/2,-.85,u.height/2),f.receiveShadow=!0,o.add(f);let p=new Fe,y=200;for(let[z,$,P,X]of[[-y/2,u.height/2,y,u.height+y*2],[u.width+y/2,u.height/2,y,u.height+y*2],[u.width/2,-y/2,u.width,y],[u.width/2,u.height+y/2,u.width,y]]){let C=new qe(P,X).rotateX(-Math.PI/2),J=new Float32Array(C.attributes.position.count*3).fill(.75);C.setAttribute("color",new ce(J,3));let Q=new ge(C,a.grass);Q.position.set(z,.08,$),Q.receiveShadow=!0,p.add(Q)}o.add(p);let m=new pn({map:Pr(),color:16760944,transparent:!0,blending:yi,depthWrite:!1,opacity:.3}),g=new mn(new qe(1,1).rotateX(-Math.PI/2),m,u.lamps.length);u.lamps.forEach((z,$)=>{let P=new qt().compose(new U(z.x+(z.ax||0)*1.1,.14,z.y+(z.ay||0)*1.1),new Pe,new U(7,1,7));g.setMatrixAt($,P)}),g.renderOrder=2,o.add(g);let _=Zd(t,a);o.add(_.group);let E=new Di(16754760,8.2);E.castShadow=!0,E.shadow.bias=-4e-4,E.shadow.normalBias=.05,E.shadow.radius=3;let v=new U(-52,24,34).normalize();o.add(E,E.target);let b=new gs(11841728,8016948,.85);o.add(b);let T=new Di(10135760,.3);T.position.set(60,30,-10),o.add(T);let x=new Ke(Kd,1,4,260),M={x:t.player.x,z:t.player.y,metres:0},I="medium";function A(z){I=z;let $=Ps[z];e.setPixelRatio(Math.min(window.devicePixelRatio||1,$.ratio)),E.castShadow=$.shadow>0,$.shadow&&(E.shadow.mapSize.set($.shadow,$.shadow),E.shadow.map&&(E.shadow.map.dispose(),E.shadow.map=null)),D()}function D(){let z=i.clientWidth||window.innerWidth,$=i.clientHeight||window.innerHeight;e.setSize(z,$,!1),e.domElement.style.width="100%",e.domElement.style.height="100%",x.aspect=z/$,x.updateProjectionMatrix()}window.addEventListener("resize",D),A("medium");function B(){let z=t.player.vehicle;if(!z)return 26;let $=Math.hypot(z.vx,z.vy);return z.spec.class==="car"?34+$*.85:29+$*.6}let H={sun:new Ut(16754760),sky:new Ut(11841728),ground:new Ut(8016948),haze:new Ut(14267530)},L={sun:new Ut(16747072),sky:new Ut(4872842),ground:new Ut(2761776),haze:new Ut(3817568)},k=-1;function Y(z){let $=t.player,P=$.vehicle||$,X=$.vehicle?.7:.25,C=P.x+P.vx*X,J=P.y+P.vy*X,Q=1-Math.exp(-6*z);M.metres===0&&(M.x=C,M.z=J,M.metres=B()),M.x+=(C-M.x)*Q,M.z+=(J-M.z)*Q,M.metres+=(B()-M.metres)*(1-Math.exp(-2*z));let G=0,rt=0;t.shake>0&&(G=(Math.random()-.5)*t.shake*.6,rt=(Math.random()-.5)*t.shake*.6);let at=M.metres/2/Math.tan(Fa.degToRad(Kd/2));x.position.set(M.x+G,Math.cos($c)*at,M.z+Math.sin($c)*at+rt),x.lookAt(M.x+G,0,M.z+rt),x.far=at*2.4+40,x.updateProjectionMatrix(),o.fog.near=at*1.25,o.fog.far=at*2.6,Zc.value.set(P.x,P.y,1/Math.tan($c),2.6);let ot=M.metres*.62,st=E.shadow.camera;st.left=-ot*1.9,st.right=ot*1.9,st.top=ot*1.3,st.bottom=-ot*1.3,st.near=1,st.far=260,st.updateProjectionMatrix();let Et=ot*2/(E.shadow.mapSize.x||1024),Zt=Math.round(M.x/Et)*Et,wt=Math.round((M.z-4)/Et)*Et;E.target.position.set(Zt,0,wt),E.position.set(Zt+v.x*120,v.y*120,wt+v.z*120);let Nt=wh(t.time+(t.clockOffset||0));Math.abs(Nt-k)>.002&&(k=Nt,E.intensity=8.2*(1-.88*Nt),E.color.copy(H.sun).lerp(L.sun,Nt),b.color.copy(H.sky).lerp(L.sky,Nt),b.groundColor.copy(H.ground).lerp(L.ground,Nt),b.intensity=.85-.35*Nt,o.background.copy(H.haze).lerp(L.haze,Nt),o.fog.color.copy(o.background),e.toneMappingExposure=1.15-.15*Nt,m.opacity=.3+.6*Nt,Qd.value=.25+.95*Nt,a.lantern.color.setRGB(1,.94,.78).multiplyScalar(.9+.8*Nt),_.night=Nt),_.update(z,Nt),e.render(o,x)}return{frame:Y,renderer:e,scene:o,camera:x,setQuality:A,get quality(){return I},city:d,async upgradeTextures(){await Promise.all(n.map(async z=>{let $=await Cr(Y_(z)),P=s[z];!$||!P||(P.dispose(),P.image=$.image,P.needsUpdate=!0)}))}}}var ve=i=>document.getElementById(i);async function K_(){let i={surface:ve("hud"),joy:ve("joy"),knob:ve("joy-knob"),action:ve("btn-action"),brake:ve("btn-brake"),speed:ve("speed"),toast:ve("toast")};for(let v of document.querySelectorAll("[data-version]"))v.textContent=`v${lh}`;let t=hh(1),e=mh(t),n=new URLSearchParams(location.search);n.has("kvall")&&(e.clockOffset=.6*600);let s=Sh(i),r=bh(i);await Jd();let o=await jd(ve("game"),e),a={quality:n.get("q")||"auto",fps:n.has("fps")},l=ve("fps"),c=()=>{ve("set-fps").textContent=a.fps?"Visa fps: p\xE5":"Visa fps: av",ve("set-quality").textContent=`Grafik: ${a.quality==="auto"?`auto (${Ps[o.quality].name})`:Ps[a.quality].name}`,l.hidden=!a.fps};ve("btn-settings").addEventListener("click",()=>{ve("settings").hidden=!ve("settings").hidden,c()}),ve("set-close").addEventListener("click",()=>ve("settings").hidden=!0),ve("set-fps").addEventListener("click",()=>{a.fps=!a.fps,c()}),ve("set-quality").addEventListener("click",()=>{let v=["auto","low","medium","high"];a.quality=v[(v.indexOf(a.quality)+1)%v.length],a.quality!=="auto"&&o.setQuality(a.quality),c()}),a.quality!=="auto"&&Ps[a.quality]&&o.setQuality(a.quality),c();let h={cpu:[],frames:0},u=0,d=performance.now(),f=0,p=0,y=0,m=0,g=-99,_=0;function E(v){let b=Math.min((v-d)/1e3,.1);d=v;let T=performance.now();for(u+=b,s.update();u>=Ur;)Mh(e,s,Ur),u-=Ur;for(let x of e.events.splice(0))x.type==="toast"&&r.toast(x.text);if(o.frame(b),r.update(e,s.enabled?_h(e):null,b),h.cpu.push(performance.now()-T),h.cpu.length>1200&&h.cpu.shift(),h.frames++,_+=b,f++,p+=b,p>=.5){let x=f/p;if(f=0,p=0,a.fps&&(l.textContent=`${Math.round(x)} fps \xB7 ${Ps[o.quality].name}`),a.quality==="auto"&&_>3){let M=["low","medium","high"],I=M.indexOf(o.quality);y=x<50?y+.5:0,m=x>=59?m+.5:0,y>=1&&I>0?(o.setQuality(M[I-1]),y=0,g=_,ve("settings").hidden||c()):m>=8&&I<2&&_-g>20&&(o.setQuality(M[I+1]),m=0,ve("settings").hidden||c())}}requestAnimationFrame(E)}requestAnimationFrame(v=>{d=v,E(v),setTimeout(()=>o.upgradeTextures(),300)}),ve("btn-start").addEventListener("click",()=>{ve("start").hidden=!0,s.enabled=!0;let v=document.documentElement;matchMedia("(pointer: coarse)").matches&&v.requestFullscreen&&v.requestFullscreen({navigationUI:"hide"}).then(()=>screen.orientation?.lock?.("landscape")).catch(()=>{})}),ve("btn-start").disabled=!1,window.__fyriskaos={game:e,input:s,renderer:o,perf:h}}K_().catch(i=>{console.error(i),ve("error").hidden=!1,ve("error").textContent="Spelet kunde inte starta p\xE5 den h\xE4r enheten. Prova att ladda om sidan."});
/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
