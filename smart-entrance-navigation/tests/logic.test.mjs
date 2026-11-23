import test from 'node:test';import assert from 'node:assert/strict';
import {shortestPath,findRoutes,isEligible,GATES,OUTSIDE_EDGES} from '../logic.mjs';
test('Dijkstra finds shortest external path',()=>{const p=shortestPath('arrivalN','gateN',OUTSIDE_EDGES);assert.ok(p);assert.equal(p.cost,1);});
test('visitor driving cannot use staff or pedestrian gate',()=>{const r=findRoutes({arrival:'arrivalW',destination:'library',role:'visitor',mode:'drive'});assert.ok(r.length);assert.ok(r.every(x=>['gateN','gateS'].includes(x.id)));});
test('deliveries cannot use public entrances',()=>{const r=findRoutes({arrival:'arrivalE',destination:'innovation',role:'delivery',mode:'drive'});assert.deepEqual(r.map(x=>x.id),['gateE']);});
test('walking deliveries get an honest no-route result',()=>assert.equal(findRoutes({arrival:'arrivalE',destination:'innovation',role:'delivery',mode:'walk'}).length,0));
test('paths start at selected arrival and end at destination',()=>{for(const r of findRoutes({arrival:'arrivalS',destination:'clinic',role:'visitor',mode:'walk'})){assert.equal(r.path[0],'arrivalS');assert.equal(r.path.at(-1),'clinic');}});
