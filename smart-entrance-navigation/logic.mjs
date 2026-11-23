// All coordinates and access policies are synthetic demo data, NOT live campus information.
export const NODES={
  arrivalN:{x:360,y:42,label:'North approach'},arrivalE:{x:749,y:244,label:'East approach'},arrivalS:{x:415,y:510,label:'South approach'},arrivalW:{x:48,y:316,label:'West approach'},
  gateN:{x:350,y:126,label:'North gate'},gateE:{x:661,y:243,label:'East service gate'},gateS:{x:416,y:450,label:'South reception'},gateW:{x:135,y:316,label:'West walkway'},
  hubN:{x:361,y:215,label:'North junction'},hubC:{x:388,y:307,label:'Central square'},hubE:{x:530,y:293,label:'East avenue'},hubW:{x:250,y:309,label:'West avenue'},hubS:{x:415,y:382,label:'South junction'},
  library:{x:283,y:234,label:'Learning centre'},clinic:{x:508,y:375,label:'Health centre'},innovation:{x:555,y:218,label:'Innovation hall'},sports:{x:282,y:385,label:'Sports arena'}
};
export const GATES=[
  {id:'gateN',name:'North gate',modes:['walk','drive'],roles:['visitor','staff'],note:'General visitor access'},
  {id:'gateE',name:'East service gate',modes:['drive'],roles:['staff','delivery'],note:'Staff and deliveries only'},
  {id:'gateS',name:'South reception',modes:['walk','drive'],roles:['visitor','staff'],note:'Visitor reception checkpoint'},
  {id:'gateW',name:'West walkway',modes:['walk'],roles:['visitor','staff'],note:'Pedestrian-only access'}
];
export const DESTINATIONS=[{id:'library',name:'Learning centre',purpose:'Studying & meetings'},{id:'innovation',name:'Innovation hall',purpose:'Events & workshops'},{id:'clinic',name:'Health centre',purpose:'Appointments'},{id:'sports',name:'Sports arena',purpose:'Games & recreation'}];
// Connections are split between the publicly accessible approach network and fictional campus network.
const outside=[['arrivalN','gateN',1],['arrivalN','gateE',4.6],['arrivalN','gateS',6],['arrivalN','gateW',4.3],['arrivalE','gateE',1],['arrivalE','gateN',4.4],['arrivalE','gateS',4.2],['arrivalE','gateW',7.4],['arrivalS','gateS',1],['arrivalS','gateE',4.5],['arrivalS','gateW',4.6],['arrivalS','gateN',5.8],['arrivalW','gateW',1],['arrivalW','gateN',4.2],['arrivalW','gateS',4.4],['arrivalW','gateE',7.1]];
const inside=[['gateN','hubN',1],['gateE','hubE',1],['gateS','hubS',1],['gateW','hubW',1],['hubN','hubC',1],['hubN','hubE',2],['hubN','library',1],['hubC','hubE',1.4],['hubC','hubW',1.4],['hubC','hubS',1],['hubE','innovation',1],['hubE','clinic',1.5],['hubW','library',1.6],['hubW','sports',1],['hubS','clinic',1],['hubS','sports',1.5],['hubS','hubW',2],['hubN','innovation',2.4]];
export const OUTSIDE_EDGES=outside.map(([a,b,w])=>({a,b,w}));export const INSIDE_EDGES=inside.map(([a,b,w])=>({a,b,w}));
export function shortestPath(start,end,edges){const graph={};for(const e of edges){(graph[e.a]??=[]).push([e.b,e.w]);(graph[e.b]??=[]).push([e.a,e.w]);}const distances={[start]:0},prev={},unseen=new Set([...Object.keys(graph),start,end]);while(unseen.size){let u=null;for(const n of unseen)if(u===null||(distances[n]??Infinity)<(distances[u]??Infinity))u=n;if(u===null||!Number.isFinite(distances[u]??Infinity))break;unseen.delete(u);if(u===end)break;for(const [v,w] of graph[u]||[]){if(!unseen.has(v))continue;const alt=distances[u]+w;if(alt<(distances[v]??Infinity)){distances[v]=alt;prev[v]=u;}}}if(!Number.isFinite(distances[end]??Infinity))return null;const path=[end];while(path[0]!==start){path.unshift(prev[path[0]]);if(!path[0])return null;}return {path,cost:distances[end]};}
export function isEligible(gate,role,mode){return gate.roles.includes(role)&&gate.modes.includes(mode);}
export function findRoutes({arrival='arrivalN',destination='library',role='visitor',mode='walk'}){if(!NODES[arrival]||!NODES[destination])return[];return GATES.filter(g=>isEligible(g,role,mode)).map(g=>{const external=shortestPath(arrival,g.id,OUTSIDE_EDGES);const internal=shortestPath(g.id,destination,INSIDE_EDGES);if(!external||!internal)return null;return {...g,cost:Math.round((external.cost+internal.cost)*10)/10,path:[...external.path,...internal.path.slice(1)]};}).filter(Boolean).sort((a,b)=>a.cost-b.cost);}
export function routePolyline(route){return route.path.map(id=>`${NODES[id].x},${NODES[id].y}`).join(' ');}
